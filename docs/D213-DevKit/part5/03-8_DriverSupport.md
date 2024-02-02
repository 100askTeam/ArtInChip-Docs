---
sidebar_position: 8
---
# 驱动支持

## 1. Clock 驱动

本章节描述 ArtInChip 平台的 U-Boot 时钟配置相关内容。

### 1.1. 驱动框架

U-Boot 驱动模型支持 Clock，ArtInChip 平台中 Clock 驱动基于该框架进行实现。 相关配置为：

> - CONFIG_CLK
> - CONFIG_CLK_ARTINCHIP
> - CONFIG_CLK_ARTINCHIP_CMU
> - CONFIG_SPL_CLK_ARTINCHIP
> - CONFIG_SPL_CLK_ARTINCHIP_CMU

相关源码有：

> - `include/clk.h`
> - `include/clk-uclass.h`
> - `drivers/clk/clk.c`
> - `drivers/clk/clk-uclass.c`
> - `drivers/clk/artinchip/clk-aic.h`
> - `drivers/clk/artinchip/clk-artinchip.c`
> - `drivers/clk/artinchip/clk-cmu.c`

### 1.2. 驱动接口

相关的 Clock 驱动接口有：

```
int clk_get_by_index_platdata(struct udevice *dev, int index,
                              struct phandle_1_arg *cells, struct clk *clk);
int clk_get_by_index(struct udevice *dev, int index, struct clk *clk);
int clk_get_by_index_nodev(ofnode node, int index, struct clk *clk);
int clk_get_bulk(struct udevice *dev, struct clk_bulk *bulk);
int clk_get_by_name(struct udevice *dev, const char *name, struct clk *clk);
int clk_release_all(struct clk *clk, int count);
int clk_enable(struct clk *clk);
int clk_disable(struct clk *clk);
ulong clk_set_rate(struct clk *clk, ulong rate);
ulong clk_get_rate(struct clk *clk);
```

### 1.3. 初始化和使用

通常硬件设备初始化时，需要配置对应的时钟。Clock 驱动的 probe 在时钟设备第一次被获取时触发。

```
clk_get_by_index(); // drivers/clk/clk-uclass.c
|-> clk_get_by_index_tail();
    |-> uclass_get_device_by_ofnode(UCLASS_CLK, args->node, &dev_clk);
        |-> uclass_find_device_by_ofnode(id, node, &dev);
        |-> uclass_get_device_tail(dev, ret, devp); // drivers/core/uclass.c
            |-> device_probe(dev); // drivers/core/device.c
                |-> drv->probe(dev);
                    aic_clk_probe(dev);
                    // drivers/clk/artinchip/clk-cmu.c
```

设备使用的时钟通过时钟树进行管理。在时钟树中，每一个时钟都被分配一个具体的 ID， 并且在 DTS 中配置给需要的硬件设备。设备初始化时，通过 FDT 获取对应的时钟设备。

DTS 中时钟配置示例：

```
dma: dma-controller@10000000 {
    compatible = "artinchip,aic-dma";
    ...
    clocks = <&ccu CLK_DMA>;
    ...
};
```

相关 ID 定义可参考：

> - `include/dt-bindings/clock/artinchip,aic-cmu.h`

获取时钟设备的流程：

```
clk_get_by_index(dev, index, clk); // drivers/clk/clk-uclass.c
|   // 此处 index 是 DTS 中配置给该设备的第几个时钟
|
|-> clk_get_by_index_tail();
    |-> uclass_get_device_by_ofnode(UCLASS_CLK, args->node, &dev_clk);
    |-> clk_of_xlate_default(clk, args);
        |-> clk->id = args->args[0]; // 获取到具体的时钟 ID
```

需要设置和获取相关时钟信息时，通过 `clk->id` 访问时钟树。

```
clk_set_rate(clk, rate); // drivers/clk/clk-uclass.c
|-> ops->set_rate(clk, rate);
    artinchip_clk_set_rate(clk, rate); // drivers/clk/artinchip/clk-artinchip.c
    |-> aic_get_clk_info(priv->tree, clk->id, &index);
        // 驱动内部，使用 clk-id 获取对应的时钟节点
```

## 2. Reset 驱动

本章节描述 ArtInChip 平台的 U-Boot 复位驱动相关内容。

### 2.1. 驱动框架

U-Boot 驱动模型支持 Reset，ArtInChip 平台中 Reset 驱动基于该框架进行实现。 相关配置为：

> - CONFIG_DM_RESET
> - CONFIG_RESET_ARTINCHIP

相关源码有：

> - `include/reset.h`
> - `include/reset-uclass.h`
> - `drivers/reset/reset-uclass.c`
> - `drivers/reset/reset-artinchip.c`

### 2.2. 驱动接口

相关的复位驱动接口有：

