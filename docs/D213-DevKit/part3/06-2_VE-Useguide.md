---
sidebar_position: 13
---
# VE 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语 | 定义                   | 注释说明               |
| ---- | ---------------------- | ---------------------- |
| VE   | Video Engine           | 视频加速引擎           |
| MPP  | Media Process Platform | 通用多媒体处理软件平台 |

### 1.2. 模块简介

VE（Video Engine）是 Artinchip 自主研发的视频加速引擎，支持视频、图片的编解码功能。在 Linux 设备中，注册为字符设备，通过中间件 MPP(Media Process Platform)实现对 VE 字符设备驱动的调用，实现对视频、图片多媒体文件的编解码。

VE 支持的视频编解码标准如下:

| 标准             | Profile  | Level | 最大分辨率 | 最小分辨率 | 最大码率        |
| ---------------- | -------- | ----- | ---------- | ---------- | --------------- |
| H264/AVC decoder | BP/MP/HP | 4.2   | 1920x1088  | 16x16      | 80Mbps          |
| MJPEG decoder    | Baseline |       | 8192x8192  | 16x16      | 120Mbps(YUV444) |
| PNG decoder      |          |       | 4096x4096  |            |                 |
| JPEG encoder     | Baseline |       | 8192x8192  | 16x16      | 120Mbps(YUV444) |

- H.264/AVC 解码器:

  全兼容 ITU-T 建议 H.264 规定的 BP、MP 和 HP支持 CABAC/CAVLC支持可变块大小(16x16, 16x8, 8x16, 8x8, 8x4, 4x8 and 4x4)支持错误检查

- MJPEG 基线解码器

  兼容 ISO/IEC 10918-1 JPEG 基线支持 1 或者 3 个颜色分量支持8 bit 位深支持4:2:0, 4:2:2, 2:2:4, 4:4:4 和4:0:0 颜色格式(每个MCU包括最多6个8x8块)支持1/2、1/4、1/8缩放支持0、90、180、270度旋转以及水平、垂直镜像，不能和缩放同时开启

- PNG解码器

  支持 png8，存储方式为索引色存储，索引色位深支持1，2，4，8 bit，索引最多256色，支持通过数据块tRNS来设置索引透明度支持 png24，每个像素包含 R, G, B 三个通道，每个通道8 bits支持 png32，每个像素包含 R, G, B 和 alpha 四个通道，每个通道8bits支持 png 标准5种 filter（none，sub，up，average，paeth）支持标准的 zlib和 gzip 解压缩，LZ77 最大窗口为32K

- JPEG编码器

  兼容 ISO/IEC 10918-1 JPEG 基线支持 1 或者 3 个颜色分量支持8 bit 位深支持4:2:0, 4:2:2, 2:2:4, 4:4:4 和4:0:0 颜色格式

## 2. 参数配置

### 2.1. 内核配置

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，按如下选择：

```
Linux
    Device Drivers  --->
        Graphics support    --->
            Artinchip Graphics  --->
                <*> Artinchip Video Engine Driver
```

### 2.2. DTS参数配置

VE模块DTS参数已验证，一般情况下不需要进行更改，如有必要修改，请先咨询原厂技术支持。

#### 2.2.1. D211的配置

```
ve: ve@0x18c00000 {
        #address-cells = <1>;
        #size-cells = <0>;
        compatible = "artinchip,aic-ve-v1.0";
        reg = <0x0 0x18c00000 0x0 0x4000>;
        interrupts-extended = <&plic0 61 IRQ_TYPE_LEVEL_HIGH>;
        clocks = <&cmu CLK_VE>;
        clock-names = "ve_clk";
        resets = <&rst RESET_VE>;
        reset-names = "ve_rst";
        status = "okay";
};
```

## 3. 调试指南

待完善

## 4. 测试指南

VE 驱动无法独立运行，必须依赖 MPP 的调用才能运行。因此，VE 驱动测试请参考MPP模块的测试用例。

## 5. 设计说明

