---
sidebar_position: 1
---

# MPP使用指南

## 1. 模块介绍

## 1.1. 术语定义

| 术语   | 定义                   | 注释说明                   |
| ------ | ---------------------- | -------------------------- |
| VE     | Video Engine           | 视频加速引擎               |
| MPP    | Media Process Platform | 通用多媒体处理软件平台     |
| packet | video bitstream packet | 一帧视频或图片码流数据     |
| frame  | frame                  | 一帧解码后的视频或图片数据 |

## 1.2. 模块简介

MPP(Media Process Platform)是 Artinchip 自主研发的通用多媒体处理软件平台，适用于 Artinchip 芯片系列。支持在 Linux 平台上运行， 屏蔽了Artinchip不同芯片平台多种多媒体硬件模块（VE、GE 等）版本的差异，为使用者提供简单易用的多媒体处理 API，支持多种多媒体解决方案。

目前支持硬件模块包括：

- VE：视频、图片编解码功能
- GE：2D图形加速

MPP在系统架构的层次图如下图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/mpp_system1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/mpp_system1-17066914716631.png)

图 6.43 *MPP系统框架层次图*

- - 硬件层 Hardware

    硬件层是 Artinchip 系列芯片平台的多媒体硬件加速引擎 VE/GE。VE 模块硬件层接口请参考芯片用户手册 VE 模块GE 模块硬件层接口请参考芯片用户手册 GE 模块

