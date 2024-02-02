---
sidebar_position: 5
---
#  QT 应用开发

## 1. QtLauncher

QtLauncher 是 ArtInChip 基于 QT4.8.7 开发的一款应用程序，也是 QT 应用开发的一个典型示例，可以直接在Luban系统上运行

### 1.1. 编译

- 在SDK 根目录执行 make menuconfig打开 Luban 配置界面
- 选择ArtInChip packages->Launchers->qtlauncher

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/qtlauncher_menuconfig.png](https://photos.100ask.net/artinchip-docs/d213-devkit/qtlauncher_menuconfig-17068607219901.png)

注解

- 因为要开机运行，所以不能有其他的开机运行界面存在，如 test-lvgl
- 打开 qtlauncher 后默认会自动选择qt4.8.7等依赖
- 最好 make clean；make； 全编译一次SDK

### 1.2. 分区调整

因为 QT 库比较大，开发板原始为了演示更多功能，分区设置的比较保守，因此打开 QT 支持后一般需要调整一下分区大小，否则会报告如下错误：

Error: max_leb_cnt too low (266 needed)

目前SDK中分区调整有两块工作：

#### 1.2.1. 分区大小调整

以 demo100_nand 为例，通过修改 target/d211/demo100_nand/image_cfg.json 调整

```
--- a/d211/demo100_nand/image_cfg.json
+++ b/d211/demo100_nand/image_cfg.json
@@ -13,7 +13,7 @@
                        "kernel":   { "size": "12m" },
                        "recovery": { "size": "10m" },
                        "ubiroot":  {
-                               "size": "32m",
+                               "size": "64m", //由32m增加到64m
                                "ubi": { // Volume in UBI device
                                        "rootfs": { "size": "-" },
                                },
@@ -21,7 +21,6 @@
                        "ubisystem": {
                                "size": "-",
                                "ubi": { // Volume in UBI device
-                                       "ota":   { "size": "48m" }, //删除ota分区，因为总大小只有128m
                                        "user":   { "size": "-" },
                                },
                        },
```

#### 1.2.2. 镜像大小调整

通过 make menuconfig 调整，在 Filesystem images->RootFS images 中修改，ubifs size 调整为0x4000000（64m）

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ubifs_size.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ubifs_size-17068607307353.png)

修改后target/configs/d211_demo100_nand_defconfig 中有体现

```
--- a/configs/d211_demo100_nand_defconfig
+++ b/configs/d211_demo100_nand_defconfig
-BR2_TARGET_ROOTFS_UBIFS_MAX_SIZE=0x2000000
+BR2_TARGET_ROOTFS_UBIFS_MAX_SIZE=0x4000000
```

上述两项修改后，重新编译系统，刷机后应该有 qtlauncher 运行界面

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/qtlauncher.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/qtlauncher-17068607393105.jpg)

### 1.3. 自动运行

Luban 的开机自动运行使用的是 init.d 机制，qtlauncher 的自动运行是通过 package/artinchip/qtlauncher/S99qtlauncher 实现的， 编译时 S99qtlauncher 会被复制到目标机的 /etc/init.d/ 下

### 1.4. G2D

QT 中集成了 G2D 的演示示例，代码在 source/artinchip/qtlauncher/views/aicdashboardview.cpp 中， G2D 示例中主要用到了 png 解码和 blit，rotate 等功能。

为了在 Windows 上也可以编译和调试该 qtlauncher 程序，代码中对 G2D 的代码进行了宏屏蔽。

## 2. 应用开发

以 QTLauncher 为例，讲解一下 Luban 的 QT 应用开发方式

### 2.1. QtCreator

推荐使用 QtCreator 在 Windows 上开发，可以单步调试和模拟。使用 QtCreator 打开 source/artinchip/qtlauncher/QtLauncher.pro 文件即可编译、调试和运行 qtlauncher 应用。

QtCreator 的搭建参考 [QT Windows IDE](qt-ide.html#ref-qt-windows-ide)

### 2.2. Project 文件

QtCreator 会创建一个 Project 文件来组织代码编译和最终应用程序的生成，Luban 也要依赖该 Project 文件进行交叉编译。

QtLauncher 的源码和 Project（QtLauncher.pro） 均在 source/artinchip/qtlauncher 目录下

### 2.3. 编译文件

编译文件是 Luban 用来描述代码如何编译，文件如何安装，宏定义如何使用的机制，在 package/artinchip/qtlauncher 目录下，qtlauncher 中总共有三个文件

#### 2.3.1. Config.in

配置是否打开该模块，配置其他宏定义等，宏的定义方式为 BR2_PACKAGE_PACKAGENAME 大写

该 Config.in 文件被上一级 Config.in 文件引用

```
menuconfig BR2_PACKAGE_QTLAUNCHER
    bool "qtlauncher"
    default n
    select BR2_PACKAGE_QT
    select BR2_PACKAGE_DIRECTFB
    help
    ArtInChip's Launcher App Developed with QT.

if BR2_PACKAGE_QTLAUNCHER
config BR2_QTLAUNCHER_GE_SUPPORT
    bool "use GE to render image"
    default y
config BR2_QTLAUNCHER_SMALL_MEMORY
    bool "small memory device"
    default y
endif
```

#### 2.3.2. qtlauncher.mk

mk 文件，用于描述如何使用source/artinchip/qtlauncher 下的源码

```
QTLAUNCHER_ENABLE_TARBALL = NO   //源码方式
QTLAUNCHER_ENABLE_PATCH = NO     //是否有patch

QTLAUNCHER_DEPENDENCIES += qt directfb  //需要qt 和 directfb的支持

QTLAUNCHER_CONF_OPTS = $(QTLAUNCHER_SRCDIR)/QtLauncher.pro //project 文件的名字

ifeq ($(BR2_QTLAUNCHER_GE_SUPPORT),y)
export QTLAUNCHER_GE_SUPPORT = YES  //Luban 的宏转为 QT的宏
endif
ifeq ($(BR2_QTLAUNCHER_SMALL_MEMORY),y)
export QTLAUNCHER_SMALL_MEMORY = YES
endif

define QTLAUNCHER_INSTALL_TARGET_CMDS、、
    mkdir -p $(TARGET_DIR)/usr/local/launcher/
    cp -a $(@D)/qtlauncher $(TARGET_DIR)/usr/local/launcher/  //安装编译后的文件

    $(INSTALL) -m 0755 -D package/artinchip/qtlauncher/S99qtlauncher \
        $(TARGET_DIR)/etc/init.d/S99qtlaunche  //安装自动启动脚本
endef

$(eval $(qmake-package)) //使用qmake编译源码
```

#### 2.3.3. S99qtlauncher

qtlauncher 应用的自启动脚本，S99 为启动顺序，属于比较低的等级，S00 为最高等级

