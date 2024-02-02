---
sidebar_position: 3
---
#  Gstreamer 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语 | 定义                   | 注释说明               |
| ---- | ---------------------- | ---------------------- |
| VE   | Video Engine           | 视频加速引擎           |
| DE   | Display Engine         | 显示引擎               |
| MPP  | Media Process Platform | 通用多媒体处理软件平台 |

### 1.2. 模块简介

Gstreamer 是一个开源的多媒体框架，官方网址：https://gstreamer.freedesktop.org 。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/gstreamer_framework.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/gstreamer_framework-17067503918551.jpg)

图 6.55 *Gstreamer 框架*[¶](#id5)

Gstreamer 支持采用插件方式扩展功能，开发者可以灵活使用已有插件，并且可以自定义特定功能插件。

Gstreamer 的第三方库包括：

> - gstreamer：核心库函数
> - gst-plugins-base：一组重要的基础库
> - gst-plugins-good：符合 LGPL 协议的优质插件
> - gst-plugins-ugly：使用了 GPL 协议的优质插件
> - gst-plugins-bad：代码质量有待提高的插件
> - gst-libav：libav 编解码库的插件

### 1.3. 特性

Gstreamer 支持通过插件扩展功能，以下是一些常见特性。

> - 文件封装格式：mp4/mov/3gp，flv，mpeg-ps/ts，mkv/webm，avi
> - 视频格式：H.264
> - 音频格式：mp3，aac，wav
> - 流媒体协议：http，rtsp

## 2. 参数配置

### 2.1. AIC 插件配置

Gstreamer 在 ArtInChip 芯片平台的硬件加速功能依赖 ArtInchip 的 Gstreamer 插件，请在 Gstreamer 编译前进行配置。

```
ArtInChip packages  --->
    [*] aic-mpp
    [*] gst1-plugins-aic
```

### 2.2. 第三方插件配置

Gstreamer 支持第三方实现的多种插件，实现数据处理和音视频输出。如果编译所有插件，输出的库将会比较大。 可以根据产品需求选择配置。

在 luban 根目录下执行 make menuconfig，进入功能配置，按如下选择：

#### 2.2.1. 基础插件（默认都会配置）

```
Third-party packages  --->
    [*] gstreamer 1.x --->
        [*] gst1-plugins-base --->
            [*] audioconvert
            [*] audioresample
            [*] alsa
            [*] valomu
            [*] playback
            [*] videoconvert  (可选)
            [*] deinterleace  (可选)
        [*] gst1-plugins-good --->
            [*] autodetect
```

#### 2.2.2. 文件解封装配置

```
Third-party packages  --->
    [*] gstreamer 1.x --->
        [*] gst1-plugins-bad --->
            [*] mpegtsdemux    (ts 文件解封装)
        [*] gst1-plugins-good --->
            [*] matroska       (mkv 文件解封装)
            [*] isomp4         (mp4/mov 文件解封装)
            [*] flv            (flv 文件解封装)
            [*] avi            (avi 文件解封装)
```

#### 2.2.3. 音频解码

**AAC 音频解码配置**

AAC 音频解码插件依赖第三方开源库 faad2

```
Third-party packages  --->
    [*] faad2
    [*] gstreamer 1.x --->
        [*] gst1-plugins-bad --->
            [*] faad
```

**MP3 音频解码配置**

MP3 音频解码插件依赖第三方开源库 mpg123

```
Third-party packages  --->
    [*] mpg123
    [*] gstreamer 1.x --->
        [*] gst1-plugins-good --->
            [*] audioparses
            [*] id3demux
        [*] gst1-plugins-bad --->
            [*] mpg123
```

**WAV 音频解码配置**

```
Third-party packages  --->
    [*] gstreamer 1.x --->
        [*] gst1-plugins-good --->
            [*] wavparser
```

#### 2.2.4. 流媒体协议

**RTSP 配置**

```
Third-party packages  --->
    [*] gstreamer 1.x --->
        [*] gst1-plugins-good --->
            [*] rtp
            [*] rtpmanager
            [*] rtsp
            [*] udp
```

## 3. 调试指南

## 4. 测试指南

Gstreamer 自带两个测试用例，gst-inspect-1.0 和 gst-launch-1.0 。

### 4.1. gst-inspect-1.0

gst-inspect-1.0 主要用于查询 Gstreamer 支持的插件。

```
[aic@] # gst-inspect-1.0
autodetect:  autoaudiosrc: Auto audio source
autodetect:  autoaudiosink: Auto audio sink
autodetect:  autovideosrc: Auto video source
autodetect:  autovideosink: Auto video sink
ipcpipeline:  ipcslavepipeline: Inter-process slave pipeline
ipcpipeline:  ipcpipelinesink: Inter-process Pipeline Sink
ipcpipeline:  ipcpipelinesrc: Inter-process Pipeline Source
typefindfunctions: audio/x-tap-dmp: dmp
typefindfunctions: audio/x-tap-tap: tap
...
Total count: 25 plugins, 237 features
```

### 4.2. gst-launch-1.0

gst-launch-1.0 用于播放音视频文件。

使用 playbin 播放视频文件

```
gst-launch-1.0 playbin uri=file:///sdcard/test.mp4
```

只播放视频，不播放音频

```
gst-launch-1.0 filesrc location=/sdcard/test.mp4 typefind=true ! video/quicktime ! qtdemux ! vedec ! fbsink
```

增加 debug 信息，–gst-debug-level 参数：1 表示只打印 ERROR 级别，9 表示所有类型打印

```
gst-launch-1.0 playbin uri=file:///sdcard/test.mp4 --gst-debug-level=1
```

## 5. 设计说明

### 5.1. 源码说明

本模块源代码在内核目录 source/artinchip/gst1-plugins-aic 下，目录结构如下：

```
source/artinchip/gst1-plugins-aic
├── gstaicfb.c             // fb_sink 插件
├── gstaicfb.h
├── gstfbsink.c
├── gstfbsink.h
├── gstmppallocator.c      // mpp_frame 内存申请模块
├── gstmppallocator.h
├── gstplugin.c
├── gstvedec.c             // ve 解码插件
├── gstvedec.h
└── meson.build
```

### 5.2. 模块架构

Gstreamer 视频播放软件框图如下所示：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/gst_aic_design.png](https://photos.100ask.net/artinchip-docs/d213-devkit/gst_aic_design-17067512987023.png)

图 6.56 *Gstreamer 视频播放软件框架*[¶](#id5)

可分为 3 个模块：

> - demux 模块，文件解封装模块，实现 ts、MP4、mkv、flv 等文件格式解析；
> - decoder 模块，视频解码模块，完成视频解码功能；
> - sink 模块，视频显示模块，完成视频显示功能；

Gstreamer 已经实现了 3 个模块的调用流程并提供了模块接口，开发者只需按照 Gstreamer 定义的接口来实现一个插件就可以完成视频播放的功能。

ArtInChip 平台提供了视频解码加速硬件模块（VE）和图像显示硬件模块（DE），为了在 Gstreamer 软件上发挥我们的硬件优势， 我们定义了 2 个插件：gstvedec 和 gstfbsink，分别作为 VE 和 DE 的 Gstreamer 插件。

同时，为了实现 VE 和 DE 共享 buffer，GstVideoDecoder 和 GstVideoSink 之间传递的 GstBuffer 是由自定义的 gstmppallocator 模块进行内存管理。

#### 5.2.1. gstmppallocator 设计

gstmppallocator 模块主要用于管理视频帧 buffer，实现 gstvedec 和 gstfbsink 的 buffer 共享。

GstMppAllocator 继承于 GstAllocator 对象，用于管理分配和释放内存；分配的内存 GstMppMemory 则继承于 GstMemory 对象。

Gstreamer 中大多数对象都是通过引用计数进行管理，该对象在某个地方使用时，对其引用计数进行加 1 操作， 不使用时再将引用计数减 1，如果最终引用计数为 0，则表示该对象不会再被使用，应该释放该对象。 GstMppMemory 也遵循该原则。

主要功能包括以下几点：

> - 通过 gstmppallocator 模块申请的 buffer 只能存放 mpp_frame 结构体，它的长度也只能是 mpp_frame 结构体的大小；
> - 申请 buffer 的调用只会在 gstvedec 模块中，每次获取到一个解码帧后调用该接口；
> - 当 buffer 的引用计数为 0 时，会触发 buffer 释放接口的调用，因此释放 buffer 可能发生在 gstfbsink 模块或其它模块中（比如丢帧时释放 buffer 是在 GstVideoDecoder 中调用）；
> - 调用释放 buffer 时，需要将 buffer 对应的 mpp_frame 还给解码器；

关键实现代码如下：

```
static void gst_mpp_allocator_free (GstAllocator * alloc, GstMemory * mem)
{
    GstMppAllocator *allocator = (GstMppAllocator*) alloc;
    GstMppMemory *mpp_mem = (GstMppMemory *)mem;
    struct mpp_frame *mframe = mpp_mem->frame;

    mpp_decoder_put_frame(allocator->decoder, mframe);
    GST_DEBUG_OBJECT(allocator, "return mpp_frame (%d)", mframe->id);

    free(mpp_mem);
}

static GstMemory *gst_mpp_allocator_alloc (GstAllocator *alloc, gsize size,
GstAllocationParams * params)
{
    int slice_size = 0;
    guint8 *data;
    GstMppMemory *mem = NULL;
    GstMppAllocator *allocator = (GstMppAllocator*) alloc;
    if (size != sizeof(struct mpp_frame)) {
        GST_ERROR_OBJECT(allocator, "memory size(%lu) is not right", size);
        return NULL;
    }

    slice_size = sizeof(GstMppMemory) + size;

    mem = (GstMppMemory*)malloc(slice_size);
    data = (guint8 *) mem + sizeof (GstMppMemory);
    mem->frame = (struct mpp_frame*)data;

    gst_memory_init (GST_MEMORY_CAST (mem),
            0, alloc, NULL, size, 0, 0, size);

    GST_DEBUG_OBJECT(allocator, "alloc mpp size(%lu), ref_count: %d",
        size, GST_MINI_OBJECT_REFCOUNT_VALUE(mem));

    return (GstMemory*)mem;
}
```

#### 5.2.2. gstvedec 插件设计

gstvedec 插件是对 mpp_decoder 接口的二次封装。mpp_decoder 接口实现 3 个功能：

> - 把视频码流数据送给解码器
> - 调用硬件解码视频码流数据，并输出视频帧
> - 从解码器取视频帧

gstvedec 主要功能是使用 mpp_decoder 提供的这 3 个功能对接 GstVideoDecoder 的接口。

##### 5.2.2.1. GstVideoDecoder 的接口说明

GstVideoDecoder 最重要的两个接口函数如下:

```
gboolean      (*set_format)     (GstVideoDecoder *decoder, GstVideoCodecState * state);
GstFlowReturn (*handle_frame)   (GstVideoDecoder *decoder, GstVideoCodecFrame *frame);
```

set_format 主要用于传递解码器所需的元信息，包括 extradata （MP4等帧格式文件会传递 extradata，而 TS 等流格式文件不传递）。

handle_frame 主要用于传递视频码流数据。

##### 5.2.2.2. 对接设计

对应于 mpp_decoder 的 3 个功能，3 个功能分别在不同线程中调用，实现方式如下：

1）GstVideoDecoder 的 handle_frame 接口主要实现把码流数据传递到 mpp_decoder;

```
int ret = mpp_decoder_get_packet(dec->mpp_dec, &packet, input_minfo.size);
packet.size = input_minfo.size;
memcpy(packet.data, input_minfo.data, input_minfo.size);
packet.pts = in_frame->pts;
mpp_decoder_put_packet(dec->mpp_dec, &packet);
```

2）gstvedec 初始化时创建一个解码线程，该线程只完成解码功能；

3）gstvedec 的 srcpad 上创建一个显示线程，该线程的任务有两个：

> - 通过 GstMppAllocator 申请一个 buffer，用于传递视频帧信息；
> - 从 mpp_decoder 中获取一帧解码后的 mpp_frame，并把 mpp_frame 信息拷贝到 buffer（注意：此时不能把 mpp_frame 还给解码器）；
> - 调用 gst_video_decoder_finish_frame 将 buffer 送到 sink 中。

#### 5.2.3. gstfbsink 插件设计

gstfbsink 插件是对 Linux 标准的 framebuffer 接口的二次封装，对接 GstVideoSink 接口。

GstVideoSink 最重要的接口函数 render 如下，主要用于显示一帧视频数据。

```
GstFlowReturn (*render)(GstBaseSink * bsink, GstBuffer * buffer);
```

gstfbsink 插件设计的关键点是：必须避免同一个视频帧 VE 和 DE 同时读写的情况，否则会出现画面异常问题。

设计方案：

> - 将当前 buffer 引用计数加 1；
> - 通过 framebuffer 接口显示当前视频帧；
> - 将上一个 buffer 引用计数减 1（释放上一个buffer）；

代码实现如下：

```
gst_memory_ref(mem);

gst_aicfb_render(fbsink->aicfb, &(mframe->buf), mframe->id);

if (fbsink->prev_mem != NULL) {
    gst_memory_unref(fbsink->prev_mem);
}
fbsink->prev_mem = mem;
```

## 6. 常见问题

待完善