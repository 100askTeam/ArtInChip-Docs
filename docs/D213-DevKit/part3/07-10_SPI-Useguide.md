---
sidebar_position: 25
---
# SPI 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语     | 定义                             | 注释说明            |
| -------- | -------------------------------- | ------------------- |
| SPI      | Serial Peripheral Interface      | 串行外设接口        |
| Dual SPI | Dual Serial Peripheral Interface | 双路 SPI            |
| Quad SPI | Quad Serial Peripheral Interface | 四路 SPI，又称 QSPI |
| CPOL     | Clock polarity                   | 时钟极性            |
| CPHA     | Clock phase                      | 时钟相位            |

### 1.2. 模块简介

SPI (Serial Peripheral Interface) 最初是 Motorola 提出的4线同步串行数据传输接口， 是一种高速、全双工的同步通信总线。由于其实现比较简单，没有专利限制等，因此在各种器件中得到广泛的应用。 SPI 总线是一种行业事实标准，并没有统一的标准化组织，不同厂商在实际应用中演化出多种工作模式。

SPI 总线接口的应用领域：

> - 存储设备：Flash、SD、MMC、EEPROM 等
> - 传感器：温度传感器、压力传感器等
> - ADC/DAC
> - Audio Codec
> - LCD 显示屏幕
> - 触摸屏幕
> - RTC
> - 数字电位计
> - 游戏控制器等

Artinchip SPI 支持：

> - 全双工、半双工模式
> - DMA 读写模式
> - CPU 读写模式
> - 最高工作频率 100MHz
> - 支持四线制模式：标准4线 SPI、DUAL SPI、QUAD SPI
> - 支持三线制模式
> - 数据位传输的模式可配置，CPOL 和 CPHA

#### 1.2.1. 标准4线 SPI

这是一种四线制的 SPI 连接和工作模式。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/4line_standard_spi1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/4line_standard_spi1-17067597242851.png)

图 7.35 *四线制标准 SPI*

#### 1.2.2. DUAL SPI

主机端的 MISO 为 SIO0, MOSI 为 SIO1，常用于 SPI Flash。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/dual_spi1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/dual_spi1-17067597468443.png)

图 7.36 *四线制 DUAL SPI*

#### 1.2.3. QUAD SPI

主机端的 MOSI 为 IO0, MISO 为 IO1, WP 为 IO2, HOLD 为 IO3，常用于 SPI Flash。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/quad_spi1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/quad_spi1-17067597902475.png)

图 7.37 *四线制 QUAD SPI*

#### 1.2.4. 三线制 SPI

三线制 SPI 常用于工业控制类场景。这种接线方式，主机端使用 MOSI 作为 DIO。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/3line_spi1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/3line_spi1-17067598005407.png)

图 7.38 *三线制 SPI*

#### 1.2.5. CPOL 与 CPHA

CPHA 是时钟相位，CPOL 是时钟极性，两者的不同组合是 SPI 数据传输的不同模式。

| CPHA | 说明                                     |
| ---- | ---------------------------------------- |
| 0    | 数据采样在第1个边沿，数据发送在第2个边沿 |
| 1    | 数据采样在第2个边沿，数据发送在第1个边沿 |

| CPOL | 说明                     |
| ---- | ------------------------ |
| 0    | 空闲状态时，SCK 为低电平 |
| 1    | 空闲状态时，SCK 为高电平 |

| Mode | 值             | 说明                                               |
| ---- | -------------- | -------------------------------------------------- |
| 0    | CPOL=0, CPHA=0 | 空闲时，SCK 处于低电平数据采样在上升沿，下降沿保持 |
| 1    | CPOL=0, CPHA=1 | 空闲时，SCK 处于高电平数据采样在下降沿，上升沿保持 |
| 2    | CPOL=1, CPHA=0 | 空闲时，SCK 处于低电平数据采样在下降沿，上升沿保持 |
| 3    | CPOL=1, CPHA=1 | 空闲时，SCK 处于高电平数据采样在上升沿，下降沿保持 |

## 2. 参数配置

### 2.1. 内核配置

使能 SPI 相关的内核驱动，可在通过下列命令进行配置（在 SDK 顶层目录执行）:

```
make linux-menuconfig
```

在内核的配置界面中，进行下列的选择:

```
Device Drivers  --->
    [*] SPI support  --->
        <*>   Artinchip SPI controller
        ......
    [*] DMA Engine support  --->
        <*>   Artinchip SoCs DMA support
```

