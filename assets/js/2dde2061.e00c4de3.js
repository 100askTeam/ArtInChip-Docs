"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5143],{4289:(e,d,s)=>{s.r(d),s.d(d,{assets:()=>c,contentTitle:()=>r,default:()=>j,frontMatter:()=>l,metadata:()=>t,toc:()=>h});var i=s(5893),n=s(1151);const l={sidebar_position:21},r="PBus \u4f7f\u7528\u6307\u5357",t={id:"D213-DevKit/part3/07-6_PBus-Useguide",title:"PBus \u4f7f\u7528\u6307\u5357",description:"1. \u6a21\u5757\u4ecb\u7ecd",source:"@site/docs/D213-DevKit/part3/07-6_PBus-Useguide.md",sourceDirName:"D213-DevKit/part3",slug:"/D213-DevKit/part3/07-6_PBus-Useguide",permalink:"/docs/D213-DevKit/part3/07-6_PBus-Useguide",draft:!1,unlisted:!1,editUrl:"https://github.com/100askTeam/ArtInChip-Docs/tree/master/docs/D213-DevKit/part3/07-6_PBus-Useguide.md",tags:[],version:"current",sidebarPosition:21,frontMatter:{sidebar_position:21},sidebar:"d213dkSidebar",previous:{title:"MAC \u4f7f\u7528\u6307\u5357",permalink:"/docs/D213-DevKit/part3/07-5_MAC-Useguide"},next:{title:"PINCTRL \u4f7f\u7528\u6307\u5357",permalink:"/docs/D213-DevKit/part3/07-7_PINCTRL-Useguide"}},c={},h=[{value:"1. \u6a21\u5757\u4ecb\u7ecd",id:"1-\u6a21\u5757\u4ecb\u7ecd",level:2},{value:"1.1. \u672f\u8bed\u5b9a\u4e49",id:"11-\u672f\u8bed\u5b9a\u4e49",level:3},{value:"1.2. \u6a21\u5757\u7b80\u4ecb",id:"12-\u6a21\u5757\u7b80\u4ecb",level:3},{value:"2. \u53c2\u6570\u914d\u7f6e",id:"2-\u53c2\u6570\u914d\u7f6e",level:2},{value:"2.1. \u5185\u6838\u914d\u7f6e",id:"21-\u5185\u6838\u914d\u7f6e",level:3},{value:"2.2. DTS \u53c2\u6570\u914d\u7f6e",id:"22-dts-\u53c2\u6570\u914d\u7f6e",level:3},{value:"2.2.1. PBus \u81ea\u5b9a\u4e49\u53c2\u6570",id:"221-pbus-\u81ea\u5b9a\u4e49\u53c2\u6570",level:4},{value:"2.2.2. D211 \u914d\u7f6e",id:"222-d211-\u914d\u7f6e",level:4},{value:"2.2.3. Board \u914d\u7f6e",id:"223-board-\u914d\u7f6e",level:4},{value:"3. \u8c03\u8bd5\u6307\u5357",id:"3-\u8c03\u8bd5\u6307\u5357",level:2},{value:"3.1. Sysfs \u8282\u70b9",id:"31-sysfs-\u8282\u70b9",level:3},{value:"3.1.1. \u72b6\u6001\u4fe1\u606f",id:"311-\u72b6\u6001\u4fe1\u606f",level:4},{value:"4. \u6d4b\u8bd5\u6307\u5357",id:"4-\u6d4b\u8bd5\u6307\u5357",level:2},{value:"4.1. \u6d4b\u8bd5\u73af\u5883",id:"41-\u6d4b\u8bd5\u73af\u5883",level:3},{value:"4.1.1. \u786c\u4ef6",id:"411-\u786c\u4ef6",level:4},{value:"4.1.2. \u8f6f\u4ef6",id:"412-\u8f6f\u4ef6",level:4},{value:"4.2. \u67e5\u770bPBus\u7684\u914d\u7f6e\u53c2\u6570",id:"42-\u67e5\u770bpbus\u7684\u914d\u7f6e\u53c2\u6570",level:3},{value:"5. \u8bbe\u8ba1\u8bf4\u660e",id:"5-\u8bbe\u8ba1\u8bf4\u660e",level:2},{value:"5.1. \u6e90\u7801\u8bf4\u660e",id:"51-\u6e90\u7801\u8bf4\u660e",level:3},{value:"5.2. \u6a21\u5757\u67b6\u6784",id:"52-\u6a21\u5757\u67b6\u6784",level:3},{value:"5.3. \u5173\u952e\u6d41\u7a0b\u8bbe\u8ba1",id:"53-\u5173\u952e\u6d41\u7a0b\u8bbe\u8ba1",level:3},{value:"5.3.1. \u521d\u59cb\u5316\u6d41\u7a0b",id:"531-\u521d\u59cb\u5316\u6d41\u7a0b",level:4},{value:"5.4. \u6570\u636e\u7ed3\u6784\u8bbe\u8ba1",id:"54-\u6570\u636e\u7ed3\u6784\u8bbe\u8ba1",level:3},{value:"5.4.1. pbus_dev",id:"541-pbus_dev",level:4},{value:"5.5. \u63a5\u53e3\u8bbe\u8ba1",id:"55-\u63a5\u53e3\u8bbe\u8ba1",level:3},{value:"5.5.1. pbus_set_cfg0",id:"551-pbus_set_cfg0",level:4},{value:"5.5.2. pbus_set_cfg1",id:"552-pbus_set_cfg1",level:4},{value:"5.5.3. pbus_set_cfg2",id:"553-pbus_set_cfg2",level:4},{value:"6. \u5e38\u89c1\u95ee\u9898",id:"6-\u5e38\u89c1\u95ee\u9898",level:2}];function x(e){const d={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,n.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(d.h1,{id:"pbus-\u4f7f\u7528\u6307\u5357",children:"PBus \u4f7f\u7528\u6307\u5357"}),"\n",(0,i.jsx)(d.h2,{id:"1-\u6a21\u5757\u4ecb\u7ecd",children:"1. \u6a21\u5757\u4ecb\u7ecd"}),"\n",(0,i.jsx)(d.h3,{id:"11-\u672f\u8bed\u5b9a\u4e49",children:"1.1. \u672f\u8bed\u5b9a\u4e49"}),"\n",(0,i.jsxs)(d.table,{children:[(0,i.jsx)(d.thead,{children:(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.th,{children:"\u672f\u8bed"}),(0,i.jsx)(d.th,{children:"\u5b9a\u4e49"}),(0,i.jsx)(d.th,{children:"\u6ce8\u91ca\u8bf4\u660e"})]})}),(0,i.jsxs)(d.tbody,{children:[(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"PBus"}),(0,i.jsx)(d.td,{children:"Parallel Bus"}),(0,i.jsx)(d.td,{children:"\u5e76\u884c\u603b\u7ebf"})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"AHB"}),(0,i.jsx)(d.td,{children:"Advanced High performance Bus"}),(0,i.jsx)(d.td,{children:"\uff08\u9ad8\u901f\uff09\u7cfb\u7edf\u603b\u7ebf"})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"APB"}),(0,i.jsx)(d.td,{children:"Advanced Peripheral Bus"}),(0,i.jsx)(d.td,{children:"\u5916\u8bbe/\u5916\u56f4\u603b\u7ebf"})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"DMA"}),(0,i.jsx)(d.td,{children:"Direct Memory Access"}),(0,i.jsx)(d.td,{children:"\u76f4\u63a5\u5b58\u50a8\u5668\u8bbf\u95ee"})]})]})]}),"\n",(0,i.jsx)(d.h3,{id:"12-\u6a21\u5757\u7b80\u4ecb",children:"1.2. \u6a21\u5757\u7b80\u4ecb"}),"\n",(0,i.jsx)(d.p,{children:"PBus \u6a21\u5757\u4e3b\u8981\u5b9e\u73b0\u4e86\u4e00\u7ec4\u5916\u90e8\u5e76\u884c\u603b\u7ebf\uff0c\u53ef\u7528\u4e8e\u4e0e\u5916\u90e8FPGA\u3001SRAM\u7b49\u7b49\u5143\u5668\u4ef6\u5b9e\u73b0\u8fde\u63a5\u3002"}),"\n",(0,i.jsx)(d.p,{children:"PBus \u6a21\u5757\u652f\u6301\u7684\u7279\u6027\u6709\uff1a"}),"\n",(0,i.jsxs)(d.ul,{children:["\n",(0,i.jsx)(d.li,{children:"\u652f\u6301AHB\u603b\u7ebf\u8bbf\u95ee\u914d\u7f6e\u5bc4\u5b58\u5668\u548c\u5916\u90e8\u8bbe\u5907\u5730\u5740\u7a7a\u95f4"}),"\n",(0,i.jsx)(d.li,{children:"AHB\u4e0ePBus\u4ec5\u652f\u6301Single\u64cd\u4f5c\uff0c\u4e0d\u652f\u6301Burst\u64cd\u4f5c"}),"\n",(0,i.jsx)(d.li,{children:"16bit\u5730\u5740\u548c\u6570\u636e\u603b\u7ebf\u590d\u7528"}),"\n",(0,i.jsx)(d.li,{children:"\u5916\u90e8\u8bbe\u5907\u5730\u5740\u7a7a\u95f4\u4e3a64KB"}),"\n",(0,i.jsx)(d.li,{children:"\u6bcf\u7b14\u64cd\u4f5c\u53ef\u5b9e\u73b016bit\u6570\u636e\u8bfb/\u5199"}),"\n",(0,i.jsx)(d.li,{children:"\u9488\u5bf9NCS/NADV/NWE/NOE/AD\u4fe1\u53f7\u65f6\u5e8f\u53ef\u7075\u6d3b\u914d\u7f6e"}),"\n",(0,i.jsx)(d.li,{children:"\u53ef\u652f\u6301DMA\u5bf9\u5916\u90e8\u8bbe\u5907\u5730\u5740\u7a7a\u95f4\u8fdb\u884c\u8bfb\u5199\u8bbf\u95ee"}),"\n"]}),"\n",(0,i.jsx)(d.h2,{id:"2-\u53c2\u6570\u914d\u7f6e",children:"2. \u53c2\u6570\u914d\u7f6e"}),"\n",(0,i.jsx)(d.h3,{id:"21-\u5185\u6838\u914d\u7f6e",children:"2.1. \u5185\u6838\u914d\u7f6e"}),"\n",(0,i.jsx)(d.p,{children:"\u5728luban\u6839\u76ee\u5f55\u4e0b\u6267\u884c make kernel-menuconfig\uff0c\u8fdb\u5165kernel\u7684\u529f\u80fd\u914d\u7f6e\uff0c\u6309\u5982\u4e0b\u9009\u62e9\uff1a"}),"\n",(0,i.jsx)(d.pre,{children:(0,i.jsx)(d.code,{children:"Linux\n    Device Drivers\n        Misc devices\n            [*] PBUS driver for Artinchip SoC\n"})}),"\n",(0,i.jsx)(d.h3,{id:"22-dts-\u53c2\u6570\u914d\u7f6e",children:"2.2. DTS \u53c2\u6570\u914d\u7f6e"}),"\n",(0,i.jsx)(d.h4,{id:"221-pbus-\u81ea\u5b9a\u4e49\u53c2\u6570",children:"2.2.1. PBus \u81ea\u5b9a\u4e49\u53c2\u6570"}),"\n",(0,i.jsx)(d.p,{children:"PBus \u9a71\u52a8\u652f\u6301\u4eceDTS\u4e2d\u914d\u7f6e\u7684\u53c2\u6570\u5b9a\u4e49\uff0c\u57fa\u672c\u548cSpec\u4e2dCFG\u5bc4\u5b58\u5668\u7684\u5b57\u6bb5\u5206\u5e03\u4fdd\u6301\u4e00\u81f4\u3002\u5982\u4e0b\u8868\uff1a"}),"\n",(0,i.jsxs)(d.table,{children:[(0,i.jsx)(d.thead,{children:(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.th,{children:"\u5bc4\u5b58\u5668"}),(0,i.jsx)(d.th,{children:"\u53c2\u6570\u540d\u79f0"}),(0,i.jsx)(d.th,{children:"\u53d6\u503c\u8303\u56f4"}),(0,i.jsx)(d.th,{children:"\u529f\u80fd\u8bf4\u660e"})]})}),(0,i.jsxs)(d.tbody,{children:[(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"CFG0"}),(0,i.jsx)(d.td,{children:"outenable-pol-highactive"}),(0,i.jsx)(d.td,{children:"[0, 1]"}),(0,i.jsx)(d.td,{children:"\u5916\u8bbe\u8f93\u51fa\u4f7f\u80fd\u7684\u6781\u6027\uff0c\u662f\u5426\u9ad8\u7535\u5e73\u6709\u6548"})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"wrenable-pol-highactive"}),(0,i.jsx)(d.td,{children:"[0, 1]"}),(0,i.jsx)(d.td,{children:"\u8bfb\u5199\u6307\u793a\u4fe1\u53f7\u7684\u6781\u6027\uff0c\u662f\u5426\u9ad8\u7535\u5e73\u6709\u6548"}),(0,i.jsx)(d.td,{})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"addrvalid-pol-highactive"}),(0,i.jsx)(d.td,{children:"[0, 1]"}),(0,i.jsx)(d.td,{children:"\u5730\u5740\u6709\u6548\u4fe1\u53f7\u7684\u6781\u6027\uff0c\u662f\u5426\u9ad8\u7535\u5e73\u6709\u6548"}),(0,i.jsx)(d.td,{})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"cs-pol-highactive"}),(0,i.jsx)(d.td,{children:"[0, 1]"}),(0,i.jsx)(d.td,{children:"\u5916\u8bbe\u7247\u9009\u4fe1\u53f7\u7684\u6781\u6027\uff0c\u662f\u5426\u9ad8\u7535\u5e73\u6709\u6548"}),(0,i.jsx)(d.td,{})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"busclk-pol-riseedge"}),(0,i.jsx)(d.td,{children:"[0, 1]"}),(0,i.jsx)(d.td,{children:"\u5730\u5740/\u6570\u636e\u662f\u5426\u5728\u603b\u7ebf\u65f6\u949f\u4fe1\u53f7\u4e0a\u5347\u6cbf\u8df3\u53d8"}),(0,i.jsx)(d.td,{})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"busclk-outenable"}),(0,i.jsx)(d.td,{children:"[0, 1]"}),(0,i.jsx)(d.td,{children:"\u603b\u7ebf\u65f6\u949f\u8f93\u51fa\u7684\u4f7f\u80fd"}),(0,i.jsx)(d.td,{})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"busclk-div"}),(0,i.jsx)(d.td,{children:"[0, 3]"}),(0,i.jsx)(d.td,{children:"\u603b\u7ebf\u65f6\u949f\u5206\u9891\uff0c0 - \u672a\u5b9a\u4e49\uff0c1 - HCLK/2, 2 - HCLK/4, 3 - HCLK/8"}),(0,i.jsx)(d.td,{})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"CFG1"}),(0,i.jsx)(d.td,{children:"wrdata-holdtime"}),(0,i.jsx)(d.td,{children:"[0, 15]"}),(0,i.jsx)(d.td,{children:"\u5199\u6570\u636e\u8f93\u51fa\u7684\u4fdd\u6301\u65f6\u95f4"})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"wrdata-delaytime"}),(0,i.jsx)(d.td,{children:"[0, 15]"}),(0,i.jsx)(d.td,{children:"\u5199\u6570\u636e\u8f93\u51fa\u7684\u5ef6\u8fdf\u65f6\u95f4"}),(0,i.jsx)(d.td,{})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"addr-holdtime"}),(0,i.jsx)(d.td,{children:"[0, 15]"}),(0,i.jsx)(d.td,{children:"\u5730\u5740\u8f93\u51fa\u7684\u4fdd\u6301\u65f6\u95f4"}),(0,i.jsx)(d.td,{})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"addr-delaytime"}),(0,i.jsx)(d.td,{children:"[0, 15]"}),(0,i.jsx)(d.td,{children:"\u5730\u5740\u8f93\u51fa\u7684\u5ef6\u8fdf\u65f6\u95f4"}),(0,i.jsx)(d.td,{})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"cs-holdtime"}),(0,i.jsx)(d.td,{children:"[0, 15]"}),(0,i.jsx)(d.td,{children:"\u5916\u8bbe\u7247\u9009\u4fe1\u53f7\u7684\u6709\u6548\u4fdd\u6301\u65f6\u95f4"}),(0,i.jsx)(d.td,{})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"cs-delaytime"}),(0,i.jsx)(d.td,{children:"[0, 15]"}),(0,i.jsx)(d.td,{children:"\u5916\u8bbe\u7247\u9009\u4fe1\u53f7\u7684\u6709\u6548\u6700\u5c0f\u95f4\u9694"}),(0,i.jsx)(d.td,{})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"CFG2"}),(0,i.jsx)(d.td,{children:"outenable-holdtime"}),(0,i.jsx)(d.td,{children:"[0, 15]"}),(0,i.jsx)(d.td,{children:"\u5916\u8bbe\u8f93\u51fa\u4f7f\u80fd\u7684\u4fdd\u6301\u65f6\u95f4"})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"outenable-delaytime"}),(0,i.jsx)(d.td,{children:"[0, 15]"}),(0,i.jsx)(d.td,{children:"\u5916\u8bbe\u8f93\u51fa\u4f7f\u80fd\u7684\u5ef6\u8fdf\u65f6\u95f4"}),(0,i.jsx)(d.td,{})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"wrrd-holdtime"}),(0,i.jsx)(d.td,{children:"[0, 15]"}),(0,i.jsx)(d.td,{children:"\u8bfb\u5199\u63a7\u5236\u4fe1\u53f7\u7684\u4fdd\u6301\u65f6\u95f4"}),(0,i.jsx)(d.td,{})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"wrrd-delaytime"}),(0,i.jsx)(d.td,{children:"[0, 15]"}),(0,i.jsx)(d.td,{children:"\u8bfb\u5199\u63a7\u5236\u4fe1\u53f7\u7684\u5ef6\u8fdf\u65f6\u95f4"}),(0,i.jsx)(d.td,{})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"addrvalid-holdtime"}),(0,i.jsx)(d.td,{children:"[0, 15]"}),(0,i.jsx)(d.td,{children:"\u5730\u5740\u6709\u6548\u4fe1\u53f7\u7684\u4fdd\u6301\u65f6\u95f4"}),(0,i.jsx)(d.td,{})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"addrvalid-delaytime"}),(0,i.jsx)(d.td,{children:"[0, 15]"}),(0,i.jsx)(d.td,{children:"\u5730\u5740\u6709\u6548\u4fe1\u53f7\u7684\u5ef6\u8fdf\u65f6\u95f4"}),(0,i.jsx)(d.td,{})]})]})]}),"\n",(0,i.jsx)(d.p,{children:"\u6ce8\u89e3"}),"\n",(0,i.jsxs)(d.ol,{children:["\n",(0,i.jsx)(d.li,{children:"\u8868\u4e2d\u4e3a\u4e86\u66f4\u52a0\u7b80\u6d01\uff0c\u53c2\u6570\u540d\u79f0\u90fd\u7701\u7565\u4e86\u524d\u7f00\u201caic,\u201d"}),"\n",(0,i.jsx)(d.li,{children:"\u524d\u97626\u4e2a\u53c2\u6570\uff0c\u53d6\u503c\u8303\u56f4\u662f [0, 1]\uff0c\u5728DTS\u4e2d\u662fboolean\u7c7b\u578b\uff0c\u5176\u4ed6\u53c2\u6570\u90fd\u662f\u6b63\u6574\u6570\u7c7b\u578b"}),"\n",(0,i.jsx)(d.li,{children:"\u201c\u4fdd\u6301\u65f6\u95f4\u201d\u548c\u201c\u5ef6\u8fdf\u65f6\u95f4\u201d \u7684\u5355\u4f4d\uff0c\u90fd\u662f PBus clk \u7684\u5468\u671f\u503c"}),"\n"]}),"\n",(0,i.jsx)(d.h4,{id:"222-d211-\u914d\u7f6e",children:"2.2.2. D211 \u914d\u7f6e"}),"\n",(0,i.jsx)(d.p,{children:"common/d211.dtsi\u4e2d\u7684\u53c2\u6570\u914d\u7f6e\uff1a"}),"\n",(0,i.jsx)(d.pre,{children:(0,i.jsx)(d.code,{children:'pbus: pbus@107F0000 {\n    compatible = "artinchip,aic-pbus-v1.0";\n    reg = <0x0 0x107F0000 0x0 0x1000>;\n    clocks = <&cmu CLK_PBUS>;\n    resets = <&rst RESET_PBUS>;\n};\n'})}),"\n",(0,i.jsx)(d.h4,{id:"223-board-\u914d\u7f6e",children:"2.2.3. Board \u914d\u7f6e"}),"\n",(0,i.jsx)(d.p,{children:"xxx/board.dts\u4e2d\u7684\u53c2\u6570\u914d\u7f6e\uff1a"}),"\n",(0,i.jsx)(d.pre,{children:(0,i.jsx)(d.code,{children:'&pbus {\n    aic,busclk-div = <2>;\n    aic,busclk-outenable;\n    aic,busclk-pol-riseedge;\n    aic,cs-pol-highactive;\n    aic,addrvalid-pol-highactive;\n    aic,wrenable-pol-highactive;\n    aic,outenable-pol-highactive;\n\n    aic,wrdata-holdtime = <1>;\n    aic,wrdata-delaytime = <2>;\n    aic,addr-holdtime = <3>;\n    aic,addr-delaytime = <4>;\n    aic,cs-holdtime = <5>;\n    aic,cs-delaytime = <6>;\n\n    aic,outenable-holdtime = <7>;\n    aic,outenable-delaytime = <8>;\n    aic,wrrd-holdtime = <9>;\n    aic,wrrd-delaytime = <10>;\n    aic,addrvalid-holdtime = <11>;\n    aic,addrvalid-delaytime = <12>;\n\n    status = "okay";\n};\n'})}),"\n",(0,i.jsx)(d.h2,{id:"3-\u8c03\u8bd5\u6307\u5357",children:"3. \u8c03\u8bd5\u6307\u5357"}),"\n",(0,i.jsx)(d.h3,{id:"31-sysfs-\u8282\u70b9",children:"3.1. Sysfs \u8282\u70b9"}),"\n",(0,i.jsx)(d.h4,{id:"311-\u72b6\u6001\u4fe1\u606f",children:"3.1.1. \u72b6\u6001\u4fe1\u606f"}),"\n",(0,i.jsxs)(d.p,{children:["\u5728 PBus \u9a71\u52a8\u521d\u59cb\u5316\u6210\u529f\u540e\uff0c\u4f1a\u5728Sysfs\u4e2d\u6ce8\u518c\u751f\u6210\u4e00\u4e2a ",(0,i.jsx)(d.code,{children:"status"})," \u8282\u70b9\uff0c\u5176\u4e2d\u6253\u5370\u4e86\u5f53\u524d\u7684 PBus \u63a7\u5236\u5668\u7684\u914d\u7f6e\u53ca\u72b6\u6001\u4fe1\u606f\uff1a"]}),"\n",(0,i.jsx)(d.pre,{children:(0,i.jsx)(d.code,{children:" # cat /sys/devices/platform/soc/107f0000.pbus/status\nIn PBUS V1.00:\nBus clk: Div 1, Out enable 0, Pol 0\nPOL: CS 0, Addr valid 0, Write enable 0, Out enable 0\n\n            Hold time    Delay time\n   WR data: 2            6\n      Addr: 3            1\n        CS: 8            2\nOut enable: 3            5\nWrite&Read: 6            1\nAddr Valid: 2            1\n"})}),"\n",(0,i.jsx)(d.h2,{id:"4-\u6d4b\u8bd5\u6307\u5357",children:"4. \u6d4b\u8bd5\u6307\u5357"}),"\n",(0,i.jsx)(d.h3,{id:"41-\u6d4b\u8bd5\u73af\u5883",children:"4.1. \u6d4b\u8bd5\u73af\u5883"}),"\n",(0,i.jsx)(d.h4,{id:"411-\u786c\u4ef6",children:"4.1.1. \u786c\u4ef6"}),"\n",(0,i.jsxs)(d.ul,{children:["\n",(0,i.jsx)(d.li,{children:"\u5f00\u53d1\u677f\uff0c\u6216D211\u7684FPGA\u677f"}),"\n"]}),"\n",(0,i.jsx)(d.h4,{id:"412-\u8f6f\u4ef6",children:"4.1.2. \u8f6f\u4ef6"}),"\n",(0,i.jsxs)(d.ul,{children:["\n",(0,i.jsx)(d.li,{children:"PC\u7aef\u7684\u4e32\u53e3\u7ec8\u7aef\u8f6f\u4ef6\uff0c\u7528\u4e8ePC\u548c\u5f00\u53d1\u677f\u8fdb\u884c\u4e32\u53e3\u901a\u4fe1"}),"\n"]}),"\n",(0,i.jsx)(d.h3,{id:"42-\u67e5\u770bpbus\u7684\u914d\u7f6e\u53c2\u6570",children:"4.2. \u67e5\u770bPBus\u7684\u914d\u7f6e\u53c2\u6570"}),"\n",(0,i.jsxs)(d.p,{children:["\u901a\u8fc7PBus\u9a71\u52a8\u5728Sysfs\u6ce8\u518c\u7684 ",(0,i.jsx)(d.code,{children:"status"})," \u8282\u70b9\uff0c\u53ef\u4ee5\u67e5\u770b\u5f53\u524dPBus\u63a7\u5236\u7684\u914d\u7f6e\u53c2\u6570\u3002\u8be6\u89c1 ",(0,i.jsx)(d.a,{href:"3_debug_guide.html#ref-pbus-sysfs",children:"Sysfs \u8282\u70b9"})]}),"\n",(0,i.jsx)(d.p,{children:"\u6ce8\u89e3"}),"\n",(0,i.jsx)(d.p,{children:"TODO\uff1aFPGA\u73af\u5883\u4e2d\u65e0\u6cd5\u5b9e\u6d4bPBus\u7684\u529f\u80fd\uff0c\u6682\u65e0\u529f\u80fd\u6d4b\u8bd5\u7684\u8bb0\u5f55\u3002"}),"\n",(0,i.jsx)(d.h2,{id:"5-\u8bbe\u8ba1\u8bf4\u660e",children:"5. \u8bbe\u8ba1\u8bf4\u660e"}),"\n",(0,i.jsx)(d.h3,{id:"51-\u6e90\u7801\u8bf4\u660e",children:"5.1. \u6e90\u7801\u8bf4\u660e"}),"\n",(0,i.jsx)(d.p,{children:"\u6e90\u4ee3\u7801\u4f4d\u4e8e\uff1adrivers/misc/artinchip-pbus.c"}),"\n",(0,i.jsx)(d.h3,{id:"52-\u6a21\u5757\u67b6\u6784",children:"5.2. \u6a21\u5757\u67b6\u6784"}),"\n",(0,i.jsx)(d.p,{children:"PBus\u5bf9\u7528\u6237\u6765\u8bf4\uff0c\u53ea\u9700\u8981\u80fd\u591f\u8bbe\u7f6e\u4e00\u4e9b\u4fe1\u53f7\u53c2\u6570\u5373\u53ef\uff0c\u6240\u4ee5\u5c06\u5176\u5f52\u5165Linux\u5185\u6838\u4e2d\u7684Misc\u8bbe\u5907\u3002"}),"\n",(0,i.jsx)(d.p,{children:"\u4e0d\u9700\u8981\u8fd0\u884c\u65f6\u4fee\u6539\u53c2\u6570\uff0c\u6240\u4ee5\u4e5f\u4e0d\u9700\u8981\u5355\u72ec\u521b\u5efa\u8bbe\u5907\u8282\u70b9\uff0cPBus\u9a71\u52a8\u4f1a\u7528DTS\u65b9\u5f0f\u6765\u89e3\u6790\u548c\u8bbe\u7f6e\u4fe1\u53f7\u53c2\u6570\u3002"}),"\n",(0,i.jsx)(d.h3,{id:"53-\u5173\u952e\u6d41\u7a0b\u8bbe\u8ba1",children:"5.3. \u5173\u952e\u6d41\u7a0b\u8bbe\u8ba1"}),"\n",(0,i.jsx)(d.h4,{id:"531-\u521d\u59cb\u5316\u6d41\u7a0b",children:"5.3.1. \u521d\u59cb\u5316\u6d41\u7a0b"}),"\n",(0,i.jsx)(d.p,{children:"PBus \u6a21\u5757\u9075\u5faaplatform_driver\u7684\u901a\u7528\u521d\u59cb\u5316\u6d41\u7a0b\uff0c\u7533\u8bf7regs\u8d44\u6e90\u3001clk\u3001reset\uff0c\u7136\u540e\u4eceDTS\u4e2d\u89e3\u6790\u53c2\u6570\u5e76\u5199\u5165PBus\u63a7\u5236\u5668\u3002"}),"\n",(0,i.jsx)(d.p,{children:"\u5728probe()\u63a5\u53e3\u7684\u6700\u540e\u9762\uff0c\u4f1a\u987a\u6b21\u8c03\u7528\u4e09\u4e2a\u63a5\u53e3\u6765\u8bbe\u7f6ePBus\u7684\u4e09\u4e2aCFG\u5bc4\u5b58\u5668\uff1a"}),"\n",(0,i.jsx)(d.pre,{children:(0,i.jsx)(d.code,{children:"pbus_set_cfg0(&pdev->dev, pbus->base);\npbus_set_cfg1(&pdev->dev, pbus->base);\npbus_set_cfg2(&pdev->dev, pbus->base);\n"})}),"\n",(0,i.jsx)(d.h3,{id:"54-\u6570\u636e\u7ed3\u6784\u8bbe\u8ba1",children:"5.4. \u6570\u636e\u7ed3\u6784\u8bbe\u8ba1"}),"\n",(0,i.jsx)(d.h4,{id:"541-pbus_dev",children:"5.4.1. pbus_dev"}),"\n",(0,i.jsx)(d.p,{children:"\u7ba1\u7406 PBus \u63a7\u5236\u5668\u7684\u8bbe\u5907\u8d44\u6e90\uff1a"}),"\n",(0,i.jsx)(d.pre,{children:(0,i.jsx)(d.code,{children:"struct pbus_dev {\n    void __iomem *base;\n    struct platform_device *pdev;\n    struct attribute_group attrs;\n    struct clk *clk;\n    struct reset_control *rst;\n};\n"})}),"\n",(0,i.jsx)(d.h3,{id:"55-\u63a5\u53e3\u8bbe\u8ba1",children:"5.5. \u63a5\u53e3\u8bbe\u8ba1"}),"\n",(0,i.jsx)(d.p,{children:"\u4ee5\u4e0b\u662f\u63d0\u4f9b\u7ed9 probe() \u8c03\u7528\u7684\u4e09\u4e2a\u5185\u90e8\u63a5\u53e3\uff1a"}),"\n",(0,i.jsx)(d.h4,{id:"551-pbus_set_cfg0",children:"5.5.1. pbus_set_cfg0"}),"\n",(0,i.jsxs)(d.table,{children:[(0,i.jsx)(d.thead,{children:(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.th,{children:"\u51fd\u6570\u539f\u578b"}),(0,i.jsx)(d.th,{children:"static void pbus_set_cfg0(struct device *dev, void __iomem *base)"})]})}),(0,i.jsxs)(d.tbody,{children:[(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"\u529f\u80fd\u8bf4\u660e"}),(0,i.jsx)(d.td,{children:"\u4eceDTS\u4e2d\u89e3\u6790\u53c2\u6570\uff0c\u5e76\u8bbe\u7f6ePBus\u7684\u5bc4\u5b58\u5668 PBUS_CFG0"})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"\u53c2\u6570\u5b9a\u4e49"}),(0,i.jsx)(d.td,{children:"dev - \u6307\u5411PBus\u8bbe\u5907base - PBus\u5bc4\u5b58\u5668\u57fa\u5730\u5740\u7684\u6620\u5c04\u5730\u5740"})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"\u8fd4\u56de\u503c"}),(0,i.jsx)(d.td,{children:"\u65e0"})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"\u6ce8\u610f\u4e8b\u9879"}),(0,i.jsx)(d.td,{})]})]})]}),"\n",(0,i.jsx)(d.h4,{id:"552-pbus_set_cfg1",children:"5.5.2. pbus_set_cfg1"}),"\n",(0,i.jsxs)(d.table,{children:[(0,i.jsx)(d.thead,{children:(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.th,{children:"\u51fd\u6570\u539f\u578b"}),(0,i.jsx)(d.th,{children:"static void pbus_set_cfg1(struct device *dev, void __iomem *base)"})]})}),(0,i.jsxs)(d.tbody,{children:[(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"\u529f\u80fd\u8bf4\u660e"}),(0,i.jsx)(d.td,{children:"\u4eceDTS\u4e2d\u89e3\u6790\u53c2\u6570\uff0c\u5e76\u8bbe\u7f6ePBus\u7684\u5bc4\u5b58\u5668 PBUS_CFG1"})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"\u53c2\u6570\u5b9a\u4e49"}),(0,i.jsx)(d.td,{children:"dev - \u6307\u5411PBus\u8bbe\u5907base - PBus\u5bc4\u5b58\u5668\u57fa\u5730\u5740\u7684\u6620\u5c04\u5730\u5740"})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"\u8fd4\u56de\u503c"}),(0,i.jsx)(d.td,{children:"\u65e0"})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"\u6ce8\u610f\u4e8b\u9879"}),(0,i.jsx)(d.td,{})]})]})]}),"\n",(0,i.jsx)(d.h4,{id:"553-pbus_set_cfg2",children:"5.5.3. pbus_set_cfg2"}),"\n",(0,i.jsxs)(d.table,{children:[(0,i.jsx)(d.thead,{children:(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.th,{children:"\u51fd\u6570\u539f\u578b"}),(0,i.jsx)(d.th,{children:"static void pbus_set_cfg2(struct device *dev, void __iomem *base)"})]})}),(0,i.jsxs)(d.tbody,{children:[(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"\u529f\u80fd\u8bf4\u660e"}),(0,i.jsx)(d.td,{children:"\u4eceDTS\u4e2d\u89e3\u6790\u53c2\u6570\uff0c\u5e76\u8bbe\u7f6ePBus\u7684\u5bc4\u5b58\u5668 PBUS_CFG2"})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"\u53c2\u6570\u5b9a\u4e49"}),(0,i.jsx)(d.td,{children:"dev - \u6307\u5411PBus\u8bbe\u5907base - PBus\u5bc4\u5b58\u5668\u57fa\u5730\u5740\u7684\u6620\u5c04\u5730\u5740"})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"\u8fd4\u56de\u503c"}),(0,i.jsx)(d.td,{children:"\u65e0"})]}),(0,i.jsxs)(d.tr,{children:[(0,i.jsx)(d.td,{children:"\u6ce8\u610f\u4e8b\u9879"}),(0,i.jsx)(d.td,{})]})]})]}),"\n",(0,i.jsx)(d.h2,{id:"6-\u5e38\u89c1\u95ee\u9898",children:"6. \u5e38\u89c1\u95ee\u9898"}),"\n",(0,i.jsx)(d.p,{children:"\u6ce8\u89e3"}),"\n",(0,i.jsx)(d.p,{children:"FPGA\u73af\u5883\u4e2d\u65e0\u6cd5\u5b9e\u6d4bPBus\u7684\u529f\u80fd\uff0c\u6682\u65e0\u95ee\u9898\u8bb0\u5f55\u3002"})]})}function j(e={}){const{wrapper:d}={...(0,n.a)(),...e.components};return d?(0,i.jsx)(d,{...e,children:(0,i.jsx)(x,{...e})}):x(e)}},1151:(e,d,s)=>{s.d(d,{Z:()=>t,a:()=>r});var i=s(7294);const n={},l=i.createContext(n);function r(e){const d=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(d):{...d,...e}}),[d,e])}function t(e){let d;return d=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:r(e.components),i.createElement(l.Provider,{value:d},e.children)}}}]);