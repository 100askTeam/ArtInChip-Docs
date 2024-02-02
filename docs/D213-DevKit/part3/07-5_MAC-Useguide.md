---
sidebar_position: 20
---
#  MAC 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语 | 定义                         | 注释说明                                                     |
| ---- | ---------------------------- | ------------------------------------------------------------ |
| MAC  | Media Access Control         | 媒体访问控制，Ethernet 中的一个组成模块，对应 OSI 参考模型中的数据链路层 |
| PHY  | Physic                       | 物理接口收发器，物理对应 OSI 参考模型中的物理层              |
| MII  | Media Independent Interface  | 媒体独立接口，是 MAC 与 PHY 连接的标准接口，使用4根线来传输数据 |
| RMII | Reduced MII                  | 简化的媒体独立接口，使用2根线来传输数据                      |
| GMII | Gigabit MII                  | 千兆的媒体独立接口，使用8根线来传输数据                      |
| MDIO | Management Data Input/Output | PHY的管理接口，用来读/写PHY的寄存器，以控制PHY的行为或获取PHY的状态 |

### 1.2. 以太网简介

以太网（Ethernet）是一种计算机局域网组网技术，基于 IEEE802.3 标准，它规定了包括物理层的连线（RJ45），电气信号（PHY）和媒体访问层（MAC）协议等， 以太网的特征是有线网络，网络中的各终端必须通过网线进行连接，以太网模块可以简单的理解为 MAC 通过 MII 总线控制 PHY 共同完成终端之间数据交换的一种设备。

### 1.3. 使用拓扑

一个典型的以太网电路至少需要如下器件的参与

- RJ45 连接器
- 网络变压器
- 晶振
- PHY 收发器
- MAC 控制器
- AP 处理器

D211 集成 MAC 控制器模块，AP 内部也可以提供 PHY 收发器所需的时钟，从而不使用外部晶振模块。

如果要提升硬件的防静电能力，外部一般会增加 ESD 保护电路。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ethernet-hw1.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/ethernet-hw1-17067566515211.jpg)

### 1.4. 组件拓扑

一个典型的以太网工作模块由如下组件组件组成

- AP Core
- DMA
- MAC
- PHY

AIC 的 SOC 根据型号不同，以太网模块有如下两种拓扑结构

#### 1.4.1. 全集成

SOC 内部集成 MAC 和 PHY

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/topo-all1.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/topo-all1-17067566709503.jpg)

#### 1.4.2. 单 MAC

SOC 内部仅集成 MAC，需要外挂 PHY

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/topo-phy1.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/topo-phy1-17067566899295.jpg)

### 1.5. 模块架构

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/eth-arch1.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/eth-arch1-17067566964207.jpg)

#### 1.5.1. MAC 架构

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/eth-mac1.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/eth-mac1-17067567071359.jpg)

#### 1.5.2. PHY 架构

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/eth-phy1.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/eth-phy1-170675671900211.jpg)

### 1.6. 模块特性

- 支持全双工/半双工
- 支持1000/100/10Mbps
- 支持 RGMII/RMII 接口
- 支持内部 DMA
- TXFIFO/RXFIFO 的大小均为 2048Byte，均支持阈值模式和存储-转发模式
- 支持 VLAN 哈希过滤
- 支持 64-bit 哈希地址过滤、完美地址过滤（支持8个地址寄存器）
- 支持源地址的插入/替换，VLAN 的插入/替换/删除，CRC 的插入/替换/删除
- 支持接收校验和错误检测
- 支持发送校验和计算

## 2. 使用指南

### 2.1. 内核配置

内核配置主要是通过 make km（make kernel_menuconfig) 命令进行 kernel 的功能选择，配置完成后的项目存储在 “source/linux-5.10/arch/riscv/configs/d211_xxx_defconfig” 文件中

#### 2.1.1. 网络功能配置

内核中要使用以太网功能，需要首先打开和配置网络相关功能

```
[*] Networking support
    Networking options
        <*> Packet socket
        <*> Unix domain sockets
        [*] TCP/IP networking
        <*>   INET: socket monitoring interface
        <*> DNS Resolver support
        <*> NETLINK: socket monitoring interface
```

#### 2.1.2. 模块驱动配置

```
Device Drivers
    [*] Network device support
        [*] Ethernet driver support
            [*] ArtInChip Gigabit Ethernet driver
```

### 2.2. 模块系统参数配置

这些参数主要在文件 target/d211/common/d211.dtsi 中，模块系统参数随 SOC 的设定而定，一般不能进行更改，除非更换了新的 SOC，则需要在专业人士的指导下进行更改。

```
gmac0: ethernet@10280000 {
    compatible = "artinchip,aic-mac-v1.0";
    reg = <0x10280000 0x10000>;
    interrupts = <GIC_SPI 7 IRQ_TYPE_LEVEL_HIGH>;
    interrupt-names = "macirq";
    clocks = <&ccu CLK_GMAC0>;
    clock-names = "gmac";
    resets = <&rst RESET_GMAC0>;
    reset-names = "gmac";
};
```

### 2.3. 功能参数配置

功能参数主要针对某一个使用方案而定，因此随着方案的不同，参数很可能不同，

这些参数主要在文件 target/d211/xxx/board.dts中，功能参数的设置必须和硬件原理图相匹配

#### 2.3.1. GMAC 参数

