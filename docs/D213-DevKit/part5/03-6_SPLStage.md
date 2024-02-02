---
sidebar_position: 6
---
# SPL 阶段

Artinchip 平台上的 SPL(Secondary Program Loader) 是第一级引导程序(FSBL, First Stage Boot Loader)， 同时也是第二级程序加载器。

> BROM -> SPL -> U-Boot -> Kernel

SPL 运行在 SRAM 中，其最重要的任务有两个：

- 完成 DDR，并且使能 Cache
- 加载和验证 U-Boot

在一些启动速度优化的方案中，也可以直接从 SPL 启动 Kernel。 本章节描述不同启动介质的 SPL 处理流程，以及安全启动的相关处理。

## 1. RISCV SPL

SPL BSS 的配置

```
CONFIG_SPL_TEXT_BASE=0x103100
CONFIG_SPL_SIZE_LIMIT=0x10000

#define CONFIG_SPL_MAX_SIZE                 (CONFIG_SPL_SIZE_LIMIT)
#define CONFIG_SPL_STACK                    (D211_SRAM_BASE + D211_SRAM_SIZE)

#define CONFIG_SPL_BSS_START_ADDR   (CONFIG_SPL_TEXT_BASE + CONFIG_SPL_MAX_SIZE)
#define CONFIG_SPL_BSS_MAX_SIZE             0x00002000 /* 8 KiB */
```

即 BSS 从 0x113100 开始，后续还有 SPL STACK 的空间，HEAP 的空间。

对于 spl.aic 文件，在 spl.bin 的后面还存放着其他的资源数据，如果该数据需要在 SPL 阶段使用， 则需要注意，在 SPL 运行时，资源数据的区域与 BSS 区域不能重合，不然会有数据错误。

## 2. 启动流程

理解spl的启动流程，关键是设备树，设备驱动模型。关于设备树，请查看设备树相关章节，设备驱动模型的介绍如下：

### 2.1. uboot 设备驱动框架模型
```
> uclass <–> uclass_driver <–> udevice <–> driver <–> hardware
```
uclass表示管理某一个类别下的所有device;

uclass_driver表示对应uclass的ops集合。

### 2.2. uboot 设备驱动框架搭建的过程

> 1. 创建udevice
> 2. 应用uclass如果没有则匹配生成uclass
> 3. udevice和uclass绑定
> 4. uclass_driver和uclass绑定
> 5. driver和udevice绑定
> 6. device_probe执行，会触发uclass_driver调用driver函数

### 2.3. SPL RISCV 的启动整体流程

