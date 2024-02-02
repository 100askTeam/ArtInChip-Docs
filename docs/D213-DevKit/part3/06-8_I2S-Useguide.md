---
sidebar_position: 14
---

# I2S 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语 | 定义             | 注释说明                                           |
| ---- | ---------------- | -------------------------------------------------- |
| MCLK | master clock     | 主时钟，为CODEC提供工作时钟                        |
| LRCK | left right clock | 左右声道时钟，一个周期完成一次左右声道音频数据输出 |
| BCLK | bit clock        | 比特时钟，每个时钟周期传输1bit音频数据             |
| DAI  | 数字音频接口     | 音频接口的统称，如I2S，PCM等接口                   |

### 1.2. 模块简介

I2S是一种常见的音频接口，主要用于音频数据的传输。常见的应用场景是SOC和音频codec通过I2S接口实现音频的播放与录音。由于音频数据量较大，SOC一般是通过DMA实现音频数据在内存和I2S接口之间的传输，所以需要DMA驱动的支持。AIC的I2S模块支持I2S、左对齐右对齐、PCM和TDM格式；支持I2S的主从模式，采样精度支持8bit~32bit

I2S模块的基本特性如下：

- 支持I2S、左对齐、右对齐、PCM格式
- 支持TDM
- 支持I2S主从模式
- 采样精度支持8~32bit
- 采样率支持8K~384KHz

## 2. I2S配置

### 2.1. 内核配置

按照ALSA的框架设计，I2S的数据传输使用DMA方式，需要DMA-engine的支持，所以在menuconfig中 需要打开DMA-engine的驱动支持。

```
Device Drivers--->
    [*] DMA Engine support--->
            <*> Artinchip SoCs DMA support
```

在menuconfig中打开ALSA框架的支持，使能AIC的I2S驱动

```
Device Drivers--->
    <*> Sound card support--->
            <*> Advanced Linux Sound Architecture--->
                    <*> ALSA for SoC audio support--->
                            <*> ArtInChip I2S Support
```

### 2.2. DTS配置

#### 2.2.1. D211

```
i2s0: i2s@18600000 {
    #sound-dai-cells = <0>;
    compatible = "artinchip,aic-i2s-v1.0";
    reg = <0x18600000 0x400>;
    interrupts = <GIC_SPI 20 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cmu CLK_I2S0>;
    resets = <&rst RESET_I2S0>;
    dmas = <&dma DMA_I2S0>, <&dma DMA_I2S0>;
    dma-names = "rx", "tx";
};

i2s1: i2s@18601000 {
    #sound-dai-cells = <0>;
    compatible = "artinchip,aic-i2s-v1.0";
    reg = <0x18601000 0x400>;
    interrupts = <GIC_SPI 21 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cmu CLK_I2S1>;
    resets = <&rst RESET_I2S1>;
    dmas = <&dma DMA_I2S1>, <&dma DMA_I2S1>;
    dma-names = "rx", "tx";
};
```

xxx/board.dts中的配置

```
&i2s0 {
    pinctrl-names = "default";
    pinctrl-0 = <&i2s0_clk_pins>;
    status = "disabled";
};

&i2s1 {
    pinctrl-names = "default";
    pinctrl-0 = <&i2s1_clk_pins>, <&i2s1_mclk_pins>, <&i2s1_din_pins_b>;
    status = "okay";
};
```

根据实际的板型配置，使能相应的I2S

## 3. 调试指南

## 4. 测试指南

### 4.1. 测试环境

#### 4.1.1. 硬件

- 测试板：带有第三方codec芯片的测试板
- PC：用于和测试板交互
- 串口线：连接测试板的调试串口

#### 4.1.2. 软件

- PC端串口终端软件
- alsa-lib和alsa-utils第三方软件包
- 第三方codec驱动
- 创建声卡的machine驱动

### 4.2. 创建声卡

#### 4.2.1. machine驱动

声卡的驱动分为三部分：platform驱动、codec驱动、machine驱动。对于本章节来说，platform驱动即I2S驱动。codec驱动一般会由codec厂家提供，内核中也提供了大量的codec驱动源码，可以选择相应的codec芯片进行测试，本章节会选用allwinner的ac102芯片。所以在测试前需要做的就是编写声卡的machine驱动，machine驱动实现platform驱动和codec驱动的耦合，创建声卡，同时确定cpu_dai和codec_dai的连接方式以及支持的格式、采样深度等信息。