```
&gmac0 {
     pinctrl-names = "default";
     pinctrl-0 = <&gmac0_1000m_pins>;
     phy-handle = <&gmac0_phy>;
     phy-reset-gpios = <&gpio_d 3 GPIO_ACTIVE_HIGH>;
     phy-addr = <1>;
     phy-mode = "rgmii";
     max-speed = <1000>;
     aic,tx-delay = <0xc>;
     aic,rx-delay = <0xc>;

     status = "okay";

 gmac0_1000m_pins: gmac0-0 {
     pins {
         pinmux = <AIC16XX_PINMUX('E', 0, 6)>,
         <AIC16XX_PINMUX('E', 1, 6)>,
         <AIC16XX_PINMUX('E', 2, 6)>,
         <AIC16XX_PINMUX('E', 3, 6)>,
         <AIC16XX_PINMUX('E', 4, 6)>,
         <AIC16XX_PINMUX('E', 5, 6)>,
         <AIC16XX_PINMUX('E', 6, 6)>,
         <AIC16XX_PINMUX('E', 7, 6)>,
         <AIC16XX_PINMUX('E', 8, 6)>,
         <AIC16XX_PINMUX('E', 9, 6)>,
         <AIC16XX_PINMUX('E', 10, 6)>,
         <AIC16XX_PINMUX('E', 11, 6)>,
         <AIC16XX_PINMUX('E', 12, 6)>,
         <AIC16XX_PINMUX('E', 13, 6)>,
         <AIC16XX_PINMUX('E', 14, 6)>,
         <AIC16XX_PINMUX('E', 15, 6)>;
         bias-disable;
         drive-strength = <3>;
     };
 };
```

- - pinctrl-names

    SDK 一般会把要使用的某一功能的端口组预先定义，后期直接使用即可，定义一般放在 target/d211/common/d211-pinctrl.dtsi 文件中，目前 “pinctrl-names” 均设置为 “default” 即可

- - pinctrl-0

    即指示 MAC 预先定义的端口组

- - phy-handle

    MAC 和 PHY 通过 mdio 通信，因此要设定 phy 的寄存器读写地址，phy-handle 指示具体的 PHY 的配置引用对象，该对象一般包含在 MDIO 的配置中。

- - phy-reset-gpios

    因为 SOC 集成了 MAC，因此 MAC 的 reset 可以通过某一个寄存器完成，但对于外挂 PHY 的 SOC，需要提供一个 gpio 做 PHY 的 reset 操作，因为 MAC 和 PHY 的 reset 操作需要尽量保持同步才能使二者的状态同步

- - phy-addr

    PHY 在 MII 总线上的挂载地址，一般在硬件设计原理图有标注，如果没有特殊声明，则默认设置为1即可，驱动中会对该 MII 总线进行查询，来确定该地址是否有 PHY 设备