进行如上的配置之后，内核 SPI 驱动使能，并且 SPI 可使用 DMA 进行数据传输。

### 2.2. DTS 配置

芯片级的 DTS:

```
spi0: spi@10400000 {
    compatible = "artinchip,aic-spi-v1.0";
    reg = <0x0 0x10400000 0x0 0x1000>;
    interrupts-extended = <&plic0 44 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cmu CLK_SPI0>;
    resets = <&rst RESET_SPI0>;
    dmas = <&dma DMA_SPI0>, <&dma DMA_SPI0>;
    dma-names = "rx", "tx";
    #address-cells = <1>;
    #size-cells = <0>;
    spi-max-frequency = <24000000>;
};

spi1: spi@10410000 {
    compatible = "artinchip,aic-spi-v1.0";
    reg = <0x0 0x10410000 0x0 0x1000>;
    interrupts-extended = <&plic0 45 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cmu CLK_SPI1>;
    resets = <&rst RESET_SPI1>;
    dmas = <&dma DMA_SPI1>, <&dma DMA_SPI1>;
    dma-names = "rx", "tx";
    #address-cells = <1>;
    #size-cells = <0>;
    spi-max-frequency = <24000000>;
};
```

其中板级的配置 `board.dts` 中需要使能该模块，并且根据实际情况，配置最大工作频率：

```
&spi0 {
    pinctrl-names = "default";
    pinctrl-0 = <&spi0_pins_a>;
    spi-max-frequency = <100000000>;
    status = "okay";
};

&spi1 {
    pinctrl-names = "default";
    pinctrl-0 = <&spi1_pins_a>;
    spi-max-frequency = <100000000>;
    status = "okay";
};
```

`board-u-boot.dtsi` 需要设置 `u-boot,dm-pre-reloc` ，只有设置了该标记，SPL 中才可以使用 SPI:

```
&spi0 {
    u-boot,dm-pre-reloc;
};

&spi1 {
    u-boot,dm-pre-reloc;
};
```

## 3. 调试指南

### 3.1. 调试开关

可通过内核配置使能 SPI 模块的 DEBUG 选项。在 SDK 根目录下执行:

```
make linux-menuconfig (or make km)
```

进入内核的配置界面:

```
Linux
    Kernel hacking
        Artinchip Debug
            [*] SPI driver debug
```

勾选使能该 DEBUG 选项后：

> 1. SPI 的驱动源码将以 `-O0` 编译
> 2. SPI 驱动中的 pr_dbg() 和 dev_dbg() 调试信息会被编译

如果需要看到 pr_dbg() 和 dev_dbg() 的打印信息，还需要设置 `loglevel=8` 。

若需要在启动过程中即可看到打印，需要在 `env.txt` 中修改 bootargs，增加 `loglevel=8` 。 若仅需要在板子启动到 Linux shell 后使能相关打印，可以通过下列命令调整 loglevel：

```
echo 8 > /proc/sys/kernel/printk
```

## 4. 测试指南

## 5. 设计说明

### 5.1. 源码说明

| 相关模块      | 源码路径                       |
| ------------- | ------------------------------ |
| SPI subsystem | source/linux-5.10/drivers/spi/ |
| Driver        | source/linux-5.10/drivers/spi/ |

### 5.2. 模块架构

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/spi_kernel_arch1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/spi_kernel_arch1-17067599780729.png)

图 7.39 *内核 SPI 框图*

由于使用 SPI 的外设较多，内核中通过 SPI 子系统来支持各种 SPI 外设，整体架构如上图所示，包括：

> - Artinchip SPI 驱动
> - SPI Core
> - SPI-MEM
> - 面向内核的 API
> - 面向用户空间的接口（SPIDEV）

由于 SPI 传输需要使用 DMA，因此 DMA 子系统是一个相关模块。

### 5.3. 关键流程

#### 5.3.1. 初始化

```
aic_spi_probe();
|-> irq = platform_get_irq(pdev, 0);
|-> ctlr = spi_alloc_master(&pdev->dev, sizeof(struct aic_spi));
|-> platform_set_drvdata(pdev, ctlr);
|-> aicspi->dma_rx = dma_request_slave_channel(aicspi->dev, "rx");
|-> aicspi->dma_tx = dma_request_slave_channel(aicspi->dev, "tx");
    |-> request_irq(aicspi->irq, aic_spi_handle_irq, 0, aicspi->dev_name, aicspi);
|-> spi_register_controller(ctlr);
```

