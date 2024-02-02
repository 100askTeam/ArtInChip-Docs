---
sidebar_position: 5
---
# TSensor 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语         | 定义                     | 注释说明         |
| ------------ | ------------------------ | ---------------- |
| ADC          | Analog Digital Converter | 模拟数字转换器   |
| ADCIM        | ADC Interface Management | 模数转换管理模块 |
| TSensor/TSen | Thermal Sensor           | 温度传感器       |

小技巧

TSensor 模块在硬件 Spec 文档中也简称为 **THS**。

### 1.2. 模块简介

TSensor 需要依赖ADCIM模块（统一管理硬件通路和处理信号校准等），其关系如图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/hw_system11.png](https://photos.100ask.net/artinchip-docs/d213-devkit/hw_system11-170669215752531.png)

图 4.12 *TSensor 相关模块的硬件框图*

TSensor 模块支持的特性有：

- 最多支持两路温度传感器，分别位于芯片内部的CPU位置、ADC位置
- 支持周期采样（周期间隔用户可定制）和非周期采样两种模式
- 每次采样的样本数量（1~8）可配置，然后取算术平均
- 支持高电平、低电平报警设置
- 支持过温保护（发生过温时硬件会触发看门狗重启）
- ADC与温度传感器捕获时间可配置

## 2. 参数配置

### 2.1. 内核配置

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，按如下选择：

```
Linux
    Device Drivers
        [*] Thermal drivers
            <*>   Artinchip thermal driver
```

### 2.2. DTS 参数配置

#### 2.2.1. TSensor 自定义参数

TSensor 驱动支持从DTS中配置的自定义参数，如下表：

| 参数名称          | 类型    | 取值范围       | 功能说明                        |
| ----------------- | ------- | -------------- | ------------------------------- |
| aic,sample-period | 正整数  | > 0, (0, 10]   | 周期采样模式下的周期值，单位：s |
| aic,high-temp-thd | 正整数  | > 0            | 高电平报警阈值                  |
| aic,low-temp-thd  | 正整数  | > 0            | 低电平报警阈值                  |
| aic,htp-enable    | boolean | 有 - 1，无 - 0 | 是否使能高温保护功能            |

注解

1. 需在周期模式下，高/低电平报警以及高温保护功能才可使能有效
2. 配置aic,htp-enable 时，需配置aic,high-temp-thd，否则高温保护使能无效

#### 2.2.2. D211 配置

common/d211.dtsi中的参数配置：

```
tsen: tsen@19253000 {
    compatible = "artinchip,aic-tsen-v1.0";
    reg = <0x0 0x19253000 0x0 0x1000>;
    interrupts-extended = <&plic0 94 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cmu CLK_TSEN>, <&cmu CLK_APB1>;
    clock-names = "tsen", "pclk";
    resets = <&rst RESET_TSEN>;
};
```

#### 2.2.3. Board 配置

xxx/board.dts中的参数配置：

```
&tsen {
    status = "okay";

    tsen0 {
        status = "okay";
    };

    tsen1 {
        status = "okay";
    };
};
```

小技巧

1. 上述配置采样的是非周期模式；
2. 几个阈值都没有配置，意味着相关功能没有打开；详见 [TSensor 自定义参数](#ref-tsen-dts)
3. 几个阈值都需要实测后才知道配置什么样的参数合适。

## 3. 调试指南

### 3.1. 调试开关

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，可以打开 TSensor 模块的DEBUG选项：

```
Linux
    Kernel hacking
        Artinchip Debug
            [*] Thermal Sensor driver debug
```

此DEBUG选项打开的影响：

1. TSensor 驱动以-O0编译
2. TSensor 的pr_dbg()和dev_dbg()调试信息会被编译

在系统运行时，如果要打印pr_dbg()和dev_dbg()信息，还需要调整loglevel为8，两个方法：

1. 在board.dts中修改bootargs，增加“loglevel=8”
2. 在板子启动到Linux shell后，执行命令：

```
echo 8 > /proc/sys/kernel/printk
```

### 3.2. Sysfs 节点

#### 3.2.1. 状态信息

在 TSensor 驱动初始化成功后，会在Sysfs中注册生成一个 `status` 节点，其中打印了当前的 TSensor 配置及状态信息：

```
 # cat /sys/devices/platform/soc/19253000.tsen/status
In Thermal Sensor V1.00:
 ch0: aic-tsen-cpu, Enable: 1, Value: 0
 ch1: aic-tsen-adc, Enable: 1，Value: 0
```

#### 3.2.2. 读取温度

Linux Thermal 子系统提供一些 Sysfs 节点，可以用来获取温度值等操作。

```
# cd /sys/class/thermal/
[aic@thermal] # ls
thermal_zone0  thermal_zone1
[aic@thermal] # cd thermal_zone0/
[aic@thermal_zone0] # ls
available_policies  k_po                policy              type
hwmon0              k_pu                slope               uevent
integral_cutoff     mode                subsystem
k_d                 offset              sustainable_power
k_i                 passive             temp
[aic@thermal_zone0] # cat temp
0
[aic@thermal_zone0] # cat type
aic-tsen-cpu
```

## 4. 测试指南

### 4.1. 测试环境

#### 4.1.1. 硬件

- 开发板，或D211的FPGA板

#### 4.1.2. 软件

- PC端的串口终端软件，用于PC和开发板进行串口通信

### 4.2. 温度读取测试

温度数据的读取，只需要普通的cat命令即可，每次cat可读取某一个通道中的当前数据。详见 [读取温度](3_debug_guide.html#ref-tsen-sysfs)

## 5. 设计说明

### 5.1. 源码说明

源代码位于：drivers/thermal/artinchip_thermal.c

### 5.2. 模块架构

Linux内核中有一个Thermal子系统，代码目录见drivers/thermal，软件框架如下图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/sw_system22.png](https://photos.100ask.net/artinchip-docs/d213-devkit/sw_system22-170669232578633.png)

图 4.13 *Linux Thermal 子系统架构图*

其中：

- zone device：获取温度的设备
- cool device：控制温度的设备，cool和zone可以设置bind关系。
- governor：控温策略

Thermal Core内部用一个delayed_work循环执行thermal_zone_device_update()，其流程如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/thermal_delayed_work.png](https://photos.100ask.net/artinchip-docs/d213-devkit/thermal_delayed_work-170669234359835.png)

图 4.14 *Linux Thermal 子系统中的delayed_work处理流程*

### 5.3. 关键流程设计

#### 5.3.1. 初始化流程

TSensor模块完全遵循platform_driver的通用初始化流程，申请regs资源、clk、reset，另外需要使用Thermal子系统的注册接口thermal_zone_device_register()来注册zone设备。

```
struct thermal_zone_device *thermal_zone_device_register(const char *,
    int, int, void *, struct thermal_zone_device_ops *,
    struct thermal_zone_params *, int, int);
```

其中关键参数有：设备名称、zone设备的ops、以及私有数据等，ops中我们暂时只提供get_temp()接口的定义：

```
static struct thermal_zone_device_ops tsen_cpu_ops = {
    .get_temp = tsen_cpu_get_temp,
};

static struct thermal_zone_device_ops tsen_adc_ops = {
    .get_temp = tsen_adc_get_temp,
};
```

#### 5.3.2. 中断处理流程

在中断处理函数中，可以通过私有数据来传递zone设备信息，从中获取到到该通道对应的寄存器基地址，就可以读到相应的报警状态。

TSensor 支持使用中断方式来读取数据，这样避免软件去做等待处理。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/tsen_irq_flow1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/tsen_irq_flow1-170669237291237.png)

图 4.15 *TSensor 非周期模式的数据采集流程*

- 对于非周期模式：当用户层触发 ops->get_temp() 接口，就会启动一次硬件去读数据
- 当硬件准备好数据，会产生一个中断
- 在中断处理函数中，用INT Flag来区分是哪个通道有数据，逐个通道扫描将数据读出，会缓存到一个全局变量中
- 对于周期模式：TSensor 控制器会自动按给定周期产生一次数据中断

注解

1. TODO：需要针对不同类型的报警状态，增加相应的处理。
2. 当前默认高温保护为poweroff，可修改高温保护行为。

### 5.4. 数据结构设计

#### 5.4.1. aic_tsen_dev

管理TSensor控制器的设备资源：

```
struct aic_tsen_dev {
    struct attribute_group attrs;
    void __iomem *regs;
    struct platform_device *pdev;
    struct clk *clk;
    struct reset_control *rst;
    u32 pclk_rate;
    u32 irq;
    u32 ch_num;

    struct aic_tsen_ch chan[AIC_TSEN_MAX_CH];
};
```

### 5.5. 接口设计

以下接口提供给 Linux Thermal 子系统调用的标准接口。

#### 5.5.1. tsen_cpu_get_temp

| 函数原型 | static inline int tsen_cpu_get_temp(struct thermal_zone_device *thermal, int *temp) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 读取CPU位置处的sensor温度数据                                |
| 参数定义 | thermal - 指向thermal zone设备temp - 用来保存读取到的温度    |
| 返回值   | 0，成功                                                      |
| 注意事项 |                                                              |

#### 5.5.2. tsen_adc_get_temp

| 函数原型 | static inline int tsen_adc_get_temp(struct thermal_zone_device *thermal, int *temp) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 读取ADC位置处的sensor温度数据                                |
| 参数定义 | thermal - 指向thermal zone设备temp - 用来保存读取到的温度    |
| 返回值   | 0，成功                                                      |
| 注意事项 |                                                              |

## 6. 常见问题

### 6.1. 关于温度值的精度

硬件采集到的温度值需要先经过一个转换算法，才会得到一个类似生活中常见的温度值。此转换算法的精度一般采用的是 **线性拟合方法**，存在一定的误差。

### 6.2. 关于告警的阈值

- 高温、低温、过温阈值的选择，需要基于大量板子的实测数据，并结合用户场景需求来选定。
- 当配置了过温告警后，一旦温度达到过温阈值，IC硬件会自动触发CPU的复位，软件无需参与也无法参与。

注解

通常达到了高温阈值，会触发CPU降频等类似的降低系统性能处理，目前D211的动态降频功能暂未验证。