创建声卡的一个非常重要的结构体是struct snd_soc_dai_link，该结构体用来指定platform和codec的耦合关系，主要的成员变量如下：

```
struct snd_soc_dai_link {
    /* config - must be set by machine driver */
    const char *name;
    const char *stream_name;
    struct snd_soc_dai_link_component *cpus;
    unsigned int num_cpus;
    struct snd_soc_dai_link_component *codecs;
    unsigned int num_codecs;
    struct snd_soc_dai_link_component *platforms;
    unsigned int num_platforms;
    /* format to set on init */
    unsigned int dai_fmt;
    /* machine stream operations */
    const struct snd_soc_ops *ops;
    ...
};
```

dai_link中成员变量的一些定义规则(规则定义可参考snd_soc_dai_link结构体定义或函数soc_dai_link_sanity_check)：

1. codecs必须定义，codecs->name和codecs->of_node必须定义其一，不可以都定义，也不可以都不定义。codecs->dai_name必须定义
2. cpus可不定义。但定义时，cpus->name和cpus->of_node二者定义其一，不可以都定义。cpus->dai_name可定义，也可不定义。cpus->name和cpus->of_node未定义时，将会通过cpus->dai_name进行匹配。cpus->dai_name未定义时，将会通过cpus->name或cpus->of_node进行匹配。
3. platforms可不定义。但定义时platforms->name和platforms->of_node二者定义其一，不可以都定义。platforms->dai_name在ALSA框架中并未使用。

ALSA框架中提供了一些宏，用来定义上述的一些成员变量，比较常用的是通过宏SND_SOC_DAILINK_DEFS进行定义。现在内核中比较通用的做法是通过SND_SOC_DAILINK_DEFS将成员变量定义为空，在声卡的probe函数中通过读取DTS定义cpus/codecs/platforms的of_node变量。这样做的优点是修改codec外部配置或连接方式时，只需编译DTS即可，不需要重新编译内核。

dai_fmt变量定义I2S和codec之间的音频数据传输方式。

ops定义machine驱动所支持的操作函数集。

将定义的struct snd_soc_dai_link结构体变量赋值给struct snd_soc_card结构体的dai_link成员变量，然后调用snd_soc_register_card即可完成声卡的注册，具体可参考内核中提供的一些machine驱动。

#### 4.2.2. 声卡DTS配置

需要在DTS中配置声卡的结点，才能正确调用声卡的machine驱动。DTS中声卡的结点配置如下(以allwinner的ac102为例说明)：

```
soundCard {
            compatible = "artinchip,aic-ac102";
            aic,codec-chip = <&ac102>;
            aic,i2s-controller = <&i2s1>;
            status = "okay";
    };
```

machine驱动通过读取aic,codec-chip和aic,i2s-controller属性获取相应的i2s和codec结点。SOC一般是通过I2C接口对codec芯片进行控制，所以需要在I2C控制器下挂接codec芯片

```
&i2c3 {
        pinctrl-names = "default";
        pinctrl-0 = <&i2c3_pins_b>;
        status = "okay";
        ac102: ac102@33 {
                compatible = "allwinner,ac102";
                reg = <0x33>;
        };
};
```

### 4.3. 音频测试

#### 4.3.1. 测试音频播放

```
aplay test.wav
```

#### 4.3.2. 测试音频录音

```
arecord -d 10 -f dat -t wav test.wav
```

-d：指定录音时长，单位为秒

-f：指定录制的格式，dat表示16bit小端数据，48K采样率，立体声

-t：指定生成的文件格式，为wav文件

test.wav：生成的wav文件名

## 5. 设计说明

### 5.1. 源码说明

源代码位于：linux-5.10/sound/soc/artinchip/aic-i2s.c

### 5.2. 模块架构

