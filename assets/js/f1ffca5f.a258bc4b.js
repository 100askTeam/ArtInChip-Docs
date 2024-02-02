"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3390],{1863:(e,d,s)=>{s.r(d),s.d(d,{assets:()=>h,contentTitle:()=>i,default:()=>j,frontMatter:()=>n,metadata:()=>c,toc:()=>l});var r=s(5893),t=s(1151);const n={sidebar_position:1},i="ArtInChip U-Boot\u4ecb\u7ecd",c={id:"D213-DevKit/part5/03-1_BasicIntroduction",title:"ArtInChip U-Boot\u4ecb\u7ecd",description:"1. \u529f\u80fd\u652f\u6301",source:"@site/docs/D213-DevKit/part5/03-1_BasicIntroduction.md",sourceDirName:"D213-DevKit/part5",slug:"/D213-DevKit/part5/03-1_BasicIntroduction",permalink:"/docs/D213-DevKit/part5/03-1_BasicIntroduction",draft:!1,unlisted:!1,editUrl:"https://github.com/100askTeam/ArtInChip-Docs/tree/master/docs/D213-DevKit/part5/03-1_BasicIntroduction.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"d213dkSidebar",previous:{title:"Linux-Uboot\u5f00\u53d1",permalink:"/docs/category/linux-uboot\u5f00\u53d1"},next:{title:"\u542f\u52a8\u53c2\u6570",permalink:"/docs/D213-DevKit/part5/03-2_StartupParameter"}},h={},l=[{value:"1. \u529f\u80fd\u652f\u6301",id:"1-\u529f\u80fd\u652f\u6301",level:2},{value:"2. \u8fd0\u884c\u73af\u5883",id:"2-\u8fd0\u884c\u73af\u5883",level:2},{value:"2.1. \u786c\u4ef6\u6a21\u5757",id:"21-\u786c\u4ef6\u6a21\u5757",level:3},{value:"2.2. \u6b63\u5e38\u542f\u52a8",id:"22-\u6b63\u5e38\u542f\u52a8",level:3},{value:"2.3. USB \u5347\u7ea7",id:"23-usb-\u5347\u7ea7",level:3}];function x(e){const d={a:"a",blockquote:"blockquote",em:"em",h1:"h1",h2:"h2",h3:"h3",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,t.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(d.h1,{id:"artinchip-u-boot\u4ecb\u7ecd",children:"ArtInChip U-Boot\u4ecb\u7ecd"}),"\n",(0,r.jsx)(d.h2,{id:"1-\u529f\u80fd\u652f\u6301",children:"1. \u529f\u80fd\u652f\u6301"}),"\n",(0,r.jsx)(d.p,{children:"ArtInChip U-Boot \u662f\u57fa\u4e8e\u5b98\u65b9\u7248\u672c v2021.10 \u6b63\u5f0f\u7248\u8fdb\u884c\u79fb\u690d\u5f00\u53d1\u7684\u4e13\u7528\u542f\u52a8\u5f15\u5bfc\u7a0b\u5e8f\uff0c \u5f00\u53d1\u8fc7\u7a0b\u4e2d\u53ea\u589e\u52a0\u65b0\u529f\u80fd\u652f\u6301\uff0c\u5bf9\u539f\u6709\u529f\u80fd\u5e76\u6ca1\u6709\u8fdb\u884c\u6539\u52a8\u3002"}),"\n",(0,r.jsxs)(d.p,{children:["\u652f\u6301\u7684\u4e3b\u8981\u529f\u80fd\u5982 ",(0,r.jsx)(d.a,{href:"#ref-uboot-feature",children:"\u8868 3.3"})," \u6240\u5217\u3002"]}),"\n",(0,r.jsxs)(d.p,{children:[(0,r.jsx)(d.em,{children:"\u8868 3.3"})," ",(0,r.jsx)(d.em,{children:"U-Boot \u529f\u80fd\u5217\u8868"})]}),"\n",(0,r.jsxs)(d.table,{children:[(0,r.jsx)(d.thead,{children:(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.th,{children:"\u529f\u80fd"}),(0,r.jsx)(d.th,{children:"\u63cf\u8ff0"})]})}),(0,r.jsxs)(d.tbody,{children:[(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"\u652f\u6301 SPL"}),(0,r.jsx)(d.td,{})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"SPL Falcon \u6a21\u5f0f"}),(0,r.jsx)(d.td,{children:"SPL \u76f4\u63a5\u52a0\u8f7d Kernel"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"\u542f\u52a8\u4ecb\u8d28"}),(0,r.jsx)(d.td,{children:"SPI NOR/SPI NAND/SD Card/eMMC"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"USB \u91cf\u4ea7\u5347\u7ea7"}),(0,r.jsx)(d.td,{})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"SD Card \u91cf\u4ea7\u5347\u7ea7"}),(0,r.jsx)(d.td,{})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"U\u76d8\u5347\u7ea7"}),(0,r.jsx)(d.td,{})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"\u6587\u4ef6\u7cfb\u7edf"}),(0,r.jsx)(d.td,{children:"FAT32\u3001EXT2\u3001EXT4 \u548c UBIFS \u6587\u4ef6\u7cfb\u7edf"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"GPT \u5206\u533a\u683c\u5f0f"}),(0,r.jsx)(d.td,{children:"SD/eMMC"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"\u652f\u6301\u5f00\u673a Logo\u663e\u793a"}),(0,r.jsx)(d.td,{})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"\u663e\u793a\u8bbe\u5907"}),(0,r.jsx)(d.td,{children:"RGB, LVDS, MIPI"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"\u5b89\u5168\u542f\u52a8"}),(0,r.jsx)(d.td,{})]})]})]}),"\n",(0,r.jsx)(d.h2,{id:"2-\u8fd0\u884c\u73af\u5883",children:"2. \u8fd0\u884c\u73af\u5883"}),"\n",(0,r.jsx)(d.p,{children:"\u7cfb\u7edf\u51b7\u542f\u52a8\u8fc7\u7a0b\u4e2d\u7ecf\u5386\u7684\u4e0d\u540c\u9636\u6bb5\u6709\uff1a"}),"\n",(0,r.jsxs)(d.blockquote,{children:["\n",(0,r.jsx)(d.p,{children:"BROM(Boot ROM) -> SPL -> OpenSBI -> U-Boot -> Kernel"}),"\n"]}),"\n",(0,r.jsx)(d.p,{children:"\u56e0\u6b64\u5728 U-Boot SPL \u8fd0\u884c\u4e4b\u524d\uff0cBROM \u5df2\u7ecf\u5bf9\u7cfb\u7edf\u8fdb\u884c\u4e86\u57fa\u672c\u7684\u521d\u59cb\u5316\u3002 \u5728\u4e0d\u540c\u7684\u573a\u666f\u4e0b\uff0cU-Boot SPL \u7684\u8fd0\u884c\u786c\u4ef6\u73af\u5883\u72b6\u6001\u5982\u4e0b\u6587\u6240\u63cf\u8ff0\u3002"}),"\n",(0,r.jsx)(d.h3,{id:"21-\u786c\u4ef6\u6a21\u5757",children:"2.1. \u786c\u4ef6\u6a21\u5757"}),"\n",(0,r.jsxs)(d.p,{children:["\u5bf9\u4e8e\u57fa\u672c\u786c\u4ef6\u6a21\u5757\uff0c\u5728 CPU \u4e0a\u7535\u65f6\u9ed8\u8ba4\u8fdb\u884c\u521d\u59cb\u5316\uff0c\u5177\u4f53\u5982 ",(0,r.jsx)(d.a,{href:"#brom-hw-basic-1602",children:"\u8868 3.4"})," \u6240\u793a\u3002"]}),"\n",(0,r.jsxs)(d.p,{children:[(0,r.jsx)(d.em,{children:"\u8868 3.4"})," ",(0,r.jsx)(d.em,{children:"\u57fa\u672c\u786c\u4ef6\u6a21\u5757\u72b6\u6001"})]}),"\n",(0,r.jsxs)(d.table,{children:[(0,r.jsx)(d.thead,{children:(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.th,{children:"\u540d\u5b57"}),(0,r.jsx)(d.th,{children:"\u9891\u7387"}),(0,r.jsx)(d.th,{children:"\u5907\u6ce8"})]})}),(0,r.jsxs)(d.tbody,{children:[(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"AXI"}),(0,r.jsx)(d.td,{children:"24MHz"}),(0,r.jsx)(d.td,{children:"\u9ed8\u8ba4\u4f7f\u80fd"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"AHB"}),(0,r.jsx)(d.td,{children:"60MHz"}),(0,r.jsx)(d.td,{children:"\u9ed8\u8ba4\u4f7f\u80fd"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"APB0"}),(0,r.jsx)(d.td,{children:"24MHz"}),(0,r.jsx)(d.td,{children:"\u9ed8\u8ba4\u4f7f\u80fd"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"APB1"}),(0,r.jsx)(d.td,{children:"24MHz"}),(0,r.jsx)(d.td,{children:"\u9ed8\u8ba4\u4f7f\u80fd"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"CPU"}),(0,r.jsx)(d.td,{children:"24MHz"}),(0,r.jsx)(d.td,{children:"\u9ed8\u8ba4\u4f7f\u80fd"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"SRAM"}),(0,r.jsx)(d.td,{children:"60MHz"}),(0,r.jsx)(d.td,{children:"\u9ed8\u8ba4\u4f7f\u80fd"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"TIMER"}),(0,r.jsx)(d.td,{children:"24MHz"}),(0,r.jsx)(d.td,{children:"\u9ed8\u8ba4\u4f7f\u80fd"})]})]})]}),"\n",(0,r.jsx)(d.h3,{id:"22-\u6b63\u5e38\u542f\u52a8",children:"2.2. \u6b63\u5e38\u542f\u52a8"}),"\n",(0,r.jsxs)(d.p,{children:["\u6b63\u5e38\u542f\u52a8\u65f6 BROM \u5df2\u7ecf\u5bf9\u542f\u52a8\u4ecb\u8d28\u8fdb\u884c\u4e86\u68c0\u6d4b\uff0c\u5e76\u4e14\u5bf9\u6240\u4f7f\u7528\u5230\u7684\u786c\u4ef6\u6a21\u5757\u8fdb\u884c\u4e86\u521d\u59cb\u5316\u3002 \u5177\u4f53\u5982 ",(0,r.jsx)(d.a,{href:"#brom-hw-mod-sts-1602",children:"\u8868 3.5"})," \u6240\u793a\u3002"]}),"\n",(0,r.jsxs)(d.p,{children:[(0,r.jsx)(d.em,{children:"\u8868 3.5"})," ",(0,r.jsx)(d.em,{children:"\u6b63\u5e38\u542f\u52a8\u65f6\u7684\u786c\u4ef6\u6a21\u5757\u72b6\u6001"})]}),"\n",(0,r.jsxs)(d.table,{children:[(0,r.jsx)(d.thead,{children:(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.th,{children:"\u540d\u5b57"}),(0,r.jsx)(d.th,{children:"\u9891\u7387"}),(0,r.jsx)(d.th,{children:"\u5907\u6ce8"})]})}),(0,r.jsxs)(d.tbody,{children:[(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"DMA"}),(0,r.jsx)(d.td,{children:"60MHz"}),(0,r.jsx)(d.td,{children:"SPI NAND/NOR \u542f\u52a8\u65f6\u4f7f\u80fd"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"SDMC"}),(0,r.jsx)(d.td,{children:"24MHz"}),(0,r.jsx)(d.td,{children:"\u542f\u52a8\u7684 SDMC \u63a7\u5236\u5668\u88ab\u4f7f\u80fd"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"SPI"}),(0,r.jsx)(d.td,{children:"24MHz"}),(0,r.jsx)(d.td,{children:"\u542f\u52a8\u7684 SPI \u63a7\u5236\u5668\u88ab\u4f7f\u7528"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"CE"}),(0,r.jsx)(d.td,{children:"200MHz"}),(0,r.jsx)(d.td,{children:"\u5b89\u5168\u542f\u52a8\u6253\u5f00\u65f6\u88ab\u4f7f\u80fd"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"USB"}),(0,r.jsx)(d.td,{children:"60MHz"}),(0,r.jsx)(d.td,{children:"\u9ed8\u8ba4\u5173\u95ed"})]})]})]}),"\n",(0,r.jsx)(d.h3,{id:"23-usb-\u5347\u7ea7",children:"2.3. USB \u5347\u7ea7"}),"\n",(0,r.jsxs)(d.p,{children:["\u65e0\u8bba\u662f\u4e3b\u52a8\u8fdb\u5165 USB \u5347\u7ea7\u6a21\u5f0f\uff0c\u8fd8\u662f\u7531\u4e8e\u542f\u52a8\u5931\u8d25\u8fdb\u5165 USB \u5347\u7ea7\u6a21\u5f0f\uff0c \u90fd\u53ea\u6709\u57fa\u672c\u7684\u786c\u4ef6\u6a21\u5757\u4ee5\u53ca USB \u6a21\u5757\u88ab\u4f7f\u80fd\uff0c\u5176\u4ed6\u6a21\u5757\u5904\u4e8e\u5173\u95ed\u72b6\u6001\u3002 \u5177\u4f53\u5982 ",(0,r.jsx)(d.a,{href:"#brom-usb-upg-hw-sts-1602",children:"\u8868 3.6"})," \u6240\u793a\u3002"]}),"\n",(0,r.jsxs)(d.p,{children:[(0,r.jsx)(d.em,{children:"\u8868 3.6"})," ",(0,r.jsx)(d.em,{children:"\u5347\u7ea7\u6a21\u5f0f\u65f6\u7684\u786c\u4ef6\u6a21\u5757\u72b6\u6001"})]}),"\n",(0,r.jsxs)(d.table,{children:[(0,r.jsx)(d.thead,{children:(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.th,{children:"\u540d\u5b57"}),(0,r.jsx)(d.th,{children:"\u9891\u7387"}),(0,r.jsx)(d.th,{children:"\u5907\u6ce8"})]})}),(0,r.jsxs)(d.tbody,{children:[(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"AHB0"}),(0,r.jsx)(d.td,{children:"60MHz"}),(0,r.jsx)(d.td,{children:"\u8fdb\u5165 USB \u5347\u7ea7\u65f6\u8bbe\u7f6e\u4e3a 60MHz"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"DMA"}),(0,r.jsx)(d.td,{children:"60MHz"}),(0,r.jsx)(d.td,{children:"\u9ed8\u8ba4\u5173\u95ed"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"SRAM"}),(0,r.jsx)(d.td,{children:"60MHz"}),(0,r.jsx)(d.td,{children:"\u8ddf\u968f AHB0"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"SDMC"}),(0,r.jsx)(d.td,{children:"24MHz"}),(0,r.jsx)(d.td,{children:"\u9ed8\u8ba4\u5173\u95ed"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"SPI"}),(0,r.jsx)(d.td,{children:"24MHz"}),(0,r.jsx)(d.td,{children:"\u9ed8\u8ba4\u5173\u95ed"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"USB"}),(0,r.jsx)(d.td,{children:"60MHz"}),(0,r.jsx)(d.td,{children:"\u9ed8\u8ba4\u4f7f\u80fd"})]})]})]})]})}function j(e={}){const{wrapper:d}={...(0,t.a)(),...e.components};return d?(0,r.jsx)(d,{...e,children:(0,r.jsx)(x,{...e})}):x(e)}},1151:(e,d,s)=>{s.d(d,{Z:()=>c,a:()=>i});var r=s(7294);const t={},n=r.createContext(t);function i(e){const d=r.useContext(n);return r.useMemo((function(){return"function"==typeof e?e(d):{...d,...e}}),[d,e])}function c(e){let d;return d=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),r.createElement(n.Provider,{value:d},e.children)}}}]);