---
sidebar_position: 30
---
# CE 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语 | 定义                                                | 注释说明                 |
| ---- | --------------------------------------------------- | ------------------------ |
| CE   | Crypto Engine                                       | 硬件加解密算法引擎       |
| DES  | Data Encryption Standard                            | 一种对称分组密码算法     |
| AES  | Advanced Encryption Standard                        | 一种对称分组密钥算法     |
| ECB  | Electronic Code Book                                | 电子密码本模式           |
| CBC  | Cipher Block Chaining                               | 密码分组链模式           |
| CTR  | Counter                                             | 计数器模式               |
| XTS  | XEX Tweakable Block Cipher with Ciphertext Stealing | 一种对称分组密码算法模式 |
| CTS  | Ciphertext Stealing                                 | 一种对称分组密码算法模式 |
| RSA  | Rivest-Shamir-Adleman                               | 一种非对称密钥算法       |
| MD5  | Message Digest Algorithm                            | 消息摘要算法             |
| SHA  | Secure Hash Algorithm                               | 安全散列算法             |
| TRNG | True Random Number Generator                        | 真随机数生成器           |
| SSK  | Symmetric Secret Key                                | 对称密钥                 |
| HUK  | Hardware Unique Key                                 | 硬件唯一密钥             |
| PNK  | Part Number Key                                     | 芯片型号密钥             |
| PSK  | Partner Secret Key                                  | 合作伙伴密钥             |

### 1.2. 模块简介

CE 是一个独立的硬件加解密算法引擎，支持下列算法模式：

| 算法类型       | 算法列表 | 密钥位宽      |
| -------------- | -------- | ------------- |
| 对称密钥算法   | AES ECB  | 128/256       |
| AES CBC        | 128/256  |               |
| AES CTR        | 128/256  |               |
| AES CTS        | 128/256  |               |
| AES XTS        | 256/512  |               |
| DES ECB        | 64       |               |
| DES CBC        | 64       |               |
| TDES ECB       | 192      |               |
| TDES CBC       | 192      |               |
| 非对称密钥算法 | RSA      | 512/1024/2048 |
| 消息摘要算法   | MD5      |               |
| SHA-1          |          |               |
| SHA-224        |          |               |
| SHA-256        |          |               |
| SHA-384        |          |               |
| SHA-512        |          |               |

同时具备下列功能：

> - 真随机数产生器(TRNG)
> - 安全访问 eFuse 密钥: eFuse 密钥仅 CE 可访问
> - 安全 SRAM: 保护密钥安全
> - 本地数据安全：加密的数据仅当前设备可解密，其他设备无法解密
> - 硬件设备身份认证：软件可识别当前设备是否合法
> - 可支持实现加密启动
> - 可支持实现安全启动
> - 可支持实现文件系统加密

### 1.3. 原理框图

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ce_block_diagram2.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ce_block_diagram2-17067682235501.png)

图 8.10 *CE 原理框图*

## 2. 参数配置

### 2.1. 内核配置

使能 CE 相关的内核驱动，可在通过下列命令进行配置（在 SDK 顶层目录执行）:

```
make linux-menuconfig
```

或者使用快捷命令:

```
make km
```

在内核的配置界面中，进行下列的选择:

```
Cryptographic API  --->
    <*>   User-space interface for asymmetric key cipher algorithms
    [*]   Hardware crypto devices  --->
        [*]   Support for artinchip cryptographic accelerator
        <*>     Artinchip's crypto engine driver
```

此处特别选择了 `User-space interface for asymmetric key cipher algorithms` 是因为默认的 Linux 内核仅对用户空间开放了下列四种类型的算法。

| 算法类型 | 内核开放接口 | 说明                                             |
| -------- | ------------ | ------------------------------------------------ |
| SKCIPHER | 是           | 对称密钥类算法，如 AES、DES 等                   |
| AEAD     | 是           | 关联数据的认证加密类算法，如 GCM-AES，CCM-AES 等 |
| HASH     | 是           | 消息摘要类算法，如 MD5，SHA-256 等               |
| RNG      | 是           | 随机数类算法                                     |
| AKCIPHER | 否           | 非对称密钥类算法，如 RSA                         |

内核中 `非对称密钥类算法` 默认并没有对用户空间开放。Artinchip 对内核打了补丁，使得内核支持用户空间程序 使用内核所提供的非对称密钥算法，在配置内核时使能上述配置即可。

### 2.2. DTS 配置

```
crypto: crypto-engine@10020000 {
        compatible = "artinchip,aic-crypto-v1.0";
        reg = <0x0 0x10020000 0x0 0x1000>;
        interrupts-extended = <&plic0 33 IRQ_TYPE_LEVEL_HIGH>;
        clocks = <&cmu CLK_CE>;
        resets = <&rst RESET_CE>;
        status = "okay";
};
```

## 3. 调试指南

### 3.1. 调试开关

可通过内核配置使能 CE 模块的 DEBUG 选项。在 SDK 根目录下执行:

```
make linux-menuconfig (or make km)
```

进入内核的配置界面:

```
Linux
    Kernel hacking
        Artinchip Debug
            [*] CE driver debug
```

勾选使能该 DEBUG 选项后：

> 1. CE 的驱动源码将以 `-O0` 编译
> 2. CE 驱动中的 pr_dbg() 和 dev_dbg() 调试信息会被编译

如果需要看到 pr_dbg() 和 dev_dbg() 的打印信息，还需要设置 `loglevel=8` 。

若需要在启动过程中即可看到打印，需要在 `env.txt` 中修改 bootargs，增加 `loglevel=8` 。 若仅需要在板子启动到 Linux shell 后使能相关打印，可以通过下列命令调整 loglevel：

```
echo 8 > /proc/sys/kernel/printk
```

## 4. 测试指南

CE 的测试主要覆盖以下几个要点：

> - 驱动所实现的所有算法
> - 不同数据长度的处理
> - 输入输出 buffer 是否 4KB 对齐（需要支持不对齐的情况）
> - 多进程/线程并发访问

测试的方式主要是通过对算法处理后的数据进行“比数”的方式进行，结果与参考结果一致，则表明测试通过。

### 4.1. 测试工具

主机端工具：

> - OpenSSL (主机需要安装)

平台端工具：

> - crypto_kcapi (编译 source/artinchip/test-ce)

编译 crypto_kcapi 需要在 SDK 顶层目录执行:

```
make menuconfig
```

选择配置:

```
Artinchip packages
    Sample code
        [*] test-ce
```

### 4.2. 测试对象

需要测试的算法有：

