---
sidebar_position: 13
---

# DVP开发指南
##  模块介绍

### 1.1. 术语定义

| 术语   | 定义                        | 注释说明                                                 |
| ------ | --------------------------- | -------------------------------------------------------- |
| CMA    | Contiguous Memory Allocator | 连续内存分配器                                           |
| DVP    | Digital Video Port          | 用于接收视频数据数据，转换格式后存放到内存中             |
| V4L2   | Video For Linux Two         | Linux中的视频框架第二版                                  |
| VBI    | Vertical Blanking Interval  | 垂直消隐期                                               |
| ISP    | Image Signal Processing     | 图像信号处理，一般指对前端图像传感器输出信号的处理       |
| MBUS   | Media Bus                   | V4L2框架中用到的一种媒体类型，用于两个V4L2设备之间的协商 |
| Sensor | 即Camera                    | 本文中指摄像头                                           |

### 1.2. 模块简介

DVP模块负责从Sensor中获取到数据，然后经过格式转换、或者缩放，输出到DRAM。支持特性：

- 最大支持 1080P@30帧 录像
- 支持 5M 拍照
- 支持 YUV422 和 BT.656 两种方式，BT.656支持隔行模式，最大支持8位输入
- 支持针对图像帧中的行和列分别做裁剪

DVP的硬件框图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/hw_structure5.png](https://photos.100ask.net/artinchip-docs/d213-devkit/hw_structure5-17066896093681.png)

图 6.23 *DVP硬件架构示意图*

从整个系统看，有两种应用场景：

1. 从Sensor采集数据到内存中，然后让DE将其显示到屏幕上；
2. 从Sensor采集数据到内存中，使用CPU或者VE进行编码，最后再将编码后的数据保存到内存中。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/hw_data_flow1.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/hw_data_flow1-17066896177463.jpg)

图 6.24 *DVP应用的数据流示意图*

DVP驱动设计需要基于Linux中的成熟框架V4L2，详细介绍见 [设计说明](5_design_guide.html)

## 2. 参数配置

### 2.1. 内核配置

DVP驱动依赖dma-buf、CMA、V4L2模块，所以需要提前打开。

#### 2.1.1. 打开 CMA

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，按如下选择：

```
Linux
    Memory Management options
         [*] Contiguous Memory Allocator
```

还需要设置CMA区域的大小，在内核配置的另外一个地方，如下配置为 16MB：

```
Linux
    Library routines
        [*] DMA Contiguous Memory Allocator
        (16)  Size in Mega Bytes
```

#### 2.1.2. 打开 dma-buf

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，按如下选择：

```
Linux
    Device Drivers
        DMABUF options
            [*] Explicit Synchronization Framework
            [*]   Sync File Validation Framework
            [*] userspace dmabuf misc driver
            [*] DMA-BUF Userland Memory Heaps
                [*]   DMA-BUF CMA Heap
```

#### 2.1.3. 打开 V4L2

在 kernel 的 menuconfig 中，按如下选择：

```
Linux
    Device Drivers
         Multimedia support
            Media core support
                <*> Video4Linux core
```

打开 V4L2 的相关选项：

```
Linux
    Device Drivers
         Multimedia support
            Video4Linux options
                [*] V4L2 sub-device userspace API
                [*] Enable advanced debug functionality on V4L2 drivers
```

#### 2.1.4. 打开 DVP

在 kernel 的 menuconfig 中，按如下选择：

```
Linux
    Device Drivers
         Multimedia support
            Media drivers
                [*] V4L platform devices
                    <*>   Artinchip Digital Video Port Support
```



### 2.2. DTS 参数配置

#### 2.2.1. D211 配置

DTS分别存放在两个目录：common/和board/，board中存放sensor配置、以及和DVP关联的配置。

common/d211.dtsi中的参数配置：

```
dvp0: dvp@18830000 {
    #address-cells = <1>;
    #size-cells = <0>;
    compatible = "artinchip,aic-dvp-v1.0";
    reg = <0x0 0x18830000 0x0 0x1000>;
    interrupts-extended = <&plic0 57 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cmu CLK_DVP>;
    clock-rate = <200000000>;
    resets = <&rst RESET_DVP>;
};
```

xxx/board.dts中的配置参数：

```
&dvp0 {
    status = "okay";
    pinctrl-names = "default";
    pinctrl-0 = <&dvp_pins>;        /* dvp 接口引脚 */

    port@0 {
        reg = <0>;
        dvp0_in: endpoint {
            remote-endpoint = <&ov5640_out>;
/*          bus-type = <6>; /* V4L2_FWNODE_BUS_TYPE_BT656 */
            bus-width = <8>;
            hsync-active = <1>;
            vsync-active = <1>;
            field-even-active = <1>;
            pclk-sample = <1>;
        };
    };
};
```

小技巧

DVP驱动支持标准的 V4L2参数，如上面的 bus-type、bus-type、hsync-active 等，更完整的参数定义可以见Linux中的代码 drivers/media/v4l2-core/v4l2-fwnode.c，v4l2_fwnode_endpoint_parse_parallel_bus()。

## 3. 调试指南



### 3.1. 调试开关

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，可以打开DVP模块的DEBUG选项：

```
Linux
    Kernel hacking
        Artinchip Debug
            [*] DVP driver debug
```

此DEBUG选项打开的影响：

1. DVP驱动以-O0编译
2. DVP的pr_dbg()和dev_dbg()调试信息会被编译

在系统运行时，如果要打印pr_dbg()和dev_dbg()信息，还需要调整loglevel为8，两个方法：

1. 在board.dts中修改bootargs，增加“loglevel=8”
2. 在板子启动到Linux shell后，执行命令：

```
echo 8 > /proc/sys/kernel/printk
```

### 3.2. Sysfs 节点

#### 3.2.1. 查看V4L2设备

在 Sysfs 中查看video设备的信息：

```
# ls /dev/video0 -l
crw-------    1 root     root       81,   0 Jan  1  1970 /dev/video0
# ls /sys/class/video4linux/v4l-subdev0/
dev        dev_debug  device     index      name       subsystem  uevent
#
# cat /sys/class/video4linux/v4l-subdev0/name
ov5640 3-003c
#
# cat /sys/class/video4linux/v4l-subdev1/name
aic-dvp-sd
# ls -l /sys/class/video4linux/
lrwxrwxrwx    1 root     root             0 Jan  1 00:12 v4l-subdev0 -> ../../devices/platform/soc/99223000.i2c/i2c-3/3-003c/video4linux/v4l-subdev0
lrwxrwxrwx    1 root     root             0 Jan  1 00:12 v4l-subdev1 -> ../../devices/platform/soc/98830000.dvp/video4linux/v4l-subdev1
lrwxrwxrwx    1 root     root             0 Jan  1 00:12 video0 -> ../../devices/platform/soc/98830000.dvp/video4linux/video0
```

#### 3.2.2. 打开V4L2的debug开关

在V4L2子系统中，用dprintk(level)接口来控制调试信息，大于代码中的dprintk(level)调用时的level就可以打印出信息。dprintk()一般用到两个debug level：

| 1    | 显示ioctl名称     |
| ---- | ----------------- |
| 2    | 显示API的传入参数 |

向对应的Sysfs节点写入一个整数值，可以修改该debug level：

```
echo 0x3 > /sys/module/videobuf2_v4l2/parameters/debug
echo 0x3 > /sys/module/videobuf2_common/parameters/debug
echo 0x3 > /sys/devices/platform/soc/18830000.dvp/video4linux/v4l-subdev1/dev_debug
echo 0x3 > /sys/devices/platform/soc/18830000.dvp/video4linux/video0/dev_debug
```



#### 3.2.3. 查看 DVP 的 Buf 队列情况

DVP驱动中实现了一个sysfs节点buflist，查看当前三个Qbuf、DQbuf、DVP驱动中的buf list状态：