### 5.1. 源码说明

源代码位于：linux-5.10/drivers/video/artinchip/ve/aic_ve.c

### 5.2. 模块架构

VE 硬件需要由内核态 VE 驱动和用户态程序MPP相互配合实现编解码功能。其中，内核 VE 驱动主要负责VE硬件资源初始化和获取等，用户态 MPP 程序主要负责处理编解码逻辑、寄存器配置等。

VE 驱动基于字符设备实现，应用层通过设备节点(/dev/aic_ve)进行交互。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ve_framework1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ve_framework1-17066859462731.png)

图 6.20 *ve驱动框架*

基本流程如下：

- 1.用户态程序通过 open /dev/aic_ve打开 VE 驱动；
- 2.用户态程序通过 ioctl 获取ve硬件设备独占权限；
- 3.用户态程序完成一次独立的编解码任务：配置寄存器、等待VE当前任务完成；
- 4.用户态程序通过 ioctl 释放ve硬件设备独占权限；
- 5.视频帧解码完成，用户态程序调用 close 关闭 VE 驱动。

### 5.3. 关键流程设计

#### 5.3.1. 寄存器地址空间映射

由于寄存器是在用户空间配置，VE 驱动需要实现 mmap 接口，将寄存器地址空间映射到用户态进程的虚拟地址空间，以便用户态程序读写寄存器。

不同 VE 硬件版本，寄存器基地址和寄存器地址范围可能不一样，因此需要在 dts 中针对不同平台正确配置 reg 项（如下所示）。

```
ve: ve@0x18c00000 {
        ...
        reg = <0x0 0x18c00000 0x0 0x4000>;
        ...
};
```

用户态程序映射寄存器地址空间步骤如下：

- 通过 ioctl 获取寄存器地址范围；
- 调用 mmap 映射寄存器地址空间到虚拟地址空间，并得到寄存器在虚拟地址空间的起始地址；
- 根据寄存器起始地址和偏移地址读写 VE 寄存器。

#### 5.3.2. 中断处理流程

1.VE 中断类型有三种，包括：finish 中断、error 中断、bit request 中断。

- finish 中断表示 VE 任务正常结束
- error 中断表示 VE 处理任务过程中出错
- bit request 中断表示当前数据不足以完成一次完整的任务，需要继续发送数据

2.VE 的中断处理分为两部分：VE 驱动和用户态程序

1）内核 VE 驱动的中断处理比较简单，只是把中断状态返回到用户态

> - 读模块的状态寄存器，并将状态值返回到用户态，由用户态程序处理；
> - 关闭中断，避免中断重复发送；
> - 中断超时处理，当中断在规定时间（默认值为2s）内未收到，则表示出现异常，此时返回出错由用户态处理。

**注解**

1. 不同模块（H264/JPEG/PNG等）的状态寄存器不一样，读状态寄存器时需要根据模块获取相应状态寄存器的值；
2. VE 每次任务处理完后，都会关闭中断，因此在下次启动 VE 前，必须再次使能 VE 中断。

2）用户态程序根据 VE 驱动返回的中断状态并处理中断

> - finish 中断处理：VE 正常结束，释放 VE 硬件设备独占权限
> - bit request 中断处理：再次发送一笔数据，重新启动 VE 执行任务，重复以上过程，直到 VE 返回 finish 或 error 中断
> - error 中断：VE 执行出错，必须对 VE 进行硬件复位避免错误影响下次任务
> - 等中断超时：此时 VE 出现未知异常，必须对 VE 进行硬件复位

**注解**

处理 bit request 中断时，不能释放 VE 硬件设备独占权限，因为两次任务处理有相关性。如果这两次任务之间执行其他任务，会影响 VE 内部状态，从而导致该次任务执行出错。

#### 5.3.3. 多进程支持