| 对称密钥算法                                                 | 非对称密钥算法                                               | 消息摘要算法                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ----------------------------------------------------- |
| cbc(des3_ede)ecb(des3_ede)cbc(des)ecb(des)xts(aes)cts(aes)ctr(aes)cbc(aes)ecb(aes)huk-protected(xts(aes))huk-protected(cts(aes))huk-protected(cbc(aes))huk-protected(ecb(aes))ssk-protected(cbc(aes))ssk-protected(ecb(aes)) | rsapsk3-protected(rsa)psk2-protected(rsa)psk1-protected(rsa)psk0-protected(rsa)pnk-protected(rsa) | sha512sha384sha256sha224sha1md5hmac(sha256)hmac(sha1) |

### 4.3. 测试方法

#### 4.3.1. 创建测试用例的脚本

HOST 端，通过 `gen_xxx_test_data.sh` 脚本，生成对应算法的测试脚本。 `gen_xxx_test_data.sh` 脚本所做的事情包括：

> - 生成测试数据：指定长度的 `0x00 ~ 0xFF` 循环数据
> - 使用 OpenSSL 工具，根据指定的密钥，生成对应算法加解密后的数据
> - 使用 OpenSSL 工具，对生成的结果计算 MD5 值
> - 将对应的 MD5 值写入生成的 `test_xxx_script_kcapi.sh` 中，作为比较依据
> - 生成的 `test_xxx_script_kcapi.sh` 使用 DEVICE 端的 `crypto_kcapi` 工具进行测试

相关的脚本和数据在 `source/artinchip/test-ce/test` 目录下。目前有下列用于生成测试用例的脚本：

```
gen_hash_test_data.sh
gen_rsa_test_data.sh
gen_skcipher_ssram_test_data.sh
gen_skcipher_test_data.sh
```

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ce_test_host.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ce_test_host-17067683239363.png)

图 8.11 *生成测试脚本*

#### 4.3.2. 测试用例脚本

DEVICE 端在系统运行起来之后，可以在 `/usr/local/bin/test` 目录下，运行测试用例脚本。

测试脚本所做的事情包括：

> - 生成测试数据：与 HOST 端一样，指定长度的 `0x00 ~ 0xFF` 循环数据
> - 使用 crypto_kcapi 工具，根据指定的密钥，生成对应算法加解密后的数据
> - 使用 crypto_kcapi 工具，对生成的结果计算 MD5 值
> - 对比测试脚本中的 MD5 值，如果一样，则测试通过，否则失败

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ce_test_device.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ce_test_device-17067683451825.png)

图 8.12 *运行测试脚本*

目前有下列用于测试的脚本：

```
test_aes_cbc_huk_script_kcapi.sh
test_aes_cbc_script_kcapi.sh
test_aes_cbc_ssk_script_kcapi.sh
test_aes_ctr_huk_script_kcapi.sh
test_aes_ctr_script_kcapi.sh
test_aes_ctr_ssk_script_kcapi.sh
test_aes_ecb_huk_script_kcapi.sh
test_aes_ecb_script_kcapi.sh
test_aes_ecb_ssk_script_kcapi.sh
test_des_cbc_script_kcapi.sh
test_des_ecb_script_kcapi.sh
test_hash_all_script_kcapi.sh
test_md5_script_kcapi.sh
test_rsa_1024_script_kcapi.sh
test_rsa_2048_script_kcapi.sh
test_rsa_512_script_kcapi.sh
test_sha1_script_kcapi.sh
test_sha224_script_kcapi.sh
test_sha256_script_kcapi.sh
test_sha384_script_kcapi.sh
test_sha512_script_kcapi.sh
test_skciper_all_script_kcapi.sh
```

## 5. 设计说明

### 5.1. 源码说明

| 相关模块                     | 源码路径                                       |
| ---------------------------- | ---------------------------------------------- |
| 1. Crypto subsystem2. AF_ALG | source/linux-5.10/crypto/                      |
| Driver                       | source/linux-5.10/drivers/crypto/artinchip/ce/ |

### 5.2. 模块架构

CE 模块对接内核加密子系统。 `CE <—> Crypto subsystem <—> User space` 之间的层次关系如下图所示。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ce_kernel.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ce_kernel-17067684750627.png)

图 8.13 *CE 与内核加密子系统*

Linux 内核加密子系统由几个部分组成

- 核心部分:

  该部分实现了加密子系统的主要核心功能，包括主要的数据结构和管理所支持的算法类型以及不同算法之间进行组合的模板等对下对接各种算法的具体软硬件实现，对上提供对应的 API，为内核其他模块提供服务。

- 算法实现部分:

  分为软件的基本算法实现硬件算法加速器的驱动。

- 用户空间接口部分:

  内核加密子系统通过 Socket 接口向用户空间程序提供服务AF_NETLINK 接口，提供关于加密学子系统的信息，用户态程序可以通过该接口查询当前加密子系统向用户态提供了哪些服务，以及相关算法的详细信息；AF_ALG 接口，提供与具体算法进行交互的接口，用户态程序可以使用该接口对数据进行加解密等处理。

### 5.3. 设计要点

#### 5.3.1. CE 算法的分类注册

CE 硬件实现了多组不同类型的加密算法加速单元，分别对应内核加密子系统中的几种类型加密算法。在驱动实现时，根据不同的算法类型，将 CE 硬件抽象出三个不同的算法加速器：

> 1. 对称密钥算法加速器
> 2. 非对称密钥算法加速器
> 3. 消息摘要算法加速器

驱动按照不同的算法加速器进行资源分配和实现，每个算法加速器支持多种不同的具体算法，并且将具体算法注册到加密子系统。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ce_alg_and_accel.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ce_alg_and_accel-17067684951479.png)

图 8.14 *CE 算法分类*

驱动为 每一个 CE 算法实现一个实例，然后注册到内核加密子系统。 内核加密子系统使用链表的方式管理所有注册的算法，后续的使用者通过两个名字（ `cra_name`, `cra_driver_name` ）可以查找到对应的算法。 例如：

```
struct skcipher_alg alg = {
        .base.cra_name = "ecb(aes)",
        .base.cra_driver_name = "ecb-aes-aic",
        .base.cra_priority = 400,
        .base.cra_flags = CRYPTO_ALG_ASYNC | CRYPTO_ALG_ALLOCATES_MEMORY,
        .base.cra_blocksize = AES_BLOCK_SIZE,
        .base.cra_ctxsize = sizeof(struct aic_skcipher_tfm_ctx),
        .base.cra_alignmask = 0,
        .base.cra_module = THIS_MODULE,
        .init = aic_skcipher_alg_init,
        .exit = aic_skcipher_alg_exit,
        .setkey = aic_skcipher_alg_setkey,
        .decrypt = aic_skcipher_aes_ecb_decrypt,
        .encrypt = aic_skcipher_aes_ecb_encrypt,
        .min_keysize = AES_MIN_KEY_SIZE,
        .max_keysize = AES_MAX_KEY_SIZE,
        .ivsize = 0,
};
```

