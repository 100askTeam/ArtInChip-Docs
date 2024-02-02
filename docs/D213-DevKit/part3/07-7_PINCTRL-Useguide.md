---
sidebar_position: 22
---
# PINCTRL 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语    | 定义                         | 注释说明       |
| ------- | ---------------------------- | -------------- |
| GPIO    | General Purpose Input Output | 通用输入输出   |
| GIC     | Generic Interrupt Controller | 通用中断控制器 |
| PINCTRL | Pin Controller               | pin脚控制器    |

### 1.2. 模块简介

PINCTRL模块，负责管理SOC中各个pin的状态，如驱动能力，内部是否有上下拉，gpio的输入输出，以及是否功能复用等。通过PINCTRL模块，将SOC的pin脚个数，各个pin脚可实现的功能等信息统一注册到内核中，方便系统进行统一管理。

在linux内核中，pin的功能复用由pinctrl子系统实现，gpio的输入、输出、中断功能由gpio子系统实现。而AIC的PINCTRL模块，既包括了gpio的输入输出功能，也包括了pin的功能复用。所以在驱动实现上，统一将这些功能分类整合到pinctrl子系统的框架下，即硬件gpio模块的驱动实现在pinctrl子系统下。PINCTRL驱动实际包含了3个子系统的内容：gpio子系统，pinctrl子系统，以及irqchip子系统的驱动。

## 2. PINCTRL配置

### 2.1. 内核配置

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，按如下选择：

```
Linux
    Device Drivers
        Pin controllers--->
            [*] Artinchip pin controller version1 device driver
```

### 2.2. DTS配置

#### 2.2.1. pinctrl结点DTS配置

在dtsi文件中，配置pinctrl结点：

```
pinctrl: pinctrl@19200000 {
    compatible = "artinchip,aic-pinctrl-v1.0";
    reg = <0x19200000 0x800>;
    clocks = <&cmu CLK_GPIO>;
    resets = <&rst RESET_GPIO>;
};
```

#### 2.2.2. gpio子结点DTS配置

在xxx-pinctrl.dtsi文件，配置SOC中所有功能模块的pins结点信息。以GPIOA为例说明，如下图：

```
gpio_a: bank-0 {
    interrupts-extended = <&plic0 68 IRQ_TYPE_LEVEL_HIGH>;
    gpio-controller;
    artinchip,bank-port = <0>;
    artinchip,bank-name = "PA";
    gpio-ranges = <&pinctrl 0 0 12>;
    gpio_regs = <0x0000 0x0004 0x0008 0x000C 0x0010 0x0080>;
    debounce = <1>;
    #gpio-cells = <2>;
    interrupt-controller;
    #interrupt-cells = <2>;
};
```

各属性值含义如下：

- artinchip,bank-port：GPIOA的索引值
- artinchip,bank-name：GPIOA在struct gpio_chip结构体中的名字
- gpio-ranges：第一个数值表示GPIOA的第一个pin脚在GPIOA中的索引值；第二个数值表示GPIOA的第一个pin脚在整个SOC的GPIO中的序号索引值；第三个数值表示GPIOA中pin脚的个数
- interrupt-controller：GPIOA使用中断时，把GPIOA看做是一个中断控制器

#### 2.2.3. 功能模块pin脚复用DTS配置

以uart0的引脚复用为例进行说明：

```
uart0_pins_a: uart0-0 {
    pins {
        pinmux = <AIC_PINMUX('A', 0, 5)>,
                 <AIC_PINMUX('A', 1, 5)>;
        bias-disable;
        drive-strength = <3>;
    };
};

uart0_pins_b: uart0-1 {
    pins {
        pinmux = <AIC_PINMUX('A', 2, 5)>,
                 <AIC_PINMUX('A', 3, 5)>;
        bias-disable;
        drive-strength = <3>;
    };
};
```

