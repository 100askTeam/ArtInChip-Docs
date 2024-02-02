---
sidebar_position: 26
---
# UART 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语 | 定义                                        | 注释说明           |
| ---- | ------------------------------------------- | ------------------ |
| UART | Universal Asynchronous Receiver/Transmitter | 通用异步收发传输器 |
| TTL  | Transistor-Transistor Logic                 | 逻辑门电路         |
| DCD  | Data Carrier Detect                         | 载波侦听           |
| DTR  | Data Terminal Ready                         | 数据终端准备好     |
| DSR  | Data Set Ready                              | 数据准备好         |
| RTS  | Request To Send                             | 请求发送           |
| CTS  | Clear To Send                               | 清除发送           |
| RI   | Ring Indicator                              | 响铃指示           |
| THR  | Transmit Holding Register                   | 发送保持寄存器     |
| RBR  | Receive Buffer Register                     | 接收缓冲寄存器     |
| ACPI | Advanced Configuration and Power Interface  | 高阶配置和电源接口 |

### 1.2. 模块简介

通用异步收发传输器（Universal Asynchronous Receiver/Transmitter)，通常称作 UART，是一种通用串行数据总线。

串行通信是指利用一条传输线将数据一位位地顺序传送，通信线路非常简单。

UART 为双向通信，可以实现全双工传输和接收。在嵌入式设计中，UART 用于主机与辅助设备通信，如汽车音响与外接AP之间的通信，也用于 PC 机通信包括与监控调试器和其它器件，如 EEPROM 通信。

在 UART 上追加同步方式的序列信号变换电路的产品，被称为 USART(Universal Synchronous Asynchronous Receiver Transmitter)

### 1.3. 通信协议

UART 作为异步串行通信协议的一种，工作原理是将传输数据的每个字符一位接一位地传输。其协议中添加了一些特殊的表示位：

- - 起始位 Start bit

    先发出一个逻辑“0”的信号，表示传输字符的开始

- - 数据位 Data bits

    紧接着起始位之后。数据位的个数可以是4、5、6、7、8等，构成一个字符。通常采用 ASCII 码。从最低位开始传送，靠时钟定位。

- - 奇偶校验位 Parity

    数据位加上这一位后，使得“1”的位数应为偶数(偶校验)或奇数(奇校验)，以此来校验数据传送的正确性。

- - 停止位 Stop bits

    它是一个字符数据的结束标志。可以是1位、1.5位、2位的高电平。 由于数据是在传输线上定时的，并且每一个设备有其自己的时钟，很可能在通信中两台设备间出现了小小的不同步。因此停止位不仅仅是表示传输的结束，并且提供计算机校正时钟同步的机会。停止位的位数越多，时钟同步的容忍程度越大，但是数据传输率会越慢

- - 流控 Flow contorl

    管理两个节点之间数据传输速率的过程，以防止出现接收端的数据缓冲区已满，而发送端依然继续发送数据，所导致数据丢失，我们会在一些上位机上看到 RTS /CTS、DTR /DSR和 XON /XOFF的选项，这是对流控制的选项

- - 空闲位

    处于逻辑“1”状态，表示当前线路上没有数据传送，该位为协议位，自动产生

- - 波特率 BaudRate

    是衡量数据传送速率的指标。表示每秒钟传送的bit数。比如波特率 115200，表示传输速率是 115200 bps

### 1.4. 参数信息

在 UART 进行通信的时候，双方需要协商相关参数，否则无法进行信息解析，因此在通信之初，需要对所使用的工具设置上述的所有参数

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/uart-param1.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/uart-param1-17067626921621.jpg)

### 1.5. 常用接口

- 串口、COM 口是指的物理接口形式(硬件)。
- TTL、RS-232、RS-485 是指的电平标准(电信号)。

#### 1.5.1. TTL

- TTL标准是低电平（0V）为0，高电平（+5V）为1。
- TTL 接口需要对端接口也为 TTL，但诸如 PC 等设备无 TTL 接口的UART口，一般转 TTL 为 USB 等 PC 更通用的接口。
- TTL 接口为全双工，连接设备的时候一般只接 GND/RX/TX。不会接Vcc或者 +3.3v 的电源线，避免与目标设备上的供电冲突，但 GND 可以保证源设备和目标设备供地，有助于信号稳定。
- 信号线采用交叉的方式，即源端的 RX 连接目标设备的 TX，源端的 TX 连接目标设备的 RX。

#### 1.5.2. RS232

- RS232 标准是正电平（+3V~+15V）为0，负电平（-13V~-15V）为1。
- RS232 接口在总线上只允许连接1个收发器，单站能力。
- RS232 传输线采用屏蔽双绞线，最高传输距离一般为 15M，最大速率为 20Kbps。
- RS232 接口为全双工，连接设备的时候一般只接 GND/RX/TX。
- 信号线也采用交叉的方式，即源端的RX连接目标设备的 TX，源端的 TX 连接目标设备的 RX。

#### 1.5.3. RS422

