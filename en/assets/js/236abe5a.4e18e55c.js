"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4890],{722:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>p,frontMatter:()=>r,metadata:()=>d,toc:()=>a});var l=t(5893),i=t(1151);const r={sidebar_position:7},s="7.\u793a\u4f8b\u7a0b\u5e8f",d={id:"D213-DevKit/part4/11-7_SampleProgram",title:"7.\u793a\u4f8b\u7a0b\u5e8f",description:"1. LVGL",source:"@site/docs/D213-DevKit/part4/11-7_SampleProgram.md",sourceDirName:"D213-DevKit/part4",slug:"/D213-DevKit/part4/11-7_SampleProgram",permalink:"/en/docs/D213-DevKit/part4/11-7_SampleProgram",draft:!1,unlisted:!1,editUrl:"https://github.com/100askTeam/ArtInChip-Docs/tree/master/docs/D213-DevKit/part4/11-7_SampleProgram.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"d213dkSidebar",previous:{title:"6.\u5c4f\u5e55\u914d\u7f6e",permalink:"/en/docs/D213-DevKit/part4/11-6_ScreenConfiguration"},next:{title:"Linux-Uboot\u5f00\u53d1",permalink:"/en/docs/category/linux-uboot\u5f00\u53d1"}},c={},a=[{value:"1. LVGL",id:"1-lvgl",level:2},{value:"1.1. \u7f16\u8bd1",id:"11-\u7f16\u8bd1",level:2},{value:"1.2. \u8fd0\u884c",id:"12-\u8fd0\u884c",level:2},{value:"1.3. \u754c\u9762",id:"13-\u754c\u9762",level:2},{value:"1.4. \u6ce8\u610f\u95ee\u9898",id:"14-\u6ce8\u610f\u95ee\u9898",level:2},{value:"2. QT",id:"2-qt",level:2},{value:"2.1. \u7f16\u8bd1",id:"21-\u7f16\u8bd1",level:2},{value:"2.2. \u8fd0\u884c",id:"22-\u8fd0\u884c",level:2},{value:"2.3. \u754c\u9762",id:"23-\u754c\u9762",level:2},{value:"2.4. \u6ce8\u610f\u95ee\u9898",id:"24-\u6ce8\u610f\u95ee\u9898",level:2},{value:"3. Samples",id:"3-samples",level:2}];function o(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h1,{id:"7\u793a\u4f8b\u7a0b\u5e8f",children:"7.\u793a\u4f8b\u7a0b\u5e8f"}),"\n",(0,l.jsx)(n.h2,{id:"1-lvgl",children:"1. LVGL"}),"\n",(0,l.jsx)(n.h2,{id:"11-\u7f16\u8bd1",children:"1.1. \u7f16\u8bd1"}),"\n",(0,l.jsx)(n.p,{children:"\u5982\u679c\u8981\u8fd0\u884c LVGL demo\uff0c \u9700\u8981\u5728 luban \u7cfb\u7edf\u901a\u8fc7 \u201cmake m\u201d \u547d\u4ee4\u6253\u5f00 luban \u914d\u7f6e\u754c\u9762\uff1a"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:"ArtInChip packages\n    Sample code\n        [*] test-lvgl  ---\x3e\n"})}),"\n",(0,l.jsx)(n.p,{children:"\u9700\u8981\u7684\u4e09\u65b9\u5e93\u4f1a\u81ea\u52a8\u52a0\u8f7d\u548c\u7f16\u8bd1"}),"\n",(0,l.jsx)(n.h2,{id:"12-\u8fd0\u884c",children:"1.2. \u8fd0\u884c"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u81ea\u52a8\u8fd0\u884c\uff1a\u811a\u672c\u4e3a /etc/init.d/S00lvgl"}),"\n",(0,l.jsx)(n.li,{children:"\u624b\u5de5\u8fd0\u884c\uff1a/usr/local/bin/test_lvgl"}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"13-\u754c\u9762",children:"1.3. \u754c\u9762"}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/test-lvgl-17067718572621.png",alt:"../../_https://photos.100ask.net/artinchip-docs/d213-devkit/test-lvgl.png"})}),"\n",(0,l.jsx)(n.h2,{id:"14-\u6ce8\u610f\u95ee\u9898",children:"1.4. \u6ce8\u610f\u95ee\u9898"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"test-lvgl \u9ed8\u8ba4\u7684 UI \u754c\u9762\u4e3a 1024x600\uff0c\u4e0d\u4f1a\u81ea\u9002\u5e94\u5c4f\u5e55\u5927\u5c0f"}),"\n",(0,l.jsx)(n.li,{children:"test-lvgl \u9ed8\u8ba4\u9700\u8981\u53ccbuffer\uff0c\u56e0\u6b64\u5728board.dts \u4e2d\u8981\u6309 \u9ad8\u5ea6 x 2 \u914d\u7f6e"}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:"&fb0 {\n    height-virtual = <1200>;            //600 x 2\n    port {\n        fb0_out: endpoint {\n            remote-endpoint = <&de0_in>;\n        };\n    };\n};\n"})}),"\n",(0,l.jsx)(n.h2,{id:"2-qt",children:"2. QT"}),"\n",(0,l.jsx)(n.h2,{id:"21-\u7f16\u8bd1",children:"2.1. \u7f16\u8bd1"}),"\n",(0,l.jsx)(n.p,{children:"\u5982\u679c\u8981\u8fd0\u884c QT demo\uff0c \u9700\u8981\u5728 luban \u7cfb\u7edf\u901a\u8fc7 \u201cmake m\u201d \u547d\u4ee4\u6253\u5f00 luban \u914d\u7f6e\u754c\u9762\uff1a"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:"ArtInChip packages\n    Launchers\n        [*] qtlauncher  ---\x3e\n            [*]   use GE to render image (NEW)\n            [*]   small memory device (NEW)\n"})}),"\n",(0,l.jsx)(n.p,{children:"\u9700\u8981\u7684\u4e09\u65b9\u5e93\u5982 QT \u4f1a\u81ea\u52a8\u52a0\u8f7d\u548c\u7f16\u8bd1"}),"\n",(0,l.jsx)(n.h2,{id:"22-\u8fd0\u884c",children:"2.2. \u8fd0\u884c"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u81ea\u52a8\u8fd0\u884c\uff1a\u811a\u672c\u4e3a /etc/init.d/S99qtlauncher"}),"\n",(0,l.jsx)(n.li,{children:"\u624b\u5de5\u8fd0\u884c\uff1a"}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:"export LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH\nexport TSLIB_FBDEVICE=/dev/fb0\nexport POINTERCAL_CALIBFILE=/etc/pointercal\nexport TSLIB_CONSOLEDEVICE=none\nexport TSLIB_TSDEVICE=/dev/input/event0\nexport TSLIB_PLUGINDIR=/usr/lib/ts\nexport QWS_MOUSE_PROTO=tslib:/dev/input/event0\n/usr/local/launcher/qtlauncher -qws\n"})}),"\n",(0,l.jsx)(n.h2,{id:"23-\u754c\u9762",children:"2.3. \u754c\u9762"}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/qtlauncher-17067719050065.png",alt:"../../_https://photos.100ask.net/artinchip-docs/d213-devkit/qtlauncher.png"})}),"\n",(0,l.jsx)(n.h2,{id:"24-\u6ce8\u610f\u95ee\u9898",children:"2.4. \u6ce8\u610f\u95ee\u9898"}),"\n",(0,l.jsxs)(n.p,{children:["qtlancher \u5e94\u7528\u6bd4\u8f83\u5927\uff0c\u56e0\u6b64\u9700\u8981\u8c03\u6574 root \u5206\u533a\u523064M\uff0c \u53c2\u8003 ",(0,l.jsx)(n.a,{href:"storage.html#ref-luban-bringup-storage",children:"\u5b58\u50a8\u7ae0\u8282\u8bf4\u660e"})]}),"\n",(0,l.jsx)(n.h2,{id:"3-samples",children:"3. Samples"}),"\n",(0,l.jsx)(n.p,{children:"\u4e3a\u4e86\u65b9\u4fbf\u4f7f\u7528\uff0cLuban \u5f00\u53d1\u4e86\u4e00\u4e9b\u6a21\u5757\u7684\u4f7f\u7528\u793a\u4f8b\uff0c\u53ef\u4ee5\u901a\u8fc7 \u201cmake m\u201d \u547d\u4ee4\u6253\u5f00 luban \u914d\u7f6e\u754c\u9762\u8fdb\u884c\u8bbe\u7f6e\uff1a"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:"ArtInChip packages\n    Sample code\n        [*] test-mtop\n        [*] test-ce\n        [*] test-dma-buf\n        [ ] test-dvp\n        [*] test-fb\n        [*] test-lvgl\n        [*] test-touchscreen\n        [*] test-uart\n        [*] test-watchdog\n        [ ] test-libmad\n        [*] test-clock\n        [*] test-keyadc\n        [*] reg-dump\n        [*] test-gpio\n        [*] test-can\n        [*] test-eth\n        [*] test-audio\n"})})]})}function p(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(o,{...e})}):o(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>d,a:()=>s});var l=t(7294);const i={},r=l.createContext(i);function s(e){const n=l.useContext(r);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),l.createElement(r.Provider,{value:n},e.children)}}}]);