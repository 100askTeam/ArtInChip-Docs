---
sidebar_position: 9
---
# SPI NAND 使用指南

## 1. 配置指南

### 1.1. 驱动层次关系

SPI NAND 属于 SPI 的从设备，在内核中相关驱动通过 `SPI MEM` 对接到 SPI 子系统。 在 SPI 控制器初始化时，SPI 驱动会检查该控制器下是否有挂载的 SPI NAND，有则添加到 SPI BUS 中。

```
aic_spi_probe(dev);
|-> spi_register_controller(ctlr);/spi_register_master(ctlr);/ spi_register_master 是一个宏
    |-> of_register_spi_devices(ctlr);
        |-> spi = of_register_spi_device(ctlr, nc);
            |-> spi = spi_alloc_device(ctlr);
            |-> of_spi_parse_dt(ctlr, spi, nc);
            |-> rc = spi_add_device(spi);
                // 将 SPI device 添加到 SPI 总线 spi_bus_type 中
```

在调用 `spi_add_device` 的过程中，会查找和匹配对应设备的驱动程序（如果这时候对 应的驱动程序还没有被添加到系统中，则在这里先将设备添加到 Bus，等到对应驱动程序 被添加进来时，再进行匹配。）

| 模块     | 驱动源码路径                            |
| -------- | --------------------------------------- |
| SPI NAND | source/linux-5.10/drivers/mtd/nand/spi/ |

### 1.2. 修改 DTS

要在实际项目中使用 SPI NAND 设备，还需要修改 DTS 配置。

`board.dts` 应在具体的 SPI 控制器下添加 `spi-nand` 设备。

```
&spi1 {
    pinctrl-names = "default";
    pinctrl-0 = <&spi1_pins_a>;
    status = "okay";
    spi-max-frequency = <100000000>;
    spi-flash@0 {
        #address-cells = <1>;
        #size-cells = <1>;
        compatible = "spi-nand";         //固定值，所有 SPINand 驱动均声明此
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
&spi1 {
    u-boot,dm-pre-reloc;
    spi-flash@0 {
        u-boot,dm-pre-reloc;
    };
};
```

### 1.3. Bus Width

宽总线的 SPI NAND 芯片可以工作在窄总线下，如4线的 SPI NAND 配置为1线也可以工作，但读写速度损失， 但窄总线设备无法工作在宽总线模式下，因此 spi-tx-bus-width 要正确设置

- 标准 SPI NAND 配置为1
- Dual SPI NAND 配置为2
- Quad SPI NAND 配置为4

## 2. 移植指南

SPI NAND 要工作既需要 SOC 端 SPI 模块的驱动能力，也需要对 SPI NAND 模块的正确配置，本章阐述如何进行 SPI NAND 器件的移植工作，以 `FudanMicro` 的 `FM25S01A` 和 `Foresee` 的 `F35SQA002G` 为例

注解

SPI NAND 在 U-Boot 和 Kernel 中的实现逻辑类似，文件路径和内容基本一致，本文以 Kernel 中的移植为例

### 2.1. 文件准备

一般情况下，某一个公司的 SPI NAND 的操作接口是类似，因此会为某一个公司创建一个文件进行管理，如果该公司的文件已经存在，则直接添加新器件支持即可

- 在source/linux-5.10/drivers/mtd/nand/spi 下建相应公司的标识的文件，如 fmsh.c foresee.c
- 在Makefile中添加该文件的编译 spinand-objs := core.o fmsh.o foresee.o …
- 在include/linux/mtd/spinand.h 中声明 extern const struct spinand_manufacturer fmsh_spinand_manufacturer;

### 2.2. 驱动索引

不同于传统驱动通过 board.dts 进行设备和驱动的关联，内核中所支持的 SPI NAND 设备和驱动的关联关系通过两级列表进行设置。

- 首先检查 source/linux-5.10/drivers/mtd/nand/spi/core.c 中的 spinand_manufacturers, 查看新设备的厂商是否在列表之中：

```
static const struct spinand_manufacturer *spinand_manufacturers[] = {
    &gigadevice_spinand_manufacturer,
    &macronix_spinand_manufacturer,
    &micron_spinand_manufacturer,
    &paragon_spinand_manufacturer,
    &toshiba_spinand_manufacturer,
    &winbond_spinand_manufacturer,
    &fmsh_spinand_manufacturer,
    &foresee_spinand_manufacturer,
};
```

