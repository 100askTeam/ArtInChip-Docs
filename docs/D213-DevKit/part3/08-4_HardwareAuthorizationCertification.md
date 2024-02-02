---
sidebar_position: 32
---
# 硬件授权认证

## 1. 硬件授权认证

硬件授权认证是基于身份认证原理以及硬件安全密钥实现的安全功能，可以让软件或者第三方合作伙伴对芯片的合法性进行认证。

### 1.1. 身份认证原理

如下图所示，假设芯片拥有一个 RSA 私钥，软件拥有对应的 RSA 公钥。如果软件指定一笔数据，让芯片使用 RSA 私钥进行加密返回， 软件使用 RSA 公钥对其进行进行解密，得到的数据是正确的，则可证明该芯片是正确 RSA 私钥的拥有者。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/identification.png](https://photos.100ask.net/artinchip-docs/d213-devkit/identification-17067693186801.png)

芯片安全存储 RSA 私钥的方式有多种，包括烧录在 eFuse 中，然后设置软件不可读写。

- D211硬件特性：

  eFuse 可以通过读写禁止位，控制安全密钥区域是否可以被软件读和写eFuse 的安全密钥区域，一旦被设置为读禁止之后，仅 CE 硬件可访问CE 内部有独立的安全 SRAM，与外界隔绝，仅 CE 可访问，可安全存放密钥

D211 的方案通过硬件安全密钥的方式，加密保存 RSA 私钥。

- 具体步骤：

  通过 AES/DES 加密的方式，将 RSA 私钥加密将解密的 AES/DES 密钥，烧录在 eFuse 安全密钥区域，软件不可读写使用时，将 RSA 私钥解密到安全 SRAM

### 1.2. 芯片型号认证

在一些应用中，通信的一方需要认证芯片的身份，在这种情况下，仅靠读取 CHIP ID 返回是不可信的，可以通过 RSA 身份认证的方式进行。

芯片型号身份认证通过 AIC 颁发的 RSA 私钥(加密) 和 RSA 公钥对完成。AIC 为每一款芯片内置一个PNK(Part Number Key) 密钥，该密钥与型号一一对应，外界无法读取。

AIC 为该型号生成一对 RSA 密钥，并且使用 PNK 对 RSA 私钥进行加密，然后将加密后的 RSA 私钥，以及公钥颁发给用户。

对于需要对芯片型号进行认证的用户需要进行下列操作。

- 具体步骤：

  设置 CE 使用 PNK 将加密的 RSA 私钥解密到安全 SRAM让 CE 使用安全 SRAM 中的 RSA 私钥加密一段数据 Nonce，返回给认证方EncNonce认证方使用 RSA 公钥对返回的加密数据进行解密，得到 Nonce，验证数据是否正确数据正确，说明该型号芯片合法

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/chip_certification.png](https://photos.100ask.net/artinchip-docs/d213-devkit/chip_certification-17067693556383.png)

### 1.3. 软件授权认证

芯片身份认证可在软件授权认证中应用。

在实际应用中，设备可能会集成了不同厂商的软件和算法。软件厂商会有相关知识产权保护、软件授权上的需求，即希望能够限定自身的软件只能运行在指定芯片型号上。

软件厂商可以通过 PSK(Partner Secret Key) 机制实现安全的授权认证。

- 具体步骤：

  设备厂商将一个 eFuse PSK 区域分配给合作伙伴合作厂商将自己的密钥烧录到 PSK 区域，并且设置为软件不可读写合作厂商生成一对 RSA 密钥，并且使用 PSK 将 RSA 私钥加密将加密后的 RSA 私钥，以及对应的 RSA 公钥集成到软件当中需要进行授权检查时，软件设置 CE 使用 PSK，将加密的 RSA 私钥解密到安全 SRAM使用安全 SRAM 中的 RSA 私钥加密一笔数据，返回给认证软件认证软件使用 RSA 公钥解密返回的数据，如果结果正确，说明该芯片是合法授权的芯片

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/sw_certification.png](https://photos.100ask.net/artinchip-docs/d213-devkit/sw_certification-17067693681275.png)

注解

D211共有5组保护密钥，一组是PNK，出厂烧录。另外四组是PSK，由终端厂商自行烧录。

### 1.4. 接口设计

#### 1.4.1. aic_rsa_priv_enc

| **函数原型** | int aic_rsa_priv_enc(int flen, unsigned char *from, unsigned char *to, struct ak_options *opts) |
| ------------ | ------------------------------------------------------------ |
| **功能说明** | 使用私钥进行加密。                                           |
| **参数定义** | int flen输入数据长度from输入需要被加密的数据to输出加密后的数据opts一些其它参数 |
| **返回值**   | 成功返回加密后数据长度，失败返回-1                           |
| **注意事项** |                                                              |

#### 1.4.2. aic_rsa_pub_dec

| **函数原型** | int aic_rsa_pub_dec(int flen, unsigned char *from, unsigned char *to, struct ak_options *opts) |
| ------------ | ------------------------------------------------------------ |
| **功能说明** | 使用公钥进行解密。                                           |
| **参数定义** | int flen输入数据长度from输入需要被解密的数据to输出解密后的数据opts一些其它参数 |
| **返回值**   | 成功返回加密后数据长度，失败返回-1                           |
| **注意事项** |                                                              |

#### 1.4.3. aic_hwp_rsa_priv_enc

| **函数原型** | int aic_hwp_rsa_priv_enc(int flen, unsigned char *from, unsigned char *to, struct ak_options *opts, char *algo) |
| ------------ | ------------------------------------------------------------ |
| **功能说明** | 使用经过 `保护密钥加密过的私钥` 进行加密。                   |
| **参数定义** | flen输入数据长度from输入需要被解密的数据to输出解密后的数据opts一些其它参数algo指定选用烧录在eFuse中的保护密钥PNK_PROTECTED_RSAPSK0_PROTECTED_RSAPSK1_PROTECTED_RSAPSK2_PROTECTED_RSAPSK3_PROTECTED_RSA |
| **返回值**   | 成功返回加密后数据长度，失败返回-1                           |
| **注意事项** |                                                              |

### 1.5. API使用DEMO

授权的检查可以在 APP/中间件 启动时进行，或者在运行时随机进行。

Demo 见 source/artinchip/aic-authorization/test/test_aic_hw_authorization.c

```
int app_hw_authorization_check(unsigned char *from, int flen,
                unsigned char *esk, int esk_len,
                unsigned char *pk, int pk_len, char *algo)
{
    struct ak_options opts = {0};
    uint8_t *inbuf = NULL, *outbuf = NULL;
    uint8_t esk_buf[esk_len];
    uint8_t pk_buf[pk_len];
    size_t pagesize = (size_t)sysconf(_SC_PAGESIZE);
    int ret = 0, rlen, nonce;

    if (posix_memalign((void **)&inbuf, pagesize, 2 * pagesize)) {
        printf("Failed to allocate inbuf.\n");
        ret = -ENOMEM;
        goto out;
    }
    if (posix_memalign((void **)&outbuf, pagesize, 2 * pagesize)) {
        printf("Failed to allocate outbuf.\n");
        ret = -ENOMEM;
        goto out;
    }

    // 1. Set RSA key parameters
    memcpy(esk_buf, esk, esk_len);
    memcpy(pk_buf, pk, pk_len);
    opts.esk_buf = esk_buf;
    opts.esk_len = esk_len;
    opts.pk_buf = pk_buf;
    opts.pk_len = pk_len;

    // 2. Nonce private key encryption
    rlen = aic_hwp_rsa_priv_enc(flen, from, outbuf, &opts, algo);
    if (rlen < 0) {
        printf("aic_hwp_rsa_priv_enc failed.\n");
        goto out;
    }
    memcpy(inbuf, outbuf, rlen);
    memset(outbuf, 0, 2 * pagesize);

    // 3. EncNonce public key decryption
    rlen = aic_rsa_pub_dec(rlen, inbuf, outbuf, &opts);
    if (rlen < 0) {
        printf("aic_rsa_pub_dec failed.\n");
        goto out;
    }

    // 4. Compare Nonce and DecNonce
    if (memcmp(from, outbuf, rlen))
    {
        hexdump("Expect", (unsigned char *)&nonce, rlen);
        hexdump("Got Result", (unsigned char *)outbuf, rlen);
        printf("App %s stop.\n", algo);
        ret = -1;
    } else {
        printf("App %s running.\n", algo);
        ret = 0;
    }

out:
    if (inbuf)
        free(inbuf);
    if (outbuf)
        free(outbuf);

    return ret;
}
int main()
{
    int ret = 0;
    int nonce, flen, esk_len, pk_len;
    unsigned char *esk, *pk;
    char *algo;

    esk = rsa_private_key2048_encrypted_der;
    esk_len = rsa_private_key2048_encrypted_der_len;
    pk = rsa_public_key2048_der;
    pk_len = rsa_public_key2048_der_len;
    while(1) {
        nonce = rand();     /* Generate random number Nonce */
        flen = sizeof(nonce);
        algo = PNK_PROTECTED_RSA;   /* Specify hardware protection key */
        ret = app_hw_authorization_check((unsigned char *)&nonce, flen,
                        esk, esk_len, pk, pk_len, algo);
        if (ret < 0) {
            printf("Application %s not authorization.\n", algo);
        }

        nonce = rand();     /* Generate random number Nonce */
        flen = sizeof(nonce);
        algo = PSK0_PROTECTED_RSA;  /* Specify hardware protection key */
        ret = app_hw_authorization_check((unsigned char *)&nonce, flen,
                        esk, esk_len, pk, pk_len, algo);
        if (ret < 0) {
            printf("Application %s not authorization.\n", algo);
        }

        nonce = rand();     /* Generate random number Nonce */
        flen = sizeof(nonce);
        algo = PSK1_PROTECTED_RSA;  /* Specify hardware protection key */
        ret = app_hw_authorization_check((unsigned char *)&nonce, flen,
                        esk, esk_len, pk, pk_len, algo);
        if (ret < 0) {
            printf("Application %s not authorization.\n", algo);
        }

        nonce = rand();     /* Generate random number Nonce */
        flen = sizeof(nonce);
        algo = PSK2_PROTECTED_RSA;  /* Specify hardware protection key */
        ret = app_hw_authorization_check((unsigned char *)&nonce, flen,
                        esk, esk_len, pk, pk_len, algo);
        if (ret < 0) {
            printf("Application %s not authorization.\n", algo);
        }

        nonce = rand();     /* Generate random number Nonce */
        flen = sizeof(nonce);
        algo = PSK3_PROTECTED_RSA;  /* Specify hardware protection key */
        ret = app_hw_authorization_check((unsigned char *)&nonce, flen,
                        esk, esk_len, pk, pk_len, algo);
        if (ret < 0) {
            printf("Application %s not authorization.\n", algo);
        }

        sleep(2);
    }

    return 0;
}
```