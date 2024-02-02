---
sidebar_position: 12
---

# GE 开发指南

## 1 模块介绍

### 1.1. 术语定义
```
| 术语 | 定义                   | 注释说明       |
| ---- | ---------------------- | -------------- |
| GE   | Graphics Engine        | 2D图形加速引擎 |
| blit | bit block transfer     | 位块搬移       |
| MPP  | Media Prosess Platform | 多媒体处理平台 |
```
### 1.2. 模块简介

GE(Graphics Engine)模块是一个用来进行2D图形加速的硬件模块。主要包括格式转换、旋转、 镜像、缩放、Alpha混合、Color Key、位块搬移、Dither等功能。
```
- 最大输入/输出图像大小4096x4096
- 支持RGB转YUV，支持YUV转RGB
- 支持的RGB格式包括：ARGB8888/XRGB8888/RGB888/ARGB4444/ARGB1555/RGB565
- 支持的YUV格式包括：YUV420P/NV12/NV21/YUV422P/NV16/NV61/YUYV/YVYU/UYVY/VYUY
- 支持水平和垂直Flip
- 所有格式支持90/180/270度旋转
- RGB格式支持任意角度旋转
- 支持1/16x ~ 16x缩放
- 支持porter-duff规则的Alpha混合
- 支持Color Key
- 支持矩形填充
- 位块搬移(bit block transfer)
- 支持误差扩散Dither
```
#### 1.2.1. 原理框图

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ge_overview_block1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ge_overview_block1.png)

图 6.9 GE 原理框图

## 2. 参数配置

### 2.1. 内核配置

GE驱动依赖dma-buf、CMA，需要提前打开。

#### 2.1.1. 打开 CMA

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，按如下选择：

```
Linux
    Memory Management options
         [*] Contiguous Memory Allocator
```

CMA区域的大小配置，如下配置为 16MB，可以根据具体需求来配置size大小

```
Linux
    Library routines
        [*] DMA Contiguous Memory Allocator
        (16)  Size in Mega Bytes
```

#### 2.1.2. 打开 dma-buf

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，按如下选择：

```c
Linux
    Device Drivers
        DMABUF options
            [*] Explicit Synchronization Framework
            [*]   Sync File Validation Framework
            [*] userspace dmabuf misc driver
            [*] DMA-BUF Userland Memory Heaps
                [*]   DMA-BUF CMA Heap
```

#### 2.1.3. 打开 GE

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，按如下选择：

```
Linux
    Device Drivers  --->
        Graphics support  --->
            Artinchip Graphics  --->
                <*> Artinchip 2D Graphics Engine
                    select 2D Graphics Engine Mode
                        ( ) CMD queue mode
                        (X) normal mode
```

可以选择CMD queue mode或者normal mode，只可以二选一, 其中CMD queue mode为命令队列模式，normal mode为非命令队列模式

### 2.2. DTS 参数配置

```
ge: ge@18b00000 {
    #address-cells = <1>;
    #size-cells = <0>;
    compatible = "artinchip,aic-ge-v1.0";
    reg = <0x0 0x18b00000 0x0 0x1000>;
    interrupts-extended = <&plic0 60 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cmu CLK_GE>;
    clock-names = "ge";
    resets = <&rst RESET_GE>;
    reset-names = "ge";
};
```

## 3. 调试指南

### 3.1. 调试开关

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，可以打开GE模块的DEBUG选项：

```c
Linux
    Kernel hacking
        Artinchip Debug
            [*] GE driver debug
```

此DEBUG选项打开的影响：

1. GE驱动以`-O0`编译
2. GE的`dev_dbg()`调试信息会被编译

在系统运行时，如果要打印`pr_dbg()`和`dev_dbg()`信息，还需要调整loglevel为8，两个方法：

1. 在board.dts中修改bootargs，增加“loglevel=8”
2. 在板子启动到Linux shell后，执行命令：

```c
echo 8 > /proc/sys/kernel/printk
```

## 4. 测试指南

- - 位块搬移
```
    测试命令: ge_bitblt源码目录: source/artinchip/aic-mpp/mpp_tes/ge_bitblt.c
```

- - 色块填充
```
    测试命令: ge_fillrect源码目录: source/artinchip/aic-mpp/mpp_tes/ge_fillrect.c
```
- - 图形旋转
```
    测试命令: ge_rotate源码目录: source/artinchip/aic-mpp/mpp_tes/ge_rotate.c
```
## 5. 设计说明

### 5.1. 源码说明

本模块源代码在内核目录linux-5.10/drivers/video/artinchip下，目录结构如下

```c
drivers/video/artinchip/ge/
├── ge_normal.c  // normal模式驱动
├── ge_hw.c  // normal模式对硬件操作的封装
├── ge_hw.h  // normal模式对硬件操作封装的API
├── ge_cmdq.c  // CMD queue模式驱动
├── ge_reg.h    // GE寄存器定义
├── Kconfig
└── Makefile
```

GE驱动是基于misc设备驱动实现的，在用户态通过open设备节点/dev/ge和GE驱动进行交互， GE驱动可以配置成normal（非命令队列）模式或命令队列模式，配置方法可参考参数配置章节。