- RS422 标准采用差分信号负逻辑，逻辑“1”以两线间的电压差为+（2—6）V表示；逻辑“0”以两线间的电压差为-（2—6）V表示。接口信号电平比 RS232 降低了，就不易损坏接口电路的芯片，且该电平与 TTL 电平兼容，可方便与TTL电路连接。
- RS422 接口在总线上是允许连接多达128个收发器，多站能力。
- RS422 的数据最高传输速率为 10Mbps，100米长双绞线的最大速度为 1Mb/s。
- RS422 采用平衡发送和差分接收，因此具有抑制共模干扰的能力。RS422 接口的最大传输距离标准值为4000英尺（约1219米），实际上可达3000米。
- RS422 是全双工，连接设备的时候一般接 RX+/RX-/TX+/TX-/GND。
- 信号线也采用交叉的方式，即源端的 RX-/RX+ 连接目标设备的 TX-/TX+，源端的 TX-/TX+ 连接目标设备的 RX-/RX+。

#### 1.5.4. RS485

- RS485 的电气性能和 RS422 完全一样，主要区别是 RS485 是半双工。连接设备的时候一般接 A-/A+/GND，DB9 接口定义了两组，同时必须使用同一组的+/-。
- 信号线也采用交叉的方式，即源端的 A- 连接目标设备的A-，源端的 A+ 连接目标设备的 A+。

### 1.6. 插头

#### 1.6.1. 公母之分

- 针形的为公头，孔形的为母头
- PC 串口一般为公头，设备的一般为母头

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/port-male1.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/port-male1-17067627271843.jpg)

#### 1.6.2. DB-9接口

RS232DB9 的信号分分四组：

- DCD/RI：电气 Ready 参数
- DTR/DSR：模块 Ready 参数
- RTS/CTS：流控参数
- RXD/TXD：数据收发

| 针序 | RS232 | 说明           | RS422 | 说明     | RS485 | 说明     |
| ---- | ----- | -------------- | ----- | -------- | ----- | -------- |
| 1    | DCD   | 数据载波检测   | RXD-  | 接收     | A-    | 组1      |
| 2    | RXD   | 接收数据       |       |          |       |          |
| 3    | TXD   | 发送数据       |       |          |       |          |
| 4    | DTR   | 数据终端准备好 | TXD+  | 发送     | A+    | 组2      |
| 5    | GND   | 信号地         | GND   | 信号地   | GND   | 信号地   |
| 6    | DSR   | 数据准备好     | RXD+  | 接收     | A+    | 组1      |
| 7    | RTS   | 请求发送       | RTS   | 请求发送 | RTS   | 请求发送 |
| 8    | CTS   | 清除发送       | CTS   | 清除发送 | CTS   | 清除发送 |
| 9    | RI    | 响铃指示       | TXD-  | 发送     | A-    | 组2      |

### 1.7. 流控

这里讲到的 “流”，指的是数据流；在数据通信中，流控制是管理两个节点之间数据传输速率的过程，以防止出现接收端的数据缓冲区已满，而发送端依然继续发送数据，所导致数据丢失。

当接收端的数据缓冲区已满，无法处理数据来时，就发出 “不再接收” 的信号，发送端则停止发送，直到发送端收到 “可以继续发送” 的信号再发送数据。

计算机中常用的两种流控制分别是硬件流控制（RTS /CTS、DTR /DSR等）和软件流控制（XON /XOFF）。

#### 1.7.1. 硬件流控

RTS/CTS 属于硬件握手的一种，最初是设计为电传打字机和调制解调器半双工协作通信的，每次它只能一方调制解调器发送数据。终端必须发送请求发送信号然后等到调制解调器回应清除发送信号。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/flowctrol1.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/flowctrol1-17067627451835.jpg)

A 端的 DTR（数据设备就绪）发出信号， 当 B 端准备好后，B 端的 DTR（数据设备就绪）向 A端的 DSR（通讯设备就绪）发出信号。 接下来就可以通过 RTS（请求发送）和 DTR（允许发送）来控制通信。

#### 1.7.2. 软件流控

软件流控制（Software flow control）是在计算机数据链路中的一种流控制方法，特别适用于 RS232 串口通信；它是采用特殊字符来传输带内信令，特殊编码字符称作 XOFF 与 XON（分别表示 “transmit off” 与 “transmit on”）。因此，也被称作 “XON /XOFF流控制”。

| 码的名字 | 含义     | ASCII | 十进制 | 十六进制 |
| -------- | -------- | ----- | ------ | -------- |
| XOFF     | 暂停传输 | DC3   | 19     | 13       |
| XON      | 恢复传输 | DC1   | 17     | 11       |

### 1.8. RAW模式

UART 作为tty设备工作的时候，有两种工作方式：

- - Canonical Input

    RX端接收到数据之后不会直接反馈给用户态的read函数，而是要一直等到一个回车，意即对一些特殊字符进行语意解析

- - Raw Input

    RX端接收到什么直接返回到用户空间的read函数里面

两种工作模式均为kernel层逻辑，和驱动/硬件无关，对于普通的uart应用，建议Canonical方式，对于RS485应用，建议使用Raw方式，二者通过termios的lflag参数的ICANON 位进行区分。

### 1.9. 模块特性

- 兼容工业标准16550 UART
- 256x8bit发送与接收FIFO
- 传输速度可达3Mbps
- 支持5-8数据位以及1/1 ½/2停止位
- 支持奇校验，偶校验或者无奇偶校验
- 支持DMA控制器接口
- 支持软件/硬件流控
- 支持IrDA 1.0 SIR
- 支持RS-485/9bit 模式
- RS-485支持硬件使能
- Compact-IO 精简2线模式

## 2. 使用指南

### 2.1. 内核配置

