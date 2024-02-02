---
sidebar_position: 18
---
# GPAI 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语  | 定义                                   | 注释说明         |
| ----- | -------------------------------------- | ---------------- |
| ADC   | Analog Digital Converter               | 模拟数字转换器   |
| ADCIM | ADC Interface Management               | 模数转换管理模块 |
| GPAI  | General Purpose Analog Input Interface | 通用模拟输入接口 |

### 1.2. 模块简介

GPAI需要依赖ADCIM模块（统一管理硬件通路和处理信号校准等），其关系如图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/hw_system6.png](https://photos.100ask.net/artinchip-docs/d213-devkit/hw_system6-17067546749131.png)

图 7.16 *GPAI相关模块的硬件框图*

GPAI主要功能是将外部的模拟信号转成数字信号，然后上报给CPU。支持的特性有：

- 最多支持 8 路模拟信号的输入
- 支持周期采样（周期间隔用户可定制）和非周期采样两种模式
- 每次采样的样本数量（1~8）可定制
- 支持高电平、低电平报警设置

## 2. 参数配置

### 2.1. 内核配置

#### 2.1.1. 配置 IIO

在 luban 根目录下执行 make menuconfig，进入配置，按如下选择：

```
ArtInChip Luban SDK Configuration
    Linux kernel
        Advance setting
            Linux Kernel Tools
                <*>iio
```

#### 2.1.2. 配置 GPAI

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，按如下选择：

```
Linux
    Device Drivers
        <*> Industrial I/O support
            Analog to digital converters
                <*> Artinchip GPAI driver
```

### 2.2. DTS 参数配置

#### 2.2.1. GPAI 自定义参数

GPAI 驱动支持从DTS中配置的自定义参数，如下表：

| 参数名称             | 类型   | 取值范围        | 功能说明                         |
| -------------------- | ------ | --------------- | -------------------------------- |
| aic,sample-period-ms | 正整数 | > 0, (0, 10000] | 周期采样模式下的周期值，单位：ms |
| aic,high-level-thd   | 正整数 | > 0             | 高电平报警阈值                   |
| aic,low-level-thd    | 正整数 | > 0             | 低电平报警阈值                   |

小技巧

上表中的采样周期范围值是GPAI V1.0的。GPAI V0.1的周期有效范围不到3ms，不推荐。

#### 2.2.2. D211 配置

在common/d211.dtsi中的GPAI控制器定义：

```
gpai: gpai@19251000 {
    compatible = "artinchip,aic-gpai-v1.0";
    reg = <0x0 0x19251000 0x0 0x1000>;
    interrupts-extended = <&plic0 92 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cmu CLK_GPAI>, <&cmu CLK_APB1>;
    clock-names = "gpai", "pclk";
    resets = <&rst RESET_GPAI>;
};
```

#### 2.2.3. Board 配置

xxx/board.dts中的参数配置需要区分通道号，每个通道可以单独使能。使能的通道，需要指定该通道用到的GPIO配置，如下面的 `gpai7_pins`：

```
&gpai {
    status = "okay";
    pinctrl-names = "default";
    pinctrl-0 = <&gpai7_pins>;

    gpai0 {
        aic,sample-period-ms = <10>;
        aic,high-level-thd = <1830>;
        aic,low-level-thd = <1800>;
        status = "disabled";
    };

    gpai1 {
        status = "disabled";
    };

    gpai2 {
        status = "disabled";
    };

    gpai3 {
        status = "disabled";
    };

    gpai4 {
        status = "disabled";
    };

    gpai5 {
        status = "disabled";
    };

    gpai6 {
        status = "disabled";
    };

    gpai7 {
        status = "okay";
    };
};
```

## 3. 调试指南

### 3.1. 调试开关

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，可以打开GPAI模块的DEBUG选项：

```
Linux
    Kernel hacking
        Artinchip Debug
            [*] GPAI driver debug
```

此DEBUG选项打开的影响：

1. GPAI 驱动以-O0编译
2. GPAI 的pr_dbg()和dev_dbg()调试信息会被编译

在系统运行时，如果要打印pr_dbg()和dev_dbg()信息，还需要调整loglevel为8，两个方法：

1. 在board.dts中修改bootargs，增加“loglevel=8”
2. 在板子启动到Linux shell后，执行命令：

```
echo 8 > /proc/sys/kernel/printk
```

### 3.2. Sysfs 节点

IIO子系统会为ADC设备创建一组标准的Sysfs节点文件，可用于读取ADC的数值。

```
# cd /sys/devices/platform/soc/19251000.gpai/iio:device0
/sys/devices/platform/soc/19251000.gpai/iio:device0 # ls
dev               in_voltage3_raw   in_voltage7_raw   subsystem
in_voltage0_raw   in_voltage4_raw   in_voltage_scale  uevent
in_voltage1_raw   in_voltage5_raw   name
in_voltage2_raw   in_voltage6_raw   of_node
# cat in_voltage7_raw
# 4095
```

## 4. 测试指南

### 4.1. 测试环境

#### 4.1.1. 硬件

- 开发板，或D211的FPGA板

#### 4.1.2. 软件

- PC端的串口终端软件，用于PC和开发板进行串口通信

### 4.2. ADC 读取测试

ADC数据的读取，只需要普通的cat命令即可，每次cat可读取某一个通道中的当前数据。详见

## 5. 设计说明

### 5.1. 源码说明

源代码位于：drivers/iio/adc/artinchip_adc.c

### 5.2. 模块架构

- IIO

  工业I/O，是Linux内核中专用于处理模数转换器（ADC）和数模转换器（DAC）的子系统，最初创建于2009年，提供了统一的框架来访问和控制各种类型的传感器，并且为用户态提供了标准的接口。

目前IIO支持的设备类型包括：ADC/DAC、加速度计、磁力计、陀螺仪、电流/电压测量芯片、压力传感器、温度传感器、湿度传感器、光传感器、压力传感器等。

整个IIO软件框架可抽象为下图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/gpai_irq_flow1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/gpai_irq_flow1-17067549170983.png)

