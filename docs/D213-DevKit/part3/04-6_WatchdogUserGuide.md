---
sidebar_position: 6
---
# Watchdog 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语    | 定义                  | 注释说明                                           |
| ------- | --------------------- | -------------------------------------------------- |
| WDT     | Watchdog，下文简称wdt | 看门狗                                             |
| clr_thd | Clear threshold       | 清看门狗的计数时，当前计数必须要满足此门限         |
| irq_thd | IRQ threshold         | 看门狗产生中断的计数值                             |
| rst_thd | Reset threshold       | 看门狗触发系统重启的门限值                         |
| ping    | -                     | 指将Watchdog的计时器清零，使其重新计数，俗称“喂狗” |

### 1.2. 模块简介

WDT（Watchdog）给系统提供一个健康监控功能，在系统无法正常使用时，可以强制复位系统；而在系统正常运行期间，可通过重置计数来保证Watchdog模块不触发复位。

Watchdog V1.0在V0.1基础上做了优化升级，提供更多可配置的功能：

1. 支持在复位系统前先（时刻可配置）发出一个中断信号，来通知系统做一些复位前的准备工作；

2. 增加对计数器清零的限制，只有当前计数值满足一个门限（可配置）才能执行清零；
   ![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/wdt_clr_window1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/wdt_clr_window1-170669263971043.png)

3. 支持预先加载4个Watchdog的配置（软件可以理解为多通道），运行时可一键切换；

4. 支持预先加载4个Watchdog的配置（软件可以理解为多通道），运行时可一键切换；
   ![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/wdt_wr_protect1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/wdt_wr_protect1-170669274028447.png)

   - 写允许

     普通状态，无任何权限限制，随时可重新配置计数器；

   - 写保护

     如果要重新配置Watchdog计时器，需先写入操作码OP_WR_EN解锁（进入“写允许”状态）；

   - 写失效

     此时Watchdog进入只读状态，只有OP寄存器可写（用于喂狗、切换通道）。从图中可以看到此状态不可逆，如果要修改Watchdog配置，必须要reset系统才可以。

5. 支持更多的操作码（Operate Code），如计时器清零、通道切换、写使能。

## 2. 参数配置

### 2.1. 内核配置

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，按如下选择：

```
Linux
    Device Drivers
        [*] Watchdog Timer Support
            <*>   Artinchip SoC watchdog support
```

### 2.2. DTS 参数配置

#### 2.2.1. Watchdog 自定义参数

Watchdog 驱动支持从DTS中配置的自定义参数，如下表：

| 参数名称     | 适用版本 | 类型    | 取值范围       | 功能说明                                               |
| ------------ | -------- | ------- | -------------- | ------------------------------------------------------ |
| dbg_continue | V1.0     | boolean | 有 - 1，无 - 0 | 用Jtag进入debug状态时，计数是否继续默认值是0，停止计数 |
| clr_thd      | V1.0     | 正整数  | > 0 ，单位：秒 | 允许清除WDT的最小秒数                                  |

小技巧

