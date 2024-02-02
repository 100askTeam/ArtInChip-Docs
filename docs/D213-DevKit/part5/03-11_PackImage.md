---
sidebar_position: 11
---
# 打包镜像

本章节描述 U-Boot 涉及到的打包镜像相关的内容，以及相关工具。

## 1. AIC 启动镜像格式

> ArtInChip BROM 所使用的启动镜像格式。

*表 3.15* *AIC启动镜像格式*

| 数据区域                | 数据分块           | 字段                                             | 字节                               | 描述                      |
| ----------------------- | ------------------ | ------------------------------------------------ | ---------------------------------- | ------------------------- |
| Signed Area             | Block1(256B)       | Magic                                            | 4                                  | 特征字符串，固定为 ”AIC ” |
| Checksum                | 4                  | 32 bit 累加和校验的校验值。安全启动方案设为0.    |                                    |                           |
| Header version          | 4                  | 本文件头结构的版本号，当前版本为v1.0: 0x00010001 |                                    |                           |
| Image length            | 4                  | 从文件开头到结束的总数据长度                     |                                    |                           |
| Firmware version        | 4                  | 固件版本号，不同版本之间应单调递增               |                                    |                           |
| Loader length           | 4                  | 第一级引导程序的有效数据的长度，不包括填充数据   |                                    |                           |
| Load address            | 4                  | 镜像数据加载到内存的目标地址                     |                                    |                           |
| Entry point             | 4                  | 第一级引导程序的可执行代码入口地址               |                                    |                           |
| Signature algorithm     | 4                  | 0：没有签名，仅计算Checksum；1：RSA-2048；       |                                    |                           |
| Encryption algorithm    | 4                  | 0：固件不加密；1：AES-128-CBC 加密               |                                    |                           |
| Signature result offset | 4                  | 数字签名数据区域的偏移，从文件头开始计算         |                                    |                           |
| Signature result length | 4                  | 数字签名的长度                                   |                                    |                           |
| Signature key offset    | 4                  | RSA 公钥数据区域的偏移                           |                                    |                           |
| Signature key length    | 4                  | RSA 公钥数据的长度                               |                                    |                           |
| IV data offset          | 4                  | AES-CBC IV数据区域的偏移                         |                                    |                           |
| IV data length          | 4                  | IV 的长度                                        |                                    |                           |
| Private data offset     | 4                  | 第一级引导程序私有数据区域的偏移                 |                                    |                           |
| Private data length     | 4                  | 第一级引导程序私有数据区域的长度                 |                                    |                           |
| PBP offset              | 4                  | PBP 数据区域的偏移                               |                                    |                           |
| PBP length              | 4                  | PBP 数据的长度                                   |                                    |                           |
| Padding                 | 176                | 填充，使得头部刚好 256 字节                      |                                    |                           |
| Block2                  | Loader binary data | X                                                | 第一级引导程序的保存区域           |                           |
| Padding                 | X                  | 增加填充，使得 256 字节对齐                      |                                    |                           |
| Block3                  | Private data area  | X                                                | 存放镜像代码中可能使用的私有数据。 |                           |
| Signature key area      | X                  | 存放 RSA 公钥，DER 格式的密钥文件。应4字节对齐。 |                                    |                           |
| IV data area            | 16                 | 存放 AES IV 数据，16字节。应4字节对齐。          |                                    |                           |
| PBP area                | X                  | 存放 PBP 程序。应16字节对齐。                    |                                    |                           |
| Padding                 | X                  | 填充，使得 256 byte 对齐，方便计算数字签名       |                                    |                           |
|                         | Block4             | Signature result area                            | 256                                | 前面所有内容的数字签名    |

对于 NAND，在保存第一级引导程序的时候，还会在每个 NAND Block 的第一个 Page 生成 Page Table。Page Table 的作用是用于快速索引镜像数据所在的不同备份 Page 地址。

