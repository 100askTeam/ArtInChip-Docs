---
sidebar_position: 8
---
# SDMC 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语   | 定义                                | 注释说明                            |
| ------ | ----------------------------------- | ----------------------------------- |
| SD     | Secure Digital                      | Flash存储卡的一种标准，即常见的SD卡 |
| SDCard | Secure Digital Memory Card          | 安全数码卡，同“SD卡”                |
| MMC    | Multi Media Card                    | 多媒体卡                            |
| eMMC   | Embedded Multi Media Card           | 内嵌（在板卡上）式多媒体卡          |
| SDIO   | Secure Digital Input and Output     | 安全数字输入输出接口                |
| SDMC   | SDCard & SDIO & eMMC Host Contollor | SD卡/eMMC 主控制器                  |
| CMD    | Command                             | SD/eMMC 协议的命令                  |
| DMA    | Direct Memory Access                | 直接存储器访问                      |
| SPI    | Serial Peripheral Interface         | 串行外设接口                        |

其中：

- MMC是最早的记忆卡标准，1997年由西门子和SanDisk推出，现在市场上已经很少见了
- SDCard是1998年由松下、东芝和SanDisk合作发布
- SDCard一开始就兼容MMC协议，和MMC在时序设计上保持一致，读写控制命令也一样
- SDIO是在SD标准的基础上，定义了非存储卡的外设接口，可连接WiFi、BT、摄像头等
- SD卡后续还有SDHC（High Capacity，大容量，最大32GB）和SDXC（eXtended Capacity，最大2TB），本文将SD、SDHC、SDXC统称为SD
- eMMC是MMC框架中的一种，经过多年演化后，从2018年起只留下eMMC了
- eMMC可以看作一个集合，其中包含：Nand Flash、Flash控制器、MMC标准接口封装

### 1.2. 模块简介

SDMC V1.0可用于访问三种标准协议：SDCard、eMMC设备、SDIO，硬件上提供了三套SDMC，功能定义如下：

| SDMC  | 支持功能      |
| ----- | ------------- |
| SDMC0 | SDCard、 eMMC |
| SDMC1 | SDCard        |
| SDMC2 | SDIO          |

#### 1.2.1. SD/SDIO 的传输模式

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/sd_mode1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/sd_mode1-17066945767621.png)

图 5.13 *SD/SDIO 的三种传输模式*

SD/SDIO的传输模式有三种：

1. SPI模式：为了兼容性考虑，此模式属于required，对硬件要求低，不支持CRC校验。时钟最高 25MHz，读写速度通常低于 3MB/s。广泛用于MP3等对读卡速度要求不高的场景。
2. 1bit模式：时钟最高 25MHz，最高速率 12.5MB/s
3. 4bit模式：读写时钟最高可达 50MHz，最高速率 25MB/s，是 **SD的主要模式**

其中“1bit模式”和“4bit模式”又可以统称为“SD模式”。

下表是三种传输模式对应的接口信号线定义：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/sd_mode_io1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/sd_mode_io1-17066945922093.png)

图 5.14 *SD/SDIO 三种传输模式的接口定义*

#### 1.2.2. MMC 的工作模式

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/mmc_mode1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/mmc_mode1-17066946065235.png)

图 5.15 *MMC 的工作模式*

MMC标准经过了5个大版本的演化，已经发生了很大的变化。大体上可以分为两种工作模式：

1. SPI模式：可选模式，属于MMC协议的一个子集，最大速率 20Mbps。主要用于小容量、低速率场景，可降低成本，也有很好的兼容性
2. MMC模式：默认模式，具有MMC的全部特性，支持 1/4/8bit 总线模式

MMC模式从传输速率上看又可以分为以下几种：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/mmc_mode_data1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/mmc_mode_data1-17066946202367.png)

图 5.16 *MMC 工作模式及相应速率*

小技巧

1. HS400 是在HS200的基础上增加 DDR 模式（信号双边采样），将理论速率提升一倍。
2. MMC 上电或者复位后，默认处于 1bit 模式，只使用信号线DAT[0]传输数据，后续通过命令将其配置为4/8bit模式。
3. eMMC芯片不支持SPI模式。

#### 1.2.3. SDMC 的功能特性

