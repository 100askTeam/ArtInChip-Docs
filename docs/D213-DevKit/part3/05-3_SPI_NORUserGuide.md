---
sidebar_position: 10
---
# SPI NOR 使用指南

## 1. 配置指南

### 1.1. 驱动层次关系

SPI NOR 属于 SPI 的从设备，在内核中相关驱动通过 `SPI MEM` 对接到 SPI子系统。 在 SPI 控制器初始化时，SPI 驱动会检查该控制器下是否有挂载的 SPI NOR，有则添加到 SPI BUS 中。

```
aic_spi_probe(dev);
|-> spi_register_controller(ctlr);/spi_register_master(ctlr);// spi_register_master 是一个宏
    |-> of_register_spi_devices(ctlr);
        |-> spi = of_register_spi_device(ctlr, nc);
            |-> spi = spi_alloc_device(ctlr);
            |-> of_spi_parse_dt(ctlr, spi, nc);
            |-> rc = spi_add_device(spi);
                // 将 SPI device 添加到 SPI 总线 spi_bus_type 中
```

在调用 `spi_add_device` 的过程中，会查找和匹配对应设备的驱动程序（如果这时候对 应的驱动程序还没有被添加到系统中，则在这里先将设备添加到 Bus，等到对应驱动程序 被添加进来时，再进行匹配。）

| 模块  | 驱动源码路径                           |
| ----- | -------------------------------------- |
| Linux | source/linux-5.10/drivers/mtd/spi-nor/ |
| Uboot | source/uboot-2021.10/drivers/mtd/spi/  |

### 1.2. 修改 DTS

要在实际项目中使用 SPI NOR 设备，还需要修改 DTS 配置。

`board.dts` 应在具体的 SPI 控制器下添加 `jedec,spi-nor` 设备。

```
&spi0 {
    pinctrl-names = "default";
    pinctrl-0 = <&spi0_pins_a>;
    status = "okay";
    spi-max-frequency = <100000000>;
    spi-flash@0 {
        #address-cells = <1>;
        #size-cells = <1>;
        compatible = "jedec,spi-nor";    //固定值，所有基于 dts 的 SPI NOR 均声明此
        spi-max-frequency = <100000000>; //最大频率，固定值
        spi-tx-bus-width = <4>;
        spi-rx-bus-width = <4>;
        reg = <0>;                       //固定值，一般不需修改
        status = "okay";
    };
};
```

同时还需在 `board-u-boot.dtsi` 文件中，将该设备标记为 `u-boot,dm-pre-reloc` ，不然 SPL 无法识别和使用。

```
&spi0 {
    u-boot,dm-pre-reloc;
    spi-flash@0 {
        u-boot,dm-pre-reloc;
    };
};
```

### 1.3. Bus Width

宽总线的 SPI NOR 芯片可以工作在窄总线下，如4线的 SPI NOR 配置为1线也可以工作，但读写速度损失， 但窄总线设备无法工作在宽总线模式下，因此 spi-tx-bus-width 要正确设置

- 标准 SPI NOR 配置为1
- Dual SPI NOR 配置为2
- Quad SPI NOR 配置为4

## 2. U-Boot 移植

SPI NOR 要工作既需要 SOC 端 SPI 模块的驱动能力，也需要对 SPI NOR 模块的正确配置，本章阐述如何进行 SPI NOR 器件的移植工作，以 `CFX` 的 `GM25Q128A` 和 `FudanMicro` 的 `FM25Q128` 为例

U-Boot 中 对不同厂家的 SPI NOR 器件的管理集成度很高， 主要代码在 source/uboot-2021.10/drivers/mtd/spi/spi-nor-ids.c 中，添加一款新厂家的新器件需要经过如下步骤

### 2.1. Kconfig

添加厂家的宏定义

```
config SPI_FLASH_FMSH
    bool "FudanMicro SPI flash support"
    help
      Add support for various FMSH (Shanghai Fudan Microelectronics Group Company)
      SPI flash chips (FM25xxx).

config SPI_FLASH_CFX
    bool "CFX SPI flash support"
    help
      Add support for various CFX (Zhuhai ChuangFeiXin-Technology)
      SPI flash chips (GM25xxx).
```

### 2.2. spi-nor-ids

在 spi-nor-ids.c 的 spi_nor_ids 结构中添加 FMHS 和 CFX 的相关器件的支持

```
#ifdef CONFIG_SPI_FLASH_FMSH
    /* Shanghai Fudan Microelectronics Group Company */
    { INFO("FM25Q128", 0xa14017, 0, 64 * 1024, 256, SECT_4K | SPI_NOR_DUAL_READ | SPI_NOR_QUAD_READ) },
    { INFO("FM25Q64", 0xa14018, 0, 64 * 1024, 128, SECT_4K | SPI_NOR_DUAL_READ | SPI_NOR_QUAD_READ) },
#endif
#ifdef CONFIG_SPI_FLASH_CFX
    /* Zhuhai ChuangFeiXin Technology */
    { INFO("GM25Q128A", 0x1c4018, 0, 64 * 1024, 256, SECT_4K | SPI_NOR_DUAL_READ | SPI_NOR_QUAD_READ) },
#endif
```

