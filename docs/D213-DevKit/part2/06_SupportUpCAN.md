---
sidebar_position: 6
---
# 开发板支持CAN功能

开发板自带的镜像中已经默认支持的CAN功能，下面我们先对开发板的CAN功能进行测试。

## 开发板CAN功能测试

将开发板上的两个CAN接口对接。这里我使用杜邦线连接，方便大家可以清楚如何进行接线，我们需要将`CAN0 L`连接至`CAN1 L`，`CAN0 H`连接至`CAN1 H`,连接完成后如下所示：

![image-20240218163951555](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240218163951555.png)

连接完成后将开发板连接电源和串口线上电，进入开发板的串口终端。查看CAN接口是否存在，如下所示：

```
[aic@] # ifconfig -a
can0      Link encap:UNSPEC  HWaddr 00-00-00-00-00-00-00-00-00-00-00-00-00-00-00-00
          NOARP  MTU:16  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:10
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)
          Interrupt:24

can1      Link encap:UNSPEC  HWaddr 00-00-00-00-00-00-00-00-00-00-00-00-00-00-00-00
          NOARP  MTU:16  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:10
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)
          Interrupt:25

eth0      Link encap:Ethernet  HWaddr B2:32:77:D5:80:E7
          BROADCAST MULTICAST  MTU:1500  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)
          Interrupt:10

eth1      Link encap:Ethernet  HWaddr 2E:F6:01:E3:76:B6
          BROADCAST MULTICAST  MTU:1500  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)
          Interrupt:11

lo        Link encap:Local Loopback
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)

wlan0     Link encap:Ethernet  HWaddr C8:FE:0F:9C:90:3E
          BROADCAST MULTICAST  MTU:1500  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)
```

可以看到，通过ifconfig命令查看CAN接口功能为正常，下面进行CAN功能的收发测试。



使用ip命令设置两个开发板的CAN接口，设置CAN接口的速度为500Kb/s。

设置CAN0和CAN1

```
ip link set can0 type can bitrate 500000
ip link set can1 type can bitrate 500000
```

> 注意：需要设置完成CAN接口速度才能使能CAN接口！！！



打开CAN网卡

```
ifconfig can0 up
ifconfig can1 up
```



设置CAN0接收数据

```text
candump can0 &
```



CAN0发送数据

```text
cansend can0 5A1#11.22.33.44.55.66.77.88
```



上述cansend命令中，“5A1”是帧ID，“#”后面的“11.22.33.44.55.66.77.88”是要发送的数据，十六进制。CAN2.0一次最多发送8个字节的数据，8字节数据之间用“.”隔开，can-utils会对数据进行解析。

> **注解：**
>
> 当CAN总线上只有一个结点时，此时CAN结点发送数据，无法获取到ACK，此时结点检测到错误并将会一直重发数据，该结点会进入被动错误状态，但不会进入总线关闭状态，直到有其它结点接入总线。这是符合CAN总线协议的。