- - MPP 内核空间层

    包括 VE/GE 模块驱动，MPP Heap 内存管理框架。VE 模块驱动请参考 [VE 使用指南](../ve/index.html#ref-luban-ve)GE 模块驱动请参考 [GE 使用指南](../ge/index.html#ref-luban-ge)

- - MPP 用户空间层

    MPP 用户态程序，包括 视频解码 mpp_decoder、视频编码 mpp_encoder、2D图像处理 mpp_ge 等功能模块。

- - 应用层

    分为两部分：提供简易播放器应用 mpp_player; 对接第三方开源库 openmax、gstreamer、lvgl等。

# 2. 参数配置

## 2.1. 内核配置

MPP 依赖 VE 驱动，MPP Heap 内存管理框架，请在 MPP 编译前进行配置。



### 2.1.1. MPP Heap

ArtInChip 平台使用 DMA-BUF 来实现多媒体模块间的 buffer 共享。对于 DMA-BUF，Kernel 提供 System Heap 和 CMA Heap 两个 exporter。 前者直接申请匿名页面，后者则在 CMA 内存中申请页面。

虽然通过这两个 exporter 都能拿到足够的物理连续内存，但它们在系统长时间运行后，都面临内存碎片化问题。特别是在 64 M 小内存方案中，碎片化问题尤为严重。

为了 **解决内存碎片化** 的问题，ArtInChip 基于 CMA Heap 进行封装，提供一个私有的 exporter ，即 **MPP Heap** 。

在 luban 根目录下执行 make kernel-menuconfig，进入 kernel 的功能配置，按如下选择：

```
Linux
    Device Drivers  --->
        DMABUF options --->
            [*] Explicit Synchronization Framework
            [*]   Sync File Validation Framework
            [*] userspace dmabuf misc driver
            [ ] Move notify between drivers (EXPERIMENTAL)
            < > Selftests for the dma-buf interfaces
            [*] DMA-BUF Userland Memory Heaps  --->
                [ ]   DMA-BUF System Heap
                [*]   DMA-BUF CMA Heap
                [*]   DMA-BUF MPP Heap
```

MPP Heap 在 CMA 内存中申请一大块物理连续内存，使用 genpool 算法进行管理，提供给 MPP 中间件专用，其大小配置：

```
Linux
    Library routines  --->
        [*] DMA Contiguous Memory Allocator
        [ ]   Enable separate DMA Contiguous Memory Area for each NUMA Node
        *** Default contiguous memory area size: ***
        (16)  Size in Mega Bytes
        (8)   Size in Mega Bytes for MPP Heap
```

在上述例子中，系统预留了 16M CMA 内存，MPP Heap 再从 16M CMA 内存中申请 8M。

因为 MPP Heap 的内存是从 CMA 中申请的，前者是后者的子集，所以 MPP Heap 的 size 要小于 CMA 的 size。

注解

为了兼顾系统中其他需要物理连续内存的模块，不能将 CMA 内存全部分配给 MPP Heap，分配数值设置可参考 [mpp heap 设置](5_design_guide.html#ref-mpp-heap-size)。

### 2.1.2. VE 驱动

VE 模块驱动配置请参考 VE 使用指南 [内核配置](../ve/2_config_guide.html#ref-ve-config)

## 2.2. DTS 参数配置

VE 模块 DTS 配置请参考 VE 使用指南 [内核配置](../ve/2_config_guide.html#ref-ve-config)

# 3. 调试指南

## 3.1. 调试开关

### 3.1.1. MPP调试

MPP调试log等级分为ERROR, WARNING, INFO, DEBUG, VERBOSE。通过LOGL_DEFAULT定义MPP全局的log等级。 默认log等级为INFO。

源文件路径：aic-mpp/base/log.h

```
enum log_level {
    LOGL_ERROR = 0,
    LOGL_WARNING,
    LOGL_INFO,
    LOGL_DEBUG,
    LOGL_VERBOSE,

    LOGL_COUNT,

    LOGL_DEFAULT = LOGL_INFO,
    LOGL_FORCE_DEBUG = 0x10,
};
```

### 3.1.2. 子模块调试

打开子模块调试log方式，在子模块中添加：

```
#define LOG_DEBUG
```

### 3.1.3. MPP Heap 调试

打开 MPP Heap 调试开关，可查看 MPP 中间件对预留内存的使用情况。

在 luban 根目录下执行 make kernel-menuconfig，进入 kernel 的功能配置，按如下选择：

```
Linux
    Memory Management options  --->
        [*]   MPP debugfs interface
```

系统启动后挂载 debugfs

```
mount -t debugfs none /sys/kernel/debug/
```

通过查看 mpp 目录下的节点，即可获取 mpp heap 的内存使用情况

```
# cd /sys/kernel/dedbug/mpp/
# ls
bitmap    count     maxchunk  used
# cat count
2048
# cat used
600
# cat maxchunk
1448
# cat bitmap
4294967295 4294967295 4294967295 4294967295 4294967295 4294967295 4294967295 4294967295 4294967295 4294967295
4294967295 4294967295 4294967295 4294967295 4294967295 4294967295 4294967295 4294967295 16777215 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
```

- count : MPP Heap 中包含的 page 总数
- used : MPP Heap 中已被申请的 page 总数
- maxchunk : MPP Heap 中还能申请到最大的连续 page 总数
- bitmap : MPP Heap 中记录 page 状态的 bitmap

一个 page 大小为 4K ， bitmap 节点打印输出十进制数据。

4294967295 转换为十六进制为 `0xFFFFFFFF` ， 二进制为 `0b11111111111111111111111111111111` 。 一个 bit 表示一个 page 的状态，1 表示已被申请，0 表示空闲。4294967295 表示 32 个 page 全部被占用，总共 32 * 4K 大小。

小技巧

实际调试时要注意大小端问题。

# 4. 测试指南

## 4.1. 运行测试用例

### 4.1.1. mpp_test

mpp_test 的主要功能是测试 mpp_decoder 接口，解码视频或图片文件并通过 display 接口显示在屏幕上。

目前支持 h264, jpg，png 的解码和显示，使用方式如下：

```
[aic@] # mpp_test -h
Usage: mpp_test [options]:
    -i                             input stream file name
    -t                             directory of test files
    -d                             display the picture
    -c                             enable compare output data
    -f                             output pixel format
    -l                             loop time
    -s                             save output data
    -h                             help

Example1(test single file): mpp_test -i test.264
Example2(test some files) : mpp_test -t /usr/data/
```

### 4.1.2. pic_test

pic_test 的主要功能是测试 JPEG/PNG 图片解码和显示，相比于 mpp_test 代码更加精简。

```
[aic@] # pic_test -h
Usage: dec_test [options]

Options:
-i                             input stream file name
-h                             help
```

# 5. 设计说明

## 5.1. 源码说明

在 luban 的根目录下通过 make menuconfig 打开 aic-mpp，并进行编译。

```
Artinchip packages  --->
    [*] aic-mpp
```

源文件目录：

```
aic-mpp$ tree
.
├── base             // 公共模块：包括内存分配和链表等基础功能
│   ├── memory
├── ge              // 2D 图形加速模块
├── ve              // 编解码器模块
|   ├── include     // ve 模块头文件
│   ├── common      // 编解码器公共组件
|   ├── decoder
│        ├── h264   // h.264 解码模块
│        ├── jpeg   // jpg 解码模块
│        └── png    // png 解码模块
├── include         // mpp 对外头文件
├── mpp_test        // mpp 测试用例
```

## 5.2. 模块架构

### 5.2.1. MPP 软件框架

mpp 软件框图如下所示：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/mpp_framework1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/mpp_framework1-17066995071203.png)

图 6.44 *mpp 软件框架*[¶](#id12)

分为三个部分：

> - mpp_decoder，实现h264、jpeg、png等解码功能
> - mpp_encoder，实现jpeg编码（功能还未完成）。
> - mpp_ge，实现2D图形加速功能

## 5.3. mpp_decoder 设计以及接口说明

mpp_decoder 由三个主要模块组成：

- 解码模块（H264、JPEG、PNG等）：负责将码流数据解码成视频图像
- 输入码流数据管理模块（Packet manager）：负责视频、图片码流数据和 buffer 的管理
- 显示帧管理模块（Frame manager）：负责解码图像 buffer 的管理

### 5.3.1. packet 管理机制

Packet manager 负责管理码流数据和 buffer。初始化时，该模块申请一块物理连续的内存（buffer大小可由外部配置），用于存放视频/图片码流数据。

Packet manager 管理的数据单元为 packet，packet 表示一笔码流数据，它可以是完整的一帧数据，也支持不是完整的一帧数据。 每个 packet 与物理内存中的码流数据一一对应，它记录了每一笔码流的物理内存基地址、物理内存结束地址、物理内存偏移、虚拟内存地址、码流数据长度等信息。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/packet_manager1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/packet_manager1-17066995321425.png)

图 6.45 *packet管理*

packet 通过 empty list 和 ready list 两个链表进行管理。 其中，empty list 用于存放空闲的 packet，ready list 用于存放待解码的 packet。

送码流数据时，从 empty list 获取一个空闲 packet，填充数据后，再把 packet 放入 ready list；

解码前，解码器从 ready list 获取一个填充数据的 packet，使用完后再把该 packet 放入 empty list。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/pm_flow1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/pm_flow1-17066995412247.png)

图 6.46 *packet manager 调用流程*

### 5.3.2. frame 管理机制

Frame manager 负责管理图像 buffer。Frame manager 内部通过两个链表来管理图像 buffer：empty list 和 render list。 其中，empty list 存放可以给解码输出使用的图像 buffer，render list 存放解码完成但还未显示的图像 buffer。 在运行过程中，正在显示的图像 buffer 和用于参考的图像 buffer 可能不在这两个 list 中。

1. frame 状态迁移

初始化时，该模块申请指定个数的图像 buffer（个数可由外部配置），每个图像 buffer 的信息存放在内部数组中。 每个图像 buffer 有4种状态：

- Decoding: 该帧正在被解码器使用（用于解码输出或作为参考帧）
- wait_render: 该帧在 render list 中，等待显示
- Rendering: 该帧正在被显示占用
- IDLE: 该帧处于空闲状态（既没有被显示占用，也没有被解码器用作参考帧）

其状态转移如下图所示：

- 初始化时，所有图像 buffer 都在 empty list 中，此时处于 IDLE 状态；
- 解码模块从 empty list 链表头部获取一个空图像 buffer，此时 buffer 被解码模块占用，从 IDLE 状态变为 Decoding 状态;
- 解码完成后，解码模块还图像数据。此时分两种情况：
  - 1）如果当前帧还未被显示，该帧加入 render list 链表尾部，从 Decoding 状态变为 wait render 状态；
  - 2）该帧不再用做参考帧且已显示完成，此时该帧加入 empty list 链表尾部，由 Decoding 状态进入 IDLE 状态；
- 显示模块从 render list 链表头部取一帧图像，此时当前帧由 wait render 状态进入 Rendering 状态；
- 显示模块还图像 buffer，分两种情况：
  - 1）如果当前帧不用于参考，此时由 Rendering 状态回到IDLE状态，该帧加入 empty list 链表尾部；
  - 2）如果当前帧用于参考，此时由 Rendering 状态进入Decoding状态，该图像 buffer 不进入任何队列，等待解码器还参考帧；

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/frame_status1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/frame_status1-17066995677329.png)

图 6.47 *frame状态迁移*

1. frame manager 调用流程

对于 JPEG、PNG 这类没有参考帧概念的编码格式，每一帧的状态是唯一的，解码后的数据帧可直接送 render list

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/frame_manager_jpeg1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/frame_manager_jpeg1-170669957657011.png)

