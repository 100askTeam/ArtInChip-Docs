---
sidebar_position: 3
---
 LVGL

 1. LVGL简介

![../../_ https://photos.100ask.net/artinchip-docs/d213-devkit/home_banner.jpg]( https://photos.100ask.net/artinchip-docs/d213-devkit/home_banner-17068601994711.jpg)

LVGL(轻量级和通用图形库)是一个免费和开源的图形库，它提供了创建嵌入式 GUI 所需的一切，具有易于使用的图形元素，美丽的视觉效果和低内存占用

# 1.1. 主要特性

- 丰富且强大的模块化图形组件：按钮、图标、列表、互动条、图片等
- 先进的图形界面：动画、抗锯齿、透明度、平滑滚动等效果
- 支持不同的输入设备包括键盘，鼠标，触摸屏，编码器等
- UTF-8编码支持多语言
- 多显示器支持，可以同时使用多个TFT或单色显示
- 可以通过类 CSS的方式来设计、布局图形界面
- 不限制芯片类型、硬件，可在各种微控制器或显示器上使用LVGL
- 配置可裁剪（最低资源占用：64 kB Flash，16 kB RAM）
- 支持操作系统、外部存储和GPU，但都不是硬性要求
- 即使单缓冲区(frame buffer)也能实现高级图形效果
- 不需要嵌入式硬件环境在PC模拟器就可以调试GUI
- 支持 Micropython 编程
- 有用于快速GUI设计的教程、示例、主题
- 详尽的文档以及 API 参考手册，可线上查阅或可下载为 PDF 格式
- 在 MIT 许可下免费和开源

# 1.2. 配置要求

- 16、32或64位微控制器或处理器
- 最低 16 MHz 时钟频率
- Flash/ROM: >64 kB(建议 180 kB)
- RAM: 8 kB(建议 24 kB)
- 显示缓冲区: >水平分辨率像素(建议为1/10屏幕大小)
- 支持C99编程
- 具备基本的C或C++知识

 2. 使用指南

# 2.1. 代码目录

```
source/artinchip/lvgl-ui
├── lvgl           // lvgl库
├── lv_drivers     // lvgl平台适配
├── base_ui        // base_ui测试用例
├── lv_conf.h      // lvgl配置文件
└── main.c         // lvgl应用入口
```

# 2.2. LVGL整体流程

![../../_ https://photos.100ask.net/artinchip-docs/d213-devkit/key_process.png]( https://photos.100ask.net/artinchip-docs/d213-devkit/key_process-17068602811643.png)

图 2.54 *整体流程*

LVGL框架的运行都是基于LVGL中定义的Timer定时器，系统需要给LVGL一个“心跳”， LVGL才能正常的运转起来，两个关键的函数：

- lv_tick_get(), 获取以ms为单位的tick时间
- lv_timer_handler()，在while循环中的基于定时器的任务处理，函数lv_task_handler会调用lv_timer_handler, lv_tick_get 决定了lv_timer_handler基于定时器的任务处理的时间的准确性

其中在文件lv_hal_tick.c中的lv_tick_get的实现代码如下：

```
uint32_t lv_tick_get(void)
{
#if LV_TICK_CUSTOM == 0

    /*If `lv_tick_inc` is called from an interrupt while `sys_time` is read
    *the result might be corrupted.
    *This loop detects if `lv_tick_inc` was called while reading `sys_time`.
    *If `tick_irq_flag` was cleared in `lv_tick_inc` try to read again
    *until `tick_irq_flag` remains `1`.*/
    uint32_t result;
    do {
        tick_irq_flag = 1;
        result        = sys_time;
    } while(!tick_irq_flag); /*Continue until see a non interrupted cycle*/

    return result;
#else
    return LV_TICK_CUSTOM_SYS_TIME_EXPR;
#endif
}
```

在头文件lv_conf.h中定义了上述函数中的LV_TICK_CUSTOM_SYS_TIME_EXPR

```
#define LV_TICK_CUSTOM 1
#if LV_TICK_CUSTOM
    #define LV_TICK_CUSTOM_INCLUDE <aic_ui.h>
    #define LV_TICK_CUSTOM_SYS_TIME_EXPR (custom_tick_get()) /*system time in ms*/
#endif   /*LV_TICK_CUSTOM*/
```

LVGL应用主函数代码如下所示：

```
#define IMG_CACHE_NUM 10

#if LV_USE_LOG
static void lv_user_log(const char *buf)
{
    printf("%s\n", buf);
}
#endif /* LV_USE_LOG */

int main(void)
{
#if LV_USE_LOG
    lv_log_register_print_cb(lv_user_log);
#endif /* LV_USE_LOG */

    /*LittlevGL init*/
    lv_init();

#if LV_IMG_CACHE_DEF_SIZE == 1
    lv_img_cache_set_size(IMG_CACHE_NUM);
#endif

    aic_dec_create();

    lv_port_disp_init();
    lv_port_indev_init();

    /*Create a Demo*/
#if LV_USE_DEMO_MUSIC == 1
    void lv_demo_music(void);
    lv_demo_music();
#else
    void base_ui_init();
    base_ui_init();
#endif

    /*Handle LitlevGL tasks (tickless mode)*/
    while (1) {
        lv_timer_handler();
        usleep(1000);
    }

    return 0;
}

/*Set in lv_conf.h as `LV_TICK_CUSTOM_SYS_TIME_EXPR`*/
uint32_t custom_tick_get(void)
{
    static uint64_t start_ms = 0;
    if (start_ms == 0) {
        struct timeval tv_start;
        gettimeofday(&tv_start, NULL);
        start_ms = (tv_start.tv_sec * 1000000 + tv_start.tv_usec) / 1000;
    }

    struct timeval tv_now;
    gettimeofday(&tv_now, NULL);
    uint64_t now_ms;
    now_ms = (tv_now.tv_sec * 1000000 + tv_now.tv_usec) / 1000;

    uint32_t time_ms = now_ms - start_ms;
    return time_ms;
}
```

- 其中在函数lv_port_disp_init()中实现显示接口的对接以及硬件2D加速的对接
- 在函数lv_port_indev_init()中实现触摸屏的对接
- 函数aic_dec_create()注册硬件解码器
- 用户只需替换base_ui_init()的实现来对接自己的应用

# 2.3. LVGL层次结构

![../../_ https://photos.100ask.net/artinchip-docs/d213-devkit/struct.png]( https://photos.100ask.net/artinchip-docs/d213-devkit/struct-17068603027715.png)

图 2.55 *层次结构*

- LVGL的display是对显示驱动的封装和抽象
- display包含Active Screen、Top layer、System layer
- Active Screen、Top layer、System layer是不同的screen对象，这里的screen用layer表达更准确一点， 表示的是图层的概念，其中Active Screen在最底层，System layer在最顶层
- 一般在Active Screen实现不同的app界面，用户可以创建多个screen，但只能有一个screen设置为Active Screen
- Top layer在Active Screen之上，可以用来创建弹出窗口，Top layer永远在Active Screen之上
- System layer在最顶层，比如鼠标可以在System layer，永远不会被遮挡

![../../_ https://photos.100ask.net/artinchip-docs/d213-devkit/layer.png]( https://photos.100ask.net/artinchip-docs/d213-devkit/layer-17068603155957.png)

图 2.56 *图层叠加*

# 2.4. 父子结构

LVGL是面向对象的基于父子结构的设计，每一个对象都包含一个父对象（screen对象除外）， 但是一个父对象可以包含任意数量的子对象。

```
/*
 * 创建对象的时候，需要传入父对象的指针，
 * 如果父对象对NULL, 表示创建的是screen对象
 */
lv_obj_create(NULL);
```

## 2.4.1. 父子对象一起移动

![../../_ https://photos.100ask.net/artinchip-docs/d213-devkit/move.png]( https://photos.100ask.net/artinchip-docs/d213-devkit/move-17068603413589.png)

图 2.57 *父子对象移动*

## 2.4.2. 子对象超出父对象部分不可见

![../../_ https://photos.100ask.net/artinchip-docs/d213-devkit/outside.png]( https://photos.100ask.net/artinchip-docs/d213-devkit/outside-170686038181011.png)

图 2.58 *子对象可见区域*

# 2.5. 显示对接

主要包括三部分：

1. 绘制buffer初始化
2. flush_cb对接
3. 2D硬件加速对接

## 2.5.1. 绘制buffer初始化

绘制buffer初始化函数如下:

```
void lv_disp_draw_buf_init(lv_disp_draw_buf_t * draw_buf, void * buf1, void * buf2, uint32_t size_in_px_cnt)
```

- buf1：当为单缓冲或多缓冲的时候，都要设置此buffer
- buf2：当选择双缓冲的时候，需要配置此buffer，单缓冲不需要
- size_in_px_cnt： 以像素为单位的buf大小

![../../_ https://photos.100ask.net/artinchip-docs/d213-devkit/double_frame.png]( https://photos.100ask.net/artinchip-docs/d213-devkit/double_frame-170686040394213.png)

图 2.59 *双缓冲*

## 2.5.2. flush_cb对接

flush_cb回调函数的处理流程，我们以双缓冲为例进行说明，绘制模式有full_refresh和direct_mode两种：

1. 全刷新模式，每一帧都刷新整个显示屏

![../../_ https://photos.100ask.net/artinchip-docs/d213-devkit/full_flush_cb.png]( https://photos.100ask.net/artinchip-docs/d213-devkit/full_flush_cb-170686041150515.png)

图 2.60 *全刷新模式*

在虚线框中为flush_cb中处理部分，在全刷新的流程中，直接通过 pan_display接口送当前绘制buffer到显示，然后等待vsync中断， 等到中断后，当前的绘制buffer就真正的在显示屏中显示出来，然后调用lv_disp_flush_ready通知LVGL框架已经flush结束， 最后在LVGL框架中会进行绘制buffer的交换。

1. 局部刷新，每一帧只刷新需要更新的无效区域（可以有多个无效区域）

![../../_ https://photos.100ask.net/artinchip-docs/d213-devkit/invalid_area.png]( https://photos.100ask.net/artinchip-docs/d213-devkit/invalid_area-170686042168717.png)

图 2.61 *无效区域*

![../../_ https://photos.100ask.net/artinchip-docs/d213-devkit/direct_flush_cb.png]( https://photos.100ask.net/artinchip-docs/d213-devkit/direct_flush_cb-170686043396819.png)

图 2.62 *局部刷新模式*

上图中的示例，为了方便描述每一帧都有两个无效区域（invalid area0 和invalid area1），LVGL可以支持更多的无效区域，到了最后一个无效区域， 说明当前帧的数据已经处理完，才把绘制buffer送显示，然后进行buffer交换

flush_cb的实现代码fbdev_flush如下：

```
static void fbdev_flush(lv_disp_drv_t * drv, const lv_area_t * area, lv_color_t *color_p)
{
    lv_disp_t * disp = _lv_refr_get_disp_refreshing();
    lv_disp_draw_buf_t * draw_buf = lv_disp_get_draw_buf(disp);

    if (!disp->driver->direct_mode || draw_buf->flushing_last) {
        struct fb_var_screeninfo var = {0};

        if (ioctl(g_fb, FBIOGET_VSCREENINFO, &var) < 0) {
            LV_LOG_WARN("ioctl FBIOGET_VSCREENINFO");
            return;
        }

        if (color_p == (lv_color_t *)g_frame_buf[0]) {
            var.xoffset = 0;
            var.yoffset = 0;
        } else {
            var.xoffset = 0;
            var.yoffset = disp_drv.ver_res;
        }

        if (ioctl(g_fb, FBIOPAN_DISPLAY, &var) == 0) {
            int zero = 0;
            if (ioctl(g_fb, AICFB_WAIT_FOR_VSYNC, &zero) < 0) {
                LV_LOG_WARN("ioctl AICFB_WAIT_FOR_VSYNC fail");
                return;
            }
        } else {
            LV_LOG_WARN("pan display err");
        }

        if (drv->direct_mode == 1) {
            for (int i = 0; i < disp->inv_p; i++) {
                if (disp->inv_area_joined[i] == 0) {
                    sync_disp_buf(drv, color_p, &disp->inv_areas[i]);
                }
            }
        }

        lv_disp_flush_ready(drv);
    } else {
        lv_disp_flush_ready(drv);
    }
}
```

## 2.5.3. 2D硬件加速对接

2D加速主要对接 lv_draw_ctx_t中的绘制函数

| 成员                        | 说明                                   | 是否硬件加速 |
| --------------------------- | -------------------------------------- | ------------ |
| void *buf                   | 当前要绘制的buffer                     | *-*          |
| const lv_area_t * clip_area | 绘制区域裁剪（以屏幕为参考的绝对坐标） | *-*          |
| void (*draw_rect)()         | 绘制矩形（包括圆角、阴影、渐变等）     | 否           |
| void (*draw_arc)()          | 绘制弧形                               | 否           |
| void (*draw_img_decoded)()  | 绘制已经解码后的图像                   | 是           |
| lv_res_t (*draw_img)()      | 绘制图像（包括图片解码）               | 是           |
| void (*draw_letter)()       | 绘制文字                               | 否           |
| void (*draw_line)()         | 绘制直线                               | 否           |
| void (*draw_polygon)()      | 绘制多边形                             | 否           |

在lv_draw_aic_ctx_t（重定义了lv_draw_sw_ctx_t）结构体中包含lv_draw_ctx_t和blend函数：

```
typedef struct {
    lv_draw_ctx_t base_draw;

    /** Fill an area of the destination buffer with a color*/
    void (*blend)(lv_draw_ctx_t * draw_ctx, const lv_draw_sw_blend_dsc_t * dsc);
} lv_draw_sw_ctx_t;
```

在draw_rect、draw_line等操作的功能由多个步骤组成，虽然我们没有对这些接口进行硬件加速，但是这些操作的部分实现 会调用到blend，我们对blend接口进行了硬件加速对接：

```
void lv_draw_aic_ctx_init(lv_disp_drv_t * drv, lv_draw_ctx_t * draw_ctx)
{
    lv_draw_sw_init_ctx(drv, draw_ctx);
    lv_draw_aic_ctx_t * aic_draw_ctx = (lv_draw_aic_ctx_t *)draw_ctx;

    aic_draw_ctx->blend = lv_draw_aic_blend;
    aic_draw_ctx->base_draw.draw_img = lv_draw_aic_draw_img;
    aic_draw_ctx->base_draw.draw_img_decoded = lv_draw_aic_img_decoded;

    return;
}
```

先调用lv_draw_sw_init_ctx函数把所有绘制操作都初始化为软件实现，然后对可以硬件加速的接口重新实现， 覆盖原来的软件实现。

## 2.5.4. 显示驱动注册

所有的显示相关功能都包含在lv_disp_drv_t结构体中：

1. 通过lv_disp_drv_init来初始化lv_disp_drv_t结构体
2. 通过lv_disp_draw_buf_init初始化绘制buffer
3. 通过回调flush_cb来注册显示接口
4. 通过lv_draw_aic_ctx_init来注册2D硬件加速相关接口
5. 通过lv_disp_drv_register来注册lv_disp_drv_t

在源文件lv_port_disp.c中的函数lv_port_disp_init配置刷新模式，局部刷新模式配置如下：

```
disp_drv.full_refresh = 0;
disp_drv.direct_mode = 1;
```

全刷新模式参数配置如下：

```
disp_drv.full_refresh = 1;
disp_drv.direct_mode = 0;
```

# 2.6. 硬件解码对接

## 2.6.1. lv_img_decoder_t注册

我们通过lv_img_decoder_t来注册硬件解码器接口，主要实现了三个接口：

| 函数              | 说明                               |
| ----------------- | ---------------------------------- |
| aic_decoder_info  | 获取图片宽、高、图片格式信息       |
| aic_decoder_open  | 申请解码输出buffer，硬件解码输出   |
| aic_decoder_close | 释放硬件解码资源（包括输出buffer） |

注册解码器过程；

```
void aic_dec_create()
{
    lv_img_decoder_t *aic_dec = lv_img_decoder_create();

    /* init frame info lists */
    mpp_list_init(&buf_list);
    lv_img_decoder_set_info_cb(aic_dec, aic_decoder_info);
    lv_img_decoder_set_open_cb(aic_dec, aic_decoder_open);
    lv_img_decoder_set_close_cb(aic_dec, aic_decoder_close);
}
```

绘制函数draw_img_decoded需要的解码后数据，需要通过注册解码器回调去获取， 这是我们默认的图片处理流程：

![../../_ https://photos.100ask.net/artinchip-docs/d213-devkit/draw_img_decoded.png]( https://photos.100ask.net/artinchip-docs/d213-devkit/draw_img_decoded-170686048071421.png)

图 2.63 *draw_img_decoded*

- 采用此流程需要额外申请一块解码buffer，占用内存增加
- 缓存解码后的buffer，下次再显示同样的image，不用重复解码，加快UI加载速度

当绘制函数为draw_img的时候，硬件解码在函数draw_img内部，无需注册解码回调函数，我们默认不采用此方法， 当在内存受限的场景下，可以评估此方法是否可满足场景需求。

![../../_ https://photos.100ask.net/artinchip-docs/d213-devkit/draw_img.png]( https://photos.100ask.net/artinchip-docs/d213-devkit/draw_img-170686049441723.png)

图 2.64 *draw_img*

- 采用此流程无需额外申请解码buffer，直接解码到绘制buffer
- 当需要进行alpha blending的时候，此方法不可行
- 每次都要重新对image解码，速度不如draw_img_decoded
- 当硬件解码不支持裁剪的时进行局部更新，此方法不可行

## 2.6.2. 图片cache机制

1. 采用lv_img_decoder_t提供的接口注册的解码器可以采用LVGL内部的图片缓冲机制， 在lv_conf.h 中宏定义LV_IMG_CACHE_DEF_SIZE为1的时候，表示打开图片缓冲机制， 当LV_IMG_CACHE_DEF_SIZE为0的时候，图片缓冲机制关闭。
2. 通过void lv_img_cache_set_size(uint16_t entry_cnt)来设置缓冲的图片张数，图片以张数为单位进行缓存。
3. 当图片缓存到设置的最大张数的时候，如果需要新的缓存，图片缓存机制内部会进行图片缓存价值的判断， 例如：如果某一张图片解码的时间比较久，或者某一张图片使用的更频繁，那么这种图片的缓存价值打分会更高， 优先缓存这些缓存价值更高的图片。

如果一些图片的读取时间或者解码时间比较长，采用图片缓存机制可以提升UI流畅性

# 2.7. LVGL库中demos使用

在目录luban/source/artinchip/lvgl-ui/lvgl/demos下lvgl官方提供了多个示例demo

1. 在lv_conf.h宏定义中打开#define LV_USE_DEMO_MUSIC 1， 则main.c中会调用相应的demo

```
    /*Create a Demo*/
#if LV_USE_DEMO_MUSIC == 1
    void lv_demo_music(void);
    lv_demo_music();
#else
    void base_ui_init();
    base_ui_init();
#endif
```

1. 如果要调用lvgl-ui/lvgl/demos下的benchmark，则需关闭LV_USE_DEMO_MUSIC， 打开宏定义#define LV_USE_DEMO_BENCHMARK 1， 修改main.c中的base_ui_init()为需要的demo入口函数即可, 如下所示：

   ```
       /*Create a Demo*/
   #if LV_USE_DEMO_MUSIC == 1
       void lv_demo_music(void);
       lv_demo_music();
   #else
       //void base_ui_init();
       //base_ui_init();
       void lv_demo_benchmark();
       lv_demo_benchmark();
   #endif
   ```

# 2.8. LVGL库中samples使用

官方LVGL库lvgl-ui/lvgl/examples目录下是各种控件的测试用例， 以调用get_started目录下的lv_example_get_started_1.c为例进行流程说明：

1. samples相应的宏定义在lv_conf.h中已经默认打开：#define LV_BUILD_EXAMPLES 1

2. 修改main.c中的入口函数：

   ```
   /*Create a Demo*/
   #if LV_USE_DEMO_MUSIC == 1
       void lv_demo_music(void);
       lv_demo_music();
   #else
       //void base_ui_init();
       //base_ui_init();
       void lv_example_get_started_1();
       lv_example_get_started_1();
   #endif
   ```

# 2.9. 第三方库支持

1. freetype库支持

   - 选择freetype包，在 Luban根目录下执行 `make menuconfig`，进入 menuconfig

   > ```
   > ArtInChip Luban SDK Configuration  --->
   >     Third-party packages  --->
   >     [*] freetype  --->
   > ```
   >
   > - 目录lvgl-ui/lvgl/examples/libs/freetype/lv_example_freetype_1.c下示例调用
   >
   >   在lv_conf.h头文件中打开宏定义
   >
   >   ```
   >   #define LV_USE_FREETYPE 1
   >   #define LV_BUILD_EXAMPLES 1
   >   ```
   >
   > - 修改main.c中的入口函数：
   >
   >   > ```
   >   > /*Create a Demo*/
   >   > #if LV_USE_DEMO_MUSIC == 1
   >   >     void lv_demo_music(void);
   >   >     lv_demo_music();
   >   > #else
   >   >     //void base_ui_init();
   >   >     //base_ui_init();
   >   >     void lv_example_freetype_1(void);
   >   >     lv_example_freetype_1();
   >   > #endif
   >   > ```
   >
   > - 设置lvgl-ui/lvgl/examples/libs/freetype/Lato-Regular.ttf字体的打包目录， 复制字体到lvgl-ui/base_ui/asserts/font目录下，则会把字体打包到系统目录/usr/local/share/lvgl_data/font目录下
   >
   > - 修改代码lv_example_freetype_1.c中字体文件路径
   >
   >   > ```
   >   > void lv_example_freetype_1(void)
   >   > {
   >   >     /*Create a font*/
   >   >     static lv_ft_info_t info;
   >   >     /*FreeType uses C standard file system, so no driver letter is required.*/
   >   >     //info.name = "./lvgl/examples/libs/freetype/Lato-Regular.ttf";
   >   >     info.name = "/usr/local/share/lvgl_data/font/Lato-Regular.ttf";
   >   >     info.weight = 24;
   >   >     info.style = FT_FONT_STYLE_NORMAL;
   >   >     info.mem = NULL;
   >   >     if(!lv_ft_font_init(&info)) {
   >   >         LV_LOG_ERROR("create failed.");
   >   >     }
   >   > 
   >   >     /*Create style with the new font*/
   >   >     static lv_style_t style;
   >   >     lv_style_init(&style);
   >   >     lv_style_set_text_font(&style, info.font);
   >   >     lv_style_set_text_align(&style, LV_TEXT_ALIGN_CENTER);
   >   > 
   >   >     /*Create a label with the new style*/
   >   >     lv_obj_t * label = lv_label_create(lv_scr_act());
   >   >     lv_obj_add_style(label, &style, 0);
   >   >     lv_label_set_text(label, "Hello world\nI'm a font created with FreeType");
   >   >     lv_obj_center(label);
   >   > }
   >   > ```

 3. SquareLine Studio

SquareLine GUI是LVGL官网推荐的GUI 图形化辅助设计工具，可使用LVGL图形库开发UI，且支持多个平台， 如MacOS、Windows和Linux。在该工具中，我们通过拖放就可以在屏幕上添加和移动小控件，图像和字体的处理也变得十分简单， 但不具备编译调试代码的功能，界面设计完成后需要导出工程到其他IDE工具进行模拟和调试。 可以通过访问LVGL官网 http://lvgl.io 获取更多信息。

# 3.1. 导出工程

SquareLine工具自带了LVGL官方提供的一些demo示例，在学习控件用法时候可以查看这些demo示例， 以打开Futuristic_Ebike为例，从SquareLIne工具左上角File菜单选择new或open, 在弹出的选择对话框中选择example选项卡，然后双击Futuristic_Ebike图标

> ![../../_ https://photos.100ask.net/artinchip-docs/d213-devkit/squareline_sample.png]( https://photos.100ask.net/artinchip-docs/d213-devkit/squareline_sample-17068607403971.png)
>
> 图 2.65 *example打开示意图*

Futuristic_Ebike工程打开后如下图所示，可以点击右上角的播放按钮，通过鼠标的滑动和点击事件来查看当前的UI效果， SquareLine 提供了widget拖拽功能，通过属性设置控件的一些行为动作，该工具还提供了便捷的动画设计功能。

> ![../../_ https://photos.100ask.net/artinchip-docs/d213-devkit/ebike.png]( https://photos.100ask.net/artinchip-docs/d213-devkit/ebike-17068607498003.png)
>
> 图 2.66 *工程窗口示意图*

UI效果调整或设计完成后，可以通过export导出功能导出UI文件或项目代码工程，UI文件是png资源图片通过SquareLine转换成C数组的源文件， 导出的项目工程是可以在相应的IDE工具进行模拟调试的工程，例如Eclipse, Vistal Studio, VsCode等。

> ![../../_ https://photos.100ask.net/artinchip-docs/d213-devkit/new_project.png]( https://photos.100ask.net/artinchip-docs/d213-devkit/new_project-17068607840195.png)
>
> 图 2.67 *创建新工程示例图*
>
> ![../../_ https://photos.100ask.net/artinchip-docs/d213-devkit/project_folder.png]( https://photos.100ask.net/artinchip-docs/d213-devkit/project_folder-17068607916507.png)
>
> 图 2.68 *导出工程目录结构*

# 3.2. 编译导出的UI代码

- 复制ui目录到sdk中的目录luban/source/artinchip/lvgl-ui下

- 修改luban/source/artinchip/lvgl-ui/CMakeLists.txt，中的app目录配置为ui

  > ```
  > # set app folder
  > set(APP_FOLDER ui)
  > ```

- 修改main.c中的入口函数：

  > ```
  > /*Create a Demo*/
  > #if LV_USE_DEMO_MUSIC == 1
  >     void lv_demo_music(void);
  >     lv_demo_music();
  > #else
  >     //void base_ui_init();
  >     //base_ui_init();
  >     void ui_init();
  >     ui_init();
  > #endif
  > ```

- 重新编译lvgl-ui

  > ```
  > make clean
  > make lvgl-ui-rebuild
  > make
  > ```

小技巧

Squareline Studo生成的image图片都是build-in的图片，当图片比较大的时候会占用比较多的存储空间，可参考base_ui示例中的方法， 修改为从文件中读取png、jpg图片，从文件读取png、jpg图片，默认会使用硬件解码

 4. lvgl-ui

lvgl-ui 是 ArtInChip 开发的一款用于演示 LVGL 基本操作的一个 demo，包含 png、jpg 硬件解码和 build-in 图片使用方式：

![../../_ https://photos.100ask.net/artinchip-docs/d213-devkit/base_demo.png]( https://photos.100ask.net/artinchip-docs/d213-devkit/base_demo-17068608515459.png)

lvgl-ui 一共有4四个页面，功能包括：

- 仪表演示第二个页面为音乐播放演示、第三个页面为菜单演示、
- 音乐播放演示
- 图片菜单演示
- 播放器演示

播放器演示页面需要打开base_ui.c中的宏定义VIDEO_PLAYER，默认为打开状态

# 4.1. 打开lvgl-ui

在 Luban根目录下执行 `make menuconfig`，进入 menuconfig

```
ArtInChip Luban SDK Configuration  --->
    ArtInChip packages  --->
    [*] lvgl-ui  --->
```

编译选择lvgl-ui将生成lvgl库和相应的应用程序:test_lvgl

# 4.2. 功能选择

- 用户可以通过lv_conf.h中的宏定义去配置LVGL的功能参数
- 在lv_conf.h中至少需要有宏定义LV_COLOR_DEPTH，LV_COLOR_DEPTH的值可以是32或者16，分别表示argb8888格式和rgb565格式， LV_COLOR_DEPTH的设置需要和dts中framebuffer的格式设置保持一致
- 目前我们在lv_conf.h只是加入了最常用的宏定义，如果需要添加更多的宏定义可以参考lvgl库目录下lv_conf_template.h中的定义， 复制相关的宏定义到lv_conf.h即可

# 4.3. 运行

在目录luban/package/artinchip/lvgl-ui/S00lvgl下的启动脚本，编译后会打包到系统路径/etc/init.d/S00lvgl，开机自动运行lvgl_ui

# 4.4. 打印输出重定向

lvgl-ui 默认日志输出到 /dev/null，不进行显示，如果要进行调试可以在 S00lvgl 中进行重定向修改

```
# 屏蔽打印
PID=`$DAEMON > /dev/null 2>&1 & echo $!
# 打印在控制台输出
PID=`$DAEMON > /dev/stderr 2>&1 & echo $!
```

需要重新编译模块，才能生效

```
make clean
make lvgl-ui-rebuild
```

# 4.5. LVGL的打印宏

- 在lv_conf.h中打开宏定义 #define LV_USE_LOG 1
- 当打开LV_USE_LOG后，可以设置打印级别，默认打印级别设置为LV_LOG_LEVEL_WARN

# 4.6. 图片缓存开关

- 通过lv_conf.h中宏定义LV_IMG_CACHE_DEF_SIZE来控制是否缓存图片
- 通过main.c中的宏定义IMG_CACHE_NUM来控制缓存的图片的张数

# 4.7. 代码说明

## 4.7.1. 界面滑动

不同页面通过滑动操作切换，页面滑动使用了控件tabview

```
lv_obj_set_size(main_tabview, 1024, 600);
lv_obj_set_pos(main_tabview, 0, 0);
lv_obj_set_style_bg_opa(main_tabview, LV_OPA_0, 0);

lv_obj_t *main_tab0 = lv_tabview_add_tab(main_tabview, "main page 0");
lv_obj_t *main_tab1 = lv_tabview_add_tab(main_tabview, "main page 1");

lv_obj_set_style_bg_opa(main_tab0, LV_OPA_0, 0);
lv_obj_set_style_bg_opa(main_tab1, LV_OPA_0, 0);
lv_obj_set_size(main_tab0, 1024, 600);
lv_obj_set_size(main_tab1, 1024, 600);

lv_obj_set_pos(main_tab0, 0, 0);
lv_obj_set_pos(main_tab1, 0, 0);
```

## 4.7.2. 背景图片

背景图片通过image控件来创建，是一个名字为global_bg.png的png图片，此图片会采用注册的硬件解码器进行解码

```
static lv_obj_t *img_bg = NULL;
img_bg = lv_img_create(lv_scr_act());
lv_img_set_src(img_bg, LVGL_PATH(global_bg.png));
lv_obj_set_pos(img_bg, 0, 0);
```

## 4.7.3. 菜单图片

菜单图片也通过image控件来创建，是png图片，此图片也会采用注册的硬件解码器进行解码

```
lv_obj_t *sub_image00 = lv_img_create(sub_tab0);
lv_img_set_src(sub_image00, LVGL_PATH(cook_0.jpg));
lv_obj_set_pos(sub_image00, 36, 100);
```

## 4.7.4. fake image

> fake image不是一个真实的图片，通过此方式可以方便的对一个矩形区域进行填充：包括alpha、red、green、blue

```
static lv_obj_t *img_bg = NULL;
FAKE_IMAGE_DECLARE(bg_dark)  // 声明（bg_dark名字可修改）

/* 最后一个参数为要设置的颜色值：bit31:24 为alpha */
FAKE_IMAGE_INIT(bg_dark, 1024, 600, 0, 0x00000000);

lv_img_set_src(img_bg, FAKE_IMAGE_NAME(bg_dark)); // 设置fake image数据源
```

## 4.7.5. build-in image

build-in image是通过数组变量在程序中表示图像，图片转换成.c文件的工具参考官网：http://lvgl.io/tools/imageconverter

```
uint8_t circle_white_map[] = {
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x50, 0xff, 0x7f, 0xff,
        ........................................................};

const lv_img_dsc_t circle_white = {
    .header.cf = LV_IMG_CF_TRUE_COLOR_ALPHA,
    .header.always_zero = 0,
    .header.reserved = 0,
    .header.w = 20,
    .header.h = 20,
    .data_size = 400 * LV_IMG_PX_SIZE_ALPHA_BYTE,
    .data = circle_white_map,
};

static lv_obj_t * circle_0 = lv_img_create(img_bg);
lv_img_set_src(circle_0, &circle_white);
lv_obj_align(circle_0, LV_ALIGN_BOTTOM_MID, -16, -28);
```