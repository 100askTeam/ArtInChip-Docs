---
sidebar_position: 9
---
# 2.7. 添加板子

一款产品对应一个板子，开发新产品时，需要在 SDK 中创建新的板子以及对应的配置。 全新配置一个板子比较繁琐，Luban SDK 提供快速创建新板子配置的方法。

## 2.7.1. 原理

用户提供一个原厂公板的配置文件，`add_board` 程序以该配置为模板，创建新板子对应的目录和配置。

## 2.7.2. 步骤

1. 在 SDK 顶层目录执行命令

   ```
   make add_board
   ```

2. 根据提示，提供必要的信息

   例如：

   ```
   Chip list:
           1: d211
   Select chip for new board(number): 1
           d211
   
   Reference defconfig:(Create new board base on selected defconfig)
           1: d211_fpga_mmc_defconfig
           2: d211_fpga_spinand_defconfig
           3: d211_fpga_spinor_defconfig
           4: d211_initramfs_defconfig
           5: d211_qemu_defconfig
   Select reference defconfig for new board(number): 1
           d211_fpga_mmc_defconfig
   
   Input new board's name: MyTest Board
           MyTest Board
   
   Input manufacturer's name: My Company
           My Company
   ```

3. 生成新板子的目录和配置

   此处的例子，在创建完相关的目录和配置之后，`add_board` 程序会列出新建的目录和相关配置文件。后续可以针对新的配置进行客制化修改。

   ```
   Created: target/d211/MyTest_Board
   Created: source/uboot-2021.10/configs/d211_MyTest_Board_defconfig
   Created: source/linux-5.10/arch/riscv/configs/d211_MyTest_Board_defconfig
   Created: package/third-party/busybox/configs/d211_MyTest_Board_defconfig
   Created: target/configs/d211_MyTest_Board_defconfig
   Updated: target/d211/Config.in
   ```