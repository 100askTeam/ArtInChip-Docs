"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2495],{3811:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>p,frontMatter:()=>t,metadata:()=>l,toc:()=>d});var s=i(5893),o=i(1151);const t={sidebar_position:2},r="2.\u5b58\u50a8\u914d\u7f6e",l={id:"D213-DevKit/part4/11-2_StorageConfiguration",title:"2.\u5b58\u50a8\u914d\u7f6e",description:"\u5b58\u50a8\u662f\u7f16\u8bd1\u7684\u56fa\u4ef6\u662f\u5426\u53ef\u5237\u673a\u7684\u6700\u91cd\u8981\u7684\u539f\u56e0\uff0c\u4f46\u5b58\u50a8\u7684\u66f4\u6362\u8981\u4fee\u6539\u7684\u5730\u65b9\u6bd4\u8f83\u591a\uff0c\u56e0\u6b64\u6211\u4eec\u5efa\u8bae\u7684\u65b9\u6848\u5c31\u662f\u6309\u7167\u73b0\u5b58\u7684\u5de5\u7a0b\u4eff\u5199\u9700\u8981 Bringup \u7684\u5f00\u53d1\u677f",source:"@site/docs/D213-DevKit/part4/11-2_StorageConfiguration.md",sourceDirName:"D213-DevKit/part4",slug:"/D213-DevKit/part4/11-2_StorageConfiguration",permalink:"/en/docs/D213-DevKit/part4/11-2_StorageConfiguration",draft:!1,unlisted:!1,editUrl:"https://github.com/100askTeam/ArtInChip-Docs/tree/master/docs/D213-DevKit/part4/11-2_StorageConfiguration.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"d213dkSidebar",previous:{title:"1.\u51c6\u5907\u5de5\u4f5c",permalink:"/en/docs/D213-DevKit/part4/11-1_Preparation"},next:{title:"3.\u8c03\u8bd5\u914d\u7f6e",permalink:"/en/docs/D213-DevKit/part4/11-3_DebugTheConfiguration"}},a={},d=[{value:"1. SPINAND",id:"1-spinand",level:3},{value:"1.1. \u578b\u53f7\u9009\u62e9",id:"11-\u578b\u53f7\u9009\u62e9",level:4},{value:"1.1.1. uboot",id:"111-uboot",level:5},{value:"1.1.2. kernel",id:"112-kernel",level:5},{value:"1.2. \u6587\u4ef6\u7cfb\u7edf",id:"12-\u6587\u4ef6\u7cfb\u7edf",level:4},{value:"1.3. \u5206\u533a",id:"13-\u5206\u533a",level:4},{value:"1.4. \u56fa\u4ef6",id:"14-\u56fa\u4ef6",level:4},{value:"1.4.1. \u81ea\u52a8\u9002\u914d",id:"141-\u81ea\u52a8\u9002\u914d",level:5},{value:"1.4.2. \u624b\u5de5\u8c03\u6574",id:"142-\u624b\u5de5\u8c03\u6574",level:5},{value:"2. SPINOR",id:"2-spinor",level:3},{value:"3. EMMC",id:"3-emmc",level:3},{value:"3.1. \u5206\u533a",id:"31-\u5206\u533a",level:4},{value:"3.2. \u56fa\u4ef6",id:"32-\u56fa\u4ef6",level:4},{value:"4. \u6210\u679c",id:"4-\u6210\u679c",level:3}];function c(e){const n={a:"a",code:"code",h1:"h1",h3:"h3",h4:"h4",h5:"h5",p:"p",pre:"pre",strong:"strong",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"2\u5b58\u50a8\u914d\u7f6e",children:"2.\u5b58\u50a8\u914d\u7f6e"}),"\n",(0,s.jsx)(n.p,{children:"\u5b58\u50a8\u662f\u7f16\u8bd1\u7684\u56fa\u4ef6\u662f\u5426\u53ef\u5237\u673a\u7684\u6700\u91cd\u8981\u7684\u539f\u56e0\uff0c\u4f46\u5b58\u50a8\u7684\u66f4\u6362\u8981\u4fee\u6539\u7684\u5730\u65b9\u6bd4\u8f83\u591a\uff0c\u56e0\u6b64\u6211\u4eec\u5efa\u8bae\u7684\u65b9\u6848\u5c31\u662f\u6309\u7167\u73b0\u5b58\u7684\u5de5\u7a0b\u4eff\u5199\u9700\u8981 Bringup \u7684\u5f00\u53d1\u677f"}),"\n",(0,s.jsx)(n.h3,{id:"1-spinand",children:"1. SPINAND"}),"\n",(0,s.jsx)(n.h4,{id:"11-\u578b\u53f7\u9009\u62e9",children:"1.1. \u578b\u53f7\u9009\u62e9"}),"\n",(0,s.jsxs)(n.p,{children:["SDK \u9ed8\u8ba4\u652f\u6301\u4e86\u51e0\u79cd SPINAND\uff0c\u7f16\u8bd1\u4e4b\u524d\u9700\u8981\u786e\u8ba4\u5f00\u53d1\u677f\u7684\u578b\u53f7\u88ab\u9009\u4e2d\u652f\u6301\uff0c\u5982\u679c\u4e0d\u5728\u652f\u6301\u5217\u8868\u4e2d\uff0c \u5219\u9700\u8981\u53c2\u8003 ",(0,s.jsx)(n.a,{href:"../memory/spinand/index.html#ref-luban-spinand",children:"SPINAND \u79fb\u690d\u6307\u5357"})," \u8fdb\u884c\u79fb\u690d"]}),"\n",(0,s.jsx)(n.p,{children:"uboot \u548c SPL \u5206\u533a\u4e00\u822c\u90fd\u6bd4\u8f83\u5c0f\uff0c\u5f00\u542f\u7684 SPINAND \u578b\u53f7\u8fc7\u591a\u7684\u8bdd\u5b58\u50a8\u5bb9\u6613\u8d8a\u754c\uff0c\u56e0\u6b64\u5efa\u8bae\u53ea\u6253\u5f00\u9700\u8981\u7528\u5230\u7684\u578b\u53f7\u5373\u53ef"}),"\n",(0,s.jsx)(n.h5,{id:"111-uboot",children:"1.1.1. uboot"}),"\n",(0,s.jsx)(n.p,{children:"\u901a\u8fc7 make um \u2013> Device Drivers \u2013> MTD Support \u9009\u62e9"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"(0x240000) Offset of bbt in nand\n(0x40000) Range of bbt in nand\n[*] Define U-boot binaries locations in SPI NAND\n(0x100000) Location in SPI NAND to read U-Boot from\n[ ] Support Micron SPI NAND\n[ ] Support Macronix SPI NAND\n[*] Support Winbond SPI NAND\n[ ] Support Winbond SPI NAND CONTINUOUS READ MODE\n[*] Support GigaDevice SPI NAND\n[ ] Support Toshiba SPI NAND\n[*] Support FudanMicro SPI NAND\n[*] Support Foresee SPI NAND\n[*] Support Zbit SPI NAND\n[ ] Support Elite SPI NAND\n[ ] Support ESMT SPI NAND\n[ ] Support UMTEK SPI NAND\nSPI Flash Support  ---\x3e\nUBI support  ---\x3e\n"})}),"\n",(0,s.jsx)(n.h5,{id:"112-kernel",children:"1.1.2. kernel"}),"\n",(0,s.jsx)(n.p,{children:"kernel \u5206\u533a\u6bd4\u8f83\u5927\uff0c\u9ed8\u8ba4\u6253\u5f00\u4e86 SDK \u652f\u6301\u7684\u6240\u6709\u578b\u53f7\uff0c\u56e0\u6b64\u4e0d\u7528\u9009\u62e9\u3002"}),"\n",(0,s.jsx)(n.h4,{id:"12-\u6587\u4ef6\u7cfb\u7edf",children:"1.2. \u6587\u4ef6\u7cfb\u7edf"}),"\n",(0,s.jsx)(n.p,{children:"SPINAND \u6587\u4ef6\u7cfb\u7edf\u91c7\u7528 UBIFS\uff0c \u4ee5 demo128_nand \u5de5\u7a0b\u4e3a\u4f8b\uff0c\u7f16\u8bd1\u540e\u751f\u6210\u56fa\u4ef6\u7684\u540d\u79f0\u4e3a: d211_xxx_page_2k_block_128k_v1.0.0.img"}),"\n",(0,s.jsx)(n.p,{children:"SDK \u4e5f\u652f\u6301 page size \u4e3a 4K\uff08\u5f88\u5c11\u7528\u5230\uff09\u7684SPINAND\uff0c\u9700\u8981\u5728\u5de5\u7a0b\u7684\u914d\u7f6e\u6587\u4ef6 target/d211/demo128_nand/image_cfg.json \u8fdb\u884c\u914d\u7f6e"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'"info": { // Header information about image\n    "platform": "d211",\n    "product": "demo128_nand",\n    "version": "1.0.0",\n    "media": {\n        "type": "spi-nand",\n        "device_id": 0,\n        "array_organization": [\n        //      { "page": "4k", "block": "256k" },\n                { "page": "2k", "block": "128k" },\n        ],\n    }\n},\n'})}),"\n",(0,s.jsx)(n.h4,{id:"13-\u5206\u533a",children:"1.3. \u5206\u533a"}),"\n",(0,s.jsx)(n.p,{children:"\u5206\u533a\u4fe1\u606f\u5728 target/d211/demo128_nand/image_cfg.json \u4e2d"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'"spi-nand": { // Device, The name should be the same with string in image:info:media:type\n        "size": "128m", // Size of SPI NAND\n        "partitions": {\n            "spl":      { "size": "1m" },\n            "uboot":    { "size": "1m" },\n            "userid":   { "size": "256k" },\n            "bbt":      { "size": "256k" },\n            "env":      { "size": "256k" },\n            "env_r":    { "size": "256k" },\n            "falcon":   { "size": "256k" },\n            "logo":     { "size": "768K" },\n            "kernel":   { "size": "12m" },\n            "recovery": { "size": "10m" },\n            "ubiroot":  {\n                "size": "32m",                          //\u5206\u533a\u5927\u5c0f\u4e3a32m\n                "ubi": { // Volume in UBI device\n                    "rootfs": { "size": "-" },\n                },\n            },\n            "ubisystem": {\n                "size": "-",\n                "ubi": { // Volume in UBI device\n                    "ota":   { "size": "48m" },\n                    "user":   { "size": "-" },\n                },\n            },\n        }\n    },\n'})}),"\n",(0,s.jsx)(n.h4,{id:"14-\u56fa\u4ef6",children:"1.4. \u56fa\u4ef6"}),"\n",(0,s.jsx)(n.p,{children:"\u56fa\u4ef6\u7684\u5927\u5c0f\u8981\u548c\u5206\u533a\u5927\u5c0f\u76f8\u5339\u914d\uff0c\u53ef\u4ee5\u81ea\u52a8\u9002\u914d\u4e5f\u53ef\u4ee5\u624b\u5de5\u8c03\u6574"}),"\n",(0,s.jsx)(n.h5,{id:"141-\u81ea\u52a8\u9002\u914d",children:"1.4.1. \u81ea\u52a8\u9002\u914d"}),"\n",(0,s.jsx)(n.p,{children:"make menuconfig \u2013> Filesystem images"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"RootFS images  ---\x3e\n[ ] UserFS 1  ----\n[ ] UserFS 2  ----\n[ ] UserFS 3  ----\n[ ] Generate burner format image\n[*] Auto calculate partition size to generate image                 //\u901a\u8fc7\u5206\u533a\u5927\u5c0f\u81ea\u52a8\u751f\u6210\u56fa\u4ef6\n"})}),"\n",(0,s.jsx)(n.h5,{id:"142-\u624b\u5de5\u8c03\u6574",children:"1.4.2. \u624b\u5de5\u8c03\u6574"}),"\n",(0,s.jsx)(n.p,{children:"\u901a\u8fc7 make menuconfig \u2013> Filesystem images \u2013> RootFS images \u8c03\u6574"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"[ ] ext2/3/4 root filesystem\n[ ] cpio the root filesystem (for use as an initial RAM filesystem)\n[ ] initial RAM filesystem linked into linux kernel\n[ ] jffs2 root filesystem\n[ ] squashfs root filesystem\n[ ] tar the root filesystem\n    ubi parameter select (spi-nand all type support)  ---\x3e\n[*] ubi image containing an ubifs root filesystem\n[ ]   Use custom config file\n()    Additional ubinize options\n-*- ubifs root filesystem\n(0x2000000) ubifs size(Should be aligned to MB)                      //\u56fa\u4ef6\u5927\u5c0f\uff0c32M\nubifs runtime compression (lzo)  ---\x3e\nCompression method (no compression)  ---\x3e\n(-F)  Additional mkfs.ubifs options\n"})}),"\n",(0,s.jsx)(n.h3,{id:"2-spinor",children:"2. SPINOR"}),"\n",(0,s.jsx)(n.p,{children:"SPINOR \u91c7\u7528 squashfs \u6587\u4ef6\u7cfb\u7edf\uff0c\u4ee5 per2_spinor \u5de5\u7a0b\u4e3a\u4f8b\uff0c \u7f16\u8bd1\u51fa\u6765\u7684\u56fa\u4ef6\u4e3a d211_per2_spinor_v1.0.0.img"}),"\n",(0,s.jsx)(n.p,{children:"SPINOR \u7684\u5206\u533a\u4fe1\u606f\u5728 target/d211/per2_spinor/image_cfg.json \u4e2d"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'"spi-nor": { // Media type\n    "size": "16m", // Size of NOR\n    "partitions": {\n        "spl":    { "size": "256k" },\n        "uboot":  { "size": "640k" },\n        "userid": { "size": "64k" },\n        "env":    { "size": "64k" },\n        "env_r":  { "size": "64k" },\n        "falcon": { "size": "64k" },\n        "logo":   { "size": "512k" },\n        "kernel": { "size": "5m" },\n        "rootfs": { "size": "9m" },\n        // "user":   { "size": "-" },\n    }\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"SPINOR \u5b58\u50a8\u4e00\u822c\u6bd4\u8f83\u5c0f\uff0c\u5728 Linux \u7cfb\u7edf\u4e0a\u8fdb\u884c\u5206\u533a\u8c03\u6574\u6bd4\u8f83\u9ebb\u70e6\uff0c\u672c\u6587\u6863\u4e0d\u8be6\u7ec6\u63cf\u8ff0"}),"\n",(0,s.jsx)(n.h3,{id:"3-emmc",children:"3. EMMC"}),"\n",(0,s.jsx)(n.p,{children:"EMMC \u91c7\u7528 squashfs\uff0c\u4ee5 demo \u5de5\u7a0b\u4e3a\u4f8b\uff0c \u7f16\u8bd1\u51fa\u6765\u7684\u56fa\u4ef6\u4e3a d211_demo_v1.0.0.img"}),"\n",(0,s.jsx)(n.p,{children:"EMMC \u7684\u63a5\u53e3\u534f\u8bae\u56fa\u5b9a\uff0c\u56e0\u6b64\u4e0d\u9700\u8981\u8fdb\u884c\u65b0\u5668\u4ef6\u578b\u53f7\u7684\u79fb\u690d"}),"\n",(0,s.jsx)(n.p,{children:"\u6ce8\u89e3"}),"\n",(0,s.jsx)(n.p,{children:"\u8c03\u6574\u5206\u533a\u5927\u5c0f\u65f6\uff0c\u4e5f\u9700\u8981\u540c\u65f6\u8c03\u6574\u56fa\u4ef6\u7684\u5927\u5c0f\u6765\u548c\u5206\u533a\u5339\u914d"}),"\n",(0,s.jsx)(n.h4,{id:"31-\u5206\u533a",children:"3.1. \u5206\u533a"}),"\n",(0,s.jsx)(n.p,{children:"\u5206\u533a\u4fe1\u606f\u5728 target/d211/demo/image_cfg.json \u4e2d"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'"mmc": { // Media type\n    "size": "4G", // Size of SD/eMMC\n    "partitions": { // Partition table apply to device\n        "spl":    { "offset": "0x4400", "size": "495k" },\n        "uboot":  { "size": "1m" },\n        "env":    { "size": "256k" },\n        "falcon": { "size": "256k" },\n        "logo":   { "size": "512k" },\n        "kernel": { "size": "16m" },\n        "rootfs": { "size": "72m" },        //\u5206\u533a\u5927\u5c0f\u4e3a72M\n        "user":   { "size": "-" },\n    },\n},\n'})}),"\n",(0,s.jsx)(n.h4,{id:"32-\u56fa\u4ef6",children:"3.2. \u56fa\u4ef6"}),"\n",(0,s.jsx)(n.p,{children:"\u56fa\u4ef6\u7684\u5927\u5c0f\u8c03\u6574\u901a\u8fc7 make menuconfig \u2013> Filesystem images \u2013> RootFS images \u8c03\u6574"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"[*] ext2/3/4 root filesystem\next2/3/4 variant (ext4)  ---\x3e\n(rootfs) filesystem label\n(72M) exact size                                                 //\u56fa\u4ef6\u5927\u5c0f\u4e3a72M\n(0)   exact number of inodes (leave at 0 for auto calculation)\n(5)   reserved blocks percentage\n(-O ^64bit) additional mke2fs options\nCompression method (no compression)  ---\x3e\n[ ] cpio the root filesystem (for use as an initial RAM filesystem)\n[ ] initial RAM filesystem linked into linux kernel\n"})}),"\n",(0,s.jsx)(n.h3,{id:"4-\u6210\u679c",children:"4. \u6210\u679c"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"\u6b63\u786e\u7684\u5b58\u50a8\u914d\u7f6e\u5e94\u8be5\u80fd\u591f\u6210\u529f\u652f\u6301\u56fa\u4ef6\u70e7\u5f55"})})]})}function p(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>l,a:()=>r});var s=i(7294);const o={},t=s.createContext(o);function r(e){const n=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);