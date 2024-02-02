---
sidebar_position: 19
---
# I2C 开发指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语          | 定义        | 注释说明                      |
| ------------- | ----------- | ----------------------------- |
| SDA           | I2C数据线   |                               |
| SCL           | I2C时钟线   |                               |
| I2C algorithm | I2C通信方法 | 提供产生I2C总线访问的通信函数 |
| I2C adapter   | I2C适配器   | 对I2C控制器的软件抽象         |
| I2C client    | I2C客户端   | 一个client对应一个I2C device  |

### 1.2. 模块简介

I2C模块是一个两线接口，通过SCL和SDA两根线即可完成数据的传输。I2C V1.0的设计完全遵从I2C总线协议标准，不支持SMBus协议。

基本特性如下：

- 支持master和slave模式
- 最高传输速率为400Kb/s
- 支持7bit和10bit寻址
- 且硬件支持I2C总线挂死恢复机制

## 2. I2C配置

### 2.1. 内核配置

#### 2.1.1. master驱动使能

```
Device Drivers
        I2C support--->
                <*> I2C support
                <*> I2C device interface
                    I2C Hardware Bus support--->
                        <*> ArtInChip I2C support
```

#### 2.1.2. slave驱动使能

```
Device Drivers
        I2C support--->
                <*> I2C support
                <*> I2C device interface
                    I2C Hardware Bus support--->
                        <*> ArtInChip I2C support
                        <*> ArtInChip I2C as slave mode
                <*> I2C slave support
                <*>     I2C eeprom slave driver
```

注解

在将I2C作为slave时，需要一个backend程序，作为I2C slave的功能逻辑实现。此处选择内核自带的eeprom，即I2C作为slave时，是当做一个eeprom的功能在使用。也可以根据实际情况自己实现相应的backend代码

#### 2.1.3. eeprom驱动使能

使用I2C接口与eeprom通信，是一种应用非常广泛的场景。此处介绍如何使能内核的eeprom驱动(需要先使能I2C的master驱动)。

```
Device Drivers
        Misc devices--->
                EEPROM support--->
                        <*> I2C EEPROMs/RAMs/ROMs from most vendors
```

### 2.2. DTS配置

#### 2.2.1. I2C公共参数配置

以I2C0为例

```
i2c0: i2c@19220000 {
        compatible = "artinchip,aic-i2c-v1.0";
        reg = <0x0 0x19220000 0x0 0x400>;
        interrupts-extended = <&plic0 84 IRQ_TYPE_LEVEL_HIGH>;
        clocks = <&cmu CLK_I2C0>;
        resets = <&rst RESET_I2C0>;
        #address-cells = <1>;
        #size-cells = <0>;
};
```

#### 2.2.2. I2C master配置

```
&i2c0 {
        pinctrl-names = "default";
        pinctrl-0 = <&i2c0_pins_a>;
        status = "okay";
        eeprom@50 {
                compatible = "atmel,24c64";
                reg = <0x50>;
                pagesize = <32>;
        };
};
```

注解

该配置是将eeprom挂在I2C0总线上的配置，reg属性表示slave设备的地址，pagesize表示eeprom一页有32byte。若在I2C总线上挂其它设备，对DTS进行相应修改即可。

#### 2.2.3. I2C slave配置

```
&i2c0 {
        pinctrl-names = "default";
        pinctrl-0 = <&i2c0_pins_a>;
        status = "okay";
        slave@54 {
                compatible = "slave-24c02";
                reg = <0x40000054>;
        };
};
```

注解

内核的I2C子系统框架会通过查看reg属性的bit30，判断I2C是工作在主机模式还是从机模式。若bit30为1，则为从机模式。上述配置表示I2C工作在从机模式，设备地址为0x54。

若需要设置从机为10bit寻址，则需要设置reg属性的bit31为1，如下图所示，配置从机地址为0x139。

```
&i2c0 {
        pinctrl-names = "default";
        pinctrl-0 = <&i2c0_pins_a>;
        status = "okay";
        slave@139 {
                compatible = "slave-24c02";
                reg = <0xC0000139>;
        };
};
```

## 3. 调试指南

### 3.1. I2C通信调试

在使能I2C的驱动后，可以通过i2c-tools中的i2cdetect工具，快速检测I2C通信功能是否正常。使能驱动后，会创建出相应的I2C适配器，但是I2C通信功能是否正常仍是不确定的，可通过如下命令进行测试：

```
i2cdetect -y -r 0
```

