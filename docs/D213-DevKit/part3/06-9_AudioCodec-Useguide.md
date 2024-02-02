---
sidebar_position: 15
---

#  AudioCodec 使用指南

## 1. 模块介绍

### 1.1. 术语定义

| 术语    | 定义                   |
| ------- | ---------------------- |
| PCM     | 脉冲编码调制           |
| PDM     | 脉冲密度调制           |
| SDM     | Sigma Delta Modulation |
| DF      | 抽值滤波器             |
| IF      | 插值滤波器             |
| HDF     | 高通滤波器             |
| DVC     | 数字音量控制器         |
| DMICI/F | 数字MIC接口            |

### 1.2. 模块简介

AudioCodec是一个内置在SOC内部的音频codec模块。该模块内部集成了ADC、DMIC音频输入和PWM音频 输出，经过数字信号的处理，实现音频信号的录入以及播放等功能。该模块还具有以下特性：

- 支持1路模拟音频输入
- 支持数字DMIC立体声输入
- 支持2路单端输出(立体声)，或1路差分输出(单声道)
- 无DAC设计，输出采用PWM输出
- 输入和输出通路均支持数字音量控制

## 2. AudioCodec配置

### 2.1. 内核配置

按照ALSA的框架设计，AudioCodec的数据传输使用DMA方式，需要DMA-engine的支持，所以在menuconfig 中需要打开DMA-engine的驱动支持。

```
Device Drivers--->
    [*] DMA Engine support--->
            <*> Artinchip SoCs DMA support
```

在menuconfig中打开ALSA框架的支持，使能AIC的AudioCodec驱动

```
Device Drivers--->
    <*> Sound card support--->
            <*> Advanced Linux Sound Architecture--->
                    <*> ALSA for SoC audio support--->
                            <*> ArtInChip CODEC Support
```

### 2.2. DTS配置

#### 2.2.1. d211配置

```
codec: codec@18610000 {
    #sound-dai-cells = <0>;
    compatible = "artinchip,aic-codec-v1.0";
    reg = <0x18610000 0x400>;
    interrupts = <GIC_SPI 22 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cmu CLK_CODEC>;
    resets = <&rst RESET_CODEC>;
    dmas = <&dma DMA_CODEC>, <&dma DMA_CODEC>;
    dma-names = "rx", "tx";
};

codec-analog {
    #sound-dai-cells = <0>;
    compatible = "artinchip,codec-analog";
    dmas = <&dma 15>, <&dma DMA_CODEC>;
    dma-names = "rx", "tx";
};
```

xxx/board.dts中的配置

```
&codec {
    pinctrl-names = "default";
    pinctrl-0 = <&amic_pins>, <&dmic_pins_a>, <&spk_pins_b>;
    pa-gpios = <&gpio_f 13 GPIO_ACTIVE_LOW>;
    status = "okay";
};
```

根据实际的板级配置，设置pinctrl-0的值。

## 3. 调试指南

## 4. 测试指南

### 4.1. 测试环境

#### 4.1.1. 硬件

- 测试板：带有DMIC的测试板
- PC：用于和测试板交互
- 串口线：连接测试板的调试串口

#### 4.1.2. 软件

- PC端串口终端软件
- alsa-lib和alsa-utils第三方软件包

### 4.2. 创建声卡

AudioCodec是SOC内置的codec，所以在AudioCodec的驱动中，已直接创建声卡，不需要再单独编写machine驱动。在按照 [AudioCodec配置](2_configure.html) 配置后，内核会创建出名aic-SoundCard的声卡，对此声卡进行操作即可。

### 4.3. 音频测试

#### 4.3.1. 配置音频路径

AudioCodec的音频通路中，存在较多的开关，混音器，数字音量调节器，多路选择器等器件。所以在执行 播放或录音任务前，需要先配置音频路径，使音频数据可以正确流通。

##### 4.3.1.1. 自动配置