内核配置主要是通过 make km (make kernel_menuconfig) 命令进行 kernel 的功能选择：

```
Device Drivers
    Character devices
        Serial driver
            <*> 8250/16550 and compatible serial support
            <*>   8250/16550 support for ArtInChip serial ports
            [*]   Support 8250_core.* kernel options (DEPRECATED)
            [*]   Support for variants of the 16550A serial port
            [ ]   Support for Fintek F81216A LPC to 4 UART RS485 API
            [*]   Console on 8250/16550 and compatible serial port
            (8)   Maximum number of 8250/16550 serial ports
            (8)   Number of 8250/16550 serial ports to register at runtime
            [ ]   Extended 8250/16550 serial driver options
```

### 2.2. 系统参数配置

D211 提供最多8个 UART 端口

这些参数主要在文件 target/d211/common/d211.dtsi 中，模块系统参数随 SoC 的设定而定，一般不能进行更改，除非更换了新的 SoC，则需要在专业人士的指导下进行更改。

```
uart1: serial@18711000 {
     compatible = "artinchip,aic-uart-v1.0";
     reg = <0x0 0x18711000 0x0 0x400>;
     interrupts-extended = <&plic0 77 IRQ_TYPE_LEVEL_HIGH>;
     reg-shift = <2>;
     reg-io-width = <4>;
     clocks = <&cmu CLK_UART1>;
     clock-frequency = <48000000>;
     resets = <&rst RESET_UART1>;
     dmas = <&dma DMA_UART1>, <&dma DMA_UART1>;
     dma-names = "rx", "tx";
 };
```

- - reg-shift

    UART控制器兼容8250标准, 寄存器寻址使用索引而不是偏移描述，reg-shift 用来进行索引和地址的转换计算，该值不能修改

- - reg-io-width

    为寄存器的位宽，`4` 表示采用32位标准位宽，该值不能修改

