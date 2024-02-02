---
sidebar_position: 2
---
# CMU 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语 | 定义              | 注释说明     |
| ---- | ----------------- | ------------ |
| CMU  | clock manage unit | 时钟管理单元 |
| PLL  | Phase Locked Loop | 锁相环时钟   |

### 1.2. 模块简介

CMU模块用于配置系统时钟，PLL时钟频率和展频，AXI/AHB/APB总线时钟，各模块输入时钟，IO输出时钟，以及各个模块的reset信号的复位或释放。

CMU模块的基本特性如下：

- 两种锁相环共5个PLL
- 整数PLL时钟PLL_INT2个，无小数分频和展频功能，可旁路输出24M时钟
- 小数PLL时钟PLL_FRA3个，有小数分频和展频功能，可旁路输出24M时钟
- CPU时钟源可选CLK_24M、CLK_32K、PLL_INT0，可进行1~32分频
- AXI/AHB0/APB0/APB1时钟源可选CLK_24M或PLL_INT1，可进行1~32分频
- 每个模块的时钟可进行1~32分频
- 每个模块的总线时钟、模块时钟、复位开关可独立配置
- 4路可配置频率和时钟源的时钟输出，用作于外设的时钟输入

## 2. CMU配置

### 2.1. 内核配置

#### 2.1.1. clock驱动使能

```
Device Drivers
    Common Clock Framework--->
        [*] Clock driver for Artinchip SoC
```

#### 2.1.2. reset驱动使能

```
Device Drivers
    Reset Controller Support--->
        [*] Artinchip Reset Driver
```

### 2.2. DTS配置

#### 2.2.1. clock DTS配置

```
cmu: clock@18020000 {
        compatible = "artinchip,aic-cmu-v1.0";
        reg = <0x18020000 0x1000>;
        clocks = <&osc24m>, <&rc1m>, <&osc32k>;
        clock-names = "osc24m", "rc1m", "osc32k";
        #clock-cells = <1>;
        status = "okay";
};
```

#### 2.2.2. reset DTS配置

```
rst: reset@18020000 {
        compatible = "artinchip,aic-reset-v1.0";
        reg = <0x18020000 0x1000>;
        #reset-cells = <1>;
        status = "okay";
};
```

#### 2.2.3. 模块时钟DTS配置

各个模块的时钟和复位信号由CMU模块控制，所以各个模块需要引用各自相应的时钟和复位信号。以CIR为例说明：

```
cir: cir@19260000 {
        compatible = "artinchip,aic-cir";
        reg = <0x19260000 0x400>;
        interrupts = <GIC_SPI 63 IRQ_TYPE_LEVEL_HIGH>;
        clocks = <&cmu CLK_CIR>;
        resets = <&rst RESET_CIR>;
};
```

通过clocks属性引用CIR模块的时钟，通过resets属性引用CIR模块的复位信号。

如果模块需要两个时钟，则需要分别引用这两个时钟信号。如下图所示：

```
rgb0: rgb@18800000 {
        #address-cells = <1>;
        #size-cells = <0>;
        compatible = "artinchip,aic-rgb-v1.0";
        reg = <0x18800000 0x1000>;
        clocks = <&cmu CLK_RGB>, <&cmu CLK_SCLK>;
        clock-names = "rgb0", "sclk";
        resets = <&rst RESET_RGB>;
        reset-names = "rgb0";
};
```

可以通过clock-names属性为模块所引用的时钟命名。在查找时钟时，可以直接通过时钟名字进行查找。

## 3. 调试指南

### 3.1. 打开debugfs

内核的CCF框架中定义了一些用于调试的接口，调用这些接口，只需要打开debugfs的开关即可。SDK中默认已打开debugfs，也可以通过以下配置打开：

```
Kernel hacking--->
    Generic Kernel Debugging Instruments--->
        Debug Filesystem
            Debugfs default access(Access normal)--->
```

然后再重新编译内核

### 3.2. 挂载debugfs

内核启动后，debugfs默认是没有挂载的，可以通过以下命令挂载：

```
mount -t debugfs none /sys/kernel/debug
```

将debugfs挂载到/sys/kernel/debug

### 3.3. clock debugfs调试

#### 3.3.1. 打开debugfs目录

打开clock的debugfs目录：

```
cd /sys/kernel/debug/clk
```

所有在内核中注册的时钟都在该目录下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/clk_dir.png](https://photos.100ask.net/artinchip-docs/d213-devkit/clk_dir-17066907220255.png)

#### 3.3.2. 打印时钟树

在/sys/kernel/debug/clk目录下，存在一个结点clk_summary，可以通过该结点，打印系统的时钟树，该时钟树会显示系统中各个时钟的父子关系，频率，使能计数等信息。对于时钟驱动的调试，非常有帮助。

```
cat clk_summary
```

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/clock_tree1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/clock_tree1-17066907298097.png)