各驱动和算法实现模块，通过下列接口向加密子系统注册算法。

```
int crypto_register_skcipher(struct skcipher_alg *alg);
void crypto_unregister_skcipher(struct skcipher_alg *alg);

int crypto_register_akcipher(struct akcipher_alg *alg);
void crypto_unregister_akcipher(struct akcipher_alg *alg);

int crypto_register_ahash(struct ahash_alg *alg);
void crypto_unregister_ahash(struct ahash_alg *alg);

int crypto_register_aead(struct aead_alg *alg);
void crypto_unregister_aead(struct aead_alg *alg);

int crypto_register_kpp(struct kpp_alg *alg);
void crypto_unregister_kpp(struct kpp_alg *alg);

int crypto_register_rng(struct rng_alg *alg);
void crypto_unregister_rng(struct rng_alg *alg);
```

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ce_subsystem_alg_list.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ce_subsystem_alg_list-170676851354211.png)

图 8.15 *加密子系统的算法列表*

使用时，使用者需要使用对应的 API，创建对应算法的数据处理实例，然后使用对应类型算法的接口，进行数据的处理。如对称密钥算法使用下列的接口。

```
struct crypto_skcipher *
crypto_alloc_skcipher(const char *alg_name, u32 type, u32 mask);

struct skcipher_request *
skcipher_request_alloc(struct crypto_skcipher *tfm, gfp_t gfp);

int crypto_skcipher_encrypt(struct skcipher_request *req);
int crypto_skcipher_decrypt(struct skcipher_request *req);
```

注解

可以留意，以对对称密钥算法为例，向加密子系统注册算法实例时，使用的结构体为 `struct skciper_alg`， 用户 API 使用时，使用的结构体为 `struct crypto_skcipher` 。这里的区别是，前者是对内， 是具体算法的实现；后者是对外，代表一个对称密钥算法。

#### 5.3.2. 异步调用和处理

为了支持更广泛的应用场景，CE 的算法驱动需要实现异步调用，即每一个请求调用，都会立刻返回， 然后通过注册的回调函数来获取请求处理完成的通知。

要实现异步调用需要为每一个加速器实现对应的任务队列，以及相应的执行线程。内核加密子系统提供的公共模块 `crypto_engine` 已经实现了对应的功能，只需为每个加速器创建 `crypto_engine` 即可。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ce_async_call.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ce_async_call-170676852870913.png)

图 8.16 *Crypto Engine 的异步工作流程*

如上图所示，当算法驱动接收到一个数据处理请求时，只需做一些基本的标记工作，然后将该请求转发给对应的 `crypto_engine` 进行管理。`crypto_engine` 包含一个任务队列，以及一个工作线程。

工作线程总是检查当前队列是否有待处理的任务，如果有任务需要处理，则对当前任务按顺序调用对应的回调函数：

| 回调函数          | 说明                                       |
| ----------------- | ------------------------------------------ |
| prepare(…)        | 准备硬件以及对将要送给硬件的数据进行预处理 |
| do_one_request(…) | 启动硬件，处理数据                         |

硬件完成处理之后，在对一个的 IRQ 处理线程中处理输出数据，并且调用该请求的回调函数，以及释放本次数据处理请求所申请的资源。

注解

CE 的每一个算法处理单元对应一个 `crypto_engine`, 即有：skcipher engine，akcipher engine，hash engine

#### 5.3.3. eFuse 密钥和安全 SRAM

安全 SRAM 是 CE 中的一块专用 SRAM，该 SRAM 与其他模块安全隔离，仅 CE 可以访问， 因此用其保存的密钥和数据可以保证不被其他模块窃取。

安全 SRAM 的设计目的是要解决密钥的本地存储的安全问题。在一些数据加密的应用场景中，用户生成了一个密钥， 并且使用该密钥对数据进行加密。本地存储了加密后的数据，但是密钥要如何保存才安全又成了新的问题。 如果明文保存在本地，则很容易被窃取。

使用安全 SRAM 如何解决密钥的本地存储的安全问题？具体做法是：

> 1. 本地不保存明文密钥，只保存经过 eFuse 密钥加密后的密钥数据（eFuse 密钥 CPU 不可读，仅 CE 可读）
> 2. 需要使用密钥时，首先将加密后的密钥数据，解密到安全 SRAM，CE 再从安全 SRAM 读取密钥明文

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/secure_sram_1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/secure_sram_1-170676854874115.png)

图 8.17 *安全密钥的生成*

在需要使用安全 SRAM 进行加解密处理时，需要完成下列操作：

> 1. 用户指定一种对称密钥算法，指定 eFuse 密钥，对加密后的密钥数据进行解密
> 2. 用户指定解密后的明文密钥输出的安全 SRAM 位置
> 3. 配置 CE 使用特定安全 SRAM 中的明文密钥，对数据进行加解密处理

问题：

> 该流程是 AIC CE 特有，用户提供了更多的输入信息，中间多了密钥的解密、安全 SRAM 的管理等。 该处理流程如何融入到内核加密子系统的算法处理流程成为了问题。

为了很好的对接内核加密子系统，并且方便用户使用，CE 驱动采取的方案是：

> 1. 将安全 SRAM 的使用场景具体化，限制到具体的应用需求
> 2. 将使用安全 SRAM 的算法抽象为一种特殊的算法，注册到内核加密子系统中
> 3. 算法的处理过程中首先进行一个密钥的解密，然后再进行数据的处理

具体实现是为每一个场景实现一个对应的特殊算法，如为需要使用 eFuse HUK 进行密钥解密的 AES ECB 算法，实现一个名为 `huk-protected(ecb(aes))` 的算法，并且注册到内核加密子系统中。

当用户指定使用该算法时：

