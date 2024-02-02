---
sidebar_position: 6
---
# 2.4. 预编译包

## 2.4.1. 是什么

预编译二进制包机制是 Luban 编译框架为了加快 SDK 编译速度所做的改进。

SDK 的每一个组件包（比如 `Busybox` ）从源码编译时，会经历 `extract`, `patch`, `configure`, `build`, `install` 的流程。SDK 编译时，如果所有组件包都使用源码编译的方式， 会耗费较长的编译构建时间，特别是当选用的组件较多时。

预编译二进制压缩包，是将上述流程中 `install` 步骤需要安装出去的文件进行提取、 处理以及打包，生成的压缩包文件保存起来，下次再次编译 SDK 时，可以直接解压使用 里面的二进制文件进行安装，从而跳过该组件包的源码编译过程，加快 RootFS 的构建速度。

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/prebuilt_example_busybox.png](https://photos.100ask.net/artinchip-docs/d213-devkit/prebuilt_example_busybox-17066834612231.png)

图 2.46 *Busybox 编译示例*[¶](#id6)

SDK Release 时，根据项目配置为每一个组件包生成对应的预编译二进制包。

小技巧

开发者也可以通过 `make <pkg>-prebuilt` 自行生成预编译二进制包。

在默认配置下，除了下面的源码包没有使用预编译二进制包，其他都是默认使用预编译二进制包进行系统构建，以节省编译时间。

> - source/opensbi
> - source/uboot
> - source/linux
> - source/artinchip

其中 U-Boot 与 Linux 这两个包与板子相关性太强，不同的配置生成的二进制文件可能都不一样，因此每次都是从源码进行编译; 其他包可根据实际情况，配置选择使用预编译二进制包。

## 2.4.2. 如何配置

如 [Busybox 编译示例](#ref-to-lb-prebuilt-example) 所示，一个组件包可以选中从源码进行编译，也可以选择使用预编译二进制包。 可以通过配置界面进行选择。

在 Luban SDK 顶层目录执行命令：

```
make menuconfig
```

### 2.4.2.1. 使用源码编译

以 `Busybox` 为例，要选择从源码编译，只需将保证下列选项没有被勾选即可。

```
[ ]   Use prebuilt binary instead of building from source
```

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/prebuilt-2.png](https://photos.100ask.net/artinchip-docs/d213-devkit/prebuilt-2-17066834754923.png)

保存、退出，在 Luban SDK 顶层目录执行编译命令:

```
make busybox  or make all
```

可看到 Busybox 组件包从源码进行解压缩和编译。

### 2.4.2.2. 使用预编译包

与上面的配置刚好相反。

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/prebuilt-1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/prebuilt-1-17066834838735.png)

保存、退出，在 Luban SDK 顶层目录执行编译命令:

```
make busybox  or make all
```

可看到 Busybox 组件包从预编译二进制包解压缩和安装。

注解

如果选择了使用预编译二进制包，但是预编译二进制包不存在怎么办？

Luban SDK 在编译时会自动进行检查，如果该组件包对应的预编译二进制包文件不存在，则自动转为源码编译。 如果源码包也不存在，则编译报错。