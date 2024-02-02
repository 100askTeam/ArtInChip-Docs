---
sidebar_position: 10
---
# 启动内核

本章节主要介绍与启动内核相关的命令和处理流程。

## 1. 镜像类型

这里介绍 U-Boot 中涉及到的各种镜像类型。比如与内核相关的：

**Image**

Image 文件是 Linux 编译生成的非压缩镜像文件，基于 ELF 文件 vmlinux 提取得到。

```
riscv64-unknown-linux-gnu-objcopy -O binary -O binary -R .note -R .note.gnu.build-id -R .comment -S vmlinux arch/riscv/boot/Image
```

ARM64 和 RISCV 产生的 Image 文件，自带一个镜像信息头，U-Boot 可以使用 booti 命令对该镜像进行解析和启动。 ARM32 上产生的 Image 文件没有相关的镜像信息头。ArtInChip 方案中，U-Boot 也实现了一个特殊的 booti32 命令， 可以直接启动未压缩的 Image 文件。

**Image.gz**

Image.gz, Image.bz2, Image.lzo, Image.lzmo, Image.lz4 等压缩文件，是基于 Image 文件直接压缩得到。 ARM64 和 RISCV 都采用这种方式产生对应的压缩文件。

U-Boot 中可以使用 booti 命令解析和启动对应的压缩镜像文件。

**zImage**

zImage 是 Linux 编译生成的压缩内核 Image 格式，基于 Image 文件生成。

内核生成 zImage 时，首先将未压缩的 Image 通过 gzip 压缩(默认选择 gzip 压缩)，生成 pyggy_data， 然后再与相关的解压缩代码编译和链接，生成 zImage。

```
cat arch/arm/boot/compressed/../Image | gzip -n -f -9 > arch/arm/boot/compressed/piggy_data
```

该镜像文件可以在 U-Boot 中使用 bootz 命令进行解析和启动。

zImage 是一个运行时自解压缩的镜像文件。

**uImage**

uImage 基于 zImage 生成，仅在头部添加 U-Boot Image 的头信息，以便 U-Boot 正确解析。 实际上在新的内核中，已经不再生成该镜像文件。

该镜像文件可以在 U-Boot 中使用 bootm 命令进行解析和启动。

**FIT Image**

FIT Image 是一种打包格式，可以将多个镜像文件打包在一起，合并成一个 `.itb` 文件。 打包的具体细节通过对应的 `.its` 描述，然后通过 `mkimage` 工具进行打包。

FIT Image 可以通过 bootm 命令进行解析和启动。

**AIC 镜像**

在固件升级和 BROM 启动过程中，BROM 需要读取 AIC 自定义格式的镜像，以 `.aic` 结尾。 AIC 镜像使用 mk_image.py 脚本生成，生成的细节通过 image_cfg.json 文件进行描述。

## 2. 加载内核

本节介绍 Artinchip 平台从存储介质中加载内核和启动的流程。

U-Boot 中启动所需的数据，以及启动内核通过命令行来实现，一系列的命令组成启动脚本。

Artinchip 的方案中，相关的启动脚本在 env.txt 环境变量中提供，并且最终由变量 `autoboot=` 串在一起。

U-Boot 在执行自动启动时，首先读取和执行环境变量 `bootcmd` 的内容，`bootcmd` 被设置为 `run autoboot` 。

### 2.1. autoboot

autoboot 变量的内容被设置为一个启动命令脚本。该脚本通过检测当前的启动存储介质类型 来执行不同的内核加载和启动命令。

例如：

```
autoboot=if test ${boot_device} = nand; then \
                run nand_boot; \
        elif test ${boot_device} = nor; then \
                run nor_boot; \
        elif test ${boot_device} = mmc; then \
                if test $? -eq 1; then \
                        echo "Run sd card upgrade program"; \
                        aicupg mmc 1; \
                fi; \
                if test $? -eq 1; then \
                        echo "Run sd card fat32 upgrade program"; \
                        aicupg fat mmc 1; \
                fi; \
                run mmc_boot; \
        elif test ${boot_device} = usb; then \
                echo "Run USB upgrade program"; \
                aicupg usb 0; \
        fi; \
    if test $? -eq 1; then \
                echo "Try NFS boot ..."; \
            run nfs_boot; \
    fi
bootcmd=run autoboot;
```

### 2.2. MMC 启动脚本

无论是 SD 卡还是 eMMC，Artinchip 平台上都采用 GPT 的方式对存储空间进行分区。 Kernel 以及 DTB 都存放在单独的分区中，U-Boot 通过分区名字读取指定分区的内容。

```
mmc_boot=echo "Try to boot from MMC..."; \
         run set_mmc_args; \
         mmc dev ${boot_devnum}; \
         run mmc_loaddtb; \
         run mmc_loadknl; \
         booti ${knl_addr} - ${dtb_addr};
```

上述启动脚本中，通过 U-Boot 已有的命令对 MMC 设备进行数据读取，加载内核和 DTB 数据。

其中 MMC 的设备 ID `boot_devnum` 通过 BROM/SPL 传递的参数信息来获取，并在 `board_late_init()` 被调用时修改到环境变量 `boot_devnum` 中。

Kernel 和 DTB 相关的加载地址 `knl_addr`, `dtb_addr` 在 `env.txt` 中根据项目实际情况进行设置。

其他使用到的命令可参考源码：

- `cmd/mmc.c`
- `cmd/bootm.c`
- `cmd/booti.c`
- `cmd/booti32.c`

### 2.3. SPI NAND 启动脚本

对于使用 NAND 的项目，Kernel 和 DTB 保存的方式可能是 MTD 分区，或者 UBI Volume， 具体项目根据需要进行选择。

**Kernel 保存在 MTD 分区**

