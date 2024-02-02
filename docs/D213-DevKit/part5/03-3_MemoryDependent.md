---
sidebar_position: 3
---
# 内存相关

本章节主要介绍 SPL/U-Boot 阶段的内存配置和预分配设置。

## 1. DDR 初始化

BROM 阶段仅系统 SRAM 可用，大小为 96KB。在 BROM 阶段 Cache 关闭，SRAM 的运行频率为 60MHz。

DDR 的初始化在 PBP 程序中进行。PBP（PreBoot Program）是保存在 AIC 启动镜像中的一段程序， BROM 在运行 SPL 之前先运行 PBP 程序，PBP 程序执行成功之后，才跳转执行 SPL 程序。

PBP 程序的主要功能是完成 DDR 初始化。

注意

PBP 阶段，并不会使能 Cache，Cache 的使能放在 SPL 阶段执行。

## 2. Cache

由于打开 Cache 对程序执行效率和内存访问效率都有很大的提升， SPL 的配置默认打开 I-Cache、D-Cache。

使能 Cache 的流程如下:

> - SPL 阶段，执行时立刻使能 I-Cache
> - SPL 退出时不关闭 Cache

因此后续的 OpenSBI、U-Boot 阶段，默认是在 Cache 使能的情况下运行的。

注意

1. RISCV CPU 中，Cache 与 MMU 两个功能是分开设置的。此处只描述 Cache 的相关配置，与 MMU 没有关系。
2. Cache 的使能必须在 RISCV M-Mode 下操作，由于 U-Boot 运行在 S-Mode，因此 U-Boot 阶段不能开关 Cache

### 2.1. 相关配置

**Cache Enable**

ArtInChip 平台默认使能 I-Cache 和 D-Cache，如果需要关闭相关功能，可以使用下面的配置：

- CONFIG_SYS_ICACHE_OFF
- CONFIG_SYS_DCACHE_OFF

### 2.2. 代码流程

Cache 相关 API：

| API                     | SPL 可用 | U-Boot 可用 |
| ----------------------- | -------- | ----------- |
| icache_enable           | 是       | 否          |
| icache_disable          | 是       | 否          |
| icache_status           | 是       | 否          |
| dcache_enable           | 是       | 否          |
| dcache_disable          | 是       | 否          |
| dcache_status           | 是       | 否          |
| flush_dcache_all        | 是       | 是          |
| flush_dcache_range      | 是       | 是          |
| invalidate_dcache_range | 是       | 是          |

其实现在 `arch/riscv/cpu/c906/cache.c` 。

**SPL 中 Cache 初始化流程如下：**

```
_start // arch/riscv/cpu/start.S
|-> save_boot_params
|-> board_init_f_alloc_reserve
|-> harts_early_init
|-> board_init_f_init_reserve
|-> icache_enable   // arch/riscv/cpu/c906/cache.c
|-> dcache_enable   // arch/riscv/cpu/c906/cache.c
|-> board_init_f
```

## 3. 内存分配

启动阶段的内存空间是通过预分配的形式进行使用。这里描述各阶段所使用的内存空间。

### 3.1. BROM 阶段

| 地址范围                | 存放内容      | 说明 |
| ----------------------- | ------------- | ---- |
| 0x00100000 ~ 0x00102000 | BROM DATA,BSS | 8KB  |
| 0x00102000 ~ 0x00103000 | BROM Stack    | 4KB  |
| 0x00103000 ~ 0x00118000 | SPL,PBP       | 84KB |