### 2.3. flash_info

flash_info 数据结构主要用来描述某一颗 SPI NOR 的参数，通过 INFO 宏来设置，其详细结构为：

```
struct flash_info {
    char    *name;                  //器件名称，一般用器件编号替代
    u8      id[SPI_NOR_MAX_ID_LEN]; //JEDEC 授权的器件ID
    u8      id_len;                 //ID 长度，填0，自动计算
    unsigned    sector_size;        //sector size，现在的意义已经改变
    u16     n_sectors;              //sector 数目，通过 flash size 和 sector size 计算出来
    u16     page_size;              //页大小， INFO 宏固定为256
    u16     addr_width;             //board.dts 中配置
    u32     flags;                  //功能标识
```

#### 2.3.1. JEDEC ID

和 SPI NAND 不同， SPI NOR 的 ID 包含 Manufacture ID 和 Device ID 等多项内容，一般为24位，描述方式为

| 阈值        | 名称           | 示例 | 标记方式   |
| ----------- | -------------- | ---- | ---------- |
| MID7 - IDF0 | Maunfacture ID | 0xa1 | JEDEC 分配 |
| D15 - D8    | Memory Type    | 0x40 | 0x9F 命令  |
| D7 - D0     | Memory Desity  | 0x17 | 0x9F 命令  |

不同厂家在数据手册中描述方法不一样，但现代的 SPI NOR 的 MID 一般通过 “Maunfacture/MID” 等字段标注，Device ID的（D15 - D0） 一般通过 0x9F 命令标注， 因此在数据手册中通过搜索 9F 一般能构造出 JEDEC ID， 如下图所示

- 0xC84018

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/id-1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/id-1-170669560000835.png)

