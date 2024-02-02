---
sidebar_position: 4
---
# 环境变量

本章描述 U-Boot 中关于环境变量的关键内容，以及 Artinchip 平台中对环境变量的使用方式。 关于 U-Boot 环境变量的更多内容，可以参考官方文档：

- http://www.denx.de/wiki/DULG/Manual

U-Boot 环境变量是保存在非易失性存储(NVM)上的文本数据块，系统启动时会被拷贝到内存中使用。 环境变量中保存了系统的相关配置信息，使用过程中相关的配置可以被读写。 环境变量的数据存储格式简单，内容通过 CRC32 进行保护：

`include/env_internal.h`

```
typedef struct environment_s {
    uint32_t        crc;            /* CRC32 over data bytes        */
#ifdef CONFIG_SYS_REDUNDAND_ENVIRONMENT
    unsigned char   flags;          /* active/obsolete flags ENVF_REDUND_ */
#endif
    unsigned char   data[ENV_SIZE]; /* Environment data             */
} env_t;
```

其中 `data` 存放的是一系列以 `NULL` 结束的环境变量字符串。

### 1. 初始环境变量设置

初始的环境变量设置有两种方式：

- 源文件文件中设置默认的环境变量内容

  这种方式是通过具体平台的配置头文件，定义各个环境变量的初始化设置宏，然后在编译的时候展开到全局变量 `default_environment` 中。具体可以参考：

  - `include/env_default.h`
  - `env/common.c`
  - `include/configs/qemu-riscv.h`

  这种方式的好处是，烧录固件时不需要烧录环境变量内容，留空即可。启动过程中，U-Boot 检查设备上的环境变量不合法， 则会使用 `default_environment` 中的内容，并且会将 `default_environment` 中的内容主动写入到存储设备上， 后续的启动都从存储设备上读取环境变量。

- 独立的环境变量文件

  这种方式将初始的环境变量内容，以文本的形式保存为单独的文件，编译镜像的过程中，使用 `mkenvimage` 对该文件进行编译，生成可烧录的环境变量二进制文件。

  在做固件烧录时，需要将该二进制文件烧录到预设的分区。

Artinchip 平台的初始环境变量通过独立的环境变量文件进行配置，源码中的默认环境变量 `default_environment` 值为空。 环境变量文件路径为:
```
- target/<IC>/common/env.txt

```

### 2. 存储介质上的保存

在使用过程中，保存在存储设备上的环境变量内容可能会被修改，因此选择存储位置时需要考虑存储介质的特点。 比如 MTD 设备上要注意保存在独立的擦除块上，以免在修改时影响其他数据的完整性。

常见的保存方式有下面两种：

- 与 U-Boot 一起保存

  在使用 MMC 存储时，有些方案会将 ENV 保存在 U-Boot 的分区，并且放在 U-Boot 分区的尾部。 通过在 DTS 中指定分区名字即可访问到。

- 单独分区保存

  多数方案使用单独的分区保存。

在 Artinchip 平台上，不同存储介质上 ENV 的默认保存设置如下文所述。

#### 2.1. MMC

MMC 的 ENV 存储位置可以通过下面几个方式进行设置：

- Kconfig 配置指定 Offset 和 大小
  - CONFIG_ENV_OFFSET
  - CONFIG_ENV_OFFSET_REDUND
  - CONFIG_ENV_SIZE
  - CONFIG_ENV_IS_IN_MMC
- DTS 中配置 offset，Kconfig 配置大小
  - “u-boot,mmc-env-offset”
  - “u-boot,mmc-env-offset-redundant”
- DTS 中配置分区名字，Kconfig 配置大小
  - “u-boot,mmc-env-partition”

目前默认的配置使用最后一种方式，通过 DTS 中的 config 节点配置：

```
config {
    u-boot,mmc-env-partition = "env";
};
```

u-boot,mmc-env-partition = “env” 表示环境变量使用独立分区的方式，保存在mmc设备的”env”分区上。

通过 Kconfig 设置 `CONFIG_ENV_SIZE` 大小为16KB。

保存 ENV 数据的区域为该分区的前 `CONFIG_ENV_SIZE` 大小。相关的源码在文件： `board/artinchip/d211/mmc_env.c` 。

#### 2.2. SPI NAND

U-Boot 项目的源码本身没有支持 SPI NAND 启动，环境变量也没有支持从 SPI NAND 读取， Artinchip 平台增加了 SPI NAND 的支持。

ENV 存储位置的配置通过 Kconfig 进行，需要配置的选项有下面几个：

- CONFIG_ENV_OFFSET
- CONFIG_ENV_SIZE
- CONFIG_ENV_RANGE

相应的源码在 `env/spinand.c` 。

#### 2.3. SPI NOR

U-Boot 原本已经支持从 SPI NOR 启动和加载 ENV 内容。ENV 的存储位置通过 Kconfig 进行， 需要配置的选项有下面几个：

- CONFIG_ENV_SPI_BUS
- CONFIG_ENV_SPI_CS
- CONFIG_ENV_SPI_MAX_HZ
- CONFIG_ENV_SPI_MODE
- CONFIG_ENV_OFFSET
- CONFIG_ENV_OFFSET_REDUND
- CONFIG_ENV_SECT_SIZE
- CONFIG_ENV_SIZE
- CONFIG_ENV_IS_IN_SPI_FLASH

相应的源码在 `env/sf.c` 。

#### 2.4. RAM

Artinchip 平台上增加了从 DRAM 指定地址加载环境变量的功能，主要用于 USB 升级的场景。 在 USB 升级的过程中，主机端会先发送一个 env.bin 到设备指定内存地址，然后再启动 u-boot 进行升级。

相关的配置通过 Kconfig 进行，需要配置的选项有：

- CONFIG_ENV_RAM_ADDR

相应的源码在 `board/artinchip/d211/env_location.c` 。