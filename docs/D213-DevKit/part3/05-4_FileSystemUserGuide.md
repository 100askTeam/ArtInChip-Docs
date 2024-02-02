---
sidebar_position: 11
---
# 文件系统使用指南

## 1. RootFS

借助于 Buildroot， 很多需要使用的工具可以直接被编译和安装到 RootFS， 如果希望将非依赖 Buildroot 独立编译的程序和文件放到 RootFS 中时，可使用 SDK 提供的RootFS Overlay 的机制来实现。

### 1.1. Overlay机制

RootFS Overlay 是指在制作 RootFS 镜像过程中，使用客制化的 RootFS 目录内容覆盖 `output/target/` 中目录和文件的一个机制。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/rootfs_overlay_mechanism.png](https://photos.100ask.net/artinchip-docs/d213-devkit/rootfs_overlay_mechanism-170669575336447.png)

图 5.22 *RootFS Overlay 机制*

如上图所示，编译过程中生成的内容，安装到 `output/target/` ，制作 RootFS 镜像时：

> - 首先将 `output/target/` 目录内容 `rsync` 到 RootFS 制作目录 `output/build/luban-fs/target/`
>
> - 然后将指定的 RootFS Overlay 目录中的内容 `rsync` 到 RootFS 制作目录 `output/build/luban-fs/target/`
>
>   如果配置了多个 RootFS Overlay 目录，则按顺序 `rsync` 覆盖 `output/build/luban-fs/target/` 中的内容

通过上述机制，开发者可以将独立编译的程序和文件放在一个 RootFS Overlay 目录中，然后将该目录路径配置到对应的 `<board>_defconfig`，即可将这些程序和文件打包到 RootFS 镜像。

### 1.2. 默认 Overlay

SDK 给每个 Board 设置了一个默认的 Overlay 目录，可以按照需要的目录结构存储直接预制文件

```
target/d211/fpga_spinand/rootfs_overlay
```

### 1.3. 新 Overlay

Luban SDK 的 Overlay 支持多目录，增加新的 Overlay 目录的方案是：

- 打开配置界面

```
make menuconfig
```

- System configuration

```
System configuration  --->
    (target/$(LUBAN_CHIP_NAME)/$(LUBAN_BOARD_NAME)/rootfs_overlay) Root filesystem overlay directories

此处 ``target/$(LUBAN_CHIP_NAME)/$(LUBAN_BOARD_NAME)/rootfs_overlay`` 即为每一个板子的目录下的默认的 rootfs_overlay 目录。
```

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/rootfs_overlay_menuconfig.png](https://photos.100ask.net/artinchip-docs/d213-devkit/rootfs_overlay_menuconfig-170669577714649.png)

- 添加新目录

  RootFS Overlay 目录可以配置多个，不同目录之间使用 `空格` 分开即可。如

```
target/$(LUBAN_CHIP_NAME)/$(LUBAN_BOARD_NAME)/rootfs_overlay test_rootfs

此处除了板子目录下的 ``rootfs_overlay`` 目录，还添加了 SDK 顶层目录下的 ``test_rootfs`` 目录。
```

### 1.4. 编译结果

在完成上述添加后，重新编译生成固件时三个目录将被合并构建 RootFS

- rootfs_overlay 和 test_rootfs 中的内容会被按顺序安装到 `output/build/luban-fs/target/`
- `output/build/luban-fs/target/` 内容被安装到 `output/target/` 中
- 基于 `output/target/` 生成 RootFS

## 2. 开机启动

RootFS `/etc/init.d/` 目录可以设置开机初始化脚本，这些脚本在登录之前被 linuxrc 执行。

小技巧

linuxrc 执行的内容和顺序可详细参考：package/third-party/busybox/inittab

Luban SDK 编译时，如何为项目安装开机初始化脚本？推荐如下几种方式

### 2.1. init.d 脚本

如果初始化脚本与某组件包相关，可以编写一个 init.d 脚本， 在该组件包安装文件时，将对应的脚本安装到 `/etc/init.d/` 目录

#### 2.1.1. 脚本

Linux 对 init.d 脚本有统一的要求，可以百度解决，此处给一个简单的例子: S99qtlauncher, 其中 S99 为优先级，99说明优先级比较低

```
#!/bin/sh
#
# Start qtlauncher....
#

DAEMON="/usr/local/qtlauncher/qtlauncher"
DAEMONOPTS=" -platform=linuxrc"
PIDFILE=/var/run/qtlauncher.pid

start() {
    printf "Starting qtlauncher: "
    PID=`$DAEMON $DAEMONOPTS > /DEV/NULL 2>&1 & echo $!`
    if [ -z $PID ]: then
        printf "Fail \n"
    else
        echo $PID >$PIDFILE
        printf "OK \n"
    fi

}

stop() {
        printf "Stopping qtlauncher: "
        PID=`cat $PIDFILE`
        if [ -f $PIDFILE]; then
            kill -HUP $PID
            printf "OK \n"
            rm -f $PIDFILE
        else
            printf "pidfile not found \n"
        fi
}

case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart|reload)
        stop
        start
        ;;
*)
        echo "Usage: $0 {start|stop|restart}"
        exit 1
esac

exit $?
```

#### 2.1.2. 安装

继续上文的 S99qtlauncher:

```
package/artinchip/qtlauncher/qtlauncher.mk
define QTLAUNCHER_INSTALL_TARGET_CMDS
        $(INSTALL) -m 0755 -D package/artinchip/qtlauncher/S99qtlauncher \
                $(TARGET_DIR)/etc/init.d/S99qtlauncher
endef
```

### 2.2. RootFS Overlay

如果该脚本与具体的组件包没有直接的关系，与项目相关性较大，或者不方便放到具体的组件包中，则可以 放到 `target/<chip>/<board>/rootfs_overlay/` 目录，这样在生成 RootFS 镜像时，通过 Overlay 的方式 安装到镜像的 `/etc/init.d/` 目录中。

具体可参考 [RootFS](rootfs.html#ref-luban-rootfs-overlay) 。

### 2.3. initscripts

`/etc/init.d/` 目录是由 `package/third-party/initscripts/` 包进行安装创建的， 也可以将相关初始化脚本放在该包中进行安装。

需要修改 `package/third-party/initscripts/initscripts.mk` 中的 `INITSCRIPTS_INSTALL_TARGET_CMDS` 。

注解

多数的脚本都有与之相关的组件包，建议尽量采用第一、第二种方式进行安装，并不建议将过多的脚本放到 initscripts 包中进行安装。

## 3. 系统分区

分区表的配置在 `image_cfg.json` 文件中完成，可以很容易的进行增删改查操作

### 3.1. 配置说明

`image_cfg.json` 是 `SDK/target/<chip>/<board>` 目录下描述如何生成烧录镜像的文件，其中的第一部分就是描述烧录的目标存储介质的分区设置。

#### 3.1.1. eMMC

```
"mmc": { // Media type
        "size": "8G", // Size of SD/eMMC
        "partitions": { // Partition table apply to device
                "spl_1":  { "offset": "0x4400", "size": "128k" },
                "spl_2":  { "size": "367k" },
                "uboot":  { "size": "1m" },
                "env":    { "size": "512k" },
                "kernel": { "size": "16m" },
                "rootfs": { "size": "64m" },
                "user":   { "size": "64m" },
                "data":   { "size": "-" },
        },
},
```

其中 `mmc` 有两个属性：

> - size
>
>   eMMC 存储设备的总大小(User Data Area)。
>
> - partitions
>
>   在该对象下，可以根据需要，按顺序添加分区，并且设置分区的开始位置和大小。
>
>   - offset: 分区的开始地址，相对 eMMC 0 地址的偏移。值应使用16进制字符串表示。如果 offset 没有出现，表示紧接上一个分区。
>   - size: 分区的大小，可使用 `K, M, G` 单位。最后一个分区可以使用 “-” 代替，表示剩余所有的空间都分配给该分区。

注解

eMMC 的第一个分区，从 0x4400 开始，前面的 34 个 LBA 是保留给 GPT 分区表头用的。 SPL 分区，可以设置两个备份。从 0x4400 开始，每个分区大小 为 128KB。

#### 3.1.2. SPI NOR

```
"spi-nor": { // Media type
        "size": "16m",// Size of NOR
        "partitions": {
                "spl":  { "size": "128k" },
                "uboot":  { "size": "768k" },
                "env":    { "size": "128k" },
                "kernel": { "size": "6m" },
                "rootfs": { "size": "5m" },
                "user":   { "size": "4m" },
                "data":   { "size": "-" },
        }
},
```

其中 `spi-nor` 有两个属性：

> - size
>
>   SPI NOR 设备的总大小。
>
> - partitions
>
>   在该对象下，可以根据需要，按顺序添加 MTD 分区，并且设置分区的开始位置和大小。
>
>   - offset: 分区的开始地址，相对设备 0 地址的偏移。值应使用16进制字符串表示。如果 offset 没有出现，表示紧接上一个分区。
>   - size: 分区的大小，可使用 `K, M, G` 单位。最后一个分区可以使用 “-” 代替，表示剩余所有的空间都分配给该分区。

注解

SPI NOR 的 SPL 可以设置两个备份分区。从 0 开始，每个大小128KB。 第二个备份分区可以不设置。

#### 3.1.3. SPI NAND

```
"spi-nand": { // Device, The name should be the same with string in image:info:media:type
        "size": "128m", // Size of SPI NAND
        "partitions": {
                "spl":    { "size": "1m" },
                "uboot":  { "size": "1m" },
                "env":    { "size": "256k" },
                "kernel": { "size": "12m" },
                "ubiroot": {
                        "size": "32m",
                        "ubi": { // Volume in UBI device
                                "rootfs": { "size": "-" },
                        },
                },
                "ubisystem": {
                        "size": "-",
                        "ubi": { // Volume in UBI device
                                "user":   { "size": "64m" },
                        },
                        "ubi": { // Volume in UBI device
                                "data":   { "size": "-" },
                        },
                },
        }
},
```

其中 `spi-nand` 有两个属性：

> - size
>
>   SPI NAND 设备的总大小。
>
> - partitions
>
>   在该对象下，可以根据需要，按顺序添加 MTD 分区，设置分区的开始位置和大小，以及设置该 MTD 分区是否为 UBI 设备：
>
>   - offset: 分区的开始地址，相对设备 0 地址的偏移。值应使用16进制字符串表示。如果 offset 没有出现，表示紧接上一个分区。
>
>   - size: 分区的大小，可使用 `K, M, G` 单位。最后一个分区可以使用 “-” 代替，表示剩余所有的空间都分配给该分区。
>
>   - ubi
>
>     如果设置了该对象，则说明该 MTD 分区是一个 UBI 设备，可以进一步描述 UBI Volume 的划分。
>
>     在该对象下，可以根据需要，按顺序添加该 UBI 设备中的 Volume 描述，每一个 Volume 拥有下列属性：
>
>     > - offset: Volume 的开始地址，相对 UBI 设备 0 地址的偏移。值应使用16进制字符串表示。如果 offset 没有出现，表示紧接上一个 Volume。
>     > - size: Volume 的大小，可使用 `K, M, G` 单位。最后一个 Volume 可以使用 “-” 代替，表示 UBI 设备剩余所有的空间都分配给该 Volume。

注意

SPI NAND 的 `spl` 分区大小，固定为1MB。里面包含 4 个 SPL 备份。

### 3.2. 启动相关分区

启动相关的分区，修改之后要注意同步修改 U-Boot 和 env.txt 中的配置。

#### 3.2.1. U-Boot 所在的分区修改

U-Boot 所在的分区修改之后，对应 defconfig 中的位置也应该同步更新。

| eMMC                                    | SPI NOR                    | SPI NAND                        |
| --------------------------------------- | -------------------------- | ------------------------------- |
| CONFIG_SYS_MMCSD_RAW_MODE_U_BOOT_SECTOR | CONFIG_SYS_SPI_U_BOOT_OFFS | CONFIG_SYS_SPI_NAND_U_BOOT_OFFS |

#### 3.2.2. ENV 所在的分区修改

ENV 所在的分区修改之后，对应 defconfig 中的位置也应该同步更新。

| eMMC                     | SPI NOR                  | SPI NAND          |
| ------------------------ | ------------------------ | ----------------- |
| CONFIG_ENV_OFFSET        | CONFIG_ENV_OFFSET        | CONFIG_ENV_OFFSET |
| CONFIG_ENV_OFFSET_REDUND | CONFIG_ENV_OFFSET_REDUND | CONFIG_ENV_RANGE  |
| CONFIG_ENV_SIZE          | CONFIG_ENV_SIZE          |                   |
|                          | CONFIG_ENV_SECT_SIZE     |                   |

#### 3.2.3. RootFS 所在的分区位置变化

RootFS 所在的分区位置发生变化之后，需要修改 bootargs 相关的配置。相关的文件通常在

```
target/<chip>/common/env.txt
target/<chip>/<board>/env.txt
```

eMMC 的 `root=` 参数是自动生成的，但前提条件是 RootFS 分区名字要为 `rootfs` 。如果 RootFS 分区名字发生了改变， 应同步修改：

```
set_mmc_root=part number mmc ${boot_devnum} rootfs rootfs_part; \
         setexpr rootfs_part ${rootfs_part} + 0; \
         setenv mmc_root "/dev/mmcblk${boot_devnum}p${rootfs_part}";
```

SPI NOR 中的 RootFS 分区位置发生变化时，应同步修改：

```
nor_root=/dev/mtdblock4
```

SPI NAND 中的 RootFS 通常放在 UBI 中，如果相应的位置发生变化，需要同步修改：

```
nand_root=ubi0:rootfs
ubi_rootfs_mtd=4
```

## 4. 系统镜像

对于有镜像的分区，需要创建一个对应的镜像来烧录到该分区上， 该镜像的名字需要和 image_cfg.json 中的分区的名字一致，比如 `user` 分区， 本文介绍如何在编译时安装部分程序和数据到该分区的文件系统中，并且生成对应的文件系统镜像。

### 4.1. 镜像配置

SDK 目前支持用户最多生成三个不同的自定义文件系统镜像，需要在配置界面进行配置。

```
make menuconfig
```

根据需要勾选：

```
Filesystem images  --->
   [*] UserFS 1  --->
   [ ] UserFS 2  --->
   [ ] UserFS 3  --->

--- UserFS 1
    (user) Name                                      \\ 文件系统镜像名字，可修改，如 user
    FS Type (UBIFS)  --->                            \\ 文件系统，支持Ext4、UBIFS、JFFS2、SQUASHFS，建议选择UFBIFS
    (0x1000000) ubifs size(Should be aligned to MB)  \\ Image的大小，需要和分区保持一致，单位为Byte
    ubifs runtime compression (no compression)  ---> \\ UBIFS 内部压缩算法
    Compression method (no compression)  --->        \\ Image 压缩方法

        ()    Additional mkfs.ubifs options
        ()    Overlay directory
```

注意

使用 JFFS2 文件系统时，需要 make kernel-menuconfig 失能 CONFIG_MTD_SPI_NOR_USE_4K_SECTORS 配置

参数详细解释：

> - 文件系统镜像名字： `Name`
>
>   这里默认是 `userfs1` ，可根据实际情况修改，如 user
>
> - 文件系统类型： FS Type
>
>   - 如果是 EMMC， 则请选择 EXT4
>   - 如果是 NAND，则请选择 UBIFS
>   - 如果是 NOR，则可以选择 UBIFS、JFFS2、SQUASHFS

- Image 大小： ubifs size

  > - Image 的大小要小于等于分区的大小，不能超过
  > - 单位为 Byte， 默认 0x1 000 000 为 1M， 0x10 000 000 则为 16MB
  > - 设置时需要对齐为 MB

- 压缩算法

  - 压缩算法的引进将减少 Image 的 Size，但读写速度变慢
  - UBIFS 内部压缩算法 和 Image 两中压缩算法设计
  - 建议不进行压缩设置

### 4.2. 文件的安装

此处勾选了 `UserFS 1` 之后，编译时，SDK 会自动创建一个文件安装目录：

```
output/userfs/fs1.<fs_name>/

比如 fs_name = "User"，则路径为：

output/userfs/fs1.User/
```

如果在编译 SDK 的组件包过程中，需要安装文件到该路面，可通过 Makefile 变量：

```
$(TARGET_USERFS1_DIR)
```

可得到该安装目录的路径。

小技巧

UserFS 2, UserFS 3 也是同样的配置。

### 4.3. UserFS Overlay

UserFS 同样支持 Overlay 的操作。Overlay 的目录在 [RootFS](rootfs.html#ref-luban-rootfs-overlay) 中的 `Overlay directory` 中配置。如果需要配置多个 Overlay 目录，则在不同的目录之间， 使用空格进行分开。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/userfs_overlay.png](https://photos.100ask.net/artinchip-docs/d213-devkit/userfs_overlay-17067007201933.png)

图 5.23 *UserFS Overlay 示例*

## 5. 分区修改

Luban 系统里，存储大小关联到两个概念，如果要修改存储大小，则需要进行两处参数的改动

- 分区大小：存储介质上的物理大小
- 镜像大小：打包的文件系统镜像的大小

警告

原则上，镜像大小必须等于分区大小

### 5.1. 配置分区

分区的大小配置，在 `image_cfg.json` 文件中完成, 以 rootfs 为例，修改为64MB

```
"mmc": { // Media type
        "size": "8G", // Size of SD/eMMC
        "partitions": { // Partition table apply to device
                "spl_1":  { "offset": "0x4400", "size": "128k" },
                "spl_2":  { "size": "367k" },
                "uboot":  { "size": "1m" },
                "env":    { "size": "512k" },
                "kernel": { "size": "16m" },
                "rootfs": { "size": "64m" },
```

### 5.2. 配置镜像

镜像的大小配置通过 `make menuconfig` 进行配置，以 RootFS images 为例，修改为 64MB

```
make menuconfig

Filesystem images  --->
   RootFS images
      ......
      (0x40000000) ubifs size(Should be aligned to MB)  \\Image的大小，需要等于分区，单位为Byte
      ......
```

### 5.3. 无镜像分区

对于无镜像的 kernel， uboot， env 等分区，要修改其大小直接在 `image_cfg.json` 文件中修改即可