### 5.2. 非命令队列模式

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ge_sw_normal_0.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ge_sw_normal_0-17066833217075-17066833244757.png)

图 60 *normal模式架构图*

非命令队列模式，即normal模式。在normal模式下，当用户态通过open函数打开/dev/ge设备节点，会调用到驱动中的ge_open， 当用户通过close关闭驱动的时候，会调用到驱动中的ge_release。在ge_open中主要是实现了模块clock的打开操作， 在ge_release中实现了模块clock的关闭操作。当用户态有多个用户打开GE驱动的时候，对驱动打开次数进行引用计数， 至少有一个用户打开GE驱动时打开GE的clock, 当所有的用户都关闭GE驱动时关闭GE的clock。

```c
static int ge_open(struct inode *inode, struct file *file)
{
    mutex_lock(&g_data->lock);
    if (g_data->refs == 0) {
        ge_clk_enable(g_data);
    }
    g_data->refs++;
    mutex_unlock(&g_data->lock);

    return nonseekable_open(inode, file);
}

static int ge_release(struct inode *inode, struct file *file)
{
    mutex_lock(&g_data->lock);
    if (g_data->refs == 1) {
        ge_clk_disable(g_data);
    }
    g_data->refs--;&_
    mutex_unlock(&g_data->lock);
    return 0;
}
```

normal模式用户态可用ioctl：

- IOC_GE_VERSION
- IOC_GE_MODE
- IOC_GE_FILLRECT
- IOC_GE_BITBLT
- IOC_GE_ROTATE

对于接口IOC_GE_FILLRECT、IOC_GE_BITBLT、IOC_GE_ROTATE在normal模式下调用是同步的， 硬件执行任务完成后接口调用才会返回，在normal模式下，无需调用IOC_GE_SYNC接口。

#### 5.2.1. 关键流程设计

在normal模式下，GE驱动各种功能都是通过ioctrl调用来实现，每一次ioctl的调用都包括GE参数配置、GE模块中断开启， GE启动，GE等中断（阻塞等待中断服务程序通知中断到来），硬件完成任务后，关闭中断。Ioctl通过mutex保护， 支持多用户同时打开驱动设备节点，并调用ioctl。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ge_sw_normal_11.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ge_sw_normal_11-170668350283914.png)

图 61 normal模式中断流程

等待中断流程：

- 在probe时候初始化等待队列： `init_waitqueue_head(&data->wait);`

- 在ioctl中调用如下函数，使当前进程在等待队列中睡眠：

  `wait_event_timeout(data->wait, data->status, msecs_to_jiffies(GE_TIMEOUT_MS));`

- 在中断服务程序中调用`wake_up(&data->wait)`，唤醒等待队列中的睡眠进程

### 5.3. 命令队列模式

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ge_sw_cmdq.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ge_sw_cmdq.png)

图 62 *CMD queue模式架构图*

命令队列模式，即CMD queue模式。在CMD queue模式下，GE驱动内部是以Command queue的方式执行的， GE驱动只负责从用户态接收命令队列，然后执行命令队列。GE的完整功能需要依赖MPP中间件， 在MPP中间件中会把用户设置的参数信息转换成硬件可以识别的命令队列信息。

Command Queue相关的几个概念：

- Task： GE（Graphics Engine） 可以执行的最小任务单元，比如说一次blit操作、一次矩形填充
- Batch：硬件以batch为单位执行，是一系列命令的集合，可以包含一个或者多个task，软件也必须以batch为单位向驱动写入命令
- Command Queue：软件可以向Command Queue写入多个batch，硬件以batch为单位，按顺序执行

GE Command Queue是以ring buffer的方式实现的, 关于ring buffer的说明，请参考GE规格书

CMD queue和normal模式驱动相比增加了write接口，命令队列通过write接口，以batch为单位发送给驱动，batch中可以包含多个task的命令。 write操作是异步的，相应的命令只要写入驱动中的cmd queue buffer即返回，不用等待硬件执行完当前batch中的所有命令， 当用户需要等待发送的命令执行完成时可以调用IOC_GE_SYNC接口。在CMD queue模式下，通过write接口写入以batch为单位的命令， 硬件可以连续执行多个task。而在normal模式下，通过IOC_GE_BITBLT等接口，硬件一次只能执行一个任务。

CMD Queue模式用户态可用ioctl：

- IOC_GE_VERSION
- IOC_GE_MODE
- IOC_GE_CMD_BUF_SIZE
- IOC_GE_SYNC
- IOC_GE_ADD_DMA_BUF
- IOC_GE_RM_DMA_BUF

#### 5.3.1. 初始化流程

GE驱动的初始化过程见aic_ge_probe()函数，除了申请regs、clk、reset等资源外， 还申请了存储Command Queue需要的ring buffer，以及存储batch信息的结构体。 batch结构体不存储实际的命令，batch结构体中保存指向ring buffer的一段空间， 包括相对于ring buffer起始地址的offset，以及当前batch中的命令length。batch结构体定义如下:

```c
struct aic_ge_batch {
    struct list_head list;
    int offset;
    int length;
    int client_id;
};
```

下图ring buffer中不同的颜色代表不同的batch对应的命令：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ge_function_cmdq_02.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ge_function_cmdq_02.png)