- - clock-frequency

    D211 UART 模块的父时钟为 48M， UART 模块时钟的频率通过对其父时钟的进行除频来设置，clock-frequency 即用于设置 UART 的模块时钟， 不同的模块时钟时波特率的误差可能不同，因此可以根据目标波特率进行模块时钟的设置，详情参看 [UART 波特率与误差率](../../../ic/clocks_power/cmu/function.html#ref-baudrate-errorrate-table)

### 2.3. 功能参数配置

功能参数主要针对某一个使用方案而定，因此随着方案的不同，参数很可能不同，

这些参数主要在文件 target/d211/xxx/board.dts 中，功能参数的设置必须和硬件原理图相匹配

```
&uart1 {
    pinctrl-names = "default";
    pinctrl-0 = <&uart1_pins_a>;
    linux,rs485-enabled-at-boot-time;
    aic,rs485-compact-io-mode;
    status = "okay";
};
```

- - pinctrl-names

    SDK 一般会把要使用的某一功能的端口组预先定义，后期直接使用即可，定义一般放在 target/d211/common/aicxxx-pinctrl.dtsi 文件中，目前 “pinctrl-names” 均设置为 “default” 即可

- - pinctrl-0

    即指示 UART 预先定义的端口组，其中包括用于进行发送/接收选择的 GPIO 端口

- - linux,rs485-enabled-at-boot-time

    该端口配置为 RS485

- - aic,rs485-compact-io-mode

    使用 AIC 独有的精简 IO 模式， 只使用2个端口，一个用作发送接收，一个用作发送和接收控制

其中 rs485 功能还有其他一些可选配置项，如 time delay 等，目前 SoC 内部对此类参数做了很好的兼容，除非特殊的 rs485 模组，否则均不需要额外配置参数

### 2.4. 调试端口

调试端口的配置除了要使能相应的 UART 端口，还要在 target/aicxxx/common/env.txt 文件中配置波特率等相关参数

```
earlycon=smh
console=ttyS0,115200n8
```

## 3. 调试指南

### 3.1. 调试开关

#### 3.1.1. Log等级

调试的时候需要设置 log 等级为最高8，有两种设置方法：

- - bootarg

    target/aicxxx/common/env.txt 中设置 loglevel=8

- - kernel menuconfig

    make kernel_menuconfig 或者 make km 命令打开 kernel 的 menuconfig

```
Kernel hacking
    printk and dmesg options
        (8) Default console loglevel (1-15)
        (7) Default message log level (1-7)
```

#### 3.1.2. 调试开关

通过 make kernel_menuconfig 或者 make km 命令打开 kernel 的 menuconfig， 如下路径选中 UART 的调试开关

```
Kernel hacking
    [*] Kernel debuging
        ArtInChip Debug
        [*] UART Driver Debug
```

### 3.2. 调试端口

如果 UART 作为调试端口，其主要工作即为进行调试日志的输入输出，模块工作正常则可以正常进行日志的输入输出，调试端口是所有其他模块的调试的基础，以 uart0 作为调试端口为例

调试端口在驱动中强制不使用 DMA

#### 3.2.1. 端口配置

```
target/d211/方案x/board.dts
&uart0 {
    pinctrl-names = "default";
    pinctrl-0 = <&uart0_pins_a>;
    status = "okay";
};
```

#### 3.2.2. 调试端口指定

调试端口的配置只在 env.txt 中指定即可，board.dts 中 bootargs 中的 console 只是在 JTAG 调试时使用

```
target/d211/common/env.txt
earlycon=smh
console=ttyS0,115200n8
loglevel=8
```

### 3.3. 功能验证

#### 3.3.1. 驱动加载

uboot 和 kernel 不共享驱动，因此驱动加载是否成功也要分两个阶段验证。

UART 作为调试串口和非调试串口使用的驱动一致，因此系统有任何日志输出则说明驱动加载正常。

```
Serial: 8250/16550 driver, 8 ports, IRQ sharing disabled
18713000.serial: ttyS3 at MMIO 0x18713000 (irq = 22, base_baud = 75000000) is a 16550A
aic8250_apply_quirks port:0 rs485:0
aic8250_probe port:0 clk:48000000 regshift:2
aic8250_probe success.
```

#### 3.3.2. 设备信息

系统默认会给每一个 UART 端口创建一个设备节点，即 ttyS#，而不管设备是否被打开。

从 /sys/class/tty/ttyS# 中查看该设备信息可以确认其是否被正常初始化

```
[aic@ttyS1] cd /sys/class/tty/ttyS1
[aic@ttyS1] # cat type
0： 没有初始；4： 初始化为16550A设备
[aic@ttyS2] # cat console
N：非调试串口；Y：调试串口
```

#### 3.3.3. 设备通信

验证模块是否可以正常通信，最简单的办法是环路端口的 RX/TX，使用 AIC 提供的 UART 测试工具进行测试

##### 3.3.3.1. 编译测试工具

在根目录下通过 make menuconfig 可以选择编译 AIC 提供的UART测试工具到系统

```
Artinchip packages
    Sample code
        [*] test-uart
```

##### 3.3.3.2. 端口环路测试

运行命令：test_uart -C /dev/ttyS1 9600 进行环路测试，但不要使用其测试调试端口

```
test_uart -C /dev/ttyS1  9600
Test Mode: 3:Circle
Send Device     : /dev/ttyS1
Receive Device  : /dev/ttyS1
m_Baudrate      : 9600
send data is:    1234567890artinchip0987654321
receive data is: 1234567890artinchip0987654321
```

### 3.4. 问题排查流程

- 在 board.dts 中确认使用的 UART 端口 status = “okay”

- 确认该 UART 端口的 GPIO 端口配置正确， 具体查看相关 GPIO 端口的寄存器

- 确认该 UART 端口的 clk 设置正确

  > - 确认 /dev/ttyS#/uartclk 值: 48000000
  > - 在 CMU 的寄存器中查看相关寄存器，如：0x0844 CLK_UART1
  > - reg-dump -a 0x18020844： 0x18020844: 00003118
  > - clk = 1200M / (0x18 + 1) = 48M

- UART 寄存器是时分复用寄存器，直接读取的值无法明确意义，要跟踪寄存器设置，只能在代码中打印寄存器值

## 4. 测试指南

### 4.1. 准备工作

#### 4.1.1. 硬件

- - PC

    用于和开发板进行交互

- - 测试板

    3个以上 UART 端口的测试板

- - 连接线

    用于连接 UART 的 RX/TX 端口

#### 4.1.2. 软件

- - PC串口软件：

    用于PC和开发板进行串口通信

- - test_uart：

    AIC 的 UART 测试工具，内嵌在 SDK 中，在根目录下通过 make menuconfig 可以选择编译到系统

```
Artinchip packages
  Sample code
    [*] test-uart
```

### 4.2. 测试组网

#### 4.2.1. 单端口的环路测试

UARTn TX to UARTn RX

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/test-cycle1.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/test-cycle1-17067629111947.jpg)

#### 4.2.2. 双端口的环路测试

UARTn to UARTm

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/test-topo.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/test-topo-17067629176269.jpg)

### 4.3. RS232功能测试

#### 4.3.1. 单端口收发

- 按单端口的环路测试组网，环路 UART4 的 RX/TX
- 使用 test_uart 工具进行测试

```
test_uart -C /dev/ttyS1  9600
Test Mode: 3:Circle
Send Device     : /dev/ttyS1
Receive Device  : /dev/ttyS1
m_Baudrate      : 9600
send data is:    1234567890artinchip0987654321
receive data is: 1234567890artinchip0987654321
```

#### 4.3.2. 双端口收发

- 按双端口的环路测试组网，环路 UART4 和 UART5 的 RX/TX
- 使用 test_uart 工具进行测试

```
test_uart -N /dev/ttyS4 /dev/ttyS5 115200
Test Mode: 0:Normal Test
Device     : /dev/ttyS4
Receive Device  : /dev/ttyS5
m_Baudrate      : 115200
1970-01-01 08:24:46   =============================================
1970-01-01 08:24:46   Please input messages you want to send
thisisatest
1970-01-01 08:24:49   send data:thisisatest.
1970-01-01 08:24:49   receive data: len = 11: thisisatest
```

### 4.4. RS485 功能测试

RS485 的测试方式和 RS232 类似，有几点不同：

- 端口需要配置为 RS485
- RS485 需要有外接驱动芯片
- RS485 为差分信号，因此需要 B+ 对 B+ 环路，B- 对 B- 环路
- RS485 不能 B+ 环路 B-

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/test-rs4851.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/test-rs4851-170676294039611.jpg)

### 4.5. 兼容性测试

#### 4.5.1. 串口工具兼容性测试

应该测试在 RS232 模式下，调试口和如下工具的兼容性

