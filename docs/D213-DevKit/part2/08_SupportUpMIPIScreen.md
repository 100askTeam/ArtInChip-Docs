---
sidebar_position: 8
---
# 开发板支持MIPI屏显示功能

开发板自带的镜像中已经默认支持的MIPI 显示屏功能，下面我们对开发板的MIPI显示屏功能进行测试。

## 开发板MIPI屏功能测试

在进行MIPI屏功能测试前，需要准备MIPI显示屏，后续需要通过排线将MIPI显示屏连接至开发板的MIPI显示屏接口，如下图所示：

![image-20240219161546641](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240219161546641.png)

下面我们使用排线连接显示屏和开发板，连接方式如下所示：

![image-20240219162310511](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240219162310511.png)

> 注意：使用排线连接时，需要确保开发板的线序中的1脚和屏幕的线序中的1脚进行相连,两者的1脚如上图中红色箭头处所示。



连接完成后将开发板连接电源和串口线上电，进入开发板的串口终端。在 sysfs 中查看当前 display engine 的信息

```
[aic@] # cat /sys/devices/platform/soc/18a00000.de/debug/display
Video Layer Enable       : 0
Video Layer Format       : 0
Video Layer Input Size   : 0 x 0
Video Layer Stride       : 0 0
Scaler Output Size       : 0 x 0
UI Layer Control         : format: 0, color key: 0, alpha: 1
UI Layer Input Size      : 480 x 800
UI Layer Color Key       : 0
UI Layer Alpha           : mode: 0, g_alpha: 255
UI Rectangle Control     : 1 0 0 0
UI Rectangle Size        : (480, 800) (0, 0) (0, 0) (0, 0)
UI Rectangle Offset      : (0, 0) (0, 0) (0, 0) (0, 0)
UI Rectangle Stride      : 1920 0 0 0
Tearing-effect           : TE mode: 0, TE pulse width: 0
Display Dither           : dither_en: 0, red depth: 0, green depth: 0, blue depth: 0
Display Timing           : hactive: 480, vactive: 800 hfp: 10 hbp: 20 vfp: 5 vbp: 20 hsync: 5 vsync: 5
Display Pixelclock       : 25600000 HZ
```



上电后可以看到屏幕背光亮起，开发板内置系统支持动态调节背光，可以执行如下命令进行背光调节：

```
echo 8 > /sys/class/backlight/backlight/brightness
```

设置brightness级数, 对应到backlight节点设置的占空百分比，设置的级数范围为（0,10）



下面进行显示屏的颜色测试，在 sysfs 中使用 display engine 的 color bar 模式进行调试

```
// 开启 color bar
# echo 1 >  /sys/devices/platform/soc/18a00000.de/debug/color_bar

// 关闭 color bar
# echo 0 >  /sys/devices/platform/soc/18a00000.de/debug/color_bar
```

开启color bar后可以在显示屏看到如下图所示的彩色条。

![EBU_Colorbars.svg](https://photos.100ask.net/artinchip-docs/d213-devkit/EBU_Colorbars.svg.png)