在xxx-pinctrl.dtsi文件中，描述了各个模块所有的pin脚配置信息，如上图。UART0有两种引脚配置，分别用uart0_pins_a和uart0_pins_b表示。pinmux属性表示的是模块所使用的的引脚配置信息，AIC_PINMUX是自定义的一个表示u32数据的宏，AIC_PINMUX(‘A’, 2, 5)表示把PA2脚配置为function 5，即可作为uart引脚。所以，uart0_pins_a使用的pin脚是PA0和PA1，uart_pins_b使用的pin脚是PA2和PA3。

#### 2.2.4. 功能模块pin脚引用DTS配置

在xxx-pinctrl.dtsi文件中，列出了所有的模块的pin脚配置信息。那么一个模块具体使用哪一组pin脚，一般是在board.dts文件中指定。在board.dts文件，各个模块的结点引用pinctrl的pin脚配置，声明本模块所使用的pin脚。如下图，uart0使用uart0_pins_a的引脚配置，即使用PA0和PA1脚。

```
&uart0 {
    pinctrl-names = "default";
    pinctrl-0 = <&uart0_pins_a>;
    status = "okay";
};
```

## 3. 调试指南

### 3.1. 调试开关

PINCTRL模块的驱动有一些dev_dbg调试信息，默认情况下是没有打开的，当需要跟踪调试时，可通过以下步骤打开这些调试信息。

#### 3.1.1. 调整log等级

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，调整内核的log等级。

```
Kernel hacking--->
    printk and dmesg options--->
        (8) Default console loglevel (1-15)
```

#### 3.1.2. 打开调试开关

```
Kernel hacking--->
    Artinchip Debug--->
        [*] Pinctrl driver debug
```

### 3.2. debugfs调试

pinctrl子系统中实现了一些调试函数，可以打印各个gpio口的配置信息，所以可以利用debugfs查看信息，辅助调试。

#### 3.2.1. 打开debugfs

SDK已默认打开了debugfs。也可以通过以下方式打开：

```
Kernel hacking--->
    Generic Kernel Debugging Instruments
        Debug Filesystem
            Debugfs default access(Access normal)--->
```

#### 3.2.2. 挂载debugfs

内核启动后，需要手动挂载debugfs：

```
mount -t debugfs none /sys/kernel/debug
```

将debugfs挂载到/sys/kernel/debug目录下。

#### 3.2.3. 查看debugfs结点

打开debugfs中pinctrl目录：

```
cd /sys/kernel/debug/pinctrl
```

可以看到该目录下有多个结点，可打印当前pinctrl各种信息，用于辅助调试。

## 4. 测试指南

```
待补充
```

## 5. 设计说明

### 5.1. 源码说明

PINCTRL模块的底层驱动位于：linux-5.10/drivers/pinctrl/artinchip/

驱动文件如下：

| 文件             | 说明                                                    |
| ---------------- | ------------------------------------------------------- |
| pinctrl-aic.h    | pinctrl公用头文件，一些结构体和宏定义                   |
| pinctrl-aic.c    | pinctrl驱动的核心文件，实现了gpio/pinctrl/irq的驱动     |
| pinctrl-aic-v1.c | pinctrl v1.0的pin脚功能列表，并将该功能列表注册到内核中 |

### 5.2. 模块架构

在linux内核中，pin脚的配置涉及到pinctrl，gpio和irqchip三个子系统。在内核子系统的划分中，pinctrl子系统用来配置pin脚的电气属性及功能复用；gpio子系统主要是GPIO的输入输出设置；同时，GPIO口使用中断时，内核将GPIO controller视为一个级联到GIC的中断控制器，又涉及到irqchip子系统的内容。

在把pin脚复用为GPIO口时，pinctrl子系统和gpio子系统具有一些功能相同的接口，所以，一些SOC厂商将gpio的驱动和pinctrl的驱动合并在了一起，PINCTRL模块的驱动实现也是采用的这种方式。所以，PINCTRL模块的驱动主要包括了三部分内容：

- 电气属性和功能复用配置
- gpio输入输出设置
- gpio controller作为irqchip的驱动实现

#### 5.2.1. pinctrl驱动