图 6.48 *frame manager 调用流程（JPEG/PNG）*)

但对于 H264 这类有参考帧的编码格式，解码后的视频帧可能既被显示占用也会被解码器用作参考帧，并且由于双向参考帧的存在， 视频帧需要重排序后才能送显示。 不同于JPG，H264 解码库内部存在一个 delay list 用于为显示帧重排序。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/frame_manager_2641.png](https://photos.100ask.net/artinchip-docs/d213-devkit/frame_manager_2641-170669959339213.png)

图 6.49 *frame manager 调用流程（H264）*

### 5.3.3. 物理连续内存使用情况

H264 解码所需的物理连续内存如下所示：

| 内存占用模块                      | 计算方式                            | 说明                                                         |
| --------------------------------- | ----------------------------------- | ------------------------------------------------------------ |
| 输入码流                          |                                     | 大小由应用层配置                                             |
| 输出帧                            | width*height*3/2*frame_num          | frame_num至少需要（参考帧个数+1）个显示占用个数可由应用层通过struct decode_config结构体中的extra_frame_num 配置 |
| 帧内预测(需要上一行数据)          | 帧格式：width*2MBAFF：width*4       |                                                              |
| 宏块信息                          | 固定12K                             |                                                              |
| dblk模块(上一个宏块行最后4行数据) | 帧格式：width*8MBAFF：width*16      |                                                              |
| co-located信息                    | 固定68K                             |                                                              |
| 每一帧co-located数据缓存          | (width/16)*(height/16)*32*frame_num |                                                              |

注解

co-located 两个buffer，I、P帧解码时会往buffer里写数据，B 帧解码时从buffer读数据。 如果当前码流中没有 B 帧，这两块内存也需要申请。

### 5.3.4. mpp_decoder 调用流程

在调用 mpp_decoder 的解码函数时，解码模块从 Packet manager 取一笔码流，同时从 Frame maneger 取一个空闲图像 buffer，对码流进行解码 并输出图像到图像 buffer。

解码后，解码模块将码流 buffer 归还 Packet manager，将解码图像 buffer 归还 Frame maneger。

为保证解码效率，建议调用者创建3个线程实现解码功能：

- - send data thread

    通过 mpp_decoder_get_packet 和 mpp_decoder_put_packet 这两个接口把码流数据送到 packet 管理模块

- - decode thread

    通过调用 mpp_decoder_decode 控制解码，解码库从 packet 管理模块取一笔码流数据，解码完成后，将视频帧送入 frame 管理模块

- - render thread

    通过 mpp_decoder_get_frame 和 mpp_decoder_put_frame 两个接口从 frame 管理模块获取视频帧，并控制该帧显示时机

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/mpp_decoder_flow1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/mpp_decoder_flow1-170669962555915.png)

