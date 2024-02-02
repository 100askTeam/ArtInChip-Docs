---
sidebar_position: 9
---
# 分区配置

本章节描述不同存储介质的默认分区方案，这里只关心启动相关的分区，应用相关的分区不同的方案会有不同的选择， 这里不做详细描述。

ArtInChip 的方案中，分区表在 env.txt 配置，配置内容包括各分区在存储介质中的位置和大小。分区中要烧录的内容在 各项目对应的 image_cfg.json 中设置。 env.txt 通常位于 `target/<ic>/common/` 。

### 1. MMC 分区配置

MMC 包括 SD Card 和 eMMC。对于 eMMC，ArtInChip 方案中不支持从 Boot Partition 启动， 只支持从 UDA(User Data Area) 启动，因此具体的分区方式与 SD Card 一致，统一采用 GPT 分区。

**目标平台上的 GPT 分区**

具体的分区在项目的 image_cfg.json 中配置，mk_image.py 生成镜像过程中，相关分区信息会被添加到 env.bin， 以 `GPT=` 格式存储在环境变量中：

```
GPT=size1@offset1(partition name1),size2@offset2(partition name2),-(last partition)
```

其中 size 是分区的大小，offset 是分区的开始位置（相对 UDA 的开始位置，单位为字节）。 如果是最后一个分区，可以不设置 `size@offset`，使用 `-` 代替，表示剩余的所有空间都分配给该分区。

例如：

image_cfg.json 中的分区配置：

```
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
```

环境变量中保存的格式：

```
GPT=128k@0x4400(spl_1),367k(spl_2),1m(uboot),512k(env),16m(kernel),64m(rootfs),-(user)
```

也可以不设置 offset，表示各分区相连，程序自动计算该分区的开始位置。

例如：

```
GPT=128k(spl_1),367k(spl_2),1m(uboot),512k(env),512k(bootui),512k(dtb),
    16m(kernel),64m(rootfs),-(user)
```

注意

特别处理

UDA 的前面34个 block 被用作 GPT Header，无论第一个分区是否设置 offset，程序在做分区时都会预留34个 block 给 GPT Header。

即：128k@0x4400(spl_1) 和 128k(spl_1) 是一样的。

下列为基本分区：

| 分区   | 大小     |      | 备注                                     |
| ------ | -------- | ---- | ---------------------------------------- |
| spl_1  | 128KB    | RAW  | 分区开始位置固定，从0x4400开始，大小固定 |
| spl_2  | >= 128KB | RAW  | 分区开始位置固定，镜像备份，可不要       |
| uboot  | .        | RAW  | 大小根据实际项目需要配置                 |
| env    | >= 16KB  | RAW  | 保存环境变量                             |
| dtb    | .        | RAW  | 保存 kernel dtb，大小根据实际情况分配    |
| kernel | .        | RAW  | 大小根据实际项目需要配置                 |
| rootfs | .        | Ext4 | 大小根据实际项目需要配置                 |
| user   | .        | Ext4 | 大小根据实际项目需要配置                 |

如果 Kernel 使用 FIT Image 格式，上述分区中的 dtb 可以省略。 user 分区以及是否有更多的应用分区，由具体项目决定。

**SD 量产卡的 GPT 分区**

量产卡用在工厂生产过程中，通过运行量产卡中的升级程序，对目标平台进行量产升级。 具体的分区设置在 env.txt 中的 `burn_mmc=` 配置。例如：

```
burn_mmc=128k@0x4400(spl_1),367k(spl_2),1m(uboot),512k(env),512k(bootui),-(image)
```

分区格式基本固定：

| 分区  | 大小     |      | 备注                     |
| ----- | -------- | ---- | ------------------------ |
| spl_1 | 128KB    | RAW  | 用于升级的 SPL           |
| spl_2 | >= 128KB | RAW  | 用于升级的 SPL 备份      |
| uboot | .        | RAW  | 用于升级的 U-Boot        |
| env   | >= 16KB  | RAW  | 保存环境变量             |
| data  | .        | RAW  | 保存用于烧录固件镜像文件 |

目标平台在启动到 U-Boot 时，进入量产模式。U-Boot 量产程序从 `data` 分区读取固件数据，并且烧录到目标存储介质。

**SPL 分区的特别说明**