- 再检查具体的设备厂商文件，具体的型号是否在列表之中（ 以 FudanMicro 为例）:

```
static const struct spinand_info fmsh_spinand_table[] = {
    SPINAND_INFO("FM25S01A",
        SPINAND_ID(SPINAND_READID_METHOD_OPCODE_DUMMY, 0xE4),
        NAND_MEMORG(1, 2048, 64, 64, 1024, 20, 1, 1, 1),
        NAND_ECCREQ(1, 512),
        SPINAND_INFO_OP_VARIANTS(&read_cache_variants,
                        &write_cache_variants,
                        &update_cache_variants),
        SPINAND_HAS_QE_BIT,
        SPINAND_ECCINFO(&fm25s01_ooblayout,
                        fm25s01_ecc_get_status)),
};
```

### 2.3. spinand_manufacturer

该结构为第一级索引，用来描述器件厂家的信息

SPI NAND 的接口和操作命令基本上很统一，少有需要特殊处理的命令，但驱动上为了更好的兼容性，还是预留了一些接口

```
const struct spinand_manufacturer winbond_spinand_manufacturer = {
        .id = SPINAND_MFR_FMSH,             //厂家的ID，即 MID
        .name = "FudanMicro",               //厂家名字标识
        .chips = fmsh_spinand_table,        //本驱动支持的器件
        .nchips = ARRAY_SIZE(fmsh_spinand_table), // 支持的器件的个数
        .ops = &fmsh_spinand_manuf_ops,      // 本公司的器件 私有操作接口
};

struct spinand_manufacturer_ops {
        int (*init)(struct spinand_device *spinand);  //初始化接口，如果没有特殊操作，可以为空
        void (*cleanup)(struct spinand_device *spinand); //清理接口，如果没有特殊操作，可以为空
};
```

对 `FudanMicro` 和 `Foresee` 来讲，他们没有特殊的初始化接口， 因此预留该两个接口为空

#### 2.3.1. MID & DID

- Manufacture ID，厂商的唯一标识， 一般在数据手册文档中搜 Manufacture ID 或者 MID 即可获得
- Device ID：器件的唯一标识, 一般在数据手册文档中搜 Device ID 或者 DID 即可获得

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/mid-did.png](https://photos.100ask.net/artinchip-docs/d213-devkit/mid-did-170669532264119.png)

```
#define SPINAND_MFR_FMSH                0xA1
#define SPINAND_MFR_FORESEE             0xCD
```

### 2.4. xxx_spinand_table

该数据结构为第二级索引，描述厂商的系列器件信息，是 SPI NAND 驱动的核心，因为 SPI NAND 的操作接口一般都比较标准，因此此处的接口都是固定的，差别的是参数，而参数主要由 SPINAND_INFO 描述

```
static const struct spinand_info foresee_spinand_table[] = {
    SPINAND_INFO("F35SQA002G",
        SPINAND_ID(SPINAND_READID_METHOD_OPCODE_DUMMY, 0x72),
        NAND_MEMORG(1, 2048, 64, 64, 2048, 40, 1, 1, 1),
        NAND_ECCREQ(1, 528),
        SPINAND_INFO_OP_VARIANTS(&read_cache_variants,
                    &write_cache_variants,
                    &update_cache_variants),
        SPINAND_HAS_QE_BIT,
        SPINAND_ECCINFO(&f35sqa_ooblayout,
                    f35sqa_ecc_get_status)),
};
```

#### 2.4.1. SPINAND_INFO

```
#define SPINAND_INFO(__model, __id, __memorg, __eccreq, __op_variants,      \
             __flags, ...)
{
    .model = __model,       // 对应器件型号，描述字符，不进行具体匹配
    .devid = __id,          // 对应器件 DID（DeviceID），是该器件的唯一标识
    .memorg = __memorg,     // 器件存储结构
    .eccreq = __eccreq,     // 请求ECC的参数
    .op_variants = __op_variants,   // 读写函数操作集合地址
    .flags = __flags,       // 功能标识
    __VA_ARGS__
}
```

#### 2.4.2. NAND_MEMORG

芯片存储结构 `memorg` 也是该芯片的特色参数, 通过 NAND_MEMORG 结构描述，一般器件的数据手册会在文章的开始进行结构的描述

```
#define NAND_MEMORG(bpc, ps, os, ppe, epl, mbb, ppl, lpt, nt)
    {
            .bits_per_cell = (bpc),         // Cell 是 NAND 的最小单元，一般只能存储 1bit，少有其他值得
            .pagesize = (ps),               // 页大小，大部分的器件的页通过（N + Mbytes）的方式描述，N 为页大小，M 为 oob
            .oobsize = (os),                //界外大小，一般用于存放ECC校验数据或其它数据，和pagesize 共同描述
            .pages_per_eraseblock = (ppe),  // 一个擦除块有多少个页
            .eraseblocks_per_lun = (epl),   //  一个 lun（die）有多少个擦除块,1Gb/(64 x 2048 x 8) = 1024
            .max_bad_eraseblocks_per_lun = (mbb), //器件出厂的最大坏块数，一般在数据手册中通过 bad blocks 查找到
            .planes_per_lun = (ppl),        //一般设置为 1，单 die
            .luns_per_target = (lpt),       //一般设置为 1
            .ntargets = (nt),               //一般设置为 1
    }
```

##### 2.4.2.1. FM25S01A

以 `FM25S01A` 为例，配置的参数为 NAND_MEMORG(1, 2048, 64, 64, 1024, 20, 1, 1, 1)

- single cell， 则 bpc 设置为 1
- Page size： 2048 + 64 bytes， 则 pagesize = 2048， oobsize = 64
- Block size： 64 pages， 则 pages_per_eraseblock = 64
- eraseblocks_per_lun 通过计算所得，该器件容量为 1Gb，一个 block 的容量为 （64 pages x 2048 bytes）= 128KB，则 1Gb / 128KB = 1024, 注意 bit 和 byte 的单位
- max_bad_eraseblocks_per_lun：0014h (16进制) = 20（十进制）
- ppl，lpt，nt 描述的是该器件中有几个单元，大部分为 1，lun 对应器件上的 die，即有几个晶圆

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/FM25S01A-1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/FM25S01A-1-170669538479321.png)