- 0xC22018

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/id-2.png](https://photos.100ask.net/artinchip-docs/d213-devkit/id-2-170669560670437.png)

- 0xA14017

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/id-3.png](https://photos.100ask.net/artinchip-docs/d213-devkit/id-3-170669561586339.png)

#### 2.3.2. sector_size

Sector Size 是个历史产物，不管是文件系统还是厂家的器件规格都开始对外提供基于 Block 的接口，但在名称上还保留了 Sector 的名称，而驱动中则已经完全切换到 Block 的逻辑

Sector Size 主要定义的是擦除参数，一般的器件提供三种擦除操作

| 操作方式             | 命令 | 擦除大小 | 备注                                 |
| -------------------- | ---- | -------- | ------------------------------------ |
| Sector Erase( SE)    | 0x20 | 4K       | 基础能力，主要做兼容，不做主力       |
| 32K Block Erase (BE) | 0x52 | 32K      | 不再使用，和 BE-64 成对              |
| 64K Block Erase (BE) | 0xD8 | 64K      | 大部分都支持，如果不支持则必须支持SE |

在驱动中，Sector_Size 描述的实际是 BE-64 的参数，而 BE-64 要求的 size 又是固定的 64K，因此该参数的设置原则是：

- 在数据手册中，如果支持 64K Block Erase (0xD8）命令，则设置为 ‘64 * 1024’
- 在数据手册中, 如果不支持 64K Block Erase (0xD8）命令，则设置为 ‘4 * 1024’

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/se.png](https://photos.100ask.net/artinchip-docs/d213-devkit/se-170669563988241.png)

#### 2.3.3. n_sectors

Sector (Block) 数目通过计算得到， 计算公式为 (（flash size）/ sector size)，需要注意不同参数使用 Byte（B） 还是 bit（b） 描述

- gd25q128： 128Mb / 64KB = 256
- FM25Q128: 128Mb / 64KB = 256
- FM25Q64: 64Mb / 64KB = 128

#### 2.3.4. flags

flags用来设置额外的功能标志

- SECT_4K 建议均设置，此功能用来兼容 Sector Erase( SE) 的支持，在一些特殊情况下可以继续工作
- 如果支持 0xBB 命令，则打开 SPI_NOR_DUAL_READ
- 如果支持 0xEB 命令，则打开 SPI_NOR_QUAD_READ

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/qspi.png](https://photos.100ask.net/artinchip-docs/d213-devkit/qspi-170669565585243.png)

- 如果有 Status Register，则打开 USE_FSR，是一种状态呈现，非必须

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/fsr.png](https://photos.100ask.net/artinchip-docs/d213-devkit/fsr-170669566099045.png)

### 2.4. 总结

- U-Boot 中移植一款 SPI NOR，最重要的是 JEDEC ID，通过在数据手册中查找 0x9F 命令获得
- 其他的参数都可以默认设置，INFO(0xa14017, 0, 64 * 1024, n_sectors, SECT_4K | SPI_NOR_DUAL_READ | SPI_NOR_QUAD_READ)

## 3. Linux 移植

SPI NOR 驱动 Linux 和 U-Boot 的驱动不一样，Linux 中驱动更复杂一些，本章阐述如何在 Linux 中进行 SPI NOR 器件的移植工作，以 `Gigadevice` 的 `gd25q128` 和 `FudanMicro` 的 `FM25Q128` 为例

### 3.1. 文件准备

相较于 SPI NAND 器件， SPI NOR 的接口更加标准，但为了统一管理的方便，还是会为某一个公司创建一个文件进行管理，如果该公司的文件已经存在，则直接添加新器件支持即可

- 在source/linux-5.10/drivers/mtd/spi-nor/ 下建相应公司的标识的文件，如 fmsh.c cfx.c
- 在Makefile中添加该文件的编译： spi-nor-objs += fmsh.o
- 在source/linux-5.10/drivers/mtd/spi-nor/core.h 中声明 extern const struct spi_nor_manufacturer spi_nor_fmsh;

### 3.2. 驱动索引

内核中所支持的 SPI NOR 设备通过两级列表进行设置。

首先检查 `source/linux-5.10/drivers/mtd/spi-nor/core.c` 中的 `manufacturers`, 查看新设备的厂商是否在列表之中：

```
static const struct spi_nor_manufacturer *manufacturers[] = {
    &spi_nor_atmel,
    &spi_nor_catalyst,
    &spi_nor_eon,
    &spi_nor_esmt,
    &spi_nor_everspin,
    &spi_nor_fujitsu,
    &spi_nor_gigadevice,
    &spi_nor_intel,
    &spi_nor_issi,
    &spi_nor_macronix,
    &spi_nor_micron,
    &spi_nor_st,
    &spi_nor_spansion,
    &spi_nor_sst,
    &spi_nor_winbond,
    &spi_nor_xilinx,
    &spi_nor_xmc,
    &spi_nor_boya,
};
```

再检查具体的设备厂商文件，具体的型号是否在列表之中（ 以gigadevice 为例）:

```
static const struct flash_info gigadevice_parts[] = {
    ......
   { "gd25q128", INFO(0xc84018, 0, 64 * 1024, 256,
                       SECT_4K | SPI_NOR_DUAL_READ | SPI_NOR_QUAD_READ |
                       SPI_NOR_HAS_LOCK | SPI_NOR_HAS_TB) },
    ......
};
```

此处检查，需要查找新设备的 Datasheet，找到该设备的 Manufacture 和 Device ID，并查看该 ID 是否出现在列表中。 例如此处为 `0xc84018` ，其中 Manufacture ID = `0xc8`, Device ID ID[15~8] = `0x40`, Device ID[7~0] = `0x18` 。

### 3.3. spi_nor_manufacturer

该结构为第一级索引，用来描述器件厂家的信息

SPI NOR 的接口和操作命令很统一，基本没有需要特殊处理的命令

```
const struct spi_nor_manufacturer spi_nor_fmsh = {
    .name = "FudanMicro",                   //厂家名字标识
    .parts = fmsh_parts,                    //本驱动支持的器件
    .nparts = ARRAY_SIZE(fmsh_parts),       //支持的器件的个数
};
```

### 3.4. flash_info

虽然和 U-Boot 的代码结构不同，但 flash_info 的描述基本类似，详细信息参考 U-Boot 的章节: [flash_info](uboot_port.html#ref-to-spinor-flash-info)

### 3.5. id_table

除了使用 dts 的 .compatible = “jedec,spi-nor” 统一匹配所有的 SPI NOR 外，驱动还兼容使用非标准 dts 的使用方式， 即直接在 dts 文件中描述要使用的 SPI NOR 的型号， 但这会造成固件和器件的紧耦合，不推荐使用

```
static struct spi_mem_driver spi_nor_driver = {
    .spidrv = {
            .driver = {
                    .name = "spi-nor",
                    .of_match_table = spi_nor_of_table,
            },
            .id_table = spi_nor_dev_ids,
    },

static const struct spi_device_id spi_nor_dev_ids[] = {

    /*
     * Entries not used in DTs that should be safe to drop after replacing
     * them with "spi-nor" in platform data.
     */
    {"s25sl064a"},  {"w25x16"},     {"m25p10"},     {"m25px64"},

    /*
     * Entries that were used in DTs without "jedec,spi-nor" fallback and
     * should be kept for backward compatibility.
     */
    {"at25df321a"}, {"at25df641"},  {"at26df081a"},
    {"mx25l4005a"}, {"mx25l1606e"}, {"mx25l6405d"}, {"mx25l12805d"},
    {"mx25l25635e"},{"mx66l51235l"},
    {"n25q064"},    {"n25q128a11"}, {"n25q128a13"}, {"n25q512a"},
    {"s25fl256s1"}, {"s25fl512s"},  {"s25sl12801"}, {"s25fl008k"},
    {"s25fl064k"},
```

### 3.6. 总结

- 移植一款 SPI NOR，最重要的是 JEDEC ID，通过在数据手册中查找 0x9F 命令获得
- 其他的参数都可以默认设置，INFO(0xa14017, 0, 64 * 1024, n_sectors, SECT_4K | SPI_NOR_DUAL_READ | SPI_NOR_QUAD_READ)
- 推荐使用标准 dts 进行 SPI NOR 的兼容