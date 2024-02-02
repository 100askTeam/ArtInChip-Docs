---
sidebar_position: 6
---

# 6.屏幕配置

### 1. RGB

RGB屏的调试相对简单，只需要把规格书中所描述的时序和规格参数加入相应的配置文件即可，不需要额外的驱动程序。

#### 1.1. uboot 配置

在 luban 根目录下执行 make um，进入 uboot 的功能配置界面，使能显示模块驱动：

```
Device Drivers
    Graphics support
        ArtInChip Graphics  --->
            [*]   Enable ArtInChip Video Support
            [*]   ArtInChip display rgb support
            [ ]   ArtInChip display lvds support
            [ ]   ArtInChip display mipi-dsi support
            <*>   ArtInChip Panel Drivers (ArtInChip general RGB panel)  --->
```

#### 1.2. kernel 配置

在 luban 根目录下执行 make km，进入 kernel 的功能配置界面，使能显示模块驱动：

```
Device Drivers
    Graphics support
        ArtInChip Graphics  --->
            <*> ArtInChip Framebuffer support
            [*]   ArtInChip display rgb support
            [ ]   ArtInChip display lvds support
            [ ]   ArtInChip display mipi-dsi support
            <*>   ArtInChip Panel Drivers (ArtInChip general RGB panel)  --->
```

#### 1.3. uboot dts

uboot 如果要进行显示，则声明相应的配置为预加载，以 demo88_nand 工程为例，文件为 target/d211/demo88_nand/board-u-boot.dtsi

##### 1.3.1. 声明通路

```
&disp {
    u-boot,dm-pre-reloc;
    fb0: fb@0 {
        u-boot,dm-pre-reloc;
        port {
            fb0_out: endpoint {
                u-boot,dm-pre-reloc;
            }
        };
    };
};

&de0 {
    u-boot,dm-pre-reloc;
    port@0 {
        de0_in: endpoint {
            u-boot,dm-pre-reloc;
        };
    };

    port@1 {
        de0_out: endpoint {
            u-boot,dm-pre-reloc;
        };
    };
};
&rgb0 {                             //RGB
    u-boot,dm-pre-reloc;
    port@0 {
        rgb0_in: endpoint {
            u-boot,dm-pre-reloc;
        };
    };

    port@1 {
        rgb0_out: endpoint {
            u-boot,dm-pre-reloc;
        };
    };
};
```

##### 1.3.2. 声明屏幕参数

```
panel_rgb {
    u-boot,dm-pre-reloc;
    port {
        panel_rgb_in: endpoint {
        u-boot,dm-pre-reloc;
        };
    };

    display-timings {
        u-boot,dm-pre-reloc;
        timing0: 1024x600 {
            u-boot,dm-pre-reloc;
        };
    };
};
```

##### 1.3.3. 声明屏幕引脚

```
lcd_rgb565_ld_pins: lcd-1 {
    u-boot,dm-pre-reloc;
    pins {
        u-boot,dm-pre-reloc;
    };
};
```

#### 1.4. 系统dts

系统的 dts 将进行完整的功能配置，以 demo88_nand 工程为例，文件为 target/d211/demo88_nand/board.dts 中

##### 1.4.1. 配置通路

通过 port 和 status 结点，定义了一条数据通道

```
fb       |      de    |     |     rgb    |     panel
port  --> port0   port1 -->  port0   port1 -->  port
&fb0 {
    port {
        fb0_out: endpoint {
            remote-endpoint = <&de0_in>;
        };
    };
};

&de0 {
    status = "okay";
    port@0 {
        reg = <0>;
        de0_in: endpoint {
        remote-endpoint = <&fb0_out>;
    };

    port@1 {
        reg = <1>;
        de0_out: endpoint {
            remote-endpoint = <&rgb0_in>;   //RGB
        }
    };
};

&rgb0 {
    pinctrl-names = "default", "sleep";
    pinctrl-0 = <&lcd_rgb565_ld_pins>;          //RGB
    pinctrl-1 = <&lcd_rgb565_ld_sleep_pins>;
    status = "okay";
    port@0 {
        reg = <0>;
        rgb0_in: endpoint {
            remote-endpoint = <&de0_out>;
        }
    };

    port@1 {
        reg = <1>;
        rgb0_out: endpoint {
            remote-endpoint = <&panel_rgb_in>;  //RGB
        };
    };
}
```

##### 1.4.2. 配置屏幕参数