```
# cat /sys/devices/platform/soc/18830000.dvp/buflist
In dvp->buf_list, the current buf in list:
[0]: empty
[1]: empty
[2]: empty

In V4L2 Q-buf list:
[0]: empty
[1]: empty
[2]: empty

In V4L2 DQ-buf list:
[0], state: Done
[1], state: Done
[2], state: Done
```

### 3.3. V4L2 相关的其他工具

- V4l2-ctl，v4l2的瑞士军刀
- V4l2兼容性测试
- V4l2-dbg，
- qv4l2，QT测试程序

小技巧

TODO：以上工具的使用方法待验证和整理

## 4. 测试指南

### 4.1. 测试环境

#### 4.1.1. 硬件

- 开发板，或者D211的FPGA板
- 可转接摄像头的子板
- 摄像头，如OV5640

#### 4.1.2. 软件

- PC端的串口终端软件，用于PC和开发板进行串口通信
- DVP模块的测试demo：test_dvp

#### 4.1.3. 软件配置



##### 4.1.3.1. 配置 OV5640 摄像头

测试中需要用到摄像头，以OV5640为例，在luban的根目录下通过make kernel-menuconfig，按如下选择：

```
Linux
    Device Drivers
         Multimedia support
            Media ancillary drivers
                Camera sensor devices
                    <*> OmniVision OV5640 sensor support
```

在board.dts中，也需要增加OV5640的配置，假设OV5640是接在I2C3通道：

```
&i2c3 {
    pinctrl-names = "default";
    pinctrl-0 = <&i2c3_pins_a>,  <&clk_out1_pins>;          /* i2c3 引脚及 clock 引脚 */
    status = "okay";

    ov5640: camera@3C {
        compatible = "ovti,ov5640";
        reg = <0x3C>;
        clocks = <&cmu CLK_APB1>;
        clock-names = "xclk";
        reset-gpios = <&gpio_p 5 GPIO_ACTIVE_LOW>;
        powerdown-gpios = <&gpio_p 6 GPIO_ACTIVE_HIGH>;

        port {
            ov5640_out: endpoint {
                remote-endpoint = <&dvp0_in>;
                /* V4L2_FWNODE_BUS_TYPE_BT656
                bus-type = <6>; */
                bus-width = <8>;
                data-shift = <2>;
                hsync-active = <0>;
                vsync-active = <1>;
                pclk-sample = <1>;
            };
        };
    };
};
```

注解

1. 如果要使用BT656模式，请打开bus-type参数；
2. 如果是YUV422，不需要配置bus-type，代码中默认采用YUV422（即V4L2_FWNODE_BUS_TYPE_PARALLEL，定义在drivers/media/v4l2-core/v4l2-fwnode.c）。

##### 4.1.3.2. test_dvp 配置

在luban根目录，运行make menuconfig，按如下选择：

```
Artinchip packages
    Sample code
        [*] test-dvp
```

### 4.2. test_dvp 测试

test_dvp的主要功能是将摄像头的数据采集后，传给DE模块的Video图层去显示。其设计详见 [APP Demo](5_design_guide.html#ref-dvp-demo)

在打开test_dvp的编译后，板子上的test_dvp位于 `/usr/local/bin/`，无需进入该目录，直接运行test_dvp即可：

```
[aic@] # test_dvp -u
Usage: test_dvp [options]:
     -f, --format       format of input video, NV12/NV16 etc
     -c, --count        the number of capture frame
     -w, --width        the width of sensor
     -h, --height       the height of sensor
     -r, --framerate    the framerate of sensor
     -u, --usage
     -v, --verbose

Example: test_dvp -f nv16 -c 1

# 使用示例：
# 设置摄像头的分辨率为 720*576，帧率为15帧/s，
# 使用 NV12 格式（默认）输出到 Video Layer 显示，共采集并显示100帧数据
[aic@] # test_dvp -w 720 -h 576 -r 15 -c 100
```

## 5. 设计说明

### 5.1. 源码说明

本模块源代码在内核目录linux-5.4/drivers/media/platform/artinchip下，目录结构如下：

```
drivers/media/platform/artinchip/
├── aic_buf.c  // 和buf管理相关的处理代码
├── aic_dvp.c  // DVP驱动的初始化入口，主要实现了probe、Notifier接口
├── aic_dvp.h  // DVP驱动共用的头文件，其中定义了寄存器、共用数据结构、全局函数等
├── aic_dvp_hw.c  // 对寄存器的访问封装
├── aic_video.c // 和V4L2框架强相关的一些接口定义，如file_ops、ioctl_ops的接口实现等
├── Kconfig
└── Makefile
```

### 5.2. 模块架构

#### 5.2.1. V4L2 软件框架

Linux中的V4L2框架是一个专门为视频输入输出设备而设计的成熟方案，DVP驱动需要基于V4L2。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/v4l2_system.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/v4l2_system-17066903681595.jpg)

图 6.25 *Linux V4L2子系统架构图*

1. V4L2，Video For Linux 第2版，最早出现在1998年，一个针对无线广播（收音机）、视频捕获、视频输出设备的通用框架，源码目录drivers/media/v4l2-core。V4L2中支持的5大类接口设备：

> - Video capture interface：影像捕获接口；
> - Video output interface：视频输出接口，主要用于电视信号类；
> - Video overlay interface：视频覆盖接口，方便视频显示设备直接从捕获设备上获取数据；
> - VBI interface：垂直消隐接口，可提供垂直消隐区的数据接入，包括raw和sliced两种；
> - Radio interface：广播接口，主要是从AM或FM调谐器中获取音频数据。

1. V4L2为用户空间提供了字符设备的通用接口，设备节点/dev/videoX，主设备号81，次设备号的分配跟设备类型有关，规则定义如下：

   > | 设备类型     | 次设备号 |
   > | ------------ | -------- |
   > | 视频设备     | 0~63     |
   > | Radio设备    | 64~127   |
   > | Teletext设备 | 192~233  |
   > | VBI设备      | 224~255  |

> 用户态APP通过ioctl控制video设备，通过mmap进行内存映射。在/dev目录中会产生videoX、radioX和vbiX设备节点。

1. 在V4L2框架中，将每一个Sensor、DVP硬件设备都看作一个subdev，相应的有一个字符设备节点/dev/v4l-subdevX，用户态通过这些节点的ioctl接口可以完成subdev的格式协商、时序配置等功能。
2. Notifier子模块是为了解决多个设备之间的初始化顺序、以及媒体流对接的匹配检查，如DVP需要等Sensor初始化完成后，才能去真正完成video device的注册。可见，DVP和Sensor要有一个绑定的关系，这个关系是由DTS中的remote-endpoint来指定的。Notifier会调用Fwnode系列接口来解析和获取remote-endpoint的属性字段。
3. 为了进行数据流的管理，V4l2维护了一个Media device链表，每一个video device、v4l2 device、v4l2-subdev都是一个Media device实例，这些Media device在数据结构的设计上第一个成员变量都是一个struct media_entity，其中有list_head成员，借此互相链接起来。见下一节详述。

#### 5.2.2. V4L2 的实例管理

一个完整的V4L2驱动涉及4种设备实例：V4l2 device、Video device、V4l2 subdev、Media device，这4个实例都需要在DVP驱动中去定义。它们的引用关系如下图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/v4l2_instance.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/v4l2_instance-17066903914407.jpg)

图 6.26 *Linux V4L2的实例关系示意图*

- - V4l2 device

    可以理解为最高统帅，它纵览全局，用成员指针指向以下其他实例，只服务于内核态，不包含面向用户态的接口。 **整个内核中只有一个v4l2 device实例。**

- - V4l2 subdev

    V4L2将每一个硬件模块都看作一个subdev，如DVP、Sensor都各自注册一个subdev，并且每个subdev会向用户态透出一个/dev/v4l-subdevX设备节点（该设备节点的编号X取决于注册顺序）。这些subdev会形成一个链表，都挂在v4l2 device下面的subdevs链表中。在subdev的ops数据接口v4l2_subdev_ops将回调按设备类型进行划分（这里区分设备类型）