> 1. 对应的驱动总是先申请一块安全 SRAM 空间
> 2. 使用 eFuse HUK 对用户所提供的密钥数据进行解密，并输出到安全 SRAM 空间
> 3. 然后指定 CE 使用安全 SRAM 中生成的明文密钥，对数据进行处理

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/secure_sram_2.png](https://photos.100ask.net/artinchip-docs/d213-devkit/secure_sram_2-170676856394417.png)

图 8.18 *算法使用安全 SRAM 的示意图*

通过这种方式，既可以让用户选择符合条件的处理算法，又避免了用户参与处理 eFuse 密钥等额外流程， 还与当前内核加密子系统中其他算法的使用流程保持一致，用户只要指定正确的名字即可使用这些特殊算法。

当前 CE 驱动为下列几个应用场景定义了特殊算法。

> 1. 数据安全保护：将数据与设备型号加密绑定
>
>    eFuse SSK 密钥，一型一密（厂商定义，一个型号共用相同密码），通过 `ssk-protected(ecb(aes))` 和 `ssk-protected(cbc(aes))` 算法加密的数据，结合本地密钥可在相同型号的机器上进行解密。
>
> 2. 数据安全保护：将数据与具体设备加密绑定
>
>    eFuse HUK 密钥，一机一密（芯片出厂时随机生成，每台唯一），通过 `huk-proteced(ecb(aes))` 和 `huk-proteced(cbc(aes))` 算法加密的数据，只能在当前设备可以解密。
>
>    `huk-proteced(cts(aes))` 和 `huk-proteced(xts(aes))` 可用于当前设备的文件系统加密， 保证加密后的文件系统只有当前设备可以解密使用。
>
> 3. 设备身份安全认证
>
>    RSA 算法可以用于设备身份认证，前提是设备可以安全的保存其特有的私钥。
>
>    AIC 的方案中可以使用 eFuse 密钥 PNK、PSK 对私钥进行加密保存在设备本地，然后使用 `pnk-proteced(rsa)` 算法，或者 `pskx-proteced(rsa)` 算法，将对应的私钥解密到安全 SRAM 中使用。
>
>    PNK、PSK 是仅 CE 可访问的安全 eFuse 空间，可根据实际情况，分配给不同的厂商/用户使用。 当用户需要对设备进行身份认证时，可使用这些算法。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/secure_sram_3.png](https://photos.100ask.net/artinchip-docs/d213-devkit/secure_sram_3-170676857741219.png)

图 8.19 *使用安全 SRAM 的特殊算法*

#### 5.3.4. Fallback 机制

当用户使用指定的 CE 算法时，遇到一些 CE 无法支持的边角情况，此时需要通过 Fallback 机制， 使用软件实现的算法完成用户指定的数据处理任务。

目前可能需要使用 Fallback 机制的是 RSA 算法。

RSA 算法共有5 种密钥长度，但是目前 CE 仅支持三种（512、1024、2048），当用户需要使用 3072， 4096 比特的密钥时，需要使用 Fallback 机制，使用软件计算。

#### 5.3.5. 内核补丁

如前面所述，内核加密子系统通过 AF_ALG Socket 接口向用户空间程序提供了部分算法服务，包括下面四中类型的算法：

> 1. SKCIPHER 对称密钥类算法，如 AES、DES 等算法
> 2. AEAD 关联数据的认证加密类算法，如 GCM-AES, CCM-AES 等算法
> 3. HASH 消息摘要类算法，如 MD5，SHA-256 等算法
> 4. RNG 随机数类算法

默认情况下，非对称密钥算法，如 RSA、ECC 等算法内核并没有提供接口给用户空间程序使用。这里有部分原因是这类算法运算量大，在应用中不会用来直接对数据进行处理，仅用于对小量的关键数据进行加解密，因此直接使用用户空间的算法库效率更高，避免了系统调用等的额外开销。

但是提供非对称密钥算法的接口在一些情况下是有意义的，比如平台支持非对称密钥算法的硬件加速，并且运算速度明显比 CPU 计算更快；或者硬件提供基于非对称密钥算法的额外安全功能，比如 AIC 的 CE 可以提供基于 RSA 算法的硬件设备身份安全认证功能，用户空间程序需要有接口可以使用 CE 的 RSA 算法加速器。

虽然主线的内核并没有提供非对称密钥算法的 AF_ALG 接口，但是社区中有相关接口的补丁。Libkcapi 是一个对内核加密子系统 AF_ALG 接口进行封装的开源库，该库将 AF_ALG 接口封装成用户空间更容易使用的 API 接口，并且为若干内核版本提供了非对称密钥的 AF_ALG 接口补丁，通过使用这些补丁，用户空间程序可以使用内核中的非对称密钥算法。

相关的信息链接：

> 1. https://www.chronox.de/libkcapi.html
> 2. https://github.com/smuellerDD/libkcapi

### 5.4. 关键流程

#### 5.4.1. 初始化流程

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ce_keyflow.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ce_keyflow-170676860953421.png)

图 8.20 *初始化流程*

相关的代码流程如下。

```
aic_crypto_probe(pdev);
|-> ce_dev->base = devm_platform_ioremap_resource(pdev, 0);
|-> ret = devm_request_threaded_irq(dev, irq, aic_crypto_irq_handler,
|                                   aic_crypto_irq_thread, IRQF_ONESHOT,
|                                   dev_name(dev), ce_dev);
|-> ce_dev->clk = devm_clk_get(dev, NULL);
|-> clk_prepare_enable(ce_dev->clk);
|-> ce_dev->reset = devm_reset_control_get(dev, NULL);
|-> reset_control_assert(ce_dev->reset);
|-> reset_control_deassert(ce_dev->reset);
|-> aic_crypto_skcipher_accelerator_init(ce_dev);
|   |-> eng = crypto_engine_alloc_init_and_set(ce->dev, true, NULL, true,
|   |                                          ACCEL_QUEUE_MAX_SIZE);
|   |-> kfifo_alloc(&ce->sk_accel.req_fifo, ACCEL_QUEUE_MAX_SIZE, GFP_KERNEL);
|   |-> crypto_engine_start(ce->sk_accel.engine);
|   |-> crypto_register_skcipher(&sk_algs[i].alg);
|
|-> aic_crypto_akcipher_accelerator_init(ce_dev);
|-> aic_crypto_hash_accelerator_init(ce_dev);
```

#### 5.4.2. 数据处理流程

由于 CE 中几种类型算法的数据处理流程相似，这里仅以对称密钥算法的数据处理流程为例进行说明。

在处理步骤上，各种算法都遵循标准化的几个步骤：

> 1. 从 Crypto Core 层将处理请求传递给 CE 算法
> 2. CE 算法处理函数将请求转交给(transfer)给对应加速器的 crypto_engine 队列
> 3. crypto_engine 中的处理线程从队列中取出请求，调用对应的 prepare/do_one_req 进行处理
> 4. do_one_req 回调函数中，将对应的请求交给硬件处理
> 5. 在中断处理函数中，取出结果，返回给调用者

对称密钥算法的具体处理调用流程如下所示。