```
panel_rgb {
compatible = "artinchip,aic-general-rgb-panel";
status = "okay";

enable-gpios = <&gpio_e 19 GPIO_ACTIVE_HIGH>;
sleep-gpios = <&gpio_e 15 GPIO_ACTIVE_HIGH>;
rgb-mode = <PRGB>;
interface-format = <PRGB_16BIT_LD>;
clock-phase = <DEGREE_0>;
data-order = <RGB>;
disp-dither = <DITHER_RGB565>;

port {
    panel_rgb_in: endpoint {
    remote-endpoint = <&rgb0_out>;
    };
};

display-timings {
    native-mode = <&timing0>;
    timing0: 1024x600 {
        lock-frequency = <52000000>;
        hactive = <1024>;
        vactive = <600>;
        hback-porch = <160>;
        hfront-porch = <160>;
        hsync-len = <20>;
        vback-porch = <12>;
        vfront-porch = <20>;
        vsync-len = <3>;
        de-active = <1>;
        pixelclk-active = <1>;
    };
};
```

其中类似 `enable-gpios` 控制引脚需要根据实际显示屏的需要增加或减少，驱动中做相应修改， `rgb-mode` `interface-format` 需要从规格书中获取， `data-order` `data-mirror` 需要根据板级走线的顺序设置相关参数。 `clock-phase` 需要根据最终实际的显示效果做相应调整。 关于参数详细的解析请参考 [显示部分章节DTS关于pannel_rgb的配置说明](../media/display/02_config_guide/device_tree/index.html#ref-to-panel-dts)

##### 1.4.3. 配置引脚

引脚的配置统一在 d211-pinctrl.dtsi 中完成，在 rgb0 节点中直接进行了引用

```
&rgb0 {
    pinctrl-names = "default", "sleep";
    pinctrl-0 = <&lcd_rgb565_ld_pins>;
    pinctrl-1 = <&lcd_rgb565_ld_sleep_pins>;
    status = "okay";
    ......
};
```

### 2. LVDS

LVDS 屏的调试和 RGB 类似，只需要把规格书中所描述的时序和规格参数加入相应的配置文件即可，也不需要额外的驱动程序。

#### 2.1. uboot 配置

在 luban 根目录下执行 make um，进入 uboot 的功能配置界面，使能显示模块驱动：

```
Device Drivers
    Graphics support
        ArtInChip Graphics  --->
            [*]   Enable ArtInChip Video Support
            [ ]   ArtInChip display rgb support
            [*]   ArtInChip display lvds support
            [ ]   ArtInChip display mipi-dsi support
            <*>   ArtInChip Panel Drivers (ArtInChip general LVDS panel)  --->
```

#### 2.2. kernel 配置

在 luban 根目录下执行 make km，进入 kernel 的功能配置界面，使能显示模块驱动：

```
Device Drivers
    Graphics support
        ArtInChip Graphics  --->
            <*> ArtInChip Framebuffer support
            [ ]   ArtInChip display rgb support
            [*]   ArtInChip display lvds support
            [ ]   ArtInChip display mipi-dsi support
            <*>   ArtInChip Panel Drivers (ArtInChip general LVDS panel)  --->
```

#### 2.3. uboot dts

uboot 如果要进行显示，则声明相应的配置为预加载，以 demo128_nand 工程为例，文件为 target/d211/demo128_nand/board-u-boot.dtsi

##### 2.3.1. 声明通路

```
&disp {
    u-boot,dm-pre-reloc;
    fb0: fb@0 {
        u-boot,dm-pre-reloc;
        port {
            fb0_out: endpoint {
                u-boot,dm-pre-reloc;
            }
        };
    };
};

&de0 {
    u-boot,dm-pre-reloc;
    port@0 {
        de0_in: endpoint {
            u-boot,dm-pre-reloc;
        };
    };

    port@1 {
        de0_out: endpoint {
            u-boot,dm-pre-reloc;
        };
    };
};
&lvds0 {                            //lvds
    u-boot,dm-pre-reloc;
    port@0 {
        lvds0_in: endpoint {
            u-boot,dm-pre-reloc;
        };
    };

    port@1 {
        lvds0_out: endpoint {
            u-boot,dm-pre-reloc;
        };
    };
};
```

##### 2.3.2. 声明屏幕参数

```
panel_lvds {
    u-boot,dm-pre-reloc;
    port {
        panel_lvds_in: endpoint {
            u-boot,dm-pre-reloc;
        };
    };

    display-timings {
        u-boot,dm-pre-reloc;
        timing1: 1024x600 {
            u-boot,dm-pre-reloc;
        };
    };
};
```

##### 2.3.3. 声明屏幕引脚

```
lvds1_pins: lvds1-0 {
        u-boot,dm-pre-reloc;
    pins {
        u-boot,dm-pre-reloc;
    };
};
```

#### 2.4. 系统dts

系统的 dts 将进行完整的功能配置，以 demo128_nand 工程为例，文件为 target/d211/demo128_nand/board.dts 中

##### 2.4.1. 配置通路

通过 port 和 status 结点，定义了一条数据通道

```
fb       |      de    |     |     lvds    |     panel
port  --> port0   port1 -->  port0   port1 -->  port
&fb0 {
    port {
        fb0_out: endpoint {
            remote-endpoint = <&de0_in>;
        };
    };
};

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
            remote-endpoint = <&lvds0_in>;   //LVDS
        };
    };
};

&lvds0 {
    pinctrl-names = "default";
    pinctrl-0 = <&lvds1_pins>;
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

##### 2.4.2. 配置屏幕参数

```
    panel_lvds {
    compatible = "artinchip,aic-general-lvds-panel";
    data-mapping = "vesa-24";
    data-channel = "single-link1";
    status = "okay";

    enable-gpios = <&gpio_c 7 GPIO_ACTIVE_HIGH>;
    port {
        panel_lvds_in: endpoint {
            remote-endpoint = <&lvds0_out>;
        };
    };

    display-timings {
        native-mode = <&timing1>;
        timing1: 1024x600 {
            clock-frequency = <52000000>;
            hactive = <1024>;
            vactive = <600>;
            hback-porch = <160>;
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

##### 2.4.3. 配置引脚

引脚的配置统一在 d211-pinctrl.dtsi 中完成，在 rgb0 节点中直接进行了引用

```
&lvds0 {
    pinctrl-names = "default";
    pinctrl-0 = <&lvds1_pins>;
    status = "okay";
    ......
}
```

### 3. MIPI

相比RGB和LVDS屏的调试，MIPI屏的调试相对稍微繁琐，因为每一款MIPI屏几乎都需要一个独立的驱动程序，因此不仅需要在DTS中设置参数，还需要在kernel和uboot中添加屏幕所对应的驱动

#### 3.1. uboot 配置

在 luban 根目录下执行 make um，进入 uboot 的功能配置界面，使能显示模块驱动：

```
Device Drivers
    Graphics support
        ArtInChip Graphics  --->
            [*]   Enable ArtInChip Video Support
            [ ]   ArtInChip display rgb support
            [ ]   ArtInChip display lvds support
            [ ]   ArtInChip display mipi-dsi support
            <*>   ArtInChip Panel Drivers (ArtInChip panel driver for B080XAN)  --->
```

#### 3.2. kernel 配置

在 luban 根目录下执行 make km，进入 kernel 的功能配置界面，使能显示模块驱动：

```
Device Drivers
    Graphics support
        ArtInChip Graphics  --->
            <*> ArtInChip Framebuffer support
            [ ]   ArtInChip display rgb support
            [ ]   ArtInChip display lvds support
            [*]   ArtInChip display mipi-dsi support
            <*>   ArtInChip Panel Drivers (ArtInChip panel driver for B080XAN)  --->
```

#### 3.3. uboot dts

uboot 如果要进行显示，则声明相应的配置为预加载，系统中目前没有配置 MIPI 的标案，可以参考如下配置

##### 3.3.1. 声明通路

```
&disp {
    u-boot,dm-pre-reloc;
    fb0: fb@0 {
        u-boot,dm-pre-reloc;
        port {
            fb0_out: endpoint {
                u-boot,dm-pre-reloc;
            };
        };
    };
};
&de0 {
    u-boot,dm-pre-reloc;
    port@0 {
        de0_in: endpoint {
            u-boot,dm-pre-reloc;
        };
    };

    port@1 {
        de0_out: endpoint {
            u-boot,dm-pre-reloc;
        };
    };
};
&dsi0 {                     //mipi dsi
    u-boot,dm-pre-reloc;
    port@0 {
        dsi0_in: endpoint {
            u-boot,dm-pre-reloc;
        };
    };

    port@1 {
        dsi0_out: endpoint {
            u-boot,dm-pre-reloc;
        };
    };
};
```

##### 3.3.2. 声明屏幕参数

```
panel_dsi {
    u-boot,dm-pre-reloc;
    port {
        panel_dsi_in: endpoint {
            u-boot,dm-pre-reloc;
        };
    };
};
```

##### 3.3.3. 声明屏幕引脚

```
dsi_pins: dsi-0 {
        u-boot,dm-pre-reloc;
    pins {
        u-boot,dm-pre-reloc;
    };
};
```

#### 3.4. 系统dts

系统的 dts 将进行完整的功能配置，以 demo128_nand 工程为例，文件为 target/d211/demo128_nand/board.dts 中

##### 3.4.1. 配置通路

通过 port 和 status 结点，定义了一条数据通道

```
fb       |      de    |     |     mipi    |     panel
port  --> port0   port1 -->  port0   port1 -->  port
&fb0 {
    port {
        fb0_out: endpoint {
            remote-endpoint = <&de0_in>;
        };
    };
};

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
            remote-endpoint = <&dsi0_in>;   //mipi dsi
        };
    };
};

&dsi0 {
    pinctrl-names = "default";
    pinctrl-0 = <&dsi_pins>;
    status = "okay";

    data-clk-inverse;

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

##### 3.4.2. 配置屏幕参数

```
    panel_dsi {
    compatible = "artinchip,aic-dsi-panel-simple";
    status = "okay";

    enable-gpios = <&gpio_c 6 GPIO_ACTIVE_HIGH>;

    port {
        panel_dsi_in: endpoint {
            remote-endpoint = <&dsi0_out>;
        };
    };
};
```

##### 3.4.3. 配置引脚

引脚的配置统一在 d211-pinctrl.dtsi 中完成，在 rgb0 节点中直接进行了引用

```
&dsi0 {
    pinctrl-names = "default";
    pinctrl-0 = <&dsi_pins>;
    status = "okay";
    ......
}
```

### 4. 背光配置

#### 4.1. GPIO控制背光

如果没有调节背光亮度需求，仅仅是亮或黑屏，则用GPIO控制较为简单，只需要在dts panel节点中一个地方配置好就可以，如下；

```
panel_xxx {
    compatible = "artinchip,aic-general-lvds-panel";
    status = "okay";

    enable-gpios = <&gpio_c 7 GPIO_ACTIVE_HIGH>; //背光控制引脚，须和原理图一致
    port {
        panel_lvds_in: endpoint {
            remote-endpoint = <&lvds0_out>;
        };
};
```

#### 4.2. PWM控制背光

如果有调节背光亮度的需求，则需要使用PWM来控制背光， 有以下步骤配置：

1.board.dts panel节点中需添加backlight节点，如下：

```
panel_xxx {
    compatible = "artinchip,aic-general-lvds-panel";
    status = "okay";

    //enable-gpios = <&gpio_c 7 GPIO_ACTIVE_HIGH>;
    backlight = <&backlight>;//添加backlight
    port {
        panel_lvds_in: endpoint {
            remote-endpoint = <&lvds0_out>;
        };
};
```

2.board.dts中使能backlight节点

```
backlight: backlight {
     compatible = "pwm-backlight";
     /* pwm node name; pwm device No.; period_ns; pwm_polarity */
     pwms = <&pwm 0 1000000 0>; //硬件对应的哪一路PWM接口，需要和原理图确认
     brightness-levels = <0 10 20 30 40 50 60 70 80 90 100>; //每一级对应的占空百分比
     default-brightness-level = <6>;
     status = "okay";
};
```

3.board.dts中使能对应的PWM

```
&pwm {
    status = "okay";    //PWM节点总开关
    pinctrl-names = "default";
    pinctrl-0 = <&pwm0_pins_d>;    //添加背光控制pinmux引脚
    /* mode: up-count, down-count, up-down-count
       action: none, low, high, inverse */
    pwm0 {
        aic,mode = "up-count";
        aic,tb-clk-rate = <24000000>;
        aic,rise-edge-delay = <10>;
        aic,fall-edge-delay = <10>;
        /*            CBD,    CBU,    CAD,    CAU,    PRD,   ZRO */
        aic,action0 = "none", "none", "none", "low", "none", "high";
        aic,action1 = "none", "none", "none", "high", "none", "low";
        status = "okay";    //使能硬件对应那一路的PWM子节点
    };
    ......
};
```

4.board-u-boot.dtsi添加对应的PWM节点

```
/ {
    ......
    backlight: backlight {
        u-boot,dm-pre-reloc;
    };
};

&pwm {
    u-boot,dm-pre-reloc;
    pwm0 {
        u-boot,dm-pre-reloc;
    };
    ......
};

&pinctrl {
    ......
    pwm0_pins_d: pwm0-3 {
        u-boot,dm-pre-reloc;
        pins {
            u-boot,dm-pre-reloc;
        };
    };
    ......
};
```

5.确认内核中打开如下配置

```
CONFIG_PWM=y
CONFIG_PWM_ARTINCHIP=y
CONFIG_BACKLIGHT_PWM=y
```

6.确认uboot中打开如下配置

```
CONFIG_PWM_ARTINCHIP=y
CONFIG_BACKLIGHT_PWM=y
```

#### 4.3. PWM背光测试调试

- 确认硬件信号的连通性
- 查看启动log是否有异常
- 查看如下命令节点是否存在，并通过命令调节背光或测试PWM输出信号

```
echo 5 > /sys/class/backlight/backlight/brightness //设置brightness级数, 对应到backlight节点设置的占空百分比。
```

### 5. 调试建议

小技巧

屏幕的调试尽量在 kernel 中完成，然后再移植到 uboot 中