图 63 *ring buffer与batch关系图*

目前驱动中定义了8个存储batch信息的结构体，ring buffer的size定义为32K, 32K的空间可以缓存超过256个task（假如都是RGB格式的task）。

```
#define MAX_BATCH_NUM 8
#define CMD_BUF_SIZE  (32 * 1024)
```

#### 5.3.2. batch管理

1. 每一个batch总共可能存在3中状态：

- free状态，batch中没有可用信息，在free batch list中
- ready状态，batch中有等待执行的cmd信息，在ready list batch中
- 运行状态，当前硬件正在运行的batch，即不在free list中也不在ready list中

1. 在用户态的缓冲buffer中，用户组织好命令队列，以batch为单位，通过标准的write接口把命令copy到内核中的ring buffer。
2. 在内核中维护一个包含每个batch起始offset和length信息的链表，硬件以batch为单位执行命令队列。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ge_function_cmdq_41.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ge_function_cmdq_41.png)

图 64 batch状态变化流程图

1. 如上图所示，会有两个地方启动硬件执行batch命令

- 当用户调用了write命令写入当前batch信息，并且硬件处于空闲状态
- 在中断服务判断当前的ready list batch不为空，则从列表中dequeue一个batch，送给硬件执行

#### 5.3.3. 多进程支持

支持多进程调用，不同进程添加的batch，按照先进先出原则运行。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ge_function_cmdq_31.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ge_function_cmdq_31.png)

图 65 多进程支持

当某个进程需要等待当前进程任务是否完成的时候，需要调用IOC_GE_SYNC命令，等待当前进程所有的任务完成即可，如上图所示。 当进程2调用IOC_GE_SYNC命令时，只需要等待Batch5完成即可，不用管后边加入的其他进程的Batch6、Batch7

IOC_GE_SYNC的实现：

1. 在open中的file上下文中创建当前client的上下文信息，并添加到client链表中，在client中有唯一识别id

```c
struct aic_ge_client {
    struct list_head list;
    struct list_head buf_list;
    struct mutex buf_lock; /* dma buf list lock */
    int id;
    int batch_num;
};
```

1. 当前用户调用write接口，写入一个batch命令的时候， 当前batch中的client_id会写入对应的client识别id， 并且对应的client上下文中的batch_num引用计数会加1。
2. 硬件每执行完成一个batch产生一次中断，在中断服务程序中查询当前batch中的client_id，并通过client_id从client链表中找到当前client， 对应的client上下文中的batch_num引用计数减1。在中断服务程序中每来一次中断会通知所有进程

```
wake_up_all(&data->wait);
```

1. 用户通过接口IOC_GE_SYNC等待任务完成，只需要等待当前client中的batch_num为0即可。

```c
static int ge_client_sync(struct aic_ge_data *data,
            struct aic_ge_client *client)
    while (client->batch_num) {
        ret = wait_event_interruptible_timeout(data->wait,
                            !client->batch_num,
                            GE_TIMEOUT(4));
        if (ret < 0)
            break;
    }
    return ret;
}
```

### 5.4. 数据结构设计

#### 5.4.1. enum ge_pd_rules

Porter/Duff alpha混合规则枚举

```c
/*
 * enum ge_pd_mode - graphics engine Porter/Duff alpha blending rules
 *
 * pixel = (source * fs + destination * fd)
 * sa = source alpha
 * da = destination alpha
 *
 * @GE_PD_NONE:           fs: sa      fd: 1.0-sa (defaults)
 * @GE_PD_CLEAR:          fs: 0.0     fd: 0.0
 * @GE_PD_SRC:            fs: 1.0     fd: 0.0
 * @GE_PD_SRC_OVER:       fs: 1.0     fd: 1.0-sa
 * @GE_PD_DST_OVER:       fs: 1.0-da  fd: 1.0
 * @GE_PD_SRC_IN:         fs: da      fd: 0.0
 * @GE_PD_DST_IN:         fs: 0.0     fd: sa
 * @GE_PD_SRC_OUT:        fs: 1.0-da  fd: 0.0
 * @GE_PD_DST_OUT:        fs: 0.0     fd: 1.0-sa
 * @GE_PD_SRC_ATOP:       fs: da      fd: 1.0-sa
 * @GE_PD_DST_ATOP:       fs: 1.0-da  fd: sa
 * @GE_PD_ADD:            fs: 1.0     fd: 1.0
 * @GE_PD_XOR:            fs: 1.0-da  fd: 1.0-sa
 * @GE_PD_DST:            fs: 0.0     fd: 1.0
 */
enum ge_pd_rules {
        GE_PD_NONE           =  0,
        GE_PD_CLEAR          =  1,
        GE_PD_SRC            =  2,
        GE_PD_SRC_OVER       =  3,
        GE_PD_DST_OVER       =  4,
        GE_PD_SRC_IN         =  5,
        GE_PD_DST_IN         =  6,
        GE_PD_SRC_OUT        =  7,
        GE_PD_DST_OUT        =  8,
        GE_PD_SRC_ATOP       =  9,
        GE_PD_DST_ATOP       = 10,
        GE_PD_ADD            = 11,
        GE_PD_XOR            = 12,
        GE_PD_DST            = 13,
};
```