```
aic_skcipher_aes_ecb_encrypt(req);
|-> aic_skcipher_crypt(req, FLG_AES | FLG_ECB);
    |-> crypto_transfer_skcipher_request_to_engine(eng, req);

crypto_engine
|-> aic_skcipher_prepare_req(engine, req);
|-> aic_skcipher_do_one_req(engine, req);
    |-> aic_crypto_enqueue_task(ce, algo, rctx->phy_task);

aic_crypto_irq_thread(int irq, void *arg);
|-> aic_skcipher_handle_irq(ce_dev);
    |-> crypto_finalize_skcipher_request(ce->sk_accel.engine, req, err);
        |-> aic_skcipher_unprepare_req(engine, req);
        |-> req.complete(req, err);
```

除了上述的大处理流程，还有一个关键点需要注意，就是 **数据的对齐处理** 。用户发起数据处理请求时， 提供了输入和输出的数据缓冲区，然而这些数据缓冲区对 CE 而言有两个问题：

> 1. 这些缓冲区是虚拟地址空间的内存，并不一定是物理连续的内存空间
> 2. 缓冲区的开始地址并不一定是对齐的，不一定满足 CE 的地址对齐要求

因此需要对输入和输出的数据做一些处理。

一个简单的处理方式是对输入和输出的数据，一律复制到驱动新申请的物理连续的缓冲区中， 使用该空间作为 CE 的硬件工作缓冲区，处理完成之后再复制到用户提供的输出缓冲区。 但是对每一笔数据都会有额外的两次数据拷贝操作，对于处理大量数据的应用场景，效率较低。

为了兼顾数据处理效率，CE 驱动针对可能出现的情况，做了几个分类， **原则上尽量避免数据拷贝** 。

> 1. 输入缓冲区和输出缓冲区 CE 都无法使用
>
>    此种情况CE 驱动为输入和输出缓冲区分配物理连续的工作缓冲区，并且需要对输入和输出数据进行复制。
>
> 2. 输入缓冲区 CE 可用，输出缓冲区 CE 不可用
>
>    此种情况 CE 驱动为输出缓冲区分配物理连续的工作缓冲区，CE 将数据处理完成之后，再复制到用户提供的输出缓冲区。
>
> 3. 输入缓冲区 CE 不可用，输出缓冲区 CE 可用
>
>    此种情况 CE 驱动为输入缓冲区分配物理连续的工作缓冲区，CE 驱动先将输入数据复制到工作缓冲区， 再启动 CE 处理，直接输出到输出缓冲区。
>
> 4. 输入缓冲区和输出缓冲区都是 CE 可用
>
>    此种情况效率最高，CE 直接使用用户提供的输入输出缓冲区。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ce_data_buffer_for_ce.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ce_data_buffer_for_ce-170676862505723.png)

当用户处理大量数据时，为了提高系统的处理效率，应为输入和输出数据申请按页对齐的缓冲区，这样 CE 驱动可以直接使用，避免额外的复制操作。

#### 5.4.3. 中断处理流程

CE 驱动的中断处理比较简单，采用线程化的 IRQ 处理方式实现。

当中断发生时，首先在 irq handler 函数中保存当前的 IRQ 状态寄存器和错误状态寄存器的值。

```
static irqreturn_t aic_crypto_irq_handler(int irq, void *arg)
{
        struct aic_crypto_dev *ce_dev = arg;

        ce_dev->irq_status = readl(ce_dev->base + CE_REG_ISR);
        ce_dev->err_status = readl(ce_dev->base + CE_REG_ERR);
        writel(ce_dev->irq_status, ce_dev->base + CE_REG_ISR);
        return IRQ_WAKE_THREAD;
}
```

然后唤醒对应的处理线程，根据中断状态值，调用对应算法加速器的 IRQ 处理函数。

```
static irqreturn_t aic_crypto_irq_thread(int irq, void *arg)
{
        struct aic_crypto_dev *ce_dev = arg;

        if (ce_dev->irq_status & (0x1 << DMA_CHAN_SK_ACCELERATOR))
                aic_skcipher_handle_irq(ce_dev);
        if (ce_dev->irq_status & (0x1 << DMA_CHAN_AK_ACCELERATOR))
                aic_akcipher_handle_irq(ce_dev);
        if (ce_dev->irq_status & (0x1 << DMA_CHAN_HASH_ACCELERATOR))
                aic_hash_handle_irq(ce_dev);
        return IRQ_HANDLED;
}
```

如前面所述，各算法加速器的 IRQ 处理函数只做相关资源的释放，以及请求处理完成的通知。

```
aic_skcipher_handle_irq(ce_dev);
|-> crypto_finalize_skcipher_request(ce->sk_accel.engine, req, err);
    |-> aic_skcipher_unprepare_req(engine, req);
    |-> req.complete(req, err);
```

### 5.5. 数据结构

#### 5.5.1. 设备结构体

CE 设备结构体用来保存 CE 基地址等相关信息，除此之外，还包含了三个不同类型的算法加速器结构体， 以及安全 SRAM 的分配管理信息等。

```
struct aic_alg_accelerator {
    struct crypto_engine *engine;
    struct mutex alock;
    DECLARE_KFIFO_PTR(req_fifo, void *);
};

struct aic_crypto_dev {
    struct device *dev;
    void __iomem *base;
    struct clk *clk;
    struct reset_control *reset;
    struct mutex mlock;
    struct aic_alg_accelerator sk_accel;
    struct aic_alg_accelerator ak_accel;
    struct aic_alg_accelerator hash_accel;
    u64 ssram_bitmap;
    u32 irq_status;
    u32 err_status;
};
```

其中：

> - sk_accel
>
>   对称密钥算法加速器结构体，用于管理对称密钥算法所使用的 crypto_engine 实例，以及正在处理的请求 FIFO。
>
> - ak_accel
>
>   非对称密钥算法加速器结构体，用于管理非对称密钥算法所使用的 crypto_engine 实例，以及正在处理的请求 FIFO。
>
> - hash_accel
>
>   消息摘要算法加速器结构体，用于管理消息摘要算法所使用的 crypto_engine 实例，以及正在处理的请求 FIFO。
>
> - ssram_bitmap
>
>   安全 SRAM 空间的分配位图。安全 SRAM 按照32字节为单位进行分配管理，这里每一个比特对应一个32字节的安全 SRAM 空间。
>
> - irq_status
>
>   记录最新的 IRQ 状态寄存器的值。
>
> - err_status
>
>   记录最新的错误状态寄存器的值。

#### 5.5.2. 对称密钥算法

aic_skcipher_tfm_ctx 是一个对称密钥算法实例对应的上下文结构体，当用户使用 API 接口

```
struct crypto_skcipher *
crypto_alloc_skcipher(const char *alg_name, u32 type, u32 mask);
```

创建一个实例时，自动创建对应的上下文。