##### 2.4.2.2. F35SQA002G

以 `F35SQA002G` 为例，配置的参数为 NAND_MEMORG(1, 2048, 64, 64, 2048, 40, 1, 1, 1)

- cell 未明确， bpc 设置为 1
- Page size： 2k + 64 bytes， 则 pagesize = 2048， oobsize = 64
- Block size： 64 pages， 则 pages_per_eraseblock = 64
- eraseblocks_per_lun 通过计算所得，该器件容量为 2Gb（256MB），一个 block 的容量为 （64 pages x 2048 bytes）= 128KB，则 256M / 128KB = 2048
- max_bad_eraseblocks_per_lun：0028h (16进制) = 40 （十进制）
- ppl，lpt，nt 描述的是该器件中有几个单元，大部分为 1，lun 对应器件上的 die，即有几个晶圆

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/F35SQA-1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/F35SQA-1-170669539769123.png)AND_ECCREQ

ECC： Error Correcting Code， NAND_ECCREQ 用来描述每 stp bytes 有多少位的内部 ECC，一般通过搜 ``ECC``` 获得， 如上图所示

- FM25S01A 为 NAND_ECCREQ(1, 512)
- F35SQA002G 为 NAND_ECCREQ(1, 528)

```
#define NAND_ECCREQ(str, stp) { .strength = (str), .step_size = (stp) }
```

#### 2.4.4. SPINAND_INFO_OP_VARIANTS

该结构针对不同的总线宽度，设置不同的 cache 操作接口，分为 read， write， update，一般差别在 read 上

```
#define SPINAND_INFO_OP_VARIANTS(__read, __write, __update)         \
{                                                               \
        .read_cache = __read,                                   \
        .write_cache = __write,                                 \
        .update_cache = __update,                               \
}
```

##### 2.4.4.1. read_cache_variants

```
static SPINAND_OP_VARIANTS(read_cache_variants,
        SPINAND_PAGE_READ_FROM_CACHE_QUADIO_OP(0, 1, NULL, 0),   //command id：0xeb
        SPINAND_PAGE_READ_FROM_CACHE_X4_OP(0, 1, NULL, 0),      //command id：0x6b
        SPINAND_PAGE_READ_FROM_CACHE_DUALIO_OP(0, 1, NULL, 0),  //command id：0xbb
        SPINAND_PAGE_READ_FROM_CACHE_X2_OP(0, 1, NULL, 0),      //command id：0x3b
        SPINAND_PAGE_READ_FROM_CACHE_OP(true, 0, 1, NULL, 0),   //command id：0x0b
        SPINAND_PAGE_READ_FROM_CACHE_OP(false, 0, 1, NULL, 0)); //command id：0x03