```
int reset_get_by_index(struct udevice *dev, int index,
                        struct reset_ctl *reset_ctl);
int reset_get_by_name(struct udevice *dev, const char *name,
                        struct reset_ctl *reset_ctl);
int reset_get_by_index_nodev(ofnode node, int index,
                                struct reset_ctl *reset_ctl);
int reset_get_bulk(struct udevice *dev, struct reset_ctl_bulk *bulk);
int reset_request(struct reset_ctl *reset_ctl);
int reset_free(struct reset_ctl *reset_ctl);
int reset_assert(struct reset_ctl *reset_ctl);
int reset_deassert(struct reset_ctl *reset_ctl);
```

### 2.3. 初始化和使用

通常硬件设备初始化时，需要对其进行一次复位。Reset 驱动的 probe 在复位控制器第一次被获取时触发。

```
reset_get_by_index(); // drivers/reset/reset-uclass.c
|-> reset_get_by_index_tail(ret, dev_ofnode(dev), &args, "resets",
    |                       index > 0, reset_ctl);
    |-> uclass_get_device_by_ofnode(UCLASS_RESET, args->node, &dev_reset);
        |-> uclass_find_device_by_ofnode(id, node, &dev);
        |-> uclass_get_device_tail(dev, ret, devp);
            |-> device_probe(dev); // drivers/core/device.c
                |-> drv->probe(dev);
                    artinchip_reset_probe(dev);
                    // drivers/reset/reset-artinchip.c
```

系统给每一个设备的复位控制器分配了一个 ID，并且在设备的 DTS 配置中将 ID 分配到具体的设备。 设备初始化时，通过 FDT 的配置获取相应的复位控制设备。

DTS 中复位控制器配置示例：

```
dma: dma-controller@10000000 {
    compatible = "artinchip,aic-dma";
    ...
    resets = <&rst RESET_DMA>;
    ...
};
```

相关 ID 定义可参考：

> - `include/dt-bindings/reset/artinchip,aic-reset.h`

获取复位控制器的流程：

```
reset_get_by_index(dev, index, reset_ctl); // drivers/reset/reset-uclass.c
|   // 此处 index 是 DTS 中配置给该设备的第几个复位控制设备
|
|-> reset_get_by_index_tail();
    |-> uclass_get_device_by_ofnode(UCLASS_RESET, args->node, &dev_reset);
    |-> resetof_xlate_default(reset_ctl, args);
        |-> reset_ctl->id = args->args[0]; // 获取到具体的复位控制器 ID
```

需要对设备进行复位时，通过 `reset_ctl->id` 进行访问和设置硬件。

```
reset_assert(reset_ctl); // drivers/reset/reset-uclass.c
|-> ops->rst_assert(reset_ctl);
    artinchip_reset_assert(reset_ctrl); // drivers/reset/reset-artinchip.c
```

## 3. DMA 驱动

此处描述的 DMA 是 ArtInChip 平台上的系统 DMA。一些硬件 IP 内部自带的 DMA 不在这里描述的范围。

### 3.1. 驱动框架

U-Boot 驱动模型支持 DMA，ArtInChip 平台中 DMA 驱动基于该框架进行实现。 相关配置为：

> - CONFIG_DMA
> - CONFIG_ARTINCHIP_DMA

相关源码有：

> - `include/dma.h`
> - `drivers/dma/dma-uclass.c`
> - `drivers/dma/artinchip_dma.c`

### 3.2. 驱动接口

常用接口

```
int dma_enable(struct dma *dma);
int dma_disable(struct dma *dma);
int dma_request(struct udevice *dev, struct dma *dma);
int dma_free(struct dma *dma);
int dma_memcpy(void *dst, void *src, size_t len);
int dma_prepare_rcv_buf(struct dma *dma, void *dst, size_t size);
int dma_receive(struct dma *dma, void **dst, void *metadata);
int dma_send(struct dma *dma, void *src, size_t len, void *metadata);
```

### 3.3. 实现说明

ArtInChip 平台上有一个系统 DMA，其支持8个通道同时工作。如规格书所定义，DMA 可以在不同的硬件 IP 之间搬运数据，系统为各硬件 IP 分配了固定的数据端口号。 使用 DMA 时，软件需要先申请到一个空闲的 DMA 通道，并将源数据端口和目标数据端口等信息配置给 DMA 通道，然后启动 DMA 进行工作。

然而上述的描述和使用方式并不能直接对应到 DTS 的配置方式以及 U-Boot 中的 DMA 表示方式， 中间需要做一些转换和说明。

在 DTS 中，可以描述某个控制器是否支持 DMA，并且配置所使用的 DMA ID 号。 在 ArtInChip 平台中，实际只有一个 DMA，各硬件 IP 共享使用。在配置 DTS 时， 使用设备对应的 DMA 数据端口号作为 DMA ID，在运行时再给该 ID 分配可用的 DMA 通道。