```
_start // arch/riscv/cpu/start.S
|-> save_boot_params // arch/riscv/mach-artinchip/lowlevel_init.S
|   // BROM 跳转到 SPL 执行的时候，传递了一些参数，这里首先需要将这些参数保存起来
|
|-> csrw    MODE_PREFIX(ie), zero // Disable irq
|-> li      t1, CONFIG_SPL_STACK // 设置sp寄存器
|-> jal     board_init_f_alloc_reserve // common/init/board_init.c
|   // 预留初始 HEAP 的空间
|   // 预留 GD 全局变量的空间
|
|-> jal     board_init_f_init_reserve
|   // common/init/board_init.c, init gd area
|   // 此时 gd 在 SPL STACK 中。
|
|-> jal     icache_enable // arch/riscv/cpu/c906/cache.c 使能指令高速缓存
|-> jal     dcache_enable // 使能数据高速缓存
|
|-> jal     debug_uart_init // drivers/serial/ns16550.c
| // 初始化调试串口，如果使能
|
|-> board_init_f // arch/riscv/lib/spl.c
|   |-> spl_early_init() // common/spl/spl.c
|       |-> spl_common_init(setup_malloc = true) // common/spl/spl.c
|           |-> fdtdec_setup();  // lib/fdtdec.c 获取dtb的地址，并验证合法性
|           | // 只对带有“u-boot,dm-pre-reloc”属性节点进行解析，初始化驱动模型的根节点，扫描设备树创建udevice,uclass
|           |-> dm_init_and_scan(!CONFIG_IS_ENABLED(OF_PLATDATA)); // drivers/core/root.c
|               |-> dm_init(); // driver model, initiate virtual root driver
|               |   |-> INIT_LIST_HEAD(DM_UCLASS_ROOT_NON_CONST); // 初始化uclass链表
|               |   |-> device_bind_by_name()
|               |   |   |   // drivers/core/device.c
|               |   |   |   // 加载"root_driver"name, gd->dm_root
|               |   |   |-> lists_driver_lookup_name()
|               |   |   |   |-> ll_entry_start(struct driver, driver); // 获取driver table起始位置
|               |   |   |   |-> ll_entry_count(struct driver, driver); // 获取driver table长度
|               |   |   |   // drivers/core/lists.c
|               |   |   |   // 采用 U_BOOT_DRIVER(name) 声明的 driver，从driver table中获取struct driver数据
|               |   |   |
|               |   |   |   // 初始化udevice 与对应的uclass,driver绑定
|               |   |   |-> device_bind_common(); // drivers/core/device.c
|               |   |       |-> uclass_get(&uc)
|               |   |       |   |-> uclass_find(id); // 判断对应的uclass是否存在
|               |   |       |   |-> uclass_add(id, ucp); // 如果不存在就创建
|               |   |       |       |-> lists_uclass_lookup(id); // 获取uclass_driver结构体数据
|               |   |       |-> uclass_bind_device(dev) // uclass绑定udevice drivers/core/uclass.c
|               |   |       |-> drv->bind(dev)  // driver绑定udevice
|               |   |       |-> parent->driver->child_post_bind(dev)
|               |   |       |-> uc->uc_drv->post_bind(dev)
|               |   |
|               |   |-> device_probe(gd->dm_root) // drivers/core/device.c
|               |       |-> uclass_resolve_seq(dev) // 通过dtb解析获得设备差异数据
|               |       |-> uclass_pre_probe_device(dev); // probe前操作
|               |       |-> drv->probe(dev); // 执行driver的probe操作
|               |       |-> uclass_post_probe_device(dev); // probe后操作
|               |
|               |-> dm_scan(pre_reloc_only);
|                   |   // 扫描和绑定由 U_BOOT_DEVICE 声明的驱动。
|                   |   // 一般用在 SPL OF_PLATDATA 的情况
|                   |-> dm_scan_plat(pre_reloc_only);
|                   |   |-> lists_bind_drivers(DM_ROOT_NON_CONST, pre_reloc_only);
|                   |       |-> bind_drivers_pass(parent, pre_reloc_only);
|                   |           |-> device_bind_by_name();
|                   |
|                   |-> dm_extended_scan(pre_reloc_only);
|                   |   |-> dm_scan_fdt(pre_reloc_only); // 扫描设备树并与设备驱动建立联系
|                   |   |   |-> dm_scan_fdt_node(gd->dm_root, ofnode_root(), pre_reloc_only); //扫描设备树并绑定root节点下的设备
|                   |   |       |-> ofnode_first_subnode(parent_node) // 获取设备树的第一个子节点
|                   |   |       |-> ofnode_next_subnode(node) // 遍历所有的子节点
|                   |   |       |-> ofnode_is_enabled(node) // 判断设备树的子节点是否使能
|                   |   |       |-> lists_bind_fdt(parent, node, NULL, pre_reloc_only); // 绑定设备树节点，创建新的udevicd drivers/core/lists.c
|                   |   |           |-> ofnode_get_property(node, "compatible", &compat_length); // 获取compatible
|                   |   |           |-> driver_check_compatible() // 和driver比较compatible值
|                   |   |           |-> device_bind_with_driver_data() // 创建一个设备并绑定到driver drivers/core/device.c
|                   |   |               |-> device_bind_common() // 创建初始化udevice 与对应的uclass,driver绑定
|                   |   |
|                   |   | // /chosen /clocks /firmware 一些节点本身不是设备，但包含一些设备，遍历其包含的设备
|                   |   |-> dm_scan_fdt_ofnode_path(nodes[i], pre_reloc_only);
|                   |       |-> ofnode_path(path); // 找到节点下包含的设备
|                   |       |-> dm_scan_fdt_node(gd->dm_root, node, pre_reloc_only);
|                   |
|                   |-> dm_scan_other(pre_reloc_only);
|                   |   // 扫描使用者自定义的节点 nothing
|
|-> spl_clear_bss // arch/riscv/cpu/start.S
|-> spl_relocate_stack_gd   // 切换stack 和 gd 到dram空间
|-> board_init_r()    // common/spl/spl.c
    |-> spl_set_bd()  // board data info
    |   // 设置完 bd 之后，才能 enable d-cache
    |-> mem_malloc_init()
    |   // init heap
    |   //  - CONFIG_SYS_SPL_MALLOC_START
    |   //  - CONFIG_SYS_SPL_MALLOC_SIZE>
    |
    |-> spl_init
    |   |-> spl_common_init
    |       // 由于前面已经调用了 spl_early_init,
    |       // 这里不再调用 spl_common_init
    |
    |-> timer_init(); // lib/time.c nothing
    |-> spl_board_init(); // arch/riscv/mach-artinchip/spl.c nothing
    |
    |-> initr_watchdog  // enable watchdog，如果使能
    |-> dram_init_banksize(); // 如果使能
    |-> board_boot_order() // common/spl/spl.c
    |   |-> spl_boot_device(); // arch/riscv/mach-artinchip/spl.c
    |       |-> aic_get_boot_device(); // arch/riscv/mach-artinchip/boot_param.c
    |           // 从 boot param 中获取启动介质信息
    |
    |-> boot_from_devices(spl_boot_list)
    |   |-> spl_ll_find_loader()  // 根据boot device找到spl_load_image指针
    |   |       // 这里可能是各种介质的 load image 函数
    |   |       // SPL_LOAD_IMAGE_METHOD() 定义的 Loader
    |   |       // 可能是 MMC/SPI/BROM/...
    |   |
    |   |-> spl_load_image  // 以emmc启动为例
    |       |-> spl_mmc_load_image  // common/spl/spl_mmc.c
    |           |-> spl_mmc_load // 具体可看后面的流程
    |
    |-> spl_perform_fixups  // vendor hook，用于修改device-tree传递参数
    |-> spl_board_prepare_for_boot  // vendor hook, 可不实现
    |-> jump_to_image_no_args   // 跳转到u-boot执行
```

