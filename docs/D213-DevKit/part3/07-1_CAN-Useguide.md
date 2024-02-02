---
sidebar_position: 16
---
#  CAN 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语      | 定义                        | 注释说明                                              |
| --------- | --------------------------- | ----------------------------------------------------- |
| CAN       | Controller Area Network     | 控制器局域网络                                        |
| socketCAN | socketCAN                   | 使用Berkeley socket API，Linux网络栈实现的CAN驱动框架 |
| NAPI      | New API                     | Linux新的网卡数据处理API，综合了中断方式与轮询方式    |
| RTR       | Remote Transmission Request | 远程请求帧                                            |
| EFF       | Extended Frame Format       | 扩展帧                                                |

### 1.2. 模块简介

CAN控制器，多应用于汽车控制系统和一般工业环境中的区域网络控制。CAN是一种多主机、多广播的通信协议，CAN总线上的各个节点都可以向总线发送数据，多个节点同时发送时利用仲裁机制，从而确保最高优先级的数据可以正常发送到总线上，具有很高的实时性和可靠性。

该模块的基本特性如下：

- 支持CAN2.0A和CAN2.0B协议
- 支持11位标识符(标准格式)和29位标识符(扩展格式)
- 可编程通信速率最高达1Mbps
- 支持多种操作模式：正常模式、只听模式、自测模式、休眠模式、复位模式
- 错误检测与处理：错误计数、错误报警阈值可配置、错误捕获、仲裁丢失捕获

## 2. CAN配置指南

### 2.1. 内核配置

```
[*] Networking support--->
        <*> CAN bus subsystem support--->
                CAN Device Drivers--->
                    <*> Platform CAN drivers with Netlink support
                    [*] CAN bit-timing calculation
                    <*> Support for ARTC CAN
```

### 2.2. DTS配置

CAN模块基本配置

```
can0: can@19230000 {
    compatible = "artc,artc-can";
    reg = <0x0 0x19230000 0x0 0x400>;
    interrupts-extended = <&plic0 88 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cmu CLK_CAN0>;
    resets = <&rst RESET_CAN0>;
};

can1: can@19231000 {
    compatible = "artc,artc-can";
    reg = <0x0 0x19231000 0x0 0x400>;
    interrupts-extended = <&plic0 89 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cmu CLK_CAN1>;
    resets = <&rst RESET_CAN1>;
};
```

xxx/board.dts配置

```
&can0 {
    pinctrl-names = "default";
    pinctrl-0 = <&can0_pins>;
    status = "okay";
};

&can1 {
    pinctrl-names = "default";
    pinctrl-0 = <&can1_pins>;
    status = "okay";
};
```

## 3. 调试指南

```
待后续补充
```

## 4. 测试指南

### 4.1. 测试环境

#### 4.1.1. 硬件

- 测试板：带有两个CAN接口的测试板
- PC：用于和测试板交互
- 串口线：连接测试板的调试串口

#### 4.1.2. 软件

- PC端串口终端软件
- can-utils第三方软件包
- iprouter2第三方软件包

### 4.2. 第三方软件包编译

SDK中已默认编译can-utils/iprouter2软件包，可以直接使用。也可以通过以下两种方式编译测试：

#### 4.2.1. 使用预编译包

SDK中提供了can-utils/iprouter2的预编译包，可以直接将预编译包的目标文件编译到镜像。这种方式不需要编译can-utils/iprouter2源码，节省编译时间。

```
Third-party packages--->
    [*] can-utils--->
            [*] use prebuilt binary instead of building from source
Third-party packages--->
    [*] iproute2--->
            [*] use prebuilt binary instead of building from source
```

#### 4.2.2. 编译源码包

这种方式直接编译源码，而不使用SDK中的预编译包。

```
Third-party packages--->
    [*] can-utils--->
            [ ] use prebuilt binary instead of building from source
Third-party packages--->
    [*] iproute2--->
            [ ] use prebuilt binary instead of building from source
```

### 4.3. CAN收发测试

将测试板上的两个CAN接口对接。使用ip命令设置两个开发板的CAN接口，设置CAN接口的速度为500Kb/s。

```
ip link set can0 type can bitrate 500000    //设置CAN0
ip link set can1 type can bitrate 500000    //设置CAN1
```

打开CAN网卡