如下面的示例：

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
```

这里的 DMA 配置中，描述了 SPI0 控制器使用两个 DMA，分别是 “rx”, “tx”，它们的 DMA ID 都是 SPI0 对应的 DMA 数据端口号 10。

上述的配置对应到 U-Boot 的 DMA 驱动实现时，会有一些问题。U-Boot DMA 在运行时使用下面的结构体表示：

```
struct dma {
        struct udevice *dev;
        unsigned long id;
};
```

DMA 的实例化在 DMA 驱动框架 `dma-uclass.c` 中进行，其中的 `id` 值即为 DTS 中配置的 DMA ID。这里两个 DMA 使用了相同的 ID 号，如果直接使用，无法区分不同 DMA 所映射的 DMA 通道。

ArtInChip 平台上通过对 DMA 结构体中的 `id` 进行了扩展，以方便区分实际使用的不同 DMA， 如下所示：

> - bit[15:0] 表示 IP 端口号
> - bit[31:16] 表示 DMA 通道号

在 DMA 创建时赋值端口号区域，DMA request 时赋值通道号区域。由于上述两个动作是在一个调用中完成的， 因此不会有问题：

```
dma_get_by_name(bus, "tx", &priv->tx_dma); // drivers/dma/dma-uclass.c
|-> dma_get_by_index(dev, index, dma); // drivers/dma/dma-uclass.c
    |-> dma_of_xlate_default(dma, &args);
    |   |-> dma->id = args->args[0];
    |
    |-> dma_request(dev_dma, dma); // drivers/dma/dma-uclass.c
        |-> aic_dma_request(dma); // drivers/dma/artinchip_dma.c
            |-> phy_ch = aic_dma_phy_request(ud);
            |-> dma->id |= (phy_ch << AIC_DMA_PHY_CH_OFF);
```

U-Boot 对 `struct dma` 结构体中 `id` 的定义是唯一标识，只要能够做 DMA 区分即可， 因此上述扩展不会造成其他问题。

### 3.4. 初始化流程

DMA 驱动的初始化，在 DMA 第一次被使用时触发进行。

**情况1：** DRAM DMA 数据传输

```
dma_memcpy(dst_buf, src_buf, len);// drivers/dma/dma-uclass.c
|-> dma_get_device(DMA_SUPPORTS_MEM_TO_MEM, &dev);
    |-> uclass_first_device(UCLASS_DMA, &dev)
        |-> uclass_find_first_device(id, index, &dev);
        |-> uclass_get_device_tail(dev, ret, devp);
            |-> device_probe(dev); // drivers/core/device.c
                |-> drv->probe(dev);
                    aic_dma_probe(dev); // drivers/dma/artinchip_dma.c
```

**情况2：** 根据 DTS 配置申请 DMA

```
dma_get_by_name(bus, "tx", &priv->tx_dma); // drivers/dma/dma-uclass.c
|-> dma_get_by_index(dev, index, dma); // drivers/dma/dma-uclass.c
    |-> uclass_get_device_by_ofnode(UCLASS_DMA, args.node, &dev_dma);
        |   // drivers/core/uclass.c
        |-> uclass_find_device_by_ofnode(id, node, &dev);
        |-> uclass_get_device_tail(dev, ret, devp);
            |-> device_probe(dev); // drivers/core/device.c
                |-> drv->probe(dev);
                    aic_dma_probe(dev); // drivers/dma/artinchip_dma.c
```

## 4. SPI 驱动

SPI 在 U-Boot 中主要用于支持 SPI NAND/NOR 存储设备。目前 ArtInChip 平台上 SPI 的实现只支持半双工模式(Half-duplex)。

### 4.1. 驱动框架

U-Boot 驱动模型支持 SPI，ArtInChip 平台中 SPI 驱动基于该框架进行实现。 相关配置为：

> - CONFIG_DM_SPI
> - CONFIG_SPI
> - CONFIG_SPL_SPI_SUPPORT
> - CONFIG_ARTINCHIP_SPI

相关源码有：

> - `drivers/spi/spi-uclass.c`
> - `include/spi.h`
> - `drivers/spi/artinchip_spi.c`

### 4.2. 驱动接口

常用接口：

```
int dm_spi_claim_bus(struct udevice *dev);
void dm_spi_release_bus(struct udevice *dev);
int dm_spi_xfer(struct udevice *dev, unsigned int bitlen,
                const void *dout, void *din, unsigned long flags);
int spi_claim_bus(struct spi_slave *slave);
void spi_release_bus(struct spi_slave *slave);
int  spi_xfer(struct spi_slave *slave, unsigned int bitlen, const void *dout,
              void *din, unsigned long flags);
