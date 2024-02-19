---
sidebar_position: 5
---
# 开发板支持RS485功能

开发板自带的镜像中已经默认支持的RS485功能，下面我们先对开发板的RS485功能进行测试。

## 开发板RS485功能测试

在进行RS485功能测试前，需要使用接线端子(杜邦线)连接开发板的RS485接口，本次测试使用CH1和CH2进行功能测试。

![image-20240218162504791](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240218162504791.png)

RS485 是半双工，连接设备的时候一般接 A/B/GND，即源端的 A 连接目标设备的 A，源端的 B 连接目标设备的 B。我们需要将CH1的端口A和CH2的端口A相连，将将CH1的端口B和CH2的端口B相连。



确保连接成功后，连接开发板的12V电源和串口数据线至电脑端。上电后打开Mobaxterm串口软件，进入开发板终端控制台，如下所示：

```
Welcome to ArtInChip Luban Linux
[aic@] #
```

通过查看底板硬件原理图可知，我们连接CH1和CH2后，可以通过CH1发送信息，并监听CH2来查看RS485的收发功能是否正常。

![image-20240218152645923](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240218152645923.png)

监听CH2端口，在终端输入：

```
cat /dev/ttyS4 &
```

使用CH1发送信息，在终端输入：

```
echo 100ask > /dev/ttyS5
```

![image-20240218153443857](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240218153443857.png)

可以看到当我们向CH1发送信息后，我们在后台监听CH2的进程就会自动接收到从CH1传递过来的信息。同理我们也可以使用CH2发送信息到CH1，如下所示；

```
[aic@] # cat /dev/ttyS5 &
[aic@] # echo hello_D213 > /dev/ttyS4
```

![image-20240218154504302](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240218154504302.png)

> 上述测试也可以使用RS485转USB模块连接电脑端进行传输测试。