## 3. MMC 加载

SPL 从 MMC 加载 U-Boot 的处理过程。

程序编码的时候，针对 MMC 设备添加了对应的加载程序支持，如 spl_mmc.c 中，通过使用宏:

> SPL_LOAD_IMAGE_METHOD(“MMC1”, 0, BOOT_DEVICE_MMC1, spl_mmc_load_image);

将 `spl_mmc_load_image` 函数添加到 .u_boot_list_2_spl_image_loader_* 段。

在 SPL 初始化过程中，通过 `boot_from_devices(spl_boot_list)` 函数调用，检查当前项目 所支持的 SPL 读取的存储介质类型，然后依次检查是否存在对应的程序加载器。

```
board_init_r()    // common/spl/spl.c
|-> boot_from_devices(spl_boot_list)
    |-> spl_ll_find_loader()  // 根据boot device找到spl_load_image指针
            // 这里可能是各种介质的 load image 函数
            // SPL_LOAD_IMAGE_METHOD() 定义的 Loader
            // 可能是 MMC/SPI/BROM/...
```

找到 SPL MMC Loader 之后，从项目配置的指定 Sector 读取数据。

- CONFIG_SYS_MMCSD_RAW_MODE_U_BOOT_SECTOR

```
boot_from_devices(spl_boot_list); // common/spl/spl.c
|-> spl_ll_find_loader()  // 根据boot device找到spl_load_image指针
|   // 此处通过遍历固件的 .u_boot_list_2_spl_image_loader_* 段
|   // 找到当前支持的存储介质，然后逐个尝试
|
|-> spl_load_image(loader);
    |-> loader->load_image(spl_image, &bootdev);
        spl_mmc_load_image();  // common/spl/spl_mmc.c
        |-> spl_mmc_load();
                    |
      +-------------+
      |
spl_mmc_load();
|-> spl_mmc_find_device(&mmc, bootdev->boot_device);
|   |-> mmc_initialize
|       |-> mmc_probe
|           |-> uclass_get(UCLASS_MMC, &uc)
|           |-> device_probe(dev)
|               |-> uclass_resolve_seq(dev)
|               |-> pinctrl_select_state(dev, "default")
|               |   |-> pinctrl_select_state_full(dev, "default")
|               |   |   |-> state = dev_read_stringlist_search(dev,
|               |   |   |                       "pinctrl-names", "default");
|               |   |   |-> dev_read_prop(dev, propname, &size)
|               |   |   |   // snprintf(propname, sizeof(propname),
|               |   |   |   //              "pinctrl-%d", state)
|               |   |   |
|               |   |   |-> pinctrl_config_one(config)
|               |   |       |-> ops = pinctrl_get_ops(pctldev)
|               |   |       |-> ops->set_state(pctldev, config)
|               |   |
|               |   |-> pinctrl_select_state_simple(dev)
|               |       |-> uclass_get_device_by_seq(UCLASS_PINCTRL, 0, &pctldev)
|               |       |-> ops=pinctrl_get_ops(pctldev)
|               |       |   // #define pinctrl_get_ops(dev)
|               |       |   //         ((struct pinctrl_ops *)(dev)->driver->ops)
|               |       |
|               |       |-> ops->set_state_simple(pctldev, dev)
|               |
|               |-> power_domain_on(&powerdomain)
|               |-> uclass_pre_probe_device(dev)
|               |-> clk_set_defaults(dev)
|               |   |-> clk_set_default_parents(dev)
|               |   |-> clk_set_default_rates(dev)
|               |
|               |-> drv->probe(dev)
|               |-> uclass_post_probe_device(dev)
|
|-> mmc_init
|-> boot_mode=spl_boot_mode(bootdev->boot_device)
|-> mmc_load_image_raw_sector
    |-> header=spl_get_load_buffer(-sizeof(*header), bd->blksz)
    |   // header位于load_addr偏移-head_size处
    |
    |-> blk_dread(bd, sector, 1, header)
    |   // 读取一个sector的u-boot image header
    |
    |-> mmc_load_legacy(spl_image, mmc, sector, header)
    |   |-> spl_parse_image_header(spl_image, header)
    |   // 解析u-boot image header信息，得到u-boot的addr和size信息
    |
    |-> blk_dread(bd, sector, cnt, load_addr)
        // 读取完整的u-boot image，包括header，注意load_addr是向前偏移过的地址
```

