---
sidebar_position: 5
---

# 5.IC 配置

D21X 是一 IC 系列， 是不同的引脚数和不同的 ddr 容量的组合，因此在进行 Bringup 的时候要确保配置的正确

### 1. 内存配置

型号区分 - D21XXB：64M ddr2，譬如 D211BB - D21XXC：128M ddr3， 譬如 D211BC, D213EC

目前 SDK 可以自动 turning ddr 的型号并进行初始化，但在 board.dts 中有对应用层容量进行配置的地方需要注意

```
memory@40000000 {
    device_type = "memory";
    reg = <0x0 0x40000000 0x0 0x4000000>;  //0x4000000 为64M，0x8000000 为128M
};
```

### 2. Pin脚检查

SDK 有自动的 Pin 脚配置检查，可以检查 pin 脚设置是否正确，不同模块是否有 pin 脚配置冲突等

#### 2.1. 设置Pin数目

IC的 pin 数目在 board.dts 中设置，该设置只是辅助检查，不会产生功能性影响，但原则上应该要解决所有的告警

```
compatible = "artinchip,d211";
package = "QFN88";
```

#### 2.2. Pin脚配置

如下告警的意思是 sdmc0 的 pinctrl 配置为8线，但 QFN88 只能支持4线 .. code-block:

```
Pinmux check ...
    No conflict in pinmux
  Package check ...
    QFN88 not support the following modules:
            sdmc@10440000 only support 4 lines
```

定义在 target/common/d211-pinctrl.dtsi 中， 解决方案是可以删掉不需要的引脚配置， 也可以仿照 demo88_nand/board.dts 中 gmac0_local_pins 的方式重新定义一组引脚

```
sdmc0_pins: sdmc0-0 {
    pins {
        pinmux = <AIC_PINMUX('B', 0, 2)>,
             <AIC_PINMUX('B', 1, 2)>,
             <AIC_PINMUX('B', 2, 2)>,
             <AIC_PINMUX('B', 3, 2)>,
             <AIC_PINMUX('B', 4, 2)>,
             <AIC_PINMUX('B', 5, 2)>,
             <AIC_PINMUX('B', 6, 2)>,
             <AIC_PINMUX('B', 7, 2)>,
             <AIC_PINMUX('B', 8, 2)>,
             <AIC_PINMUX('B', 9, 2)>,
             <AIC_PINMUX('B', 10, 2)>,
             <AIC_PINMUX('B', 11, 2)>;
             bias-pull-up;
             drive-strength = <3>;
    };
}
```

#### 2.3. Pin脚冲突

如果同一引脚在不同的功能块中被使用，则会告警有冲突，解决方案是按原理图重新厘定功能

```
Pinmux check ...
    phy-reset-gpios pinmux conflicts with /soc/dvp@18830000
        The conflicting pin: PE6
    ethernet@10280000 pinmux conflicts with /soc/dvp@18830000
        The conflicting pin: PE0
    ethernet@10280000 pinmux conflicts with /soc/dvp@18830000
        The conflicting pin: PE1
    ethernet@10280000 pinmux conflicts with /soc/dvp@18830000
        The conflicting pin: PE2
    ethernet@10280000 pinmux conflicts with /soc/dvp@18830000
        The conflicting pin: PE3
    ethernet@10280000 pinmux conflicts with /soc/dvp@18830000
        The conflicting pin: PE4
    ethernet@10280000 pinmux conflicts with /soc/dvp@18830000
        The conflicting pin: PE5
    ethernet@10280000 pinmux conflicts with /soc/dvp@18830000
        The conflicting pin: PE7
    ethernet@10280000 pinmux conflicts with /soc/dvp@18830000
        The conflicting pin: PE8
    ethernet@10280000 pinmux conflicts with /soc/dvp@18830000
        The conflicting pin: PE9
    ethernet@10280000 pinmux conflicts with /soc/dvp@18830000
        The conflicting pin: PE10
    Package check ...
```