#### 5.4.2. struct ge_ctrl

GE控制结构体

```c
/**
 * struct ge_ctrl - ge ctrl functions
 * @alpha_en
 *  0: enable Porter/Duff alpha blending
 *  1: disable Porter/Duff alpha blending
 * @alpha_rules: Porter/Duff alpha blending rules
 * @src_alpha_mode: source alpha mode
 *  0: pixel alpha mode(src_alpha = src_pixel_alpha)
 *  1: global alpha mode(src_alpha = src_global_alpha)
 *  2: mixded alpha mode(src_alpha = src_pixel_alpha * src_global_alpha / 255)
 * @src_global_alpha: source global alpha value (0~255)
 *  used by global alpha mode and mixded alpha mode
 * @dst_alpha_mode: destination alpha mode
 *  0: pixel alpha mode(dst_alpha = dst_pixel_alpha)
 *  1: global alpha mode(dst_alpha = dst_global_alpha)
 *  2: mixded alpha mode(dst_alpha = dst_pixel_alpha * dst_global_alpha / 255)
 * @dst_global_alpha: destination global alpha value (0~255)
 *  used by global alpha mode and mixed alpha mode
 * @ck_en
 *  0: disable color key
 *  1: enable color key
 * @ck_value: rgb value of color key to match the source pixels
 *  bit[31:24]: reserved
 *  bit[23:16]: R value
 *  bit[15:8]: G value
 *  bit[7:0]: B value
 * @dither_en(Not supported by IOC_GE_ROTATE)
 *  0: disable dither
 *  1: enable dither
 * @flags: the flags of some functions, such as scan order, src H/V flip
 *         and src 90/180/270 degree rotation, the H flip, V flip
 *         and rotation can be enabled at the same time, the effect
 *         of flip is in front of rotation, only supported by IOC_GE_BITBLT
 *         the flags was defined in mpp_types.h
 */
struct ge_ctrl {
        unsigned int       alpha_en;
        enum ge_pd_rules   alpha_rules;
        unsigned int       src_alpha_mode;
        unsigned int       src_global_alpha;
        unsigned int       dst_alpha_mode;
        unsigned int       dst_global_alpha;
        unsigned int       ck_en;
        unsigned int       ck_value;
        unsigned int       dither_en;
        unsigned int       flags;
};
```

#### 5.4.3. enum ge_fillrect_type

颜色填充类型枚举

```c
/*
 * enum ge_fillrect_type - the ge fill rectangle types:
 *
 * GE_NO_GRADIENT: No gradient is used, only use start_color to
 *                  fill rectangle, ignore end_color
 * GE_H_LINEAR_GRADIENT: Interpolates colors between start_color
 *                  and end_color in the horizontal direction
 *                  form left to right
 * GE_V_LINEAR_GRADIENT: Interpolates colors between start_color and
 *                  end_color in the vertical direction from top to
 *                  buttom
 */
enum ge_fillrect_type {
        GE_NO_GRADIENT         = 0,
        GE_H_LINEAR_GRADIENT   = 1,
        GE_V_LINEAR_GRADIENT   = 2,
};
```

#### 5.4.4. struct ge_fillrect

矩形填充结构体

```c
/**
 * struct ge_fillrect - ge fill rectangle
 * @type: fill rect type
 * @start_color: start color(32 bits)
 * bit[31:24] alpha value
 * bit[23:16] r value
 * bit[15:8]  g value
 * bit[7:0]   b value
 * @end_color: end color(32 bits)
 * bit[31:24] alpha value
 * bit[23:16] r value
 * bit[15:8]  g value
 * bit[7:0]   b value
 * @dst_buf: the destination buffer
 * @ctrl: ge ctrl functions
 */
struct ge_fillrect {
        enum ge_fillrect_type  type;
        unsigned int           start_color;
        unsigned int           end_color;
        struct mpp_buf         dst_buf;
        struct ge_ctrl         ctrl;
};
```

#### 5.4.5. struct ge_bitblt[¶](#struct-ge-bitblt)

位块搬移结构体

```c
/**
 * struct ge_bitblt - ge bitblt
 * @src_buf: the source buffer
 * @dst_buf: the destination buffer
 * @ctrl: ge ctrl functions
 */
struct ge_bitblt {
        struct mpp_buf   src_buf;
        struct mpp_buf   dst_buf;
        struct ge_ctrl   ctrl;
};
```

#### 5.4.6. struct ge_bitblt[¶](#id9)

位块搬移结构体

```c
/**
 * struct ge_rotation - ge rotation
 * @src_buf: the source buffer
 * @dst_buf: the destination buffer
 * @src_rot_center: left-top x/y coordinate of src center
 * @dst_rot_center: left-top x/y coordinate of dst center
 * @angle_sin: 2.12 fixed point, the sin value of rotation angle
 * @angle_cos: 2.12 fixed point, the cos value of rotation angle
 * @ctrl: ge ctrl functions
 */
struct ge_rotation {
        struct mpp_buf        src_buf;
        struct mpp_buf        dst_buf;
        struct mpp_point      src_rot_center;
        struct mpp_point      dst_rot_center;
        int                   angle_sin;
        int                   angle_cos;
        struct ge_ctrl        ctrl;
};
```

