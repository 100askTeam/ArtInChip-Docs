---
sidebar_position: 23
---
#  PWM 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语/缩略语   | 定义及说明                                                   |
| ------------- | ------------------------------------------------------------ |
| PWM           | Pulse-Width Modulation，脉冲宽度控制，简称脉宽调制           |
| TBC           | Time Base Counter，时基计数器，用于产生锯齿波                |
| 占空比        | PWM信号中，高电平保持的时间 与 该PWM时钟周期的时间之比       |
| 分辨率        | 占空比最小能达到多少，如8位的PWM理论分辨率是1:255            |
| Up Count      | 增模式, 计数方式是递增计数，如从0计数到80、之后又从0到80（波形是锯齿波） |
| Down Count    | 减模式, 计数方式是递减计数，如从80计数到0、之后又从80到0（波形是锯齿波） |
| 单斜率        | 单个方向的计数，增模式、减模式都属于单斜率                   |
| Up&Down Count | 增减模式，计数方向有两个，如从0计数到80、然后从80到0（波形是三角波），增、减两个过程合起来算一个周期 |
| 双斜率        | 两个方向的计数，增减模式属于双斜率                           |

### 1.2. PWM 工作原理

#### 1.2.1. PWM 信号

PWM信号通常由一列占空比不同的矩形脉冲构成，其占空比可以调节。用数字输出来控制PWM占空比，占空比提高意味着高电平脉宽增大，输出的能量就会增加，PWM就相当于一个 **功率版的DA转换模块**。下图是一个典型的PWM信号波形：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/pwm_wave1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/pwm_wave1-17067581098481.png)

图 7.19 *典型的 PWM 信号波形*[¶](#id8)

占空比的计算方法： `占空比 = (脉宽时间 / 周期) * 100%`

结合上图，我们可以说： 脉宽时间1 相比 脉宽时间2 提供较小的占空比。

PWM通常用于背光亮度调节、电机控制、舵机控制等。本文仅限于PWM调节背光的功能，通过调节PWM中的占空比，达到控制LED背光电流的通和断，进而可调整背光亮度。



#### 1.2.2. 增模式

为了灵活调节PWM信号的占空比，要先想办法产生一个递增、或者递减的锯齿波信号，另外再结合一个比较器来跟一个阈值进行比较，当满足条件时进行电平反转，这样达到的效果就是通过调节“阈值”来调节了占空比。

下图是由一个 **递增变化** 的锯齿波产生PWM信号的过程：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/generate_pwm_up1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/generate_pwm_up1-17067581252273.png)

图 7.20 *由增模式锯齿波产生 PWM 信号的过程示意图*

图中 Tpwm 表示PWM信号的周期值，另外有 **三个关键的时间点（下文简称关键时点）** （标注橙色圆圈，为了简洁只标注了最后一个周期）在下文中会频繁使用：

- - ZRO

    Zero Point的缩写，锯齿波的起始点

- - PRD

    Preiod Point的缩写，锯齿波到达一个满周期的时间点

- - CMP

    Compare Point的缩写，锯齿波到达了阈值的时间点，如上图中的CMP值为7。

小技巧

实际上，PWM模块支持设置两个CMP值：CMPA和CMPB。受限于Linux中PWM子系统架构的接口设计，根据duty参数计算只能得到一个CMP值，所以 **CMPB和CMPA实际上数值保持一致**。

这些关键时点的触发行为Action有四种类型，详见 [PWM 自定义参数](2_config_guide.html#ref-pwm-dts)

#### 1.2.3. 减模式

下图是由一个 **递减变化** 的锯齿波产生PWM信号的过程：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/generate_pwm_down1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/generate_pwm_down1-17067581420915.png)

图 7.21 *由减模式锯齿波产生 PWM 信号的过程示意图*[¶](#id10)

#### 1.2.4. 增减模式

下图是由一个 **同时有递减、递减变化** 的锯齿波产生PWM信号的过程：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/generate_pwm_updown1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/generate_pwm_updown1-17067581539537.png)

