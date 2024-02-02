"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6954],{9035:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>a,contentTitle:()=>d,default:()=>p,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var t=i(5893),s=i(1151);const r={sidebar_position:2},d="\u66f4\u65b0\u7cfb\u7edf",o={id:"D213-DevKit/part1/FlashSystem",title:"\u66f4\u65b0\u7cfb\u7edf",description:"\u70e7\u5199\u56fa\u4ef6\u81f3SPI nand",source:"@site/docs/D213-DevKit/part1/02_FlashSystem.md",sourceDirName:"D213-DevKit/part1",slug:"/D213-DevKit/part1/FlashSystem",permalink:"/en/docs/D213-DevKit/part1/FlashSystem",draft:!1,unlisted:!1,editUrl:"https://github.com/100askTeam/ArtInChip-Docs/tree/master/docs/D213-DevKit/part1/02_FlashSystem.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"d213dkSidebar",previous:{title:"\u542f\u52a8\u5f00\u53d1\u677f",permalink:"/en/docs/D213-DevKit/part1/QuickStart"},next:{title:"\u5e38\u89c1\u95ee\u9898",permalink:"/en/docs/D213-DevKit/part1/03-2_SomeQustion"}},a={},c=[{value:"\u70e7\u5199\u56fa\u4ef6\u81f3SPI nand",id:"\u70e7\u5199\u56fa\u4ef6\u81f3spi-nand",level:2},{value:"\u51c6\u5907\u5de5\u4f5c",id:"\u51c6\u5907\u5de5\u4f5c",level:3},{value:"\u8fde\u63a5\u5f00\u53d1\u677f",id:"\u8fde\u63a5\u5f00\u53d1\u677f",level:3},{value:"\u8fd0\u884cAiBrun\u8f6f\u4ef6\u8fdb\u884c\u70e7\u5f55",id:"\u8fd0\u884caibrun\u8f6f\u4ef6\u8fdb\u884c\u70e7\u5f55",level:2},{value:"\u4f7f\u7528\u70e7\u5f55\u6309\u952e\u8fdb\u884c\u70e7\u5f55",id:"\u4f7f\u7528\u70e7\u5f55\u6309\u952e\u8fdb\u884c\u70e7\u5f55",level:3},{value:"\u8fdb\u5165Uboot\u8fdb\u884c\u70e7\u5f55",id:"\u8fdb\u5165uboot\u8fdb\u884c\u70e7\u5f55",level:3},{value:"\u8fdb\u5165Linux\u8fdb\u884c\u70e7\u5f55",id:"\u8fdb\u5165linux\u8fdb\u884c\u70e7\u5f55",level:3},{value:"\u542f\u52a8\u7cfb\u7edf",id:"\u542f\u52a8\u7cfb\u7edf",level:2}];function l(n){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h1,{id:"\u66f4\u65b0\u7cfb\u7edf",children:"\u66f4\u65b0\u7cfb\u7edf"}),"\n",(0,t.jsx)(e.h2,{id:"\u70e7\u5199\u56fa\u4ef6\u81f3spi-nand",children:"\u70e7\u5199\u56fa\u4ef6\u81f3SPI nand"}),"\n",(0,t.jsx)(e.h3,{id:"\u51c6\u5907\u5de5\u4f5c",children:"\u51c6\u5907\u5de5\u4f5c"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u786c\u4ef6\uff1aD213-DevKit\u5f00\u53d1\u677f"}),"\n",(0,t.jsx)(e.li,{children:"\u786c\u4ef6\uff1aTypeC\u7ebf X2"}),"\n",(0,t.jsx)(e.li,{children:"\u786c\u4ef6\uff1a12V\u7535\u6e90\u9002\u914d\u5668"}),"\n",(0,t.jsxs)(e.li,{children:["\u8f6f\u4ef6\uff1a\u5320\u82af\u521b \u5355\u673a\u8c03\u8bd5\u5237\u673a\u5de5\u5177\uff1a ",(0,t.jsx)(e.a,{href:"https://gitee.com/artinchip/tools/raw/master/AiBurn-1.3.6_Setup_2023-12-22.zip",children:"AiBrun"})]}),"\n",(0,t.jsxs)(e.li,{children:["\u8f6f\u4ef6\uff1aSPI Nand\u7cfb\u7edf\u955c\u50cf\uff1a",(0,t.jsx)(e.code,{children:"d211_d213_devkitf_page_2k_block_128k_v1.0.0.img"})]}),"\n"]}),"\n",(0,t.jsx)(e.h3,{id:"\u8fde\u63a5\u5f00\u53d1\u677f",children:"\u8fde\u63a5\u5f00\u53d1\u677f"}),"\n",(0,t.jsx)(e.p,{children:"\u53c2\u8003\u4e0b\u56fe\u6240\u793a"}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201105559581.png",alt:"image-20240201105559581"})}),"\n",(0,t.jsxs)(e.p,{children:["\u5c06\u4e24\u4e2aTypeC\u7ebf\u5206\u522b\u8fde\u81f3DongshanPI-D1s\u5f00\u53d1\u677f ",(0,t.jsx)(e.code,{children:"OTG\u70e7\u5f55\u63a5\u53e3 "}),"\u548c",(0,t.jsx)(e.code,{children:" USB\u4e32\u53e3\u63a5\u53e3"})," Typec\u7ebf\u53e6\u4e00\u7aef \u8fde\u63a5\u81f3 \u7535\u8111USB\u63a5\u53e3\uff0c\u8fde\u63a5\u6210\u529f\u540e\uff0c\u5c06\u7535\u6e90\u8fde\u63a5\u81f3\u7535\u6e90\u63a5\u53e3\u5e76\u5c06\u7535\u6e90\u5f00\u5173\u62e8\u5411\u7535\u6e90\u63a5\u53e3\u7aef\u3002"]}),"\n",(0,t.jsxs)(e.p,{children:["\u53ef\u4ee5\u5148\u83b7\u53d6\u8f6f\u4ef6 ",(0,t.jsx)(e.code,{children:"\u5320\u82af\u521b \u5355\u673a\u8c03\u8bd5\u5237\u673a\u5de5\u5177AIbrun"})," ",(0,t.jsx)(e.code,{children:"SPI Nand\u7cfb\u7edf\u955c\u50cf"})," \u8fdb\u884c\u89e3\u538b\u7f29\u64cd\u4f5c\uff0c\u5e76\u5b89\u88c5\u70e7\u5f55\u8f6f\u4ef6Aibrun\u3002"]}),"\n",(0,t.jsx)(e.h2,{id:"\u8fd0\u884caibrun\u8f6f\u4ef6\u8fdb\u884c\u70e7\u5f55",children:"\u8fd0\u884cAiBrun\u8f6f\u4ef6\u8fdb\u884c\u70e7\u5f55"}),"\n",(0,t.jsx)(e.p,{children:"AiBrun\u7684\u4f7f\u7528\u975e\u5e38\u7b80\u5355\uff0c\u9009\u62e9\u7f16\u8bd1\u597d\u7684\u955c\u50cf\uff0c\u5728\u5f00\u53d1\u677f\u8fdb\u5165\u70e7\u5199\u6a21\u5f0f\u540e\u70b9\u51fb\u201c\u5f00\u59cb\u201d\u6309\u94ae\u5373\u53ef\u81ea\u52a8\u8fdb\u884c\u70e7\u5199\uff0c\u8fdb\u5165\u70e7\u5199\u6a21\u5f0f\u6709\u5982\u4e0b\u51e0\u79cd\u65b9\u5f0f\uff1a"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u7ec8\u7aef\u8bbe\u5907\u4e3a\u7a7a\u7247\uff0c\u5219\u4e0a\u7535\u76f4\u63a5\u8fdb\u5165 USB \u70e7\u5199\u6a21\u5f0f"}),"\n",(0,t.jsx)(e.li,{children:"\u6309\u4f4f\u201c\u70e7\u5f55\u952e\u201d\u542f\u52a8\uff08\u4e0a\u7535\u6216\u8005\u6309\u201c\u91cd\u542f\u952e\u201d\uff09\u53ef\u76f4\u63a5\u8fdb\u5165\u70e7\u5f55\u6a21\u5f0f"}),"\n",(0,t.jsx)(e.li,{children:"\u7ec8\u7aef\u8bbe\u5907\u975e\u7a7a\u7247\uff0c\u5982\u679c\u80fd\u8fdb\u5165 U-Boot \uff0c\u5219 \u5728U-Boot \u4e2d\u53ef\u4ee5\u4f7f\u7528 aicupg usb 0 \u547d\u4ee4\u8fdb\u5165\u70e7\u5199\u6a21\u5f0f"}),"\n",(0,t.jsx)(e.li,{children:"\u7ec8\u7aef\u8bbe\u5907\u975e\u7a7a\u7247\uff0c\u5982\u679c\u80fd\u8fdb\u5165 Linux\uff0c\u5219\u6267\u884c\u547d\u4ee4 aicupg \uff0c\u7cfb\u7edf\u76f4\u63a5\u91cd\u542f\u8fdb\u5165\u70e7\u5199\u6a21\u5f0f"}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201112034116.png",alt:"image-20240201112034116"})}),"\n",(0,t.jsx)(e.h3,{id:"\u4f7f\u7528\u70e7\u5f55\u6309\u952e\u8fdb\u884c\u70e7\u5f55",children:"\u4f7f\u7528\u70e7\u5f55\u6309\u952e\u8fdb\u884c\u70e7\u5f55"}),"\n",(0,t.jsx)(e.p,{children:"\u4e0a\u7535\u524d\u6309\u4f4f\u7cfb\u7edf\u70e7\u5f55(uboot)\u952e\uff0c\u542f\u52a8\u540e\u5373\u53ef\u8fdb\u5165\u70e7\u5f55\u6a21\u5f0f\u3002\u7cfb\u7edf\u70e7\u5f55\u952e\u5982\u4e0b\u56fe\u6240\u793a\uff1a"}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201112819008.png",alt:"image-20240201112819008"})}),"\n",(0,t.jsxs)(e.p,{children:["\u8fdb\u5165\u70e7\u5f55\u6a21\u5f0f\u540e\uff0c\u53ef\u4ee5\u770b\u5230AIBurn\u8f6f\u4ef6\u4e2d\u53ef\u4ee5\u8bc6\u522b\u5230\u8bbe\u5907\u578b\u53f7\uff0c\u9009\u62e9D213\u5bf9\u5e94\u7684\u955c\u50cf\u8def\u5f84\uff0c\u5e76\u70b9\u51fb",(0,t.jsx)(e.strong,{children:"\u5f00\u59cb"}),"\u540e\u4f1a\u81ea\u52a8\u5f00\u59cb\u70e7\u5f55\u3002"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201113259860.png",alt:"image-20240201113259860"})}),"\n",(0,t.jsx)(e.p,{children:"\u70e7\u5165\u5b8c\u6210\u4f1aAiBurn\u8f6f\u4ef6\u4e2d\u63d0\u793a\u70e7\u5f55\u6210\u529f\uff0c\u5982\u4e0b\u6240\u793a\uff1a"}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201113549945.png",alt:"image-20240201113549945"})}),"\n",(0,t.jsx)(e.h3,{id:"\u8fdb\u5165uboot\u8fdb\u884c\u70e7\u5f55",children:"\u8fdb\u5165Uboot\u8fdb\u884c\u70e7\u5f55"}),"\n",(0,t.jsxs)(e.p,{children:["\u200b\t\u5f00\u53d1\u677f\u4e0a\u7535\u542f\u52a8\u540e\uff0c\u8fdb\u5165\u4e32\u53e3\u7ec8\u7aef\uff0c\u786e\u4fdd\u4e32\u53e3\u53ef\u4ee5\u8f93\u5165\u6570\u636e\u540e\u3002\u6309\u4e0b\u5f00\u53d1\u677f\u7684reset\u952e\u540e\uff0c\u5728\u7ec8\u7aef\u8f93\u5165\u754c\u9762\u6309\u4e0b",(0,t.jsx)(e.code,{children:"Crtl+C"}),"\u952e\uff0c\u8fdb\u5165Uboot\u547d\u4ee4\u884c\uff0c\u5982\u4e0b\u6240\u793a\uff1a"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201114418462.png",alt:"image-20240201114418462"})}),"\n",(0,t.jsxs)(e.p,{children:["\u200b\t\u5728Uboot\u547d\u4ee4\u884c\u4e2d\u8f93\u5165",(0,t.jsx)(e.code,{children:"aicupg usb 0"})," \u547d\u4ee4\u8fdb\u5165\u70e7\u5199\u6a21\u5f0f\u3002\u8fdb\u5165\u70e7\u5f55\u6a21\u5f0f\u540e\u53ef\u4ee5\u5728AiBurn\u4e2d\u770b\u5230\u8bc6\u522b\u5230\u7684\u8bbe\u5907\u3002"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201114538095.png",alt:"image-20240201114538095"})}),"\n",(0,t.jsxs)(e.p,{children:["\u9009\u62e9D213\u5bf9\u5e94\u7684\u955c\u50cf\u8def\u5f84\uff0c\u5e76\u70b9\u51fb",(0,t.jsx)(e.strong,{children:"\u5f00\u59cb"}),"\u540e\u4f1a\u81ea\u52a8\u5f00\u59cb\u70e7\u5f55\u3002"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201113259860.png",alt:"image-20240201113259860"})}),"\n",(0,t.jsx)(e.h3,{id:"\u8fdb\u5165linux\u8fdb\u884c\u70e7\u5f55",children:"\u8fdb\u5165Linux\u8fdb\u884c\u70e7\u5f55"}),"\n",(0,t.jsxs)(e.p,{children:["\u200b\t\u5f00\u53d1\u677f\u4e0a\u7535\u542f\u52a8\u540e\uff0c\u8fdb\u5165\u4e32\u53e3\u7ec8\u7aef\uff0c\u786e\u4fdd\u4e32\u53e3\u53ef\u4ee5\u8f93\u5165\u6570\u636e\u540e\u3002\u7b49\u5f85\u7cfb\u7edf\u7cfb\u7edf\u5b8c\u6210\u8fdb\u5165Linux\u547d\u4ee4\u884c\uff0c\u7cfb\u7edf\u542f\u52a8\u5b8c\u6210\u540e\u518d\u547d\u4ee4\u884c\u4e2d\u8f93\u5165 ",(0,t.jsx)(e.code,{children:"aicupg"})," \uff0c\u7cfb\u7edf\u76f4\u63a5\u91cd\u542f\u8fdb\u5165\u70e7\u5199\u6a21\u5f0f,\u8fdb\u5165\u70e7\u5f55\u6a21\u5f0f\u540e\u53ef\u4ee5\u5728AiBurn\u4e2d\u770b\u5230\u8bc6\u522b\u5230\u7684\u8bbe\u5907\u3002"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201115533345.png",alt:"image-20240201115533345"})}),"\n",(0,t.jsxs)(e.p,{children:["\u9009\u62e9D213\u5bf9\u5e94\u7684\u955c\u50cf\u8def\u5f84\uff0c\u5e76\u70b9\u51fb",(0,t.jsx)(e.strong,{children:"\u5f00\u59cb"}),"\u540e\u4f1a\u81ea\u52a8\u5f00\u59cb\u70e7\u5f55\u3002"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201113259860.png",alt:"image-20240201113259860"})}),"\n",(0,t.jsx)(e.h2,{id:"\u542f\u52a8\u7cfb\u7edf",children:"\u542f\u52a8\u7cfb\u7edf"}),"\n",(0,t.jsx)(e.p,{children:"\u4f7f\u7528AiBurn\u70e7\u5f55\u8f6f\u4ef6\u70e7\u5f55\u5b8c\u6210\u540e\uff0c\u5f00\u53d1\u677f\u4f1a\u81ea\u52a8\u91cd\u542f\u8fdb\u5165\u7cfb\u7edf\uff0c\u5982\u4e0b\u6240\u793a\uff1a"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{children:"Pre-Boot Program ... (2023-11-09 20:38:24 248b01c)\nDDR3 128MB\nGoing to init DDR3. freq: 672MHz\nDDR3 initialized\n41135 56727 81487\nPBP done\n\nU-Boot SPL 2021.10 (Jan 27 2024 - 23:44:32 -0500)\n[SPL]: Boot device = 5(BD_SPINAND)\nTrying to boot from SPINAND\nJumping to Linux via RISC-V OpenSBI\n[    1.338775] Timeout during wait phy stop state c\n[    2.646618] debugfs: Directory 'aic-codec-dev' with parent 'aic-SoundCard' already present!\nStartup time: 4.266 sec (from Power-On-Reset)\nStarting test_lvgl: OK\nStarting syslogd: OK\nStarting klogd: OK\nStarting mdev... OK\n[    5.653678] edt_ft5x06 3-0038: touchscreen probe failed\nStarting system message bus: dbus-daemon: dbus-daemon: no version information available (required by dbus-daemon)\ndbus-daemon: dbus-daemon: no version information available (required by dbus-daemon)\ndbus-daemon: dbus-daemon: no version information available (required by dbus-daemon)\ndbus-daemon: dbus-daemon: no version information available (required by dbus-daemon)\ndbus-daemon: relocation error: dbus-daemon: symbol  version  not defined in file  with link time reference\ndone\nALSA: Restoring mixer setting...\nStarting adbd: mkdir: can't create directory '/dev/pts': File exists\nlo        Link encap:Local Loopback\n          inet addr:127.0.0.1  Mask:255.0.0.0\n          UP LOOPBACK RUNNING  MTU:65536  Metric:1\n          RX packets:0 errors:0 dropped:0 overruns:0 frame:0\n          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0\n          collisions:0 txqueuelen:1000\n          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)\n\ninstall_listener('tcp:5037','*smartsocket*')\nOK\nWelcome to ArtInChip Luban Linux\n[aic@] #\n"})})]})}function p(n={}){const{wrapper:e}={...(0,s.a)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(l,{...n})}):l(n)}},1151:(n,e,i)=>{i.d(e,{Z:()=>o,a:()=>d});var t=i(7294);const s={},r=t.createContext(s);function d(n){const e=t.useContext(r);return t.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:d(n.components),t.createElement(r.Provider,{value:e},n.children)}}}]);