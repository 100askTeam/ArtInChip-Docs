---
sidebar_position: 1
---

# 编译构建系统

## Luban SDK简介

Luban 是基于 Buildroot 深度定制的多场景操作系统，具备稳定、安全、开放、敏捷的特点。在标准、高效的构建基础上， 通过开放多样化的用户接口和丰富的第三方中间件应用，满足多种应用场景的开发。

- 一步轻松搭建，10分钟快速编译
- 超多订制命令，大量工作 OneStep 化
- Linux-5.10，uboot-2021.10
- QT 4.8.7 + GE
- LVGL 8.3 + GE
- GStreamer 1.20.3 + VE

![../_images/sdk_software_stack.png](https://photos.100ask.net/artinchip-docs/d213-devkit/sdk_software_stack.png)

## 下载 Luban SDK

Luban SDK 的代码托管于 Gitee 服务器中，为开源代码，可以直接从下面的仓库地址中,在Ubuntu18.04的虚拟机终端命令行下，输入：

```
git clone https://gitee.com/artinchip/d211.git
```

获取完成后会在当前目录下，看到对应的SDK文件，文件夹名为`d211`。

```
ubuntu@ubuntu:~$ ls
d211
```

### 1.编译环境准备

Luban SDK 的开发环境中，还需要安装一些依赖包，并对几个关键工具有版本要求：

- GCC 版本 >= 6.4
- GLIBCXX 版本 >= 3.4.22（在libstd++.so.6库文件中查看该版本号）
- Python3 版本 >= 3.5

决定 Ubuntu 系统是否能自动完成一键安装的关键条件： **是否有可以访问的软件源。**

- 有软件源，无论是外网的源、还是内网搭建的源，就可以完成一键安装。
- 没有软件源，就需要手动逐个的下载安装包、执行安装。

### 2.一键安装依赖

Luban SDK 提供了一键安装脚本 `oneclick.sh`，方便用户 **最快1分钟搭建好开发环境**。

有可用软件源的网络环境中，Ubuntu 系统是用 apt-get 工具完成软件安装，“一键安装” 脚本也需要用到此 apt-get 工具。

在命令行中执行一键安装脚本的方法：

```
sudo d211/tools/scripts/oneclick.sh quiet
```

`oneclick.sh` 会自动检查当前系统的版本、环境，在软件源可以正常访问的情况下，逐个安装 Luban 需要的软件工具，安装成功后会有提示信息：

```
...
fdt        0.3.2
                                                                [OK]

>>> Congratulations! All the package is ready.
>>> Enjoy the LubanOS!
```



## 下载D213-Devkitf板级补丁包

D213-Devkitf开发板的板级补丁包托管于 Gitee 服务器中，为开源代码，可以直接从下面的仓库地址中,在Ubuntu18.04的虚拟机终端命令行下，输入：

```
git clone https://gitee.com/weidongshan/d213-devkitf-luban.git
```

获取完成后会在当前目录下，看到对应的SDK文件，文件夹名为`d213-devkitf-luban`。

```
ubuntu@ubuntu:~$ git clone https://gitee.com/weidongshan/d213-devkitf-luban.git
Cloning into 'd213-devkitf-luban'...
remote: Enumerating objects: 71, done.
remote: Counting objects: 100% (20/20), done.
remote: Compressing objects: 100% (14/14), done.
remote: Total 71 (delta 0), reused 0 (delta 0), pack-reused 51
Unpacking objects: 100% (71/71), done.
ubuntu@ubuntu:~$ ls
d211	d213-devkitf-luban
```

将D213-Devkitf开发板的板级补丁包中的所有文件拷贝到官方SDK包中，输入以下命令：

```
cp -rf d213-devkitf-luban/* d211/
```



## Luban SDK编译

1.编译环境准备好后，即可进行系统编译。进入Luban SDK目录中：

```
cd d211/
```

2.激活开发环境：

```
source tools/onestep.sh
```

3.选择D213-Devkitf开发板方案：

```
lunch d211_d213_devkitf_defconfig
```

4.编译

```
make
```

等待编译完成即可。编译完成后，终端会输出以下提示：

```
	Packing file data:
		usbupg-ddr-init.aic
		env.bin
		u-boot.itb
		logo.itb
		u-boot-spl-dtb.aic
		u-boot-spl-dtb.aic
		u-boot.itb
		env.bin
		logo.itb
		kernel.itb
		recovery.itb
		rootfs_page_4k_block_256k.ubifs
	Image file is generated: /home/ubuntu/d211/output/d211_d213_devkitf/images/d211_d213_devkitf_page_4k_block_256k_v1.0.0.img



Luban is built successfully!
```

编译后的镜像存放在`d211/output/d211_d213_devkitf/images/`目录下。

> 注意：我们只能将该目录下的`d211_d213_devkitf_page_2k_block_128k_v1.0.0.img`镜像文件进行烧录，不能使用4k版本的镜像！！！



## 烧写最小系统镜像

编译完成后会在`d211/output/d211_d213_devkitf/images/`目录下生成 `d211_d213_devkitf_page_2k_block_128k_v1.0.0.img`文件，将文件拷贝到Windows系统下使用 使用 匠芯创官方的 AiBurn 进行烧写。 详细烧写步骤请，请参考左侧 **快速启动** 页面。