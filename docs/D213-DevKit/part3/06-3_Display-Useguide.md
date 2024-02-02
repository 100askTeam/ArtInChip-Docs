---
sidebar_position: 13
---
# Display 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语     | 定义                               | 注释说明                         |
| -------- | ---------------------------------- | -------------------------------- |
| DE       | Display Engine                     | 显示引擎                         |
| DI       | Display Interface                  | 显示接口，包括RGB/LVDS/DSI等     |
| PANEL    | panel                              | 外接屏幕驱动                     |
| RGB      | Red Green Blue                     | 按红绿蓝三原色编码的显示接口标准 |
| LVDS     | Low Voltage Differential Signaling | 低压差分信号的显示接口标准       |
| MIPI-DSI | Mipi Display Serial Interface      | Mipi组织定义的一个显示接口标准   |
| I8080    | /                                  | Inter提出的8080总线标准          |
| SPI      | Serial Peripheral Interface        | 串行外设接口，由spi协议传输数据  |

### 1.2. 系统简介

显示模块包含了显示引擎 (DE)，显示接口 (DI)。其中显示接口支持 RGB/LVDS/DSI/I8080/SPI 等接口标准。

显示模块的主要功能是将内存中的数据转换成显示接口需要的信号，并且支持多图层的叠加输出。从硬件角度看，显示模块的框架如下所示：

![../../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/display_system1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/display_system1-17066864576981.png)

图 6.21 *显示模块*

### 1.3. 特性说明

#### 1.3.1. 显示引擎

**Display Engine**

- 最大输入/输出图像大小 2048x2048

- 最高性能 1920*1080@60fps

- 支持两个显示图层，一个 Video 图层，一个 UI 图层，UI 图层内支持4个矩形窗口

- UI 图层支持图像格式：ARGB8888/XRGB8888/RGB888/ARGB4444/ARGB1555/RGB565

- Video 图层支持图像格式：

  > - ARGB8888/XRGB8888/RGB888/ARGB4444/ARGB1555/RGB565
  > - YUV420P/NV12/NV21/YUV420_TILE_64x32/YUV420_TILE_128x16
  > - YUV422P/NV16/NV61/YUYV/YVYU/UYVY/VYUY/YUV422_TILE_64x32/YUV422_TILE_128x16
  > - YUV400

- Video图层的 YUV 格式支持 1/31.999x ~ 32x 缩放（RGB格式不支持）

- 支持误差扩散 Dither

#### 1.3.2. 显示接口

**RGB接口**

- 支持 PRGB/SRGB/I8080/SPI 四种接口
  - PRGB 并行 RGB 接口
    - 支持 PRGB 24/18/16 bit 模式，最高性能 1080P60
  - SRGB 串行 RGB 接口
    - 支持 SRGB 8/6 bit 模式，最高性能 480x320@60fps
  - I8080 接口
    - 支持 I8080 24/18/16/9/8 bit 模式，最高性能 960x540@60fps
  - SPI 接口
    - 支持 SPI 3wire/4wire/4-sda 模式，最高性能 480x320@60fps
    - 支持 SPI 8/24/32 read模式
- 支持 8 位色深，R/G/B 三组信号可任意交叉，空白区域数据可配置
- 支持 R/G/B 组内数据输出顺序切换
- PRGB/SRGB 时钟提供 4 个相位选择

**LVDS接口**

- 支持 Single Link 和 Dual Link，最高速率 700M bps
- 支持 VESA 和 JEIDA 模式
- 支持 18bit 和 24bit 数据传输
- 支持 LVDS 信号极性选择模式
- 支持 LVDS Link0 和 Link1 整组互换
- 支持 LVDS 五组差分对信号任意互换

**MIPI-DSI接口**

- 最大支持 1080P60 及衍生分辨率，支持 Video 和 Command 模式
- Video 模式支持 Non-burst 和 Burst 两种方式
- 可配置为 1/2/3/4 对数据通道，每通道最大支持 1Gbps 速率
- 支持 RGB888，RGB666，RGB666 packed，RGB565

## 2. 参数配置

本章节介绍显示模块的参数配置，包括 menuconfig 配置 和 dts 配置。

### 2.1. menuconfig配置

#### 2.1.1. 使能显示模块驱动

在 luban 根目录下执行 make linux-menuconfig，进入 kernel 的功能配置，使能显示模块驱动：

```
Linux
    Device Drivers
        Graphics support
            ArtInChip Graphics  --->
                <*> ArtInChip Framebuffer support
```

#### 2.1.2. 编译显示接口

使能显示模块的驱动后，需要将显示接口编译进内核。

```
<*> ArtInChip Framebuffer support
    [*]   ArtInChip display rgb support
    [*]   ArtInChip display lvds support
    [*]   ArtInChip display mipi-dsi support
```

可以将三个显示接口都编译进内核，但系统运行时，只有 panel 驱动所对应的显示接口能生效。



#### 2.1.3. 选择panel

Luban sdk 不仅为 RGB/LVDS 等显示接口提供了通用的 panel 驱动，也为部分屏驱 IC 提供专用 panel 驱动。

选择特定的 panel 驱动，要先使能 panel 对应的显示接口和 pwm-backlight，否则 panel 在 menuconfig 中不可见。

```
<*> ArtInChip Framebuffer support
    <*>   ArtInChip Panel Drivers (ArtInChip general RGB panel)  --->
```

#### 2.1.4. 使能背光

显示模块驱动使用 pwm-backlight 框架进行背光控制

使能 PWM

```
Device Drivers
    [*] Pulse-Width Modulation (PWM) Support  --->
         <*>   ArtInChip PWM support
```

使能 pwm-backlight

```
Device Drivers
    Graphics support
        Backlight & LCD device support
            <*> Lowlevel Backlight controls
                <*> Generic PWM based Backlight Driver
```

#### 2.1.5. 驱动依赖项

显示模块驱动依赖 CMA 和 DMA-BUF 功能。



##### 2.1.5.1. 配置CMA

在 luban 根目录下执行 make kernel-menuconfig，使能 CMA：

```
Linux
    Memory Management options
        [*] Contiguous Memory Allocator
```

配置 CMA 内存区域的大小，在内核配置的另一个地方，以下配置为 12MB：

```
Linux
    Library routines
    [*] DMA Contiguous Memory Allocator
    (12)  Size in Mega Bytes
```

小技巧

CMA 内存区域无法随意设置大小, Size 需要 4M 对齐。

Linux 启动时会对 CMA size 进行 4M 对齐，对齐操作与 CONFIG_FORCE_MAX_ZONEORDER 设置相关。 ArtInChip 平台上，该配置为 11，意思为一次最大分配内存为 2^10 pages，即 4M。

##### 2.1.5.2. 使能 DMA-BUF

在 luban 根目录下执行 make kernel-menuconfig，进入 kernel 的功能配置，按如下选择：

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

### 2.2. DTS参数配置

#### 2.2.1. 系统参数配置

系统参数主要在文件 `target/d211/common/d211.dtsi` 中。模块的系统参数随 IC 的设定而定，不建议用户修改模块系统参数。

##### 2.2.1.1. fb0

```
display-fb {
    compatible = "artinchip,aic-framebuffer";
    #address-cells = <1>;
    #size-cells = <0>;
    fb0: fb@0 {
        reg = <0x0 0x0>;
    };
};
```

##### 2.2.1.2. display engine

```
de0: de@18a00000 {
    #address-cells = <1>;
    #size-cells = <0>;
    compatible = "artinchip,aic-de-v1.0";
    reg = <0x0 0x18a00000 0x0 0x1000>;
    interrupts-extended = <&plic0 59 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cmu CLK_DE>, <&cmu CLK_PIX>;
    clock-names = "de0", "pix";
    resets = <&rst RESET_DE>;
    reset-names = "de0";
    mclk-rate = <200000000>;
};
```

##### 2.2.1.3. rgb display interface

```
rgb0: rgb@18800000 {
    #address-cells = <1>;
    #size-cells = <0>;
    compatible = "artinchip,aic-rgb-v1.0";
    reg = <0x0 0x18800000 0x0 0x1000>;
    clocks = <&cmu CLK_RGB>, <&cmu CLK_SCLK>;
    clock-names = "rgb0", "sclk";
    resets = <&rst RESET_RGB>;
    reset-names = "rgb0";
};
```

##### 2.2.1.4. lvds display interface

```
lvds0: lvds@18810000 {
    #address-cells = <1>;
    #size-cells = <0>;
    compatible = "artinchip,aic-lvds-v1.0";
    reg = <0x0 0x18810000 0x0 0x1000>;
    clocks = <&cmu CLK_LVDS>, <&cmu CLK_SCLK>;
    clock-names = "lvds0", "sclk";
    resets = <&rst RESET_LVDS>;
    reset-names = "lvds0";
};
```

##### 2.2.1.5. mipi-dsi display interface

```
dsi0: dsi@18820000 {
    #address-cells = <1>;
    #size-cells = <0>;
    compatible = "artinchip,aic-mipi-dsi-v1.0";
    reg = <0x0 0x18820000 0x0 0x1000>;
    clocks = <&cmu CLK_MIPIDSI>, <&cmu CLK_SCLK>;
    clock-names = "dsi0", "sclk";
    resets = <&rst RESET_MIPIDSI>;
    reset-names = "dsi0";
    interrupts-extended = <&plic0 56 IRQ_TYPE_LEVEL_HIGH>;
    data-lanes = <0 1 2 3>;
    lane-polarities = <0 0 0 0>;
};
```

#### 2.2.2. 功能参数配置

功能参数主要针对某一个使用方案，随着方案的改变，参数很可能不同。

这些参数主要在文件 target/d211/方案x/board.dts 中，功能参数的设置必须和硬件原理图相匹配。

功能参数的设置亦可参看以下路径的内核文档：

```
linux-5.10/Documentation/devicetree/bindings/display/artinchip/
    artinchip-de.txt  artinchip-dsi.txt  artinchip-fb.txt  artinchip-lvds.txt  artinchip-panel.txt  artinchip-rgb.txt

linux-5.10/Documentation/devicetree/bindings/display/panel/artinchip/
    panel-dsi.txt  panel-lvds.txt  panel-rgb.txt
```

