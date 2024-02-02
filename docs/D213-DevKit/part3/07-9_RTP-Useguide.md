---
sidebar_position: 24
---
#  RTP 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语  | 定义                     | 注释说明        |
| ----- | ------------------------ | --------------- |
| ADC   | Analog Digital Converter | 模拟数字转换器  |
| ADCIM | ADC Interface Management | ADC接口管理模块 |
| RTP   | Resistance Touch Panel   | 电阻触摸屏      |

### 1.2. 模块简介

- RTP模块特性：

  支持4线RTP，即X+、X-、Y+、Y-支持压力感应支持最多2点触摸支持采样滤波，滤波参数可配置支持触摸检测中断FIFO深度16

RTP需要依赖ADCIM模块（统一管理硬件通路和处理信号校准），其关系如图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/hw_system9.png](https://photos.100ask.net/artinchip-docs/d213-devkit/hw_system9-17067587297831.png)

图 7.27 *RTP和ADCIM的逻辑关系图*[¶](#id10)

对于一次RTP的点击动作，会有4个相关的采样点：X+、X-、Y+、Y-（详见下文）， 这些采样点的选择和控制方式可以有不同的组合，分为两大类采样模式：

- 手动模式

  手动去配置硬件4个采样点的电路信号，来组合得到XN、YN、ZA、ZB等采样数据。

- 自动模式

  自动模式意味着硬件自动配置电路，直接输出XN、YN、ZA、ZB等采样结果。 在自动模式中，根据采样数据是否连续进行又分为：Period sample：**周期采样**，硬件会按照配置的周期自动采集和上报数据Single sample：为避免和“单个采样点”混淆，称作 **非周期采样**，由软件触发完成一次采样

### 1.3. 工作原理

#### 1.3.1. 硬件结构原理

下图是RTP硬件结构的一个侧面剖视图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/hw_structure4.png](https://photos.100ask.net/artinchip-docs/d213-devkit/hw_structure4-17067587476363.png)

图 7.28 *RTP硬件结构图*[¶](#id11)

- 表面硬图层：手指触摸的表面是一个硬涂层，用以保护下面的PET层。
- PET层：很薄、有弹性，当表面被触摸时它会向下弯曲，并使得下面的两层ITO涂层能够相互接触并在该点连通电路。
- ITO陶瓷层：两个ITO层之间是约千分之一英寸厚的一些隔离支点使两层分开。
- 玻璃底层：最下面是一个透明的硬底层用来支撑上面的结构，通常也可以用塑料。

RTP的多层结构会导致很大的光损失，对于手持设备通常需要加大背光源来弥补透光性不好的问题， 必然会增加电池的消耗。

RTP的优点是它的屏和控制系统都比较便宜。

#### 1.3.2. 坐标计算[¶](#id6)

- ITO陶瓷层分为上下两层：

  X层和Y层，中间用隔离支点分开，当有触摸按下，就触摸点的X层、Y层就会导通。当没有触摸按下时，X层和Y层是分离的，此时就测不到电压。

X层上X-到X+和Y-到Y+的电阻是均匀分布的，其电路等效图如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/xy_layer1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/xy_layer1-17067587554045.png)

图 7.29 *RTP的X层、Y层等效电路*

1. **计算X坐标**：在X+电极施加驱动电压V， X-电极接地，Y+做为引出端测量得到接触点的电压。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/x_coordinate1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/x_coordinate1-17067587728917.png)

图 7.30 *计算X坐标的关系图*

由于ITO层均匀导电，触点电压与Vdrive电压之比等于触点X坐标与屏宽度之比。

```
x = (Vy/Vdrv) * width
```

1. **计算Y坐标**：在Y+电极施加驱动电压V，Y-接地，芯片通过X+测量接触点的电压。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/y_coordinate1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/y_coordinate1-17067587881439.png)

图 7.31 *计算Y坐标的关系图*

由于ITO层均匀导电，触点电压与V电压之比等于触点Y坐标与屏高度之比。