#### 5.4.7. enum ge_mode[¶](#enum-ge-mode)

GE模式枚举

```c
enum ge_mode {
        GE_MODE_NORMAL,
        GE_MODE_CMDQ,
};
```

### 5.5. 接口设计

用户态通过/dev/ge节点打开GE驱动。

#### 5.5.1. IOC_GE_VERSION

接口语法：

```c
int ioctl(int fd, unsigned long cmd, unsinged int *pversion);
```
```
| 功能说明 | 获取GE版本                                              |
| -------- | ------------------------------------------------------- |
| 参数     | cmd：IOC_GE_VERSIONpversion: 指向32bits无符号版本号指针 |
| 返回值   | 0：成功<0：失败                                         |
| 注意事项 | 无                                                      |
```

#### 5.5.2. IOC_GE_MODE

接口语法：

```
int ioctl(int fd, unsigned long cmd, enum ge_mode *mode);
```
```
| 功能说明 | 获取工作模式                           |
| -------- | -------------------------------------- |
| 参数     | cmd：IOC_GE_MODEmode: enum ge_mode指针 |
| 返回值   | 0：成功<0：失败                        |
| 注意事项 | 无                                     |
```
###  6.5.5.3. IOC_GE_FILLRECT

接口语法：

```
int ioctl(int fd, unsigned long cmd, struct ge_fillrect *fill);
```
```
| 功能说明 | 矩形填充                                             |
| -------- | ---------------------------------------------------- |
| 参数     | cmd：IOC_GE_FILLRECTfill: 指向struct ge_fillrect指针 |
| 返回值   | 0：成功<0：失败                                      |
| 注意事项 | 仅供normal模式使用, cmd queue模式不可用              |
```
#### 5.5.4. IOC_GE_BITBLT

接口语法：

```c
int ioctl(int fd, unsigned long cmd, struct ge_bitblt *bitblt);
```
```
| 功能说明 | 位块搬移                                           |
| -------- | -------------------------------------------------- |
| 参数     | cmd：IOC_GE_BITBLTbitblt: 指向struct ge_bitblt指针 |
| 返回值   | 0：成功<0：失败                                    |
| 注意事项 | 仅供normal模式使用, cmd queue模式不可用            |
```
#### 5.5.5. IOC_GE_ROTATE

接口语法：

```c
int ioctl(int fd, unsigned long cmd, struct ge_rotation *rot);
```
```
| 功能说明 | 任意角度旋转                                      |
| -------- | ------------------------------------------------- |
| 参数     | cmd：IOC_GE_ROTATErot: 指向struct ge_rotation指针 |
| 返回值   | 0：成功<0：失败                                   |
| 注意事项 | 仅供normal模式使用, cmd queue模式不可用           |
```
#### 5.5.6. IOC_GE_SYNC

接口语法：

```c
int ioctl(int fd, unsigned long cmd);
```
```
| 功能说明 | 等待任务完成     |
| -------- | ---------------- |
| 参数     | cmd：IOC_GE_SYNC |
| 返回值   | 0：成功<0：失败  |
| 注意事项 | 无               |
```
#### 5.5.7. IOC_GE_CMD_BUF_SIZE

接口语法：

```
int ioctl(int fd, unsigned long cmd, unsinged int *size);
```
```
| 功能说明 | 获取cmd buffer size                                  |
| -------- | ---------------------------------------------------- |
| 参数     | cmd：IOC_GE_CMD_BUF_SIZEsize: 指向32bits无符号数指针 |
| 返回值   | 0：成功<0：失败                                      |
| 注意事项 | cmd queue模式可用，normal模式不可用                  |
```
#### 5.5.8. IOC_GE_ADD_DMA_BUF

接口语法：

```
int ioctl(int fd, unsigned long cmd, struct dma_buf_info *buf);
```
```
| 功能说明 | 添加DMA buffer                                          |
| -------- | ------------------------------------------------------- |
| 参数     | cmd：IOC_GE_ADD_DMA_BUFbuf: 指向struct dma_buf_info指针 |
| 返回值   | 0：成功<0：失败                                         |
| 注意事项 | 无                                                      |
```
#### 5.5.9. IOC_GE_RM_DMA_BUF

接口语法：

```
int ioctl(int fd, unsigned long cmd, struct dma_buf_info *buf);
```
```
| 功能说明 | 删除DMA buffer                                         |
| -------- | ------------------------------------------------------ |
| 参数     | cmd：IOC_GE_RM_DMA_BUFbuf: 指向struct dma_buf_info指针 |
| 返回值   | 0：成功<0：失败                                        |
| 注意事项 | 无                                                     |
```


### 5.6. MPP对GE接口的封装

由于驱动支持非命令队列和命令队列两种模式，在提供的用户态MPP接口中，对调用驱动的接口进行了封装，保持了统一的调用API， 建议用户统一使用MPP中间层API。在命令队列模式下，task会先缓存在用户态的cmd buffer中，当调用mpp_ge_emit后， 会通过write接口把命令写入内核的ring buffer。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ge_function_cmdq_51.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ge_function_cmdq_51.png)

图 66 *应用调用MPP框架*

#### 5.6. mpp_ge_open

