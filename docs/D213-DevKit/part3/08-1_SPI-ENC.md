---
sidebar_position: 29
---
# SPI ENC

## 1. 模块介绍

### 1.1. 术语定义

| 术语 | 定义                         | 注释说明               |
| ---- | ---------------------------- | ---------------------- |
| AES  | Advanced Encryption Standard | 一种对称分组密钥算法   |
| ECB  | Electronic Code Book         | 电子密码本模式         |
| CTR  | Counter                      | 计数器模式             |
| SPI  | Serial Peripheral Interface  | 串行外设接口           |
| BROM | Boot ROM                     | 固化在芯片中的启动程序 |

### 1.2. 模块简介

SPI_ENC 是一个对 SPI 总线上的数据进行在线加密和解密的模块。 使用该模块，可实现对 CPU 透明的 SPI 数据加密存储，即 CPU 对 SPI 存储设备的读写数据都是明文， 但存储在 SPI 设备上的数据是密文，数据的加密和解密操作在 SPI 总线数据传输过程中完成。

SPI_ENC 具备下列功能特性：

> - 使用 AES-128-CTR 加密和解密
> - 可通过配置连接到不同的 SPI 控制器
> - 可通过 eFuse 配置密钥
> - 支持明文和密文混合传输
> - 不影响 SPI 总线传输带宽
> - 不支持 SPI 全双工模式
> - 使用所连接的 SPI 控制器的 HCLK
> - 内置 64 字节分组密钥 Buffer
> - 支持空 Page 检测

用途：

> - 可用于实现 SPI NAND / SPI NOR 的全盘加密
> - SPI NAND / SPI NOR 上的固件防拷贝

### 1.3. 原理框图

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/spienc_block_diagram2.png](https://photos.100ask.net/artinchip-docs/d213-devkit/spienc_block_diagram2-17067679072711.png)

图 8.6 *SPI ENC 原理框图*

## 2. 参数配置

### 2.1. 内核配置

使能 SPI_ENC 相关的内核驱动，可在通过下列命令进行配置（在 SDK 顶层目录执行）:

```
make linux-menuconfig
```

在内核的配置界面中，进行下列的选择:

```
Cryptographic API  --->
    [*]   Hardware crypto devices  --->
        [*]   Support for artinchip cryptographic accelerator
            <*>     Artinchip's SPI Bus on-the-fly encryption driver
```

进行如上的配置之后，内核 SPI_ENC 驱动使能，SPI NOR / SPI NAND 驱动在数据访问时， 自动进行数据加解密。

### 2.2. DTS 配置

芯片级的 DTS:

```
spienc: spienc@18100000 {
    compatible = "artinchip,aic-spienc-v1.0";
    reg = <0x18100000 0x1000>;
    interrupts-extended = <&plic0 41 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cmu CLK_SPIENC>;
    resets = <&rst RESET_SPIENC>;
    aic,spienc-tweak = <0>;
};
```

其中板级的配置 `board.dts` 中需要使能该模块:

```
&spienc {
    aic,spienc-tweak = <0>;
    status = "okay";
};
```

`board-u-boot.dtsi` 需要设置 `u-boot,dm-pre-reloc` ，只有设置了该标记，SPL 中才可以使用 SPI_ENC:

```
&spienc {
    u-boot,dm-pre-reloc;
};
```

DTS 中的 `aic,spienc-tweak` 可以影响 COUNTER 的生成，进而改变加密的结果。 如果需要让在不同的产品对相同的数据有不同的加密结果，则可以在 DTS 中调整该值。

并且需要配置具体的 SPI NAND / SPI NOR 设备是否使能加密:

> - `aic,encrypt`
> - `aic,spi-id`

例如： `board.dts`

```
&spi0 {
    pinctrl-names = "default";
    pinctrl-0 = <&spi0_pins_a>;
    status = "okay";
    spi-flash@0 {
        #address-cells = <1>;
        #size-cells = <1>;
        compatible = "spi-nand";
        spi-max-frequency = <24000000>;
        spi-tx-bus-width = <1>;
        spi-rx-bus-width = <1>;
        reg = <0>;
        aic,encrypt;            // 标记该存储设备使能 SPI_ENC
        aic,spi-id = <0>;       // 设置当前存储设备所挂载的 SPI 控制器 ID
        status = "okay";
    };
};

&spi1 {
    pinctrl-names = "default";
    pinctrl-0 = <&spi1_pins_a>;
    status = "okay";
    spi-flash@0 {
        #address-cells = <1>;
        #size-cells = <1>;
        compatible = "jedec,spi-nor";
        spi-max-frequency = <24000000>;
        spi-tx-bus-width = <1>;
        spi-rx-bus-width = <1>;
        reg = <0>;
        aic,encrypt;            // 标记该存储设备使能 SPI_ENC
        aic,spi-id = <1>;       // 设置当前存储设备所挂载的 SPI 控制器 ID
        status = "okay";
    };
};
```

### 2.3. 密钥配置

SPI_ENC 模块使用 AES-128-CTR 算法对 SPI 总线数据进行加解密，该算法在计算时的密钥有两部分

> - 128 bit AES 密钥(KEY)
> - 128 bit 数据块的 COUNTER 值

其中 KEY 直接使用 eFuse 中的 `SPI_ENC_KEY` ，COUNTER 值则由几部分共同产生

> - eFuse 中的 `SPI_ENC_NONCE`
> - DTS 中配置的 `aic,spienc-tweak`
> - 访问数据所在的地址 `address`

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/spienc_counter_value1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/spienc_counter_value1-17067679436853.png)