- MobaXterm
- SecureCRT
- XShell
- sscom

#### 4.5.2. RS485 兼容性测试

应测试在 RS485 模式下，SoC 和通用 RS485 模组的兼容性

### 4.6. 压力测试

可借助于 test_uart 工具， 采用环路 UART4 和 UART5 的组网，进行压力测试。

测试方法是短时间内进行大量数据的收发，因为 CPU 的读写速度远远高于 UART 的收发，因此可能会有丢包，但模块不应该出现卡死现象。

```
[aic@] # test_uart -P  /dev/ttyS4 /dev/ttyS5 115200
Test Mode: 1:Pressure Test
Send Device     : /dev/ttyS4
Receive Device  : /dev/ttyS5
m_Baudrate      : 115200
1970-01-01 08:55:22   type any key to send 100kB
```

### 4.7. 稳定性测试

可借助于 test_uart 工具，采用环路 UART4 和 UART5 的组网，进行长时间的稳定性验证。

测试方法是循环进行长时间的数据收发，确认模块是否正常工作和是否有丢包。

```
[aic@] # test_uart -S  /dev/ttyS4 /dev/ttyS5  115200
Test Mode: 2:Stability
Send Device     : /dev/ttyS4
Receive Device  : /dev/ttyS5
m_Baudrate      : 115200
1970-01-01 09:08:13   =============== sending =====================
1970-01-01 09:08:13   =============== receiving =====================
1970-01-01 09:08:21   send 64K
1970-01-01 09:08:21   receive 64K
1970-01-01 09:08:29   send 128K
1970-01-01 09:08:29   receive 128K
```

## 5. 源码说明

### 5.1. 串口芯片

在驱动代码说明开始前先介绍几种通用的串口芯片。

#### 5.1.1. 8250

8250是 IBM PC 及兼容机使用的第一种串口芯片。这是一种相对来说很慢的芯片，有时候装载到它的寄存器速度太快，它来不及处理，就会出现数据丢失现象。8250有7个寄存器，支持的最大波特率为56kb。

#### 5.1.2. 16450

16450 是 8250A 的快速版。加快了处理器存取它的速度，但最大速度还是 56kb。有些人实际用得比这高也可以。

#### 5.1.3. 16550

16550/16550A 是第一种带先进先出（FIFO）功能的8250系列串口芯片。

AIC UART 模块是一 16550A UART，属于标准的8250系，而 Linux 对8250系串口有通用的驱动，我们采取在该驱动上添加 AIC 私有的代码的方式实现我们的驱动。

### 5.2. 驱动配置宏

因为8250驱动兼容很多后续开发的串口芯片，因此有非常多的编译功能配置项。

menuconfig 中位置：device drivers/Character devices/8250 16550 and compatible serial support

关键配置项说明：

- - SERIAL_8250_DEPRECATED_OPTIONS: Support 8250_core.* kernel options (DEPRECATED)

    3.7 版本的错误，不应该打开

- - SERIAL_8250_PNP: 8250/16550 PNP device support

    不打开

- - SERIAL_8250_16550A_VARIANTS: 16550A serial port

    打开

- - SERIAL_8250_FINTEK: Fintek F81216A LPC to 4 UART RS485 API

    不打开

- - SERIAL_8250_CONSOLE: 8250/16550 and compatible serial port

    打开

- - SERIAL_8250_DMA: DMA support for 16550 compatible UART controllers

    打开

- - SERIAL_8250_NR_UARTS: Maximum number of 8250/16550 serial ports

    设置为8

- - SERIAL_8250_RUNTIME_UARTS: Number of 8250/16550 serial ports to register at runtime

    设置为8

- - SERIAL_8250_EXTENDED: Extended 8250/16550 serial driver options

    没有使用，无关系

- - SERIAL_8250_MANY_PORTS

    没有使用，无关系

- - SERIAL_8250_SHARE_IRQ: Support for sharing serial interrupts

    不打开

- - SERIAL_8250_DETECT_IRQ: Autodetect IRQ on standard ports (unsafe)

    不打开

- - SERIAL_8250_RSA: Support RSA serial ports

    不打开，没有使用

- - SERIAL_8250_DW: Support for Synopsys DesignWare 8250 quirks

    不打开，不需要兼容

- - SERIAL_OF_PLATFORM: Device tree based probing for 8250 ports

    不打开，使用AIC定义的OF

### 5.3. 寄存器

8250驱动使用索引来定义寄存器，地址的计算方式为索引 * 位宽。 AIC UART 的寄存器大致可分为两种：

#### 5.3.1. 标准寄存器

0x7C 之前，为8250标准寄存器，在include/uapi/linux/serial_reg.h 中定义，AIC 对如下3个寄存器值有修改

```
#define UART_IER   1    /*Interrupt Enable: Shifter_Reg_Empty_EN*/
#define UART_IIR   2    /*Interrupt Identity：Shifter_Reg_Empty_INT*/
#define UART_MCR   4    /*Modem Control：UART_FUNCTION*/
```

#### 5.3.2. 扩展寄存器

0x7C 之后，为 AIC 新扩展，需要额外的逻辑代码，譬如 RS485，在 8250_artinchip.h 中定义