```

### 4.3. 初始化流程

SPI 设备挂载在 SPI 总线上，当 SPI 设备初始化时，如果父设备还没有被初始化， 则会自动触发父设备的初始化。下面是 SPI NAND 初始化时触发 SPI 初始化的流程。

```
mtd_probe(dev)
|-> device_probe(dev)
    |   // 此时 SPI 还没有 probe，则先 probe SPI
    |-> device_probe(dev->parent); // drivers/core/device.c
    |   |-> drv->probe(dev);
    |       aic_spi_probe(dev); // drivers/spi/artinchip_spi.c
    |
    |-> drv->probe(dev);
        spinand_probe(dev) // drivers/mtd/nand/spi/core.c
```

### 4.4. DMA 的支持

ArtInChip SPI 驱动支持使用 DMA 收发数据和使用 FIFO 通过 CPU 读写的方式收发数据， 在 DMA 使能的情况下，对于数据长度大于等于 `SPI_FIFO_DEPTH` 的传输，驱动自动切换使用 DMA 进行传输，否则默认使用 FIFO 模式。

如果系统没有使能 DMA，则所有传输都使用 FIFO 模式。

使能 DMA 的 Kconfig 配置为：

> - CONFIG_ARTINCHIP_DMA

### 4.5. QUAD SPI 的支持

对于非存储 SPI 设备，SPI 驱动只支持标准 SPI 模式，即 Single Mode，数据传输都使用一根线进行(MOSI 和 MISO)。 对于 SPI 存储设备(SPI NAND/SPI NOR)，通过对接 `spi-mem` 框架，可以支持 DUAL SPI 和 QUAD SPI。

相关代码：

```
static const struct spi_controller_mem_ops aic_spi_mem_ops = {
    .supports_op = aic_spi_mem_supports_op,
    .exec_op = aic_spi_mem_exec_op,
};
static const struct dm_spi_ops aic_spi_ops = {
    .claim_bus   = aic_spi_claim_bus,
    .release_bus = aic_spi_release_bus,
    .xfer        = aic_spi_xfer,
    .set_speed   = aic_spi_set_speed,
    .set_mode    = aic_spi_set_mode,
    .mem_ops     = &aic_spi_mem_ops,
};
```

通过设置 `.exec_op` ，SPI MEM 设备的所有操作都由 `aic_spi_mem_exec_op` 进行处理。 由于该接口可以获取到 SPI 操作的数据位宽等详细信息，驱动可以为每一个传输操作设置准确的模式(Single/Dual/Quad)。

## 5. SPI NAND 驱动

本章节描述 SPI NAND 驱动的相关配置和使用。

### 5.1. 驱动框架

SPI NAND 的操作基于 SPI 命令，除了个别型号可能有不同之外，基本上操作和行为都是一致的， 所以 U-Boot 中已经实现了共用版本的 SPI NAND 驱动，具体器件只需要添加小部分驱动代码即可。

相关配置：

> - CONFIG_MTD
> - CONFIG_DM_SPI
> - CONFIG_SPI_MEM
> - CONFIG_MTD_SPI_NAND
> - CONFIG_SPL_SPI_NAND_ARTINCHIP

具体源码在：

> - `drivers/mtd/nand/spi/`

### 5.2. 驱动接口

SPI NAND 属于 MTD 设备，使用 MTD 相关接口。具体参考：

> - `include/linux/mtd/mtd.h`

### 5.3. 初始化和读写

SPI NAND 是挂载在 SPI 总线上的 MTD 设备，初始化 probe 在 MTD 设备第一次被使用时触发。 调用 `mtd_probe_devices()` 是对 MTD 设备驱动初始化的常用方式。

```
mtd_probe_devices(void)
|-> mtd_probe_uclass_mtd_devs(void) // drivers/mtd/mtd_uboot.c
    |   // 通过 while 循环，逐个 UCLASS_MTD 设备 find
    |-> uclass_find_device(UCLASS_MTD, idx, &dev)
    |-> mtd_probe(dev)
        |-> device_probe(dev)
            |-> spinand_probe(dev) // drivers/mtd/nand/spi/core.c
                |   // spinand = dev_get_priv(dev);
                |   // slave = dev_get_parent_priv(dev);
                |   // mtd = dev_get_uclass_priv(dev);
                |   // nand = &spinand->base;
                |   //
                |   // spinand->slave = slave;
                |
                |-> spinand_init(spinand);
                |   |-> spinand_detect(spinand);
                |   |   |-> spinand_manufacturer_detect(spinand);
                |   |       |                 // drivers/mtd/nand/spi/core.c
                |   |       |-> spinand_manufacturers[i]->ops->detect(spinand);
                |   |           // 尝试厂商的 detect 函数
                |   |
                |   |-> spinand_manufacturer_init(spinand);
                |   |-> nanddev_init(nand, &spinand_ops, THIS_MODULE);
                |   |   |                         // drivers/mtd/nand/core.c
                |   |   |   // mtd->type = memorg->bits_per_cell == 1 ?
                |   |   |   //          MTD_NANDFLASH : MTD_MLCNANDFLASH;
                |   |   |
                |   |   |-> nanddev_bbt_init(nand) // drivers/mtd/nand/bbt.c
                |   |       // 此处仅申请标记坏块的 Cache 空间，不做坏块检查
                |   |
                |   |-> // mtd = spinand->base.mtd
                |       //
                |       // mtd->_read_oob = spinand_mtd_read;
                |       // mtd->_write_oob = spinand_mtd_write;
                |       // mtd->_block_isbad = spinand_mtd_block_isbad;
                |       // mtd->_block_markbad = spinand_mtd_block_markbad;
                |       // mtd->_block_isreserved = spinand_mtd_block_isreserved;
                |       // mtd->_erase = spinand_mtd_erase;
                |       //
                |       // 此处完成 mtd 的初始化
                |
                |-> add_mtd_device(mtd);
                    |-> idr_alloc(&mtd_idr, mtd, 0, 0, GFP_KERNEL);
                            // 添加到 mtd_idr 列表中