```
struct v4l2_subdev_ops {
    const struct v4l2_subdev_core_ops   *core;
    const struct v4l2_subdev_tuner_ops  *tuner;
    const struct v4l2_subdev_audio_ops  *audio;
    const struct v4l2_subdev_video_ops  *video;
    const struct v4l2_subdev_vbi_ops    *vbi;
    const struct v4l2_subdev_ir_ops     *ir;
    const struct v4l2_subdev_sensor_ops *sensor;
    const struct v4l2_subdev_pad_ops    *pad;
};
```

对于DVP控制器来说，它对应的ops只提供pad_ops即可；对于Sensor设备来说，要提供pad_ops和video_ops。

- - Video device

    是给用户态提供/dev/videoX接口的设备实例，这里不区分设备类型，统一使用V4L2标准的80+个ioctl命令接口。video device更像是逻辑功能，如果未来我们的DVP增加了ISP功能，就需要注册两个video device，但是DVP对应的subdev只需要一个。

- - Media device

    主要作用是为了将有上下游关系的entity串联起来（通过连接各entity的pad或interface属性），形成一个媒体流（V4L2启动/停止命令称作start/stop stream）。并且会透出一个/dev/mediaX设备节点，目前用户态还没有用到，所以在上图中未体现。

- - Media entity

    以上实例除了最高统帅V4l2 device其他都可以看作一个media entity，都挂在Media device维护的一个media entity链表。

实际上，在上图中的每个subdev，注册的时候也是生成一个Video device，由Video device向用户态透一个/dev/v4l-subdevX设备过去，这样做的好处是由Video device统一处理对接用户态的接口。所以完整的实例关系图应该再加一层Video device，如下图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/v4l2_instance_full.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/v4l2_instance_full-17066904017719.jpg)

图 6.27 *Linux V4L2的完整实例关系示意图*

#### 5.2.3. V4L2 的 Media 管理

V4L2提供了一个Media Framework来管理Media数据组成pipeline，在运行过程中可以调整pipeline中各个节点的配置，达到“运行时设备控制”的效果。

需要用到5个关键数据结构：media_device、media_entity、media_link、media_pad、media interface。

- Media device是框架管理者，下面维护4个链表：entity、pad、link、interface。
- 将每个硬件设备、或者一个软件模块抽象成一个entity，如DVP控制器、Sensor、DMA通道、连接器
- Entity之间通过link来连接，link的两端是pad。数据流是从一个source pad（源）到一个sink pad（目的/接收端）。Pad：硬件设备上的端口抽象，类似于芯片上面的管脚pad概念。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/v4l2_pad.png](https://photos.100ask.net/artinchip-docs/d213-devkit/v4l2_pad-170669041625911.png)

图 6.28 *Linux V4L2的pad和link关系示意图*

- 另外还有一个media_interface结构，表示提供给用户态什么接口，目前只有一种类型：device node
- link有两种：pad to pad、Interface to entity（暂未用到）。从media_link的定义看它们的连接关系：

```
struct media_link {
    struct media_gobj graph_obj; // 是对entity、pad、link、Interface的抽象，它们的公共头数据
    struct list_head list;
    union {
        struct media_gobj *gobj0; // 是pad和Interface头部的公共数据
        struct media_pad *source; // 源pad
        struct media_interface *intf; // 需要连接到entity的interface
    };
    union {
        struct media_gobj *gobj1; // 同上，是pad和entity头部的公共数据
        struct media_pad *sink; // 目的pad
        struct media_entity *entity; // 需要连接到Interface的entity
    };
    struct media_link *reverse; // 指向对称（两端pad相同方向相反）的那个media_link
    unsigned long flags;
    bool is_backlink; // 是否逆方向（相对于数据流方向）
};
```

- 从数据结构定义来看一个entity，可以有多个pad（注意其中的pads成员是个指针，指向的实例需要DVP驱动先定义好），当然随之而来会有多个link，定义如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/v4l2_media_entity.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/v4l2_media_entity-170669042542213.jpg)

图 6.29 *Linux V4L2的Media entity和pad的引用关系*

结合我们的DVP硬件结构，media entity、pad和link的关系如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/dvp_media_entity.png](https://photos.100ask.net/artinchip-docs/d213-devkit/dvp_media_entity-170669043699817.png)

图 6.30 *DVP驱动中的Media entity设计*

从上图中可以看到，如果要设置DVP的 **输入** 格式，就通过DVP subdev；如果要设置DVP的 **输出** 格式，则通过Video device。

#### 5.2.4. V4L2 的 ioctl 调用关系

在“实例管理”中已经知道，用户态看到的/dev/videoX和 /dev/v4l-subdevX两个设备节点，进入内核态后都是直接先跟Video device设备实例对接，那么当用户调用ioctl命令时，是如何传给下面V4L2 subdev呢？依靠注册时传入的参数struct v4l2_file_operations *fops。

- V4L2 subdev在为自己注册Video device时（见v4l2-device.c中的v4l2_device_register_subdev_nodes()）传入的fops是预定义好的v4l2_subdev_fops（定义见v4l2-subdev.c），其中的ioctl接口指向框架中提供的接口subdev_ioctl()。而subdev_ioctl会逐层调用到“实例管理”中提到的 v4l2_subdev_ops。
- 而DVP驱动在为自己注册Video device时，传入的fops是自己定义的aic_dvp_fops，其中ioctl接口指向框架中的公共接口video_ioctl2()。
- 为解决不同硬件设备有不同的ioctl处理需求，DVP驱动还需要另外提供一个专门为ioctl定义的扩展ops：aic_dvp_ioctl_ops（数据结构定义见struct v4l2_ioctl_ops）。

针对一个从用户态传来的ioctl()命令，其内部调用关系如下图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/v4l2_ioctl.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/v4l2_ioctl-170669045034119.jpg)

图 6.31 *Linux V4L2的ioctl处理关系图*

#### 5.2.5. V4L2 的 Buf 队列管理

V4L2的Buffer管理由videobuf子模块实现，从源头看分为两种方式的Buffer：

1. - 驱动申请Buffer

     用户态通过VIDIOC_REQBUFS ioctl命令触发Buffer申请，然后使用mmap接口来获取用户态的Buffer地址。这种方式，Buffer个数一般有个最大值32 VIDEO_MAX_FRAME。

2. - 用户态申请Buffer

     用户态根据实际需要知道要申请多少Buffer，然后借助其他机制（可以是dma-buf）在用户态完成Buffer（当然必须是物理连续的）申请，并将物理地址告诉Video驱动。

按照Buffer的物理连续，又可以分为三种情况：（详见Documentationmediakapiv4l2-videobuf.rst）

1. - 物理连续、不连续的Buffer混用

     几乎所有用户空间的Buffer都属于这种情况，这样最大可能的发挥虚拟内存管理的灵活性。缺点也很明显，这些Buffer给硬件的话需要有支持scatter的DMA。

2. - 物理不连续、虚拟地址连续的Buffer

     它们由vmalloc()分配，也用于支持scatter接口的DMA硬件。

3. - 物理连续的Buffer

     非常适合DMA类硬件的访问。

驱动开发者必须三选一，对于我们的DVP模块来说，要选择3。并且底层用到dma-buf。

注解

V4L第二版不再支持Overlay类型，而V4L第一版不支持DMABUF类型。

V4L2在数据流传输的时候需要多个Buf切换，通过struct vb2_queue结构中的Qbuf两个Buf队列来管理，DVP驱动中还需要维护一个buf_list来配合DVP控制器的地址更新。整个Buf流转的过程如下图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/dvp_buf_list.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/dvp_buf_list-170669046258621.jpg)

图 6.32 *DVP 驱动中的 Buf 队列管理*