```
#define AIC_REG_UART_USR   0x1f        /* UART Status Register */
#define AIC_REG_UART_TFL   0x20        /* transmit FIFO level */
#define AIC_REG_UART_RFL   0x21        /* Receive FIFO Level */
#define AIC_REG_UART_HSK   0x22        /* DMA Handshake Configuration */
#define AIC_REG_UART_HALT  0x29        /* Halt tx register */
#define AIC_REG_UART_DLL   0x2C        /* DBG DLL */
#define AIC_REG_UART_DLH   0x2D        /* DBG DLH */
#define AIC_REG_UART_RS485 0x30        /* RS485 control status register */
```

### 5.4. 程序入口

#### 5.4.1. 8250_core

8250标准寄存器/逻辑的初始化入口，三方驱动大都借助 8250_core 完成其工作，文件：8250_core.c。

```
module_init(serial8250_init);
module_exit(serial8250_exit);
```

#### 5.4.2. aic-uart

aic8250 是 artinchip 的 uart 驱动的入口，声明驱动和初始化私有寄存器/逻辑，文件：8250_artinchip.c

```
static const struct of_device_id aic8250_of_match[] = {
   { .compatible = "artinchip,aic-uart-v1.0" },
   { /* Sentinel */ }
};
MODULE_DEVICE_TABLE(of, aic8250_of_match);

static struct platform_driver aic8250_platform_driver = {
   .driver = {
      .name          = AICUART_DRIVER_NAME,
      .pm            = &aic8250_pm_ops,
      .of_match_table        = aic8250_of_match,
   },
   .probe                    = aic8250_probe,
   .remove           = aic8250_remove,
};
module_platform_driver(aic8250_platform_driver);
```

### 5.5. 数据结构

#### 5.5.1. uart_8250_port

声明在 include/linux/serial_8250.h 中，驱动中以变量名：up 变量存在，artinchip 驱动中未进行任何设置，只 overlay 了 AIC 平台的 rs485 设置函数， 其他完全使用 8250_core.c 中参数。uart_8250_port的初始化在 8250_core.c：serial8250_register_8250_port中完成。

```
struct uart_8250_port {
   struct uart_port          port;
   …
   struct uart_8250_dma      *dma;
   const struct uart_8250_ops        *ops;
   /* 8250 specific callbacks */
   int                       (*dl_read)(struct uart_8250_port *);
   void                      (*dl_write)(struct uart_8250_port *, int);
   struct uart_8250_em485 *em485;
   void                      (*rs485_start_tx)(struct uart_8250_port *);
   void                      (*rs485_stop_tx)(struct uart_8250_port *);

   .dl_read          = default_serial_dl_read
   .dl_write         = default_serial_dl_write
   .rs485_config = aic8250_rs485_config;
   .rs485            = NULL;
   .rs485_start_tx = NULL;
   .rs485_stop_tx = NULL;
```

#### 5.5.2. uart_port

uart_port 是UART驱动的关键数据结构，驱动中以 变量名：p存在，声明include/linux/serial_core.h，包含变量和关键操作函数的overlay入口。

```
struct uart_port {
   spinlock_t     lock;                      /* port lock */
   unsigned long  iobase;            /* in/out */
   unsigned char __iomem     *membase;               /* read/write */
   unsigned int   (*serial_in)(struct uart_port *, int);
   void           (*serial_out)(struct uart_port *, int, int);
   ... ...
```

#### 5.5.3. aic8250_data

```
struct aic8250_data {
        struct aic8250_port_data     data;

        int                  msr_mask_on;
        int                  msr_mask_off;
        struct clk           *clk;
        struct reset_control *rst;

        unsigned int         uart_16550_compatible:1;
        unsigned int         tx_empty;
        unsigned int         rs485simple;      //compact-io mode
};
```

#### 5.5.4. Operations

uart_port各操作接口设置和操作的寄存器。

蓝色接口为可以在客户的驱动中定制，否则使用uart8250_core中标准接口。

```
handle_irq  = aic8250_handle_irq;
.pm          = aic8250_do_pm;
.serial_in   = aic8250_serial_in32;
.serial_out  = aic8250_serial_out32;
.set_ldisc   = aic8250_set_ldisc;
.set_termios = aic8250_set_termios;
.set_mctrl   = serial8250_set_mctrl, //set modem control, 包括termios 和 modem的转换，Modem Control Reg： MCR
.get_mctrl   = serial8250_get_mctrl, //get modem control
.startup     = serial8250_startup,   //寄存器初始化
.shutdown    = serial8250_shutdown,  //
.get_divisor   = serial8250_do_get_divisor
.set_divisor    = serial8250_do_set_divisor
.handle_break =
.tx_empty       = serial8250_tx_empty    //Line Status: Transmitter Empty & TX Holding Register Empty
.stop_tx     = serial8250_stop_tx,   //serial8250_clear_THRI，Interrupt Enable Reg，Enable Transmitter：10，Enable Receive：01
.start_tx    = serial8250_start_tx,  //serial8250_set_THRI，Interrupt Enable Reg，Enable Transmitter：10，Enable Receive：01
.throttle    = serial8250_throttle,  //synclink_gt.c，
.unthrottle  = serial8250_unthrottle,
.stop_rx     = serial8250_stop_rx,   //Interrupt Enable Reg，Enable Receive：01，Enable receiver line status interrupt： 04
.enable_ms   = serial8250_enable_ms, //Interrupt Enable Reg，Enable Modem status interrupt：08
.break_ctl   = serial8250_break_ctl, //Line Control Reg，Break Control Bit：
.type                = serial8250_type,              //8250 or 16550 or TI16750
.release_port        = serial8250_release_port,      //release_mem_region
.request_port= serial8250_request_port,//request_mem_region
.config_port = serial8250_config_port,       //
.verify_port = serial8250_verify_port,
```