对于使用 MTD 分区保存 Kernel 和 DTB 的项目，在启动脚本中，使用 MTD 命令加载对应的分区内容。

```
nand_boot=echo "Try to boot from nand flash..."; \
          run set_nand_args; \
          setenv nand_boot_mtdparts_cnt 7; \
          mtd read kernel ${knl_addr} 0 0x590000; \
          mtd read dtb ${dtb_addr} 0 0x6000; \
          booti ${knl_addr} - ${dtb_addr};
```

**Kernel 保存在 UBI**

对于使用 UBI Volume 保存 Kernel 和 DTB 的项目，在启动脚本中，使用 UBI 命令加载对应的分区内容。

```
nand_boot=echo "Try to boot from nand flash..."; \
          run set_nand_args; \
          setenv nand_boot_mtdparts_cnt 5; \
          ubi part ubiboot; \
          ubi read ${knl_addr} kernel && ubi read ${dtb_addr} dtb; \
          booti ${knl_addr} - ${dtb_addr};
```

这里将 MTD 分区 `ubiboot` 做成 UBI 设备，然后在该 UBI 设备中划分 `kernel` 和 `dtb` 两个 Volume。在操作 UBI Volume 前，必须先使用 `ubi part` Attach 对应的 MTD 分区。

Kernel 和 DTB 相关的加载地址 `knl_addr`, `dtb_addr` 在 env.txt 中根据项目实际情况进行设置。

其他使用到的命令可参考源码：

- `cmd/mtd.c`
- `cmd/ubi.c`
- `cmd/bootm.c`
- `cmd/booti.c`
- `cmd/booti32.c`

### 2.4. SPI NOR 启动脚本

对于使用 SPI NOR 的项目，使用 MTD 分区的方式保存 Kernel 和 DTB，执行 NOR 启动时首先初始化相关的 NOR 分区，然后使用 MTD 命令读取分区的内容。

```
nor_boot=echo "Try to boot from nor flash..."; \
         sf probe; \
         run set_nor_args; \
         mtd read kernel ${knl_addr} 0 0x500000 && mtd read dtb ${dtb_addr} 0 0x20000; \
         booti ${knl_addr} - ${dtb_addr};
```

此处读取的分区内容大小可根据项目的具体需要进行设定。

Kernel 和 DTB 相关的加载地址 `knl_addr`, `dtb_addr` 在 env.txt 中根据项目实际情况进行设置。

其他使用到的命令可参考源码：

- `cmd/mtd.c`
- `cmd/bootm.c`
- `cmd/booti.c`
- `cmd/booti32.c`

## 3. 安全校验

U-Boot 原生代码仅支持 FIT Image 的签名校验。

在 do_bootm_states() 的 BOOTM_STATE_FINDOS 阶段，程序检查当前内核镜像的格式， 如果是 FIT Image 格式，则根据 FIT Image 的配置，加载对应的内核镜像。

```
bootm_find_os(); // common/bootm.c
|-> boot_get_kernel(); // common/bootm.c
    |-> fit_image_load(); // common/image-fit.c
        |-> fit_image_select(); // common/image-fit.c
```

检查环境变量中是否有设置 “verify” 为 “no”, 如果没有设置，或者被设置为 “yes”， 则在加载 FIT Image 时对镜像数据进行验证。

```
images.verify = env_get_yesno("verify");
fit_image_select(); // common/image-fit.c
|-> fit_image_verify(fit_hdr, noffset); // common/image-fit.c
    |-> fit_image_verify_with_data(fit, image_noffset, data, size);
        |-> fit_image_check_sig(fit, noffset, data, size, -1, &err_msg);
            |  // common/image-sig.c
            |-> fit_image_setup_verify(&info, ...); // common/image-fit-sig.c
            |   // 读取签名所用的算法等信息，以及验证所用的公钥信息
            |   // 并且保存到 info 中
            |
            |-> fit_image_hash_get_value();
            |-> info.crypto->verify(&info, &region, 1,
                                    fit_value, fit_value_len);
                rsa_verify(&info, &region, 1, fit_value, fit_value_len); // lib/rsa/rsa-verify.c
```

最终调用 rsa_verify 函数进行签名验证。 此处的 rsa_verify 可以对接到硬件 CE，具体可看 `UCLASS_MOD_EXP` 的相关内容。 如果没有硬件加速器的实现，则使用软件进行计算。

## 4. 修改 DTS

启动内核时，会通过参数 `r2` 将 FDT 传递给 Kernel。Bootargs 等信息也会通过 FDT 传递给 Kernel。

由于 bootargs 是在 U-Boot 运行时生成

如果需要传递 initrd 信息，也是通过 FDT 传递。

```
do_bootm(); // cmd/bootm.c
|-> do_bootm_states(); // common/bootm.c
    |-> bootm_os_get_boot_func(); common/bootm_os.c
        |-> do_bootm_linux(); // arch/riscv/lib/bootm.c
            |-> boot_prep_linux(); // arch/riscv/lib/bootm.c
            |   |-> image_setup_linux(); // common/image.c
            |       |-> image_setup_libfdt(); // common/image-fdt.c
            |           |-> fdt_chosen(fdt); // common/fdt_support.c
            |           |   |-> str = env_get("bootargs");
            |           |   |-> fdt_setprop(fdt, nodeoffset, "bootargs",
            |           |                   str, ...);
            |           |       // 修改chosen 的 bootargs
            |           |-> fdt_initrd(blob, start, end); // common/fdt_support.c
            |               // "linux,initrd-start"
            |               // "linux,initrd-end"
            |
            |-> boot_jump_linux(images, flag); // arch/riscv/lib/bootm.c
                |-> kernel(gd->arch.boot_hart, images->ft_addr);
```