图 7.22 *由增减模式锯齿波产生 PWM 信号的过程示意图*

比较以上三种模式的PWM产生过程，可以看到：

- 三种模式可以产生同样效果的PWM信号
- 配置ZRO、CMP（增减模式中有两处CMP）、PRD的触发行为（Action），可产生不同的PWM信号
- CMP的取值，直接决定了占空比，所以用户看到的 **调节占空比就是通过调节CMP值来实现**
- PRD的值，决定了PWM信号的周期值Tpwm

小技巧

具体选择哪一种模式，要依据用户场景的需求特点，建议按 **从简原则：首选相对简单的单斜率模式**。

### 1.3. PWM 功能简介

PWM的硬件设计，使用时基计数器产生上述的锯齿波信号，使用一个比较器可同时产生两路PWM信号。 PWM模块的硬件原理图可简化如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/hw_system8.png](https://photos.100ask.net/artinchip-docs/d213-devkit/hw_system8-17067581733139.png)

图 7.23 *简化的 PWM 硬件框图*

PWM模块共支持4个PWM通道，上图只画出了其中一个PWM通道，每个通道的输出信号有两个：PWMx0和PWMx1，对应DTS参数中的 action0和action1 配置。 [PWM 自定义参数](2_config_guide.html#ref-pwm-dts)

PWM 模块支持的功能特性有：

- - 每个PWM通道可以产生两个PWM输出信号: PWMx0 和 PWMx1，可遵循如下配置

    两个独立的单边输出两个独立的双边对称输出一个独立的双边非对称输出

- 专用的16位可配置周期和频率的时基计数器（Time Base Counter）

- 系统时钟100MHz

- 多种事件可配置产生对应的中断

注解

PWM硬件Spec文档中，将两个PWM输出信号称作 PWMxA 和 PWMxB，为了避免和阈值 CMPA、CMPB 混淆，软件设计中将两个输出信号称作 PWMx0 和 PWMx1。

在CMPA、CMPB同时使用的情况下，锯齿波就会有两次和阈值的比较，共产生4个关键时点：

| 锯齿波信号波段 | CMPA                 | CMPB                 |
| -------------- | -------------------- | -------------------- |
| 增斜率段       | CAU (Compare A Up)   | CBU (Compare B Up)   |
| 减斜率段       | CAD (Compare A Down) | CBD (Compare B Down) |

以增减模式的锯齿波为例，共6个关键时点：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/cmpa_cmpb1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/cmpa_cmpb1-170675819471711.png)

图 7.24 *增减模式的6个关键时点*

上图中的，6个关机时点的触发行为配置是：（行为类型定义见 [PWM 自定义参数](2_config_guide.html#ref-pwm-dts)）

| 关键时点 | Action类型 |
| -------- | ---------- |
| CBD      | none       |
| CBU      | none       |
| CAD      | high       |
| CAU      | none       |
| PRD      | low        |
| ZRO      | low        |

## 2. 参数配置

### 2.1. 内核配置

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，按如下选择：

```
Linux
    Device Drivers  --->
        [*] Pulse-Width Modulation (PWM) Support  --->
            <*>   ArtInChip PWM support
```

通常，PWM模块被用于 背光控制功能，以下是打开Linux中背光控制模块的方法：

```
Linux
    Device Drivers  --->
        Graphics support  --->
            Backlight & LCD device support  --->
                <*> Lowlevel Backlight controls
                <*>   Generic PWM based Backlight Driver
```

当使用boot logo功能时，在U-Boot阶段也需要打开屏幕的背光。在U-Boot中打开背光控制模块的方法（在luban根目录下执行 make bm/boot-menuconfig）：

```
U-Boot
    Device Drivers  --->
        [*] Enable support for pulse-width modulation devices (PWM)
        [*]   Enable support for ArtInChip PWM
        Graphics support  --->
            [*] Generic PWM based Backlight Driver
```

### 2.2. DTS 参数配置

#### 2.2.1. PWM 自定义参数

PWM驱动支持从DTS中配置的自定义参数，如下表：

| 参数名称      | 类型   | 取值范围              | 功能说明               |
| ------------- | ------ | --------------------- | ---------------------- |
| mode          | 字符串 | up/down/up-down-count | 配置增减模式           |
| tb-clk-rate   | 正整数 | (0, 24000000)         | 时基计数器的工作时钟   |
| action0       | 字符串 | none/low/high/inverse | 多个关键时点的触发行为 |
| action1       | 字符串 | none/low/high/inverse | 多个关键时点的触发行为 |
| default-level | 正整数 | [0, 1]                | 默认/初始电平          |

注意，表中为了更加简洁，参数名称都省略了前缀“aic,”。

表中 action0和action1 四种取值的含义，定义如下：

| Action类型 | 行为描述                               |
| ---------- | -------------------------------------- |
| none       | 不做任何变化，保持之前的输出电平       |
| low        | 跳变为0电平                            |
| high       | 跳变为1电平                            |
| inverse    | 跳变为反向的电平，比如原本是0则跳变为1 |

#### 2.2.2. 时钟配置

PWM模块涉及4个时钟的衍生关系：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/pwm_clk_tree1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/pwm_clk_tree1-170675824837213.png)

图 7.25 *PWM 模块的时钟衍生关系图*

其中，前两个时钟在PWM控制器的节点中配置，后两个时钟在Board中的PWM子节点（对应通道）中配置。

注解

容易混淆的sysclk：

1. PWM驱动中，按照惯例将父时钟称作 `sysclk`，即上图的PLL INT1；
2. PWM硬件spec中，将上图中的PWM Clk称作 `sysclk`。

#### 2.2.3. D211 配置

common/d211.dtsi中的参数配置：

```
pwm: pwm@19240000 {
    compatible = "artinchip,aic-pwm-v1.0";
    reg = <0x0 0x19240000 0x0 0x1000>;
    interrupts-extended = <&plic0 90 IRQ_TYPE_LEVEL_HIGH>;
    #pwm-cells = <3>;
    clocks = <&cmu CLK_PWM>, <&cmu CLK_PLL_INT1>;
    clock-names = "pwm", "sysclk";
    resets = <&rst RESET_PWM>;
    clock-rate = <48000000>;
};
```

#### 2.2.4. Board 配置

##### 2.2.4.1. PWM 通道配置

xxx/board.dts中的参数配置：

```
&pwm {
    status = "okay";
    pinctrl-names = "default";
    pinctrl-0 = <&pwm2_pins_b>;
    /* mode: up-count, down-count, up-down-count
       action: none, low, high, inverse */
    pwm0 {
        aic,mode = "up-count";
        aic,tb-clk-rate = <24000000>;
        aic,rise-edge-delay = <10>;
        aic,fall-edge-delay = <10>;
        /*            CBD,    CBU,    CAD,    CAU,    PRD,   ZRO */
        aic,action0 = "none", "none", "none", "low", "none", "high";
        aic,action1 = "none", "none", "none", "high", "none", "low";
        status = "disabled";
    };

    pwm1 {
        aic,mode = "down-count";
        aic,tb-clk-rate = <24000000>;
        aic,rise-edge-delay = <10>;
        aic,fall-edge-delay = <10>;
        /*            CBD,    CBU,    CAD,    CAU,    PRD,   ZRO */
        aic,action0 = "none", "none", "none", "low", "none", "high";
        aic,action1 = "none", "none", "none", "high", "none", "low";
        status = "disabled";
    };

    pwm2 {
        aic,mode = "up-count";
        aic,tb-clk-rate = <24000000>;
        /*            CBD,    CBU,    CAD,    CAU,    PRD,   ZRO */
        aic,action0 = "none", "none", "none", "high", "low", "none";
        aic,action1 = "none", "none", "none", "low", "high", "none";
        aic,default-level = <0>;
        aic,rise-edge-delay = <10>;
        aic,fall-edge-delay = <10>;
        status = "okay";
    };

    pwm3 {
        aic,mode = "up-count";
        aic,tb-clk-rate = <24000000>;
        /*            CBD,    CBU,    CAD,    CAU,    PRD,   ZRO */
        aic,action0 = "none", "none", "none", "low", "high", "none";
        aic,action1 = "none", "none", "none", "high", "low", "none";
        aic,rise-edge-delay = <10>;
        aic,fall-edge-delay = <10>;
        status = "disabled";
    };
};
```



##### 2.2.4.2. 背光控制配置

需要在xxx/board.dts中新增一个backlight节点，如下：

```
backlight: backlight {
    compatible = "pwm-backlight";
    /* pwm node name; pwm device No.; period_ns; pwm_polarity */
    pwms = <&pwm 2 1000000 0>;
    brightness-levels = <0 10 20 30 40 50 60 70 80 90 100>;
    default-brightness-level = <8>;
    status = "okay";
};
```

其中 “&pwm 2” 表示要使用 pwm2 通道作为背光控制用（要确认和硬件上的电路连接是一致的）。

在屏幕panel节点中，需要引用backlight：

```
panel_lvds {
    compatible = "artinchip,aic-general-lvds-panel";
    data-mapping = "vesa-24";
    data-channel = "single-link1";
    backlight = <&backlight>;
    status = "okay";
    ...
};
```

## 3. 调试指南

### 3.1. 调试开关

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，可以打开PWM模块的DEBUG选项：

```
Linux
    Kernel hacking
        Artinchip Debug
            [*] PWM driver debug
```

此DEBUG选项打开的影响：

1. PWM 驱动以-O0编译
2. PWM 的pr_dbg()和dev_dbg()调试信息会被编译

在系统运行时，如果要打印pr_dbg()和dev_dbg()信息，还需要调整loglevel为8，两个方法：

1. 在board.dts中修改bootargs，增加“loglevel=8”
2. 在板子启动到Linux shell后，执行命令：

```
echo 8 > /proc/sys/kernel/printk
```

### 3.2. Sysfs 节点

#### 3.2.1. 状态信息

在PWM驱动初始化成功后，会在Sysfs中注册生成一个 `status` 节点，其中打印了当前的PWM配置及状态信息：

```
# cat /sys/devices/platform/soc/19240000.pwm/status
In PWM V1.00:
Module Enable: 1, IRQ Enable: 0x0
Ch En Mode Tb-clk-rate Def CBD CBU CAD CAU PRD ZRO
 0  0   Up           0   0   -   -   -   -   -   -
                             -   -   -   -   -   -
 1  0   Up           0   0   -   -   -   -   -   -
                             -   -   -   -   -   -
 2  1   Up    24000000   0   -   -   - Hgh Low   -
                             -   -   - Low Hgh   -
 3  0   Up           0   0   -   -   -   -   -   -
                             -   -   -   -   -   -
```

#### 3.2.2. 设置背光

Linux Backlight子系统提供一些 Sysfs 节点，可用来获取、设置当前背光：

```
# cd /sys/class/backlight/backlight/
# ls /sys/class/backlight/backlight/
actual_brightness  device/            subsystem/
bl_power           max_brightness     type
brightness         scale              uevent
# cat max_brightness
10
# cat brightness
8
# echo 9 > brightness
[  146.913635] backlight: set brightness to 9
[  154.054433] aic-pwm 19240000.pwm: ch0 duty 900000 period 1000000
# echo 10 > brightness
[  192.145595] backlight: set brightness to 10
[  192.151118] aic-pwm 19240000.pwm: ch0 duty 1000000 period 1000000
# echo 9 > brightness
[  194.681923] backlight: set brightness to 9
[  194.687264] aic-pwm 19240000.pwm: ch0 duty 900000 period 1000000
# echo 8 > brightness
[  197.748816] backlight: set brightness to 8
[  197.753606] aic-pwm 19240000.pwm: ch0 duty 800000 period 1000000
# echo 7 > brightness
```

#### 3.2.3. 动态配置 PWM 通道

通常情况下，修改PWM通道的配置，方法是：

1. 修改board.dts中的PWM通道参数；
2. 编译uboot、镜像；
3. 重启板子，下载最新镜像；
4. 然后用示波器查看该PWM通道的信号输出是否符合预期。

为了提供调试的效率，PWM驱动设计了一个 `config` 节点，可实现 **运行时动态修改任意PWM通道的任意参数** ，并且立即生效，一步shell中的 `echo` 操作可实现上述1、2、3步骤的效果。如下：

```
# echo "0 1 0 24000000 1 0 2 0 0 1 0" > /sys/devices/platform/soc/1924000.pwm/config
[aic@] # cat /sys/devices/platform/soc/19240000.pwm/status
In PWM V1.00:
Module Enable: 1, IRQ Enable: 0x0
Ch En Mode Tb-clk-rate Def CBD CBU CAD CAU PRD ZRO
 0  1   Up    24000000   1   -   -   - Hgh Low   -
                             - Hgh   -   - Low   -
 1  0   Up    24000000   1   -   -   - Hgh Low Low
                             -   -   -   -   -   -
 2  0   Up    24000000   0   -   -   -   -   -   -
                             -   -   -   -   -   -
 3  0   Up    24000000   0   -   -   -   -   -   -
                             -   -   -   -   -   -
```

`config` 的参数格式定义如下（按从左到右的输入顺序）：

![image-20240201113211072](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201113211072.png)

## 4. 测试指南

### 4.1. 测试环境

#### 4.1.1. 硬件

- 开发板，或D211的FPGA板
- 示波器，用于观察输出PWM信号的波形

#### 4.1.2. 软件

- PC端的串口终端软件，用于PC和开发板进行串口通信

#### 4.1.3. 软件配置

背光测试中，需要依赖Backlight的功能：

1. 在内核中打开Backlight模块，详见 [内核配置](2_config_guide.html#ref-pwm-km)
2. 在DTS中配置Backlight和PWMx通道的关联，详见 [背光控制配置](2_config_guide.html#ref-pwm-dts-bl)

### 4.2. 背光测试

利用 Linux Backlight 子系统生成的Sysfs节点，就可以逐级控制背光的亮度变化，详见 [设置背光](3_debug_guide.html#ref-pwm-sysfs-bl)

### 4.3. 测试PWM信号

需要借助示波器，方法是：

1. 通过 Sysfs节点中的 `config` 节点，设置 PWM某通道的参数，方法见 [动态配置 PWM 通道](3_debug_guide.html#ref-pwm-config)
2. 然后用示波器查看该PWM通道的信号输出是否符合预期。

以下是一些典型的参数组合，可参考：

![image-20240201113316371](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201113316371.png)

其中，“正占空比”和“负占空比” 的意思是指当通过 Backlight 节点设置背光亮度时，得到的占空比结果是正向、还是反向的。

## 5. 设计说明

### 5.1. 源码说明

源代码位于：drivers/pwm/pwm-artinchip.c

### 5.2. 模块架构

Linux提供了一个PWM子系统，使得在用户空间可以通过sysfs节点来控制Backlight背光。 整个软件框架如下图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/sw_system18.png](https://photos.100ask.net/artinchip-docs/d213-devkit/sw_system18-170675845520515.png)

图 7.26 *Linux PWM 子系统和 Backlight 子系统的软件关系图*

上图可以看到PWM子系统中有两个概念：

1. - PWM Chip

     和硬件的PWM控制器一一对应，内核中维护了一个pwm chip的链表。

2. - PWM Device

     和硬件的多路PWM通道一一对应，一个pwm chip可以包含多个pwm device。

### 5.3. 关键流程设计

#### 5.3.1. 初始化流程

PWM驱动的初始化过程见aic_pwm_probe()函数，除了普通platform设备的处理过程（申请regs资源、clk、reset）外，需要调用PWM子系统的接口pwmchip_add()来注册一个PWM控制器。

```
int pwmchip_add(struct pwm_chip *chip);
```

其中参数pwm_chip中关键信息有：通道数目、PWM控制器的ops等，aic_pwm_ops定义如下：

```
static const struct pwm_ops aic_pwm_ops = {
    .free = aic_pwm_free,
    .get_state = aic_pwm_get_state,
    .config = aic_pwm_config,
    .set_polarity = aic_pwm_set_polarity,
    .enable = aic_pwm_enable,
    .disable = aic_pwm_disable,
    .owner = THIS_MODULE,
};
```

#### 5.3.2. 背光设备的初始化流程

在 [内核配置](2_config_guide.html#ref-pwm-km) 中，我们打开了一个背光设备“Generic PWM based Backlight Driver”，这个设备对应的驱动代码见 drivers/video/backlight/pwm_bl.c，在其中的probe()函数中会调用devm_pwm_get()来获取对应的pwm设备。

```
pwm_bl.c, pwm_backlight_probe()
    -> pwm/core.c, devm_pwm_get()
        -> aic_pwm_get_state()
    -> pwm/core.c, pwm_apply_state()
        -> aic_pwm_config()
        -> aic_pwm_set_polarity()
```

#### 5.3.3. 中断处理流程

注解

PWM的中断处理函数暂时为空，还不确定有哪些异常需要处理。

### 5.4. 数据结构设计

#### 5.4.1. aic_pwm_arg

记录每一个PWM通道的配置信息：

```
struct aic_pwm_arg {
    bool available;
    enum aic_pwm_mode mode;
    u32 tb_clk_rate;
    u32 freq;
    u32 db_red; /* Rising edge delay count of Dead-band */
    u32 db_fed; /* Failing edge delay count of Dead-band */
    struct aic_pwm_action action0;
    struct aic_pwm_action action1;
    u32 period;
    bool def_level;
    enum pwm_polarity polarity;
};
```

#### 5.4.2. aic_pwm_chip

```
struct aic_pwm_chip {
    struct pwm_chip chip;
    struct attribute_group attrs;
    struct aic_pwm_arg args[AIC_PWM_CH_NUM];
    unsigned long pll_rate;
    unsigned long clk_rate;
    void __iomem *regs;
    struct clk *clk;
    struct reset_control *rst;
    u32 irq;
};
```

### 5.5. 接口设计

以下接口是 Linux PWM 子系统需要的标准接口。

#### 5.5.1. aic_pwm_enable

| 函数原型 | static int aic_pwm_enable(struct pwm_chip *chip, struct pwm_device *pwm) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 使能一个pwm通道（device）                                    |
| 参数定义 | chip - 指向pwm_chip的指针pwm - 指向pwm_device的指针          |
| 返回值   | 0，成功； < 0，失败                                          |
| 注意事项 |                                                              |

#### 5.5.2. aic_pwm_disable

| 函数原型 | static void aic_pwm_disable(struct pwm_chip *chip, struct pwm_device *pwm) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 关闭一个pwm通道（device）                                    |
| 参数定义 | chip - 指向pwm_chip的指针pwm - 指向pwm_device的指针          |
| 返回值   | 无                                                           |
| 注意事项 |                                                              |

#### 5.5.3. aic_pwm_free

| 函数原型 | static void aic_pwm_free(struct pwm_chip *chip, struct pwm_device *pwm) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 释放一个pwm通道（device），实际上是设置其period为0（无效）   |
| 参数定义 | chip - 指向pwm_chip的指针pwm - 指向pwm_device的指针          |
| 返回值   | 无                                                           |
| 注意事项 | 需要先调用aic_pwm_disable()，再调用此接口                    |

#### 5.5.4. aic_pwm_get_state

| 函数原型 | static void aic_pwm_get_state(struct pwm_chip *chip, struct pwm_device *pwm,struct pwm_state *state) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 获取当前PWM控制器的配置信息。当使能boot logo功能时，U-Boot中已经初始化过PWM，所以Linux中需要从PWM控制器中同步一下当前状态 |
| 参数定义 | chip - 指向pwm_chip的指针pwm - 指向pwm_device的指针state - 指向pwm_state的指针，用于返回当前PWM的状态信息 |
| 返回值   | 无                                                           |
| 注意事项 |                                                              |

#### 5.5.5. aic_pwm_config

| 函数原型 | static int aic_pwm_config(struct pwm_chip *chip, struct pwm_device *pwm,int duty_ns, int period_ns) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 配置一个pwm通道（device）的占空比                            |
| 参数定义 | chip - 指向pwm_chip的指针pwm - 指向pwm_device的指针duty_ns - 一个PWM周期内的负载时长period_ns - 一个PWM周期 |
| 返回值   | 0，成功；< 0，失败                                           |
| 注意事项 |                                                              |

#### 5.5.6. aic_pwm_set_polarity

| 函数原型 | static int aic_pwm_set_polarity(struct pwm_chip *chip, struct pwm_device *pwm,enum pwm_polarity polarity) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 配置一个pwm通道（device）的极性（是否需要翻转）              |
| 参数定义 | chip - 指向pwm_chip的指针pwm - 指向pwm_device的指针polarity - 指定的极性 |
| 返回值   | 0，成功；< 0，失败                                           |
| 注意事项 |                                                              |

## 6. 常见问题

### 6.1. 每个 PWM 控制器的两路输出信号有什么关系？

每个控制器可以控制两路输出PWM信号，这两路信号从设计上有三个约束条件：

1. 共用同一个 **time-base 信号**，即DTS参数 `tb-clk-rate`，详见 [PWM 自定义参数](2_config_guide.html#ref-pwm-dts)；
2. 共用同一个 **PWM 信号频率** 配置参数；
3. 共用同一个 **占空比** 配置参数。

上述 “PWM 信号频率” 和 “占空比” 由PWM的 **调用者运行时配置**。 两路信号可以完全相同，也可以做到亮点差别：

1. 相位相反，在占空比上看到的是一个为正、一个为负；
2. 可以关闭其中一路，在DTS参数中将对应的Action配置为 “none” 即可。

### 6.2. PWM 信号的占空比是反向的

#### 6.2.1. 现象

通过 Backlight 设备配置了背光亮度后，得到的占空比相位是反向的。比如配置80%，得到的是20%。

#### 6.2.2. 原因分析

PWM 信号的电平跳变方向完全是由几个关键时点的配置参数决定，所以如果碰到占空比反向的情况，直接的调整方法是将配置参数反向设置即可。

[测试PWM信号](4_test_guide.html#ref-pwm-result) 提供了一些典型的参考配置，可以看到相邻的“负占空比”和“正占空比”参数配置基本是反向的。

### 6.3. PWM 信号的周期不准

#### 6.3.1. 现象

这个问题，通常出现在增减模式，看到周期值可能存在“差1”的误差。

#### 6.3.2. 解决方法

对于 增模式 和 减模式，周期值的计算方法比较简单：

> ```
> Tpwm = (TB Period + 1) / tb-clk-rate
> Fpwm = 1 / Tpwm
> ```

对于 增加模式，周期值的计算方法是：

> ```
> Tpwm = 2 * TB Period / tb-clk-rate
> Fpwm = 1 / Tpwm
> ```

其中：

- tb-clk-rate: 时基计数器的工作时钟
- Tpwm: PWM信号的周期值
- Fpwm: PWM信号的频率值
- TB Period: 时基计数器的计数值，假设此值是100，那么从0计数到99就是一个增模式PWM信号的周期

在PWM驱动中，tb-clk-rate是从DTS中获取的，其他几个值的计算顺序是：

```
Tpwm(即period_ns) -> Fpwm（即freq） -> TB Period(即prd)
```

代码详见函数aic_pwm_config()中：

```
arg->freq = NSEC_PER_SEC / period_ns;
prd = arg->tb_clk_rate / arg->freq;
if (arg->mode == PWM_MODE_UP_DOWN_COUNT)
    prd >>= 1;
else
    prd--;
```

可以看到上面 TB Period(即prd) 的计算过程中有一次 **除2操作**，所以可能会引入“差1”的误差。