功能参数之间会构成一条完整的数据链路，如何设置可查看 [屏配置指南](../../06_panel_port/index.html#ref-to-panel-port) 相关章节。

```
/* The data flow:
* fb ---> de ----> di ----> panel
*              {-> lvds ->}
*              |-> rgb  ->|
*              '-> dsi  ->'
*/
```

##### 2.2.2.1. Panel

###### 2.2.2.1.1. panel rgb

```
panel_rgb {
    compatible = "artinchip,aic-general-rgb-panel";
    status = "okay";

    rgb-mode = <PRGB>;
    interface-format = <PRGB_24BIT>;
    clock-phase = <DEGREE_0>;
    data-order = <RGB>;
    backlight = <&backlight>;
    // enable-gpios = <&gpio_a 4 GPIO_ACTIVE_HIGH>;

    port {
        panel_rgb_in: endpoint {
            remote-endpoint = <&rgb0_out>;
        };
    };

    display-timings {
        native-mode = <&timing0>;
        timing0: 1024x600 {
            clock-frequency = <45000000>;
            hactive = <1024>;
            vactive = <600>;
            hback-porch = <140>;
            hfront-porch = <160>;
            hsync-len = <20>;
            vback-porch = <12>;
            vfront-porch = <20>;
            vsync-len = <3>;
            de-active = <1>;
            pixelclk-active = <1>;
        };
    };
};
```

注解

相关宏定义取值在文件 include/dt-bindings/display/artinchip,aic-disp.h 中

**Required properties:**

- port

  > 连接到 RGB 显示接口的输入端口，将 panel_rgb 结点与 rgb 结点关联起来。

**Optional properties:**

- rgb-mode

  > 设置 RGB 显示接口的输出模式，可以设置为并行 RGB、串行 RGB、I8080、SPI。默认为并行 RGB 模式
  >
  > | rgb-mode | macro | value |
  > | -------- | ----- | ----- |
  > | 并行RGB  | PRGB  | 0     |
  > | 串行RGB  | SRGB  | 1     |
  > | I8080    | I8080 | 2     |
  > | SPI      | SPI   | 3     |

- interface-format

  > 设置 RGB 显示接口的输出格式，默认输出并行 RGB 24-bit。
  >
  > PRGB 的 18bit/16bit 兼容 2 种输出模式，可根据不同的封装或走线需求进行选择。
  >
  > - PRGB_18BIT_LD 表示将 24 个 pin 中最低位的 6 个 pin 丢弃
  > - PRGB_18BIT_HD 表示将 24 个 pin 中最高位的 6 个 pin 丢弃
  >
  > 16 bit 模式同理，丢弃 24 个 pin 中的 8 个，详情可参考芯片数据手册中 LCD 章节中的功能描述。
  >
  > | mode  | macro                     | value |
  > | ----- | ------------------------- | ----- |
  > | PRGB  | PRGB_24BIT                | 0     |
  > |       | PRGB_18BIT_LD             | 1     |
  > |       | PRGB_18BIT_HD             | 2     |
  > |       | PRGB_16BIT_LD             | 3     |
  > |       | PRGB_16BIT_HD             | 4     |
  > | SRGB  | SRGB_8BIT                 | 0     |
  > |       | SRGB_6BIT                 | 1     |
  > | I8080 | I8080_RGB565_8BIT         | 0     |
  > |       | I8080_RGB666_8BIT         | 1     |
  > |       | I8080_RGB666_9BIT         | 2     |
  > |       | I8080_RGB666_16BIT_3CYCLE | 3     |
  > |       | I8080_RGB666_16BIT_2CYCLE | 4     |
  > |       | I8080_RGB565_16BIT        | 5     |
  > |       | I8080_RGB666_18BIT        | 6     |
  > |       | I8080_RGB888_24BIT        | 7     |
  > | SPI   | SPI_3LINE_RGB565          | 0     |
  > |       | SPI_3LINE_RGB666          | 1     |
  > |       | SPI_3LINE_RGB888          | 2     |
  > |       | SPI_4LINE_RGB565          | 3     |
  > |       | SPI_4LINE_RGB666          | 4     |
  > |       | SPI_4LINE_RGB888          | 5     |
  > |       | SPI_4SDA_RGB565           | 6     |
  > |       | SPI_4SDA_RGB666           | 7     |
  > |       | SPI_4SDA_RGB888           | 8     |

- clock-phase

  > pixel时钟输出相位选择, 允许设置时钟上升沿延后数据 0°/90°/180°/270° 相位。 默认为 0°
  >
  > | degress | macro      | value |
  > | ------- | ---------- | ----- |
  > | 0°      | DEGREE_0   | 0     |
  > | 90°     | DEGREE_90  | 1     |
  > | 180°    | DEGREE_180 | 2     |
  > | 270°    | DEGREE_270 | 3     |

- data-order

  > RGB 数据的输出顺序，R/G/B 三组信号可按任意顺序输出。默认为 RGB 顺序输出。
  >
  > | 数据输出顺序 | macro | value      |
  > | ------------ | ----- | ---------- |
  > | RGB          | RGB   | 0x02100210 |
  > | RBG          | RBG   | 0x02010201 |
  > | BGR          | BGR   | 0x00120012 |
  > | BRG          | BRG   | 0x00210021 |
  > | GRB          | GRB   | 0x01200120 |
  > | GBR          | GBR   | 0x01020102 |

- data-mirror

  > 布尔型参数，控制 RGB 数据组内大小端输出。默认输出低位到高位 0 - 7。如果设置则输出变为 7 - 0

- disp-dither

  > 颜色输出深度控制，使图像过度更平滑。当内存数据为 8bit ，但输出为 6bit 或者 5bit 时，使能 dither 能让图像过度更平滑，否则直接丢弃低位 bit。
  >
  > 配置 dither 时默认使能随机 dither ，获取更好的显示效果。
  >
  > | 颜色输出深度                                  | macro         | value |
  > | --------------------------------------------- | ------------- | ----- |
  > | R 分量输出 5bitG 分量输出 6bitB 分量输出 5bit | DITHER_RGB565 | 0x1   |
  > | R 分量输出 6bitG 分量输出 6bitB 分量输出 6bit | DITHER_RGB666 | 0x2   |

- tearing-effect

  > TE 信号响应模式，配合屏幕 TE 信号使用，控制 DE 模块的输出，避免 LCD 屏幕出现撕裂现象。
  >
  > > - 连续刷新 (default) ：忽略 TE 信号, 连续刷新
  > > - 手动刷新：DE timging enable 后在下一个 TE 信号更新画面
  > > - 自动刷新： 每收到一个 TE 信号，自动更新画面，更新期间忽略 TE 信号
  >
  > 手动刷新和自动刷新模式下，需要设定 TE 脉冲宽度，用于检测屏幕 TE 信号。
  >
  > | TE mode  | macro     | value |
  > | -------- | --------- | ----- |
  > | 连续刷新 | TE_BYPASS | 0x0   |
  > | 手动刷新 | TE_HOLD   | 0x1   |
  > | 自动刷新 | TE_AUTO   | 0x2   |

- te-pulse-width

  > TE 脉冲宽度，用于检测 TE 同步信号的有效状态，建议设为5。

- enable-gpios

  > 预留的屏幕使能引脚，可用于控制屏幕供电，不使用 pwm-backlight 的情况下亦可控制屏幕背光。

- backlight

  > 屏幕的 pwm-backlight 配置节点。

- display-timings

  > 屏的时序信号。由屏厂提供。

###### 2.2.2.1.2. panel lvds

```
panel_lvds {
    compatible = "artinchip,aic-general-lvds-panel";
    data-mapping = "vesa-24";
    data-channel = "single-link1";
    backlight = <&backlight>;
    // enable-gpios = <&gpio_a 4 GPIO_ACTIVE_HIGH>;
    status = "okay";

    port {
        panel_lvds_in: endpoint {
            remote-endpoint = <&lvds0_out>;
        };
    };

    display-timings {
        native-mode = <&timing1>;
        timing1: 1024x600 {
            clock-frequency = <60000000>;
            hactive = <1024>;
            vactive = <600>;
            hback-porch = <140>;
            hfront-porch = <160>;
            hsync-len = <20>;
            vback-porch = <20>;
            vfront-porch = <12>;
            vsync-len = <3>;
            de-active = <1>;
            pixelclk-active = <1>;
        };
    };
};
```

**Required properties:**

- port

  > 连接到LVDS显示接口的输入端口，将panel_lvds结点与lvds结点关联起来。

- data-mapping

  > lvds 模式设置，字符串参数，默认输出为”vesa-24”
  >
  > | lvds mode   | strings    |
  > | ----------- | ---------- |
  > | NS          | “vesa-24”  |
  > | JEIDA 8 bit | “jeida-24” |
  > | JEIDA 6 bit | “jeida-18” |

- data-channel

  > lvds link 设置，字符串参数，默认输出”lvds-link0”，单link输出，link0通道。
  >
  > | lvds link mode | strings         | 备注                                                |
  > | -------------- | --------------- | --------------------------------------------------- |
  > | 单Link模式0    | “single-link0”  | 单link输出，输出选择link0通道                       |
  > | 单Link模式1    | “single-link1”  | 单link输出，输出选择link1通道                       |
  > | 单Link模式2    | “double-screen” | 单link输出，link0 和 link1 同时输出，可驱动双屏同显 |
  > | 双Link模式     | “dual-link”     | dual link输出，奇偶像素同时输出                     |

**Optional properties:**

- disp-dither

  > 颜色输出深度控制，使图像过度更平滑。当内存数据为 8bit ，但输出为 6bit 或者 5bit 时，使能 dither 能让图像过度更平滑，否则直接丢弃低位 bit。
  >
  > 配置 dither 时默认使能随机 dither ，获取更好的显示效果。
  >
  > | 颜色输出深度                                  | macro         | value |
  > | --------------------------------------------- | ------------- | ----- |
  > | R 分量输出 5bitG 分量输出 6bitB 分量输出 5bit | DITHER_RGB565 | 0x1   |
  > | R 分量输出 6bitG 分量输出 6bitB 分量输出 6bit | DITHER_RGB666 | 0x2   |

- tearing-effect

  > TE 信号响应模式，配合屏幕 TE 信号使用，控制 DE 模块的输出，避免 LCD 屏幕出现撕裂现象。
  >
  > > - 连续刷新 (default) ：忽略 TE 信号, 连续刷新
  > > - 手动刷新：DE timging enable 后在下一个 TE 信号更新画面
  > > - 自动刷新： 每收到一个 TE 信号，自动更新画面，更新期间忽略 TE 信号
  >
  > 手动刷新和自动刷新模式下，需要设定 TE 脉冲宽度，用于检测屏幕 TE 信号。
  >
  > | TE mode  | macro     | value |
  > | -------- | --------- | ----- |
  > | 连续刷新 | TE_BYPASS | 0x0   |
  > | 手动刷新 | TE_HOLD   | 0x1   |
  > | 自动刷新 | TE_AUTO   | 0x2   |

- te-pulse-width

  > TE 脉冲宽度，用于检测 TE 同步信号的有效状态，建议设为5。

- enable-gpios

  > 预留的屏幕使能引脚，可用于控制屏幕供电，不使用 pwm-backlight 的情况下亦可控制屏幕背光。

- backlight

  > 屏幕的 pwm-backlight 配置节点。

- display-timings

  > 屏的时序信号。由屏厂提供。

###### 2.2.2.1.3. panel dsi

```
panel_dsi {
    compatible = "artinchip,aic-dsi-panel-simple";
    backlight = <&backlight>;
    // enable-gpios = <&gpio_a 4 GPIO_ACTIVE_HIGH>;
    status = "okay";

    port {
        panel_dsi_in: endpoint {
            remote-endpoint = <&dsi0_out>;
        };
    };
};
```

**Required properties:**

- port

  > 连接到MIPI-DSI显示接口的输入端口，将panel_dsi结点与dsi结点关联起来。

**Optional properties:**

- dsi,mode

  > dsi模式设置，字符串参数，支持video 与 command 两种模式。Video模式支持Non-burst和Burst两种方式。
  >
  > | dsi mode         | strings        |
  > | ---------------- | -------------- |
  > | video pulse mode | “video-pulse”  |
  > | video event mode | “video-event”  |
  > | video burst mode | “video-burst”  |
  > | command mode     | “command-mode” |

- dsi,format

  > dsi 显示接口输出格式。字符串参数，支持RGB888，RGB666，RGB666 packed，RGB565
  >
  > | dsi outout format | strings   |
  > | ----------------- | --------- |
  > | RGB888            | “rgb888”  |
  > | RGB666            | “rgb666”  |
  > | RGB666 packed     | “rgb666l” |
  > | RGB565            | “rgb565”  |

- dsi,lane_num

  > 数据通路数量，整型，取值 1 ~ 4

- disp-dither

  > 颜色输出深度控制，使图像过度更平滑。当内存数据为 8bit ，但输出为 6bit 或者 5bit 时，使能 dither 能让图像过度更平滑，否则直接丢弃低位 bit。
  >
  > 配置 dither 时默认使能随机 dither ，获取更好的显示效果。
  >
  > | 颜色输出深度                                  | macro         | value |
  > | --------------------------------------------- | ------------- | ----- |
  > | R 分量输出 5bitG 分量输出 6bitB 分量输出 5bit | DITHER_RGB565 | 0x1   |
  > | R 分量输出 6bitG 分量输出 6bitB 分量输出 6bit | DITHER_RGB666 | 0x2   |

- tearing-effect

  > TE 信号响应模式，配合屏幕 TE 信号使用，控制 DE 模块的输出，避免 LCD 屏幕出现撕裂现象。
  >
  > > - 连续刷新 (default) ：忽略 TE 信号, 连续刷新
  > > - 手动刷新：DE timging enable 后在下一个 TE 信号更新画面
  > > - 自动刷新：每收到一个 TE 信号，自动更新画面，更新期间忽略 TE 信号
  >
  > 手动刷新和自动刷新模式下，需要设定 TE 脉冲宽度，用于检测屏幕 TE 信号。
  >
  > | TE mode  | macro     | value |
  > | -------- | --------- | ----- |
  > | 连续刷新 | TE_BYPASS | 0x0   |
  > | 手动刷新 | TE_HOLD   | 0x1   |
  > | 自动刷新 | TE_AUTO   | 0x2   |

- te-pulse-width

  > TE 脉冲宽度，用于检测 TE 同步信号的有效状态，建议设为5。

- enable-gpios

  > 预留的屏幕使能引脚，可用于控制屏幕供电，不使用 pwm-backlight 的情况下亦可控制屏幕背光。

- backlight

  > 屏幕的 pwm-backlight 配置节点。

- display-timings

  > 屏的时序信号。由屏厂提供。

##### 2.2.2.2. backlight

###### 2.2.2.2.1. pwm-backlight

```
panel_rgb {
    ...
    backlight = <&backlight>;

}

backlight: backlight {
    compatible = "pwm-backlight";
    /* pwm node name; pwm device No.; period_ns; pwm_polarity */
    pwms = <&pwm 2 1000000 0>;
    brightness-levels = <0 10 20 30 40 50 60 70 80 90 100>;
    default-brightness-level = <8>;
    status = "okay";
};

&pwm {
    status = "okay";
    pinctrl-names = "default";
    pinctrl-0 = <&pwm2_pins_b>;
    /* mode: up-count, down-count, up-down-count
       action: none, low, high, inverse */

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

};
```

背光控制依赖 PWM 模块，详细配置可参考 PWM 使用指南。

##### 2.2.2.3. Display Interface

###### 2.2.2.3.1. RGB Display Interface

```
&rgb0 {
    pinctrl-names = "default";
    pinctrl-0 = <&lcd_pins>;
    status = "okay";

    port@0 {
        reg = <0>;
        rgb0_in: endpoint {
            remote-endpoint = <&de0_out>;
        };
    };

    port@1 {
        reg = <1>;
        rgb0_out: endpoint {
            remote-endpoint = <&panel_rgb_in>;
        };
    };
};
```

- pinctrl-names

  > SDK一般会把要使用的某一功能的端口组预先定义，后期直接使用即可，定义一般放在target/aicxxx/common/aicxxx-pinctrl.dtsi文件中，目前“pinctrl-names” 均设置为“default” 即可

- pinctrl-0

  > 即指示rgb显示接口预先定义的端口组

- port@0

  > 数据输入端口，连接 display engine 结点

- port@1

  > 数据输出端口，连接 panel rgb 结点

###### 2.2.2.3.2. LVDS Display Interface

```
&lvds0 {
    pinctrl-names = "default";
    pinctrl-0 = <&lvds0_pins>;
    lines = <0x43210>;
    link-swap = <0>;
    status = "okay";

    port@0 {
        reg = <0>;
        lvds0_in: endpoint {
            remote-endpoint = <&de0_out>;
        };
    };

    port@1 {
        reg = <1>;
        lvds0_out: endpoint {
            remote-endpoint = <&panel_lvds_in>;
        };
    };
};
```

- pinctrl-names

  > SDK一般会把要使用的某一功能的端口组预先定义，后期直接使用即可，定义一般放在target/aicxxx/common/aicxxx-pinctrl.dtsi文件中，目前“pinctrl-names” 均设置为“default” 即可

- pinctrl-0

  > 即指示lvds显示接口预先定义的端口组

- port@0

  > 数据输入端口，连接 display engine 结点

- port@1

  > 数据输出端口，连接 panel lvds 结点

**Optional:**

- link-swap

  > 整型，link0 与 link1 整组交换

- lines

  > 整型，控制 lvds link 内部 5 个通道的差分信号输出，允许 5 对差分信号任意互换
  >
  > 5 个通道分别为 D3 CK D2 D1 D0，缺省值为：0x43210
  >
  > 0x43210 表示 D3 通道输出 D3，CK 通道输出 CK，D2 通道输出 D2，D1 通道输出 D1，D0 通道输出 D0
  >
  > 0x01234 表示 D3 通道输出 D0，CK 通道输出 D1，D2 通道输出 D2，D1 通道输出 CK，D0 通道输出 D3

- pols

  > 整型，LVDS差分信号极性控制。低 5 bit 分别控制 LVDS 五个通道差分信号的极性。通道顺序为 D3 CK D2 D1 D0
  >
  > 0x3 表示 D1 D0 通道极性反相，0x8 表示 CK 通道反相
  >
  > pols 属性受 lines 属性影响，如果 CK 通道选择输出 D0，则该 bit 控制 D0 相位，0x8 表示 D0 反相

- sync-ctrl

  > 布尔型，同步前端信号模式，默认开启。防止前端输出半帧数据时打开 LVDS 模块，出现显示异常

- phys

  > 整型，LVDS参考电压控制。数值直接写入 LVDS_0_PHY_CTL 和 LVDS_1_PHY_CTL 寄存器，参考芯片用户手册进行配置。

注解

lines、pols 和 phys 属性会同时作用于 link0 和 link1

###### 2.2.2.3.3. MIPI-DSI Display Interface

```
&dsi0 {
    pinctrl-names = "default";
    pinctrl-0 = <&dsi_pins>;
    data-lanes = <3 0 1 2>;
    lane-polarities = <1 0 1 0>;
    data-clk-inverse;
    status = "okay";

    port@0 {
        reg = <0>;
        dsi0_in: endpoint {
            remote-endpoint = <&de0_out>;
        };
    };

    port@1 {
        reg = <1>;
            dsi0_out: endpoint {
            remote-endpoint = <&panel_dsi_in>;
        };
    };
};
```

- pinctrl-names

  > SDK一般会把要使用的某一功能的端口组预先定义，后期直接使用即可，定义一般放在target/aicxxx/common/aicxxx-pinctrl.dtsi文件中，目前“pinctrl-names” 均设置为“default” 即可

- pinctrl-0

  > 即指示mipi-dsi显示接口预先定义的端口组

- port@0

  > 数据输入端口，连接 display engine 结点

- port@1

  > 数据输出端口，连接 panel dsi 结点

**Optional:**

- data-clk-inverse

  > 布尔型，CLK Lane 正负极取反

- data-lanes
```
  > 数组，数据通道输出选择，默认为 <0 1 2 3>
  >
  > <0 1 2 3> 表示数据通道0 输出 DATA0，数据通道1 输出 DATA1，以此类推
  >
  > <3 0 1 2> 表示数据通道0 输出 DATA3，数据通道1 输出 DATA0，数据通道2 输出 DATA1，数据通道3 输出 DATA2
  >
  > 如果是两个 lane，可配置成 <0 1>，数据通道0 输出 DATA0, 数据通道1 输出 DATA1
```
- lane-polarities
```
  > 数组，表示数据通道极性，是否正负极取反，默认为 <0 0 0 0>，与 data-lanes 配置的通道顺序保持一致。
  >
  > data-lanes = <3 0 1 2>; lane-polarities = <1 0 1 0>; 表示 DATA3 和 DATA1 正负极取反
```
##### 2.2.2.4. Display Engine

###### 2.2.2.4.1. Display Engine

```
&de0 {
        status = "okay";

        port@0 {
                reg = <0>;
                de0_in: endpoint {
                        remote-endpoint = <&fb0_out>;
                };
        };

        port@1 {
                reg = <1>;
                de0_out: endpoint {
                        remote-endpoint = <&lvds0_in>;
                };
        };
};
```

- port@0

  > 数据输入端口，连接 display engine 结点

- port@1

  > 数据输出端口，连接到display interface 结点，此处例子为连接 lvds 结点

- tearing-effect

  > tearing effetc 模式，支持 bypass / hold / auto 三种模式
  >
  > | tearing effect mode | macro     | value | 备注                                      |
  > | ------------------- | --------- | ----- | ----------------------------------------- |
  > | bypass              | TE_BYPASS | 0     | 连续模式，持续刷新，不启用te              |
  > | hold                | TE_HOLD   | 1     | 单帧模式，需要手动刷新                    |
  > | auto                | TE_AUTO   | 2     | 自动单帧模式， 接受到te信号后刷新一帧数据 |

- te-pulse-width

  > TE 信号的脉冲宽度，设置其脉冲宽度等于多少个pixel clock cycle

##### 2.2.2.5. Display FB0

###### 2.2.2.5.1. Display FB0

```
&fb0 {
    artinchip,uboot-logo-on=<1>;
    rotation-degress = <270>;
    rotation-buf-num = <2>;
    height-virtual = <2160>;
    disp-bright = <45>;
    disp-contrast = <50>;
    disp-saturation = <60>;
    disp-hue = <50>;

    port {
        fb0_out: endpoint {
            remote-endpoint = <&de0_in>;
        };
    };
};
```

**Required properties:**

- port

  > 数据输出端口，连接 display engine 结点

- artinchip,uboot-logo-on

  > 是否保持 uboot 阶段的 logo

**Optional properties:**

- format

  > framebuffer 内存数据格式，string 型参数，缺省为 `a8r8g8b8` ，表示 32 位 ARGB8888 格式。显示驱动目前适配了以下几种常见格式：
  >
  > | format   | strings    |
  > | -------- | ---------- |
  > | ARGB8888 | “a8r8g8b8” |
  > | ABGR8888 | “a8b8g8r8” |
  > | XRGB8888 | “x8r8g8b8” |
  > | RGB888   | “r8g8b8”   |
  > | RGB565   | “r5g6b5”   |
  > | ARGB1555 | “a1r5g5b5” |

- disp-bright

  > 显示亮度，[0, 100], 缺省等于 50，50 表示不调节亮度。

- disp-contrast

  > 显示对比度，[0, 100], 缺省等于 50，50 表示不调节对比度。

- disp-saturation

  > 显示饱和度，[0, 100], 缺省等于 50，50 表示不调节饱和度。

- disp-hue

  > 显示色调，[0, 100], 缺省等于 50，50 表示不调节色调。

- rotation-degress

  > framebuffer 旋转角度，在竖屏横用或横屏竖用时配置，支持 0°/90°/180°/270° 旋转。

- rotation-buf-num

  > framebuffer 中需要旋转的 buffer 个数。部分应用程序会使用双 buffer 来避免撕裂。

- width-virtual

  > framebuffer 的内存宽度，缺省等于 width。用于配置双 buffer。

- height-virtual

  > framebuffer 的内存高度，缺省等于 height。用于配置双 buffer。

- width

  > display engine 图像输出宽度，缺省等于 panel 子节点 display-timings 中的 hactive 属性。
  >
  > 预留节点，为 display engine 的缩放功能预留，一般不需要配置。

- height

  > display engine 图像输出高度，缺省等于 panel 子节点 display-timings 中的 vactive 属性。
  >
  > 预留节点，为 display engine 的缩放功能预留，一般不需要配置。

## 3. 调试指南

### 3.1. 调试开关

#### 3.1.1. DE 调试开关

在 luban 根目录下执行 make kernel-menuconfig，进入 kernel 的功能配置，打开 DE 模块的 DEBUG 选项：

```
Linux
    Kernel hacking
        Artinchip Debug
            [*] DE driver debug
```

此 DEBUG 选项打开的影响：

1. DE 驱动以-O0编译
2. DE 驱动的 pr_dbg()和 dev_dbg()调试信息会被编译

在系统运行时，如果要打印 pr_dbg() 和 dev_dbg() 信息，还需要调整 loglevel 为8，两个方法：

1. 在 board.dts 中修改 bootargs，增加 “loglevel=8”
2. 在板子启动到 Linux shell 后，执行命令：

```
echo 8 > /proc/sys/kernel/printk
```

小技巧

如无特殊说明，本文档中的 DE 驱动表示显示模块的驱动，包含显示引擎模块，显示接口模块，LCD 的 panel 驱动。并非仅仅指示显示引擎。

#### 3.1.2. CMA 调试开关

在 luban 根目录下执行 make kernel-menuconfig，进入 kernel 的功能配置，打开 CMA 框架的 DEBUG 选项：

```
Linux
     Memory Management options
         [*]   CMA debug messages (DEVELOPMENT)
         [*]   CMA debugfs interface
```

这两个 DEBUG 选项打开的影响：

1. CMA 框架中 pr_debug() 调试信息会被编译
2. debugfs 中添加 cma 结点



### 3.2. Component

查看Component的注册信息，

```
# mount -t debugfs none /sys/kernel/debug/
# cat /sys/kernel/debug/device_component/soc\:display-fb
master name                                            status
-------------------------------------------------------------
soc:display-fb                                          bound

device name                                            status
-------------------------------------------------------------
98a00000.de                                             bound
98800000.rgb                                            bound
panel0                                                  bound
```

如果 bound 失败，控制台输出如下：

```
# cat /sys/kernel/debug/device_component/soc\:display-fb
master name                                            status
-------------------------------------------------------------
soc:display-fb                                      not bound

device name                                            status
-------------------------------------------------------------
18a00000.de                                         not bound
18800000.rgb                                        not bound
(unknown)                                      not registered
```

### 3.3. CMA

在 menuconfig 配置中使能 CMA debug 开关后，可通过 debugfs 调试 CMA。

```
# mount -t debugfs none /sys/kernel/debug/
# ls /sys/kernel/debug/cma/cma-reserved/
alloc          bitmap         free           order_per_bit
base_pfn       count          maxchunk       used
```

CMA 调试接口：

- **alloc**

  > 申请 cma 内存，以 page 为单位

- **free**

  > 释放 cma 内存，以 page 为单位

- **base_pfn**

  > cma 内存起始页框号

- **count**

  > cma 总 page 数

- **maxchunk**

  > cma 最大连续 page 数

- **order_per_bit**

  > 每个 bit 代表 2 ^ order_per_bit 个 page

- **bitmap**

  > 记录 cma page 使用情况的位图。1 表示占用，0 表示空闲

查看 cma 使用情况：

```
# cat /sys/kernel/debug/cma/cma-reserved/bitmap
4294967295 4294967295 4294967295 4294967295 4294967295 4294967295 4294967295 4294967295 4294967295
4294967295 4294967295 4294967295 4294967295 4294967295 4294967295 4294967295 4294967295 4294967295
4294967295 4294967295 4294967295 4294967295 4294967295 4294967295 4294967295 4294967295 4294967295
4294967295 4294967295 4294967295 4294967295 4294967295 4294967295 4294967295 4294967295 4294967295
4294967295 4294967295 4294967295 4294967295 4294967295 4294967295 4294967295 4294967295 4294967295
4294967295 4294967295 2097151 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# cat /sys/kernel/debug/cma/cma-reserved/count
8192
# cat /sys/kernel/debug/cma/cma-reserved/used
1525
# cat /sys/kernel/debug/cma/cma-reserved/base_pfn
548864
# cat /sys/kernel/debug/cma/cma-reserved/order_per_bit
0
```

手动申请 100 个 page

```
# echo 100 >  /sys/kernel/debug/cma/cma-reserved/alloc
```

手动释放 100 个 page

```
# echo 100 >  /sys/kernel/debug/cma/cma-reserved/free
```

sysfs 的 meminfo 结点亦可查看 CMA 的使用情况（为节省篇幅，已省略无关信息）：

```
# cat /proc/meminfo
    ...
    CmaTotal:          32768 kB
    CmaFree:           29068 kB
```

小技巧

CmaFree 中记录的信息并不准确，推荐使用 debugfs 中 cma 节点的 bitmap 来查看 cma page 的使用情况。

### 3.4. DMA-BUF

在 debugfs 中查看当前 DMA-BUF 的使用情况：

```
mount -t debugfs none /sys/kernel/debug
cat /sys/kernel/debug/dma_buf/bufinfo
```

![../../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/dma_buf.png](https://photos.100ask.net/artinchip-docs/d213-devkit/dma_buf-17066878792223.png)

小技巧

Component, CMA，DMA-BUF 相关概念在后续设计说明章节会有补充介绍。

### 3.5. /dev/fb

在 sysfs 中查看 /dev/fb 的一些信息：

```
# ls /sys/devices/platform/soc/soc\:display-fb/graphics/fb0/ -l
-rw-r--r--    1 root     root          4096 Jan  1 00:01 bits_per_pixel
-rw-r--r--    1 root     root          4096 Jan  1 00:01 blank
-rw-r--r--    1 root     root          4096 Jan  1 00:01 console
-rw-r--r--    1 root     root          4096 Jan  1 00:01 cursor
-r--r--r--    1 root     root          4096 Jan  1 00:01 dev
lrwxrwxrwx    1 root     root             0 Jan  1 00:01 device -> ../../../soc:display-fb
-rw-r--r--    1 root     root          4096 Jan  1 00:01 mode
-rw-r--r--    1 root     root          4096 Jan  1 00:01 modes
-r--r--r--    1 root     root          4096 Jan  1 00:01 name
-rw-r--r--    1 root     root          4096 Jan  1 00:01 pan
-rw-r--r--    1 root     root          4096 Jan  1 00:01 rotate
-rw-r--r--    1 root     root          4096 Jan  1 00:01 state
-r--r--r--    1 root     root          4096 Jan  1 00:01 stride
lrwxrwxrwx    1 root     root             0 Jan  1 00:01 subsystem -> ../../../../../../class/graphics
-rw-r--r--    1 root     root          4096 Jan  1 00:01 uevent
-rw-r--r--    1 root     root          4096 Jan  1 00:01 virtual_size
# cat /sys/devices/platform/soc/soc\:display-fb/graphics/fb0/bits_per_pixel
32
# cat /sys/devices/platform/soc/soc\:display-fb/graphics/fb0/blank
# cat /sys/devices/platform/soc/soc\:display-fb/graphics/fb0/console
# cat /sys/devices/platform/soc/soc\:display-fb/graphics/fb0/dev
29:0
# cat /sys/devices/platform/soc/soc\:display-fb/graphics/fb0/mode
# cat /sys/devices/platform/soc/soc\:display-fb/graphics/fb0/pan
0,0
# cat /sys/devices/platform/soc/soc\:display-fb/graphics/fb0/name
aicfb0
# cat /sys/devices/platform/soc/soc\:display-fb/graphics/fb0/stride
3200
# cat /sys/devices/platform/soc/soc\:display-fb/graphics/fb0/virtual_size
800,480
```

### 3.6. Display Engine

在 sysfs 中查看当前 display engine 的一些信息：

```
# cat /sys/devices/platform/soc/18a00000.de/debug/display
Video Layer Enable       : 0
Video Layer Format       : 0
Video Layer Input Size   : 0 x 0
Video Layer Stride       : 0 0
Scaler Output Size       : 0 x 0
UI Layer Control         : format: 0, color key: 0, alpha: 1
UI Layer Input Size      : 1024 x 600
UI Layer Color Key       : 0
UI Layer Alpha           : mode: 0, g_alpha: 255
UI Rectangle Control     : 1 0 0 0
UI Rectangle Size        : (1024, 600) (0, 0) (0, 0) (0, 0)
UI Rectangle Offset      : (0, 0) (0, 0) (0, 0) (0, 0)
UI Rectangle Stride      : 4096 0 0 0
Tearing-effect           : TE mode: 0, TE pulse width: 0
Display Dither           : dither_en: 0, red depth: 0, green depth: 0, blue depth: 0
Display Timing           : hactive: 1024, vactive: 600 hfp: 160 hbp: 140 vfp: 20 vbp: 12 hsync: 20 vsync: 3
Display Pixelclock       : 60000000 HZ
```

小技巧

UI Layer Control 中的 color key 和 alpha 表示 enable / disable 状态。 UI Layer Color Key 才表示 color value。

### 3.7. Color bar

在 sysfs 中使用 display engine 的 color bar 模式进行调试

```
// 开启 color bar
# echo 1 >  /sys/devices/platform/soc/18a00000.de/debug/color_bar

// 关闭 color bar
# echo 0 >  /sys/devices/platform/soc/18a00000.de/debug/color_bar
```

### 3.8. Framebuffer 截图

拷贝 /dev/fb0 裸数据，使用 RawViewer 查看

```
# cp /dev/fb0 fb0.bgra
```

使用ADB pull `fb0.bgra` 文件，在PC 上使用 RawViewer 软件查看。

RawViewer 软件可在其官网免费下载：http://www.filefriend.net/#RawViewer

小技巧

使用 RawViewer 查看 fb0.bgra 文件，需要手工设置数据源的宽高，在开启双 buffer 的场景下，要将高度 * 2。

## 4. 测试指南

### 4.1. 测试环境

#### 4.1.1. 硬件

- 开发板，或者D211的FPGA板
- 可转接LVDS的子板
- LVDS屏幕，7寸TFT屏幕，驱动芯片EK79001+EK73215

#### 4.1.2. 软件

- PC端的串口终端软件，用于PC和开发板进行串口通信
- 显示模块的测试demo：test_dmabuf

#### 4.1.3. 软件配置

##### 4.1.3.1. 配置 LVDS屏幕

测试中需要用到LVDS屏幕，以驱动芯片EK79001+EK73215为例，在 luban 的根目录下通过make kernel-menuconfig，按如下选择：

```
Linux
    Device Drivers
        Graphics support
            Frame buffer Devices
                <*> Artinchip Framebuffer support
                    [*]   Artinchip display lvds support
                        <*> Artinchip Framebuffer support
                            Artinchip Panel Drivers (Artinchip general LVDS panel)  --->
```

在board.dts中，修改 LVDS 相关配置。

- panel

```
panel_lvds {
    compatible = "artinchip,aic-general-lvds-panel";
    enable-gpios = <&gpio_a 4 GPIO_ACTIVE_HIGH>;
    data-mapping = "vesa-24";
    data-channel = "single-link0";
    status = "okay";

    port {
        panel_lvds_in: endpoint {
            remote-endpoint = <&lvds0_out>;
        };
    };

    display-timings {
        native-mode = <&timing1>;
        timing1: 1024x600 {
            clock-frequency = <60000000>;
            hactive = <1024>;
            vactive = <600>;
            hback-porch = <140>;
            hfront-porch = <160>;
            hsync-len = <20>;
            vback-porch = <20>;
            vfront-porch = <12>;
            vsync-len = <3>;
            de-active = <1>;
            pixelclk-active = <1>;
        };
    };
};
```

##### 4.1.3.2. display engine

```
&de0 {
    status = "okay";

    port@0 {
        reg = <0>;
        de0_in: endpoint {
            remote-endpoint = <&fb0_out>;
        };
    };

    port@1 {
        reg = <1>;
        de0_out: endpoint {
            remote-endpoint = <&lvds0_in>;
        };
    };
};
```

##### 4.1.3.3. lvds display interface

```
&lvds0 {
    pinctrl-names = "default";
    pinctrl-0 = <&lvds0_pins>;
    status = "okay";

    port@0 {
        reg = <0>;
        lvds0_in: endpoint {
            remote-endpoint = <&de0_out>;
        };
    };

    port@1 {
        reg = <1>;
        lvds0_out: endpoint {
            remote-endpoint = <&panel_lvds_in>;
        };
    };
};
```

##### 4.1.3.4. test_dmabuf 配置

在luban根目录，运行`make menuconfig`，按如下选择：
```
Artinchip packages
    Sample code
        [*] test-dma-buf
```

### 4.2. test_dmabuf 测试

test_dmabuf的主要功能是测试显示引擎UI图层和Videv图层blend，在Video图层播放一个视频帧文件

在打开test_dmabuf的编译后，板子上的test_dmabuf位于 `/usr/local/bin/`，无需进入该目录，直接运行test_dmabuf即可：

```
[aic@] # test_dmabuf -u
Usage: test_dmabuf [options]:
     -w, --width    need an integer argument
     -h, --height   need an integer argument
     -f, --format   video format, yuv420p etc
     -i, --input    need a file name
     -u, --usage

Example: test_dmabuf -w 480 -h 320 -f yuv420p -i my.yuv

[aic@] # test_dmabuf -w 480 -h 320 -f yuv420p -i my.yuv  - 播放一个yuv420格式的文件
```

## 5. 设计说明

### 5.1. 源码和文档说明

#### 5.1.1. 源码说明

本模块源代码在内核目录 linux-5.10/drivers/video/artinchip/disp 下，目录结构如下：

```
├── aic_com.h       // 显示驱动共用的头文件，其中定义了寄存器、共用数据结构、全局函数等
├── aic_fb.c    // 对接 fbdev 框架，并进行扩展
├── aic_de.c    // 显示引擎驱动
├── aic_dsi.c   // mipi-dsi 显示接口驱动
├── aic_lvds.c  // lvds 显示接口驱动
├── aic_rgb.c   // rgb 显示接口驱动
├── hw/         // 显示引擎和显示接口的寄存器封装
└── panel/      // 屏驱动
```

#### 5.1.2. 文档说明

关于本模块的device tree bindings文档，可查看

/Documentation/devicetree/bindings/display/

/Documentation/devicetree/bindings/display/panel/

目录下的txt文件。

### 5.2. 模块架构

#### 5.2.1. fbdev框架

ArtInChip 平台的显示模块驱动基于 fbdev 框架。

关于 fbdev 架构的文档：

可查看Documentation/fb/framebuffer.txt 或在线阅读 [https:/www.kernel.org/doc/Documentation/fb/framebuffer.txt](https:/www.kernel.org/doc/Documentation/fb/framebuffer.txt/)

#### 5.2.2. Componet框架

框架代码：linux-5.10/drivers/base/component.c

Linux 引入 Componet 框架是为了 Subsystems 能按照一定的顺序初始化设备。Subsystems，例如：ALSA, DRM，整个框架包含较多子设备模块，但内核加载每个子模块的时间不定，因此需要 Componet 框架进行约束。

Component 框架通过 dts 将所有子设备关联到一个主设备上，主设备会管理子设备的加载顺序，保证所有设备正常使用。

在 dts 文件中，显示引擎、显示接口、panel、fb0 通过 port 结点进行关联，其中 fb0 为主设备。

### 5.3. 关键流程设计

#### 5.3.1. 初始化流程

##### 5.3.1.1. probe和bind过程

为了约束初始化顺序，AICFB 为 component 的 master 设备，DE、DI 和 panel 为 slave 设备，component 框架保证 master 的初始化顺序在所有 slave 之后。各模块的初始化顺序如下：

![../../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/driver_bind.png](https://photos.100ask.net/artinchip-docs/d213-devkit/driver_bind-17066881502075.png)

图 6.22 *显示模块的初始化顺序*

其中：

1. master 调用 component_match_add() 接口声明一个 match 队列。
2. master 调用 component_master_add_with_match() 将自己注册进 component 框架。
3. slave 调用 component_add()完成 slave 注册。
4. 各模块的 probe 顺序没有约束，设备的注册和声明在 probe 函数中进行。
5. 每个子设备都要实现自己的 bind() 和 unbind() 接口（struct component_ops），当 match 队列中的模块都完成 probe 后，component 框架会调用模块的 bind() 接口。
6. 各 slave 按 match 队列顺序执行 bind()，Component 框架保证 master 最后执行。
7. aicfb->bind() 主要完成 framebuffer 申请、fb 设备注册、使能 UI 图层、使能 panel 等动作。

##### 5.3.1.2. 硬件时序要求[¶](#id2)

DE、DI、panel 三个硬件模块在初始化时有一些时序要求，包含先后顺序、延迟大小，主要约束来自于 panel 侧。 为了应对这样的硬件特性，驱动设计中使用 callback 方式来实现多个模块间的互相调用。

![../../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/callbacks1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/callbacks1-17066882134577.png)

在fb的bind()中，会调用这些回调来完成初始化，如下图（其中关系比较绕的是 panel 初始化逻辑）：

![../../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/fb_bind1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/fb_bind1-17066882208049.png)

#### 5.3.2. 预留内存管理流程

##### 5.3.2.1. CMA

Linux-3.5 引入了一套 Contiguous Memory Allocator，简称 CMA，基于 DMA 映射框架为内核提供连续大块内存的申请和释放。CMA 主要思路是将预留内存纳入 DMA 映射管理，可以给系统内所有设备共享使用，这样就既解决了为 GPU、Camera、显示等图像处理类模块预留大块的连续内存，又解决了预留内存被空置的问题，提升内存使用率。

CMA 本身不是一套分配内存的算法，它的底层仍然要依赖伙伴算法系统来支持，可以理解为 CMA 是介于 DMA mapping 和内存管理之间的中间层。

![../../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/cma.png](https://photos.100ask.net/artinchip-docs/d213-devkit/cma-170668824010611.png)

CMA的具体功能有：

1. 在系统的启动过程中，根据内核编译配置、或者 DTS 配置将内存中某块区域用于 CMA，然后内核中其他模块可以通过 DMA 的接口 API 申请连续内存，这块区域我们称之为 CMA area。
2. 提供 cma_alloc()和 cma_release()两个接口函数用于分配和释放 CMA pages。
3. 记录和跟踪 CMA area 中各个 pages 的状态。
4. 调用伙伴系统接口，进行真正的内存分配。

**CMA 主要接口**

1. CNA area 的声明

   > setup_bootmem() -> dma_contiguous_reserve()，定义在 kernel/dma/contiguous.c，其中有确定 CMA area size 的代码如下：
   >
   > ```
   > #ifdef CONFIG_CMA_SIZE_SEL_MBYTES
   >        selected_size = size_bytes;
   > #elif defined(CONFIG_CMA_SIZE_SEL_PERCENTAGE)
   >        selected_size = cma_early_percent_memory();
   > #elif defined(CONFIG_CMA_SIZE_SEL_MIN)
   >        selected_size = min(size_bytes, cma_early_percent_memory());
   > #elif defined(CONFIG_CMA_SIZE_SEL_MAX)
   >        selected_size = max(size_bytes, cma_early_percent_memory());
   > #endif
   > ```
   >
   > 然后会调用 dma_contiguous_reserve_area() -> cma_declare_contiguous() 去初始化 CMA 的配置参数。

小技巧

计算 CMA 内存大小的过程中，size_bytes 来源于内核编译配置中 CONFIG_CMA_SIZE_MBYTES，通过计算将 size 限定在 4MB 对齐。 参考 [CMA配置](../02_config_guide/menuconfig/index.html#ref-to-cma-config) 进行设置。

1. CMA 初始化

   > 见 mm/cma.c 中的 cma_init_reserved_areas() -> init_cma_reserved_pageblock()，其中会设置 page 属性为 MIGRATE_CMA。

2. 申请 CMA

   > 使用 DMA 标准接口 dma_alloc_coherent() 和 dma_alloc_wc()，会间接调用 dma_alloc_from_contiguous()。

3. 释放 CMA

   > 使用 DMA 标准接口 dma_free_coherent()。

##### 5.3.2.2. DMA-BUF

CMA 解决的是预留内存空闲期间如何给其他设备共享的问题，DMA-BUF 解决的是使用期间多个设备共享的问题、以及内核态和用户态如何共享内存的问题。DMA-BUF 可减少多余的拷贝，提升系统运行效率。

DMA-BUF 最初原型是s hrbuf，于 2011 年首次提出，实现了 “Buffer Sharing” 的概念验证。shrbuf 被社区重构变身为 DMA-BUF，2012年合入 Linux-3.3 主线版本。

DMA-BUF 被广泛用在多媒体驱动中，尤其在 V4L2、DRM 子系统中经常用到。

**DMA-BUF vs ION**

从 Linux-5.6 开始，DMA-BUF 正式合入了原来 ION 的 heap 管理功能，社区的主分支是打算抛弃 ION 了。在Linux-5.11，主分支已经删除了 drivers/staging/android/ion 代码，原因是“原厂对ION的支持在社区中不太活跃，很难持续更新ION”，而且ION还带来了几个ABI break。

1. ION 有大量的 heap 逻辑管理，而 DMA-BUF 的 heap 更多是分配接口上的管理（社区更容易接受）；
2. ION 是生产一个字符设备 /dev/ion，而 DMA-BUF 为每个 heap 生成一个字符设备，便于用户态的heap区分和权限管理；
3. ION 限制最多32个 heap，DMA-BUF 没有这个限制；
4. DMA-BUF中实现了两个初始的 heap：system heap 和 cma heap，与原 ION 中的功能类似，但做了很大简化（为了方便社区 review），删掉原来 ION 中针对 system、cma 做过的一些优化，涉及 uncached buffers、large page allocation、page pooling和deferred freeing。 DMA-BUF 中的 CMA，只添加了default CMA 区域。原 ION 中的 CMA 是添加了所有 DMA 区域。

**工作机制**

为了解决各个驱动之间的 buffer 共享问题，DMA-BUF 将 buffer 与 file 结合使用，让 DMA-BUF 既是一块物理 buffer，同时也是个 Linux 标准 file。典型的应用框图如下：

![../../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/dma_buf1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/dma_buf1-170668827127813.png)

分配 buffer 的模块为 exporter，使用该 buffer 的模块为 importer。

DMA-BUF 支持连续物理内存、散列物理内存的 buffer 管理。ArtInChip 平台目前只支持连续物理内存的 DMA-BUF。

**主要接口**

内核空间

> - 作为 exporter
>
>   注册接口 `dma_buf_export()`
>
> - 作为 importer
>
>   获取buf的接口：`dma_buf_get`,``dma_buf_attach()``,``dma_buf_map_attachment``。

用户空间

> 通过 ioctl 来管理 DMA-BUF。

**基于 DMA-BUF 的 Video Layer buffer 管理**

UI Layer的 buffer，由 driver 申请，通过 /dev/fb0 透传到用户态，用户态使用 mmap() 实现 buffer 共享。

但对于 Video Layer 的 buffer，情况有所不同，申请多大 buffer、多少个 buffer 都是由应用场景确定，所以应该是用户态发起申请。同时这个 buffer 还要满足物理连续的特性，DE 硬件才能用来做图层叠加处理。

![../../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/dma_buf_heap.png](https://photos.100ask.net/artinchip-docs/d213-devkit/dma_buf_heap-170668828133515.png)

左图，是 ION 时代的使用方法，新版 Linux（Linux-5.6以后）的 DMA-BUF 已经支持了 heap 功能，从功能上完全可以替代 ION。对用户态来说，看到的差别不再是单一的 /dev/ion 设备节点，而是有多个 /dev/* 设备节点，比如 CMA heap 会生成 /dev/dma_heap/reserved，System heap 会生成 /dev/dma_heap/system。

使用 DMA-BUF 的情况下，APP 和 fb 驱动共享 buffer 的初始化流程如下图所示：

![../../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/dma_buf_app.png](https://photos.100ask.net/artinchip-docs/d213-devkit/dma_buf_app-170668828975517.png)

其中第3步的操作比较啰嗦，fb 驱动根据 APP 传来的一组fd[]，逐个去向 DMA-BUF 模块申请以下资源：dma_buf -> attatch -> sg_table -> dma_addr_t，并将这组资源保存在本地（struct aic_de_dmabuf），用于释放 DMA-BUF。

这里面有一个假设：sg_table 中只有一个 sg。也就是说单个 DMA-BUF 必须是物理连续的，不能是多块 buf 拼起来的，否则物理地址 dma_addr_t 就不能代表多块 buf 的起始地址。

对于释放过程，APP需要先通知FB驱动要释放的fb[]，然后再使用用户态文件接口close()逐个关闭fb[]。

小技巧

之所以申请“一组fd[]”，是因为video播放过程中为了边显示边解码，至少需要两套 Buffer 来实现乒乓效果（实际应用中为了更流畅，可能还需要申请多套 Buffer 构成循环 Buffer）。这里说的“一套Buffer”对应视频的一帧数据，而一帧视频数据往往分成YUV三个分量，每个分量在解码过程中是需要分别处理（对应DE寄存器中addr0、addr1、addr2），所以“一套Buffer”应该是 Y、U、V 共3个Buffer。对于乒乓结构的 Buffer，就需要申请 3*2=6 个DMA-BUF的fd。

UI Layer 的 buffer 申请，是直接调用通用 DMA 接口 `dma_alloc_coherent()`，最终在 CMA 内存中分配。这样并不影响 Video Layer的 buffer 走 DMA-BUF 申请，CMA 模块内部会处理好来自各种接口的 Buffer 申请。

##### 5.3.3. Backlight

Backlight 使用内核中 pwm-backlight 背光驱动，代码见 linux-5.10driversvideobacklightpwm_bl.c。

panel 驱动可以通过 DTS 获取背光驱动的 device node , 然后 backlight API 控制背光。

- backlight_enable() 使能背光
- backlight_update_status() 对背光状态进行更新

```
backlight {
   compatible = "pwm-backlight";
   /* pwm node name; pwm device No.; period_ns; pwm_polarity */
   pwms = <&pwm 0 1000000 PWM_POLARITY_INVERTED>;
   brightness-levels = <0 10 20 30 40 50 60 70 80 90 100>;
   default-brightness-level = <8>;
   status = "okay";
};

panel_rgb {
   compatible = "artinchip,aic-general-rgb-panel";

   backlight = <&backlight>;

};  // 为节省篇幅，已省略无关配置
```

应用程序对背光进行操作：

```
echo 2 > /sys/class/backlight/backlight/brightness
```

### 5.4. 数据结构设计

#### 5.4.1. uapi/video/artinchip_video.h

##### 5.4.1.1. struct aic_rect

```
struct aic_rect {
    int x;
    int y;
    int width;
    int height;
};
```

##### 5.4.1.2. struct aic_point

```
struct aic_point {
    int x;
    int y;
};
```



##### 5.4.1.3. struct aic_size

```
struct aic_size {
    int width;
    int height;
};
```

##### 5.4.1.4. enum aic_pixel_format

```
enum aic_pixel_format {
    AIC_FMT_ARGB_8888            = 0x00,
    AIC_FMT_ABGR_8888            = 0x01,
    AIC_FMT_RGBA_8888            = 0x02,
    AIC_FMT_BGRA_8888            = 0x03,
    AIC_FMT_XRGB_8888            = 0x04,
    AIC_FMT_XBGR_8888            = 0x05,
    AIC_FMT_RGBX_8888            = 0x06,
    AIC_FMT_BGRX_8888            = 0x07,
    AIC_FMT_RGB_888              = 0x08,
    AIC_FMT_BGR_888              = 0x09,
    AIC_FMT_ARGB_1555            = 0x0a,
    AIC_FMT_ABGR_1555            = 0x0b,
    AIC_FMT_RGBA_5551            = 0x0c,
    AIC_FMT_BGRA_5551            = 0x0d,
    AIC_FMT_RGB_565              = 0x0e,
    AIC_FMT_BGR_565              = 0x0f,
    AIC_FMT_ARGB_4444            = 0x10,
    AIC_FMT_ABGR_4444            = 0x11,
    AIC_FMT_RGBA_4444            = 0x12,
    AIC_FMT_BGRA_4444            = 0x13,

    AIC_FMT_YUV420P              = 0x20,
    AIC_FMT_NV12                 = 0x21,
    AIC_FMT_NV21                 = 0x22,
    AIC_FMT_YUV422P              = 0x23,
    AIC_FMT_NV16                 = 0x24,
    AIC_FMT_NV61                 = 0x25,
    AIC_FMT_YUYV                 = 0x26,
    AIC_FMT_YVYU                 = 0x27,
    AIC_FMT_UYVY                 = 0x28,
    AIC_FMT_VYUY                 = 0x29,
    AIC_FMT_YUV400               = 0x2a,
    AIC_FMT_YUV444P              = 0x2b,

    AIC_FMT_YUV420_64x32_TILE    = 0x30,
    AIC_FMT_YUV420_128x16_TILE   = 0x31,
    AIC_FMT_YUV422_64x32_TILE    = 0x32,
    AIC_FMT_YUV422_128x16_TILE   = 0x33,
    AIC_FMT_MAX,
};
```

#### 5.4.2. uapi/video/artinchip_fb.h



##### 5.4.2.1. struct aicfb_layer_num

```
/**
 * struct aicfb_layer_num - aicfb layer number
 * @vi_num: number of video layers
 * @ui_num: number of UI layers
 *
 *  total_layer_num = vi_num + ui_num
 *
 *  layer id range: [0, total_layer_num - 1]
 */
struct aicfb_layer_num {
    unsigned int vi_num;
    unsigned int ui_num;
};
```



##### 5.4.2.2. struct aicfb_layer_capability

```
/**
 * struct aicfb_layer_capability - aicfb layer capability
 * @layer_id: the layer id
 * @layer_type: the layer type
 *  0: UI layer
 *  1: Video layer
 * @max_width:  the max pixels per line
 * @max_height: the max lines
 * @cap_flags:  flags of layer capability
 */
struct aicfb_layer_capability {
    unsigned int layer_id;
    unsigned int layer_type;
    unsigned int max_width;
    unsigned int max_height;
    unsigned int cap_flags;
};
```

##### 5.4.2.3. struct aicfb_buffer

```
/**
 * struct aicfb_buffer - aicfb frame buffer
 * @phy_addr[3]: address of frame buffer
 *  single addr for interleaved fomart with 1 plane,
 *  double addr for semi-planar fomart with 2 planes,
 *  triple addr for planar format with 3 planes
 * @size: width and height of aicfb_buffer
 * @stride[3]: stride for all planes
 * @crop_en: corp disable/enable ctrl
 *  0: disable crop the buffer
 *  1: enable crop the buffer
 * @crop: crop info
 * @format: color format
 * @buf_flags: aicfb buffer flags
 */
struct aicfb_buffer {
    unsigned int            phy_addr[AICFB_PLANE_NUM];
    unsigned int            dmabuf_fd[AICFB_PLANE_NUM];
    unsigned int            stride[AICFB_PLANE_NUM];
    struct aic_size         size;
    unsigned int            crop_en;
    struct aic_rect         crop;
    enum aic_pixel_format   format;
    unsigned int            buf_flags;
};
```



##### 5.4.2.4. struct aicfb_layer_data

```
/**
 * struct aicfb_layer_data - aicfb layer data
 * @enable
 *  0: disable the layer
 *  1: enable the layer
 * @layer_id: the layer id
 *
 * @rect_id: the rectanglular window id of the layer
 *  only used by layers with multi-rectangular windows
 *  for example: if the layer has 4 rectangular windows,
 *  rect_id can be 0,1,2 or 3 for different windows
 *
 * @scale_size:  scaling size
 *  if the layer can be scaled. the scaling size can be different
 *  from the input buffer. the input buffer can be original aicfb_buffer
 *  or crop aicfb_buffer, otherwise, the scaling size will be ignore
 *
 * @pos: left-top x/y coordinate of the screen in pixels
 * @buf: frame buffer
 */
struct aicfb_layer_data {
    unsigned int enable;
    unsigned int layer_id;
    unsigned int rect_id;
    struct aic_size scale_size;
    struct aic_point pos;
    struct aicfb_buffer buf;
};
```



##### 5.4.2.5. struct aicfb_config_lists

```
/**
 * struct aicfb_config_lists - aicfb config lists
 * @num: the total number of layer data config lists
 * @layers[]: the array of aicfb_layer_data lists
 */
struct aicfb_config_lists {
    unsigned int num;
    struct aicfb_layer_data layers[];
};
```



##### 5.4.2.6. struct aicfb_alpha_config

```
/**
 * struct aicfb_alpha_config - aicfb layer alpha blending config
 *
 * @layer_id: the layer id
 *
 * @enable
 *  0: disable alpha
 *  1: enable alpha
 *
 * @mode: alpha mode
 *  0: pixel alpha mode
 *  1: global alpha mode
 *  2: mixder alpha mode(alpha = pixel alpha * global alpha / 255)
 *
 * @value: global alpha value (0~255)
 *  used by global alpha mode and mixer alpha mode
 *
 */
struct aicfb_alpha_config {
    unsigned int layer_id;
    unsigned int enable;
    unsigned int mode;
    unsigned int value;
};
```



##### 5.4.2.7. struct aicfb_ck_config

```
/**
 * struct aicfb_ck_config - aicfb layer color key blending config
 *
 * @layer_id: the layer id
 *
 * @ck_enable
 *  0: disable color key
 *  1: enable color key
 *
 *
 * @ck_value: color key rgb value to match the layer pixels
 *  bit[31:24]: reserved
 *  bit[23:16]: R value
 *  bit[15:8]: G value
 *  bit[7:0]: B value
 *
 */
struct aicfb_ck_config {
    unsigned int layer_id;
    unsigned int enable;
    unsigned int value;
};
```



##### 5.4.2.8. struct aicfb_dmabuf_fd

```
/**
 * Transfer dma-buf fd from userspace to the importers in kernel.
 *
 * @fd: the actual fd, requested by mmap() in userspace
 * @phy_addr: the physical address of the actual fd
 *
 */
struct aicfb_dmabuf_fd {
    int fd;
    unsigned int phy_addr;
};
```

##### 5.4.2.9. ioctl命令

```
#define IOC_TYPE_FB       'F'

#define AICFB_WAIT_FOR_VSYNC  _IOW(IOC_TYPE_FB, 0x20, unsigned int)

/** get layer number */
#define AICFB_GET_LAYER_NUM  _IOR(IOC_TYPE_FB, 0x21, struct aicfb_layer_num)

/** get layer capability */
#define AICFB_GET_LAYER_CAPABILITY  _IOWR(IOC_TYPE_FB, 0x22,\
                    struct aicfb_layer_capability)

/** get layer config data */
#define AICFB_GET_LAYER_CONFIG  _IOWR(IOC_TYPE_FB, 0x23, \
                    struct aicfb_layer_data)

/** update layer config data */
#define AICFB_UPDATE_LAYER_CONFIG  _IOW(IOC_TYPE_FB, 0x24, \
                    struct aicfb_layer_data)

/** update layer config data lists */
#define AICFB_UPDATE_LAYER_CONFIG_LISTS  _IOW(IOC_TYPE_FB, 0x25, \
                        struct aicfb_config_lists)

/** get layer alpha blendig config */
#define AICFB_GET_ALPHA_CONFIG  _IOWR(IOC_TYPE_FB, 0x26, \
                    struct aicfb_alpha_config)