图 6.50 *mpp_decoder 调用流程*

### 5.3.5. mpp_decoder 数据结构

#### 5.3.5.1. struct decode_config

```
struct decode_config {
    enum mpp_pixel_format pix_fmt;  // output pixel format
    int bitstream_buffer_size;      // bitstream buffer size in pm
    int packet_count;               // packet number in pm
    int extra_frame_num;            // extra frame number in fm
};
```

decode_config 结构体用于配置解码器初始化使用的参数。

- pix_fmt 表示解码输出的颜色格式
- bitstream_buffer_size 表示存放输入码流缓存的总长度
- packet_count 表示 packet manager 中 packet 的最大个数
- extra_frame_num 表示解码器额外分配的帧个数，主要用于缓存显示帧以保证显示平滑。

#### 5.3.5.2. struct mpp_packet

```
struct mpp_packet {
    void *data;
    int size;
    long long pts;
    unsigned int flag;
};
```

mpp_packet 结构体用于表示输入码流信息。

- data 表示码流数据存放的起始地址
- size 表示该笔码流数据长度
- pts 表示该笔码流的时间戳
- flag 表示该笔码流的标记位，目前仅用于确定该码流是否为最后一笔码流（PACKET_FLAG_EOS）

#### 5.3.5.3. struct mpp_frame

```
struct mpp_size {
    int width;
    int height;
};
struct mpp_rect {
    int x;
    int y;
    int width;
    int height;
};
enum mpp_buf_type {
    MPP_DMA_BUF_FD,
    MPP_PHY_ADDR,
};

struct mpp_buf {
    enum mpp_buf_type       buf_type;
    union {
            int             fd[3];
            unsigned int    phy_addr[3];
    };
    unsigned int            stride[3];
    struct mpp_size         size;
    unsigned int            crop_en;
    struct mpp_rect         crop;
    enum mpp_pixel_format   format;
    unsigned int            flags;
};
```

- buf_type：表示 mpp_buf 类型，以 fd 方式 MPP_DMA_BUF_FD 或 以物理地址方式 MPP_PHY_ADDR；
- fd[3]：表示 buffer 三个分量的 fd
- phy_addr[3]：表示 buffer 三个分量的物理地址
- stride[3]：表示 buffer 三个分量的 stride
- size：表示 buffer 的宽、高
- crop_en： 表示该 buffer 是否需要 crop
- crop：表示该 buffer 的 crop 信息
- format： 表示该 buffer 的颜色格式类型

```
struct mpp_frame {
    struct mpp_buf          buf;
    long long               pts;
    unsigned int            id;
    unsigned int            flags;
};
```

- buf：表示 mpp_frame 的 buffer 信息
- pts：表示 mpp_frame 的时间戳
- id：表示 mpp_frame 的唯一标识
- flags：表示 mpp_frame 的标志位

#### 5.3.5.4. enum mpp_dec_errno

```
enum mpp_dec_errno {
    DEC_ERR_NOT_SUPPORT         = 0x90000001,
    DEC_ERR_NO_EMPTY_PACKET     = 0x90000002, // no packet in empty list
    DEC_ERR_NO_READY_PACKET     = 0x90000003, //
    DEC_ERR_NO_EMPTY_FRAME      = 0x90000004, //
    DEC_ERR_NO_RENDER_FRAME     = 0x90000005, //
    DEC_ERR_NULL_PTR            = 0x90000006,
    DEC_ERR_FM_NOT_CREATE       = 0x90000006,
};
```