#### 5.3.2. 中断流程

SPI 控制器驱动中的中断处理并不复杂，当中断发生时，首先在 irq handler 中读取相关状态寄存器， 然后判断如何处理：

```
static irqreturn_t aic_spi_handle_irq(int irq, void *dev_id)
{
    ...

    spi_ctlr_pending_irq_clr(status, base_addr);
    /* master mode, Transfer Complete Interrupt */
    if (status & ISR_BIT_TC) {
        ...
        spi_ctlr_irq_disable(ISR_BIT_TC | ISR_BIT_ERRS, base_addr);
        spi_finalize_current_transfer(aicspi->ctlr);    // 传输完成，通知调用者
        ...
        return IRQ_HANDLED;
    } else if (status & ISR_BIT_ERRS) {
        ...
        spi_ctlr_irq_disable(ISR_BIT_TC | ISR_BIT_ERRS, base_addr);
        spi_ctlr_soft_reset(base_addr);                 // 传输出错，reset 控制器
        spi_finalize_current_transfer(aicspi->ctlr);
        ...
        return IRQ_HANDLED;
    }
    ...
    return IRQ_NONE;
}
```

### 5.4. 数据结构

```
enum spi_mode_type {
    SINGLE_HALF_DUPLEX_RX,
    SINGLE_HALF_DUPLEX_TX,
    SINGLE_FULL_DUPLEX_RX_TX,
    DUAL_HALF_DUPLEX_RX,
    DUAL_HALF_DUPLEX_TX,
    QUAD_HALF_DUPLEX_RX,
    QUAD_HALF_DUPLEX_TX,
    MODE_TYPE_NULL,
};
```

设备数据结构。

```
struct aic_spi {
    struct device *dev;                 // 设备指针
    struct spi_controller *ctlr;        // SPI CORE 的控制器指针
    void __iomem *base_addr;            // 映射后的 SPI 控制器地址
    struct clk *mclk;                   // SPI 控制器的时钟
    struct reset_control *rst;          // SPI 控制器的复位
    struct dma_chan *dma_rx;            // SPI 控制器的接收 DMA Channel
    struct dma_chan *dma_tx;            // SPI 控制器的发送 DMA Channel
    dma_addr_t dma_addr_rx;             // SPI 控制器 RX FIFO 地址
    dma_addr_t dma_addr_tx;             // SPI 控制器 TX FIFO 地址
    enum spi_mode_type mode_type;
    unsigned int irq;                   // 中断号
    char dev_name[48];
    spinlock_t lock;
};
```

### 5.5. 接口设计

#### 5.5.1. aic_spi_setup

| **函数原型** | int aic_spi_setup(struct spi_device *spi) |
| ------------ | ----------------------------------------- |
| **功能说明** | SPI 设备的传输位宽、模式的检查和配置      |
| **参数定义** | struct spi_device *spiSPI 设备指针        |
| **返回值**   | 0: 成功其他: 失败                         |
| **注意事项** |                                           |

#### 5.5.2. aic_spi_set_cs

| **函数原型** | void aic_spi_set_cs(struct spi_device *spi, bool cs_high)    |
| ------------ | ------------------------------------------------------------ |
| **功能说明** | 设置 SPI 设备的片选信号                                      |
| **参数定义** | struct spi_device *spiSPI 设备指针bool cs_high是否选择该设备 |
| **返回值**   | 无                                                           |
| **注意事项** |                                                              |

#### 5.5.3. aic_spi_max_transfer_size

| **函数原型** | size_t aic_spi_max_transfer_size(struct spi_device *spi) |
| ------------ | -------------------------------------------------------- |
| **功能说明** | SPI CORE 获取当前 SPI 控制器单次最大可传输的数据长度     |
| **参数定义** | struct spi_device *spiSPI 设备指针                       |
| **返回值**   | 单次可传输的数据长度                                     |
| **注意事项** |                                                          |

#### 5.5.4. aic_spi_transfer_one

| **函数原型** | int aic_spi_transfer_one(struct spi_controller *ctlr,struct spi_device *spi, struct spi_transfer *t) |
| ------------ | ------------------------------------------------------------ |
| **功能说明** | 执行一次传输                                                 |
| **参数定义** | struct spi_controller *ctlrSPI 控制器指针struct spi_device *spiSPI 设备指针struct spi_transfer *t单次 SPI 传输结构体指针 |
| **返回值**   | 0: 成功其他: 失败                                            |
| **注意事项** |                                                              |