图 8.7 *COUNTER 值的生成*

因此在使能 SPI_ENC 时，需要设置以下的 eFuse 信息：

| eFuse 区域         | 大小(BIT) | 说明                                            |
| ------------------ | --------- | ----------------------------------------------- |
| SPI_ENC_KEY        | 128       | AES 密钥，烧录后应设置不可读写                  |
| SPI_ENC_NONCE      | 64        | 用于生成 COUTNER 的随机数，烧录后应设置不可读写 |
| SPI_ENC_ENABLE BIT | 1         | 使能 BROM 的 SPI_ENC 功能，才可正确启动         |

具体 eFuse 区域的地址，请参考芯片的数据手册。

## 3. 调试指南

### 3.1. 调试开关

可通过内核配置使能 SPI_ENC 模块的 DEBUG 选项。在 SDK 根目录下执行:

```
make linux-menuconfig (or make km)
```

进入内核的配置界面:

```
Linux
    Kernel hacking
        Artinchip Debug
            [*] SPI ENC driver debug
```

勾选使能该 DEBUG 选项后：

> 1. SPI_ENC 的驱动源码将以 `-O0` 编译
> 2. SPI_ENC 驱动中的 pr_dbg() 和 dev_dbg() 调试信息会被编译
> 3. Sysfs 中新增 `/sys/devices/platform/soc/18100000.spienc/bypass` 节点

如果需要看到 pr_dbg() 和 dev_dbg() 的打印信息，还需要设置 `loglevel=8` 。

若需要在启动过程中即可看到打印，需要在 `env.txt` 中修改 bootargs，增加 `loglevel=8` 。 若仅需要在板子启动到 Linux shell 后使能相关打印，可以通过下列命令调整 loglevel：

```
echo 8 > /proc/sys/kernel/printk
```

### 3.2. Sysfs 节点

SPI_ENC 驱动在 `/sys/devices/platform/soc/` 目录下创建了 Sysfs 节点 `18100000.spienc/`

其中通过下列命令可读取当前硬件状态：

```
cat /sys/devices/platform/soc/18100000.spienc/status
```

如果按照上一节的指引，使能了调试开关，还可以看到节点：

```
/sys/devices/platform/soc/18100000.spienc/bypass
```

通过下列命令，可以开关 ByPass SPIENC 加密功能：

```
echo "1" > /sys/devices/platform/soc/18100000.spienc/bypass
echo "0" > /sys/devices/platform/soc/18100000.spienc/bypass
```

ByPass 之后，读写 SPI 存储的数据都是原始数据，不会做加密或者解密。

小技巧

Bypass 是一个调试功能，如果没有按照上节的指引勾选 [*] SPI ENC driver debug，则 Sysfs 中没有 bypass 文件节点。

## 4. 测试指南

### 4.1. 测试的配置