VE 设备只有一个，所以同一时间只能执行一个任务。当多个进程同时操作 VE 驱动时，VE 只能分时复用。因此用户态进程在操作 VE 之前，必须获得 VE 的独占权限。 VE 驱动通过 IOC_VE_GET_CLIENT/IOC_VE_PUT_CLIENT 这两个 ioctl 接口为用户态提供获取和释放 VE 独占权限功能。

VE 驱动实现这一功能的几个概念：

- client：与进程相关的对象，保存该进程的信息，包括：进程 pid、该进程的 task、该进程使用的 dmabuf 队列等
- service：与 VE 资源相关的唯一对象，所有 client 通过 service 获取 VE 硬件的使用权限

具体实现如下：

- VE 驱动在 probe 中创建一个唯一的 service 对象，用于管理 VE 资源
- VE 驱动为每个进程创建一个 client 对象，用于维护该进程的 VE 状态
- 用户态进程调用 IOC_VE_GET_CLIENT 接口时，对应进程的 client 会通过 service 判断当前 VE 是否正在运行。如果是，当前 client 在此等待 VE 资源释放信号；否则得到 VE 操作权限
- 用户态进程等待当前解码任务执行完成后（等到中断），调用 IOC_VE_PUT_CLIENT 接口，当前 client 发出释放 VE 资源信号通知其它 client

#### 5.3.4. 多线程支持

当一个进程中的多个线程同时操作 VE 驱动时，VE 只能分时复用。为避免每个线程都执行 VE 驱动初始化等重复操作，建议用户态程序使用单例模式实现 VE 驱动调用。具体实现可参考 mpp 代码（base/ve/ve.c）。

### 5.4. 数据结构设计

```
// VE 寄存器地址范围
struct ve_info {
        int reg_size;
};

// dma buffer信息，用于获取dma buffer的物理地址
struct dma_buf_info {
    int fd;
    unsigned int phy_addr;
};

// 中断信息结构体
struct wait_info {
    int wait_time;
    unsigned int reg_status;
};
```

### 5.5. 接口设计

用户进程通过 /dev/aic_ve 节点打开 VE 驱动。

#### 5.5.1. IOC_VE_GET_CLIENT

接口语法：

```
int ioctl(int fd, unsigned long cmd);
```
```
| 功能说明 | 获取 VE 设备独占权限   |
| -------- | ---------------------- |
| 参数     | CMD：IOC_VE_GET_CLIENT |
| 返回值   | 0：成功<0：失败        |
| 注意事项 | 无                     |
```
#### 5.5.2. IOC_VE_PUT_CLIENT

接口语法：

```
int ioctl(int fd, unsigned long cmd);
```
```
| 功能说明 | 释放 VE 设备独占权限                                      |
| -------- | --------------------------------------------------------- |
| 参数     | CMD：IOC_VE_PUT_CLIENT                                    |
| 返回值   | 0：成功<0：失败                                           |
| 注意事项 | IOC_VE_GET_CLIENT 和 IOC_VE_PUT_CLIENT 的调用必须一一对应 |
```
#### 5.5.3. IOC_VE_WAIT

接口语法：

```
int ioctl(int fd, unsigned long cmd, struct wait_info *info);
```
```
| 功能说明 | 等待 VE 驱动编解码完成，获取 VE 寄存器状态                   |
| -------- | ------------------------------------------------------------ |
| 参数     | CMD：IOC_VE_WAITinfo: 指向struct wait_info指针               |
| 返回值   | 0：成功<0：失败                                              |
| 注意事项 | IOC_VE_WAIT 的调用必须在 IOC_VE_GET_CLIENT 和 IOC_VE_PUT_CLIENT 之间 |
```
#### 5.5.4. IOC_VE_GET_INFO

接口语法：

```
int ioctl(int fd, unsigned long cmd, struct ve_info *info);
```
```
| 功能说明 | 获取 struct ve_info 数据                         |
| -------- | ------------------------------------------------ |
| 参数     | CMD：IOC_VE_GET_INFOinfo: 指向struct ve_info指针 |
| 返回值   | 0：成功<0：失败                                  |
| 注意事项 | 无                                               |
```
#### 5.5.5. IOC_VE_SET_INFO

