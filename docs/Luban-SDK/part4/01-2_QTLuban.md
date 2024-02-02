---
sidebar_position: 2
---
#  QT Luban

## 1. 编译配置

### 1.1. 编译开关

- make menuconfig 中打开QT + Directfb

```
[*] Third-party packages
    [*] Qt --->
        [*]   Use prebuilt binary instead of building from source
```

- 如果勾选 Use prebuilt binary instead of building from source则使用预编译的二进制
- 如果不勾选prebuilt binary instead of building from source 则使用源码编译

```
[*] Third-party packages
    [*] Qt --->
        [*]   Use prebuilt binary instead of building from source
```

## 2. 目录解释

- dl： 以压缩包的方式存放源码包
- package/third-party/qt/: 存放将注入到源码中的补丁
- prebuilt/riscv64-linux-gnu/：存放预编译的
- source/third-party/qt-4.8.7/: 编译目录，源码 + 补丁 + 中间文件组成

## 3. 编译命令

make qt- + tab显示所有qt的编译命令

- make qt-show-build-order：显示编译依赖和顺序
- make qt-extract： 把dl中的压缩包解压到source目录
- make qt-patch：把package中的patch打到source中的源码中
- make qt-reconfigure：对该源码包重新执行配置、编译、安装
- make qt-rebuild：对该源码包进行重新编译
- make qt-reinstall：对该源码包进行重新安装
- make qt-prebuilt：为该源码包生成预编译二进制压缩包，然后可以上传
- make qt-clean: 删除该源码包的所有编译输出
- make qt-distclean: 删除该源码包的源码
- make qt: 完成从 extract/patch/../build/install 的所有过程

