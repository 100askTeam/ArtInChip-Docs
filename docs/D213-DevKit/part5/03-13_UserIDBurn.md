---
sidebar_position: 13
---
# 模块介绍

### 1. 功能简介

UserID 是指厂商在量产过程中烧录的自定义 ID 数据，比如：

> - SN 序列号
> - MAC 地址
> - 其他通过指定名字索引的数据

这些信息可以在工厂生产过程中使用 AiBurnID 工具进行烧录，并且在存储在 “userid” 分区。

UserID 分区支持在烧录完成之后进行 `锁定` 功能，一旦锁定，启动过程中不再进入 UserID 烧录模式。

注解

- ID 名字可以自定义，但是不能重复
- ID 的数据长度没有做特殊限制，但是分区大小为 256KB

UserID 软件模块分为两部分：

> - U-Boot 中的 UserID 烧录
> - Linux 用户空间读写库

其中 U-Boot 的 UserID 程序主要用于实现烧录，以及 “userid” 分区读写；Linux 用户空间的 UserID 库用于用户程序读取相关的 ID 信息。

默认情况下，UserID 烧录功能在 U-Boot 中不使能，使能 UserID 功能会导致开发阶段启动速度变慢。

### 2. 启动流程

使能 UserID 功能之后，启动流程在不同场景下会有不同，容易让开发人员感到迷惑。 此处简要介绍在使能了 UserID 功能之后，在不同条件下的启动流程。

**场景1: 开发过程，独立供电**

| 条件                        | 状态 |
| --------------------------- | ---- |
| UserID 分区是否锁定         | 否   |
| USB0 是否连接到 PC          | 否   |
| AiBurnID 工具是否在等待状态 | /    |

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/boot_flow_11.png](https://photos.100ask.net/artinchip-docs/d213-devkit/boot_flow_11-17066896963961.png)

**场景2: 开发过程，USB 连接电脑供电**

| 条件                        | 状态 |
| --------------------------- | ---- |
| UserID 分区是否锁定         | 否   |
| USB0 是否连接到 PC          | 是   |
| AiBurnID 工具是否在等待状态 | 否   |

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/boot_flow_21.png](https://photos.100ask.net/artinchip-docs/d213-devkit/boot_flow_21-17066897022963.png)

**场景3: 量产过程，烧录 UserID**

| 条件                        | 状态 |
| --------------------------- | ---- |
| UserID 分区是否锁定         | 否   |
| USB0 是否连接到 PC          | 是   |
| AiBurnID 工具是否在等待状态 | 是   |

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/boot_flow_3.png](https://photos.100ask.net/artinchip-docs/d213-devkit/boot_flow_3-17066897091405.png)

**场景4: 量产完成，UserID 锁定**

| 条件                        | 状态 |
| --------------------------- | ---- |
| UserID 分区是否锁定         | 是   |
| USB0 是否连接到 PC          | /    |
| AiBurnID 工具是否在等待状态 | /    |

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/boot_flow_4.png](https://photos.100ask.net/artinchip-docs/d213-devkit/boot_flow_4-17066897147557.png)

# 3.13.2. 使用配置

## 3.13.2.1. U-Boot 编译配置

命令：

```
make uboot-menuconfig
```

使能 UserID 功能，需要勾选：

> - CONFIG_USERID_SUPPORT

```
[*] UserID support for ArtInChip  --->
```

并且确认相关的 UserID 分区位置与实际匹配：

```
--- UserID support for ArtInChip
      Location of UserID (UserID is in SPINOR)  --->
(0xE0000) UserID partition offset
(0x4000) UserID partition Size
```

## 3.13.2.2. SDK 编译配置

命令：

```
make menuconfig
```

使能 UserID 读写库，需要勾选：

> - BR2_PACKAGE_LIBUSERID

```
ArtInChip packages  --->
[*] userid r/w library  --->
```

# 3.13.3. 测试指南

## 3.13.3.1. U-Boot 测试命令

U-Boot 中通过命令行提供了 UserID 的增删改查等操作，具体命令的使用可通过 help 命令查看：

```
userid help
```

从 UserID 分区加载和初始化 UserID 数据：

```
userid init
```

查看当前的 ID 列表：

```
userid list
```

写入新 ID：

```
userid writehex name offset data

e.g.:
userid writestr sn 0 abcdefgh1234567
```

查看 ID 值：

```
userid dump name

e.g.:
userid dump sn
```

锁定 UserID：

```
userid lock
```

解锁 UserID：

```
userid unlock
```

## 3.13.3.2. Linux 测试命令

Linux 中，如果编译时选中了 userid library 包，则默认提供 `userid` 命令。

查看当前 ID 列表：

```
userid list <partition>

e.g.:
userid list /dev/mtd2
```

查看 ID 值：

```
userid dump <partition> id

e.g.:
userid dump /dev/mtd2 sn
```

# 3.13.4. 常见问题