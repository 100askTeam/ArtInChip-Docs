---
sidebar_position: 1
---
# 启动开发板

## 硬件要求

当您购买了一套全新的匠芯创D123 Linux开发套件，包装盒内会有：

1.D213-DevKit开发板

2.Type-C数据线 x2

3.12V电源适配器

> 注意：使用时还需要一台正常工作且能连接互联网的PC电脑。



## 开发板上电

​	将配套的TypeC线一段连接至开发板的串口/供电接口，另一端连接至电脑USB接口。 默认情况下系统会自动安装串口设备驱动，如果没有自动安装，可以使用驱动精灵来自动安装。

- 对于Windows系统 此时Windows设备管理器 在 端口(COM和LPT) 处会多出一个串口设备，一般是以 `USB-Enhanced-SERIAL CH9102`开头，您需要留意一下后面的具体COM编号，用于后续连接使用。

![QuickStart-01](https://photos.100ask.net/artinchip-docs/d213-devkit/QuickStart-01.png)

将12V电源适配器接至开发板12V-DC接口，连接后将接口旁边的开关拨向电源接口端。如下所示：

![image-20240201103650798](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201103650798.png)

## 使用串口登录系统

### 1 连接串口线

将配套的TypeC线一段连接至开发板的串口/供电接口，另一端连接至电脑USB接口，连接成功后板载的红色电源灯会亮起。 默认情况下系统会自动安装串口设备驱动，如果没有自动安装，可以使用驱动精灵来自动安装。

- 对于Windows系统 此时Windows设备管理器 在 端口(COM和LPT) 处会多出一个串口设备，一般是以 `USB-Enhanced-SERIAL CH9102`开头，您需要留意一下后面的具体COM编号，用于后续连接使用。

![QuickStart-01](https://photos.100ask.net/artinchip-docs/d213-devkit/QuickStart-01-1706698656853-4.png)

如上图，COM号是96，我们接下来连接所使用的串口号就是96。

- 对于Linux系统 可以查看是否多出一个/dev/tty 设备,一般情况设备节点为 /dev/ttyACM0 。

![QuickStart-02](https://photos.100ask.net/artinchip-docs/d213-devkit/QuickStart-02.png)

### 2. 打开串口控制台

#### 2.1 获取串口工具

使用Putty或者MobaXterm等串口工具来开发板设备。

- 其中putty工具可以访问页面 https://www.chiark.greenend.org.uk/~sgtatham/putty/ 来获取。
- MobaXterm可以通过访问页面 https://mobaxterm.mobatek.net/ 获取 (推荐使用)。

#### 2.2 使用putty登录串口

![QuickStart-04](https://photos.100ask.net/artinchip-docs/d213-devkit/QuickStart-04.png)

#### 2.3 使用Mobaxterm登录串口

打开MobaXterm，点击左上角的“Session”，在弹出的界面选中“Serial”，如下图所示选择端口号（前面设备管理器显示的端口号COM21）、波特率（Speed 115200）、流控（Flow Control: none）,最后点击“OK”即可。步骤如下图所示。 **注意：流控（Flow Control）一定要选择none，否则你将无法在MobaXterm中向串口输入数据**

![Mobaxterm_serial_set_001](https://photos.100ask.net/artinchip-docs/d213-devkit/Mobaxterm_serial_set_001-1706698660802-13.png)

### 3. 进入系统shell

使用串口工具成功打开串口后，可以直接按下 Enter 键 进入shell，当然您也可以按下板子上的 `Reset`复位键，来查看完整的系统信息。

```

Pre-Boot Program ... (2023-11-09 20:38:24 248b01c)
DDR3 128MB
Going to init DDR3. freq: 672MHz
DDR3 initialized
41135 56731 81490
PBP done

U-Boot SPL 2021.10 (Jan 27 2024 - 23:44:32 -0500)
[SPL]: Boot device = 5(BD_SPINAND)
Trying to boot from SPINAND
Jumping to Linux via RISC-V OpenSBI
[    1.340636] Timeout during wait phy stop state c
[    2.646468] debugfs: Directory 'aic-codec-dev' with parent 'aic-SoundCard' already present!
Startup time: 4.273 sec (from Power-On-Reset)
Starting test_lvgl: OK
Starting syslogd: OK
Starting klogd: OK
Starting mdev... OK
[    5.639412] edt_ft5x06 3-0038: touchscreen probe failed
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

## windows下使用 ADB登录系统

### 1.连接OTG线

将开发板配套的两根typec线，一根 直接连接至 开发板 `OTG烧录接口` 另一头连接至电脑的USB接口，开发板默认有系统，接通otg电源线就会通电并直接启动。

![image-20240201103745036](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201103745036.png)

### 2. 安装windows板ADB

点击链接下载Windows版ADB工具 [adb-tools](https://gitlab.com/dongshanpi/tools/-/raw/main/ADB.7z) 下载完成后解压，可以看到如下目录，

![adb-tools-dir](https://photos.100ask.net/dongshanpi-docs/d1s/adb-tools-dir.png)

然后 我们单独 拷贝 上一层的 **platform-tools** 文件夹到任意 目录，拷贝完成后，记住这个 目录位置，我们接下来要把这个 路径添加至 Windows系统环境变量里。

![adb-tools-dir](https://photos.100ask.net/artinchip-docs/d213-devkit/adb-tools-dir-001.png)

我这里是把它单独拷贝到了 D盘，我的目录是 `D:\platform-tools` 接下来 我需要把它单独添加到Windows系统环境变量里面才可以在任意位置使用adb命令。

![adb-tools-windows_config_001](https://photos.100ask.net/artinchip-docs/d213-devkit/adb-tools-windows_config_001.png)

添加到 Windows系统环境变量里面 ![adb-tools-windows_config_001](https://photos.100ask.net/dongshanpi-docs/d1s/adb-tools-windows_config_002.png)

### 3.打开cmd连接开发板

打开CMD Windows 命令提示符方式有两种 方式1：直接在Windows10/11搜索对话框中输入 cmd 在弹出的软件中点击 `命令提示符` 方式2：同时按下 wind + r 键，输入 cmd 命令，按下确认 就可以自动打开 `命令提示符`

![adb-tools-windows_config_003](https://photos.100ask.net/artinchip-docs/d213-devkit/adb-tools-windows_config_003.png)

打开命令提示符，输出 adb命令可以直接看到我们的adb已经配置成功

![adb-tools-windows_config_004](https://photos.100ask.net/artinchip-docs/d213-devkit/adb-tools-windows_config_004.png)

连接好开发板的 OTG 并将其连接至电脑上，然后 输入 adb shell就可以自动登录系统

```shell
C:\System> adb shell
~ #
```

> 输入exit，即可退出adb shell终端



ADB 也可以作为文件传输使用，例如：

```shell
C:\System> adb push badapple.mp4 /mnt/UDISK   # 将 badapple.mp4 上传到开发板 /mnt/UDISK 目录内
```



```shell
C:\System> adb pull /mnt/UDISK/badapple.mp4   # 将 /mnt/UDISK/badapple.mp4 下拉到当前目录内
```



**注意： 此方法目前只适用于 使用匠芯创Luban-SDK 构建出来的系统。**