pinctrl子系统对pin controller进行了软件抽象，并由pin controller所实现的操作函数集来管理各个pin脚的属性和复用。子系统中主要的数据结构关系如下图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/pinctrl_data_struct.png](https://photos.100ask.net/artinchip-docs/d213-devkit/pinctrl_data_struct-17067578204621.png)

其相应的软件基本框架为：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/pinctrl_subsystem.png](https://photos.100ask.net/artinchip-docs/d213-devkit/pinctrl_subsystem-17067578276793.png)

pinctrl子系统的底层驱动实现，主要分为三部分：

- struct pinconf_ops函数集实现，主要用来设置pin脚的电气参数，如上下拉，驱动能力等。
- struct pinctrl_ops函数集实现，主要用来实现对DTS的解析，获取实现某一功能所需的pin脚信息。
- struct pinmux_ops函数集实现，主要用来实现功能复用，依据获取到的pin脚信息，实现底层的寄存器配置等。

#### 5.2.2. gpio驱动

常见的gpio有外挂的gpio芯片以及SOC自身的gpio控制器，linux内核将这两种gpio统一看作是gpio chip进行处理。gpio子系统整体框架如下图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/gpio_subsystem.png](https://photos.100ask.net/artinchip-docs/d213-devkit/gpio_subsystem-17067578397225.png)

gpio子系统的核心就是gpiolib。它的主要作用是：

1. 向下为gpio chip driver提供注册struct gpio_chip的接口：gpiochip_xxx()
2. 向上为gpio consumer提供引用gpio的接口：gpiod_xxx()
3. 实现字符设备的功能
4. 注册sysfs

作为SOC厂商，需要实现的驱动就是gpio chip driver部分，所以，这部分的主要工作就是实现struct gpio_chip结构体中的函数集，并注册gpio controller。

#### 5.2.3. irqchip驱动

当gpio口接收中断时，linux内核是将gpio作为一个级联到GIC上的二级中断控制器处理的。一个典型的拓扑结构如下图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/irq_arch.png](https://photos.100ask.net/artinchip-docs/d213-devkit/irq_arch-17067578473007.png)

linux内核将此时的GPIO控制器看作是一个中断控制器，用struct irq_chip进行软件抽象。所以需要实现相应的gpio中断控制器的驱动。按照irqchip子系统的框架，每一个中断线对应一个struct irq_desc结构体，该结构体包含一个handle_irq，是该中断线的high-level中断处理函数。该函数的主要作用是：打开或关闭相应中断号的中断，通知CPU中断处理完成；调用底层的中断处理函数。子系统中定义了几个不同的high-level函数，可以依据不同的中断类型和不同的中断控制器，选择不同的high-level函数。

与struct gpio_chip的驱动实现有些类似，irqchip的驱动也主要是实现struct irq_chip中的函数集。由于gpio中断控制器是一个二级中断控制器，所以驱动中需要做的工作有：

- 实现gpio中断控制器的驱动，主要工作是实现struct irq_chip中的函数集
- 实现每个gpio controller的中断线所对应的中断描述符的hand_irq，用于在gpio触发中断时查找触发中断的gpio line

### 5.3. 关键流程设计

#### 5.3.1. pin脚功能定义

在pinctrl子系统中，有function和group的概念。function是指某个具体的功能，如uart0、spi1、i2c2等。soc的几个pin脚可以构成一个group，形成特定的功能，如PA0和PA1可以组成uart0。一个function往往包含一个或多个group，例如，uart0这个function可以由PA0和PA1组成，也可以由PA2和PA3组成。pinctrl子系统就是通过function和group来确定最终需要设置的pin脚。

PINCTRL模块的驱动定义了一个结构体数组，存储每个pin脚的所有可复用功能。如下所示，PA0是该pin脚的名称，下面依次是PA0可实现的功能复用。AIC_FUNCTION(index, func_name)用来定义pin脚功能复用时所对应的索引值。即PA0作为GPIOA0时，是使用的function 1；作为uart0时，是使用的function 5。驱动中并不会区分该pin脚是uart0的RX还是TX这些细节。

```
static struct aic_desc_pin aic_pins_v1[] = {
    AIC_PIN(
        PINCTRL_PIN(0, "PA0"),
        AIC_FUNCTION(1, "GPIOA0"),
        AIC_FUNCTION(2, "GPAI0"),
        AIC_FUNCTION(3, "jtag"),
        AIC_FUNCTION(5, "uart0")
    ),
    AIC_PIN(
        PINCTRL_PIN(1, "PA1"),
        AIC_FUNCTION(1, "GPIOA1"),
        AIC_FUNCTION(2, "GPAI1"),
        AIC_FUNCTION(3, "jtag"),
        AIC_FUNCTION(5, "uart0")
    ),
    /* 此处省略其它pin脚配置 */
}
```

在pinctrl子系统中，一个group一般会包含多个pin脚。而在PINCTRL模块实现的驱动中，是将每个pin脚都看作一个group，这样做的优点是：

- 不需要再单独定义每个group的pin脚组成情况，
- 不需要再定义function与group的对应关系
- 驱动源码简单明了，由上面的数组可以快速直观的了解到每个pin脚可复用的功能

注解

按照pinctrl子系统对function和group的定义，gpio模块的uart0包含2个group，每个group包含2个pin脚，通过uart0可以找到这4个pin脚。而按照gpio模块实现的驱动，uart0包含4个group，每个group包含1个pin脚，最终通过uart0也可以找到4个pin脚。

#### 5.3.2. 初始化流程

1. 释放reset和clock
2. 调用aic_pctrl_build_state，构建function与group的关系
3. 初始化struct aic_pinctrl结构体变量
4. 注册pin controller设备
5. 调用aic_gpiolib_register_bank，注册各个gpio bank
6. 初始化完成

#### 5.3.3. 设备pinmux配置流程

在各个外设的驱动中，并没有调用与pin脚复用相关的接口，那么各个外设的pin脚复用功能是什么时候生效的呢？pin脚复用功能是如何进行初始化的？了解这个过程，有助于加深对pinctrl子系统的了解。外设的pin脚复用初始化流程如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/pinmux_initialize.png](https://photos.100ask.net/artinchip-docs/d213-devkit/pinmux_initialize-17067578801299.png)

#### 5.3.4. 中断处理流程

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/irq_flow1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/irq_flow1-170675788594411.png)

