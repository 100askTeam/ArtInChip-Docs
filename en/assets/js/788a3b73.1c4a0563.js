"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7034],{2527:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>r,contentTitle:()=>c,default:()=>o,frontMatter:()=>l,metadata:()=>a,toc:()=>t});var s=i(5893),d=i(1151);const l={sidebar_position:28},c="PSADC \u4f7f\u7528\u6307\u5357",a={id:"D213-DevKit/part3/07-13_PSADC-Useguide",title:"PSADC \u4f7f\u7528\u6307\u5357",description:"1. \u6a21\u5757\u4ecb\u7ecd",source:"@site/docs/D213-DevKit/part3/07-13_PSADC-Useguide.md",sourceDirName:"D213-DevKit/part3",slug:"/D213-DevKit/part3/07-13_PSADC-Useguide",permalink:"/en/docs/D213-DevKit/part3/07-13_PSADC-Useguide",draft:!1,unlisted:!1,editUrl:"https://github.com/100askTeam/ArtInChip-Docs/tree/master/docs/D213-DevKit/part3/07-13_PSADC-Useguide.md",tags:[],version:"current",sidebarPosition:28,frontMatter:{sidebar_position:28},sidebar:"d213dkSidebar",previous:{title:"USB \u4f7f\u7528\u6307\u5357",permalink:"/en/docs/D213-DevKit/part3/07-12_USB-Useguide"},next:{title:"SPI ENC",permalink:"/en/docs/D213-DevKit/part3/08-1_SPI-ENC"}},r={},t=[{value:"1. \u6a21\u5757\u4ecb\u7ecd",id:"1-\u6a21\u5757\u4ecb\u7ecd",level:2},{value:"1.1. \u672f\u8bed\u5b9a\u4e49",id:"11-\u672f\u8bed\u5b9a\u4e49",level:3},{value:"1.2. \u6a21\u5757\u7b80\u4ecb",id:"12-\u6a21\u5757\u7b80\u4ecb",level:3},{value:"2. \u53c2\u6570\u914d\u7f6e",id:"2-\u53c2\u6570\u914d\u7f6e",level:2},{value:"2.1. \u5185\u6838\u914d\u7f6e",id:"21-\u5185\u6838\u914d\u7f6e",level:3},{value:"2.1.1. \u914d\u7f6e IIO",id:"211-\u914d\u7f6e-iio",level:4},{value:"2.1.2. \u914d\u7f6e PSADC",id:"212-\u914d\u7f6e-psadc",level:4},{value:"2.2. DTS \u53c2\u6570\u914d\u7f6e",id:"22-dts-\u53c2\u6570\u914d\u7f6e",level:3},{value:"2.2.1. D211 \u914d\u7f6e",id:"221-d211-\u914d\u7f6e",level:4},{value:"2.2.2. Board \u914d\u7f6e",id:"222-board-\u914d\u7f6e",level:4},{value:"3. \u8c03\u8bd5\u6307\u5357",id:"3-\u8c03\u8bd5\u6307\u5357",level:2},{value:"3.1. \u8c03\u8bd5\u5f00\u5173",id:"31-\u8c03\u8bd5\u5f00\u5173",level:3},{value:"3.2. Sysfs \u8282\u70b9",id:"32-sysfs-\u8282\u70b9",level:3},{value:"4. \u6d4b\u8bd5\u6307\u5357",id:"4-\u6d4b\u8bd5\u6307\u5357",level:2},{value:"4.1. \u6d4b\u8bd5\u73af\u5883",id:"41-\u6d4b\u8bd5\u73af\u5883",level:3},{value:"4.1.1. \u786c\u4ef6",id:"411-\u786c\u4ef6",level:4},{value:"4.1.2. \u8f6f\u4ef6",id:"412-\u8f6f\u4ef6",level:4},{value:"4.2. ADC \u8bfb\u53d6\u6d4b\u8bd5",id:"42-adc-\u8bfb\u53d6\u6d4b\u8bd5",level:3},{value:"5. \u8bbe\u8ba1\u8bf4\u660e",id:"5-\u8bbe\u8ba1\u8bf4\u660e",level:2},{value:"5.1. \u6e90\u7801\u8bf4\u660e",id:"51-\u6e90\u7801\u8bf4\u660e",level:3},{value:"5.2. \u6a21\u5757\u67b6\u6784",id:"52-\u6a21\u5757\u67b6\u6784",level:3},{value:"5.3. \u5173\u952e\u6d41\u7a0b\u8bbe\u8ba1",id:"53-\u5173\u952e\u6d41\u7a0b\u8bbe\u8ba1",level:3},{value:"5.3.1. \u521d\u59cb\u5316\u6d41\u7a0b",id:"531-\u521d\u59cb\u5316\u6d41\u7a0b",level:4},{value:"5.3.2. \u4e2d\u65ad\u5904\u7406\u6d41\u7a0b",id:"532-\u4e2d\u65ad\u5904\u7406\u6d41\u7a0b",level:4},{value:"5.4. \u6570\u636e\u7ed3\u6784\u8bbe\u8ba1",id:"54-\u6570\u636e\u7ed3\u6784\u8bbe\u8ba1",level:3},{value:"5.4.1. aic_psadc_data",id:"541-aic_psadc_data",level:4},{value:"5.4.2. aic_psadc_ch",id:"542-aic_psadc_ch",level:4},{value:"5.4.3. aic_psadc_dev",id:"543-aic_psadc_dev",level:4},{value:"5.5. \u63a5\u53e3\u8bbe\u8ba1",id:"55-\u63a5\u53e3\u8bbe\u8ba1",level:3},{value:"5.5.1. aic_psadc_read_raw",id:"551-aic_psadc_read_raw",level:4},{value:"6. \u5e38\u89c1\u95ee\u9898",id:"6-\u5e38\u89c1\u95ee\u9898",level:2},{value:"6.1. PSADC \u521d\u59cb\u5316\u5931\u8d25",id:"61-psadc-\u521d\u59cb\u5316\u5931\u8d25",level:3},{value:"6.1.1. \u73b0\u8c61",id:"611-\u73b0\u8c61",level:4},{value:"6.1.2. \u539f\u56e0\u5206\u6790",id:"612-\u539f\u56e0\u5206\u6790",level:4}];function h(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,d.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"psadc-\u4f7f\u7528\u6307\u5357",children:"PSADC \u4f7f\u7528\u6307\u5357"}),"\n",(0,s.jsx)(n.h2,{id:"1-\u6a21\u5757\u4ecb\u7ecd",children:"1. \u6a21\u5757\u4ecb\u7ecd"}),"\n",(0,s.jsx)(n.h3,{id:"11-\u672f\u8bed\u5b9a\u4e49",children:"1.1. \u672f\u8bed\u5b9a\u4e49"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"\u672f\u8bed"}),(0,s.jsx)(n.th,{children:"\u5b9a\u4e49"}),(0,s.jsx)(n.th,{children:"\u6ce8\u91ca\u8bf4\u660e"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"ADC"}),(0,s.jsx)(n.td,{children:"Analog Digital Converter"}),(0,s.jsx)(n.td,{children:"\u6a21\u62df\u6570\u5b57\u8f6c\u6362\u5668"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"ADCIM"}),(0,s.jsx)(n.td,{children:"ADC Interface Management"}),(0,s.jsx)(n.td,{children:"\u6a21\u6570\u8f6c\u6362\u7ba1\u7406\u6a21\u5757"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"PSADC"}),(0,s.jsx)(n.td,{children:"PWM System ADC"}),(0,s.jsx)(n.td,{children:"PWM\u63a7\u5236\u5b50\u7cfb\u7edf\u54cd\u5e94\u6a21\u5757"})]})]})]}),"\n",(0,s.jsx)(n.h3,{id:"12-\u6a21\u5757\u7b80\u4ecb",children:"1.2. \u6a21\u5757\u7b80\u4ecb"}),"\n",(0,s.jsx)(n.p,{children:"PSADC\u786c\u4ef6\u6846\u56fe\u5982\u4e0b\uff1a"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/hw_system7-17067651014991.png",alt:"../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/hw_system7.png"})}),"\n",(0,s.jsxs)(n.p,{children:["\u56fe 7.40 ",(0,s.jsx)(n.em,{children:"PSADC\u76f8\u5173\u6a21\u5757\u7684\u786c\u4ef6\u6846\u56fe"})]}),"\n",(0,s.jsx)(n.p,{children:"PSADC\u4e3b\u8981\u529f\u80fd\u662f\u5c06\u5916\u90e8\u7684\u6a21\u62df\u4fe1\u53f7\u8f6c\u6210\u6570\u5b57\u4fe1\u53f7\uff0c\u7136\u540e\u4e0a\u62a5\u7ed9CPU\u3002\u652f\u6301\u7684\u7279\u6027\u6709\uff1a"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u6700\u591a\u652f\u6301 16 \u8def\u6a21\u62df\u4fe1\u53f7\u7684\u8f93\u5165 \uff081602\u652f\u630112\u8def\uff09"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"2-\u53c2\u6570\u914d\u7f6e",children:"2. \u53c2\u6570\u914d\u7f6e"}),"\n",(0,s.jsx)(n.h3,{id:"21-\u5185\u6838\u914d\u7f6e",children:"2.1. \u5185\u6838\u914d\u7f6e"}),"\n",(0,s.jsx)(n.h4,{id:"211-\u914d\u7f6e-iio",children:"2.1.1. \u914d\u7f6e IIO"}),"\n",(0,s.jsx)(n.p,{children:"\u5728 luban \u6839\u76ee\u5f55\u4e0b\u6267\u884c make menuconfig\uff0c\u8fdb\u5165\u914d\u7f6e\uff0c\u6309\u5982\u4e0b\u9009\u62e9\uff1a"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"ArtInChip Luban SDK Configuration\n    Linux kernel\n        Advance setting\n            Linux Kernel Tools\n                <*>iio\n"})}),"\n",(0,s.jsx)(n.h4,{id:"212-\u914d\u7f6e-psadc",children:"2.1.2. \u914d\u7f6e PSADC"}),"\n",(0,s.jsx)(n.p,{children:"\u5728luban\u6839\u76ee\u5f55\u4e0b\u6267\u884c make kernel-menuconfig\uff0c\u8fdb\u5165kernel\u7684\u529f\u80fd\u914d\u7f6e\uff0c\u6309\u5982\u4e0b\u9009\u62e9\uff1a"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"Linux\n    Device Drivers\n        <*> Industrial I/O support\n            Analog to digital converters\n                <*> Artinchip PSADC driver\n"})}),"\n",(0,s.jsx)(n.h3,{id:"22-dts-\u53c2\u6570\u914d\u7f6e",children:"2.2. DTS \u53c2\u6570\u914d\u7f6e"}),"\n",(0,s.jsx)(n.h4,{id:"221-d211-\u914d\u7f6e",children:"2.2.1. D211 \u914d\u7f6e"}),"\n",(0,s.jsx)(n.p,{children:"\u5728common/d211.dtsi\u4e2d\u7684PSADC\u63a7\u5236\u5668\u5b9a\u4e49\uff1a"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'psadc: psadc@18210000 {\n    compatible = "artinchip,aic-psadc-v1.0";\n    reg = <0x0 0x18210000 0x0 0x1000>;\n    interrupts-extended = <&plic0 28 IRQ_TYPE_LEVEL_HIGH>;\n    clocks = <&cmu CLK_PSADC>, <&cmu CLK_APB0>;\n    clock-names = "psadc", "pclk";\n    resets = <&rst RESET_PSADC>;\n    #io-channel-cells = <1>;\n    status = "disabled";\n};\n'})}),"\n",(0,s.jsx)(n.h4,{id:"222-board-\u914d\u7f6e",children:"2.2.2. Board \u914d\u7f6e"}),"\n",(0,s.jsxs)(n.p,{children:["xxx/board.dts\u4e2d\u7684\u53c2\u6570\u914d\u7f6e\u9700\u8981\u533a\u5206\u901a\u9053\u53f7\uff0c\u6bcf\u4e2a\u901a\u9053\u53ef\u4ee5\u5355\u72ec\u4f7f\u80fd\u3002\u4f7f\u80fd\u7684\u901a\u9053\uff0c\u9700\u8981\u6307\u5b9a\u8be5\u901a\u9053\u7528\u5230\u7684GPIO\u914d\u7f6e\uff0c\u5982\u4e0b\u9762\u7684 ",(0,s.jsx)(n.code,{children:"psadc5_pins"}),"\uff1a"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'&psadc {\n    status = "okay";\n    pinctrl-names = "default";\n    pinctrl-0 = <&psadc5_pins>;\n\n    psadc0 {\n        status = "disabled";\n    };\n\n    psadc1 {\n        status = "disabled";\n    };\n\n    psadc2 {\n        status = "disabled";\n    };\n\n    psadc3 {\n        status = "disabled";\n    };\n\n    psadc4 {\n        status = "disabled";\n    };\n\n    psadc5 {\n        status = "disabled";\n    };\n\n    psadc6 {\n        status = "okay";\n    };\n\n    psadc7 {\n        status = "disabled";\n    };\n\n    psadc8 {\n        status = "disabled";\n    };\n\n    psadc9 {\n        status = "disabled";\n    };\n\n    psadc10 {\n        status = "disabled";\n    };\n\n    psadc11 {\n        status = "disabled";\n    };\n};\n'})}),"\n",(0,s.jsx)(n.h2,{id:"3-\u8c03\u8bd5\u6307\u5357",children:"3. \u8c03\u8bd5\u6307\u5357"}),"\n",(0,s.jsx)(n.h3,{id:"31-\u8c03\u8bd5\u5f00\u5173",children:"3.1. \u8c03\u8bd5\u5f00\u5173"}),"\n",(0,s.jsx)(n.p,{children:"\u5728luban\u6839\u76ee\u5f55\u4e0b\u6267\u884c make kernel-menuconfig\uff0c\u8fdb\u5165kernel\u7684\u529f\u80fd\u914d\u7f6e\uff0c\u53ef\u4ee5\u6253\u5f00PSADC\u6a21\u5757\u7684DEBUG\u9009\u9879\uff1a"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"Linux\n    Kernel hacking\n        Artinchip Debug\n            [*] PSADC driver debug\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u6b64DEBUG\u9009\u9879\u6253\u5f00\u7684\u5f71\u54cd\uff1a"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"PSADC \u9a71\u52a8\u4ee5-O0\u7f16\u8bd1"}),"\n",(0,s.jsx)(n.li,{children:"PSADC \u7684pr_dbg()\u548cdev_dbg()\u8c03\u8bd5\u4fe1\u606f\u4f1a\u88ab\u7f16\u8bd1"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"\u5728\u7cfb\u7edf\u8fd0\u884c\u65f6\uff0c\u5982\u679c\u8981\u6253\u5370pr_dbg()\u548cdev_dbg()\u4fe1\u606f\uff0c\u8fd8\u9700\u8981\u8c03\u6574loglevel\u4e3a8\uff0c\u4e24\u4e2a\u65b9\u6cd5\uff1a"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"\u5728board.dts\u4e2d\u4fee\u6539bootargs\uff0c\u589e\u52a0\u201cloglevel=8\u201d"}),"\n",(0,s.jsx)(n.li,{children:"\u5728\u677f\u5b50\u542f\u52a8\u5230Linux shell\u540e\uff0c\u6267\u884c\u547d\u4ee4\uff1a"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"echo 8 > /proc/sys/kernel/printk\n"})}),"\n",(0,s.jsx)(n.h3,{id:"32-sysfs-\u8282\u70b9",children:"3.2. Sysfs \u8282\u70b9"}),"\n",(0,s.jsx)(n.p,{children:"IIO\u5b50\u7cfb\u7edf\u4f1a\u4e3aADC\u8bbe\u5907\u521b\u5efa\u4e00\u7ec4\u6807\u51c6\u7684Sysfs\u8282\u70b9\u6587\u4ef6\uff0c\u53ef\u7528\u4e8e\u8bfb\u53d6ADC\u7684\u6570\u503c\u3002"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"# cd /sys/devices/platform/soc/18210000.psadc/iio:device0\n/sys/devices/platform/soc/18210000.psadc/iio:device0 # ls\ndev                         in_voltage5_raw\nevents                      in_voltage5_raw_available\nin_voltage0_raw             in_voltage6_raw\nin_voltage0_raw_available   in_voltage6_raw_available\nin_voltage10_raw            in_voltage7_raw\nin_voltage10_raw_available  in_voltage7_raw_available\nin_voltage11_raw            in_voltage8_raw\nin_voltage11_raw_available  in_voltage8_raw_available\nin_voltage1_raw             in_voltage9_raw\nin_voltage1_raw_available   in_voltage9_raw_available\nin_voltage2_raw             in_voltage_scale\nin_voltage2_raw_available   name\nin_voltage3_raw             of_node\nin_voltage3_raw_available   power\nin_voltage4_raw             subsystem\nin_voltage4_raw_available   uevent\n# cat in_voltage7_raw\n# 4095\n"})}),"\n",(0,s.jsx)(n.h2,{id:"4-\u6d4b\u8bd5\u6307\u5357",children:"4. \u6d4b\u8bd5\u6307\u5357"}),"\n",(0,s.jsx)(n.h3,{id:"41-\u6d4b\u8bd5\u73af\u5883",children:"4.1. \u6d4b\u8bd5\u73af\u5883"}),"\n",(0,s.jsx)(n.h4,{id:"411-\u786c\u4ef6",children:"4.1.1. \u786c\u4ef6"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u5f00\u53d1\u677f\uff0c\u6216D211\u7684FPGA\u677f"}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"412-\u8f6f\u4ef6",children:"4.1.2. \u8f6f\u4ef6"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"PC\u7aef\u7684\u4e32\u53e3\u7ec8\u7aef\u8f6f\u4ef6\uff0c\u7528\u4e8ePC\u548c\u5f00\u53d1\u677f\u8fdb\u884c\u4e32\u53e3\u901a\u4fe1"}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"42-adc-\u8bfb\u53d6\u6d4b\u8bd5",children:"4.2. ADC \u8bfb\u53d6\u6d4b\u8bd5"}),"\n",(0,s.jsxs)(n.p,{children:["ADC\u6570\u636e\u7684\u8bfb\u53d6\uff0c\u53ea\u9700\u8981\u666e\u901a\u7684cat\u547d\u4ee4\u5373\u53ef\uff0c\u6bcf\u6b21cat\u53ef\u8bfb\u53d6\u67d0\u4e00\u4e2a\u901a\u9053\u4e2d\u7684\u5f53\u524d\u6570\u636e\u3002\u8be6\u89c1 ",(0,s.jsx)(n.a,{href:"3_debug_guide.html#ref-psadc-sysfs",children:"Sysfs \u8282\u70b9"})]}),"\n",(0,s.jsx)(n.h2,{id:"5-\u8bbe\u8ba1\u8bf4\u660e",children:"5. \u8bbe\u8ba1\u8bf4\u660e"}),"\n",(0,s.jsx)(n.h3,{id:"51-\u6e90\u7801\u8bf4\u660e",children:"5.1. \u6e90\u7801\u8bf4\u660e"}),"\n",(0,s.jsx)(n.p,{children:"\u6e90\u4ee3\u7801\u4f4d\u4e8e\uff1adrivers/iio/adc/artinchip_psadc.c"}),"\n",(0,s.jsx)(n.h3,{id:"52-\u6a21\u5757\u67b6\u6784",children:"5.2. \u6a21\u5757\u67b6\u6784"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"IIO"}),"\n",(0,s.jsx)(n.p,{children:"\u5de5\u4e1aI/O\uff0c\u662fLinux\u5185\u6838\u4e2d\u4e13\u7528\u4e8e\u5904\u7406\u6a21\u6570\u8f6c\u6362\u5668\uff08ADC\uff09\u548c\u6570\u6a21\u8f6c\u6362\u5668\uff08DAC\uff09\u7684\u5b50\u7cfb\u7edf\uff0c\u6700\u521d\u521b\u5efa\u4e8e2009\u5e74\uff0c\u63d0\u4f9b\u4e86\u7edf\u4e00\u7684\u6846\u67b6\u6765\u8bbf\u95ee\u548c\u63a7\u5236\u5404\u79cd\u7c7b\u578b\u7684\u4f20\u611f\u5668\uff0c\u5e76\u4e14\u4e3a\u7528\u6237\u6001\u63d0\u4f9b\u4e86\u6807\u51c6\u7684\u63a5\u53e3\u3002"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"\u76ee\u524dIIO\u652f\u6301\u7684\u8bbe\u5907\u7c7b\u578b\u5305\u62ec\uff1aADC/DAC\u3001\u52a0\u901f\u5ea6\u8ba1\u3001\u78c1\u529b\u8ba1\u3001\u9640\u87ba\u4eea\u3001\u7535\u6d41/\u7535\u538b\u6d4b\u91cf\u82af\u7247\u3001\u538b\u529b\u4f20\u611f\u5668\u3001\u6e29\u5ea6\u4f20\u611f\u5668\u3001\u6e7f\u5ea6\u4f20\u611f\u5668\u3001\u5149\u4f20\u611f\u5668\u3001\u538b\u529b\u4f20\u611f\u5668\u7b49\u3002"}),"\n",(0,s.jsx)(n.p,{children:"\u6574\u4e2aIIO\u8f6f\u4ef6\u6846\u67b6\u53ef\u62bd\u8c61\u4e3a\u4e0b\u56fe\uff1a"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/sw_system17-17067677453603.png",alt:"../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/sw_system17.png"})}),"\n",(0,s.jsxs)(n.p,{children:["\u56fe 7.41 ",(0,s.jsx)(n.em,{children:"Linux IIO\u5b50\u7cfb\u7edf\u67b6\u6784\u56fe"})]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"IIO\u8bbe\u5907\u4f1a\u63d0\u4f9b\u5b57\u7b26\u8bbe\u5907\uff08\u652f\u6301\u89e6\u53d1\u7f13\u51b2\u533a\uff09\u548cSysfs\u8282\u70b9\u4f5c\u4e3a\u7528\u6237\u6001\u7684\u8bbf\u95ee\u63a5\u53e3\uff1b"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"\u4e00\u822c\u60c5\u51b5\u4e0b\uff0c\u6bcf\u4e2a\u901a\u9053\u5bf9\u5e94\u4e00\u4e2asysfs\u8282\u70b9\u6587\u4ef6\uff1b"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"\u7528\u6237\u7a7a\u95f4\u7684\u8bbe\u5907\u6587\u4ef6\u540d\u4e3e\u4f8b\uff1a"}),"\n",(0,s.jsxs)(n.p,{children:["/sys/bus/iio/iio",":deviceX","//dev/iio",":deviceX"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"53-\u5173\u952e\u6d41\u7a0b\u8bbe\u8ba1",children:"5.3. \u5173\u952e\u6d41\u7a0b\u8bbe\u8ba1"}),"\n",(0,s.jsx)(n.h4,{id:"531-\u521d\u59cb\u5316\u6d41\u7a0b",children:"5.3.1. \u521d\u59cb\u5316\u6d41\u7a0b"}),"\n",(0,s.jsx)(n.p,{children:"PSADC \u6a21\u5757\u5b8c\u5168\u9075\u5faaplatform_driver\u7684\u901a\u7528\u521d\u59cb\u5316\u6d41\u7a0b\uff0c\u7533\u8bf7regs\u8d44\u6e90\u3001clk\u3001reset\uff0c\u8fd8\u9700\u8981\u6ce8\u518c\u4e00\u4e2aiio\u8bbe\u5907\uff0c\u4f7f\u7528iio\u5b50\u7cfb\u7edf\u63d0\u4f9b\u7684\u6ce8\u518c\u63a5\u53e3iio_device_register()\uff1a"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"#define iio_device_register(indio_dev) \\\n    __iio_device_register((indio_dev), THIS_MODULE)\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u53c2\u6570indio_dev\u662f\u4e00\u4e2astruct iio_dev\u7c7b\u578b\u7684\u6307\u9488\uff0c\u5176\u4e2d\u5173\u952e\u4fe1\u606f\u6709\uff1a\u8bbe\u5907\u540d\u79f0\u3001\u901a\u9053\u6570\u76ee\u3001\u4e00\u7ec4iio\u7684\u64cd\u4f5c\u96c6(struct iio_info)\u3001\u901a\u9053\u914d\u7f6e\u4fe1\u606f\u7b49\u3002\u5728iio_info\u4e2d\uff0c\u6211\u4eec\u6682\u65f6\u53ea\u5b9e\u73b0\u4e86\u4e00\u4e2aread\u63a5\u53e3\uff1a"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"static const struct iio_info aic_psadc_iio_info = {\n    .read_raw = aic_psadc_read_raw,\n};\n"})}),"\n",(0,s.jsx)(n.h4,{id:"532-\u4e2d\u65ad\u5904\u7406\u6d41\u7a0b",children:"5.3.2. \u4e2d\u65ad\u5904\u7406\u6d41\u7a0b"}),"\n",(0,s.jsx)(n.p,{children:"PSADC\u652f\u6301\u4f7f\u7528\u4e2d\u65ad\u65b9\u5f0f\u6765\u8bfb\u53d6\u6570\u636e\uff0c\u8fd9\u6837\u907f\u514d\u8f6f\u4ef6\u53bb\u505a\u7b49\u5f85\u5904\u7406\u3002"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/psadc_irq_flow1-17067677709595.png",alt:"../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/psadc_irq_flow1.png"})}),"\n",(0,s.jsxs)(n.p,{children:["\u56fe 7.42 ",(0,s.jsx)(n.em,{children:"PSADC \u975e\u5468\u671f\u6a21\u5f0f\u7684\u6570\u636e\u91c7\u96c6\u6d41\u7a0b"})]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u5bf9\u4e8e\u975e\u5468\u671f\u6a21\u5f0f\uff1a\u5f53\u7528\u6237\u5c42\u89e6\u53d1read_raw()\u63a5\u53e3\uff0c\u5c31\u4f1a\u542f\u52a8\u4e00\u6b21\u786c\u4ef6\u53bb\u8bfb\u6570\u636e"}),"\n",(0,s.jsx)(n.li,{children:"\u5f53\u786c\u4ef6\u51c6\u5907\u597d\u6570\u636e\uff0c\u4f1a\u4ea7\u751f\u4e00\u4e2a\u4e2d\u65ad"}),"\n",(0,s.jsx)(n.li,{children:"\u5728\u4e2d\u65ad\u5904\u7406\u51fd\u6570\u4e2d\uff0c\u7528INT Flag\u6765\u533a\u5206\u662f\u54ea\u4e2a\u901a\u9053\u6709\u6570\u636e\uff0c\u9010\u4e2a\u901a\u9053\u626b\u63cf\u5c06\u6570\u636e\u8bfb\u51fa\uff0c\u4f1a\u7f13\u5b58\u5230\u4e00\u4e2a\u5168\u5c40\u53d8\u91cf\u4e2d"}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"54-\u6570\u636e\u7ed3\u6784\u8bbe\u8ba1",children:"5.4. \u6570\u636e\u7ed3\u6784\u8bbe\u8ba1"}),"\n",(0,s.jsx)(n.h4,{id:"541-aic_psadc_data",children:"5.4.1. aic_psadc_data"}),"\n",(0,s.jsx)(n.p,{children:"\u8bb0\u5f55\u5404\u4e2a\u901a\u9053\u7684\u6570\u636e\u4fe1\u606f\uff1a"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"struct aic_psadc_data {\n    int             num_bits;\n    const struct iio_chan_spec  *channels;\n    int             num_channels;\n    u32             fifo_depth[AIC_PSADC_MAX_CH];\n};\n"})}),"\n",(0,s.jsx)(n.h4,{id:"542-aic_psadc_ch",children:"5.4.2. aic_psadc_ch"}),"\n",(0,s.jsx)(n.p,{children:"\u8bb0\u5f55\u5404\u4e2a\u901a\u9053\u7684\u914d\u7f6e\u4fe1\u606f\uff1a"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"struct aic_psadc_ch {\n    u32 id;\n    bool available;\n    enum aic_psadc_mode mode;\n    u16 latest_data;\n    struct completion complete;\n};\n"})}),"\n",(0,s.jsx)(n.h4,{id:"543-aic_psadc_dev",children:"5.4.3. aic_psadc_dev"}),"\n",(0,s.jsx)(n.p,{children:"\u7ba1\u7406PSADC\u63a7\u5236\u5668\u7684\u8bbe\u5907\u8d44\u6e90\uff1a"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"struct aic_psadc_dev {\n    struct platform_device      *pdev;\n    void __iomem                *regs;\n    struct clk                  *clk;\n    struct reset_control        *rst;\n    u32                         irq;\n    u32                         pclk_rate;\n\n    struct aic_psadc_ch         chan[AIC_PSADC_MAX_CH];\n    const struct aic_psadc_data *data;\n};\n"})}),"\n",(0,s.jsx)(n.h3,{id:"55-\u63a5\u53e3\u8bbe\u8ba1",children:"5.5. \u63a5\u53e3\u8bbe\u8ba1"}),"\n",(0,s.jsx)(n.h4,{id:"551-aic_psadc_read_raw",children:"5.5.1. aic_psadc_read_raw"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"\u51fd\u6570\u539f\u578b"}),(0,s.jsx)(n.th,{children:"static int aic_psadc_read_raw(struct iio_dev *iodev, struct iio_chan_spec const *chan, int *val, int *val2, long mask)"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"\u529f\u80fd\u8bf4\u660e"}),(0,s.jsx)(n.td,{children:"\u8bfb\u53d6\u4e00\u4e2aADC\u901a\u9053\u7684\u5f53\u524d\u6570\u636e"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"\u53c2\u6570\u5b9a\u4e49"}),(0,s.jsx)(n.td,{children:"iodev - \u6307\u5411\u4e00\u4e2aiio\u8bbe\u5907chan - \u5f53\u524dADC\u901a\u9053\u7684\u914d\u7f6e\u4fe1\u606fval - \u7528\u4e8e\u4fdd\u5b58\u8bfb\u53d6\u5230\u7684\u6570\u636eval2 - \u7528\u4e8e\u4fdd\u5b58\u8bfb\u53d6\u5230\u7684\u6570\u636e\uff0c\u7528\u4e8e\u548cval\u505a\u6570\u636e\u7ec4\u5408\uff0c\u90e8\u5206mask\u7c7b\u578b\u9700\u8981mask - \u6570\u636e\u7c7b\u578b"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"\u8fd4\u56de\u503c"}),(0,s.jsx)(n.td,{children:"0\uff0c\u6210\u529f\uff1b < 0\uff0c\u5931\u8d25"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"\u6ce8\u610f\u4e8b\u9879"}),(0,s.jsx)(n.td,{})]})]})]}),"\n",(0,s.jsx)(n.h2,{id:"6-\u5e38\u89c1\u95ee\u9898",children:"6. \u5e38\u89c1\u95ee\u9898"}),"\n",(0,s.jsx)(n.h3,{id:"61-psadc-\u521d\u59cb\u5316\u5931\u8d25",children:"6.1. PSADC \u521d\u59cb\u5316\u5931\u8d25"}),"\n",(0,s.jsx)(n.h4,{id:"611-\u73b0\u8c61",children:"6.1.1. \u73b0\u8c61"}),"\n",(0,s.jsx)(n.p,{children:"\u5728 PSADC \u6a21\u5757\u521d\u59cb\u5316\u65f6\u62a5\u9519\uff0c\u4e00\u822c\u662f GPIO\u7533\u8bf7\u5931\u8d25\u3002"}),"\n",(0,s.jsx)(n.h4,{id:"612-\u539f\u56e0\u5206\u6790",children:"6.1.2. \u539f\u56e0\u5206\u6790"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\u9996\u5148\u5728DTS\u4e2d\u68c0\u67e5\u6253\u5f00\u4e86\u54ea\u51e0\u4e2aPSADC\u901a\u9053\uff0c\u5bf9\u5e94\u7684PSADC\u5f15\u7528\u662f\u5426\u6b63\u786e\uff1b\u8be6\u89c1 ",(0,s.jsx)(n.a,{href:"2_config_guide.html#ref-psadc-dts",children:"Board \u914d\u7f6e"})]}),"\n",(0,s.jsx)(n.li,{children:"\u7136\u540e\u5728\u68c0\u67e5\u8be5GPIO\u662f\u5426\u548c\u5176\u4ed6\u8bbe\u5907\u6709\u51b2\u7a81\uff0cluban\u5728\u7f16\u8bd1\u56fa\u4ef6\u7684\u65f6\u5019\u6709pinmux\u51b2\u7a81\u68c0\u67e5\uff0c\u8bf7\u786e\u8ba4\u65e0\u4efb\u4f55\u51b2\u7a81\u3002"}),"\n"]})]})}function o(e={}){const{wrapper:n}={...(0,d.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>a,a:()=>c});var s=i(7294);const d={},l=s.createContext(d);function c(e){const n=s.useContext(l);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:c(e.components),s.createElement(l.Provider,{value:n},e.children)}}}]);