> 1. 需要按照 [调试指南](3_debug_guide.html#ref-to-spienc-debug) 使能调试开关
> 2. 编译 mtd-util 中的 Flash 工具

mtd-util 的使能方法：

```
make menuconfig
```

然后勾选：

```
Third-party packages  --->
    [*] mtd, jffs2 and ubi/ubifs tools  --->
        [*]   mtd_debug
```

### 4.2. 测试的命令

```
mtd_debug info <device>

e.g.
mtd_debug info /dev/mtd0
```

擦除数据：

```
mtd_debug erase <device> <offset> <len>

e.g.
mtd_debug erase /dev/mtd0 0x0 0x40000
```

写入数据：

```
mtd_debug write <device> <offset> <len> <source-filename>

e.g.
mtd_debug write /dev/mtd0/ 0 0x40000 data.bin
```

读取数据：

```
mtd_debug read <device> <offset> <len> <dest-filename>

e.g.
mtd_debug read /dev/mtd0/ 0 0x40000 data.bin
```

### 4.3. 读写的测试

测试写入到 Flash 的数据是否被加密：

> 1. 写之前注意确认 SPI_ENC 没有被 Bypass
>
>    ```
>    cat /sys/devices/platform/soc/18100000.spienc/bypass
>    ```
>
>    应得到
>
>    ```
>    bypass = 0
>    ```
>
> 2. 写入测试数据
>
>    ```
>    mtd_debug write /dev/mtd0/ 0 0x40000 data.bin
>    ```
>
> 3. Bypass SPI_ENC 然后读取 Flash Raw data
>
>    ```
>    echo "1" > /sys/devices/platform/soc/18100000.spienc/bypass
>    mtd_debug read /dev/mtd0/ 0 0x40000 raw_data.bin
>    ```
>
> 4. 对比两份数据，应该不同

测试 Bypass 写入的数据没有被加密：

> 1. 设置 Bypass
>
>    ```
>    echo "1" > /sys/devices/platform/soc/18100000.spienc/bypass
>    ```
>
> 1. 写入测试数据
>
>    ```
>    mtd_debug write /dev/mtd0/ 0 0x40000 data.bin
>    ```
>
> 2. 读取数据
>
>    ```
>    mtd_debug read /dev/mtd0/ 0 0x40000 raw_data.bin
>    ```
>
> 3. 对比两份数据，应该相同

## 5. 设计说明

### 5.1. 源码说明

| 相关模块         | 源码路径                                           |
| ---------------- | -------------------------------------------------- |
| Crypto subsystem | source/linux-5.10/crypto/                          |
| Driver           | source/linux-5.10/drivers/crypto/artinchip/spienc/ |

### 5.2. 模块架构

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/spienc_arch.png](https://photos.100ask.net/artinchip-docs/d213-devkit/spienc_arch-17067680415425.png)

文件系统或者应用程序通过 MTD 层访问 SPI NOR / SPI NAND 设备的数据，SPI NOR / SPI NAND 驱动在通过 SPI 总线传输数据。

在 SPI NOR / SPI NAND 驱动通过 SPI 总线访问相关数据时，其实需要发送一系列的命令来进行数据的读写。 这个过程中，命令通信的数据，包括一些读写 SPI NOR / SPI NAND 的寄存器数据都不能加密， 仅存储数据部分需要进行加密处理。因此，虽然 SPI_ENC 是在硬件总线上对数据进行加密， 但是软件使用时需要在 SPI NOR / SPI NAND 驱动 根据需要，提供必要的加解密信息（数据地址和长度）， 并且启动相应的数据传输加解密。

因此在软件层次上，SPI NOR / SPI NAND 驱动依赖 SPI 驱动以及 SPI_ENC 驱动，而 SPI 驱动与 SPI_ENC 驱动是并列关系。

### 5.3. 设计要点

在设计实现 SPI_ENC 的驱动时，主要考虑了 SPI_ENC 的本身特点，以及与 SPI NOR / SPI NAND 驱动的结合。

#### 5.3.1. 融入内核加密子系统

内核加密子系统提供了一个框架，通过该框架提供了不同算法的对接方法， 常见的算法以及对应的硬件加速实现都可以通过该框架提供给使用者。

SPI_ENC 硬件模块实现了 AES-128-CTR 算法，但是由于 COUNTER 的生成方式是通过自定义规则生成， 密钥由硬件从 eFuse 中读取等，使得该算法与正常的 AES-128-CTR 不同，因此融入内核加密子系统时， **将 SPI_ENC 抽象为一种特殊的 AES-128-CTR 算法实现** ，通过 AES-128-CTR 的 API 进行使用， 但是做一些特殊处理。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/spienc_kenerl_crypto_arch.png](https://photos.100ask.net/artinchip-docs/d213-devkit/spienc_kenerl_crypto_arch-17067680630857.png)

图 8.8 *加入内核加密子系统*

将 SPI_ENC 的 AES-128-CTR 算法注册到内核加密子系统：

```
static struct aic_spienc_alg spienc_alg = {
    .alg = {
        .base.cra_name = "ctr(aes)",
        .base.cra_driver_name = "ctr-aes-spienc-aic",
        .base.cra_priority = 200,
        .base.cra_flags = CRYPTO_ALG_ASYNC |
                  CRYPTO_ALG_ALLOCATES_MEMORY |
                  CRYPTO_ALG_KERN_DRIVER_ONLY,
        .base.cra_blocksize = 1,
        .base.cra_ctxsize = sizeof(struct aic_spienc_ctx),
        .base.cra_alignmask = 0xf,
        .base.cra_module = THIS_MODULE,
        .init = aic_spienc_alg_init,
        .decrypt = aic_spienc_decrypt,
        .encrypt = aic_spienc_encrypt,
        .ivsize = AES_BLOCK_SIZE,
    },
};
```

设置说明：

> - `cra_blocksize`: 设置为 1，即使用本算法，可以按字节设置加解密的数据长度。
> - `ivsize`: 设置为 AES_BLOCK_SIZE，外部通过 IV 来提供地址、SPI ID 等信息
> - `min_keysize`/`max_keysize`: 不设置，使用 eFuse 密钥，非外部密钥

提供给外部（SPI NAND / SPI NOR）使用的 API：

|      | 加密子系统 API                                               | 说明                                                        |
| ---- | ------------------------------------------------------------ | ----------------------------------------------------------- |
| 1    | struct crypto_skcipher *crypto_alloc_skcipher( const char *alg_name, u32 type, u32 mask) | 直接指定算法驱动名字`ctr-aes-spienc-aic`                    |
| 2    | struct skcipher_request *skcipher_request_alloc( struct crypto_skcipher *tfm, gfp_t gfp) | 分配一个数据请求结构体                                      |
| 3    | void skcipher_request_set_callback(struct skcipher_request *req, u32 flags,crypto_completion_t compl, void *data) | 设置处理完毕时的回调函数                                    |
| 4    | void skcipher_request_set_crypt(struct skcipher_request *req,struct scatterlist *src, struct scatterlist *dst, unsigned int cryptlen, void *iv) | 无输入输出 buffer，仅提供数据长度。通过 IV 提供地址、SPI ID |
| 5    | int crypto_skcipher_decrypt(struct skcipher_request *req)    | 启动解密，用于读                                            |
| 6    | int crypto_skcipher_encrypt(struct skcipher_request *req)    | 启动加密，用于写                                            |
| 7    | void skcipher_request_free(struct skcipher_request *req)     | 释放资源                                                    |
| 8    | void crypto_free_skcipher(struct crypto_skcipher *tfm)       | 释放资源                                                    |

注解

由于 SPI_ENC 内部使用 eFuse 所提供的密钥，因此不需要通过外部设置密钥函数：

int crypto_skcipher_setkey(struct crypto_skcipher *tfm, const u8 *key, unsigned int keylen);

来设置密钥。

调用 `skcipher_request_set_crypt()` API 时，通过 `iv` 提供的并不是 COUNTER 值，而是用于生成 COUNTER 值的信息，具体为：

```
struct aic_spienc_iv {
    u32 addr;       // 要读写的数据在 SPI NAND / SPI NOR 上的地址
    u32 cpos;       // 密文在本次传输数据中开始位置
    u32 tweak;      // 生成 COUNTER 的调整值
    u32 spi_id;     // 要使用的 SPI 控制器 ID
};
```

#### 5.3.2. 数据读写时启用

SPI NAND / SPI NOR 驱动通过发送命令的方式与 SPI NAND / SPI NOR 器件进行交互，从而实现数据的读写。 在使能 SPI_ENC 之后，SPI NAND / SPI NOR 驱动需要进行区分：

> - 非存储数据的 SPI 传输，不启动 SPI_ENC，按照原有驱动的流程执行
> - 存储数据的 SPI 传输，启动 SPI_ENC 进行加密或者解密

因此 SPI NAND / SPI NOR 驱动需要做一些改动，在对存储数据进行读写时，使用 Crypto API 启动 SPI_ENC。

以 SPI NAND 为例： probe 时首先进行加密相关的初始，读取 DTS 中的 `aic,encrypt` 和 `aic,spi-id` 等信息。

```
 spinand_probe();
 |-> spinand_init(spinand);
"|-> spinand_enc_init(spinand);
 |-> mtd_device_register(mtd, NULL, 0);
```

读操作流程：

```
spinand_read_page();
|-> spinand_load_page_op(spinand, req);
|-> spinand_wait(spinand, &status);
|-> spinand_read_from_cache_op();
"   |-> spinand_enc_xfer_cfg(spinand, addr, clen);                          // 配置访问地址，以及密文的长度
"   |-> spinand_enc_read();
"       |-> spinand_enc_get_skcipher(spinand);
"       |   |-> crypto_alloc_skcipher("ctr-aes-spienc-aic", 0, 0);
"       |   |-> req = skcipher_request_alloc(tfm, GFP_NOFS);
"       |
"       |-> skcipher_request_set_callback();
"       |-> skcipher_request_set_crypt(req, 0, 0, decrypt_len, &ivinfo);    // 设置本次加密数据信息
"       |-> crypto_skcipher_decrypt(req);                                   // 启动 SPI_ENC
        |-> spi_mem_exec_op(desc->mem, &op);                                // 调用标准的 SPI API 进行数据传输
"       |-> spinand_enc_wait(spinand->priv);                                // 等待解密处理结束
```

写操作流程：

```
spinand_write_page();
|-> spinand_write_enable_op(spinand);
|-> spinand_write_to_cache_op(spinand, req);
|  "|-> spinand_enc_xfer_cfg(spinand, addr, clen);                          // 配置访问地址，以及密文的长度
|  "|-> spinand_enc_write();
|  "    |-> spinand_enc_get_skcipher(spinand);
|  "    |   |-> crypto_alloc_skcipher("ctr-aes-spienc-aic", 0, 0);
|  "    |   |-> req = skcipher_request_alloc(tfm, GFP_NOFS);
|  "    |
|  "    |-> skcipher_request_set_callback();
|  "    |-> skcipher_request_set_crypt(req, 0, 0, decrypt_len, &ivinfo);    // 设置本次加密数据信息
|  "    |-> crypto_skcipher_encrypt(req);                                   // 启动 SPI_ENC
|       |-> spi_mem_exec_op(desc->mem, &op);                                // 调用标准的 SPI API 进行数据传输
|  "    |-> spinand_enc_wait(spinand->priv);                                // 等待加密处理结束
|-> spinand_program_op(spinand, req);
|-> spinand_wait(spinand, &status);
```

#### 5.3.3. 空数据块的检测

SPI NAND / SPI NOR 在执行了擦除之后，存储单元上的数据被认为是空的，值都是 `0xFF` 。 但是在使用过程中，读取程序并不一定知道所读取的区域是否是被擦除过，因此在使能了 SPI_ENC 之后， 通过 SPI 读取回来该区域的数据都是被 SPI_ENC 解密后的数据。原本是被擦除后的 `0xFF` ， 读回来的却是其他数据。

带来的问题：

> 有些程序，如文件系统，会判断读回来的数据是否都为 `0xFF` ，如果是，则认为是未使用的块，做特殊处理。 现在读回来的数据却被改变了，会导致原来的处理逻辑全部失效。

为了解决上述问题，SPI_ENC 提供了一个空块检测功能。如下图所示：

> - 首先按照正常的流程读取一块数据
> - 传输完成之后，检查 SPI_ENC 的状态，如果提示解密前的所有数据都是 `0xFF` ，则软件将读取的结果全部置为 `0xFF`

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/spienc_empty_detect1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/spienc_empty_detect1-17067680895009.png)