```

在数据手册中搜索 commands 或者 command set获得 command 列表来设置

**SPINAND_PAGE_READ_FROM_CACHE_QUADIO_OP(0, 1, NULL, 0)**

- 第一个参数是地址，将在后续被赋值，所以此处设置为规定值：0
- 第二个参数是 dummy 的 byte 长度，大部分为1，少数部分为2，通过在数据手册中查找获得
- 第三个参数为读取数据的 buf，后续赋值，因此固定为 NULL
- 第四个参数为读取数据的长度，后续赋值，所以设置为固定值：0
- 如果有些器件对 0xeb 的 dummy 没有明确标识，则设置为1
- 4个参数中，实际只需要从数据手册中去获取 dummy 的长度即可，其他均赋固定值
- 有些器件支持的命令比较少，需求去掉一些不支持的操作，一般根据 variants 的 command id 来判断，如```F35SQA002G```就不支持 0xeb，0xbb 命令

**SPINAND_PAGE_READ_FROM_CACHE_OP**

- 该命令被设置两次，分别是 normal read 0x3 和 fast read 0xb
- 第一个参数为 fast read 标志，对于支持 0x0b 和 0x03 两个命令的器件，此二者必须成对存在，并且参数一致

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/FM25S01A-com2.png](https://photos.100ask.net/artinchip-docs/d213-devkit/FM25S01A-com2-170669542430925.png)

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/F35SQA-com2.png](https://photos.100ask.net/artinchip-docs/d213-devkit/F35SQA-com2-170669543374427.png)

##### 2.4.4.2. write_cache_variants

所有器件的设置都一致，不需要根据数据手册更改

```
static SPINAND_OP_VARIANTS(write_cache_variants,
            SPINAND_PROG_LOAD_X4(true, 0, NULL, 0),
            SPINAND_PROG_LOAD(true, 0, NULL, 0));
```

##### 2.4.4.3. update_cache_variants

所有器件的设置都一致，不需要根据数据手册更改

```
static SPINAND_OP_VARIANTS(update_cache_variants,
            SPINAND_PROG_LOAD_X4(false, 0, NULL, 0),
            SPINAND_PROG_LOAD(false, 0, NULL, 0));
```

#### 2.4.5. SPINAND_ECCINFO

SPI NAND 的坏块管理分两部分，器件内部硬件逻辑进行的管理和器件对外提供给用户手工操作的管理逻辑， ECCINFO 即对外暴露的给用户手工操作的区域

- 即便不进行 ECCINFO 的设置，坏块管理还是处于工作状态
- 器件自身的坏块管理更高效，因此一般占 ECC 容量的大部分
- 现在大部分器件都不再提供用户操作接口，因为使用门槛比较高
  - Toshiba 的 TC58CYG0S3HRAIJ 有对外暴露 64Byte ECC
  - FM25S01A 和 F35SQA002G 两款器件都没有提供外部使用接口

```
#define SPINAND_ECCINFO(__ooblayout, __get_status)
    .eccinfo = {
        .ooblayout = __ooblayout,   //ooblayot操作函数集合
        .get_status = __get_status, //获取ECC状态
    }


Toshiba 设置
static int tx58cxgxsxraix_ooblayout_ecc(struct mtd_info *mtd, int section,
                                    struct mtd_oob_region *region)
{
        if (section > 0)
                return -ERANGE;

        region->offset = mtd->oobsize / 2;  //ECC 总长度为128Byte，64B 为对外
        region->length = mtd->oobsize / 2;  //长度也为64

        return 0;
}
```

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/toshiba-ecc.png](https://photos.100ask.net/artinchip-docs/d213-devkit/toshiba-ecc-170669546350829.png)

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/FM25S01A-ecc.png](https://photos.100ask.net/artinchip-docs/d213-devkit/FM25S01A-ecc-170669547055531.png)

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/F35SQA-ecc.png](https://photos.100ask.net/artinchip-docs/d213-devkit/F35SQA-ecc-170669548250933.png)

### 2.5. 总结

- 移植一款 SPI NAND，最重要的是 MID, DID, NAND_MEMORG 三块参数，均可以按照一定的规则从数据手册中获得
- READ_FROM_CACHE 中的 dummy 长度是另外一个需要简单关注的参数，大部分都是1，非常小部分为2
- 其他的参数不配置或者配置不正确均不影响使用，但有可能会性能或者某些特殊操作有影响