## 6. 常见问题

### 6.1. 如何添加新的 SPI NAND 设备

#### 6.1.1. 驱动层次关系

SPI NAND 属于 SPI 的从设备，在内核中相关驱动通过 `SPI MEM` 对接到 SPI 子系统，如 [图 7.39](design_introduce.html#ref-to-spi-kernel-arch) 所示。 在 SPI 控制器初始化时，SPI 驱动会检查该控制器下是否有挂载的 SPI NAND，有则添加到 SPI BUS 中。

```
aic_spi_probe(dev);
|-> spi_register_controller(ctlr);/spi_register_master(ctlr);
    |   // spi_register_master 是一个宏
    |
    |-> of_register_spi_devices(ctlr);
        |-> spi = of_register_spi_device(ctlr, nc);
            |-> spi = spi_alloc_device(ctlr);
            |-> of_spi_parse_dt(ctlr, spi, nc);
            |-> rc = spi_add_device(spi);
                // 将 SPI device 添加到 SPI 总线 spi_bus_type 中
```

在调用 `spi_add_device` 的过程中，会查找和匹配对应设备的驱动程序（如果这时候对 应的驱动程序还没有被添加到系统中，则在这里先将设备添加到 Bus，等到对应驱动程序 被添加进来时，再进行匹配。）

| 模块     | 驱动源码路径                            |
| -------- | --------------------------------------- |
| SPI NAND | source/linux-5.10/drivers/mtd/nand/spi/ |

#### 6.1.2. 检查和添加新设备

内核中所支持的 SPI NAND 设备通过两级列表进行设置。

首先检查 `source/linux-5.10/drivers/mtd/nand/spi/core.c` 中的 `spinand_manufacturers`, 查看新设备的厂商是否在列表之中：

```
static const struct spinand_manufacturer *spinand_manufacturers[] = {
    &gigadevice_spinand_manufacturer,
    &macronix_spinand_manufacturer,
    &micron_spinand_manufacturer,
    &paragon_spinand_manufacturer,
    &toshiba_spinand_manufacturer,
    &winbond_spinand_manufacturer,
};
```

再检查具体的设备厂商文件，具体的型号是否在列表之中（ 以gigadevice 为例）:

```
static const struct spinand_info gigadevice_spinand_table[] = {
    SPINAND_INFO("GD5F1GQ4UExxG",
             SPINAND_ID(SPINAND_READID_METHOD_OPCODE_ADDR, 0xd1),
             NAND_MEMORG(1, 2048, 128, 64, 1024, 20, 1, 1, 1),
             NAND_ECCREQ(8, 512),
             SPINAND_INFO_OP_VARIANTS(&read_cache_variants,
                          &write_cache_variants,
                          &update_cache_variants),
             SPINAND_HAS_QE_BIT,
             SPINAND_ECCINFO(&gd5fxgq4_variant2_ooblayout,
                     gd5fxgq4uexxg_ecc_get_status)),

    ......
};
```

此处检查，需要查找新设备的 Datasheet，找到该设备的 Device ID（可在 Datasheet 中直接搜索 “Device ID”）。 并查看该 Device ID 是否出现在列表中。例如此处 `SPINAND_ID(SPINAND_READID_METHOD_OPCODE_ADDR, 0xd1),` 的最后一个数值 `0xd1` 就是 一个 Device ID 值。

如果不存在，则参考上述例子，添加一个新的设备记录。

#### 6.1.3. 修改 DTS

要在实际项目中使用 SPI NAND 设备，还需要修改 DTS 配置。

`board.dts` 应在具体的 SPI 控制器下添加 `spi-nand` 设备。

```
&spi1 {
    pinctrl-names = "default";
    pinctrl-0 = <&spi1_pins_a>;
    status = "okay";
    spi-max-frequency = <100000000>;
    spi-flash@0 {
        #address-cells = <1>;
        #size-cells = <1>;
        compatible = "spi-nand";
        spi-max-frequency = <100000000>;
        spi-tx-bus-width = <4>;
        spi-rx-bus-width = <4>;
        reg = <0>;
        status = "okay";
    };
};
```

同时还需在 `board-u-boot.dtsi` 文件中，将该设备标记为 `u-boot,dm-pre-reloc` ，不然 SPL 无法识别和使用。

```
&spi1 {
    u-boot,dm-pre-reloc;
    spi-flash@0 {
        u-boot,dm-pre-reloc;
    };
};
```

### 6.2. 如何添加新的 SPI NOR 设备

#### 6.2.1. 驱动层次关系

SPI NOR 属于 SPI 的从设备，在内核中相关驱动通过 `SPI MEM` 对接到 SPI 子系统，如 [图 7.39](design_introduce.html#ref-to-spi-kernel-arch) 所示。 在 SPI 控制器初始化时，SPI 驱动会检查该控制器下是否有挂载的 SPI NOR，有则添加到 SPI BUS 中。

```
aic_spi_probe(dev);
|-> spi_register_controller(ctlr);/spi_register_master(ctlr);
    |   // spi_register_master 是一个宏
    |
    |-> of_register_spi_devices(ctlr);
        |-> spi = of_register_spi_device(ctlr, nc);
            |-> spi = spi_alloc_device(ctlr);
            |-> of_spi_parse_dt(ctlr, spi, nc);
            |-> rc = spi_add_device(spi);
                // 将 SPI device 添加到 SPI 总线 spi_bus_type 中
```

在调用 `spi_add_device` 的过程中，会查找和匹配对应设备的驱动程序（如果这时候对 应的驱动程序还没有被添加到系统中，则在这里先将设备添加到 Bus，等到对应驱动程序 被添加进来时，再进行匹配。）

| 模块    | 驱动源码路径                           |
| ------- | -------------------------------------- |
| SPI NOR | source/linux-5.10/drivers/mtd/spi-nor/ |

#### 6.2.2. 检查和添加新设备

内核中所支持的 SPI NOR 设备通过两级列表进行设置。

首先检查 `source/linux-5.10/drivers/mtd/spi-nor/core.c` 中的 `manufacturers`, 查看新设备的厂商是否在列表之中：

```
static const struct spi_nor_manufacturer *manufacturers[] = {
    &spi_nor_atmel,
    &spi_nor_catalyst,
    &spi_nor_eon,
    &spi_nor_esmt,
    &spi_nor_everspin,
    &spi_nor_fujitsu,
    &spi_nor_gigadevice,
    &spi_nor_intel,
    &spi_nor_issi,
    &spi_nor_macronix,
    &spi_nor_micron,
    &spi_nor_st,
    &spi_nor_spansion,
    &spi_nor_sst,
    &spi_nor_winbond,
    &spi_nor_xilinx,
    &spi_nor_xmc,
    &spi_nor_boya,
};
```

再检查具体的设备厂商文件，具体的型号是否在列表之中（ 以gigadevice 为例）:

```
static const struct flash_info gigadevice_parts[] = {
    ......
    { "gd25q256", INFO(0xc84019, 0, 64 * 1024, 512,
               SECT_4K | SPI_NOR_DUAL_READ | SPI_NOR_QUAD_READ |
               SPI_NOR_4B_OPCODES | SPI_NOR_HAS_LOCK |
               SPI_NOR_HAS_TB | SPI_NOR_TB_SR_BIT6)
        .fixups = &gd25q256_fixups },
    ......
};
```

此处检查，需要查找新设备的 Datasheet，找到该设备的 Manufacture 和 Device ID，并查看该 ID 是否出现在列表中。 例如此处为 `0xc84019` ，其中 Manufacture ID = `0xc8`, Device ID ID[15~8] = `0x40`, ID[7~0] = `0x19` 。

如果不存在，则参考上述例子，添加一个新的设备记录。

#### 6.2.3. 修改 DTS

要在实际项目中使用 SPI NOR 设备，还需要修改 DTS 配置。

`board.dts` 应在具体的 SPI 控制器下添加 `jedec,spi-nor` 设备。

```
&spi0 {
    pinctrl-names = "default";
    pinctrl-0 = <&spi0_pins_a>;
    status = "okay";
    spi-max-frequency = <100000000>;
    spi-flash@0 {
        #address-cells = <1>;
        #size-cells = <1>;
        compatible = "jedec,spi-nor";
        spi-max-frequency = <100000000>;
        spi-tx-bus-width = <4>;
        spi-rx-bus-width = <4>;
        reg = <0>;
        status = "okay";
    };
};
```

同时还需在 `board-u-boot.dtsi` 文件中，将该设备标记为 `u-boot,dm-pre-reloc` ，不然 SPL 无法识别和使用。

```
&spi0 {
    u-boot,dm-pre-reloc;
    spi-flash@0 {
        u-boot,dm-pre-reloc;
    };
};
```