- - phy-mode

    PHY 和 MAC 的工作模式，目前可选的配置项有：RMII，RGMII，RGMII-ID，RGMII，RGMII-RXID，RGMII-TXID，千兆网口要有延时配置，参考 [工作模式](#gmii-time-delay-label) 章节详细了解

- - max-speed

    限制的端口的最大速度

- - aic,tx-delay

    千兆 PHY 的发送时延，该参数对百兆 PHY 无效，如果 PHY 的 spec 上有特殊要求，则按要求填写，否则设置默认值为 0xC 即可，

- - aic,rx-delay

    千兆 PHY 的接收时延，该参数对百兆 PHY 无效，如果 PHY 的 spec 上有特殊要求，则按要求填写，否则设置默认值为 0xC 即可，

- - aic,use_extclk

    百兆 PHY 是否外部 clk，设置该项说明使用外部独立时钟，否则将使用 SOC 内部的时钟，此值需要结合硬件设计设置，参考 [时钟](#gmac-clocks-label) 章节详细了解

#### 2.3.2. MDIO参数

MDIO 参数用于配置 MII Bus，其用于连接 MAC 和 PHY

```
  gmac0_mdio: mdio {
            compatible = "aicmac-mdio";
            gmac0_phy: ethernet-phy@1 {
                    reg = <1>;
            };
    };
};
```

- - ethernet-phy

    PHY 的参数信息描述，被 MAC 的配置参数中的 phy-handle 引用

- - reg

    PHY 的读写寄存器，PHY 设备的很多寄存器是标准的，在代码中直接定义了，此处一般设为1即可



#### 2.3.3. 工作模式

SOC 中自带了 MAC 模块，MAC 在和 PHY 配合工作前需要协商好二者的工作模式，因此需要配置 PHY 模块的工作模式，目前 MAC 仅支持 Reduced 接口

- RMII： 百兆模式
- RGMII：千兆模式

千兆网络 RGMII 采用边沿触发，上升沿发送一字节数据的低四位，下降沿发送剩余的高四位数数据。接收端时钟采用双边沿采样，但是如果不做额外处理，接收端无法稳定采样，为了解决这一问题，常见的作法是为 时钟信号添加延时，使其边沿对准数据总线的稳定区间。

可以在控制器端（时钟端）或者 PHY 芯片内部添加时延，同一时间只能有一处时延，PHY 模块通过 phy-mode 设置项的参数和 MAC 端进行沟通协商

- - rgmii

    MAC 端进行时延设置，则在 dts 文件中 aic,tx-delay 和 aic,rx-delay 均应被配置

- - rgmii-id

    PHY 芯片进行时延设置，则在 dts 文件中 aic,tx-delay 和 aic,rx-delay 均不能被配置

- - rgmii-rxid

    PHY 芯片进行 RX 时延配置，MAC 端进行 TX 时延设置，则在 dts 文件中 aic,tx-delay 应被配置

- - rgmii-txid

    PHY 芯片进行 TX 时延配置，MAC 端进行 RX 时延设置，则在 dts 文件中 aic,rx-delay 应被配置

#### 2.3.4. 百兆功能参数配置

参考方案为 per2-spinand，MAC 工作在百兆模式下

```
&gmac0 {
    pinctrl-names = "default";
    pinctrl-0 = <&gmac0_pins>;
    phy-handle = <&gmac0_phy>;
    phy-reset-gpios = <&gpio_a 2 GPIO_ACTIVE_HIGH>;
    phy-addr = <1>;
    phy-mode = "rmii";
    max-speed = <100>;
    aic,use_extclk;

    status = "okay";

    gmac0_mdio: mdio {
            compatible = "aicmac-mdio";
            gmac0_phy: ethernet-phy@1 {
                    reg = <1>;
            };
    };
};
```

#### 2.3.5. 千兆功能参数配置

参考方案为 per1，MAC 工作在千兆模式下

```
&gmac0 {
    pinctrl-names = "default";
    pinctrl-0 = <&gmac0_1000m_pins>, <&clk_out2_pins_b>;
    phy-handle = <&gmac0_phy>;
    phy-reset-gpios = <&gpio_f 10 GPIO_ACTIVE_HIGH>;
    phy-addr = <1>;
    phy-mode = "rgmii";
    max-speed = <1000>;
    aic,tx-delay = <0xc>;
    aic,rx-delay = <0xc>;

    status = "okay";

    gmac0_mdio: mdio {
            compatible = "aicmac-mdio";
            gmac0_phy: ethernet-phy@1 {
                    reg = <1>;
            };
    };
};
```



### 2.4. 时钟

MAC 和 PHY 的协同工作共牵涉到三组时钟

#### 2.4.1. MAC 工作时钟

MAC 的内部工作时钟通过 PLL_INT1 分频获得，为 50M， 工作时钟不会因为方案的不同而不同，为一固定值

##### 2.4.1.1. 配置代码

```
plat->aicmac_clk = devm_clk_get(&pdev->dev, AICMAC_RESOURCE_NAME);
clk_set_rate(plat->aicmac_clk, CSR_F_50M);
clk_prepare_enable(plat->aicmac_clk);
```

##### 2.4.1.2. 寄存器查验

MAC 内部工作时钟的在 CMU 模块中统一管理，寄存器值为 0x3117 模块才能正常工作

```
reg-dump -a 0x18020440 -c 4
0x18020440: 00003117 00003117 00000000 00000000
```

#### 2.4.2. PHY 工作时钟

一般 PHY 的工作时钟是 25M， 一般的设计是外挂一个晶振提供时钟给 PHY 模组，d211 对外提供几组时钟，也可以使用该时钟供给 PHY 模块工作。

该时钟 (clk-out) 使能在 CMU 中配置，IO 在 MAC 中配置

```
&cmu {
    clk-out0 = <25000000>;
    clk-out1 = <25000000>;
    clk-out2 = <25000000>;
    clk-out3 = <25000000>;
    // clk-out0-enable;
    // clk-out1-enable;
    /* Enable clock out2 */
    clk-out2-enable;
    // clk-out3-enable;
};

&gmac0 {
    pinctrl-names = "default";
    pinctrl-0 = <&gmac0_1000m_pins>, <&clk_out2_pins_b>;
}
```

#### 2.4.3. MDC 时钟

MDC 时钟是 mdio 的工作时钟，是 MAC 和 PHY 进行配置的工作时钟，双方在使用初期会有一个协商，一般是 MAC 通知 PHY， 该时钟为 MAC 通过模块的内部工作时钟处理生成，也不会因为方案的不同而不同，为一固定值， 目前是 AHB 总线的时钟，240M

MDC 时钟配置错误，则 MAC 和 PHY 的通信不通，呈现的现象是 MAC 无法发现 PHY 设备

##### 2.4.3.1. 配置代码

```
define AICMAC_CSR_DEFAULT      AICMAC_CSR_150_250M
value |= (priv->plat->clk_csr << mdio_data->mii_reg.clk_csr_shift) &
        mdio_data->mii_reg.clk_csr_mask;
```

##### 2.4.3.2. 寄存器查验

```
BIT(2,5) 为 0100，150-250MHz

reg-dump -a 0x10280090 -c 4
0x10280090: 00000a90 00000000 00000000 00000000
```

#### 2.4.4. MDATA 时钟

MDATA 时钟 (TXC) 为 MAC 和 PHY 进行数据传输的时钟，对于百兆和千兆有不同的使用方式

- 百兆网络：可以是 MAC 供给 PHY， 也可以是 PHY 供给 MAC
- 千兆网络：只能是 MAC 供给 PHY，RGMII0-TXCK 端口

##### 2.4.4.1. PHY 提供给 MAC

- dts 中设置 aic,use_extclk;
- 寄存器：0x18000410 值为 00000002

##### 2.4.4.2. MAC 提供给 PHY

- dts 中不设置 aic,use_extclk;
- 寄存器：0x18000410 值为 00000000

### 2.5. MAC地址

MAC地址的使用优先级是

- - 调试配置

    在 dts 的 gmac 配置域中添加： local-mac-address = [2e f6 01 e3 76 b6];

- - 用户配置

    用户生产时配置在特殊数据分区中的 MAC 地址，

- - 加密 CHIPID

    uboot 中获取 chipID，加密成 mac 地址，并通过 dts 的 local-mac-address 配置给 kernel 使用

- - Random

    kernel 驱动中在无法从以上获得 mac 地址的时候，会 random 一个值作为 mac 地址使用

## 3. 调试指南

### 3.1. 调试开关

#### 3.1.1. Log 等级

调试的时候需要设置 log 等级为最高7，设置方法为通过 make km (make kernel_menuconfig) 命令打开 kernel 的 menuconfig

```
Kernel hacking
    printk and dmesg options
        (8) Default console loglevel (1-15)
        (7) Default message log level (1-7)
```

#### 3.1.2. 调试开关

通过 make km (make kernel_menuconfig) 命令打开 kernel 的 menuconfig， 如下路径选中 GMAC 的调试开关

```
Kernel hacking
    [*] Kernel debuging
        ArtInChip Debug
        [*] GMAC Driver Debug
```

### 3.2. 功能验证

网络模块是否可以正常工作可以通过如下顺序排查：

- 驱动是否加载成功
- 本机 MAC 和 PHY 的连接是否成功
- 本机 PHY 和对端 PHY 的连接是否成功
- 本机网络和对端网络的连接是否成功
- 是否可以通信

#### 3.2.1. 驱动加载

在 log 等级为7的情况下，可以通过如下信息对模块的启动进程进行追踪

- 有任何的 error 信息输出，模块都将不正常工作，因此任何的 error 信息都必须要解决

- - libphy: aicgmac: probed

    总线注册成功

- - aicmac_probe success.

    驱动加载成功，使用 ifconfig -a 命令应该可以看到设备

- 其他日志

```
aicmac_phy_init_data phy_addr = 1
aicmac_mac_init_data mac_interface:8 max_speed:1000
aicmac_mdio_init_data mdio:1
mac addr: 4a:2a1e:fbeb:26
aicmac_platform_get_config bus_id:0
libphy: aicgmac: probed
aicmac_probe success.
```

#### 3.2.2. 设备可发现

驱动加载成功的主要标志是网络设备存在，可以通过 “ifconfig -a” 命令查看设备是否存在，如果某一个设备不存在，则要排查驱动是否编译，是否加载，设备的系统参数和功能参数配置是否正确

```
[aic@] # ifconfig -a
eth0    Link encap:Ethernet  HWaddr DA:BD:4C:BA:5D:80
        BROADCAST MULTICAST  MTU:1500  Metric:1
        RX packets:0 errors:0 dropped:0 overruns:0 frame:0
        TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
        collisions:0 txqueuelen:1000
        RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)
        Interrupt:25

eth1    Link encap:Ethernet  HWaddr 6A:8D:2A:7F:EA:3E
        BROADCAST MULTICAST  MTU:1500  Metric:1
        RX packets:0 errors:0 dropped:0 overruns:0 frame:0
        TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
        collisions:0 txqueuelen:1000
        RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)
        Interrupt:26
```

#### 3.2.3. 设备可启动

设备启动的时候 MAC 会尝试和 PHY 建立连接，可以通过 “ifconfig eth0 up” 命令来启动网络设备，如果启动不成功，则说明 MAC 和 PHY 的连接不成功， 居多 MDC 时钟不工作， 也可能是 phy-addr 设置错误

```
[aic@] # ifconfig eth0 up
    gmac 10280000.ethernet eth0: PHY [aicgmac-0:01] driver [RTL8211F Gigabit Ethernet] (irq=POLL)
    gmac 10280000.ethernet eth0: RX IPC Checksum Offload disabled
    gmac 10280000.ethernet eth0: configuring for phy/rgmii link mode
```

#### 3.2.4. 网络可联通

网络的联通是本机 PHY 和远端 PHY 通过网线建立的，同时要牵涉到 MAC 到 PHY,PHY 到 PHY，PHY 到 MAC 的一个循环

##### 3.2.4.1. 物理连接信息

PHY 和 PHY 的协商是自动的，不需要 MAC,AP 的参与，因此两个 PHY 通过网线连接时，二者应该是自协商成功的，对于有指示灯的系统，PHY 物理连接成功后指示灯会呼吸

##### 3.2.4.2. 模块状态信息

通过命令 “ifconfig eth0 up” 打开设备，如果连接成功，则会报告 Link is Up 的信息，如下所示

如果没有连接成功，并且 MAC 和 PHY 的连接是成功的，则说明两个 PHY 的连接或者协商不成功，有两个可能

- 二者的工作模块无法协商成功，如某一方只支持百兆，而另一方只支持千兆，或者是两个标准的 PHY 模块等，可以更换对端的网络设备，如换为路由器，PC 等
- 物理网络不通，更换网线

```
[aic@] # ifconfig eth0 up
    gmac 10280000.ethernet eth0: Link is Up - 1Gbps/Full - flow control rx/tx
    IPv6: ADDRCONF(NETDEV_CHANGE): eth0: link becomes ready

[aic@] # ethtool  eth0
    Speed: 1000Mb/s
    Duplex: Full
    Auto-negotiation: on
    master-slave cfg: preferred slave
    master-slave status: master
    Port: Twisted Pair
    PHYAD: 1
    Transceiver: external
    MDI-X: Unknown
    Supports Wake-on: d
    Wake-on: d
    Current message level: 0x0000003f (63)
                           drv probe link timer ifdown ifup
    Link detected: yes
```

#### 3.2.5. 网络可通信

经过上述的排查，MAC 和 PHY，PHY 和远端 PHY 的通路均正常，则可以进行网络通信验证

##### 3.2.5.1. 验证方法

- 通过 ifconfig eth0 ipaddr 设置一IP地址
- 通过 ping 对端 ipaddr 来验证是否可以通信

```
[aic@] # ifconfig eth0 192.168.168.100
[aic@] # ping 192.168.168.101
PING 192.168.168.101 (192.168.168.101): 56 data bytes
64 bytes from 192.168.168.101: seq=0 ttl=64 time=4.004 ms
64 bytes from 192.168.168.101: seq=1 ttl=64 time=0.943 ms
64 bytes from 192.168.168.101: seq=2 ttl=64 time=0.818 ms
```

##### 3.2.5.2. 问题分析

如果通信不正常，在没有对驱动进行修改的情况下，一般不会是寄存器配置的问题，可能的原因有

- cl k配置，如果使用外部 clk，则要设置 aic,use_extclk
- clk 频率，测量 MII Data的TX/RX Clk 的频率，满足当前标准
- 时延，如果使用的是千兆网络，确定时延的配置和硬件匹配
- 防火墙，确认路由器，对端设备不受防火墙的隔离保护

如果以上问题均排除，则请获取日志提交原厂分析

### 3.3. 寄存器信息

一个可以正常工作的 MAC 模块的寄存器样板

#### 3.3.1. 千兆

```
reg-dump -a 0x10280000 -c 128
0x10280000: 00000012 06432208 00080400 04660000
0x10280010: 0001a061 00000000 00000000 00000311
0x10280020: 00000003 00000061 00000009 00000000
0x10280030: 00000000 ffff000e 00000000 00000000
0x10280040: 00000404 00000000 00000000 00000000
0x10280050: 80009d32 195ef056 00000000 00000000
0x10280060: 00000000 00000000 00000000 00000000
0x10280070: 00000000 00000000 00000000 00000000
0x10280080: 00000000 00000000 00000000 00000000
0x10280090: 00000850 000079ad 00000000 00000000
0x102800a0: 00000000 0000000d 00000000 00000000
0x102800b0: 4341c000 43418000 4341c000 434182e0
0x102800c0: 00000000 40d25000 00000000 00000000
0x102800d0: 00000000 00000000 00000000 00000000
0x102800e0: 00000000 00000000 00000000 00000000
0x102800f0: 00000000 00000000 00000000 00000000
0x10280100: 00002000 00000000 00000000 00000000
0x10280110: 00000000 00000000 00000000 00000000
0x10280120: 00000000 00000000 00000000 00000000
0x10280130: 00000000 00000000 00000000 00000000
0x10280140: 00000000 00000000 00000000 00000000
0x10280150: 00000000 00000000 00000000 ffffffff
0x10280160: 00000000 00000000 00000000 00000000
```

#### 3.3.2. 百兆

```
reg-dump -a 0x10280000 -c 128
0x10280000: 00000016 06432208 00080400 00660000
0x10280010: 0001a061 00000000 00000000 00000311
0x10280020: 00000003 00000061 00000009 00000000
0x10280030: 00000000 ffff000e 00000000 00000000
0x10280040: 00000404 00000000 00000000 00000000
0x10280050: 8000c416 44da1a5a 00000000 00000000
0x10280060: 00000000 00000000 00000000 00000000
0x10280070: 00000000 00000000 00000000 00000000
0x10280080: 00000000 00000000 00000000 00000000
0x10280090: 00000850 0000786d 00000000 00000000
0x102800a0: 00000000 00000008 00000000 00000000
0x102800b0: 4383c000 43838000 4383c000 43838440
0x102800c0: 00000000 41f9c000 00000000 00000000
0x102800d0: 00000000 00000000 00000000 00000000
0x102800e0: 00000000 00000000 00000000 00000000
0x102800f0: 00000000 00000000 00000000 00000000
0x10280100: 00002000 00000000 00000000 00000000
0x10280110: 00000000 00000000 00000000 00000000
0x10280120: 00000000 00000000 00000000 00000000
0x10280130: 00000000 00000000 00000000 00000000
0x10280140: 00000000 00000000 00000000 00000000
0x10280150: 00000000 00000000 00000000 ffffffff
0x10280160: 00000000 00000000 00000000 00000000
```

### 3.4. 驱动信息

通过 “ethtool -i eth0” 命令可以查看设备驱动信息，用以确认驱动版本，mii 总线挂载信息

```
[aic@] # ethtool -i eth0
driver: aicgmac
version: 20211010
firmware-version:
expansion-rom-version:
bus-info: aicgmac-0:01 : 设备id：phy addr id
supports-statistics: no
supports-test: no
supports-eeprom-access: no
supports-register-dump: yes
supports-priv-flags: no
```

### 3.5. 设备信息

设备的信息固化在 MAC 模块硬件寄存器和设备驱动中，通过 “ethtool eth0” 命令可以确认设备的配置信息是否正确

#### 3.5.1. 连接成功前

```
[aic@] # ethtool eth0
Settings for eth0:
    Supported ports: [ TP    MII ]
    Supported link modes:   10baseT/Half 10baseT/Full
                            100baseT/Half 100baseT/Full
                            1000baseT/Full
    Supported pause frame use: Symmetric Receive-only
    Supports auto-negotiation: Yes
    Supported FEC modes: Not reported
    Advertised link modes:  10baseT/Half 10baseT/Full
                            100baseT/Half 100baseT/Full
                            1000baseT/Full
    Advertised pause frame use: Symmetric Receive-only
    Advertised auto-negotiation: Yes
    Advertised FEC modes: Not reported
    Speed: Unknown!
    Duplex: Unknown! (255)
    Auto-negotiation: on
    master-slave cfg: preferred slave
    master-slave status: unknown
    Port: Twisted Pair
    PHYAD: 1
    Transceiver: external
    MDI-X: Unknown
    Supports Wake-on: d
    Wake-on: d
    Current message level: 0x0000003f (63)
                           drv probe link timer ifdown ifup
    Link detected: no
```

#### 3.5.2. 连接成功后

```
[aic@] # ethtool eth0
Settings for eth0:
    Supported ports: [ TP    MII ]
    Supported link modes:   10baseT/Half 10baseT/Full
                            100baseT/Half 100baseT/Full
                            1000baseT/Full
    Supported pause frame use: Symmetric Receive-only
    Supports auto-negotiation: Yes
    Supported FEC modes: Not reported
    Advertised link modes:  10baseT/Half 10baseT/Full
                            100baseT/Half 100baseT/Full
                            1000baseT/Full
    Advertised pause frame use: Symmetric Receive-only
    Advertised auto-negotiation: Yes
    Advertised FEC modes: Not reported
    Link partner advertised link modes:  10baseT/Half 10baseT/Full
                                        100baseT/Half 100baseT/Full
                                        1000baseT/Full
    Link partner advertised pause frame use: Symmetric Receive-only
    Link partner advertised auto-negotiation: Yes
    Link partner advertised FEC modes: Not reported
    Speed: 1000Mb/s
    Duplex: Full
    Auto-negotiation: on
    master-slave cfg: preferred slave
    master-slave status: slave
    Port: Twisted Pair
    PHYAD: 1
    Transceiver: external
    MDI-X: Unknown
    Supports Wake-on: d
    Wake-on: d
    Current message level: 0x0000003f (63)
                    drv probe link timer ifdown ifup
    Link detected: yes
```

### 3.6. 辅助工具

#### 3.6.1. 数据包分析

一般使用 WiredShark 抓包工具进行数据包的分析，可以借助其分析发送和接收的数据内容，从而分析通信双方的行为

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/wireshark1.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/wireshark1-170675694766213.jpg)

#### 3.6.2. 网速测试

压力测试的模型是搭建一个简单的 C/S 模型，Client 以最大资源利用发送数据，Server 端接收数据并进行相应计算

SDK 自带两种可用于进行压力测试的工具，iperf3 和 netperf，二者会以全速进行数据的收发，并进行丢包，错包，发送速率计算等辅助工作

网速测试因为需要验证收到的信息的准确性，因此有比较大的计算任务，所以也受 CPU 和 DDR 频率的影响

##### 3.6.2.1. iperf3

- - server 命令

    iperf3 -s

- - client 命令

    iperf3 -c 192.168.168.100 -u -b 50M ， 以 50M UDP 的方式和 server 192.168.168.100 进行测试

##### 3.6.2.2. netperf

- - server 命令

    netserver

- - client 命令

    netperf -H 192.168.168.100 ， 不限速和 server 192.168.168.100 进行测试

##### 3.6.2.3. 持久测试

不管是 iperf3 还是 netperf 都是进行有限次的数据交互后即停止工作，如果进行长时间的压力测试，则需要脚本配合

```
#!/bin/bash

#Run as Server

ifconfig eth0 up
ifconfig eth0 192.168.168.100

#netserver >/dev/null
iperf3 -s >/dev/null
#!/bin/bash
#Run as Client

ifconfig eth0 up
ifconfig eth0 192.168.168.105

for i in $(seq 1 10000)
do
    echo "Start to test at $i times"
    #netperf -H 192.168.168.100
    iperf3 -c 192.168.168.100 -u -b 50M
    sleep 5
done
```

## 4. 测试指南

### 4.1. 准备工作

#### 4.1.1. 物料

- 交换机 最好是千兆交换机，因为千兆交换机兼容百兆，但百兆不兼容千兆
- 测试板 需要确定测试板的Phy端口的速度，千兆还是百兆
- 网线 可以进行路由器连接的网线

#### 4.1.2. 软件

确保 SDK 包含如下测试需要的网络软件

- 网络设备相关软件 主要在 bosybox 中，如 ifconfig 等
- 网速测试软件 主要是 iperf3 或者 netperf，推荐 iperf3，可设置参数更多

### 4.2. 组网拓扑

推荐两种组网拓扑，可依现实条件选择使用

#### 4.2.1. 直连

组网简单，但单机千兆 PHY 的兼容性不如交换机千兆 PHY，可能会出现 PHY 协商出错的问题

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/test-top11.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/test-top11-170675700704615.jpg)