- DEC_ERR_NOT_SUPPORT：该码流不支持
- DEC_ERR_NO_EMPTY_PACKET：packet manager 中缺少空闲的 packet，可能是解码速度小于送 packet 速度，此时需要等待一段时间；
- DEC_ERR_NO_READY_PACKET：packet manager 中缺少填好码流数据的 packet，可能是送 packet 速度小于解码速度，此时需要等待一段时间；
- DEC_ERR_NO_EMPTY_FRAME：frame manager 中缺少空闲的 frame，表示所有帧都处于使用状态，通常是解码速度大于显示速度导致，此时需要等待一段时间；
- DEC_ERR_NO_RENDER_FRAME：frame manager 中缺少待显示的 frame，表示所有帧都处于空闲状态，通常是解码速度小于显示速度导致，此时需要等待一段时间；
- DEC_ERR_NULL_PTR：表示接口函数输入参数存在空指针
- DEC_ERR_FM_NOT_CREATE：表示在获取待显示 frame 时 frame manager 还未创建

#### 5.3.5.5. enum mpp_codec_type

```
enum mpp_codec_type {
    MPP_CODEC_VIDEO_DECODER_H264 = 0x1000,         // decoder
    MPP_CODEC_VIDEO_DECODER_MJPEG,
    MPP_CODEC_VIDEO_DECODER_PNG,

    MPP_CODEC_VIDEO_ENCODER_H264 = 0x2000,         // encoder
};
```

mpp_codec_type 枚举类型表示支持的编解码格式。

#### 5.3.5.6. enum mpp_dec_cmd

```
enum mpp_dec_cmd {
    MPP_DEC_INIT_CMD_SET_EXT_FRAME_ALLOCATOR,            // frame buffer allocator
    MPP_DEC_INIT_CMD_SET_ROT_FLIP_FLAG,
    MPP_DEC_INIT_CMD_SET_SCALE,
    MPP_DEC_INIT_CMD_SET_CROP_INFO,
    MPP_DEC_INIT_CMD_SET_OUTPUT_POS,
};
```

- MPP_DEC_INIT_CMD_SET_EXT_FRAME_ALLOCATOR：表示由外部设置帧 buffer 分配器
- MPP_DEC_INIT_CMD_SET_ROT_FLIP_FLAG: 表示设置旋转、镜像后处理，只用于JPEG
- MPP_DEC_INIT_CMD_SET_SCALE： 表示设置缩放系数，只用于JPEG
- MPP_DEC_INIT_CMD_SET_CROP_INFO：表示设置输出 crop 信息
- MPP_DEC_INIT_CMD_SET_OUTPUT_POS：表示设置解码图像在输出缓存的位置

### 5.3.6. mpp_decoder 接口设计

接口如下 :

```
struct decode_config {
    enum mpp_pixel_format pix_fmt;  // output pixel format
    int bitstream_buffer_size;      // bitstream buffer size in pm
    int packet_count;               // packet number in pm
    int extra_frame_num;            // extra frame number in fm
};

struct mpp_decoder* create_mpp_decoder(enum mpp_codec_type type);
void destory_mpp_decoder(struct mpp_decoder* decoder);
int mpp_decoder_init(struct mpp_decoder *decoder, struct decode_config *config);
int mpp_decoder_decode(struct mpp_decoder* decoder);
int mpp_decoder_control(struct mpp_decoder* decoder, int cmd, void *param);
int mpp_decoder_reset(struct mpp_decoder* decoder);
int mpp_decoder_get_packet(struct mpp_decoder* decoder, struct mpp_packet* packet, int size);
int mpp_decoder_put_packet(struct mpp_decoder* decoder, struct mpp_packet* packet);
int mpp_decoder_get_frame(struct mpp_decoder* decoder, struct mpp_frame* frame);
int mpp_decoder_put_frame(struct mpp_decoder* decoder, struct mpp_frame* frame);
```

#### 5.3.6.1. mpp_decoder_create

| 函数原型 | struct mpp_decoder* mpp_decoder_create(enum mpp_codec_type type) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 创建mpp_decoder对象                                          |
| 参数定义 | type: 解码器类型                                             |
| 返回值   | mpp_decoder对象                                              |
| 注意事项 |                                                              |

#### 5.3.6.2. mpp_decoder_destory

| 函数原型 | void mpp_decoder_destory(struct mpp_decoder* decoder) |
| -------- | ----------------------------------------------------- |
| 功能说明 | 销毁mpp_decoder对象                                   |
| 参数定义 | decoder: mpp_decoder对象                              |
| 返回值   | 无                                                    |
| 注意事项 |                                                       |

