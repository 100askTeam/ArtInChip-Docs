---
sidebar_position: 36
---
# 按键矩阵使用指南

## 1. 按键矩阵使用指南

### 1.1. 概述

此章节介绍按键矩阵的使用方法以及相关配置。

### 1.2. 内核配置

在luban根目录下执行 make kernel-menuconfig，进入kernel的功能配置，按如下选择：

```
Linux
    Device Drivers
        [*] Input device Support
            <*> Event interface
            [*] Keyboards
                <*> ADC Ladder Buttons
```

### 1.3. 软件配置

在luban的根目录下通过make menuconfig可以打开test-keyadc：

```
Artinchip packages
    Sample code
        [*] test-keyadc
```

### 1.4. DTS参数配置

这些参数主要在文件target/d211/方案x/board.dts中，功能参数的设置必须和硬件原理图相匹配

设置数据通路如下：

> ```
> key_button: adc-keys {
>         compatible = "adc-keys";
>         io-channels = <&gpai 6>;
>         io-channel-names = "buttons";
>         poll-interval = <200>;
>         keyup-threshold-microvolt = <3000000>;
> 
>         up-key {
>                 label = "up_key";
>                 linux,code = <KEY_UP>;
>                 press-threshold-microvolt = <300000>;
>         };
> 
>         down-key {
>                 label = "down_key";
>                 linux,code = <KEY_DOWN>;
>                 press-threshold-microvolt = <800000>;
>         };
> 
>         left-key {
>                 label = "left_key";
>                 linux,code = <KEY_LEFT>;
>                 press-threshold-microvolt = <1400000>;
>         };
> 
>         right-key {
>                 label = "right_key";
>                 linux,code = <KEY_RIGHT>;
>                 press-threshold-microvolt = <2000000>;
>         };
> };
> ```

其中：

- io-channels：所选择的io通道
- io-channels-names：io通道的别名
- poll-interval：表示获取ADC值的轮询间隔(单位毫秒)
- keyup-threshold-microvolt：按键抬起时，对应io通道的电压(单位微伏)，可设置为标准电压
- label：键值的说明
- linux,code：按键上报的键值
- press-threshold-microvolt：按键按下时，对应io通道的电压(单位微伏)

threshold-microvolt范围判断逻辑如下：

为了简洁表格，up-key的press-threshold-microvolt配置简写为up_mv，同理得down_mv、left_mv、right_mv。keyup-threshold-microvolt简写为keyup_mv。
```
| 参数定义范围                                              | 含义              |
| --------------------------------------------------------- | ----------------- |
| (right_mv + keyup_mv)/2 <= value                          | no key pressed    |
| (left_mv + right_mv)/2 <= value < (right_mv + keyup_mv)/2 | KEY_RIGHT pressed |
| (down_mv + left_mv)/2 <= value < (left_mv + right_mv)/2   | KEY_LEFT pressed  |
| (up_mv + down_mv)/2 <= value < (down_mv + right_mv)/2     | KEY_DOWN pressed  |
| value < (up_mv + down_mv)/2                               | KEY_UP pressed    |
```
小技巧

所有press-threshold-microvolt值需均小于keyup-threshold-microvolt，并且press-threshold-microvolt间需均不相同

### 1.5. 测试指南

在shell中直接运行test_keyadc即可

```
[aic@] # test_keyadc -h
Usage: test_keyadc [options]:
-d, --device    The name of event device
-h, --usage

Example: test_keyadc -d event0
```

test_keyadc的使用示例：

```
[aic@] # test_keyadc -d event0
key up pressed
key left pressed
key right pressed
key down pressed
```