MMC GPT 分区时，BROM 启动过程中，固定从两个地方读取 SPL 程序的备份。 首先尝试读取 SPL 备份1，如果验证失败，再尝试读取 SPL 备份2。其中备份2是可选的。

| 分区       | 大小/位置            | 备注              |
| ---------- | -------------------- | ----------------- |
| GPT HEADER | 17KB(LBA0~LBA33)     | 预留给 GPT Header |
| 备份1      | 128KB(LBA34~LBA289)  | 必须              |
| 备份2      | 128KB(LBA290~LBA545) | 可选              |

### 2. SPI NAND 分区配置

具体的分区在项目的 image_cfg.json 中配置，mk_image.py 生成镜像过程中，相关分区信息会被添加到 env.bin， 以 `MTD=` 和 `UBI=` 格式存储在环境变量中：

```
MTD=size1@offset1(partition name1),size2@offset2(partition name2),-(last partition)
```

其中 size 是分区的大小，offset 是分区的开始位置（相对 UDA 的开始位置，单位为字节）。 如果是最后一个分区，可以不设置 `size@offset`，使用 `-` 代替，表示剩余的所有空间都分配给该分区。

例如:

image_cfg.json 中的分区配置：

```
"spi-nand": { // Device, The name should be the same with string in image:info:media:type
    "size": "128m", // Size of SPI NAND
    "partitions": {
            "spl":    { "size": "1m" },
            "uboot":  { "size": "1m" },
            "env":    { "size": "256k" },
            "kernel": { "size": "12m" },
            "ubiroot": {
                    "size": "32m",
                    "ubi": { // Volume in UBI device
                            "rootfs": { "size": "-" },
                    },
            },
            "ubisystem": {
                    "size": "-",
                    "ubi": { // Volume in UBI device
                            "user":   { "size": "-" },
                    },
            },
    }
},
```

生成的环境变量内容：

```
MTD=spi1.0:1m(spl),1m(uboot),256k(env),12m(kernel),32m(ubiroot),-(ubisystem)
UBI=ubiroot:-(rootfs);ubisystem:-(user)
```

前面 `MTD=` 描述 MTD 分区的配置，后面 `UBI=` 描述被用作 UBI 的 MTD 分区的 UBI 卷分配。

注解

mtdids 与使用的 spi 接口有关系。当使用 spi0 接口时，为 spi0.0；当使用 spi1 接口时，为 spi1.0

Boot 阶段相关的几个分区有两种备选方案。

**方案一：** MTD 分区

| 分区   | 大小    |       | 备注                            |
| ------ | ------- | ----- | ------------------------------- |
| spl    | 1MB     | RAW   | 保存 SPL 备份的区域             |
| uboot  | 2MB     | RAW   | 保存 U-Boot，需要预留空闲备用块 |
| env    | 1 Block | RAW   | 保存环境变量                    |
| envbak | 1 Block | RAW   | 保存环境变量备份，可不用        |
| dtb    | 1 Block | RAW   | 保存 kernel dtb                 |
| kernel | .       | RAW   | 保存 kernel，需要预留空闲备用块 |
| rootfs | .       | UBIFS |                                 |
| user   | .       | UBIFS |                                 |

**方案二：** UBI 分区

| 分区   | 大小    |       | 备注                            |
| ------ | ------- | ----- | ------------------------------- |
| spl    | 1MB     | RAW   | 保存 SPL 备份的区域             |
| uboot  | 2MB     | RAW   | 保存 U-Boot，需要预留空闲备用块 |
| env    | 1 Block | RAW   | 保存环境变量                    |
| envbak | 1 Block | RAW   | 保存环境变量备份，可不用        |
| dtb    | 1 Block | UBI   | 保存 kernel dtb                 |
| kernel | .       | UBI   | 保存 kernel                     |
| rootfs | .       | UBIFS |                                 |
| user   | .       | UBIFS |                                 |

上述两个方案中，差别在于 dtb/kernel 部分是否使用 UBI 分区。由于使用 UBI 分区在启动速度上比使用 MTD 分区稍微慢一点，因此后续如果没有其他原因， 优先使用方案一的分区方式，即启动阶段读取的数据统一使用 MTD 分区保存。

**SPL 分区的特别说明**

由于 NAND 可能会有坏块，为了尽可能的支持有坏块的 NAND 器件，ArtInChip 平台对 SPL 备份的存储方案做了一些特殊处理。