#### 4.2.2. 交换机中转

多一层网络设备，但对千兆网络的兼容性更好

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/test-top21.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/test-top21-170675701660917.jpg)

### 4.3. 功能测试

#### 4.3.1. 测试步骤

- 配置好目标板的相关参数
- 按相应组网拓扑搭建好测试网络
- 开机后使能网络，并配置 IP 地址
- 通过 ping 对端的方式测试网络可以 ping 通

#### 4.3.2. 注意事项

- 注意检查系统启动时 MAC 模块的打印信息，确保无错误信息和错误参数
- 注意检查相应操作的驱动信息输出，确保双方的协商参数，协商步骤一致

### 4.4. 速度测试

#### 4.4.1. 测试步骤

- 配置好目标板的相关参数
- 按相应组网拓扑搭建好测试网络
- 开机后使能网络，并配置 IP 地址
- 使用 iperf3 udp 模式测试，测试命令：iperf3 -c -u 192.168.168.100

#### 4.4.2. 注意事项

- 速度测试对系统资源使用非常高，注意检查测试时系统资源的瓶颈，以此作为出错信息的判断参考
- 如果 CPU，DDR 资源是瓶颈，则可以手工降低资源的使用，iperf3 -c 192.168.168.100 -u -b 90m

### 4.5. 兼容性测试