*表 3.16* *NAND Page Table 格式*

| Index | Content (20 Bytes)    |                       |                       |                       |                   |
| ----- | --------------------- | --------------------- | --------------------- | --------------------- | ----------------- |
| 0     | Magic(4 Bytes)        | Count(4 Bytes)        | Padding (12 Bytes)    |                       |                   |
| 1     | PA(4 Bytes)(Backup 0) | PA(4 Bytes)(Backup 1) | PA(4 Bytes)(Backup 2) | PA(4 Bytes)(Backup 3) | Checksum(4 Bytes) |
| 2     | PA(4 Bytes)(Backup 0) | PA(4 Bytes)(Backup 1) | PA(4 Bytes)(Backup 2) | PA(4 Bytes)(Backup 3) | Checksum(4 Bytes) |
| …     | …                     | …                     | …                     | …                     | …                 |

Magic 开头的 20 字节，是 Page Table 的头信息，其中 Magic 的值固定为 “AICP”， Count 表示 BootLoader 的数据被分为几个 Page 进行保存。

从 Index 1 表示 BootLoader 的第一个 Page 数据有4个备份，被分别存放在对应 PA(Page address) 所指的 NAND Page 中，Checksum 值是该 Page 数据的校验值。

## 2. 烧录镜像格式

Artinchip 的烧录镜像文件由组件(FirmWare Component) 以及对应的组件元信息组成。 数据分布如下图所示。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/image_format2.png](https://photos.100ask.net/artinchip-docs/d213-devkit/image_format2-17066888792141.png)

图 3.5 *烧录镜像格式*

其中一些需要打包的数据文件，都被当做组件(FWC)进行处理，包括 SPL，U-Boot，Kernel，DTB 等数据。

Image Header 的具体格式如下：

```
struct artinchip_fw_hdr{
    char magic[8];      // 固定为 "AIC.FW"
    char platform[64];  // 该镜像文件适用的芯片平台
    char product[64];   // 该镜像文件适用的产品型号
    char version[64];   // 该镜像的版本
    char media_type[64];// 该镜像文件可烧录的存储介质
    u32  media_dev_id;  // 该镜像文件可烧录的存储介质 ID
    u8   nand_id[64];   // 当存储介质为 NAND 时，适用的 NAND ID
    u32  meta_offset;   // FWC Meta Area start offset
    u32  meta_size;     // FWC Meta Area size
    u32  file_offset;   // FWC File data Area start offset
    u32  file_size;     // FWC File data Area size
    u8 padding[];       // Pad to 2048
};
```

FWC Meta 的格式如下：

```
struct artinchip_fwc_meta {
    char magic[8];      // 固定为 "META"
    char name[64];      // 对应组件的名字
    char partition[64]; // 该组件要烧录的分区名字
    u32  offset;        // 该组件数据在镜像文件中的偏移
    u32  size;          // 该组件数据的大小
    u32  crc32;         // 该组件数据的CRC32校验值
    u32  ram;           // 当组件要下载到平台 RAM 时，要下载的地址
    char attr[64]       // 该组件的属性，字符串表示
    u8 padding[296];    // Pad to 512
};
```

## 3. FIT Image 介绍

在 ARTINCHIP 启动系统的开发过程中，使用过不同的 Kernel Image 格式：

- uImage
- zImage
- Image.gz
- Image
- FIT Image(ITB Image)

由于未来需要改用 FIT Image(ITB Image)，这里做一个简要的说明。

### 3.1. Kernel Image 格式

- 外网资源：

  网上有一篇相关的文章可以参考 http://www.wowotech.net/u-boot/fit_image_overview.html

#### 3.1.1. Image

这是 Linux kernel 编译时生成的未压缩 Image.

U-Boot 可以通过 booti 命令直接运行该 Image（ARMv7 是 Artinchip 自行添加的命令支持启动），启动命令格式为：

```
booti <kernel addr> - <dtb addr>
```

其中 `<kernel addr> `是 Image 文件所在的内存地址。

Image 文件的格式，在不同芯片架构上是不一样的。对于 ARM64 和 RISCV64，会有一个格式头；但是对于 ARM32，则没有 头信息。

#### 3.1.2. zImage

Image 经过压缩和打包后，生成的 zImage 文件。其做法是将压缩后的 Image 作为 Payload，与一段解压缩代码一起编译 链接，生成 zImage。因此 zImage 是一个可直接启动的自解压镜像。

启动命令为：

```
bootz <kernel addr> - <dtb addr>
```

其中 `<kernel addr> `即 zImage 所在的内存地址。

ARM64, RISCV 架构的 Linux kernel 编译，不再生成 zImage 格式的文件。

#### 3.1.3. uImage

uImage 是 U-Boot 定义的一种启动镜像格式，由 64 字节的 U-Boot Image header 加上镜像内容构成。

uImage 中的镜像内容，可以是未压缩的 Image，也可以是压缩的 Image。 Linux kernel 编译时生成（依赖 uboot-tools 包中的 mkimage 工具）。但是新版的 Linux kernel 不再生成 uImage 文件。

uImage 文件的启动命令：

```
bootm <kernel addr> - <dtb addr>
```

其中`<kernel addr>` 即 uImage 所在的内存地址。

#### 3.1.4. Image.gz

Image.gz 是 Linux kernel 编译时生成的压缩文件，使用 gzip 算法直接对 Image 文件进行压缩生成。除了 Image.gz，使用 其他压缩算法还可以生成:

- Image.lzo
- Image.lz4
- Image.bz2
- Image.lzma

这些压缩文件就是各种压缩工具生成的标准压缩文件。U-Boot 的启动命令为：

```
booti <kernel addr> - <dtb addr>
```

其中 `<kernel addr> `即 Kernel 压缩文件所在的内存地址。

#### 3.1.5. FIT Image

Flattened Image Tree。

原始参考文档:

```
source/uboot-2021.10/doc/usage/fit.rst
source/uboot-2021.10/doc/uImage.FIT/howto.txt
source/uboot-2021.10/doc/uImage.FIT/source_file_format.txt
source/uboot-2021.10/doc/uImage.FIT/command_syntax_extensions.txt
```

如 howto.txt 开篇所提，当前社区使用 FIT Image 的主要理由是：

- 更灵活的处理各种类型的 image 类型(压缩、非压缩、各种格式，各种配置组合)
- 可以处理安全启动过程中的安全校验（签名校验）

##### 3.1.5.1. 配置和生成

Flattened Image Tree 顾名思义，是参考 Flattened Device Tree 命令而来，使用 DTS 的语法， 通过一些新增的节点，描述生成镜像文件所使用的 Image 文件和配置。

例子如： source/uboot-2021.10/doc/uImage.FIT/kernel_fdt.its

```
/dts-v1/;

/ {
    description = "Simple image with single Linux kernel and FDT blob";
    #address-cells = <1>;

    images {
            kernel {
                    description = "Vanilla Linux kernel";
                    data = /incbin/("./vmlinux.bin.gz");
                    type = "kernel";
                    arch = "ppc";
                    os = "linux";
                    compression = "gzip";
                    load = <00000000>;
                    entry = <00000000>;
                    hash-1 {
                            algo = "crc32";
                    };
                    hash-2 {
                            algo = "sha1";
                    };
            };
            fdt-1 {
                    description = "Flattened Device Tree blob";
                    data = /incbin/("./target.dtb");
                    type = "flat_dt";
                    arch = "ppc";
                    compression = "none";
                    hash-1 {
                            algo = "crc32";
                    };
                    hash-2 {
                            algo = "sha1";
                    };
            };
    };

    configurations {
            default = "conf-1";
            conf-1 {
                    description = "Boot Linux kernel with FDT blob";
                    kernel = "kernel";
                    fdt = "fdt-1";
            };
    };
};
```

此处描述的一个配置，其中包含了 fdt + kernel，以及校验方式。

生成 itb image的命令：

```
mkimage -f kernel_fdt.its kernel_fdt.itb
```

##### 3.1.5.2. 启动命令

使用默认的配置进行启动：

```
bootm <kernel itb addr>
```

如果 its 中有多个配置，可以指定启动的配置组合：

```
bootm <kernel itb addr>#<conf-name>

如：bootm 0x81000000#conf-2
```

更多说明请参考：source/uboot-2021.10/doc/uImage.FIT/command_syntax_extensions.txt

### 3.2. 使用 FIT Image

ARTINCHIP 项目中，将 Kernel Image 改为使用 FIT Image 的原因：

- 快速启动的需要
- 减少分区的需要
- 安全启动的需要
- 支持 RISCV 的需要

#### 3.2.1. 快速启动

D211 的快速启动，eMMC 的方案使用未压缩的 Image 速度最快，SPINOR/SPINAND 使用压缩的 zImage 比较合适。

同时 U-Boot 加载 Kernel 最好只读取 Kernel Image 实际大小的数据，避免过多读取无关数据， 才能节省启动时间。

U-Boot 加载 Kernel 时，无论 Image 还是 zImage，都没有头信息，因此即读取 Kernel Image 的大小需要根据实际编译生成的镜像大小进行修改。

如果采用 FIT Image 则可以避免上述问题。

生成的 FIT Image 有一个信息头，U-Boot 可以先读取信息头的数据，得到 Image 大小，然后按照实际大小读取 剩下的 Kernel Image 数据：

1. 从存储介质读取的数据可以做到尽可能的少
2. 开发者不需要手动修改读取的数据大小

当然是用了 FIT Image 之后，无论是使用压缩的 zImage/Image.gz 还是使用未压缩的 Image，对启动流程/启动命令 都没有影响，开发者仅需修改 ITS 文件配置即可。

#### 3.2.2. 减少分区

在使用 FIT Image 之前，Kernel 启动所需的 DTB 保存在一个独立的分区中。

DTB 使用一个独立的分区保存对于 SPINOR/SPINAND 的方案而言是一种比较浪费空间的方式。

对于 SPINOR 而言，一般存储空间都比较小，但是分区必须按照一个擦写单元进行，一般是 64KB， 而 DTB 绝大多数在 32KB 以内。

对于 SPINAND 而言，分区同样必须按照一个擦写块进行，一般是 128KB 或者 256KB， 同时要考虑坏块的情况，需要多分配几个块进行备份。

使用 FIT Image，Kernel 所使用的 DTB 与 Kernel 一起进行打包，存放到同一个分区， 有利于提高存储空间的利用效率，同时分区划分更简单。

#### 3.2.3. 安全启动

在安全启动方案中，安全信任链的校验过程如下：

```
BROM -> SPL -> U-Boot -> Kernel -> RootFS
```

按照上述顺序逐级进行安全校验。

在 SPL 校验 U-Boot 和 U-Boot 校验 Kernel 的阶段，如果使用 FIT Image，则已经有成熟的安全校验方案， 并且启动处理流程与非安全方案基本一致。不采用 FIT Image，则安全方案和非安全方案所采用的启动流程 差异性比较大，不利于方案的开发和维护。

#### 3.2.4. 支持 RISCV

RISCV 需要 OpenSBI 协助进行启动，OpenSBI 运行在 U-Boot 之前。

启动流程：

```
BROM -> SPL -> OpenSBI -> U-Boot -> Kernel
```

RISCV 版本的 SPL 在加载运行 OpenSBI 和 U-Boot 时，仅支持使用 FIT Image， 即需要将下列几个数据打包为一个 ITB 文件(uboot.itb)：

- OpenSBI
- U-Boot
- DTB

SPL 加载 uboot.itb，读取 DTB 和 U-Boot 到对应的位置，然后运行 OpenSBI，通过 OpenSBI 跳转到 U-Boot。启动的 DTB 是 OpenSBI 和 U-Boot 共用。

Kernel 也使用 FIT Image，可以简化 Image 的种类。

## 4. 镜像打包工具

U-Boot 以及相关固件组件处理相关的工具如下表所列。

| 工具             | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| mkimage          | 用于：制作 uImage 格式的 U-Boot 镜像制作 FIT 镜像对 FIT 镜像进行签名U-Boot 编译时生成。编译生成目录/tools/mkimage。 |
| mkenvimage       | 用于：编译生成 env.binU-Boot 编译时生成。编译生成目录/tools/mkenvimage。 |
| mk_image.py      | 用于：制作 AIC 格式的启动镜像，包括签名和加密打包固件组件，生成用于升级的固件镜像文件。tools/scripts/mk_image.py |
| get_env_info.py  | 用于：解析 env.txt，获取相关分区信息。打包固件过程中使用。tools/scripts/get_env_info.py |
| get_image_cfg.py | 用于: 解析 image_cfg.json，获取相关组件配置信息。打包固件过程中使用。tools/scripts/get_image_cfg.py |
| get_nand_info.py | 用于：解析 nand_list.json，获取 NAND 器件的相关参数信息，生成 UBIFS 时使用。tools/scripts/get_nand_info.py |

## 5. 镜像配置文件

当使用 `mk_image.py` 打包生成烧录镜像文件时，需要使用对应的 JSON 配置文件描述具体的打包数据和处理流程。

### 5.1. 配置文件总览

该 JSON 文件通过嵌套对象的方式，描述一个待生成的镜像文件所包含的数据和信息。 其中最终输出的 “image” 对象，由 “info” 数据，”updater” 数据，”target” 数据组成， 制作 “image” 的过程中需要生成和使用的临时文件由 “temporary” 描述。

```
{
    "image": {
            "info": {
                    "platform": "d211",
                    "product": "fpga_nand",
                    "version": "1.0.0",
                    "media": {
                            "type": "spi-nand",
                            "device_id": 0,
                            "nand_id" : ["0xef", "0xba", "0x21"],
                    }
            },

            "updater": {
                    "spl": {
                            "file": "u-boot-spl-updater.aic",
                            "attr": ["required", "run"],
                            "ram": "0x00103000"
                    },
                    "bootui": {
                            "file": "bootui.img",
                            "attr": "optional",
                            "ram": "0x80300000"
                    },
                    "env": {
                            "file": "env.bin",
                            "attr": ["required"],
                            "ram": "0x83100000"
                    },
                    "uboot": {
                            "file": "u-boot-updater.aic",
                            "attr": ["required", "run"],
                            "ram": "0x80007F00"
                    }
            },

            "target": {
                    "spl": {
                            "file": "u-boot-spl.aic",
                            "attr": ["mtd", "required", "burn"],
                            "part": ["spl"]
                    },
                    "uboot": {
                            "file": "u-boot-dtb.img",
                            "attr": ["mtd", "required", "burn"],
                            "part": ["uboot"]
                    },
                    "env": {
                            "file": "env.bin",
                            "attr": ["mtd", "required", "burn"],
                            "part": ["env", "envbak"]
                    },
                    "bootui": {
                            "file": "bootui.img",
                            "attr": ["mtd", "optional", "burn"],
                            // <mtd part name>:<ubi volume name>
                            "part": ["bootui"]
                    },
                    "dtb": {
                            "file": "u-boot.dtb",
                            "attr": ["mtd", "required", "burn"],
                            "part": ["dtb"]
                    },
                    "kernel": {
                            "file": "Image.gz",
                            "attr": ["mtd", "required", "burn"],
                            "part": ["kernel"]
                    },
                    "rootfs": {
                            "file": "rootfs.ubifs",
                            "attr": ["ubi", "optional", "burn"],
                            "part": ["ubiroot:rootfs"]
                    },
                    "app": {
                            "file": "user.img",
                            "attr": ["ubi", "optional", "burn"],
                            "part": ["ubisystem:user"]
                    }
            }
    },

    "temporary": {
            "aicboot": {
                    "u-boot-spl.aic": {
                            "head_ver": "0x00010000",
                            "anti-rollback counter": 1,
                            "loader": {
                                    "file": "u-boot-spl.bin",
                                    "load address": "0x103100",
                                    "entry point": "0x103100",
                            },
                            "resource": {
                                    "private": "private.bin",
                                    "pubkey": "rsa_pub_key.der",
                                    "pbp": "d211.pbp",
                            },
                            "encryption": {
                                    "algo": "aes-128-cbc",
                                    "key": "aes-128-cbc-key.bin",
                                    "iv": "aes-128-cbc-iv.bin",
                            },
                            "signature": {
                                    "algo": "rsa,2048",
                                    "privkey": "rsa-2048-private.der",
                            },
                    },
            },
            "itb": {
                    "u-boot.itb": {
                            "its": "u-boot.its"
                    },
            },
    },
}
```

### 5.2. Info 数据描述

“info” 对象用于描述该烧录镜像的基本信息，这些信息用于生成 Image Header。

其中 “info” 对象可配置的信息有：

- “platform”

  当前项目所使用的芯片型号。以字符串形式提供。

- “product”

  使用镜像文件的产品型号/名字。以字符串形式提供。

- “version”

  镜像的版本信息，以字符串形式提供。

- “media”

  镜像文件可烧录的存储介质信息组成的对象。其中包含“type”: 存储介质的类型，以字符串形式提供。可填写的类型:“mmc” 当存储介质为 eMMC/SD Card 时填写 “mmc”“spi-nand”“spi-nor”“device_id”: 要烧录的存储介质 ID 号当设备上有多个相同类型的存储设备是，需要提供存储设备的 ID 号。比如设备上同时又 eMMC 和 SD 卡。“nand_id”: NAND 器件的厂商 ID 号，当存储设备为 “spi-nand” 时，需要提供。NAND ID 应以16进制字符串的数组的形式提供，如 [“0xef”, “0xba”, “0x21”]。填写 NAND ID 的原因是 在制作 UBIFS 时，需要知道具体的 NAND 器件的参数，如 Block 大小， Page 大小等。 因此这里提供 NAND ID，以便在制作 UBIFS 时查询。

### 5.3. Updater 数据描述

Updater 是进行 USB 升级或者进行 SD 卡时需要运行的 SPL/U-Boot 程序，该程序可能与正常启动时所运行的 SPL/U-Boot 相同，也可能不同，因此需要单独列出。

“updater” 对象描述在升级过程中需要使用到的组件数据。其中下列的组件数据是已知和必要的。

- “spl”

  第一级引导程序。

- “env”

  升级时 U-Boot 所用的环境变量内容。

- “uboot”

  第二级引导程序，升级的具体功能实现在里面。

上述的组件名字并非固定，可根据项目的需要修改、增加或者删除。

Updater 中的组件数据对象都有以下的配置字段：

- “file” : 指定该组件的数据来源文件
- “ram” : USB 升级时，指定该文件下载的内存地址
- “attr” : 该数据对象的属性，可选的内容有:
  - “required” : 该数据是必需的，如果指定文件不存在，则生成镜像文件出错。
  - “optional” : 该数据不是必需的，如果指定文件不存在，则在生成镜像文件时忽略该数据对象。
  - “run” : 该数据是可执行文件，USB 升级时，该数据下载完成之后会被执行。

重要

“updater” 中组件对象的顺序很重要。

在 USB 升级的过程中，组件数据传输和执行的顺序即为 “updater” 中组件数据出现的顺序， 因此如果组件数据之间有顺序依赖关系，需要按照正确的顺序排布。

### 5.4. Target 数据描述

“target” 描述要烧录到设备存储介质上的组件数据。与 “updater” 中的组件一样，”target” 中出现的组件根据实际需要进行添加，组件的名字也可自行定义。

“target” 中的组件，都有下面的配置字段：

- “file” : 指定该组件的数据来源文件

- “part” : 指定该组件被烧录的分区
```
  > 分区名字通过字符串数组的形式提供，如果一个组件被烧录到多个分区，则在数组中提供多个分区的名字， 如 [“uboot1”, “uboot2”]。
  >
  > 对于 UBI 的卷，使用 “<MTD Part>:<UBI Volume>” 的形式提供，如 [“ubiboot:kernel”]。 这里 “ubiboot” 是该 UBI 设备所在的 MTD 分区名字，”kernel” 是该 UBI 设备中的 Volume 名字。
```
- “attr” : 该数据对象的属性，可选的内容有:

  - “required” : 该组件数据是必需的，如果指定文件不存在，则生成镜像文件出错。
  - “optional” : 该组件数据不是必需的，如果指定文件不存在，则在生成镜像文件时忽略该数据对象。
  - “burn” : 该组件数据是需要烧录到指定分区当中。
  - “mtd” : 表示该组件要烧录的设备是 MTD 设备。
  - “ubi” : 表示该组件要烧录的设备是 UBI 设备。
  - “block” : 表示该组件要烧录的设备是块设备。

重要

“target” 中组件对象的顺序

在 USB 升级的过程中，组件数据传输和烧录的顺序即为 “target” 中组件数据出现的顺序。

### 5.5. Temporary 数据描述

“temporary” 描述的是镜像文件生成过程中需要生成的中间文件。通过描述数据对象的方式， 描述不同类型的中间文件的生成过程，可用于对组件的签名、加密、再次打包等处理。

当前支持下列两种不同的数据处理：

- “aicboot” 描述 AIC 启动镜像的生成
- “itb” 描述 FIT Image 的打包

**AIC 启动镜像**

AIC 启动镜像是 BROM 解析和执行的启动程序文件，其格式如 [AIC启动镜像格式](image_format.html#ref-aic-boot-image-format) 所描述。 当需要在打包过程中生成一个中间的 AIC 启动镜像文件时，需要在 “aicboot” 对象中添加一个子对象， 其对象名字即为生成的文件名字，可配置的内容如下面的示例所示。所列的属性中，只有 “loader” 是必需的， 其他的可根据项目需要进行删减。

```
"aicboot": {
   "u-boot-spl.aic": {
        "head_ver": "0x00010000",
        "anti-rollback counter": 1,
        "loader": {
            "file": "u-boot-spl.bin",
            "load address": "0x103100",
            "entry point": "0x103100",
        },
        "resource": {
            "private": "private.bin",
            "pubkey": "rsa_pub_key.der",
            "pbp": "d211.pbp",
        },
        "encryption": {
            "algo": "aes-128-cbc",
            "key": "aes-128-cbc-key.bin",
            "iv": "aes-128-cbc-iv.bin",
        },
        "signature": {
            "algo": "rsa,2048",
            "privkey": "rsa-2048-private.der",
        },
   },
}
```

**FIT Image**

FIT Image 是 U-Boot 中常用的数据打包方式，用于将一些相关的启动数据打包在一起， 使用 `.its` 文件描述打包过程。

如果生成烧录镜像文件的过程中，有些数据需要打包组合为一个 FIT Image 文件，则可以在 “itb” 对象中添加一个子对象，其对象名字即为生成的文件名字，可配置的内容位描述该打包 过程的 `.its` 文件。

```
"itb": {
    "u-boot.itb": {
            "its": "u-boot.its"
    },
},
```

烧录镜像文件生成过程中，会调用相应的 mkimage 工具生成 itb 文件。