```
ifconfig can0 up    //打开CAN0
ifconfig can1 up    //打开CAN1
```

设置CAN1接收数据

```
candump can0 &
```

CAN0发送数据

```
cansend can0 5A1#11.22.33.44.55.66.77.88
```

上述cansend命令中，“5A1”是帧ID，“#”后面的“11.22.33.44.55.66.77.88”是要发送的数据，十六进制。CAN2.0一次最多发送8个字节的数据，8字节数据之间用“.”隔开，can-utils会对数据进行解析。

注解

当CAN总线上只有一个结点时，此时CAN结点发送数据，无法获取到ACK，此时结点检测到错误并将会一直重发数据，该结点会进入被动错误状态，但不会进入总线关闭状态，直到有其它结点接入总线。这是符合CAN总线协议的。

### 4.4. CAN组网测试

多个CAN结点可进行组网测试，组网测试时应遵循以下原则：

1. 不同CAN结点发送不同的帧ID，当多个结点同时发送时，总线根据帧ID进行仲裁，优先级最高的获得总线权，可以向总线发送数据。若结点发送的帧ID相同，则同时发送数据时将无法仲裁。
2. 组网测试时应确保总线两端匹配有120欧姆（典型值）的终端电阻。

注解

由于每个demo板都有匹配的终端电阻，多个CAN接入总线时，多个demo板的终端电阻并联接入网络，会严重影响CAN总线通信。应拆除掉多余的终端电阻，确保整个CAN网络的终端电阻为120欧姆。

## 5. 设计说明

### 5.1. 源码说明

CAN模块的源码位于：linux-5.10/drivers/net/can/artc_can.c

### 5.2. 模块架构

较早的linux内核版本的CAN驱动都是基于字符设备驱动实现，提供的功能相对较少，数据包的排队和更高级别的传输协议必须在用户空间的应用程序实现。现在的内核版本普遍采用socketCAN实现CAN模块的驱动。socketCAN是将CAN作为一种网络设备，基于linux内核的网络层实现的软件框架。

#### 5.2.1. CAN分层结构

CAN结点的实现可以分为四层结构，各层的主要功能和作用如下图所示：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/can_arch1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/can_arch1-17067527786903.png)

CAN总线的对象层和传输层包括所有由ISO/OSI模型定义的数据链路层的服务和功能，相当于是对数据链路层功能的细分。因此，也可以将对象层和传输层看作是CAN的数据链路层。

#### 5.2.2. socketCAN驱动框架

依据CAN的分层模型，socketCAN实现了具体的软件驱动框架，如下图所示(iprouter2/can-utils只是应用层的一个示例，并不属于socketCAN的内容)。

| OSI七层网络模型 | CAN模型   | socketCAN框架实现   |
| --------------- | --------- | ------------------- |
| 应用层          | 应用层    | iprouter2/can-utils |
| 表示层          |           |                     |
| 会话层          |           |                     |
| 传输层          |           |                     |
| 网络层          |           |                     |
| 数据链路层      | 对象层    | CAN core/CAN driver |
| 传输层          | CAN控制器 |                     |
| 物理层          | 物理层    | CAN收发器           |

CAN core主要是实现了CAN的socket配置，并向CAN driver提供一些调用的接口，该部分内容由socketCAN框架负责。传输层和物理层所对应的CAN控制器和收发器皆由硬件实现，所以驱动开发的主要工作是实现CAN driver部分的代码。

CAN的底层驱动实现主要包括以下几部分：

- 设置CAN的位时序
- 获取CAN的发送/接收计数
- CAN设备的打开/关闭
- CAN设备发送/接收帧信息的操作
- CAN设备错误处理的操作

### 5.3. 关键流程设计

#### 5.3.1. 初始化流程

CAN模块的初始化流程如下：

1. 释放reset和clock信号
2. 调用alloc_candev，给struct net_device类型的变量分配空间
3. 初始化结构体struct can_priv的各个成员变量
4. 调用register_candev注册CAN设备

#### 5.3.2. 中断处理流程

CAN的中断处理流程由两种方式：

1. 利用内核中网络的NAPI机制，定义一个轮询函数，将该函数加入NAPI链表，接收中断触发时，由napi_schedule调度轮询函数的执行，以轮询方式接收所有的数据包直到接收结束。
2. 不采用NAPI机制，而是直接在中断中进行轮询，达到最大轮询次数后退出中断。

