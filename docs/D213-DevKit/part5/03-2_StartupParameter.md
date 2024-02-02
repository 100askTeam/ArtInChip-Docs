---
sidebar_position: 2
---
# 启动参数

了解启动参数，首先要了解启动流程。启动流程包含正常启动、烧录启动。每种启动过程都包含几种跳转，每一种跳转都会有相应的参数传递。

### 1. 正常启动流程

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/boot_param_riscv1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/boot_param_riscv1-17066863557881.png)

图 3.1 *正常启动过程中的跳转*

正常启动过程详细介绍：

> 1. BROM 根据启动方式去定位 SPL 位置，初始化对应非易失性存储器，加载 SPL 到 SRAM 上，BROM 运行在 M-Mode；
> 2. SPL 被执行；
> 3. SPL PBP 部分代码初始化 DRAM，之后初始化非易失性存储器；
> 4. SPL 加载u-boot.itb(包含 OpenSBI,U-Boot,DTB)到 DRAM；
> 5. OpenSBI被执行，切换到S-Mode；
> 6. U-Boot 被执行；
> 7. U-Boot加载设备树DTB，环境变量ENV;
> 8. U-Boot加载Kernel，DTB到DRAM；
> 9. Kernel被执行，加载DTB；
> 10. Rootfs被执行，切换到U-Mode,整个系统启动完成;

### 2. 烧录启动流程

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/boot_param_riscv2.png](https://photos.100ask.net/artinchip-docs/d213-devkit/boot_param_riscv2-17066863748513.png)

图 3.2 *烧录启动过程中的跳转*

烧录启动过程详细介绍：

> 1. 配置烧录启动方式，BROM 通过 usb-otg 加载 DDR-Init 到 SRAM 上；
> 2. DDR-Init 被执行，初始化 DRAM；
> 3. 返回 BROM；
> 4. BROM 通过 usb-otg 加载 ENV 到 DRAM；
> 5. BROM 通过 usb-otg 加载 u-boot.itb(包含OpenSBI,U-Boot,DTB)到 DRAM；
> 6. BROM 通过 usb-otg 加载 SPL 到 DRAM；
> 7. SPL 被执行；
> 8. SPL PBP 部分 SPL 代码初始化 DRAM,此阶段会检查 DRAM 是否已经被初始化，是则跳过；
> 9. OpenSBI 被执行，切换到 S-Mode；
> 10. U-Boot 被执行；
> 11. U-Boot 加载设备树 DTB，环境变量 ENV（确定了程序烧录目的非易失性存储器）;
> 12. U-Boot 进入到烧录模式，对目的非易失性存储器进行分区格式化，通过 usb-otg 加载烧录程序；

注解

烧录通过 U-Boot 实现，前面的过程都是在为 U-Boot 程序运行做准备。

在上述各种跳转中，都会附带一些启动参数，用于将当前一级程序的信息传递给下一级程序， 辅助下一级程序的执行。

### 3. BROM 传递的参数

BROM 跳转到 SPL 时传递的参数如 [表 3.7](#boot-param-1602-1) 所示。

*表 3.7* *BROM 传递的参数*

| 参数名称    | 寄存器       | 说明                           |
| ----------- | ------------ | ------------------------------ |
| boot device | a0,bit[3:0]  | 启动的存储介质 ID              |
| boot reason | a0,bit[7:4]  | 启动的原因，如：冷启动、热启动 |
| image id    | a0,bit[11:8] | 使用的备份镜像 ID              |

OpenSBI 跳转到 U-Boot 时传递的参数如 [表 3.8](#boot-param-1602-2) 所示。

*表 3.8* *OpenSBI 传递的参数*

| 参数名称    | 寄存器       | 说明                           |
| ----------- | ------------ | ------------------------------ |
| boot device | a3,bit[3:0]  | 启动的存储介质 ID              |
| boot reason | a3,bit[7:4]  | 启动的原因，如：冷启动、热启动 |
| image id    | a3,bit[11:8] | 使用的备份镜像 ID              |

传递参数结构体定义如下，具体实现可参考 `arch/riscv/include/asm/arch-artinchip/boot_param.h`

```
union boot_params {
    /*
    * Save registers. Later's code use these register value to:
    * 1. Get parameters from previous boot stage
    * 2. Return to Boot ROM in some condition
    *
    * For SPL:
    *      a0 is boot param
    *      a1 is private data address
    * For U-Boot:
    *      a0 is hartid from opensbi
    *      a1 is opensbi param
    *      a2 is opensbi param
    *      a3 is boot param from SPL
    */
    unsigned long regs[22];
    struct {
        unsigned long a[8];  /* a0 ~ a7 */
        unsigned long s[12]; /* s0 ~ s11 */
        unsigned long sp;
        unsigned long ra;
    } r;
};
```

### 4. BROM 参数获取的过程

无论是 SPL 还是 U-Boot，在执行时的第一步动作就是保存这些启动参数， 具体实现可参考 `arch/riscv/cpu/start.S`

~~~
_start:
        /* Allow the board to save important registers */
        j   save_boot_params
save_boot_params_ret:
~~~

`save_boot_params` 的实现在源文件 `arch/riscv/mach-artinchip/lowlevel_init.S`

```
ENTRY(save_boot_params)
    la      t0, boot_params_stash
    SREG    a0, REGBYTES * 0(t0)
    SREG    a1, REGBYTES * 1(t0)
    SREG    a2, REGBYTES * 2(t0)
    SREG    a3, REGBYTES * 3(t0)
    SREG    a4, REGBYTES * 4(t0)
    SREG    a5, REGBYTES * 5(t0)
    SREG    a6, REGBYTES * 6(t0)
    SREG    a7, REGBYTES * 7(t0)
    SREG    s0, REGBYTES * 8(t0)
    SREG    s1, REGBYTES * 9(t0)
    SREG    s2, REGBYTES * 10(t0)
    SREG    s3, REGBYTES * 11(t0)
    SREG    s4, REGBYTES * 12(t0)
    SREG    s5, REGBYTES * 13(t0)
    SREG    s6, REGBYTES * 14(t0)
    SREG    s7, REGBYTES * 15(t0)
    SREG    s8, REGBYTES * 16(t0)
    SREG    s9, REGBYTES * 17(t0)
    SREG    s10, REGBYTES * 18(t0)
    SREG    s11, REGBYTES * 19(t0)
    SREG    sp, REGBYTES * 20(t0)
    SREG    ra, REGBYTES * 21(t0)
    j       save_boot_params_ret
ENDPROC(save_boot_params)
```

传递的参数被保存在全局变量 `boot_params_stash` 中，SPL 或者 U-Boot 可从中获取相关信息。 在保存参数时，不仅将 a0,a1 寄存器保存起来，还将其他重要寄存器一起保存。

```
save_boot_params``使用到的相关宏定义在源文件 ``arch/riscv/mach-artinchip/lowlevel_init.S
#define LREG                ld
#define SREG                sd
#define REGBYTES            8
```

### 5. 参数获取接口

无论是在 SPL 还是在 U-Boot 中，都可以通过下列接口获取上一级引导程序传递的参数。

```
enum boot_reason aic_get_boot_reason(void);
enum boot_device aic_get_boot_device(void);
```

相关的定义可参考文件：

- `arch/riscv/include/asm/arch-artinchip/boot_param.h`
- `arch/riscv/mach-artinchip/boot_param.c`

