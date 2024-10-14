---
sidebar_position: 1
---
# 匠芯创D213-DevKit开发板

- 此开发板的任何问题都可以在我们的论坛交流讨论 [https://forums.100ask.net/](https://forums.100ask.net/)

## 1.硬件简述
### 1.1 开发板简述

D213-DEVKITF是百问网联合匠芯创推出的一款用于学习了解使用 D213 芯片以及SDK的开发套件，作为一款全国产全自主设计研发的RISCV工业控制芯片有着较为全面的使用场景更高的可靠性更完善的资料更好的支持。我们底板针对于工业场景进行了专门的设计，板载5路RS485,双路CAN,支持MIPI显示+I2C触摸,支持WIFI以及两路有线网卡，支持4G上网，板载USB OTG烧录口，板载usb转串口电路，无需专门购买转换线， 拥有 4个 用户按键，板载 3个系统按键 RESET/WAKEUP/UBOOT，将USB1专门引出至TypeA接口，更适合工控应用开发！

![board_03-1](https://photos.100ask.net/artinchip-docs/d213-devkit/image-zhutu_03-1.jpg)

### 1.2 核心板参数
![coreboard_03-1](https://photos.100ask.net/artinchip-docs/d213-devkit/image-d213-coreboard.jpg)

## 2.D213芯片

D213 系列是一款高性能的全高清显示和智能控制 SOC，采用国产自主64位高算力 RISC-V 内核，内置16位 DDR 控制器并提供丰富的互联外设接口， 配备了 2D 图像加速引擎和 H.264 解码引擎，可以满足各类交互设计场景和多媒体互动体验，具有高可靠性、高安全性、高开放度的设计标准，可以面向于泛工业领域应用。

- 集成 64位 RISC-V 处理器，典型频率 600MHz
- 合封 512Mb DDR2 或 1Gb DDR3
- 集成用于应用领域体验优化的 Display Engine，Graphics Engine，Video Engine
- 丰富的屏接口：RGB，LVDS，MIPI DSI，I8080，QSPI
- 丰富的外设接口，满足大部分工业使用场景
- QFN88，QFN100，QFN128 3种封装可选

![image-20240131172719046](https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240131172719046.png)

## 3.配套模块

### 4寸MIPI显示屏

- 韦东山个人店购买地址： [https://item.taobao.com/item.htm?&id=706091265930](https://item.taobao.com/item.htm?&id=706091265930)

### RS485转USB模块

### USB转CAN模块