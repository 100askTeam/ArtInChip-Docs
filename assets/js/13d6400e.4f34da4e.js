"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2632],{758:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>t,default:()=>a,frontMatter:()=>s,metadata:()=>o,toc:()=>c});var r=i(5893),l=i(1151);const s={sidebar_position:3},t="\u5f00\u53d1\u677f\u652f\u6301WiFi\u529f\u80fd",o={id:"D213-DevKit/part2/SupportUpWiFi",title:"\u5f00\u53d1\u677f\u652f\u6301WiFi\u529f\u80fd",description:"\u5f00\u53d1\u677f\u81ea\u5e26\u7684\u955c\u50cf\u4e2d\u5df2\u7ecf\u9ed8\u8ba4\u652f\u6301\u7684WiFi\u529f\u80fd\uff0c\u4e0b\u9762\u6211\u4eec\u5148\u5bf9\u5f00\u53d1\u677f\u7684WiFi\u529f\u80fd\u8fdb\u884c\u6d4b\u8bd5\u518d\u5bf9WiFi\u529f\u80fd\u5982\u4f55\u9002\u914d\u8fdb\u884c\u8bb2\u89e3\u3002",source:"@site/docs/D213-DevKit/part2/03_SupportUpWiFi.md",sourceDirName:"D213-DevKit/part2",slug:"/D213-DevKit/part2/SupportUpWiFi",permalink:"/docs/D213-DevKit/part2/SupportUpWiFi",draft:!1,unlisted:!1,editUrl:"https://github.com/100askTeam/ArtInChip-Docs/tree/master/docs/D213-DevKit/part2/03_SupportUpWiFi.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"d213dkSidebar",previous:{title:"Luban SDK\u91cd\u8981\u547d\u4ee4",permalink:"/docs/D213-DevKit/part2/CompileImportantCommands"},next:{title:"\u5f00\u53d1\u677f\u652f\u6301\u53cc\u767e\u5146\u7f51\u5361\u529f\u80fd",permalink:"/docs/D213-DevKit/part2/SupportUpDual100LAN"}},d={},c=[{value:"\u5f00\u53d1\u677fWiFi\u529f\u80fd\u6d4b\u8bd5",id:"\u5f00\u53d1\u677fwifi\u529f\u80fd\u6d4b\u8bd5",level:2},{value:"WIFI\u529f\u80fd\u9002\u914d",id:"wifi\u529f\u80fd\u9002\u914d",level:2},{value:"1. \u6dfb\u52a0\u6e90\u7801",id:"1-\u6dfb\u52a0\u6e90\u7801",level:2},{value:"2. Kconfig \u4fee\u6539",id:"2-kconfig-\u4fee\u6539",level:2},{value:"3. \u5185\u6838\u914d\u7f6e",id:"3-\u5185\u6838\u914d\u7f6e",level:2},{value:"3.1. \u65e0\u7ebf\u914d\u7f6e",id:"31-\u65e0\u7ebf\u914d\u7f6e",level:3},{value:"3.2. \u84dd\u7259\u914d\u7f6e",id:"32-\u84dd\u7259\u914d\u7f6e",level:3},{value:"3.3. RFKILL\u914d\u7f6e",id:"33-rfkill\u914d\u7f6e",level:3},{value:"3.4. \u9a71\u52a8\u9009\u62e9",id:"34-\u9a71\u52a8\u9009\u62e9",level:3},{value:"4. DTS\u914d\u7f6e",id:"4-dts\u914d\u7f6e",level:2},{value:"4.1. WIFI",id:"41-wifi",level:3},{value:"4.2. BT",id:"42-bt",level:3},{value:"5. \u6a21\u7ec4\u914d\u7f6e\u6587\u4ef6",id:"5-\u6a21\u7ec4\u914d\u7f6e\u6587\u4ef6",level:2},{value:"5.1. \u84dd\u7259\u56fa\u4ef6\u548c\u4e0b\u8f7d\u5de5\u5177",id:"51-\u84dd\u7259\u56fa\u4ef6\u548c\u4e0b\u8f7d\u5de5\u5177",level:3},{value:"6 \u529f\u80fd\u6d4b\u8bd5\u548c\u8c03\u8bd5",id:"6-\u529f\u80fd\u6d4b\u8bd5\u548c\u8c03\u8bd5",level:2},{value:"61. \u6dfb\u52a0\u76f8\u5173\u5de5\u5177\u5305",id:"61-\u6dfb\u52a0\u76f8\u5173\u5de5\u5177\u5305",level:3},{value:"62. \u6d4b\u8bd5",id:"62-\u6d4b\u8bd5",level:3}];function p(e){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"\u5f00\u53d1\u677f\u652f\u6301wifi\u529f\u80fd",children:"\u5f00\u53d1\u677f\u652f\u6301WiFi\u529f\u80fd"}),"\n",(0,r.jsx)(n.p,{children:"\u5f00\u53d1\u677f\u81ea\u5e26\u7684\u955c\u50cf\u4e2d\u5df2\u7ecf\u9ed8\u8ba4\u652f\u6301\u7684WiFi\u529f\u80fd\uff0c\u4e0b\u9762\u6211\u4eec\u5148\u5bf9\u5f00\u53d1\u677f\u7684WiFi\u529f\u80fd\u8fdb\u884c\u6d4b\u8bd5\u518d\u5bf9WiFi\u529f\u80fd\u5982\u4f55\u9002\u914d\u8fdb\u884c\u8bb2\u89e3\u3002"}),"\n",(0,r.jsx)(n.h2,{id:"\u5f00\u53d1\u677fwifi\u529f\u80fd\u6d4b\u8bd5",children:"\u5f00\u53d1\u677fWiFi\u529f\u80fd\u6d4b\u8bd5"}),"\n",(0,r.jsx)(n.p,{children:"\u200b\t\u5728\u8fdb\u884cWiFi\u529f\u80fd\u6d4b\u8bd5\u524d\uff0c\u9700\u8981\u5148\u5c06\u5929\u7ebf\u5b89\u88c5\u81f3\u5f00\u53d1\u677f\u7684\u5929\u7ebf\u63a5\u53e3\uff0c\u5982\u4e0b\u56fe\u7ea2\u6846\u6240\u793a\u7684\u4f4d\u7f6e\uff1a"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201165149593.png",alt:"image-20240201165149593"})}),"\n",(0,r.jsx)(n.p,{children:"1.\u5b89\u88c5\u5b8c\u6210\u540e\uff0c\u4e0a\u7535\u542f\u52a8\u7cfb\u7edf\uff0c\u8fdb\u5165\u4e32\u53e3\u7ec8\u7aef\uff0c\u67e5\u770bwifi\u8282\u70b9\u662f\u5426\u5b58\u5728\uff0c\u8f93\u5165\uff1a"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"ifconfig -a\n"})}),"\n",(0,r.jsx)(n.p,{children:"\u8f93\u5165\u5b8c\u6210\u540e\u5373\u53ef\u770b\u5230wlan0\u8bbe\u5907\u8282\u70b9\u3002\uff0c\u5982\u4e0b\u56fe\u6240\u793a\uff1a"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201165637634.png",alt:"image-20240201165637634"})}),"\n",(0,r.jsx)(n.p,{children:"2.\u4f7f\u80fdwlan0\u7f51\u7edc\u8bbe\u5907\u8282\u70b9\uff0c\u8f93\u5165\uff1a"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"ifconfig wlan0 up\n"})}),"\n",(0,r.jsxs)(n.p,{children:["\u8f93\u5165\u5b8c\u6210\u540e\uff0c\u5373\u53ef\u901a\u8fc7",(0,r.jsx)(n.code,{children:"ifconfig"}),"\u67e5\u770b\u5230\u4f7f\u80fd\u540e\u7684\u7f51\u7edc\u8bbe\u5907\u8282\u70b9\uff0c\u5982\u4e0b\u56fe\u6240\u793a\uff1a"]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/image-20240201165823487.png",alt:"image-20240201165823487"})}),"\n",(0,r.jsx)(n.p,{children:"3.\u626b\u63cfwifi\u8bbe\u5907\uff0c\u8f93\u5165\uff1a"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:" iwlist wlan0 scan\n"})}),"\n",(0,r.jsx)(n.p,{children:"\u626b\u63cf\u540e\u4f1a\u8f93\u51fa\u626b\u63cf\u5230\u7684\u6240\u4ee5wifi\u8bbe\u5907\u3002"}),"\n",(0,r.jsx)(n.h2,{id:"wifi\u529f\u80fd\u9002\u914d",children:"WIFI\u529f\u80fd\u9002\u914d"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"\u6ce8\u610f\uff1a\u4ee5\u4e0b\u64cd\u4f5c\u5df2\u7ecf\u5728D213-DevKitF\u677f\u7ea7\u8865\u4e01\u5305\u4e2d\u5b9e\u73b0\uff0c\u4e0b\u9762\u4ec5\u6f14\u793a\u914d\u7f6e\u8fc7\u7a0b\u3002"}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["RealTek\uff08\u745e\u6631\uff09\u7cfb\u5217\u7684 SDIO ",(0,r.jsx)(n.strong,{children:"WiFi"})," \u8bbe\u5907\u7684\u9a71\u52a8\u90fd\u5f00\u53d1\u7684\u76f8\u5bf9\u6bd4\u8f83\u6807\u51c6\uff0c\u79fb\u690d\u7684\u96be\u5ea6\u90fd\u6bd4\u8f83\u4f4e"]}),"\n",(0,r.jsx)(n.h2,{id:"1-\u6dfb\u52a0\u6e90\u7801",children:"1. \u6dfb\u52a0\u6e90\u7801"}),"\n",(0,r.jsx)(n.p,{children:"Luban \u7684 Kernel \u7248\u672c\u4e3a 5.10\uff0c \u5efa\u8bae\u5c3d\u91cf\u83b7\u53d6\u5b98\u65b9\u7684\u6bd4\u8f83\u65b0\u7684\u9a71\u52a8\uff08 >= 5.10)."}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u5728 source/linux-5.10/drivers/net/wireless/realtek \u4e2d\u521b\u5efa rrtl8188fu \u76ee\u5f55\uff0c\u5e76\u590d\u5236 rtl8188fu \u7684\u9a71\u52a8\u6e90\u7801"}),"\n",(0,r.jsx)(n.li,{children:"\u5728 source/linux-5.10/drivers/net/wireless/realtek/Kconfig \u4e2d\u6dfb\u52a0\u5bf9 rtl8188fu \u6a21\u5757\u7684\u7d22\u5f15\uff1a"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'source "drivers/net/wireless/realtek/rtl8188fu/Kconfig"\n'})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u5728 source/linux-5.10/drivers/net/wireless/realtek/Makefile \u4e2d\u6dfb\u52a0\u5bf9 rtl8188fu \u6a21\u5757\u7684\u7d22\u5f15\uff1a"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"obj-$(CONFIG_RTL8188FU)         += rtl8188fu/\n"})}),"\n",(0,r.jsx)(n.h2,{id:"2-kconfig-\u4fee\u6539",children:"2. Kconfig \u4fee\u6539"}),"\n",(0,r.jsx)(n.p,{children:"\u57fa\u4e8e\u7248\u672c\u7684\u5dee\u5f02\uff0cLuban \u5bf9 Kconfig \u4e2d help \u7684\u5b57\u6bb5\u89e3\u6790\u53ef\u80fd\u548c\u9a71\u52a8\u539f\u751f\u7684\u683c\u5f0f\u6709\u5dee\u5f02\uff0c \u5728drivers/net/wireless/realtek/rtl8821/Kconfig\u4e2d\u8c03\u6574\u5982\u4e0b\uff1a"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'config RTL8188FU\n    tristate "Realtek 8188FU SDIO WiFi"\n-    ---help---\n+       help\n'})}),"\n",(0,r.jsx)(n.p,{children:"Kconfig \u4fee\u6539\u6b63\u786e\u540e\uff0c\u5728 make kernel_menuconfig \u4e2d\u5e94\u8be5\u80fd\u770b\u5230 rtl8188fu \u6a21\u5757\uff0c \u52fe\u9009\u540e\u53ef\u4ee5\u8fdb\u884c\u7f16\u8bd1\u9519\u8bef\u7684\u89e3\u51b3"}),"\n",(0,r.jsx)(n.h2,{id:"3-\u5185\u6838\u914d\u7f6e",children:"3. \u5185\u6838\u914d\u7f6e"}),"\n",(0,r.jsx)(n.p,{children:"\u5728make kernel_menuconfig\u8fdb\u884c\u529f\u80fd\u914d\u7f6e"}),"\n",(0,r.jsx)(n.h3,{id:"31-\u65e0\u7ebf\u914d\u7f6e",children:"3.1. \u65e0\u7ebf\u914d\u7f6e"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"WiFi"})," \u7684\u4f7f\u7528\u5fc5\u987b\u8981\u5728 kernel \u4e2d\u6253\u5f00 cfg80211 \u548c mac80211 \u7684\u652f\u6301"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"Networking support > Wireless\n\n--- Wireless\n<*>   cfg80211 - wireless configuration API\n[ ]     nl80211 testmode command (NEW)\n[ ]     enable developer warnings (NEW)\n[ ]     cfg80211 certification onus (NEW)\n[*]     enable powersave by default (NEW)\n[ ]     cfg80211 DebugFS entries (NEW)\n[*]     support CRDA (NEW)\n[*]     cfg80211 wireless extensions compatibility\n<*>   Generic IEEE 802.11 Networking Stack (mac80211)\n[*]   Minstrel (NEW)\n      Default rate control algorithm (Minstrel)  ---\x3e\n[ ]   Enable mac80211 mesh networking support (NEW)\n[ ]   Export mac80211 internals in DebugFS (NEW)\n[ ]   Trace all mac80211 debug messages (NEW)\n[ ]   Select mac80211 debugging features (NEW)\n"})}),"\n",(0,r.jsx)(n.h3,{id:"32-\u84dd\u7259\u914d\u7f6e",children:"3.2. \u84dd\u7259\u914d\u7f6e"}),"\n",(0,r.jsx)(n.p,{children:"BT \u7684\u4f7f\u7528\u5fc5\u987b\u8981\u5728 kernel \u4e2d\u6253\u5f00bluetooth\u5b50\u7cfb\u7edf\u76f8\u5173\u914d\u7f6e"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"Networking support > Bluetooth subsystem support > Bluetooth device drivers\n\n< > HCI USB driver\n< > HCI SDIO driver\n<*> HCI UART driver\n[*]   UART (H4) protocol support\n< >   UART Nokia H4+ protocol support\n[ ]   BCSP protocol support\n[ ]   Atheros AR300x serial support\n[ ] HCILL protocol support\n-*- Three-wire UART (H5) protocol support\n[ ] Intel protocol support\n[ ] Broadcom protocol support\n[*] Realtek protocol support\n[ ] Qualcomm Atheros protocol support\n[ ] Intel AG6XX protocol support\n[ ] Marvell protocol support\n< > HCI BCM203x USB driver\n< > HCI BPA10x USB driver\n< > HCI BlueFRITZ! USB driver\n< > HCI VHCI (Virtual HCI device) driver\n< > Marvell Bluetooth driver support\n< > MediaTek HCI SDIO driver\n< > MediaTek HCI UART driver\n"})}),"\n",(0,r.jsx)(n.h3,{id:"33-rfkill\u914d\u7f6e",children:"3.3. RFKILL\u914d\u7f6e"}),"\n",(0,r.jsx)(n.p,{children:"rfkill\u7684\u4f7f\u7528\u5fc5\u987b\u8981\u5728 kernel \u4e2d\u6253\u5f00\u76f8\u5173\u914d\u7f6e"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"Networking support > RF switch subsystem support\n\n --- RF switch subsystem support\n [ ]   RF switch input support\n <*>   GPIO RFKILL driver\n"})}),"\n",(0,r.jsx)(n.h3,{id:"34-\u9a71\u52a8\u9009\u62e9",children:"3.4. \u9a71\u52a8\u9009\u62e9"}),"\n",(0,r.jsx)(n.p,{children:"\u8981\u4f7f\u75288821C \u9a71\u52a8\uff0c\u9700\u8981\u5728 kernel \u4e2d\u6253\u5f00\u8be5\u9a71\u52a8"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"Device Drivers > Network device support > Wireless LAN\n\n[*]   Realtek devices\n< >     Realtek 8187 and 8187B USB support\n< >     Realtek rtlwifi family of devices  ----\n< >     RTL8723AU/RTL8188[CR]U/RTL819[12]CU (mac80211) support\n< >     Realtek 802.11ac wireless chips support  ----\n< >     Realtek 8821C SDIO WiFi\n<*>     Realtek 8188F USB WiFi\n"})}),"\n",(0,r.jsx)(n.h2,{id:"4-dts\u914d\u7f6e",children:"4. DTS\u914d\u7f6e"}),"\n",(0,r.jsx)(n.p,{children:"\u5728board.dts\u4e2d\u8fdb\u884c\u5404\u5b50\u8282\u70b9\u914d\u7f6e"}),"\n",(0,r.jsx)(n.h3,{id:"41-wifi",children:"4.1. WIFI"}),"\n",(0,r.jsx)(n.p,{children:"1.\u6253\u5f00\u5bf9\u5e94\u7684SDMC"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'&sdmc1 {\n    pinctrl-names = "default";\n    pinctrl-0 = <&sdmc1_pins_a>;//\u6838\u5bf9\u5f15\u811a\u662f\u5426\u548c\u539f\u7406\u56fe\u4e00\u81f4\n    bus-width = <4>;\n    no-mmc;\n    no-sd;\n    non-removalbe;\n    cap-sdio-irq;\n    status = "okay";\n};\n'})}),"\n",(0,r.jsx)(n.p,{children:"2.\u914d\u7f6e\u63a7\u5236\u5f15\u811a"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'rfkill_wlan {\n    compatible = "rfkill-gpio";\n    rfkill-name = "wlan";\n    rfkill-type = <1>;\n    reset-gpios = <&gpio_e 4 GPIO_ACTIVE_HIGH>;//\u6a21\u7ec4WiFi\u4f7f\u80fd\u5f15\u811a\uff0c\u6839\u636e\u5b9e\u9645\u539f\u7406\u56fe\u914d\u7f6e\n    shutdown-gpios = <&gpio_d 8 GPIO_ACTIVE_LOW>;//\u7535\u6e90\u63a7\u5236\u5f15\u811a\uff0c\u6839\u636e\u5b9e\u9645\u539f\u7406\u56fe\u914d\u7f6e\n    status = "okay";\n};\n'})}),"\n",(0,r.jsx)(n.h3,{id:"42-bt",children:"4.2. BT"}),"\n",(0,r.jsx)(n.p,{children:"1.\u6253\u5f00\u5bf9\u5e94UART"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'&uart6 {\n    pinctrl-names = "default";\n    pinctrl-0 = <&uart6_pins_a>, <&uart6_rts_pins_a>, <&uart6_rts_pins_b>;//\u987b\u548c\u539f\u7406\u56fe\u4fdd\u6301\u4e00\u81f4\n   status = "okay";\n};\n'})}),"\n",(0,r.jsx)(n.p,{children:"2.\u914d\u7f6e\u63a7\u5236\u5f15\u811a"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'rfkill_bt {\n    compatible = "rfkill-gpio";\n    rfkill-name = "bluetooth";\n    rfkill-type = <2>;\n    reset-gpios = <&gpio_c 6 GPIO_ACTIVE_HIGH>;//\u6a21\u7ec4\u84dd\u7259\u4f7f\u80fd\u5f15\u811a\uff0c\u987b\u548c\u539f\u7406\u56fe\u4fdd\u6301\u4e00\u81f4\n    status = "okay";\n};\n'})}),"\n",(0,r.jsx)(n.h2,{id:"5-\u6a21\u7ec4\u914d\u7f6e\u6587\u4ef6",children:"5. \u6a21\u7ec4\u914d\u7f6e\u6587\u4ef6"}),"\n",(0,r.jsx)(n.h3,{id:"51-\u84dd\u7259\u56fa\u4ef6\u548c\u4e0b\u8f7d\u5de5\u5177",children:"5.1. \u84dd\u7259\u56fa\u4ef6\u548c\u4e0b\u8f7d\u5de5\u5177"}),"\n",(0,r.jsx)(n.p,{children:"\u53ef\u4ee5\u4ece\u6a21\u7ec4\u5382\u83b7\u53d6\uff0c\u5b58\u653e\u4e8eoverylay\u76ee\u5f55"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"\u251c\u2500\u2500 lib\n\u2502   \u2514\u2500\u2500 firmware\n\u2502       \u2514\u2500\u2500 rtlbt\n\u2502           \u251c\u2500\u2500 rtl8821c_config//\u6a21\u7ec4\u914d\u7f6e\u6587\u4ef6\uff0c\u6700\u597d\u4ece\u6a21\u7ec4\u5382\u83b7\u53d6\n\u2502           \u2514\u2500\u2500 rtl8821c_fw//\u6a21\u7ec4\u56fa\u4ef6\uff0c\u6700\u597d\u4ece\u6a21\u7ec4\u5382\u83b7\u53d6\n\u251c\u2500\u2500 usr\n\u2502   \u2514\u2500\u2500 bin\n\u2502       \u2514\u2500\u2500 rtk_hciattach//\u6a21\u7ec4\u84dd\u7259\u56fa\u4ef6\u4e0b\u8f7d\u5de5\u5177\uff0c\u6700\u597d\u4ece\u6a21\u7ec4\u5382\u83b7\u53d6\n"})}),"\n",(0,r.jsx)(n.h2,{id:"6-\u529f\u80fd\u6d4b\u8bd5\u548c\u8c03\u8bd5",children:"6 \u529f\u80fd\u6d4b\u8bd5\u548c\u8c03\u8bd5"}),"\n",(0,r.jsx)(n.h3,{id:"61-\u6dfb\u52a0\u76f8\u5173\u5de5\u5177\u5305",children:"61. \u6dfb\u52a0\u76f8\u5173\u5de5\u5177\u5305"}),"\n",(0,r.jsx)(n.p,{children:"\u5728make menuconfig\u8fdb\u884c\u529f\u80fd\u914d\u7f6e"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"[*] wireless tools  ---\x3e\n[*] bluez-utils  ---\x3e\n    [ ]   use prebuilt binary instead of building from source\n    [ ]   build OBEX support\n    [ ]   build CLI client\n    [ ]   build monitor utility\n    [*]   build tools\n    [*]     install deprecated tools\n    [ ]   build experimental tools\n    [ ]   build audio plugins (a2dp and avrcp)\n    [ ]   build health plugin\n    [ ]   build hid plugin\n    [ ]   build hog plugin\n    [ ]   build mesh plugin\n    [ ]   build midi plugin\n    [*]   build network plugin\n    [ ]   build nfc plugin\n    [ ]   build sap plugin\n          *** sixaxis plugin needs udev /dev management ***\n    [ ]   install test scripts\n          *** hid2hci tool needs udev /dev management ***\n"})}),"\n",(0,r.jsx)(n.h3,{id:"62-\u6d4b\u8bd5",children:"62. \u6d4b\u8bd5"}),"\n",(0,r.jsxs)(n.p,{children:["1.",(0,r.jsx)(n.strong,{children:"WiFi"})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"insmod rtl8821.ko\nifconfig wlan0 up\niwlist wlan0 scan\n"})})]})}function a(e={}){const{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>o,a:()=>t});var r=i(7294);const l={},s=r.createContext(l);function t(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:t(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);