兼容性主要是两个模块的配合工作能力，系统有两个具有兼容性的实体（MAC 和 PHY），有一组对兼容性有大影响的参数（百兆和千兆）

PHY 和 PHY 之间的协商由 PHY 的电气参数完成，无软件参与，因此如果有两个设备的 PHY 无法按设计协商一致，一般归为 PHY 的问题

MAC 和 PHY 之间的协商一般由驱动完成，借助途径是 PHY 的读写寄存器，如果二者协商不成功，一般需要调整 PHY 的配置参数

因此兼容性测试可以进行如下项目的测试：

- 百兆设备 和 百兆设备的兼容性测试
- 百兆设备 和 千兆设备的兼容性测试
- 千兆设备 和 千兆设备的兼容性测试

测试方法为：

- 拔插网线多次，均能正常识别拔插动作
- 拔插网线多次，均能正常协商为预定工作模式和速录
- 拔插网线多次，均能正常进行网络通信，ping 通

### 4.6. 性能测试

- 性能测试主要专注于时间和速度的跟踪，如果建立连接的时间，通信速度
- 性能测试可以使用 iperf3 和 netperf 完成
- 性能也会被系统资源影响，如 CPU 和 DDR 资源
- 使用 iperf3 和 netperf 进行网速测试时，client 端的 CPU 资源使用更多，因此如果 client 运行在 PC 等其他系统上，则性能值会增加

