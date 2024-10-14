"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2341],{8715:(e,d,n)=>{n.r(d),n.d(d,{assets:()=>c,contentTitle:()=>t,default:()=>j,frontMatter:()=>i,metadata:()=>l,toc:()=>h});var s=n(5893),r=n(1151);const i={sidebar_position:9},t="\u5206\u533a\u914d\u7f6e",l={id:"D213-DevKit/part5/03-9_PartitionConfiguration",title:"\u5206\u533a\u914d\u7f6e",description:"\u672c\u7ae0\u8282\u63cf\u8ff0\u4e0d\u540c\u5b58\u50a8\u4ecb\u8d28\u7684\u9ed8\u8ba4\u5206\u533a\u65b9\u6848\uff0c\u8fd9\u91cc\u53ea\u5173\u5fc3\u542f\u52a8\u76f8\u5173\u7684\u5206\u533a\uff0c\u5e94\u7528\u76f8\u5173\u7684\u5206\u533a\u4e0d\u540c\u7684\u65b9\u6848\u4f1a\u6709\u4e0d\u540c\u7684\u9009\u62e9\uff0c \u8fd9\u91cc\u4e0d\u505a\u8be6\u7ec6\u63cf\u8ff0\u3002",source:"@site/docs/D213-DevKit/part5/03-9_PartitionConfiguration.md",sourceDirName:"D213-DevKit/part5",slug:"/D213-DevKit/part5/03-9_PartitionConfiguration",permalink:"/en/docs/D213-DevKit/part5/03-9_PartitionConfiguration",draft:!1,unlisted:!1,editUrl:"https://github.com/100askTeam/ArtInChip-Docs/tree/master/docs/D213-DevKit/part5/03-9_PartitionConfiguration.md",tags:[],version:"current",sidebarPosition:9,frontMatter:{sidebar_position:9},sidebar:"d213dkSidebar",previous:{title:"\u9a71\u52a8\u652f\u6301",permalink:"/en/docs/D213-DevKit/part5/03-8_DriverSupport"},next:{title:"\u542f\u52a8\u5185\u6838",permalink:"/en/docs/D213-DevKit/part5/03-10_BootKernel"}},c={},h=[{value:"1. MMC \u5206\u533a\u914d\u7f6e",id:"1-mmc-\u5206\u533a\u914d\u7f6e",level:3},{value:"2. SPI NAND \u5206\u533a\u914d\u7f6e",id:"2-spi-nand-\u5206\u533a\u914d\u7f6e",level:3},{value:"3. SPI NOR \u5206\u533a\u914d\u7f6e",id:"3-spi-nor-\u5206\u533a\u914d\u7f6e",level:3}];function x(e){const d={a:"a",code:"code",em:"em",h1:"h1",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(d.h1,{id:"\u5206\u533a\u914d\u7f6e",children:"\u5206\u533a\u914d\u7f6e"}),"\n",(0,s.jsx)(d.p,{children:"\u672c\u7ae0\u8282\u63cf\u8ff0\u4e0d\u540c\u5b58\u50a8\u4ecb\u8d28\u7684\u9ed8\u8ba4\u5206\u533a\u65b9\u6848\uff0c\u8fd9\u91cc\u53ea\u5173\u5fc3\u542f\u52a8\u76f8\u5173\u7684\u5206\u533a\uff0c\u5e94\u7528\u76f8\u5173\u7684\u5206\u533a\u4e0d\u540c\u7684\u65b9\u6848\u4f1a\u6709\u4e0d\u540c\u7684\u9009\u62e9\uff0c \u8fd9\u91cc\u4e0d\u505a\u8be6\u7ec6\u63cf\u8ff0\u3002"}),"\n",(0,s.jsxs)(d.p,{children:["ArtInChip \u7684\u65b9\u6848\u4e2d\uff0c\u5206\u533a\u8868\u5728 env.txt \u914d\u7f6e\uff0c\u914d\u7f6e\u5185\u5bb9\u5305\u62ec\u5404\u5206\u533a\u5728\u5b58\u50a8\u4ecb\u8d28\u4e2d\u7684\u4f4d\u7f6e\u548c\u5927\u5c0f\u3002\u5206\u533a\u4e2d\u8981\u70e7\u5f55\u7684\u5185\u5bb9\u5728 \u5404\u9879\u76ee\u5bf9\u5e94\u7684 image_cfg.json \u4e2d\u8bbe\u7f6e\u3002 env.txt \u901a\u5e38\u4f4d\u4e8e ",(0,s.jsx)(d.code,{children:"target/<ic>/common/"})," \u3002"]}),"\n",(0,s.jsx)(d.h3,{id:"1-mmc-\u5206\u533a\u914d\u7f6e",children:"1. MMC \u5206\u533a\u914d\u7f6e"}),"\n",(0,s.jsx)(d.p,{children:"MMC \u5305\u62ec SD Card \u548c eMMC\u3002\u5bf9\u4e8e eMMC\uff0cArtInChip \u65b9\u6848\u4e2d\u4e0d\u652f\u6301\u4ece Boot Partition \u542f\u52a8\uff0c \u53ea\u652f\u6301\u4ece UDA(User Data Area) \u542f\u52a8\uff0c\u56e0\u6b64\u5177\u4f53\u7684\u5206\u533a\u65b9\u5f0f\u4e0e SD Card \u4e00\u81f4\uff0c\u7edf\u4e00\u91c7\u7528 GPT \u5206\u533a\u3002"}),"\n",(0,s.jsx)(d.p,{children:(0,s.jsx)(d.strong,{children:"\u76ee\u6807\u5e73\u53f0\u4e0a\u7684 GPT \u5206\u533a"})}),"\n",(0,s.jsxs)(d.p,{children:["\u5177\u4f53\u7684\u5206\u533a\u5728\u9879\u76ee\u7684 image_cfg.json \u4e2d\u914d\u7f6e\uff0cmk_image.py \u751f\u6210\u955c\u50cf\u8fc7\u7a0b\u4e2d\uff0c\u76f8\u5173\u5206\u533a\u4fe1\u606f\u4f1a\u88ab\u6dfb\u52a0\u5230 env.bin\uff0c \u4ee5 ",(0,s.jsx)(d.code,{children:"GPT="})," \u683c\u5f0f\u5b58\u50a8\u5728\u73af\u5883\u53d8\u91cf\u4e2d\uff1a"]}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{children:"GPT=size1@offset1(partition name1),size2@offset2(partition name2),-(last partition)\n"})}),"\n",(0,s.jsxs)(d.p,{children:["\u5176\u4e2d size \u662f\u5206\u533a\u7684\u5927\u5c0f\uff0coffset \u662f\u5206\u533a\u7684\u5f00\u59cb\u4f4d\u7f6e\uff08\u76f8\u5bf9 UDA \u7684\u5f00\u59cb\u4f4d\u7f6e\uff0c\u5355\u4f4d\u4e3a\u5b57\u8282\uff09\u3002 \u5982\u679c\u662f\u6700\u540e\u4e00\u4e2a\u5206\u533a\uff0c\u53ef\u4ee5\u4e0d\u8bbe\u7f6e ",(0,s.jsx)(d.code,{children:"size@offset"}),"\uff0c\u4f7f\u7528 ",(0,s.jsx)(d.code,{children:"-"})," \u4ee3\u66ff\uff0c\u8868\u793a\u5269\u4f59\u7684\u6240\u6709\u7a7a\u95f4\u90fd\u5206\u914d\u7ed9\u8be5\u5206\u533a\u3002"]}),"\n",(0,s.jsx)(d.p,{children:"\u4f8b\u5982\uff1a"}),"\n",(0,s.jsx)(d.p,{children:"image_cfg.json \u4e2d\u7684\u5206\u533a\u914d\u7f6e\uff1a"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{children:'"mmc": { // Media type\n    "size": "8G", // Size of SD/eMMC\n    "partitions": { // Partition table apply to device\n            "spl_1":  { "offset": "0x4400", "size": "128k" },\n            "spl_2":  { "size": "367k" },\n            "uboot":  { "size": "1m" },\n            "env":    { "size": "512k" },\n            "kernel": { "size": "16m" },\n            "rootfs": { "size": "64m" },\n            "user":   { "size": "-" },\n    },\n},\n'})}),"\n",(0,s.jsx)(d.p,{children:"\u73af\u5883\u53d8\u91cf\u4e2d\u4fdd\u5b58\u7684\u683c\u5f0f\uff1a"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{children:"GPT=128k@0x4400(spl_1),367k(spl_2),1m(uboot),512k(env),16m(kernel),64m(rootfs),-(user)\n"})}),"\n",(0,s.jsx)(d.p,{children:"\u4e5f\u53ef\u4ee5\u4e0d\u8bbe\u7f6e offset\uff0c\u8868\u793a\u5404\u5206\u533a\u76f8\u8fde\uff0c\u7a0b\u5e8f\u81ea\u52a8\u8ba1\u7b97\u8be5\u5206\u533a\u7684\u5f00\u59cb\u4f4d\u7f6e\u3002"}),"\n",(0,s.jsx)(d.p,{children:"\u4f8b\u5982\uff1a"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{children:"GPT=128k(spl_1),367k(spl_2),1m(uboot),512k(env),512k(bootui),512k(dtb),\n    16m(kernel),64m(rootfs),-(user)\n"})}),"\n",(0,s.jsx)(d.p,{children:"\u6ce8\u610f"}),"\n",(0,s.jsx)(d.p,{children:"\u7279\u522b\u5904\u7406"}),"\n",(0,s.jsx)(d.p,{children:"UDA \u7684\u524d\u976234\u4e2a block \u88ab\u7528\u4f5c GPT Header\uff0c\u65e0\u8bba\u7b2c\u4e00\u4e2a\u5206\u533a\u662f\u5426\u8bbe\u7f6e offset\uff0c\u7a0b\u5e8f\u5728\u505a\u5206\u533a\u65f6\u90fd\u4f1a\u9884\u755934\u4e2a block \u7ed9 GPT Header\u3002"}),"\n",(0,s.jsx)(d.p,{children:"\u5373\uff1a128k@0x4400(spl_1) \u548c 128k(spl_1) \u662f\u4e00\u6837\u7684\u3002"}),"\n",(0,s.jsx)(d.p,{children:"\u4e0b\u5217\u4e3a\u57fa\u672c\u5206\u533a\uff1a"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{children:"\u5206\u533a"}),(0,s.jsx)(d.th,{children:"\u5927\u5c0f"}),(0,s.jsx)(d.th,{}),(0,s.jsx)(d.th,{children:"\u5907\u6ce8"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"spl_1"}),(0,s.jsx)(d.td,{children:"128KB"}),(0,s.jsx)(d.td,{children:"RAW"}),(0,s.jsx)(d.td,{children:"\u5206\u533a\u5f00\u59cb\u4f4d\u7f6e\u56fa\u5b9a\uff0c\u4ece0x4400\u5f00\u59cb\uff0c\u5927\u5c0f\u56fa\u5b9a"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"spl_2"}),(0,s.jsx)(d.td,{children:">= 128KB"}),(0,s.jsx)(d.td,{children:"RAW"}),(0,s.jsx)(d.td,{children:"\u5206\u533a\u5f00\u59cb\u4f4d\u7f6e\u56fa\u5b9a\uff0c\u955c\u50cf\u5907\u4efd\uff0c\u53ef\u4e0d\u8981"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"uboot"}),(0,s.jsx)(d.td,{children:"."}),(0,s.jsx)(d.td,{children:"RAW"}),(0,s.jsx)(d.td,{children:"\u5927\u5c0f\u6839\u636e\u5b9e\u9645\u9879\u76ee\u9700\u8981\u914d\u7f6e"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"env"}),(0,s.jsx)(d.td,{children:">= 16KB"}),(0,s.jsx)(d.td,{children:"RAW"}),(0,s.jsx)(d.td,{children:"\u4fdd\u5b58\u73af\u5883\u53d8\u91cf"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"dtb"}),(0,s.jsx)(d.td,{children:"."}),(0,s.jsx)(d.td,{children:"RAW"}),(0,s.jsx)(d.td,{children:"\u4fdd\u5b58 kernel dtb\uff0c\u5927\u5c0f\u6839\u636e\u5b9e\u9645\u60c5\u51b5\u5206\u914d"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"kernel"}),(0,s.jsx)(d.td,{children:"."}),(0,s.jsx)(d.td,{children:"RAW"}),(0,s.jsx)(d.td,{children:"\u5927\u5c0f\u6839\u636e\u5b9e\u9645\u9879\u76ee\u9700\u8981\u914d\u7f6e"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"rootfs"}),(0,s.jsx)(d.td,{children:"."}),(0,s.jsx)(d.td,{children:"Ext4"}),(0,s.jsx)(d.td,{children:"\u5927\u5c0f\u6839\u636e\u5b9e\u9645\u9879\u76ee\u9700\u8981\u914d\u7f6e"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"user"}),(0,s.jsx)(d.td,{children:"."}),(0,s.jsx)(d.td,{children:"Ext4"}),(0,s.jsx)(d.td,{children:"\u5927\u5c0f\u6839\u636e\u5b9e\u9645\u9879\u76ee\u9700\u8981\u914d\u7f6e"})]})]})]}),"\n",(0,s.jsx)(d.p,{children:"\u5982\u679c Kernel \u4f7f\u7528 FIT Image \u683c\u5f0f\uff0c\u4e0a\u8ff0\u5206\u533a\u4e2d\u7684 dtb \u53ef\u4ee5\u7701\u7565\u3002 user \u5206\u533a\u4ee5\u53ca\u662f\u5426\u6709\u66f4\u591a\u7684\u5e94\u7528\u5206\u533a\uff0c\u7531\u5177\u4f53\u9879\u76ee\u51b3\u5b9a\u3002"}),"\n",(0,s.jsx)(d.p,{children:(0,s.jsx)(d.strong,{children:"SD \u91cf\u4ea7\u5361\u7684 GPT \u5206\u533a"})}),"\n",(0,s.jsxs)(d.p,{children:["\u91cf\u4ea7\u5361\u7528\u5728\u5de5\u5382\u751f\u4ea7\u8fc7\u7a0b\u4e2d\uff0c\u901a\u8fc7\u8fd0\u884c\u91cf\u4ea7\u5361\u4e2d\u7684\u5347\u7ea7\u7a0b\u5e8f\uff0c\u5bf9\u76ee\u6807\u5e73\u53f0\u8fdb\u884c\u91cf\u4ea7\u5347\u7ea7\u3002 \u5177\u4f53\u7684\u5206\u533a\u8bbe\u7f6e\u5728 env.txt \u4e2d\u7684 ",(0,s.jsx)(d.code,{children:"burn_mmc="})," \u914d\u7f6e\u3002\u4f8b\u5982\uff1a"]}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{children:"burn_mmc=128k@0x4400(spl_1),367k(spl_2),1m(uboot),512k(env),512k(bootui),-(image)\n"})}),"\n",(0,s.jsx)(d.p,{children:"\u5206\u533a\u683c\u5f0f\u57fa\u672c\u56fa\u5b9a\uff1a"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{children:"\u5206\u533a"}),(0,s.jsx)(d.th,{children:"\u5927\u5c0f"}),(0,s.jsx)(d.th,{}),(0,s.jsx)(d.th,{children:"\u5907\u6ce8"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"spl_1"}),(0,s.jsx)(d.td,{children:"128KB"}),(0,s.jsx)(d.td,{children:"RAW"}),(0,s.jsx)(d.td,{children:"\u7528\u4e8e\u5347\u7ea7\u7684 SPL"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"spl_2"}),(0,s.jsx)(d.td,{children:">= 128KB"}),(0,s.jsx)(d.td,{children:"RAW"}),(0,s.jsx)(d.td,{children:"\u7528\u4e8e\u5347\u7ea7\u7684 SPL \u5907\u4efd"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"uboot"}),(0,s.jsx)(d.td,{children:"."}),(0,s.jsx)(d.td,{children:"RAW"}),(0,s.jsx)(d.td,{children:"\u7528\u4e8e\u5347\u7ea7\u7684 U-Boot"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"env"}),(0,s.jsx)(d.td,{children:">= 16KB"}),(0,s.jsx)(d.td,{children:"RAW"}),(0,s.jsx)(d.td,{children:"\u4fdd\u5b58\u73af\u5883\u53d8\u91cf"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"data"}),(0,s.jsx)(d.td,{children:"."}),(0,s.jsx)(d.td,{children:"RAW"}),(0,s.jsx)(d.td,{children:"\u4fdd\u5b58\u7528\u4e8e\u70e7\u5f55\u56fa\u4ef6\u955c\u50cf\u6587\u4ef6"})]})]})]}),"\n",(0,s.jsxs)(d.p,{children:["\u76ee\u6807\u5e73\u53f0\u5728\u542f\u52a8\u5230 U-Boot \u65f6\uff0c\u8fdb\u5165\u91cf\u4ea7\u6a21\u5f0f\u3002U-Boot \u91cf\u4ea7\u7a0b\u5e8f\u4ece ",(0,s.jsx)(d.code,{children:"data"})," \u5206\u533a\u8bfb\u53d6\u56fa\u4ef6\u6570\u636e\uff0c\u5e76\u4e14\u70e7\u5f55\u5230\u76ee\u6807\u5b58\u50a8\u4ecb\u8d28\u3002"]}),"\n",(0,s.jsx)(d.p,{children:(0,s.jsx)(d.strong,{children:"SPL \u5206\u533a\u7684\u7279\u522b\u8bf4\u660e"})}),"\n",(0,s.jsx)(d.p,{children:"MMC GPT \u5206\u533a\u65f6\uff0cBROM \u542f\u52a8\u8fc7\u7a0b\u4e2d\uff0c\u56fa\u5b9a\u4ece\u4e24\u4e2a\u5730\u65b9\u8bfb\u53d6 SPL \u7a0b\u5e8f\u7684\u5907\u4efd\u3002 \u9996\u5148\u5c1d\u8bd5\u8bfb\u53d6 SPL \u5907\u4efd1\uff0c\u5982\u679c\u9a8c\u8bc1\u5931\u8d25\uff0c\u518d\u5c1d\u8bd5\u8bfb\u53d6 SPL \u5907\u4efd2\u3002\u5176\u4e2d\u5907\u4efd2\u662f\u53ef\u9009\u7684\u3002"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{children:"\u5206\u533a"}),(0,s.jsx)(d.th,{children:"\u5927\u5c0f/\u4f4d\u7f6e"}),(0,s.jsx)(d.th,{children:"\u5907\u6ce8"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"GPT HEADER"}),(0,s.jsx)(d.td,{children:"17KB(LBA0~LBA33)"}),(0,s.jsx)(d.td,{children:"\u9884\u7559\u7ed9 GPT Header"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"\u5907\u4efd1"}),(0,s.jsx)(d.td,{children:"128KB(LBA34~LBA289)"}),(0,s.jsx)(d.td,{children:"\u5fc5\u987b"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"\u5907\u4efd2"}),(0,s.jsx)(d.td,{children:"128KB(LBA290~LBA545)"}),(0,s.jsx)(d.td,{children:"\u53ef\u9009"})]})]})]}),"\n",(0,s.jsx)(d.h3,{id:"2-spi-nand-\u5206\u533a\u914d\u7f6e",children:"2. SPI NAND \u5206\u533a\u914d\u7f6e"}),"\n",(0,s.jsxs)(d.p,{children:["\u5177\u4f53\u7684\u5206\u533a\u5728\u9879\u76ee\u7684 image_cfg.json \u4e2d\u914d\u7f6e\uff0cmk_image.py \u751f\u6210\u955c\u50cf\u8fc7\u7a0b\u4e2d\uff0c\u76f8\u5173\u5206\u533a\u4fe1\u606f\u4f1a\u88ab\u6dfb\u52a0\u5230 env.bin\uff0c \u4ee5 ",(0,s.jsx)(d.code,{children:"MTD="})," \u548c ",(0,s.jsx)(d.code,{children:"UBI="})," \u683c\u5f0f\u5b58\u50a8\u5728\u73af\u5883\u53d8\u91cf\u4e2d\uff1a"]}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{children:"MTD=size1@offset1(partition name1),size2@offset2(partition name2),-(last partition)\n"})}),"\n",(0,s.jsxs)(d.p,{children:["\u5176\u4e2d size \u662f\u5206\u533a\u7684\u5927\u5c0f\uff0coffset \u662f\u5206\u533a\u7684\u5f00\u59cb\u4f4d\u7f6e\uff08\u76f8\u5bf9 UDA \u7684\u5f00\u59cb\u4f4d\u7f6e\uff0c\u5355\u4f4d\u4e3a\u5b57\u8282\uff09\u3002 \u5982\u679c\u662f\u6700\u540e\u4e00\u4e2a\u5206\u533a\uff0c\u53ef\u4ee5\u4e0d\u8bbe\u7f6e ",(0,s.jsx)(d.code,{children:"size@offset"}),"\uff0c\u4f7f\u7528 ",(0,s.jsx)(d.code,{children:"-"})," \u4ee3\u66ff\uff0c\u8868\u793a\u5269\u4f59\u7684\u6240\u6709\u7a7a\u95f4\u90fd\u5206\u914d\u7ed9\u8be5\u5206\u533a\u3002"]}),"\n",(0,s.jsx)(d.p,{children:"\u4f8b\u5982:"}),"\n",(0,s.jsx)(d.p,{children:"image_cfg.json \u4e2d\u7684\u5206\u533a\u914d\u7f6e\uff1a"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{children:'"spi-nand": { // Device, The name should be the same with string in image:info:media:type\n    "size": "128m", // Size of SPI NAND\n    "partitions": {\n            "spl":    { "size": "1m" },\n            "uboot":  { "size": "1m" },\n            "env":    { "size": "256k" },\n            "kernel": { "size": "12m" },\n            "ubiroot": {\n                    "size": "32m",\n                    "ubi": { // Volume in UBI device\n                            "rootfs": { "size": "-" },\n                    },\n            },\n            "ubisystem": {\n                    "size": "-",\n                    "ubi": { // Volume in UBI device\n                            "user":   { "size": "-" },\n                    },\n            },\n    }\n},\n'})}),"\n",(0,s.jsx)(d.p,{children:"\u751f\u6210\u7684\u73af\u5883\u53d8\u91cf\u5185\u5bb9\uff1a"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{children:"MTD=spi1.0:1m(spl),1m(uboot),256k(env),12m(kernel),32m(ubiroot),-(ubisystem)\nUBI=ubiroot:-(rootfs);ubisystem:-(user)\n"})}),"\n",(0,s.jsxs)(d.p,{children:["\u524d\u9762 ",(0,s.jsx)(d.code,{children:"MTD="})," \u63cf\u8ff0 MTD \u5206\u533a\u7684\u914d\u7f6e\uff0c\u540e\u9762 ",(0,s.jsx)(d.code,{children:"UBI="})," \u63cf\u8ff0\u88ab\u7528\u4f5c UBI \u7684 MTD \u5206\u533a\u7684 UBI \u5377\u5206\u914d\u3002"]}),"\n",(0,s.jsx)(d.p,{children:"\u6ce8\u89e3"}),"\n",(0,s.jsx)(d.p,{children:"mtdids \u4e0e\u4f7f\u7528\u7684 spi \u63a5\u53e3\u6709\u5173\u7cfb\u3002\u5f53\u4f7f\u7528 spi0 \u63a5\u53e3\u65f6\uff0c\u4e3a spi0.0\uff1b\u5f53\u4f7f\u7528 spi1 \u63a5\u53e3\u65f6\uff0c\u4e3a spi1.0"}),"\n",(0,s.jsx)(d.p,{children:"Boot \u9636\u6bb5\u76f8\u5173\u7684\u51e0\u4e2a\u5206\u533a\u6709\u4e24\u79cd\u5907\u9009\u65b9\u6848\u3002"}),"\n",(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.strong,{children:"\u65b9\u6848\u4e00\uff1a"})," MTD \u5206\u533a"]}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{children:"\u5206\u533a"}),(0,s.jsx)(d.th,{children:"\u5927\u5c0f"}),(0,s.jsx)(d.th,{}),(0,s.jsx)(d.th,{children:"\u5907\u6ce8"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"spl"}),(0,s.jsx)(d.td,{children:"1MB"}),(0,s.jsx)(d.td,{children:"RAW"}),(0,s.jsx)(d.td,{children:"\u4fdd\u5b58 SPL \u5907\u4efd\u7684\u533a\u57df"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"uboot"}),(0,s.jsx)(d.td,{children:"2MB"}),(0,s.jsx)(d.td,{children:"RAW"}),(0,s.jsx)(d.td,{children:"\u4fdd\u5b58 U-Boot\uff0c\u9700\u8981\u9884\u7559\u7a7a\u95f2\u5907\u7528\u5757"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"env"}),(0,s.jsx)(d.td,{children:"1 Block"}),(0,s.jsx)(d.td,{children:"RAW"}),(0,s.jsx)(d.td,{children:"\u4fdd\u5b58\u73af\u5883\u53d8\u91cf"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"envbak"}),(0,s.jsx)(d.td,{children:"1 Block"}),(0,s.jsx)(d.td,{children:"RAW"}),(0,s.jsx)(d.td,{children:"\u4fdd\u5b58\u73af\u5883\u53d8\u91cf\u5907\u4efd\uff0c\u53ef\u4e0d\u7528"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"dtb"}),(0,s.jsx)(d.td,{children:"1 Block"}),(0,s.jsx)(d.td,{children:"RAW"}),(0,s.jsx)(d.td,{children:"\u4fdd\u5b58 kernel dtb"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"kernel"}),(0,s.jsx)(d.td,{children:"."}),(0,s.jsx)(d.td,{children:"RAW"}),(0,s.jsx)(d.td,{children:"\u4fdd\u5b58 kernel\uff0c\u9700\u8981\u9884\u7559\u7a7a\u95f2\u5907\u7528\u5757"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"rootfs"}),(0,s.jsx)(d.td,{children:"."}),(0,s.jsx)(d.td,{children:"UBIFS"}),(0,s.jsx)(d.td,{})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"user"}),(0,s.jsx)(d.td,{children:"."}),(0,s.jsx)(d.td,{children:"UBIFS"}),(0,s.jsx)(d.td,{})]})]})]}),"\n",(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.strong,{children:"\u65b9\u6848\u4e8c\uff1a"})," UBI \u5206\u533a"]}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{children:"\u5206\u533a"}),(0,s.jsx)(d.th,{children:"\u5927\u5c0f"}),(0,s.jsx)(d.th,{}),(0,s.jsx)(d.th,{children:"\u5907\u6ce8"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"spl"}),(0,s.jsx)(d.td,{children:"1MB"}),(0,s.jsx)(d.td,{children:"RAW"}),(0,s.jsx)(d.td,{children:"\u4fdd\u5b58 SPL \u5907\u4efd\u7684\u533a\u57df"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"uboot"}),(0,s.jsx)(d.td,{children:"2MB"}),(0,s.jsx)(d.td,{children:"RAW"}),(0,s.jsx)(d.td,{children:"\u4fdd\u5b58 U-Boot\uff0c\u9700\u8981\u9884\u7559\u7a7a\u95f2\u5907\u7528\u5757"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"env"}),(0,s.jsx)(d.td,{children:"1 Block"}),(0,s.jsx)(d.td,{children:"RAW"}),(0,s.jsx)(d.td,{children:"\u4fdd\u5b58\u73af\u5883\u53d8\u91cf"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"envbak"}),(0,s.jsx)(d.td,{children:"1 Block"}),(0,s.jsx)(d.td,{children:"RAW"}),(0,s.jsx)(d.td,{children:"\u4fdd\u5b58\u73af\u5883\u53d8\u91cf\u5907\u4efd\uff0c\u53ef\u4e0d\u7528"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"dtb"}),(0,s.jsx)(d.td,{children:"1 Block"}),(0,s.jsx)(d.td,{children:"UBI"}),(0,s.jsx)(d.td,{children:"\u4fdd\u5b58 kernel dtb"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"kernel"}),(0,s.jsx)(d.td,{children:"."}),(0,s.jsx)(d.td,{children:"UBI"}),(0,s.jsx)(d.td,{children:"\u4fdd\u5b58 kernel"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"rootfs"}),(0,s.jsx)(d.td,{children:"."}),(0,s.jsx)(d.td,{children:"UBIFS"}),(0,s.jsx)(d.td,{})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"user"}),(0,s.jsx)(d.td,{children:"."}),(0,s.jsx)(d.td,{children:"UBIFS"}),(0,s.jsx)(d.td,{})]})]})]}),"\n",(0,s.jsx)(d.p,{children:"\u4e0a\u8ff0\u4e24\u4e2a\u65b9\u6848\u4e2d\uff0c\u5dee\u522b\u5728\u4e8e dtb/kernel \u90e8\u5206\u662f\u5426\u4f7f\u7528 UBI \u5206\u533a\u3002\u7531\u4e8e\u4f7f\u7528 UBI \u5206\u533a\u5728\u542f\u52a8\u901f\u5ea6\u4e0a\u6bd4\u4f7f\u7528 MTD \u5206\u533a\u7a0d\u5fae\u6162\u4e00\u70b9\uff0c\u56e0\u6b64\u540e\u7eed\u5982\u679c\u6ca1\u6709\u5176\u4ed6\u539f\u56e0\uff0c \u4f18\u5148\u4f7f\u7528\u65b9\u6848\u4e00\u7684\u5206\u533a\u65b9\u5f0f\uff0c\u5373\u542f\u52a8\u9636\u6bb5\u8bfb\u53d6\u7684\u6570\u636e\u7edf\u4e00\u4f7f\u7528 MTD \u5206\u533a\u4fdd\u5b58\u3002"}),"\n",(0,s.jsx)(d.p,{children:(0,s.jsx)(d.strong,{children:"SPL \u5206\u533a\u7684\u7279\u522b\u8bf4\u660e"})}),"\n",(0,s.jsx)(d.p,{children:"\u7531\u4e8e NAND \u53ef\u80fd\u4f1a\u6709\u574f\u5757\uff0c\u4e3a\u4e86\u5c3d\u53ef\u80fd\u7684\u652f\u6301\u6709\u574f\u5757\u7684 NAND \u5668\u4ef6\uff0cArtInChip \u5e73\u53f0\u5bf9 SPL \u5907\u4efd\u7684\u5b58\u50a8\u65b9\u6848\u505a\u4e86\u4e00\u4e9b\u7279\u6b8a\u5904\u7406\u3002"}),"\n",(0,s.jsxs)(d.ul,{children:["\n",(0,s.jsx)(d.li,{children:"\u9996\u5148\u5728 NAND \u5b58\u50a8\u8bbe\u5907\u4e2d\uff0c\u70e7\u5f55\u65f6 SPL \u4f1a\u4fdd\u5b584\u4e2a\u5907\u4efd\uff0c\u6bcf\u4e2a\u5907\u4efd\u5360\u7528\u4e00\u4e2a\u7269\u7406\u64e6\u9664\u5757(PEB)\u3002 \u56e0\u6b64\u5728 NAND \u4e2d\uff0c\u5171\u67094\u4e2a PEB \u7528\u6765\u4fdd\u5b58 SPL\u3002"}),"\n",(0,s.jsxs)(d.li,{children:["\u4fdd\u5b58 SPL \u7684 PEB \u662f\u4ece\u4e00\u4e2a\u56fa\u5b9a\u7684\u5019\u9009 PEB \u5217\u8868\u4e2d\u9009\u53d6\u7684\uff0c\u5177\u4f53\u53ef\u53c2\u8003 ",(0,s.jsx)(d.a,{href:"#ref-dedicate-spl-blk",children:"\u8868 3.13"})," \u3002 \u56e0\u6b64\u53ef\u80fd\u5206\u5e03\u5728 NAND \u5668\u4ef6\u7684\u4e0d\u540c\u4f4d\u7f6e\u3002 \u7531\u4e8e NAND \u5382\u5546\u4fdd\u8bc1\u524d\u9762\u51e0\u4e2a\u5757\u5728\u51fa\u5382\u65f6\u4e0d\u662f\u574f\u5757\uff0c\u56e0\u6b64\u5927\u6982\u7387\u524d\u9762\u51e0\u4e2a\u5757\u4f1a\u88ab\u9009\u4f5c SPL \u5b58\u50a8\u5757\u3002 \u56e0\u6b64 ArtInChip \u9ed8\u8ba4\u5c06\u524d\u9762 1MB \u5206\u4e3a SPL \u5206\u533a\u3002"]}),"\n",(0,s.jsx)(d.li,{children:"PEB \u4e2d\u4fdd\u5b58\u7684 SPL \u683c\u5f0f\uff0c\u4e0d\u662f\u539f\u59cb\u7684 SPL \u6570\u636e\u3002\u5728\u70e7\u5f55\u65f6\uff0cSPL \u6570\u636e\u88ab\u5206\u5207\u4e3a\u56fa\u5b9a 2KB \u5927\u5c0f\u7684\u6570\u636e\u5207\u7247\uff0c \u6309\u7167\u9875(Page)\u8fdb\u884c\u4fdd\u5b58\uff0c\u5e76\u4e14\u4f7f\u7528 Page Table \u5bf9\u8fd9\u4e9b\u6570\u636e\u5207\u7247\u8fdb\u884c\u7ba1\u7406\u3002"}),"\n",(0,s.jsx)(d.li,{children:"\u88ab\u9009\u4e2d\u7528\u4e8e\u4fdd\u5b58 SPL \u7684 PEB\uff0c\u4f1a\u88ab\u6807\u8bb0\u4e3a\u4fdd\u7559\u5757\uff08\u574f\u5757\uff09\u3002\u56e0\u6b64\u5728\u70e7\u5f55 SPL \u4e4b\u540e\uff0c NAND \u4e0a\u4f1a\u51fa\u73b0\u51e0\u4e2a\u88ab\u6807\u8bb0\u4e86\u7684\u574f\u5757\uff0c\u8fd9\u662f\u6b63\u5e38\u73b0\u8c61\u3002"}),"\n"]}),"\n",(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.em,{children:"\u8868 3.13"})," ",(0,s.jsx)(d.em,{children:"\u5019\u9009\u542f\u52a8\u5757\u5217\u8868"})]}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{children:"\u4f18\u5148\u987a\u5e8f"}),(0,s.jsx)(d.th,{children:"Block ID"}),(0,s.jsx)(d.th,{children:"\u8bf4\u660e"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"1"}),(0,s.jsx)(d.td,{children:"0"}),(0,s.jsx)(d.td,{children:"\u542f\u52a8\u5206\u533a\u5185\uff0c\u4f18\u5148\u4f7f\u7528"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"2"}),(0,s.jsx)(d.td,{children:"1"}),(0,s.jsx)(d.td,{children:"\u542f\u52a8\u5206\u533a\u5185\uff0c\u4f18\u5148\u4f7f\u7528"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"3"}),(0,s.jsx)(d.td,{children:"2"}),(0,s.jsx)(d.td,{children:"\u542f\u52a8\u5206\u533a\u5185\uff0c\u4f18\u5148\u4f7f\u7528"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"4"}),(0,s.jsx)(d.td,{children:"3"}),(0,s.jsx)(d.td,{children:"\u542f\u52a8\u5206\u533a\u5185\uff0c\u4f18\u5148\u4f7f\u7528"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"5"}),(0,s.jsx)(d.td,{children:"202"}),(0,s.jsx)(d.td,{children:"\u5982\u679c\u662f\u597d\u5757\uff0c\u5219\u4f5c\u4e3a\u542f\u52a8\u5757\u3002\u5199\u5165\u542f\u52a8\u955c\u50cf\u540e\u6807\u8bb0\u4e3a\u574f\u5757"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"6"}),(0,s.jsx)(d.td,{children:"32"}),(0,s.jsx)(d.td,{children:"\u5982\u679c\u662f\u597d\u5757\uff0c\u5219\u4f5c\u4e3a\u542f\u52a8\u5757\u3002\u5199\u5165\u542f\u52a8\u955c\u50cf\u540e\u6807\u8bb0\u4e3a\u574f\u5757"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"7"}),(0,s.jsx)(d.td,{children:"312"}),(0,s.jsx)(d.td,{children:"\u5982\u679c\u662f\u597d\u5757\uff0c\u5219\u4f5c\u4e3a\u542f\u52a8\u5757\u3002\u5199\u5165\u542f\u52a8\u955c\u50cf\u540e\u6807\u8bb0\u4e3a\u574f\u5757"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"8"}),(0,s.jsx)(d.td,{children:"296"}),(0,s.jsx)(d.td,{children:"\u5982\u679c\u662f\u597d\u5757\uff0c\u5219\u4f5c\u4e3a\u542f\u52a8\u5757\u3002\u5199\u5165\u542f\u52a8\u955c\u50cf\u540e\u6807\u8bb0\u4e3a\u574f\u5757"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"9"}),(0,s.jsx)(d.td,{children:"142"}),(0,s.jsx)(d.td,{children:"\u5982\u679c\u662f\u597d\u5757\uff0c\u5219\u4f5c\u4e3a\u542f\u52a8\u5757\u3002\u5199\u5165\u542f\u52a8\u955c\u50cf\u540e\u6807\u8bb0\u4e3a\u574f\u5757"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"10"}),(0,s.jsx)(d.td,{children:"136"}),(0,s.jsx)(d.td,{children:"\u5982\u679c\u662f\u597d\u5757\uff0c\u5219\u4f5c\u4e3a\u542f\u52a8\u5757\u3002\u5199\u5165\u542f\u52a8\u955c\u50cf\u540e\u6807\u8bb0\u4e3a\u574f\u5757"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"11"}),(0,s.jsx)(d.td,{children:"392"}),(0,s.jsx)(d.td,{children:"\u5982\u679c\u662f\u597d\u5757\uff0c\u5219\u4f5c\u4e3a\u542f\u52a8\u5757\u3002\u5199\u5165\u542f\u52a8\u955c\u50cf\u540e\u6807\u8bb0\u4e3a\u574f\u5757"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"12"}),(0,s.jsx)(d.td,{children:"526"}),(0,s.jsx)(d.td,{children:"\u5982\u679c\u662f\u597d\u5757\uff0c\u5219\u4f5c\u4e3a\u542f\u52a8\u5757\u3002\u5199\u5165\u542f\u52a8\u955c\u50cf\u540e\u6807\u8bb0\u4e3a\u574f\u5757"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"13"}),(0,s.jsx)(d.td,{children:"452"}),(0,s.jsx)(d.td,{children:"\u5982\u679c\u662f\u597d\u5757\uff0c\u5219\u4f5c\u4e3a\u542f\u52a8\u5757\u3002\u5199\u5165\u542f\u52a8\u955c\u50cf\u540e\u6807\u8bb0\u4e3a\u574f\u5757"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"14"}),(0,s.jsx)(d.td,{children:"708"}),(0,s.jsx)(d.td,{children:"\u5982\u679c\u662f\u597d\u5757\uff0c\u5219\u4f5c\u4e3a\u542f\u52a8\u5757\u3002\u5199\u5165\u542f\u52a8\u955c\u50cf\u540e\u6807\u8bb0\u4e3a\u574f\u5757"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"15"}),(0,s.jsx)(d.td,{children:"810"}),(0,s.jsx)(d.td,{children:"\u5982\u679c\u662f\u597d\u5757\uff0c\u5219\u4f5c\u4e3a\u542f\u52a8\u5757\u3002\u5199\u5165\u542f\u52a8\u955c\u50cf\u540e\u6807\u8bb0\u4e3a\u574f\u5757"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"16"}),(0,s.jsx)(d.td,{children:"552"}),(0,s.jsx)(d.td,{children:"\u5982\u679c\u662f\u597d\u5757\uff0c\u5219\u4f5c\u4e3a\u542f\u52a8\u5757\u3002\u5199\u5165\u542f\u52a8\u955c\u50cf\u540e\u6807\u8bb0\u4e3a\u574f\u5757"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"17"}),(0,s.jsx)(d.td,{children:"906"}),(0,s.jsx)(d.td,{children:"\u5982\u679c\u662f\u597d\u5757\uff0c\u5219\u4f5c\u4e3a\u542f\u52a8\u5757\u3002\u5199\u5165\u542f\u52a8\u955c\u50cf\u540e\u6807\u8bb0\u4e3a\u574f\u5757"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"18"}),(0,s.jsx)(d.td,{children:"674"}),(0,s.jsx)(d.td,{children:"\u5982\u679c\u662f\u597d\u5757\uff0c\u5219\u4f5c\u4e3a\u542f\u52a8\u5757\u3002\u5199\u5165\u542f\u52a8\u955c\u50cf\u540e\u6807\u8bb0\u4e3a\u574f\u5757"})]})]})]}),"\n",(0,s.jsx)(d.h3,{id:"3-spi-nor-\u5206\u533a\u914d\u7f6e",children:"3. SPI NOR \u5206\u533a\u914d\u7f6e"}),"\n",(0,s.jsxs)(d.p,{children:["\u5177\u4f53\u7684\u5206\u533a\u5728\u9879\u76ee\u7684 image_cfg.json \u4e2d\u914d\u7f6e\uff0cmk_image.py \u751f\u6210\u955c\u50cf\u8fc7\u7a0b\u4e2d\uff0c\u76f8\u5173\u5206\u533a\u4fe1\u606f\u4f1a\u88ab\u6dfb\u52a0\u5230 env.bin\uff0c \u4ee5 ",(0,s.jsx)(d.code,{children:"MTD="})," \u683c\u5f0f\u5b58\u50a8\u5728\u73af\u5883\u53d8\u91cf\u4e2d\uff1a"]}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{children:"MTD=size1@offset1(partition name1),size2@offset2(partition name2),-(last partition)\n"})}),"\n",(0,s.jsxs)(d.p,{children:["\u5176\u4e2d size \u662f\u5206\u533a\u7684\u5927\u5c0f\uff0coffset \u662f\u5206\u533a\u7684\u5f00\u59cb\u4f4d\u7f6e\uff08\u76f8\u5bf9 UDA \u7684\u5f00\u59cb\u4f4d\u7f6e\uff0c\u5355\u4f4d\u4e3a\u5b57\u8282\uff09\u3002 \u5982\u679c\u662f\u6700\u540e\u4e00\u4e2a\u5206\u533a\uff0c\u53ef\u4ee5\u4e0d\u8bbe\u7f6e ",(0,s.jsx)(d.code,{children:"size@offset"}),"\uff0c\u4f7f\u7528 ",(0,s.jsx)(d.code,{children:"-"})," \u4ee3\u66ff\uff0c\u8868\u793a\u5269\u4f59\u7684\u6240\u6709\u7a7a\u95f4\u90fd\u5206\u914d\u7ed9\u8be5\u5206\u533a\u3002"]}),"\n",(0,s.jsx)(d.p,{children:"\u4f8b\u5982:"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{children:"MTD=spi0.0:128k(spl),512k(uboot),64k(env),64k(envbak),128k(bootui),128k(dtb),\n    5m(kernel),8m(rootfs),-(user)\n"})}),"\n",(0,s.jsx)(d.p,{children:"\u6ce8\u89e3"}),"\n",(0,s.jsx)(d.p,{children:"mtdids \u4e0e\u4f7f\u7528\u7684 spi \u63a5\u53e3\u6709\u5173\u7cfb\u3002\u5f53\u4f7f\u7528 spi0 \u63a5\u53e3\u65f6\uff0c\u4e3a spi0.0\uff1b\u5f53\u4f7f\u7528 spi1 \u63a5\u53e3\u65f6\uff0c\u4e3a spi1.0"}),"\n",(0,s.jsx)(d.p,{children:(0,s.jsx)(d.strong,{children:"SPL \u5206\u533a\u7684\u7279\u522b\u8bf4\u660e"})}),"\n",(0,s.jsx)(d.p,{children:"NOR \u5206\u533a\u65f6\uff0cBROM \u542f\u52a8\u8fc7\u7a0b\u4e2d\uff0c\u56fa\u5b9a\u4ece\u4e24\u4e2a\u5730\u65b9\u8bfb\u53d6 SPL \u7a0b\u5e8f\u7684\u5907\u4efd\u3002 \u9996\u5148\u5c1d\u8bd5\u8bfb\u53d6 SPL \u5907\u4efd1\uff0c\u5982\u679c\u9a8c\u8bc1\u5931\u8d25\uff0c\u518d\u5c1d\u8bd5\u8bfb\u53d6 SPL \u5907\u4efd2\u3002\u5176\u4e2d\u5907\u4efd2\u662f\u53ef\u9009\u7684\u3002"}),"\n",(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.em,{children:"\u8868 3.14"})," ",(0,s.jsx)(d.em,{children:"\u666e\u901a NOR \u7684\u542f\u52a8\u5206\u533a"})]}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{children:"\u5206\u533a"}),(0,s.jsx)(d.th,{children:"\u5927\u5c0f/\u4f4d\u7f6e"}),(0,s.jsx)(d.th,{children:"\u5907\u6ce8"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"\u5907\u4efd1"}),(0,s.jsx)(d.td,{children:"128KB(0~128KB)"}),(0,s.jsx)(d.td,{children:"\u5fc5\u987b"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"\u5907\u4efd2"}),(0,s.jsx)(d.td,{children:"128KB(128KB~256KB)"}),(0,s.jsx)(d.td,{children:"\u53ef\u9009"})]})]})]})]})}function j(e={}){const{wrapper:d}={...(0,r.a)(),...e.components};return d?(0,s.jsx)(d,{...e,children:(0,s.jsx)(x,{...e})}):x(e)}},1151:(e,d,n)=>{n.d(d,{Z:()=>l,a:()=>t});var s=n(7294);const r={},i=s.createContext(r);function t(e){const d=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(d):{...d,...e}}),[d,e])}function l(e){let d;return d=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),s.createElement(i.Provider,{value:d},e.children)}}}]);