#### 3.3.3. 时钟频率查询

除了可以在时钟树中查看时钟的频率外，也可以通过各个时钟单独查询。下面以uart0为例进行说明：

在/sys/kernel/debug/clk目录下，打开uart0目录，该目录也有一系列结点，可以显示uart0时钟的各个属性。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/uart0_node.png](https://photos.100ask.net/artinchip-docs/d213-devkit/uart0_node-17066907366869.png)

可以通过如下命令查询uart0的时钟频率：

```
cat clk_rate
```

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/uart0_rate.png](https://photos.100ask.net/artinchip-docs/d213-devkit/uart0_rate-170669074226911.png)

#### 3.3.4. 设置时钟频率

默认情况下，clk_rate结点是只读的，也就是只能读取时钟频率，而不能设置频率。如果需要设置频率，那么就需要将clk_rate的属性改为读写属性。具体设置如下：

##### 3.3.4.1. 配置menuconfig

```
Kernel hacking--->
    Artinchip Debug--->
        [*] CMU driver debug
```

配置后，会生成宏CONFIG_ARTINCHIP_CMU_DEBUG，在编译时，会根据该宏在gcc的-D选项参数后定义宏CLOCK_ALLOW_WRITE_DEBUGFS。

##### 3.3.4.2. 源码修改

在源码drivers/clk/clk.c文件中，注释

```
//#undef CLOCK_ALLOW_WRITE_DEBUGFS
```

然后重新编译内核，clk_rate结点的属性即变为可读写。

##### 3.3.4.3. 设置频率

通过以下命令，设置模块的时钟频率

```
echo target-frequency > clk_rate
```

## 4. 测试指南

由于CMU提供其它模块使用的时钟和复位信号，所以该模块的驱动所提供的API接口是供其它外设模块使用的，并不会直接向用户层提供API接口。所以CMU驱动的测试也是利用CCF框架提供的debugfs生成的结点进行测试，具体的测试方式可以参考 [调试指南](3_debug_guide.html#ref-luban-cmu-debug)

## 5. 设计说明

### 5.1. 源码说明

内核的时钟驱动框架位于linux-5.10/drivers/clk目录下，CMU的底层驱动位于/drivers/clk/artinchip/目录下。

Artinchip的目录结构如下图所示：

| 文件                   | 说明                          |
| ---------------------- | ----------------------------- |
| clk-aic.h              | aic公用头文件                 |
| clk-aic.c              | CMU各个时钟的初始化，注册文件 |
| clk-disp.c             | 显示模块的时钟文件            |
| clk-fixed-parent-mod.c | 只有一个父时钟源的时钟文件    |
| clk-multi-parent-mod.c | 具有多个父时钟源的时钟文件    |
| clk-pll.c              | PLL时钟文件                   |

### 5.2. 模块架构

#### 5.2.1. clock

按照CCF框架，时钟分为六类：

- fixed rate clock
- gate clock
- divider clock
- mux clock
- fixed clock
- composite clock

时钟树中的每一个divider、gate、mux等都需要定义一个struct clk_hw结构体。CMU模块中有非常多的gate和divider，所以为了代码的简洁性和易用性，CMU的驱动并未严格按照CCF框架编写。CMU驱动模块将时钟分为五种类型：

- fixed rate clock
- fixed parent module clock
- multiple parent module clock
- display module clock
- pll clock

fixed rate clock包含OSC24M、RC1M、OSC32K三个时钟，这种时钟频率固定，不能调节频率，不能打开或关闭(即底层ops无enable和disable函数)。

fixed parent module clock实现只有一个父时钟源的时钟驱动，主要是各个外设模块的时钟，该类型时钟可以改变时钟频率，打开或关闭时钟，获取父时钟源参数，但不能设置或改变父时钟源。

multiple parent module clock实现有多个父时钟源的时钟驱动，主要是各种总线时钟，该类型的时钟最为复杂，可以打开或关闭时钟，调节频率，获取或改变父时钟源。

display module clock实现了几个与显示模块相关的时钟驱动，由于显示模块除了自身的模块时钟外，还有一个像素时钟，相应的底层寄存器的设计也不同，所以将显示相关的几个时钟重新设计了底层驱动。

pll clock实现了CMU的pll时钟驱动。

在上述的几种分类中，每中分类都自定义了一个该类型的结构体，基于该结构体实现各种时钟操作。在fixed parent module的结构体中，定义了模块的bus_gate和module_gate，以及该类型时钟的分频系数，相当于综合了CCF框架中的gate和divider。multiple parent module的结构体中定义了gate，mux以及分频系数，相当于综合了CCF框架中的gate，divider和mux。几种类型的时钟支持的API接口如下：

| 类型                  | fixed rate clock | fixed parent clock | multi parent clock | disp clock | pll clock |
| --------------------- | ---------------- | ------------------ | ------------------ | ---------- | --------- |
| clk_prepare           |                  | √                  | √                  | √          | √         |
| clk_prepare_enable    |                  |                    |                    |            |           |
| clk_unprepare         |                  | √                  | √                  | √          | √         |
| clk_disable_unprepare |                  |                    |                    |            |           |
| clk_set_rate          |                  | √                  | √                  | √          | √         |
| clk_get_rate          | √                | √                  | √                  | √          | √         |
| clk_round_rate        |                  | √                  | √                  | √          | √         |
| clk_set_parent        |                  |                    | √                  |            |           |
| clk_get_parent        |                  |                    | √                  |            |           |
| recalc_rate           | √                | √                  | √                  | √          | √         |

##### 5.2.1.1. 时钟树框图

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/clock_tree2.png](https://photos.100ask.net/artinchip-docs/d213-devkit/clock_tree2-170669082183113.png)

根据CMU驱动中对时钟的五种分类，对时钟树中各个时钟的归类进行了划分，如上图所示。

##### 5.2.1.2. fixed rate clock

属于该类型的时钟有：

![image-20240131173347354](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240131173347354.png)

##### 5.2.1.3. fixed parent clock

![image-20240131173457851](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240131173457851.png)

![image-20240131173520446](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240131173520446.png)

##### 5.2.1.4. multiple parent clock

属于该类型的时钟有：

##### 5.2.1.5. pll clock

![image-20240131173544379](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240131173544379.png)

属于该类型的时钟有：

##### 5.2.1.6. disp clock

![image-20240131173603944](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240131173603944.png)

属于该类型的时钟有：

#### 5.2.2. reset

![image-20240131173624908](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240131173624908.png)

CMU模块的reset驱动实现基于内核提供的reset framework。其实现过程是创建并填充内核提供的reset controller设备结构体(struct reset_controller_dev)，并调用相应的接口：

- reset_controller_register
- reset_controller_unregister

注册或注销。reset controller的结构体如下：

```
struct reset_controller_dev {
        const struct reset_control_ops *ops;
        struct module *owner;
        struct list_head list;
        struct list_head reset_control_head;
        struct device *dev;
        struct device_node *of_node;
        int of_reset_n_cells;
        int (*of_xlate)(struct reset_controller_dev *rcdev,
                    const struct of_phandle_args *reset_spec);
        unsigned int nr_resets;
};
```

驱动实现过程主要是对reset_control_ops结构体中的函数指针进行填充，基本上是reset驱动的所有工作量。在CMU模块的reset驱动中，实现了对assert和deassert及status三个函数指针的填充。

### 5.3. 关键流程设计

#### 5.3.1. 初始化流程

##### 5.3.1.1. clock驱动初始化

通过CLK_OF_DECLARE宏定义，CMU的clock驱动会在__clock_of_table段存放一个struct of_device_id类型的变量。在系统初始化内核时，调用of_clk_init函数，在该函数中调用相应的时钟初始化函数。初始化流程如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/clock_init.png](https://photos.100ask.net/artinchip-docs/d213-devkit/clock_init-170669088090215.png)

##### 5.3.1.2. reset驱动初始化

通过postcore_initcall宏，将reset驱动存放到.initcall2.init段中。在系统初始化内核时，调用aic_reset_init函数进行reset controller的初始化和注册。

### 5.4. 数据结构设计

CMU模块关键结构体定义如下：

#### 5.4.1. fixed_parent_clk_cfg

```
struct fixed_parent_clk_cfg {              //fixed parent clock的配置结构体
    u32 id;                            //fixed parent clock的索引值，参考3.2节CLK_xxx
    u16 type;
    u8 fact_mult;
    u8 fact_div;
    const char *name;                  //fixed parent clock的名字
    const char * const *parent_names;    //父时钟的名字
    int num_parents;                   //父时钟个数
    u32 offset_reg;                     //时钟在CMU中的偏移地址
    s8 bus_gate_bit;                    //总线使能位偏移
    s8 mod_gate_bit;                   //模块使能位偏移
    u8 div_bit;                         //分频系数偏移
    u8 div_width;                       //分频系数所占位宽
    struct clk_hw *(*func)(void __iomem *base, const struct fixed_parent_clk_cfg *cfg); //指向初始化和注册fixed parent时钟的函数指针
};
```

#### 5.4.2. multi_parent_clk_cfg

```
struct multi_parent_clk_cfg {                 //multi parent clock的配置结构体
    u32 id;                               //multi parent clock的索引值，参考3.3节CLK_xxx
    const char *name;
    const char * const *parent_names;
    int num_parents;
    u32 offset_reg;
    s32 gate_bit;
    u8 mux_bit;                          //父时钟源选择位的bit偏移
    u8 mux_width;                        //父时钟源选择位所占位宽
    u8 div0_bit;                           //分频系数偏移
    u8 div0_width;                         //分频系数所占位宽
    struct clk_hw *(*func)(void __iomem *base, const struct multi_parent_clk_cfg *cfg); //指向初始化和注册multi parent时钟的函数指针
};
```

#### 5.4.3. pll_clk_cfg

```
struct pll_clk_cfg {                          //pll时钟的配置结构体
    u32 id;                               //pll时钟的索引值，参考3.4节CLK_xxx
    enum aic_pll_type type;                 //pll时钟的类型，是整数分频还是小数分频
    const char *name;
    const char * const *parent_names;
    int num_parents;
    u32 offset_int;                         //整数分频寄存器的偏移
    u32 offset_fra;                         //小数分频寄存器的偏移
    u32 offset_sdm;                       //展频寄存器的偏移
    struct clk_hw *(*func)(void __iomem *base, const struct pll_clk_cfg *cfg); //指向初始化和注册pll时钟的函数指针
};
```

#### 5.4.4. disp_clk_cfg

```
struct disp_clk_cfg {                          //显示模块时钟配置的结构体
    u32 id;                                 //显示模块时钟的索引值，参考3.5节CLK_xxx
    const char *name;
    const char * const *parent_names;
    int num_parents;
    u32 offset_reg;                          //显示模块时钟使能寄存器
    s8 bus_gate_bit;                         //显示模块总线使能位偏移
    s8 mod_gate_bit;                        //显示模块模块使能位偏移
    u32 offset_div_reg;                      //显示模块分频寄存器偏移
    u8 divn_bit;                            //分频系数N偏移
    u8 divn_width;                         //分频系数N所占位宽
    u8 divm_bit;                           //分频系数M偏移
    u8 divm_width;                         //分频系数M所占位宽
    u8 flag_bit;                             //分频系数M标志位
    struct clk_hw *(*func)(void __iomem *base, const struct disp_clk_cfg *cfg); //指向初始化和注册显示模块时钟的函数指针
};
```

### 5.5. 接口设计

#### 5.5.1. aic_clk_hw_fixed_parent_module

| 函数原型 | struct clk_hw *aic_clk_hw_fixed_parent(void __iomem *base, const struct fixed_parent_clk_cfg *cfg) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 初始化fixed parent clock，并对时钟进行注册                   |
| 参数定义 | base：CMU寄存器的基地址cfg：指向配置参数的指针               |
| 返回值   | 返回struct clk_hw*类型的指针                                 |
| 注意事项 |                                                              |

#### 5.5.2. aic_clk_hw_multi_parent_module

| 函数原型 | struct clk_hw *aic_clk_hw_multi_parent(void __iomem *base, const struct multi_parent_clk_cfg *cfg) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 初始化multi parent clock，并对时钟进行注册                   |
| 参数定义 | base：CMU寄存器的基地址cfg：指向配置参数的指针               |
| 返回值   | 返回struct clk_hw*类型的指针                                 |
| 注意事项 |                                                              |

#### 5.5.3. aic_clk_hw_pll

| 函数原型 | struct clk_hw *aic_clk_hw_pll(void __iomem *base, const struct pll_clk_cfg *cfg) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 初始化pll clock，并对时钟进行注册                            |
| 参数定义 | base：CMU寄存器的基地址cfg：指向配置参数的指针               |
| 返回值   | 返回struct clk_hw*类型的指针                                 |
| 注意事项 |                                                              |

#### 5.5.4. aic_clk_hw_disp

| 函数原型 | struct clk_hw *aic_clk_hw_disp(void __iomem *base, const struct disp_clk_cfg *cfg) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 初始化disp clock，并对时钟进行注册                           |
| 参数定义 | base：CMU寄存器的基地址cfg：指向配置参数的指针               |
| 返回值   | 返回struct clk_hw*类型的指针                                 |
| 注意事项 |                                                              |

## 6. 常见问题