内核官方文档推荐参考的MSCAN和SJA1000的驱动中，分别采用了上述的两种方式实现。AIC的CAN模块驱动中断处理流程是采用的第二种方式，即在中断中进行限定次数的轮询。驱动中设置的最大轮询次数为20。中断处理流程如下：

1. 进入中断处理函数后，判断有中断标志置位且轮询次数不超过20，进入while循环。
2. 若为发送结束中断，则struct net_device_stats的tx_bytes和tx_packets增加，记录发送的数据字节大小和包个数
3. 若为接收中断，则循环接收数据，直到RXFIFO为空
4. 若出现仲裁错误、总线错误、主动错误、被动错误、数据溢出。则需要进行错误处理，并上报错误类型。
5. 清空中断标志

#### 5.3.3. 数据发送流程

由于CAN每帧的数据量只有8byte，所以发送数据时没有采用DMA或中断方式，而是直接调用发送函数将数据发送出去。CAN模块驱动的数据发送流程如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/start_xmit1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/start_xmit1-17067528018905.png)

### 5.4. 数据结构设计

```
struct artc_priv {
    struct can_priv can;         //CAN公共私有数据结构体
    void __iomem *base;       //CAN控制器寄存器基地址
    struct clk *clk;
    struct reset_control *rst;
};
```

### 5.5. 接口设计

#### 5.5.1. artc_can_set_bittiming

| 函数原型 | static int artc_can_set_bittiming(struct net_device *dev) |
| -------- | --------------------------------------------------------- |
| 功能说明 | 设置CAN模块的位时序                                       |
| 参数定义 | dev：指向网络设备的指针                                   |
| 返回值   | 0：执行成功                                               |
| 注意事项 |                                                           |

#### 5.5.2. artc_can_get_berr_counter

| 函数原型 | static int artc_can_get_berr_counter(const struct net_device *dev, struct can_berr_counter *bec) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 获取CAN模块发送、接收错误计数值                              |
| 参数定义 | dev：指向网络设备的指针bec：获取的发送/接收错误计数值存储到该指针所指向的结构体 |
| 返回值   | 0：执行成功                                                  |
| 注意事项 |                                                              |

#### 5.5.3. artc_can_start_xmit

| 函数原型 | static netdev_tx_t artc_can_start_xmit(struct sk_buff *skb, struct net_device *dev) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | CAN设备帧发送函数                                            |
| 参数定义 | skb：指向套接字缓冲区dev：指向网络设备的指针                 |
| 返回值   | 0：执行成功                                                  |
| 注意事项 |                                                              |

#### 5.5.4. artc_can_open
```
| 函数原型 | static int artc_can_open(struct net_device *dev) |
| -------- | ------------------------------------------------ |
| 功能说明 | 打开CAN网络设备                                  |
| 参数定义 | dev：指向网络设备的指针                          |
| 返回值   | 0：执行成功<0：执行失败                          |
| 注意事项 |                                                  |
```
#### 5.5.5. artc_can_close

| 函数原型 | static int artc_can_close(struct net_device *dev) |
| -------- | ------------------------------------------------- |
| 功能说明 | 关闭CAN网络设备                                   |
| 参数定义 | dev：指向网络设备的指针                           |
| 返回值   | 0：执行成功                                       |
| 注意事项 |                                                   |

#### 5.5.6. artc_can_rx

| 函数原型 | static void artc_can_rx(struct net_device *dev)              |
| -------- | ------------------------------------------------------------ |
| 功能说明 | CAN设备的接收函数。该函数在中断中被调用，读出CAN BUF中的数据并组合成帧，将帧存储到sk_buff结构体中 |
| 参数定义 | dev：指向网络设备的指针                                      |
| 返回值   | 无                                                           |
| 注意事项 |                                                              |

#### 5.5.7. artc_can_err
```
| 函数原型 | static int artc_can_err(struct net_device *dev, u8 isrc, u8 status) |
| -------- | ------------------------------------------------------------ |
| 参数定义 | dev：指向网络设备的指针isrc：中断标志位status：中断状态位    |
| 返回值   | 0：执行成功<0：执行失败                                      |
| 注意事项 |                                                              |
```
## 6. 常见问题