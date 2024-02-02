---
sidebar_position: 1
---
# BWM 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语 | 定义              | 注释说明   |
| ---- | ----------------- | ---------- |
| BWM  | BandWidth Monitor | 带宽检测器 |

### 1.2. 模块简介

BWM用于针对DDR模块进行带宽监测

其原理框图如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/bwm_diagram.png](https://photos.100ask.net/artinchip-docs/d213-devkit/bwm_diagram-17066903301061.png)

该模块的基本特性：

- 循环累计带宽数据，循环周期最大为16s
- 每个AXI端口单独监控，读写分开监控

## 2. BWM配置

### 2.1. 内核配置

```
Device Drivers
    Misc devices--->
        [*] BWM driver for Artinchip SoC
```

### 2.2. DTS配置

```
bwm: bwm@184ff000 {
        compatible = "artinchip,aic-bwm";
        reg = <0x184ff000 0x1000>;
        interrupts = <GIC_SPI 19 IRQ_TYPE_LEVEL_HIGH>;
        clocks = <&cmu CLK_BWM>;
        resets = <&rst RESET_BWM>;
        status = "okay";
};
```

## 3. 调试指南

### 3.1. sysfs结点

在BWM初始化成功后，会在sysfs中注册生成bwm目录，路径位于：sys/devices/platform/soc/184ff000.bwm/bwm，目录内部包含BWM模块驱动生成的几个结点，可以通过这些结点获取相应的带宽数据。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/sysfs_bwm.png](https://photos.100ask.net/artinchip-docs/d213-devkit/sysfs_bwm-17066904476083.png)

## 4. 测试指南

### 4.1. 测试环境

#### 4.1.1. 硬件

- 测试板
- PC：用于和测试板交互
- 串口线：连接测试板的调试串口

#### 4.1.2. 软件

- PC端串口终端软件
- bwmtop测试工具

### 4.2. 编译测试工具

SDK已默认会编译bwmtop测试工具，可以直接使用。也可以按以下配置打开：

```
Artinchip packages--->
    Sample code--->
        [*] test-bwmtop--->
```

配置后，重新编译。

### 4.3. bwmtop测试

可以直接调用bwmtop测试

**bwmtop**

该命令默认配置1s更新一次参数。

该命令的其它参数可以参考help命令：

```
[aic@] # bwmtop -h

Usage: bwmtop [-n iter] [-d delay] [-m] [-o FILE] [-h]
    -n NUM   Number of updates before this program exiting.
    -d NUM   Seconds to wait between update.
    -m Display the result in MB unit, default unit is Byte
    -k Display the result in KB unit, default unit is Byte
    -o FILE  Output to a file.
    -v Display bwmtop version.
    -h Display this help screen.
```

## 5. 设计说明

### 5.1. 源码说明

BWM模块的源代码位于：linux-5.10/drivers/misc/artinchip-bwm.c

### 5.2. 模块架构

BWM模块主要是监测DDR的带宽，所以BWM模块的驱动，主要可以分为两部分：

1. 初始化BWM，使BWM模块可以正常工作，这部分主要在probe函数中实现。
2. 向用户层提供接口，方便用户可以实时查看DDR的带宽数据。这部分是通过sysfs向用户提供结点，方便用户调用。

### 5.3. 关键流程设计

#### 5.3.1. 初始化流程

1. 释放clock和reset信号
2. 设置中断触发周期
3. 申请中断
4. 创建sysfs结点

### 5.4. 数据结构设计

管理BWM资源数据的结构体

```
struct bwm_dev {
    struct attribute_group attrs;
    void __iomem    *base;
    struct clk *clk;
    struct reset_control *rst;
    u32 axi_cpu;
    u32 axi_dma;
    u32 axi_de;
    u32 axi_ve;
    u32 ahb_dma;
};
```

### 5.5. 接口设计

#### 5.5.1. axi_cpu_show

| 函数原型 | static ssize_t axi_cpu_show(struct device *dev, struct device_attribute *attr, char *buf) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 显示cpu所占带宽                                              |
| 参数定义 | dev：设备指针attr：unusedbuf：指向存储结果的指针             |
| 返回值   | 返回写入的字符数                                             |
| 注意事项 |                                                              |

#### 5.5.2. axi_dma_show

| 函数原型 | static ssize_t axi_dma_show(struct device *dev, struct device_attribute *attr, char *buf) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 显示axi dma所占带宽                                          |
| 参数定义 | dev：设备指针attr：unusedbuf：指向存储结果的指针             |
| 返回值   | 返回写入的字符数                                             |
| 注意事项 |                                                              |

#### 5.5.3. axi_de_show

| 函数原型 | static ssize_t axi_de_show(struct device *dev, struct device_attribute *attr, char *buf) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 显示de所占带宽                                               |
| 参数定义 | dev：设备指针attr：unusedbuf：指向存储结果的指针             |
| 返回值   | 返回写入的字符数                                             |
| 注意事项 |                                                              |

#### 5.5.4. axi_ve_show

| 函数原型 | static ssize_t axi_ve_show(struct device *dev, struct device_attribute *attr, char *buf) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 显示ve所占带宽                                               |
| 参数定义 | dev：设备指针attr：unusedbuf：指向存储结果的指针             |
| 返回值   | 返回写入的字符数                                             |
| 注意事项 |                                                              |

#### 5.5.5. ahb_dma_show

| 函数原型 | static ssize_t ahb_dma_show(struct device *dev, struct device_attribute *attr, char *buf) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 显示ahb dma所占带宽                                          |
| 参数定义 | dev：设备指针attr：unusedbuf：指向存储结果的指针             |
| 返回值   | 返回写入的字符数                                             |
| 注意事项 |                                                              |

#### 5.5.6. enable_store

| 函数原型 | static ssize_t enable_store(struct device *dev, struct device_attribute *attr, const char *buf, size_t size) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 打开或关闭BWM模块                                            |
| 参数定义 | dev：设备指针attr：unusedbuf：指向操作字符串的指针size：字符串长度 |
| 返回值   | 返回写入的字符数                                             |
| 注意事项 |                                                              |

#### 5.5.7. set_period_store

| 函数原型 | static ssize_t set_period_store(struct device *dev, struct device_attribute *attr, const char *buf, size_t size) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 显示dma所占带宽                                              |
| 参数定义 | dev：设备指针attr：unusedbuf：指向操作字符串的指针size：字符串长度 |
| 返回值   | 返回写入的字符数                                             |
| 注意事项 |                                                              |

## 6. 常见问题