### 4.7. 稳定性测试

性能测试需要进行多次触发性动作测试

- 100次拔插操作，均能正常识别，正常建立连接正常通信
- 100次拔插操作后，能正常进行通信
- 1000次 enable/disable 操作后能正常通信
- 少量长时间数据通信，ping 48小时不丢包
- 长时间压力，模块不进行自动重启，测试完成后，模块功能正常

### 4.8. 高低温测试

测试在工控标准的高温和低温环境下： - 功能正常 - 长时间通信正常 - 压力测试不导致模块自动重启

## 5. 源码说明

### 5.1. 代码结构

Ethernet 的源码牵涉三个目录

- MAC 驱动

```
MAC的主驱动代码
drivers/net/ethernet/artinchip
```

- PHY 驱动

```
使用到的 mdio，phy 等模块的驱动
drivers/net/phy
```

- SysConfig

```
系统时钟选择，delay 设置等
drivers/misc/artinchip-syscfg.c
```

#### 5.1.1. 文件命名说明

```
aicmac_module_submodule.c
aicmac_module_submodule.h
```

#### 5.1.2. 文件说明

| 文件名称           | 用途                             | 备注                 |
| ------------------ | -------------------------------- | -------------------- |
| aicmac.h           | priv 数据结构，宏入口            |                      |
| aicmac_core.c      | 驱动核心逻辑                     |                      |
| aicmac_platform.c  | 平台相关，驱动注册，dts 配置处理 |                      |
| aicmac_platform.h  | platform 数据结构，包含其他模块  |                      |
| aicmac_napi.c      | napi 接口及相关逻辑              |                      |
| aicmac_mac.c       | mac相关逻辑代码                  |                      |
| aicmac_gmac_reg.c  | gmac registers                   |                      |
| aicmac_dma.c       | dma相关逻辑代码                  |                      |
| aicmac_dma_reg.c   | dma registers                    |                      |
| aicmac_dma_desc.c  | dma descriptor                   | entended descriptor  |
| aicmac_dma_ring.c  | dma ring mode                    | 推荐使用 ringmode    |
| aicmac_dma_chain.c | dma chain mode                   |                      |
| aicmac_mdio.c      | mdio 相关逻辑代码                |                      |
| aicmac_phy.c       | physic 相关逻辑代码              |                      |
| aicmac_ethtool.c   | ethtool 相关逻辑代码             |                      |
| aicmac_macaddr.c   | mac地址各种生成逻辑              |                      |
| aicmac_util.c      | 公共函数                         | 主要为信息格式化输出 |
| aicmac_1588.c      | IEEE1588/PTP 相关逻辑            |                      |
| aicmac_hwstamp.c   | hardware stamp, 为 IEEE1588 服务 |                      |