- Qbuf队列（在代码中见struct vb2_queue->queued_list）：是一些空闲Buf，等待Sensor的数据到来后，DVP驱动会从这个队列中找可用Buf来保存下一帧数据。
- DQbuf队列（在代码中见struct vb2_queue->done_list）：是一些填了视频数据的Buf，等待用户来处理这些数据，一般用户处理完后需要将Buf还给驱动，也就是还给Qbuf。
- 从Qbuf和DQbuf来的buf格式是struct vb2_buffer，其中没有字段可以保存物理地址（DVP控制器需要），同时还需要为每个buf记录一个是否正在被DVP使用的状态，所以DVP驱动中定义了基于vb2_buffer结构的封装vb2_v4l2_buffer，并且维护一个和Qbuf几乎同步的队列。
- 从图中的流转过程看，运行期间，在某一时刻，DVP需要使用一个Buf，APP需要使用一个Buf，QBuf需要有一个Buf在等待（否则DVP的done中断来了后发现没有等待的Qbuf会发生丢帧），一共至少要有3个Buf。
- 以YUV422格式计算，有两个plane，在V4L2框架中这一组plane算一个Buf，3个Buf就需要申请6个plane，`总大小 = 长 * 宽 * 2 * 3`。
- DVP驱动中需要定义一个struct vb2_queue实例，Video device中会有一个指针*queue指向该实例。

#### 5.2.6. DVP 驱动的子模块结构

基于以上对V4L2框架的分析，DVP驱动内部可以分为以下5个子模块：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/dvp_drv_structure.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/dvp_drv_structure-170669047119323.jpg)

图 6.33 *DVP 驱动的子模块结构*[¶](#id20)

- Video Dvice管理，主要实现和Video device相关的注册、ioctl处理；
- Notifier管理，主要处理和Sensor设备的初始化次序的依赖关系；
- Buf管理，主要实现Buf的入队、出队，以及在中断响应时切换DVP控制器的输出地址等；
- Subdev管理，主要实现输入格式相关的接口；
- 寄存器访问，封装了对DVP控制器寄存器的读写访问。

### 5.3. 关键流程设计

#### 5.3.1. 初始化流程

总体上看，DVP驱动的初始化过程分为两大段：

1. 阶段一：由probe()接口完成，完成资源申请、注册subdev、注册buf、注册notifier等；
2. 阶段二：由notifier的complete()接口完成，是需要等Sensor执行完初始化（其probe()接口）后才能执行，完成的操作有：注册video device、注册media device、配置link等。

##### 5.3.1.1. probe 过程

注册DVP控制器的注册过程：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/dvp_probe_flow.png](https://photos.100ask.net/artinchip-docs/d213-devkit/dvp_probe_flow-170669047937225.png)

图 6.34 *DVP 驱动的注册过程*

- 初始化media device，
- 注册subdev，提供subdev_ops（其中定义了pad_ops）；
- 注册pad，包括为subdev注册两个pad：source + sink；为video device注册一个sink pad。
- 注册buf，初始化vb2_queue，需要提供vb2_ops（驱动相关）和vb2_mem_ops（内存分配的回调）
- 注册v4l2 device，主要是将DVP的dev关联到v4l2_device->dev
- 注册notifier，为了解决sensor和DVP控制器之间的初始化顺序依赖问题，需要dts中定义好endpoint，并提供notifier_ops。

初始化notifier的时候，会去调用v4l2_fwnode_endpoint_parse ()解析DTS中关于endpoint中的配置，包括bus-type（BT656等）、极性等，将这些信息保存在vep->bus中（在aic_dvp->bus需要有备份）。

##### 5.3.1.2. notifier 初始化过程

在Sensor的probe()过程中也会调用Notifier注册，因为DTS中两个设备用remote-endpoint已经有关联，DVP驱动注册过的notifier_ops->bound()接口首先会被触发，对方（Sensor）会传过来一个pad编号，DVP将其记录下来方便后续使用（调用Sensor的subdev接口完成stream启动、停止操作）。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/v4l2_notify_call.png](https://photos.100ask.net/artinchip-docs/d213-devkit/v4l2_notify_call-170669048777427.png)

图 6.35 *V4L2 中notify的调用过程*

随后，DVP的notifier_ops->complete()接口也会被触发调用，DVP驱动中完成后续的初始化，包括：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/v4l2_notify_complete.png](https://photos.100ask.net/artinchip-docs/d213-devkit/v4l2_notify_complete-170669049555329.png)

图 6.36 *V4L2 中notify的complete处理流程*

- 关联v4l2_device 和subdev
- 注册video device，
- 注册media device
- 创建pad之间的link，会用到media_link结构

注解

media device出现了两次，是为了在所有media graph完全初始化之前就可以提供media device给用户态空间。所以一开始先用一部分entity初始化media device。

其中：

- Master设备执行probe函数的时候，先使用component_match_add()接口声明一个match队列。
- 然后，使用component_master_add_with_match函数将自己作为master注册到component框架。
- 各component slave设备执行probe函数的时候，仅使用component_add()完成slave注册。
- 以上各模块的probe()函数调用先后顺序并不影响。
- 各个component都要实现自己的bind()和unbind()接口（struct component_ops），component框架在判断所有match队列中的模块都完成了probe，就会按 **先slave、后master** 的去调用他们的bind()接口。而各模块真正的初始化动作都是在各自的bind()中去实现。
- 在执行各bind()接口时，各slave间的先后顺序和match队列一致。Component保证master最后执行。
- aicfb->bind()中，主要完成framebuffer申请、fb设备注册、使能UI图层、使能panel等动作。

#### 5.3.2. Buf 管理

DVP的Buf管理需要用到V4L2框架提供的Video queue机制外，还需要用到dma-buf和CMA（详见DE设计文档中的描述）。

对于每一帧图像数据来说，DVP的输出有两个plane：Y和UV。针对DVP的两种输出格式：YUV422_COMBINED_NV16和YUV420_COMBINED_NV12，两个plane的空间大小如下表：

|          | YUV422_COMBINED_NV16 | YUV420_COMBINED_NV12 |
| -------- | -------------------- | -------------------- |
| Plane Y  | Width * height       | Width * height       |
| Plane UV | Width * height       | Width * height / 2   |

根据前面对“Buf队列管理”的分析可知：我们要分配的内存空间 **至少要有3个Buf，每个Buf有两个Plane**。

对应到Buf的ioctl接口，我们要用到*_MPLANE结尾的接口。

注册video queue时提需要提供vb2_ops，其中需要DVP驱动实现的有五个接口：

- - queue_setup

    在APP发起申请buf时调用，这里面主要设置plane个数、各plane的大小；

- - buf_prepare和buf_queue

    在APP每次调用QBuf时会调用，分别完成获取Buf物理地址、同步Qbuf list的处理；

- - Stream start和stream stop

    启动和停止媒体数据（处理流程详见下节描述）。

#### 5.3.3. Stream 启动流程

Stream的启动是由APP发起的，APP通过ioctl接口传入命令VIDIOC_STREAMON（相应的，停止的命令是VIDIOC_STREAMOFF）。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/dvp_stream_on.png](https://photos.100ask.net/artinchip-docs/d213-devkit/dvp_stream_on-170669052618531.png)

图 6.37 *DVP 驱动中Stream启动过程*[¶](#id24)

Stream的停止流程相对简单很多，会调用到Sensor的停止传输接口：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/dvp_stream_off.png](https://photos.100ask.net/artinchip-docs/d213-devkit/dvp_stream_off-170669053323633.png)

图 6.38 *DVP 驱动中Stream停止过程*

#### 5.3.4. 中断处理流程

DVP的中断处理函数中主要处理Buf的队列切换操作。 DVP硬件提供的中断可以反映出多个状态（包括出错状态），其中有两个比较重要：

1. - Update done

     表示硬件已经读走了当前的Register值（影子寄存器），软件可以为下一帧去修改了；

2. - Frame done

     表示当前帧的数据传输完成。

可见，Update done会先于Frame done发生，驱动中用Update done判断当前Register是否可以修改，用Frame done判断当前buf是否完成（done状态），该buf就可以从QBuf list切换到DQbuf list了。

按照DVP硬件设计的逻辑，Update done和Frame done会间隔着产生（不会连续两个Update done）： `Update done -> Frame done -> Update done -> Frame done -> Update done -> Frame done ...`

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/dvp_irq_flow1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/dvp_irq_flow1-170669054724535.png)

图 6.39 *DVP 驱动中IRQ处理流程*

“处理Frame done事件”的子流程如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/dvp_frame_done_flow1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/dvp_frame_done_flow1-170669055625037.png)