### 5.4. 数据结构设计

#### 5.4.1. aic_desc_function

```
struct aic_desc_function {
    const unsigned char num;  //pin脚功能所对应的，最终写入寄存器的索引值
    const char *name;         //pin脚对应的功能的名字
};
```

#### 5.4.2. aic_desc_pin

```
struct aic_desc_pin {
    struct pinctrl_pin_desc pin;                //pin脚的描述符
    const struct aic_desc_function *functions;  //该pin脚所能设置的功能列表
};
```

#### 5.4.3. aic_pinctrl_group

```
struct aic_pinctrl_group {
    const char *name;       //group名字
    u32 config;             //pin脚的配置参数
    u32 pin;                //pin脚索引值
};
```

#### 5.4.4. aic_pinctrl_function

```
struct aic_pinctrl_function {
    const char *name;       //function名字
    const char **groups;    //function所对应的所有group列表
    u32 ngroups;            //function所对应的group个数
};
```

#### 5.4.5. aic_gpio_bank

```
struct aic_gpio_bank {
    u32 bank_nr;        //gpio port索引值，GPIOA为0,GPIOB为1…
    int irq;
    u32 saved_mask;
    spinlock_t lock;
    struct gpio_chip gpio_chip;         //gpio port的gpio_chip结构
    struct pinctrl_gpio_range range;    //该gpio port的range范围
    struct irq_domain *domain;          //转换hwirq到irq的结构体指针
    struct aic_gpio_regs regs;          //GPIO控制器的寄存器
    struct aic_pinctrl *pctl;
};
```

#### 5.4.6. aic_pinctrl