图 8.9 *空块检测*[¶](#id15)

相关的软件操作，在 `spinand_enc_read()` 和 `spi_nor_enc_read()` 中完成。

### 5.4. 关键流程

#### 5.4.1. 初始化

```
aic_spienc_probe();
|-> drvdata->base = devm_platform_ioremap_resource(pdev, 0);
|-> irq = platform_get_irq(pdev, 0);
|-> devm_request_threaded_irq(dev, irq, aic_spienc_irq_handler,
                              aic_spienc_irq_thread, IRQF_ONESHOT,
                              dev_name(dev), drvdata);
|-> drvdata->clk = devm_clk_get(dev, NULL);
|-> clk_prepare_enable(drvdata->clk);
|-> devm_reset_control_get(dev, NULL);
|-> platform_set_drvdata(pdev, drvdata);
|-> crypto_register_skcipher(&spienc_alg.alg);  // 注册算法
```

#### 5.4.2. 加解密配置

```
aic_spienc_encrypt(req);
|-> aic_spienc_xcrypt(req);
    |-> aic_spienc_attach_bus(drvdata, ivinfo->spi_id);
    |-> writel(ivinfo->addr, (drvdata->base + SPIE_REG_ADDR));
    |-> writel(ivinfo->cpos, (drvdata->base + SPIE_REG_CPOS));
    |-> writel(clen, (drvdata->base + SPIE_REG_CLEN));
    |-> writel(tweak, (drvdata->base + SPIE_REG_TWEAK));
```

解密流程相同。

#### 5.4.3. 中断流程

当中断发生时，首先在 irq handler 中读取并保存状态寄存器。

```
static irqreturn_t aic_spienc_irq_handler(int irq, void *arg)
{
    struct aic_spienc_drvdata *drvdata = arg;

    drvdata->irq_sts = readl(drvdata->base + SPIE_REG_ISR);

    return IRQ_WAKE_THREAD;
}
```

然后唤醒对应的处理线程进行处理。

```
static irqreturn_t aic_spienc_irq_thread(int irq, void *arg)
{
    struct aic_spienc_drvdata *drvdata = arg;
    struct crypto_async_request *base;
    int err = 0;
    u32 val = 0;

    if (drvdata->irq_sts & SPIE_INTR_ENC_DEC_FIN_MSK) {
        if (drvdata->irq_sts & SPIE_INTR_ALL_EMP_MSK)
            err = AIC_SPIENC_ALL_FF;
        base = &drvdata->req->base;
        base->complete(base, err);

        /* Stop it */
        val = readl((drvdata->base + SPIE_REG_CTL));
        val &= ~SPIE_START_MSK;
        writel(val, (drvdata->base + SPIE_REG_CTL));

        /* Clear interrupts */
        drvdata->irq_sts = 0;
        writel(SPIE_INTR_ALL_MSK, (drvdata->base + SPIE_REG_ISR));
    }

    return IRQ_HANDLED;
}
```

### 5.5. 数据结构

设备数据结构。

```
struct aic_spienc_drvdata {
    struct attribute_group attrs;
    struct device *dev;
    void __iomem *base;
    struct clk *clk;
    struct skcipher_request *req;
    u32 tweak; /* Tweak value for hardware to generate counter */
    u32 irq_sts;
};
```

### 5.6. 接口设计

#### 5.6.1. aic_spienc_alg_init

| **函数原型** | int aic_spienc_alg_init(struct crypto_skcipher *tfm) |
| ------------ | ---------------------------------------------------- |
| **功能说明** | 对称密钥算法的初始化函数                             |
| **参数定义** | struct crypto_skcipher *tfm算法实例指针              |
| **返回值**   | 0: 成功其他: 失败                                    |
| **注意事项** |                                                      |

#### 5.6.2. aic_spienc_probe

| **函数原型** | int aic_spienc_probe(struct platform_device *pdev) |
| ------------ | -------------------------------------------------- |
| **功能说明** | 驱动的初始化函数                                   |
| **参数定义** | struct platform_device *pdev设备指针               |
| **返回值**   | 0: 成功其他: 失败                                  |
| **注意事项** |                                                    |

#### 5.6.3. aic_spienc_attach_bus

| **函数原型** | int aic_spienc_attach_bus(struct aic_spienc_drvdata *drvdata, u32 bus) |
| ------------ | ------------------------------------------------------------ |
| **功能说明** | 将 SPI ENC 连接到指定的 SPI 控制器                           |
| **参数定义** | struct aic_spienc_drvdata *drvdata设备驱动数据指针u32 busSPI 控制器 ID |
| **返回值**   | 0: 成功其他: 失败                                            |
| **注意事项** |                                                              |

#### 5.6.4. aic_spienc_encrypt

| **函数原型** | int aic_spienc_encrypt(struct skcipher_request *req) |
| ------------ | ---------------------------------------------------- |
| **功能说明** | 配置 SPI_ENC 启动数据加密                            |
| **参数定义** | struct skcipher_request *req加密请求指针             |
| **返回值**   | 0: 成功其他: 失败                                    |
| **注意事项** |                                                      |

#### 5.6.5. aic_spienc_decrypt

| **函数原型** | int aic_spienc_decrypt(struct skcipher_request *req) |
| ------------ | ---------------------------------------------------- |
| **功能说明** | 配置 SPI_ENC 启动数据解密                            |
| **参数定义** | struct skcipher_request *req解密请求指针             |
| **返回值**   | 0: 成功其他: 失败                                    |
| **注意事项** |                                                      |

## 6. 常见问题