接口语法：

```
int ioctl(int fd, unsigned long cmd, struct ve_info *info);
```
```
| 功能说明 | 设置 struct ve_info 数据                         |
| -------- | ------------------------------------------------ |
| 参数     | CMD：IOC_VE_SET_INFOinfo: 指向struct ve_info指针 |
| 返回值   | 0：成功<0：失败                                  |
| 注意事项 | 无                                               |
```
#### 5.5.6. IOC_VE_RESET

接口语法：

```
int ioctl(int fd, unsigned long cmd);
```
```
| 功能说明 | VE 驱动硬件复位   |
| -------- | ----------------- |
| 参数     | CMD：IOC_VE_RESET |
| 返回值   | 0：成功<0：失败   |
| 注意事项 | 无                |
```
#### 5.5.7. IOC_VE_ADD_DMA_BUF

接口语法：

```
int ioctl(int fd, unsigned long cmd, struct dma_buf_info *buf);
```
```
| 功能说明 | 加载 DMA buffer, 获取 DMA buffer 物理地址               |
| -------- | ------------------------------------------------------- |
| 参数     | CMD：IOC_VE_ADD_DMA_BUFbuf: 指向struct dma_buf_info指针 |
| 返回值   | 0：成功<0：失败                                         |
| 注意事项 | 无                                                      |
```
#### 5.5.8. IOC_VE_RM_DMA_BUF

接口语法：

```
int ioctl(int fd, unsigned long cmd, struct dma_buf_info *buf);
```
```
| 功能说明 | 移除 DMA buffer                                        |
| -------- | ------------------------------------------------------ |
| 参数     | CMD：IOC_VE_RM_DMA_BUFbuf: 指向struct dma_buf_info指针 |
| 返回值   | 0：成功<0：失败                                        |
| 注意事项 | 无                                                     |
```
### 5.6. APP Demo参考

以下 demo 实现 VE 驱动基本调用流程，具体可参考 mpp 代码（base/ve/ve.c）

```
//* 1. 打开VE驱动
int fd = open("/dev/aic_ve", O_RDWR);

//* 2. 获取ve寄存器空间大小
struct ve_info info = {0};
ioctl(fd, IOC_VE_GET_INFO, &info);

//* 3. 映射寄存器地址空间
unsigned long reg_base = (unsigned long)mmap(NULL,
                info.reg_size,
                PROT_READ | PROT_WRITE, MAP_SHARED,
                fd,
                0);

//* 4. 获取VE权限
ioctl(fd, IOC_VE_GET_CLIENT);

//* 5. 配置寄存器（省略）
...

//* 6. 等VE中断
struct wait_info wt_info;
wt_info.wait_time = VE_TIMEOUT;
int ret = ioctl(fd, IOC_VE_WAIT, &wt_info);
if(ret < 0) {
    // 中断超时,VE硬件复位
    ioctl(fd, IOC_VE_RESET);
}

//* 7. 释放VE权限
ioctl(fd, IOC_VE_PUT_CLIENT);
```

## 6. 常见问题



### 6.1. VE驱动未加载

#### 6.1.1. 现象

在/dev路径下，未发现字符设备/dev/aic_ve

#### 6.1.2. 原因分析

确认内核中是否加载VE驱动。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ve-faq.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/ve-faq-17066861941703.jpg)



### 6.2. 解码报错

#### 6.2.1. 现象

解码异常报错，未得到解码后的视频帧，或者视频帧数据出错。

#### 6.2.2. 原因分析

逐步排除以下原因：

1. 源文件是否是VE驱动支持的媒体文件格式，具体请参考模块介绍的硬件编解码格式章节;
2. 源文件是否损坏，可参考PC端是否可正常播放;
3. 码流解析是否正确，相关VE寄存器信息是否配置正确。

解码报错后，VE驱动中返回了解码当前帧的寄存器状态信息，请参考VE Spec说明对应分析。