#### 5.3.6.3. mpp_decoder_init
```
| 函数原型 | int mpp_decoder_init(struct mpp_decoder *decoder, struct decode_config *config) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 初始化解码器                                                 |
| 参数定义 | decoder: mpp_decoder对象config：解码器的配置参数             |
| 返回值   | 0:成功<0:失败                                                |
| 注意事项 |                                                              |
```
#### 5.3.6.4. mpp_decoder_decode
```
| 函数原型 | int mpp_decoder_decode(struct mpp_decoder* decoder) |
| -------- | --------------------------------------------------- |
| 功能说明 | 解码一笔数据                                        |
| 参数定义 | decoder: mpp_decoder对象                            |
| 返回值   | 0:成功<0:失败                                       |
| 注意事项 |                                                     |
```
#### 5.3. mpp_decoder_control
```
| 函数原型 | int mpp_decoder_control(struct mpp_decoder* decoder, int cmd, void* param) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 向mpp_decoder对象发送控制命令                                |
| 参数定义 | decoder: mpp_decoder对象cmd: 控制命令类型param: 控制参数     |
| 返回值   | 0:成功<0:失败                                                |
| 注意事项 |                                                              |
```
#### 5.3.6.6. mpp_decoder_reset
```
| 函数原型 | int mpp_decoder_reset(struct mpp_decoder* decoder) |
| -------- | -------------------------------------------------- |
| 功能说明 | 重置mpp_decoder对象                                |
| 参数定义 | decoder: mpp_decoder对象                           |
| 返回值   | 0:成功<0:失败                                      |
| 注意事项 |                                                    |
```
#### 5.3.6.7. mpp_decoder_get_packet
```
| 函数原型 | int mpp_decoder_get_packet(struct mpp_decoder* decoder, struct mpp_packet* packet, int size) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 获取一个写码流数据的packet                                   |
| 参数定义 | decoder: mpp_decoder对象packet:码流数据结构指针size:上层应用申请packet的buffer大小 |
| 返回值   | 0:成功<0:失败                                                |
| 注意事项 |                                                              |
```
#### 5.3.6.8. mpp_decoder_put_packet
```
| 函数原型 | int mpp_decoder_put_packet(struct mpp_decoder* decoder, struct mpp_packet* packet) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 归还码流数据的packet对象                                     |
| 参数定义 | decoder: mpp_decoder对象packet:码流数据结构指针              |
| 返回值   | 0:成功<0:失败                                                |
| 注意事项 |                                                              |
```
#### 5.3.6.9. mpp_decoder_get_frame
```
| 函数原型 | int mpp_decoder_get_frame(struct mpp_decoder* decoder, struct mpp_frame* frame) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 获取一个视频帧对象                                           |
| 参数定义 | decoder: mpp_decoder对象frame:视频帧数据结构指针             |
| 返回值   | 0:成功<0:失败                                                |
| 注意事项 |                                                              |
```
#### 5.3.6.10. mpp_decoder_put_frame
```
| 函数原型 | int mpp_decoder_put_frame(struct mpp_decoder* decoder, struct mpp_frame* frame) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 归还视频帧对象                                               |
| 参数定义 | decoder: mpp_decoder对象frame:视频帧数据结构指针             |
| 返回值   | 0:成功<0:失败                                                |
| 注意事项 |                                                              |
```
### 5.3.7. mpp_decoder 参考demo

以下 demo 为基本流程调用，具体实现可以参考代码 mpp/mpp_test/picture_decoder_test.c

```
//* 1.创建 mpp_decoder 对象
struct mpp_decoder* dec = mpp_decoder_create(type);

struct decode_config config;
config.bitstream_buffer_size = (file_len + 1023) & (~1023);
config.extra_frame_num = 0;
config.packet_count = 1;
config.pix_fmt = MPP_FMT_ARGB_8888;

//* 2. 初始化 mpp_decoder
mpp_decoder_init(dec, &config);

//* 3. 获取一个空的packet
struct mpp_packet packet;
memset(&packet, 0, sizeof(struct mpp_packet));
mpp_decoder_get_packet(dec, &packet, file_len);

//* 4. 把视频码流数据拷贝到 packet
fread(packet.data, 1, file_len, fp);
packet.size = file_len;
packet.flag = PACKET_FLAG_EOS;

//* 5. 归还 packet
mpp_decoder_put_packet(dec, &packet);

//* 6. 解码该笔码流数据
mpp_decoder_decode(dec);

//* 7. 获取解码后视频帧数据
struct mpp_frame frame;
memset(&frame, 0, sizeof(struct mpp_frame));
mpp_decoder_get_frame(dec, &frame);

//* 8. 显示该视频帧
// render_frame...

//* 9. 归还该视频帧
mpp_decoder_put_frame(dec, &frame);

//* 10. 销毁 mpp_decoder
mpp_decoder_destory(dec);
```

## 5.4. mpp_encoder 设计及接口说明

mpp_encoder 目前只支持 JPEG 图片编码。

### 5.4.1. 接口设计

#### 5.4.1.1. mpp_encode_jpeg
```
| 函数原型 | int mpp_encode_jpeg(struct mpp_frame* frame, int quality, int dma_buf_fd, int buf_len, int* len) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 编码一帧 JPEG 图片                                           |
| 参数定义 | frame: 待编码的原始 YUV 数据quality: 编码质量，取值范围1~100，1表示编码图片质量最差，100表示最好dma_buf_fd：输出 JPEG 图片存放的 dma-buf fdbuf_len：输出 JPEG 图片 dma-buf 的长度len: 输出 JPEG 图片的真实大小 |
| 返回值   | 0: 成功<0:失败                                               |
| 注意事项 |                                                              |
```
小技巧

