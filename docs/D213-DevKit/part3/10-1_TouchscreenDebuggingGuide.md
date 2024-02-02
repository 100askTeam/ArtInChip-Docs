---
sidebar_position: 33
---
# 触摸屏调试指南

## 1. RTP调试配置

### 1.1. 概述

相比CTP电容触摸屏，RTP电阻触摸屏的配置和调试稍微简单，因为不需要额外的触摸屏驱动，只需要根据原理图设置对应的dts参数，然后把系统自带的RTP控制器驱动加载即可。

详细的原理介绍请参考 [接口部分关于RTP的说明](../../interface/rtp/index.html#ref-luban-rtp)

### 1.2. 内核配置

在luban根目录下执行 make km (make kernel-menuconfig)，进入kernel的功能配置，按如下选择：

```
Linux
    Device Drivers
        Input device support
            [*] Touchscreens
                <*> Artinchip resistive touchscreen controller support
```

### 1.3. DTS参数配置

board.dts中的参数配置时请确保硬件连线和所配置参数一致，示例如下：

```
&rtp {
    aic,max-pressure = <800>;       //最大压感值，超过此值的坐标事件被忽略，按压力度越小该值越大，即值越大触摸越敏感
    aic,x-plate = <235>;            //用万用表测量触摸板X+ 和 X-之间的电阻值获得
    pinctrl-names = "default";      //默认
    pinctrl-0 = <&rtp_pins>;        //RTP触摸板接线对应的PIN脚
    status = "okay";                //RTP驱动使能标志
};
```

其中rtp_pins定义在d211-pinctrl.dtsi,4个pin脚需要分别对应RTP屏的X+ 、Y+ 、X- 、Y- 需要硬件确认无误。

```
rtp_pins: rtp-0 {
    pins {
        pinmux = <AIC_PINMUX('A', 8, 2)>,
                 <AIC_PINMUX('A', 9, 2)>,
                 <AIC_PINMUX('A', 10, 2)>,
                 <AIC_PINMUX('A', 11, 2)>;
    };
};
```

硬件接线示例图如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/rtp1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/rtp1-17067702051561.png)

注意

请务必确保dts所配置的参数和引脚与硬件原理图一致

### 1.4. 调试

- 测量硬件通路

  测量硬件通路是否正常，测量电压信号是否正常

- 查看打印信息

  打开调试选项，系统启动时看是否有异常打印

  ```
  Linux
      Kernel hacking
          Artinchip Debug
              [*] RTP driver debug
  ```

- 查看节点信息

  在RTP初始化成功后，会在sysfs中注册生成一个status节点，其中打印了当前的RTP配置及状态信息：

  ```
  # cat /sys/devices/platform/soc/19252000.rtp/status
  In RTP controller V1.00:
  Mode 0/2, RTP enale 0, Press detect enable 0
  Manual mode status 0
  Pressure enable 1, max 800, x-plate 235, y-plate 0
  Point num: 1, Sample period: 0, Fuzz: 0
  ```

- 获取坐标信息

  如果系统有编译getevent工具，触摸屏有触摸时进行坐标的打印

  ```
  # getevent
  ```

- 获取设备信息

  ```
  # cat /proc/bus/input/devices
  
  例如：
  I: Bus=0019 Vendor=0000 Product=0001 Version=0000
  N: Name="Power Button"
  P: Phys=LNXPWRBN/button/input0
  S: Sysfs=/devices/LNXSYSTM:00/LNXPWRBN:00/input/input0
  U: Uniq=
  H: Handlers=kbd event0
  B: PROP=0
  B: EV=3
  B: KEY=10000000000000 0
  
  I: Bus=0011 Vendor=0001 Product=0001 Version=ab41
  N: Name="AT Translated Set 2 keyboard"
  P: Phys=isa0060/serio0/input0
  S: Sysfs=/devices/platform/i8042/serio0/input/input1
  U: Uniq=
  H: Handlers=sysrq kbd event1 leds
  B: PROP=0
  B: EV=120013
  B: KEY=402000000 3803078f800d001 feffffdfffefffff fffffffffffffffe
  B: MSC=10
  B: LED=7
  ```

## 2. CTP调试配置

### 2.1. 概述

相比RTP电阻触摸屏， CTP电容触摸屏的调试稍微繁琐一点，CTP驱动一般由触摸屏原厂提供，经过移植添加到SDK中编译和使用 本章节以GT9xx为例来说明一款新的CTP的调试和移植过程。

### 2.2. 内核配置

#### 2.2.1. 驱动移植

驱动存放路径：source/linux-5.10/drivers/input/touchscreen/gt9xx