- 首先在 NAND 存储设备中，烧录时 SPL 会保存4个备份，每个备份占用一个物理擦除块(PEB)。 因此在 NAND 中，共有4个 PEB 用来保存 SPL。
- 保存 SPL 的 PEB 是从一个固定的候选 PEB 列表中选取的，具体可参考 [表 3.13](#ref-dedicate-spl-blk) 。 因此可能分布在 NAND 器件的不同位置。 由于 NAND 厂商保证前面几个块在出厂时不是坏块，因此大概率前面几个块会被选作 SPL 存储块。 因此 ArtInChip 默认将前面 1MB 分为 SPL 分区。
- PEB 中保存的 SPL 格式，不是原始的 SPL 数据。在烧录时，SPL 数据被分切为固定 2KB 大小的数据切片， 按照页(Page)进行保存，并且使用 Page Table 对这些数据切片进行管理。
- 被选中用于保存 SPL 的 PEB，会被标记为保留块（坏块）。因此在烧录 SPL 之后， NAND 上会出现几个被标记了的坏块，这是正常现象。

*表 3.13* *候选启动块列表*

| 优先顺序 | Block ID | 说明                                               |
| -------- | -------- | -------------------------------------------------- |
| 1        | 0        | 启动分区内，优先使用                               |
| 2        | 1        | 启动分区内，优先使用                               |
| 3        | 2        | 启动分区内，优先使用                               |
| 4        | 3        | 启动分区内，优先使用                               |
| 5        | 202      | 如果是好块，则作为启动块。写入启动镜像后标记为坏块 |
| 6        | 32       | 如果是好块，则作为启动块。写入启动镜像后标记为坏块 |
| 7        | 312      | 如果是好块，则作为启动块。写入启动镜像后标记为坏块 |
| 8        | 296      | 如果是好块，则作为启动块。写入启动镜像后标记为坏块 |
| 9        | 142      | 如果是好块，则作为启动块。写入启动镜像后标记为坏块 |
| 10       | 136      | 如果是好块，则作为启动块。写入启动镜像后标记为坏块 |
| 11       | 392      | 如果是好块，则作为启动块。写入启动镜像后标记为坏块 |
| 12       | 526      | 如果是好块，则作为启动块。写入启动镜像后标记为坏块 |
| 13       | 452      | 如果是好块，则作为启动块。写入启动镜像后标记为坏块 |
| 14       | 708      | 如果是好块，则作为启动块。写入启动镜像后标记为坏块 |
| 15       | 810      | 如果是好块，则作为启动块。写入启动镜像后标记为坏块 |
| 16       | 552      | 如果是好块，则作为启动块。写入启动镜像后标记为坏块 |
| 17       | 906      | 如果是好块，则作为启动块。写入启动镜像后标记为坏块 |
| 18       | 674      | 如果是好块，则作为启动块。写入启动镜像后标记为坏块 |

### 3. SPI NOR 分区配置

具体的分区在项目的 image_cfg.json 中配置，mk_image.py 生成镜像过程中，相关分区信息会被添加到 env.bin， 以 `MTD=` 格式存储在环境变量中：

```
MTD=size1@offset1(partition name1),size2@offset2(partition name2),-(last partition)
```

其中 size 是分区的大小，offset 是分区的开始位置（相对 UDA 的开始位置，单位为字节）。 如果是最后一个分区，可以不设置 `size@offset`，使用 `-` 代替，表示剩余的所有空间都分配给该分区。

例如:

```
MTD=spi0.0:128k(spl),512k(uboot),64k(env),64k(envbak),128k(bootui),128k(dtb),
    5m(kernel),8m(rootfs),-(user)
```

注解

mtdids 与使用的 spi 接口有关系。当使用 spi0 接口时，为 spi0.0；当使用 spi1 接口时，为 spi1.0

**SPL 分区的特别说明**

NOR 分区时，BROM 启动过程中，固定从两个地方读取 SPL 程序的备份。 首先尝试读取 SPL 备份1，如果验证失败，再尝试读取 SPL 备份2。其中备份2是可选的。

*表 3.14* *普通 NOR 的启动分区*

| 分区  | 大小/位置          | 备注 |
| ----- | ------------------ | ---- |
| 备份1 | 128KB(0~128KB)     | 必须 |
| 备份2 | 128KB(128KB~256KB) | 可选 |