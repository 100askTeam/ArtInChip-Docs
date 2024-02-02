---
sidebar_position: 12
---
# 镜像烧录

本章节主要描述 ArtInChip 平台上支持的镜像升级和烧录方式。

## 1. AICUPG 烧录

Artinchip 平台支持通过 USB 进行裸机烧录的功能。通常情况下，该功能在 BROM 阶段通过检测特定按键的方式，或者启动失败时进入。

完整的升级过程分为两个阶段：

- BROM 阶段

  仅支持下载数据和组件到 SRAM/DRAM，以及执行下载的组件。不支持烧录组件到存储介质。

- U-Boot 阶段

  支持从主机端下载数据和组件，并且支持将组件烧录到指定的存储介质。

目前的实现流程是先下载 SPL 组件到 SRAM 并执行，对 DRAM 进行初始化；然后下载 U-Boot 到 DRAM 并执行，进入 U-Boot AICUPG 升级模式。

### 1.1. 基本协议

AICUPG 镜像升级和烧录功能使用自定义的通信协议，该通信协议基于 USB Bulk 传输进行了自定义扩展。

从协议层次架构上看，通信协议分为两层，分别为：

- 传输层
- 应用层

如 [图 3.6](#ref-usb-data-pack1) 和 [图 3.7](#ref-usb-data-pack2) 所示。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/aic_usb_data_packet_1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/aic_usb_data_packet_1-17066892809051.png)

图 3.6 *通信协议：主机发送*

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/aic_usb_data_packet_2.png](https://photos.100ask.net/artinchip-docs/d213-devkit/aic_usb_data_packet_2-17066892870523.png)

图 3.7 *通信协议：主机接收*

USB Bulk 传输协议仅定义了 Bulk 传输的基本行为和数据格式，其他具体应用协议可以在其基础之上进行扩展。

AICUPG 的传输层对 USB Bulk 的 CBW(Command Block Wrapper) 中自定义的命令数据块(Command Block) 部分进行了扩展定义，实现了WRITE/READ 两个基本操作命令。具体如 [表 3.18](#ref-usb-table1) 中 `bCommand` 所示。WRITE 操作用于主机发送数据包，READ 操作用于主机读取数据包。 每个数据包的最大长度为 4KB。

*表 3.18* *CBW 扩展定义*

| 域                     | 字节    | 说明                                                         |
| ---------------------- | ------- | ------------------------------------------------------------ |
| dCBWSignature          | 0 ~ 3   | 魔数，标识 CBW 数据包，值为 “USBC”                           |
| dCBWTag                | 4 ~ 7   | CBW 包的编号                                                 |
| dCBWDataTransferLength | 8 ~ 11  | CBW 之后紧跟的传输数据长度                                   |
| bmCBWFlags             | 12      | 0x00：数据传输方向为主机到设备0x80：数据传输方向为设备到主机 |
| bCBWLUN                | 13      | 没有使用，可忽略                                             |
| bCBWCBLength           | 14      | CBW 命令块有效长度，这里固定为 0x01                          |
| bCommand               | 15      | 0x01: WRITE 表示写操作0x02: READ 表示读操作                  |
| Reserved               | 16 ~ 30 |                                                              |

AICUPG 应用层协议中，对 `CMD HEADER` 和 `RESP HEADER` 定义如下表所示。

| 域          | 字节    | 说明                                  |
| ----------- | ------- | ------------------------------------- |
| dMagic      | 0 ~ 3   | 魔数，值为 “UPGC”                     |
| bProtocol   | 4       | 自定义协议类型0x01: USB 升级协议      |
| bVersion    | 5       | 自定义协议的版本0x01: Version 1       |
| bCommand    | 6       | 命令控制字                            |
| Reserved    | 7       |                                       |
| dDataLength | 8 ~ 11  | CMD HEADER 之后传输给设备的数据长度   |
| dCheckSum   | 12 ~ 15 | CMD HEADER 前 12 字节 32-bit Checksum |

| 域           | 字节    | 说明                                   |
| ------------ | ------- | -------------------------------------- |
| dMagic       | 0 ~ 3   | 魔数，值为 “UPGR”                      |
| bProtocol    | 4       | 自定义协议类型0x01: USB 升级协议       |
| bVersion     | 5       | 自定义协议的版本0x01: Version 1        |
| bRespCommand | 6       | 所响应的命令                           |
| bStatus      | 7       | 命令执行状态0x00: OK0x01: Failed       |
| dDataLength  | 8 ~ 11  | RESP HEADER 之后传输的数据长度         |
| dCheckSum    | 12 ~ 15 | RESP HEADER 前 12 字节 32-bit Checksum |

应用层协议定义了下列用于镜像升级的命令。

| 命令                | 值   | 说明                                                    |
| ------------------- | ---- | ------------------------------------------------------- |
| GET_HWINFO          | 0x00 | 获取硬件相关信息                                        |
| SET_FWC_META        | 0x10 | 发送组件(Firmware Component)的描述信息                  |
| GET_BLOCK_SIZE      | 0x11 | 获取传输的数据块大小， 发送的有效数据须以该块大小为单位 |
| SEND_FWC_DATA       | 0x12 | 发送组件数据                                            |
| GET_FWC_CRC         | 0x13 | 获取设备端对所接收数据计算的CRC值， 以确认传输是否出错  |
| GET_FWC_BURN_RESULT | 0x14 | 获取组件烧录后，设备端的校验结果                        |
| GET_FWC_RUN_RESULT  | 0x15 | 获取组件在运行之后的返回结果                            |

### 1.2. Gadget 实现

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/aic_usb_impl_framework.png](https://photos.100ask.net/artinchip-docs/d213-devkit/aic_usb_impl_framework-17066893397985.png)

图 3.8 *Gadget 实现框架图*

USB 升级过程中，平台端是一个 USB 设备，因此在 U-Boot 中需要实现对应的 Gadget， 在 Gadget 中实现对相应的 USB 命令进行处理。

U-Boot 的 USB 驱动框架支持实现自定义的 Gadget 设备，只需按照框架定义的方式实现相应函数， 并且提供相应的描述符信息即可。Gadget 实现的源码在：

- `drivers/usb/gadget/f_aicupgusb.c`

Gadget 设备通过下面的宏进行 Declare:

```
DECLARE_GADGET_BIND_CALLBACK(usb_dnl_aicupg, aicupg_add);
```

Gadget 描述符中相关的 Vendor ID 和 Product Number 则由 Kconfig 配置：

- CONFIG_USB_GADGET_VENDOR_NUM

  `0x33C3` Artinchip 的专有 Vendor ID

- CONFIG_USB_GADGET_PRODUCT_NUM

  `0x6677` 字符串 “fw” 的 ASCII 码值，表示专门用于镜像升级的 ID

Gadget 实现的接口函数有:

```
f_upg->usb_function.name = "f_aicupg";
f_upg->usb_function.bind = aicupg_bind;
f_upg->usb_function.unbind = aicupg_unbind;
f_upg->usb_function.set_alt = aicupg_set_alt;
f_upg->usb_function.disable = aicupg_disable;
f_upg->usb_function.strings = aicupg_strings;
```

Gadget 层 USB 数据输入输出函数为:

```
void aicupg_trans_layer_read_pkt(struct usb_ep *in_ep,
                                 struct usb_request *in_req);
void aicupg_trans_layer_write_pkt(struct usb_ep *out_ep,
                                  struct usb_request *out_req);
```

具体命令的处理代码实现在：

- `arch/arm/mach-artinchip/aicupg`

Gadget 层通过下面的接口与 `aicupg` 库进行交互:

```
s32 aicupg_data_packet_read(u8 *data, s32 len);
s32 aicupg_data_packet_write(u8 *data, s32 len);
```

### 1.3. 初始化流程

U-Boot 中新增了用于镜像升级的命令 `aicupg` ，可以通过该命令手动进入升级模式， 或者 env.txt 启动脚本中通过检测启动设备信息，在启动过程中主动进入升级模式。

该命令的源码实现在 `cmd/aicupg.c`

USB 升级的初始化从执行下列命令开始:

```
aicupg usb 0
```

具体流程：

```
do_aicupg(); // cmd/aicupg.c
|-> do_usb_protocol_upg(intf); // cmd/aicupg.c
    |-> usb_gadget_initialize(intf); // drivers/usb/gadget/udc/udc-uclass.c
    |-> g_dnl_register("usb_dnl_aicupg"); // drivers/usb/gadget/g_dnl.c
    |
    |   // 接下进入循环，不停调用下面的函数进行数据处理
    |-> usb_gadget_handle_interrupts(intf);
```

此处注册的 “usb_dnl_aicupg” 即为 `f_aicupgusb.c` 中实现的 Gadget。 通过注册添加 Gadget 到系统之后，即可循环检查和处理 USB 数据。

### 1.4. 工作流程

主机端在制作用于烧录的镜像时，根据 `image_cfg.json` 的配置，为每一个组件生成 meta 信息，然后按照 `image_cfg.json` 中的顺序将组件打包为一个镜像文件。

升级的过程使用下列命令，按顺序将镜像文件中的组件，逐个发送给设备端：

| 顺序 | 命令                | 说明                             |
| ---- | ------------------- | -------------------------------- |
| 1    | GET_HWINFO          | 获取当前状态                     |
| 2    | SET_FWC_META        | 发送 Meta 数据                   |
| 3    | GET_BLOCK_SIZE      | 获取发送数据的对齐大小           |
| 4    | SEND_FWC_DATA       | 发送组件数据                     |
| 5    | GET_FWC_CRC         | 获取设备端计算的 CRC 值          |
| 6    | GET_FWC_BURN_RESULT | 检查烧录是否成功                 |
| 7    | GET_FWC_RUN_RESULT  | 对于烧录的组件，该命令总是返回 1 |

组件发送的顺序如 [图 3.9](#ref-usbupg-fwc-order) 所示。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/aic_usb_fwc_order.png](https://photos.100ask.net/artinchip-docs/d213-devkit/aic_usb_fwc_order-17066893625497.png)

图 3.9 *组件发送顺序示意图*

U-Boot 阶段的升级过程包括两个阶段：

- 获取关于升级镜像的基本信息

  一个平台可能支持多个存储介质。升级开始时，平台端首先需要知道本次升级需要烧录的目标存储介质， 这样 U-Boot 才能提前做好相应驱动的初始化。

- 下载和烧录所有的组件

  主机按顺序发送组件数据，U-Boot 将数据烧录到指定的分区/位置。

第一个阶段中，U-Boot 通过接收和解析名为 `image.info` 的组件数据，来获取本次升级要烧录的存储介质信息。 下面是交互过程中 `SEND_FWC_DATA` 的写数据流程:

```
aicupg_data_packet_write(data, len);
|   // arch/arm/mach-artinchip/aicupg/upg_main.c
|-> cmd = get_current_command();
    |-> CMD_SEND_FWC_DATA_write_input_data();
        |   // arch/arm/mach-artinchip/aicupg/fwc_cmd.c
        |-> ram_fwc_data_write(fwc, buf, len);
            // arch/arm/mach-artinchip/aicupg/ram_fwc.c
```

第二个阶段中，U-Boot 接收组件数据，并且烧录到具体的存储介质。以 NAND 为例，数据接收流程如下：

```
aicupg_data_packet_write(data, len);
|   // arch/arm/mach-artinchip/aicupg/upg_main.c
|-> cmd = get_current_command();
    |-> CMD_SEND_FWC_DATA_write_input_data();
        |   // arch/arm/mach-artinchip/aicupg/fwc_cmd.c
        |-> nand_fwc_data_write(fwc, buf, len);
            |   // arch/arm/mach-artinchip/aicupg/nand_fwc.c
            |-> nand_fwc_mtd_writer(fwc, buf, len);
                |-> mtd_write(mtd, offs, len, &retlen, buf);
```

## 2. SDCard 烧录

芯片支持从 SD 卡的 FAT32 文件系统启动。

### 2.1. 要求与步骤

对芯片与板子的要求：

> 1. 板子 SD 卡接口，并且使用 SDMC1
> 2. 芯片没有烧录 跳过 SD 卡的 eFuse

对 SD 卡的要求：

> 1. SD 卡要求只有一个分区
> 2. SD 卡格式化为 FAT32 文件系统，注意不是 exFAT、或者 FAT16
> 3. SD 卡最好为专用卡，里面不要放置太多其他文件

执行步骤：

> 1. 拷贝在编译输出目录(images) 下的两个文件到 SD 卡 FAT32 文件系统的 **根目录**
>
>    > - bootcfg.txt (注意 NAND 输出的名字有些不同，例如 bootcfg.txt(page_2k_block_128k))
>    > - xxx.img(例如 d211_demo_v1.0.0.img)
>
> 2. 确保 bootcfg 文件的名字为 **bootcfg.txt**
>
>    > 如果生成的名字为 bootcfg.txt(page_2k_block_128k)，则需要改为 bootcfg.txt
>
> 3. 将 SD 卡插入板子，重新上电，即可从 SD 卡启动到 U-Boot，并执行烧录
>
> 4. 烧录完成时，需要拔出 SD 卡，然后重新上电启动

注意

烧录完成平台并不会主动重启，以防重复进入 SD 卡烧录模式。

### 2.2. 编译配置

SDK 提供的配置，默认已经使能该功能。 这里罗列一些配置注意项的说明。

#### 2.2.1. eMMC 方案

使能 SDFAT32 烧录功能，只需要在 menuconfig 中勾选配置项 `CONFIG_UPDATE_SD_FATFS_ARTINCHIP` 即可:

```
Update support  --->
[ ] Auto-update using fitImage via TFTP
[ ] Android A/B updates
[*] ArtInChip firmware update using SD Card with FAT
```

同时设置:

> - `CONFIG_ENV_FAT_DEVICE_AND_PART=1`

注意

CONFIG_SPL_MMC_TINY 请勿勾选，否则 SPL 阶段会找不到 SD 卡。

CONFIG_SPL_FIT_IMAGE_TINY 为可选配置项，勾选可以使得 SPL 更小。

#### 2.2.2. SPI NAND/NOR 方案

使能 SDFAT32 烧录功能，需要在 menuconfig 中勾选配置项 `CONFIG_UPDATE_SD_FATFS_ARTINCHIP`

```
Update support  --->
[ ] Auto-update using fitImage via TFTP
[ ] Android A/B updates
[*] ArtInChip firmware update using SD Card with FAT
```

同时设置:

> - `CONFIG_ENV_FAT_DEVICE_AND_PART=0`
> - `CONFIG_SPL_MMC_TINY=y` : 减小 SPL 代码大小
> - `CONFIG_SPL_FIT_IMAGE_TINY=y` : 减小 SPL 代码大小

## 3. U 盘烧录

U 盘烧录是通过提前在平台上烧录支持 U 盘烧录的固件，然后插上带有可用于烧录固件的 U 盘，重新上电即可自动进行烧录。

### 3.1. 要求与步骤

对芯片与板子的要求：

> 1. 板子 USB 并配置为 HSOT 接口。
> 2. 需提前烧录支持 U 盘烧录的固件。

对 U 盘的要求：

> 1. U 盘要求只有一个分区
> 2. U 盘格式化为 FAT32 文件系统，注意不是 exFAT、或者 FAT16
> 3. U 盘里面不要放置太多其他文件

执行步骤：

> 1. 拷贝在编译输出目录(images) 下的两个文件到 U 盘 FAT32 文件系统的 **根目录**
>
>    > - bootcfg.txt (注意 NAND 输出的名字有些不同，例如 bootcfg.txt(page_2k_block_128k))
>    > - xxx.img(例如 d211_demo_v1.0.0.img)
>
> 2. 确保 bootcfg 文件的名字为 **bootcfg.txt**
>
>    > 如果生成的名字为 bootcfg.txt(page_2k_block_128k)，则需要改为 bootcfg.txt
>
> 3. 将 U 盘插入板子，重新上电，即可从 BROM 启动到 U-Boot，并执行烧录更新
>
> 4. 烧录更新完成时，需要拔出 U 盘，然后重新上电启动

注意

烧录完成平台并不会主动重启，以防重复进入 U 盘烧录更新模式。

### 3.2. 编译配置

SDK 提供的配置，默认已经使能该功能。 这里罗列一些配置注意项的说明。

#### 3.2.1. eMMC 方案

使能 U 盘烧录功能，需要在 make uboot-menuconfig 中勾选配置项 `UPDATE_UDISK_FATFS_ARTINCHIP` 与 `CMD_USB_MASS_STORAGE`:

```
Update support  --->
    [ ] Auto-update using fitImage via TFTP
    [ ] Android A/B updates
    [*] ArtInChip firmware update using UDISK with FAT

Command line interface  --->
    Device access commands  --->
        [*] UMS usb mass storage
```

注意

- 使用 U 盘烧录功能需要在设备树中使能对应的 USB HOST 设备树节点。
- CONFIG_SPL_FIT_IMAGE_TINY 为可选配置项，勾选可以使得 SPL 更小。

#### 3.2.2. SPI NAND/NOR 方案

使能 U 盘烧录功能，需要在 make uboot-menuconfig 中勾选配置项 `UPDATE_UDISK_FATFS_ARTINCHIP` 与 `CMD_USB_MASS_STORAGE`

```
Update support  --->
    [ ] Auto-update using fitImage via TFTP
    [ ] Android A/B updates
    [*] ArtInChip firmware update using UDISK with FAT

Command line interface  --->
    Device access commands  --->
        [*] UMS usb mass storage
```

同时设置:

> - `CONFIG_SPL_MMC_TINY=y` : 减小 SPL 代码大小
> - `CONFIG_SPL_FIT_IMAGE_TINY=y` : 减小 SPL 代码大小

## 4. 烧录器烧录

这里烧录器所采用的型号为硕飞 SP328， 下文将对 D211 平台的镜像烧录做一个使用说明， 更多使用方法可参考官方使用文档以及软件使用文档。

软件使用文档可直接启动SOFI SP32软件后点击软件菜单 **[帮助]** - **[查看帮助]** 进行阅读。

### 4.1. 编译配置

对于 NAND 烧录镜像制作，需要设置 ROOTFS 为 UBI 文件格式，设置方法是通过 make menuconfig 打开配置界面配置项 `BR2_TARGET_ROOTFS_UBI` 。

```
Filesystem images  --->
        RootFS images  --->
            [*] ubi image containing an ubifs root filesystem
            [ ]   Use custom config file
            ()    Additional ubinize options
```

注意

该配置仅对于使用 NAND 且用到 UBI 文件系统时需要开启，其它情况无需关注。

### 4.2. 操作步骤

#### 4.2.1. 准备镜像

编译完成后在编译输出目录(images)下找到烧录器烧录所使用到的镜像，例如 d211_demo100_nand_page_2k_block_128k_v1.0.0.bin

#### 4.2.2. 新建项目

烧录器具有自动识别芯片的功能，点击软件菜单 **[芯片]** - **[识别芯片型号]**，选择芯片类型然后点击开始检测，若识别失败，则手动选择芯片型号。

点击软件菜单 **[文件]** - **[新建项目]** , 软件将弹出芯片型号选择对话框, 请根据芯片型号选择匹配的型号;

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/burner_make_new_project.png](https://photos.100ask.net/artinchip-docs/d213-devkit/burner_make_new_project-17066895249449.png)

图 3.10 *新建项目*

#### 4.2.3. 加载烧录数据

点击按钮 **”加载数据…“**，选择前面准备好要烧录的镜像文件。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/burner_load_file.png](https://photos.100ask.net/artinchip-docs/d213-devkit/burner_load_file-170668954116911.png)

图 3.11 *加载烧录文件*

#### 4.2.4. 项目设置

在 **项目设置** 页，进行如下设置：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/burner_project_setting.png](https://photos.100ask.net/artinchip-docs/d213-devkit/burner_project_setting-170668955585113.png)

图 3.12 *项目设置*

#### 4.2.5. NAND Flash 烧录设置

该配置仅 NAND 烧录需要配置，点击按钮 **”NAND Flash 烧录选项”**，进行如下设置

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/burner_project_nand_setting.png](https://photos.100ask.net/artinchip-docs/d213-devkit/burner_project_nand_setting-170668957275615.png)

图 3.13 *NAND Flash 烧录设置*

#### 4.2.6. 项目运行(烧录操作)

点击按钮 **“自动单次”** 即可开始烧录，右侧会显示烧录信息。烧录完成后，即可取下芯片焊接至对应平台进行上电验证。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/burner_project_run.png](https://photos.100ask.net/artinchip-docs/d213-devkit/burner_project_run-170668958729617.png)

图 3.14 *项目运行*

### 4.3. 分区烧录模式

分区烧录模式，仅 NAND Flash 烧录设置有所不用, 其它操作步骤不变。

#### 4.3.1. 导入分区表

点击按钮 **”NAND Flash 烧录选项”**，坏块处理方式选择分区模式，点击图标选择输出目录(images)下 image_part_table.bin 文件，完成分区表导入。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/burner_project_import_part_table.png](https://photos.100ask.net/artinchip-docs/d213-devkit/burner_project_import_part_table-170668960894219.png)

图 3.15 *导入分区表*

### 4.4. 参考文档

使用手册：https://www.sflytech.com/download/software/SP32_Manual_cn.pdf