1. 关于清除WDT的逻辑关系，请参考图 [Watchdog 清零的窗口示意图](1_introduction.html#ref-wdt-clr-window) 的相关说明。
2. 在FPGA环境，清零窗口的功能无效，需要屏蔽clr_thd的判断逻辑。

#### 2.2.2. Common 配置

在common/d211.dtsi中的Watchdog控制器定义：

```
wdt0: watchdog@19000000 {
    compatible = "artinchip,aic-wdt-v1.0";
    reg = <0x0 0x19000000 0x0 0x1000>;
    interrupts-extended = <&plic0 64 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cmu CLK_WDOG>;
    resets = <&rst RESET_WDOG>;
    dbg_continue;  // 使用Jtag进入debug状态时，计数是否继续。默认是暂停计数
    clr_thd = <3>;  // 用于设置clr_thd，单位：秒
};
```

注解

其中有两个扩展字段，如果没有配置将默认是0。

#### 2.2.3. Board 配置

xxx/board.dts中的参数配置比较简单，只是说明是否要打开Watchdog：

```
&wdt0 {
    status = "okay";
};
```

## 3. 调试指南

### 3.1. 调试开关

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，可以打开Watchdog模块的DEBUG选项：

```
Linux
    Kernel hacking
        Artinchip Debug
            [*] Watchdog driver debug
```

此DEBUG选项打开的影响：

1. Watchdog驱动以-O0编译
2. Watchdog的pr_dbg()和dev_dbg()调试信息会被编译

在系统运行时，如果要打印pr_dbg()和dev_dbg()信息，还需要调整loglevel为8，两个方法：

1. 在board.dts中修改bootargs，增加“loglevel=8”
2. 在板子启动到Linux shell后，执行命令：

```
echo 8 > /proc/sys/kernel/printk
```

### 3.2. Sysfs 节点

#### 3.2.1. status 节点

在Watchdog驱动初始化成功后，会在Sysfs中注册生成一个 `status` 节点，其中打印了当前的配置及状态信息：

```
[aic@] # cat /sys/devices/platform/soc/19000000.watchdog/status
In Watchdog V256.00:
Module Enable: 0
Dbg continue: 0
clr_thd: 333
Write disable: 0
IRQ Enable: 0
Current chan: 0 0
Current cnt: 352
chan clr_thd irq_thd rst_thd
   0       0  160000  320000
   1       0  160000  320000
   2       0  160000  320000
   3       0  160000  320000
```

#### 3.2.2. 当前的 Watchdog 通道信息

> 查看当前生效正在使用的 Watchdog 通道信息，方法：

```
[aic@] # cat /sys/devices/platform/soc/*.watchdog/timeout  —— 当前通道的timeout配置
10
[aic@] # cat /sys/devices/platform/soc/*.watchdog/pretimeout —— 当前通道的pretimeout配置
0
[aic@] # cat /sys/devices/platform/soc/*.watchdog/channel —— 当前生效的通道编号
0
```

## 4. 测试指南

### 4.1. 测试环境

#### 4.1.1. 硬件

- 开发板，或D211的FPGA板

#### 4.1.2. 软件

- PC端的串口终端软件，用于PC和开发板进行串口通信
- luban中带有的test_wdt测试工具

#### 4.1.3. 软件配置

在luban的根目录下通过 make menuconfig 可以打开 test_wdt 测试工具的编译：

```
Artinchip packages
    Sample code
        [*] test-watchdog
```

### 4.2. test_wdt 测试

test_wdt的主要功能是通过ioctl标准接口，来查询、设置Watchdog的。

板子上的test_wdt位于 `/usr/local/bin/`，无需进入该目录，在shell中直接运行test_wdt即可。

test_wdt的帮助信息：

```
[aic@] # test_wdt -u
Compile time: Apr 16 2022 14:31:42
Usage: test_wdt [options]
     -i, --info     Print the status and infomation
     -s, --set-timeout  Set a timeout, in second
     -g, --get-timeout  Get the current timeout, in second
     -p, --set-pretimeout   Set a pretimeout, in second
     -G, --get-pretimeout   Get the current pretimeout, in second
     -k, --keepalive    Keepalive the watchdog
     -u, --usage

Example: test_wdt -c 0 -s 12
Example: test_wdt -c 1 -s 100 -p 90
```

注解

1. WDT V1.0驱动中对timeout参数的范围有限制：[1, 3600]，即最小1秒、最多1小时。
2. Linux的Watchdog子系统中对pretimeout参数有限制：pretimeout必须小于timeout。

test_wdt的使用示例：

```
[aic@] # test_wdt -i
In Artinchip Watchdog timer watchdog V0, options 0x8180
Status: 32768
Boot status: 0
[aic@] # test_wdt -s 3601
wdt_set_timeout()125 - Set chan0 timeout 3601, pretimeout 0
[ERROR] wdt_set_timeout()128 - Failed to set timeout 22[Invalid argument]
[aic@] # test_wdt -s 0
wdt_set_timeout()125 - Set chan0 timeout 0, pretimeout 0
[ERROR] wdt_set_timeout()128 - Failed to set timeout 22[Invalid argument]
[aic@] # test_wdt -g
wdt_get_timeout()155 - Get chan0 timeout 16
[aic@] # test_wdt -s 2
wdt_set_timeout()125 - Set chan0 timeout 2, pretimeout 0
[aic@] # test_wdt -g
wdt_get_timeout()155 - Get chan0 timeout 2
[aic@] # test_wdt -s 9
wdt_set_timeout()125 - Set chan0 timeout 9, pretimeout 0
[aic@] # test_wdt -g
wdt_get_timeout()155 - Get chan0 timeout 9
[aic@] # test_wdt -s 9 -p 4
wdt_set_timeout()125 - Set chan0 timeout 9, pretimeout 4
```

## 5. 设计说明

### 5.1. 源码说明

源代码位于：drivers/watchdog/artinchip_wdt.c

### 5.2. 模块架构

Linux提供了一个Watchdog子系统（简称Watchdog Core），使得在用户空间可以通过/dev/watchdogX来访问Watchdog控制器。为了更方便查看硬件状态和参数设置，本驱动另外扩展了几个sysfs节点。

整个软件框架可以简单抽象为下图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/sw_system23.png](https://photos.100ask.net/artinchip-docs/d213-devkit/sw_system23-170669294451749.png)

图 4.18 *Linux Watchdog子系统架构图*

针对我们Watchdog控制器的几个特色功能：

1. 多通道

   将每个通道注册为一个watchdog设备，在/dev/目录下面生成多个watchdog设备节点。每一个Watchdog设备节点都提供标准的Watchdog ioctl接口。

2. 超时中断

   在Watchdog超时之前可以产生一些中断信号，让软件有机会做一些预处理。对应到Watchdog Core的pretimeout参数，可以支持对外注册pretimeout回调的机制。

3. 清零窗口

   Watchdog Core中没有对应的参数，所以提供一个int类型的DTS字段“clr_thd”，让用户态可以设置此门限，需要注意这个值是4个Watchdog通道共用的。默认是0，表示随时可以clean计数。详见： [Watchdog 自定义参数](2_config_guide.html#ref-wdt-dts)

4. 调试模式的计数状态

   当CPU进入Jtag的debug状态时，Watchdog计数可以选择是否暂停。类似的，也通过一个bool类型的DTS字段“dbg_continue”提供给用户态去设置。默认是暂停。详见 [Watchdog 自定义参数](2_config_guide.html#ref-wdt-dts)

### 5.3. 关键流程设计

#### 5.3.1. 初始化流程

WDT驱动的初始化过程见aic_wdt_probe()函数，除了普通platform设备的处理过程（申请regs资源、clk、reset）外，需要调用WDT子系统的接口devm_watchdog_register_device()来注册WDT设备。

```
int devm_watchdog_register_device(struct device *dev, struct watchdog_device *);
```

其中参数struct watchdog_device中关键信息有：名称、属性、最大/最小/默认timeout、ops等，aic_wdt_ops定义如下：

```
static const struct watchdog_ops aic_wdt_ops = {
    .owner      = THIS_MODULE,
    .start      = aic_wdt_start,
    .stop       = aic_wdt_stop,
    .ping       = aic_wdt_ping,
    .set_timeout    = aic_wdt_set_timeout,
    .set_pretimeout = aic_wdt_set_pretimeout,
    .restart    = aic_wdt_restart,
};
```

### 5.4. 数据结构设计

#### 5.4.1. aic_wdt_dev

记录Watchdog控制器的配置信息，其中包含4个Watchdog设备：

```
struct aic_wdt_dev {
    struct watchdog_device wdt_dev[WDT_CHAN_NUM];
    void __iomem *base;
    struct attribute_group attrs;
    struct clk *clk;
    struct reset_control *rst;
    u32 wdt_no;
    struct aic_wdt wdt[WDT_CHAN_NUM];
    bool dbg_continue;
    u32 clr_thd;
};
```

#### 5.4.2. aic_wdt

记录每一个Watchdog通道的配置信息：

```
struct aic_wdt {
    u32 clr_thd;
    u32 irq_thd;
    u32 rst_thd;
};
```

### 5.5. 接口设计

以下接口是 Linux Watchdog 子系统需要的标准接口。

#### 5.5.1. 外部接口

##### 5.5.1.1. ioctl 接口

Linux对用户态提供了一组Watchdog的ioctl接口，用户态可以通过设备节点/dev/watchdogX来访问：（详见include/upai/linux/watchdog.h）

```
struct watchdog_info {
    __u32 options;      /* Options the card/driver supports */
    __u32 firmware_version; /* Firmware version of the card */
    __u8  identity[32]; /* Identity of the board */
};

#define WDIOC_GETSUPPORT        _IOR(WATCHDOG_IOCTL_BASE, 0, struct watchdog_info)
#define WDIOC_GETSTATUS     _IOR(WATCHDOG_IOCTL_BASE, 1, int)
#define WDIOC_GETBOOTSTATUS _IOR(WATCHDOG_IOCTL_BASE, 2, int)
#define WDIOC_GETTEMP           _IOR(WATCHDOG_IOCTL_BASE, 3, int)
#define WDIOC_SETOPTIONS        _IOR(WATCHDOG_IOCTL_BASE, 4, int)
#define WDIOC_KEEPALIVE     _IOR(WATCHDOG_IOCTL_BASE, 5, int)
#define WDIOC_SETTIMEOUT     _IOWR(WATCHDOG_IOCTL_BASE, 6, int)
#define WDIOC_GETTIMEOUT     _IOR(WATCHDOG_IOCTL_BASE, 7, int)
#define WDIOC_SETPRETIMEOUT _IOWR(WATCHDOG_IOCTL_BASE, 8, int)
#define WDIOC_GETPRETIMEOUT _IOR(WATCHDOG_IOCTL_BASE, 9, int)
#define WDIOC_GETTIMELEFT       _IOR(WATCHDOG_IOCTL_BASE, 10, int)
```

[Demo](#ref-wdt-demo) 就是调用的这些接口完成Watchdog的访问。

#### 5.5.2. 内部接口

##### 5.5.2.1. aic_wdt_start

| 函数原型 | static int aic_wdt_start(struct watchdog_device *wdt_dev)    |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 使能一个Watchdog通道（device）                               |
| 参数定义 | wdt_dev - 指向Watchdog设备的指针                             |
| 返回值   | 0，成功                                                      |
| 注意事项 | 如果当前通道的Watchdog已经是使能状态，将执行ping操作（喂狗）。 |

##### 5.5.2.2. aic_wdt_stop

| 函数原型 | static int aic_wdt_stop(struct watchdog_device *wdt_dev) |
| -------- | -------------------------------------------------------- |
| 功能说明 | 关闭一个Watchdog通道（device）                           |
| 参数定义 | wdt_dev - 指向Watchdog设备的指针                         |
| 返回值   | 0，成功                                                  |
| 注意事项 |                                                          |

##### 5.5.2.3. aic_wdt_ping

| 函数原型 | static int aic_wdt_ping(struct watchdog_device *wdt_dev) |
| -------- | -------------------------------------------------------- |
| 功能说明 | 清零指定的Watchdog通道计数器，相当于“喂狗”操作           |
| 参数定义 | wdt_dev - 指向Watchdog设备的指针                         |
| 返回值   | 0，成功                                                  |
| 注意事项 | 需要先调用aic_wdt_start()，再调用此接口                  |

##### 5.5.2.4. aic_wdt_set_timeout

| 函数原型 | static int aic_wdt_set_timeout(struct watchdog_device *wdt_dev, unsigned int timeout) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 给指定的Watchdog设备设置一个超时                             |
| 参数定义 | wdt_dev - 指向Watchdog设备的指针timetout - 超时的数值，单位：秒 |
| 返回值   | 0，成功                                                      |
| 注意事项 | 1. 在Watchdog初始化时配置的最大、最小timeout参数，Watchdog Core会去做校验，如果超出范围，将采用上一次有效的timeout参数值。2. clr_thd会和timeout一起设置到Watchdog控制器。 |

##### 5.5.2.5. aic_wdt_set_pretimeout

| 函数原型 | static int aic_wdt_set_pretimeout(struct watchdog_device *wdt_dev,unsigned int pretimeout) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 给指定的Watchdog设备设置一个预超时                           |
| 参数定义 | wdt_dev - 指向Watchdog设备的指针pretimetout - 预超时的数值，单位：秒 |
| 返回值   | 0，成功                                                      |
| 注意事项 | pretimeout必须要小于该Watchdog通道的timeout参数，这个有效性检查会在Watchdog Core中去做（所以合理的ioctl操作是先设置timeout、再设置pretimeout），如果pretimeout无效将返回出错。 |

##### 5.5.2.6. aic_wdt_restart

| 函数原型 | static int aic_wdt_restart(struct watchdog_device *wdt_dev,unsigned long action, void *data) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 用于重启整个系统（方法是设置timeout是0，Watchdog会立即触发超时重启） |
| 参数定义 | wdt_dev - 指向Watchdog设备的指针action - 需要执行的操作类型（定义详见“注意事项”），目前统一按重启处理data - 附加数据，暂未用到 |
| 返回值   | 0，成功                                                      |
| 注意事项 |                                                              |

action的定义详见include/linux/reboot.h：

```
#define SYS_DOWN        0x0001  /* Notify of system down */
#define SYS_RESTART     SYS_DOWN
#define SYS_HALT            0x0002  /* Notify of system halt */
#define SYS_POWER_OFF   0x0003  /* Notify of system power off */
```

### 5.6. Demo

本Demo是通过ioctl接口来访问设备节点/dev/watchdog，代码详见 samples/test-watchdog/wdt.c

##  Watchdog 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语    | 定义                  | 注释说明                                           |
| ------- | --------------------- | -------------------------------------------------- |
| WDT     | Watchdog，下文简称wdt | 看门狗                                             |
| clr_thd | Clear threshold       | 清看门狗的计数时，当前计数必须要满足此门限         |
| irq_thd | IRQ threshold         | 看门狗产生中断的计数值                             |
| rst_thd | Reset threshold       | 看门狗触发系统重启的门限值                         |
| ping    | -                     | 指将Watchdog的计时器清零，使其重新计数，俗称“喂狗” |

### 1.2. 模块简介

WDT（Watchdog）给系统提供一个健康监控功能，在系统无法正常使用时，可以强制复位系统；而在系统正常运行期间，可通过重置计数来保证Watchdog模块不触发复位。

Watchdog V1.0在V0.1基础上做了优化升级，提供更多可配置的功能：

1. 支持在复位系统前先（时刻可配置）发出一个中断信号，来通知系统做一些复位前的准备工作；

2. 增加对计数器清零的限制，只有当前计数值满足一个门限（可配置）才能执行清零；
   ![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/wdt_clr_window1.png](../../4. 系统(1)/https://photos.100ask.net/artinchip-docs/d213-devkit/wdt_clr_window1-170669263971043.png)

3. 支持预先加载4个Watchdog的配置（软件可以理解为多通道），运行时可一键切换；

4. 支持预先加载4个Watchdog的配置（软件可以理解为多通道），运行时可一键切换；
   ![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/wdt_wr_protect1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/wdt_wr_protect1-170669274028447-17067001233464.png)

   - 写允许

     普通状态，无任何权限限制，随时可重新配置计数器；

   - 写保护

     如果要重新配置Watchdog计时器，需先写入操作码OP_WR_EN解锁（进入“写允许”状态）；

   - 写失效

     此时Watchdog进入只读状态，只有OP寄存器可写（用于喂狗、切换通道）。从图中可以看到此状态不可逆，如果要修改Watchdog配置，必须要reset系统才可以。

5. 支持更多的操作码（Operate Code），如计时器清零、通道切换、写使能。

## 2. 参数配置

### 2.1. 内核配置

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，按如下选择：

```
Linux
    Device Drivers
        [*] Watchdog Timer Support
            <*>   Artinchip SoC watchdog support
```

### 2.2. DTS 参数配置

#### 2.2.1. Watchdog 自定义参数

Watchdog 驱动支持从DTS中配置的自定义参数，如下表：

| 参数名称     | 适用版本 | 类型    | 取值范围       | 功能说明                                               |
| ------------ | -------- | ------- | -------------- | ------------------------------------------------------ |
| dbg_continue | V1.0     | boolean | 有 - 1，无 - 0 | 用Jtag进入debug状态时，计数是否继续默认值是0，停止计数 |
| clr_thd      | V1.0     | 正整数  | > 0 ，单位：秒 | 允许清除WDT的最小秒数                                  |

小技巧

1. 关于清除WDT的逻辑关系，请参考图 [Watchdog 清零的窗口示意图](1_introduction.html#ref-wdt-clr-window) 的相关说明。
2. 在FPGA环境，清零窗口的功能无效，需要屏蔽clr_thd的判断逻辑。

#### 2.2.2. Common 配置

在common/d211.dtsi中的Watchdog控制器定义：

```
wdt0: watchdog@19000000 {
    compatible = "artinchip,aic-wdt-v1.0";
    reg = <0x0 0x19000000 0x0 0x1000>;
    interrupts-extended = <&plic0 64 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cmu CLK_WDOG>;
    resets = <&rst RESET_WDOG>;
    dbg_continue;  // 使用Jtag进入debug状态时，计数是否继续。默认是暂停计数
    clr_thd = <3>;  // 用于设置clr_thd，单位：秒
};
```

注解

其中有两个扩展字段，如果没有配置将默认是0。

#### 2.2.3. Board 配置

xxx/board.dts中的参数配置比较简单，只是说明是否要打开Watchdog：

```
&wdt0 {
    status = "okay";
};
```

## 3. 调试指南

### 3.1. 调试开关

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，可以打开Watchdog模块的DEBUG选项：

```
Linux
    Kernel hacking
        Artinchip Debug
            [*] Watchdog driver debug
```

此DEBUG选项打开的影响：

1. Watchdog驱动以-O0编译
2. Watchdog的pr_dbg()和dev_dbg()调试信息会被编译

在系统运行时，如果要打印pr_dbg()和dev_dbg()信息，还需要调整loglevel为8，两个方法：

1. 在board.dts中修改bootargs，增加“loglevel=8”
2. 在板子启动到Linux shell后，执行命令：

```
echo 8 > /proc/sys/kernel/printk
```

### 3.2. Sysfs 节点

#### 3.2.1. status 节点

在Watchdog驱动初始化成功后，会在Sysfs中注册生成一个 `status` 节点，其中打印了当前的配置及状态信息：

```
[aic@] # cat /sys/devices/platform/soc/19000000.watchdog/status
In Watchdog V256.00:
Module Enable: 0
Dbg continue: 0
clr_thd: 333
Write disable: 0
IRQ Enable: 0
Current chan: 0 0
Current cnt: 352
chan clr_thd irq_thd rst_thd
   0       0  160000  320000
   1       0  160000  320000
   2       0  160000  320000
   3       0  160000  320000
```

#### 3.2.2. 当前的 Watchdog 通道信息

> 查看当前生效正在使用的 Watchdog 通道信息，方法：

```
[aic@] # cat /sys/devices/platform/soc/*.watchdog/timeout  —— 当前通道的timeout配置
10
[aic@] # cat /sys/devices/platform/soc/*.watchdog/pretimeout —— 当前通道的pretimeout配置
0
[aic@] # cat /sys/devices/platform/soc/*.watchdog/channel —— 当前生效的通道编号
0
```

## 4. 测试指南

### 4.1. 测试环境

#### 4.1.1. 硬件

- 开发板，或D211的FPGA板

#### 4.1.2. 软件

- PC端的串口终端软件，用于PC和开发板进行串口通信
- luban中带有的test_wdt测试工具

#### 4.1.3. 软件配置

在luban的根目录下通过 make menuconfig 可以打开 test_wdt 测试工具的编译：

```
Artinchip packages
    Sample code
        [*] test-watchdog
```

### 4.2. test_wdt 测试

test_wdt的主要功能是通过ioctl标准接口，来查询、设置Watchdog的。

板子上的test_wdt位于 `/usr/local/bin/`，无需进入该目录，在shell中直接运行test_wdt即可。

test_wdt的帮助信息：

```
[aic@] # test_wdt -u
Compile time: Apr 16 2022 14:31:42
Usage: test_wdt [options]
     -i, --info     Print the status and infomation
     -s, --set-timeout  Set a timeout, in second
     -g, --get-timeout  Get the current timeout, in second
     -p, --set-pretimeout   Set a pretimeout, in second
     -G, --get-pretimeout   Get the current pretimeout, in second
     -k, --keepalive    Keepalive the watchdog
     -u, --usage

Example: test_wdt -c 0 -s 12
Example: test_wdt -c 1 -s 100 -p 90
```

注解

1. WDT V1.0驱动中对timeout参数的范围有限制：[1, 3600]，即最小1秒、最多1小时。
2. Linux的Watchdog子系统中对pretimeout参数有限制：pretimeout必须小于timeout。

test_wdt的使用示例：

```
[aic@] # test_wdt -i
In Artinchip Watchdog timer watchdog V0, options 0x8180
Status: 32768
Boot status: 0
[aic@] # test_wdt -s 3601
wdt_set_timeout()125 - Set chan0 timeout 3601, pretimeout 0
[ERROR] wdt_set_timeout()128 - Failed to set timeout 22[Invalid argument]
[aic@] # test_wdt -s 0
wdt_set_timeout()125 - Set chan0 timeout 0, pretimeout 0
[ERROR] wdt_set_timeout()128 - Failed to set timeout 22[Invalid argument]
[aic@] # test_wdt -g
wdt_get_timeout()155 - Get chan0 timeout 16
[aic@] # test_wdt -s 2
wdt_set_timeout()125 - Set chan0 timeout 2, pretimeout 0
[aic@] # test_wdt -g
wdt_get_timeout()155 - Get chan0 timeout 2
[aic@] # test_wdt -s 9
wdt_set_timeout()125 - Set chan0 timeout 9, pretimeout 0
[aic@] # test_wdt -g
wdt_get_timeout()155 - Get chan0 timeout 9
[aic@] # test_wdt -s 9 -p 4
wdt_set_timeout()125 - Set chan0 timeout 9, pretimeout 4
```

## 5. 设计说明

### 5.1. 源码说明

源代码位于：drivers/watchdog/artinchip_wdt.c

### 5.2. 模块架构

Linux提供了一个Watchdog子系统（简称Watchdog Core），使得在用户空间可以通过/dev/watchdogX来访问Watchdog控制器。为了更方便查看硬件状态和参数设置，本驱动另外扩展了几个sysfs节点。

整个软件框架可以简单抽象为下图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/sw_system23.png](https://photos.100ask.net/artinchip-docs/d213-devkit/sw_system23-170669294451749-17067001233466.png)

图 4.18 *Linux Watchdog子系统架构图*

针对我们Watchdog控制器的几个特色功能：

1. 多通道

   将每个通道注册为一个watchdog设备，在/dev/目录下面生成多个watchdog设备节点。每一个Watchdog设备节点都提供标准的Watchdog ioctl接口。

2. 超时中断

   在Watchdog超时之前可以产生一些中断信号，让软件有机会做一些预处理。对应到Watchdog Core的pretimeout参数，可以支持对外注册pretimeout回调的机制。

3. 清零窗口

   Watchdog Core中没有对应的参数，所以提供一个int类型的DTS字段“clr_thd”，让用户态可以设置此门限，需要注意这个值是4个Watchdog通道共用的。默认是0，表示随时可以clean计数。详见： [Watchdog 自定义参数](2_config_guide.html#ref-wdt-dts)

4. 调试模式的计数状态

   当CPU进入Jtag的debug状态时，Watchdog计数可以选择是否暂停。类似的，也通过一个bool类型的DTS字段“dbg_continue”提供给用户态去设置。默认是暂停。详见 [Watchdog 自定义参数](2_config_guide.html#ref-wdt-dts)

### 5.3. 关键流程设计

#### 5.3.1. 初始化流程

WDT驱动的初始化过程见aic_wdt_probe()函数，除了普通platform设备的处理过程（申请regs资源、clk、reset）外，需要调用WDT子系统的接口devm_watchdog_register_device()来注册WDT设备。

```
int devm_watchdog_register_device(struct device *dev, struct watchdog_device *);
```

其中参数struct watchdog_device中关键信息有：名称、属性、最大/最小/默认timeout、ops等，aic_wdt_ops定义如下：

```
static const struct watchdog_ops aic_wdt_ops = {
    .owner      = THIS_MODULE,
    .start      = aic_wdt_start,
    .stop       = aic_wdt_stop,
    .ping       = aic_wdt_ping,
    .set_timeout    = aic_wdt_set_timeout,
    .set_pretimeout = aic_wdt_set_pretimeout,
    .restart    = aic_wdt_restart,
};
```

### 5.4. 数据结构设计

#### 5.4.1. aic_wdt_dev

记录Watchdog控制器的配置信息，其中包含4个Watchdog设备：

```
struct aic_wdt_dev {
    struct watchdog_device wdt_dev[WDT_CHAN_NUM];
    void __iomem *base;
    struct attribute_group attrs;
    struct clk *clk;
    struct reset_control *rst;
    u32 wdt_no;
    struct aic_wdt wdt[WDT_CHAN_NUM];
    bool dbg_continue;
    u32 clr_thd;
};
```

#### 5.4.2. aic_wdt

记录每一个Watchdog通道的配置信息：

```
struct aic_wdt {
    u32 clr_thd;
    u32 irq_thd;
    u32 rst_thd;
};
```

### 5.5. 接口设计

以下接口是 Linux Watchdog 子系统需要的标准接口。

#### 5.5.1. 外部接口

##### 5.5.1.1. ioctl 接口

Linux对用户态提供了一组Watchdog的ioctl接口，用户态可以通过设备节点/dev/watchdogX来访问：（详见include/upai/linux/watchdog.h）

```
struct watchdog_info {
    __u32 options;      /* Options the card/driver supports */
    __u32 firmware_version; /* Firmware version of the card */
    __u8  identity[32]; /* Identity of the board */
};

#define WDIOC_GETSUPPORT        _IOR(WATCHDOG_IOCTL_BASE, 0, struct watchdog_info)
#define WDIOC_GETSTATUS     _IOR(WATCHDOG_IOCTL_BASE, 1, int)
#define WDIOC_GETBOOTSTATUS _IOR(WATCHDOG_IOCTL_BASE, 2, int)
#define WDIOC_GETTEMP           _IOR(WATCHDOG_IOCTL_BASE, 3, int)
#define WDIOC_SETOPTIONS        _IOR(WATCHDOG_IOCTL_BASE, 4, int)
#define WDIOC_KEEPALIVE     _IOR(WATCHDOG_IOCTL_BASE, 5, int)
#define WDIOC_SETTIMEOUT     _IOWR(WATCHDOG_IOCTL_BASE, 6, int)
#define WDIOC_GETTIMEOUT     _IOR(WATCHDOG_IOCTL_BASE, 7, int)
#define WDIOC_SETPRETIMEOUT _IOWR(WATCHDOG_IOCTL_BASE, 8, int)
#define WDIOC_GETPRETIMEOUT _IOR(WATCHDOG_IOCTL_BASE, 9, int)
#define WDIOC_GETTIMELEFT       _IOR(WATCHDOG_IOCTL_BASE, 10, int)
```

[Demo](#ref-wdt-demo) 就是调用的这些接口完成Watchdog的访问。

#### 5.5.2. 内部接口

##### 5.5.2.1. aic_wdt_start

| 函数原型 | static int aic_wdt_start(struct watchdog_device *wdt_dev)    |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 使能一个Watchdog通道（device）                               |
| 参数定义 | wdt_dev - 指向Watchdog设备的指针                             |
| 返回值   | 0，成功                                                      |
| 注意事项 | 如果当前通道的Watchdog已经是使能状态，将执行ping操作（喂狗）。 |

##### 5.5.2.2. aic_wdt_stop

| 函数原型 | static int aic_wdt_stop(struct watchdog_device *wdt_dev) |
| -------- | -------------------------------------------------------- |
| 功能说明 | 关闭一个Watchdog通道（device）                           |
| 参数定义 | wdt_dev - 指向Watchdog设备的指针                         |
| 返回值   | 0，成功                                                  |
| 注意事项 |                                                          |

##### 5.5.2.3. aic_wdt_ping

| 函数原型 | static int aic_wdt_ping(struct watchdog_device *wdt_dev) |
| -------- | -------------------------------------------------------- |
| 功能说明 | 清零指定的Watchdog通道计数器，相当于“喂狗”操作           |
| 参数定义 | wdt_dev - 指向Watchdog设备的指针                         |
| 返回值   | 0，成功                                                  |
| 注意事项 | 需要先调用aic_wdt_start()，再调用此接口                  |

##### 5.5.2.4. aic_wdt_set_timeout

| 函数原型 | static int aic_wdt_set_timeout(struct watchdog_device *wdt_dev, unsigned int timeout) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 给指定的Watchdog设备设置一个超时                             |
| 参数定义 | wdt_dev - 指向Watchdog设备的指针timetout - 超时的数值，单位：秒 |
| 返回值   | 0，成功                                                      |
| 注意事项 | 1. 在Watchdog初始化时配置的最大、最小timeout参数，Watchdog Core会去做校验，如果超出范围，将采用上一次有效的timeout参数值。2. clr_thd会和timeout一起设置到Watchdog控制器。 |

##### 5.5.2.5. aic_wdt_set_pretimeout

| 函数原型 | static int aic_wdt_set_pretimeout(struct watchdog_device *wdt_dev,unsigned int pretimeout) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 给指定的Watchdog设备设置一个预超时                           |
| 参数定义 | wdt_dev - 指向Watchdog设备的指针pretimetout - 预超时的数值，单位：秒 |
| 返回值   | 0，成功                                                      |
| 注意事项 | pretimeout必须要小于该Watchdog通道的timeout参数，这个有效性检查会在Watchdog Core中去做（所以合理的ioctl操作是先设置timeout、再设置pretimeout），如果pretimeout无效将返回出错。 |

##### 5.5.2.6. aic_wdt_restart

| 函数原型 | static int aic_wdt_restart(struct watchdog_device *wdt_dev,unsigned long action, void *data) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 用于重启整个系统（方法是设置timeout是0，Watchdog会立即触发超时重启） |
| 参数定义 | wdt_dev - 指向Watchdog设备的指针action - 需要执行的操作类型（定义详见“注意事项”），目前统一按重启处理data - 附加数据，暂未用到 |
| 返回值   | 0，成功                                                      |
| 注意事项 |                                                              |

action的定义详见include/linux/reboot.h：

```
#define SYS_DOWN        0x0001  /* Notify of system down */
#define SYS_RESTART     SYS_DOWN
#define SYS_HALT            0x0002  /* Notify of system halt */
#define SYS_POWER_OFF   0x0003  /* Notify of system power off */
```

### 5.6. Demo

本Demo是通过ioctl接口来访问设备节点/dev/watchdog，代码详见 samples/test-watchdog/wdt.c

```
#include <artinchip/sample_base.h>
#include <sys/time.h>
#include <linux/watchdog.h>

/* Global macro and variables */

#define WDT_CHAN_NUM            4
#define WDT_MAX_TIMEOUT         (60 * 60)
#define WDT_MIN_TIMEOUT         1
#define WDT_DEV_PATH            "/dev/watchdog"

static const char sopts[] = "ic:s:gp:Gku";
static const struct option lopts[] = {
    {"info",        no_argument, NULL, 'd'},
    {"channel",     required_argument, NULL, 'c'},
    {"set-timeout",     required_argument, NULL, 's'},
    {"get-timeout",     no_argument, NULL, 'g'},
    {"set-pretimeout",  required_argument, NULL, 'p'},
    {"get-pretimeout",  no_argument, NULL, 'G'},
    {"keepalive",       no_argument, NULL, 'k'},
    {"usage",       no_argument, NULL, 'u'},
    {0, 0, 0, 0}
};

/* Functions */

int usage(char *program)
{
    printf("Compile time: %s %s\n", __DATE__, __TIME__);
    printf("Usage: %s [options]\n", program);
    printf("\t -i, --info\t\tPrint the status and infomation\n");
    printf("\t -s, --set-timeout\tSet a timeout, in second\n");
    printf("\t -g, --get-timeout\tGet the current timeout, in second\n");
    printf("\t -p, --set-pretimeout\tSet a pretimeout, in second\n");
    printf("\t -G, --get-pretimeout\tGet the current pretimeout, in second\n");
    printf("\t -k, --keepalive\tKeepalive the watchdog\n");
    printf("\t -u, --usage \n");
    printf("\n");
    printf("Example: %s -c 0 -s 12\n", program);
    printf("Example: %s -c 1 -s 100 -p 90\n\n", program);
    return 0;
}

/* Open a device file to be needed. */
int wdt_open(int chan)
{
    s32 fd = -1;
    char filename[16] = {0};

    sprintf(filename, "%s%d", WDT_DEV_PATH, chan);
    fd = open(filename, O_RDWR);
    if (fd < 0)
        ERR("Failed to open %s errno: %d[%s]\n",
            filename, errno, strerror(errno));

    return fd;
}

int wdt_enable(int fd, int enable)
{
    int ret = 0;
    int cmd = enable ? WDIOS_ENABLECARD : WDIOS_DISABLECARD;

    ret = ioctl(fd, WDIOC_SETOPTIONS, &cmd);
    if (ret < 0)
        ERR("Failed to %s wdt %d[%s]\n", enable ? "enable" : "disable",
            errno, strerror(errno));

    return ret;
}

int wdt_info(int chan)
{
    int ret = 0, devfd = -1;
    int status = 0;
    struct watchdog_info info = {0};

    devfd = wdt_open(chan);
    if (devfd < 0)
        return -1;

    ret = ioctl(devfd, WDIOC_GETSUPPORT, &info);
    if (ret < 0) {
        ERR("Failed to get support %d[%s]\n", errno, strerror(errno));
        goto err;
    }

    printf("In %s watchdog V%d, options %#x\n",
        info.identity, info.firmware_version, info.options);

    ret = ioctl(devfd, WDIOC_GETSTATUS, &status);
    if (ret < 0) {
        ERR("Failed to get status %d[%s]\n", errno, strerror(errno));
        goto err;
    }
    printf("Status: %d\n", status);

    ret = ioctl(devfd, WDIOC_GETBOOTSTATUS, &status);
    if (ret < 0) {
        ERR("Failed to get bootstatus %d[%s]\n", errno, strerror(errno));
        goto err;
    }
    printf("Boot status: %d\n", status);

err:
    wdt_enable(devfd, 0);
    close(devfd);
    return ret;
}

int wdt_set_timeout(int chan, int timeout, int pretimeout)
{
    int ret = 0, devfd = -1;

    devfd = wdt_open(chan);
    if (devfd < 0)
        return -1;

    DBG("Set chan%d timeout %d, pretimeout %d\n", chan, timeout, pretimeout);
    ret = ioctl(devfd, WDIOC_SETTIMEOUT, &timeout);
    if (ret < 0)
        ERR("Failed to set timeout %d[%s]\n", errno, strerror(errno));

    if (pretimeout) {
        ret = ioctl(devfd, WDIOC_SETPRETIMEOUT, &pretimeout);
        if (ret < 0)
            ERR("Failed to set pretimeout %d[%s]\n",
                errno, strerror(errno));
    }

    wdt_enable(devfd, 0);
    close(devfd);
    return ret;
}

int wdt_get_timeout(int chan)
{
    int ret = 0, devfd = -1;
    int timeout;

    devfd = wdt_open(chan);
    if (devfd < 0)
        return -1;

    ret = ioctl(devfd, WDIOC_GETTIMEOUT, &timeout);
    if (ret < 0)
        ERR("Failed to get timeout %d[%s]\n", errno, strerror(errno));
    else
        DBG("Get chan%d timeout %d\n", chan, timeout);

    wdt_enable(devfd, 0);
    close(devfd);
    return ret;
}

int wdt_set_pretimeout(int chan, int pretimeout)
{
    int ret = 0, devfd = -1;

    devfd = wdt_open(chan);
    if (devfd < 0)
        return -1;

    DBG("Set chan%d pretimeout %d\n", chan, pretimeout);
    ret = ioctl(devfd, WDIOC_SETPRETIMEOUT, &pretimeout);
    if (ret < 0)
        ERR("Failed to set pretimeout %d[%s]\n", errno, strerror(errno));

    wdt_enable(devfd, 0);
    close(devfd);
    return ret;
}

int wdt_get_pretimeout(int chan)
{
    int ret = 0, devfd = -1;
    int pretimeout;

    devfd = wdt_open(chan);
    if (devfd < 0)
        return -1;

    ret = ioctl(devfd, WDIOC_GETPRETIMEOUT, &pretimeout);
    if (ret < 0)
        ERR("Failed to get pretimeout %d[%s]\n", errno, strerror(errno));
    else
        DBG("Get chan%d pretimeout %d\n", chan, pretimeout);

    wdt_enable(devfd, 0);
    close(devfd);
    return ret;
}

int wdt_keepalive(int chan)
{
    int ret = 0, devfd = -1;

    devfd = wdt_open(chan);
    if (devfd < 0)
        return -1;

    ret = ioctl(devfd, WDIOC_KEEPALIVE, NULL);
    if (ret < 0)
        ERR("Failed to keepalive %d[%s]\n", errno, strerror(errno));
    else
        DBG("keepalive chan%d\n", chan);

    wdt_enable(devfd, 0);
    close(devfd);
    return ret;
}

int main(int argc, char **argv)
{
    int c, chan = 0;
    int timeout = 0, pretimeout = 0;

    while ((c = getopt_long(argc, argv, sopts, lopts, NULL)) != -1) {
        switch (c) {
        case 'c':
            chan = str2int(optarg);
            if ((chan < 0) || (chan >= WDT_CHAN_NUM)) {
                ERR("Invalid channel No.%s\n", optarg);
                return -1;
            }
            DBG("You select the channel %d\n", chan);
            continue;
        case 's':
            timeout = str2int(optarg);
            continue;
        case 'g':
            return wdt_get_timeout(chan);
        case 'p':
            pretimeout = str2int(optarg);
            continue;
        case 'G':
            return wdt_get_pretimeout(chan);
        case 'i':
            return wdt_info(chan);
        case 'k':
            return wdt_keepalive(chan);
        case 'u':
        default:
            return usage(argv[0]);
        }
    }

    return wdt_set_timeout(chan, timeout, pretimeout);
}
```

## 6. 常见问题

### 6.1. wdt 设置 pretimeout 失败

#### 6.1.1. 现象

执行wdt -s x -p y 失败，报无效的timeout。

#### 6.1.2. 原因分析

Linux的Watchdog子系统中对timeout和pretimeout参数有限制：pretimeout必须小于timeout，如果不符合这个条件就会设置失败。