## 4. SPI NAND 加载

官方版本的 SPL 并不支持从 SPI NAND 启动，Artinchip 增加了从 SPI NAND 的 MTD 分区 和 UBI 加载 U-Boot 的支持。

common/spl/spl_spi_nand.c 中注册了两个不同的 SPL 程序加载器。

```
#ifdef CONFIG_SPL_UBI
/* Use priorty 0 to override other SPI device when this device is enabled. */
SPL_LOAD_IMAGE_METHOD("SPINAND_UBI", 0, BOOT_DEVICE_SPI, spl_ubi_load_image);
#else
SPL_LOAD_IMAGE_METHOD("SPINAND", 0, BOOT_DEVICE_SPI, spl_spi_nand_load_image);
#endif
```

### 4.1. U-Boot 保存在 MTD 分区时

在 SPL 初始化过程中，通过 `boot_from_devices(spl_boot_list)` 函数调用，检查当前项目 所支持的 SPL 读取的存储介质类型，然后依次检查是否存在对应的程序加载器。

```
board_init_r()    // common/spl/spl.c
|-> boot_from_devices(spl_boot_list)
    |-> spl_ll_find_loader()  // 根据boot device找到spl_load_image指针
            // 这里可能是各种介质的 load image 函数
            // SPL_LOAD_IMAGE_METHOD() 定义的 Loader
            // 可能是 MMC/SPI/BROM/...
```

找到 SPL SPINAND Loader 之后，从项目配置的指定位置读取数据。

- CONFIG_SYS_SPI_NAND_U_BOOT_OFFS