```

NAND 存储设备在访问前，通常要做一次坏块检查。U-Boot 中在添加分区的时候进行检查坏块：

```
do_mtd_list();  // cmd/mtd.c
|-> mtd_probe_devices(); // drivers/mtd/mtd_uboot.c
    |-> add_mtd_partitions(); // drivers/mtd/mtdpart.c
        |-> allocate_partition(); // drivers/mtd/mtdpart.c
        |   |   // 这里做坏块统计
        |   |-> mtd_block_isbad(); // drivers/mtd/mtdcore.c
        |       |-> mtd->_block_isbad(mtd, ofs);
        |           spinand_mtd_block_isbad(); // drivers/mtd/nand/spi/core.c
        |           |-> nanddev_isbad(); // drivers/mtd/nand/core.c
        |               |-> spinand_isbad(); // drivers/mtd/nand/spi/core.c
        |                   |-> spinand_read_page();
        |
        |-> add_mtd_device(slave); // drivers/mtd/mtdcore.c
```

上层应用，如 mtd 命令和 UBI，通过 `mtd_read` / `mtd_write` API 进行读写等操作。

```
mtd_read
|-> mtd->_read_oob(mtd, from, &ops);
    part_read_oob(mtd, from, &ops); // drivers/mtd/mtdpart.c
    |-> mtd->parent->_read_oob(mtd->parent, from + mtd->offset, ops);
        spinand_mtd_read(mtd, from, &ops); // drivers/mtd/nand/spi/core.c
        |-> spinand_read_page(spinand, &iter.req, enable_ecc);
            |-> spinand_load_page_op(spinand, req);
            |   |-> spi_mem_exec_op(spinand->slave, &op); // drivers/spi/spi-mem.c
            |       |-> ops->mem_ops->exec_op(slave, op);
            |           aic_spi_mem_exec_op(slave, op);
            |           // drivers/spi/artinchip_spi.c
            |
            |-> spinand_read_from_cache_op(spinand, req);
                |-> spi_mem_exec_op(spinand->slave, &op);
                    |-> ops->mem_ops->exec_op(slave, op);
                        aic_spi_mem_exec_op(slave, op);
                        // drivers/spi/artinchip_spi.c
mtd_write
|-> mtd->_write_oob(mtd, to, &ops);
    part_write_oob(mtd, to, &ops); // drivers/mtd/mtdpart.c
    |-> mtd->parent->_write_oob(mtd->parent, to + mtd->offset, ops);
        spinand_mtd_write(mtd, to, &ops);
        |-> spinand_write_page(spinand, &iter.req);
            |-> spinand_write_enable_op(spinand);
            |-> spinand_write_to_cache_op(spinand, req);
            |-> spinand_program_op(spinand, req);
                |-> spi_mem_exec_op(spinand->slave, &op); // drivers/spi/spi-mem.c
                    |-> ops->mem_ops->exec_op(slave, op);
                        aic_spi_mem_exec_op(slave, op);
                        // drivers/spi/artinchip_spi.c