### 5.6. 关键流程

#### 5.6.1. serial8250_init

```
serial8250_init
   |-->serial8250_isa_init_ports
     |-->UART_NR                        //8个
     |-->serial8250_init_port
         |-->port->ops = &serial8250_pops;    //标准ops
     |-->serial8250_set_defaults     //io，dma，fifosize，标准DMA接口
     |-->serial8250_isa_config
   |-->uart_register_driver
   |-->serial8250_pnp_init
   |-->platform_device_add
   |-->serial8250_register_ports
   |-->platform_driver_register
```

#### 5.6.2. aic8250_probe

```
aic8250_probe
   |-->regs = platform_get_resource
   |-->platform_get_irq
   |-->p->handle_irq = aic8250_handle_irq;
   |-->p->pm         = aic8250_do_pm;
   |-->p->type               = PORT_16550
   |-->p->serial_in  = aic8250_serial_in32;
   |-->p->serial_out         = aic8250_serial_out32;
   |-->p->set_ldisc            = aic8250_set_ldisc;
   |-->p->set_termios        = aic8250_set_termios;
   |-->p->regshift            = dts:reg-shift, reg 32bit
   |-->Prepare clk
   |-->prepare reset
   |-->aic8250_apply_quirks  : 处理aic 私有逻辑，dcd-override，dsr-override，cts-override，ri-override
      |-->aic8250_init_special_reg
   |-->data->data.line = serial8250_register_8250_port： return port number
   |-->platform_set_drvdata
```

#### 5.6.3. serial8250_register_8250_port

```
serial8250_register_8250_port
   |-->return port number
   |-->serial8250_find_match_or_unused
   |-->copy aic uart_8250_port to local uart_8250_port
   |-->uart_get_rs485_mode：
     |-->rs485-rts-delay，rs485-rx-during-tx，linux,rs485-enabled-at-boot-time，rs485-rts-active-low，rs485-term
   |-->mctrl_gpio_init:    //null
   |-->serial8250_set_defaults //io,dma,fifosize setting
   |-->serial8250_apply_quirks
     |-->uart_add_one_port
```

### 5.7. RS485

ArtInChip 的 RS485 有两种工作模式：

- 标准模式：标准 RS485 接口，有B+/B-两根数据线和发送使能，共三线
- 精简模式：为 ArtInChip 定制版，使用单数据线进行数据传输，加发送使能共二线

#### 5.7.1. 标准模式

通过在dts中添加linux,rs485-enabled-at-boot-time配置为RS485模式，代码流为：

```
static void aic8250_apply_quirks(struct device *dev, struct uart_port *p,
      struct aic8250_data *data)
{
        struct device_node *np = p->dev->of_node;
        int id;

        uart_get_rs485_mode(p);
}

drivers/tty/serial/serial_core.c

int uart_get_rs485_mode(struct uart_port *port)
{
   if (device_property_read_bool(dev, "linux,rs485-enabled-at-boot-time"))
      rs485conf->flags |= SER_RS485_ENABLED;
}
```

#### 5.7.2. 精简模式

精简模式 RS485 首先是 RS485，因此需要在开启 RS485 的基础上进行额外的配置，通过在 board.dts 中添加 aic,rs485-compact-io-mode 完成配置，代码流为：

```
drivers/tty/serial/serial_artinchip.c
aic8250_apply_quirks:
if (device_property_read_bool(dev, "aic,rs485-compact-io-mode"))
   data->rs485simple = 1;

static int aic8250_rs485_config(struct uart_port *p,
      struct serial_rs485 *prs485)
{
   struct aic8250_data *d = to_aic8250_data(p->private_data);
     unsigned int mcr = p->serial_in(p, UART_MCR);
     unsigned int rs485 = p->serial_in(p, AIC_REG_UART_RS485);

     mcr &= AIC_UART_MCR_FUNC_MASK;
     if (prs485->flags & SER_RS485_ENABLED) {
             if (d->rs485simple)
                     mcr |= AIC_UART_MCR_RS485S;
             else
                     mcr |= AIC_UART_MCR_RS485;

             rs485 |= AIC_UART_RS485_RXBFA;
             rs485 &= ~AIC_UART_RS485_CTL_MODE;
     } else {
             mcr = AIC_UART_MCR_UART;
             rs485 &= ~AIC_UART_RS485_RXBFA;
     }

     p->serial_out(p, UART_MCR, mcr);
     p->serial_out(p, AIC_REG_UART_RS485, rs485);

     return 0;
}
```

### 5.8. DMA

#### 5.8.1. 特殊性

AIC 的 DMA 和标准的 DMA有 一点使用不同，限制了我们只能使用自己私有的 DMA 接口，主要差别点在于我们必须设置 UART FIFO中 的数据长度进行 DMA 搬运才不会出错，测试的逻辑为：

- 如果设置了 FIFO 的中断触发为1/2，则在 FIFO 中数据达到 128byte 后会收到 data ready 中断
- 如果这个时候 UAR T在继续接收，则FIFO中的数据会按 4bytes/次 的速度增加
- 如果设置了 DMA 接收长度为64，则128-64 = 64会丢失
- 如果设置了 DM A接收长度为1024，则因为fifo中的数据最多为256，则永远收不满