图 6.40 *DVP 驱动中Frame done处理流程*

“处理Update done事件”的子流程如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/dvp_update_done_flow1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/dvp_update_done_flow1-170669056253039.png)

图 6.41 *DVP 驱动中Update done处理流程*

- - “异常！DVP同时使用了两个Buf”

    理论上不应该发生，可认为是DVP硬件异常，但因为DVP还在向Buf写数据，所以先不执行stop，软件上报错。

- - “DVP在使用”

    表示“DVP控制器硬件正在使用”。

### 5.4. 数据结构设计

DVP自定义的数据结构都在aic_dvp.h中。

#### 5.4.1. aic_dvp

定义了DVP控制器的设备管理信息：

```
struct aic_dvp {
    /* Device resources */
    struct device           *dev;

    void __iomem            *regs;
    struct clk          *clk;
    struct reset_control        *rst;
    u32             clk_rate;
    int             irq;
    int             ch;

    struct vb2_v4l2_buffer      *vbuf[DVP_MAX_BUF];

    struct aic_dvp_config       cfg; /* The configuration of DVP HW */
    struct v4l2_fwnode_bus_parallel bus; /* The format of input data */
    struct v4l2_pix_format_mplane   fmt; /* The format of output data */

    /* Main Device */
    struct v4l2_device      v4l2;
    struct media_device     mdev;
    struct video_device     vdev;
    struct media_pad        vdev_pad;

    /* Local subdev */
    struct v4l2_subdev      subdev;
    struct media_pad        subdev_pads[DVP_SUBDEV_PAD_NUM];
    struct v4l2_mbus_framefmt   subdev_fmt;

    /* V4L2 Async variables */
    struct v4l2_async_subdev    asd;
    struct v4l2_async_notifier  notifier;
    struct v4l2_subdev      *src_subdev;
    int             src_pad;

    /* V4L2 variables */
    struct mutex            lock;

    /* Videobuf2 */
    struct vb2_queue        queue;
    struct list_head        buf_list;
    spinlock_t          qlock;
    unsigned int            sequence;
};
```

#### 5.4.2. aic_dvp_config

定义了V4L2媒体数据的配置信息：

```
/**
 * Save the configuration information for DVP controller.
 * @code:   media bus format code (MEDIA_BUS_FMT_*, in media-bus-format.h)
 * @field:  used interlacing type (enum v4l2_field)
 * @width:  frame width
 * @height: frame height
 */
struct aic_dvp_config {
    /* Input format */
    enum dvp_input      input;
    enum dvp_input_yuv_seq  input_seq;
    enum v4l2_field     field;

    /* Output format */
    enum dvp_output output;
    u32     width;
    u32     height;
    u32     stride[DVP_MAX_PLANE];
    u32     sizeimage[DVP_MAX_PLANE];
};
```

#### 5.4.3. aic_dvp_buf

定义了DVP驱动的Buf管理信息：

```
struct aic_dvp_buf {
    struct vb2_v4l2_buffer  vb;
    struct list_head    list;
    dma_addr_t      paddr[DVP_MAX_PLANE];
    bool            dvp_using;
};
```

#### 5.4.4. 输入输出的数据格式

##### 5.4.4.1. enum dvp_input

定义了DVP输入数据的格式：

```
enum dvp_input {
    DVP_IN_RAW  = 0,
    DVP_IN_YUV422   = 1,
    DVP_IN_BT656    = 2,
};
```

##### 5.4.4.2. enum dvp_input_yuv_seq

定义了DVP输入数据的YUV格式：

```
enum dvp_input_yuv_seq {
    DVP_YUV_DATA_SEQ_YUYV   = 0,
    DVP_YUV_DATA_SEQ_YVYU   = 1,
    DVP_YUV_DATA_SEQ_UYVY   = 2,
    DVP_YUV_DATA_SEQ_VYUY   = 3,
};
```

##### 5.4.4.3. enum dvp_output

定义了DVP输出数据的格式：

```
enum dvp_output {
    DVP_OUT_RAW_PASSTHROUGH     = 0,
    DVP_OUT_YUV422_COMBINED_NV16    = 1,
    DVP_OUT_YUV420_COMBINED_NV12    = 2,
};
```

### 5.5. 接口设计

#### 5.5.1. V4l2 device 的外部接口

##### 5.5.1.1. ioctl 接口

用户态通过/dev/videoX节点的ioctl()接口与内核态V4L2框架、DVP驱动进行交互。主要功能有：

- 获取、设置格式
- 申请、释放Buf
- QBuf、DQBuf
- 导出dma-buf文件描述符
- 启动、停止Stream

定义在include/uapi/linux/videodev2.h：

```
#define VIDIOC_QUERYCAP      _IOR('V',  0, struct v4l2_capability)
#define VIDIOC_ENUM_FMT         _IOWR('V',  2, struct v4l2_fmtdesc)
#define VIDIOC_G_FMT        _IOWR('V',  4, struct v4l2_format)
#define VIDIOC_S_FMT        _IOWR('V',  5, struct v4l2_format)
#define VIDIOC_REQBUFS      _IOWR('V',  8, struct v4l2_requestbuffers)
#define VIDIOC_QUERYBUF     _IOWR('V',  9, struct v4l2_buffer)
#define VIDIOC_G_FBUF        _IOR('V', 10, struct v4l2_framebuffer)
#define VIDIOC_S_FBUF        _IOW('V', 11, struct v4l2_framebuffer)
#define VIDIOC_OVERLAY       _IOW('V', 14, int)
#define VIDIOC_QBUF     _IOWR('V', 15, struct v4l2_buffer)
#define VIDIOC_EXPBUF       _IOWR('V', 16, struct v4l2_exportbuffer)
#define VIDIOC_DQBUF        _IOWR('V', 17, struct v4l2_buffer)
#define VIDIOC_STREAMON      _IOW('V', 18, int)
#define VIDIOC_STREAMOFF     _IOW('V', 19, int)
#define VIDIOC_G_PARM       _IOWR('V', 21, struct v4l2_streamparm)
#define VIDIOC_S_PARM       _IOWR('V', 22, struct v4l2_streamparm)
#define VIDIOC_G_STD         _IOR('V', 23, v4l2_std_id)
#define VIDIOC_S_STD         _IOW('V', 24, v4l2_std_id)
#define VIDIOC_ENUMSTD      _IOWR('V', 25, struct v4l2_standard)
#define VIDIOC_ENUMINPUT    _IOWR('V', 26, struct v4l2_input)
#define VIDIOC_G_CTRL       _IOWR('V', 27, struct v4l2_control)
#define VIDIOC_S_CTRL       _IOWR('V', 28, struct v4l2_control)
#define VIDIOC_QUERYCTRL    _IOWR('V', 36, struct v4l2_queryctrl)
#define VIDIOC_QUERYMENU    _IOWR('V', 37, struct v4l2_querymenu)
#define VIDIOC_G_INPUT       _IOR('V', 38, int)
#define VIDIOC_S_INPUT      _IOWR('V', 39, int)
#define VIDIOC_G_OUTPUT      _IOR('V', 46, int)
#define VIDIOC_S_OUTPUT     _IOWR('V', 47, int)
#define VIDIOC_ENUMOUTPUT   _IOWR('V', 48, struct v4l2_output)
#define VIDIOC_G_FREQUENCY  _IOWR('V', 56, struct v4l2_frequency)
#define VIDIOC_S_FREQUENCY   _IOW('V', 57, struct v4l2_frequency)
#define VIDIOC_CROPCAP      _IOWR('V', 58, struct v4l2_cropcap)
#define VIDIOC_G_CROP       _IOWR('V', 59, struct v4l2_crop)
#define VIDIOC_S_CROP        _IOW('V', 60, struct v4l2_crop)
#define VIDIOC_G_JPEGCOMP    _IOR('V', 61, struct v4l2_jpegcompression)
#define VIDIOC_S_JPEGCOMP    _IOW('V', 62, struct v4l2_jpegcompression)
#define VIDIOC_QUERYSTD      _IOR('V', 63, v4l2_std_id)
#define VIDIOC_TRY_FMT      _IOWR('V', 64, struct v4l2_format)
#define VIDIOC_G_PRIORITY    _IOR('V', 67, __u32) /* enum v4l2_priority */
#define VIDIOC_S_PRIORITY    _IOW('V', 68, __u32) /* enum v4l2_priority */
#define VIDIOC_G_SLICED_VBI_CAP _IOWR('V', 69, struct v4l2_sliced_vbi_cap)
#define VIDIOC_LOG_STATUS         _IO('V', 70)
#define VIDIOC_G_EXT_CTRLS  _IOWR('V', 71, struct v4l2_ext_controls)
#define VIDIOC_S_EXT_CTRLS  _IOWR('V', 72, struct v4l2_ext_controls)
#define VIDIOC_TRY_EXT_CTRLS    _IOWR('V', 73, struct v4l2_ext_controls)
#define VIDIOC_ENUM_FRAMESIZES  _IOWR('V', 74, struct v4l2_frmsizeenum)
#define VIDIOC_ENUM_FRAMEINTERVALS _IOWR('V', 75, struct v4l2_frmivalenum)
#define VIDIOC_G_ENC_INDEX       _IOR('V', 76, struct v4l2_enc_idx)
#define VIDIOC_ENCODER_CMD      _IOWR('V', 77, struct v4l2_encoder_cmd)
#define VIDIOC_TRY_ENCODER_CMD  _IOWR('V', 78, struct v4l2_encoder_cmd)
```

