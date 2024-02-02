---
sidebar_position: 4
---
#  QT Windows IDE

## 1. QT 可以做什么

- 漂亮的UI
- 多线程，数据库，图像处理，音频视频处理，网络通讯，文件操作
- 1997年， 开发了KDE，Linux 下开发C++ GUI 的事实标准
- WPS, YY 语音，Skype， VirtualBox，Opera，Google地图

## 2. QML

- QML 是一种描述性脚本语言
- QT + QML 是为了适应手机移动应用开发
- QT5 开始支持，如果UI 是QT4.X的，则不能使用

## 3. QT Creator

是跨平台的QT IDE 工具，是QT被Nokia收购后推出的一款新的轻量级集成开发环境。

## 4. Windows环境搭建

在Windows 上搭建QT开发环境，需要三个软件的安装支持

- mingw-4.8.2
- qt-4.8.7
- qt-creator-4.2.0

QT库的安装需要设置MinGW 路径，而qtcreator 需要配置MinGW 和QT 来进行编译

Windows 上有32位和64的区别，其中QT-4.8.7只支持32位的，因此mingw 和 qt-creator 也必须是32位的

文件命名上，x86_64的为64位，仅x86的一般为32位

### 4.1. mingw-4.8.2

- 文件：i686-4.8.2-release-posix-dwarf-rt_v3-rev3
- 链接： [http://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win32/Personal%20Builds/mingw-builds/4.8.2/threads-posix/dwarf/i686-4.8.2-release-posix-dwarf-rt_v3-rev3.7z/download](http://sourceforge.net/projects/mingw-w64/files/Toolchains targetting Win32/Personal Builds/mingw-builds/4.8.2/threads-posix/dwarf/i686-4.8.2-release-posix-dwarf-rt_v3-rev3.7z/download)

mingw的安装比较简单，无特殊选项

### 4.2. QT4.8.7

- 文件： qt-opensource-windows-x86-mingw482-4.8.7.exe
- 链接：https://download.qt.io/archive/qt/4.8/4.8.7/

在QT 的安装过程中，会要求设置MinGW 的安装路径

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/qt-install.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/qt-install-17068605041701.jpg)

图 1.3 *设置MinGW 的路径*

### 4.3. qt-creator-4.2.0

qt-creator 的安装比较简单，复杂点在安装后的编译参数设置

- 文件：qt-creator-opensource-windows-x86-4.2.0.exe
- 链接：https://download.qt.io/archive/qtcreator/4.2/4.2.0/

#### 4.3.1. 主界面

安装完成后的主界面为：

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/qtc-main.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/qtc-main-17068605147803.jpg)

图 1.4 *QT-Creator 主界面*

#### 4.3.2. 构建和运行

初始的QtCreator 还没有配置，尚不能编译程序，通过菜单“工具”–>“选项”，在对话框左边选“构建和运行”进行构件和运行设置

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/qtc-build.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/qtc-build-17068605212785.jpg)

图 1.5 *构建和运行设置界面*

#### 4.3.3. Debuggers

- 点击Add，进入新的Debugger 设置界
- 设置Name 为GDB
- 通过浏览找到MinGW 的gdb.exe
- “Apply” 设置好调试器

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/qtc-debugger.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/qtc-debugger-17068605294587.jpg)

图 1.6 *Debuggers 设置界面*

#### 4.3.4. 编译器

- 编译器主要设置C,C++工具
- 点击右边“添加”，弹出菜单中选择MinGW，分别添加C、C+
- 名称均设为MinGW
- C++ 设置为MinGW 的g++.exe
- C 设置为MinGW 的gcc.exe

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/qtc-compile.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/qtc-compile-17068605376019.jpg)

图 1.7 *编译器设置界面*

#### 4.3.5. Qt Versions

- 配置QT 的qmake 工具
- 点击“添加”，浏览找到QT-4.8.7 下的qmake.exe

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/qtc-qt.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/qtc-qt-170686055353511.jpg)

图 1.8 *QT 版本设置界面*

#### 4.3.6. Kit

- 名称可以选一个有记录意义的名字
- 设备类型选择桌面
- 编译器C/C++分别选择上面设置的MinGW
- 调试器选择上面设置的GDB
- Qt 版本选择Qt 4.8.7
- Qt mkspec可以不用管，因为qmake.exe可以自动设置

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/qtc-kits.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/qtc-kits-170686056457413.jpg)

图 1.9 *构件套件设置界面*

## 5. qt-demo 运行

配置成功后，打开一demo工程，则Run 按钮可用，点击demo app 运行成功，则说明各项配置成功

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/qtc-demo.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/qtc-demo-170686057041015.jpg)

图 1.10 *编译运行界面*