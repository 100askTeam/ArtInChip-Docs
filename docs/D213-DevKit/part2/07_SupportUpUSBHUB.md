---
sidebar_position: 7
---
# 开发板支持USB HUB功能

开发板自带的镜像中已经默认支持的USB HUB功能，下面我们先对开发板的USB HUB功能进行测试。

## 开发板USB HUB功能测试

在进行USB HUB功能测试前需要准备一个USB读卡器和内存卡，我们需要使用USB读卡器插入开发板的USB口，并挂载内存卡，查看是否可以正常访问内存卡中的文件。开发板上电后将读卡器插入如下图红框所示USB接口处：

![image-20240218190427019](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240218190427019.png)

将USB读卡器接入USB HUB后可以发现串口终端控制台没有输出信息，我们可以输入` dmesg`查看打印等级较低的输出信息，如下图所示：

![image-20240218190857549](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240218190857549.png)

可以看到，开发板已经识别到读卡器中的32GB内存卡，下面我们将内存卡挂再到开发板上，输入：

```
mount /dev/sda1 /mnt/
```

挂载完成后，可以进入/mnt目录下查看内存卡中的文件，可以将内存卡中的文件拷贝出来，如下所示：

```
[aic@] # cd /mnt/
[aic@mnt] # ls
System Volume Information  test.txt
[aic@mnt] # cp test.txt /tmp/
[aic@mnt] # ls /tmp/
asound.state.lock  messages           test.txt
dbus               subsys
```

> 开发板可以正常操作内存卡中的文件，即表示USB HUB功能正常。