此命令用来测试I2C总线0上的地址分布情况。如果通信正常，即使总线上没有挂接任何I2C设备，那么也会立即返回结果。如果在该测试中返回transfer timeout，那么需要先检查I2C的SDA和SCL是否有上拉(该问题一般是由于没有上拉导致)。如果有上拉，那么需要进一步进行调试。

### 3.2. 调试开关

I2C的驱动由一些dev_dbg的调试信息，默认情况下是不会打印的，当需要进行跟踪调试时，可通过以下步骤打开这些调试信息。

#### 3.2.1. 调整log等级

通过menuconfig调整内核的log等级

```
Kernel hacking--->
    printk and dmesg options--->
        (8) Default console loglevel (1-15)
```

#### 3.2.2. 打开调试开关

```
Kernel hacking--->
    Artinchip Debug--->
        [*] I2C driver debug
```

## 4. 测试指南

### 4.1. 测试环境

#### 4.1.1. 硬件

> - 测试板：带有两个I2C接口的测试板
> - PC：用于和测试板交互
> - 串口线：连接测试板的调试串口

#### 4.1.2. 软件

> - PC端串口终端软件
> - i2c-tools第三方软件包

### 4.2. 测试配置

将测试板的两个I2C，一个配置为master，一个配置为slave。两个I2C接口对接。 编译第三方测试工具i2c-tools，利用i2c-tools提供的工具进行测试

### 4.3. i2c-tools测试

#### 4.3.1. i2cdetect

i2cdetect用于测试系统中有哪些I2C总线，以及I2C总线上有哪些地址被使用

**i2cdetect -l** ：列出系统中所有的I2C总线

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/i2cdetect_1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/i2cdetect_1-17067556663161.png)

**i2cdetect -y -r 0** ：查询I2C-0总线上哪些地址有挂接I2C设备。如下如所示，0x51地址上有挂接I2C设备

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/i2cdetect_2.png](https://photos.100ask.net/artinchip-docs/d213-devkit/i2cdetect_2-17067556722703.png)

#### 4.3.2. i2cset

i2cset用于每次向I2C设备写一个字节的数据

**i2cset -f -y 0 0x54 1 0x39** ：I2C从设备地址为0x54，将从设备中地址1处的数据设置为0x39

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/i2cset.png](https://photos.100ask.net/artinchip-docs/d213-devkit/i2cset-17067556796495.png)

#### 4.3.3. i2cget

i2cget用于每次从I2C设备读取一个字节的数据

**i2cget -f -y 0 0x54 1** ：I2C从设备地址为0x54，读取从设备数据地址为1处的1字节数据

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/i2cget.png](https://photos.100ask.net/artinchip-docs/d213-devkit/i2cget-17067556875597.png)

#### 4.3.4. i2ctransfer

i2ctransfer用于与I2C设备之间传输数据，每次可读写多个数据

**i2ctransfer -f -y 0 w17@0x54 0 0x5a-** ：I2C设备地址为0x54，向从设备写入16byte数据，0为将要写入数据的起始地址，写入的数据为0x5a，0x59，0x58…

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/i2ctransfer_1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/i2ctransfer_1-17067556957419.png)