```
struct aic_skcipher_tfm_ctx {
    struct crypto_engine_ctx enginectx;
    unsigned char *inkey;
    int inkeylen;
    struct aic_crypto_dev *ce;
};
```

其中：

> - enginectx
>
>   crypto_engine 的上下文，用于配置该算法的回调处理函数。
>
> - inkey
>
>   用于保存用户配置的密钥信息。此处保存的密钥不直接交给 CE 硬件。

```
struct aic_skcipher_reqctx {
    struct task_desc *task;
    dma_addr_t phy_task;
    unsigned char *key;
    dma_addr_t phy_key;
    unsigned char *iv;
    unsigned char *backup_ivs; /* Back up iv for CBC decrypt */
    dma_addr_t phy_iv;
    dma_addr_t ssram_addr;
    dma_addr_t backup_phy_ivs;
    dma_addr_t next_iv; /* Next IV address for CBC encrypt */
    int tasklen;
    int keylen;
    int ivsize;
    int blocksize;
    int backup_iv_cnt;
    unsigned long mode;
    void *src_cpy_buf;
    void *dst_cpy_buf;
    dma_addr_t src_phy_buf;
    dma_addr_t dst_phy_buf;
    bool src_map_sg;
    bool dst_map_sg;
};
```

aic_skcipher_reqctx 是每一个数据请求所对应的上下文，在每一个 struct skcipher_request 实例化时自动创建。

其中：

> - task
>
>   CE 任务描述符指针。任务描述符所使用的空间是动态分配的空间，需要相关指针信息保存，以便完成时释放。
>
> - phy_task
>
>   任务描述符的物理地址。
>
> - key
>
>   密钥缓冲区的指针。该缓冲区为动态分配，地址空间 DMA 可用。
>
> - phy_key
>
>   密钥缓冲区的物理地址。
>
> - iv
>
>   初始化向量缓冲区指针。该缓冲区动态分配，地址空间 DMA 可用。
>
>   该成员变量在不同的算法模式中，含义有所不同。CBC 模式中为初始化向量；CTR 模式中为初始计数值，同时也用于保存 CE 输出的下一个数据块的计数值；XTS 中为 TWEAK 值。
>
> - phy_iv
>
>   初始化向量缓冲区的物理地址。
>
> - backup_ivs
>
>   用于 CBC 算法模式的解密情景。解密时，需要保存不同数据段的最后一个密文块，作为下一个数据段的初始化向量。
>
> - backup_phy_ivs
>
>   对应的物理地址。
>
> - next_iv
>
>   用于 CBC 算法模式加密的场景。在 CBC 算法模式的加密处理时，如果一个请求中有多个数据块串行处理，使用 next_iv 指向当前数据块的最后一个密文块的地址，以作为下一个数据块的初始化向量输入。
>
> - ssram_addr
>
>   当需要使用安全 SRAM 时，用于保存申请到的安全 SRAM 地址。
>
> - mode
>
>   算法和模式标记变量，用于标记当前请求所使用的算法和模式等信息。
>
> - src_cpy_buf
>
>   输入数据的工作缓冲区。当前请求的输入数据缓冲区不满足 CE 硬件的使用要求时，需要分配物理连续的工作缓冲区。
>
> - src_phy_buf
>
>   输入数据的工作缓冲区物理地址。
>
> - dst_cpy_buf
>
>   输出数据的工作缓冲区。当前输出数据缓冲区不满足 CE 硬件的使用要求时，需要分配物理连续的工作缓冲区。
>
> - dst_phy_buf
>
>   输出数据缓冲区的物理地址。
>
> - src_map_sg
>
>   输入 sg list 是否执行了 map 的标记。
>
> - dst_map_sg
>
>   输出 sg list 是否执行了map 的标记。

#### 5.5.3. 非对称密钥算法

```
struct aic_akcipher_tfm_ctx {
    struct crypto_engine_ctx enginectx;
    struct aic_crypto_dev *ce;
    unsigned char *n;
    unsigned char *e;
    unsigned char *d;
    unsigned int n_sz;
    unsigned int e_sz;
    unsigned int d_sz;
};
```

aic_akcipher_tfm_ctx 是非对称密钥算法实例所对应的上下文。

其中：

> - enginectx
>
>   crypto_engine 的上下文，用于配置该算法的回调处理函数。
>
> - n
>
>   RSA 密钥中的 modulus。
>
> - e
>
>   RSA 密钥中的公钥指数。
>
> - d
>
>   RSA 密钥中的私钥指数。

```
struct aic_akcipher_reqctx {
    struct task_desc *task;
    dma_addr_t phy_task;
    unsigned char *wbuf;
    dma_addr_t phy_wbuf;
    dma_addr_t ssram_addr;
    int tasklen;
    unsigned int wbuf_size;
    unsigned long flags;
};
```

aic_akcipher_reqctx 是每一个数据请求所对应的上下文，在每一个 struct akcipher_request 实例化时自动创建。

其中：

> - task
>
>   CE 任务描述符指针。任务描述符所使用的空间是动态分配的空间，需要相关指针信息保存，以便完成时释放。
>
> - phy_task
>
>   任务描述符的物理地址。
>
> - wbuf
>
>   工作缓冲区。
>
> - phy_wbuf
>
>   工作缓冲区的物理地址。
>
> - ssram_addr
>
>   当需要使用安全 SRAM 时，用于保存申请到的安全 SRAM 地址。
>
> - flags
>
>   算法和模式标记变量，用于标记当前请求所使用的算法和模式等信息。

#### 5.5.4. 消息摘要算法

```
struct aic_hash_tfm_ctx {
    struct crypto_engine_ctx enginectx;
    struct aic_crypto_dev *ce;
    bool hmac;
};
```

aic_hash_tfm_ctx 是消息摘要算法实例所对应的上下文。

其中：

> - enginectx
>
>   crypto_engine 的上下文，用于配置该算法的回调处理函数。
>
> - hmac
>
>   用于标记当前算法是否为 HMAC 类算法。

```
struct aic_hash_reqctx {
    struct task_desc *task;
    dma_addr_t phy_task;
    unsigned char *ivbuf;
    dma_addr_t phy_ivbuf;
    unsigned char *total_bitlen;
    dma_addr_t phy_total_bitlen;
    void *src_cpy_buf;
    dma_addr_t src_phy_buf;
    int tasklen;
    unsigned int digest_size;
    unsigned long flags;
    unsigned char digest[CE_MAX_DIGEST_SIZE];
    bool src_map_sg;
};
```

aic_hash_reqctx 是每一个数据请求所对应的上下文，在每一个 struct ahash_request 实例化时自动创建。

其中：