```

### 5.4. 添加新器件

U-Boot 的代码仅配置了数量有限的 SPI NAND 器件，在使用新器件时，需要在代码中增加对新器件的支持。 由于只需配置有限的信息，并且具体的配置已经模板化，因此只需参照现有代码添加即可。

具体流程如下：

- 检查该器件的厂商是否在支持列表

  查看 `drivers/mtd/nand/spi/` 源码目录是否有该器件厂商的驱动。如

  `winbond.c`

  如果不存在，则需要添加新厂商支持。

- 添加新厂商支持之后，需要将将该厂商的配置添加到系统中

  `drivers/mtd/nand/spi/core.c`

  `struct spinand_manufacturer *spinand_manufacturers[]`

- 检查厂商驱动中是否支持该器件

  如 `winbond.c` 中

  `struct spinand_info winbond_spinand_table[]`

  如果没有，则添加新器件到列表中即可。

## 6. SPI NOR 驱动

本章节描述 SPI NOR 驱动的相关配置和使用。

### 6.1. 驱动框架

待完善

### 6.2. 驱动接口

待完善

### 6.3. 初始化和读写

待完善

### 6.4. 添加新器件

待完善

## 7. MMC 驱动

本章节描述 MMC 驱动的相关配置和使用。

### 7.1. 驱动框架

U-Boot 驱动模型支持 MMC，并且通过块设备接口对 MMC 进行访问。ArtInChip 平台中， SPL 和 U-Boot 阶段都支持 MMC 已经块设备接口。 相关配置为：

> - CONFIG_MMC
> - CONFIG_DM_MMC
> - CONFIG_SPL_DM_MMC
> - CONFIG_BLK
> - CONFIG_SPL_BLK
> - CONFIG_MMC_ARTINCHIP

相关源码有：

> - `include/mmc.h`
> - `include/blk.h`
> - `drivers/block/blk-uclass.c`
> - `drivers/mmc/mmc-uclass.c`
> - `drivers/mmc/artinchip_mmc.c`

### 7.2. 驱动接口

常用驱动接口：

```
unsigned long blk_dread(struct blk_desc *block_dev, lbaint_t start,
            lbaint_t blkcnt, void *buffer);
unsigned long blk_dwrite(struct blk_desc *block_dev, lbaint_t start,
             lbaint_t blkcnt, const void *buffer);
unsigned long blk_derase(struct blk_desc *block_dev, lbaint_t start,
             lbaint_t blkcnt);

struct mmc *mmc_create(const struct mmc_config *cfg, void *priv);
int mmc_bind(struct udevice *dev, struct mmc *mmc,
         const struct mmc_config *cfg);
void mmc_destroy(struct mmc *mmc);
int mmc_unbind(struct udevice *dev);
int mmc_initialize(bd_t *bis);
int mmc_init(struct mmc *mmc);
int mmc_send_tuning(struct mmc *mmc, u32 opcode, int *cmd_error);
int mmc_of_parse(struct udevice *dev, struct mmc_config *cfg);
int mmc_read(struct mmc *mmc, u64 src, uchar *dst, int size);
int mmc_set_clock(struct mmc *mmc, uint clock, bool disable);
```

### 7.3. 初始化和使用

本章节主要介绍 MMC 以及对应的 BLK 设备的初始化流程，以及读写流程。

#### 7.3.1. 绑定阶段

使用时，MMC 设备通过 BLK 块设备接口进行使用。MMC 设备与 BLK 设备之间的关系如 [图 3.4](#ref-mmc-blk) 所示。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/mmc_relation.png](https://photos.100ask.net/artinchip-docs/d213-devkit/mmc_relation-17066883824881.png)

图 3.4 *MMC 与 BLK 设备的关系*

对于每一个 MMC 设备，在绑定阶段，都会创建一个对应的 MMC_BLK 块设备，并且 MMC_BLK 设备的 `parent` 指向当前 MMC 设备。 ArtInChip MMC 设备绑定对应的 MMC 设备驱动， MMC_BLK 设备绑定 `mmc-uclass` 中的 `mmc_blk` 驱动。

读写操作时，通过 `mmc_blk` 驱动的读写函数，转为对 mmc 的操作。

```
static const struct blk_ops mmc_blk_ops = { // drivers/mmc/mmc-uclass.c
    .read   = mmc_bread,
#if CONFIG_IS_ENABLED(MMC_WRITE)
    .write  = mmc_bwrite,
    .erase  = mmc_berase,
#endif
    .select_hwpart  = mmc_select_hwpart,
};
```

下面的绑定流程演示了创建 MMC_BLK 设备，并且进行关联的过程。

**使用 PLATDATA 时**

在 SPL 中，使能 PLATDATA 时的绑定流程如下。

```
reset // arch/arm/cpu/armv7/start.S
|-> _main   // arch/arm/lib/crt0.S
    |-> board_init_f(); // arch/arm/mach-artinchip/spl.c
        |-> spl_early_init() // common/spl/spl.c
            |-> spl_common_init(setup_malloc = true) // common/spl/spl.c
                |-> dm_init_and_scan(!CONFIG_IS_ENABLED(OF_PLATDATA));
                    |-> dm_scan_platdata(pre_reloc_only=false)
                        |-> lists_bind_drivers();
                            |-> device_bind_by_name(parent, false, entry, &dev);
                                |-> drv = lists_driver_lookup_name(info->name);
                                |   // 搜索 U_BOOT_DRIVER(name) 声明的 driver
                                |-> device_bind_common(); // drivers/core/device.c
                                    |-> uclass_get(&uc);
                                    |-> uclass_bind_device(dev);
                                    |-> drv->bind(dev);
                                        aic_dwmmc_bind(dev);
                                            |
         +----------------------------------+
         |
