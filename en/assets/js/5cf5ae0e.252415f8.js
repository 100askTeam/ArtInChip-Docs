"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7585],{4844:(n,e,r)=>{r.r(e),r.d(e,{assets:()=>p,contentTitle:()=>t,default:()=>a,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var i=r(5893),d=r(1151);const o={sidebar_position:6},t="6.\u5c4f\u5e55\u914d\u7f6e",l={id:"D213-DevKit/part4/11-6_ScreenConfiguration",title:"6.\u5c4f\u5e55\u914d\u7f6e",description:"1. RGB",source:"@site/docs/D213-DevKit/part4/11-6_ScreenConfiguration.md",sourceDirName:"D213-DevKit/part4",slug:"/D213-DevKit/part4/11-6_ScreenConfiguration",permalink:"/en/docs/D213-DevKit/part4/11-6_ScreenConfiguration",draft:!1,unlisted:!1,editUrl:"https://github.com/100askTeam/ArtInChip-Docs/tree/master/docs/D213-DevKit/part4/11-6_ScreenConfiguration.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"d213dkSidebar",previous:{title:"5.IC \u914d\u7f6e",permalink:"/en/docs/D213-DevKit/part4/11-5_ICConfiguration"},next:{title:"7.\u793a\u4f8b\u7a0b\u5e8f",permalink:"/en/docs/D213-DevKit/part4/11-7_SampleProgram"}},p={},s=[{value:"1. RGB",id:"1-rgb",level:3},{value:"1.1. uboot \u914d\u7f6e",id:"11-uboot-\u914d\u7f6e",level:4},{value:"1.2. kernel \u914d\u7f6e",id:"12-kernel-\u914d\u7f6e",level:4},{value:"1.3. uboot dts",id:"13-uboot-dts",level:4},{value:"1.3.1. \u58f0\u660e\u901a\u8def",id:"131-\u58f0\u660e\u901a\u8def",level:5},{value:"1.3.2. \u58f0\u660e\u5c4f\u5e55\u53c2\u6570",id:"132-\u58f0\u660e\u5c4f\u5e55\u53c2\u6570",level:5},{value:"1.3.3. \u58f0\u660e\u5c4f\u5e55\u5f15\u811a",id:"133-\u58f0\u660e\u5c4f\u5e55\u5f15\u811a",level:5},{value:"1.4. \u7cfb\u7edfdts",id:"14-\u7cfb\u7edfdts",level:4},{value:"1.4.1. \u914d\u7f6e\u901a\u8def",id:"141-\u914d\u7f6e\u901a\u8def",level:5},{value:"1.4.2. \u914d\u7f6e\u5c4f\u5e55\u53c2\u6570",id:"142-\u914d\u7f6e\u5c4f\u5e55\u53c2\u6570",level:5},{value:"1.4.3. \u914d\u7f6e\u5f15\u811a",id:"143-\u914d\u7f6e\u5f15\u811a",level:5},{value:"2. LVDS",id:"2-lvds",level:3},{value:"2.1. uboot \u914d\u7f6e",id:"21-uboot-\u914d\u7f6e",level:4},{value:"2.2. kernel \u914d\u7f6e",id:"22-kernel-\u914d\u7f6e",level:4},{value:"2.3. uboot dts",id:"23-uboot-dts",level:4},{value:"2.3.1. \u58f0\u660e\u901a\u8def",id:"231-\u58f0\u660e\u901a\u8def",level:5},{value:"2.3.2. \u58f0\u660e\u5c4f\u5e55\u53c2\u6570",id:"232-\u58f0\u660e\u5c4f\u5e55\u53c2\u6570",level:5},{value:"2.3.3. \u58f0\u660e\u5c4f\u5e55\u5f15\u811a",id:"233-\u58f0\u660e\u5c4f\u5e55\u5f15\u811a",level:5},{value:"2.4. \u7cfb\u7edfdts",id:"24-\u7cfb\u7edfdts",level:4},{value:"2.4.1. \u914d\u7f6e\u901a\u8def",id:"241-\u914d\u7f6e\u901a\u8def",level:5},{value:"2.4.2. \u914d\u7f6e\u5c4f\u5e55\u53c2\u6570",id:"242-\u914d\u7f6e\u5c4f\u5e55\u53c2\u6570",level:5},{value:"2.4.3. \u914d\u7f6e\u5f15\u811a",id:"243-\u914d\u7f6e\u5f15\u811a",level:5},{value:"3. MIPI",id:"3-mipi",level:3},{value:"3.1. uboot \u914d\u7f6e",id:"31-uboot-\u914d\u7f6e",level:4},{value:"3.2. kernel \u914d\u7f6e",id:"32-kernel-\u914d\u7f6e",level:4},{value:"3.3. uboot dts",id:"33-uboot-dts",level:4},{value:"3.3.1. \u58f0\u660e\u901a\u8def",id:"331-\u58f0\u660e\u901a\u8def",level:5},{value:"3.3.2. \u58f0\u660e\u5c4f\u5e55\u53c2\u6570",id:"332-\u58f0\u660e\u5c4f\u5e55\u53c2\u6570",level:5},{value:"3.3.3. \u58f0\u660e\u5c4f\u5e55\u5f15\u811a",id:"333-\u58f0\u660e\u5c4f\u5e55\u5f15\u811a",level:5},{value:"3.4. \u7cfb\u7edfdts",id:"34-\u7cfb\u7edfdts",level:4},{value:"3.4.1. \u914d\u7f6e\u901a\u8def",id:"341-\u914d\u7f6e\u901a\u8def",level:5},{value:"3.4.2. \u914d\u7f6e\u5c4f\u5e55\u53c2\u6570",id:"342-\u914d\u7f6e\u5c4f\u5e55\u53c2\u6570",level:5},{value:"3.4.3. \u914d\u7f6e\u5f15\u811a",id:"343-\u914d\u7f6e\u5f15\u811a",level:5},{value:"4. \u80cc\u5149\u914d\u7f6e",id:"4-\u80cc\u5149\u914d\u7f6e",level:3},{value:"4.1. GPIO\u63a7\u5236\u80cc\u5149",id:"41-gpio\u63a7\u5236\u80cc\u5149",level:4},{value:"4.2. PWM\u63a7\u5236\u80cc\u5149",id:"42-pwm\u63a7\u5236\u80cc\u5149",level:4},{value:"4.3. PWM\u80cc\u5149\u6d4b\u8bd5\u8c03\u8bd5",id:"43-pwm\u80cc\u5149\u6d4b\u8bd5\u8c03\u8bd5",level:4},{value:"5. \u8c03\u8bd5\u5efa\u8bae",id:"5-\u8c03\u8bd5\u5efa\u8bae",level:3}];function c(n){const e={a:"a",code:"code",h1:"h1",h3:"h3",h4:"h4",h5:"h5",li:"li",p:"p",pre:"pre",ul:"ul",...(0,d.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h1,{id:"6\u5c4f\u5e55\u914d\u7f6e",children:"6.\u5c4f\u5e55\u914d\u7f6e"}),"\n",(0,i.jsx)(e.h3,{id:"1-rgb",children:"1. RGB"}),"\n",(0,i.jsx)(e.p,{children:"RGB\u5c4f\u7684\u8c03\u8bd5\u76f8\u5bf9\u7b80\u5355\uff0c\u53ea\u9700\u8981\u628a\u89c4\u683c\u4e66\u4e2d\u6240\u63cf\u8ff0\u7684\u65f6\u5e8f\u548c\u89c4\u683c\u53c2\u6570\u52a0\u5165\u76f8\u5e94\u7684\u914d\u7f6e\u6587\u4ef6\u5373\u53ef\uff0c\u4e0d\u9700\u8981\u989d\u5916\u7684\u9a71\u52a8\u7a0b\u5e8f\u3002"}),"\n",(0,i.jsx)(e.h4,{id:"11-uboot-\u914d\u7f6e",children:"1.1. uboot \u914d\u7f6e"}),"\n",(0,i.jsx)(e.p,{children:"\u5728 luban \u6839\u76ee\u5f55\u4e0b\u6267\u884c make um\uff0c\u8fdb\u5165 uboot \u7684\u529f\u80fd\u914d\u7f6e\u754c\u9762\uff0c\u4f7f\u80fd\u663e\u793a\u6a21\u5757\u9a71\u52a8\uff1a"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"Device Drivers\n    Graphics support\n        ArtInChip Graphics  ---\x3e\n            [*]   Enable ArtInChip Video Support\n            [*]   ArtInChip display rgb support\n            [ ]   ArtInChip display lvds support\n            [ ]   ArtInChip display mipi-dsi support\n            <*>   ArtInChip Panel Drivers (ArtInChip general RGB panel)  ---\x3e\n"})}),"\n",(0,i.jsx)(e.h4,{id:"12-kernel-\u914d\u7f6e",children:"1.2. kernel \u914d\u7f6e"}),"\n",(0,i.jsx)(e.p,{children:"\u5728 luban \u6839\u76ee\u5f55\u4e0b\u6267\u884c make km\uff0c\u8fdb\u5165 kernel \u7684\u529f\u80fd\u914d\u7f6e\u754c\u9762\uff0c\u4f7f\u80fd\u663e\u793a\u6a21\u5757\u9a71\u52a8\uff1a"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"Device Drivers\n    Graphics support\n        ArtInChip Graphics  ---\x3e\n            <*> ArtInChip Framebuffer support\n            [*]   ArtInChip display rgb support\n            [ ]   ArtInChip display lvds support\n            [ ]   ArtInChip display mipi-dsi support\n            <*>   ArtInChip Panel Drivers (ArtInChip general RGB panel)  ---\x3e\n"})}),"\n",(0,i.jsx)(e.h4,{id:"13-uboot-dts",children:"1.3. uboot dts"}),"\n",(0,i.jsx)(e.p,{children:"uboot \u5982\u679c\u8981\u8fdb\u884c\u663e\u793a\uff0c\u5219\u58f0\u660e\u76f8\u5e94\u7684\u914d\u7f6e\u4e3a\u9884\u52a0\u8f7d\uff0c\u4ee5 demo88_nand \u5de5\u7a0b\u4e3a\u4f8b\uff0c\u6587\u4ef6\u4e3a target/d211/demo88_nand/board-u-boot.dtsi"}),"\n",(0,i.jsx)(e.h5,{id:"131-\u58f0\u660e\u901a\u8def",children:"1.3.1. \u58f0\u660e\u901a\u8def"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"&disp {\n    u-boot,dm-pre-reloc;\n    fb0: fb@0 {\n        u-boot,dm-pre-reloc;\n        port {\n            fb0_out: endpoint {\n                u-boot,dm-pre-reloc;\n            }\n        };\n    };\n};\n\n&de0 {\n    u-boot,dm-pre-reloc;\n    port@0 {\n        de0_in: endpoint {\n            u-boot,dm-pre-reloc;\n        };\n    };\n\n    port@1 {\n        de0_out: endpoint {\n            u-boot,dm-pre-reloc;\n        };\n    };\n};\n&rgb0 {                             //RGB\n    u-boot,dm-pre-reloc;\n    port@0 {\n        rgb0_in: endpoint {\n            u-boot,dm-pre-reloc;\n        };\n    };\n\n    port@1 {\n        rgb0_out: endpoint {\n            u-boot,dm-pre-reloc;\n        };\n    };\n};\n"})}),"\n",(0,i.jsx)(e.h5,{id:"132-\u58f0\u660e\u5c4f\u5e55\u53c2\u6570",children:"1.3.2. \u58f0\u660e\u5c4f\u5e55\u53c2\u6570"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"panel_rgb {\n    u-boot,dm-pre-reloc;\n    port {\n        panel_rgb_in: endpoint {\n        u-boot,dm-pre-reloc;\n        };\n    };\n\n    display-timings {\n        u-boot,dm-pre-reloc;\n        timing0: 1024x600 {\n            u-boot,dm-pre-reloc;\n        };\n    };\n};\n"})}),"\n",(0,i.jsx)(e.h5,{id:"133-\u58f0\u660e\u5c4f\u5e55\u5f15\u811a",children:"1.3.3. \u58f0\u660e\u5c4f\u5e55\u5f15\u811a"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"lcd_rgb565_ld_pins: lcd-1 {\n    u-boot,dm-pre-reloc;\n    pins {\n        u-boot,dm-pre-reloc;\n    };\n};\n"})}),"\n",(0,i.jsx)(e.h4,{id:"14-\u7cfb\u7edfdts",children:"1.4. \u7cfb\u7edfdts"}),"\n",(0,i.jsx)(e.p,{children:"\u7cfb\u7edf\u7684 dts \u5c06\u8fdb\u884c\u5b8c\u6574\u7684\u529f\u80fd\u914d\u7f6e\uff0c\u4ee5 demo88_nand \u5de5\u7a0b\u4e3a\u4f8b\uff0c\u6587\u4ef6\u4e3a target/d211/demo88_nand/board.dts \u4e2d"}),"\n",(0,i.jsx)(e.h5,{id:"141-\u914d\u7f6e\u901a\u8def",children:"1.4.1. \u914d\u7f6e\u901a\u8def"}),"\n",(0,i.jsx)(e.p,{children:"\u901a\u8fc7 port \u548c status \u7ed3\u70b9\uff0c\u5b9a\u4e49\u4e86\u4e00\u6761\u6570\u636e\u901a\u9053"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'fb       |      de    |     |     rgb    |     panel\nport  --\x3e port0   port1 --\x3e  port0   port1 --\x3e  port\n&fb0 {\n    port {\n        fb0_out: endpoint {\n            remote-endpoint = <&de0_in>;\n        };\n    };\n};\n\n&de0 {\n    status = "okay";\n    port@0 {\n        reg = <0>;\n        de0_in: endpoint {\n        remote-endpoint = <&fb0_out>;\n    };\n\n    port@1 {\n        reg = <1>;\n        de0_out: endpoint {\n            remote-endpoint = <&rgb0_in>;   //RGB\n        }\n    };\n};\n\n&rgb0 {\n    pinctrl-names = "default", "sleep";\n    pinctrl-0 = <&lcd_rgb565_ld_pins>;          //RGB\n    pinctrl-1 = <&lcd_rgb565_ld_sleep_pins>;\n    status = "okay";\n    port@0 {\n        reg = <0>;\n        rgb0_in: endpoint {\n            remote-endpoint = <&de0_out>;\n        }\n    };\n\n    port@1 {\n        reg = <1>;\n        rgb0_out: endpoint {\n            remote-endpoint = <&panel_rgb_in>;  //RGB\n        };\n    };\n}\n'})}),"\n",(0,i.jsx)(e.h5,{id:"142-\u914d\u7f6e\u5c4f\u5e55\u53c2\u6570",children:"1.4.2. \u914d\u7f6e\u5c4f\u5e55\u53c2\u6570"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'panel_rgb {\ncompatible = "artinchip,aic-general-rgb-panel";\nstatus = "okay";\n\nenable-gpios = <&gpio_e 19 GPIO_ACTIVE_HIGH>;\nsleep-gpios = <&gpio_e 15 GPIO_ACTIVE_HIGH>;\nrgb-mode = <PRGB>;\ninterface-format = <PRGB_16BIT_LD>;\nclock-phase = <DEGREE_0>;\ndata-order = <RGB>;\ndisp-dither = <DITHER_RGB565>;\n\nport {\n    panel_rgb_in: endpoint {\n    remote-endpoint = <&rgb0_out>;\n    };\n};\n\ndisplay-timings {\n    native-mode = <&timing0>;\n    timing0: 1024x600 {\n        lock-frequency = <52000000>;\n        hactive = <1024>;\n        vactive = <600>;\n        hback-porch = <160>;\n        hfront-porch = <160>;\n        hsync-len = <20>;\n        vback-porch = <12>;\n        vfront-porch = <20>;\n        vsync-len = <3>;\n        de-active = <1>;\n        pixelclk-active = <1>;\n    };\n};\n'})}),"\n",(0,i.jsxs)(e.p,{children:["\u5176\u4e2d\u7c7b\u4f3c ",(0,i.jsx)(e.code,{children:"enable-gpios"})," \u63a7\u5236\u5f15\u811a\u9700\u8981\u6839\u636e\u5b9e\u9645\u663e\u793a\u5c4f\u7684\u9700\u8981\u589e\u52a0\u6216\u51cf\u5c11\uff0c\u9a71\u52a8\u4e2d\u505a\u76f8\u5e94\u4fee\u6539\uff0c ",(0,i.jsx)(e.code,{children:"rgb-mode"})," ",(0,i.jsx)(e.code,{children:"interface-format"})," \u9700\u8981\u4ece\u89c4\u683c\u4e66\u4e2d\u83b7\u53d6\uff0c ",(0,i.jsx)(e.code,{children:"data-order"})," ",(0,i.jsx)(e.code,{children:"data-mirror"})," \u9700\u8981\u6839\u636e\u677f\u7ea7\u8d70\u7ebf\u7684\u987a\u5e8f\u8bbe\u7f6e\u76f8\u5173\u53c2\u6570\u3002 ",(0,i.jsx)(e.code,{children:"clock-phase"})," \u9700\u8981\u6839\u636e\u6700\u7ec8\u5b9e\u9645\u7684\u663e\u793a\u6548\u679c\u505a\u76f8\u5e94\u8c03\u6574\u3002 \u5173\u4e8e\u53c2\u6570\u8be6\u7ec6\u7684\u89e3\u6790\u8bf7\u53c2\u8003 ",(0,i.jsx)(e.a,{href:"../media/display/02_config_guide/device_tree/index.html#ref-to-panel-dts",children:"\u663e\u793a\u90e8\u5206\u7ae0\u8282DTS\u5173\u4e8epannel_rgb\u7684\u914d\u7f6e\u8bf4\u660e"})]}),"\n",(0,i.jsx)(e.h5,{id:"143-\u914d\u7f6e\u5f15\u811a",children:"1.4.3. \u914d\u7f6e\u5f15\u811a"}),"\n",(0,i.jsx)(e.p,{children:"\u5f15\u811a\u7684\u914d\u7f6e\u7edf\u4e00\u5728 d211-pinctrl.dtsi \u4e2d\u5b8c\u6210\uff0c\u5728 rgb0 \u8282\u70b9\u4e2d\u76f4\u63a5\u8fdb\u884c\u4e86\u5f15\u7528"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'&rgb0 {\n    pinctrl-names = "default", "sleep";\n    pinctrl-0 = <&lcd_rgb565_ld_pins>;\n    pinctrl-1 = <&lcd_rgb565_ld_sleep_pins>;\n    status = "okay";\n    ......\n};\n'})}),"\n",(0,i.jsx)(e.h3,{id:"2-lvds",children:"2. LVDS"}),"\n",(0,i.jsx)(e.p,{children:"LVDS \u5c4f\u7684\u8c03\u8bd5\u548c RGB \u7c7b\u4f3c\uff0c\u53ea\u9700\u8981\u628a\u89c4\u683c\u4e66\u4e2d\u6240\u63cf\u8ff0\u7684\u65f6\u5e8f\u548c\u89c4\u683c\u53c2\u6570\u52a0\u5165\u76f8\u5e94\u7684\u914d\u7f6e\u6587\u4ef6\u5373\u53ef\uff0c\u4e5f\u4e0d\u9700\u8981\u989d\u5916\u7684\u9a71\u52a8\u7a0b\u5e8f\u3002"}),"\n",(0,i.jsx)(e.h4,{id:"21-uboot-\u914d\u7f6e",children:"2.1. uboot \u914d\u7f6e"}),"\n",(0,i.jsx)(e.p,{children:"\u5728 luban \u6839\u76ee\u5f55\u4e0b\u6267\u884c make um\uff0c\u8fdb\u5165 uboot \u7684\u529f\u80fd\u914d\u7f6e\u754c\u9762\uff0c\u4f7f\u80fd\u663e\u793a\u6a21\u5757\u9a71\u52a8\uff1a"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"Device Drivers\n    Graphics support\n        ArtInChip Graphics  ---\x3e\n            [*]   Enable ArtInChip Video Support\n            [ ]   ArtInChip display rgb support\n            [*]   ArtInChip display lvds support\n            [ ]   ArtInChip display mipi-dsi support\n            <*>   ArtInChip Panel Drivers (ArtInChip general LVDS panel)  ---\x3e\n"})}),"\n",(0,i.jsx)(e.h4,{id:"22-kernel-\u914d\u7f6e",children:"2.2. kernel \u914d\u7f6e"}),"\n",(0,i.jsx)(e.p,{children:"\u5728 luban \u6839\u76ee\u5f55\u4e0b\u6267\u884c make km\uff0c\u8fdb\u5165 kernel \u7684\u529f\u80fd\u914d\u7f6e\u754c\u9762\uff0c\u4f7f\u80fd\u663e\u793a\u6a21\u5757\u9a71\u52a8\uff1a"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"Device Drivers\n    Graphics support\n        ArtInChip Graphics  ---\x3e\n            <*> ArtInChip Framebuffer support\n            [ ]   ArtInChip display rgb support\n            [*]   ArtInChip display lvds support\n            [ ]   ArtInChip display mipi-dsi support\n            <*>   ArtInChip Panel Drivers (ArtInChip general LVDS panel)  ---\x3e\n"})}),"\n",(0,i.jsx)(e.h4,{id:"23-uboot-dts",children:"2.3. uboot dts"}),"\n",(0,i.jsx)(e.p,{children:"uboot \u5982\u679c\u8981\u8fdb\u884c\u663e\u793a\uff0c\u5219\u58f0\u660e\u76f8\u5e94\u7684\u914d\u7f6e\u4e3a\u9884\u52a0\u8f7d\uff0c\u4ee5 demo128_nand \u5de5\u7a0b\u4e3a\u4f8b\uff0c\u6587\u4ef6\u4e3a target/d211/demo128_nand/board-u-boot.dtsi"}),"\n",(0,i.jsx)(e.h5,{id:"231-\u58f0\u660e\u901a\u8def",children:"2.3.1. \u58f0\u660e\u901a\u8def"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"&disp {\n    u-boot,dm-pre-reloc;\n    fb0: fb@0 {\n        u-boot,dm-pre-reloc;\n        port {\n            fb0_out: endpoint {\n                u-boot,dm-pre-reloc;\n            }\n        };\n    };\n};\n\n&de0 {\n    u-boot,dm-pre-reloc;\n    port@0 {\n        de0_in: endpoint {\n            u-boot,dm-pre-reloc;\n        };\n    };\n\n    port@1 {\n        de0_out: endpoint {\n            u-boot,dm-pre-reloc;\n        };\n    };\n};\n&lvds0 {                            //lvds\n    u-boot,dm-pre-reloc;\n    port@0 {\n        lvds0_in: endpoint {\n            u-boot,dm-pre-reloc;\n        };\n    };\n\n    port@1 {\n        lvds0_out: endpoint {\n            u-boot,dm-pre-reloc;\n        };\n    };\n};\n"})}),"\n",(0,i.jsx)(e.h5,{id:"232-\u58f0\u660e\u5c4f\u5e55\u53c2\u6570",children:"2.3.2. \u58f0\u660e\u5c4f\u5e55\u53c2\u6570"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"panel_lvds {\n    u-boot,dm-pre-reloc;\n    port {\n        panel_lvds_in: endpoint {\n            u-boot,dm-pre-reloc;\n        };\n    };\n\n    display-timings {\n        u-boot,dm-pre-reloc;\n        timing1: 1024x600 {\n            u-boot,dm-pre-reloc;\n        };\n    };\n};\n"})}),"\n",(0,i.jsx)(e.h5,{id:"233-\u58f0\u660e\u5c4f\u5e55\u5f15\u811a",children:"2.3.3. \u58f0\u660e\u5c4f\u5e55\u5f15\u811a"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"lvds1_pins: lvds1-0 {\n        u-boot,dm-pre-reloc;\n    pins {\n        u-boot,dm-pre-reloc;\n    };\n};\n"})}),"\n",(0,i.jsx)(e.h4,{id:"24-\u7cfb\u7edfdts",children:"2.4. \u7cfb\u7edfdts"}),"\n",(0,i.jsx)(e.p,{children:"\u7cfb\u7edf\u7684 dts \u5c06\u8fdb\u884c\u5b8c\u6574\u7684\u529f\u80fd\u914d\u7f6e\uff0c\u4ee5 demo128_nand \u5de5\u7a0b\u4e3a\u4f8b\uff0c\u6587\u4ef6\u4e3a target/d211/demo128_nand/board.dts \u4e2d"}),"\n",(0,i.jsx)(e.h5,{id:"241-\u914d\u7f6e\u901a\u8def",children:"2.4.1. \u914d\u7f6e\u901a\u8def"}),"\n",(0,i.jsx)(e.p,{children:"\u901a\u8fc7 port \u548c status \u7ed3\u70b9\uff0c\u5b9a\u4e49\u4e86\u4e00\u6761\u6570\u636e\u901a\u9053"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'fb       |      de    |     |     lvds    |     panel\nport  --\x3e port0   port1 --\x3e  port0   port1 --\x3e  port\n&fb0 {\n    port {\n        fb0_out: endpoint {\n            remote-endpoint = <&de0_in>;\n        };\n    };\n};\n\n&de0 {\n    status = "okay";\n    port@0 {\n        reg = <0>;\n        de0_in: endpoint {\n            remote-endpoint = <&fb0_out>;\n        };\n    };\n\n    port@1 {\n        reg = <1>;\n        de0_out: endpoint {\n            remote-endpoint = <&lvds0_in>;   //LVDS\n        };\n    };\n};\n\n&lvds0 {\n    pinctrl-names = "default";\n    pinctrl-0 = <&lvds1_pins>;\n    status = "okay";\n\n    port@0 {\n        reg = <0>;\n        lvds0_in: endpoint {\n            remote-endpoint = <&de0_out>;\n        };\n    };\n\n    port@1 {\n        reg = <1>;\n        lvds0_out: endpoint {\n            remote-endpoint = <&panel_lvds_in>;\n        };\n    };\n};\n'})}),"\n",(0,i.jsx)(e.h5,{id:"242-\u914d\u7f6e\u5c4f\u5e55\u53c2\u6570",children:"2.4.2. \u914d\u7f6e\u5c4f\u5e55\u53c2\u6570"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'    panel_lvds {\n    compatible = "artinchip,aic-general-lvds-panel";\n    data-mapping = "vesa-24";\n    data-channel = "single-link1";\n    status = "okay";\n\n    enable-gpios = <&gpio_c 7 GPIO_ACTIVE_HIGH>;\n    port {\n        panel_lvds_in: endpoint {\n            remote-endpoint = <&lvds0_out>;\n        };\n    };\n\n    display-timings {\n        native-mode = <&timing1>;\n        timing1: 1024x600 {\n            clock-frequency = <52000000>;\n            hactive = <1024>;\n            vactive = <600>;\n            hback-porch = <160>;\n            hfront-porch = <160>;\n            hsync-len = <20>;\n            vback-porch = <20>;\n            vfront-porch = <12>;\n            vsync-len = <3>;\n            de-active = <1>;\n            pixelclk-active = <1>;\n        };\n    };\n};\n'})}),"\n",(0,i.jsx)(e.h5,{id:"243-\u914d\u7f6e\u5f15\u811a",children:"2.4.3. \u914d\u7f6e\u5f15\u811a"}),"\n",(0,i.jsx)(e.p,{children:"\u5f15\u811a\u7684\u914d\u7f6e\u7edf\u4e00\u5728 d211-pinctrl.dtsi \u4e2d\u5b8c\u6210\uff0c\u5728 rgb0 \u8282\u70b9\u4e2d\u76f4\u63a5\u8fdb\u884c\u4e86\u5f15\u7528"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'&lvds0 {\n    pinctrl-names = "default";\n    pinctrl-0 = <&lvds1_pins>;\n    status = "okay";\n    ......\n}\n'})}),"\n",(0,i.jsx)(e.h3,{id:"3-mipi",children:"3. MIPI"}),"\n",(0,i.jsx)(e.p,{children:"\u76f8\u6bd4RGB\u548cLVDS\u5c4f\u7684\u8c03\u8bd5\uff0cMIPI\u5c4f\u7684\u8c03\u8bd5\u76f8\u5bf9\u7a0d\u5fae\u7e41\u7410\uff0c\u56e0\u4e3a\u6bcf\u4e00\u6b3eMIPI\u5c4f\u51e0\u4e4e\u90fd\u9700\u8981\u4e00\u4e2a\u72ec\u7acb\u7684\u9a71\u52a8\u7a0b\u5e8f\uff0c\u56e0\u6b64\u4e0d\u4ec5\u9700\u8981\u5728DTS\u4e2d\u8bbe\u7f6e\u53c2\u6570\uff0c\u8fd8\u9700\u8981\u5728kernel\u548cuboot\u4e2d\u6dfb\u52a0\u5c4f\u5e55\u6240\u5bf9\u5e94\u7684\u9a71\u52a8"}),"\n",(0,i.jsx)(e.h4,{id:"31-uboot-\u914d\u7f6e",children:"3.1. uboot \u914d\u7f6e"}),"\n",(0,i.jsx)(e.p,{children:"\u5728 luban \u6839\u76ee\u5f55\u4e0b\u6267\u884c make um\uff0c\u8fdb\u5165 uboot \u7684\u529f\u80fd\u914d\u7f6e\u754c\u9762\uff0c\u4f7f\u80fd\u663e\u793a\u6a21\u5757\u9a71\u52a8\uff1a"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"Device Drivers\n    Graphics support\n        ArtInChip Graphics  ---\x3e\n            [*]   Enable ArtInChip Video Support\n            [ ]   ArtInChip display rgb support\n            [ ]   ArtInChip display lvds support\n            [ ]   ArtInChip display mipi-dsi support\n            <*>   ArtInChip Panel Drivers (ArtInChip panel driver for B080XAN)  ---\x3e\n"})}),"\n",(0,i.jsx)(e.h4,{id:"32-kernel-\u914d\u7f6e",children:"3.2. kernel \u914d\u7f6e"}),"\n",(0,i.jsx)(e.p,{children:"\u5728 luban \u6839\u76ee\u5f55\u4e0b\u6267\u884c make km\uff0c\u8fdb\u5165 kernel \u7684\u529f\u80fd\u914d\u7f6e\u754c\u9762\uff0c\u4f7f\u80fd\u663e\u793a\u6a21\u5757\u9a71\u52a8\uff1a"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"Device Drivers\n    Graphics support\n        ArtInChip Graphics  ---\x3e\n            <*> ArtInChip Framebuffer support\n            [ ]   ArtInChip display rgb support\n            [ ]   ArtInChip display lvds support\n            [*]   ArtInChip display mipi-dsi support\n            <*>   ArtInChip Panel Drivers (ArtInChip panel driver for B080XAN)  ---\x3e\n"})}),"\n",(0,i.jsx)(e.h4,{id:"33-uboot-dts",children:"3.3. uboot dts"}),"\n",(0,i.jsx)(e.p,{children:"uboot \u5982\u679c\u8981\u8fdb\u884c\u663e\u793a\uff0c\u5219\u58f0\u660e\u76f8\u5e94\u7684\u914d\u7f6e\u4e3a\u9884\u52a0\u8f7d\uff0c\u7cfb\u7edf\u4e2d\u76ee\u524d\u6ca1\u6709\u914d\u7f6e MIPI \u7684\u6807\u6848\uff0c\u53ef\u4ee5\u53c2\u8003\u5982\u4e0b\u914d\u7f6e"}),"\n",(0,i.jsx)(e.h5,{id:"331-\u58f0\u660e\u901a\u8def",children:"3.3.1. \u58f0\u660e\u901a\u8def"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"&disp {\n    u-boot,dm-pre-reloc;\n    fb0: fb@0 {\n        u-boot,dm-pre-reloc;\n        port {\n            fb0_out: endpoint {\n                u-boot,dm-pre-reloc;\n            };\n        };\n    };\n};\n&de0 {\n    u-boot,dm-pre-reloc;\n    port@0 {\n        de0_in: endpoint {\n            u-boot,dm-pre-reloc;\n        };\n    };\n\n    port@1 {\n        de0_out: endpoint {\n            u-boot,dm-pre-reloc;\n        };\n    };\n};\n&dsi0 {                     //mipi dsi\n    u-boot,dm-pre-reloc;\n    port@0 {\n        dsi0_in: endpoint {\n            u-boot,dm-pre-reloc;\n        };\n    };\n\n    port@1 {\n        dsi0_out: endpoint {\n            u-boot,dm-pre-reloc;\n        };\n    };\n};\n"})}),"\n",(0,i.jsx)(e.h5,{id:"332-\u58f0\u660e\u5c4f\u5e55\u53c2\u6570",children:"3.3.2. \u58f0\u660e\u5c4f\u5e55\u53c2\u6570"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"panel_dsi {\n    u-boot,dm-pre-reloc;\n    port {\n        panel_dsi_in: endpoint {\n            u-boot,dm-pre-reloc;\n        };\n    };\n};\n"})}),"\n",(0,i.jsx)(e.h5,{id:"333-\u58f0\u660e\u5c4f\u5e55\u5f15\u811a",children:"3.3.3. \u58f0\u660e\u5c4f\u5e55\u5f15\u811a"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"dsi_pins: dsi-0 {\n        u-boot,dm-pre-reloc;\n    pins {\n        u-boot,dm-pre-reloc;\n    };\n};\n"})}),"\n",(0,i.jsx)(e.h4,{id:"34-\u7cfb\u7edfdts",children:"3.4. \u7cfb\u7edfdts"}),"\n",(0,i.jsx)(e.p,{children:"\u7cfb\u7edf\u7684 dts \u5c06\u8fdb\u884c\u5b8c\u6574\u7684\u529f\u80fd\u914d\u7f6e\uff0c\u4ee5 demo128_nand \u5de5\u7a0b\u4e3a\u4f8b\uff0c\u6587\u4ef6\u4e3a target/d211/demo128_nand/board.dts \u4e2d"}),"\n",(0,i.jsx)(e.h5,{id:"341-\u914d\u7f6e\u901a\u8def",children:"3.4.1. \u914d\u7f6e\u901a\u8def"}),"\n",(0,i.jsx)(e.p,{children:"\u901a\u8fc7 port \u548c status \u7ed3\u70b9\uff0c\u5b9a\u4e49\u4e86\u4e00\u6761\u6570\u636e\u901a\u9053"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'fb       |      de    |     |     mipi    |     panel\nport  --\x3e port0   port1 --\x3e  port0   port1 --\x3e  port\n&fb0 {\n    port {\n        fb0_out: endpoint {\n            remote-endpoint = <&de0_in>;\n        };\n    };\n};\n\n&de0 {\n    status = "okay";\n    port@0 {\n        reg = <0>;\n        de0_in: endpoint {\n            remote-endpoint = <&fb0_out>;\n        };\n    };\n\n    port@1 {\n        reg = <1>;\n        de0_out: endpoint {\n            remote-endpoint = <&dsi0_in>;   //mipi dsi\n        };\n    };\n};\n\n&dsi0 {\n    pinctrl-names = "default";\n    pinctrl-0 = <&dsi_pins>;\n    status = "okay";\n\n    data-clk-inverse;\n\n    port@0 {\n        reg = <0>;\n        dsi0_in: endpoint {\n            remote-endpoint = <&de0_out>;\n        };\n    };\n\n    port@1 {\n        reg = <1>;\n        dsi0_out: endpoint {\n            remote-endpoint = <&panel_dsi_in>;\n        };\n    };\n};\n'})}),"\n",(0,i.jsx)(e.h5,{id:"342-\u914d\u7f6e\u5c4f\u5e55\u53c2\u6570",children:"3.4.2. \u914d\u7f6e\u5c4f\u5e55\u53c2\u6570"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'    panel_dsi {\n    compatible = "artinchip,aic-dsi-panel-simple";\n    status = "okay";\n\n    enable-gpios = <&gpio_c 6 GPIO_ACTIVE_HIGH>;\n\n    port {\n        panel_dsi_in: endpoint {\n            remote-endpoint = <&dsi0_out>;\n        };\n    };\n};\n'})}),"\n",(0,i.jsx)(e.h5,{id:"343-\u914d\u7f6e\u5f15\u811a",children:"3.4.3. \u914d\u7f6e\u5f15\u811a"}),"\n",(0,i.jsx)(e.p,{children:"\u5f15\u811a\u7684\u914d\u7f6e\u7edf\u4e00\u5728 d211-pinctrl.dtsi \u4e2d\u5b8c\u6210\uff0c\u5728 rgb0 \u8282\u70b9\u4e2d\u76f4\u63a5\u8fdb\u884c\u4e86\u5f15\u7528"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'&dsi0 {\n    pinctrl-names = "default";\n    pinctrl-0 = <&dsi_pins>;\n    status = "okay";\n    ......\n}\n'})}),"\n",(0,i.jsx)(e.h3,{id:"4-\u80cc\u5149\u914d\u7f6e",children:"4. \u80cc\u5149\u914d\u7f6e"}),"\n",(0,i.jsx)(e.h4,{id:"41-gpio\u63a7\u5236\u80cc\u5149",children:"4.1. GPIO\u63a7\u5236\u80cc\u5149"}),"\n",(0,i.jsx)(e.p,{children:"\u5982\u679c\u6ca1\u6709\u8c03\u8282\u80cc\u5149\u4eae\u5ea6\u9700\u6c42\uff0c\u4ec5\u4ec5\u662f\u4eae\u6216\u9ed1\u5c4f\uff0c\u5219\u7528GPIO\u63a7\u5236\u8f83\u4e3a\u7b80\u5355\uff0c\u53ea\u9700\u8981\u5728dts panel\u8282\u70b9\u4e2d\u4e00\u4e2a\u5730\u65b9\u914d\u7f6e\u597d\u5c31\u53ef\u4ee5\uff0c\u5982\u4e0b\uff1b"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'panel_xxx {\n    compatible = "artinchip,aic-general-lvds-panel";\n    status = "okay";\n\n    enable-gpios = <&gpio_c 7 GPIO_ACTIVE_HIGH>; //\u80cc\u5149\u63a7\u5236\u5f15\u811a\uff0c\u987b\u548c\u539f\u7406\u56fe\u4e00\u81f4\n    port {\n        panel_lvds_in: endpoint {\n            remote-endpoint = <&lvds0_out>;\n        };\n};\n'})}),"\n",(0,i.jsx)(e.h4,{id:"42-pwm\u63a7\u5236\u80cc\u5149",children:"4.2. PWM\u63a7\u5236\u80cc\u5149"}),"\n",(0,i.jsx)(e.p,{children:"\u5982\u679c\u6709\u8c03\u8282\u80cc\u5149\u4eae\u5ea6\u7684\u9700\u6c42\uff0c\u5219\u9700\u8981\u4f7f\u7528PWM\u6765\u63a7\u5236\u80cc\u5149\uff0c \u6709\u4ee5\u4e0b\u6b65\u9aa4\u914d\u7f6e\uff1a"}),"\n",(0,i.jsx)(e.p,{children:"1.board.dts panel\u8282\u70b9\u4e2d\u9700\u6dfb\u52a0backlight\u8282\u70b9\uff0c\u5982\u4e0b\uff1a"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'panel_xxx {\n    compatible = "artinchip,aic-general-lvds-panel";\n    status = "okay";\n\n    //enable-gpios = <&gpio_c 7 GPIO_ACTIVE_HIGH>;\n    backlight = <&backlight>;//\u6dfb\u52a0backlight\n    port {\n        panel_lvds_in: endpoint {\n            remote-endpoint = <&lvds0_out>;\n        };\n};\n'})}),"\n",(0,i.jsx)(e.p,{children:"2.board.dts\u4e2d\u4f7f\u80fdbacklight\u8282\u70b9"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'backlight: backlight {\n     compatible = "pwm-backlight";\n     /* pwm node name; pwm device No.; period_ns; pwm_polarity */\n     pwms = <&pwm 0 1000000 0>; //\u786c\u4ef6\u5bf9\u5e94\u7684\u54ea\u4e00\u8defPWM\u63a5\u53e3\uff0c\u9700\u8981\u548c\u539f\u7406\u56fe\u786e\u8ba4\n     brightness-levels = <0 10 20 30 40 50 60 70 80 90 100>; //\u6bcf\u4e00\u7ea7\u5bf9\u5e94\u7684\u5360\u7a7a\u767e\u5206\u6bd4\n     default-brightness-level = <6>;\n     status = "okay";\n};\n'})}),"\n",(0,i.jsx)(e.p,{children:"3.board.dts\u4e2d\u4f7f\u80fd\u5bf9\u5e94\u7684PWM"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'&pwm {\n    status = "okay";    //PWM\u8282\u70b9\u603b\u5f00\u5173\n    pinctrl-names = "default";\n    pinctrl-0 = <&pwm0_pins_d>;    //\u6dfb\u52a0\u80cc\u5149\u63a7\u5236pinmux\u5f15\u811a\n    /* mode: up-count, down-count, up-down-count\n       action: none, low, high, inverse */\n    pwm0 {\n        aic,mode = "up-count";\n        aic,tb-clk-rate = <24000000>;\n        aic,rise-edge-delay = <10>;\n        aic,fall-edge-delay = <10>;\n        /*            CBD,    CBU,    CAD,    CAU,    PRD,   ZRO */\n        aic,action0 = "none", "none", "none", "low", "none", "high";\n        aic,action1 = "none", "none", "none", "high", "none", "low";\n        status = "okay";    //\u4f7f\u80fd\u786c\u4ef6\u5bf9\u5e94\u90a3\u4e00\u8def\u7684PWM\u5b50\u8282\u70b9\n    };\n    ......\n};\n'})}),"\n",(0,i.jsx)(e.p,{children:"4.board-u-boot.dtsi\u6dfb\u52a0\u5bf9\u5e94\u7684PWM\u8282\u70b9"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"/ {\n    ......\n    backlight: backlight {\n        u-boot,dm-pre-reloc;\n    };\n};\n\n&pwm {\n    u-boot,dm-pre-reloc;\n    pwm0 {\n        u-boot,dm-pre-reloc;\n    };\n    ......\n};\n\n&pinctrl {\n    ......\n    pwm0_pins_d: pwm0-3 {\n        u-boot,dm-pre-reloc;\n        pins {\n            u-boot,dm-pre-reloc;\n        };\n    };\n    ......\n};\n"})}),"\n",(0,i.jsx)(e.p,{children:"5.\u786e\u8ba4\u5185\u6838\u4e2d\u6253\u5f00\u5982\u4e0b\u914d\u7f6e"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"CONFIG_PWM=y\nCONFIG_PWM_ARTINCHIP=y\nCONFIG_BACKLIGHT_PWM=y\n"})}),"\n",(0,i.jsx)(e.p,{children:"6.\u786e\u8ba4uboot\u4e2d\u6253\u5f00\u5982\u4e0b\u914d\u7f6e"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"CONFIG_PWM_ARTINCHIP=y\nCONFIG_BACKLIGHT_PWM=y\n"})}),"\n",(0,i.jsx)(e.h4,{id:"43-pwm\u80cc\u5149\u6d4b\u8bd5\u8c03\u8bd5",children:"4.3. PWM\u80cc\u5149\u6d4b\u8bd5\u8c03\u8bd5"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u786e\u8ba4\u786c\u4ef6\u4fe1\u53f7\u7684\u8fde\u901a\u6027"}),"\n",(0,i.jsx)(e.li,{children:"\u67e5\u770b\u542f\u52a8log\u662f\u5426\u6709\u5f02\u5e38"}),"\n",(0,i.jsx)(e.li,{children:"\u67e5\u770b\u5982\u4e0b\u547d\u4ee4\u8282\u70b9\u662f\u5426\u5b58\u5728\uff0c\u5e76\u901a\u8fc7\u547d\u4ee4\u8c03\u8282\u80cc\u5149\u6216\u6d4b\u8bd5PWM\u8f93\u51fa\u4fe1\u53f7"}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"echo 5 > /sys/class/backlight/backlight/brightness //\u8bbe\u7f6ebrightness\u7ea7\u6570, \u5bf9\u5e94\u5230backlight\u8282\u70b9\u8bbe\u7f6e\u7684\u5360\u7a7a\u767e\u5206\u6bd4\u3002\n"})}),"\n",(0,i.jsx)(e.h3,{id:"5-\u8c03\u8bd5\u5efa\u8bae",children:"5. \u8c03\u8bd5\u5efa\u8bae"}),"\n",(0,i.jsx)(e.p,{children:"\u5c0f\u6280\u5de7"}),"\n",(0,i.jsx)(e.p,{children:"\u5c4f\u5e55\u7684\u8c03\u8bd5\u5c3d\u91cf\u5728 kernel \u4e2d\u5b8c\u6210\uff0c\u7136\u540e\u518d\u79fb\u690d\u5230 uboot \u4e2d"})]})}function a(n={}){const{wrapper:e}={...(0,d.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(c,{...n})}):c(n)}},1151:(n,e,r)=>{r.d(e,{Z:()=>l,a:()=>t});var i=r(7294);const d={},o=i.createContext(d);function t(n){const e=i.useContext(o);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(d):n.components||d:t(n.components),i.createElement(o.Provider,{value:e},n.children)}}}]);