```
y/height = Vx/Vdrv
y = (Vx/Vdrv) * height
```

#### 1.3.3. 坐标采样

基于以上原理，对X+、X-、Y+、Y-加不同的电信号，拉低、还是拉高，会得到多种组合， 常用的组合命名为：XN、XP、YN、YP、ZA、ZB、ZC、ZD，具体电信号定义见spec。 可以简单理解为：X*、Y*都是和位置有关的数据，Z*是和压感有关的数据。

#### 1.3.4. 坐标校准

触摸屏和LCD屏需要合在一起使用，LCD屏中运行的GUI需要知道的是一个转换后的坐标， 这个坐标值需要是在LCD屏分辨率的范围内。所以需要一个触摸屏坐标到LCD坐标之间的线性转换，通用公式如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/coordinate_adjustment1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/coordinate_adjustment1-170675880643911.png)

其中s是RTP的ADC分辨率，12bit的话就是4096（即RTP采样得到的数据范围是0~4095）。

- 校准过程的操作方法

  在屏幕4个角落分别点击，就可以测到4组LCD坐标值和触摸屏触摸屏坐标值，从而可以列出8个等式， 求解出a、b、c、d、e、f的值。

小技巧

开源tslib库附带的ts_calibrate工具，提供了5点校准的处理。



#### 1.3.5. 压感计算

当打开压感数据后，便于根据压力数据来过滤掉一些抖动的点。 尤其在触摸时抬起的瞬间会大概率产生压力很小的采样数据，这样的数据会存在较大误差，可以根据压力将其过滤掉。

可以通过两个公式来计算压力数据：（Z1、Z2对应上述的ZA、ZB数据）

