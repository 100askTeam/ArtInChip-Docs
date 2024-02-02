---
sidebar_position: 4
---

# 4.刷机

上述工作准备好后我们可以来进行一次刷机尝试，刷机使用单机工具： AiBurn， 该工具安装的时候默认会安装好设备的驱动，一般不用特殊处理

### 1. 固件选择

编译系统会根据存储介质的不同而生成不同名称的固件，因此需要根据开发板的不同而选择正确的固件

#### 1.1. SPINAND

以 demo128_nand 工程为例，编译后生成固件的名称为: d211_xxx_page_2k_block_128k_v1.0.0.img

小技巧

不同 page size的 image的配置在 image_cfg.json 中修改

#### 1.2. SPINOR

以 per2_spinor 工程为例，固件名称为 d211_per2_spinor_v1.0.0.img

#### 1.3. EMMC

以 demo 工程为例，固件名称为 d211_demo_v1.0.0.img

小技巧

版本号在工程目录下的 image_cfg.json 中定义

### 2. 刷机模式

开发板需要在刷机模式下才能开始刷机，开发板进入烧写模式有很多种方法：

- 开发板设备为空片，则上电直接进入刷机模式
- 短路烧录引脚（PA0）到地，则上电直接进入刷机模式
- 开发板如果有刷机按键的，则按住刷机键上电或者 reset，则进入刷机模式，开发板上标注为 uboot 按键
- 短路存储介质的 command，clk等引脚到地，造成读数据失败，则上电直接进入刷机模式，如短路 SPINAND 的 4,5 脚
- 如果开发板能进入 U-Boot ，在开机的过程中按住 ctrl + c, 则系统会进入 U-Boot 控制台，输入 aicupg usb 0 命令可以进入烧写模式
- 如果开发板能能进入 Linux 控制台，输入 aicupg 命令，系统可以重启后进入烧写模式
- 如果开发板能能进入 Linux 系统，并且 adb 服务开启，刷机工具会检查到设备并使能 “开始” 按钮，可以直接点击 “开始” 刷机

### 3. PC环境监测

USB 端口为非独占端口，如果在扫描和烧录的过程中被其他服务干扰容易打断烧录进程，因此可以使用 AiBurn “PC环境检测工具”功能来进行环境诊断，对于有冲突的项目可以进行关闭处理

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/aiburn_main_detect.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/aiburn_main_detect-17067713709941.jpg)

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/aiburn_detect_result.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/aiburn_detect_result-17067713769883.jpg)

### 4. 成果

**烧录成功说明存储的配置是正确**