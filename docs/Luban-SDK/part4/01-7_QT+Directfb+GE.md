---
sidebar_position: 7
---
#  QT + Directfb + GE

## 1. GE介绍

GE(Graphics Engine) 是一个用来进行2D图形加速的硬件模块。主要包括格式转换、旋转、 镜像、缩放、Alpha混合、Color Key、位块搬移、Dither等功能， 以下特性应该会被Directfb使用的到。

- 支持水平和垂直Flip
- 所有格式支持90/180/270度旋转
- RGB格式支持任意角度旋转
- 支持1/16x ~ 16x缩放
- 支持porter-duff规则的Alpha混合
- 支持矩形填充
- 位块搬移(bit block transfer)

## 2. 功能移植

因为平台的差异，需要在Directfb代码中注入如下信息来支持：

- dmabuf surface支持
- fbdev接口
- gfxdrivers接口
- gfx逻辑

![../../_images/dfb-ge.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/dfb-ge-17068609338211.jpg)

图 1.11 *移植架构图*

## 3. 模块添加

需要在Directfb中添加对ge模块的编译，修改对象为“configure.in” 文件，具体方法是参考某一个模块仿写， 譬如：vmware， 在相应的地方添加ge 的check 为 “yes”。

```
@@ -1925,6 +1925,7 @@ sis315=no
vdpau=no
+ge=yes
vmware=no

if test "$have_linux" = "yes"; then
@@ -1938,7 +1939,7 @@ AC_ARG_WITH(gfxdrivers,
                            [radeon, savage, sh772x, sis315, tdfx, unichrome,]
-                           [vdpau, vmware. @<:@default=all@:>@]),
+                           [vdpau, ge, vmware. @<:@default=all@:>@]),
            [gfxdrivers="$withval"], [gfxdrivers=all])
@@ -1966,6 +1967,7 @@ if test "$gfxdrivers" = "all"; then
checkfor_vdpau=yes
+  checkfor_ge=yes
checkfor_vmware=no

                checkfor_vdpau=yes
                ;;
+          ge)
+               checkfor_ge=yes
+               ;;
        *)
```

## 4. dma buf

AIC GE 需要连续的内存作为操作buf，因此需要在surface pool 中添加 aic的操作接口

### 4.1. 代码修改

```
modified:   src/core/local_surface_pool.c
    modified:   src/core/prealloc_surface_pool.c
    modified:   src/core/surface_buffer.h
    modified:   src/core/surface_core.c
add：       src/core/dmabuf_surface_pool.c
```

### 4.2. 核心代码

- 添加width 和 height 变量的使用
- 实现dmabufSurfacePoolFuncs的函数

```
const SurfacePoolFuncs dmabufSurfacePoolFuncs = {
    .PoolDataSize       = dmabufPoolDataSize,
    .PoolLocalDataSize  = dmabufPoolLocalDataSize,
    .AllocationDataSize = dmabufAllocationDataSize,

    .InitPool           = dmabufInitPool,
    .JoinPool           = dmabufJoinPool,
    .DestroyPool        = dmabufDestroyPool,
    .LeavePool          = dmabufLeavePool,

    .AllocateBuffer     = dmabufAllocateBuffer,
    .DeallocateBuffer   = dmabufDeallocateBuffer,

    .Lock               = dmabufLock,
    .Unlock             = dmabufUnlock,
};
```

## 5. fbdev

### 5.1. 代码修改

```
modified:   systems/fbdev/fb.h
modified:   systems/fbdev/fbdev.c
modified:   systems/fbdev/fbdev.h
modified:   systems/fbdev/fbdev_surface_pool.c
```

### 5.2. 核心代码

fbdev中做两块兼容性修改

- 添加width 和 height 变量的使用
- 添加gfxdriver的接口变量

```
--- a/systems/fbdev/fbdev_surface_pool.c
+++ b/systems/fbdev/fbdev_surface_pool.c
@@ -66,6 +66,8 @@ typedef struct {
typedef struct {
    int    magic;

+   int    width;
+   int    height;
    Chunk *chunk;
} FBDevAllocationData;

@@ -278,6 +280,9 @@ fbdevAllocateBuffer( CoreSurfacePool       *pool,
    surface = buffer->surface;
    D_MAGIC_ASSERT( surface, CoreSurface );

+   alloc->width = buffer->config.size.w;
+   alloc->height = buffer->config.size.h;
```

## 6. gfxdriver

gfxdirver是directfb 集成GE的接口，主要实现 ge_driver 和 ge_device

### 6.1. 接口方式

gfxdriver 是模拟 Linux 的 driver 的方式，向 QT 注册自己，

```
driver_init_device
driver_init_driver
driver_probe
```

### 6.2. 功能声明

```
#define GE_SUPPORTED_DRAWINGFLAGS (DSDRAW_BLEND)
#define GE_SUPPORTED_BLITTINGFLAGS (DSBLIT_BLEND_ALPHACHANNEL | \
                                    DSBLIT_BLEND_COLORALPHA   | \
                                    DSBLIT_SRC_COLORKEY       | \
                                    DSBLIT_ROTATE90           | \
                                    DSBLIT_ROTATE180          | \
                                    DSBLIT_ROTATE270          | \
                                    DSBLIT_FLIP_HORIZONTAL    | \
                                    DSBLIT_FLIP_VERTICAL)

#define GE_SUPPORTED_BLITTINGFUNCTIONS  (DFXL_BLIT | \
                                        DFXL_STRETCHBLIT)

#define GE_SUPPORTED_DRAWINGFUNCTIONS (DFXL_FILLRECTANGLE)
device_info->caps.accel    = GE_SUPPORTED_DRAWINGFUNCTIONS |
                            GE_SUPPORTED_BLITTINGFUNCTIONS;

device_info->caps.drawing  = GE_SUPPORTED_DRAWINGFLAGS;
device_info->caps.blitting = GE_SUPPORTED_BLITTINGFLAGS;
```

### 6.3. 功能函数

通过src/core/gfxcard.h 中的 GraphicsDeviceFuncs 实现

```
funcs->CheckState    = ge_check_state;
funcs->SetState      = ge_set_state;
funcs->EngineSync    = ge_sync;
funcs->EngineReset   = ge_reset;
funcs->FlushTextureCache  = ge_flush_texture_cache;

funcs->FillRectangle = ge_fill_rectangle;
funcs->Blit          = ge_blit;
funcs->StretchBlit   = ge_stretch_blit;
```

## 7. GFX

GFX driver 是驱动，是和DirectFB的接口描述，真正的实现是通过调用 aic_mpp 库

```
--- a/src/gfx/Makefile.am
+++ b/src/gfx/Makefile.am
+libdirectfb_gfx_la_LDFLAGS = -lmpp_decoder -lmpp_ge
```