内核中音频采用ALSA驱动框架，该框架管理所有与音频相关的软件与硬件，I2S的驱动设计需要遵循该框架的基本要求。ALSA音频框架将底层的硬件驱动分为三个部分：machine、pltform与codec。三者的关系如下图所示：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/design_12.png](https://photos.100ask.net/artinchip-docs/d213-devkit/design_12-17067515322761.png)

ALSA框架将底层划分为三部分后，使得platform和codec的驱动实现变得更加简单，二者只专注于实现自己的功能代码，由machine驱动来实现platform和codec的耦合，二者依靠cpu_dai和codec_dai进行数据传输。platform驱动的主要作用是完成音频数据的管理，最终通过SOC的数字音频接口(cpu_dai)把音频数据传送给codec进行播放或将codec采集的音频数据存储到内存中。

在具体的实现上，ALSA将platform驱动（platform可以简单理解为SOC端的驱动）分为两部分：实现音频数据传输和管理的DMA驱动和CPU DAI的驱动。且ALSA框架中已实现了DMA对音频数据管理部分的驱动 代码，所以I2S的驱动只需要实现CPU DAI部分的驱动，音频数据管理部分只需要指定数据传输的起始地址或目的地址，以及传输位宽即可。

#### 5.2.1. CPU DAI驱动

在驱动实现上，无论是codec还是platform，ALSA将它们统一划分为snd_soc_component和snd_soc_dai，所以，就要相应的实现snd_soc_component_driver和snd_soc_dai_driver。 然后调用snd_soc_register_component进行统一注册。snd_soc_component_driver主要是注册与dapm相关的音频控件等信息，snd_soc_dai_driver主要是注册数字音频接口I2S或PCM等的信息及底层操作函数。

由于在platform端，主要是I2S接口和DMA的传输配置，不存在音频控件，所以CPU DAI的驱动主要是实现snd_soc_dai_driver。包括指定I2S接口支持的通道数、采样率、支持的数据格式，以及对I2S配置和控制的回调函数集合snd_soc_dai_ops的实现

#### 5.2.2. 音频DMA驱动

ALSA架构中，对DMA的一些配置和传输的函数已经由ALSA框架实现，所以这部分驱动实现只需要指定playback和capture中DMA传输的地址以及传输的位宽，然后调用devm_snd_dmaengine_pcm_register 进行注册即可。

### 5.3. 关键流程设计

#### 5.3.1. 操作函数集实现

在I2S的驱动设计中，snd_soc_dai_ops是一个非常重要的结构体，它是cpu_dai的操作函数集，所有对I2S接口的设置都是通过此结构体完成。所以，I2S驱动中一项非常重要的部分就是实现此结构体中的函数接口。snd_soc_dai_ops函数集可以分为如下几个部分：

1. cpu_dai时钟配置函数，通常由machine驱动调用
   - set_sysclk：设置cpu_dai的主时钟MCLK
   - set_clkdiv：设置分频系数，用于实现BCLK和LRCK的分频系数
   - set_bclk_ratio：设置BCLK和LRCK的比率
2. cpu_dai格式设置，通常由machine驱动调用
   - set_fmt：设置主从模式(LRCK和BCLK时钟由SOC提供还是由codec提供)，BCLK和LRCK的极性，以及传输模式
   - set_tdm_slot：cpu_dai支持时分复用时，用于设置时分复用的slot
   - set_channel_map：声道时分复用时的映射关系设置
3. ALSA PCM音频操作，由ALSA的soc-core在执行音频操作时调用
   - hw_params：硬件参数设置，一般用于采样精度，通道位宽的设置
   - trigger：命令触发函数，用于执行音频数据传输的开始、结束、暂停、恢复等

在I2S的驱动中，需要实现的接口有：

```
static const struct snd_soc_dai_ops aic_i2s_dai_ops = {
        .set_sysclk = aic_i2s_set_sysclk,
        .set_bclk_ratio = aic_i2s_set_bclk_ratio,
        .set_fmt = aic_i2s_set_fmt,
        .set_tdm_slot = aic_i2s_set_tdm_slot,
        .hw_params = aic_i2s_hw_params,
        .trigger = aic_i2s_trigger,
};
```

在实现的几个接口函数中，除hw_params和trigger外，其它函数是需要在machine驱动中根据I2S和codec双方所支持的格式、时钟等进行调用设置的，使I2S和codec两边的格式设置相同。

#### 5.3.2. I2S时钟设置

##### 5.3.2.1. MCLK

MCLK是I2S的主时钟，主要作用是向外部的codec芯片提供工作时钟，由I2S模块的工作时钟分频得到。在驱动中由aic_i2s_set_sysclk设置MCLK的频率，MCLK一般采用128fs，256fs，512fs的表示方式，具体的设置需要参考实际使用的codec芯片规格书。Fs是采样频率，常见的采样频率有44.1khz，48khz，32khz等，可以据此算出MCLK的频率值。一般会在machine驱动中调用设置MCLK的函数。

##### 5.3.2.2. LRCK和BCLK

LRCK是左右声道时钟。LRCK的时钟频率等于fs，在D211中，通过LRCK_PERIOD位域设置LRCK的频率，LRCK_PERIOD表示一个LRCK时钟周期内，有多少个BCLK周期。在I2S模式下，若为立体声（2通道），32bit采样深度，则BCLK=64fs，则LRCK_PERIOD应设置为(64/2-1)。若为4通道，24bit采样深度，则BCLK=96fs，则LRCK_PERIOD应设置为（96/2-1）。由采样频率可以算出BCLK时钟的频率。并由BCLK的频率算出LRCK，即采样率。

#### 5.3.3. period bytes对齐

在使用DMA传输音频数据时，DMA要求每次传输的数据长度必须128bytes/8bytes对齐。在ALSA框架下，音频数据以period为周期调用DMA传输，每次传输的数据长度为period bytes。所以，必须满足period bytes按照128bytes/8bytes对齐。ALSA中提供了相应的API接口(snd_pcm_hw_constraint_step)来满足这一需求。

```
static int aic_i2s_startup(struct snd_pcm_substream *substream,
            struct snd_soc_dai *dai)
{
    int ret;

    /* Make sure that the period bytes are 8/128 bytes aligned according to
    * the DMA transfer requested.
    */
    if (of_device_is_compatible(dai->dev->of_node,
        "artinchip,aic-i2s-v1.0")) {
        ret = snd_pcm_hw_constraint_step(substream->runtime, 0,
                    SNDRV_PCM_HW_PARAM_PERIOD_BYTES, 8);
        if (ret < 0) {
            dev_err(dai->dev,
                "Could not apply period step: %d\n", ret);
            return ret;
        }

        ret = snd_pcm_hw_constraint_step(substream->runtime, 0,
                    SNDRV_PCM_HW_PARAM_BUFFER_BYTES, 8);
        if (ret < 0) {
            dev_err(dai->dev,
                "Could not apply buffer step: %d\n", ret);
            return ret;
        }
    } else {
        ret = snd_pcm_hw_constraint_step(substream->runtime, 0,
                    SNDRV_PCM_HW_PARAM_PERIOD_BYTES, 128);
        if (ret < 0) {
            dev_err(dai->dev,
                "Could not apply period step: %d\n", ret);
            return ret;
        }

        ret = snd_pcm_hw_constraint_step(substream->runtime, 0,
                    SNDRV_PCM_HW_PARAM_BUFFER_BYTES, 128);
        if (ret < 0) {
            dev_err(dai->dev,
                "Could not apply buffer step: %d\n", ret);
            return ret;
        }
    }

    return ret;
}
```

### 5.4. 数据结构设计

#### 5.4.1. aic_i2s

```
struct aic_i2s {
        struct clk *clk;
        struct reset_control *rst;
        struct regmap *regmap;

        struct snd_dmaengine_dai_dma_data playback_dma_data;
        struct snd_dmaengine_dai_dma_data capture_dma_data;
        unsigned int mclk_freq;
        unsigned int bclk_ratio;
        unsigned int format;
        unsigned int slots;
        unsigned int slot_width;
};
```

部分变量说明：

- playback_dma_data：播放时的音频数据结构，用于配置DMA传输的目的地址，数据宽度等信息
- capture_dma_data：录音时音频数据结构，用于配置DMA传输的起始地址，数据宽度等信息
- mclk_freq：I2S的MCLK时钟频率
- bclk_ratio：LRCK与BCLK的比率
- format：设置I2S的传输格式
- slots：设置I2S的通道数
- slot_width：设置I2S的每个通道占用位数

#### 5.4.2. aic_i2s_clk_div

```
struct aic_i2s_clk_div {
        u8 div; /* bclk和mclk的分频系数 */
        u8 val; /* 分频系数div所对应的寄存器的值 */
};
```

### 5.5. 接口设计

#### 5.5.1. aic_i2s_set_sysclk

| 函数原型 | static int aic_i2s_set_sysclk(struct snd_soc_dai *dai, int clk_id, unsigned int freq, int dir) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 设置I2S模块输出的mclk时钟频率                                |
| 参数定义 | dai：指向cpu_dai的指针 \| clk_id：要设置的时钟id \| freq：设置的时钟频率 \| dir： unused |
| 返回值   | 0：执行成功 \| -EINVAL：参数非法                             |
| 注意事项 |                                                              |

#### 5.5.2. aic_i2s_set_bclk_ratio

| 函数原型 | static int aic_i2s_set_bclk_ratio(struct snd_soc_dai *dai, unsigned int ratio) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 设置I2S模块LRCK与BCLK时钟频率的比率                          |
| 参数定义 | dai：指向cpu_dai的指针 \| ratio：需要设置的比率              |
| 返回值   | 0：执行成功 \| -EINVAL：参数非法                             |
| 注意事项 |                                                              |

#### 5.5.3. aic_i2s_set_fmt

| 函数原型 | static int aic_i2s_set_fmt(struct snd_soc_dai *dai, unsigned int fmt) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 设置I2S模块的格式                                            |
| 参数定义 | dai：指向cpu_dai的指针 \| fmt：需要设置的格式                |
| 返回值   | 0：执行成功 \| -EINVAL：参数非法                             |
| 注意事项 | 通过该函数可以设置的格式有： \| 1. I2S的主从模式 \| 2. BCLK和LRCK的极性 \| 3. I2S的数据格式 |

#### 5.5.4. aic_i2s_set_tdm_slot

| 函数原型 | static int aic_i2s_set_tdm_slot(struct snd_soc_dai *dai,unsigned int tx_mask, unsigned int rx_mask,int slots, int slot_width) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 设置I2S模块TDM模式下的通道个数和宽度                         |
| 参数定义 | dai：指向cpu_dai的指针 \| tx_mask：tx slot的mask \| rx_mask：rx slot的mask \| slots：设置的通道个数 \| slot_width：设置的通道宽度 |
| 返回值   | 0：执行成功 \| -EINVAL：参数非法                             |
| 注意事项 |                                                              |

#### 5.5.5. aic_i2s_hw_params

| 函数原型 | static int aic_i2s_hw_params(struct snd_pcm_substream *substream, struct snd_pcm_hw_params *params, struct snd_soc_dai *dai) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 设置I2S模块硬件参数                                          |
| 参数定义 | substream：指向playback或capture的substream \| params：指向硬件参数指针 \| dai：指向cpu_dai的指针 |
| 返回值   | 0：执行成功 \| -EINVAL：参数非法                             |
| 注意事项 | 通过该函数，可以设置采样精度，帧率，以及时钟等参数           |

#### 5.5.6. aic_i2s_trigger

| 函数原型 | static int aic_i2s_trigger(struct snd_pcm_substream *substream, int cmd, struct snd_soc_dai *dai) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | I2S的触发函数                                                |
| 参数定义 | substream：指向playback或capture的substream \| cmd：触发的命令 \| dai：指向cpu_dai的指针 |
| 返回值   | 0：执行成功 \| -EINVAL：参数非法                             |
| 注意事项 | 通过该函数，可以开始或停止音频的播放或录音                   |

## 6. 常见问题

1. 执行amixer时报错，显示找不到alsa.conf配置文件

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/amixer_error1.png](https://photos.100ask.net/artinchip-docs/d213-devkit/amixer_error1-17067516245563.png)

该问题的原因是找不到ALSA的路径，可以通过以下命令解决：

```
export ALSA_CONFIG_DIR=/usr/share/alsa/
待后续完善
```