#### 5.5.2. V4l2 subdev 的外部接口

用户态通过/dev/v4l-subdevX节点的ioctl()接口与内核态V4L2框架、DVP驱动、Sensor驱动进行交互。主要功能有：

- 获取、设置格式
- 获取、设置帧间隔
- 枚举支持的mbus类型
- 枚举支持的分辨率
- 获取、设置区域裁剪

定义在 include/uapi/linux/v4l2-subdev.h：

```
#define VIDIOC_SUBDEV_G_FMT         _IOWR('V',  4, struct v4l2_subdev_format)
#define VIDIOC_SUBDEV_S_FMT         _IOWR('V',  5, struct v4l2_subdev_format)
#define VIDIOC_SUBDEV_G_FRAME_INTERVAL      _IOWR('V', 21, struct v4l2_subdev_frame_interval)
#define VIDIOC_SUBDEV_S_FRAME_INTERVAL      _IOWR('V', 22, struct v4l2_subdev_frame_interval)
#define VIDIOC_SUBDEV_ENUM_MBUS_CODE        _IOWR('V',  2, struct v4l2_subdev_mbus_code_enum)
#define VIDIOC_SUBDEV_ENUM_FRAME_SIZE       _IOWR('V', 74, struct v4l2_subdev_frame_size_enum)
#define VIDIOC_SUBDEV_ENUM_FRAME_INTERVAL   _IOWR('V', 75, struct v4l2_subdev_frame_interval_enum)
#define VIDIOC_SUBDEV_G_CROP            _IOWR('V', 59, struct v4l2_subdev_crop)
#define VIDIOC_SUBDEV_S_CROP            _IOWR('V', 60, struct v4l2_subdev_crop)
#define VIDIOC_SUBDEV_G_SELECTION       _IOWR('V', 61, struct v4l2_subdev_selection)
#define VIDIOC_SUBDEV_S_SELECTION       _IOWR('V', 62, struct v4l2_subdev_selection)
/* The following ioctls are identical to the ioctls in videodev2.h */
#define VIDIOC_SUBDEV_G_STD         _IOR('V', 23, v4l2_std_id)
#define VIDIOC_SUBDEV_S_STD         _IOW('V', 24, v4l2_std_id)
#define VIDIOC_SUBDEV_ENUMSTD           _IOWR('V', 25, struct v4l2_standard)
#define VIDIOC_SUBDEV_G_EDID            _IOWR('V', 40, struct v4l2_edid)
#define VIDIOC_SUBDEV_S_EDID            _IOWR('V', 41, struct v4l2_edid)
#define VIDIOC_SUBDEV_QUERYSTD          _IOR('V', 63, v4l2_std_id)
#define VIDIOC_SUBDEV_S_DV_TIMINGS      _IOWR('V', 87, struct v4l2_dv_timings)
#define VIDIOC_SUBDEV_G_DV_TIMINGS      _IOWR('V', 88, struct v4l2_dv_timings)
#define VIDIOC_SUBDEV_ENUM_DV_TIMINGS       _IOWR('V', 98, struct v4l2_enum_dv_timings)
#define VIDIOC_SUBDEV_QUERY_DV_TIMINGS      _IOR('V', 99, struct v4l2_dv_timings)
#define VIDIOC_SUBDEV_DV_TIMINGS_CAP        _IOWR('V', 100, struct v4l2_dv_timings_cap)
```



### 5.6. APP Demo

#### 5.6.1. APP层的处理流程