```
struct mpp_ge *mpp_ge_open();
```
```
| 功能说明 | 打开ge设备                         |
| -------- | ---------------------------------- |
| 参数定义 | 无                                 |
| 返回值   | struct mpp_ge 结构体指针NULL：失败 |
| 注意事项 | 无                                 |
```
#### 5.6.2. mpp_ge_close

```
void mpp_ge_close(struct mpp_ge *ge);
```
```
| 功能说明 | 关闭ge设备                   |
| -------- | ---------------------------- |
| 参数定义 | ge: struct mpp_ge 结构体指针 |
| 返回值   | 无                           |
| 注意事项 | 无                           |
```
#### 5.6.3. mpp_ge_get_mode

```
enum ge_mode mpp_ge_get_mode(struct mpp_ge *ge);
```
```
| 功能说明 | 获取GE模式                                                   |
| -------- | ------------------------------------------------------------ |
| 参数定义 | ge: struct mpp_ge 结构体指针                                 |
| 返回值   | enum ge_mode枚举类型通过返回值可以获取GE是否工作在命令队列模式 |
| 注意事项 | 无                                                           |
```
#### 5.6.4. mpp_ge_add_dmabuf

```
int mpp_ge_add_dmabuf(struct mpp_ge *ge, int dma_fd);
```
```
| 功能说明 | 添加DMA buffer                                    |
| -------- | ------------------------------------------------- |
| 参数定义 | ge：struct mpp_ge 结构体指针dma_fd：dma buffer fd |
| 返回值   | 0：成功<0：失败                                   |
| 注意事项 | 无                                                |
```
#### 5.6.5. mpp_ge_rm_dmabuf

```
int mpp_ge_rm_dmabuf(struct mpp_ge *ge, int dma_fd);
```
```
| 功能说明 | 删除DMA buffer                                    |
| -------- | ------------------------------------------------- |
| 参数定义 | ge：struct mpp_ge 结构体指针dma_fd：dma buffer fd |
| 返回值   | 0：成功<0：失败                                   |
| 注意事项 | 无                                                |
```
#### 5.6.6. mpp_ge_fillrect

```
int mpp_ge_fillrect(struct mpp_ge *ge, struct ge_fillrect *fillrect);
```
```
| 功能说明 | 矩形填充                                                     |
| -------- | ------------------------------------------------------------ |
| 参数定义 | ge: struct mpp_ge结构体指针fillrect:struct ge_fillrect结构体指针 |
| 返回值   | 0：成功<0：失败                                              |
| 注意事项 | normal（非命令队列）模式此接口是同步的。命令队列模式此接口是异步的：（1）当用户态的缓存buffer足够时候仅把命令缓存在用户态（2）当用户态的缓存空间不够的时候，先通过write接口，把缓存的命令全部写入驱动，然后再把当前命令缓存到用户态buffer |
```
矩形填充在目标图像中指定一块矩形区域，填充颜色格式只能为ARGB8888格式， 在进行固定颜色填充的时候，不支持scaler，不支持90/180/270度旋转，不支持镜像， 填充的颜色可以和目标层进行alpha blending和color key。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ge_function_fill2.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ge_function_fill2.png)

图 67 *矩形填充*

#### 5.6.7. mpp_ge_bitblt

```
int mpp_ge_bitblt(struct mpp_ge *ge, struct ge_bitblt *blt);
```
```
| 功能说明 | 位块搬移                                                     |
| -------- | ------------------------------------------------------------ |
| 参数定义 | ge: struct mpp_ge结构体指针blt:struct ge_bitblt结构体指针    |
| 返回值   | 0：成功<0：失败                                              |
| 注意事项 | normal（非命令队列）模式此接口是同步的。命令队列模式此接口是异步的：（1）当用户态的缓存buffer足够时候仅把命令缓存在用户态（2）当用户态的缓存空间不够的时候，先通过write接口，把缓存的命令全部写入驱动，然后再把当前命令缓存到用户态buffer |
```
位块搬移可以分两种情况：

1. 原图的矩形区域搬移到目标图的矩形区域中不进行缩放

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ge_function_blit2.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ge_function_blit2.png)

图 68 *不进行缩放*

1. 原图的矩形区域搬移到目标图的矩形区域中同时进行放大或者缩小

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ge_function_stretchblit2.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ge_function_stretchblit2.png)

图 69 *进行缩放*

在进行位块搬移的同时可以进行alpha blending和color key，同时也支持90/180/270度旋转和镜像。

#### 5.6.8. mpp_ge_rotate

```
int mpp_ge_rotate(struct mpp_ge *ge, struct ge_rotation *rot);
```
```
| 功能说明 | 任意角度旋转                                                 |
| -------- | ------------------------------------------------------------ |
| 参数定义 | ge: struct mpp_ge结构体指针rot:struct ge_rotation结构体指针  |
| 返回值   | 0：成功<0：失败                                              |
| 注意事项 | normal（非命令队列）模式此接口是同步的。命令队列模式此接口是异步的：（1）当用户态的缓存buffer足够时候仅把命令缓存在用户态（2）当用户态的缓存空间不够的时候，先通过write接口，把缓存的命令全部写入驱动，然后再把当前命令缓存到用户态buffer |
```
进行任意角度旋转的时候可以进行alpha blending，并且可以指定原图和目标图的旋转中心，任意角度旋转原图和目标图都只支持RGB格式。 其中旋转角度传给驱动的是旋转角度的sin和cos值，为2.12定点数，其中小数部分12bits ，则应用程序计算sin和cos值的方法如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ge_function_rot12.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ge_function_rot12.png)