aic_dwmmc_bind(dev); // drivers/mmc/artinchip_dw_mmc.c
|-> dwmci_bind(dev, ...); // drivers/mmc/dw_mmc.c
    |
    |-> mmc_bind(dev, &plat->mmc, &plat->cfg) // drivers/mmc/mmc-uclass.c
        |  // 绑定一个 IF_TYPE_MMC 的 Block 子设备，这样可以通过块设备的接口
        |  // 使用 MMC。
        |
        |-> blk_create_devicef(dev, "mmc_blk", "blk",IF_TYPE_MMC, devnum,
        |   |                   512, 0, &bdev); // drivers/block/blk-uclass.c
        |   |-> blk_create_device(parent, "mmc_blk", dev_name, if_type,
        |       |                 devnum, blksz, lba, devp);
        |       |-> device_bind_driver(parent, drv_name, name, &dev);
        |           |   // drivers/core/lists.c
        |           |-> ....
        |               |-> device_bind_common(dm_root, ...);
        |                   |-> uclass_get(drv->id, &uc); id = UCLASS_BLK
        |                   |-> dev = calloc(1, sizeof(struct udevice));
        |                   |   dev->name = name // 块设备名字
        |                   |   dev->parent = parent // 指向 MMC 设备
        |                   |   dev->driver = drv // "mmc_blk" driver
        |                   |   dev->uclass = uc // UCLASS_BLK
        |                   |   // 创建设备 mmc_blk
        |                   |
        |                   |-> uclass_bind_device(dev);
        |                       // 将设备添加到 UCLASS_BLK 列表中
        |
        |-> dev_get_uclass_platdata(bdev);
```

**使用 DTS 时**

使用 DTS 时，SPL 和 U-Boot 中的绑定流程如下。在 DTS 中，MMC 控制器是 `soc` 的子节点， 挂载到 `simple-bus` 中，因此相关绑定在 `soc` 设备绑定 `simple-bus` 驱动后被触发， 因此在 `simple_bus_post_build()` 中处理。

U-Boot 阶段的 MMC 绑定在 `initf_dm` 中进行。

```
simple_bus_post_bind(); // drivers/core/simple-bus.c
|-> dm_scan_fdt_dev(dev); // drivers/core/root.c
    |-> dm_scan_fdt_node();
        |-> lists_bind_fdt(); // drivers/core/lists.c
            |   // 通过 compatible 匹配设备和驱动
            |-> device_bind_with_driver_data();
                |-> device_bind_common(); // drivers/core/device.c
                    |-> uclass_get(&uc)
                    |-> uclass_bind_device(dev)
                    |-> drv->bind(dev)
                        aic_dwmmc_bind(dev);
                            |
         +------------------+
         |
aic_dwmmc_bind(dev); // drivers/mmc/artinchip_dw_mmc.c
|-> dwmci_bind(dev, ...); // drivers/mmc/dw_mmc.c
    |
    |-> mmc_bind(dev, &plat->mmc, &plat->cfg); // drivers/mmc/mmc-uclass.c
        |  // 绑定一个 IF_TYPE_MMC 的 Block 子设备，这样可以通过块设备的接口
        |  // 使用 MMC。
        |
        |-> blk_create_devicef(dev, "mmc_blk", "blk",IF_TYPE_MMC, devnum,
        |   |                   512, 0, &bdev); // drivers/block/blk-uclass.c
        |   |-> blk_create_device(parent, "mmc_blk", dev_name, if_type,
        |       |                   devnum, blksz, lba, devp);
        |       |-> device_bind_driver(parent, drv_name, name, &dev);
        |           |   // drivers/core/lists.c
        |           |-> ....
        |               |-> device_bind_common(dm_root, ...);
        |                   |-> uclass_get(drv->id, &uc); id = UCLASS_BLK
        |                   |-> dev = calloc(1, sizeof(struct udevice));
        |                   |   dev->name = name; // 块设备名字
        |                   |   dev->parent = parent; // 指向 MMC 设备
        |                   |   dev->driver = drv; // "mmc_blk" driver
        |                   |   dev->uclass = uc; // UCLASS_BLK
        |                   |   // 创建设备 mmc_blk
        |                   |
        |                   |-> uclass_bind_device(dev);
        |                       // 将设备添加到 UCLASS_BLK 列表中
        |
        |-> dev_get_uclass_platdata(bdev);
