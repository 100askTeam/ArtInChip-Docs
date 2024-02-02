---
sidebar_position: 15
---
# 调试配置

此章节描述一些常用的 SPL/U-Boot 调试配置方法。

### 1. JTAG 调试

#### 1.1. JTAG 下载配置

SPL 可以直接下载到芯片 SRAM 运行：

```
restore ./output/images/u-boot-spl-dtb.bin binary 0x103100
add-symbol-file ./output/build/uboot-2021.10/spl/u-boot-spl

# 1: eMMC; 2: SD; 4: SPINOR; 5: SPINAND; 6: SDFAT32
set $a0=5
set $a1=0
set $pc=0x103100
```

注意

下载运行 SPL 时，通过 a0 传递启动设备信息。 具体值请参考源码 `boot_param.h` 。

U-Boot 不能直接下载执行，必须通过 OpenSBI 来跳转执行：

```
# Enable L1 Cache
set $mhcr = 0x17f
set $mhint = 0x650C
set $mxstatus = 0x638000

restore ./output/images/env.bin binary 0x43100000
restore ./output/images/u-boot.dtb binary 0x42200000
restore ./output/images/u-boot-dtb.bin binary 0x40200000

# restore ./output/images/fw_jump.bin binary 0x40000000
load ./output/images/fw_jump.elf

set $a0=0
set $a1=0x42200000
# 1: eMMC, 5: NAND 7:USB
set $a3=7
set $pc=0x40000000

continue
```

注意

下载运行 U-Boot 时，通过 a3 传递启动设备信息。 具体值请参考源码 `boot_param.h` 。

#### 1.2. Relocation 后的调试

U-Boot 在初始化过程中，会将运行空间迁移到 DRAM 末端，代码段和相关的数据进行重定位之后， 调试器原本加载的 elf 文件与实际运行的代码地址不一致，因此继续调试是不正确的。

重定位发生在 `board_init_f` 与 `board_init_r` 之间。

可将断点打在下面的位置：

```
call_board_init_r  // arch/riscv/cpu/start.S
```

然后再添加新的符号表，如：

```
(gdb) add-symbol-file uboot-2021.10/build/updater/u-boot 0x43f51000
```

注意：这里的地址 0x43f51000 是重定位之后的 U-Boot 开始地址，该地址可以从启动打印中可以查看到， 如下面的 Relocating to 0x43f51000 。

```
Relocation Offset is: 0x03d51000
Relocating to 0x43f51000, new gd at 0x43b4ce20, sp at 0x43b44230
```

在添加了新的符号表之后，就可以设置新的断点了，比如可以设置断点在 board_init_r 函数。

```
(gdb) b board_init_r
```

然后 continue 运行即可。

### 2. 打印设置

在启动流程调试或者模块调试的时候，如果需要通过串口打印信息进行调试，可以通过 Kconfig 配置中的 `Artinchip debug` 使能打印信息。

```
make uboot-menuconfig
Artinchip debug  --->
[ ] Enable early print information
[ ] Enable device binding log
[ ] Enable mmc driver log
[ ] Enable spi-nand driver log
[ ] Enable spi-nor driver log
[ ] Enable spi driver log
[ ] Enable mmc framework trace log
[ ] Show boot time
[ ] Show UBI debug log
```

其中第一项：Enable early print information 可以将串口初始化之前的调试信息打印出来。

注意

SPL 中，使用上述配置时，不能同时使能 TINY_PRINTF