**i2ctransfer -f -y 0 w1@0x54 0 r16** ：I2C设备地址为0x54，从I2C设备读取16byte数据，读数据的起始地址为0

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/i2ctransfer_2.png](https://photos.100ask.net/artinchip-docs/d213-devkit/i2ctransfer_2-170675571392111.png)

#### 4.3.5. eeprog

eeprog是读写eeprom的工具，每次读写的message只有一个字节。若要读写8个字节，则会分成8个message进行读写

**eeprog -f /dev/i2c-0 0x51 -r 0:8 -16** ：I2C设备地址为0x51，读取的数据起始地址是0，读取8byte数据，-16表示I2C设备的数据地址需要16bit表示

**date | eeprog /dev/i2c-0 0x51 -w 0x200 -16** ：将date命令返回的数据写入到eeprom中，写入的起始地址是0x200

注意

i2c-tools默认是不支持eeprog的编译的，并且使用eeprog时需要确保被操作的eeprom没有通过DTS挂载到I2C总线，否则会一直返回该eeprom处于busy状态。

## 5. 设计说明

### 5.1. 源码说明

源代码位于：linux-5.10/drivers/i2c/busses/

I2C的驱动文件如下：

| 文件                   | 说明                                                      |
| ---------------------- | --------------------------------------------------------- |
| i2c-artinchip.h        | aic I2C公用头文件，I2C模块的寄存器定义，结构体定义等      |
| i2c-artinchip-master.c | I2C作为master时的驱动文件                                 |
| i2c-artinchip-slave.c  | I2C作为slave时的驱动文件                                  |
| i2c-artinchip-common.c | I2C一些公用寄存器读写函数的实现，以及plaform_driver的定义 |

### 5.2. 模块架构

linux中I2C子系统的体系结构如下图所示

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/subsystem_arch.png](https://photos.100ask.net/artinchip-docs/d213-devkit/subsystem_arch-170675580586213.png)

在I2C子系统中，SOC厂商需要实现的就是I2C adapter部分的驱动，I2C adapter是对I2C controller的软件抽象。具体到上图，就是实现I2C adapter的algorithm以及特定SOC的I2C代码部分。I2C模块支持master和slave两种模式，所以I2C adapter的驱动实现也就分为两部分：I2C master驱动和I2C slave驱动。

#### 5.2.1. I2C master

I2C作为master时，驱动的实现主要包括4个部分：

1. 硬件参数配置：主要是设置I2C工作的主机模式，7bit或10bit寻址，寻址的从机地址设置，FIFO设置以及总线传输速率等。
2. SCL时序参数设置：根据设置的总线传输速率，设置SCL的高低电平时间。
3. i2c_algorithm的实现：作为主机端，主要是master_xfer的实现。在驱动实现中，以message为单位进行数据的收发，数据的传输采用中断的方式。
4. 中断的处理：处理master端的数据收发，并产生相应的start、ack、nack、restart、stop信号。

#### 5.2.2. I2C slave

I2C作为从机时，需要一个相应的后端软件(对I2C从设备的软件模拟)，该后端软件与I2C adapter驱动，组合成具有相应功能的I2C从设备。内核的I2C子系统框架中提供了一个EEPROM的软件后端，与I2C slave驱动一起，可以作为一个具有I2C接口的EEPROM使用。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/twi_slave.png](https://photos.100ask.net/artinchip-docs/d213-devkit/twi_slave-170675582861915.png)

I2C作为slave时，驱动的实现主要包括3个部分：

1. 硬件参数配置：设置I2C工作的从模式，FIFO设置等。
2. i2c_algorithm的实现：作为从机端，主要是reg_slave和unreg_slave的实现。reg_slave用于将一个i2c_client注册到从模式的i2c adapter上，unreg_slave的功能与reg_slave相反。
3. 中断的处理：处理I2C从机接收到的各种中断信号，并调用相应的回调函数进行数据的读写。

综上，I2C模块的驱动实现，主要的工作有：

- 提供I2C控制器的platform驱动，初始化I2C适配器，判断I2C模块工作的主从模式，执行不同的初始化流程。
- I2C模块作为主机时，提供I2C适配器的algorithm，并用具体适配器的xxx_xfer函数填充i2c_algorithm的master_xfer指针，并把i2c_algorithm指针赋值给i2c_adapter的algo指针。处理master端时序的设置以及I2C作为主机时的各种中断信号处理。
- I2C模块作为从机时，提供I2C适配器的algorithm，实现具体适配器的reg_slave和unreg_slave函数，并把i2c_algorithm指针赋值给i2c_adapter的algo指针。处理I2C作为从机时的各种中断信号处理。

### 5.3. 关键流程设计

#### 5.3.1. 初始化流程

I2C模块驱动的初始化流程如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/design_11.png](https://photos.100ask.net/artinchip-docs/d213-devkit/design_11-170675584793417.png)

#### 5.3.2. 传输流程

在I2C master驱动中，数据的传输由i2c_xfer发起，可以完成多个i2c_msg的传输。传输流程如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/design_21.png](https://photos.100ask.net/artinchip-docs/d213-devkit/design_21-170675586319119.png)

#### 5.3.3. I2C模块总线信号

在I2C总线的数据传输过程，由start/restart/stop作为总线的控制信号。了解I2C模块中start/restart/stop信号的生成方式，有助于了解驱动的源码实现。

##### 5.3.3.1. master transmitter

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/design_31.png](https://photos.100ask.net/artinchip-docs/d213-devkit/design_31-170675589067621.png)

对图中3个关键点的解释：

1. I2C作为master transmitter时，当向TXFIFO中写入数据时，I2C模块会自动发出start信号
2. 若stop位未置位，则当TXFIFO中的数据全部发送，TXFIFO为空时，会保持SCL为低电平，直到再次向TXFIFO中写入数据
3. 再次向TXFIFO写入数据时，将stop位置1，则在完成该字节的发送后，master会自动发送stop信号

##### 5.3.3.2. master receiver

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/design_41.png](https://photos.100ask.net/artinchip-docs/d213-devkit/design_41-170675589860723.png)

对图中3个关键点的解释：

1. I2C作为master receiver时，当向TXFIFO写入读命令(即向I2C_DATA_CMD写入读命令)时，I2C模块会自动发送start信号
2. 当接收到slave端发送的数据后，只有再次发送一次读命令，才会对本次收到的数据恢复ACK确认信号
3. master在接收到最后一个数据后，回复NACK，slave端才会结束数据的传送。在发送最后一个读命令时，同时将stop位置位，则master在接收到slave发送的数据后，I2C模块会自动发送NACK信号

注解

I2C模块的数据传输，无论是transmitter还是receiver，都会用到TXFIFO，transmitter时用来发送数据，receiver时用来发送命令。所以，中断处理中，触发TXFIFO_EMPTY中断的，可能是read msg，也可能是write msg

#### 5.3.4. 中断流程

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/design_51.png](https://photos.100ask.net/artinchip-docs/d213-devkit/design_51-170675591505625.png)

### 5.4. 数据结构设计

管理I2C控制器资源的顶层结构体

```
struct aic_i2c_dev {
        struct device *dev;
        void __iomem *base;
        struct i2c_adapter adap;
        struct completion cmd_complete;
        struct clk *clk;
        struct reset_control *rst;
        int irq;
        enum aic_i2c_speed i2c_speed;
        u16 scl_hcnt;
        u16 scl_lcnt;
        u32 abort_source;
        struct i2c_msg *msg;
        enum aic_msg_status msg_status;
        int buf_write_idx;
        int buf_read_idx;
        bool is_first_message;
        bool is_last_message;
        int msg_err;
        struct i2c_timings timings;
        u32 master_cfg;
        u32 slave_cfg;
        struct i2c_client *slave;
};
```

部分变量说明：

- cmd_complete：完成量，用于指示一个message是否传输完成
- scl_hcnt：SCL时钟高电平时钟数
- scl_lcnt：SCL时钟低电平时钟数
- msg：指向当前传输的message
- buf_write_idx：当前message为write msg时，buf_write_idx为写数据的计数。当前message为read msg时，buf_write_idx为写命令的计数(I2C模块需要每次写read命令，才能读出数据)。
- buf_read_idx：读数据的计数
- is_first_message：是否是第一个message
- is_last_message：是否是最后一个message

### 5.5. 接口设计

#### 5.5.1. i2c_handle_tx_abort

| 函数原型 | int i2c_handle_tx_abort(struct aic_i2c_dev *i2c_dev) |
| -------- | ---------------------------------------------------- |
| 功能说明 | 打印i2c发生abort的原因，并返回相应的error值          |
| 参数定义 | i2c_dev：指向自定义的struct aic_i2c_dev结构体        |
| 返回值   | 根据不同的abort原因，返回不同的error值               |
| 注意事项 |                                                      |

#### 5.5.2. i2c_scl_cnt

| 函数原型 | int i2c_scl_cnt(u32 ic_clk, enum aic_i2c_speed aic_speed, u16 *hcnt, u16 *lcnt) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 根据i2c模块工作的时钟频率和i2c的传输速率，返回需要设置的hcnt值和lcnt值 |
| 参数定义 | ic_clk：i2c模块工作的时钟频率，以KHz为单位aic_speed：表示i2c的传输速率，是标准模式还是快速模式hcnt：指向需要设置的hcnt值的指针lcnt：指向需要设置的lcnt值的指针 |
| 返回值   | 0：函数执行成功-EINVAL：hcnt或lcnt为空指针                   |
| 注意事项 |                                                              |

#### 5.5.3. i2c_set_timmings_master

| 函数原型 | static int i2c_set_timmings_master(struct aic_i2c_dev *i2c_dev) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 设置master产生SCL时钟的时序参数                              |
| 参数定义 | i2c_dev：指向自定义的struct aic_i2c_dev结构体                |
| 返回值   | 0：函数执行成功-EINVAL：参数非法                             |
| 注意事项 | 若在DTS中有设置i2c的时序参数scl_raise_ns或scl_fall_ns，则会由i2c_parse_fw_timings对DTS进行解析，在此函数中不再调用i2c_scl_cnt进行设置 |

#### 5.5.4. i2c_init_master

| 函数原型 | static void i2c_init_master(struct aic_i2c_dev *i2c_dev)     |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 初始化master模式下的参数设置，写入hcnt和lcnt，配置TXFIFO和RXFIFO阈值，将i2c配置为主模式 |
| 参数定义 | i2c_dev：指向自定义的struct aic_i2c_dev结构体                |
| 返回值   | 无                                                           |
| 注意事项 |                                                              |

#### 5.5.5. i2c_xfer_msg_init

| 函数原型 | static void i2c_xfer_msg_init(struct aic_i2c_dev *i2c_dev)   |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 在传输每个msg前进行的初始化，主要是将指示每个msg状态的变量设置为初始值，并设置传输的从地址设置，使能中断 |
| 参数定义 | i2c_dev：指向自定义的struct aic_i2c_dev结构体                |
| 返回值   | 无                                                           |
| 注意事项 |                                                              |

#### 5.5.6. i2c_xfer_msg
```
| 函数原型 | static int i2c_xfer_msg(struct aic_i2c_dev *i2c_dev, struct i2c_msg *msg, bool is_first, bool is_last) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 单个msg的传输函数，若当前msg是第一个msg，则会等待总线空闲，然后执行i2c_xfer_msg_init进行msg传输前的初始化工作，等待当前msg传输完成 |
| 参数定义 | i2c_dev：指向自定义的struct aic_i2c_dev结构体msg：指向当前将要传输的msgis_first：指示当前msg是否是第一个msgis_last：指示当前msg是否是最后一个msg |
| 返回值   | 0：执行成功<0：执行过程中发生错误                            |
| 注意事项 |                                                              |
```
#### 5.5.7. i2c_xfer
```
| 函数原型 | static int i2c_xfer(struct i2c_adapter *i2c_adap, struct i2c_msg msgs[], int num) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | i2c的传输函数，该函数可完成多个msg的传输，使用该函数完成对i2c_algorithm中master_xfer函数指针的填充 |
| 参数定义 | i2c_dev：指向自定义的struct aic_i2c_dev结构体msgs：指向msg数组的指针num：需要传输的msg个数 |
| 返回值   | 0：执行成功<0：执行过程中发生错误                            |
| 注意事项 |                                                              |
```
#### 5.5.8. i2c_handle_read
```
| 函数原型 | static void i2c_handle_read(struct aic_i2c_dev *i2c_dev)     |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 当触发RX_FULL中断时，调用该函数读取接收到的数据，若完成当前msg的接收，则释放完成量。该函数在中断中调用 |
| 参数定义 | i2c_dev：指向自定义的struct aic_i2c_dev结构体                |
| 返回值   | 无                                                           |
| 注意事项 |                                                              |
```
#### 5.5.9. i2c_handle_write

| 函数原型 | static void i2c_handle_write(struct aic_i2c_dev *i2c_dev)    |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 当触发TX_EMPTY中断时，调用该函数。若是读msg，则调用该函数发送读命令，若是写msg，则调用该函数发送数据 |
| 参数定义 | i2c_dev：指向自定义的struct aic_i2c_dev结构体                |
| 返回值   | 无                                                           |
| 注意事项 |                                                              |

#### 5.5.10. i2c_init_slave

| 函数原型 | static void i2c_init_slave(struct aic_i2c_dev *i2c_dev)      |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 初始化slave模式下的参数设置，配置TXFIFO和RXFIFO阈值，设置i2c为slave模式 |
| 参数定义 | i2c_dev：指向自定义的struct aic_i2c_dev结构体                |
| 返回值   | 无                                                           |
| 注意事项 |                                                              |

#### 5.5.11. i2c_reg_slave

| 函数原型 | static int i2c_reg_slave(struct i2c_client *slave)           |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 初始化slave模式下的参数设置，配置slave是10bit寻址还是7bit寻址，设置从机的地址 |
| 参数定义 | i2c_dev：指向自定义的struct aic_i2c_dev结构体                |
| 返回值   | 0：执行成功-EBUSY：忙等待                                    |
| 注意事项 |                                                              |

#### 5.5.12. i2c_unreg_slave

| 函数原型 | static int i2c_unreg_slave(struct i2c_client *slave) |
| -------- | ---------------------------------------------------- |
| 功能说明 | 与i2c_reg_slave功能相反                              |
| 参数定义 | i2c_dev：指向自定义的struct aic_i2c_dev结构体        |
| 返回值   | 0：执行成功                                          |
| 注意事项 |                                                      |

## 6. 常见问题

​	