```
boot_from_devices(spl_boot_list); // common/spl/spl.c
|-> spl_ll_find_loader()  // 根据boot device找到spl_load_image指针
|   // 此处通过遍历固件的 .u_boot_list_2_spl_image_loader_* 段
|   // 找到当前使能的存储介质驱动，然后逐个尝试
|
|-> spl_load_image(loader);
    |-> loader->load_image(spl_image, &bootdev);
        spl_spi_nand_load_image();  // arch/arm/mach-artinchip/spl_spi_nand.c
        |-> spl_spi_nand_init();
        |   |-> uclass_first_device(UCLASS_MTD, &dev); // drivers/core/uclass.c
        |   |-> mtd_probe(dev);
        |   |-> get_mtd_device(NULL, 0);
        |-> spl_get_load_buffer(-sizeof(*header), sizeof(*header));
        |-> spl_spi_nand_read();
        |   // 读取头信息
        |-> spl_parse_image_header(spl_image, header);
        |-> spl_spi_nand_read();// arch/arm/mach-artinchip/spl_spi_nand.c
            |  // 读取整个 U-Boot 镜像
            |-> mtd_block_isbad(mtd, off);
            |   // 跳过坏块
            |-> mtd_read(); // drivers/mtd/mtdcore.c
```

### 4.2. U-Boot 保存在 UBI 中时

在 SPL 初始化过程中，通过 `boot_from_devices(spl_boot_list)` 函数调用，检查当前项目 所支持的 SPL 读取的存储介质类型，然后依次检查是否存在对应的程序加载器。

```
board_init_r()    // common/spl/spl.c
|-> boot_from_devices(spl_boot_list)
    |-> spl_ll_find_loader()  // 根据boot device找到spl_load_image指针
            // 这里可能是各种介质的 load image 函数
            // SPL_LOAD_IMAGE_METHOD() 定义的 Loader
            // 可能是 MMC/SPI/BROM/...
```

找到 SPL SPINAND UBI Loader 之后，从项目配置的指定位置读取数据。

- CONFIG_SPL_UBI_INFO_ADDR
- CONFIG_SPL_UBI_PEB_OFFSET
- CONFIG_SPL_UBI_VID_OFFSET
- CONFIG_SPL_UBI_LEB_START

或者从指定 Volume 中读取

- CONFIG_SPL_UBI_LOAD_MONITOR_VOLNAME

```
boot_from_devices(spl_boot_list); // common/spl/spl.c
|-> spl_ll_find_loader()  // 根据boot device找到spl_load_image指针
|   // 此处通过遍历固件的 .u_boot_list_2_spl_image_loader_* 段
|   // 找到当前支持的存储介质，然后逐个尝试
|
|-> spl_load_image(loader);
    |-> loader->load_image(spl_image, &bootdev);
        spl_ubi_load_image(); // arch/arm/mach-artinchip/spl_spi_nand.c
        |-> spl_spi_nand_init();
        |   |-> uclass_first_device(UCLASS_MTD, &dev); // drivers/core/uclass.c
        |   |-> mtd_probe(dev);
        |   |-> get_mtd_device(NULL, 0);
        |-> spl_get_load_buffer(-sizeof(*header), sizeof(*header));
        |-> ubispl_load_volumes(&info, volumes, 1); // drivers/mtd/ubispl/ubispl.c
        |   |  // 读取整个 U-Boot 镜像的内容
        |   |-> ipl_scan(ubi);
        |   |-> ipl_load(ubi, lv->vol_id, lv->load_addr);
        |       |   // drivers/mtd/ubispl/ubispl.c
        |       |-> ubi_load_block(ubi, laddr, vi, vol_id, lnum, last);
        |           |-> ubi_io_is_bad(ubi, pnum); // drivers/mtd/ubi/io.c
        |           |   // drivers/mtd/ubispl/ubispl.c
        |           |-> ubi_io_read(ubi, laddr, pnum, ubi->leb_start, dlen);
        |               |  // drivers/mtd/ubispl/ubispl.c
        |               |-> ubi->read(pnum + ubi->peb_offset, from, len, buf);
        |                   nand_spl_read_block(pnum + ubi->peb_offset,
        |                   |                       from, len, buf);
        |                   |  // arch/arm/mach-artinchip/spl_spi_nand.c
        |                   |-> mtd_read();
        |
        |-> spl_parse_image_header(spl_image, header);
```

### 4.3. 读数 SPI NAND 数据的流程

