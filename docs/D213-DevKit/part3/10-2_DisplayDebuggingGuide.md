---
sidebar_position: 34
---
# 显示屏调试指南

## 1. RGB屏调试配置

### 1.1. 概述

相比MIPI屏的调试，RGB屏的调试相对简单，只需要把规格书中所描述的时序和规格参数加入相应的配置文件即可，不需要额外的驱动程序。 此章节详细的描述一款RGB显示屏的调试过程和配置方法。

### 1.2. 内核配置

驱动源码目录：linux-5.10/drivers/video/fbdev/artinchip/panel/

配置请参考 [显示部分章节说明](../../media/display/02_config_guide/menuconfig/index.html#ref-to-display-module-menuconfig)

### 1.3. DTS参数配置

这些参数主要在文件target/d211/方案x/board.dts中，功能参数的设置必须和硬件原理图相匹配

- 首先设置显示模块数据通路关系，RGB屏幕数据通路如下：

  > ```
  > &fb0 {
  >         port {
  >                 fb0_out: endpoint {
  >                         remote-endpoint = <&de0_in>;
  >                 };
  >         };
  > };
  > 
  > &de0 {
  >         status = "okay";
  >         port@0 {
  >                 reg = <0>;
  >                 de0_in: endpoint {
  >                         remote-endpoint = <&fb0_out>;
  >                 };
  >         };
  > 
  >         port@1 {
  >                 reg = <1>;
  >                 de0_out: endpoint {
  >                         remote-endpoint = <&rgb0_in>;
  >                 };
  >         };
  > };
  > 
  > &rgb0 {
  >         status = "okay";
  >         port@0 {
  >                 reg = <0>;
  >                 rgb0_in: endpoint {
  >                         remote-endpoint = <&de0_out>;
  >                 };
  >         };
  > 
  >         port@1 {
  >                 reg = <1>;
  >                 rgb0_out: endpoint {
  >                         remote-endpoint = <&panel_rgb_in>;
  >                 };
  >         };
  > };
  > ```
  >
  > 在上述例子中，board.dts通过port和status结点，定义了一条数据通道。
  >
  > ```
  > fb       |      de    |     |     rgb    |     panel
  > port  --> port0   port1 -->  port0   port1 -->  port
  > ```
  >
  > 如果board.dts中没有正确定义一条数据通道，显示驱动可能无法完成初始化。

- 设置屏幕参数

  > ```
  > panel_rgb {
  >         compatible = "artinchip,aic-general-rgb-panel";
  >         enable-gpios = <&gpio_a 4 GPIO_ACTIVE_HIGH>;
  >         rgb-mode = <PRGB>;
  >         interface-format = <PRGB_24BIT>;
  >         clock-phase = <DEGREE_90>;
  >         data-order = <RGB>;
  >         data-mirror;
  >         status = "okay";
  > 
  >         port {
  >                 panel_rgb_in: endpoint {
  >                         remote-endpoint = <&rgb0_out>;
  >                 };
  >         };
  > 
  >         display-timings {
  >                 native-mode = <&timing0>;
  >                 timing0: 800x480 {
  >                         clock-frequency = <30000000>;
  >                         hactive = <800>;
  >                         vactive = <480>;
  >                         hback-porch = <88>;
  >                         hfront-porch = <40>;
  >                         hsync-len = <48>;
  >                         vback-porch = <32>;
  >                         vfront-porch = <13>;
  >                         vsync-len = <3>;
  >                         de-active = <1>;
  >                         pixelclk-active = <1>;
  >                 };
  >         };
  > };
  > ```
  >
  > 其中类似 `enable-gpios` 控制引脚需要根据实际显示屏的需要增加或减少，驱动中做相应修改， `rgb-mode` `interface-format` 需要从规格书中获取， `data-order` `data-mirror` 需要根据板级走线的顺序设置相关参数。 `clock-phase` 需要根据最终实际的显示效果做相应调整。 关于参数详细的解析请参考 [显示部分章节DTS关于pannel_rgb的配置说明](../../media/display/02_config_guide/device_tree/index.html#ref-to-panel-dts)
  >
  > 其中参数 `display-timings` 需要从屏幕规格书中或供应商处获取，例如规格书会有如下信息：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/rgb_timing.png](https://photos.100ask.net/artinchip-docs/d213-devkit/rgb_timing-17067703666421.png)

### 1.4. 调试[¶](#id3)

调试部分请查看 [显示部分章节关于常见问题的调试说明](../../media/display/10_faq/index.html#ref-to-display-faq)

## 2. LVDS屏调试配置

### 2.1. 概述

相比MIPI屏的调试，LVDS屏的调试相对简单，只需要把规格书中所描述的时序和规格参数加入相应的配置文件即可，不需要额外的驱动程序。 此章节详细的描述一款LVDS显示屏的调试过程和配置方法。

### 2.2. 内核配置

驱动源码目录：linux-5.10/drivers/video/fbdev/artinchip/panel/

配置请参考 [显示部分章节说明](../../media/display/02_config_guide/menuconfig/index.html#ref-to-display-module-menuconfig)

### 2.3. DTS参数配置

这些参数主要在文件target/d211/方案x/board.dts中，功能参数的设置必须和硬件原理图相匹配

- 首先设置显示模块数据通路关系，RGB屏幕数据通路如下：

  > ```
  > &fb0 {
  >         port {
  >                 fb0_out: endpoint {
  >                         remote-endpoint = <&de0_in>;
  >                 };
  >         };
  > };
  > 
  > &de0 {
  >         status = "okay";
  >         port@0 {
  >                 reg = <0>;
  >                 de0_in: endpoint {
  >                         remote-endpoint = <&fb0_out>;
  >                 };
  >         };
  > 
  >         port@1 {
  >                 reg = <1>;
  >                 de0_out: endpoint {
  >                         remote-endpoint = <&lvds0_in>;
  >                 };
  >         };
  > };
  > 
  > &lvds0 {
  >         status = "okay";
  >         port@0 {
  >                 reg = <0>;
  >                 lvds0_in: endpoint {
  >                         remote-endpoint = <&de0_out>;
  >                 };
  >         };
  > 
  >         port@1 {
  >                 reg = <1>;
  >                 lvds0_out: endpoint {
  >                         remote-endpoint = <&panel_lvds_in>;
  >                 };
  >         };
  > };
  > ```
  >
  > 在上述例子中，board.dts通过port和status结点，定义了一条数据通道。
  >
  > ```
  > fb       |      de    |     |     lvds    |     panel
  > port  --> port0   port1 -->  port0   port1 -->  port
  > ```
  >
  > 如果board.dts中没有正确定义一条数据通道，显示驱动可能无法完成初始化。

- 设置屏幕参数

  > ```
  > panel_lvds {
  >         compatible = "artinchip,aic-general-lvds-panel";
  >         enable-gpios = <&gpio_a 4 GPIO_ACTIVE_HIGH>;
  >         data-mapping = "vesa-24";
  >         data-channel = "single-link0";
  >         status = "okay";
  > 
  >         port {
  >                 panel_lvds_in: endpoint {
  >                         remote-endpoint = <&lvds0_out>;
  >                 };
  >         };
  > 
  >         display-timings {
  >                 native-mode = <&timing1>;
  >                 timing1: 1024x600 {
  >                         clock-frequency = <60000000>;
  >                         hactive = <1024>;
  >                         vactive = <600>;
  >                         hback-porch = <140>;
  >                         hfront-porch = <160>;
  >                         hsync-len = <20>;
  >                         vback-porch = <20>;
  >                         vfront-porch = <12>;
  >                         vsync-len = <3>;
  >                         de-active = <1>;
  >                         pixelclk-active = <1>;
  >                 };
  >         };
  > };
  > ```
  >
  > 其中类似 `enable-gpios` 控制引脚需要根据实际显示屏的需要增加或减少，驱动中做相应修改， `data-mapping` `data-channel` 需要从规格书中获取， 关于参数详细的解析请参考 [显示部分章节DTS关于pannel_lvds的配置说明](../../media/display/02_config_guide/device_tree/index.html#ref-to-panel-dts)
  >
  > 其中参数 `display-timings` 需要从屏幕规格书中或供应商处获取，例如规格书会有如下信息：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/lvds_timing.png](https://photos.100ask.net/artinchip-docs/d213-devkit/lvds_timing-17067704093083.png)

### 2.4. 调试

调试部分请查看 [显示部分章节关于常见问题的调试说明](../../media/display/10_faq/index.html#ref-to-display-faq)

## 3. MIPI屏调试配置

### 3.1. 概述

相比RGB和LVDS屏的调试，MIPI屏的调试相对稍微繁琐，不仅需要在DTS中设置参数，还需要在kernel中添加屏幕所对应的驱动。 此章节详细的描述一款MIPI显示屏的调试过程和配置方法。

### 3.2. 内核配置

驱动源码目录：linux-5.10/drivers/video/fbdev/artinchip/panel/

配置请参考 [显示部分章节说明](../../media/display/02_config_guide/menuconfig/index.html#ref-to-display-module-menuconfig)

### 3.3. DTS参数配置

这些参数主要在文件target/d211/方案x/board.dts中，功能参数的设置必须和硬件原理图相匹配

- 首先设置显示模块数据通路关系，RGB屏幕数据通路如下：

  > ```
  > &fb0 {
  >         port {
  >                 fb0_out: endpoint {
  >                         remote-endpoint = <&de0_in>;
  >                 };
  >         };
  > };
  > 
  > &de0 {
  >         status = "okay";
  >         port@0 {
  >                 reg = <0>;
  >                 de0_in: endpoint {
  >                         remote-endpoint = <&fb0_out>;
  >                 };
  >         };
  > 
  >         port@1 {
  >                 reg = <1>;
  >                 de0_out: endpoint {
  >                         remote-endpoint = <&dsi0_in>;
  >                 };
  >         };
  > };
  > 
  > &dsi0 {
  >     status = "okay";
  >     pinctrl-names = "default";
  >     pinctrl-0 = <&dsi_pins>;
  > 
  >     port@0 {
  >         reg = <0>;
  >         dsi0_in: endpoint {
  >             remote-endpoint = <&de0_out>;
  >         };
  >     };
  > 
  >     port@1 {
  >         reg = <1>;
  >         dsi0_out: endpoint {
  >             remote-endpoint = <&panel_dsi_in>;
  >         };
  >     };
  > };
  > ```
  >
  > 在上述例子中，board.dts通过port和status结点，定义了一条数据通道。
  >
  > ```
  > fb       |      de    |     |     dsi    |     panel
  > port  --> port0   port1 -->  port0   port1 -->  port
  > ```
  >
  > 如果board.dts中没有正确定义一条数据通道，显示驱动可能无法完成初始化。

- 设置屏幕参数

  > ```
  >     panel_dsi {
  >     compatible = "artinchip,aic-dsi-panel-simple";
  >     status = "disabled";
  > 
  >     dcdc-en-gpios  = <&gpio_p 0 GPIO_ACTIVE_HIGH>;
  >     reset-gpios  = <&gpio_p 1 GPIO_ACTIVE_HIGH>;
  >     enable-gpios = <&gpio_d 3 GPIO_ACTIVE_HIGH>;
  > 
  >     port {
  >         panel_dsi_in: endpoint {
  >             remote-endpoint = <&dsi0_out>;
  >         };
  >     };
  > 
  >     display-timings {
  >                     native-mode = <&timing1>;
  >                     timing1: 800x480 {
  >                             clock-frequency = <60000000>;
  >                             hactive = <800>;
  >                             vactive = <480>;
  >                             hback-porch = <35>;
  >                             hfront-porch = <20>;
  >                             hsync-len = <4>;
  >                             vback-porch = <20>;
  >                             vfront-porch = <10>;
  >                             vsync-len = <4>;
  >                             de-active = <1>;
  >                             pixelclk-active = <1>;
  >                     };
  >             };
  > };
  > ```
  >
  > 每一款屏幕所需要的控制IO的数量及功能会有所差别，其中参数可以在DTS中设置，也可以在驱动源码中直接设置， 请参考 [显示部分章节DTS关于pannel_dsi的配置说明](../../media/display/02_config_guide/device_tree/index.html#ref-to-panel-dts)
  >
  > 其中参数 `display-timings` 需要从屏幕使用文档中或供应商处获取，例如使用说明文件中会有如下信息：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/mipi_timing.png](https://photos.100ask.net/artinchip-docs/d213-devkit/mipi_timing-17067704439945.png)

### 3.4. 添加驱动程序

新增加一款屏幕的驱动可以从屏幕供应商处获取参考代码或使用说明文件，然后参考平台现有相似接口驱动进行适配。

新增屏幕驱动的适配流程请参考 [显示部分章节关于屏驱动的说明](../../media/display/06_panel_port/index.html#ref-to-panel-driver)

添加驱动时，有两个关键信息需要从供应商所提供的文档或资料中获取

- 初始化代码

例如，xm91080 屏幕从供应商处获取到初始化代码如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/mipi_init_code.png](https://photos.100ask.net/artinchip-docs/d213-devkit/mipi_init_code-17067704681757.png)

添加到驱动程序后体现在 `init_sequence` 函数如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/mipi_init_sequece.png](https://photos.100ask.net/artinchip-docs/d213-devkit/mipi_init_sequece-17067704774049.png)

- 屏幕上电时序

需要根据屏幕的上电特性要求对控制IO进行拉低或拉高，如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/mipi_init_time.png](https://photos.100ask.net/artinchip-docs/d213-devkit/mipi_init_time-170677048395911.png)

注意

屏幕的调试还要根据具体屏幕的特性，每个屏都会有所不同，大致流程基本相似

### 3.5. 调试

调试部分请查看 [显示部分章节关于常见问题的调试说明](../../media/display/10_faq/index.html#ref-to-display-faq)