其中source/linux-5.10/drivers/input/touchscreen/Makefile修改添加如下：

```
diff --git a/drivers/input/touchscreen/Makefile b/drivers/input/touchscreen/Makefile
index 75924acd8..4be057598 100644
--- a/drivers/input/touchscreen/Makefile
+++ b/drivers/input/touchscreen/Makefile
@@ -116,3 +116,6 @@ obj-$(CONFIG_TOUCHSCREEN_ROHM_BU21023)      += rohm_bu21023.o
 obj-$(CONFIG_TOUCHSCREEN_RASPBERRYPI_FW)       += raspberrypi-ts.o
 obj-$(CONFIG_TOUCHSCREEN_IQS5XX)       += iqs5xx.o
 obj-$(CONFIG_TOUCHSCREEN_ZINITIX)      += zinitix.o
+obj-$(CONFIG_INPUT_TOUCHSCREEN)   += gt9xx/
```

其中source/linux-5.10/drivers/input/touchscreen/Kconfig修改添加如下：

```
diff --git a/drivers/input/touchscreen/Kconfig b/drivers/input/touchscreen/Kconfig
index a8d18a679..6acdc3b63 100644
--- a/drivers/input/touchscreen/Kconfig
+++ b/drivers/input/touchscreen/Kconfig
@@ -1344,5 +1344,7 @@ config TOUCHSCREEN_ZINITIX

          To compile this driver as a module, choose M here: the
          module will be called zinitix.
-
+source "drivers/input/touchscreen/gt9xx/Kconfig"
```

注意

请从触摸屏供应商处获取和内核版本匹配的驱动程序，如果版本不匹配则可能编译出错，需要自行适配。

#### 2.2.2. 内核配置

在luban根目录下执行 make km (make kernel-menuconfig)，进入kernel的功能配置，按如下选择：

```
Linux
    Device Drivers
        Input device support
            [*] Touchscreens
                <M> gt9xx based touchscreens
```

驱动以ko的方式编译后，系统启动后在启动脚本S10mdev自动加载，如下：

```
start() {
     echo -n "Starting $DAEMON... "
     start-stop-daemon -S -b -m -p $PIDFILE -x /sbin/mdev -- -df
     [ $? -eq 0 ] && echo "OK" || echo "ERROR"

     # coldplug modules
     find /sys/ -name modalias -print0 | \
         xargs -0 sort -u | \
         tr '\n' '\0' | \
         xargs -0 modprobe -abq
}
```

小技巧

如果不需要自动加载，可注释掉所示代码，仿照其他启动服务自定义加载服务。

### 2.3. DTS参数配置

- board.dts中要添加的参数选项需要查看驱动代码中所要解析的dts参数而添加，示例如下：

GT9xx驱动程序中所要解析的dts参数