```
mtd_read(); // drivers/mtd/mtdcore.c
|-> mtd->_read_oob(mtd, from, &ops);
    part_read_oob(mtd, from, ops); // drivers/mtd/mtdpart.c
        spinand_mtd_read(mtd, from, &ops); // drivers/mtd/nand/spi/core.c
        |-> spinand_read_page(spinand, &iter.req, enable_ecc);
            |-> spinand_load_page_op(spinand, req);
            |   |-> spi_mem_exec_op(spinand->slave, &op);
            |       |   // drivers/spi/spi-mem-nodm.c
            |       |-> spi_xfer(slave, op_len * 8, op_buf, NULL, flag);
            |
            |-> spinand_read_from_cache_op(spinand, req);
                |-> spi_mem_exec_op(spinand->slave, &op);
                    |-> spi_xfer(slave, op_len * 8, op_buf, NULL, flag);
```

## 5. SPI NOR 加载

common/spl/spl_spi.c 中通过宏注册了 SPI NOR 的程序加载器。

```
SPL_LOAD_IMAGE_METHOD("SPI", 1, BOOT_DEVICE_SPI, spl_spi_load_image);
```

在 SPL 初始化过程中，通过 `boot_from_devices(spl_boot_list)` 函数调用，检查当前项目 所支持的 SPL 读取的存储介质类型，然后依次检查是否存在对应的程序加载器。

```
board_init_r()    // common/spl/spl.c
|-> boot_from_devices(spl_boot_list)
    |-> spl_ll_find_loader()  // 根据boot device找到spl_load_image指针
            // 这里可能是各种介质的 load image 函数
            // SPL_LOAD_IMAGE_METHOD() 定义的 Loader
            // 可能是 MMC/SPI/BROM/...
```

找到 SPL SPI NOR Loader 之后，从项目配置的指定位置读取数据。

SPI NOR 加载器需要编译时配置所用的 SPI 信息：

- CONFIG_SF_DEFAULT_BUS
- CONFIG_SF_DEFAULT_CS
- CONFIG_SF_DEFAULT_SPEED
- CONFIG_SF_DEFAULT_MODE

读取数据的位置通过下面的配置指定:

- CONFIG_SYS_SPI_U_BOOT_OFFS

```
boot_from_devices(spl_boot_list); // common/spl/spl.c
|-> spl_ll_find_loader()  // 根据boot device找到spl_load_image指针
|   // 此处通过遍历固件的 .u_boot_list_2_spl_image_loader_* 段
|   // 找到当前支持的存储介质，然后逐个尝试
|
|-> spl_load_image(loader);
    |-> loader->load_image(spl_image, &bootdev);
        spl_spi_load_image();  // common/spl/spl_spi.c
        |-> spi_flash_probe();
        |-> spl_get_load_buffer(-sizeof(*header), sizeof(*header));
        |-> spi_flash_read(header);
        |-> spl_parse_image_header();
        |-> spi_flash_read();
            |-> spi_flash_read_dm(flash->dev, offset, len, buf);
                |-> sf_get_ops(dev)->read(dev, offset, len, buf);
                    spi_flash_std_read(dev, offset, len, buf);
                    | // drivers/mtd/spi/sf_probe.c
                    |-> mtd->_read(mtd, offset, len, &retlen, buf);
                            spi_flash_mtd_read(mtd, offset, len, &retlen, buf);
                            // drivers/mtd/spi/sf_mtd.c
```

## 6. SDFAT32 加载

