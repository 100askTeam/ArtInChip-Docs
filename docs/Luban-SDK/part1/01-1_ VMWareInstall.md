---
sidebar_position: 1
---
# 1.1. VMWare 安装

如果你希望在虚拟机上进行 Luban 的开发工作，可以参考本文。

## 1.1.1. 概述

虚拟机（Virtual Machine）指通过软件模拟的具有完整硬件系统功能的、运行在一个完全隔离环境中的完整计算机系统，是 Windows 系统上运行 Linux 软件的一种通用的解决方案。

常用的 Windows 上的虚拟机有：VWMWare，VirtualBox 等，本文以 VMWare 为例讲解如何在 Windows 系统上搭建 Luban 编译环境，虚拟机需要额外的系统资源资源进行软件模拟工作， 因此在虚拟机上进行Luban 系统的开发和编译工作将需要更久的时间，也会偶尔造成系统使用的卡顿。

VMWare 为收费软件，本文以试用版本（VMware® Workstation 16 Pro）为例讲解。

## 1.1.2. 创建虚拟机

### 1.1.2.1. 自定义安装

在新建虚拟机的向导页选择自定义安装，因为VMWare 需要进行很多和平台相关联的定制性工作。

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/vmware-12.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/vmware-12-17066823612901.jpg)

### 1.1.2.2. 手动安装操作系统

在操作系统安装界面选择“稍后安装操作系统”，因为VMWare 在自动安装操作系统的时候会顺带安装自带的 VMware tools， 但该 tools 以 iso 方式存在，需要虚拟光驱方式挂载出来才能安装， 该挂载任务只能在系统启动后手动执行，所以自动安装往往会卡在 VMWare tools 的安装处而导致无法安装成功。

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/vmware-22.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/vmware-22-17066825302563.jpg)

### 1.1.2.3. 虚拟机文件存储

虚拟机文件将占用超过20G的磁盘空间，并且随着新软件的安装占用空间将继续增大，所以文件的存储需要预留足够的的空间。

虚拟机文件将被拆分为很多个 2G 的小文件存储，为了管理方便，建议创建一单独的目录存储这些文件。

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/vmware-32.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/vmware-32-17066825396015.jpg)

### 1.1.2.4. 资源设置

在软件的安装过程种，需要设置一下可能会影响虚拟机使用体验的参数，建议的参数如下图：

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/vmware-42.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/vmware-42-17066825467737.jpg)

## 1.1.3. 安装 Ubuntu

本章节介绍在上述虚拟机上安装 Ubuntu20.04 的方法，其他版本的 Ubuntu 可能会有不一样的问题，可以自行百度解决.

### 1.1.3.1. 全新安装

#### 1.1.3.1.1. 设置 Ubuntu 文件路径

- 打开的VMWare
- 选择“我的计算机”中的 Luban 虚拟机
- 在“设备”中点击 “CD/DVD”
- 选中使用 ISO 映像文件
- 通过“浏览”选中 “Ubuntu-20.04.3-desktop-amd64.iso”

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/vmware-52.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/vmware-52-17066825592149.jpg)

#### 1.1.3.1.2. 启动 Ubuntu 安装

上述设置完成后，相当于光驱中已经放置了 Ubuntu-20.04 的光盘，并设置了开机光驱引导，因此开启此虚拟机，则会自动启动 Ubuntu 的安装，Ubuntu 的安装 没有特殊步骤，对于一些设置项目的选择的问题可以直接通过百度查找解决方案。

安装完毕后取消“使用 ISO 映像文件”，选择“使用物理驱动器”，然后重新启动虚拟机，则切换到硬盘启动加载刚刚安装好的 Ubuntu 系统。

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/vmware-62.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/vmware-62-170668256789711.jpg)

### 1.1.3.2. 加载虚拟机

如果有获取 ArtInChip 发布的可直接工作的虚拟机镜像，则直接打开即可，步骤为 文件->打开->luban-ubuntu 20.04.vmx

通过导入虚拟机镜像的方式加载虚拟机后，要重新配置一下使用到的资源，如 CPU，Memory，磁盘等。

## 1.1.4. 配置虚拟机

Ubuntu 系统安装完成后，还需要一些配置性的工作，以使其使用更方便。

### 1.1.4.1. VMWare Tools

VMWare Tools 是 VMWare 提供的一个工具包，除了一些自带的工具外还可以设置共享，窗口大小等，所以必须要安装。

- 在 VMWare 的“虚拟机”菜单中点击“安装 vmware tools”
- Ubuntu 系统中，打开“文件浏览器”工具，会发现挂载的 “VMWare Tools” 光驱
- 打开 “VMWare Tools”，复制 VMwareTools-xxx.gz 文件到系统某一目录
- 解压 VMwareTools-xxx.gz，运行安装脚本： “sudo perl vmware-install.pl”
- 根据提示和安装脚本进行交互，确认相关设置OK，如果遇到错误，再次执行即可，兼容性错误 VMWare 一直修复，所以也就一直存在
- 最后 VMWareTools 输出 “enjoy the vmware team”， 说明安装成功
- 在 VMWare 的“查看”菜单中选择“自动调整大小”，“自动适应客户机”
- 重启 Ubuntu 后，屏幕大小可调，则说明 VMWareTools 安装成功

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/vmware-72.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/vmware-72-170668258750913.jpg)

### 1.1.4.2. 文件共享

虚拟机中的文件和 Windows 中的文件共享是我们使用虚拟机进行开发的基础，是两个环境之间的文件进行交换的最简便的方式。

#### 1.1.4.2.1. VMWare 端配置

- 在 VMWare 的“虚拟机”打开“设置”项
- 在“选项”页中选择“共享文件夹”
- 修改为“总是启用”
- 选择 Windows 上要用于共享的文件夹，并命名

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/vmware-82.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/vmware-82-170668259726815.jpg)

#### 1.1.4.2.2. Ubuntu 端配置

如果 VMWare Tools 的安装中的正确打开了文件共享，则在 “/mnt/hgfs/” 将挂载出共享的目录。

## 1.1.5. 结束语

上述安装配置完成后，打开的系统就是一个拥有了完整功能的 Ubuntu20.04 系统，可以参考“[环境搭建](ubuntu2004.html#ref-luban-env-ubuntu)” 准备 Luban 的编译工作

