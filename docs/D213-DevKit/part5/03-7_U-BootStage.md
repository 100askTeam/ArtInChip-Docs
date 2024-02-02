---
sidebar_position: 7
---
# U-Boot 阶段

U-Boot 在 Artinchip 平台上承担两个功能角色：

- 引导内核
- 镜像烧录

本章重点描述 U-Boot 这一级引导程序的主要启动流程以及在不同启动介质下的处理。 镜像烧录功能将在 [镜像烧录](../fw_upg/index.html#ref-fw-upgrade) 章节进行描述。

## 1. 前初始化

U-Boot 的前初始化是指执行代码重定位之前的初始化，此时 U-Boot 在 DRAM 的前端空间执行。

前初始化分为两个阶段：

> 1. 芯片架构相关的初始化代码
> 2. 板子相关的前初始化代码

**阶段一：** 芯片架构相关初始化

这个阶段主要是对 CPU 进行了基本的初始化，并且将上一级引导程序传递过来的参数保存起来。 ArtInChip 平台上实现了对应的 `save_boot_params` 处理函数，并且将调用现场的关键寄存器信息保存到 `boot_params_stash` 全局变量中。

```
_start // arch/riscv/cpu/start.S
|-> save_boot_params // arch/riscv/mach-artinchip/lowlevel_init.S
|   // BROM 或者 SPL 跳转到 U-Boot 执行的时候，传递了一些参数，这里首先将这
|   // 些参数保存起来。
|
|-> la  t0, trap_entry // 设置异常处理
|-> li  t1, CONFIG_SYS_INIT_SP_ADDR // 设置初始栈
|-> jal     board_init_f_alloc_reserve
|-> jal harts_early_init
```

后续的程序在需要了解当前的启动介质时，可以从中读取相关的信息。

**阶段二：** 板子相关的前初始化

```
_start // arch/riscv/cpu/start.S
|-> save_boot_params // arch/riscv/mach-artinchip/lowlevel_init.S
|-> ...
|-> la  t5, board_init_f
```

`board_init_f()` 函数内逐个调用初始化函数列表 `init_sequence_f` 中的函数：

```
static const init_fnc_t init_sequence_f[] = {
    setup_mon_len,
#ifdef CONFIG_OF_CONTROL
    fdtdec_setup,
#endif
    initf_malloc,
    log_init,
    initf_bootstage,        /* uses its own timer, so does not need DM */
    setup_spl_handoff,
    initf_console_record,
    arch_cpu_init,          /* basic arch cpu dependent setup */
    mach_cpu_init,          /* SoC/machine dependent CPU setup */
    initf_dm,
    arch_cpu_init_dm,
#if defined(CONFIG_BOARD_EARLY_INIT_F)
    board_early_init_f,
#endif
    env_init,               /* initialize environment */
    init_baud_rate,         /* initialze baudrate settings */
    serial_init,            /* serial communications setup */
    console_init_f,         /* stage 1 init of console */
    display_options,        /* say that we are here */
    display_text_info,      /* show debugging info if required */
    INIT_FUNC_WATCHDOG_INIT
#if defined(CONFIG_MISC_INIT_F)
    misc_init_f,
#endif
    INIT_FUNC_WATCHDOG_RESET
#if defined(CONFIG_SYS_I2C)
    init_func_i2c,
#endif
    announce_dram_init,
    dram_init,              /* configure available RAM banks */
    setup_dest_addr,
    reserve_round_4k,
#ifdef CONFIG_ARM
    reserve_mmu,
#endif
    reserve_video,
    reserve_trace,
    reserve_uboot,
    reserve_malloc,
    reserve_board,
    setup_machine,
    reserve_global_data,
    reserve_fdt,
    reserve_bootstage,
    reserve_bloblist,
    reserve_arch,
    reserve_stacks,
    dram_init_banksize,
    show_dram_config,
    display_new_sp,
#ifdef CONFIG_OF_BOARD_FIXUP
    fix_fdt,
#endif
    INIT_FUNC_WATCHDOG_RESET
    reloc_fdt,
    reloc_bootstage,
    reloc_bloblist,
    setup_reloc,
    NULL,
};
```

由于 DRAM 在 PBP 阶段已经初始化，这里的 `dram_init` 只是初始化 DRAM 驱动， 用于获取 DRAM 基本信息。

DTS 相关的流程可参考 `fdtdec_setup` 和 `initf_dm` ：

```
fdtdec_setup(); // lib/fdtdec.c
|-> gd->fdt_blob = board_fdt_blob_setup(); // lib/fdtdec.c
|   // 对于 U-Boot, DTB 的位置是 _end 开始的位置，此处加载 dtb
|-> fdtdec_prepare_fdt();
    |-> fdt_check_header(gd->fdt_blob);
initf_dm(); // common/board_f.c
|-> dm_init_and_scan(true); // drivers/core/root.c
     |-> dm_init(IS_ENABLED(CONFIG_OF_LIVE)); // drivers/core/root.c
     |-> dm_scan_platdata(pre_reloc_only=true);
     |-> dm_extended_scan_fdt(gd->fdt_blob, pre_reloc_only=true);
     |   |-> dm_scan_fdt(blob, pre_reloc_only);
     |   |   |-> dm_scan_fdt_node(gd->dm_root, blob, 0, true);
     |   |       |-> lists_bind_fdt(parent, offset_to_ofnode(offset), NULL,true);
     |   |           |   // drivers/core/lists.c
     |   |           |   // 此阶段仅处理设置了 "u-boot,dm-pre-reloc" 的并且
     |   |           |   // 对应驱动也是设置了 DM_FLAG_PRE_RELOC 的设备和驱动的绑定
     |   |           |
     |   |           |-> device_bind_with_driver_data(parent, entry, name,id->data,
     |   |               |                            node, &dev);
     |   |               |-> device_bind_common(...)
     |   |                   |   // dev = calloc(1, sizeof(struct udevice));
     |   |                   |   //
     |   |                   |   // dev->platdata = platdata;
     |   |                   |   // dev->driver_data = driver_data;
     |   |                   |   // dev->name = name;
     |   |                   |   // dev->node = node;
     |   |                   |   // dev->parent = parent;
     |   |                   |   // dev->driver = drv;
     |   |                   |   // dev->uclass = uc;
     |   |                   |   // 创建 udevice，并将 driver 挂上
     |   |                   |
     |   |                   |-> uclass_bind_device(dev);
     |   |-> dm_scan_fdt_ofnode_path("/clocks", pre_reloc_only);
     |   |-> dm_scan_fdt_ofnode_path("/firmware", pre_reloc_only);
     |-> dm_scan_other(pre_reloc_only);
```

此阶段并没有对 DTS 中列出的所有设备和驱动进行初始化处理，仅对标记了 “u-boot,dm-pre-reloc” 的设备， 以及驱动中标记了 DM_FLAG_PRE_RELOC 的驱动进行处理，以缩短这个阶段的处理时间。

注意

initf_dm 和 initr_dm 都会搜索一遍 DTB，花费的时间比较多，如果这里能够节省搜索的数量， 对于快速启动会有比较大的帮助。

## 2. 代码重定位

通常内核的代码段放在 DRAM 的开始位置，U-Boot 的代码位置放到 DRAM 的末端。 但是由于不同项目所用的 DRAM 大小不一致，为了方便，将 U-Boot 的链接地址也定义在 DRAM 比较前面的固定位置。在加载 U-Boot 初始化完 DRAM 之后，U-Boot 读取当前平台的 DRAM 大小， 然后在加载 Kernel 之前将自身代码段和数据段等信息重定位到 DRAM 的末端继续运行， 将 DRAM 的前端空间让给 Kernel。

```
_start // arch/riscv/cpu/start.S
|-> save_boot_params // arch/riscv/mach-artinchip/lowlevel_init.S
|-> ...
|-> board_init_f(); // common/board_f.c
    |-> setup_reloc(); // common/board_f.c
    |-> jump_to_copy(); // common/board_f.c
        |-> relocate_code(); // arch/riscv/cpu/start.S
            |       // RISCV 上的实现，relocate 之后，函数不返回，直接跳转到 board_init_r 执行
            |-> invalidate_icache_all()
            |-> flush_dcache_all()
            |-> board_init_r();
```

重定位的具体位置 `gd->relocaddr` 的计算可查看 `common/board_f.c` ：

```
static const init_fnc_t init_sequence_f[] = {
    ...
    setup_dest_addr,
    reserve_round_4k,
    reserve_mmu,
    reserve_video,
    reserve_trace,
    reserve_uboot,
    ...
    setup_reloc,
    NULL,
};
```

最终 `gd->reloc_off` 的计算，在 `setup_reloc` 中完成。

注解

如果 CONFIG_SYS_TEXT_BASE == relocation address，则不需要做重定位的工作， 可以节省启动时间。这个需要根据当前项目的 DRAM 大小进行计算 CONFIG_SYS_TEXT_BASE 的值。

## 3. 后初始化

后初始化阶段是代码重定位之后执行的初始化流程，由下面的 `board_init_r` 开始。

```
_start // arch/riscv/cpu/start.S
|-> save_boot_params // arch/riscv/mach-artinchip/lowlevel_init.S
|-> ...
|-> board_init_f(); // common/board_f.c
    |-> setup_reloc(); // common/board_f.c
    |-> jump_to_copy(); // common/board_f.c
        |-> relocate_code(); // arch/riscv/cpu/start.S
            |       // RISCV 上的实现，relocate 之后，函数不返回，直接跳转到 board_init_r 执行
            |-> invalidate_icache_all()
            |-> flush_dcache_all()
            |-> board_init_r();
```

`board_init_r` 函数中逐个执行函数列表 `init_sequence_r` 中的初始化函数。

```
static init_fnc_t init_sequence_r[] = {
    initr_trace,
    initr_reloc,
#ifdef CONFIG_ARM
    initr_caches,
#endif
    initr_reloc_global_data,
    initr_barrier,
    initr_malloc,
    log_init,
    initr_bootstage,    /* Needs malloc() but has its own timer */
    initr_console_record,
#ifdef CONFIG_SYS_NONCACHED_MEMORY
    initr_noncached,
#endif
    bootstage_relocate,
#ifdef CONFIG_OF_LIVE
    initr_of_live,
#endif
#ifdef CONFIG_DM
    initr_dm,
#endif
#if defined(CONFIG_ARM) || defined(CONFIG_NDS32) || defined(CONFIG_RISCV) || \
    defined(CONFIG_SANDBOX)
    board_init,    /* Setup chipselects */
#endif
    stdio_init_tables,
    initr_serial,
    initr_announce,
#if CONFIG_IS_ENABLED(WDT)
    initr_watchdog,
#endif
    INIT_FUNC_WATCHDOG_RESET
#ifdef CONFIG_NEEDS_MANUAL_RELOC
    initr_manual_reloc_cmdtable,
#endif
#ifdef CONFIG_ADDR_MAP
    initr_addr_map,
#endif
#if defined(CONFIG_BOARD_EARLY_INIT_R)
    board_early_init_r,
#endif
    INIT_FUNC_WATCHDOG_RESET
#ifdef CONFIG_POST
    initr_post_backlog,
#endif
    INIT_FUNC_WATCHDOG_RESET
#ifdef CONFIG_ARCH_EARLY_INIT_R
    arch_early_init_r,
#endif
    power_init_board,
#ifdef CONFIG_MTD_NOR_FLASH
    initr_flash,
#endif
    INIT_FUNC_WATCHDOG_RESET
#ifdef CONFIG_CMD_NAND
    initr_nand,
#endif
#ifdef CONFIG_CMD_ONENAND
    initr_onenand,
#endif
#ifdef CONFIG_MMC
    initr_mmc,
#endif
    initr_env,
#ifdef CONFIG_SYS_BOOTPARAMS_LEN
    initr_malloc_bootparams,
#endif
    INIT_FUNC_WATCHDOG_RESET
    initr_secondary_cpu,
#if defined(CONFIG_ID_EEPROM) || defined(CONFIG_SYS_I2C_MAC_OFFSET)
    mac_read_from_eeprom,
#endif
    INIT_FUNC_WATCHDOG_RESET
    stdio_add_devices,
    initr_jumptable,
#ifdef CONFIG_API
    initr_api,
#endif
    console_init_r,        /* fully init console as a device */
#ifdef CONFIG_DISPLAY_BOARDINFO_LATE
    console_announce_r,
    show_board_info,
#endif
#ifdef CONFIG_ARCH_MISC_INIT
    arch_misc_init,        /* miscellaneous arch-dependent init */
#endif
#ifdef CONFIG_MISC_INIT_R
    misc_init_r,        /* miscellaneous platform-dependent init */
#endif
    INIT_FUNC_WATCHDOG_RESET
    interrupt_init,
#ifdef CONFIG_ARM
    initr_enable_interrupts,
#endif
#ifdef CONFIG_CMD_NET
    initr_ethaddr,
#endif
#ifdef CONFIG_BOARD_LATE_INIT
    board_late_init,
#endif
#ifdef CONFIG_CMD_NET
    INIT_FUNC_WATCHDOG_RESET
    initr_net,
#endif
#ifdef CONFIG_POST
    initr_post,
#endif
#if defined(CONFIG_PRAM)
    initr_mem,
#endif
    run_main_loop,
};
```

其中下面几个重要的阶段需要留意。

```
board_init_r();
|
|-> initr_dm  // 初始化设备驱动，这次扫描所有的设备，并且绑定到匹配的驱动上
|   |-> dm_init_and_scan(false);
|       |-> dm_init(IS_ENABLED(CONFIG_OF_LIVE)); // drivers/core/root.c
|       |-> dm_scan_platdata(pre_reloc_only=true);
|       |-> dm_extended_scan_fdt(gd->fdt_blob, pre_reloc_only=true);
|       |-> dm_scan_other(pre_reloc_only);
|
|-> initr_flash // SPI NOR 的初始化
|   |-> flash_size = flash_init();
|
|-> initr_nand  // RAW NAND 的初始化
|-> initr_mmc
|   |-> mmc_initialize(gd->bd);
|
|-> initr_env
|   |-> env_relocate(); // env/common.c
|       |-> env_load(); // env/env.c
|
|-> stdio_add_devices();
|
|-> board_late_init(); // board/artinchip/d211/d211.c
    |-> setup_boot_device();
        |-> env_set("boot_device", "mmc");
```

**Cache Enable**

RISCV 上，U-Boot 运行在 S-Mode，没有权限开关 Cache，因此只能由 SPL 来开关 Cache。

**Device Model**

在后初始化阶段，会扫描所有的设备和驱动，并且将设备和对应的驱动进行绑定。

**存储介质的初始化**

NOR/NAND/MMC 等存储介质的驱动在这个阶段开始初始化。

**环境变量加载**

环境变量中保存着 U-Boot 的配置，以及相关的启动信息，此时需要从对应的存储介质中加载使用。

**显示驱动**

如果项目使能了 U-Boot 阶段的显示，此时在 `stdio_add_devices()` 中对显示和按键驱动进行初始化。

**其他配置**

在 `board_late_init()` 中，将从 SPL 传递过来的启动设备信息，更新到环境变量中，使得后续的启动脚本 可以获知当前的启动设备信息。

## 4. 环境变量加载如前面所述，环境变量的处理有两个阶段：

> 1. 环境变量初始
> 2. 环境变量读取

如下面的调用流程， `env_init()` 在 `board_init_f()` 阶段执行，但具体的加载过程 在 `board_init_r()` 阶段执行。

```
reset // arch/riscv/cpu/start.S
|-> save_boot_params // arch/riscv/mach-artinchip/lowlevel_init.S
|-> ...
|-> board_init_f(); // common/board_f.c
    |-> setup_reloc(); // common/board_f.c
    |-> jump_to_copy(); // common/board_f.c
        |-> relocate_code(); // arch/riscv/cpu/start.S
            |-> invalidate_icache_all()
            |-> flush_dcache_all()
            |-> board_init_r();
                |   // 逐个调用 init_sequence_r 里面的函数，其中包括 initr_env
                |-> initr_env(); // common/board_r.c
                    |-> should_load_env(void);// common/board_r.c
                    |   // 由于没有在 DTS 中进行配置，总是返回 1
                    |   // fdtdec_get_config_int(gd->fdt_blob, "load-environment", 1);
                    |-> env_relocate(); // env/common.c
                        |-> env_load(); // env/env.c
```

U-Boot 支持在多种存储介质中保存环境变量，并且提供了一个插拔式的机制，用于实现从 不同的存储介质中加载环境变量内容。

在添加新的环境变量加载器时，只需要实现对应存储介质的 `load` 和 `save` 函数， 然后通过宏 `U_BOOT_ENV_LOCATION` 将对应的信息添加到 `.u_boot_list_2` 链接段中。 比如下面的定义，将生成 `.u_boot_list_2_env_driver_2_spinand` 信息。

```
U_BOOT_ENV_LOCATION(spinand) = {
    .location   = ENVL_SPINAND,
    ENV_NAME("SPINAND")
    .load       = env_spinand_load,
#if defined(CMD_SAVEENV)
    .save       = env_save_ptr(env_spinand_save),
#endif
};
```

`env_driver_lookup()` 函数首先通过检查当前的启动设备，然后从 `.u_boot_list_2` 段中查找对应启动设备的 ENV 加载驱动，最后调用对应的驱动读取并导入环境变量内容。

```
env_load(); // env/env.c
|-> env_driver_lookup(ENVOP_LOAD, prio);
|   |-> loc = env_get_location(); // board/artinchip/d211/env_location.c
|   |   |-> bd = aic_get_boot_device(); // 获取当前的启动设备
|   |
|   |-> _env_driver_lookup(loc);
|       |-> drv = ll_entry_start();
|       // 查找指定存储介质的 env 加载驱动
|
|-> drv->load();
        // 此处调用个存储介质的对应函数
        env_ram_load(); // board/artinchip/d211/env_location.c
        env_spinand_load(); // env/spinand.c
        env_sf_load(); // env/sf.c
        env_mmc_load(); // env/mmc.c
```

具体各种存储介质中，环境变量保存的位置可参考 [存储介质上的保存](../env_setting/index.html#env-store-setting) 。

## 5. 命令行阶段

`board_init_r` 函数最后进入 `run_main_loop` 执行 Autoboot 命令或者进入控制台。

```
board_init_r(); // common/board_r.c
|-> run_main_loop(); // common/board_r.c
    |-> main_loop(); // common/main.c
        |-> cli_init();    // 初始化 command line
        |   |-->u_boot_hush_start();
        |
        |-> bootdelay_process(); // common/autoboot.c
        |   | // 获取boot delay时间参数，从env中获取bootcmd参数
        |   |-> s = env_get("bootcmd");
        |           // 获取 bootcmd 的内容
        |-> cli_process_fdt(); // common/cli.c
        |   // 尝试从 DTS 中获取 bootcmd 参数，DTS 的配置优先级高于 ENV
        |-> autoboot_command(); // common/autoboot.c
            |-> abortboot();
            |   // 检查是否需要终止启动
            |
            |-> run_command_list(); // common/cli.c
                // 执行 bootcmd 的内容，一般是执行脚本
```

**倒计时读秒**

进入命令行的主循环之后，U-Boot 首先获取 boot delay 的时间设置。Boot delay 的时间 是指 U-Boot 在执行启动命令之前的倒计时读秒的时间，该时间在 ArtInChip 平台上在环境变量 env.txt 中进行配置:

> - `bootdelay=3`

如果不需要倒计时读秒，可以将该设置改为 0 。

**启动命令**

U-Boot 检查并且默认执行 `bootcmd` 所指定的启动命令。该启动命令可以在两个地方设置：

> - 环境变量中设置
> - DTS 中设置

ArtInChip 平台上通过环境变量 env.txt 设置，同行是一段启动脚本。

**按键中断**

进入 `autoboot_command` 在执行启动命令之前，U-Boot 还会检查用户是否有通过串口 按键中断启动流程。该检查无论 bootdelay 时间是否为 0 都会进行。