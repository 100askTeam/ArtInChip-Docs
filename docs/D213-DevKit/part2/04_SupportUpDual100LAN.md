---
sidebar_position: 4
---

# 开发板支持双百兆网卡功能

开发板自带的镜像中已经默认支持的双百兆网卡功能，下面我们先对开发板的百兆网卡功能进行测试再对网卡功能如何适配进行讲解。

## 开发板双百兆网卡功能测试

 在进行双百兆网卡功能测试前，准备可以上网的网线，后续需要将网线安装至开发板的天线接口，如网卡0和网卡2的位置如下图红框所示：

![image-20240202161558006](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240202161558006.png)

> 注意：请确保网线可以正常通过路由器进行联网

1.安装完成后，上电启动系统，进入串口终端，查看wifi节点是否存在，输入：

```text
ifconfig -a
```

输入完成后即可看到wlan0设备节点。，如下图所示：

![image-20240202163757493](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240202163757493.png)

2.使能eth0网络设备节点，输入：

```
ifconfig eth0 up
```

输入完成后，即可通过`ifconfig`查看到使能后的网络设备节点，如下图所示：

![image-20240202163858750](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240202163858750.png)

3.将网线插入网卡0后，可以看到网卡座子处的绿色灯亮起，此时可以去获取eth0的IP地址，输入：

```
udhcpc -i eth0
```

输入完成后即可获取到路由器分配的ip地址，如下图所示：

![image-20240202164258133](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240202164258133.png)

> 对于网卡1同理，步骤亦如：
>
> 1. ifconfig eth1 up //使能网卡1
> 2. 将网线插入网卡1
> 3. udhcpc -i eth1 //分配的ip地址



4.测试网卡联网功能，在串口终端输入：

```
ping www.baidu.com
```

![image-20240202164847744](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240202164847744.png)

> 输入Crtl + C即可结束测试。