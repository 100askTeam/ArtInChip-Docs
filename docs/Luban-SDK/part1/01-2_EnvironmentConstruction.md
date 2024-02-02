---
sidebar_position: 2
---
# 1.2. 环境搭建

Luban SDK 的开发需要在 Linux 系统中进行，所以首先需要有一台运行着 Linux 系统的计算机。

ArtInChip 推荐的 Linux 发行版为 Ubuntu 20.04 LTS（Long Term Support）版本，其他版本也可行，只是安装软件包的依赖和版本不同。

## 1.2.1. 关于 Ubuntu 系统

Ubuntu（乌班图）是一个以桌面应用为主的 Linux 操作系统，作为 Linux 发行版中的后起之秀，Ubuntu 在短短几年时间里便迅速成长为从 Linux 初学者到实验室用计算机/务器都适合使用的发行版。

Ubuntu 在中国有非常高的知名度，具有庞大的社区力量支持，和最新最全的开放源代码的自由软件支持，开发者可以方便地获得帮助。

## 1.2.2. 安装 Ubuntu 系统

Ubuntu 的安装教程在网上有很多可参考，以及相关常见问题也可以通过搜索查找解决方案。

- Ubuntu 官方网站： http://www.ubuntu.com
- 中文地址为： http://www.ubuntu.org.cn/index_kylin
- 桌面版下载地址： http://www.ubuntu.com/download/desktop

## 1.2.3. 下载 Luban

Luban SDK 的代码托管于 Gitee 服务器中，为开源代码，可以直接从下面的仓库地址中下载：

```
git clone https://gitee.com/artinchip/d211.git
```

## 1.2.4. 编译环境准备

Luban SDK 的开发环境中，还需要安装一些依赖包，并对几个关键工具有版本要求：

- GCC 版本 >= 6.4
- GLIBCXX 版本 >= 3.4.22（在libstd++.so.6库文件中查看该版本号）
- Python3 版本 >= 3.5

决定 Ubuntu 系统是否能自动完成一键安装的关键条件： **是否有可以访问的软件源。**

- 有软件源，无论是外网的源、还是内网搭建的源，就可以完成一键安装。
- 没有软件源，就需要手动逐个的下载安装包、执行安装。

### 1.2.4.1. 一键安装

Luban SDK 提供了一键安装脚本 `oneclick.sh`，方便用户 **最快1分钟搭建好开发环境**。

有可用软件源的网络环境中，Ubuntu 系统是用 apt-get 工具完成软件安装，“一键安装” 脚本也需要用到此 apt-get 工具。

在命令行中执行一键安装脚本的方法：

```
cd Luban_SDK_Root_Directory/
./tools/scripts/oneclick.sh quiet
```

`oneclick.sh` 会自动检查当前系统的版本、环境，在软件源可以正常访问的情况下，逐个安装 Luban 需要的软件工具，安装成功后会有提示信息：

```
...
fdt        0.3.2
                                                                [OK]

>>> Congratulations! All the package is ready.
>>> Enjoy the LubanOS!
```

小技巧

执行 `oneclick.sh` 时的“quiet”参数会隐藏所有需要用户确认的环节，如果去掉“quiet”参数，会在以下几个软件包的安装时提问是否继续：

- GCC
- Python3
- Python3-dev
- Python3-pip

`oneclick.sh` 目前已支持的系统有：

- Ubuntu 14.04、16.04、18.04、20.04、22.04
- CentOS 7.x、8.x

注解

Ubuntu 14.04、16.04 和 CentOS 7.x 自带的GCC 版本太低， `oneclick.sh` 会自动编译安装一份GCC 6.4

当然，用户如果需要也可以通过手动执行 apt-get 来逐个安装依赖，方法：

```
sudo apt-get update
sudo apt-get install build-essential python3 python3-pip
sudo pip install pycrypto
sudo pip install fdt
```

### 1.2.4.2. 手动安装

如果使用的 Ubuntu 系统上没有网络环境，则可以离线安装，可以使用 ArtInChip 提供的离线包进行安装，deb 离线包分三类：

- tools包
- python包
- vim 包

#### 1.2.4.2.1. deb 文件安装

```
1. cd tools
    sudo dpkg -i *.deb
2. cd python
    sudo dpkg -i *.deb
3. cd vim
    sudo dpkg -i vim-tiny_2%3a8.1.2269-1ubuntu5.7_amd64.deb
    sudo dpkg -i *.deb
```

#### 1.2.4.2.2. 依赖包获取下载

但是不同的系统的依赖可能会不一样，如果使用离线包安装依然有依赖缺失的话，可以采用如下方式解决

- 单独安装某一deb安装包，获取缺失的依赖
- 在另外一有网络环境的计算机上下载缺失的依赖包
- 复制所下载的依赖包到本服务器，安装依赖包

