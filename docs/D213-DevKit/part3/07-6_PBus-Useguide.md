---
sidebar_position: 21
---
# PBus 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语 | 定义                          | 注释说明         |
| ---- | ----------------------------- | ---------------- |
| PBus | Parallel Bus                  | 并行总线         |
| AHB  | Advanced High performance Bus | （高速）系统总线 |
| APB  | Advanced Peripheral Bus       | 外设/外围总线    |
| DMA  | Direct Memory Access          | 直接存储器访问   |

### 1.2. 模块简介

PBus 模块主要实现了一组外部并行总线，可用于与外部FPGA、SRAM等等元器件实现连接。

PBus 模块支持的特性有：

- 支持AHB总线访问配置寄存器和外部设备地址空间
- AHB与PBus仅支持Single操作，不支持Burst操作
- 16bit地址和数据总线复用
- 外部设备地址空间为64KB
- 每笔操作可实现16bit数据读/写
- 针对NCS/NADV/NWE/NOE/AD信号时序可灵活配置
- 可支持DMA对外部设备地址空间进行读写访问

## 2. 参数配置

### 2.1. 内核配置

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，按如下选择：

```
Linux
    Device Drivers
        Misc devices
            [*] PBUS driver for Artinchip SoC
```

### 2.2. DTS 参数配置

#### 2.2.1. PBus 自定义参数

PBus 驱动支持从DTS中配置的参数定义，基本和Spec中CFG寄存器的字段分布保持一致。如下表：

| 寄存器                   | 参数名称                 | 取值范围                                                     | 功能说明                           |
| ------------------------ | ------------------------ | ------------------------------------------------------------ | ---------------------------------- |
| CFG0                     | outenable-pol-highactive | [0, 1]                                                       | 外设输出使能的极性，是否高电平有效 |
| wrenable-pol-highactive  | [0, 1]                   | 读写指示信号的极性，是否高电平有效                           |                                    |
| addrvalid-pol-highactive | [0, 1]                   | 地址有效信号的极性，是否高电平有效                           |                                    |
| cs-pol-highactive        | [0, 1]                   | 外设片选信号的极性，是否高电平有效                           |                                    |
| busclk-pol-riseedge      | [0, 1]                   | 地址/数据是否在总线时钟信号上升沿跳变                        |                                    |
| busclk-outenable         | [0, 1]                   | 总线时钟输出的使能                                           |                                    |
| busclk-div               | [0, 3]                   | 总线时钟分频，0 - 未定义，1 - HCLK/2, 2 - HCLK/4, 3 - HCLK/8 |                                    |
| CFG1                     | wrdata-holdtime          | [0, 15]                                                      | 写数据输出的保持时间               |
| wrdata-delaytime         | [0, 15]                  | 写数据输出的延迟时间                                         |                                    |
| addr-holdtime            | [0, 15]                  | 地址输出的保持时间                                           |                                    |
| addr-delaytime           | [0, 15]                  | 地址输出的延迟时间                                           |                                    |
| cs-holdtime              | [0, 15]                  | 外设片选信号的有效保持时间                                   |                                    |
| cs-delaytime             | [0, 15]                  | 外设片选信号的有效最小间隔                                   |                                    |
| CFG2                     | outenable-holdtime       | [0, 15]                                                      | 外设输出使能的保持时间             |
| outenable-delaytime      | [0, 15]                  | 外设输出使能的延迟时间                                       |                                    |
| wrrd-holdtime            | [0, 15]                  | 读写控制信号的保持时间                                       |                                    |
| wrrd-delaytime           | [0, 15]                  | 读写控制信号的延迟时间                                       |                                    |
| addrvalid-holdtime       | [0, 15]                  | 地址有效信号的保持时间                                       |                                    |
| addrvalid-delaytime      | [0, 15]                  | 地址有效信号的延迟时间                                       |                                    |

注解

1. 表中为了更加简洁，参数名称都省略了前缀“aic,”
2. 前面6个参数，取值范围是 [0, 1]，在DTS中是boolean类型，其他参数都是正整数类型
3. “保持时间”和“延迟时间” 的单位，都是 PBus clk 的周期值

#### 2.2.2. D211 配置

common/d211.dtsi中的参数配置：

```
pbus: pbus@107F0000 {
    compatible = "artinchip,aic-pbus-v1.0";
    reg = <0x0 0x107F0000 0x0 0x1000>;
    clocks = <&cmu CLK_PBUS>;
    resets = <&rst RESET_PBUS>;
};
```

#### 2.2.3. Board 配置

xxx/board.dts中的参数配置：