#### 5.1.3. 函数命名说明

```
aicmac_module_method
```

#### 5.1.4. C 文件格式

```
// SPDX-License-Identifier: GPL-2.0-only
/*
* Copyright (C) 2021 ArtInChip Technology Co., Ltd.
* Author: Keliang Liu <keliang.liu@artinchip.com>
*/

#include <>

#include “”
```

#### 5.1.5. H 文件格式

```
/* SPDX-License-Identifier: GPL-2.0-only */
/*
* Copyright (C) 2021 ArtInChip Technology Co., Ltd.
* Author: Keliang Liu <keliang.liu@artinchip.com>
*/

#ifndef _XXX_XXX_H_
#define _XXX_XXX_H_


#endif
```

#### 5.1.6. Module Description

```
MODULE_AUTHOR("Keliang Liu");
MODULE_DESCRIPTION("ArtInChip GMAC Driver");
MODULE_ALIAS("platform:" AICMAC_RESOURCE_NAME);
MODULE_LICENSE("GPL");
```

### 5.2. 驱动架构

#### 5.2.1. 驱动架构图

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/mac-arch.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/mac-arch-170675729041819.jpg)

#### 5.2.2. 驱动模块描述

- Platform：驱动入口，进行驱动声明和注册，dts 解析
- Core：驱动核心逻辑，调度其他模块
- MAC：MAC 子模块处理，其中寄存器操作接口单独封装
- DMA：DMA 相关逻辑处理，寄存器，Ring，Chain，Descriptor 单独封装
- MDIO：MDIO 总线相关逻辑处理
- PHY：PHY 模块相关逻辑处理
- NAPI：NAPI 接口逻辑处理
- ethtool：提供 ethtool 接口的逻辑
- mac addr：和各种外设资源配合完成 mac 地址的逻辑
- 1588：对 IEEE1588（PTP）的逻辑封装

#### 5.2.3. 数据结构

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/mac-para.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/mac-para-170675730037421.jpg)

#### 5.2.4. 数据流程

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/mac-data.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/mac-data-170675730993123.jpg)

### 5.3. 关键流程设计

#### 5.3.1. 初始化流程

```
|-->aicmac_platform_get_resources
    |-->kzalloc aicma_resources
    |-->platform_get_irq_byname
    |-->devm_platform_ioremap_resource
|-->aicmac_platform_get_config
    |-->aicmac_platform_init_data
        |-->aicmac_phy_init_data
        |-->aicmac_mac_init_data
        |-->aicmac_mdio_init_data
        |-->aicmac_mda_init_data
        |-->aicmac_napi_init_data
        |-->aicmac_1588_init_data
    |-->aicmac_platform_get_mac_addr
    |-->aicmac_platform_init_ioirq
    |-->handle clk: mac clk, pclk
    |-->aicmac_1588_init_clk
    |-->devm_reset_control_get
|-->aicmac_core_init
    |-->devm_alloc_etherdev_mqs
    |-->netdev_priv(ndev)
    |-->create_singlethread_workqueue
    |-->aicmac_service_task
    |-->reset_control_assert
    |-->aicmac_mac_init
        |-->aicmac_mac_ip_init
        |-->aicmac_mac_reg_core_init
    |-->aicmac_dma_init
        |-->dma_set_mask_and_coherent
    |-->aicmac_napi_init
        |-->netif_set_real_num_rx_queues
        |-->netif_set_real_num_tx_queues
    |-->aicmac_core_setup_napiop
        |-->netif_napi_add(rx)
        |-->netif_napi_add(tx)
    |-->mutex_init
    |-->aicmac_mdio_register
        |-->mdiobus_alloc
        |-->of_mdiobus_register
        |-->mdiobus_get_phy
    |-->aicmac_phy_init
        |-->phylink_create
    |-->aicmac_1588_init
        |-->ptp_clock_register
    |-->register_netdev
```

#### 5.3.2. 设备打开流程

如果在终端执行 “ifconfig eth0 up”，则进行设备打开流程，函数 aicmac_open 被调用 .. code-block:

