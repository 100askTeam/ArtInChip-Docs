---
sidebar_position: 7
---
# 2.5. 系统镜像

简述构建一个系统镜像的几个重要配置。

## 2.5.1. 定制软件包

烧录到目标板的系统镜像，包含一些必要和可能需要的软件。不同的项目可能有不同的需求， 因此在编译之前，需要通过 menuconfig 勾选该项目需要的软件包。

勾选时，主要关注：

- ArtInChip 自己开发的软件包
- Third Party 开源的软件包

勾选表示需要编译到该项目的镜像中。

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/artinchip-package.png](https://photos.100ask.net/artinchip-docs/d213-devkit/artinchip-package-17066835619931.png)

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/third-party-package.png](https://photos.100ask.net/artinchip-docs/d213-devkit/third-party-package-17066835689503.png)

## 2.5.2. RootFS 镜像

不同项目，所需要使用的文件系统不同，在创建该项目是基本上已经决定，不需要修改。

在实际应用过程中，可能有需要往 RootFS 中添加一些额外的程序和数据。比如想将一些 外部编译的测试程序打包到 RootFS 中，可以使用 RootFS Overlay 的配置。

在 `[System Configuration]/[Root filesystem overlay directories]` 中可配置需要 合并的目录

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/rootfs_overlay.png](https://photos.100ask.net/artinchip-docs/d213-devkit/rootfs_overlay-17066835785385.png)

例如这里 `rootfs_overlay_folder` 为 Luban/rootfs_overlay_folder，生成 RootFS 镜像时，该目录的内容会被合并到 RootFS 中。

## 2.5.3. UserFS 镜像

系统镜像除了有 RootFS 之外，还会有其他分区的文件系统镜像，为了方便大家制作其他 分区的文件系统镜像，这里增加了配置，可以最多生成三个文件系统镜像文件。

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/userfs-1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/userfs-1-17066835881807.png)

配置名字，文件系统类型，参数信息，以及需要合并的文件目录。

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/userfs-2.png](https://photos.100ask.net/artinchip-docs/d213-devkit/userfs-2-17066835966689.png)

注解

这些文件系统镜像中的内容，也可以在编译的时候生成并安装到指定文件系统中。