```
&pbus {
    aic,busclk-div = <2>;
    aic,busclk-outenable;
    aic,busclk-pol-riseedge;
    aic,cs-pol-highactive;
    aic,addrvalid-pol-highactive;
    aic,wrenable-pol-highactive;
    aic,outenable-pol-highactive;

    aic,wrdata-holdtime = <1>;
    aic,wrdata-delaytime = <2>;
    aic,addr-holdtime = <3>;
    aic,addr-delaytime = <4>;
    aic,cs-holdtime = <5>;
    aic,cs-delaytime = <6>;

    aic,outenable-holdtime = <7>;
    aic,outenable-delaytime = <8>;
    aic,wrrd-holdtime = <9>;
    aic,wrrd-delaytime = <10>;
    aic,addrvalid-holdtime = <11>;
    aic,addrvalid-delaytime = <12>;

    status = "okay";
};
```

## 3. 调试指南

### 3.1. Sysfs 节点

#### 3.1.1. 状态信息

在 PBus 驱动初始化成功后，会在Sysfs中注册生成一个 `status` 节点，其中打印了当前的 PBus 控制器的配置及状态信息：

```
 # cat /sys/devices/platform/soc/107f0000.pbus/status
In PBUS V1.00:
Bus clk: Div 1, Out enable 0, Pol 0
POL: CS 0, Addr valid 0, Write enable 0, Out enable 0

            Hold time    Delay time
   WR data: 2            6
      Addr: 3            1
        CS: 8            2
Out enable: 3            5
Write&Read: 6            1
Addr Valid: 2            1
```

## 4. 测试指南

### 4.1. 测试环境

#### 4.1.1. 硬件

- 开发板，或D211的FPGA板

#### 4.1.2. 软件

- PC端的串口终端软件，用于PC和开发板进行串口通信

### 4.2. 查看PBus的配置参数

通过PBus驱动在Sysfs注册的 `status` 节点，可以查看当前PBus控制的配置参数。详见 [Sysfs 节点](3_debug_guide.html#ref-pbus-sysfs)

注解

TODO：FPGA环境中无法实测PBus的功能，暂无功能测试的记录。

## 5. 设计说明

### 5.1. 源码说明

源代码位于：drivers/misc/artinchip-pbus.c

### 5.2. 模块架构

PBus对用户来说，只需要能够设置一些信号参数即可，所以将其归入Linux内核中的Misc设备。

不需要运行时修改参数，所以也不需要单独创建设备节点，PBus驱动会用DTS方式来解析和设置信号参数。

### 5.3. 关键流程设计

#### 5.3.1. 初始化流程

PBus 模块遵循platform_driver的通用初始化流程，申请regs资源、clk、reset，然后从DTS中解析参数并写入PBus控制器。

在probe()接口的最后面，会顺次调用三个接口来设置PBus的三个CFG寄存器：

```
pbus_set_cfg0(&pdev->dev, pbus->base);
pbus_set_cfg1(&pdev->dev, pbus->base);
pbus_set_cfg2(&pdev->dev, pbus->base);
```

### 5.4. 数据结构设计

#### 5.4.1. pbus_dev

管理 PBus 控制器的设备资源：

```
struct pbus_dev {
    void __iomem *base;
    struct platform_device *pdev;
    struct attribute_group attrs;
    struct clk *clk;
    struct reset_control *rst;
};
```

### 5.5. 接口设计

以下是提供给 probe() 调用的三个内部接口：

#### 5.5.1. pbus_set_cfg0

| 函数原型 | static void pbus_set_cfg0(struct device *dev, void __iomem *base) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 从DTS中解析参数，并设置PBus的寄存器 PBUS_CFG0                |
| 参数定义 | dev - 指向PBus设备base - PBus寄存器基地址的映射地址          |
| 返回值   | 无                                                           |
| 注意事项 |                                                              |

#### 5.5.2. pbus_set_cfg1

| 函数原型 | static void pbus_set_cfg1(struct device *dev, void __iomem *base) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 从DTS中解析参数，并设置PBus的寄存器 PBUS_CFG1                |
| 参数定义 | dev - 指向PBus设备base - PBus寄存器基地址的映射地址          |
| 返回值   | 无                                                           |
| 注意事项 |                                                              |

#### 5.5.3. pbus_set_cfg2

| 函数原型 | static void pbus_set_cfg2(struct device *dev, void __iomem *base) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 从DTS中解析参数，并设置PBus的寄存器 PBUS_CFG2                |
| 参数定义 | dev - 指向PBus设备base - PBus寄存器基地址的映射地址          |
| 返回值   | 无                                                           |
| 注意事项 |                                                              |

## 6. 常见问题

注解

FPGA环境中无法实测PBus的功能，暂无问题记录。