### 3.2. SPL 阶段
```
| 地址范围                | 存放内容        | 说明                                                         |
| ----------------------- | --------------- | ------------------------------------------------------------ |
| 0x00103000 ~ 0x00115F00 | SPL 初始栈空间  | 0x00118000 是配置的栈顶位置，但实际上运行的时候，需要预留 HEAP 空间和 GD 全局变量的空间，因此实际的栈顶地址是 0x00115F00配置：CONFIG_SPL_STACK, rch/riscv/cpu/start.S位置：include/configs/d211.h |
| 0x00115F00 ~ 0x00116000 | Global Data     | GD 全局变量的初始空间                                        |
| 0x00116000 ~ 0x00118000 | HEAP            | 初始 HEAP 的空间配置：CONFIG_SYS_MALLOC_F_LEN位置：Kconfig   |
| 0x40000000 ~ 0x42000000 | Kernel          | SPL 直接启动 Kernel 时使用，从 U-Boot 启动时不用配置：its位置：kernel.its |
| 0x40004000 ~ 0x41000000 | U-Boot          | SPL 启动 U-Boot 时使用，直接启动 Kernel 时不用，预留约 16MB配置：its位置：u-boot.its |
| 0x42000000 ~ 0x42000100 | SPL AIC 信息头  | SPL 的 AIC 头信息                                            |
| 0x42000100 ~ 0x42020000 | SPL bin         | 0x42000100 是 SPL 的程序入口地址，SPL 大小不应该超过 128KB配置：CONFIG_SPL_TEXT_BASE, image_cfg.json位置：common/spl/Kconfig |
| 0x42200000 ~ 0x42300000 | SPL STACK       | 1MB, 初始栈太小，在 board_r 之后切换到新的栈运行配置：CONFIG_SPL_STACK_R_ADDR - CONFIG_SPL_STACK_R_MALLOC_SIMPLE_LEN预留完 Simple heap 之后，剩下的空间给 Stack位置：Kconfig |
| 0x42300000 ~ 0x43F00000 | SPL heap        | 28MB在 SPL board_r 初始化 CONFIG_SYS_SPL_MALLOC_START 之前使用D211 不会定义 CONFIG_SYS_SPL_MALLOC_START，只用 Simple Heap配置：CONFIG_SPL_STACK_R_ADDR =0x43F00000配置：CONFIG_SPL_STACK_R_MALLOC_SIMPLE_LEN = 0x1C000000,28MB位置：Kconfig |
| 0x43F00000 ~ 0x43F20000 | Falcon 模式参数 | SPL Falcon 模式才需要，所需空间不大配置：CONFIG_SYS_SPL_ARGS_ADDR位置：include/configs/d211.h |
| 0x43FE0000 ~ 0x44000000 | OpenSBI         | 配置：CONFIG_SPL_OPENSBI_LOAD_ADDR位置：Kconfig              |

| 地址范围                | 存放内容  | 说明                                                         |
| ----------------------- | --------- | ------------------------------------------------------------ |
| 0x40000000 ~ 0x41000000 | SPL       | SPL 的下载地址，运行起来时会被搬运到指定的链接位置配置：image_cfg.json |
| 0x41000000 ~ 0x41100000 | env.bin   | 存放启动升级程序（U-Boot）所用的环境变量，由于升级时不会直接运行 Kernel，因此与上面的 Kernel 地址空间不冲突配置：CONFIG_ENV_RAM_ADDR, image_cfg.json位置：env/Kconfig |
| 0x41100000 ~ 0x42000000 | uboot.itb | 存放升级程序配置：CONFIG_SPL_LOAD_FIT_ADDRESS, image_cfg.json位置：Kconfig |
```
### 3.3. U-Boot 阶段
```
| 地址范围                | 存放内容         | 说明                                                         |
| ----------------------- | ---------------- | ------------------------------------------------------------ |
| 0x40004000 ~ 0x41000000 | 初始 U-Boot      | U-Boot 的程序入口地址，但在初始化完成之后，U-Boot 会自行重定位到 DRAM 的末尾运行，该空间被空出来，用于加载 Kernel配置：CONFIG_SYS_TEXT_BASE位置：Kconfig |
| 0x40300000 ~ 0x40400000 | 初始 U-Boot HEAP | 初始 gd, HEAP, STACK 的保留空间，重定位之后，该空间会被空出来。配置：CONFIG_SYS_INIT_SP_ADDR位置：include/configs/d211.h配置：CONFIG_SYS_MALLOC_F_LEN位置：Kconfig |
| 0x40000000 ~ 0x42000000 | Kernel           | Kernel 的程序入口地址，Kernel 最终会被加载到该空间           |
| 0x41200000 ~ 0x42200000 | kenrel.itb       | Kernel.itb 的加载地址，加载后 Kernel 被复制到 0x40000000预留 16MB配置：knl_addr位置：env.txt |
| 0x42200000 ~ 0x42300000 | dtb              | 调试用，正常情况下不使用配置：dtb_addr位置：env.txt          |
| 0x42400000 ~ ……….       | logo.itb         | logo 数据的加载地址，logo.itb 中存储了多张 png 图片uboot 会从该地址读取相应的 png 图片进行解码并显示配置：logo: { ram: }位置：image_cfg.json配置：CONFIG_LOGO_ITB_ADDRESS位置：drivers/video/artinchip/display/aic_display.c |
| 0x41000000 ~ ……….       | ENV              | U-Boot 环境变量的加载地址，USB 升级时使用，16KB 左右初始化加载之后可释放，不影响 Kernel 的使用配置：CONFIG_ENV_RAM_ADDR位置：env/Kconfig |
| At the End of DRAM      | 保留内存         | 重定位后的 U-Boot、栈、堆，以及其他需要预留的内存。具体可以查看 board_f.c 相关处理。 |
| 0x43F00000 ~ 0x43FDFFFF | dtb              | 预留给 Kernel dtb 的内存空间，正常启动时加载到该空间配置：fdt-1: { load = }位置：kernel.its |
| 0x43FE0000 ~ 0x44000000 | OpenSBI          | 预留给 OpenSBI 的内存空间配置：CONFIG_SPL_OPENSBI_LOAD_ADDR位置：Kconfig |
```