输出 JPEG 图片的缓存 buffer 由调用者申请，但调用者并不知道编码后图片的实际大小， 为避免 VE 写输出数据时越界，该 buffer 需要预先申请较大的内存。

### 5.4.2. mpp_encoder 参考demo

以下 demo 为基本流程调用，具体实现可以参考代码 mpp/mpp_test/jpeg_encoder_test.c

```
//* 1. 获取 dma-buf device 句柄
int dma_fd = dmabuf_device_open();

//* 2. 设置输入 YUV 数据结构体
struct mpp_frame frame;
// ....

//* 3. 申请编码输出 buffer
int len = 0;
int buf_len = width * height * 4/5 * quality / 100;
int jpeg_data_fd = dmabuf_alloc(dma_fd, buf_len);

//* 4. 编码 JPEG 图片
mpp_encode_jpeg(&frame, quality, jpeg_data_fd, buf_len, &len)；

//* 5. 保存编码后 JPEG 图片
unsigned char* jpeg_vir_addr = dmabuf_mmap(jpeg_data_fd, buf_len);
FILE* fp_save = fopen("/save.jpg", "wb");
fwrite(jpeg_vir_addr, 1, len, fp_save);
fclose(fp_save);

//* 6. 释放资源
dmabuf_munmap(jpeg_vir_addr, buf_len);
dmabuf_free(jpeg_data_fd);
dmabuf_device_close(dma_fd);
```

## 5.5. mpp_ge 接口说明