SDMC支持的最大接口频率为200MHz，支持1/4/8线数据总线模式，满足eMMC标准协议和SDCard/SDIO接口协议。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/hw_structure6.png](https://photos.100ask.net/artinchip-docs/d213-devkit/hw_structure6-17066946363109.png)

图 5.17 *SDMC 硬件原理示意图*

SDMC支持的特性有：

- 支持eMMC5.0，SD3.01和SDIO3.0，向下兼容
- 支持eMMC SDR/DDR模式，接口时钟频率最大200MHz
- 支持3.3V工作电压
- 支持DDR 4线和8线模式
- 使用内部DMA模式，支持单通道、双缓存和描述符链表传输
- 支持FIFO深度为 128，FIFO位宽为32bit
- 支持CRC生成和错误检测

## 2. 参数配置

### 2.1. 内核配置

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，按如下选择：

```
Linux
    Device Drivers
        <*> MMC/SD/SDIO card support
            <*>   MMC block device driver
            <*>   Artinchip Memory Card Interface
```

### 2.2. DTS 参数配置

#### 2.2.1. SDMC 的扩展 DTS 参数

SDMC驱动基于Linux内核的MMC子系统，MMC子系统中提供了很多常用的参数，如下表：

| 参数名称     | 类型    | 取值范围       | 功能说明               |
| ------------ | ------- | -------------- | ---------------------- |
| max-frequenc | 正整数  | > 0            | 控制器可输出的最大频率 |
| bus-width    | 正整数  | 1, 4, 8        | 控制器的数据位宽       |
| sd-uhs-sdr50 | boolean | 有 - 1，无 - 0 | 配置SDCard的SDR50模式  |
| no-sd        | boolean | 有 - 1，无 - 0 | 关闭SDCard的功能支持   |
| no-sdio      | boolean | 有 - 1，无 - 0 | 关闭SDIO的功能支持     |
| no-mmc       | boolean | 有 - 1，无 - 0 | 关闭eMMC的功能支持     |

详见代码 drivers/mmc/core/host.c中的函数 mmc_of_parse()。

SDMC驱动在此基础上扩展了两个关于FIFO设置的参数，如下表：

| 参数名称                   | 类型    | 取值范围       | 功能说明                    |
| -------------------------- | ------- | -------------- | --------------------------- |
| aic,fifo-depth             | 正整数  | [1, 128]       | 控制器的FIFO深度            |
| aic,fifo-watermark-aligned | boolean | 有 - 1，无 - 0 | FIFO水位是按2的整数次幂对齐 |

#### 2.2.2. D211 配置

SDMC V1.0有三个接口：SDMC0、SDMC1、SDMC2，所以在DTS中体现为三个独立的设备节点。

common/d211.dtsi中的参数配置：

```
sdmc0: sdmc@10440000 {
    compatible = "artinchip,aic-sdmc-v1.0";
    reg = <0x0 0x10440000 0x0 0x1000>;
    interrupts-extended = <&plic0 46 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cmu CLK_SDMMC0>;
    clock-names = "ciu";
    resets = <&rst RESET_SDMMC0>;
    reset-names = "reset";
    #address-cells = <1>;
    #size-cells = <0>;
    max-frequency = <24000000>;
    clock-frequency = <48000000>;
    bus-width = <4>;
    fifo-depth = <128>;
};

sdmc1: sdmc@10450000 {
    compatible = "artinchip,aic-sdmc-v1.0";
    reg = <0x0 0x10450000 0x0 0x1000>;
    interrupts-extended = <&plic0 47 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cmu CLK_SDMMC1>;
    clock-names = "ciu";
    resets = <&rst RESET_SDMMC1>;
    reset-names = "reset";
    #address-cells = <1>;
    #size-cells = <0>;
    max-frequency = <24000000>;
    clock-frequency = <48000000>;
    bus-width = <4>;
    fifo-depth = <128>;
};

sdmc2: sdmc@10460000 {
    compatible = "artinchip,aic-sdmc-v1.0";
    reg = <0x0 0x10460000 0x0 0x1000>;
    interrupts-extended = <&plic0 48 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cmu CLK_SDMMC2>;
    clock-names = "ciu";
    resets = <&rst RESET_SDMMC2>;
    reset-names = "reset";
    #address-cells = <1>;
    #size-cells = <0>;
};
```

#### 2.2.3. Board 中的配置

如果按以下功能定义三个控制器：

1. SDMC0 - eMMC
2. SDMC1 - SDCard
3. SDMC2 - SDIO

xxx/board.dts中的配置参数如下：

```
&sdmc0 {
    pinctrl-names = "default";
    pinctrl-0 = <&sdmc0_pins>;
    no-sd;
    no-sdio;
    status = "okay";
};

&sdmc1 {
    pinctrl-names = "default";
    pinctrl-0 = <&sdmc1_pins>;
    no-mmc;
    no-sdio;
    status = "okay";
};

&sdmc2 {
    pinctrl-names = "default";
    pinctrl-0 = <&sdmc2_pins>;
    no-mmc;
    no-sd;
    status = "disabled";
};
```

#### 2.2.4. 热插拔配置

小技巧

SDMC1控制器硬件支持热插拔中断，SDMC驱动中默认已使能，无需另外配置，下文主要是针对SDMC0/2控制器。

SDMC热插拔功能基于Linux内核的MMC子系统，MMC子系统提供了两种方式实现热插拔：

1. 轮询监控：主要实现每隔一段时间（一般是HZ，1s）扫描一下mmc硬件总线。
2. 中断监控：通过card detect(简称为cd)引脚电平变化触发中断，从而告知CPU说sdcard插入状态发生变化。

MMC子系统中提供了以下关于热插拔的参数，如下表：

| 参数名称             | 类型    | 取值范围       | 功能说明              |
| -------------------- | ------- | -------------- | --------------------- |
| cd-inverted          | boolean | 有 - 1，无 - 0 | gpio检测电平翻转      |
| cd-debounce-delay-ms | 正整数  | > 0            | gpio消抖（默认200ms） |
| broken-cd            | boolean | 有 - 1，无 - 0 | 配置为轮询监控功能    |
| cd-gpios             | array   | 同普通gpio配置 | 配置中断监控的gpio值  |

下面为SDMC0控制器轮询监控方式配置热插拔：

xxx/board.dts中的配置参数如下：

```
&sdmc0 {
    pinctrl-names = "default";
    pinctrl-0 = <&sdmc0_pins>;
    broken-cd;
    status = "okay";
};
```

下面为SDMC2控制器中断监控方式配置热插拔：

xxx/board.dts中的配置参数如下：

```
&sdmc2 {
    pinctrl-names = "default";
    pinctrl-0 = <&sdmc2_pins>;
    cd-inverted;//根据硬件设计配置
    cd-gpios = <&gpio_c 8 GPIO_ACTIVE_HIGH>;//根据硬件设计配置
    cd-debounce-delay-ms = <250>;
    status = "okay";
};
```

## 3. 调试指南

### 3.1. 调试开关

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，可以打开SDMC模块的DEBUG选项：

```
Linux
    Kernel hacking
        Artinchip Debug
            [*] SD&MMC Host Controller driver debug
```

此DEBUG选项打开的影响：

1. MMC子系统（含SDMC驱动）以-O0编译
2. MMC子系统（含SDMC驱动）的pr_dbg()和dev_dbg()调试信息会被编译

在系统运行时，如果要打印pr_dbg()和dev_dbg()信息，还需要调整loglevel为8，两个方法：

1. 在board.dts中修改bootargs，增加“loglevel=8”
2. 在板子启动到Linux shell后，执行命令：

```
echo 8 > /proc/sys/kernel/printk
```

SDMC驱动中还使用了 `dev_vdbg()` 调试接口，打开该接口的方法是在 .c 中定义一个宏开关 VERBOSE_DEBUG，然后重新编译，`dev_vdbg()` 就会转成 `dev_dbg()`，否则为空。

如在artinchip_mmc.c中起始位置定义 VERBOSE_DEBUG：

```
#define VERBOSE_DEBUG
```

## 4. 测试指南

### 4.1. 测试环境

#### 4.1.1. 硬件

- 开发板，或者FPGA板子
- 板子上必须要接有eMMC/SDCard

#### 4.1.2. 软件

- PC端的串口终端软件，用于PC和开发板进行串口通信
- Linux内核原生的mmc_test工具，用于MMC Host驱动的功能测试
- Luban自带的iozone工具，用于块设备的性能测试

#### 4.1.3. 软件配置

##### 4.1.3.1. mmc_test

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，按如下选择：

```
Linux
    Device Drivers
        <*> MMC/SD/SDIO card support
            < >   MMC block device driver
            <*>   MMC host test driver
```

注解

mmc_test必须要关闭MMC Block选项，否则mmc_test模块不会被内核加载。

##### 4.1.3.2. iozone

在luban根目录，运行make menuconfig，按如下选择：

```
Third-party packages
    [*] iozone
```

### 4.2. mmc_test 测试

mmc_test的主要功能是测试符合MMC子系统的Host驱动功能，源码详见 driversmmccoremmc_test.c。

板子在启动到shell后，首先要挂载debugfs文件系统，然后可以查看mmc_test的测试节点：

```
[aic@] # mount -t debugfs none /sys/kernel/debug/
[aic@] # cd /sys/kernel/debug/mmc0/mmc0\:0001/
[aic@mmc0:0001] # ls
state     test      testlist
[aic@mmc0:0001] # cat testlist # 此时会打印测试选项
0:      Run all tests
1:      Basic write (no data verification)
2:      Basic read (no data verification)
3:      Basic write (with data verification)
4:      Basic read (with data verification)
5:      Multi-block write
6:      Multi-block read
7:      Power of two block writes
8:      Power of two block reads
9:      Weird sized block writes
10:     Weird sized block reads
11:     Badly aligned write
12:     Badly aligned read
13:     Badly aligned multi-block write
14:     Badly aligned multi-block read
15:     Correct xfer_size at write (start failure)
16:     Correct xfer_size at read (start failure)
17:     Correct xfer_size at write (midway failure)
18:     Correct xfer_size at read (midway failure)
19:     Highmem write
20:     Highmem read
21:     Multi-block highmem write
22:     Multi-block highmem read
23:     Best-case read performance
24:     Best-case write performance
25:     Best-case read performance into scattered pages
26:     Best-case write performance from scattered pages
27:     Single read performance by transfer size
28:     Single write performance by transfer size
29:     Single trim performance by transfer size
30:     Consecutive read performance by transfer size
31:     Consecutive write performance by transfer size
32:     Consecutive trim performance by transfer size
33:     Random read performance by transfer size
34:     Random write performance by transfer size
35:     Large sequential read into scattered pages
36:     Large sequential write from scattered pages
37:     Write performance with blocking req 4k to 4MB
38:     Write performance with non-blocking req 4k to 4MB
39:     Read performance with blocking req 4k to 4MB
40:     Read performance with non-blocking req 4k to 4MB
41:     Write performance blocking req 1 to 512 sg elems
42:     Write performance non-blocking req 1 to 512 sg elems
43:     Read performance blocking req 1 to 512 sg elems
44:     Read performance non-blocking req 1 to 512 sg elems
45:     Reset test
46:     Commands during read - no Set Block Count (CMD23)
47:     Commands during write - no Set Block Count (CMD23)
48:     Commands during read - use Set Block Count (CMD23)
49:     Commands during write - use Set Block Count (CMD23)
50:     Commands during non-blocking read - use Set Block Count (CMD23)
51:     Commands during non-blocking write - use Set Block Count (CMD23)us
```

根据需求，选一个测试项，将其编号写入test节点，如使用测试项1：

```
[aic@mmc0:0001] # echo 1 > test
[  162.185679] mmc0: Starting tests of card mmc0:0001...
[  162.190820] mmc0: Test case 1. Basic write (no data verification)...
[  162.209563] mmc0: Result: OK
[  162.212462] mmc0: Tests completed.
```

为了方便测试，可以通过以下脚本 批量运行完所有的mmc_test测试项：

```
#!/bin/sh

run_one_testcase()
{
    echo $1 > test
    if [ $? -ne 0 ]; then
        echo ERROR: Testcase $i failed!
        exit 110
    fi
}

run_memtest()
{

    echo Prepare the debugfs ...
    mount -t debugfs none /sys/kernel/debug/
    cd /sys/kernel/debug/mmc0/mmc0:0001

    echo
    echo Run memtest ...
    echo

    CNT=1
    while true
    do
        echo
        echo ----------------------------------------------------------
        echo Run all the testcase, count $CNT ...
        echo ----------------------------------------------------------

        echo
        echo Run in order sequence ...
        echo

        for i in `seq 0 51`;
        do
            run_one_testcase $i
        done

        echo
        echo Run in random sequence ...
        echo

        for i in `seq 0 51`;
        do
            $TMP=`expr $RANDOM % 52`
            run_one_testcase $TMP
        done

        CNT=`expr $CNT + 1`
    done
}

run_memtest()
```

### 4.3. iozone测试

iozone测试需要用到块设备，必须要将内核中的MMC Block打开：

```
Linux
    Device Drivers
        <*> MMC/SD/SDIO card support
            <*>   MMC block device driver
```

iozone本身是用来做性能测试，如果使用脚本长时间的循环运行就可用于稳定性测试。

测试步骤：

1. 格式化MMC块设备/SDCard块设备为ext4文件系统；
2. 将格式化后的块设备挂载到某个路径；
3. 在上述路径中运行iozone工具即可。

小技巧

1. iozone运行过程中会在当前目录下创建一个临时文件，该文件的大小会根据测试数据粒度而自动调整。
2. iozone支持将性能数据作为结果存储到一个Excel文件中，方便查看。

以下是调用iozone的循环测试脚本：

```
#!/bin/sh

if [ ! -z $1 ] && [ ! -z $2 ]; then
    FILE_MIN_SIZE=$1
    FILE_MAX_SIZE=$2
else
    FILE_MIN_SIZE=16m
    FILE_MAX_SIZE=128m
fi

RESULT_FILE=iozone_result.xls
TMP_FILE=iozone.tmp

run_cmd()
{
    echo
    echo $1
    echo
    eval $1
}

mount_mmc()
{
    HOSTNAME=`hostname`
    if [ $HOSTNAME = "Artinchip" ]; then
        WORKSPACE_DIR=/mnt/sdcard
        MMC_DEV=/dev/mmcblk0p9

        echo Mount $MMC_DEV ...
        if [ "$1" != "debug" ]; then
            # mkfs.vfat $MMC_DEV 2048000
            mount -t vfat $MMC_DEV $WORKSPACE_DIR
        fi
        if [ $? -ne 0 ]; then
            echo ERR: Failed to mount $MMC_DEV
            exit 100
        fi
    else
        WORKSPACE_DIR=./mnt/sdcard
        echo Use the local path: $WORKSPACE_DIR
    fi
}

mount_udisk()
{
    WORKSPACE_DIR=/mnt/usb
    UDISK_DEV=/dev/sda1

    echo Mount $UDISK_DEV ...
    mount -t vfat $UDISK_DEV $WORKSPACE_DIR
    if [ $? -ne 0 ]; then
        echo ERR: Failed to mount $UDISK_DEV
        exit 100
    fi
}

mount_mtd()
{
    WORKSPACE_DIR=/mnt/mtd
    if [ ! -d $WORKSPACE_DIR ]; then
        mkdir -p $WORKSPACE_DIR
    fi
}

umount_all()
{
    cd -
    umount -f $WORKSPACE_DIR
}

check_stop()
{
    echo
    echo Press \'any key\' + \'EnterKey\' to stop testing
    read -t 5 CMD
    if [ ! -z $CMD ]; then
        umount_all
        exit 100
    fi
}

if [ -b /dev/sda ]; then
    mount_udisk
elif [ -b /dev/mmcblk0 ]; then
    mount_mmc $1
elif [ -c /dev/mtd0 ]; then
    mount_mtd
else
    echo There is no block device in the board!
    exit 110
fi

echo Enter workspace $WORKSPACE_DIR
cd $WORKSPACE_DIR

CNT=1
while true
do
    echo
    echo ----------------------------------------------------------
    echo iozone test, count $CNT
    echo ----------------------------------------------------------
    date

    run_cmd "iozone -a -V -n $FILE_MIN_SIZE -g $FILE_MAX_SIZE -q 16m -w -b $RESULT_FILE -f $TMP_FILE"

    check_stop

    CNT=`expr $CNT + 1`
done
```

## 5. 设计说明

### 5.1. 源码说明

源代码位于 drivers/mmc/host/：

- artinchip-mmc.c，SDMC驱动实现
- artinchip-mmc.h，SDMC的寄存器、数据结构定义

### 5.2. 模块架构

Linux中提供了MMC子系统，该子系统负责抽象一个块设备提供给通用块层使用，从整个软件的角度来看，架构如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/sw_system19.png](https://photos.100ask.net/artinchip-docs/d213-devkit/sw_system19-170669495808711.png)

图 5.18 *Linux MMC子系统架构图*

其中：

1. 对用户而言，MMC card层提供了一种块设备，和其他块设备使用方法类似

2. - MMC子系统的核心层的功能有：

     对上层请求的处理，其中包括将请求转化为符合MMC协议的逻辑实现对控制器驱动进行管理将外部MMC设备抽象并进行管理

3. AIC SDMC控制器驱动：负责通过对寄存器的操作实现MMC子系统传来的请求

### 5.3. 关键流程设计

#### 5.3.1. 初始化流程

MMC子系统的初始化包括MMC块设备、MMC子系统、MMC控制器驱动、card设备等几条线，初始化顺序：

- 最先进行的是MMC核心初始化
- MC控制器驱动初始化完成后才会对card设备进行初始化
- MMC块设备初始化没有严格的先后顺序

##### 5.3.1.1. MMC 块设备驱动初始化

MMC在使用中，会将其抽象成一个块设备挂载到通用块层当中，通过module_init(mmc_blk_init)完成注册和初始化的操作，主要步骤如下：

1. 注册总线（bus_register）
2. 将块设备名”mmc”和主设备注册到块层中（register_blkdev）
3. 将mmc_driver设备驱动注册到驱动模型中（mmc_register_driver）
4. 块设备的初始化及磁盘分区的注册（mmc_blk_probe）

##### 5.3.1.2. MMC 子系统核心初始化

MMC子系统的核心层负责处理block下达的请求，其中关于MMC协议的逻辑主要在此实现，通过subsys_initcall(mmc_init)完成初始化，其步骤如下：

1. MMC类型总线注册，（mmc_register_bus）
2. 为控制器设备注册一个类，（mmc_register_host_class）
3. SDIO类型总线类型注册，（sdio_register_b）

##### 5.3.1.3. card 设备注册与初始化

MMC驱动的访问对象为外设，在子系统中会将外设抽象成一个card设备，在每次探测外设的时候都会判断该设备是否需要被注册，所以card设备注册介绍分为探测时机和注册过程两部分：

1. - 探测时机：

     mmc控制器启动时热插拔时mmc控制器从suspend转为resume时上述三种情况均会进行一次探测，都会调用到函数mmc_detect_change

2. - 注册过程：

     在探测时调用的函数mmc_detect_change，该函数会调用card设备的注册函数mmc_rescan，以SD卡为例,其注册和初始化过程如下：判断当前卡是否被注册若卡已经注册，则确认卡是否存在，存在则提前跳出，若不存在则释放相关资源若卡未注册，则启动控制器进行卡的初始化步骤为控制器绑定具体总线的操作函数（mmc_attach_bus(host, &mmc_sd_ops)）适配卡的工作电压（mmc_select_voltage）根据MMC协议初始化卡，使卡进入传输模式化（mmc_sd_init_card）注册卡设备（mmc_add_card）

##### 5.3.1.4. 控制器驱动注册与初始化

MMC控制器驱动通过对控制器进行操作完成核心层的请求，控制器驱动也是实现和外设进行通信的软件最底层驱动，该层驱动根据厂商不同而不同，D211的SDMC模块的控制器驱动通过 module_platform_driver(artinchip_mmc_aic_pltfm_driver)实现，其主要步骤如下：

1. 使能时钟（artinchip_mmc_clk_enable）
2. 初始化计时机制，该机制实现发送命令和数据传输的timeout机制（timer_setup）
3. 初始化保护锁（spin_lock_init）
4. 初始化tasklet，在驱动中很多流程的处理会在tasklet中（tasklet_init）
5. 初始化DMA（artinchip_mmc_init_dma）
6. 中断初始化和注册（devm_request_irq）
7. 注册具体的控制器（mmc_alloc_host + mmc_add_host）
8. 初始化具体控制器，包括接口函数、工作电压、传输能力等

#### 5.3.2. 请求处理流程

对于应用程序，通过读写的接口访问文件系统，文件系统访问块设备，MMC设备在内核中被注册为一个块设备，当读写的操作传入到MMC块设备后，通过MMC子系统处理相关操作，对于MMC子系统其处理皆以请求的方式实现。

##### 5.3.2.1. 块层以上系统读写调用流程

在块层以上，通常是用户空间调用读写接口访问MMC设备，主要流程如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/blkdev_access_flow.png](https://photos.100ask.net/artinchip-docs/d213-devkit/blkdev_access_flow-170669500897213.png)

图 5.19 *通用块设备的访问流程*

1. 在用户空间，应用程序调用read/write接口
2. 然后通过虚拟文件系统
3. 调用通用块层的接口对块设备进行IO请求
4. IO调度层负责使用特定算法对这些请求进行调度
5. 块设备驱动层调用具体的块设备接口访问设备

##### 5.3.2.2. MMC 子系统请求处理流程

MMC子系统被抽象成一个块设备，通用块层将IO请求调用到具体的块设备驱动层，在MMC块设备驱动中的请求处理流程如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/mmc_request_flow.png](https://photos.100ask.net/artinchip-docs/d213-devkit/mmc_request_flow-170669502452215.png)

图 5.20 *MMC数据请求的处理流程*

1. 由于会有多个请求，在block中以队列的形式处理，在请求到达时，唤醒mmc_queue_thread
2. 调用block的请求处理，发出request
3. block的request会由core来实现
4. core层会根据当前host驱动调用对应host的ops中的request接口去操作controller

函数调用关系：

```
mmc_wait_for_req
|--__mmc_start_req
|--init_completion
            |--mmc_start_request
                |--mmc_mrq_prep
                |--__mmc_start_request
                    |--trace_mmc_request_start
                    |--host->ops->request （即artinchip_mmc_request）
```

##### 5.3.2.3. Host 层驱动请求处理流程

在访问MMC外设时，都是通过发送CMD的方式，在host层驱动中需要通过操作controller去实现core层的request，主要流程如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/host_request_flow.png](https://photos.100ask.net/artinchip-docs/d213-devkit/host_request_flow-170669504747917.png)

图 5.21 *Host 层驱动的请求处理流程*

1. 检测卡设备，需要判断当前卡设备是否被拔出
2. 判断传输状态，如果当前传输状态不是idle，那么将会将该请求放在请求队列里
3. 处理data，如果当前请求需要处理数据，则将数据先行处理，如果不需要处理数据则跳过
4. 发送CMD，解析请求中的CMD和参数，将其写入寄存器，然后触发CMD的发送
5. 中断处理，在发送完CMD后，后续的工作需要等待中断的触发，在中断处理中会对外设返回的数据和状态进行处理
6. 如果需要，发送stop命令，结束该次传输

Host层函数调用关系：

```
artinchip_mmc_request
|--artinchip_mmc_get_cd
|--artinchip_mmc_queue_request
|--artinchip_mmc_start_request
        |--artinchip_mmc_prepare_command
        |--artinchip_mmc_submit_data
        |--artinchip_mmc_start_command
        |--artinchip_mmc_prep_stop_abort
```

#### 5.3.3. 中断处理流程

在触发中断后，需要根据目前的中断状态进行处理，其中主要为错误处理和传输处理，这些处理主要在tasklet中，并且基于一些状态变量来控制处理的流程。

1. - 状态变量。在流程的控制上，主要通过几个状态变量来控制：

     host->state：表示当前的操作状态，例如发送数据，发送CMD等等host->pending_events：当前中断发生的状态host->completed_events：当前完成的状态，例如CMD完成，DATA完成等host->cmd_status：发送CMD时中断的状态host->data_status：传输数据时中断的状态

2. - 传输处理

     当CMD发送完成中断触发后，会在tasklet中调用函数artinchip_mmc_command_complete，该函数中会读取外部SD设备返回给控制器的response数据，再根据当前的CMD状态对CMD的结果进行赋值如果使用的是PIO的方式，当TX/RX FIFO请求中断响应后，会调用对应的函数对FIFO进行读写操作。若是采用DMA的方式，则在中断函数中读取内部DMA状态，然后释放DMA传输的资源，再根据DMA的状态，在tsaklet中调用artinchip_mmc_data_complete函数，该函数会根据目前的数据传输情况对传输结果进行赋值

3. - 错误处理。目前SDMC支持的错误中断类型有

     CMD错误中断：当出现CMD错误中断后，在中断处理函数中，会将当前中断寄存器的状态保存，然后设置cmd的状态为已经完成，最后在artinchip_mmc_command_complete函数中将CMD的结果进行赋值。DATA错误中断：当出现DATA中断后，在中断处理函数中会将当前的中断状态保存，然后设置data的状态为DATA错误，然后切入到tasklet函数中，在该函数中，根据DATA错误的状态，停止dma，如果有需求，就发送stop命令

### 5.4. 数据结构设计

#### 5.4.1. enum artinchip_mmc_state

定义了SDMC控制器的几个状态：

```
enum artinchip_mmc_state {
    STATE_IDLE = 0,
    STATE_SENDING_CMD,
    STATE_SENDING_DATA,
    STATE_DATA_BUSY,
    STATE_SENDING_STOP,
    STATE_DATA_ERROR,
    STATE_SENDING_CMD11,
    STATE_WAITING_CMD11_DONE,
};
```

#### 5.4.2. artinchip_mmc

记录了SDMC控制器的设备信息：

```
struct artinchip_mmc {
    spinlock_t      lock;
    spinlock_t      irq_lock;
    void __iomem        *regs;
    void __iomem        *fifo_reg;
    bool            wm_aligned;

    struct scatterlist  *sg;
    struct sg_mapping_iter  sg_miter;

    struct mmc_request  *mrq;
    struct mmc_command  *cmd;
    struct mmc_data     *data;
    struct mmc_command  stop_abort;
    unsigned int        prev_blksz;
    unsigned char       timing;

    /* DMA interface members*/
    bool            use_dma;
    bool            using_dma;

    dma_addr_t      sg_dma;
    void            *sg_cpu;
    const struct artinchip_mmc_dma_ops  *dma_ops;
    /* For idmac */
    unsigned int        ring_size;

    /* Registers's physical base address */
    resource_size_t     phy_regs;

    u32         cmd_status;
    u32         data_status;
    u32         stop_cmdr;
    u32         dir_status;
    struct tasklet_struct   tasklet;
    unsigned long       pending_events;
    unsigned long       completed_events;
    enum artinchip_mmc_state    state;
    struct list_head    queue;

    u32         bus_hz;
    u32         current_speed;
    u32         fifoth_val;
    u16         verid;
    struct device       *dev;
    struct artinchip_mmc_board  *pdata;
    const struct artinchip_mmc_drv_data *drv_data;
    void            *priv;
    struct clk      *biu_clk;
    struct clk      *ciu_clk;
    struct artinchip_mmc_slot   *slot;

    /* FIFO push and pull */
    int         fifo_depth;
    int         data_shift;
    u8          part_buf_start;
    u8          part_buf_count;
    enum data_width data_width;
    union {
        u16     part_buf16;
        u32     part_buf32;
        u64     part_buf;
    };

    bool            vqmmc_enabled;
    unsigned long       irq_flags; /* IRQ flags */
    int         irq;

    struct timer_list       cmd11_timer;
    struct timer_list       cto_timer;
    struct timer_list       dto_timer;
};
```

#### 5.4.3. artinchip_mmc_board

记录了Board相关的配置信息：

```
struct artinchip_mmc_board {
    unsigned int bus_hz; /* Clock speed at the cclk_in pad */

    u32 caps;   /* Capabilities */
    u32 caps2;  /* More capabilities */
    u32 pm_caps;    /* PM capabilities */
    /*
     * Override fifo depth. If 0, autodetect it from the FIFOTH register,
     * but note that this may not be reliable after a bootloader has used
     * it.
     */
    unsigned int fifo_depth;

    /* delay in mS before detecting cards after interrupt */
    u32 detect_delay_ms;

    struct reset_control *rstc;
    struct artinchip_mmc_dma_ops *dma_ops;
    struct dma_pdata *data;
};
```

#### 5.4.4. artinchip_mmc_slot

记录了slot相关的配置信息：

```
struct artinchip_mmc_slot {
    struct mmc_host     *mmc;
    struct artinchip_mmc        *host;

    u32         ctype;

    struct mmc_request  *mrq;
    struct list_head    queue_node;

    unsigned int        clock;
    unsigned int        __clk_old;

    unsigned long       flags;
#define ARTINCHIP_MMC_CARD_PRESENT  0
#define ARTINCHIP_MMC_CARD_NEED_INIT    1
#define ARTINCHIP_MMC_CARD_NO_LOW_PWR   2
#define ARTINCHIP_MMC_CARD_NO_USE_HOLD 3
#define ARTINCHIP_MMC_CARD_NEEDS_POLL   4
};
```

#### 5.4.5. artinchip_mmc_drv_data

记录了AIC SDMC驱动的特有数据：

```
struct artinchip_mmc_drv_data {
    unsigned long   *caps;
    u32     num_caps;
    int     (*init)(struct artinchip_mmc *host);
    int     (*parse_dt)(struct artinchip_mmc *host);
    int     (*execute_tuning)(struct artinchip_mmc_slot *slot, u32 opcode);
    int     (*switch_voltage)(struct mmc_host *mmc,
                      struct mmc_ios *ios);
};
```

### 5.5. 接口设计

以下接口皆为MMC子系统所需要的标准接口，通过mmc_host_ops注册到MMC子系统。

```
static const struct mmc_host_ops artinchip_mmc_ops = {
    .request        = artinchip_mmc_request,
    .pre_req        = artinchip_mmc_pre_req,
    .post_req       = artinchip_mmc_post_req,
    .set_ios        = artinchip_mmc_set_ios,
    .get_ro         = artinchip_mmc_get_ro,
    .get_cd         = artinchip_mmc_get_cd,
    .hw_reset               = artinchip_mmc_hw_reset,
    .enable_sdio_irq    = artinchip_mmc_enable_sdio_irq,
    .ack_sdio_irq       = artinchip_mmc_ack_sdio_irq,
    .execute_tuning     = artinchip_mmc_execute_tuning,
    .card_busy      = artinchip_mmc_card_busy,
    .start_signal_voltage_switch = artinchip_mmc_switch_voltage,
    .init_card      = artinchip_mmc_init_card,
};
```

#### 5.5.1. artinchip_mmc_request

| 函数原型 | static void artinchip_mmc_request(struct mmc_host *mmc, struct mmc_request *mrq) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 读取当前的RTC时间                                            |
| 功能说明 | 操作寄存器实现request                                        |
| 参数定义 | mmc: MMC设备指针mrq：请求的参数和资源                        |
| 返回值   | 无                                                           |
| 注意事项 |                                                              |

#### 5.5.2. artinchip_mmc_pre_req

| 函数原型 | static void artinchip_mmc_pre_req(struct mmc_host *mmc, struct mmc_request *mrq) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 准备下一个request                                            |
| 参数定义 | mmc: MMC设备指针mrq：请求的参数和资源                        |
| 返回值   | 无                                                           |
| 注意事项 | 在准备下一个请求前，一般需要调用artinchip_mmc_post_request   |

#### 5.5.3. artinchip_mmc_post_req

| 函数原型 | static void artinchip_mmc_post_req(struct mmc_host *mmc, struct mmc_request *mrq, int err) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 送出一个request                                              |
| 参数定义 | mmc: MMC设备指针mrq：请求的参数和资源err：如果非零，需要清理掉pre_req()中申请的资源 |
| 返回值   | 无                                                           |
| 注意事项 |                                                              |

#### 5.5.4. artinchip_mmc_set_ios

| 函数原型 | static void artinchip_mmc_set_ios(struct mmc_host *mmc, struct mmc_ios *ios) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 对设备的位宽、DDR模式、clock、power模式等进行配置            |
| 参数定义 | mmc: MMC设备指针ios：配置参数                                |
| 返回值   | 无                                                           |
| 注意事项 |                                                              |

#### 5.5.5. artinchip_mmc_get_cd

| 函数原型 | static int artinchip_mmc_get_cd(struct mmc_host *mmc) |
| -------- | ----------------------------------------------------- |
| 功能说明 | 探测外部SD设备                                        |
| 参数定义 | mmc: MMC设备指针                                      |
| 返回值   | 执行成功则返回1                                       |
| 注意事项 |                                                       |

#### 5.5.6. artinchip_mmc_hw_reset

| 函数原型 | static void artinchip_mmc_hw_reset(struct mmc_host *mmc) |
| -------- | -------------------------------------------------------- |
| 功能说明 | 对MMC控制器、DMA等进行一次reset                          |
| 参数定义 | mmc: MMC设备指针                                         |
| 返回值   | 无                                                       |
| 注意事项 |                                                          |

#### 5.5.7. artinchip_mmc_enable_sdio_irq

| 函数原型 | static void artinchip_mmc_enable_sdio_irq(struct mmc_host *mmc, int enb) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 使能或者关闭MMC控制器的中断                                  |
| 参数定义 | mmc: MMC设备指针enb：使能开关                                |
| 返回值   | 无                                                           |
| 注意事项 |                                                              |

#### 5.5.8. artinchip_mmc_ack_sdio_irq

| 函数原型 | static void artinchip_mmc_ack_sdio_irq(struct mmc_host *mmc) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 打开MMC控制器的中断                                          |
| 参数定义 | mmc: MMC设备指针                                             |
| 返回值   | 无                                                           |
| 注意事项 |                                                              |

#### 5.5.9. artinchip_mmc_execute_tuning

| 函数原型 | static int artinchip_mmc_execute_tuning(struct mmc_host *mmc, u32 opcode) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | MMC的tuning功能接口                                          |
| 参数定义 | mmc: MMC设备指针opcode：tuning命令码                         |
| 返回值   | 无                                                           |
| 注意事项 |                                                              |

#### 5.5.10. artinchip_mmc_card_busy

| 函数原型 | static int artinchip_mmc_card_busy(struct mmc_host *mmc) |
| -------- | -------------------------------------------------------- |
| 功能说明 | 查看MMC设备是否处于Busy状态                              |
| 参数定义 | mmc: MMC设备指针                                         |
| 返回值   | 若处于idle状态返回0，busy则返回1                         |
| 注意事项 |                                                          |

#### 5.5.11. artinchip_mmc_switch_voltage

| 函数原型 | static int artinchip_mmc_switch_voltage(struct mmc_host *mmc, struct mmc_ios *ios) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 设置MMC设备的工作电压                                        |
| 参数定义 | mmc: MMC设备指针ios：设置参数                                |
| 返回值   | 0，成功； < 0，失败                                          |
| 注意事项 |                                                              |

#### 5.5.12. artinchip_mmc_init_card

| 函数原型 | static void artinchip_mmc_init_card(struct mmc_host *mmc, struct mmc_card *card) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 初始化外部mmc设备                                            |
| 参数定义 | mmc: MMC设备指针card：card设备指针                           |
| 返回值   | 无                                                           |
| 注意事项 |                                                              |

## 6. 常见问题

### 6.1. MMC 初始化失败

#### 6.1.1. 现象

Linux启动后，在扫描mmc0设备的时候报错“whilst initialising MMC card”，log如下

```
mmc_host mmc1: Bus speed (slot 0) = 204000000Hz (slot req 300000Hz, actual 300000HZ div = 680)
mmc_host mmc0: Bus speed (slot 0) = 204000000Hz (slot req 25000000Hz, actual 20400000HZ div = 10)
mmc_host mmc1: Bus speed (slot 0) = 204000000Hz (slot req 200000Hz, actual 200000HZ div = 1020)
mmc0: error -110 whilst initialising MMC card
mmc_host mmc0: Bus speed (slot 0) = 204000000Hz (slot req 300000Hz, actual 300000HZ div = 680)
mmc_host mmc1: Bus speed (slot 0) = 204000000Hz (slot req 100000Hz, actual 100000HZ div = 2040)
mmc_host mmc0: Bus speed (slot 0) = 204000000Hz (slot req 25000000Hz, actual 20400000HZ div = 10)
mmc0: error -110 whilst initialising MMC card
mmc_host mmc0: Bus speed (slot 0) = 204000000Hz (slot req 200000Hz, actual 200000HZ div = 1020)
random: fast init done
mmc_host mmc0: Bus speed (slot 0) = 204000000Hz (slot req 25000000Hz, actual 20400000HZ div = 10)
mmc0: error -110 whilst initialising MMC card
mmc_host mmc0: Bus speed (slot 0) = 204000000Hz (slot req 100000Hz, actual 100000HZ div = 2040)
```

#### 6.1.2. 原因分析

1. 首先确认 DTS 中sdmcx节点中的参数 clock-frequency 有没有更改过；
2. 由于 **DDR 和 SDMC 共用了一个父时钟**，需要确认是否改了DDR工作频率导致了父时钟发生变化。

上述出错log就是因为原因2，修改了DDR频率为 408MHz，导致MMC工作时钟不准。

### 6.2. mmc_test 节点不存在

#### 6.2.1. 现象

在mmc_test测试中，挂载了debugfs后，无法找到mmc_test中的测试项 testlist。

#### 6.2.2. 解决方法

mmc_test必须要在关闭MMC Block选项的前提下才能运行，所以要确认内核中的MMC_BLOCK配置项。 详见 [软件配置]