```
    static int gtp_parse_dt(struct device *dev,
                    struct goodix_ts_platform_data *pdata)
{
    int ret;
    u32  key_nums;
    struct property *prop;
    u32 key_map[MAX_KEY_NUMS];
    struct device_node *np = dev->of_node;

    gtp_parse_dt_coords(dev, pdata);

    ret = of_property_read_u32(np, "irq-flags",
                &pdata->irq_flags);
    if (ret) {
        dev_info(dev,
            "Failed get int-trigger-type from dts,set default\n");
        pdata->irq_flags = GTP_DEFAULT_INT_TRIGGER;
    }
    of_property_read_u32(np, "goodix,int-sync", &pdata->int_sync);
    if (pdata->int_sync)
        dev_info(dev, "int-sync enabled\n");

    of_property_read_u32(np, "goodix,driver-send-cfg",
                &pdata->driver_send_cfg);
    if (pdata->driver_send_cfg)
        dev_info(dev, "driver-send-cfg enabled\n");

    of_property_read_u32(np, "goodix,swap-x2y", &pdata->swap_x2y);
    if (pdata->swap_x2y)
        dev_info(dev, "swap-x2y enabled\n");

    of_property_read_u32(np, "goodix,slide-wakeup", &pdata->slide_wakeup);
    if (pdata->slide_wakeup)
        dev_info(dev, "slide-wakeup enabled\n");

    of_property_read_u32(np, "goodix,auto-update", &pdata->auto_update);
    if (pdata->auto_update)
        dev_info(dev, "auto-update enabled\n");

    of_property_read_u32(np, "goodix,auto-update-cfg",
                &pdata->auto_update_cfg);
    if (pdata->auto_update_cfg)
        dev_info(dev, "auto-update-cfg enabled\n");

    of_property_read_u32(np, "goodix,esd-protect", &pdata->esd_protect);
    if (pdata->esd_protect)
        dev_info(dev, "esd-protect enabled\n");

    of_property_read_u32(np, "goodix,type-a-report",
                &pdata->type_a_report);
    if (pdata->type_a_report)
        dev_info(dev, "type-a-report enabled\n");

    of_property_read_u32(np, "goodix,resume-in-workqueue",
                &pdata->resume_in_workqueue);
    if (pdata->resume_in_workqueue)
        dev_info(dev, "resume-in-workqueue enabled\n");

    of_property_read_u32(np, "goodix,power-off-sleep",
                &pdata->power_off_sleep);
    if (pdata->power_off_sleep)
        dev_info(dev, "power-off-sleep enabled\n");

    of_property_read_u32(np, "goodix,pen-suppress-finger",
                &pdata->pen_suppress_finger);
    if (pdata->pen_suppress_finger)
        dev_info(dev, "pen-suppress-finger enabled\n");

    prop = of_find_property(np, "touchscreen-key-map", NULL);
    if (prop) {
        key_nums = prop->length / sizeof(key_map[0]);
        key_nums = key_nums > MAX_KEY_NUMS ? MAX_KEY_NUMS : key_nums;

        dev_dbg(dev, "key nums %d\n", key_nums);
        ret = of_property_read_u32_array(np,
                "touchscreen-key-map", key_map,
                key_nums);
        if (ret) {
            dev_err(dev, "Unable to read key codes\n");
            pdata->key_nums = 0;
            memset(pdata->key_map, 0,
                MAX_KEY_NUMS * sizeof(pdata->key_map[0]));
        }
        pdata->key_nums = key_nums;
        memcpy(pdata->key_map, key_map,
            key_nums * sizeof(pdata->key_map[0]));
        dev_info(dev, "key-map is [%x %x %x %x]\n",
            pdata->key_map[0], pdata->key_map[1],
            pdata->key_map[2], pdata->key_map[3]);
    }

    pdata->irq_gpio = of_get_named_gpio(np, "irq-gpios", 0);
    if (!gpio_is_valid(pdata->irq_gpio))
        dev_err(dev, "No valid irq gpio");

    pdata->rst_gpio = of_get_named_gpio(np, "reset-gpios", 0);
    if (!gpio_is_valid(pdata->rst_gpio))
        dev_err(dev, "No valid rst gpio");

    return 0;
}
```

board.dts中所添加的参数项

```
&i2c3 {
    pinctrl-names = "default";
    pinctrl-0 = <&i2c3_pins_a>;
    status = "okay";

    gt9xx@5d {
        status = "okay";
        compatible = "goodix,gt9xx";
        reg = <0x5d>;                               //CTP设备地址，可以从规格书中获取
        reset-gpios = <&gpio_a 8 GPIO_ACTIVE_LOW>;
        irq-gpios = <&gpio_a 9 GPIO_ACTIVE_HIGH>;
        irq-flags = <2>;

        touchscreen-max-id = <11>;
        touchscreen-size-x = <1024>;                //CTP x轴的范围
        touchscreen-size-y = <600>;                 //CTP y轴的范围
        touchscreen-max-w = <1024>;                  //MAX width
        touchscreen-max-p = <512>;                  //MAX pressure

        goodix,int-sync = <1>;
    };
};
```

- CTP设备地址获取：

从规格书中可以看出GT9xx根据初始化时序的不同支持两种设备地址，默认时序的读写地址为0xBA/0xBB,读写地址去掉最后一位读写位就是设备地址，即：0x5d

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/slave_addr.png](https://photos.100ask.net/artinchip-docs/d213-devkit/slave_addr-17067702833823.png)

- 硬件接线示例图如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ctp1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ctp1-17067702893135.png)

注意

请务必确保dts所配置的参数和引脚与硬件原理图一致

### 2.4. 调试

- 测量硬件通路

  测量硬件通路是否正常，测量电压信号是否正常

- 查看打印信息

  在board.dts中修改bootargs，增加“loglevel=8” 调高打印级别，系统启动时或insmod驱动模块时看是否有异常打印

- 获取坐标信息

  如果系统有编译getevent工具，触摸屏有触摸时进行坐标的打印

  ```
  # getevent
  ```

- 获取设备信息

  ```
  # cat /proc/bus/input/devices
  
  例如：（以GT9xx为例）
  I: Bus=0018 Vendor=dead Product=beef Version=28bb
  N: Name="goodix-ts"
  P: Phys=input/ts
  S: Sysfs=/devices/virtual/input/input0
  U: Uniq=
  H: Handlers=event0
  B: PROP=2
  B: EV=b
  B: KEY=1c00 0 0 0 0 0
  B: ABS=6e1800000000000
  ```