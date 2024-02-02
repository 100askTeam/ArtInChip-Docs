"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[923],{5241:(n,e,r)=>{r.r(e),r.d(e,{assets:()=>c,contentTitle:()=>t,default:()=>o,frontMatter:()=>s,metadata:()=>l,toc:()=>h});var i=r(5893),d=r(1151);const s={sidebar_position:8},t="2.6. \u70e7\u5f55\u955c\u50cf",l={id:"Luban-SDK/part1/02-6_BurningMirrorImage",title:"2.6. \u70e7\u5f55\u955c\u50cf",description:"Luban SDK \u7f16\u8bd1\u7684\u6700\u7ec8\u8f93\u51fa\u7ed3\u679c\u662f\u4e00\u4e2a\u7528\u4e8e\u70e7\u5f55\u5230\u76ee\u6807\u5e73\u53f0\u7684\u955c\u50cf\u6587\u4ef6\u3002",source:"@site/docs/Luban-SDK/part1/02-6_BurningMirrorImage.md",sourceDirName:"Luban-SDK/part1",slug:"/Luban-SDK/part1/02-6_BurningMirrorImage",permalink:"/docs/Luban-SDK/part1/02-6_BurningMirrorImage",draft:!1,unlisted:!1,editUrl:"https://github.com/100askTeam/ArtInChip-Docs/tree/master/docs/Luban-SDK/part1/02-6_BurningMirrorImage.md",tags:[],version:"current",sidebarPosition:8,frontMatter:{sidebar_position:8},sidebar:"lunbansdkSidebar",previous:{title:"2.5. \u7cfb\u7edf\u955c\u50cf",permalink:"/docs/Luban-SDK/part1/02-5_SystemImage"},next:{title:"2.7. \u6dfb\u52a0\u677f\u5b50",permalink:"/docs/Luban-SDK/part1/02-7_AddBoard"}},c={},h=[{value:"2.6.1. \u955c\u50cf\u683c\u5f0f",id:"261-\u955c\u50cf\u683c\u5f0f",level:2},{value:"2.6.2. \u5236\u4f5c\u5de5\u5177",id:"262-\u5236\u4f5c\u5de5\u5177",level:2},{value:"2.6.3. \u914d\u7f6e\u6587\u4ef6",id:"263-\u914d\u7f6e\u6587\u4ef6",level:2},{value:"2.6.3.1. \u5206\u533a\u8868\u63cf\u8ff0",id:"2631-\u5206\u533a\u8868\u63cf\u8ff0",level:3},{value:"2.6.3.2. Image \u6587\u4ef6\u63cf\u8ff0",id:"2632-image-\u6587\u4ef6\u63cf\u8ff0",level:3},{value:"2.6.3.2.1. Info \u6570\u636e\u63cf\u8ff0",id:"26321-info-\u6570\u636e\u63cf\u8ff0",level:4},{value:"2.6.3.2.2. Updater \u6570\u636e\u63cf\u8ff0",id:"26322-updater-\u6570\u636e\u63cf\u8ff0",level:4},{value:"2.6.3.2.3. Target \u6570\u636e\u63cf\u8ff0",id:"26323-target-\u6570\u636e\u63cf\u8ff0",level:4},{value:"2.6.3.3. \u4e2d\u95f4\u6587\u4ef6\u63cf\u8ff0",id:"2633-\u4e2d\u95f4\u6587\u4ef6\u63cf\u8ff0",level:3}];function a(n){const e={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,d.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h1,{id:"26-\u70e7\u5f55\u955c\u50cf",children:"2.6. \u70e7\u5f55\u955c\u50cf"}),"\n",(0,i.jsx)(e.p,{children:"Luban SDK \u7f16\u8bd1\u7684\u6700\u7ec8\u8f93\u51fa\u7ed3\u679c\u662f\u4e00\u4e2a\u7528\u4e8e\u70e7\u5f55\u5230\u76ee\u6807\u5e73\u53f0\u7684\u955c\u50cf\u6587\u4ef6\u3002"}),"\n",(0,i.jsx)(e.h2,{id:"261-\u955c\u50cf\u683c\u5f0f",children:"2.6.1. \u955c\u50cf\u683c\u5f0f"}),"\n",(0,i.jsx)(e.p,{children:"ArtInChip \u7684\u70e7\u5f55\u955c\u50cf\u6587\u4ef6\u7531\u7ec4\u4ef6(FirmWare Component) \u4ee5\u53ca\u5bf9\u5e94\u7684\u7ec4\u4ef6\u5143\u4fe1\u606f\u7ec4\u6210\u3002 \u6570\u636e\u5206\u5e03\u5982\u4e0b\u56fe\u6240\u793a\u3002"}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/image_format3-17066839676741.png",alt:"../../_https://photos.100ask.net/artinchip-docs/d213-devkit/image_format3.png"})}),"\n",(0,i.jsxs)(e.p,{children:["\u56fe 2.47 ",(0,i.jsx)(e.em,{children:"\u70e7\u5f55\u955c\u50cf\u683c\u5f0f"})]}),"\n",(0,i.jsx)(e.p,{children:"\u5176\u4e2d\u4e00\u4e9b\u9700\u8981\u6253\u5305\u7684\u6570\u636e\u6587\u4ef6\uff0c\u90fd\u88ab\u5f53\u505a\u7ec4\u4ef6(FWC)\u8fdb\u884c\u5904\u7406\uff0c\u5305\u62ec SPL\uff0cU-Boot\uff0cKernel\uff0cDTB \u7b49\u6570\u636e\u3002"}),"\n",(0,i.jsx)(e.p,{children:"Image Header \u7684\u5177\u4f53\u683c\u5f0f\u5982\u4e0b\uff1a"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'struct artinchip_fw_hdr{\n    char magic[8];              // \u56fa\u5b9a\u4e3a "AIC.FW"\n    char platform[64];          // \u8be5\u955c\u50cf\u6587\u4ef6\u9002\u7528\u7684\u82af\u7247\u5e73\u53f0\n    char product[64];           // \u8be5\u955c\u50cf\u6587\u4ef6\u9002\u7528\u7684\u4ea7\u54c1\u578b\u53f7\n    char version[64];           // \u8be5\u955c\u50cf\u7684\u7248\u672c\n    char media_type[64];        // \u8be5\u955c\u50cf\u6587\u4ef6\u53ef\u70e7\u5f55\u7684\u5b58\u50a8\u4ecb\u8d28\n    u32  media_dev_id;          // \u8be5\u955c\u50cf\u6587\u4ef6\u53ef\u70e7\u5f55\u7684\u5b58\u50a8\u4ecb\u8d28 ID\n    u8   nand_array_org[64];    // NAND Cell Array \u7684\u7ec4\u7ec7\n    u32  meta_offset;           // FWC Meta Area start offset\n    u32  meta_size;             // FWC Meta Area size\n    u32  file_offset;           // FWC File data Area start offset\n    u32  file_size;             // FWC File data Area size\n    u8 padding[];               // Pad to 2048\n};\n'})}),"\n",(0,i.jsx)(e.p,{children:"FWC Meta \u7684\u683c\u5f0f\u5982\u4e0b\uff1a"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'struct artinchip_fwc_meta {\n    char magic[8];      // \u56fa\u5b9a\u4e3a "META"\n    char name[64];      // \u5bf9\u5e94\u7ec4\u4ef6\u7684\u540d\u5b57\n    char partition[64]; // \u8be5\u7ec4\u4ef6\u8981\u70e7\u5f55\u7684\u5206\u533a\u540d\u5b57\n    u32  offset;        // \u8be5\u7ec4\u4ef6\u6570\u636e\u5728\u955c\u50cf\u6587\u4ef6\u4e2d\u7684\u504f\u79fb\n    u32  size;          // \u8be5\u7ec4\u4ef6\u6570\u636e\u7684\u5927\u5c0f\n    u32  crc32;         // \u8be5\u7ec4\u4ef6\u6570\u636e\u7684CRC32\u6821\u9a8c\u503c\n    u32  ram;           // \u5f53\u7ec4\u4ef6\u8981\u4e0b\u8f7d\u5230\u5e73\u53f0 RAM \u65f6\uff0c\u8981\u4e0b\u8f7d\u7684\u5730\u5740\n    char attr[64]       // \u8be5\u7ec4\u4ef6\u7684\u5c5e\u6027\uff0c\u5b57\u7b26\u4e32\u8868\u793a\n    u8 padding[296];    // Pad to 512\n};\n'})}),"\n",(0,i.jsx)(e.h2,{id:"262-\u5236\u4f5c\u5de5\u5177",children:"2.6.2. \u5236\u4f5c\u5de5\u5177"}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"\u5de5\u5177"}),(0,i.jsx)(e.th,{children:"\u8bf4\u660e"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"mkimage"}),(0,i.jsx)(e.td,{children:"\u7528\u4e8e\uff1a- \u5236\u4f5c uImage \u683c\u5f0f\u7684 U-Boot \u955c\u50cf- \u5236\u4f5c FIT \u955c\u50cf- \u5bf9 FIT \u955c\u50cf\u8fdb\u884c\u7b7e\u540d"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"mkenvimage"}),(0,i.jsx)(e.td,{children:"\u7528\u4e8e\uff1a\u7f16\u8bd1\u751f\u6210 env.bin"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"mk_image.py"}),(0,i.jsx)(e.td,{children:"\u7528\u4e8e\uff1a- \u5236\u4f5c AIC \u683c\u5f0f\u7684\u542f\u52a8\u955c\u50cf\uff0c\u5305\u62ec\u7b7e\u540d\u548c\u52a0\u5bc6- \u6253\u5305\u56fa\u4ef6\u7ec4\u4ef6\uff0c\u751f\u6210\u7528\u4e8e\u5347\u7ea7\u7684\u56fa\u4ef6\u955c\u50cf\u6587\u4ef6\u3002tools/scripts/mk_image.py"})]})]})]}),"\n",(0,i.jsx)(e.h2,{id:"263-\u914d\u7f6e\u6587\u4ef6",children:"2.6.3. \u914d\u7f6e\u6587\u4ef6"}),"\n",(0,i.jsxs)(e.p,{children:["\u4f7f\u7528 ",(0,i.jsx)(e.code,{children:"mk_image.py"})," \u5236\u4f5c\u70e7\u5f55\u955c\u50cf\u65f6\uff0c\u9700\u8981\u63d0\u4f9b ",(0,i.jsx)(e.code,{children:"image_cfg.json"})," \u955c\u50cf\u914d\u7f6e\u6587\u4ef6\u3002"]}),"\n",(0,i.jsx)(e.p,{children:"\u8be5\u914d\u7f6e\u6587\u4ef6\u901a\u8fc7\u5d4c\u5957\u5bf9\u8c61\u7684\u65b9\u5f0f\uff0c\u63cf\u8ff0\u4e00\u4e2a\u5f85\u751f\u6210\u7684\u955c\u50cf\u6587\u4ef6\u6240\u5305\u542b\u7684\u4fe1\u606f\u548c\u6570\u636e\u3002\u5982\u4e0b\u9762\u7684\u793a\u4f8b\uff0c\u8be5\u63cf\u8ff0\u6587\u4ef6\u5206\u4e3a\u51e0\u90e8\u5206\uff1a"}),"\n",(0,i.jsxs)(e.blockquote,{children:["\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u955c\u50cf\u70e7\u5f55\u7684\u76ee\u6807\u8bbe\u5907\u63cf\u8ff0\uff1a\u5206\u533a\u8868\u7684\u914d\u7f6e"}),"\n",(0,i.jsx)(e.li,{children:"\u6700\u7ec8\u955c\u50cf\u7684\u5185\u5bb9\u63cf\u8ff0\uff1a\u4fe1\u606f\u548c\u5185\u5bb9\u6392\u5e03"}),"\n",(0,i.jsx)(e.li,{children:"\u4e2d\u95f4\u6587\u4ef6\u7684\u63cf\u8ff0"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'{\n    "mmc": { // Media type\n        "size": "8G", // Size of SD/eMMC\n        "partitions": { // Partition table apply to device\n            "spl_1":  { "offset": "0x4400", "size": "128k" },\n            "spl_2":  { "size": "367k" },\n            "uboot":  { "size": "1m" },\n            "env":    { "size": "512k" },\n            "kernel": { "size": "16m" },\n            "rootfs": { "size": "64m" },\n            "user":   { "size": "-" },\n        },\n    },\n    "image": {\n        "info": { // Header information about image\n            "platform": "d211",\n            "product": "per1_mmc",\n            "version": "1.0.0",\n            "media": {\n                "type": "mmc",\n                "device_id": 0,\n            }\n        },\n\n        "updater": { // Image writer which is downloaded to RAM by USB\n            "spl": {\n                "file": "u-boot-spl-dtb.aic",\n                "attr": ["required", "run"],\n                "ram": "0x00103000"\n            },\n            "env": {\n                "file": "env.bin",\n                "attr": ["required"],\n                "ram": "0x83100000"\n            },\n            "uboot": {\n                "file": "u-boot-dtb.aic",\n                "attr": ["required", "run"],\n                "ram": "0x80007F00"\n            }\n        },\n\n        "target": { // Image components which will be burn to device\'s partitions\n            "spl": {\n                "file": "u-boot-spl-dtb.aic",\n                "attr": ["required"],\n                "part": ["spl_1"]\n            },\n            "uboot": {\n                "file": "u-boot-dtb.img",\n                "attr": ["block", "required"],\n                "part": ["uboot"]\n            },\n            "env": {\n                "file": "env.bin",\n                "attr": ["block", "required"],\n                "part": ["env"]\n            },\n            "kernel": {\n                "file": "kernel.itb",\n                "attr": ["block", "required"],\n                "part": ["kernel"]\n            },\n            "rootfs": {\n                "file": "rootfs.ext4",\n                "attr": ["block", "required"],\n                "part": ["rootfs"]\n            },\n            "app": {\n                "file": "user.ext4",\n                "attr": ["block", "optional"],\n                "part": ["user"]\n            },\n        },\n    },\n\n    "temporary": { // Pre-proccess to generate image components from raw data\n        "aicboot": {\n            "u-boot-spl-dtb.aic": {\n                "head_ver": "0x00010000",\n                "loader": {\n                    "file": "u-boot-spl-dtb.bin",\n                    "load address": "0x103100",\n                    "entry point": "0x103100",\n                },\n            },\n            "u-boot-dtb.aic": {\n                "head_ver": "0x00010000",\n                "loader": {\n                    "file": "u-boot-dtb.bin",\n                    "load address": "0x80008000",\n                    "entry point": "0x80008000",\n                },\n            },\n        },\n        "uboot_env": {\n            "env.bin": {\n                "file": "env.txt",\n                "size": "0x4000",\n            },\n        },\n        "itb": {\n            "kernel.itb": {\n                "its": "kernel.its"\n            },\n        },\n    },\n}\n'})}),"\n",(0,i.jsx)(e.h3,{id:"2631-\u5206\u533a\u8868\u63cf\u8ff0",children:"2.6.3.1. \u5206\u533a\u8868\u63cf\u8ff0"}),"\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.code,{children:"image_cfg.json"})," \u6587\u4ef6\u7684\u5f00\u5934\u9996\u5148\u63cf\u8ff0\u7684\u662f\u5f53\u524d\u8981\u70e7\u5f55\u7684\u76ee\u6807\u5b58\u50a8\u8bbe\u5907\uff0c\u4ee5\u53ca\u5728\u8bbe\u5907\u4e0a\u7684\u5206\u533a\u914d\u7f6e\u3002"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'"<media type>": {\n    "size": "xx",\n    "partitions": {\n        "<part n>": {\n            "offset": "yy",\n            "size": "zz",\n            "ubi": {\n                "offset": "ii",\n                "size": "jj",\n            }\n        }\n    }\n}\n'})}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"\u5b58\u50a8\u8bbe\u5907"}),(0,i.jsx)(e.th,{children:"\u8bf4\u660e"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201cmmc\u201d"}),(0,i.jsx)(e.td,{children:"eMMC \u548c SD Card \u8bbe\u5907"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201cspi-nand\u201d"}),(0,i.jsx)(e.td,{children:"SPI NAND \u8bbe\u5907"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201cspi-nor\u201d"}),(0,i.jsx)(e.td,{children:"SPI NOR \u8bbe\u5907"})]})]})]}),"\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.code,{children:"\u5b58\u50a8\u8bbe\u5907"})," \u7684\u540d\u5b57\u4ec5\u53ef\u4f7f\u7528\u4e0a\u8ff0\u5217\u8868\u6240\u6307\u5b9a\u7684\u540d\u5b57\u3002"]}),"\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.code,{children:"\u5b58\u50a8\u8bbe\u5907"})," \u7684\u53ef\u8bbe\u7f6e\u5c5e\u6027\u6709\uff1a"]}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"\u5b58\u50a8\u8bbe\u5907\u5bf9\u8c61\u7684\u5c5e\u6027\u540d \u8bf4\u660e"}),(0,i.jsx)(e.th,{})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201csize\u201d"}),(0,i.jsx)(e.td,{children:"\u503c\u4e3a\u5b57\u7b26\u4e32\u3002\u8bbe\u5907\u7684\u5b58\u50a8\u5927\u5c0f(Byte)\uff0c\u53ef\u4f7f\u7528 \u201cK,M,G\u201d \u5355\u4f4d\uff0ce.g. \u201c8G\u201d"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201cpartitions\u201d"}),(0,i.jsxs)(e.td,{children:["\u662f ",(0,i.jsx)(e.code,{children:"\u5206\u533a\u8868"})," \u5bf9\u8c61\u3002\u5305\u542b\u8be5\u5b58\u50a8\u8bbe\u5907\u7684\u8be6\u7ec6\u5206\u533a\u5217\u8868\uff0c\u6bcf\u4e00\u4e2a\u5b50\u5bf9\u8c61\u4e3a\u4e00\u4e2a ",(0,i.jsx)(e.code,{children:"\u5206\u533a"}),"\u3002"]})]})]})]}),"\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.code,{children:"\u5206\u533a"})," \u5bf9\u8c61\u7684\u5c5e\u6027\u6709\uff1a"]}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"\u5206\u533a\u5bf9\u8c61\u7684\u5c5e\u6027\u540d \u8bf4\u660e"}),(0,i.jsx)(e.th,{})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201coffset\u201d"}),(0,i.jsxs)(e.td,{children:["\u503c\u4e3a16\u8fdb\u5236\u5b57\u7b26\u4e32\u3002\u8868\u793a\u8be5 ",(0,i.jsx)(e.code,{children:"\u5206\u533a"})," \u7684\u5f00\u59cb\u4f4d\u7f6e\u79bb ",(0,i.jsx)(e.code,{children:"\u5b58\u50a8\u8bbe\u5907"})," \u7684\u5f00\u59cb\u4f4d\u7f6e\u7684\u504f\u79fb\uff08\u5b57\u8282\uff09\u3002\u5982\u679c \u201coffset\u201d \u4e0d\u51fa\u73b0\uff0c\u8868\u793a\u5f53\u524d\u5206\u533a\u7d27\u63a5\u4e0a\u4e00\u4e2a\u5206\u533a\u3002"]})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201csize\u201d"}),(0,i.jsx)(e.td,{children:"\u503c\u4e3a\u5b57\u7b26\u4e32\u3002\u8bbe\u5907\u7684\u5b58\u50a8\u5927\u5c0f(Byte)\uff0c\u53ef\u4f7f\u7528 \u201cK,M,G\u201d \u5355\u4f4d\uff0ce.g. \u201c8G\u201d\u3002\u6700\u540e\u4e00\u4e2a\u5206\u533a\u53ef\u4ee5\u4f7f\u7528 \u201c-\u201d \u8868\u793a\u4f7f\u7528\u5269\u4e0b\u6240\u6709\u7684\u7a7a\u95f4\u3002"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201cubi\u201d"}),(0,i.jsxs)(e.td,{children:["\u662f ",(0,i.jsx)(e.code,{children:"UBI Volume \u8868"})," \u5bf9\u8c61\u3002\u5f53\u5b58\u50a8\u8bbe\u5907\u4e3a \u201cspi-nand\u201d \u65f6\u51fa\u73b0\uff0c\u8868\u793a\u5f53\u524d MTD \u5206\u533a\u662f\u4e00\u4e2a UBI \u8bbe\u5907\u3002\u8be5\u5bf9\u8c61\u63cf\u8ff0 UBI \u8bbe\u5907\u4e2d\u7684 Volume \u8868\u3002\u6bcf\u4e00\u4e2a\u5b50\u5bf9\u8c61\u4e3a\u4e00\u4e2a ",(0,i.jsx)(e.code,{children:"UBI Volume"})," \u3002"]})]})]})]}),"\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.code,{children:"UBI Volume"})," \u5bf9\u8c61\u7684\u5c5e\u6027\u6709:"]}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"UBI Volume\u5bf9\u8c61\u7684\u5c5e\u6027\u540d"}),(0,i.jsx)(e.th,{children:"\u8bf4\u660e"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201coffset\u201d"}),(0,i.jsxs)(e.td,{children:["\u503c\u4e3a16\u8fdb\u5236\u5b57\u7b26\u4e32\u3002\u8868\u793a\u8be5 ",(0,i.jsx)(e.code,{children:"Volume"})," \u7684\u5f00\u59cb\u4f4d\u7f6e\u79bb ",(0,i.jsx)(e.code,{children:"MTD"})," \u5206\u533a\u7684\u5f00\u59cb\u4f4d\u7f6e\u7684\u504f\u79fb\uff08\u5b57\u8282\uff09\u5982\u679c \u201coffset\u201d \u4e0d\u51fa\u73b0\uff0c\u8868\u793a\u5f53\u524d Volume \u7d27\u63a5\u4e0a\u4e00\u4e2a Volume\u3002"]})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201csize\u201d"}),(0,i.jsx)(e.td,{children:"\u503c\u4e3a\u5b57\u7b26\u4e32\u3002\u8bbe\u5907\u7684\u5b58\u50a8\u5927\u5c0f(Byte)\uff0c\u53ef\u4f7f\u7528 \u201cK,M,G\u201d \u5355\u4f4d\uff0ce.g. \u201c8G\u201d\u6700\u540e\u4e00\u4e2a\u5206\u533a\u53ef\u4ee5\u4f7f\u7528 \u201c-\u201d \u8868\u793a\u4f7f\u7528\u5269\u4e0b\u6240\u6709\u7684\u7a7a\u95f4\u3002"})]})]})]}),"\n",(0,i.jsx)(e.h3,{id:"2632-image-\u6587\u4ef6\u63cf\u8ff0",children:"2.6.3.2. Image \u6587\u4ef6\u63cf\u8ff0"}),"\n",(0,i.jsx)(e.p,{children:"\u201cimage\u201d \u5bf9\u8c61\u63cf\u8ff0\u8981\u751f\u6210\u7684\u955c\u50cf\u6587\u4ef6\u7684\u57fa\u672c\u4fe1\u606f\uff0c\u4ee5\u53ca\u8981\u6253\u5305\u7684\u6570\u636e\u3002\u5305\u542b\u51e0\u4e2a\u90e8\u5206\uff1a"}),"\n",(0,i.jsxs)(e.blockquote,{children:["\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u201cinfo\u201d"}),"\n",(0,i.jsx)(e.li,{children:"\u201cupdater\u201d"}),"\n",(0,i.jsx)(e.li,{children:"\u201ctarget\u201d"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'"image": {\n    "info": {\n        ...\n    }\n    "updater": {\n        ...\n    }\n    "target": {\n        ...\n    }\n}\n'})}),"\n",(0,i.jsx)(e.h4,{id:"26321-info-\u6570\u636e\u63cf\u8ff0",children:"2.6.3.2.1. Info \u6570\u636e\u63cf\u8ff0"}),"\n",(0,i.jsx)(e.p,{children:"\u201cinfo\u201d \u5bf9\u8c61\u7528\u4e8e\u63cf\u8ff0\u8be5\u70e7\u5f55\u955c\u50cf\u7684\u57fa\u672c\u4fe1\u606f\uff0c\u8fd9\u4e9b\u4fe1\u606f\u7528\u4e8e\u751f\u6210 Image Header\u3002"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'"info": {\n    "platform": "<soc name>",\n    "product": "<product name>",\n    "version": "x.y.z",\n    "media": {\n        "type": "<media type>",\n        "device_id": n,\n        "array_organization": {\n            "page": "xx",\n            "block": "yy",\n        }\n    }\n}\n'})}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"info \u5c5e\u6027"}),(0,i.jsx)(e.th,{children:"\u8bf4\u660e"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201cplatform\u201d"}),(0,i.jsx)(e.td,{children:"\u5b57\u7b26\u4e32\uff0c\u5f53\u524d\u9879\u76ee\u6240\u4f7f\u7528\u7684 SoC \u7684\u540d\u5b57"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201cproduct\u201d"}),(0,i.jsx)(e.td,{children:"\u5b57\u7b26\u4e32\uff0c\u4ea7\u54c1\u540d\u5b57\u3001\u4ea7\u54c1\u578b\u53f7"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201cversion\u201d"}),(0,i.jsx)(e.td,{children:"\u5b57\u7b26\u4e32\uff0c\u6309\u7167 \u201cx.y.z\u201d \u683c\u5f0f\u63d0\u4f9b\u7684\u7248\u672c\u53f7\uff0c\u5176\u4e2d x,y,z \u90fd\u662f\u6570\u5b57"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201cmedia\u201d"}),(0,i.jsx)(e.td,{children:"\u5bf9\u8c61\uff0c\u63cf\u8ff0\u5b58\u50a8\u8bbe\u5907"})]})]})]}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"media \u5c5e\u6027"}),(0,i.jsx)(e.th,{children:"\u8bf4\u660e"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201ctype\u201d"}),(0,i.jsxs)(e.td,{children:["\u5b57\u7b26\u4e32\uff0c\u53d6\u503c\u53ef\u53c2\u8003 ",(0,i.jsx)(e.a,{href:"#ref-to-media-type-table",children:"\u5b58\u50a8\u8bbe\u5907\u7c7b\u578b"})]})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201cdevice_id\u201d"}),(0,i.jsx)(e.td,{children:"\u6574\u6570\uff0c\u8981\u70e7\u5f55\u7684\u5b58\u50a8\u8bbe\u5907\u5728 U-Boot \u4e2d\u7684\u7d22\u5f15\u3002"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201carray_organization\u201d"}),(0,i.jsx)(e.td,{children:"\u5bf9\u8c61\uff0c\u5f53\u5b58\u50a8\u8bbe\u5907\u4e3a \u201cspi-nand\u201d \u65f6\u4f7f\u7528\uff0c\u63cf\u8ff0\u5b58\u50a8\u5355\u5143\u7684\u6392\u5217\u7ed3\u6784"})]})]})]}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"array_organization \u5c5e\u6027"}),(0,i.jsx)(e.th,{children:"\u8bf4\u660e"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201cpage\u201d"}),(0,i.jsx)(e.td,{children:"\u5f53\u524d SPI NAND \u7684 Page \u5927\u5c0f\uff0c\u53d6\u503c \u201c2K\u201d, \u201c4K\u201d,"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201cblock\u201d"}),(0,i.jsx)(e.td,{children:"\u5f53\u524d SPI NAND \u7684 Block \u5927\u5c0f, \u53d6\u503c \u201c128K\u201d, \u201c256K\u201d"})]})]})]}),"\n",(0,i.jsx)(e.h4,{id:"26322-updater-\u6570\u636e\u63cf\u8ff0",children:"2.6.3.2.2. Updater \u6570\u636e\u63cf\u8ff0"}),"\n",(0,i.jsx)(e.p,{children:"Updater \u662f\u6307\u8fdb\u884c USB \u5237\u673a\u6216\u8005\u8fdb\u884c SD \u5361\u5237\u673a\u65f6\u9700\u8981\u8fd0\u884c\u7684\u5237\u673a\u7a0b\u5e8f\uff0c\u8be5\u7a0b\u5e8f\u901a\u5e38\u7531 SPL/U-Boot \u5b9e\u73b0\uff0c \u53ef\u80fd\u4e0e\u6b63\u5e38\u542f\u52a8\u65f6\u6240\u8fd0\u884c\u7684 SPL/U-Boot \u76f8\u540c\uff0c\u4e5f\u53ef\u80fd\u4e0d\u540c\uff0c\u56e0\u6b64\u9700\u8981\u5355\u72ec\u5217\u51fa\u3002"}),"\n",(0,i.jsxs)(e.p,{children:["\u201cupdater\u201d \u5bf9\u8c61\u63cf\u8ff0\u5728\u5237\u673a\u8fc7\u7a0b\u4e2d\u9700\u8981\u4f7f\u7528\u5230\u7684\u7ec4\u4ef6\u6570\u636e\uff0c\u5176\u5305\u542b\u591a\u4e2a\u5b50\u5bf9\u8c61\uff0c\u6bcf\u4e2a\u5b50\u5bf9\u8c61\u5373\u4e3a\u4e00\u4e2a ",(0,i.jsx)(e.code,{children:"\u7ec4\u4ef6"})," \u3002 \u5176\u4e2d\u4e0b\u5217\u7684 ",(0,i.jsx)(e.code,{children:"\u7ec4\u4ef6"})," \u662f\u5df2\u77e5\u4e14\u5fc5\u8981\u7684\u3002"]}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"\u7ec4\u4ef6\u540d\u79f0"}),(0,i.jsx)(e.th,{children:"\u8bf4\u660e"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201cspl\u201d"}),(0,i.jsx)(e.td,{children:"\u7b2c\u4e00\u7ea7\u5f15\u5bfc\u7a0b\u5e8f"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201cenv\u201d"}),(0,i.jsx)(e.td,{children:"\u5237\u673a\u7248 U-Boot \u6240\u9700\u8981\u4f7f\u7528\u7684\u73af\u5883\u53d8\u91cf\u5185\u5bb9"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201cuboot\u201d"}),(0,i.jsx)(e.td,{children:"\u7b2c\u4e8c\u7ea7\u5f15\u5bfc\u7a0b\u5e8f\uff0c\u540c\u65f6\u4e5f\u662f\u5237\u673a\u7a0b\u5e8f"})]})]})]}),"\n",(0,i.jsx)(e.p,{children:"\u4e0a\u8ff0\u7684\u7ec4\u4ef6\u540d\u5b57\u5e76\u975e\u56fa\u5b9a\uff0c\u53ef\u6839\u636e\u9879\u76ee\u7684\u9700\u8981\u4fee\u6539\u3001\u589e\u52a0\u6216\u8005\u5220\u9664\u3002"}),"\n",(0,i.jsxs)(e.p,{children:["Updater \u4e2d\u7684 ",(0,i.jsx)(e.code,{children:"\u7ec4\u4ef6"})," \u5bf9\u8c61\u90fd\u6709\u4ee5\u4e0b\u7684\u914d\u7f6e\u5b57\u6bb5\uff1a"]}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"Updater \u7ec4\u4ef6\u5c5e\u6027"}),(0,i.jsx)(e.th,{children:"\u8bf4\u660e"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201cfile\u201d"}),(0,i.jsx)(e.td,{children:"\u6307\u5b9a\u8be5\u7ec4\u4ef6\u7684\u6570\u636e\u6765\u6e90\u6587\u4ef6"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201cram\u201d"}),(0,i.jsx)(e.td,{children:"USB \u5237\u673a\u65f6\uff0c\u6307\u5b9a\u8be5\u6587\u4ef6\u4e0b\u8f7d\u7684\u5185\u5b58\u5730\u5740"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"\u201cattr\u201d"}),(0,i.jsx)(e.td,{children:"\u8be5\u6570\u636e\u5bf9\u8c61\u7684\u5c5e\u6027\uff0c\u53ef\u9009\u7684\u5185\u5bb9\u6709:- \u201crequired\u201d : \u8be5\u6570\u636e\u662f\u5fc5\u9700\u7684\uff0c\u5982\u679c\u6307\u5b9a\u6587\u4ef6\u4e0d\u5b58\u5728\uff0c\u5219\u751f\u6210\u955c\u50cf\u6587\u4ef6\u51fa\u9519\u3002- \u201coptional\u201d : \u8be5\u6570\u636e\u4e0d\u662f\u5fc5\u9700\u7684\uff0c\u5982\u679c\u6307\u5b9a\u6587\u4ef6\u4e0d\u5b58\u5728\uff0c\u5219\u5728\u751f\u6210\u955c\u50cf\u6587\u4ef6\u65f6\u5ffd\u7565\u8be5\u6570\u636e\u5bf9\u8c61\u3002- \u201crun\u201d : \u8be5\u6570\u636e\u662f\u53ef\u6267\u884c\u6587\u4ef6\uff0cUSB \u5347\u7ea7\u65f6\uff0c\u8be5\u6570\u636e\u4e0b\u8f7d\u5b8c\u6210\u4e4b\u540e\u4f1a\u88ab\u6267\u884c\u3002"})]})]})]}),"\n",(0,i.jsx)(e.p,{children:"\u91cd\u8981"}),"\n",(0,i.jsxs)(e.p,{children:["\u201cupdater\u201d \u4e2d ",(0,i.jsx)(e.code,{children:"\u7ec4\u4ef6"})," \u5bf9\u8c61\u7684\u987a\u5e8f\u5f88\u91cd\u8981\u3002"]}),"\n",(0,i.jsx)(e.p,{children:"\u5728 USB \u5347\u7ea7\u7684\u8fc7\u7a0b\u4e2d\uff0c\u7ec4\u4ef6\u6570\u636e\u4f20\u8f93\u548c\u6267\u884c\u7684\u987a\u5e8f\u5373\u4e3a \u201cupdater\u201d \u4e2d\u7ec4\u4ef6\u6570\u636e\u51fa\u73b0\u7684\u987a\u5e8f\uff0c \u56e0\u6b64\u5982\u679c\u7ec4\u4ef6\u6570\u636e\u4e4b\u95f4\u6709\u987a\u5e8f\u4f9d\u8d56\u5173\u7cfb\uff0c\u9700\u8981\u6309\u7167\u6b63\u786e\u7684\u987a\u5e8f\u6392\u5e03\u3002"}),"\n",(0,i.jsx)(e.h4,{id:"26323-target-\u6570\u636e\u63cf\u8ff0",children:"2.6.3.2.3. Target \u6570\u636e\u63cf\u8ff0"}),"\n",(0,i.jsxs)(e.p,{children:["\u201ctarget\u201d \u63cf\u8ff0\u8981\u70e7\u5f55\u5230\u8bbe\u5907\u5b58\u50a8\u4ecb\u8d28\u4e0a\u7684 ",(0,i.jsx)(e.code,{children:"\u7ec4\u4ef6"})," \u3002\u4e0e \u201cupdater\u201d \u4e2d\u7684\u7ec4\u4ef6\u4e00\u6837\uff0c\u201dtarget\u201d \u4e2d\u51fa\u73b0\u7684\u7ec4\u4ef6\u6839\u636e\u5b9e\u9645\u9700\u8981\u8fdb\u884c\u6dfb\u52a0\uff0c\u7ec4\u4ef6\u7684\u540d\u5b57\u4e5f\u53ef\u81ea\u884c\u5b9a\u4e49\u3002"]}),"\n",(0,i.jsx)(e.p,{children:"\u201ctarget\u201d \u4e2d\u7684\u7ec4\u4ef6\uff0c\u90fd\u6709\u4e0b\u9762\u7684\u914d\u7f6e\u5b57\u6bb5\uff1a"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"| Target \u7ec4\u4ef6\u5c5e\u6027 | \u8bf4\u660e                                                         |\n| --------------- | ------------------------------------------------------------ |\n| \u201cfile\u201d          | \u6307\u5b9a\u8be5\u7ec4\u4ef6\u7684\u6570\u636e\u6765\u6e90\u6587\u4ef6                                     |\n| \u201cpart\u201d          | \u6307\u5b9a\u8be5\u7ec4\u4ef6\u88ab\u70e7\u5f55\u7684\u5206\u533a\u5206\u533a\u540d\u5b57\u901a\u8fc7\u5b57\u7b26\u4e32\u6570\u7ec4\u7684\u5f62\u5f0f\u63d0\u4f9b\uff0c\u5982\u679c\u4e00\u4e2a\u7ec4\u4ef6\u88ab\u70e7\u5f55\u5230\u591a\u4e2a\u5206\u533a\uff0c\u5219\u5728\u6570\u7ec4\u4e2d\u63d0\u4f9b\u591a\u4e2a\u5206\u533a\u7684\u540d\u5b57\uff0c\u5982 [\u201cuboot1\u201d, \u201cuboot2\u201d]\u3002\u5bf9\u4e8e UBI \u7684\u5377\uff0c\u4f7f\u7528 \u201c<MTD Part>:<UBI Volume>\u201d \u7684\u5f62\u5f0f\u63d0\u4f9b\uff0c\u5982 [\u201cubiboot:kernel\u201d]\u3002\u8fd9\u91cc \u201cubiboot\u201d \u662f\u8be5 UBI \u8bbe\u5907\u6240\u5728\u7684 MTD \u5206\u533a\u540d\u5b57\uff0c\u201dkernel\u201d \u662f\u8be5 UBI \u8bbe\u5907\u4e2d\u7684 Volume \u540d\u5b57\u3002 |\n| \u201cattr\u201d          | \u8be5\u6570\u636e\u5bf9\u8c61\u7684\u5c5e\u6027\uff0c\u53ef\u9009\u7684\u5185\u5bb9\u6709:- \u201crequired\u201d : \u8be5\u7ec4\u4ef6\u6570\u636e\u662f\u5fc5\u9700\u7684\uff0c\u5982\u679c\u6307\u5b9a\u6587\u4ef6\u4e0d\u5b58\u5728\uff0c\u5219\u751f\u6210\u955c\u50cf\u6587\u4ef6\u51fa\u9519\u3002- \u201coptional\u201d : \u8be5\u7ec4\u4ef6\u6570\u636e\u4e0d\u662f\u5fc5\u9700\u7684\uff0c\u5982\u679c\u6307\u5b9a\u6587\u4ef6\u4e0d\u5b58\u5728\uff0c\u5219\u5728\u751f\u6210\u955c\u50cf\u6587\u4ef6\u65f6\u5ffd\u7565\u8be5\u6570\u636e\u5bf9\u8c61\u3002- \u201cburn\u201d : \u8be5\u7ec4\u4ef6\u6570\u636e\u662f\u9700\u8981\u70e7\u5f55\u5230\u6307\u5b9a\u5206\u533a\u5f53\u4e2d\u3002- \u201cmtd\u201d : \u8868\u793a\u8be5\u7ec4\u4ef6\u8981\u70e7\u5f55\u7684\u8bbe\u5907\u662f MTD \u8bbe\u5907\u3002- \u201cubi\u201d : \u8868\u793a\u8be5\u7ec4\u4ef6\u8981\u70e7\u5f55\u7684\u8bbe\u5907\u662f UBI \u8bbe\u5907\u3002- \u201cblock\u201d : \u8868\u793a\u8be5\u7ec4\u4ef6\u8981\u70e7\u5f55\u7684\u8bbe\u5907\u662f\u5757\u8bbe\u5907\u3002 |\n"})}),"\n",(0,i.jsx)(e.p,{children:"\u91cd\u8981"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"> \u201ctarget\u201d \u4e2d\u7ec4\u4ef6\u5bf9\u8c61\u7684\u987a\u5e8f\n"})}),"\n",(0,i.jsx)(e.p,{children:"\u5728 USB \u5347\u7ea7\u7684\u8fc7\u7a0b\u4e2d\uff0c\u7ec4\u4ef6\u6570\u636e\u4f20\u8f93\u548c\u70e7\u5f55\u7684\u987a\u5e8f\u5373\u4e3a \u201ctarget\u201d \u4e2d\u7ec4\u4ef6\u6570\u636e\u51fa\u73b0\u7684\u987a\u5e8f\u3002"}),"\n",(0,i.jsx)(e.h3,{id:"2633-\u4e2d\u95f4\u6587\u4ef6\u63cf\u8ff0",children:"2.6.3.3. \u4e2d\u95f4\u6587\u4ef6\u63cf\u8ff0"}),"\n",(0,i.jsx)(e.p,{children:"\u201ctemporary\u201d \u63cf\u8ff0\u7684\u662f\u955c\u50cf\u6587\u4ef6\u751f\u6210\u8fc7\u7a0b\u4e2d\u9700\u8981\u751f\u6210\u7684\u4e2d\u95f4\u6587\u4ef6\u3002\u901a\u8fc7\u63cf\u8ff0\u6570\u636e\u5bf9\u8c61\u7684\u65b9\u5f0f\uff0c \u63cf\u8ff0\u4e0d\u540c\u7c7b\u578b\u7684\u4e2d\u95f4\u6587\u4ef6\u7684\u751f\u6210\u8fc7\u7a0b\uff0c\u53ef\u7528\u4e8e\u5bf9\u7ec4\u4ef6\u7684\u7b7e\u540d\u3001\u52a0\u5bc6\u3001\u518d\u6b21\u6253\u5305\u7b49\u5904\u7406\u3002"}),"\n",(0,i.jsx)(e.p,{children:"\u5f53\u524d\u652f\u6301\u4e0b\u5217\u4e24\u79cd\u4e0d\u540c\u7684\u6570\u636e\u5904\u7406\uff1a"}),"\n",(0,i.jsxs)(e.blockquote,{children:["\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"\u201caicboot\u201d"}),"\n",(0,i.jsx)(e.p,{children:"\u63cf\u8ff0 AIC \u542f\u52a8\u955c\u50cf\u7684\u751f\u6210"}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"\u201citb\u201d"}),"\n",(0,i.jsx)(e.p,{children:"\u63cf\u8ff0 FIT Image \u7684\u6253\u5305"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:"AIC \u542f\u52a8\u955c\u50cf"})}),"\n",(0,i.jsx)(e.p,{children:"AIC \u542f\u52a8\u955c\u50cf\u662f BROM \u89e3\u6790\u548c\u6267\u884c\u7684\u542f\u52a8\u7a0b\u5e8f\u6587\u4ef6\u3002 \u5f53\u9700\u8981\u5728\u6253\u5305\u8fc7\u7a0b\u4e2d\u751f\u6210\u4e00\u4e2a\u4e2d\u95f4\u7684 AIC \u542f\u52a8\u955c\u50cf\u6587\u4ef6\u65f6\uff0c\u9700\u8981\u5728 \u201caicboot\u201d \u5bf9\u8c61\u4e2d\u6dfb\u52a0\u4e00\u4e2a\u5b50\u5bf9\u8c61\uff0c \u5176\u5bf9\u8c61\u540d\u5b57\u5373\u4e3a\u751f\u6210\u7684\u6587\u4ef6\u540d\u5b57\uff0c\u53ef\u914d\u7f6e\u7684\u5185\u5bb9\u5982\u4e0b\u9762\u7684\u793a\u4f8b\u6240\u793a\u3002\u6240\u5217\u7684\u5c5e\u6027\u4e2d\uff0c\u53ea\u6709 \u201cloader\u201d \u662f\u5fc5\u9700\u7684\uff0c \u5176\u4ed6\u7684\u53ef\u6839\u636e\u9879\u76ee\u9700\u8981\u8fdb\u884c\u5220\u51cf\u3002"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'"aicboot": {\n   "u-boot-spl.aic": {\n        "head_ver": "0x00010000",\n        "anti-rollback counter": 1,\n        "loader": {\n            "file": "u-boot-spl.bin",\n            "load address": "0x103100",\n            "entry point": "0x103100",\n        },\n        "resource": {\n            "private": "private.bin",\n            "pubkey": "rsa_pub_key.der",\n            "pbp": "d211.pbp",\n        },\n        "encryption": {\n            "algo": "aes-128-cbc",\n            "key": "aes-128-cbc-key.bin",\n            "iv": "aes-128-cbc-iv.bin",\n        },\n        "signature": {\n            "algo": "rsa,2048",\n            "privkey": "rsa-2048-private.der",\n        },\n   },\n}\n'})}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:"FIT Image"})}),"\n",(0,i.jsxs)(e.p,{children:["FIT Image \u662f U-Boot \u4e2d\u5e38\u7528\u7684\u6570\u636e\u6253\u5305\u65b9\u5f0f\uff0c\u7528\u4e8e\u5c06\u4e00\u4e9b\u76f8\u5173\u7684\u542f\u52a8\u6570\u636e\u6253\u5305\u5728\u4e00\u8d77\uff0c \u4f7f\u7528 ",(0,i.jsx)(e.code,{children:".its"})," \u6587\u4ef6\u63cf\u8ff0\u6253\u5305\u8fc7\u7a0b\u3002"]}),"\n",(0,i.jsxs)(e.p,{children:["\u5982\u679c\u751f\u6210\u70e7\u5f55\u955c\u50cf\u6587\u4ef6\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6709\u4e9b\u6570\u636e\u9700\u8981\u6253\u5305\u7ec4\u5408\u4e3a\u4e00\u4e2a FIT Image \u6587\u4ef6\uff0c\u5219\u53ef\u4ee5\u5728 \u201citb\u201d \u5bf9\u8c61\u4e2d\u6dfb\u52a0\u4e00\u4e2a\u5b50\u5bf9\u8c61\uff0c\u5176\u5bf9\u8c61\u540d\u5b57\u5373\u4e3a\u751f\u6210\u7684\u6587\u4ef6\u540d\u5b57\uff0c\u53ef\u914d\u7f6e\u7684\u5185\u5bb9\u4f4d\u63cf\u8ff0\u8be5\u6253\u5305 \u8fc7\u7a0b\u7684 ",(0,i.jsx)(e.code,{children:".its"})," \u6587\u4ef6\u3002"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'"itb": {\n    "u-boot.itb": {\n            "its": "u-boot.its"\n    },\n},\n'})}),"\n",(0,i.jsx)(e.p,{children:"\u70e7\u5f55\u955c\u50cf\u6587\u4ef6\u751f\u6210\u8fc7\u7a0b\u4e2d\uff0c\u4f1a\u8c03\u7528\u76f8\u5e94\u7684 mkimage \u5de5\u5177\u751f\u6210 itb \u6587\u4ef6\u3002"})]})}function o(n={}){const{wrapper:e}={...(0,d.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(a,{...n})}):a(n)}},1151:(n,e,r)=>{r.d(e,{Z:()=>l,a:()=>t});var i=r(7294);const d={},s=i.createContext(d);function t(n){const e=i.useContext(s);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(d):n.components||d:t(n.components),i.createElement(s.Provider,{value:e},n.children)}}}]);