```
#include <stdio.h>
#include <math.h>

#define PI 3.14159265

#define SIN(x) (sin(x* PI / 180.0))
#define COS(x) (cos(x* PI / 180.0))

double degree = 30.0  // (0 <= degree < 360)
angle_sin = (int)(SIN(x) * 4096);
angle_cos = (int)(COS(x) * 4096);
// 应用程序也可以预先生成需要的角度的sin和cos值列表，通过查表减小计算量
```

#### 5.6.9. mpp_ge_emit

```
iint mpp_ge_emit(struct mpp_ge *ge);
```
```
| 功能说明 | 向驱动发送命令                                               |
| -------- | ------------------------------------------------------------ |
| 参数定义 | ge: struct mpp_ge结构体指针                                  |
| 返回值   | 0：成功<0：失败                                              |
| 注意事项 | normal（非命令队列）模式此接口为空，不产生任何作用命令队列模式此接口通过write接口，把用户态buffer中缓存的命令都写入驱动 |
```
#### 5.60. mpp_ge_sync

```
iint mpp_ge_sync(struct mpp_ge *ge);
```
```
| 功能说明 | 阻塞等待所有任务执行完成                                     |
| -------- | ------------------------------------------------------------ |
| 参数定义 | ge: struct mpp_ge结构体指针                                  |
| 返回值   | 0：成功<0：失败                                              |
| 注意事项 | normal（非命令队列）模式此接口为空，不产生任何作用命令队列模式此接口通过调用IOC_GE_SYNC接口，等待所有任务都完成 |
```
### 5.7. APP 参考

Demo代码见test-ge/ge_bitblt.c，如下

