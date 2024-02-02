---
sidebar_position: 2
---

# Luban SDK重要命令

## 2.3.1. 编译命令

```
make <board>_defconfig
make all
```

## 2.3.2. 常用辅助命令

```
make list             (make l)          --> 列出当前可用的 <board>_defconfig
make menuconfig       (make m)          --> 对 SDK 进行配置
make uboot-menuconfig (make um)         --> 对 U-Boot 进行配置
make linux-menuconfig (make km)         --> 对 Linux 内核进行配置
make busybox-menuconfig                 --> 对 Busybox 进行配置
```

警告

make 命令不要使用 `-j` 参数。

Luban 在编译过程中，已经默认使用了 `-j0` 参数，即根据系统的 CPU 核心数量， 动态分配编译的线程。

如果外部再提供 `-j` 参数，会导致 SDK 编译过程中出现一些高层次的目标编译 不同步的错误。

## 2.3.3. 使用举例

### 2.3.3.1. make list

列出当前 SDK 所有可用的 defconfig

```
Built-in configs:
  d211_initramfs_defconfig         - Build for d211_initramfs
  d211_per1_mmc_defconfig          - Build for d211_per1_mmc
  d211_per2_spinand_defconfig      - Build for d211_per2_spinand
  d211_per2_spinor_defconfig       - Build for d211_per2_spinor
  d211_fpga_mmc_defconfig          - Build for d211_fpga_mmc
```

### 2.3.3.2. make d211_per1_mmc_defconfig

应用指定的项目配置。

小技巧

默认情况下，使用 output 作为项目的工作/输出目录。 如果需要指定一个专用的工作/输出目录，可以使用 `O=<dir>` 来指定目录。例如：

make O=per1 d211_per1_mmc_defconfig

当指定了 O=per1 ，后续所有与该项目相关的 make 操作，都需要加上该选项，或者 cd per1 之后，在 per1 目录中进行编译。

### 2.3.3.3. make menuconfig

用于修改项目的配置。

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/luban-menuconfig.png](https://photos.100ask.net/artinchip-docs/d213-devkit/luban-menuconfig-17066833587371.png)

配置完成，在退出保存时相应的改动会同步到原有的 `<board>_defconfig`

注解

uboot/linux/busybox 也可以通过下面的命令修改配置

- make uboot-menuconfig
- make linux-menuconfig
- make busybox-menuconfig

相对应的修改都会同步到原有的 defconfig

### 2.3.3.4. make all

编译整个项目，包括 Bootloader、Kernel、应用层的 Pacakge、RootFS以及生成最终的烧录镜像文件。

注意

不需要使用 make -jN 进行编译，Luban 编译框架默认已经使用了 make -j0，即根据主机的 CPU 核心个数决定使用多少个线程进行编译，外部不需要再提供 -j 参数。

小技巧

SDK 具有源码修改检测功能，在修改了 SDK 中任意包的源码之后再执行 `make all` 会触发该包的 `rebuild`。通常是增量编译。

## 2.3.4. 快捷命令

对于一些高频输入的命令，这里做了一个简短的快捷命令映射

```
make m   -> make menuconfig
make k   -> make linux-rebuild
make km  -> make linux-menuconfig
make b   -> make uboot-rebuild
make u   -> make uboot-rebuild
make bm  -> make uboot-menuconfig
make um  -> make uboot-menuconfig
make f   -> make all
```

## 2.3.5. 其他重要命令

```
make show-targets              --> 查看当前项目有哪些编译目标
make <pkg>-extract             --> 仅对源码包进行解压
make <pkg>-patch               --> 仅对源码包进行 patch（如果有的话）
make <pkg>                     --> 完成从 extract/patch/../build/install

make <pkg>-reconfigure         --> 对该源码包重新执行配置、编译、安装
make <pkg>-rebuild             --> 对该源码包进行重新编译
make <pkg>-reinstall           --> 对该源码包进行重新安装
make <pkg>-prebuilt            --> 为该源码包生成预编译二进制压缩包

make <pkg>-clean               --> 删除该源码包的所有编译输出
make <pkg>-distclean           --> 删除该源码包的源码
```