```
struct aic_pinctrl {
    void __iomem *base;
    struct device *dev;
    struct pinctrl_dev *pctl_dev;
    struct pinctrl_desc pctl_desc;
    struct aic_pinctrl_group *groups;       //pin controller包含的group列表
    u32 ngroups;                            //pin controller包含的group个数
    const char **grp_names;                 //pin controller包含的group名字
    struct aic_pinctrl_function     *functions; //pin controller包含的functions列表
    u32 nfunctions;                         //pin controller包含的functions个数
    struct aic_gpio_bank *banks;            //pin controller包含的gpio bank列表
    u32 nbanks;                             //pin controller包含的gpio bank个数
    struct aic_desc_pin *pins;              //pin controller包含的pin列表
    u32 npins;                              //pin controller包含的pin个数
    struct reset_control *reset;
    struct clk *clk;
};
```

### 5.5. 接口设计

#### 5.5.1. aic_pconf_group_get

| 函数原型 | static int aic_pconf_group_get(struct pinctrl_dev *pctldev, unsigned group, unsigned long *config) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 从pin controller的groups数组中，获取索引值为group的配置参数  |
| 参数定义 | pctldev：pin controller设备group：索引值config：指向获取到的pctldev->groups[group]配置参数 |
| 返回值   | 0                                                            |
| 注意事项 |                                                              |

#### 5.5.2. aic_pctrl_dt_node_to_map
```
| 函数原型 | static int aic_pctrl_dt_node_to_map(struct pinctrl_dev *pctldev, struct device_node *node,struct pinctrl_map **map, unsigned *num_maps) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 解析pinctrl结点的子结点，并将各个子结点的参数转换为struct pinctrl_map的结构存储 |
| 参数定义 | pctldev：pin controller设备node：pin controller的DTS结点map：指向动态申请的类型为struct pinctrl_map *的数组，存储各个子结点配置参数num_maps：struct pinctrl_map *数组中存储的个数 |
| 返回值   | 0：执行成功<0：执行错误                                      |
| 注意事项 |                                                              |
```
#### 5.5.3. aic_pctrl_get_groups_count

| 函数原型 | static int aic_pctrl_get_groups_count(struct pinctrl_dev *pctldev) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 获取pin controller中的group个数                              |
| 参数定义 | pctldev：pin controller设备指针                              |
| 返回值   | 返回group个数                                                |
| 注意事项 |                                                              |

#### 5.5.4. aic_pctrl_get_group_name

| 函数原型 | static const char *aic_pctrl_get_group_name(struct pinctrl_dev *pctldev, unsigned group) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 根据索引值group，获取相应group的名字                         |
| 参数定义 | pctldev：pin controller设备指针group：指向pctldev->groups数组元素的索引值 |
| 返回值   | 返回相应的group的名字                                        |
| 注意事项 |                                                              |

#### 5.5.5. aic_pctrl_get_group_pins

| 函数原型 | static int aic_pctrl_get_group_pins(struct pinctrl_dev *pctldev,unsigned group,const unsigned **pins, unsigned *num_pins) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 获取group所对应的pin脚信息                                   |
| 参数定义 | pctldev：pin controller设备指针group：指向pctldev->groups数组元素的索引值pins：指向用来存储pin脚信息的数组num_pins：该group所包含的pin脚个数 |
| 返回值   | 0                                                            |
| 注意事项 |                                                              |

#### 5.5.6. aic_pmx_get_funcs_cnt

| 函数原型 | static int aic_pmx_get_funcs_cnt(struct pinctrl_dev *pctldev) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 获取pin controller中的function个数                           |
| 参数定义 | pctldev：pin controller设备指针                              |
| 返回值   | 返回function个数                                             |
| 注意事项 |                                                              |

#### 5.5.7. aic_pmx_get_func_name

| 函数原型 | static const char *aic_pmx_get_func_name(struct pinctrl_dev *pctldev, unsigned function) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 在pin controller的功能数组中，获取索引值为function的功能的名字 |
| 参数定义 | pctldev：pin controller设备指针function：功能的索引值        |
| 返回值   | 返回function所对应的功能的名字                               |
| 注意事项 |                                                              |

#### 5.5.8. aic_pmx_get_func_groups