因此AIC的DMA处理逻辑为：

- 收到 data ready 中断后，先停掉 UART 的接收，防止 FIFO 中数据增加
- 读取当时 FIFO 中数据的长度，作为 DMA 的参数进行数据搬移
- DMA 搬移成功后重启 UART 数据接收

```
int aic8250_dma_rx(struct uart_8250_port *p)
{
   struct uart_8250_dma              *dma = p->dma;
   struct dma_async_tx_descriptor    *desc;

   if (dma->rx_running)
      return 0;

   aic8250_set_ier(p, false);
   dma->rx_size = p->port.serial_in(&p->port, AIC_REG_UART_RFL);

   desc = dmaengine_prep_slave_single(dma->rxchan, dma->rx_addr,
                  dma->rx_size, DMA_DEV_TO_MEM,
                  DMA_PREP_INTERRUPT | DMA_CTRL_ACK);
   if (!desc)
      return -EBUSY;

   dma->rx_running = 1;
   desc->callback = aic8250_dma_rx_complete;
   desc->callback_param = p;

   dma->rx_cookie = dmaengine_submit(desc);

   dma_async_issue_pending(dma->rxchan);

   return 0;
}
```

#### 5.8.2. DMA寄存器

DMA 的所有寄存器不建议进行参数调整，使用默认值即可，但 DMA 需要工作在 HSK 模式。

```
p->serial_out(p, AIC_REG_UART_HSK, AIC_HSK_HAND_SHAKE);
```

### 5.9. 修改总结

AIC 的 UART 驱动附着于8250标准驱动，但又有不一样的地方，总结一下修改列表

#### 5.9.1. 驱动接口

- 添加 AIC 私有接口，8250_artinchip.c,8250_artinchip.h
- 从 board.dst 中读取并配置 uartclk
- 配合 SOC 功能简化代码
- 移除 autoconfig 功能，因为有些 try 会导致输出乱码
- DMA 策略添加和私有逻辑接口

#### 5.9.2. RS485支持

RS485 的支持需要设置 Modem_Control 和 RS485 Control and Status 两个寄存器，添加了 aic8250_rs485_config 处理接口

## 6. 常见问题

### 6.1. 端口非tty设备

#### 6.1.1. 现象

```
[aic@] # test_uart -N /dev/ttyS1 /detv/ttySw2 1145200
[2022-01-26 16:23:43]  Test Mode: 0:Normal Test
[2022-01-26 16:23:43]  Send Device     : /dev/ttyS1
[2022-01-26 16:23:43]  Receive Device  : /dev/ttyS2
[2022-01-26 16:23:43]  m_Baudrate      : 115200
[2022-01-26 16:23:43]  standard input is not a terminal device for /dev/ttyS1
[2022-01-26 16:23:43]  tcgetattr: Bad file descriptor
[2022-01-26 16:23:43]  standard input is not a terminal device for /dev/ttyS2
[2022-01-26 16:23:43]  tcgetattr: Bad file descriptor

[aic@] # echo 111 > /dev/ttyS1
write error: Input/output error
```

#### 6.1.2. 原因

新版IC系统修改了 UART Clk 的地址，dts 中未同步修改，导致设备虽然进行了初始化，但模块无数据读写

```
[aic@] # devmem 0x18711000 32
[2022-02-07 09:23:06]  0x00000000            //uart的所有寄存器读不到数据，clk未工作
```

### 6.2. 长包卡死

#### 6.2.1. 现象

发送128字节以内的短包，模块可正常收发，发送超过128字节的长包，会卡死

#### 6.2.2. 原因

D211 RX DMA 要求严格设置 DMA RX size，如果该 size 设置不对，则会有如下问题：

- 如果 fifo 中有数据150，而设置 rx size 为120，则丢失30数据
- 如果 fifo 中有数据150，而设置 rx size 为160， 则永远无法填充满，则永远收不回数据，卡死

目前默认的8250驱动中，设置的 rx size 为1000，但 fifo 的大小只有256，因此永远无法填充完成，故导致系统卡死。

### 6.3. 初始化乱码

#### 6.3.1. 现象

reboot 测试中发现 Linux 初始化 UART 时输出乱码 0xFF，导致接收端 Python脚本 断开

#### 6.3.2. 原因

8250驱动因为要兼容很多 IC，因此初始化时有一个自动 try 的机制：autoconfig，通过对硬件模块的测试来确认 IP 类型和特殊功能，此自动 try 工作会频繁操作寄存器，既可能造成不确定的影响（输出上述乱码），也会增加系统开销，而我们 UART 模块特性固定，可以预先进行配置，不进行 try。

autoconfig 的核心是设置了 port->type 为 PORT_16550A，我们直接设置 type 后即可不使用 autoconfig 流程。

关闭 autoconfig 的流程为：

```
aic8250_probe:
    p->type = PORT_16550A;
    p->flags = UPF_FIXED_TYPE;
uart_configure_port:
    if (!(port->flags & UPF_FIXED_TYPE)) {
        port->type = PORT_UNKNOWN;
        flags |= UART_CONFIG_TYPE;
    }
serial8250_config_port:
    if (flags & UART_CONFIG_TYPE)
        autoconfig(up);
```