在SDK的target/aic16xx/perxx/rootfs_overlay/var/lib/alsa目录下，存放有asound.state文件，该文件保存的是声卡各个控件的配置值。在内核启动时，会自动加载该文件， 完成音频通路的配置。

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/load_asound_state.png](https://photos.100ask.net/artinchip-docs/d213-devkit/load_asound_state-17067518348841.png)

##### 4.3.1.2. 手动配置[¶](#id9)

一般使用asound.state文件默认的配置即可。如果内核启动时的默认配置不满足需求，也可以通过amixer工具进行手动配置。amixer的使用方法如下：

```
amixer sset 'control-name-string' value
```

control-name-string和value的值可以通过以下方式查看：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/amixer_scontents.png](https://photos.100ask.net/artinchip-docs/d213-devkit/amixer_scontents-17067518413023.png)

修改设置示例：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/amixer_example.png](https://photos.100ask.net/artinchip-docs/d213-devkit/amixer_example-17067518498775.png)

修改完成后，可以通过alsactl命令将修改保存到asound.state文件中。在后续的上电过程中，内核会加载最新的修改配置。

```
alsactl -f /var/lib/alsa/asound.state store
```

#### 4.3.2. 测试音频播放

```
aplay test.wav
```

#### 4.3.3. 测试音频录音

```
arecord -d 10 -f dat -t wav test.wav
```

-d：指定录音时长，单位为秒

-f：指定录制的格式，dat表示16bit小端数据，48K采样率，立体声

-t：指定生成的文件格式，为wav文件

test.wav：生成的wav文件名

#### 4.3.4. 调整播放音量

```
amixer sset 'AUDIO' 140
```

#### 4.3.5. 调整DMIC录音音量

```
amixer sset 'DMICIN' 140
```

#### 4.3.6. 调整AMIC录音音量

```
amixer sset 'ADC' 140
```

#### 4.3.7. 调整PGA增益

```
amixer sset 'PGA Gain' 8
```

## 5. 设计指南

### 5.1. 源码说明

源代码位于：linux-5.10/sound/soc/artinchip/aic-codec.c

### 5.2. 模块架构设计

#### 5.2.1. ALSA软件架构

Linux中的音频采用ALSA驱动框架，该框架管理Linux下所有与音频相关的资源，codec的驱动按照ALSA框架进行设计开发。ALSA整体框架如下图：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/alsa.png](https://photos.100ask.net/artinchip-docs/d213-devkit/alsa-17067519420937.png)

如上图，ALSA音频框架将底层的硬件驱动分为三部分：machine、platform与codec。三者的关系如下图所示：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/machine_codec_platform.png](https://photos.100ask.net/artinchip-docs/d213-devkit/machine_codec_platform-17067519506169.png)

platform driver包含了soc平台的音频DMA和数字音频接口(I2S、PCM、SPDIF、AC97等)的配置和管理，它不包含任何与板子或机器相关的代码，该部分驱动由SOC厂商实现。

codec driver的一个重要原则就是要求codec驱动的平台无关性。它包含音频控件、音频接口、DAPM的定义等。codec的驱动一般由codec IC厂商实现。

machine driver主要是针对设备的，主要作用有三个： 1. 实现codec和platform的耦合，machine driver是板级上的codec和SOC之间的桥梁，描述二者如何连接。 2. 负责处理机器特有的的一些控件和音频事件(如板子上需要打开放大器等)。 3. 创建声卡。一般板卡的设计者只需要实现这部分的驱动。

单独的platform driver和codec driver是不能工作的，必须由machine driver把它们结合在一起才能完成整个设备的音频处理工作。ALSA框架将底层硬件划分为三部分后，使得platform和codec的驱动实现变得更加简单，二者依靠cpu_dai和codec_dai进行数据传输。这种结构下的音频数据流通路径如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/data_flow.png](https://photos.100ask.net/artinchip-docs/d213-devkit/data_flow-170675196155813.png)

#### 5.2.2. AIC实现架构[¶](#aic)

与常见的codec芯片不同，AIC的AudioCodec是SOC内置的一个模块，音频数据可以直接传输到AudioCodec模块，而不需要I2S这类音频接口。AudioCodec的音频数据流通路径如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/aic_data_flow.png](https://photos.100ask.net/artinchip-docs/d213-devkit/aic_data_flow-170675198884917.png)

若是一颗单独的codec芯片，只需要实现相应的codec driver，platform driver由SOC厂商实现，machine driver由板级开发者实现，并最终创建声卡。但是AudioCodec本身就是SOC中的一个模块，不需要I2S等音频接口进行数据传输，也不需要再单独实现machine driver，所以在实现SOC内置的AudioCodec模块的驱动时，除了实现音频通路控制和音频控件外，还需要实现声卡的创建，以便用户可以直接使用AudioCodec模块的驱动进行录音和播放。

AudioCodec模块不需要I2S接口，所以在驱动实现中并没有严格意义上的cpu_dai。但是ALSA框架在创建声卡时，需要根据cpu_dai和codec_dai的名字进行查找匹配，查找不到则不能创建声卡。所以为了能成功创建声卡，在AudioCodec的驱动实现中需要创建一个dummy_cpu_dai，该cpu_dai的作用是为了platform和codec的耦合，并不能对该cpu_dai进行任何操作。

综上，AIC的AudioCodec模块的驱动实现可以分为三部分：

1. platform driver的实现：
   - dma的注册和管理，用于在内存和AudioCodec之间传输数据
   - cpu_dai部分的定义，用于实现和codec driver的耦合
2. codec driver的实现：
   - codec_dai的注册和管理，用于实现和platform driver的耦合，以及对AudioCodec模块频率、采样率、采样深度的设置
   - DAPM音频路径和音频控件的管理
3. machine driver的实现：
   - 用于实现platform和codec的耦合，并创建声卡

### 5.3. 关键流程设计

#### 5.3.1. 初始化流程

AudioCodec模块的初始化流程如下：

1. 释放clock和reset信号
2. 释放AudioCodec模块的全局复位信号
3. 配置playback和capture的DMA传输参数
4. 注册codec端component driver和codec_dai driver
5. 注册platform端component driver和cpu_dai driver
6. 创建声卡设备，初始化声卡的各个参数实例
7. 注册声卡

#### 5.3.2. 音频通路设置

在AudioCodec驱动中，非常重要的环节是音频通路的设置，音频通路是音频数据的流通方向，音频通路设置的正确与否关系到声卡是否能正常工作。Linux内核中，引入了DAPM机制，对音频通路进行动态的上下电管理，降低系统的功耗。AudioCodec的音频通路设计如下：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/data_path.png](https://photos.100ask.net/artinchip-docs/d213-devkit/data_path-170675201157219.png)

如上图所示，在capture端，左右声道的音频信号依次经过DMICI/F、DF、HPF、DVC，输出的DMIC_OUT音频信号可以直接存储到RXFIFO中，或是经过混音器MIX0或MIX1直接输出到playback端。capture通路中，HPF和DVC都可以bypass，音频信号可以不经过这两个模块的处理，直接旁路到下一个模块。

在playback端，MIX0和MIX1的音频输入信号，可以来自TXFIFO，也可以来自DMIC_OUT。MIX0和MIX1的输出信号依次经过DVC、IF、FADE、SDM、PWM输出，实现音频的播放功能。playback通路中，DVC和FADE都可以bypass，音频信号可以不经过这两个模块的处理，直接旁路到下一个模块。

capture端的音频通路如下图所示：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/capture_data_path.png](https://photos.100ask.net/artinchip-docs/d213-devkit/capture_data_path-170675201888021.png)

playback端的音频通路如下图所示：

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/playback_data_path.png](https://photos.100ask.net/artinchip-docs/d213-devkit/playback_data_path-170675202580823.png)

#### 5.3.3. 音频通路的注册

在ALSA的DAPM中，音频通路上的结点用widget表示，widget可以认为是对音频控件的进一步封装，它把音频控件和电源管理进行了结合，同时还具备音频路径的连接功能。实现音频通路的注册，需要以下几个步骤：

1. 先把音频路径中的结点初始化为struct snd_soc_dapm_widget类型的实例：

```
static const struct snd_soc_dapm_widget aic_codec_dapm_widgets[] = {
    SND_SOC_DAPM_ADC("DMICIF", "Capture-dmic", RX_DMIC_IF_CTRL_REG,
                    RX_DMIC_IF_EN, 0),
    /* MUX */
    SND_SOC_DAPM_MUX("PWM ch0", TX_PWM_CTRL_REG, TX_PWM0_EN,
                        0, &pwm0_output_mux),
    SND_SOC_DAPM_MUX("PWM ch1", TX_PWM_CTRL_REG, TX_PWM1_EN,
                        0, &pwm1_output_mux),
    SND_SOC_DAPM_MUX("HPF", SND_SOC_NOPM, 0, 0, &hpf_mux),
    SND_SOC_DAPM_MUX("FADE ch0", SND_SOC_NOPM, 0, 0, &fade0_mux),
    SND_SOC_DAPM_MUX("FADE ch1", SND_SOC_NOPM, 0, 0, &fade1_mux),
    SND_SOC_DAPM_MUX("ADC HPF", SND_SOC_NOPM, 0, 0, &adc_hpf_mux),

    /* Sigma-Delta Modulation */
    SND_SOC_DAPM_DAC("SDM ch0", "Playback", TX_SDM_CTRL_REG,
                    TX_SDM_CH0_EN, 0),
    SND_SOC_DAPM_DAC("SDM ch1", "Playback", TX_SDM_CTRL_REG,
                    TX_SDM_CH1_EN, 0),
    /* PGA */
    SND_SOC_DAPM_PGA("DVC 0", ADC_DVC0_CTRL_REG, ADC_DVC0_CTRL_DVC0_EN,
            0, NULL, 0),
    SND_SOC_DAPM_PGA("DVC 1", RX_DVC_1_2_CTRL_REG, RX_DVC1_EN, 0, NULL, 0),
    SND_SOC_DAPM_PGA("DVC 2", RX_DVC_1_2_CTRL_REG, RX_DVC2_EN, 0, NULL, 0),
    SND_SOC_DAPM_PGA("DVC 3", TX_DVC_3_4_CTRL_REG, TX_DVC3_EN, 0, NULL, 0),
    SND_SOC_DAPM_PGA("DVC 4", TX_DVC_3_4_CTRL_REG, TX_DVC4_EN, 0, NULL, 0),
    SND_SOC_DAPM_PGA("PGA", ADC_CTL1_REG, ADC_CTL1_PGA_EN, 0, NULL, 0),

    /* Mixer */
    SND_SOC_DAPM_MIXER("MIXER0", SND_SOC_NOPM, 0, 0,
                aic_codec_mixer0_controls,
                ARRAY_SIZE(aic_codec_mixer0_controls)),
    SND_SOC_DAPM_MIXER("MIXER1", SND_SOC_NOPM, 0, 0,
                aic_codec_mixer1_controls,
                ARRAY_SIZE(aic_codec_mixer1_controls)),

    /* SUPPLY */
    SND_SOC_DAPM_SUPPLY("FADE", FADE_CTRL0_REG, FADE_CTRL0_EN, 0, NULL, 0),
    SND_SOC_DAPM_SUPPLY("IF", TX_PLAYBACK_CTRL_REG, TX_PLAYBACK_IF_EN,
                        0, NULL, 0),
    SND_SOC_DAPM_SUPPLY("Mic Bias", ADC_CTL1_REG, ADC_CTL1_MBIAS_EN,
                        0, NULL, 0),
    SND_SOC_DAPM_SUPPLY("TX GLBEN", GLOBE_CTL_REG, GLOBE_TX_GLBEN,
                        0, NULL, 0),
    SND_SOC_DAPM_SUPPLY("RX GLBEN", GLOBE_CTL_REG, GLOBE_RX_GLBEN,
                        0, NULL, 0),

    SND_SOC_DAPM_DAC("IF ch0", "Playback", TX_PLAYBACK_CTRL_REG,
                    TX_IF_CH0_EN, 0),
    SND_SOC_DAPM_DAC("IF ch1", "Playback", TX_PLAYBACK_CTRL_REG,
                    TX_IF_CH1_EN, 0),

    /* AIF OUT */
    SND_SOC_DAPM_AIF_OUT("AUDOUTL", "Playback", 0, TXFIFO_CTRL_REG,
                            TXFIFO_CH0_EN, 0),
    SND_SOC_DAPM_AIF_OUT("AUDOUTR", "Playback", 1, TXFIFO_CTRL_REG,
                            TXFIFO_CH1_EN, 0),

    /* AIF IN */
    SND_SOC_DAPM_AIF_IN("DMICOUTL", "Capture-dmic", 0, DMIC_RXFIFO_CTRL_REG,
                        DMIC_RXFIFO_CH0_EN, 0),
    SND_SOC_DAPM_AIF_IN("DMICOUTR", "Capture-dmic", 1, DMIC_RXFIFO_CTRL_REG,
                        DMIC_RXFIFO_CH1_EN, 0),
    SND_SOC_DAPM_AIF_IN("ADCOUT", "Capture-adc", 0, ADC_RXFIFO_CTRL_REG,
                        ADC_RXFIFO_EN, 0),
    /* ADC */
    SND_SOC_DAPM_ADC("ADC", "ADC Capture-adc", ADC_CTL1_REG,
                        ADC_CTL1_ADC_EN, 0),

    SND_SOC_DAPM_INPUT("AMIC"),
    SND_SOC_DAPM_INPUT("DMIC"),
    SND_SOC_DAPM_OUTPUT("SPK_OUT0"),
    SND_SOC_DAPM_OUTPUT("SPK_OUT1"),
};
```

1. 利用实例化的widget定义route信息。DAPM中，利用struct snd_soc_dapm_route结构体表示两个widget的连接关系。`struct snd_soc_dapm_route按照 *{“目的widget”, “控件”， “源widget”}* `的方式进行定义。

```
static const struct snd_soc_dapm_route aic_codec_dapm_route[] = {
    {"DMICOUTL", NULL, "RX GLBEN"},
    {"DMICOUTR", NULL, "RX GLBEN"},
    {"DMICIF", NULL, "DMIC"},
    {"HPF", "Bypass", "DMICIF"},
    {"HPF", "HPF Enable", "DMICIF"},
    {"DVC 1", NULL, "HPF"},
    {"DVC 2", NULL, "HPF"},
    {"DMICOUTL", NULL, "DVC 1"},
    {"DMICOUTR", NULL, "DVC 2"},
#ifdef CONFIG_SND_SOC_AIC_CODEC_V1
    {"ADCOUT", NULL, "RX GLBEN"},
    {"AMIC", NULL, "Mic Bias"},
    {"PGA", NULL, "AMIC"},
    {"ADC", NULL, "PGA"},
    {"ADC HPF", "Bypass", "ADC"},
    {"ADC HPF", "HPF Enable", "ADC"},
    {"DVC 0", NULL, "ADC HPF"},
    {"ADCOUT", NULL, "DVC 0"},
#endif

    {"AUDOUTL", NULL, "TX GLBEN"},
    {"AUDOUTR", NULL, "TX GLBEN"},
    /* MIXER */
    {"MIXER0", "audoutl switch", "AUDOUTL"},
    {"MIXER0", "audoutr switch", "AUDOUTR"},
    {"MIXER0", "dmicoutl switch", "DMICOUTL"},
    {"MIXER0", "dmicoutr switch", "DMICOUTR"},
#ifdef CONFIG_SND_SOC_AIC_CODEC_V1
    {"MIXER0", "adcout switch", "ADCOUT"},
#endif

    {"MIXER1", "audoutl switch", "AUDOUTL"},
    {"MIXER1", "audoutr switch", "AUDOUTR"},
    {"MIXER1", "dmicoutl switch", "DMICOUTL"},
    {"MIXER1", "dmicoutr switch", "DMICOUTR"},
#ifdef CONFIG_SND_SOC_AIC_CODEC_V1
    {"MIXER1", "adcout switch", "ADCOUT"},
#endif

    {"FADE ch0", NULL, "FADE"},
    {"FADE ch1", NULL, "FADE"},
    {"IF ch0", NULL, "IF"},
    {"IF ch1", NULL, "IF"},

    {"DVC 3", NULL, "MIXER0"},
    {"IF ch0", NULL, "DVC 3"},
    {"FADE ch0", "Bypass", "IF ch0"},
    {"FADE ch0", "Fade Enable", "IF ch0"},
    {"SDM ch0", NULL, "FADE ch0"},
    {"PWM ch0", "Single_ended", "SDM ch0"},
    {"PWM ch0", "Differential", "SDM ch0"},
    {"SPK_OUT0", NULL, "PWM ch0"},

    {"DVC 4", NULL, "MIXER1"},
    {"IF ch1", NULL, "DVC 4"},
    {"FADE ch1", "Bypass", "IF ch1"},
    {"FADE ch1", "Fade Enable", "IF ch1"},
    {"SDM ch1", NULL, "FADE ch1"},
    {"PWM ch1", "Single_ended", "SDM ch1"},
    {"PWM ch1", "Differential", "SDM ch1"},
    {"SPK_OUT1", NULL, "PWM ch1"},
};
```

1. 将上面定义的两个数组赋值给codec的component driver

```
static const struct snd_soc_component_driver aic_codec_component = {
    .controls = aic_codec_controls,
    .num_controls = ARRAY_SIZE(aic_codec_controls),
    .dapm_widgets = aic_codec_dapm_widgets,
    .num_dapm_widgets = ARRAY_SIZE(aic_codec_dapm_widgets),
    .dapm_routes = aic_codec_dapm_route,
    .num_dapm_routes = ARRAY_SIZE(aic_codec_dapm_route),
    .idle_bias_on = 1,
    .use_pmdown_time = 1,
    .endianness = 1,
    .non_legacy_dai_naming = 1,
};
```

1. 调用devm_snd_soc_register_component，完成音频路径的注册

#### 5.3.4. 音频控件设置[¶](#id8)

音频通路是音频数据流通的路径，而音频控件是负责音量大小的调节，以及一些开关的控制等功能。AudioCodec的音频控件有DVC的音量调节，DVC、HPF、FADE旁路选择，MIX的增益使能，以及DMICI/F数据交换开关等。与音频通路的widget不同，音频控件一般是不具有动态上下电控制功能的。音频控件的注册需要三个步骤：

1. 定义struct snd_kcontrol_new类型的音频控件

```
static const struct snd_kcontrol_new aic_codec_controls[] = {
    SOC_DOUBLE_TLV("DMICIN Capture Volume", RX_DVC_1_2_CTRL_REG,
                    RX_DVC1_GAIN, RX_DVC2_GAIN,
                    0xFF, 0, aic_codec_dvc_scale),
    SOC_DOUBLE_TLV("AUDIO Playback Volume", TX_DVC_3_4_CTRL_REG,
                    TX_DVC3_GAIN, TX_DVC4_GAIN,
                    0xFF, 0, aic_codec_dvc_scale),
#ifdef CONFIG_SND_SOC_AIC_CODEC_V1
    SOC_SINGLE_TLV("ADC Capture Volume", ADC_DVC0_CTRL_REG,
                    ADC_DVC0_CTRL_DVC0_GAIN,
                    0xFF, 0, aic_codec_dvc_scale),
    SOC_SINGLE_TLV("PGA Gain", ADC_CTL2_REG, ADC_CTL2_PGA_GAIN_SEL,
                    0xF, 0, aic_pga_scale),
#endif
    SOC_SINGLE_TLV("MIX1AUDL Playback Gain", TX_MIXER_CTRL_REG,
                    TX_MIXER1_AUDOUTL_GAIN, 1,
                    1, aic_mixer_source_gain_scale),
    SOC_SINGLE_TLV("MIX1AUDR Playback Gain", TX_MIXER_CTRL_REG,
                    TX_MIXER1_AUDOUTR_GAIN, 1,
                    1, aic_mixer_source_gain_scale),
    SOC_SINGLE_TLV("MIX1DMICL Playback Gain", TX_MIXER_CTRL_REG,
                    TX_MIXER1_DMICOUTL_GAIN, 1,
                    1, aic_mixer_source_gain_scale),
    SOC_SINGLE_TLV("MIX1DMICR Playback Gain", TX_MIXER_CTRL_REG,
                    TX_MIXER1_DMICOUTR_GAIN, 1,
                    1, aic_mixer_source_gain_scale),
#ifdef CONFIG_SND_SOC_AIC_CODEC_V1
    SOC_SINGLE_TLV("MIX1ADC Playback Gain", TX_MIXER_CTRL_REG,
                    TX_MIXER1_ADCOUT_GAIN, 1,
                    1, aic_mixer_source_gain_scale),
#endif
    SOC_SINGLE_TLV("MIX0AUDL Playback Gain", TX_MIXER_CTRL_REG,
                    TX_MIXER0_AUDOUTL_GAIN, 1,
                    1, aic_mixer_source_gain_scale),
    SOC_SINGLE_TLV("MIX0AUDR Playback Gain", TX_MIXER_CTRL_REG,
                    TX_MIXER0_AUDOUTR_GAIN, 1,
                    1, aic_mixer_source_gain_scale),
    SOC_SINGLE_TLV("MIX0DMICL Playback Gain", TX_MIXER_CTRL_REG,
                    TX_MIXER0_DMICOUTL_GAIN, 1,
                    1, aic_mixer_source_gain_scale),
    SOC_SINGLE_TLV("MIX0DMICR Playback Gain", TX_MIXER_CTRL_REG,
                    TX_MIXER0_DMICOUTR_GAIN, 1,
                    1, aic_mixer_source_gain_scale),
#ifdef CONFIG_SND_SOC_AIC_CODEC_V1
    SOC_SINGLE_TLV("MIX0ADC Playback Gain", TX_MIXER_CTRL_REG,
                    TX_MIXER0_ADCOUT_GAIN, 1,
                    1, aic_mixer_source_gain_scale),
#endif
    SOC_ENUM("Data Swap Switch", dmicif_data_enum),
    SOC_ENUM("RXFIFO Delay Time", dmic_rx_dlt_length_enum),
    SOC_ENUM("RXFIFO Dealy Switch", dmic_rx_dlt_en_enum),
    SOC_ENUM("AMIC bias voltage level", mic_bias_voltage_enum),
    SOC_ENUM("PWM0 mode select", pwm0_mode_enum),
    SOC_ENUM("PWM1 mode select", pwm1_mode_enum),
    SOC_ENUM("MIXER0 swicth", mixer0_enable_enum),
    SOC_ENUM("MIXER1 swicth", mixer1_enable_enum),
};
```

1. 将定义的音频控件数组赋值给codec的component driver

```
static const struct snd_soc_component_driver aic_codec_component = {
    .controls = aic_codec_controls,
    .num_controls = ARRAY_SIZE(aic_codec_controls),
    .dapm_widgets = aic_codec_dapm_widgets,
    .num_dapm_widgets = ARRAY_SIZE(aic_codec_dapm_widgets),
    .dapm_routes = aic_codec_dapm_route,
    .num_dapm_routes = ARRAY_SIZE(aic_codec_dapm_route),
    .idle_bias_on = 1,
    .use_pmdown_time = 1,
    .endianness = 1,
    .non_legacy_dai_naming = 1,
};
```

1. 调用devm_snd_soc_register_component完成音频控件的注册。

#### 5.3.5. dmaengine_pcm注册

在d211中，capture端新增了amic通路。在DMA传输时，amic和dmic使用不同的dma id。所以为了区分不同的dma id，在DTS中新增了一个结点，用于注册一个新的dma pcm设备。并新增aic-codec-analog.c文件，在该文件中实现对新的dma pcm设备的注册。

#### 5.3.6. period-bytes对齐

在使用DMA传输音频数据时，DMA要求每次传输的数据长度必须128bytes/8bytes对齐。在ALSA框架下，音频数据以period为周期调用DMA传输，每次传输的数据长度为period bytes。所以，必须满足period bytes按照128bytes/8bytes对齐。ALSA中提供了相应的API接口(snd_pcm_hw_constraint_step)来满足这一需求。

```
static int aic_codec_startup(struct snd_pcm_substream *substream,
            struct snd_soc_dai *dai)
{
    int ret;

    /* Make sure that the period bytes are 8/128 bytes aligned according to
    * the DMA transfer requested.
    */
#ifdef CONFIG_SND_SOC_AIC_CODEC_V1
    ret = snd_pcm_hw_constraint_step(substream->runtime, 0,
                SNDRV_PCM_HW_PARAM_PERIOD_BYTES, 8);
    if (ret < 0) {
        dev_err(dai->dev, "Could not apply period step: %d\n", ret);
        return ret;
    }

    ret = snd_pcm_hw_constraint_step(substream->runtime, 0,
                SNDRV_PCM_HW_PARAM_BUFFER_BYTES, 8);
    if (ret < 0) {
        dev_err(dai->dev, "Could not apply buffer step: %d\n", ret);
        return ret;
    }
#else
    ret = snd_pcm_hw_constraint_step(substream->runtime, 0,
                SNDRV_PCM_HW_PARAM_PERIOD_BYTES, 128);
    if (ret < 0) {
        dev_err(dai->dev, "Could not apply period step: %d\n", ret);
        return ret;
    }

    ret = snd_pcm_hw_constraint_step(substream->runtime, 0,
                SNDRV_PCM_HW_PARAM_BUFFER_BYTES, 128);
    if (ret < 0) {
        dev_err(dai->dev, "Could not apply buffer step: %d\n", ret);
        return ret;
    }
#endif

    return ret;
}
```

#### 5.3.7. pop音消除

在音频的驱动设计中，播放上下电时的pop音是经常遇到的一个问题。pop音产生的主要原因如下：

1. 音频通路中的控件还未全部闭合时，功放却已处于工作状态。此时当其它控件闭合形成播放通路时，通路中电流的变化经功放放大，形成pop音。
2. 在正常播放过程中，播放不同采样率的音频文件时，导致audio频率切换，此时也容易产生pop音。例如，当前播放的是48K采样率的音频文件，下一个音频文件的采样率是22.05K，需要切换audio模块的工作频率，切换频率时有可能产生pop音。

基于以上原因，为了消除pop音的问题，audio的驱动设计中做了以下几点设计：

1. 在DTS中添加gpio引脚，用于控制功放的使能和禁用

```
&codec {
    pinctrl-names = "default";
    pinctrl-0 = <&amic_pins>, <&dmic_pins_a>, <&spk_pins_b>;
    pa-gpios = <&gpio_f 13 GPIO_ACTIVE_LOW>;
    status = "okay";
};
```

1. 调整音频通路中的上下电顺序，确保通路最后才使能功放。ALSA中提供的widget宏已经对上下电做好了排序，调用相应的宏定义widget即可。

```
static const struct snd_soc_dapm_widget aic_codec_card_dapm_widgets[] = {
    SND_SOC_DAPM_SPK("Speaker", aic_codec_spk_event),
};

static int aic_codec_spk_event(struct snd_soc_dapm_widget *w,
                    struct snd_kcontrol *k, int event)
{
    if (SND_SOC_DAPM_EVENT_ON(event) && !IS_ERR_OR_NULL(gpiod_pa))
        gpiod_set_value(gpiod_pa, 1);
    else if (SND_SOC_DAPM_EVENT_OFF(event) && !IS_ERR_OR_NULL(gpiod_pa))
        gpiod_set_value(gpiod_pa, 0);

    msleep(100);

    return 0;
}

static const struct snd_soc_dapm_widget aic_codec_dapm_widgets[] = {
    ...
    SND_SOC_DAPM_SUPPLY("TX GLBEN", GLOBE_CTL_REG, GLOBE_TX_GLBEN,
                        0, NULL, 0),
    SND_SOC_DAPM_SUPPLY("RX GLBEN", GLOBE_CTL_REG, GLOBE_RX_GLBEN,
                        0, NULL, 0),
    ...
}
```

在使能和禁用功放的widget时，通过aic_codec_spk_event回调函数使能和禁用功放。soc-dapm.c文件的dapm_up_seq和dapm_down_seq数组定义了各个widget的上下电顺序。而由SND_SOC_DAPM_SPK宏定义的功放widget，处于上电时最后上电，掉电时较早掉电的位置。将TX和RX的全局使能加入widget链路，确保先于功放使能。

1. audio需要调整频率时，先关闭功放，频率调整后，再将功放恢复到频率调整前的状态。

#### 5.3.8. 创建声卡

创建声卡的一个关键步骤是实现platform driver和codec driver的耦合，ALSA框架中，实现二者耦合是通过struct snd_soc_dai_link实现的。在调用devm_snd_soc_register_component时，会把相应的platform和codec所对应的component注册到链表中。在注册声卡时，会根据snd_soc_dai_link中定义的codecs->dai_name和cpus->dai_name进行查找，如果在链表中可以查找到相应的dai，则耦合成功，否则会耦合失败。

### 5.4. 数据结构设计

管理AudioCodec的配置信息

```
struct aic_codec {
    struct device *dev;
    struct regmap *regmap;
    struct clk *clk;
    struct reset_control *rst;
    struct resource *res;
    struct snd_dmaengine_dai_dma_data  capture_dma_dmic;
    struct snd_dmaengine_dai_dma_data  capture_dma_adc;
    struct snd_dmaengine_dai_dma_data  playback_dma;
};
```

### 5.5. 接口设计

#### 5.5.1. aic_codec_trigger

| 函数原型 | static int aic_codec_trigger(struct snd_pcm_substream *substream, int cmd, struct snd_soc_dai *dai) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | AudioCodec的触发函数，根据cmd执行不同的操作                  |
| 参数定义 | substream：指向需要执行cmd的substreamcmd：需要执行的操作dai：unused |
| 返回值   | 0：执行成功-EINVAL：参数非法                                 |
| 注意事项 | 可以传递的cmd参数有：SNDRV_PCM_TRIGGER_STARTSNDRV_PCM_TRIGGER_RESUMESNDRV_PCM_TRIGGER_PAUSE_RELEASESNDRV_PCM_TRIGGER_STOPSNDRV_PCM_TRIGGER_SUSPENDSNDRV_PCM_TRIGGER_PAUSE_PUSH |

#### 5.5.2. aic_codec_get_mod_freq

| 函数原型 | static unsigned int aic_codec_get_mod_freq(struct aic_codec *codec, struct snd_pcm_hw_params *params) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 根据传入的参数params，获取需要设置的AudioCodec模块的时钟频率 |
| 参数定义 | codec：指向aic_codec的指针params：传入的硬件参数指针         |
| 返回值   | 执行成功返回需要设置的codec时钟频率，否则返回0               |
| 注意事项 |                                                              |

#### 5.5.3. aic_codec_hw_params

| 函数原型 | static int aic_codec_hw_params(struct snd_pcm_substream *substream, struct snd_pcm_hw_params *params, struct snd_soc_dai *dai) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | 根据传入的params参数，设置codec模块的时钟及采样率            |
| 参数定义 | substream：指向需要设置的subtsreamparams：需要设置的硬件参数dai：unused |
| 返回值   | 0：执行成功-EINVAL：参数非法                                 |
| 注意事项 |                                                              |

#### 5.5.4. aic_codec_startup

| 函数原型 | static int aic_codec_startup(struct snd_pcm_substream *substream, struct snd_soc_dai *dai) |
| -------- | ------------------------------------------------------------ |
| 功能说明 | AudioCodec的startup函数，执行音频流trigger前需要设置的操作。 此处用于设置period和dma buffer的对齐方式 |
| 参数定义 | substream：指向需要执行startup的substreamdai：设置的dai指针  |
| 返回值   | 0：执行成功-EINVAL：参数非法                                 |

#### 5.5.5. aic_codec_dai_probe



| 函数原型 | static int aic_codec_dai_probe(struct snd_soc_dai *dai) |
| -------- | ------------------------------------------------------- |
| 功能原型 | 执行dma的初始化操作                                     |
| 参数定义 | dai：指向codec_dai的指针                                |
| 返回值   | 0：执行成功                                             |
| 注意事项 |                                                         |

## 6. 常见问题

1. 执行amixer时报错，显示找不到alsa.conf配置文件

![../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/amixer_error.png](https://photos.100ask.net/artinchip-docs/d213-devkit/amixer_error-170675210571925.png)

该问题的原因是找不到ALSA的路径，可以通过以下命令解决：

```
export ALSA_CONFIG_DIR=/usr/share/alsa/
```