```
aicmac_open
|-->aicmac_mac_reg_core_init
    |-->aicmac_mac_reg_init_basic_config(mac, dev);
    |-->aicmac_mac_reg_init_tx_func(mac, dev);
    |-->aicmac_mac_reg_init_rx_func(mac, dev);
|-->aicmac_phy_connect
    |-->phylink_of_phy_connect
    |-->mdiobus_get_phy
    |-->phylink_connect_phy
|-->aicmac_dma_ring_set_16kib_bfsize
|-->aicmac_dma_ring_set_bfsize
|-->aicmac_dma_alloc_dma_desc_resources
    |-->aicmac_dma_alloc_dma_rx_desc_resources
    |-->aicmac_dma_alloc_dma_rx_desc_resources
|-->aicmac_dma_init_desc_rings
    |-->aicmac_dma_init_rx_desc_rings
    |-->aicmac_dma_init_tx_desc_rings
    |-->aicmac_dma_clear_rx_descriptors
    |-->aicmac_dma_clear_tx_descriptors
|-->aicmac_hw_setup
    |-->aicmac_dma_init_engine
    |-->aicmac_mac_reg_reset
    |-->aicmac_mac_reg_set_umac_addr
    |-->aicmac_mac_reg_core_init
    |-->aicmac_mac_reg_rx_ipc_enable
    |-->aicmac_mac_reg_enable_mac
    |-->aicmac_dma_operation_mode
        |-->aicmac_dma_reg_operation_mode_rx
        |-->aicmac_dma_reg_operation_mode_tx
    |-->aicmac_dma_start_all_dma
        |-->aicmac_dma_reg_start_rx
        |-->aicmac_dma_reg_start_tx
|-->aicmac_init_coalesce
    |-->aicmac_tx_timer
|-->phylink_start
|-->request_irq->aicmac_interrupt
|-->aicmac_enable_all_queues
|-->netif_tx_start_all_queues
```

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/mac-open.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/mac-open-170675733618325.jpg)

#### 5.3.3. 数据发送流程

执行任何的发送操作(如 ping 命令)，aicmac_xmit 将被调用 .. code-block:

```
aicmac_xmit
|-->aicmac_tx_avail
|-->aicmac_vlan_insert
|-->aicmac_dma_ring_is_jumbo_frm
|-->aicmac_dma_ring_jumbo_frm
|-->aicmac_dma_desc_set_addr
|-->aicmac_dma_desc_prepare_tx_desc
|-->skb_tx_timestamp
|-->netdev_tx_sent_queue
|-->aicmac_dma_reg_enable_transmission
|-->aicmac_tx_timer_arm
```

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/mac-xmit.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/mac-xmit-170675735098827.jpg)

#### 5.3.4. 数据接收流程

有任何数据到达，MAC 将产生中断，则函数 aicmac_interrupt 被执行

```
aicmac_interrupt
|-->aicmac_napi_check
    |-->invoke aicmac_napi_poll_rx
    |-->aicmac_rx
        |-->netif_msg_rx_status
        |-->aicmac_dma_desc_get_rx_status
        |-->dma_sync_single_for_cpu
        |-->skb_copy_to_linear_data
        |-->skb_put
        |-->page_pool_recycle_direct
        |-->skb_add_rx_frag
        |-->page_pool_release_page
        |-->aicmac_1588_get_rx_hwtstamp
        |-->skb_set_hash
        |-->skb_record_rx_queue
        |-->napi_gro_receive
        |-->aicmac_rx_refill
    |-->aicmac_dma_reg_enable_irq
|-->aicmac_dma_set_operation_mode
```

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/mac-receive.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/mac-receive-170675737169829.jpg)

#### 5.3.5. DMA初始化流程

DMA 模块将在设备 Open 的时候初始化 .. code-block:

```
aicmac_dma_init_desc_rings
|-->aicmac_dma_init_rx_desc_rings
    |-->aicmac_dma_clear_rx_descriptors
        |-->aicmac_dma_desc_init_rx_desc
    |-->aicmac_dma_init_rx_buffers
    |-->aicmac_dma_chain_init(RX,TX)
|-->aicmac_dmac_init_tx_desc_rings
    |-->aicmac_dma_desc_clear
    |-->netdev_tx_reset_queue
|-->aicmac_dma_clear_descriptors
    |-->aicmac_dma_clear_rx_descriptors
        |-->aicmac_dma_desc_init_rx_desc
    |-->aicmac_dma_clear_tx_descriptors
        |-->aicmac_dma_desc_init_tx_desc
|-->aicmac_dma_display_rings
```

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/mac-dma.jpg](https://photos.100ask.net/artinchip-docs/d213-devkit/mac-dma-170675738921831.jpg)

## 6. 常见问题

### 6.1. MAC 设备无法发现

如果使用 “ifconfig -a” 无法发现 MAC 设备，则主要是 MAC 驱动初始化异常，可以如下顺序排查:

- 驱动模块是否编译和加载
- dts 中 设备是否打开
- 初始化过程中是否有错误输出
- GPIO 端口的功能配置是否正确

### 6.2. MAC 无法发现 PHY

MAC 无法发现 PHY 一般是 MAC 和 PHY 的通信异常导致，PHY 的驱动一般是次要的，因为通用 PHY 驱动基本上可以驱动大部分

- PHY reset 是否配置正常
- PHY 的地址是否配置正确，一般会有扫描机制，配置错误只会影响启动速度
- MAC 和 PHY 的 MDC 时钟是否工作正常

### 6.3. 网络不通

在 MAC 和 PHY 联通后而网络不通，譬如 ping 命令不通的原因很多，列一个检查项：

- MDATA 时钟是否配置正确，外部还是内部，必要时使用示波器检查一下波形和频率
- 时延是否配置正确，一定要和硬件原理图匹配
- 检查各寄存器是否有错误信息上报
- 当前网络环境是否有限制，如防火墙开启等