mpp_ge 接口说明请参考 [MPP对GE接口的封装](../ge/5_design_guide.html#ref-luban-mpp-ge)

## 5.6. mpp heap 设计及说明

Mpp Heap 负责管理 mpp 中间件独占的 CMA 内存，并在 mpp 中间件需要物理内存时，将内存页面导出为 DMA-BUF。

### 5.6.1. mpp heap 特点

**解决内存碎片化**

CMA 内存允许多媒体模块和系统复用，在这种情况下，内存碎片化的情况不可避免（部分内存页面可能会被系统 pin 住，无法迁移）。而 mpp heap 管理的内存能确保只被 mpp 中间件使用，避免了内存页面被 pin 住而导致碎片化的问题。

- mpp heap 的内存需要在用户态通过 `/dev/dmabuf/mpp` 节点来申请，这个节点是 ArtInChip 平台扩展的私有节点，只有 mpp 中间件会访问。
- 对于系统来说，该块内存已被 alloc，系统不会再去访问，因此能达到 mpp 中间件独占的效果。

小技巧

只要在调用 mpp 中间件的过程中，只要做到资源的申请与释放一一对应，就能解决内存碎片化问题。

**允许系统回收 mpp heap 内存**

mpp heap 管理的内存通过 `cma_alloc` 申请，在系统内存资源紧张，而又不需要 mpp 中间件的情况下 （例如 OTA 升级），允许通过销毁 mpp heap 释放 CMA 内存给系统使用。

注解

mpp heap 一旦销毁，无法再次初始化，只能 reboot 系统。

### 5.6.2. mpp heap init

初始化时，MPP Heap 从 CMA 内存中申请一大块物理连续内存，并创建一个 genpool 内存池进行管理。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/mpp_heap_init.png](https://photos.100ask.net/artinchip-docs/d213-devkit/mpp_heap_init-170669984075717.png)

图 6.51 *mpp_heap 初始化*

### 5.6.3. mpp heap export[¶](#mpp-heap-export)

mpp heap 通过 `/dev/dmabuf/mpp` 节点，以 `ioctl` 的方式将管理的 CMA 内存导出为标准的 DMA-BUF 文件句柄。

genpool 内存池是一个基于 bitmap 的管理算法，其最小分配单位为 4K，分配的内存无论 **首地址** 还是 **大小** ，都遵循 `4K` 对齐。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/mpp_heap_export.png](https://photos.100ask.net/artinchip-docs/d213-devkit/mpp_heap_export-170669984741119.png)

图 6.52 *mpp_heap 导出 DMA-BUF*

### 5.6.4. mpp heap close[¶](#mpp-heap-close)

只需要 `close` DMA-BUF 的文件句柄，即触发 mpp heap 的回收 DMA-BUF。

注解

当一块 DMA-BUF 还被多媒体模块占用时，close 操作无法触发 mpp heap 回收

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/mpp_heap_close.png](https://photos.100ask.net/artinchip-docs/d213-devkit/mpp_heap_close-170669986798021.png)

图 6.53 *mpp_heap 回收 DMA-BUF*

### 5. mpp heap destroy

通过 `/dev/dmabuf/mpp` 节点，下发扩展的 `ioctl` 接口即可销毁 MPP Heap, 将其中的 CMA 内存归还改系统。

mpp heap 一旦被销毁，无法再次初始化，只能 reboot。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/mpp_heap_destroy.png](https://photos.100ask.net/artinchip-docs/d213-devkit/mpp_heap_destroy-170669988289623.png)

图 6.54 *mpp heap 销毁*

### 5.6.6. mpp heap 接口

接口如下 :

```
int dmabuf_device_open();
void dmabuf_device_close(int dma_fd);
void dmabuf_device_destroy(int dma_fd);
int dmabuf_alloc(int dma_fd, int size);
```
```
| 函数原型 | int dmabuf_device_open() |
| -------- | ------------------------ |
| 功能说明 | 获取 mpp heap 的文件句柄 |
| 参数定义 | void                     |
| 返回值   | dma_fd:成功<0:失败       |
| 注意事项 |                          |
```
| 函数原型 | void dmabuf_device_close(int dma_fd) |
| -------- | ------------------------------------ |
| 功能说明 | 释放 mpp heap 的文件句柄             |
| 参数定义 | dma_fd: mpp heap 的文件句柄          |
| 返回值   | void                                 |
| 注意事项 |                                      |

| 函数原型 | void dmabuf_device_destroy(int dma_fd)           |
| -------- | ------------------------------------------------ |
| 功能说明 | 销毁 mpp heap                                    |
| 参数定义 | dma_fd: mpp heap 的文件句柄                      |
| 返回值   | void                                             |
| 注意事项 | mpp heap 一旦被销毁，无法再次初始化，只能 reboot |
```
| 函数原型 | int dmabuf_alloc(int dma_fd, int size)        |
| -------- | --------------------------------------------- |
| 功能说明 | 通过 mpp heap 申请一块 DMA-BUF                |
| 参数定义 | dma_fd: mpp heap 的文件句柄size: DMA-BUF size |
| 返回值   | DMA-BUF fd:成功<0:失败                        |
| 注意事项 |                                               |
```


### 5.6.7. mpp heap 设置

mpp heap 管理的内存必须满足视频播放的最大需求。

视频播放内存可由 [`视频播放内存统计表格`](../../../_downloads/8db0ff5ddffd480ed46bdfb4ca60868d/video_memory.xlsx) 得到结果。

mpp heap 中的内存从 CMA 预留内存中申请，但 CMA 内存不能只为 mpp heap 预留，还需要为 其他需要物理连续内存的模块预留，主要是显示，音频和通讯模块。

注解

如果 mpp heap 的 size 或 CMA 预留内存的 size 设置不合理，不仅影响 mpp heap 初始化，还可能影响其他模块运行。

**显示模块**

以 fb0 为 32 位 argb8888 格式，外接分辨率为 1024x600 的 LCD 为例：

单 buffer 场景下需要 1024 * 600 * (32 / 8) = 2457600 byte, 约 `2.4M` CMA 内存

双 buffer 场景下则需要 `4.8M`

**音频模块**

启用 ALSL 的场景下需要为音频模块预留 `1.5M` CMA 内存

在 ALSL 加 I2S 的场景下则需要 `2.5M` CMA 内存

**通讯模块**

WIFI, Bluetooth, USB 等通讯模块也会占用部分 CMA 内存，这个要根据实际场景进行推算。

小技巧

CMA 预留内存的大小 >= mpp heap + 其他模块，同时 CMA 预留内存大小遵循 `4M` 对齐。 为确保系统正常运行，在设置 CMA 预留内存时要保有一定的余量。

# 6. 常见问题

## 6.1. VE驱动未加载

请查看VE使用指南 [VE驱动未加载](../ve/6_faq.html#ref-ve-insmod)

## 6.2. 解码图像花屏

### 6.2.1. 现象

解码后的图像出现花屏现象。

### 6.2.2. 原因分析

逐步排除以下原因：

1. 是否源文件本身有数据错误，可使用 PC 端视频播放软件或图像浏览器查看，是否有花屏现象;
2. 通过保存解码帧数据，在 PC 端查看图像是否有花屏现象，如果 PC 端查看图像正常，则需要排查是否设置图像格式错误，或排查 Display 模块相关原因。
3. 码流解析是否正确，相关 VE 寄存器信息是否配置正确，具体请查看 VE Spec 说明。

## 6.3. 图像解码出错

请查看VE使用指南 [解码报错](../ve/6_faq.html#ref-ve-error)

## 6.4. 申请 dmabuf 失败

### 6.4.1. 现象

log 显示 dmabuf 申请失败，或者解码程序跑飞

### 6.4.2. 原因分析

1. mpp heap 的是否成功初始化，生成 `/dev/dmabuf/mpp` 文件节点

   如果没有生成 `/dev/dmabuf/mpp` 文件节点，则需要增加 CMA 预留内存的大小，或者减小 mpp heap 申请的内存大小。请查看配置指南 [MPP Heap](2_config_guide.html#ref-mpp-heap-cfg)

2. mpp heap 是否设置得太小，无法满足满足解码的需求