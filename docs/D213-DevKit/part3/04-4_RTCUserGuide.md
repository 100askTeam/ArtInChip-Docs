---
sidebar_position: 4
---
# RTC 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语 | 定义            | 注释说明 |
| ---- | --------------- | -------- |
| RTC  | Real Time Clock | 实时时钟 |

### 1.2. 模块简介

RTC（Real Time Clock）模块用于日期时间的保存和更新，在无网络下为系统提供一份有效的日期和时间。通过备用电池供电，在断电场景下也可以一直计数和保存时间，同时还有闹钟唤醒的功能。

- 以秒为单位，最大支持100年跨度
- 精度取决于晶振精度。RTC V1.0支持校准，校准范围±975ppm（每百万次计数的误差）
- 支持一路闹钟设置（可通过软件来扩展成多路闹钟），闹钟精确到秒
- 闹钟支持输出一个中断信号（该信号也可以用于32K时钟输出）给外部系统
- RTC V1.0支持128bit 的系统数据备份，可用于掉电场景的数据保护

#### 1.2.1. 低功耗设计

RTC V1.0控制器为了低功耗设计，选用8bit APB总线作为数据总线，带来的影响是相关的寄存器都是8bit格式。

> - 如果要设置一个32bit的秒数，就需要将其拆分成4个8bit写入4个寄存器；
> - 如果是读取秒数，就需要从4个寄存器的值组合成一个32bit数。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/hw_structure7.png](https://photos.100ask.net/artinchip-docs/d213-devkit/hw_structure7-170669166547725.png)

图 4.9 *RTC 模块的硬件原理框图*

## 2. 参数配置

### 2.1. 内核配置

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，按如下选择：

```
Linux
    Device Drivers
        [*] Real Time Clock
            [*] Artinchip Soc RTC
```

### 2.2. DTS 参数配置

#### 2.2.1. RTC 自定义参数

RTC驱动支持从DTS中配置的自定义参数，如下表：

| 参数名称            | 适用版本  | 类型    | 取值范围       | 功能说明                             |
| ------------------- | --------- | ------- | -------------- | ------------------------------------ |
| aic,alarm-io-output | V0.1/V1.0 | boolean | 有 - 1，无 - 0 | 是否使能Alarm的IO输出功能            |
| aic,32k-io-output   | V1.0      | boolean | 有 - 1，无 - 0 | 是否使能32K时钟输出功能              |
| clock-rate          | V1.0      | 正整数  | 3276800±3196   | 时钟源的实测频率值*100，用于时钟校准 |
| aic,clock-driver    | V1.0      | 正整数  | [0, 15]        | clock驱动能力，数值越小越省功耗      |

注解

1. 参数 `aic,clock-driver` 的值，需要通过一个 Sysfs 节点 [驱动能力扫描](3_debug_guide.html#ref-to-rtc-driver-capability) 来扫描得到。
2. 参数 `aic,alarm-io-output` 和 `aic,32k-io-output` 共用一个IO输出，所以只能二选一。
3. `clock-rate` 取时钟源频率值的 **100倍**，是为了提高校准的精度，校准可以精确到0.03Hz。

#### 2.2.2. D211 配置

common/d211.dtsi中的参数配置：

```
rtc: rtc@19030000 {
    compatible = "artinchip,aic-rtc-v1.0";
    reg = <0x0 0x19030000 0x0 0x1000>;
    interrupts-extended = <&plic0 50 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cmu CLK_RTC>;
    resets = <&rst RESET_RTC>;
};
```

xxx/board.dts中的参数配置：

```
&rtc {
    aic,alarm-io-output;
    clock-rate = <3276851>;
    aic,clock-driver = <13>;
    status = "okay";
};
```

### 2.3. 时区配置

luban SDK中默认配置时区为 `Asia/Shanghai`，即中国的 +8 时区。 在luban根目录下执行 make menuconfig，进入功能配置：

```
System configuration
    (Asia/Shanghai) default local time
```

有没有时区配置，可以通过shell命令 `date` 的输出信息判断，有 “UTC” 字样表示未配置时区，有 “CST” 字样表示已经配置了 +8 时区。

```
# date
Tue Jan  6 01:41:27 UTC 1970 - 未配置时区

# date
Tue Jan  6 01:41:27 CST 1970 - 已配置 +8 时区
```

未配置时区的时候，RTC 时间 和 系统时间（date命令的输出）是一致的；增加了时区配置后，两个会有一个时区差，关系：

```
系统时间 = RTC 时间 + 时区
```

以 +8 时区为例，可以通过 [hwclock 命令](3_debug_guide.html#ref-to-rtc-hwclock) 看到这个差别：

```
# date  - 系统时间
Tue Jan  6 01:49:53 CST 1970
# hwclock  - 原始的RTC时间
Mon Jan  5 17:49:17 1970  0.000000 seconds
# hwclock  -u    - RTC时间 + 时区，和系统时间一致
Tue Jan  6 01:49:20 1970  0.000000 seconds
```

注解

在打开时区的情况下，从 **系统时间同步到RTC时间** 的设置命令用 `hwclock -wu`，查看RTC时间的方式也应该加参数 `-u` （告诉hwclock工具RTC中保存的是UTC时间）。

## 3. 调试指南

### 3.1. 调试开关

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，可以打开RTC模块的DEBUG选项：

```
Linux
    Kernel hacking
        Artinchip Debug
            [*] RTC driver debug
```

此DEBUG选项打开的影响：

1. RTC驱动以-O0编译
2. RTC的pr_dbg()和dev_dbg()调试信息会被编译

在系统运行时，如果要打印pr_dbg()和dev_dbg()信息，还需要调整loglevel为8，两个方法：

1. 在board.dts中修改bootargs，增加“loglevel=8”
2. 在板子启动到Linux shell后，执行命令：

```
echo 8 > /proc/sys/kernel/printk
```

### 3.2. Sysfs 节点

#### 3.2.1. 状态信息

Linux内核原生提供一些 RTC 的 Sysfs 节点，可以用来获取（只读）时间、范围等信息：

```
 # ls /sys/class/rtc/rtc0/
date           hctosys        range          time
dev            max_user_freq  since_epoch    uevent
device         name           subsystem
# cat /sys/class/rtc/rtc0/time
00:00:00
# cat /sys/class/rtc/rtc0/date
1970-01-01
```

在RTC驱动初始化成功后，会在Sysfs中注册生成一个 `status` 节点，其中打印了当前的RTC配置及状态信息：

```
[aic@] # cd /sys/devices/platform/soc/19030000.rtc/
[aic@19030000.rtc] # cat status
In RTC V1.00:
Module Enable: 1
Alarm Enable: 0, Output alarm IO: 2/1, Output 32K: 0
Clock rate: 32787, Driver: 13
Calibration Slow, Value: -608
```

#### 3.2.2. 驱动能力扫描

RTC V1.0为了节省功耗，可以调低32K时钟的驱动能力，驱动力范围是 [0, 15]，值越大功耗越大。

RTC驱动提供了一个Sysfs节点 `driver_capability`，用来给客户方便扫描出最适合的驱动力值。在RTC驱动初始化成功后，可以在其Sysfs目录，找到此节点，执行cat命令可触发扫描：

```
[aic@] # cd /sys/devices/platform/soc/19030000.rtc/
[aic@19030000.rtc] # cat driver_capability
[   95.755513] 32K-clk driver 0 is OK
[   97.835482] 32K-clk driver 1 is OK
[   99.915447] 32K-clk driver 2 is OK
[  101.995471] 32K-clk driver 3 is OK
[  104.075494] 32K-clk driver 4 is OK
[  106.155478] 32K-clk driver 5 is OK
[  108.235529] 32K-clk driver 6 is OK
[  110.315497] 32K-clk driver 7 is OK
[  112.395507] 32K-clk driver 8 is OK
[  114.475539] 32K-clk driver 9 is OK
[  116.555492] 32K-clk driver 10 is OK
[  118.635732] 32K-clk driver 11 is OK
[  120.715503] 32K-clk driver 12 is OK
[  122.795466] 32K-clk driver 13 is OK
[  124.875483] 32K-clk driver 14 is OK
[  126.955511] 32K-clk driver 15 is OK
The status of RTC driver:
Driver  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15
Status OK OK OK OK OK OK OK OK OK OK OK OK OK OK OK OK

客户可以从扫描结果中标注 “OK” 的值中选取一个配置到 :ref:`ref_to_rtc_dts` 。
```

小技巧

驱动力扫描的整个过程大约需要 16s。

### 3.3. hwclock 命令

busybox会带一个hwclock工具，可以用来读取、设置RTC时间。用法如下：

```
# hwclock -r  —— 读取当前RTC时间（不加任何参数时就默认是读取）
Thu Jan  1 00:00:00 1970  0.000000 seconds
# hwclock -ru  —— 读取当前RTC时间，然后加上时区校准
# hwclock -w  —— 将当前的系统时间同步设置到RTC
# hwclock -wu  —— 将当前的系统时间减去时区值，然后同步设置到RTC
# hwclock -s  —— 将RTC时间同步设置到系统时间
```

## 4. 测试指南

### 4.1. 测试环境

#### 4.1.1. 硬件

- 开发板上安装有电池（用于给RTC供电）

#### 4.1.2. 软件

- PC端的串口终端软件，用于PC和开发板进行串口通信
- Linux内核原生的rtctest工具
- AiTest测试框架，用于长时间的精度测试

#### 4.1.3. 软件配置

##### 4.1.3.1. rtctest

在luban的根目录下通过make menuconfig可以打开rtctest：

```
Linux kernel
    Advance setting
        Linux Kernel Tools
            [*] selftests
```

### 4.2. rtctest 测试

rtctest的主要功能是测试RTC的Alarm功能，板子上的rtctest位于 `/usr/lib/kselftests/rtc/`，进入该目录，直接运行rtctest即可：

```
[aic@] # cd /usr/lib/kselftests/rtc/
[aic@rtc] # ./rtctest
TAP version 13
1..7
# Starting 7 tests from 2 test cases.
#  RUN           rtc.date_read ...
# rtctest.c:49:date_read:Current RTC date/time is 05/01/1970 21:50:57.
#            OK  rtc.date_read
ok 1 rtc.date_read
#  RUN           rtc.uie_read ...
#            OK  rtc.uie_read
ok 2 rtc.uie_read
#  RUN           rtc.uie_select ...
#            OK  rtc.uie_select
ok 3 rtc.uie_select
#  RUN           rtc.alarm_alm_set ...
# rtctest.c:137:alarm_alm_set:Alarm time now set to 21:51:06.
# rtctest.c:156:alarm_alm_set:data: 1a0
#            OK  rtc.alarm_alm_set
ok 4 rtc.alarm_alm_set
#  RUN           rtc.alarm_wkalm_set ...
# rtctest.c:195:alarm_wkalm_set:Alarm time now set to 05/01/1970 21:51:09.
#            OK  rtc.alarm_wkalm_set
ok 5 rtc.alarm_wkalm_set
#  RUN           rtc.alarm_alm_set_minute ...
# rtctest.c:239:alarm_alm_set_minute:Alarm time now set to 21:52:00.
# rtctest.c:258:alarm_alm_set_minute:data: 1a0
#            OK  rtc.alarm_alm_set_minute
ok 6 rtc.alarm_alm_set_minute
#  RUN           rtc.alarm_wkalm_set_minute ...
# rtctest.c:297:alarm_wkalm_set_minute:Alarm time now set to 05/01/1970 21:53:00.
#            OK  rtc.alarm_wkalm_set_minute
ok 7 rtc.alarm_wkalm_set_minute
# PASSED: 7 / 7 tests passed.
# Totals: pass:7 fail:0 xfail:0 xpass:0 skip:0 error:0
```

### 4.3. RTC 精度测试

测试过程需要用一个脚本来完成测试，测试步骤是：

1. 将PC的本地时间同步到板子上；
2. 每隔100秒去检查下板子上的RTC时间，和PC时间比较，计算一个百万秒的精度值；
3. 重复步骤2，直到完成1百万秒的测试。

以下是测试用例的主干代码，详见AiTest/testcase/rtc/test_mod_rtc_precision.py

```
def test_case_rtc_precision(self):
    self.assertTrue(self.detectLinux())

    self.sync_localtime_to_target()

    loop = int(self.mega / self.delay)
    loop = 100 * int((loop + 99) / 100)
    self.logger.info(f'Do {loop} loops, {self.delay} sec each loop\n')

    for i in range(0, loop):
        self.logger.info(f"{i}/{loop}. Sleep {self.delay} sec ...")
        time.sleep(self.delay)
        self.check_current_time()
```

## 5. 设计说明

### 5.1. 源码说明

源代码位于：

- RTC V1.0: drivers/rtc/artinchip-rtc.c
- RTC V0.1: drivers/rtc/artinchip-rtc-v0.1.c

### 5.2. 模块架构

Linux提供了一个RTC子系统（简称RTC Core），使得在用户空间可以通过/dev/watchdogX来访问Watchdog控制器。为了更方便查看硬件状态和参数设置，本驱动另外扩展了几个sysfs节点。 整个软件框架可以简单抽象为下图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/sw_system21.png](https://photos.100ask.net/artinchip-docs/d213-devkit/sw_system21.png)

图 4.10 *Linux RTC子系统架构图*

RTC V1.0控制器可以适配到Linux标准的时间、闹钟接口，其他非标准的特性有：

- Alarm的中断输出：

  是否有输出完全由板级电路的设计决定，软件上只需要使能中断信号即可。在DTS中提供了一个bool类型的参数方便用户配置“alarm-io-output”。

- 校准参数：

  控制器支持±975ppm的校准范围，用户需要配置DTS中的参数 `clock-rate` 详见 [RTC 自定义参数](2_config_guide.html#ref-to-rtc-dts)。

- 精准驱动能力

  为了节省功耗，可以降低32K时钟的驱动能力到刚好够用，扫描方法见 [驱动能力扫描](3_debug_guide.html#ref-to-rtc-driver-capability)

- 8bit寄存器的读写

  在驱动设计时将8bit数据的拆解、打包进行封装，可以尽量减少对代码的干扰，封装如下：

```
#define RTC_WRITEL(val, reg) \
    do { \
        writeb((val) & 0xFF, (reg)); \
        writeb(((val) >> 8) & 0xFF, (reg) + 0x4); \
        writeb(((val) >> 16) & 0xFF, (reg) + 0x8); \
        writeb(((val) >> 24) & 0xFF, (reg) + 0xC); \
    } while (0)

#define RTC_READL(reg)  (readb(reg) | (readb((reg) + 0x4) << 8) \
            | (readb((reg) + 0x8) << 16) \
            | (readb((reg) + 0xC) << 24))
```

### 5.3. 关键流程设计

#### 5.3.1. 初始化流程

RTC驱动的初始化过程见aic_rtc_probe()函数，除了普通platform设备的处理过程（申请regs资源、clk、reset）外，需要调用RTC子系统的接口rtc_register_device()来注册RTC设备。

```
#define rtc_register_device(device)   __rtc_register_device(THIS_MODULE, device)
```

其中参数struct rtc_device device中关键信息有：最大值、ops等，aic_rtc_ops定义如下：

```
static const struct rtc_class_ops aic_rtc_ops = {
    .read_time      = aic_rtc_read_time,
    .set_time           = aic_rtc_set_time,
    .read_alarm     = aic_rtc_read_alarm,
    .set_alarm      = aic_rtc_set_alarm,
    .alarm_irq_enable   = aic_rtc_alarm_irq_enable,
};
```

#### 5.3.2. 校准算法设计

校准的算法原理是，将输入的 32KHz 晶振时钟校准到理想的 32KHz，公式如下：

```
(100 * 1024 * 1024 + 100 * calibrate) / (clock-rate / 32) = 1024
=> calibrate = (clock-rate * 32 - 100 * 1024 * 1024) / 100;
```

其中：

- clock-rate: 是用户实测 32K晶振的频率值 * 100，需要配置在DTS中，详见 [RTC 自定义参数](2_config_guide.html#ref-to-rtc-dts)
- calibrate: 最终要填入RTC控制器的校准值

注解

校准值calibrate分正负，正 - 表示32K晶振实际偏快了，负 - 表示32K晶振偏慢了。

#### 5.3.3. 系统状态的备份功能

RTC控制器提供了 128bit 的备份寄存器 SYS_BAK，用于掉电时一些重要状态或者参数的保存。RTC驱动将这几个寄存器封装为对外接口（ `EXPORT_SYMBOL_GPL()` 的形式)，Linux中其他驱动都可以调用。

#### 5.3.4. Reboot Reason 的设计

将上节中 **系统备份寄存器** 保存不同情况的Reboot reason，可用于分析终端运行稳定性问题、进入快速启动模式等场景。

SYS_BAK 寄存器需要和 WRI 模块一起配合来完成Boot reason的处理：

1. WRI

   负责记录 **硬件可监测** 到的Reboot原因，如过温保护、看门狗复位、外部输入复位等；

2. SYS_BAK

   负责记录 **软件可监测** 到的Reboot原因，如Suspend、Panic、进入烧写模式、正常重启等。

关于Reboot原因，梳理分类如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/reboot_reason.png](https://photos.100ask.net/artinchip-docs/d213-devkit/reboot_reason-170669192782027.png)

图 4.11 *各种情况的Reboot reason梳理*

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
};
```

针对不同场景，SYS_BAK0寄存器中的Reboot reason 和 WRI中的RST_FLAG值对应如下：

![image-20240131174359021](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240131174359021.png)

注解

其中“按Reset按键”的情况，因为软件来不及设置SYS_BAK，所以是初始值0 （COLD）。

### 5.4. 数据结构设计

#### 5.4.1. aic_rtc_dev

记录RTC控制器的配置信息：

```
struct aic_rtc_dev {
    void __iomem *base;
    struct rtc_device *rtc_dev;
    struct attribute_group attrs;
    struct clk *clk;
    u32  clk_rate;
    u32  clk_drv;
    bool alarm_io;
    bool cal_fast;
    s32  cal_val;

    struct completion complete;
};
```

### 5.5. 接口设计

以下接口是 Linux RTC 子系统需要的标准接口。

#### 5.5.1. 外部接口

##### 5.5.1.1. ioctl 接口

Linux对用户态提供了一组RTC的ioctl接口，用户态可以通过设备节点/dev/rtc0来访问：（详见include/upai/linux/rtc.h）

```
#define RTC_AIE_ON  _IO('p', 0x01)  /* Alarm int. enable on     */
#define RTC_AIE_OFF _IO('p', 0x02)  /* ... off          */
#define RTC_UIE_ON  _IO('p', 0x03)  /* Update int. enable on    */
#define RTC_UIE_OFF _IO('p', 0x04)  /* ... off          */
#define RTC_PIE_ON  _IO('p', 0x05)  /* Periodic int. enable on  */
#define RTC_PIE_OFF _IO('p', 0x06)  /* ... off          */
#define RTC_WIE_ON  _IO('p', 0x0f)  /* Watchdog int. enable on  */
#define RTC_WIE_OFF _IO('p', 0x10)  /* ... off          */

#define RTC_ALM_SET _IOW('p', 0x07, struct rtc_time) /* Set alarm time  */
#define RTC_ALM_READ    _IOR('p', 0x08, struct rtc_time) /* Read alarm time */
#define RTC_RD_TIME _IOR('p', 0x09, struct rtc_time) /* Read RTC time   */
#define RTC_SET_TIME    _IOW('p', 0x0a, struct rtc_time) /* Set RTC time    */
#define RTC_IRQP_READ   _IOR('p', 0x0b, unsigned long)   /* Read IRQ rate   */
#define RTC_IRQP_SET    _IOW('p', 0x0c, unsigned long)   /* Set IRQ rate    */
#define RTC_EPOCH_READ  _IOR('p', 0x0d, unsigned long)   /* Read epoch      */
#define RTC_EPOCH_SET   _IOW('p', 0x0e, unsigned long)   /* Set epoch       */

#define RTC_WKALM_SET   _IOW('p', 0x0f, struct rtc_wkalrm)/* Set wakeup alarm*/
#define RTC_WKALM_RD    _IOR('p', 0x10, struct rtc_wkalrm)/* Get wakeup alarm*/

#define RTC_PLL_GET _IOR('p', 0x11, struct rtc_pll_info)  /* Get PLL correction */
#define RTC_PLL_SET _IOW('p', 0x12, struct rtc_pll_info)  /* Set PLL correction */
```

[Demo](#ref-to-rtc-demo) 就是调用的这些接口完成alarm配置，以及hwclock工具也是调用上述接口。

#### 5.5.2. RTC 相关的内部接口

##### 5.5.2.1. aic_rtc_read_time

| 函数原型 | static int aic_rtc_read_time(struct device *dev, struct rtc_time *tm) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 读取当前的RTC时间                                            |
| 参数定义 | dev - 指向RTC设备的指针tm - 用于存放获取到的时间信息         |
| 返回值   | 0，成功                                                      |
| 注意事项 |                                                              |

##### 5.5.2.2. aic_rtc_set_time

| 函数原型 | static int aic_rtc_set_time(struct device *dev, struct rtc_time *tm) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 设置RTC时间                                                  |
| 参数定义 | dev - 指向RTC设备的指针tm - 需要设置的时间信息               |
| 返回值   | 0，成功                                                      |
| 注意事项 | 更新RTC控制器的秒数，需要先暂停RTC计数，设置完秒数，再使能RTC。 |

##### 5.5.2.3. aic_rtc_read_alarm

| 函数原型 | static int aic_rtc_read_alarm(struct device *dev, struct rtc_wkalrm *alarm) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 读取当前的Alarm状态信息                                      |
| 参数定义 | dev - 指向RTC设备的指针alarm - 用于保存读取到的当前Alarm信息，包括下一次超时时间和超时状态 |
| 返回值   | 0，成功                                                      |
| 注意事项 |                                                              |

##### 5.5.2.4. aic_rtc_set_alarm

| 函数原型 | static int aic_rtc_set_alarm(struct device *dev, struct rtc_wkalrm *alarm) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 设置一个Alarm，并使能Alarm中断                               |
| 参数定义 | dev - 指向RTC设备的指针alarm - 需要设置的Alarm信息           |
| 返回值   | 0，成功                                                      |
| 注意事项 |                                                              |

##### 5.5.2.5. aic_rtc_alarm_irq_enable

| 函数原型 | static int aic_rtc_alarm_irq_enable(struct device *dev, unsigned int enabled) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 开关Alarm中断                                                |
| 参数定义 | dev - 指向RTC设备的指针enabled - 使能标记                    |
| 返回值   | 0，成功                                                      |
| 注意事项 |                                                              |

#### 5.5.3. 系统状态备份相关的内部接口

##### 5.5.3.1. aic_rtc_set_bak

| 函数原型 | void aic_rtc_set_bak(u32 offset, u32 mask, u32 shift, u32 val) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 设置SYS_BAK寄存器中某几个（连续的）bit                       |
| 参数定义 | offset - 寄存器的偏移地址，取值范围：0、4、8、12mask - 待设置的bit掩码shift - 待设置的bit需要左移多少位val - 待设置的实际值 |
| 返回值   | 无                                                           |
| 注意事项 | 设置过程：先将val左移，然后再做掩码处理                      |

##### 5.5.3.2. aic_rtc_get_bak

| 函数原型 | u32 aic_rtc_get_bak(u32 offset, u32 mask, u32 shift)         |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 读取SYS_BAK寄存器中某几个（连续的）bit                       |
| 参数定义 | offset - 寄存器的偏移地址，取值范围：0、4、8、12mask - 待读取的bit掩码shift - 待读取的bit需要右移多少位 |
| 返回值   | 实际读取到的寄存器值                                         |
| 注意事项 | 读取过程：先将读取到的寄存器当前值做掩码处理，然后再右移     |

##### 5.5.3.3. aic_set_software_reboot_reason

| 函数原型 | void aic_set_software_reboot_reason(enum aic_reboot_reason reason) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 设置Reboot reason到SYS_BAK寄存器                             |
| 参数定义 | reason - aic_reboot_reason类型的启动原因                     |
| 返回值   | 无                                                           |
| 注意事项 | aic_reboot_reason 详见 [Reboot Reason 的设计](#ref-rtc-reboot-reason) |

##### 5.5.3.4. aic_get_software_reboot_reason

| 函数原型 | enum aic_reboot_reason aic_get_software_reboot_reason(void)  |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 从SYS_BAK寄存器中读取上一次系统的Reboot reason类型           |
| 参数定义 | 无                                                           |
| 返回值   | aic_reboot_reason类型的启动原因                              |
| 注意事项 | aic_reboot_reason 详见 [Reboot Reason 的设计](#ref-rtc-reboot-reason) |

### 5.6. Demo

本Demo是通过ioctl接口来访问设备节点/dev/rtc0：

```
#include "base.h"
#include <sys/time.h>
#include <linux/rtc.h>

/* Global macro and variables */

#define ALARM_MAX_DELAY     (60 * 60)
#define ALARM_MIN_DELAY     1

static const char sopts[] = "d:u";
static const struct option lopts[] = {
    {"delay",     required_argument, NULL, 'd'},
    {"usage",       no_argument, NULL, 'u'},
    {0, 0, 0, 0}
};

/* Functions */

void usage(char *program)
{
    printf("Usage: %s will start a timer of given seconds, and wait it\n",
        program);
    printf("\t -d, --delay\trange: [%d, %d]\n", ALARM_MIN_DELAY,
        ALARM_MAX_DELAY);
    printf("\t -u, --usage \n");
    printf("\n");
    printf("Example: %s -d 12\n\n", program);
}

/* Open a device file to be needed. */
int device_open(char *_fname, int _flag)
{
    s32 fd = -1;

    fd = open(_fname, _flag);
    if (fd < 0) {
        ERR("Failed to open %s errno: %d[%s]\n",
            _fname, errno, strerror(errno));
        exit(0);
    }
    return fd;
}

int main(int argc, char **argv)
{
    int c, ret;
    int delay = 0;
    int rtc_fd = -1;
    time_t tmp = 0;
    struct rtc_time start = {0};
    struct rtc_time end = {0};
    struct rtc_wkalrm alrm_set = {0};
    struct rtc_wkalrm alrm_get = {0};

    DBG("Compile time: %s\n", __TIME__);
    while ((c = getopt_long(argc, argv, sopts, lopts, NULL)) != -1) {
        switch (c) {
        case 'd':
            delay = str2int(optarg);
            continue;
        case 'u':
            usage(argv[0]);
            return 0;
        default:
            break;
        }
    }

    if ((delay < ALARM_MIN_DELAY) || (delay > ALARM_MAX_DELAY)) {
        ERR("Invalid delay: %d\n", delay);
        return -1;
    }

    rtc_fd = open("/dev/rtc0", O_RDWR);
    if (rtc_fd < 0) {
        ERR("Failed to open RTC device!\n");
        return -1;
    }

    DBG("ioctl(%#x)\n", RTC_RD_TIME);
    ret = ioctl(rtc_fd, RTC_RD_TIME, &start);
    if (ret < 0) {
        ERR("Failed to read RTC time!\n");
        goto err;
    }
    DBG("Current time: %04d-%02d-%02d %02d:%02d:%02d\n",
        start.tm_year, start.tm_mon, start.tm_mday,
        start.tm_hour, start.tm_min, start.tm_sec);

    alrm_set.enabled = 1;
    tmp = mktime((struct tm *)&start) + delay;
    memcpy(&alrm_set.time, gmtime(&tmp), sizeof(struct rtc_time));
    DBG("ioctl(%#x)\n", RTC_WKALM_SET);
    ret = ioctl(rtc_fd, RTC_WKALM_SET, &alrm_set);
    if (ret < 0) {
        ERR("Failed to set alarm! [%d]: %s\n", errno, strerror(errno));
        goto err;
    }
    DBG("Set a alarm to: %04d-%02d-%02d %02d:%02d:%02d\n",
        alrm_set.time.tm_year, alrm_set.time.tm_mon,
        alrm_set.time.tm_mday, alrm_set.time.tm_hour,
        alrm_set.time.tm_min, alrm_set.time.tm_sec);

    do {
        memset(&alrm_get, 0, sizeof(struct rtc_wkalrm));
        DBG("ioctl(%#x)\n", RTC_WKALM_RD);
        ret = ioctl(rtc_fd, RTC_WKALM_RD, &alrm_get);
        if (ret < 0) {
            ERR("Failed to read alarm!\n");
            goto err;
        }
        if (alrm_get.pending)
            break;

        printf("Waiting ...\n");
        usleep(200000); // 200ms
    } while (1);

    DBG("ioctl(%#x)\n", RTC_RD_TIME);
    ret = ioctl(rtc_fd, RTC_RD_TIME, &end);
    if (ret < 0) {
        ERR("Failed to read RTC time!\n");
        goto err;
    }
    DBG("Current time: %04d-%02d-%02d %02d:%02d:%02d\n",
        end.tm_year, end.tm_mon, end.tm_mday,
        end.tm_hour, end.tm_min, end.tm_sec);

    tmp = mktime((struct tm *)&end) - mktime((struct tm *)&start);
    DBG("Start a timer of %d, actualy is %ld ...\n", delay, tmp);
    if (ret != delay) {
        ERR("The timer is not accurate!\n");
        ret = -1;
    }
    else {
        DBG("The timer is good!\n");
        ret = 0;
    }

err:
    if (rtc_fd > 0)
        close(rtc_fd);
    return ret;
}
```

## 6. 常见问题

### 6.1. RTC 时间丢失

#### 6.1.1. 现象

重启后，RTC时间变成 1970-01-01 00:00:00

#### 6.1.2. 原因分析

RTC 需要持续的供电，才能保持住配置的时间信息。所以：

1. 确认电源线是否有断开过
2. 确认是否安装有电池
3. 电池电量是否充足

### 6.2. RTC 时间有误差

#### 6.2.1. 现象

RTC模块的设计精度是 **2秒/3天**。 给RTC带电的情况，长时间运行，如果发现超出这个误差值，说明RTC时间的误差需要校准了。

#### 6.2.2. 解决方法

1. 实测 32K晶振的时钟频率，将频率值填入 DTS的参数 clock-rate，见 [RTC 自定义参数](2_config_guide.html#ref-to-rtc-dts)
2. 查看 [状态信息](3_debug_guide.html#ref-to-rtc-status) 中的 status节点信息，确认校准值的计算正确。