---
sidebar_position: 2
---
# 更新系统

## 烧写固件至SPI nand

### 准备工作

- 硬件：D213-DevKit开发板 
- 硬件：TypeC线 X2
- 硬件：12V电源适配器
- 软件：匠芯创 单机调试刷机工具： [AiBrun](https://gitee.com/artinchip/tools/raw/master/AiBurn-1.3.6_Setup_2023-12-22.zip)
- 软件：SPI Nand系统镜像：`d211_d213_devkitf_page_2k_block_128k_v1.0.0.img`

### 连接开发板

参考下图所示

![image-20240201105559581](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201105559581.png)

将两个TypeC线分别连至DongshanPI-D1s开发板 `OTG烧录接口 `和` USB串口接口` Typec线另一端 连接至 电脑USB接口，连接成功后，将电源连接至电源接口并将电源开关拨向电源接口端。

可以先获取软件 `匠芯创 单机调试刷机工具AIbrun` `SPI Nand系统镜像` 进行解压缩操作，并安装烧录软件Aibrun。



## 运行AiBrun软件进行烧录

AiBrun的使用非常简单，选择编译好的镜像，在开发板进入烧写模式后点击“开始”按钮即可自动进行烧写，进入烧写模式有如下几种方式：

- 终端设备为空片，则上电直接进入 USB 烧写模式
- 按住“烧录键”启动（上电或者按“重启键”）可直接进入烧录模式
- 终端设备非空片，如果能进入 U-Boot ，则 在U-Boot 中可以使用 aicupg usb 0 命令进入烧写模式
- 终端设备非空片，如果能进入 Linux，则执行命令 aicupg ，系统直接重启进入烧写模式

![image-20240201112034116](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201112034116.png)

### 使用烧录按键进行烧录

 上电前按住系统烧录(uboot)键，启动后即可进入烧录模式。系统烧录键如下图所示：

![image-20240201112819008](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201112819008.png)

进入烧录模式后，可以看到AIBurn软件中可以识别到设备型号，选择D213对应的镜像路径，并点击**开始**后会自动开始烧录。

![image-20240201113259860](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201113259860.png)

烧入完成会AiBurn软件中提示烧录成功，如下所示：

![image-20240201113549945](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201113549945.png)

### 进入Uboot进行烧录

​	开发板上电启动后，进入串口终端，确保串口可以输入数据后。按下开发板的reset键后，在终端输入界面按下`Crtl+C`键，进入Uboot命令行，如下所示：

![image-20240201114418462](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201114418462.png)

​	在Uboot命令行中输入`aicupg usb 0` 命令进入烧写模式。进入烧录模式后可以在AiBurn中看到识别到的设备。

![image-20240201114538095](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201114538095.png)

选择D213对应的镜像路径，并点击**开始**后会自动开始烧录。

![image-20240201113259860](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201113259860.png)

### 进入Linux进行烧录

​	开发板上电启动后，进入串口终端，确保串口可以输入数据后。等待系统系统完成进入Linux命令行，系统启动完成后再命令行中输入 `aicupg` ，系统直接重启进入烧写模式,进入烧录模式后可以在AiBurn中看到识别到的设备。

![image-20240201115533345](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201115533345.png)

选择D213对应的镜像路径，并点击**开始**后会自动开始烧录。

![image-20240201113259860](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201113259860.png)

## 启动系统

使用AiBurn烧录软件烧录完成后，开发板会自动重启进入系统，如下所示：

```
Pre-Boot Program ... (2023-11-09 20:38:24 248b01c)
DDR3 128MB
Going to init DDR3. freq: 672MHz
DDR3 initialized
41135 56727 81487
PBP done

U-Boot SPL 2021.10 (Jan 27 2024 - 23:44:32 -0500)
[SPL]: Boot device = 5(BD_SPINAND)
Trying to boot from SPINAND
Jumping to Linux via RISC-V OpenSBI
[    1.338775] Timeout during wait phy stop state c
[    2.646618] debugfs: Directory 'aic-codec-dev' with parent 'aic-SoundCard' already present!
Startup time: 4.266 sec (from Power-On-Reset)
Starting test_lvgl: OK
Starting syslogd: OK
Starting klogd: OK
Starting mdev... OK
[    5.653678] edt_ft5x06 3-0038: touchscreen probe failed
Starting system message bus: dbus-daemon: dbus-daemon: no version information available (required by dbus-daemon)
dbus-daemon: dbus-daemon: no version information available (required by dbus-daemon)
dbus-daemon: dbus-daemon: no version information available (required by dbus-daemon)
dbus-daemon: dbus-daemon: no version information available (required by dbus-daemon)
dbus-daemon: relocation error: dbus-daemon: symbol  version  not defined in file  with link time reference
done
ALSA: Restoring mixer setting...
Starting adbd: mkdir: can't create directory '/dev/pts': File exists
lo        Link encap:Local Loopback
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)

install_listener('tcp:5037','*smartsocket*')
OK
Welcome to ArtInChip Luban Linux
[aic@] #
```