```
aic@aic-virtual-machine:~/work/test$ sudo dpkg -i libgcc-9-dev_9.3.0-17ubuntu1~20.04_amd64.deb
......
dpkg: dependency problems prevent configuration of libgcc-9-dev:amd64:
libgcc-9-dev:amd64 depends on libitm1 (>= 9.3.0-17ubuntu1~20.04); however:
    Package libitm1 is not installed.
libgcc-9-dev:amd64 depends on libatomic1 (>= 9.3.0-17ubuntu1~20.04); however:
    Package libatomic1 is not installed.
libgcc-9-dev:amd64 depends on libasan5 (>= 9.3.0-17ubuntu1~20.04); however:
    Package libasan5 is not installed.
libgcc-9-dev:amd64 depends on liblsan0 (>= 9.3.0-17ubuntu1~20.04); however:
    Package liblsan0 is not installed.
libgcc-9-dev:amd64 depends on libtsan0 (>= 9.3.0-17ubuntu1~20.04); however:
    Package libtsan0 is not installed.
libgcc-9-dev:amd64 depends on libubsan1 (>= 9.3.0-17ubuntu1~20.04); however:
    Package libubsan1 is not installed.
libgcc-9-dev:amd64 depends on libquadmath0 (>= 9.3.0-17ubuntu1~20.04); however:
    Package libquadmath0 is not installed.

dpkg: error processing package libgcc-9-dev:amd64 (--install):
dependency problems - leaving unconfigured
Errors were encountered while processing:
    libgcc-9-dev:amd64

aic@aic-virtual-machine:~/work/test$ apt-get download libitm1 libatomic1 libasan5 liblsan0 libtsan0 libubsan1 libquadmath0
    Get:1 http://cn.archive.ubuntu.com/ubuntu focal-updates/main amd64 libasan5 amd64 9.3.0-17ubuntu1~20.04 [394 kB]
    Get:2 http://cn.archive.ubuntu.com/ubuntu focal-updates/main amd64 libatomic1 amd64 10.3.0-1ubuntu1~20.04 [9,284 B]
    Get:3 http://cn.archive.ubuntu.com/ubuntu focal-updates/main amd64 libitm1 amd64 10.3.0-1ubuntu1~20.04 [26.2 kB]
    Get:4 http://cn.archive.ubuntu.com/ubuntu focal-updates/main amd64 liblsan0 amd64 10.3.0-1ubuntu1~20.04 [835 kB]
    Get:5 http://cn.archive.ubuntu.com/ubuntu focal-updates/main amd64 libquadmath0 amd64 10.3.0-1ubuntu1~20.04 [146 kB]
    Get:6 http://cn.archive.ubuntu.com/ubuntu focal-updates/main amd64 libtsan0 amd64 10.3.0-1ubuntu1~20.04 [2,009 kB]
    Get:7 http://cn.archive.ubuntu.com/ubuntu focal-updates/main amd64 libubsan1 amd64 10.3.0-1ubuntu1~20.04 [784 kB]
    Fetched 4,204 kB in 18s (231 kB/s)

aic@aic-virtual-machine:~/work/test$ cp *.deb /media/aic/SDCARD/
```

### 1.2.4.3. Python 相关安装

Python 目录中即包含Python 的deb 安装文件，和普通的deb文件安装类似，如果有依赖，则继续依赖下载的策略；Python 的工具有两种安装方式：

#### 1.2.4.3.1. 编译安装

可以下载源码进行安装，www.pypi.org 上有很多Python 工具，最通用的pip 等，可以通过源码build安装，以pip-22.0.3 为例：

```
cd pip-22.0.3/
python3 setup.py  build
sudo python3 setup.py  install
```

#### 1.2.4.3.2. 压缩包安装

Python 的打包格式有Wheel(.whl) 和Egg(.egg) 两种格式，目的是支持不需要编译的安装过程，它们实际上也是一种压缩文件。 Wheel 文件可以使用pip 直接安装。

```
sudo pip install pycryptodome-3.14.1-cp27-cp27mu-manylinux2010.whl
```

## 1.2.5. Luban 编译

编译环境准备好后，即可进行系统编译

### 1.2.5.1. 常规编译

```
make list                              --> 列出当前可用的项目配置
make d211_demo_defconfig            --> 应用具体的项目配置
make                                   --> 编译打包
```

### 1.2.5.2. 一步直达

```
source tools/onestep.sh                --> 一步直达命令
lunch d211_demo_defconfig           --> 选择 d211_per_spinand_defconfig
m                                      --> 编译打包
```

### 1.2.5.3. eMMC 固件

如果开发板使用的是 eMMC （eNand）编译后的固件名称为 d211_demo_v1.0.0.img

```
Image file is generated: /xxx/d211/luban/output/d211_demo/images/d211_demo_v1.0.0.img
```

### 1.2.5.4. SPI NAND 固件

如果开发板使用的是 SPI NAND，则编译后会生成固件的名称为: d211_xxx_page_2k_block_128k_v1.0.0.img

如果开发板的 SPI NAND 的 page size 为 4K 大小的（很少用到），需要在 target/d211/xxx/image_cfg.json 进行配置以编译出 d211_xxx_page_4k_block_256k_v1.0.0.img

```
"info": { // Header information about image
    "platform": "d211",
    "product": "demo128_nand",
    "version": "1.0.0",
    "media": {
        "type": "spi-nand",
        "device_id": 0,
        "array_organization": [
        //      { "page": "4k", "block": "256k" },
                { "page": "2k", "block": "128k" },
        ],
    }
},
```