/** update layer alpha blendig config */
#define AICFB_UPDATE_ALPHA_CONFIG  _IOW(IOC_TYPE_FB, 0x27, \
                    struct aicfb_alpha_config)

/** get layer color key config */
#define AICFB_GET_CK_CONFIG  _IOWR(IOC_TYPE_FB, 0x26, struct aicfb_ck_config)

/** update layer color key config */
#define AICFB_UPDATE_CK_CONFIG  _IOW(IOC_TYPE_FB, 0x27, struct aicfb_ck_config)

/** get screen size */
#define AICFB_GET_SCREEN_SIZE  _IOR(IOC_TYPE_FB, 0x40, struct aic_size)

/** get layer config data which the standard framebuffer is used
 * call this API to get which layer the standard framebuffer is used.
 */
#define AICFB_GET_FB_LAYER_CONFIG  _IOR(IOC_TYPE_FB, 0x41, \
                    struct aicfb_layer_data)

#define AICFB_GET_DMABUF _IOW(IOC_TYPE_FB, 0x50, struct aicfb_dmabuf_fd)
#define AICFB_PUT_DMABUF _IOW(IOC_TYPE_FB, 0x51, struct aicfb_dmabuf_fd)

/** export a dma_buf fd, associates /dev/fb0 */
#define AICFB_TO_DMABUF_FD _IOW(IOC_TYPE_FB, 0x52, struct aicfb_dmabuf_fd)
```

### 5.5. 接口设计

#### 5.5.1. 概述

AICFB 显示驱动接口分可为标准功能和扩展功能。

- 标准功能：

1. 将物理显存映射到用户空间
2. 获取显示屏的分辨率和获取 Framebuffer 的像素格式
3. 支持单缓冲 Framebuffer 和双缓冲 Framebuffer 可配置

- 扩展功能：

1. 获取图层个数
2. 获取图层能力
3. 获取图层配置数据
4. 更新图层配置数据
5. 支持同时更新多图层配置数据
6. 支持图层 scaler 设置
7. 支持 alpha blending 设置
8. 支持 color key
9. 获取显示屏大小
10. 绑定 DMA-BUF
11. 解绑 DMA-BUF
12. 将 /dev/fb0 导出为 dmabuf fd

#### 5.5.2. Framebuffer标准接口

```
int ioctl(int fd, unsigned long cmd, CMD_DATA_TYPE *cmddata);
```

| 参数    | 描述                                                         | 输入/输出 |
| ------- | ------------------------------------------------------------ | --------- |
| Fd      | 打开FB设备后设备描述符                                       | 输入      |
| cmd     | 主要的cmd命令如下：FBIOGET_VSCREENINFO：获取屏幕可变信息FBIOPUT_VSCREENINFO：设置屏幕可变信息FBIOGET_FSCREENINFO：获取屏幕固定信息FBIOPAN_DISPLAY：设置PAN 显示FBIO_WAITFORVSYNC: 等待vsync信号 | 输入      |
| cmddata | 各cmd 对应的数据类型分别是：屏幕可变信息：struct fb_var_screeninfo *类型屏幕固定信息：struct fb_fix_screeninfo *类型PAN显示：struct fb_var_screeninfo *类型 | 输入/输出 |

#### 5.5.3. 扩展接口

##### 5.5.3.1. AICFB_WAIT_FOR_VSYNC

| 接口定义 | int ioctl(int fd, unsigned long cmd, unsigned int *pvalue); |
| -------- | ----------------------------------------------------------- |
| 功能说明 | 等待Vsync信号                                               |
| 参数定义 | CMD: AICFB_WAIT_FOR_VSYNCpvalue:该值无意义，固定为NULL      |
| 返回值   | 0：成功-1：失败                                             |
| 注意事项 | 无                                                          |

##### 5.5.3.2. AICFB_GET_LAYER_NUM

| 接口定义 | int ioctl(int fd, unsigned long cmd, struct aicfb_layer_num *pvalue); |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 获取显示图层的个数, 包括UI 图层个数和Video 图层              |
| 参数定义 | CMD: AICFB_GET_LAYER_NUMplayer_num: 参考结构体 [struct aicfb_layer_num](data_structure.html#ref-to-aicfb-layer-num) 定义 |
| 返回值   | 0：成功-1：失败                                              |
| 注意事项 | 无                                                           |

##### 5.5.3.3. AICFB_GET_LAYER_CAPABILITY

| 接口定义 | int ioctl(int fd, unsigned long cmd, struct aicfb_layer_capability *player_cap); |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 获取当前图层的能力                                           |
| 参数定义 | CMD: AICFB_GET_LAYER_CAPABILITYplayer_cap: 参考结构体 [struct aicfb_layer_capability](data_structure.html#ref-to-aicfb-layer-capability) 定义 |
| 返回值   | 0：成功-1：失败                                              |
| 注意事项 | 调用接口前要先填写结构体中的 layer_id                        |

##### 5.5.3.4. AICFB_GET_LAYER_CONFIG

| 接口定义 | int ioctl(int fd, unsigned long cmd, struct aicfb_layer_data *player_conf); |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 获取图层配置信息                                             |
| 参数定义 | CMD: AICFB_GET_LAYER_CONFIGplayer_conf: 参考结构体 [struct aicfb_layer_data](data_structure.html#ref-to-aicfb-layer-data) 定义 |
| 返回值   | 0：成功-1：失败                                              |
| 注意事项 | 调用接口前要先填写结构体中的layer_id，如果是多矩形窗口要同时填写rect_win_id |

##### 5.5.3.5. AICFB_UPDATE_LAYER_CONFIG

| 接口定义 | int ioctl(int fd, unsigned long cmd, struct aicfb_layer_data *player_conf) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 更新图层配置信息                                             |
| 参数定义 | CMD: AICFB_UPDATE_LAYER_CONFIGplayer_ocnf:参考结构体 [struct aicfb_layer_data](data_structure.html#ref-to-aicfb-layer-data) 定义 |
| 返回值   | 0: 成功-1：失败                                              |
| 注意事项 | 如果是仅更新图层的部分config data 信息，可以先调用接口AICFB_GET_LAYER_CONFIG，获取当前图层信息，然后再修改要更新的图像信息，最后再调用此接口更新图层信息 |

##### 5.5.3.6. AICFB_UPDATE_LAYER_CONFIG_LISTS

| 接口定义 | int ioctl(int fd, unsigned long cmd, struct aicfb_config_lists *player_lists); |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 更新图层配置数据列表                                         |
| 参数定义 | CMD: AICFB_UPDATE_LAYER_CONFIG_LISTS aicfb_config_listsplayer_lists: 参考结构体 [struct aicfb_config_lists](data_structure.html#ref-to-aicfb-config-lists) 定义 |
| 返回值   | 0：成功-1：失败                                              |
| 注意事项 | 通过此接口可以同时更新多个图层或者多个窗口的配置信息通过此接口调用的好处是相关图层配置的更新可以同时生效 |

##### 5.5.3.7. AICFB_GET_ALPHA_CONFIG

| 接口定义 | int ioctl(int fd, unsigned long cmd, struct aicfb_alpha_config *alpha); |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 获取当前图层的Alpha配置                                      |
| 参数定义 | CMD: AICFB_GET_ALPHA_CONFIGalpha: 参结考构体 [struct aicfb_alpha_config](data_structure.html#ref-to-aicfb-alpha-config) 定义 |
| 返回值   | 0：成功-1：失败                                              |
| 注意事项 | 无                                                           |

##### 5.5.3.8. AICFB_UPDATE_ALPHA_CONFIG

| 接口定义 | int ioctl(int fd, unsigned long cmd, struct aicfb_alpha_config *alpha); |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 更新当前图层的Alpha配置                                      |
| 参数定义 | CMD: AICFB_UPDATE_ALPHA_CONFIGalpha: 参结考构体 [struct aicfb_alpha_config](data_structure.html#ref-to-aicfb-alpha-config) 定义 |
| 返回值   | 0：成功-1：失败                                              |
| 注意事项 | 无                                                           |

##### 5.5.3.9. AICFB_GET_CK_CONFIG

| 接口定义 | int ioctl(int fd, unsigned long cmd, struct aicfb_ck_config *player_ck); |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 获取当前图层的CK配置                                         |
| 参数定义 | CMD: AICFB_GET_CK_CONFIGplayer_ck: 参考结构体 [struct aicfb_ck_config](data_structure.html#ref-to-aicfb-ck-config) 定义 |
| 返回值   | 0：成功-1：当前图层不支持 color key                          |
| 注意事项 | 无                                                           |

##### 5.5.3.10. AICFB_UPDATE_CK_CONFIG

| 接口定义 | int ioctl(int fd, unsigned long cmd, struct aicfb_ck_config *player_ck); |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 更新当前图层的CK配置                                         |
| 参数定义 | CMD: AICFB_SET_CK_CONFIGplayer_ck: 参考结构体 [struct aicfb_ck_config](data_structure.html#ref-to-aicfb-ck-config) 定义 |
| 返回值   | 0： 成功-1：当前图层不支持 color key                         |
| 注意事项 | 无                                                           |

##### 5.5.3.11. AICFB_GET_SCREEN_SIZE

| 接口定义 | int ioctl(int fd, unsigned long cmd, struct aic_size *pscreen_size); |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 更新当前图层的CK配置                                         |
| 参数定义 | CMD: AICFB_GET_SCREEN_SIZEpscreen_size: 结构体 [struct aic_size](data_structure.html#ref-to-aic-size) 定义了屏幕的宽，高信息 |
| 返回值   | 0：成功-1：失败                                              |
| 注意事项 | 无                                                           |

##### 5.5.3.12. AICFB_GET_FB_LAYER_CONFIG

| 接口定义 | int ioctl(int fd, unsigned long cmd, struct aicfb_layer_data *player_conf); |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 获取标准framebuffer占用的图层信息                            |
| 参数定义 | CMD: AICFB_GET_FB_LAYER_CONFIGplayer_conf: 参考结构体 [struct aicfb_layer_data](data_structure.html#ref-to-aicfb-layer-data) 定义 |
| 返回值   | 0：成功-1：失败                                              |
| 注意事项 | 无                                                           |

##### 5.5.3.13. AICFB_GET_DMABUF

| 接口定义 | int ioctl(int fd, unsigned long cmd, struct aicfb_dmabuf_fd *fds); |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 通知 fb 驱动绑定 DMA-BUF                                     |
| 参数定义 | CMD: AICFB_GET_DMABUFfds: 参考结构体 [struct aicfb_dmabuf_fd](data_structure.html#ref-to-aicfb-dmabuf-fd) 定义 |
| 返回值   | 0：成功-1：失败                                              |
| 注意事项 | APP 在将 dmabuf 送给 DE 显示之前必须进行绑定，否则无法显示 buf 中的内容 |

##### 5.5.3.14. AICFB_PUT_DMABUF

| 接口定义 | int ioctl(int fd, unsigned long cmd, struct aicfb_dmabuf_fd *fds); |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 通知 fb 驱动解绑 DMA-BUF                                     |
| 参数定义 | CMD: AICFB_PUT_DMABUFfds: 参考结构体 [struct aicfb_dmabuf_fd](data_structure.html#ref-to-aicfb-dmabuf-fd) 定义 |
| 返回 值  | 0：成功-1：失败                                              |
| 注意事项 | 无                                                           |

##### 5.5.3.15. AICFB_TO_DMABUF_FD

| 接口定义 | int ioctl(int fd, unsigned long cmd, struct aicfb_dmabuf_fd *fds); |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 将 /dev/fb0 导出为一个 dmabuf fd                             |
| 参数定义 | CMD: AICFB_TO_DMABUF_FDfds: 参考结构体 [struct aicfb_dmabuf_fd](data_structure.html#ref-to-aicfb-dmabuf-fd) 定义 |
| 返回 值  | 0：成功-1：失败                                              |
| 注意事项 | 导出的 dmabuf fd 不支持 mmap 操作，无法得到一个有效的虚拟地址 |

### 5.6. APP Demo

#### 5.6.1. Framebuffer标准接口的使用

标准framebuffer接口操作示例:

```
int main()
{
    int fd = 0;
    struct fb_var_screeninfo vi;
    struct fb_fix_screeninfo fi;

    void *fb_ptr = NULL;

    fd = open("/dev/fb0", O_RDWR);
    if (fd < 0) {
        printf("failed to open fb0\n");
        return -1;
    }

    // 获取可变屏幕参数，如分辨率，像素格式
    if (ioctl(fd, FBIOGET_VSCREENINFO, &vi) < 0) {
        printf("failed to get fb0 info\n");
        close(fd);
        return -1;
    }

    // 获取屏幕固定参数，包括显存起始物理地址、显存大小和行间距
    if (ioctl(fd, FBIOGET_FSCREENINFO, &fi) < 0) {
        printf("failed to get fb0 info\n");
        close(fd);
        return -1;
    }

    // framebuffer 缓冲区映射到用户空间：
    fb_ptr = mmap(0, fi.smem_len, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
    if (fb_ptr == MAP_FAILED) {
        printf("failed to mmap framebuffer\n");
        close(fd);
        return -1;
    }

    // 用户可以直接把要显示到屏幕的图像数据写入fb_ptr即可
    ........
    ........

    munmap(fb_ptr, fi.smem_len);
    close(fd);

    return 0;
}
```

#### 5.6.2. AICFB扩展接口的使用

代码详见 source/artinchip/test-fb/test_fb.c

```
// SPDX-License-Identifier: GPL-2.0-only
/*
 * Copyright (C) 2020-2021 Artinchip Technology Co., Ltd.
 * Authors:  Matteo <duanmt@artinchip.com>
 */

#include "base.h"
#include "artinchip_fb.h"

/* Global macro and variables */

#define AICFB_LAYER_MAX_NUM 2
#define FB_DEV "/dev/fb0"

static const char sopts[] = "nscflLaAkKedw:h:m:v:u";
static const struct option lopts[] = {
    {"get_layer_num",   no_argument, NULL, 'n'},
    {"get_screen_size", no_argument, NULL, 's'},
    {"get_layer_cap",   no_argument, NULL, 'c'},
    {"get_fb_layer",    no_argument, NULL, 'f'},
    {"get_layer",       no_argument, NULL, 'l'},
    {"set_layer",       no_argument, NULL, 'L'},
    {"get_alpha",       no_argument, NULL, 'a'},
    {"set_alpha",     required_argument, NULL, 'A'},
    {"get_ck_cfg",      no_argument, NULL, 'k'},
    {"set_ck_cfg",      no_argument, NULL, 'K'},
    {"enable",      no_argument, NULL, 'e'},
    {"disable",     no_argument, NULL, 'd'},
    {"id",        required_argument, NULL, 'i'},
    {"width",     required_argument, NULL, 'w'},
    {"height",    required_argument, NULL, 'h'},
    {"mode",      required_argument, NULL, 'm'},
    {"value",     required_argument, NULL, 'v'},
    {"usage",       no_argument, NULL, 'u'},
    {0, 0, 0, 0}
};

/* Functions */

void usage(char *program)
{
    printf("Usage: %s [options]: \n", program);
    printf("\t -n, --get_layer_num \n");
    printf("\t -s, --get_screen_size \n");
    printf("\t -c, --get_layer_cap \n");
    printf("\t -f, --get_fb_layer \n");
    printf("\t -l, --get_layer \n");
    printf("\t -L, --set_layer\tneed other options: -i x -e/d -w y -h z\n");
    printf("\t -a, --get_alpha \n");
    printf("\t -A, --set_alpha\tneed other options: -e/d -m x -v y \n");
    printf("\t -k, --get_ck_cfg \n");
    printf("\t -K, --set_ck_cfg\tneed other options: -e/d -v x \n");
    printf("\t -e, --enable \n");
    printf("\t -d, --disable \n");
    printf("\t -i, --id\t\tneed an integer argument of Layer ID\n");
    printf("\t -w, --width\t\tneed an integer argument\n");
    printf("\t -h, --height\t\tneed an integer argument\n");
    printf("\t -m, --mode\t\tneed an integer argument\n");
    printf("\t -v, --value\t\tneed an integer argument\n");
    printf("\t -u, --usage \n");
    printf("\n");
    printf("Example: %s -l\n", program);
    printf("Example: %s -L -i 1 -e -w 800 -h 480\n", program);
    printf("Example: %s -A -e -w 800 -h 480\n", program);
    printf("Example: %s -K -e -v 0x3F\n", program);
}

/* Open a device file to be needed. */
int device_open(char *_fname, int _flag)
{
    s32 fd = -1;

    fd = open(_fname, _flag);
    if (fd < 0) {
        ERR("Failed to open %s", _fname);
        exit(0);
    }
    return fd;
}

int get_layer_num(int fd)
{
    int ret = 0;
    struct aicfb_layer_num n = {0};

    ret = ioctl(fd, AICFB_GET_LAYER_NUM, &n);
    if (ret < 0) {
        ERR("ioctl() return %d\n", ret);
    }
    else {
        printf("The number of video layer: %d\n", n.vi_num);
        printf("The number of UI layer: %d\n", n.ui_num);
    }
    return ret;
}

int get_layer_cap(int fd)
{
    int i;
    int ret = 0;
    struct aicfb_layer_capability cap = {0};

    for (i = 0; i < AICFB_LAYER_MAX_NUM; i++) {
        memset(&cap, 0, sizeof(struct aicfb_layer_capability));
        cap.layer_id = i;
        ret = ioctl(fd, AICFB_GET_LAYER_CAPABILITY, &cap);
        if (ret < 0) {
            ERR("ioctl() return %d\n", ret);
            return ret;
        }

        printf("\n--------------- Layer %d ---------------\n", i);
        printf("Type: %s\n", cap.layer_type == AICFB_LAYER_TYPE_VIDEO ?
            "Video" : "UI");
        printf("Max Width: %d (%#x)\n", cap.max_width, cap.max_width);
        printf("Max height: %d (%#x)\n", cap.max_height, cap.max_height);
        printf("Flag: %#x\n", cap.cap_flags);
        printf("---------------------------------------\n");
    }
    return ret;
}

int get_one_layer_cfg(int fd, int cmd, int id)
{
    int ret = 0;
    struct aicfb_layer_data layer = {0};

    layer.layer_id = id;
    ret = ioctl(fd, cmd, &layer);
    if (ret < 0) {
        ERR("ioctl() return %d\n", ret);
        return ret;
    }

    printf("\n--------------- Layer %d ---------------\n", layer.layer_id);
    printf("Enable: %d\n", layer.enable);
    printf("Layer ID: %d\n", layer.layer_id);
    printf("Rect ID: %d\n", layer.rect_id);
    printf("Scale Size: w %d, h %d\n",
        layer.scale_size.width, layer.scale_size.height);
    printf("Position: x %d, y %d\n", layer.pos.x, layer.pos.y);
    printf("Buffer: \n");
    printf("\tPixel format: %#x\n", layer.buf.format);
    printf("\tPhysical addr: %#x %#x %#x\n",
        layer.buf.phy_addr[0], layer.buf.phy_addr[1],
        layer.buf.phy_addr[2]);
    printf("\tStride: %d %d %d\n", layer.buf.stride[0],
        layer.buf.stride[1], layer.buf.stride[2]);
    printf("\tSize: w %d, h %d\n",
        layer.buf.size.width, layer.buf.size.height);
    printf("\tCrop enable: %d\n", layer.buf.crop_en);
    printf("\tCrop: x %d, y %d, w %d, h %d\n",
        layer.buf.crop.x, layer.buf.crop.y,
        layer.buf.crop.width, layer.buf.crop.height);
    printf("\tFlag: %#x\n", layer.buf.buf_flags);
    printf("---------------------------------------\n");

    return 0;
}

int get_fb_layer_cfg(int fd)
{
    return get_one_layer_cfg(fd, AICFB_GET_FB_LAYER_CONFIG, 0);
}

int get_layer_cfg(int fd)
{
    int i;

    for (i = 0; i < AICFB_LAYER_MAX_NUM; i++)
        get_one_layer_cfg(fd, AICFB_GET_LAYER_CONFIG, i);

    return 0;
}

int set_layer_cfg(int fd, int id, int enable, int width, int height)
{
    int ret = 0;
    struct aicfb_layer_data layer = {0};

    if ((id < 0) || (enable < 0) || (width < 0) || (height < 0)) {
        ERR("Invalid argument.\n");
        return -1;
    }

    layer.layer_id = id;
    layer.enable = enable;
    layer.scale_size.width = layer.buf.size.width;
    layer.scale_size.height = layer.buf.size.height;
    ret = ioctl(fd, AICFB_UPDATE_LAYER_CONFIG, &layer);
    if (ret < 0)
        ERR("ioctl() return %d\n", ret);

    return ret;
}

int get_layer_alpha(int fd)
{
    int i;
    int ret = 0;
    struct aicfb_alpha_config alpha = {0};

    for (i = 1; i < AICFB_LAYER_MAX_NUM; i++) {
        alpha.layer_id = i;
        ret = ioctl(fd, AICFB_GET_ALPHA_CONFIG, &alpha);
        if (ret < 0) {
            ERR("ioctl() return %d\n", ret);
            return ret;
        }

        printf("\n--------------- Layer %d ---------------\n", i);
        printf("Alpha enable: %d\n", alpha.enable);
        printf("Alpla mode: %d (0, pixel; 1, global; 2, mix)\n",
            alpha.mode);
        printf("Alpha value: %d (%#x)\n", alpha.value, alpha.value);
        printf("---------------------------------------\n");
    }

    return 0;
}

int set_layer_alpha(int fd, int enable, int mode, int val)
{
    int ret = 0;
    struct aicfb_alpha_config alpha = {0};

    if ((enable < 0) || (mode < 0) || (val < 0)) {
        ERR("Invalid argument.\n");
        return -1;
    }

    alpha.layer_id = 1;
    alpha.enable = enable;
    alpha.mode = mode;
    alpha.value = val;
    ret = ioctl(fd, AICFB_UPDATE_ALPHA_CONFIG, &alpha);
    if (ret < 0)
        ERR("ioctl() return %d\n", ret);

    return ret;
}

int get_ck_cfg(int fd)
{
    int i;
    int ret = 0;
    struct aicfb_ck_config ck = {0};

    for (i = 1; i < AICFB_LAYER_MAX_NUM; i++) {
        ck.layer_id = i;
        ret = ioctl(fd, AICFB_GET_CK_CONFIG, &ck);
        if (ret < 0) {
            ERR("ioctl() return %d\n", ret);
            return ret;
        }

        printf("\n--------------- Layer %d ---------------\n", i);
        printf("Color key enable: %d\n", ck.enable);
        printf("Color key value: R %#x, G %#x, B %#x\n",
            (ck.value >> 16) & 0xFF, (ck.value >> 8) & 0xFF,
            ck.value & 0xFF);
        printf("---------------------------------------\n");
    }
    return 0;
}

int set_ck_cfg(int fd, int enable, int val)
{
    int ret = 0;
    struct aicfb_ck_config ck = {0};

    if ((enable < 0) || (val < 0)) {
        ERR("Invalid argument.\n");
        return -1;
    }

    ck.layer_id = 1;
    ck.enable = enable;
    ck.value = val;
    ret = ioctl(fd, AICFB_UPDATE_CK_CONFIG, &ck);
    if (ret < 0)
        ERR("ioctl() return %d\n", ret);

    return ret;
}

int get_screen_size(int fd)
{
    int ret = 0;
    struct aic_size s = {0};

    ret = ioctl(fd, AICFB_GET_SCREEN_SIZE, &s);
    if (ret < 0) {
        ERR("ioctl() return %d\n", ret);
        return ret;
    }

    printf("Screen width: %d (%#x)\n", s.width, s.width);
    printf("Screen height: %d (%#x)\n", s.height, s.height);
    return 0;
}

int main(int argc, char **argv)
{
    int dev_fd = -1;
    int ret = 0;
    int c = 0;
    int layer_id = 0;
    int enable = 0;
    int mode = 0;
    int width = 0;
    int height = 0;
    int value = 0;

    dev_fd = device_open(FB_DEV, O_RDWR);
    if (dev_fd < 0) {
        ERR("Failed to open %s, return %d\n", FB_DEV, dev_fd);
        return -1;
    }

    while ((c = getopt_long(argc, argv, sopts, lopts, NULL)) != -1) {
        switch (c) {
        case 'n':
            ret = get_layer_num(dev_fd);
            goto end;
        case 's':
            ret = get_screen_size(dev_fd);
            goto end;
        case 'c':
            ret = get_layer_cap(dev_fd);
            goto end;
        case 'f':
            ret = get_fb_layer_cfg(dev_fd);
            goto end;
        case 'l':
            ret = get_layer_cfg(dev_fd);
            goto end;
        case 'a':
            ret = get_layer_alpha(dev_fd);
            goto end;
        case 'k':
            ret = get_ck_cfg(dev_fd);
            goto end;
        case 'e':
            enable = 1;
            continue;
        case 'd':
            enable = 0;
            continue;
        case 'i':
            layer_id = str2int(optarg);
            continue;
        case 'w':
            width = str2int(optarg);
            continue;
        case 'h':
            height = str2int(optarg);
            continue;
        case 'm':
            mode = str2int(optarg);
            continue;
        case 'v':
            value = str2int(optarg);
            continue;
        case 'u':
            usage(argv[0]);
            goto end;
        default:
            continue;
        }
    }

    optind = 0;
    while ((c = getopt_long(argc, argv, sopts, lopts, NULL)) != -1) {
        switch (c) {
        case 'L':
            ret = set_layer_cfg(dev_fd, layer_id, enable, width, height);
            goto end;
        case 'A':
            ret = set_layer_alpha(dev_fd, enable, mode, value);
            goto end;
        case 'K':
            ret = set_ck_cfg(dev_fd, enable, value);
            goto end;
        default:
            continue;
        }
    }

end:
    if (dev_fd > 0)
        close(dev_fd);

    return ret;
}
```

#### 5.6.3. DMA-BUF的使用

代码详见 source/artinchip/test-dma-buf/

```
// SPDX-License-Identifier: GPL-2.0-only
/*
 * Copyright (C) 2020-2021 Artinchip Technology Co., Ltd.
 * Authors:  Matteo <duanmt@artinchip.com>
 */

#include <artinchip/sample_base.h>
#include <linux/dma-buf.h>
#include <linux/dma-heap.h>
#include <video/artinchip_fb.h>

/* Global macro and variables */

#define AICFB_VID_BUF_NUM   2
#define AIC_CMA_BUF_MAX     (8 * 1024 * 1024)
#define DMA_HEAP_DEV        "/dev/dma_heap/reserved"
#define FB_DEV          "/dev/fb0"

static const char sopts[] = "m:w:h:f:i:u";
static const struct option lopts[] = {
    {"width",     required_argument, NULL, 'w'},
    {"height",    required_argument, NULL, 'h'},
    {"format",    required_argument, NULL, 'f'},
    {"input",     required_argument, NULL, 'i'},
    {"usage",       no_argument, NULL, 'u'},
    {0, 0, 0, 0}
};

struct video_data_format {
    enum aic_pixel_format format;
    char f_str[12];
    int y_shift;
    int u_shift;
    int v_shift;
};

struct video_data_format g_vformat[] = {
    {AIC_FMT_YUV420P, "yuv420p", 0, 2, 2},
    {AIC_FMT_YUV422P, "yuv422p", 0, 1, 1},
    {AIC_FMT_YUV444P, "yuv444p", 0, 0, 0},

    {AIC_FMT_MAX, "", 0, 0, 0}
};

struct video_plane {
    int fd;
    char *buf;
    int len;
};

struct video_buf {
    struct video_plane y;
    struct video_plane u;
    struct video_plane v;
};

struct aicfb_video_layer {
    int w;
    int h;
    struct video_data_format *f;
    struct video_buf vbuf[AICFB_VID_BUF_NUM];
};

static int g_fb_fd = -1;
static struct aicfb_video_layer g_vlayer = {0};

/* Functions */

void usage(char *program)
{
    printf("Usage: %s [options]: \n", program);
    printf("\t -w, --width\t\tneed an integer argument\n");
    printf("\t -h, --height\t\tneed an integer argument\n");
    printf("\t -f, --format\t\tvideo format, yuv420p etc\n");
    printf("\t -i, --input\t\tneed a file name \n");
    printf("\t -u, --usage \n");
    printf("\n");
    printf("Example: %s -w 480 -h 320 -f yuv420p -i my.yuv\n", program);
}

/* Open a device file to be needed. */
int device_open(char *_fname, int _flag)
{
    s32 fd = -1;

    fd = open(_fname, _flag);
    if (fd < 0) {
        ERR("Failed to open %s", _fname);
        exit(0);
    }
    return fd;
}

int vidbuf_request_one(struct video_plane *plane, int len, int fd)
{
    int ret;
    char *buf = NULL;
    struct dma_heap_allocation_data data = {0};

    if ((len < 0) || (len > AIC_CMA_BUF_MAX)) {
        ERR("Invalid len %d\n", len);
        return -1;
    }

    data.fd = 0;
    data.len = len;
    data.fd_flags = O_RDWR;
    data.heap_flags = 0;
    ret = ioctl(fd, DMA_HEAP_IOCTL_ALLOC, &data);
    if (ret < 0) {
        ERR("ioctl() failed! errno: %d[%s]\n", errno, strerror(errno));
        return -1;
    }

    DBG("Get dma_heap fd: %d\n", data.fd);
    plane->fd = data.fd;

    buf = mmap(NULL, len, PROT_READ|PROT_WRITE, MAP_SHARED, data.fd, 0);
    if (buf == MAP_FAILED) {
        ERR("mmap() failed! errno: %d[%s]\n", errno, strerror(errno));
        return -1;
    }
    DBG("Get virtual address: %p\n", buf);
    plane->buf = buf;
    plane->len = len;
    return 0;
}

void aic_fb_open(void)
{
    if (g_fb_fd > 0)
        return;

    g_fb_fd = device_open(FB_DEV, O_RDWR);
    if (g_fb_fd < 0)
        ERR("Failed to open %s. errno: %d[%s]\n",
            FB_DEV, errno, strerror(errno));
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

int vidbuf_request(struct aicfb_video_layer *vlayer)
{
    int i, j;
    int heap_fd = -1;
    int y_frame = vlayer->w * vlayer->h;

    heap_fd = device_open(DMA_HEAP_DEV, O_RDWR);
    if (heap_fd < 0) {
        ERR("Failed to open %s, errno: %d[%s]\n",
            DMA_HEAP_DEV, errno, strerror(errno));
        return -1;
    }

    /* Prepare two group buffer for video player,
       and each group has three planes: y, u, v. */
    for (i = 0; i < AICFB_VID_BUF_NUM; i++) {
        struct video_plane *p = (struct video_plane *)&vlayer->vbuf[i];
        int *shift = &vlayer->f->y_shift;
        for (j = 0; j < AICFB_PLANE_NUM; j++, p++)
            vidbuf_request_one(p, y_frame >> shift[j], heap_fd);
    }

    close(heap_fd);
    return 0;
}

void vidbuf_release(struct aicfb_video_layer *vlayer)
{
    int i, j;

    for (i = 0; i < AICFB_VID_BUF_NUM; i++) {
        struct video_plane *p = (struct video_plane *)&vlayer->vbuf[i];
        for (j = 0; j < AICFB_PLANE_NUM; j++, p++) {
            if (munmap(p->buf, p->len) < 0)
                ERR("munmap() failed! errno: %d[%s]\n",
                    errno, strerror(errno));
        }
    }
}

void vidbuf_dmabuf_begin(struct aicfb_video_layer *vlayer)
{
    int i, j;
    struct aicfb_dmabuf_fd fds = {0};

    for (i = 0; i < AICFB_VID_BUF_NUM; i++) {
        struct video_plane *plane = (struct video_plane *)&vlayer->vbuf[i];
        for (j = 0; j < AICFB_PLANE_NUM; j++, plane++) {
            fds.fd = plane->fd;
            if (ioctl(g_fb_fd, AICFB_GET_DMABUF, &fds) < 0)
                ERR("ioctl() failed! err %d[%s]\n",
                    errno, strerror(errno));
        }
    }
}

void vidbuf_dmabuf_end(struct aicfb_video_layer *vlayer)
{
    int i, j;
    struct aicfb_dmabuf_fd fds = {0};

    for (i = 0; i < AICFB_VID_BUF_NUM; i++) {
        struct video_plane *plane = (struct video_plane *)&vlayer->vbuf[i];
        for (j = 0; j < AICFB_PLANE_NUM; j++, plane++) {
            fds.fd = plane->fd;
            if (ioctl(g_fb_fd, AICFB_PUT_DMABUF, &fds) < 0)
                ERR("ioctl() failed! err %d[%s]\n",
                    errno, strerror(errno));
        }
    }
}

void video_layer_set(struct aicfb_video_layer *vlayer, int index)
{
    struct aicfb_layer_data layer = {0};
    struct video_buf *vbuf = &vlayer->vbuf[index];

    layer.layer_id = 0;
    layer.enable = 1;
    layer.scale_size.width = vlayer->w * 4;
    layer.scale_size.height = vlayer->h * 4;
    layer.pos.x = 10;
    layer.pos.y = 10;
    layer.buf.size.width = vlayer->w;
    layer.buf.size.height = vlayer->h;
    layer.buf.format = vlayer->f->format;
    layer.buf.dmabuf_fd[0] = vbuf->y.fd;
    layer.buf.dmabuf_fd[1] = vbuf->u.fd;
    layer.buf.dmabuf_fd[2] = vbuf->v.fd;
    layer.buf.stride[0] = vlayer->w;
    layer.buf.stride[1] = vlayer->w >> 1;
    layer.buf.stride[2] = vlayer->w >> 1;

    if (ioctl(g_fb_fd, AICFB_UPDATE_LAYER_CONFIG, &layer) < 0)
        ERR("ioctl() failed! err %d[%s]\n", errno, strerror(errno));
}

void vidbuf_cpu_begin(struct video_buf *vbuf)
{
    int i;
    struct dma_buf_sync flag;
    struct video_plane *p = (struct video_plane *)vbuf;

    for (i = 0; i < AICFB_PLANE_NUM; i++, p++) {
        flag.flags = DMA_BUF_SYNC_WRITE | DMA_BUF_SYNC_START;
        if (ioctl(p->fd, DMA_BUF_IOCTL_SYNC, &flag) < 0)
            ERR("ioctl() failed! err %d[%s]\n",
                errno, strerror(errno));
    }
}

void vidbuf_cpu_end(struct video_buf *vbuf)
{
    int i;
    struct dma_buf_sync flag;
    struct video_plane *p = (struct video_plane *)vbuf;

    for (i = 0; i < AICFB_PLANE_NUM; i++, p++) {
        flag.flags = DMA_BUF_SYNC_WRITE | DMA_BUF_SYNC_END;
        if (ioctl(p->fd, DMA_BUF_IOCTL_SYNC, &flag) < 0)
            ERR("ioctl() failed! err %d[%s]\n",
                errno, strerror(errno));
    }
}

int vidbuf_read(struct aicfb_video_layer *vlayer, int index, int fd)
{
    int i, ret;
    static int frame_cnt = 0;
    struct video_plane *p = (struct video_plane *)&vlayer->vbuf[index];

    if (frame_cnt == 0)
        lseek(fd, 0, SEEK_SET);

    for (i = 0; i < AICFB_PLANE_NUM; i++, p++) {
        DBG("Frame %d - %d, offset %ld, len %d\n", frame_cnt, i,
             lseek(fd, 0, SEEK_CUR), p->len);
        ret = read(fd, p->buf, p->len);
        if (ret != p->len) {
            ERR("read(%d) return %d. errno: %d[%s]\n", p->len,
                ret, errno, strerror(errno));
            return -1;
        }
    }
    frame_cnt++;
    return ret;
}

int format_parse(char *str)
{
    int i;

    for (i = 0; g_vformat[i].format != AIC_FMT_MAX; i++) {
        if (strncasecmp(g_vformat[i].f_str, str, strlen(str)) == 0)
            return i;
    }

    ERR("Invalid format: %s\n", str);
    return 0;
}

int main(int argc, char **argv)
{
    int vid_fd = -1;
    int ret = 0;
    int c = 0;
    int fsize = 0;
    int index = 0;

    DBG("Compile time: %s\n", __TIME__);
    while ((c = getopt_long(argc, argv, sopts, lopts, NULL)) != -1) {
        switch (c) {
        case 'w':
            g_vlayer.w = str2int(optarg);
            continue;
        case 'h':
            g_vlayer.h = str2int(optarg);
            continue;
        case 'f':
            g_vlayer.f = &g_vformat[format_parse(optarg)];
            break;
        case 'i':
            vid_fd = device_open(optarg, O_RDONLY);
            if (vid_fd < 0) {
                ERR("Failed to open %s. errno: %d[%s]\n",
                    optarg, errno, strerror(errno));
                return -1;
            }
            fsize = lseek(vid_fd, 0, SEEK_END);
            DBG("open(%s) %d, size %d\n", optarg, vid_fd, fsize);
            break;
        case 'u':
            usage(argv[0]);
            return 0;
        default:
            break;
        }
    }

    aic_fb_open();
    set_ui_layer_alpha(128);
    vidbuf_request(&g_vlayer);
    vidbuf_dmabuf_begin(&g_vlayer);

    do {
        struct video_buf *vbuf = &g_vlayer.vbuf[index];

        vidbuf_cpu_begin(vbuf);
        ret = vidbuf_read(&g_vlayer, index, vid_fd);
        vidbuf_cpu_end(vbuf);
        if (ret < 0)
            break;

        video_layer_set(&g_vlayer, index);
        index = !index;
        usleep(40000);
        if (lseek(vid_fd, 0, SEEK_CUR) == fsize)
            break;
    } while (1);

    vidbuf_dmabuf_end(&g_vlayer);
    vidbuf_release(&g_vlayer);

    if (vid_fd > 0)
        close(vid_fd);
    if (g_fb_fd > 0)
        close (g_fb_fd);
    return ret;
}
```