APP 中实现从Sensor -> DVP -> DE的数据通路，整体的处理流程如下图（图中按照访问对象分为三列，实际上整体是串行执行）：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/demo_flow.png](https://photos.100ask.net/artinchip-docs/d213-devkit/demo_flow-170669068848241.png)

图 6.42 *APP 中的处理流程*

#### 5.6.2. APP Demo参考实现

Demo代码见test-dvp/test_dvp.c，如下：

```
#include <linux/dma-buf.h>
#include <linux/dma-heap.h>
#include <linux/videodev2.h>
#include <linux/v4l2-subdev.h>
#include <video/artinchip_fb.h>
#include <artinchip/sample_base.h>

/* Global macro and variables */

#define VID_BUF_NUM     3
#define DVP_PLANE_NUM       2
#define CMA_BUF_MAX     (8 * 1024 * 1024)
#define DMA_HEAP_DEV        "/dev/dma_heap/reserved"
#define FB_DEV          "/dev/fb0"
#define VIDEO_DEV       "/dev/video0"
#define SENSOR_DEV      "/dev/v4l-subdev0"
#define DVP_SUBDEV_DEV      "/dev/v4l-subdev1"

static const char sopts[] = "f:c:u";
static const struct option lopts[] = {
    {"format",    required_argument, NULL, 'f'},
    {"capture",   required_argument, NULL, 'c'},
    {"usage",       no_argument, NULL, 'u'},
    {0, 0, 0, 0}
};

struct video_plane {
    int fd;
    int buf;
    int len;
};

struct video_buf_info {
    char *vaddr;
    u32 len;
    u32 offset;
    struct video_plane planes[DVP_PLANE_NUM];
};

struct aic_video_data {
    int w;
    int h;
    int frame_size;
    int frame_cnt;
    int fmt;  // output format
    struct v4l2_subdev_format src_fmt;
    struct video_buf_info binfo[VID_BUF_NUM];
};

static int g_fb_fd = -1;
static int g_video_fd = -1;
static int g_sensor_fd = -1;
static int g_dvp_subdev_fd = -1;
static struct aic_video_data g_vdata = {0};

/* Functions */

void usage(char *program)
{
    printf("Usage: %s [options]: \n", program);
    printf("\t -f, --format\t\tformat of input video, NV16/NV12 etc\n");
    printf("\t -c, --count\t\tthe number of capture frame \n");
    printf("\t -u, --usage \n");
    printf("\n");
    printf("Example: %s -f yuv422 -c 1\n", program);
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

int set_ui_layer_alpha(int val)
{
    int ret = 0;
    struct aicfb_alpha_config alpha = {0};

    alpha.layer_id = 1;
    alpha.enable = 1;
    alpha.mode = 1;
    alpha.value = val;
    ret = ioctl(g_fb_fd, AICFB_UPDATE_ALPHA_CONFIG, &alpha);
    if (ret < 0)
        ERR("ioctl() failed! errno: %d[%s]\n", errno, strerror(errno));

    return ret;
}

void vidbuf_dmabuf_begin(struct aic_video_data *vdata)
{
    int i, j;
    struct aicfb_dmabuf_fd fds = {0};

    for (i = 0; i < VID_BUF_NUM; i++) {
        struct video_plane *plane = (struct video_plane *)&vdata->binfo[i];
        for (j = 0; j < DVP_PLANE_NUM; j++, plane++) {
            fds.fd = plane->fd;
            if (ioctl(g_fb_fd, AICFB_GET_DMABUF, &fds) < 0)
                ERR("ioctl() failed! err %d[%s]\n",
                    errno, strerror(errno));
        }
    }
}

void vidbuf_dmabuf_end(struct aic_video_data *vdata)
{
    int i, j;
    struct aicfb_dmabuf_fd fds = {0};

    for (i = 0; i < VID_BUF_NUM; i++) {
        struct video_plane *plane = (struct video_plane *)&vdata->binfo[i];
        for (j = 0; j < DVP_PLANE_NUM; j++, plane++) {
            fds.fd = plane->fd;
            if (ioctl(g_fb_fd, AICFB_PUT_DMABUF, &fds) < 0)
                ERR("ioctl() failed! err %d[%s]\n",
                    errno, strerror(errno));
        }
    }
}

int sensor_get_fmt(void)
{
    struct v4l2_subdev_format f = {0};

    g_sensor_fd = device_open(SENSOR_DEV, O_RDWR);
    if (g_sensor_fd < 0)
        return -1;

    f.pad = 0;
    f.which = V4L2_SUBDEV_FORMAT_ACTIVE;
    if (ioctl(g_sensor_fd, VIDIOC_SUBDEV_G_FMT, &f) < 0) {
        ERR("ioctl() failed! err %d[%s]\n", errno, strerror(errno));
        return -1;
    }
#if 0
    f.format.code = MEDIA_BUS_FMT_YUYV8_2X8;
    if (ioctl(g_sensor_fd, VIDIOC_SUBDEV_S_FMT, &f) < 0) {
        ERR("ioctl() failed! err %d[%s]\n", errno, strerror(errno));
        return -1;
    }
#endif
    g_vdata.src_fmt = f;
    g_vdata.w = g_vdata.src_fmt.format.width;
    g_vdata.h = g_vdata.src_fmt.format.height;
    return 0;
}

int dvp_subdev_set_fmt(void)
{
    struct v4l2_subdev_format f = g_vdata.src_fmt;

    g_dvp_subdev_fd = device_open(DVP_SUBDEV_DEV, O_RDWR);
    if (g_dvp_subdev_fd < 0)
        return -1;

    f.pad = 0;
    f.which = V4L2_SUBDEV_FORMAT_ACTIVE;
    if (ioctl(g_dvp_subdev_fd, VIDIOC_SUBDEV_S_FMT, &f) < 0) {
        ERR("ioctl() failed! err %d[%s]\n", errno, strerror(errno));
        return -1;
    }

    return 0;
}

int dvp_cfg(int width, int height, int format)
{
    struct v4l2_format f = {0};

    f.type = V4L2_BUF_TYPE_VIDEO_CAPTURE_MPLANE;
    f.fmt.pix_mp.width = g_vdata.src_fmt.format.width;
    f.fmt.pix_mp.height = g_vdata.src_fmt.format.height;
    f.fmt.pix_mp.pixelformat = g_vdata.fmt;
    f.fmt.pix_mp.num_planes = DVP_PLANE_NUM;
    if (ioctl(g_video_fd, VIDIOC_S_FMT, &f) < 0) {
        ERR("ioctl() failed! err %d[%s]\n", errno, strerror(errno));
        return -1;
    }

    return 0;
}

int dvp_expbuf(int index)
{
    int i;
    struct video_buf_info *binfo = &g_vdata.binfo[index];
    struct v4l2_exportbuffer expbuf = {0};

    for (i = 0; i < DVP_PLANE_NUM; i++) {
        memset(&expbuf, 0, sizeof(struct v4l2_exportbuffer));
        expbuf.type = V4L2_BUF_TYPE_VIDEO_CAPTURE_MPLANE;
        expbuf.index = index;
        expbuf.plane = i;
        if (ioctl(g_video_fd, VIDIOC_EXPBUF, &expbuf) < 0) {
            ERR("ioctl() failed! err %d[%s]\n",
                errno, strerror(errno));
            return -1;
        }
        binfo->planes[i].fd = expbuf.fd;
    }

    return 0;
}

int dvp_request_buf(int num)
{
    int i;
    struct v4l2_buffer buf = {0};
    struct v4l2_requestbuffers req = {0};
    struct v4l2_plane planes[DVP_PLANE_NUM];

    req.count  = num;
    req.type   = V4L2_BUF_TYPE_VIDEO_CAPTURE_MPLANE;
    req.memory = V4L2_MEMORY_MMAP; // Only MMAP will do alloc memory
    if (ioctl(g_video_fd, VIDIOC_REQBUFS, &req) < 0) {
        ERR("ioctl() failed! err %d[%s]\n", errno, strerror(errno));
        return -1;
    }

    for (i = 0; i < num; i++) {
            if (dvp_expbuf(i) < 0)
            return -1;

            memset(&buf, 0, sizeof(struct v4l2_buffer));
            buf.type = V4L2_BUF_TYPE_VIDEO_CAPTURE_MPLANE;
            buf.index = i;
            buf.length = DVP_PLANE_NUM;
            buf.memory = V4L2_MEMORY_DMABUF;
            buf.m.planes = planes;
            if (ioctl(g_video_fd, VIDIOC_QUERYBUF, &buf) < 0) {
            ERR("ioctl() failed! err %d[%s]\n",
                errno, strerror(errno));
            return -1;
            }
    }

    return 0;
}

void dvp_release_buf(int num)
{
    int i;
    struct video_buf_info *binfo = NULL;

    for (i = 0; i < num; i++) {
        binfo = &g_vdata.binfo[i];
        if (binfo->vaddr) {
            munmap(binfo->vaddr, binfo->len);
            binfo->vaddr = NULL;
        }
    }
}

int dvp_queue_buf(int index)
{
    struct v4l2_buffer buf = {0};
    struct v4l2_plane planes[DVP_PLANE_NUM] = {0};

    buf.type   = V4L2_BUF_TYPE_VIDEO_CAPTURE_MPLANE;
    buf.memory = V4L2_MEMORY_MMAP;
    buf.index  = index;
    buf.length = DVP_PLANE_NUM;
    buf.m.planes = planes;
    if (ioctl(g_video_fd, VIDIOC_QBUF, &buf) < 0) {
        ERR("ioctl() failed! err %d[%s]\n", errno, strerror(errno));
        return -1;
    }

    return 0;
}

int dvp_dequeue_buf(int *index)
{
    struct v4l2_buffer buf = {0};
    struct v4l2_plane planes[DVP_PLANE_NUM] = {0};

    buf.type   = V4L2_BUF_TYPE_VIDEO_CAPTURE_MPLANE;
    buf.memory = V4L2_MEMORY_MMAP;
    buf.length = DVP_PLANE_NUM;
    buf.m.planes = planes;
    if (ioctl(g_video_fd, VIDIOC_DQBUF, &buf) < 0) {
        ERR("ioctl() failed! err %d[%s]\n", errno, strerror(errno));
        return -1;
    }

    *index = buf.index;
    return 0;
}

int dvp_start(void)
{
    enum v4l2_buf_type type = V4L2_BUF_TYPE_VIDEO_CAPTURE_MPLANE;

    if (ioctl(g_video_fd, VIDIOC_STREAMON, &type) < 0) {
        ERR("ioctl() failed! err %d[%s]\n", errno, strerror(errno));
        return -1;
    }

    return 0;
}

int dvp_stop(void)
{
    enum v4l2_buf_type type = V4L2_BUF_TYPE_VIDEO_CAPTURE_MPLANE;

    if (ioctl(g_video_fd, VIDIOC_STREAMOFF, &type) < 0) {
        ERR("ioctl() failed! err %d[%s]\n", errno, strerror(errno));
        return -1;
    }

    return 0;
}

int video_layer_set(struct aic_video_data *vdata, int index)
{
    struct aicfb_layer_data layer = {0};
    struct video_buf_info *binfo = &vdata->binfo[index];

    layer.layer_id = 0;
    layer.enable = 1;
#if 1
    layer.scale_size.width = vdata->w;
    layer.scale_size.height = vdata->h;
#else
    layer.scale_size.width = 780;
    layer.scale_size.height = 600;
#endif
    layer.pos.x = 10;
    layer.pos.y = 10;
    layer.buf.size.width = vdata->w;
    layer.buf.size.height = vdata->h;
    layer.buf.format = AIC_FMT_NV16;
    layer.buf.dmabuf_fd[0] = binfo->planes[0].fd;
    layer.buf.dmabuf_fd[1] = binfo->planes[1].fd;
    layer.buf.stride[0] = vdata->w;
    layer.buf.stride[1] = vdata->w;

    if (ioctl(g_fb_fd, AICFB_UPDATE_LAYER_CONFIG, &layer) < 0) {
        ERR("ioctl() failed! err %d[%s]\n", errno, strerror(errno));
        return -1;
    }

    return 0;
}

int main(int argc, char **argv)
{
    int c, frame_cnt = 1;
    int i, index = 0;

    DBG("Compile time: %s\n", __TIME__);
    g_vdata.fmt = V4L2_PIX_FMT_NV16;
    while ((c = getopt_long(argc, argv, sopts, lopts, NULL)) != -1) {
        switch (c) {
        case 'f':
            if (strncasecmp("nv12", optarg, strlen(optarg)) == 0)
                g_vdata.fmt = V4L2_PIX_FMT_NV12;
            continue;
        case 'c':
            frame_cnt = str2int(optarg);
            continue;
        case 'u':
            usage(argv[0]);
            return 0;
        default:
            break;
        }
    }

    if (sensor_get_fmt() < 0)
        return -1;
    if (dvp_subdev_set_fmt() < 0)
        return -1;

    if (g_vdata.fmt == V4L2_PIX_FMT_NV16)
        g_vdata.frame_size = g_vdata.w * g_vdata.h * 2;
    if (g_vdata.fmt == V4L2_PIX_FMT_NV12)
        g_vdata.frame_size = (g_vdata.w * g_vdata.h * 3) >> 1;

    g_fb_fd = device_open(FB_DEV, O_RDWR);
    if (g_fb_fd < 0)
        return -1;
    if (set_ui_layer_alpha(128) < 0)
        goto end;

    g_video_fd = device_open(VIDEO_DEV, O_RDWR);
    if (g_video_fd < 0)
        goto end;
    if (dvp_cfg(g_vdata.w, g_vdata.h, g_vdata.fmt) < 0)
        goto end;
    if (dvp_request_buf(VID_BUF_NUM) < 0)
        goto end;

    vidbuf_dmabuf_begin(&g_vdata);
    for (i = 0; i < VID_BUF_NUM; i++)
        if (dvp_queue_buf(i) < 0)
            goto end;

    if (dvp_start() < 0)
        goto end;
    for (i = 0; i < frame_cnt; i++ ) {
        if (dvp_dequeue_buf(&index) < 0)
            break;
        DBG("Set the buf %d to video layer\n", index);
        if (video_layer_set(&g_vdata, index) < 0)
            break;
        dvp_queue_buf(index);
    }
    dvp_stop();
    vidbuf_dmabuf_end(&g_vdata);
    dvp_release_buf(VID_BUF_NUM);

end:
    if (g_fb_fd > 0)
        close(g_fb_fd);
    if (g_video_fd > 0)
        close(g_video_fd);
    if (g_sensor_fd > 0)
        close(g_sensor_fd);
    if (g_dvp_subdev_fd > 0)
        close(g_dvp_subdev_fd);

    return 0;
}
```

## 6. 常见问题

### 6.1. 摄像头初始化失败

#### 6.1.1. 现象

板子启动后，摄像头的V4L2 device注册失败，此时DVP的注册流程也因此不完整，在Sysfs中会找不到 /dev/video0 不存在。

#### 6.1.2. 原因分析

一般情况下，摄像头需要通过 I2C 来访问，所以要确保 I2C和摄像头两个模块是否打开。

- 摄像头的打开方法： [配置 OV5640 摄像头](4_test_guide.html#ref-dvp-camera)
- I2C的打开方法，请参考I2C模块的使用说明

同时，要确认以下配置是否正确：

1. 硬件上，摄像头是连接到哪个I2C通道，对应的DTS配置是否正确，配置参见 [配置 OV5640 摄像头](4_test_guide.html#ref-dvp-camera)
2. 摄像头的I2C 设备地址是否正确，参见 [配置 OV5640 摄像头](4_test_guide.html#ref-dvp-camera) 中的参数 `camera@3C`
3. 摄像头的供电是否正常。

\#ifdef AIC_ONLY

**以下内容仅供内部使用**

注意

在FPGA环境中，摄像头的电源GPIO在上电时已正常工作，不能去复位，否则会导致摄像头的寄存器读写失败。

屏蔽OV5640的GPIO复位的patch：

```
    ov5640: Must not set the power GPIO in FPGA.

    Signed-off-by: matteo <duanmt@artinchip.com>
    Change-Id: I55b163f8c59f257532e0c047931765bda6a89c85

diff --git a/drivers/media/i2c/ov5640.c b/drivers/media/i2c/ov5640.c
index 8f0812e85..c240ead99 100644
--- a/drivers/media/i2c/ov5640.c
+++ b/drivers/media/i2c/ov5640.c
@@ -1857,7 +1857,7 @@ static void ov5640_power(struct ov5640_dev *sensor, bool enable)
 {
        gpiod_set_value_cansleep(sensor->pwdn_gpio, enable ? 0 : 1);
 }
-
+#ifndef CONFIG_DEBUG_ON_FPGA_BOARD_ARTINCHIP
 static void ov5640_reset(struct ov5640_dev *sensor)
 {
        if (!sensor->reset_gpio)
@@ -1877,6 +1877,7 @@ static void ov5640_reset(struct ov5640_dev *sensor)
        gpiod_set_value_cansleep(sensor->reset_gpio, 0);
        usleep_range(20000, 25000);
 }
+#endif

 static int ov5640_set_power_on(struct ov5640_dev *sensor)
 {
@@ -1898,8 +1899,10 @@ static int ov5640_set_power_on(struct ov5640_dev *sensor)
                goto xclk_off;
        }

+#ifndef CONFIG_DEBUG_ON_FPGA_BOARD_ARTINCHIP
        ov5640_reset(sensor);
        ov5640_power(sensor, true);
+#endif

        ret = ov5640_init_slave_id(sensor);
        if (ret)
```

\>>>> 以上内容仅供内部使用

\#endif

### 6.2. 画面的流畅度问题

#### 6.2.1. 现象

界面显示的摄像头画面有明显卡顿情况。

#### 6.2.2. 解决方法

1. 如果DVP驱动中的调试信息打开了，每一帧数据处理都有输出log，会影响帧率，需要关掉。修改方法见 [调试开关](3_debug_guide.html#ref-dvp-debug)
2. 尝试增加test_dvp中的buffer数量，保证buf队列中有充裕的空闲buf。buffer数量定义见：

```
#define VID_BUF_NUM     3
```