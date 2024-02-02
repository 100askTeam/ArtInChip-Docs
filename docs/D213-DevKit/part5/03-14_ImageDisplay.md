---
sidebar_position: 14
---
# 图像显示

本章节主要介绍U-Boot 阶段LOGO显示的相关内容。

U-Boot 驱动模型支持 Graphics，Artinchip 平台中的显示驱动基于该框架进行实现。 但驱动内部逻辑参考了Kernel中的显示驱动，对新屏适配可参考SDK指南中的显示模块使用指南。

### 1. 相关术语

| 术语     | 定义                               | 注释说明                         |
| -------- | ---------------------------------- | -------------------------------- |
| DE       | Display Engine                     | 显示引擎                         |
| DI       | Display Interface                  | 显示接口，包括RGB/LVDS/DSI等     |
| PANEL    | panel                              | 外接屏幕驱动                     |
| RGB      | Red Green Blue                     | 按红绿蓝三原色编码的显示接口标准 |
| LVDS     | Low Voltage Differential Signaling | 低压差分信号的显示接口标准       |
| MIPI-DSI | Mipi Display Serial Interface      | Mipi组织定义的一个显示接口标准   |

### 2. 驱动框架

相关配置为：

- CONFIG_DM_VIDEO
- CONFIG_DISPLAY
- CONFIG_VIDEO_ARTINCHIP

相关源码有：

- drivers/video/artinchip/
- `board/artinchip/d211/d211.c`

### 3. 预留内存

U-Boot 会在代码重定位前在 DRAM 的顶部预留出一块连续内存 `video buffer` ，用于保存 LOGO 信息。

```
board_init_f(); // common/board_f.c
    |-> reserve_video()  // reserve video buffer
```

`reserve_video()` 会遍历 `uclass_video` 链表，解析 `struct video_uc_platdata` 中的 `size` 属性是否被设置，如果不为零，即在DRAM顶部预留一块大小为 `size` 的 buffer，并将这块 buffer 的起始地址和结束地址存入 `gd->video_bottom` 和 `gd->video_top` 。随后U-Boot重置 DRAM 中可用内存的起始地址，减去这块 buffer。

预留内存的大小在 U-Boot DM 驱动模型第一次初始化时设定。

```
board_init_f(); // common/board_f.c
    |-> initf_dm();
    |   |-> device_bind_common()
    |   |-> drv->bind(dev)
    |       aicfb_bind() // drivers/video/artinchip/aic_fb.c
    |                    // 为struct video_uc_platdata 中的 size 赋值
    |   ...
    |-> reserve_video()  // reserve video buffer
```

### 4. 初始化流程

显示驱动的初始化发生在 U-Boot 重定位之后，LOGO 加载之前，probe流程如下：

```
|-> board_init_r(); // common/board_r.c
|   |-> board_late_init()
|   |   |-> board_show_logo //board/artinchip/d211/d211.c
|           |-> uclass_first_device
|           |-> device_probe()
|              |-> aicfb_probe() // drivers/video/artinchip/aic_fb.c
|                       |
|       +---------------+
|       |
|   |-> aicfb_find_de()
|   |   | -> uclass_get_device_by_ofnode()
|   |       |-> uclass_get_device_tail()
|   |           |-> device_probe()
|   |               aic_de_probe() // drivers/video/artinchip/aic_de.c
|   |-> aicfb_find_di()
|   |   | -> uclass_get_device_by_ofnode()
|   |       |-> uclass_get_device_tail()
|   |           |-> device_probe()
|   |               aic_rgb_probe() / lvds_probe() / aic_dsi_probe()
|   |           // 这三个函数的关系为三选一，分别位于
|   |           // drivers/video/artinchip/aic_rgb.c
|   |           // drivers/video/artinchip/aic_lvds.c
|   |           // drivers/video/artinchip/aic_dsi.c
|   |-> aicfb_find_panel()
|   |   | -> uclass_get_device_by_ofnode()
|   |       |-> uclass_get_device_tail()
|   |           |-> device_probe()
|   |           |-> panel_probe() // drivers/video/artinchip/panel_xxx.c
|   ...
    |-> board_prepare_logo // 加载logo
    |-> aicfb_enable_panel
```