图 7.17 *Linux IIO子系统架构图*

- IIO设备会提供字符设备（支持触发缓冲区）和Sysfs节点作为用户态的访问接口；

- 一般情况下，每个通道对应一个sysfs节点文件；

- - 用户空间的设备文件名举例：

    /sys/bus/iio/iio:deviceX//dev/iio:deviceX

### 5.3. 关键流程设计

#### 5.3.1. 初始化流程

GPAI 模块完全遵循platform_driver的通用初始化流程，申请regs资源、clk、reset，还需要注册一个iio设备，使用iio子系统提供的注册接口iio_device_register()：

```
#define iio_device_register(indio_dev) \
    __iio_device_register((indio_dev), THIS_MODULE)
```

参数indio_dev是一个struct iio_dev类型的指针，其中关键信息有：设备名称、通道数目、一组iio的操作集(struct iio_info)、通道配置信息等。在iio_info中，我们暂时只实现了一个read接口：

```
static const struct iio_info aic_gpai_iio_info = {
    .read_raw = aic_gpai_read_raw,
};
```

#### 5.3.2. 中断处理流程

GPAI支持使用中断方式来读取数据，这样避免软件去做等待处理。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/gpai_irq_flow1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/gpai_irq_flow1-17067549974595.png)

图 7.18 *GPAI 非周期模式的数据采集流程*

- 对于非周期模式：当用户层触发read_raw()接口，就会启动一次硬件去读数据
- 当硬件准备好数据，会产生一个中断
- 在中断处理函数中，用INT Flag来区分是哪个通道有数据，逐个通道扫描将数据读出，会缓存到一个全局变量中
- 对于周期模式：GPAI控制器会自动按给定周期产生一次数据中断

注意

周期模式时，当周期值太小，比如 < 10ms，会增加系统的调度负担。

注解

TODO：目前，当产生高电平、低电平告警的时候，只是驱动中打印警告信息，暂未做其他处理。

### 5.4. 数据结构设计

#### 5.4.1. aic_gpai_data

记录各个通道的数据信息：

```
struct aic_gpai_data {
    int             num_bits;
    const struct iio_chan_spec  *channels;
    int             num_channels;
    u32             fifo_depth[AIC_GPAI_MAX_CH];
};
```

#### 5.4.2. aic_gpai_ch

记录各个通道的配置信息：

```
struct aic_gpai_ch {
    u32 id;
    bool available;
    enum aic_gpai_mode mode;
    u16 latest_data;
    u16 fifo_thd;
    u32 smp_period;

    bool hla_enable; // high-level alarm
    u16 hla_thd;
    u16 hla_rm_thd;
    bool lla_enable; // low-level alarm
    u16 lla_thd;
    u16 lla_rm_thd;

    struct completion complete;
};
```

#### 5.4.3. aic_gpai_dev

管理GPAI控制器的设备资源：

```
struct aic_gpai_dev {
    struct platform_device      *pdev;
    void __iomem            *regs;
    struct clk          *clk;
    struct reset_control        *rst;
    u32             irq;
    u32             pclk_rate;

    struct aic_gpai_ch      chan[AIC_GPAI_MAX_CH];
    const struct aic_gpai_data  *data;
};
```

### 5.5. 接口设计

#### 5.5.1. aic_gpai_read_raw

| 函数原型 | static int aic_gpai_read_raw(struct iio_dev *iodev,struct iio_chan_spec const *chan,int *val, int *val2, long mask) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 读取一个ADC通道的当前数据                                    |
| 参数定义 | iodev - 指向一个iio设备chan - 当前ADC通道的配置信息val - 用于保存读取到的数据val2 - 用于保存读取到的数据，用于和val做数据组合，部分mask类型需要mask - 数据类型 |
| 返回值   | 0，成功； < 0，失败                                          |
| 注意事项 |                                                              |

## 6. 常见问题

### 6.1. GPAI 初始化失败

#### 6.1.1. 现象

在 GPAI 模块初始化时报错，一般是 GPIO申请失败。

#### 6.1.2. 原因分析

1. 首先在DTS中检查打开了哪几个GPAI通道，对应的GPAI引用是否正确；详见 [Board 配置](2_config_guide.html#ref-gpai-dts)
2. 然后在检查该GPIO是否和其他设备有冲突，luban在编译固件的时候有pinmux冲突检查，请确认无任何冲突。