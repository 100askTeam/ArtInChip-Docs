---
sidebar_position: 28
---
# PSADC 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语  | 定义                     | 注释说明              |
| ----- | ------------------------ | --------------------- |
| ADC   | Analog Digital Converter | 模拟数字转换器        |
| ADCIM | ADC Interface Management | 模数转换管理模块      |
| PSADC | PWM System ADC           | PWM控制子系统响应模块 |

### 1.2. 模块简介

PSADC硬件框图如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/hw_system7.png](https://photos.100ask.net/artinchip-docs/d213-devkit/hw_system7-17067651014991.png)

图 7.40 *PSADC相关模块的硬件框图*

PSADC主要功能是将外部的模拟信号转成数字信号，然后上报给CPU。支持的特性有：

- 最多支持 16 路模拟信号的输入 （1602支持12路）

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

#### 2.1.2. 配置 PSADC

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，按如下选择：

```
Linux
    Device Drivers
        <*> Industrial I/O support
            Analog to digital converters
                <*> Artinchip PSADC driver
```

### 2.2. DTS 参数配置

#### 2.2.1. D211 配置

在common/d211.dtsi中的PSADC控制器定义：

```
psadc: psadc@18210000 {
    compatible = "artinchip,aic-psadc-v1.0";
    reg = <0x0 0x18210000 0x0 0x1000>;
    interrupts-extended = <&plic0 28 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cmu CLK_PSADC>, <&cmu CLK_APB0>;
    clock-names = "psadc", "pclk";
    resets = <&rst RESET_PSADC>;
    #io-channel-cells = <1>;
    status = "disabled";
};
```

#### 2.2.2. Board 配置

xxx/board.dts中的参数配置需要区分通道号，每个通道可以单独使能。使能的通道，需要指定该通道用到的GPIO配置，如下面的 `psadc5_pins`：

```
&psadc {
    status = "okay";
    pinctrl-names = "default";
    pinctrl-0 = <&psadc5_pins>;

    psadc0 {
        status = "disabled";
    };

    psadc1 {
        status = "disabled";
    };

    psadc2 {
        status = "disabled";
    };

    psadc3 {
        status = "disabled";
    };

    psadc4 {
        status = "disabled";
    };

    psadc5 {
        status = "disabled";
    };

    psadc6 {
        status = "okay";
    };

    psadc7 {
        status = "disabled";
    };

    psadc8 {
        status = "disabled";
    };

    psadc9 {
        status = "disabled";
    };

    psadc10 {
        status = "disabled";
    };

    psadc11 {
        status = "disabled";
    };
};
```

## 3. 调试指南

### 3.1. 调试开关

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，可以打开PSADC模块的DEBUG选项：

```
Linux
    Kernel hacking
        Artinchip Debug
            [*] PSADC driver debug
```

此DEBUG选项打开的影响：

1. PSADC 驱动以-O0编译
2. PSADC 的pr_dbg()和dev_dbg()调试信息会被编译

在系统运行时，如果要打印pr_dbg()和dev_dbg()信息，还需要调整loglevel为8，两个方法：

1. 在board.dts中修改bootargs，增加“loglevel=8”
2. 在板子启动到Linux shell后，执行命令：

```
echo 8 > /proc/sys/kernel/printk
```

### 3.2. Sysfs 节点

IIO子系统会为ADC设备创建一组标准的Sysfs节点文件，可用于读取ADC的数值。

```
# cd /sys/devices/platform/soc/18210000.psadc/iio:device0
/sys/devices/platform/soc/18210000.psadc/iio:device0 # ls
dev                         in_voltage5_raw
events                      in_voltage5_raw_available
in_voltage0_raw             in_voltage6_raw
in_voltage0_raw_available   in_voltage6_raw_available
in_voltage10_raw            in_voltage7_raw
in_voltage10_raw_available  in_voltage7_raw_available
in_voltage11_raw            in_voltage8_raw
in_voltage11_raw_available  in_voltage8_raw_available
in_voltage1_raw             in_voltage9_raw
in_voltage1_raw_available   in_voltage9_raw_available
in_voltage2_raw             in_voltage_scale
in_voltage2_raw_available   name
in_voltage3_raw             of_node
in_voltage3_raw_available   power
in_voltage4_raw             subsystem
in_voltage4_raw_available   uevent
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

ADC数据的读取，只需要普通的cat命令即可，每次cat可读取某一个通道中的当前数据。详见 [Sysfs 节点](3_debug_guide.html#ref-psadc-sysfs)

## 5. 设计说明

### 5.1. 源码说明

源代码位于：drivers/iio/adc/artinchip_psadc.c

### 5.2. 模块架构

- IIO

  工业I/O，是Linux内核中专用于处理模数转换器（ADC）和数模转换器（DAC）的子系统，最初创建于2009年，提供了统一的框架来访问和控制各种类型的传感器，并且为用户态提供了标准的接口。

目前IIO支持的设备类型包括：ADC/DAC、加速度计、磁力计、陀螺仪、电流/电压测量芯片、压力传感器、温度传感器、湿度传感器、光传感器、压力传感器等。

整个IIO软件框架可抽象为下图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/sw_system17.png](https://photos.100ask.net/artinchip-docs/d213-devkit/sw_system17-17067677453603.png)

图 7.41 *Linux IIO子系统架构图*

- IIO设备会提供字符设备（支持触发缓冲区）和Sysfs节点作为用户态的访问接口；

- 一般情况下，每个通道对应一个sysfs节点文件；

- - 用户空间的设备文件名举例：

    /sys/bus/iio/iio:deviceX//dev/iio:deviceX

### 5.3. 关键流程设计

#### 5.3.1. 初始化流程

PSADC 模块完全遵循platform_driver的通用初始化流程，申请regs资源、clk、reset，还需要注册一个iio设备，使用iio子系统提供的注册接口iio_device_register()：

```
#define iio_device_register(indio_dev) \
    __iio_device_register((indio_dev), THIS_MODULE)
```

参数indio_dev是一个struct iio_dev类型的指针，其中关键信息有：设备名称、通道数目、一组iio的操作集(struct iio_info)、通道配置信息等。在iio_info中，我们暂时只实现了一个read接口：

```
static const struct iio_info aic_psadc_iio_info = {
    .read_raw = aic_psadc_read_raw,
};
```

#### 5.3.2. 中断处理流程

PSADC支持使用中断方式来读取数据，这样避免软件去做等待处理。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/psadc_irq_flow1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/psadc_irq_flow1-17067677709595.png)

图 7.42 *PSADC 非周期模式的数据采集流程*

- 对于非周期模式：当用户层触发read_raw()接口，就会启动一次硬件去读数据
- 当硬件准备好数据，会产生一个中断
- 在中断处理函数中，用INT Flag来区分是哪个通道有数据，逐个通道扫描将数据读出，会缓存到一个全局变量中

### 5.4. 数据结构设计

#### 5.4.1. aic_psadc_data

记录各个通道的数据信息：

```
struct aic_psadc_data {
    int             num_bits;
    const struct iio_chan_spec  *channels;
    int             num_channels;
    u32             fifo_depth[AIC_PSADC_MAX_CH];
};
```

#### 5.4.2. aic_psadc_ch

记录各个通道的配置信息：

```
struct aic_psadc_ch {
    u32 id;
    bool available;
    enum aic_psadc_mode mode;
    u16 latest_data;
    struct completion complete;
};
```

#### 5.4.3. aic_psadc_dev

管理PSADC控制器的设备资源：

```
struct aic_psadc_dev {
    struct platform_device      *pdev;
    void __iomem                *regs;
    struct clk                  *clk;
    struct reset_control        *rst;
    u32                         irq;
    u32                         pclk_rate;

    struct aic_psadc_ch         chan[AIC_PSADC_MAX_CH];
    const struct aic_psadc_data *data;
};
```

### 5.5. 接口设计

#### 5.5.1. aic_psadc_read_raw

| 函数原型 | static int aic_psadc_read_raw(struct iio_dev *iodev, struct iio_chan_spec const *chan, int *val, int *val2, long mask) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 读取一个ADC通道的当前数据                                    |
| 参数定义 | iodev - 指向一个iio设备chan - 当前ADC通道的配置信息val - 用于保存读取到的数据val2 - 用于保存读取到的数据，用于和val做数据组合，部分mask类型需要mask - 数据类型 |
| 返回值   | 0，成功； < 0，失败                                          |
| 注意事项 |                                                              |

## 6. 常见问题

### 6.1. PSADC 初始化失败

#### 6.1.1. 现象

在 PSADC 模块初始化时报错，一般是 GPIO申请失败。

#### 6.1.2. 原因分析

1. 首先在DTS中检查打开了哪几个PSADC通道，对应的PSADC引用是否正确；详见 [Board 配置](2_config_guide.html#ref-psadc-dts)
2. 然后在检查该GPIO是否和其他设备有冲突，luban在编译固件的时候有pinmux冲突检查，请确认无任何冲突。