**公式1：**

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/pressure_formula11.png](https://photos.100ask.net/artinchip-docs/d213-devkit/pressure_formula11-170675881957113.png)

**公式2：**

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/pressure_formula21.png](https://photos.100ask.net/artinchip-docs/d213-devkit/pressure_formula21-170675882497215.png)

两个公式的计算结果有一点误差，10%以内。 其中两个参数x-plate和y-plate需要用户根据屏幕实测的电阻值来配置DTS， 可以看到两个公式使用上的差别在于公式1只需要一个x-plate，公式2需要x-plate和y-plate。

## 2. 参数配置

### 2.1. 内核配置

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，按如下选择：

```
Linux
    Device Drivers
        Input device support
            [*] Touchscreens
                <*> Artinchip resistive touchscreen controller support
Linux
    Device Drivers
        Input device support
            <*> Event interface
```

注解

用户态需要获取Input事件，对此，内核需配置event接口，即Event interface需进行打开。

### 2.2. DTS参数配置

#### 2.2.1. RTP自定义参数

RTP驱动支持从DTS中配置的完整参数，如下表：

| 参数名称             | 类型    | 取值范围       | 功能说明                                |
| -------------------- | ------- | -------------- | --------------------------------------- |
| aic,max-pressure     | 正整数  | [1, 4095]      | 最大压感值，超过此值的坐标事件会被忽略  |
| aic,x-plate          | 正整数  | > 0            | 需要实测屏幕X方向的电阻，用于计算压感值 |
| aic,y-plate          | 正整数  | > 0            | 需要实测屏幕Y方向的电阻，用于计算压感值 |
| aic,two-points       | boolean | 有 - 1，无 - 0 | 是否打开两点采样                        |
| aic,manual-mode      | boolean | 有 - 1，无 - 0 | 是否采用手动模式                        |
| aic,sample-period-ms | 正整数  | [1, 1000]      | 周期采样模式下的周期值，单位：ms        |
| aic,fuzz             | 正整数  | [1, 32]        | 对坐标变化模糊处理的半径值              |

不同的参数组合，可以让RTP工作在不同的采样模式，对应关系如下：

| 模式           | 子模式                                        | 采样点                        | 需要用户配置的DTS参数 | 备注 |
| -------------- | --------------------------------------------- | ----------------------------- | --------------------- | ---- |
| 手动模式       | 无压感                                        | XN, YN                        | manual-mode           |      |
| 有压感         | XN, YN, ZA                                    | manual-mode, x-plate, y-plate |                       |      |
| XN, YN, ZA, ZB | manual-mode, x-plate                          |                               |                       |      |
| 自动模式       | Auto1非周期                                   | XN, YN                        | 无                    |      |
| Auto1周期      | sample-period-ms                              |                               |                       |      |
| Auto2非周期    | XN, YN, ZA, ZB                                | x-plate                       | 缺省模式              |      |
| Auto2周期      | x-plate, sample-period-ms                     |                               |                       |      |
| Auto3非周期    | XN, XP, YN, YPZA, ZB                          | x-plate, y-plate, two-points  |                       |      |
| Auto3周期      | x-plate, y-plate, two-points,sample-period-ms |                               |                       |      |
|                |                                               |                               |                       |      |
| Auto4非周期    | XN, XP, YN, YPZA, ZB, ZC, ZD                  | x-plate, two-points           |                       |      |
| Auto4周期      | x-plate,two-points,sample-period-ms           |                               |                       |      |

上表中“DTS参数”按照规范每个参数名称签名都有个“aic,”前缀，为了简洁表格中有省略。

注解

1. 对于Auto2模式，如果用户配置了y-plate，ZB数据将驱动被忽略，[压感计算](1_introduction.html#ref-rtp-pressure) 时采样公式2；
2. 基于实测数据，**Auto2非周期模式** 在性能上表现都比较平衡，所以DTS中会作为缺省配置。



#### 2.2.2. D211的配置

common/d211.dtsi中的参数配置：

```
rtp: rtp@19252000 {
    compatible = "artinchip,aic-rtp-v1.0";
    reg = <0x0 0x19252000 0x0 0x1000>;
    interrupts-extended = <&plic0 93 IRQ_TYPE_LEVEL_HIGH>;
            clocks = <&cmu CLK_RTP>, <&cmu CLK_APB1>;
    clock-names = "rtp", "pclk";
    resets = <&rst RESET_RTP>;
};
```

xxx/board.dts中的参数配置：

```
&rtp {
    aic,max-pressure = <800>;
    aic,x-plate = <235>;
    pinctrl-names = "default";
    pinctrl-0 = <&rtp_pins>;
    status = "okay";
};
```

小技巧

1. 这里的配置选用了Auto2的Single Piont模式，所以只用到RTP驱动的部分参数。
2. x-plate和y-plate两个参数是要根据触摸屏的电阻实测值来定。

### 2.3. 触摸屏的电阻实测方法

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/touchscreen_R_method1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/touchscreen_R_method1-170675889186719.png)

图 7.32 *D211芯片测量触摸屏电阻值方法*[¶](#id5)

小技巧

1. 原理图中触摸屏的四个引脚为PA11（YN）、PA10(XN)、PA09(YP)、PA08(XP)。
2. 测量过程中需根据电路原理图中rtp的引脚顺序，确定XN、XP、YN、YP在屏幕的位置。

### 2.4. 几款RTP屏幕的参数

这里记录测试过的几款屏幕参数，主要是X、Y方向的电阻值，对应DTS中的x-plate、y-plate：

| 屏型号 | 分辨率   | 板子类型 | x-plate | y-plate | 备注 |
| ------ | -------- | -------- | ------- | ------- | ---- |
| LCD屏  | 800x480  | per1     | 235     | 902     |      |
| LVDS屏 | 1024x600 | per1     | 702     | 236     |      |

## 3. 调试指南

### 3.1. 调试开关

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，可以打开RTP模块的DEBUG选项：

```
Linux
    Kernel hacking
        Artinchip Debug
            [*] RTP driver debug
```

此DEBUG选项打开的影响：

1. RTP驱动以-O0编译
2. RTP的pr_dbg()和dev_dbg()调试信息会被编译

在系统运行时，如果要打印pr_dbg()和dev_dbg()信息，还需要调整loglevel为8，两个方法：

1. 在board.dts中修改bootargs，增加“loglevel=8”
2. 在板子启动到Linux shell后，执行命令：

```
echo 8 > /proc/sys/kernel/printk
```

### 3.2. Sysfs节点

在RTP初始化成功后，会在sysfs中注册生成一个status节点，其中打印了当前的RTP配置及状态信息：

```
# cat /sys/devices/platform/soc/19252000.rtp/status
In RTP controller V1.00:
Mode 0/2, RTP enale 0, Press detect enable 0
Manual mode status 0
Pressure enable 1, max 800, x-plate 235, y-plate 0
Point num: 1, Sample period: 0, Fuzz: 0
```

## 4. 测试指南

### 4.1. 测试环境

#### 4.1.1. 硬件

- 带触屏功能的屏幕
- 带RTP接口的开发板
- USB Type-C数据线，用于给开发板供电、烧写
- USB 转串口的线，用于连接开发板的调试串口
- 手写笔，可以更方便精准的点击RTP

#### 4.1.2. 软件

- PC端的串口终端软件，用于PC和开发板进行串口通信
- AiBurn烧写工具
- tslib开源库，用于管理input设备和事件、以及坐标校准，luban中已集成
- ts_draw测试工具，用于测试触屏的坐标事件、跳点统计等，luban中已集成

#### 4.1.3. 软件配置

##### 4.1.3.1. tslib

在luban的根目录下通过make menuconfig可以打开tslib：

```
Third-party packages
    [*] tslib
```

##### 4.1.3.2. ts_draw

在luban的根目录下通过make menuconfig可以打开，最终在板子上会看到工具ts_draw：

```
Artinchip packages
    Sample code
        [*] test-touchscreen
```

注解

ts_draw会调用tslib接口，所以依赖tslib的运行环境，所以运行前必须先配置好tslib。

### 4.2. 配置tslib运行环境

在板子的shell中执行以下命令配置几个环境变量：

```
export TSLIB_FBDEVICE=/dev/fb0
export POINTERCAL_CALIBFILE=/usr/etc/ts-calib.conf
export TSLIB_CONSOLEDEVICE=none
export TSLIB_TSDEVICE=/dev/input/event0
export TSLIB_PLUGINDIR=/usr/lib/ts
export TSLIB_CALIBFILE=/tmp/pointercal
```

### 4.3. 坐标校准

配置好tslib运行环境后，在板子的shell中执行ts_calibrate工具，在触屏界面会出现一个校准界面，按照提示，点击5个小十字的中心，完成校准。

```
# ts_calibrate
xres = 1024, yres = 600
```

### 4.4. 读取坐标值

在板子的shell中执行ts_draw测试工具，点击触屏ts_draw会打印出每次坐标事件。

```
# ts_draw -d
FB res: X 1024, Y 600，Size 2457600, Border 0, Jump thd 4
1646290364.886053: X -  734 Y -  280 P -   34
1646290364.906078: X -  734 Y -  280 P -   49
1646290364.926056: X -  734 Y -  280 P -   65
1646290364.946044: X -  734 Y -  280 P -   76
1646290364.966063: X -  734 Y -  279 P -   98
1646290364.986043: X -  735 Y -  279 P -  117
```

小技巧

上述坐标是通过ts_calibrate校准后的坐标，如果要查看原始坐标可增加参数-r。

### 4.5. 跳点分析

> ts_draw具备一个功能，就是统计跳点的个数，判断方法是看到连续出现的两个坐标间距太大就认为是跳点。“间距”门限默认是4，可以通过参数设置该值。

```
# ts_draw -h
Usage: ts_draw [Options], built on Apr 27 2022 14:42:38
    -r, --raw       Use the raw coordinate, default: disable
    -d, --debug     Open more debug information, default: disable
    -b, --border    The width of border(will ignore), default 0
    -j, --jumb-thd  The threshold to determinate jumb sample, default 4
    -h, --help

# ts_draw  -j 3
FB res: X 800, Y 480，Size 1536000, Boarder 0, Jump thd 3
Stats: Sum 44, Out 0(0.00%), Jump 1(2.27%), Period 5.06 ms

Stats: Sum 265, Out 0(0.00%), Jump 1(0.38%), Period 5.06 ms
```

## 5. 设计说明

### 5.1. 源码说明

源代码位于：linux-5.x/drivers/input/touchscreen/artinchip.c

### 5.2. 模块架构

RTP驱动基于Linux内核中的input子系统实现，其关系如下图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/input_system.png](https://photos.100ask.net/artinchip-docs/d213-devkit/input_system-170675903096121.png)

图 7.33 *Linux Input子系统架构图*

### 5.3. 关键流程设计

#### 5.3.1. 初始化流程

RTP模块完全遵循platform_driver的通用初始化流程，申请regs资源、clk、reset， 还需要注册一个input设备，使用input子系统提供的注册接口input_register_device()：

```
int __must_check input_register_device(struct input_dev *);
```

参数struct input_dev记录了该input设备的信息，其中关键信息有：设备名称、 open/close接口、KEY类型、坐标范围等。RTP控制器的input信息注册如下：

```
rtp->idev = idev;
idev->name = pdev->name;
idev->phys = AIC_RTP_NAME "/input0";
idev->open = aic_rtp_open;
idev->close = aic_rtp_close;
idev->id.bustype = BUS_HOST;
idev->evbit[0] =  BIT(EV_SYN) | BIT(EV_KEY) | BIT(EV_ABS);
input_set_capability(idev, EV_KEY, BTN_TOUCH);
input_set_abs_params(idev, ABS_X, 0, AIC_RTP_MAX_VAL, rtp->fuzz, 0);
input_set_abs_params(idev, ABS_Y, 0, AIC_RTP_MAX_VAL, rtp->fuzz, 0);
if (rtp->pressure_det)
        input_set_abs_params(idev, ABS_PRESSURE, 0, AIC_RTP_MAX_VAL,
                             rtp->fuzz, 0);
```

#### 5.3.2. 中断处理流程

RTP控制器采集的数据完全依赖中断来上报给用户态，包括触摸位置、按下、抬起信息。 流程如下图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/irq_flow2.png](https://photos.100ask.net/artinchip-docs/d213-devkit/irq_flow2-170675905159123.png)

“启动manual worker”和“启动smp worker”分别是对应手动模式、非周期模式的采样流程，因为这两种情况下都会有一些延迟操作，所以使用worker方式来处理。实际运行期间RTP只可能工作在一种单一模式，所以运行中只会有一个worker在参与调度。

其中，检查的异常事件类型及处理方式如下图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/abnormal_event_type.png](https://photos.100ask.net/artinchip-docs/d213-devkit/abnormal_event_type-170675906975629.png)

其中，“数据不完整”仅在自动模式才会出现，实际上有三种原因导致不完整：

1. 采样循环不完整：Sample Cycle Incomplete，一组采样点还没有完成就发生了抬起事件；
2. 数据超限：Data Over Uncertain Range，数据超出了有效范围；
3. FIFO下溢：FIFO上溢意味着数据有效、软件读慢了，所以还可以继续数据；如果是下溢，意味着FIFO中的数据分组排列已经乱了，所以直接丢弃。

#### 5.3.3. 手动模式的采样流程

手动模式，需要通过软件触发的方式告诉RTP控制器要采集什么样的数据，所以采集样本的电信号配置、采集间隔、是否打开按压检测等，都需要在驱动中来妥善安排。 因为每次中断来了后，手动模式需要做的处理较多，而且有一些延迟处理，所以在驱动中使用了一个worker专门处理手动模式的流程（接口aic_rtp_manual_worker()）。 手动模式的处理流程较复杂，建议通常情况下采样自动模式。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/manual_mode.png](https://photos.100ask.net/artinchip-docs/d213-devkit/manual_mode-170675907832631.png)

图 7.34 *手动模式的状态切换流程*

上图中，在蓝色方框的后面都会有一个判断：如果当前是否抬起状态，如果是就打开按压检测。为了流程的主干更加清晰，所以图中未标注出来。

### 5.4. 数据结构设计

#### 5.4.1. aic_rtp_dev

管理RTP控制器的设备资源。

```
struct aic_rtp_dev {
    struct platform_device *pdev;
    struct attribute_group attrs;
    struct clk *clk;
    struct reset_control *rst;

    struct device *dev;
    struct input_dev *idev;
    void __iomem *regs;
    u32 irq;
    u32 pclk_rate;

    bool two_points;
    bool pressure_det;
    bool ignore_fifo_data;
    enum aic_rtp_mode mode;
    u32 max_press;
    u32 smp_period;
    u32 x_plate;
    u32 y_plate;
    u32 fuzz;

    struct workqueue_struct *workq;
    struct work_struct event_work;
    u32 intr;
    u32 fcr;
    struct aic_rtp_dat latest;
    enum aic_rtp_manual_mode_status mms;
};
```

### 5.5. 接口设计

以下接口是Input子系统需要的标准接口。

#### 5.5.1. aic_rtp_open

| 函数原型 | static int aic_rtp_open(struct input_dev *dev) |
| -------- | ---------------------------------------------- |
| 功能说明 | 打开RTP设备，驱动会使能RTP控制器               |
| 参数定义 | dev - 指向当前的input设备                      |
| 返回值   | 0，成功； < 0，失败                            |
| 注意事项 |                                                |

#### 5.5.2. aic_rtp_close

| 函数原型 | static void aic_rtp_close(struct input_dev *dev) |
| -------- | ------------------------------------------------ |
| 功能说明 | 关闭RTP设备，驱动会关闭RTP控制器                 |
| 参数定义 | dev - 指向当前的input设备                        |
| 返回值   | 无                                               |
| 注意事项 |                                                  |

## 6. 常见问题

### 6.1. 跳点现象严重

#### 6.1.1. 现象

在屏幕上点击后，会有明显的坐标跳跃，或者坐标不跟手的情况。

#### 6.1.2. 原因分析

逐个排除以下原因：

1. 屏幕的x-plate、y-plate参数是因屏而异的，需要确认这两个参数是否准确；
2. 是否通过ts_calibrate程序对坐标进行了校准，校准尽量点在校准十字交点；
3. 是否设置了压感过滤参数 `aic,max-pressure` ，尝试调低这个参数，确认跳点效果是否有改善；
4. 推荐选用 Auto2非周期模式，标准参数配置见 [D211的配置](2_config_guide.html#ref-rtp-config)

### 6.2. 坐标点的事件会连续丢失

#### 6.2.1. 现象

这个问题是画线这样的APP中可以清晰看到，连续丢失的结果是有一长条线段没有画出来，意味着这段路径上的坐标事件没有上报上来。

#### 6.2.2. 原因分析

排除以下原因：

1. 首先，查看DTS中的参数配置是否 **周期模式**，周期值 `aic,sample-period-ms` 是否太小,一般建议10~50ms。
2. 需要排查RTP控制器是否进入“死锁”情况，就是硬件无法触发中断，这种非常罕见。需要查看寄存器的值，重点关注按压状态、中断状态。

### 6.3. 屏幕可使用范围不完整

#### 6.3.1. 现象

屏幕边框呈不规则较大规模的空缺，如下图红色边框区域，并且无法在屏幕空缺区域内画线

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/incomplete_screen_edge1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/incomplete_screen_edge1-170675913925033.png)

#### 6.3.2. 原因分析

排除以下原因：

1. 需排查RTP模块是否每个信号串联一个磁珠，并联一个10nF电容。
2. 需要排查触摸屏是否损坏，需更换触摸屏。