---
sidebar_position: 3
---

# 3.调试配置

调试口在 Bringup 过程中非常重要，因此有必要先配置好调试信息

### 1. 调试端口

因为 uboot，kernel，rootfs 均用到调试端口，因此有几个配置参考，以 demo128_nand 工程为例， 使用 uart0 端口作为调试口

#### 1.1. board.dts

```
&uart0 {
    pinctrl-names = "default";
    pinctrl-0 = <&uart0_pins_a>;   //在target/d211/common/d211-pinctrl.dts 中预定义
    status = "okay";
};
```

#### 1.2. board-u-boot.dtsi

```
 uart0_pins_a: uart0-0 {
    u-boot,dm-pre-reloc;
    pins {
        u-boot,dm-pre-reloc;
    };
};

&uart0 {
    u-boot,dm-pre-reloc;
};
```

### 2. 串口参数

主要配置使用哪个端口，端口的波特率等工作参数

#### 2.1. uboot

如果工程目录（如target/d211/demo128_nand/）中有 env.txt 文件，则该文件生效，否则使用 target/d211/common/env.txt 文件

```
baudrate=115200
preboot=
verify=no
```

#### 2.2. kernel

kernel 串口参数在 board.dts 中设置

```
chosen {
    stdout-path = "serial0:115200n8";                  //uart0, 115200,n,8
    bootargs = "rdinit=/init earlycon=sbi loglevel=7";
    reset-after-fw-burn;
};
```

### 3. 调试日志

uboot 中默认的调试日志等级比较高，因此关键信息默认是有输出的

kernel 中默认关闭了调试日志，因此在 Bringup 的时候需要打开，开关在上述的 env.txt 中，去掉 `quiet` 参数即可

```
set_commonargs=setenv bootargs quiet earlycon=${earlycon} earlyprintk init=/linuxrc
```

### 4. 额外日志

Luban 中有一些模块使用了额外的调试控制开关，如果需要可以手工打开，但如果模块工作正常就尽量不要打开，因为会拖慢开机速度

make km –> Kernel hacking –> Artinchip Debug

```
[ ] ADCIM driver debug
[ ] Audio Codec driver debug
[ ] CE driver debug
[ ] SPI ENC driver debug
[ ] CIR driver debug
[ ] CMU driver debug
[ ] DE driver debug
[ ] DVP driver debug
[ ] GPAI driver debug
[ ] GE driver debug
[ ] GMAC driver debug
[ ] VE driver debug
[ ] Pinctrl driver debug
[ ] PWM driver debug
[ ] RTC driver debug
[ ] RTP driver debug
[ ] SD&MMC Host Controller driver debug
[ ] SPI driver debug
[ ] Thermal Sensor driver debug
[ ] I2C driver debug
[ ] UART driver debug
[ ] USB driver debug
[ ] Watchdog driver debug
[ ] SID(eFuse) driver debug
[ ] Boot time debug
```

### 5. 成果

**成功的调试端口配置可以让我们很容易发现问题的根本原因而去快速解决它**