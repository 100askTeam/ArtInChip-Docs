---
sidebar_position: 7
---
# WRI 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语 | 定义                   | 注释说明   |
| ---- | ---------------------- | ---------- |
| WRI  | Warm Reset Information | 暖复位信息 |

### 1.2. 模块简介

WRI（Warm Reset Information）模块用于记录暖复位发生的状态信息， 提供引起死机重启的原因分析，包括有复位产生来源记录等等。

- 记录复位产生来源

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/wri_overview_block1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/wri_overview_block1-170669311035651.png)

## 2. 参数配置

### 2.1. 内核配置

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，按如下选择：

```
Linux
    Device Drivers
        Misc devices
            [*] WRI driver for Artinchip Soc
```

### 2.2. DTS 参数配置

#### 2.2.1. D211 配置

common/d211.dtsi中的参数配置：

```
wri: wri@1900f000 {
            compatible = "artinchip,aic-wri-v1.0";
            reg = <0x0 0x1900f000 0x0 0x1000>;
            status = "okay";
    };
```

## 3. 调试指南

### 3.1. Sysfs 节点

#### 3.1.1. 状态信息

在WRI驱动初始化成功后，会在Sysfs中注册生成一个 reboot_reason 节点，其中打印了当前的reboot原因信息：

```
[aic@] # cd /sys/devices/platform/soc/1900f000.wri/
[aic@1900f000.wri] # cat reboot_reason
```

## 4. 测试指南

## 5. 设计说明

### 5.1. 源码说明

源代码位于：

- WRI V1.0: drivers/misc/artinchip-wri.c

### 5.2. 关键流程设计

#### 5.2.1. Reboot Reason 的设计

> WRI 模块需要和RTC模块的SYS_BAK 寄存器一起配合来完成Boot reason的处理：

1. WRI

   负责记录 **硬件可监测** 到的Reboot原因，如过温保护、看门狗复位、外部输入复位等；

2. SYS_BAK

   负责记录 **软件可监测** 到的Reboot原因，如Suspend、Panic、进入烧写模式、正常重启等。

关于Reboot原因，梳理分类如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/reboot_reason1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/reboot_reason1-170669324672653.png)

图 4.19 *各种情况的Reboot reason梳理*

小技巧

其中“外部IO复位”指常用的Reset按键。

所以，定义 **SYS_BAK0寄存器（4~7bit）** 的值如下：（详见include/linux/reboot-reason.h）

```
enum aic_reboot_reason {
    REBOOT_REASON_COLD = 0,
    REBOOT_REASON_CMD_REBOOT = 1,
    REBOOT_REASON_CMD_SHUTDOWN = 2,
    REBOOT_REASON_SUSPEND = 3,
    REBOOT_REASON_UPGRADE = 4,
    REBOOT_REASON_FASTBOOT = 5,

    /* Some software exception reason */
    REBOOT_REASON_SW_LOCKUP = 8,
    REBOOT_REASON_HW_LOCKUP = 9,
    REBOOT_REASON_PANIC = 10,
    REBOOT_REASON_RAMDUMP = 11,

    /* Some hardware exception reason */
    REBOOT_REASON_RTC = 17,
    REBOOT_REASON_EXTEND = 18,
    REBOOT_REASON_DM = 19,
    REBOOT_REASON_OTP = 20,
    REBOOT_REASON_UNDER_VOL = 21,
};
```

针对不同场景，SYS_BAK0寄存器中的Reboot reason 和 WRI中的RST_FLAG值对应如下：

![image-20240131173029603](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240131173029603.png)

注解

其中“按Reset按键”的情况，因为软件来不及设置SYS_BAK，所以是初始值0 （COLD）

### 5.3. 数据结构设计

#### 5.3.1. aic_wri_dev

记录WRI控制器的配置信息：

```
struct aic_wri_dev {
    struct attribute_group attrs;
    struct platform_device *pdev;
    struct device *dev;
    void __iomem *regs;
};
```

#### 5.3.2. enum aic_warm_reset_type

定义WRI模块的暖复位类型

```
enum aic_warm_reset_type {
    WRI_TYPE_POR = 0,
    WRI_TYPE_RTC,
    WRI_TYPE_EXT,
    WRI_TYPE_DM,
    WRI_TYPE_WDOG,
    WRI_TYPE_OTP,
    WRI_TYPE_CMP,

    WRI_TYPE_MAX
};
```

### 5.4. 接口设计

#### 5.4.1. 外部接口

#### 5.4.2. WRI 相关的内部接口

##### 5.4.2.1. aic_hw_type_get

| 函数原型 | enum aic_warm_reset_type aic_hw_type_get(void __iomem *regs) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 读取上一次reboot硬件原因                                     |
| 参数定义 | regs - 指向WRI寄存器的指针                                   |
| 返回值   | 暖复位原因类型                                               |
| 注意事项 |                                                              |

##### 5.4.2.2. aic_judge_reboot_reason

| 函数原型 | enum aic_reboot_reason aic_judge_reboot_reason(enum aic_warm_reset_type hw, enum aic_reboot_reason sw) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 分析判断reboot原因                                           |
| 参数定义 | hw- 硬件监测的reboot原因sw - 软件监测的reboot原因            |
| 返回值   | reboot原因类型                                               |
| 注意事项 | 判断依据是WRI模块、RTC模块SYS_BAK寄存器中的两处reboot信息    |

##### 5.4.2.3. aic_set_reboot_reason

| 函数原型 | void aic_set_reboot_reason(enum aic_reboot_reason reason) |
| -------- | --------------------------------------------------------- |
| 功能说明 | 设置Reboot reason到RTC模块的SYS_BAK寄存器                 |
| 参数定义 | reason - aic_reboot_reason类型的启动原因                  |
| 返回值   | 无                                                        |
| 注意事项 |                                                           |

## 6. 常见问题