> - task
>
>   CE 任务描述符指针。任务描述符所使用的空间是动态分配的空间，需要相关指针信息保存，以便完成时释放。
>
> - phy_task
>
>   任务描述符的物理地址。
>
> - total_bitlen
>
>   当前请求处理的数据总长度，单位 bit。
>
> - phy_total_bitlen
>
>   保存数据总长度的变量的物理地址。
>
> - src_cpy_buf
>
>   输入数据的工作缓冲区。当前请求的输入数据缓冲区不满足 CE 硬件的使用要求时，需要分配物理连续的工作缓冲区。
>
> - src_phy_buf
>
>   输入数据的工作缓冲区物理地址。
>
> - flags
>
>   算法和模式标记变量，用于标记当前请求所使用的算法和模式等信息。
>
> - digest
>
>   用于保存当前一笔请求数据的摘要结果。当有连续多个请求的数据需要处理时，同时作为下一个请求的初始化向量输入。
>
> - src_map_sg
>
>   输入 sg list 是否执行了 map 的标记。

### 5.6. 接口设计

#### 5.6.1. aic_skcipher_alg_init)

| **函数原型** | int aic_skcipher_alg_init(struct crypto_skcipher *tfm) |
| ------------ | ------------------------------------------------------ |
| **功能说明** | 对称密钥算法的初始化函数                               |
| **参数定义** | struct crypto_skcipher *tfm算法实例指针                |
| **返回值**   | 0: 成功其他: 失败                                      |
| **注意事项** |                                                        |

#### 5.6.2. aic_skcipher_alg_exit

| **函数原型** | void aic_skcipher_alg_exit(struct crypto_skcipher *tfm) |
| ------------ | ------------------------------------------------------- |
| **功能说明** | 对称密钥算法使用完毕，释放相关资源                      |
| **参数定义** | struct crypto_skcipher *tfm算法实例指针                 |
| **返回值**   | 无                                                      |
| **注意事项** |                                                         |

#### 5.6.3. aic_skcipher_alg_setkey

| **函数原型** | int aic_skcipher_alg_setkey(struct crypto_skcipher *tfm, const u8 *key, unsigned int keylen) |
| ------------ | ------------------------------------------------------------ |
| **功能说明** | 设置对称密钥算法的密钥                                       |
| **参数定义** | struct crypto_skcipher *tfm算法实例指针const u8 *key密钥的指针unsigned int keylen密钥的长度 |
| **返回值**   | 0: 成功其他: 失败                                            |
| **注意事项** |                                                              |

#### 5.6.4. aic_skcipher_crypt

| **函数原型** | int aic_skcipher_crypt(struct skcipher_request *req, unsigned long flg) |
| ------------ | ------------------------------------------------------------ |
| **功能说明** | 发起一个对称密钥算法的加解密处理的请求                       |
| **参数定义** | struct skcipher_request *req加解密请求的指针unsigned logn flg算法标记，用来标识算法类型和算法模式 |
| **返回值**   | 0: 成功其他: 失败                                            |
| **注意事项** |                                                              |

#### 5.6.5. aic_akcipher_rsa_alg_init

| **函数原型** | int aic_akcipher_rsa_alg_init(struct crypto_akcipher *tfm) |
| ------------ | ---------------------------------------------------------- |
| **功能说明** | RSA 算法初始化                                             |
| **参数定义** | struct crypto_akcipher *tfm算法实例的指针                  |
| **返回值**   | 0: 成功其他: 失败                                          |
| **注意事项** |                                                            |

#### 5.6.6. aic_akcipher_rsa_alg_exit

| **函数原型** | void aic_akcipher_rsa_alg_exit(struct crypto_akcipher *tfm) |
| ------------ | ----------------------------------------------------------- |
| **功能说明** | RSA 算法使用完毕，释放相关资源                              |
| **参数定义** | struct crypto_akcipher *tfm算法实例的指针                   |
| **返回值**   | 无                                                          |
| **注意事项** |                                                             |

#### 5.6.7. aic_akcipher_rsa_set_pub_key

| **函数原型** | int aic_akcipher_rsa_set_pub_key(struct crypto_akcipher *tfm, const void *key,unsigned int keylen) |
| ------------ | ------------------------------------------------------------ |
| **功能说明** | 设置 RSA 算法的公钥                                          |
| **参数定义** | struct crypto_akcipher *tfm算法实例指针const void *key密钥数据的指针unsigned int keylen密钥的长度 |
| **返回值**   | 0: 成功其他: 失败                                            |
| **注意事项** |                                                              |

#### 5.6.8. aic_akcipher_rsa_set_priv_key

| **函数原型** | int aic_akcipher_rsa_set_priv_key(struct crypto_akcipher *tfm, const void *key,unsigned int keylen) |
| ------------ | ------------------------------------------------------------ |
| **功能说明** | 设置 RSA 算法的私钥                                          |
| **参数定义** | struct crypto_akcipher *tfm算法实例指针const void *key密钥数据的指针unsigned int keylen密钥的长度 |
| **返回值**   | 0: 成功其他: 失败                                            |
| **注意事项** |                                                              |

#### 5.6.9. aic_akcipher_rsa_max_size

| **函数原型** | int aic_akcipher_rsa_max_size(struct crypto_akcipher *tfm) |
| ------------ | ---------------------------------------------------------- |
| **功能说明** | 获取当前 RSA 算法的密钥长度                                |
| **参数定义** | struct crypto_akcipher *tfm算法实例指针                    |
| **返回值**   | 0: 成功其他: 失败                                          |
| **注意事项** |                                                            |

#### 5.6.10. aic_akcipher_rsa_crypt

| **函数原型** | int aic_akcipher_rsa_crypt(struct akcipher_request *req, unsigned long flag) |
| ------------ | ------------------------------------------------------------ |
| **功能说明** | 发起一个 RSA 算法的加解密请求                                |
| **参数定义** | struct akcipher_request *req请求的指针unsigned long flag算法标记 |
| **返回值**   | 0: 成功其他: 失败                                            |
| **注意事项** |                                                              |

#### 5.6.11. aic_hash_alg_init

| **函数原型** | int aic_hash_alg_init(struct crypto_tfm *tfm) |
| ------------ | --------------------------------------------- |
| **功能说明** | HASH 算法的初始化                             |
| **参数定义** | struct crypto_tfm *tfm算法实例的指针          |
| **返回值**   | 0: 成功其他: 失败                             |
| **注意事项** |                                               |

#### 5.6.12. aic_hash_alg_exit

| **函数原型** | void aic_hash_alg_exit(struct crypto_tfm *tfm) |
| ------------ | ---------------------------------------------- |
| **功能说明** | HASH 算法使用完毕，释放相关资源                |
| **参数定义** | struct crypto_tfm *tfm算法实例的指针           |
| **返回值**   | 无                                             |
| **注意事项** |                                                |

