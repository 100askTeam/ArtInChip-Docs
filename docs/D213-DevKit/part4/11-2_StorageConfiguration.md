---
sidebar_position: 2
---

# 2.存储配置

存储是编译的固件是否可刷机的最重要的原因，但存储的更换要修改的地方比较多，因此我们建议的方案就是按照现存的工程仿写需要 Bringup 的开发板

### 1. SPINAND

#### 1.1. 型号选择

SDK 默认支持了几种 SPINAND，编译之前需要确认开发板的型号被选中支持，如果不在支持列表中， 则需要参考 [SPINAND 移植指南](../memory/spinand/index.html#ref-luban-spinand) 进行移植

uboot 和 SPL 分区一般都比较小，开启的 SPINAND 型号过多的话存储容易越界，因此建议只打开需要用到的型号即可

##### 1.1.1. uboot

通过 make um –> Device Drivers –> MTD Support 选择

```
(0x240000) Offset of bbt in nand
(0x40000) Range of bbt in nand
[*] Define U-boot binaries locations in SPI NAND
(0x100000) Location in SPI NAND to read U-Boot from
[ ] Support Micron SPI NAND
[ ] Support Macronix SPI NAND
[*] Support Winbond SPI NAND
[ ] Support Winbond SPI NAND CONTINUOUS READ MODE
[*] Support GigaDevice SPI NAND
[ ] Support Toshiba SPI NAND
[*] Support FudanMicro SPI NAND
[*] Support Foresee SPI NAND
[*] Support Zbit SPI NAND
[ ] Support Elite SPI NAND
[ ] Support ESMT SPI NAND
[ ] Support UMTEK SPI NAND
SPI Flash Support  --->
UBI support  --->
```

##### 1.1.2. kernel

kernel 分区比较大，默认打开了 SDK 支持的所有型号，因此不用选择。

#### 1.2. 文件系统

SPINAND 文件系统采用 UBIFS， 以 demo128_nand 工程为例，编译后生成固件的名称为: d211_xxx_page_2k_block_128k_v1.0.0.img

SDK 也支持 page size 为 4K（很少用到）的SPINAND，需要在工程的配置文件 target/d211/demo128_nand/image_cfg.json 进行配置

```
"info": { // Header information about image
    "platform": "d211",
    "product": "demo128_nand",
    "version": "1.0.0",
    "media": {
        "type": "spi-nand",
        "device_id": 0,
        "array_organization": [
        //      { "page": "4k", "block": "256k" },
                { "page": "2k", "block": "128k" },
        ],
    }
},
```

#### 1.3. 分区

分区信息在 target/d211/demo128_nand/image_cfg.json 中

```
"spi-nand": { // Device, The name should be the same with string in image:info:media:type
        "size": "128m", // Size of SPI NAND
        "partitions": {
            "spl":      { "size": "1m" },
            "uboot":    { "size": "1m" },
            "userid":   { "size": "256k" },
            "bbt":      { "size": "256k" },
            "env":      { "size": "256k" },
            "env_r":    { "size": "256k" },
            "falcon":   { "size": "256k" },
            "logo":     { "size": "768K" },
            "kernel":   { "size": "12m" },
            "recovery": { "size": "10m" },
            "ubiroot":  {
                "size": "32m",                          //分区大小为32m
                "ubi": { // Volume in UBI device
                    "rootfs": { "size": "-" },
                },
            },
            "ubisystem": {
                "size": "-",
                "ubi": { // Volume in UBI device
                    "ota":   { "size": "48m" },
                    "user":   { "size": "-" },
                },
            },
        }
    },
```

#### 1.4. 固件

固件的大小要和分区大小相匹配，可以自动适配也可以手工调整

##### 1.4.1. 自动适配

make menuconfig –> Filesystem images

```
RootFS images  --->
[ ] UserFS 1  ----
[ ] UserFS 2  ----
[ ] UserFS 3  ----
[ ] Generate burner format image
[*] Auto calculate partition size to generate image                 //通过分区大小自动生成固件
```

##### 1.4.2. 手工调整

通过 make menuconfig –> Filesystem images –> RootFS images 调整

```
[ ] ext2/3/4 root filesystem
[ ] cpio the root filesystem (for use as an initial RAM filesystem)
[ ] initial RAM filesystem linked into linux kernel
[ ] jffs2 root filesystem
[ ] squashfs root filesystem
[ ] tar the root filesystem
    ubi parameter select (spi-nand all type support)  --->
[*] ubi image containing an ubifs root filesystem
[ ]   Use custom config file
()    Additional ubinize options
-*- ubifs root filesystem
(0x2000000) ubifs size(Should be aligned to MB)                      //固件大小，32M
ubifs runtime compression (lzo)  --->
Compression method (no compression)  --->
(-F)  Additional mkfs.ubifs options
```

### 2. SPINOR

SPINOR 采用 squashfs 文件系统，以 per2_spinor 工程为例， 编译出来的固件为 d211_per2_spinor_v1.0.0.img

SPINOR 的分区信息在 target/d211/per2_spinor/image_cfg.json 中

```
"spi-nor": { // Media type
    "size": "16m", // Size of NOR
    "partitions": {
        "spl":    { "size": "256k" },
        "uboot":  { "size": "640k" },
        "userid": { "size": "64k" },
        "env":    { "size": "64k" },
        "env_r":  { "size": "64k" },
        "falcon": { "size": "64k" },
        "logo":   { "size": "512k" },
        "kernel": { "size": "5m" },
        "rootfs": { "size": "9m" },
        // "user":   { "size": "-" },
    }
}
```

SPINOR 存储一般比较小，在 Linux 系统上进行分区调整比较麻烦，本文档不详细描述

### 3. EMMC

EMMC 采用 squashfs，以 demo 工程为例， 编译出来的固件为 d211_demo_v1.0.0.img

EMMC 的接口协议固定，因此不需要进行新器件型号的移植

注解

调整分区大小时，也需要同时调整固件的大小来和分区匹配

#### 3.1. 分区

分区信息在 target/d211/demo/image_cfg.json 中

```
"mmc": { // Media type
    "size": "4G", // Size of SD/eMMC
    "partitions": { // Partition table apply to device
        "spl":    { "offset": "0x4400", "size": "495k" },
        "uboot":  { "size": "1m" },
        "env":    { "size": "256k" },
        "falcon": { "size": "256k" },
        "logo":   { "size": "512k" },
        "kernel": { "size": "16m" },
        "rootfs": { "size": "72m" },        //分区大小为72M
        "user":   { "size": "-" },
    },
},
```

#### 3.2. 固件

固件的大小调整通过 make menuconfig –> Filesystem images –> RootFS images 调整

```
[*] ext2/3/4 root filesystem
ext2/3/4 variant (ext4)  --->
(rootfs) filesystem label
(72M) exact size                                                 //固件大小为72M
(0)   exact number of inodes (leave at 0 for auto calculation)
(5)   reserved blocks percentage
(-O ^64bit) additional mke2fs options
Compression method (no compression)  --->
[ ] cpio the root filesystem (for use as an initial RAM filesystem)
[ ] initial RAM filesystem linked into linux kernel
```

### 4. 成果

**正确的存储配置应该能够成功支持固件烧录**