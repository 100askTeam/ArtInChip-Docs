---
sidebar_position: 1
---


# 1.准备工作

在开始进行开发板 Bringup 之前，建议做好准备工作，可以让后续的开发工作更方便，编译环境的搭建可以参考：[编译准备](../env/index.html#ref-luban-env)

### 1. Git 仓库

务必使用一个版本管理工具对代码进行管理，如果没有 Git 服务器， 也强烈建议建一个本地仓库进行跟踪：

- 可以方便跟踪修改的历史记录，籍此进行信息记录
- 可以很方便的进行修改的回退，防止调试代码影响开发工作
- 如果是使用 git clone 获取的代码，则 git 仓库本身是存在的
- 如果是直接下载的代码，则可以手工建一下本地 git 仓库

```
sudo apt-get install git   //安装 git
git init                   //创建本地仓库
git add *                  //添加所有代码到本地仓库暂存区
git commit -m "init"       //将暂存区的代码提交到本地参考
```

### 2. 生成固件

每一块开发板可以对应一个工程，工程的代码在 target/d211/ 目录下，详细介绍的可以参考 [使用指南](../sdk/index.html#ref-luban-sdk)

在进行工程编译的时候，可以使用现在已有的工程，也可以建一个给开发板使用的独立工程

#### 2.1. 选择已有工程

选择已有的工程进行 Bringup 最简单，但选择一个合适的工程可以让修改工作更少，需要按如下优先级选择一个最适合开发板的工程

- 存储：SPINAND、SPINOR、EMMC
- 屏幕：RGB、LVDS、MIPI-DSI
- 封装: D211B(88pin)、D211D(100pin)、D213E(128pin)

| 工程名称      | 存储     | 封装   | DDR       | 屏幕   | 其他功能                           |
| ------------- | -------- | ------ | --------- | ------ | ---------------------------------- |
| perf1         | emmc     | bga    | 128M ddr3 | lvds   | DVP,GMAC,RTP,PWM,SDMC,USB          |
| perf2-spinand | spi-nand | bga    | 64M ddr2  | rgb888 | Audio,RTP,2xMAC,CAN,SDCARD,PWM,USB |
| perf2-spinor  | spi-nor  | bga    | 64M ddr2  | rgb888 | Audio,RTP,2xMAC,CAN,SDCARD,PWM,USB |
| demo          | emmc     | qfn88  | 64M ddr2  | lvds   | RTP,UART,MAC,SDCARD                |
| demo88_nand   | spi-nand | qfn88  | 64M ddr2  | rgb565 | CTP,MAC,CAN,SDCARD                 |
| demo100_nand  | spi-nand | qfn100 | 128M ddr3 | lvds   | CTP,MAC,CAN,SDCARD,USB             |
| demo128_nand  | spi-nand | qfn128 | 128M ddr3 | lvds   | CTP,2xGMAC,SDCARD,WIFI,2xUSB,RS485 |

#### 2.2. 建立新工程

可以使用 `add_board` 命令创建新板子对应的工程，该命令会参考某一个已经存在的工程建立一个全新命名的工程， 参考工程的选择依然需要按照 `存储` ， `屏幕` ， `封装` 的优先级进行

```
make add_board
Chip list:
    1: d211
Select chip for new board(number): 1
    d211

Reference defconfig:(Create new board base on selected defconfig)
    1: d211_demo100_nand_defconfig
    2: d211_demo128_nand_defconfig
    3: d211_demo88_nand_defconfig
    4: d211_demo88_nand_musl_defconfig
    5: d211_demo_defconfig
    6: d211_initramfs_defconfig
    7: d211_ota_defconfig
    8: d211_ota_emmc_defconfig
    9: d211_per1_mmc_defconfig
    10: d211_per1_mmc_secure_boot_defconfig
    11: d211_per2_spinand_defconfig
    12: d211_per2_spinor_defconfig
Select reference defconfig for new board(number): 2
    d211_demo128_nand_defconfig

Input new board's name: newboard
    newboard

Input manufacturer's name: customer
    customer

Created: target/d211/newboard
Created: source/uboot-2021.10/configs/d211_newboard_defconfig
Created: source/linux-5.10/arch/riscv/configs/d211_newboard_defconfig
Created: package/third-party/busybox/configs/d211_newboard_defconfig
Created: target/configs/d211_newboard_defconfig
Updated: target/d211/Config.in
```

#### 2.3. 编译工程

强烈推荐使用 onestep 命令进行系统的 bringup

```
source tools/onestep.sh
lunch d211_newboard_defconfig
make                              //在任何目录 m 命令都可以编译出固件
```

### 3. 成果

**准备工作完成后应该能够顺利编译出固件**