```

#### 7.3.2. Probe 流程

SPL 中的 Probe 流程如下。由于 BLK 设备的 probe 的目的是调用 `mmc_init()` ， 这里直接调用，所以不需要单独的 Probe 了。

```
spl_mmc_load(); // common/spl/spl_mmc.c
|-> spl_mmc_find_device(&mmc, bootdev->boot_device);
|   |-> mmc_initialize(NULL); // drivers/mmc/mmc.c
|   |   |-> mmc_probe(bis);
|           |-> uclass_get(UCLASS_MMC, &uc);
|           |-> device_probe(dev); // drivers/core/device.c
|               |  // 这里对 UCLASS_MMC 列表中的设备逐个调用
|               |  // device_probe(dev)
|               |
|               |--> aic_dwmmc_probe(...) // 具体驱动的 probe
|
|-> mmc_init(mmc);
```

U-Boot 中 MMC 设备和对应的 BLK 设备 Probe 流程如下。

MMC 设备的 Probe 在 `board_init_r()` 调用 `initr_mmc()` 时进行。对应的 BLK 设备的 Probe 在第一次使用时进行，通常是 `initr_env()` ，该函数加载 MMC 上的环境变量。

```
board_init_r(gd_t *new_gd, ulong dest_addr)
|-> ...
|-> initr_dm(void)
|-> ...
|-> initr_mmc(void)
|-> initr_env(void)
initr_mmc(void)
|-> mmc_initialize(gd->bd); // drivers/mmc/mmc.c
    |-> mmc_probe(bis = gd->bd);
        |-> uclass_get(UCLASS_MMC, &uc);
        |-> device_probe(dev); // drivers/core/device.c
            |  // 这里对 UCLASS_MMC 列表中的设备逐个调用
            |  // device_probe(dev)
            |
            |--> aic_dwmmc_probe(...) // 具体驱动的 probe
initr_env(void) // common/board_r.c
|
|-> env_relocate(void) // env/common.c
    |-> env_load(void) // env/env.c
        | // 这个函数执行读取环境变量的动作
        |
        |-> drv = env_driver_lookup(ENVOP_LOAD, prio)
        |   // u-boot 通过 U_BOOT_ENV_LOCATION 宏定义了各种可以用于加载
        |   // 环境变量的驱动 (struct env_driver)，并且在 lds 中将这些
        |   // 驱动收集到一个固定的段中，这里遍历各个驱动，尝试加载 ENV
        |
        |-> drv->load()/env_mmc_load(void) // env/mmc.c
            env_mmc_load();
                    |
    +---------------+
    |
env_mmc_load(); // env/mmc.c
|--> devno = mmc_get_env_dev();
|--> mmc = find_mmc_device(devno);
     |--> init_mmc_for_env(mmc)
          |--> blk_get_from_parent(mmc->dev, &dev)
               |--> device_find_first_child(parent, &blkdev);
               |    // 获取 mmc_blk 设备
               |
               |--> device_probe(blkdev)
                    |--> mmc_blk_probe(...) // drivers/mmc/mmc-uclass.c
                         |--> mmc_init(mmc) // drivers/mmc/mmc.c
```

#### 7.3.3. 读写流程

通过 BLK 接口对 MMC 进行读写的调用流程如下。

```
blk_dread(mmc_get_blk_desc(mmc), blk, cnt, addr);
|    // drivers/block/blk-uclass.c
|
|--> ops->read(dev, start, blkcnt, buffer);
     mmc_bread(dev, start, blkcnt, buffer); // drivers/mmc/mmc.c
     |--> mmc_read_blocks(mmc, dst, start, cur); // drivers/mmc/mmc.c
          |--> mmc_send_cmd(mmc, &cmd, &data) //drivers/mmc/mmc-uclass.c
               |--> ops->send_cmd(dev, cmd, data);
                    dwmci_send_cmd(dev, cmd, data); // drivers/mmc/dw_mmc.c
blk_dwrite(mmc_get_blk_desc(mmc), blk, cnt, addr);
|    // drivers/block/blk-uclass.c
|
|--> ops->write(dev, start, blkcnt, buffer);
     mmc_bwrite(dev, start, blkcnt, buffer); // drivers/mmc/mmc_write.c
     |-> mmc_write_blocks(mmc, start, cur, src); // drivers/mmc/mmc_write.c
          |--> mmc_send_cmd(mmc, &cmd, &data) //drivers/mmc/mmc-uclass.c
               |--> ops->send_cmd(dev, cmd, data);
                    dwmci_send_cmd(dev, cmd, data); // drivers/mmc/dw_mmc.c
```