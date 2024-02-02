---
sidebar_position: 3
---
# DMA 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语 | 定义                 | 注释说明          |
| ---- | -------------------- | ----------------- |
| DMA  | Direct Memory Access | 直接存储器访问    |
| DRQ  | DMA Request          | 指DMA请求的端口号 |

### 1.2. 模块简介

DMA 模块允许总线上的不同设备间的数据自动直接传输，最大优点是可减少CPU负载，并且具有高带宽、低延迟的特性。

DMA 模块的功能特性：

- 支持8个DMA通道，每通道有32个源端和32个终端可选
- 采用链表配置方式，寄存器描述通道状态
- 设备位宽支持8/16/32/64位，Burst长度支持1/4/8/16个
- DMA 源端、终端地址 8Byte 对齐

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/hw_system10.png](https://photos.100ask.net/artinchip-docs/d213-devkit/hw_system10-170669106435917.png)

图 4.5 *DMA 硬件的原理框图*

从上图中可以看出，根据数据的源、目的可以将DMA操作分为以下3种情况：

|      | 内核中类型定义 | 含义                                                      |
| ---- | -------------- | --------------------------------------------------------- |
| 1    | DMA_MEM_TO_MEM | 从内存到内存（包括DRAM、SRAM），可看作memcpy()的硬件加速  |
| 2    | DMA_MEM_TO_DEV | 从内存到设备，支持DMA操作的设备一般需要提供握手信号、FIFO |
| 3    | DMA_DEV_TO_MEM | 从设备到内存，是情况2的逆操作                             |
| 4    | DMA_DEV_TO_DEV | 从设备到设备，这种比较少用                                |

表中的类型定义详见Linux代码：include/linux/dmaengine.h

注解

USB、GMAC、eMMC等模块都有自己内置的DMA，为了区分开，所以有时候也将本 模块称作 “通用 DMA” 模块。

## 2. 参数配置

### 2.1. 内核配置

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，按如下选择：

```
Linux
    Device Drivers
        [*] DMA Engine support
            <*>   Artinchip SoCs DMA support
```

### 2.2. DTS 参数配置

#### 2.2.1. D211 配置

common/d211.dtsi中的参数配置：

```
dma: dma-controller@10000000 {
    compatible = "artinchip,aic-dma-v1.0";
    reg = <0x0 0x10000000 0x0 0x1000>;
    interrupts-extended = <&plic0 32 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cmu CLK_DMA>;
    resets = <&rst RESET_DMA>;
    #dma-cells = <1>;
    status = "okay";
};
```

#### 2.2.2. 引用DMA通道

使用DMA进行数据传输的模块，可以通过DTS来配置。以SPI为例，要配置RX、TX对应的DMA端口号（DRQ Port）：

```
spi0: spi@10400000 {
    compatible = "artinchip,aic-spi-v1.0";
    reg = <0x10400000 0x1000>;
    interrupts = <GIC_SPI 12 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cmu CLK_SPI0>;
    resets = <&rst RESET_SPI0>;
    dmas = <&dma DMA_SPI0>, <&dma DMA_SPI0>;
    dma-names = "rx", "tx";
    #address-cells = <1>;
    #size-cells = <0>;
    spi-max-frequency = <24000000>;
};
```

其中端口号 DMA_SPI0 的定义见 U-Boot中代码 include/dt-bindings/dma/d211-dma.h

```
#define DMA_SRAM   0
#define DMA_DRAM   1
#define DMA_SPI0   10
#define DMA_SPI1   11
#define DMA_I2S0   12
#define DMA_I2S1   13
#define DMA_CODEC  14
#define DMA_UART0  16
#define DMA_UART1  17
#define DMA_UART2  18
#define DMA_UART3  19
#define DMA_UART4  20
#define DMA_UART5  21
#define DMA_UART6  22
#define DMA_UART7  23
```

注解

DMA端口号的宏定义仅在DTS编译过程中用到，我们的DTS编译过程是放在U-Boot编译中，所以将这些宏定义放在U-Boot。

## 3. 调试指南

### 3.1. 调试开关

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，可以打开DMA模块的DEBUG选项：

```
Linux
    Kernel hacking
        [*] DMA Engine support
            [*]   DMA Engine debugging
            [*]     DMA Engine verbose debugging
```

此DEBUG选项打开的影响：

1. DMA 子系统的pr_dbg()和dev_dbg()调试信息会被编译
2. DMA 子系统的Verbose debug信息也会被打开编译

在系统运行时，如果要打印pr_dbg()和dev_dbg()信息，还需要调整loglevel为8，两个方法：

1. 在board.dts中修改bootargs，增加“loglevel=8”
2. 在板子启动到Linux shell后，执行命令：

```
echo 8 > /proc/sys/kernel/printk
```

## 4. 测试指南

### 4.1. 测试环境

#### 4.1.1. 硬件

- 开发板，或FPGA板

#### 4.1.2. 软件

- PC端的串口终端软件，用于PC和开发板进行串口通信
- Linux内核原生的dmatest模块

#### 4.1.3. 软件配置

##### 4.1.3.1. dmttest

dmatest是 Linux 内核中原生的一个模块，在luban的根目录下通过make kernel-menuconfig，按如下选择：

```
Linux
    Device Drivers
        [*] DMA Engine support
             <*>   DMA Test client
```

注解

dmatest模块只限于测试 Mem To Mem 的数据传输操作。



### 4.2. dmatest 测试

dmatest模块初始化成功后，会在Sysfs目录创建一些节点，测试过程就是通过这些节点配置参数、启动测试。

```
[aic@] # cd /sys/module/dmatest/parameters/
[aic@parameters] # ls
alignment         max_channels      run               transfer_size
channel           norandom          test_buf_size     verbose
device            noverify          test_list         wait
dmatest           polled            threads_per_chan  xor_sources
iterations        pq_sources        timeout

[aic@parameters] # echo 30 > iterations
[aic@parameters] # echo 8 > max_channels
[aic@parameters] # echo Y > polled
[aic@parameters] # echo Y > run
[  104.696480] dmatest: No channels configured, continue with any
[  104.697377] dmatest: Added 1 threads using dma0chan2
[  104.698061] dmatest: Added 1 threads using dma0chan3
[  104.698695] dmatest: Added 1 threads using dma0chan4
[  104.699334] dmatest: Added 1 threads using dma0chan5
[  104.699964] dmatest: Added 1 threads using dma0chan6
[  104.700599] dmatest: Added 1 threads using dma0chan7
[  104.701248] dmatest: Added 1 threads using dma0chan8
[  104.701883] dmatest: Added 1 threads using dma0chan9
[  104.702328] dmatest: Started 1 threads using dma0chan2
[  104.702776] dmatest: Started 1 threads using dma0chan3
[  104.703223] dmatest: Started 1 threads using dma0chan4
[  104.703671] dmatest: Started 1 threads using dma0chan5
[  104.704118] dmatest: Started 1 threads using dma0chan6
[  104.704564] dmatest: Started 1 threads using dma0chan7
[  104.705011] dmatest: Started 1 threads using dma0chan8
[  104.705457] dmatest: Started 1 threads using dma0chan9
[  105.006038] dmatest: dma0chan4-copy0: summary 30 tests, 0 failures 106.28 iops 836 KB/s (0)
[  105.306046] dmatest: dma0chan2-copy0: summary 30 tests, 0 failures 106.58 iops 884 KB/s (0)
[  105.606055] dmatest: dma0chan3-copy0: summary 30 tests, 0 failures 106.60 iops 1044 KB/s (0)
[  105.906057] dmatest: dma0chan5-copy0: summary 30 tests, 0 failures 106.59 iops 835 KB/s (0)
[  106.206050] dmatest: dma0chan6-copy0: summary 30 tests, 0 failures 106.59 iops 792 KB/s (0)
[  106.506034] dmatest: dma0chan7-copy0: summary 30 tests, 0 failures 106.61 iops 856 KB/s (0)
[  106.806048] dmatest: dma0chan8-copy0: summary 30 tests, 0 failures 107.64 iops 843 KB/s (0)
[  107.106044] dmatest: dma0chan9-copy0: summary 30 tests, 0 failures 106.81 iops 993 KB/s (0)
```

## 5. 设计说明

### 5.1. 源码说明

源代码位于：drivers/dma/artinchip-dma.c

### 5.2. 模块架构

Linux提供了一个 DMA Engine 子系统，可封装不同类型的 DMA控制器驱动，便于实现 DMA 用户对硬件细节的透明。

DMA Engine的软件框架如下图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/sw_system20.png](https://photos.100ask.net/artinchip-docs/d213-devkit/sw_system20-170669128264719.png)

图 4.6 *Linux DMA Engine子系统架构图*[¶](#id15)

图中可以看到DMA Engine中有几个概念：

- DMA Device

  对应物理上的一个DMA Controller。DMA Driver需要提供DMA Controller的一些属性、接口，然后注册为一个DMA Device，供后续DMA Engine框架来调用。支持注册多个DMA Device，会使用一个链表 dma_device_list 来进行管理。

- DMA channel

  和物理上的一个DMA通道（如图中DMA Controller的Chx）一一对应。这些通道也是通过一个链表进行管理，归属于某一个DMA Device。

- VC（Virtual channel）

  基于物理的DMA通道，DMA Engine提供了一种虚拟的通道概念VC，VC数目往往多于物理通道数，比如VC有48个而物理通道只有8个，这样可以提供一个动态的物理通道分配机制。

- DMA Client

  指DMA模块的使用者，DMA用户仅限内核中的其他模块，如SPI、Audio Codec、UART等，暂未提供用户态的使用接口。

### 5.3. 关键流程设计

#### 5.3.1. 初始化流程

DMA驱动的初始化过程见aic_dma_probe()函数，除了普通platform设备的处理过程（申请regs资源、clk、reset）外，需要调用DMA子系统的接口dma_async_device_register()来注册DMA备。

```
int dma_async_device_register(struct dma_device *device)
```

其中参数struct dma_device 需要提供的关键信息有：DMA控制器能力描述、DMA操作API等，其初始化内容如下：

```
/* 配置 DMA 控制器的能力描述信息 */
if (of_device_is_compatible(pdev->dev.of_node,
                "artinchip,aic-dma-v0.1"))
    sdev->slave.copy_align = DMAENGINE_ALIGN_128_BYTES;
else
    sdev->slave.copy_align = DMAENGINE_ALIGN_8_BYTES;
sdev->slave.src_addr_widths = AIC_DMA_BUS_WIDTH;
sdev->slave.dst_addr_widths = AIC_DMA_BUS_WIDTH;
sdev->slave.directions = BIT(DMA_DEV_TO_MEM) | BIT(DMA_MEM_TO_DEV);
sdev->slave.residue_granularity = DMA_RESIDUE_GRANULARITY_BURST;

INIT_LIST_HEAD(&sdev->slave.channels);

dma_cap_set(DMA_PRIVATE, sdev->slave.cap_mask);
dma_cap_set(DMA_MEMCPY, sdev->slave.cap_mask);
dma_cap_set(DMA_SLAVE, sdev->slave.cap_mask);
dma_cap_set(DMA_CYCLIC, sdev->slave.cap_mask);

/* 初始化 DMA 操作 API */
sdev->slave.device_free_chan_resources = aic_dma_free_chan_resources;
sdev->slave.device_prep_dma_memcpy = aic_dma_prep_dma_memcpy;
sdev->slave.device_prep_slave_sg = aic_dma_prep_slave_sg;
sdev->slave.device_prep_dma_cyclic = aic_dma_prep_dma_cyclic;

sdev->slave.device_config = aic_dma_config;
sdev->slave.device_pause = aic_dma_pause;
sdev->slave.device_resume = aic_dma_resume;
sdev->slave.device_terminate_all = aic_dma_terminate_all;
sdev->slave.device_tx_status = aic_dma_tx_status;
sdev->slave.device_issue_pending = aic_dma_issue_pending;
sdev->slave.device_release = aic_dma_device_release;
```

其中，DMA控制器的能力特性含义如下：

| 能力特性    | 含义                     |
| ----------- | ------------------------ |
| DMA_PRIVATE | 不支持异步传输           |
| DMA_MEMCPY  | 支持内存到内存的拷贝操作 |
| DMA_SLAVE   | 支持设备到内存的传输操作 |
| DMA_CYCLIC  | 支持循环Buffer的情况     |

#### 5.3.2. DMA Client 的调用流程

作为DMA 用户，调用流程如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/client_flow1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/client_flow1-170669130448321.png)

图 4.7 *Linux DMA Client调用流程*

其中有两个操作的概念需要注意：

- submit，是指传输请求提交给了DMA Engine的缓存中，还没有开始传输数据
- issue pending，将传输请求加入到DMA Device的请求队列中，接下来才会启动数据传输动作

#### 5.3.3. 中断处理流程

中断处理流程相对简单：

1. 逐个DMA通道的查看完成状态；
2. 如果当前传输是循环Buffer的情况，则直接调用预先注册好的回调接口；
3. 如果不是循环模式，则更新相应的通道状态为Complete。

### 5.4. 数据结构设计

#### 5.4.1. aic_dma_dev

记录DMA控制器的配置信息：

```
struct aic_dma_dev {
    void __iomem *base;
    int irq;
    u32 num_pchans;
    u32 num_vchans;
    u32 max_request;

    struct clk *clk;
    struct reset_control *reset;

    spinlock_t lock;
    struct dma_pool *pool;
    struct aic_pchan *pchans;
    struct aic_vchan *vchans;
    const struct aic_dma_inf *dma_inf;
    struct dma_device slave;
};
```

#### 5.4.2. aic_dma_inf

记录DMA控制器的一些特性，如通道数、端口数、Burst长度、地址宽度，这些特性会因不同SoC而不同，所以此数据结构会用在 of_device_id 中的私有数据，配合 compatible 来区分不同的SoC。

```
struct aic_dma_inf {
    u8 nr_chans; /* count of dma physical channels */
    u8 nr_ports; /* count of dma drq prots */
    u8 nr_vchans; /* total valid transfer types */

    u32 burst_length; /* burst length capacity */
    u32 addr_widths; /* address width support capacity */
};
```

#### 5.4.3. DMA 通道信息

由 [模块架构](#ref-dma-engine) 可知 DMA物理通道 和 DMA虚拟通道 是一对多的关系，所以在设计中它们互相都需要在记录好对方的数据引用指针。

##### 5.4.3.1. DMA 物理通道信息

记录了一个 DMA 物理通道对应的通道号、寄存器基地址、对应的虚拟通道指针等：

```
struct aic_pchan {
    u32 id; /* DMA channel number */
    void __iomem *base; /* DMA channel control registers */
    struct aic_vchan *vchan; /* virtual channel info */
};
```

##### 5.4.3.2. DMA 虚拟通道信息

记录了一个 DMA 虚拟通道对应的DRQ端口号、传输类型、对应的物理通道指针等：

```
struct aic_vchan {
    u8 port; /* DRQ port number */
    u8 irq_type; /* IRQ types */
    bool cyclic; /* flag to mark if cyclic transfer one package */
    struct aic_pchan *pchan; /* physical DMA channel */
    struct aic_desc *desc; /* current transfer */

    /* parameter for dmaengine */
    struct virt_dma_chan vc;
    struct dma_slave_config cfg;
    enum dma_status status;
};
```

#### 5.4.4. DMA 描述符

DMA 控制器支持散列（Scatter Gather）的描述符参数形式，需要提前将参数分组（一个Buffer对应一组散列参数）打包到多个描述符中，这些描述符会组成一个链表，然后将这个链表的第一个描述符的物理地址传给DMA控制器。描述符组成的链表结构如下图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/dma_task1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/dma_task1-170669135135423.png)

图 4.8 *DMA 描述符链表的结构示意图*

小技巧

`End Flag` 是DMA控制器硬件预先定义好的一个数值：0xfffff800。

DMA 描述符的数据结构定义如下：

```
struct aic_dma_task {
    u32 cfg;    /* DMA transfer configuration */
    u32 src;    /* source address of one transfer package */
    u32 dst;    /* destination address of one transfer package */
    u32 len;    /* data length of one transfer package */
    u32 delay;  /* time delay for period transfer */
    u32 p_next; /* next task node for DMA controller */
    u32 mode;   /* the negotiation mode */

    /*
     * virtual list for driver maintain package list,
     * not used by DMA controller
     */
    struct aic_dma_task *v_next;

};
```

### 5.5. 接口设计

以下接口是 Linux DMA Engine 子系统的标准接口。

#### 5.5.1. aic_dma_config

| 函数原型 | static int aic_dma_config(struct dma_chan *chan, struct dma_slave_config *config) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 配置指定的DMA物理通道                                        |
| 参数定义 | chan - 指向一个DMA物理通道config - 保存了需要的配置信息      |
| 返回值   | 0，成功                                                      |
| 注意事项 |                                                              |

#### 5.5.2. aic_dma_pause

| 函数原型 | static int aic_dma_pause(struct dma_chan *chan) |
| -------- | ----------------------------------------------- |
| 功能说明 | 暂停指定通道的传输操作                          |
| 参数定义 | chan - 指向一个DMA物理通道                      |
| 返回值   | 0，成功                                         |
| 注意事项 |                                                 |

#### 5.5.3. aic_dma_resume

| 函数原型 | static int aic_dma_resume(struct dma_chan *chan) |
| -------- | ------------------------------------------------ |
| 功能说明 | 恢复指定通道的传输操作                           |
| 参数定义 | chan - 指向一个DMA物理通道                       |
| 返回值   | 0，成功                                          |
| 注意事项 |                                                  |

#### 5.5.4. aic_dma_prep_dma_memcpy

| 函数原型 | static struct dma_async_tx_descriptor *aic_dma_prep_dma_memcpy(struct dma_chan *chan,dma_addr_t dest, dma_addr_t src,size_t len, unsigned long flags) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | memcpy操作的预处理                                           |
| 参数定义 | chan - 指向一个DMA物理通道dest - 目标Buffer的物理地址src - 源Buffer的物理地址len - 数据长度flags - 一些标记 |
| 返回值   | 成功，则返回一个DMA描述符；失败，返回NULL                    |
| 注意事项 |                                                              |

#### 5.5.5. aic_dma_prep_slave_sg

| 函数原型 | static struct dma_async_tx_descriptor *aic_dma_prep_slave_sg(struct dma_chan *chan,struct scatterlist *sgl, unsigned int sg_len,enum dma_transfer_direction dir, unsigned long flags,void *context) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 设备与内存之间传输操作的预处理                               |
| 参数定义 | chan - 指向一个DMA物理通道sgl - 指向一个散列列表sg_len - 散列中的数据长度dir - 传输方向，是 Dev to Mem，还是 Mem to Devflags - 一些标记context - 指向一些私有的上下文信息 |
| 返回值   | 成功，则返回一个DMA描述符；失败，返回NULL                    |
| 注意事项 |                                                              |

#### 5.5.6. aic_dma_prep_dma_cyclic

| 函数原型 | static struct dma_async_tx_descriptor *aic_dma_prep_dma_cyclic(struct dma_chan *chan,dma_addr_t buf_addr, size_t buf_len, size_t period_len,enum dma_transfer_direction dir, unsigned long flags) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | （设备与内存之间）循环传输操作的预处理                       |
| 参数定义 | chan - 指向一个DMA物理通道buf_addr - 循环Buffer的起始物理地址buf_len - 循环Buffer的总长度period_len - 循环的Buffer片段长度dir - 传输方向，是 Dev to Mem，还是 Mem to Devflags - 一些标记 |
| 返回值   | 成功，则返回一个DMA描述符；失败，返回NULL                    |
| 注意事项 |                                                              |

#### 5.5.7. aic_dma_issue_pending

| 函数原型 | static void aic_dma_issue_pending(struct dma_chan *chan) |
| -------- | -------------------------------------------------------- |
| 功能说明 | 启动指定通道的数据传输                                   |
| 参数定义 | chan - 指向一个DMA物理通道                               |
| 返回值   | 无                                                       |
| 注意事项 |                                                          |

#### 5.5.8. aic_dma_terminate_all

| 函数原型 | static int aic_dma_terminate_all(struct dma_chan *chan) |
| -------- | ------------------------------------------------------- |
| 功能说明 | 终止所有通道的数据传输                                  |
| 参数定义 | chan - 指向一个DMA物理通道                              |
| 返回值   | 0，成功                                                 |
| 注意事项 |                                                         |

### 5.6. Demo

SPI 驱动（详见drivers/spi/spi-artinchip.c）中调用了DMA进行数据传输，其使用过程可以当作Demo参考：

#### 5.6.1. DMA 通道的申请

```
static int aic_spi_probe(struct platform_device *pdev)
{
    ...

    aicspi->dma_rx = dma_request_slave_channel(aicspi->dev, "rx");
    if (!aicspi->dma_rx)
        dev_warn(aicspi->dev, "failed to request rx dma channel\n");

    aicspi->dma_tx = dma_request_slave_channel(aicspi->dev, "tx");
    if (!aicspi->dma_tx)
        dev_warn(aicspi->dev, "failed to request tx dma channel\n");

    ...
}
```

#### 5.6.2. DMA 数据提交

```
static int aic_spi_dma_rx_cfg(struct aic_spi *aicspi, struct spi_transfer *t)
{
    struct dma_async_tx_descriptor *dma_desc = NULL;
    struct dma_slave_config dma_conf = {0};

    dma_conf.direction = DMA_DEV_TO_MEM;
    dma_conf.src_addr = aicspi->dma_addr_rx;
    dma_conf.src_addr_width = DMA_SLAVE_BUSWIDTH_1_BYTE;
    dma_conf.dst_addr_width = DMA_SLAVE_BUSWIDTH_1_BYTE;
    dma_conf.src_maxburst = 1;
    dma_conf.dst_maxburst = 1;
    dmaengine_slave_config(aicspi->dma_rx, &dma_conf);

    dma_desc = dmaengine_prep_slave_sg(aicspi->dma_rx, t->rx_sg.sgl,
                       t->rx_sg.nents, dma_conf.direction,
                       DMA_PREP_INTERRUPT | DMA_CTRL_ACK);
    if (!dma_desc) {
        dev_err(aicspi->dev, "spi-%d prepare slave sg failed.\n",
            aicspi->ctlr->bus_num);
        return -EINVAL;
    }

    dma_desc->callback = aic_spi_dma_cb_rx;
    dma_desc->callback_param = (void *)aicspi;
    dmaengine_submit(dma_desc);

    return 0;
}
```

#### 5.6.3. 启动 DMA 数据传输

```
static int aic_spi_dma_rx_start(struct spi_device *spi, struct spi_transfer *t)
{
    struct aic_spi *aicspi = spi_controller_get_devdata(spi->master);
    int ret = 0;

    spi_ctlr_dma_rx_enable(aicspi->base_addr);
    ret = aic_spi_dma_rx_cfg(aicspi, t);
    if (ret < 0)
        return ret;
    dma_async_issue_pending(aicspi->dma_rx);

    return ret;
}
```

## 6. 常见问题

### 6.1. dmatest 时verify数据报错

#### 6.1.1. 现象

当运行dmatest测试时，错误log类似如下：

```
[  381.878419] dmatest: dma0chan5-copy0: dstbuf[0x3f70] mismatch! Expected cf, got d7
[  381.885999] dmatest: dma0chan5-copy0: dstbuf[0x3f71] mismatch! Expected ce, got d6
[  381.893611] dmatest: dma0chan5-copy0: dstbuf[0x3f72] mismatch! Expected cd, got d5
[  381.901199] dmatest: dma0chan5-copy0: dstbuf[0x3f73] mismatch! Expected cc, got d4
[  381.908783] dmatest: dma0chan5-copy0: dstbuf[0x3f74] mismatch! Expected cb, got d3
[  381.916350] dmatest: dma0chan5-copy0: dstbuf[0x3f75] mismatch! Expected ca, got d2
```

#### 6.1.2. 原因分析

dmatest的默认配置是需要verify测试数据的。

当进行多通道（max_channels>1）测试时，必须要使能polled属性，以保证通道的测试过程是串行的，否则会报verify错误。

设置polled属性的方法见 [dmatest 测试]