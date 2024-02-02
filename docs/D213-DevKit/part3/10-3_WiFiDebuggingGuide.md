---
sidebar_position: 35
---
# WiFi调试指南

## 1. rtl8821CS

RealTek（瑞昱）系列的 SDIO WiFi 设备的驱动都开发的相对比较标准，移植的难度都比较低

### 1.1. 添加源码

Luban 的 Kernel 版本为 5.10， 建议尽量获取官方的比较新的驱动（ >= 5.10).

- 在 source/linux-5.10/drivers/net/wireless/realtek 中创建 rtl8821CS 目录，并复制 rtl8821CS 的驱动源码
- 在 source/linux-5.10/drivers/net/wireless/realtek/Kconfig 中添加对 rtl8821CS 模块的索引：

```
source "drivers/net/wireless/realtek/rtl8821/Kconfig"
```

- 在 source/linux-5.10/drivers/net/wireless/realtek/Makefile 中添加对 rtl8821CS 模块的索引：

```
obj-$(CONFIG_RTL8821CS)                += rtl8821CS/
```

### 1.2. Kconfig 修改

基于版本的差异，Luban 对 Kconfig 中 help 的字段解析可能和驱动原生的格式有差异， 在drivers/net/wireless/realtek/rtl8821/Kconfig中调整如下：

```
config RTL8821CS
    tristate "Realtek 8821C SDIO WiFi"
-    ---help---
+       help
```

Kconfig 修改正确后，在 make kernel_menuconfig 中应该能看到 rtl8821CS 模块， 勾选后可以进行编译错误的解决

### 1.3. include 目录添加

大部分 WiFi 驱动为了增强兼容性，驱动中会有一些存放 .h 文件的目录，而在 Makefile 中会引用这些目录，因为版本的差异， 此类目录的引用方法可能不一样

#### 1.3.1. 出错现象

```
fatal error: drv_types.h: No such file or directory
17 | #include <drv_types.h>
```

#### 1.3.2. 解决方案

在 source/linux-5.10/drivers/net/wireless/realtek/rtl8821cs/Makefile中修改如下：

- 修改引用方式，添加 srctree 前缀
- 添加额外的目录

```
-EXTRA_CFLAGS += -I$(src)/include
+EXTRA_CFLAGS += -I$(srctree)/$(src)/include
+EXTRA_CFLAGS += -I$(srctree)/$(src)/hal/phydm
+EXTRA_CFLAGS += -I$(srctree)/$(src)/hal/btc
+EXTRA_CFLAGS += -I$(srctree)/$(src)/platform
```

### 1.4. Makefile 编译优化

在 source/linux-5.10/drivers/net/wireless/realtek/rtl8821cs/Makefile中修改如下：

```
-EXTRA_CFLAGS += -O1
+EXTRA_CFLAGS += -Os
```

### 1.5. 内核配置

在make kernel_menuconfig进行功能配置

#### 1.5.1. 无线配置

WiFi 的使用必须要在 kernel 中打开 cfg80211 和 mac80211 的支持

```
Networking support > Wireless

--- Wireless
<*>   cfg80211 - wireless configuration API
[ ]     nl80211 testmode command (NEW)
[ ]     enable developer warnings (NEW)
[ ]     cfg80211 certification onus (NEW)
[*]     enable powersave by default (NEW)
[ ]     cfg80211 DebugFS entries (NEW)
[*]     support CRDA (NEW)
[*]     cfg80211 wireless extensions compatibility
<*>   Generic IEEE 802.11 Networking Stack (mac80211)
[*]   Minstrel (NEW)
      Default rate control algorithm (Minstrel)  --->
[ ]   Enable mac80211 mesh networking support (NEW)
[ ]   Export mac80211 internals in DebugFS (NEW)
[ ]   Trace all mac80211 debug messages (NEW)
[ ]   Select mac80211 debugging features (NEW)
```

#### 1.5.2. 蓝牙配置

BT 的使用必须要在 kernel 中打开bluetooth子系统相关配置

```
Networking support > Bluetooth subsystem support > Bluetooth device drivers

< > HCI USB driver
< > HCI SDIO driver
<*> HCI UART driver
[*]   UART (H4) protocol support
< >   UART Nokia H4+ protocol support
[ ]   BCSP protocol support
[ ]   Atheros AR300x serial support
[ ] HCILL protocol support
-*- Three-wire UART (H5) protocol support
[ ] Intel protocol support
[ ] Broadcom protocol support
[*] Realtek protocol support
[ ] Qualcomm Atheros protocol support
[ ] Intel AG6XX protocol support
[ ] Marvell protocol support
< > HCI BCM203x USB driver
< > HCI BPA10x USB driver
< > HCI BlueFRITZ! USB driver
< > HCI VHCI (Virtual HCI device) driver
< > Marvell Bluetooth driver support
< > MediaTek HCI SDIO driver
< > MediaTek HCI UART driver
```