| 函数原型 | static int aic_pmx_get_func_groups(struct pinctrl_dev *pctldev, unsigned function,const char * const **groups, unsigned * const num_groups) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 在pin controller的所有功能的数组中，获取索引值为function的功能的所有group |
| 参数定义 | pctldev：pin controller设备指针function：功能的索引值groups：指向用来存储该功能所对应的所有group的数组num_groups：该功能所对应的group的个数 |
| 返回值   | 0                                                            |
| 注意事项 |                                                              |

#### 5.5.9. aic_pmx_set_mux
```
| 函数原型 | static int aic_pmx_set_mux(struct pinctrl_dev *pctldev, unsigned function, unsigned group) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 根据索引值function和group，设置功能复用                      |
| 参数值   | pctldev：pin controller设备指针function：功能的索引值group：group索引值 |
| 返回值   | 0：执行成功 <0：执行错误                                     |
| 注意事项 |                                                              |
```
#### 5.5.10. aic_pmx_gpio_set_direction

| 函数原型 | static int aic_pmx_gpio_set_direction(struct pinctrl_dev *pctldev,struct pinctrl_gpio_range *range, unsigned gpio, bool input) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 设置gpio口的输入输出方向                                     |
| 参数定义 | pctldev：pin controller设备指针range：每个gpio port的范围gpio：所设置的pin脚在range内的偏移input：指示是否设置为输入 |
| 返回值   | 0                                                            |
| 注意事项 |                                                              |

#### 5.5.11. aic_gpio_get

| 函数原型 | static int aic_gpio_get(struct gpio_chip *chip, unsigned offset) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 获取gpio口的值                                               |
| 参数定义 | chip：指向每个gpio port的指针offset                          |
| 返回值   | 返回该pin脚的高低电平值                                      |
| 注意事项 |                                                              |

#### 5.5.12. aic_gpio_set

| 函数原型 | static void aic_gpio_set(struct gpio_chip *chip, unsigned offset, int value) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 将偏移为offset的gpio口的值设置为value                        |
| 参数定义 | chip：指向每个gpio port的指针offset                          |
| 返回值   | 无                                                           |
| 注意事项 |                                                              |

#### 5.5.13. aic_gpio_direction_input
```
| 函数原型 | static int aic_gpio_direction_input(struct gpio_chip *chip, unsigned offset) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 设置gpio口为输入                                             |
| 参数定义 | chip：指向每个gpio port的指针offset                          |
| 返回值   | 0：执行成功 <0：执行错误                                     |
| 注意事项 |                                                              |
```
#### 5.5.14. aic_gpio_direction_output
```
| 函数原型 | static int aic_gpio_direction_output(struct gpio_chip *chip, unsigned offset, int value) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 设置gpio口为输出，且输出值为value                            |
| 参数定义 | chip：指向每个gpio port的指针offsetvalue：设置的输出值       |
| 返回值   | 0：执行成功 <0：执行错误                                     |
| 注意事项 |                                                              |
```
#### 5.5.15. aic_gpio_irq_mask

| 函数原型 | static void aic_gpio_irq_mask(struct irq_data *d) |
| -------- | ------------------------------------------------- |
| 功能说明 | 屏蔽gpio口的中断                                  |
| 参数定义 | d：指向struct irq_data的指针                      |
| 返回值   | 无                                                |
| 注意事项 |                                                   |

#### 5.5.16. aic_gpio_irq_unmask

| 函数原型 | static void aic_gpio_irq_unmask(struct irq_data *d) |
| -------- | --------------------------------------------------- |
| 功能说明 | 打开gpio口的中断                                    |
| 参数定义 | d：指向struct irq_data的指针                        |
| 返回值   | 无                                                  |
| 注意事项 |                                                     |

#### 5.5.17. aic_gpiolib_register_bank
```
| 函数原型 | static int aic_gpiolib_register_bank(struct aic_pinctrl *pctl, struct device_node *np) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 打开gpio口的中断                                             |
| 参数定义 | pctl：pin controller设备指针np：pin controller的DTS结点      |
| 返回值   | 0：执行成功<0：执行错误                                      |
| 注意事项 |                                                              |
```
## 6. 常见问题