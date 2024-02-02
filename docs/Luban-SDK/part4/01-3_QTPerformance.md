---
sidebar_position: 3
---
#  QT 性能

D211 有两部分硬件加速可以优化 QT 的性能

- GE： ArtInChip 的 Graphic Engine 的简称，其提供基础的 2D 操作，如缩放，旋转，alpha等， QT 应用借助于 GE 的支持动画效果应该更流畅。
- VE： ArtInChip 的 Video Engine 的简称，其提供 png， jpeg 图片的解码操作， QT 应用借助于 VE 的支持可以更快速的显示图片，并节省 CPU 资源。

## 1. GE

在 QT 中有两种方案进行硬件加速

### 1.1. directFB

directFB 是提供 QT 硬件加速的传统框架， ArtInChip 主要在 directFB 中添加了三块逻辑来实现 GE 的支持

- DMA Buffer 接口，提供连续内存块的管理: src/core/dmabuf_surface_pool.c
- GE Driver 接口实现，gfxdrivers/ge/
- GE Device 接口实现，gfxdrivers/ge/

### 1.2. AIC_MPP

mpp （Media Process Platform）是 ArtInChip 封装的一套操作 DMA Buffer， GE, VE 的统一接口，可以在 QT 代码中直接调用这些接口来完成硬件加速

直接使用 mpp 接口的效率最高，对资源的使用也更安全，但对编码要求也更高

具体代码参考： source/artinchip/qtlauncher/views/aicdashboardview.cpp

## 2. PNG

QT 对 PNG 文件的使用有三种方案：

- QT 代码直接使用 libpng， 此处因为无法直接访问使用 DMA Buffer，内存复制浪费比较多，无法对接 VE 的解码接口
- QT 使用 directFB 中对 libpng 的封装，directFB 中的 surface 结构实现了对 DMA Buffer 的封装，对接 VE 的解码接口比较高效, 具体代码参考：directfb-1.7.7/interfaces/IDirectFBImageProvider/idirectfbimageprovider_png.c
- QT 应用代码中直接调用 aic_mpp 封装的 VE, GE 的接口，直接获得处理后的图像内容，然后作为 QT 的控件的一部分使用，此用法结合图片缓存，可以防止 DMA Buffer 的碎片化，具体代码参考： source/artinchip/qtlauncher/views/aicdashboardview.cpp

## 3. JPEG

JPEG 的使用路径类似 PNG，但 VE 解码 JPEG 后的格式为 YUV， 该格式一般无法直接在 surface 中使用， 因此需要调用 GE 进行一次格式转换， 如果操作比较频繁，容易造成 DMA Buffer 的内存碎片，因此并没有直接对接 JPEG 的解码接口