#### 1.5.3. RFKILL配置

rfkill的使用必须要在 kernel 中打开相关配置

```
Networking support > RF switch subsystem support

 --- RF switch subsystem support
 [ ]   RF switch input support
 <*>   GPIO RFKILL driver
```

#### 1.5.4. 驱动选择

要使用8821C 驱动，需要在 kernel 中打开该驱动

```
Device Drivers > Network device support > Wireless LAN

[*]   Realtek devices
< >     Realtek 8187 and 8187B USB support
< >     Realtek rtlwifi family of devices  ----
< >     RTL8723AU/RTL8188[CR]U/RTL819[12]CU (mac80211) support
< >     Realtek 802.11ac wireless chips support  ----
<*>     Realtek 8821C SDIO WiFi
```

### 1.6. DTS配置

在board.dts中进行各子节点配置

#### 1.6.1. WIFI

1.打开对应的SDMC

```
&sdmc1 {
    pinctrl-names = "default";
    pinctrl-0 = <&sdmc1_pins_a>;//核对引脚是否和原理图一致
    bus-width = <4>;
    no-mmc;
    no-sd;
    non-removalbe;
    cap-sdio-irq;
    status = "okay";
};
```

2.配置控制引脚

```
rfkill_wlan {
    compatible = "rfkill-gpio";
    rfkill-name = "wlan";
    rfkill-type = <1>;
    reset-gpios = <&gpio_e 4 GPIO_ACTIVE_HIGH>;//模组WiFi使能引脚，根据实际原理图配置
    shutdown-gpios = <&gpio_d 8 GPIO_ACTIVE_LOW>;//电源控制引脚，根据实际原理图配置
    status = "okay";
};
```

#### 1.6.2. BT

1.打开对应UART

```
&uart6 {
    pinctrl-names = "default";
    pinctrl-0 = <&uart6_pins_a>, <&uart6_rts_pins_a>, <&uart6_rts_pins_b>;//须和原理图保持一致
   status = "okay";
};
```

2.配置控制引脚

```
rfkill_bt {
    compatible = "rfkill-gpio";
    rfkill-name = "bluetooth";
    rfkill-type = <2>;
    reset-gpios = <&gpio_c 6 GPIO_ACTIVE_HIGH>;//模组蓝牙使能引脚，须和原理图保持一致
    status = "okay";
};
```

### 1.7. 模组配置文件

#### 1.7.1. 蓝牙固件和下载工具

可以从模组厂获取，存放于overylay目录

```
├── lib
│   └── firmware
│       └── rtlbt
│           ├── rtl8821c_config//模组配置文件，最好从模组厂获取
│           └── rtl8821c_fw//模组固件，最好从模组厂获取
├── usr
│   └── bin
│       └── rtk_hciattach//模组蓝牙固件下载工具，最好从模组厂获取
```

### 1.8. 功能测试和调试

#### 1.8.1. 添加相关工具包

在make menuconfig进行功能配置

```
[*] wireless tools  --->
[*] bluez-utils  --->
    [ ]   use prebuilt binary instead of building from source
    [ ]   build OBEX support
    [ ]   build CLI client
    [ ]   build monitor utility
    [*]   build tools
    [*]     install deprecated tools
    [ ]   build experimental tools
    [ ]   build audio plugins (a2dp and avrcp)
    [ ]   build health plugin
    [ ]   build hid plugin
    [ ]   build hog plugin
    [ ]   build mesh plugin
    [ ]   build midi plugin
    [*]   build network plugin
    [ ]   build nfc plugin
    [ ]   build sap plugin
          *** sixaxis plugin needs udev /dev management ***
    [ ]   install test scripts
          *** hid2hci tool needs udev /dev management ***
```

#### 1.8.2. 测试

1.WiFi

```
insmod rtl8821.ko
ifconfig wlan0 up
iwlist wlan0 scan
```

2.BT

```
echo 0 > /sys/class/rfkill/rfkill0/state
echo 1 > /sys/class/rfkill/rfkill0/state
rtk_hciattach -n -s 115200 /dev/ttyS6 rtk_h5 &
hciconfig hci0 up
hcitool scan
```

#### 1.8.3. 调试

- 核对并测试硬件信号的连通性
- 查看系统启动日志和模组驱动加载日志是否有异常并排查
- WIFI模组驱动日志配置方法如下，Makefile中：

```
CONFIG_RTW_DEBUG = n//debug开关
CONFIG_RTW_LOG_LEVEL = 4//debug level
```