```
#include <signal.h>
#include <sys/time.h>
#include <linux/fb.h>
#include <artinchip/sample_base.h>
#include <video/artinchip_fb.h>
#include <linux/dma-buf.h>
#include <linux/dma-heap.h>
#include "mpp_ge.h"

#define FB_DEV              "/dev/fb0"
#define DMA_HEAP_DEV        "/dev/dma_heap/reserved"

static int g_screen_w = 0;
static int g_screen_h = 0;
static int g_fb_fd = 0;
static int g_fb_len = 0;
static int g_fb_stride = 0;
static unsigned int g_fb_format = 0;
static unsigned int g_fb_phy = 0;
unsigned char *g_fb_buf = NULL;

static const char sopts[] = "w:h:f:i:u";
static const struct option lopts[] = {
    {"width",       required_argument, NULL, 'w'},
    {"height",      required_argument, NULL, 'h'},
    {"format",      required_argument, NULL, 'f'},
    {"input",       required_argument, NULL, 'i'},
    {"usage",       no_argument,       NULL, 'u'},
};

static int fb_open(void)
{
    struct fb_fix_screeninfo fix;
    struct fb_var_screeninfo var;
    struct aicfb_layer_data layer;

    g_fb_fd = open(FB_DEV, O_RDWR);
    if (g_fb_fd == -1) {
        ERR("open %s", FB_DEV);
        return -1;
    }

    if (ioctl(g_fb_fd, FBIOGET_FSCREENINFO,&fix) < 0) {
        ERR("ioctl FBIOGET_FSCREENINFO");
        close(g_fb_fd);
        return -1;
    }

    if (ioctl(g_fb_fd, FBIOGET_VSCREENINFO,&var) < 0) {
        ERR("ioctl FBIOGET_VSCREENINFO");
        close(g_fb_fd);
        return -1;
    }

    if(ioctl(g_fb_fd, AICFB_GET_FB_LAYER_CONFIG,&layer) < 0) {
        ERR("ioctl FBIOGET_VSCREENINFO");
        close(g_fb_fd);
        return -1;
    }

    g_screen_w = var.xres;
    g_screen_h = var.yres;
    g_fb_len = fix.smem_len;
    g_fb_phy = fix.smem_start;
    g_fb_stride = layer.buf.stride[0];
    g_fb_format = layer.buf.format;

    g_fb_buf = mmap(NULL, g_fb_len,
            PROT_READ | PROT_WRITE, MAP_FILE | MAP_SHARED,
                g_fb_fd, 0);
    if (g_fb_buf == (unsigned char *)-1) {
        ERR("mmap framebuffer");
        close(g_fb_fd);
        g_fb_fd = -1;
        g_fb_buf = NULL;
        return -1;
    }

    DBG("screen_w = %d, screen_h = %d, stride = %d, format = %d\n",
            var.xres, var.yres, g_fb_stride, g_fb_format);
    return 0;
}

static void fb_close(void)
{
    if (!g_fb_buf) {
        munmap(g_fb_buf, g_fb_len);
    }
    if (g_fb_fd > 0)
        close(g_fb_fd);
}

static void usage(char *app)
{
    printf("Usage: %s [Options], built on %s %s\n", app,__DATE__,_TIME__);
    printf("\t-w, --width       image width\n");
    printf("\t-h, --height      image height\n");
    printf("\t-i, --input       need an argb8888 bmp \n");
    printf("\t-u, --usage\n\n");
    printf("Example: %s -w 480 -h 320 -i my.bmp\n", app);
}

static int dmabuf_request_one(int fd, int len)
{
    int ret;
    struct dma_heap_allocation_data data = {0};

    if (len < 0) {
        ERR("Invalid len %d\n", len);
        return -1;
    }

    data.fd = 0;
    data.len = len;
    data.fd_flags = O_RDWR;
    data.heap_flags = 0;
    ret = ioctl(fd, DMA_HEAP_IOCTL_ALLOC,&data);
    if (ret < 0) {
        ERR("ioctl() failed! errno: %d[%s]\n", errno, strerror(errno));
        return -1;
    }

    DBG("Get dma_heap fd: %d\n", data.fd);

    return data.fd;
}

static int draw_src_dmabuf(int dmabuf_fd, int fd, int len)
{
    unsigned char * buf = NULL;
    int ret = 0;

    buf = mmap(NULL, len, PROT_READ|PROT_WRITE, MAP_SHARED, dmabuf_fd, 0);
    if (buf == MAP_FAILED) {
        ERR("mmap() failed! errno: %d[%s]\n", errno, strerror(errno));
        return -1;
    }

    ret = read(fd, buf, len);
    if (ret != len) {
        ERR("read(%d) return %d. errno: %d[%s]\n", len,
            ret, errno, strerror(errno));
        return -1;
    }

    munmap(buf, len);
    return 0;
}

int main(int argc, char **argv)
{
    struct mpp_ge *ge = NULL;
    int ret = 0;
    int src_fd = -1;
    int src_dmabuf_fd = -1;
    int heap_fd = -1;
    int fsize = 0;
    int width = 176;
    int height = 144;
    struct ge_bitblt blt = {0};

    while ((ret = getopt_long(argc, argv, sopts, lopts, NULL)) != -1) {
        switch (ret) {
        case 'u':
            usage(argv[0]);
            goto EXIT;
        case 'w':
            width = str2int(optarg);
            continue;
        case 'h':
            height = str2int(optarg);
            continue;
        case 'i':
            src_fd = open(optarg, O_RDONLY);
            if (src_fd < 0) {
                ERR("Failed to open %s. errno: %d[%s]\n",
                    optarg, errno, strerror(errno));
                return -1;
            }
            fsize = lseek(src_fd, 0, SEEK_END);
            lseek(src_fd, 54, SEEK_SET);
            break;
        default:
            ERR("Invalid parameter: %#x\n", ret);
            goto EXIT;
        }
    }

    ge = mpp_ge_open();
    if (!ge) {
        ERR("open ge device\n");
        exit(1);
    }

    if (fb_open()) {
        fb_close();
        mpp_ge_close(ge);
        ERR("fb_open\n");
        exit(1);
    }

    heap_fd = open(DMA_HEAP_DEV, O_RDWR);
    if (heap_fd < 0) {
        ERR("Failed to open %s, errno: %d[%s]\n",
            DMA_HEAP_DEV, errno, strerror(errno));
        goto EXIT;
    }

    src_dmabuf_fd = dmabuf_request_one(heap_fd, fsize);
    if (src_dmabuf_fd < 0) {
        ERR("Failed to request dmabuf\n");
        goto EXIT;
    }

    draw_src_dmabuf(src_dmabuf_fd, src_fd, fsize - 54);
    mpp_ge_add_dmabuf(ge, src_dmabuf_fd);

    /* source buffer */
    blt.src_buf.buf_type = MPP_DMA_BUF_FD;
    blt.src_buf.fd[0] = src_dmabuf_fd;
    blt.src_buf.stride[0] = width * 4;
    blt.src_buf.size.width = width;
    blt.src_buf.size.height = height;
    blt.src_buf.format = MPP_FMT_ARGB_8888;

    blt.src_buf.crop_en = 0;

    /* dstination buffer */
    blt.dst_buf.buf_type = MPP_PHY_ADDR;
    blt.dst_buf.phy_addr[0] = g_fb_phy;
    blt.dst_buf.stride[0] = g_fb_stride;
    blt.dst_buf.size.width = g_screen_w;
    blt.dst_buf.size.height = g_screen_h;
    blt.dst_buf.format = g_fb_format;

    blt.ctrl.flags = GE_FLIP_H;

    blt.dst_buf.crop_en = 1;
    blt.dst_buf.crop.x = 0;
    blt.dst_buf.crop.y = 0;
    blt.dst_buf.crop.width = width;
    blt.dst_buf.crop.height = height;

    ret = mpp_ge_bitblt(ge,&blt);
    DBG("bitblt task:%d\n", ret);

    ret = mpp_ge_emit(ge);
    DBG("emit task:%d\n", ret);

    ret = mpp_ge_sync(ge);
    DBG("sync task:%d\n", ret);

    return ret;

EXIT:
    if (heap_fd > 0)
        close(heap_fd);

    if (ge)
        mpp_ge_close(ge);

    fb_close();
    return -1;
}
```

## 6. 常见问题

待完善