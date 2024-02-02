---
sidebar_position: 31
---
# eFuse 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语  | 定义          | 注释说明     |
| ----- | ------------- | ------------ |
| SID   | Secure ID     | 安全 ID 模块 |
| eFuse | Electric Fuse | 电子熔丝     |

### 1.2. eFuse 简介

芯片电路通常是生产时物理固化的电路，生产完成之后不可改变。实际应用中有一些重要信息，需要固化在芯片之中， 使得上电即可读取使用，比如一些硬件的性能参数信息。但是这些参数可能与芯片的生产工艺、所用的材料等有关系， 无法在设计时确定，因此需要有一种存储技术，即可以固化信息，又能够在生产之后进行修改。

eFuse 就是一种允许芯片上的电路在运行时进行修改的技术。它类似 EEPROM，属于一次性可编程存储器。eFuse ROM 里初始存储的内容都是 0，当需要修改某个比特位的值时，通过片上电压（通常为2.5V）提供一个持续一定时长的直流脉冲， 将代表该比特位的单根熔丝烧断，使得该比特位变为 1。熔丝被烧断之后，无法再恢复连接，因此这样的修改是一次性不可逆的。

### 1.3. eFuse 的应用

Artinchip 芯片中使用 eFuse 保存的配置信息包括（但不限于）：

> - 芯片 ID
> - 校准参数
> - 功能开关配置
> - 密钥信息

eFuse 内容通过 SID 硬件模块来访问。

## 2. 参数配置

通常eFuse 信息的读写启动程序、生产过程比较相关，内核以及用户态程序不需要关心 eFuse 的内容。 但由于 eFuse 中也可以保留一些产品相关的信息，因此也可以通过内核相关驱动读取 eFuse。

### 2.1. 内核配置

使能 SPI 相关的内核驱动，可在通过下列命令进行配置（在 SDK 顶层目录执行）:

```
make linux-menuconfig
```

在内核的配置界面中，进行下列的选择:

```
Device Drivers  --->
    -*- NVMEM Support  --->
        [*]   /sys/bus/nvmem/devices/*/nvmem (sysfs interface)
        [*]   Artinchip SoC eFuse Support
```

进行如上的配置之后，内核 eFuse 驱动使能。

### 2.2. DTS 配置

芯片级的 DTS:

如需修改默认配置，请咨询原厂支持人员。

```
sid: sid@19010000 {
    compatible = "artinchip,sid-v1.0";
    reg = <0x19010000 0x800>;
    clocks = <&cmu CLK_SID>;
    resets = <&rst RESET_SID>;
};
```

## 3. 调试指南

### 3.1. 调试开关

可通过内核配置使能 eFuse 模块的 DEBUG 选项。在 SDK 根目录下执行:

```
make linux-menuconfig (or make km)
```

进入内核的配置界面:

```
Linux
    Kernel hacking
        Artinchip Debug
            [*] SID(eFuse) driver debug
```

勾选使能该 DEBUG 选项后：

> 1. eFuse 的驱动源码将以 `-O0` 编译
> 2. eFuse 驱动中的 pr_dbg() 和 dev_dbg() 调试信息会被编译

如果需要看到 pr_dbg() 和 dev_dbg() 的打印信息，还需要设置 `loglevel=8` 。

若需要在启动过程中即可看到打印，需要在 `env.txt` 中修改 bootargs，增加 `loglevel=8` 。 若仅需要在板子启动到 Linux shell 后使能相关打印，可以通过下列命令调整 loglevel：

```
echo 8 > /proc/sys/kernel/printk
```

## 4. 测试指南

eFuse 在用户空间仅可读取，不可写。

读取 eFuse 内容可通过下列命令进行：

```
hexdump /sys/bus/nvmem/devices/aic-efuse0/nvmem
```

## 5. 设计说明

### 5.1. 源码说明

| 相关模块        | 源码路径                                        |
| --------------- | ----------------------------------------------- |
| NVMEM subsystem | source/linux-5.10/drivers/nvmem/core            |
| Driver          | source/linux-5.10/drivers/nvmem/artinchip-sid.c |

### 5.2. 模块架构

eFuse 在内核中通过 NVMEM 层对接其他各模块。NVMEM 在内核中被虚拟为一个总线上，可以挂载各种 NVMEM 设备。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/nvmem_kernel.png](https://photos.100ask.net/artinchip-docs/d213-devkit/nvmem_kernel-17067692060611.png)

图 8.22 *NVMEM 内核架构*

在内核中，其他模块透过 `NVMEM Consumer API` 进行读写交互； 在用户空间，应用程序可以通过 sysfs 文件节点 `sys/bus/nvmem/devices/*/nvmem` 进行读写操作。多数设备仅支持用户空间应用程序读，不支持写。

在 NVMEM 中，有存储设备(Device)和存储单元(Cell) 的概念。除了将 Device 注册到 NVMEM 之外，还可以注册 Cell。 比如 eFuse 中，eFuse 就是一个设备，设备中可以划分 Cell：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/nvmem_cell.png](https://photos.100ask.net/artinchip-docs/d213-devkit/nvmem_cell-17067692152243.png)

图 8.23 *存储单元*

在配置 DTS 时可描述 Device 需要暴露的 Cell 信息，包括位置、大小等。比如：

```
sid: sid@19010000 {
    compatible = "artinchip,sid-v1.0";
    reg = <0x19010000 0x1000>;
    clocks = <&cmu CLK_SID>;
    resets = <&rst RESET_SID>;
    chip_id: chip-id@10 {
        reg = <0x10 0x18>;
    };
    test-config: test-config@20 {
        reg = <0x20 0x1>;
        bits = <2 4>;
    };
};
```

此处描述了一个 test-config cell：

> - 位置：在 eFuse 的 0x20 字节偏移处
> - 长度：0x1 字节
> - 内容：从该字节的 2 比特偏移处开始，共 4 比特长的范围

### 5.3. 关键流程

#### 5.3.1. 初始化

```
aic_sid_probe();
|-> res = platform_get_resource(pdev, IORESOURCE_MEM, 0);
|-> sid->base = devm_ioremap_resource(dev, res);
|-> nvmem = devm_nvmem_register(dev, nvmem_cfg);
|-> platform_set_drvdata(pdev, nvmem);
```

### 5.4. 数据结构

```
struct aic_sid {
    void __iomem *base;
};
```

### 5.5. 接口设计

#### 5.5.1. aic_sid_read

| **函数原型** | int aic_sid_read(void *context, unsigned int offset, void *data, size_t bytes) |
| ------------ | ------------------------------------------------------------ |
| **功能说明** | eFuse 读取接口                                               |
| **参数定义** | void *contextSID(eFuse) 设备指针unsigned int offset读取的位置偏移void *data输出缓冲区size_t bytes读取的数据长度 |
| **返回值**   | 0: 成功其他: 失败                                            |
| **注意事项** |                                                              |

## 6. 常见问题