在probe过程中并没有开启显示模块，只是设置了相关参数。在 LOGO 加载进 video buffer 后，U-Boot 才会调用 `aicfb_enable_panel` 执行显示模块的 enable 操作。

### 5. LOGO加载

ArtInChip 平台支持从 `mmc`, `spinand`, `spinor` 等启动介质中加载 `png/jpg` 图片进行硬解码并居中显示。

加载的过程为：

```
|-> board_late_init // common/board_r.c
    |-> board_show_logo // board/artinchip/d211/d211.c
        |-> board_prepare_logo()
        |   |-> mmc_load_logo()    // mmc 启动
        |   |-> spinand_load_logo() // spinand 启动
        |   |-> spinor_load_logo()    // spinor 启动
        |       |-> aic_logo_decode()  // 对 boot logo image 进行解码
        |           |-> aicfb_enable_panel()  // 开启显示模块
```

### 6. 硬件时序要求

DE、DI、panel三个硬件模块在初始化时有一些时序上的要求，包含先后顺序、延迟大小，主要约束来自于panel侧。所以，当接入新的panel型号，必须要严格按照手册来完成硬件的初始化。 为了应对这样的硬件特性，驱动设计中使用callback方式来实现多个模块间的互相调用。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/callbacks.png](https://photos.100ask.net/artinchip-docs/d213-devkit/callbacks-17066899314411.png)

在显示模块的enable操作中，会调用这些回调来完成初始化，如下图（其中关系比较绕的是panel初始化逻辑）

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/fb_bind.png](https://photos.100ask.net/artinchip-docs/d213-devkit/fb_bind-17066899386473.png)

小技巧

该部分逻辑与kernel中的显示驱动保持一致，不同点在与panel enable的调用时间不同。详情可参考SDK指南中的显示模块使用指南

### 7. LOGO保持

U-Boot 在显示 LOGO 后，会把 video buffer 的信息，包括 buffer 起始地址，大小等添加到 kernel 解析的dtb文件中。 具体的方式为：在 dtb 文件的 reserved momory 结点中插入一个子节点，子节点中保存有 address 和 size 信息。 过程如下所示：

```
|-> image_setup_libfdt()
|-> ft_board_setup()
    |-> fdtdec_add_reserved_memory()
```

Kernel 在启动时不会修改这块内存，kernel 中的显示驱动在初始化时，会将 video buffer 中的内容 `memcopy` 到 `fb0` 中，从而保证 LOGO 可以从 U-Boot 保持到 kernel 启动，直到应用程序修改 `fb0` 文件。kernel 在 memcopy 操作之后，会将 video buffer 释放。

### 8. 更换LOGO

ArtInChip 平台支持 png/jpg 格式的 logo 文件，uboot 会自动解析 logo 文件的文件头，以此来判断 logo 是 png 文件还是 jpeg 文件。ArtInChip 平台不仅支持开机 logo，还支持在 usb 烧录，SD 卡升级和U盘升级时显示 logo，并且允许不同场景显示不同的 logo 图片。

Luban SDK 使用 itb(uboot FIT image) 文件格式来管理不同的 logo 图片，相关的 its(image tree source) 配置文件位于：

- `target/<IC>/common/logo.its`

Luban SDK 在编译时，会把配置文件中指定的图片打包成 `logo.itb` 文件。 `logo.itb` 文件在烧录时会被加载进 logo 分区。

如果想为某块单板维护一个 its 文件，可以将配置文件拷贝一份到板级目录，再进行修改：

- `target/<IC>/<Board>/logo.its`

注解

如果板级 its 文件存在， Luban SDK 优先链接板级配置文件。

**PNG LOGO**

ArtInChip 平台默认使用 png 格式 logo，图片保存路径如下：

- `target/<IC>/<Board>/logo/boot_logo.png`

注解

图片必须命名为 `boot_logo.png`。

Luban SDK 编译时，编译脚本会在 logo 目录下检索 `boot_logo.png` 文件，如果文件存在，就把它打包进 logo.itb 文件。

logo 分区 size 默认 768K，打包后的 `logo.itb` 文件 size 需小于 logo 分区。

以 spi-nand 启动为例，

```
// target/<IC>/<Board>/image_cfg.json
"spi-nand": {
    "size": "128m", // Size of SPI NAND
    "partitions": {
        "spl":    { "size": "1m" },
        "uboot":  { "size": "1m" },
        "userid":   { "size": "256k" },
        "bbt":      { "size": "256k" },
        "env":    { "size": "256k" },
        "env_r":    { "size": "256k" },
        "falcon":   { "size": "256k" },
        "logo":     { "size": "768K" },   // 默认配置 768K，需要大于 logo.itb 文件
        "kernel": { "size": "12m" },
        "recovery": { "size": "10m" },
        "ubiroot": {
            "size": "32m",
            "ubi": { // Volume in UBI device
                "rootfs": { "size": "-" },
            },
        },
        "ubisystem": {
            "size": "-",
            "ubi": { // Volume in UBI device
                "user":   { "size": "-" },
            },
        },
    }
},
```

更换 logo 图片，需要注意以下几点：

1. **用作 logo 的 png 图片必须只包含一个 IDAT 数据块**
2. png 图片的宽高不能大于当前 LCD panel 的宽高
3. image_cfg.json 文件中 logo 分区 size（默认 768K）需要大于 logo.itb 文件

ArtInChip 平台基于 ffmpeg 进行精简，提供一个专门的 png 转换工具，确保用作 logo 的 png 图片只包含一个 `IDAT` 数据块。

注解

当前暂不支持 32 位带 alpha 信息的 png 图片。

png 硬解码输出的格式默认为 ARGB8888, 如果想更换输出格式，需要修改 uboot 源码。源码以及支持的格式如下所示：

```
// drivers/video/artinchip/decoder/aic_ve_png.c

/* output type */
#define ARGB8888   0
#define ABGR8888   1
#define RGBA8888   2
#define BGRA8888   3
#define RGB888     4
#define BGR888     5

#define OUTPUT_FORMAT ARGB8888
```

**JPG LOGO**

更换 jpg 格式的 logo 图片，將图片存放于以下路徑：

```
target/<IC>/<Board>/logo/boot_logo.jpg
```

注解

图片必须命名为 boot_logo.jpg

更换 jpg logo 图片，需要注意以下几点

1. jpg 图片的宽高不能大于当前 LCD panel 的宽高
2. 修改 logo.its 文件， 将 boot_logo.jpg 打包进 logo.itb 文件
3. image_cfg.json 文件中 logo 分区 size （默认 768K）需要大于 logo.itb 文件

logo.its 文件修改，以 spi-nand 启动为例：

```
// target/<IC>/<Board>/logo.its 板级配置，如果存在，优先修改
// target/<IC>/common/logo.its 默认配置

/dts-v1/;

/ {
 description = "ArtInChip LOGO";
 #address-cells = <1>;

 images {
  boot {
   description = "ArtInChip boot logo";
   type = "multi";
   compression = "none";
   data = /incbin/("logo/boot_logo.jpg");   // 修改为 jpg 图片
  };

  usbburn {
   description = "USB burn logo";
   type = "multi";
   compression = "none";
   data = /incbin/("logo/usb_burn.png");
  };

  udiskburn {
   description = "udisk burn logo";
   type = "multi";
   compression = "none";
   data = /incbin/("logo/udisk_burn.png");
  };

  sdburn {
   description = "SDCard burn logo";
   type = "multi";
   compression = "none";
   data = /incbin/("logo/sd_burn.png");
  };

  burn_done {
   description = "burn done logo";
   type = "multi";
   compression = "none";
   data = /incbin/("logo/burn_done.png");
  };
 };

 configurations {
  default = "conf-1";

  conf-1 {
   description = "ArtInChip logo image";
  };
 };
};
```

jpeg 硬解码输出的是 YUV 数据, 需要 GE 进行一次数据格式转换，GE 默认转换的格式为 ARGB8888。 如果想修改转换格式，需要修改 uboot 源码。

```
// drivers/video/artinchip/decoder/aic_ve_jpeg.c

/* GE output format */
#define CONVER_FORMAT MPP_FMT_ARGB_8888

// include/artinchip/mpp_types.h
```

### 9. falcon 模式 logo

ArtInChip 平台支持在 falcon 启动时显示 logo。

注解

目前仅支持 `spinand` falcon 启动显示 logo，且只能显示 png 格式的 logo。

### 10. FAQ

- 新屏支持

参考SDK指南中的显示模块使用指南，两者思路相同。