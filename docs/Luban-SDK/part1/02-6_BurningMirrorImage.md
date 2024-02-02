---
sidebar_position: 8
---
# 2.6. 烧录镜像

Luban SDK 编译的最终输出结果是一个用于烧录到目标平台的镜像文件。

## 2.6.1. 镜像格式

ArtInChip 的烧录镜像文件由组件(FirmWare Component) 以及对应的组件元信息组成。 数据分布如下图所示。

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/image_format3.png](https://photos.100ask.net/artinchip-docs/d213-devkit/image_format3-17066839676741.png)

图 2.47 *烧录镜像格式*

其中一些需要打包的数据文件，都被当做组件(FWC)进行处理，包括 SPL，U-Boot，Kernel，DTB 等数据。

Image Header 的具体格式如下：

```
struct artinchip_fw_hdr{
    char magic[8];              // 固定为 "AIC.FW"
    char platform[64];          // 该镜像文件适用的芯片平台
    char product[64];           // 该镜像文件适用的产品型号
    char version[64];           // 该镜像的版本
    char media_type[64];        // 该镜像文件可烧录的存储介质
    u32  media_dev_id;          // 该镜像文件可烧录的存储介质 ID
    u8   nand_array_org[64];    // NAND Cell Array 的组织
    u32  meta_offset;           // FWC Meta Area start offset
    u32  meta_size;             // FWC Meta Area size
    u32  file_offset;           // FWC File data Area start offset
    u32  file_size;             // FWC File data Area size
    u8 padding[];               // Pad to 2048
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

## 2.6.2. 制作工具

| 工具        | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| mkimage     | 用于：- 制作 uImage 格式的 U-Boot 镜像- 制作 FIT 镜像- 对 FIT 镜像进行签名 |
| mkenvimage  | 用于：编译生成 env.bin                                       |
| mk_image.py | 用于：- 制作 AIC 格式的启动镜像，包括签名和加密- 打包固件组件，生成用于升级的固件镜像文件。tools/scripts/mk_image.py |

## 2.6.3. 配置文件

使用 `mk_image.py` 制作烧录镜像时，需要提供 `image_cfg.json` 镜像配置文件。

该配置文件通过嵌套对象的方式，描述一个待生成的镜像文件所包含的信息和数据。如下面的示例，该描述文件分为几部分：

> - 镜像烧录的目标设备描述：分区表的配置
> - 最终镜像的内容描述：信息和内容排布
> - 中间文件的描述

```
{
    "mmc": { // Media type
        "size": "8G", // Size of SD/eMMC
        "partitions": { // Partition table apply to device
            "spl_1":  { "offset": "0x4400", "size": "128k" },
            "spl_2":  { "size": "367k" },
            "uboot":  { "size": "1m" },
            "env":    { "size": "512k" },
            "kernel": { "size": "16m" },
            "rootfs": { "size": "64m" },
            "user":   { "size": "-" },
        },
    },
    "image": {
        "info": { // Header information about image
            "platform": "d211",
            "product": "per1_mmc",
            "version": "1.0.0",
            "media": {
                "type": "mmc",
                "device_id": 0,
            }
        },

        "updater": { // Image writer which is downloaded to RAM by USB
            "spl": {
                "file": "u-boot-spl-dtb.aic",
                "attr": ["required", "run"],
                "ram": "0x00103000"
            },
            "env": {
                "file": "env.bin",
                "attr": ["required"],
                "ram": "0x83100000"
            },
            "uboot": {
                "file": "u-boot-dtb.aic",
                "attr": ["required", "run"],
                "ram": "0x80007F00"
            }
        },

        "target": { // Image components which will be burn to device's partitions
            "spl": {
                "file": "u-boot-spl-dtb.aic",
                "attr": ["required"],
                "part": ["spl_1"]
            },
            "uboot": {
                "file": "u-boot-dtb.img",
                "attr": ["block", "required"],
                "part": ["uboot"]
            },
            "env": {
                "file": "env.bin",
                "attr": ["block", "required"],
                "part": ["env"]
            },
            "kernel": {
                "file": "kernel.itb",
                "attr": ["block", "required"],
                "part": ["kernel"]
            },
            "rootfs": {
                "file": "rootfs.ext4",
                "attr": ["block", "required"],
                "part": ["rootfs"]
            },
            "app": {
                "file": "user.ext4",
                "attr": ["block", "optional"],
                "part": ["user"]
            },
        },
    },

    "temporary": { // Pre-proccess to generate image components from raw data
        "aicboot": {
            "u-boot-spl-dtb.aic": {
                "head_ver": "0x00010000",
                "loader": {
                    "file": "u-boot-spl-dtb.bin",
                    "load address": "0x103100",
                    "entry point": "0x103100",
                },
            },
            "u-boot-dtb.aic": {
                "head_ver": "0x00010000",
                "loader": {
                    "file": "u-boot-dtb.bin",
                    "load address": "0x80008000",
                    "entry point": "0x80008000",
                },
            },
        },
        "uboot_env": {
            "env.bin": {
                "file": "env.txt",
                "size": "0x4000",
            },
        },
        "itb": {
            "kernel.itb": {
                "its": "kernel.its"
            },
        },
    },
}
```

### 2.6.3.1. 分区表描述

`image_cfg.json` 文件的开头首先描述的是当前要烧录的目标存储设备，以及在设备上的分区配置。

```
"<media type>": {
    "size": "xx",
    "partitions": {
        "<part n>": {
            "offset": "yy",
            "size": "zz",
            "ubi": {
                "offset": "ii",
                "size": "jj",
            }
        }
    }
}
```



| 存储设备   | 说明                 |
| ---------- | -------------------- |
| “mmc”      | eMMC 和 SD Card 设备 |
| “spi-nand” | SPI NAND 设备        |
| “spi-nor”  | SPI NOR 设备         |

`存储设备` 的名字仅可使用上述列表所指定的名字。

`存储设备` 的可设置属性有：

| 存储设备对象的属性名 说明 |                                                              |
| ------------------------- | ------------------------------------------------------------ |
| “size”                    | 值为字符串。设备的存储大小(Byte)，可使用 “K,M,G” 单位，e.g. “8G” |
| “partitions”              | 是 `分区表` 对象。包含该存储设备的详细分区列表，每一个子对象为一个 `分区`。 |

`分区` 对象的属性有：

| 分区对象的属性名 说明 |                                                              |
| --------------------- | ------------------------------------------------------------ |
| “offset”              | 值为16进制字符串。表示该 `分区` 的开始位置离 `存储设备` 的开始位置的偏移（字节）。如果 “offset” 不出现，表示当前分区紧接上一个分区。 |
| “size”                | 值为字符串。设备的存储大小(Byte)，可使用 “K,M,G” 单位，e.g. “8G”。最后一个分区可以使用 “-” 表示使用剩下所有的空间。 |
| “ubi”                 | 是 `UBI Volume 表` 对象。当存储设备为 “spi-nand” 时出现，表示当前 MTD 分区是一个 UBI 设备。该对象描述 UBI 设备中的 Volume 表。每一个子对象为一个 `UBI Volume` 。 |

`UBI Volume` 对象的属性有:

| UBI Volume对象的属性名 | 说明                                                         |
| ---------------------- | ------------------------------------------------------------ |
| “offset”               | 值为16进制字符串。表示该 `Volume` 的开始位置离 `MTD` 分区的开始位置的偏移（字节）如果 “offset” 不出现，表示当前 Volume 紧接上一个 Volume。 |
| “size”                 | 值为字符串。设备的存储大小(Byte)，可使用 “K,M,G” 单位，e.g. “8G”最后一个分区可以使用 “-” 表示使用剩下所有的空间。 |

### 2.6.3.2. Image 文件描述

“image” 对象描述要生成的镜像文件的基本信息，以及要打包的数据。包含几个部分：

> - “info”
> - “updater”
> - “target”

```
"image": {
    "info": {
        ...
    }
    "updater": {
        ...
    }
    "target": {
        ...
    }
}
```

#### 2.6.3.2.1. Info 数据描述

“info” 对象用于描述该烧录镜像的基本信息，这些信息用于生成 Image Header。

```
"info": {
    "platform": "<soc name>",
    "product": "<product name>",
    "version": "x.y.z",
    "media": {
        "type": "<media type>",
        "device_id": n,
        "array_organization": {
            "page": "xx",
            "block": "yy",
        }
    }
}
```

| info 属性  | 说明                                                       |
| ---------- | ---------------------------------------------------------- |
| “platform” | 字符串，当前项目所使用的 SoC 的名字                        |
| “product”  | 字符串，产品名字、产品型号                                 |
| “version”  | 字符串，按照 “x.y.z” 格式提供的版本号，其中 x,y,z 都是数字 |
| “media”    | 对象，描述存储设备                                         |

| media 属性           | 说明                                                         |
| -------------------- | ------------------------------------------------------------ |
| “type”               | 字符串，取值可参考 [存储设备类型](#ref-to-media-type-table)  |
| “device_id”          | 整数，要烧录的存储设备在 U-Boot 中的索引。                   |
| “array_organization” | 对象，当存储设备为 “spi-nand” 时使用，描述存储单元的排列结构 |

| array_organization 属性 | 说明                                             |
| ----------------------- | ------------------------------------------------ |
| “page”                  | 当前 SPI NAND 的 Page 大小，取值 “2K”, “4K”,     |
| “block”                 | 当前 SPI NAND 的 Block 大小, 取值 “128K”, “256K” |

#### 2.6.3.2.2. Updater 数据描述

Updater 是指进行 USB 刷机或者进行 SD 卡刷机时需要运行的刷机程序，该程序通常由 SPL/U-Boot 实现， 可能与正常启动时所运行的 SPL/U-Boot 相同，也可能不同，因此需要单独列出。

“updater” 对象描述在刷机过程中需要使用到的组件数据，其包含多个子对象，每个子对象即为一个 `组件` 。 其中下列的 `组件` 是已知且必要的。

| 组件名称 | 说明                                   |
| -------- | -------------------------------------- |
| “spl”    | 第一级引导程序                         |
| “env”    | 刷机版 U-Boot 所需要使用的环境变量内容 |
| “uboot”  | 第二级引导程序，同时也是刷机程序       |

上述的组件名字并非固定，可根据项目的需要修改、增加或者删除。

Updater 中的 `组件` 对象都有以下的配置字段：

| Updater 组件属性 | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| “file”           | 指定该组件的数据来源文件                                     |
| “ram”            | USB 刷机时，指定该文件下载的内存地址                         |
| “attr”           | 该数据对象的属性，可选的内容有:- “required” : 该数据是必需的，如果指定文件不存在，则生成镜像文件出错。- “optional” : 该数据不是必需的，如果指定文件不存在，则在生成镜像文件时忽略该数据对象。- “run” : 该数据是可执行文件，USB 升级时，该数据下载完成之后会被执行。 |

重要

“updater” 中 `组件` 对象的顺序很重要。

在 USB 升级的过程中，组件数据传输和执行的顺序即为 “updater” 中组件数据出现的顺序， 因此如果组件数据之间有顺序依赖关系，需要按照正确的顺序排布。

#### 2.6.3.2.3. Target 数据描述

“target” 描述要烧录到设备存储介质上的 `组件` 。与 “updater” 中的组件一样，”target” 中出现的组件根据实际需要进行添加，组件的名字也可自行定义。

“target” 中的组件，都有下面的配置字段：
```
| Target 组件属性 | 说明                                                         |
| --------------- | ------------------------------------------------------------ |
| “file”          | 指定该组件的数据来源文件                                     |
| “part”          | 指定该组件被烧录的分区分区名字通过字符串数组的形式提供，如果一个组件被烧录到多个分区，则在数组中提供多个分区的名字，如 [“uboot1”, “uboot2”]。对于 UBI 的卷，使用 “<MTD Part>:<UBI Volume>” 的形式提供，如 [“ubiboot:kernel”]。这里 “ubiboot” 是该 UBI 设备所在的 MTD 分区名字，”kernel” 是该 UBI 设备中的 Volume 名字。 |
| “attr”          | 该数据对象的属性，可选的内容有:- “required” : 该组件数据是必需的，如果指定文件不存在，则生成镜像文件出错。- “optional” : 该组件数据不是必需的，如果指定文件不存在，则在生成镜像文件时忽略该数据对象。- “burn” : 该组件数据是需要烧录到指定分区当中。- “mtd” : 表示该组件要烧录的设备是 MTD 设备。- “ubi” : 表示该组件要烧录的设备是 UBI 设备。- “block” : 表示该组件要烧录的设备是块设备。 |
```
重要
```
> “target” 中组件对象的顺序
```
在 USB 升级的过程中，组件数据传输和烧录的顺序即为 “target” 中组件数据出现的顺序。

### 2.6.3.3. 中间文件描述

“temporary” 描述的是镜像文件生成过程中需要生成的中间文件。通过描述数据对象的方式， 描述不同类型的中间文件的生成过程，可用于对组件的签名、加密、再次打包等处理。

当前支持下列两种不同的数据处理：

> - “aicboot”
>
>   描述 AIC 启动镜像的生成
>
> - “itb”
>
>   描述 FIT Image 的打包

**AIC 启动镜像**

AIC 启动镜像是 BROM 解析和执行的启动程序文件。 当需要在打包过程中生成一个中间的 AIC 启动镜像文件时，需要在 “aicboot” 对象中添加一个子对象， 其对象名字即为生成的文件名字，可配置的内容如下面的示例所示。所列的属性中，只有 “loader” 是必需的， 其他的可根据项目需要进行删减。

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