---
sidebar_position: 10
---
# 2.8. 添加新包

添加新包有下面的几个步骤：

1. package 下添加包的配置

```
<pkg>/
|-> <pkg>.mk              --> 必须
|-> Config.in             --> 可选
|-> Config.in.host        --> 仅 host 工具需要
```

1. 修改上层的 Config.in/Config.in.host

   修改之后，才能在 menuconfig 中看到

2. 源码

   自主开发的组件，应该放到 source/artinchip 目录中； 三方开源代码，应该下载源码包到 `dl/<pkg> `目录中。

## 2.8.1. ArtInChip 开发的组件包

建议：统一使用 cmake 进行编译。

原因：

- cmake 功能比较强，更适合作为源码包的编译管理
- cmake Makefile 书写比较简单（主要是针对 Autotools）
- cmake 可以源码和编译结果分离，支持 install等（主要针对 Generic Makefile）

## 2.8.2. 开源组件包

添加相关源码包是，根据使用的编译工具不同，可以参考：

autotools:
```
> package/third-party/acl
```
cmake:
```
> - package/third-party/lzo
> - package/artinchip/*
```
generic makefile:
```
> package/third-party/bzip2
```
support kconfig:
```
> - uboot
> - linux
> - package/third-party/busybox
```
## 2.8.3. 注意事项

### 2.8.3.1. 包的路径

当前 SDK 中，仅支持在
```
> - package/artinchip/
> - package/third-party/
```
下添加，并且仅支持新增一级目录。例如
```
> - pacakge/artinchip/foo
```
### 2.8.3.2. 包的名字

以添加一个名字为 `foo` 的包为例：

| 包的目录名字       | 必须为 `foo` ，也可以有                                   |
| ------------------ | --------------------------------------------------------- |
| Config.in 中的名字 | 必须为 以 `BR2_PACKAGE_` 开头，这里为 `BR2_PACKAGE_FOO`   |
| foo.mk 中的变量名  | 变量名必须以 `FOO` 开头，例如 `FOO_INSTALL_STAGING = YES` |

注解

包的名字，可以包含 `-` 或者 `_` ，如果使用了中杠，则需要注意：

- 包目录名字继续使用中杠
- 相关的变量名字，需要将中杠改为下划线

### 2.8.3.3. 软连接的使用

如果在软件包的安装阶段，需要使用软连接创建目录，则需要添加参数 `-n` ，如：

```
ln -snf source_dir_path target_name
```

原因是 `ln -sf` 对重复创建的目标，并不会更新软连接的时间戳，这样会导致重复执行 `make <pkg>-prebuilt` 无法检测到安装目录中的软连接目录的变化，导致生成的预编译 二进制包缺漏该软连接。

`-n` 的功能是：当软连接指向目录时，将其当做一般文件对待。这样重复创建/更新链接时， 相应的时间戳也会更新。