#### 5.6.13. aic_hash_init

| **函数原型** | int aic_hash_init(struct ahash_request *req)                 |
| ------------ | ------------------------------------------------------------ |
| **功能说明** | 初始化一个 HASH 运算的操作                                   |
| **参数定义** | struct ahash_request *reqHASH 运算的请求，具体所使用的算法，根据消息摘要的大小决定 |
| **返回值**   | 0: 成功其他: 失败                                            |
| **注意事项** |                                                              |

#### 5.6.14. aic_hash_update

| **函数原型** | int aic_hash_update(struct ahash_request *req)               |
| ------------ | ------------------------------------------------------------ |
| **功能说明** | 更新一笔 HASH 运算的数据，用于数据分多次输入的场景           |
| **参数定义** | struct ahash_request *reqHASH 运算的请求，数据信息保存在该结构体中 |
| **返回值**   | 0: 成功其他: 失败                                            |
| **注意事项** |                                                              |

#### 5.6.15. aic_hash_final

| **函数原型** | int aic_hash_final(struct ahash_request *req)                |
| ------------ | ------------------------------------------------------------ |
| **功能说明** | HASH 运算的数据输入结束，获取结果                            |
| **参数定义** | struct ahash_request *reqHASH 运算的请求，本请求不带数据，只获取结果 |
| **返回值**   | 0: 成功其他: 失败                                            |
| **注意事项** |                                                              |

#### 5.6.16. aic_hash_finup

| **函数原型** | int aic_hash_finup(struct ahash_request *req)                |
| ------------ | ------------------------------------------------------------ |
| **功能说明** | HASH 运算的最后一笔数据，并且获取结果                        |
| **参数定义** | struct ahash_request *reqHASH 运算的请求，本请求带最后一笔数据，并获取结果 |
| **返回值**   | 0: 成功其他: 失败                                            |
| **注意事项** |                                                              |

#### 5.6.17. aic_hash_digest

| **函数原型** | int aic_hash_digest(struct ahash_request *req)               |
| ------------ | ------------------------------------------------------------ |
| **功能说明** | 针对一笔数据，完成 init 和 finup 的 HASH 运算操作，并获取结果 |
| **参数定义** | struct ahash_request *reqHASH 运算的请求，本请求带最后一笔数据，并获取结果 |
| **返回值**   | 0: 成功其他: 失败                                            |
| **注意事项** |                                                              |

### 5.7. 应用编程

用户空间编程使用 CE 时，根据使用场景和需求的不同，有几层 API 可以选择：

> - AF_ALG Socket API
> - Libkcapi API
> - OpenSSL API

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/ce_userpace_api.png](https://photos.100ask.net/artinchip-docs/d213-devkit/ce_userpace_api-170676875520325.png)

图 8.21 *用户空间 API 对接*

#### 5.7.1. AF_ALG API

相关 API 可参考头文件

> - linux/if_alg.h

要使用内核提供的算法和驱动，需要知道对应的算法名字。可通过下列命令获取:

```
cat /proc/crypto
```

例如:

```
name         : ctr(aes)
driver       : ctr-aes-aic
module       : kernel
priority     : 400
refcnt       : 1
selftest     : passed
internal     : no
type         : skcipher
async        : yes
blocksize    : 16
min keysize  : 16
max keysize  : 32
ivsize       : 16
chunksize    : 16
walksize     : 16

name         : cbc(aes)
driver       : cbc-aes-aic
module       : kernel
priority     : 400
refcnt       : 1
selftest     : passed
internal     : no
type         : skcipher
async        : yes
blocksize    : 16
min keysize  : 16
max keysize  : 32
ivsize       : 16
chunksize    : 16
walksize     : 16

......
```

注解

这里的 /proc/crypto 是目标平台上的文件

AF_ALG API 的特点：

> - 效率高
> - 接口灵活
> - 较为复杂

#### 5.7.2. Libkcapi API

SDK 已经提供对应的 libkcapi 库，默认配置已经支持

> - 对称密钥算法
> - 非对称密钥算法
> - 消息摘要算法
> - 随机数读取

如果需要修改对应包的编译配置，可在 Luban SDK 顶层目录执行:

```
make menuconfig (or make m)
```

配置界面的索引如下：

```
Third-party packages  --->
    -*- libkcapi  --->
        [*]   use prebuilt binary instead of building from source
        [*]   enable asym algorithm support
        [*]   build enc application
        [*]   build hasher application
        [*]   build rng read application
        [*]   build speed-test program
        [*]   build test program
```

Libkcapi 的特点：

> - 接口简单
> - 效率高

- 基于 Libkcapi API 的参考示例:

  source/artinchip/test-ce/kcapi/

#### 5.7.3. OpenSSL API

Luban SDK 通过 OpenSSL 的 Engine 机制，以实现 Engine 库的方式，已经完成了对 OpenSSL 的对接。 无论是通过 OpenSSL 的命令行，还是通过使用库编程，都可以使用到 CE。

Engine 库有两个，根据不同的目的进行使用。

| Engine     | 库和路径                 | 说明                                                         |
| ---------- | ------------------------ | ------------------------------------------------------------ |
| aic engine | usr/lib/libengine_aic.so | 实现 CE 所提供的对称密钥算法、RSA 算法和消息摘要算法该 Engine 实现的都是标准算法。 |
| huk engine | usr/lib/libengine_huk.so | 实现了 HUK 保护的 AES 算法，可用于本地数据保护。使用该 Engine 时，输入的密钥会被 HUK 进行一次解密，然后才用于 AES 加解密。HUK 每一颗芯片不同，因此使用该 Engine 加密后的数据，仅当前平台可解密。 |

命令行中使用指定 Engine 的示例:

```
openssl enc -engine aic -p -nosalt -nopad -aes-128-ecb -e -K 0123 -in data.bin -out enc.bin
```

上述示例中，通过 `-engine aic` 指定了使用 `aic` engine。

当在 `openssl.cnf` 文件中配置了默认的 Engine 之后，命令行中可以忽略 `-engine` 参数。 具体配置可参考 `/etc/ssl/openssl_aic.cnf` 文件。

```
openssl_conf = openssl_def

[openssl_def]
engines = engine_section

[engine_section]
aic = aic_section

[aic_section]
engine_id = aic
dynamic_path = /usr/lib/libengine_aic.so
default_algorithms = CIPHERS,DIGESTS,RSA
```

Libopenssl API 的特点：

> - 功能强大
> - 调用效率稍差

- 基于 Libopenssl API 的参考示例:

  source/artinchip/test-ce/openssl/

## 6. 常见问题