SDFAT32启动方式更为简单，不需要专业的烧录工具进行烧写，只需要将镜像文件复制到SD卡即可。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/load_diff.png](https://photos.100ask.net/artinchip-docs/d213-devkit/load_diff-17066876090051.png)

图 3.3 *MMC与SD卡启动差异*

SDFAT32是基于MMC建立的，加载程序也在spl_mmc.c中实现，通过使用宏：

> SPL_LOAD_IMAGE_METHOD(“MMC2”, 0, BOOT_DEVICE_MMC2, spl_mmc_load_image);

将 `spl_mmc_load_image` 函数添加到 .u_boot_list_2_spl_image_loader_* 段。

在board_init_r(gd_t *dummy1, ulong dummy2)函数中，会调用boot_from_devices从device中去选择启动介质，通过启动介质选择对应的加载程序，获取启动镜像。

```
// source/uboot-2021.10/common/spl/spl.c
boot_from_devices
|   // 这里会传递一个空的spl_image_info结构体，以及传递一个启动设备的列表，这里为第一个值为BOOT_DEVICE_MMC2
|->spl_ll_find_loader(bootdev); // bootdev=BOOT_DEVICE_MMC2,根据bootdev查找spl_load_image指针
|->spl_load_image(spl_image, loader); // 这里已经获取到对应启动设备的加载器
        |->loader->load_image(spl_image, &bootdev); // 调用加载器的实现函数spl_mmc_load_image
```

进入到对应启动介质的加载程序中，通过CONFIG_SPL_FS_LOAD_PAYLOAD_NAME指定启动镜像配置文件，从中获取镜像在SD卡中的实际地址。

```
// source/uboot-2021.10/common/spl/spl_fat.c
spl_mmc_load_image
|->spl_mmc_load(spl_image, bootdev,...); // 这里CONFIG_SPL_FS_LOAD_PAYLOAD_NAME=bootcfg.txt
    |->spl_mmc_find_device(&mmc, bootdev->boot_device); // 先找mmc设备
    |->mmc_init(mmc); // 再进行mmc设备的初始化
    |->spl_mmc_boot_mode(bootdev->boot_device);
    |       // 选择启动方式，这里获取到的是MMCSD_MODE_FS方式启动
    |->spl_mmc_do_fs_boot(spl_image, mmc, filename); // filename为bootcfg.txt
        |->aic_spl_load_image_fat(spl_image, mmc_get_blk_desc(mmc), filename);
            |->blk_dread(cur_dev, 0, 1, header);
            |       // 读取SD卡的第0块。
            |->check_identifier(header); // 检测SD卡的分区类型选择启动方式
            |->load_image_from_mbr_part_fat32(header, filename); // 以MBR分区格式去加载镜像
                |->blk_dread(cur_dev, part.lba_start, 1, header);
                |   // 读取LBA起始地址
                |->check_identifier(header); // 检测SD卡分区类型是否为FAT32
                |->load_image_from_raw_volume_fat32(part.lba_start, header, filename);
                |   // 获取BPB内容
                    |->load_image_file(header, filename);
                        |->aic_fat_read_file(filename, (u8 *)header, 0, 1024, &actread);
                        |   // 查找并读取bootcfg.txt文件内容到header地址
                        |->boot_cfg_parse_file((u8 *)header, actread, "boot1", ...);
                        |   // 解析bootcfg.txt信息，获取image名称，解析U-Boot的大小，以及相对
                        |   // image文件中U-Boot所在的偏移地址
                        |->aic_fat_read_file(imgname, header, ...); //读取image文件的header
                        |->spl_parse_image_header(spl_image, header);
                        |   // 解析U-Boot中前64个字节内容，设置加载地址
                        |->aic_fat_read_file(imgname, (u8 *)spl_image->load_addr, ...);
                        |   // 读取U-Boot镜像到spl_image->load_addr地址。
                        |->board_init_r(); // 跳转回board_init_r()继续执行
```

读取U-Boot镜像到内存后，跳转回board_init_r()继续执行

```
// source/uboot-2021.10/common/spl/spl.c
board_init_r()
|->spl_perform_fixups // vendor hook，用于修改device-tree传递参数
|->jump_to_image_no_args(&spl_image);
    |->image_entry = (image_entry_withargs_t)spl_image->entry_point; // 获取U-Boot加载地址
    |->set_boot_device(boot_param, aic_get_boot_device()); // 设置启动介质
    |->set_boot_reason(boot_param, aic_get_boot_reason()); // 设置启动原因（冷启动或者热启动）
    |->image_entry(boot_param, cur_tm); // 进入U-Boot执行，并传递一些参数
```

## 7. 签名校验

U-Boot 官方的代码，SPL 支持 FIT image 的签名。如果固件使用其他格式， 需要自行添加相应的校验支持。

### 7.1. FIT Image 签名校验

要实现验证 FIT Image 的签名，需要在配置中打开选项：

- CONFIG_SPL_FIT_SIGNATURE

```
mmc_load_image_raw_sector(); // common/spl/spl_mmc.c
|-> spl_get_load_buffer(-sizeof(*header), bd->blksz);
|-> blk_dread(bd, sector, 1, header);
|-> image_get_magic(header) == FDT_MAGIC // 判断是否为 FIT Image
|-> spl_load_simple_fit(spl_image, &load, sector, header); // common/spl/spl_fit.c
    |-> info->read(info, sector, sectors, fit);
    |   h_spl_load_read(info, sector, sectors, fit); // common/spl/spl_mmc.c
    |   |-> blk_dread(mmc_get_blk_desc(mmc), sector, count, buf);
    |-> node = spl_fit_get_image_node(fit, images, "loadables", 0);
        |-> spl_load_fit_image(info, sector, fit, base_offset, node,
            |                 spl_image); // common/spl/spl_fit.c
            |-> // 中间加载过程
            |-> fit_image_verify_with_data(fit, node, src, length);
                | // common/image-fit.c
                |-> fit_image_check_sig(fit, noffset, data, size, -1, &err_msg);
                    |  // common/image-sig.c
                    |-> fit_image_setup_verify();
                    |-> fit_image_hash_get_value();
                    |-> info.crypto->verify(&info, &region, 1,
                                            fit_value, fit_value_len);
                        rsa_verify(&info, &region, 1,
                                   fit_value, fit_value_len);
                                   // lib/rsa/rsa-verify.c
```

此处的 rsa-verify 可以对接到硬件 CE，具体可看 `UCLASS_MOD_EXP` 的相关内容。 如果没有硬件加速器的实现，则使用软件进行计算。

### 7.2. AIC Image 签名校验

制作 SD 量产卡时，由于 Updater U-Boot 固件需要使用 AIC Image 格式， 因此 SD 量产卡启动过程中， SPL-Updater 需要解析 AIC Image 格式。

(TODO: 需要修改原本流程，添加 AIC 格式的支持)

Updater U-Boot 在两种情况下会被使用。第一种情况是通过 USB 升级时，Updater U-Boot 通过 BROM 下载到 DRAM，并且由 BROM 执行。第二种情况是将其烧录到 SD 量产卡， 从 SD 卡启动到 Updater U-Boot 进入升级程序。

为了平台的安全，BROM 所执行的程序必须经过安全验证，BROM 只支持 AIC Image 格式的固件，因此这里 Updater U-Boot 必须使用 AIC Image 格式。

## 8. 返回 BROM

在 USB 升级的应用中，主机通过 USB 下载 SPL 到 SRAM，并且由 BROM 跳转执行，SPL 代码对 DDR 初始化结束之后需要返回到 BROM 中继续执行下载其他数据的操作。

这种应用场景中，将返回 BROM 看做是从 BROM 中加载数据，因此返回 BROM 被实现为一个程序加载器。

common/spl/spl_bootrom.c 中通过注册 BOOT_DEVICE_BOOTROM 来实现。

```
SPL_LOAD_IMAGE_METHOD("BOOTROM", 0, BOOT_DEVICE_BOOTROM, spl_return_to_bootrom);
```

具体返回的函数是 `board_return_to_bootrom()` 。

```
board_init_r()    // common/spl/spl.c
|-> board_boot_order()
|   |-> spl_boot_device(); // arch/arm/mach-artinchip/spl.c
|       |-> aic_get_boot_device(); // arch/arm/mach-artinchip/boot_param.c
|           // 从 boot param 中获取启动介质信息，
|           // 此处返回 BD_BOOTROM
|
|-> boot_from_devices(spl_boot_list)
    |-> spl_ll_find_loader()  // 根据boot device找到spl_load_image指针
    |       // 这里可能是各种介质的 load image 函数
    |       // SPL_LOAD_IMAGE_METHOD() 定义的 Loader
    |       // 此处找到的是 BOOT_DEVICE_BOOTROM
    |
    |-> spl_return_to_bootrom();// common/spl/spl_bootrom.c
        |-> board_return_to_bootrom();
            // arch/arm/mach-artinchip/lowlevel_init.S
```

在 [启动参数](../boot_param_1602/index.html#ref-boot-param-1602) 章节描述了 BROM 跳转 SPL 运行时所传递的参数，SPL 在开始运行时已经保存了 BROM 跳转时的所有重要寄存器，因此在 `board_return_to_bootrom()` 可以通过恢复现场，实现返回。