"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2858],{8147:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>d,contentTitle:()=>r,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var t=n(5893),a=n(1151);const i={},r="\u4f7f\u7528Tina-SDK\u7f16\u8bd1\u6784\u5efaBootloader",l={id:"Luban-SDK/part3/TinaSDK_BuildBootloader",title:"\u4f7f\u7528Tina-SDK\u7f16\u8bd1\u6784\u5efaBootloader",description:"* \u67da\u6728PI-\u8725\u8734\u5f00\u53d1\u677f\uff0cBootloader\u75314\u90e8\u5206\u7ec4\u6210\uff0c \u7b2c\u4e00\u90e8\u5206\u662f boot0 \u9636\u6bb5\uff0c\u7528\u4e8e\u521d\u59cb\u5316CPU DDR UART \u65f6\u949f\u7b49\u4e00\u4e9b\u5fc5\u8981\u5916\u8bbe\u548c\u5f15\u811a\u5206\u914d\uff0c\u4e4b\u540e\u8fdb\u5165\u7b2c\u4e8c\u90e8\u5206\uff0c\u7b2c\u4e8c\u90e8\u5206\u662f optee  uboot  board.dtb \u8fd9\u4e09\u90e8\u5206\u7ec4\u6210\uff0c\u4e3a\u4e00\u4e2a boot_package.fex \u6587\u4ef6\u3002",source:"@site/docs/Luban-SDK/part3/08-TinaSDK_BuildBootloader.md",sourceDirName:"Luban-SDK/part3",slug:"/Luban-SDK/part3/TinaSDK_BuildBootloader",permalink:"/en/docs/Luban-SDK/part3/TinaSDK_BuildBootloader",draft:!1,unlisted:!1,editUrl:"https://github.com/100askTeam/ArtInChip-Docs/tree/master/docs/Luban-SDK/part3/08-TinaSDK_BuildBootloader.md",tags:[],version:"current",sidebarPosition:8,frontMatter:{},sidebar:"lunbansdkSidebar",previous:{title:"\u4f7f\u7528Tina-SDK\u7f16\u8bd1\u6784\u5efa\u7cfb\u7edf",permalink:"/en/docs/Luban-SDK/part3/TinaSDK_DevelopmentGuide"},next:{title:"\u4f7f\u7528Tina-SDK\u7f16\u8bd1\u6253\u5305Linux Kernel",permalink:"/en/docs/Luban-SDK/part3/TinaSDK_BuildLinuxKernel"}},d={},s=[{value:"\u5355\u72ec\u7f16\u8bd1\u6253\u5305\u7b2c\u4e00\u90e8\u5206",id:"\u5355\u72ec\u7f16\u8bd1\u6253\u5305\u7b2c\u4e00\u90e8\u5206",level:2},{value:"\u5355\u72ec\u7f16\u8bd1\u6253\u5305\u7b2c\u4e8c\u90e8\u5206",id:"\u5355\u72ec\u7f16\u8bd1\u6253\u5305\u7b2c\u4e8c\u90e8\u5206",level:2},{value:"\u5355\u72ec\u7f16\u8bd1\u6253\u5305\u7b2c\u4e09\u90e8\u5206",id:"\u5355\u72ec\u7f16\u8bd1\u6253\u5305\u7b2c\u4e09\u90e8\u5206",level:2},{value:"\u5355\u72ec\u7f16\u8bd1 uboot",id:"\u5355\u72ec\u7f16\u8bd1-uboot",level:3},{value:"\u5355\u72ec\u7f16\u8bd1 board.dtb",id:"\u5355\u72ec\u7f16\u8bd1-boarddtb",level:3}];function u(e){const o={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.h1,{id:"\u4f7f\u7528tina-sdk\u7f16\u8bd1\u6784\u5efabootloader",children:"\u4f7f\u7528Tina-SDK\u7f16\u8bd1\u6784\u5efaBootloader"}),"\n",(0,t.jsxs)(o.ul,{children:["\n",(0,t.jsx)(o.li,{children:"\u67da\u6728PI-\u8725\u8734\u5f00\u53d1\u677f\uff0cBootloader\u75314\u90e8\u5206\u7ec4\u6210\uff0c \u7b2c\u4e00\u90e8\u5206\u662f boot0 \u9636\u6bb5\uff0c\u7528\u4e8e\u521d\u59cb\u5316CPU DDR UART \u65f6\u949f\u7b49\u4e00\u4e9b\u5fc5\u8981\u5916\u8bbe\u548c\u5f15\u811a\u5206\u914d\uff0c\u4e4b\u540e\u8fdb\u5165\u7b2c\u4e8c\u90e8\u5206\uff0c\u7b2c\u4e8c\u90e8\u5206\u662f optee  uboot  board.dtb \u8fd9\u4e09\u90e8\u5206\u7ec4\u6210\uff0c\u4e3a\u4e00\u4e2a boot_package.fex \u6587\u4ef6\u3002"}),"\n",(0,t.jsx)(o.li,{children:"\u6240\u4ee5Bootloader\u7684\u6574\u4f53\u7684\u542f\u52a8\u6d41\u7a0b\u662f\uff0cboot0--\x3eoptee--\x3eu-boot--\x3eboard.dtb\u3002"}),"\n",(0,t.jsx)(o.li,{children:"Bootloader\u5728\u5185\u6838\u8fd0\u884c\u4e4b\u524d\u8fd0\u884c\uff0c\u53ef\u4ee5\u521d\u59cb\u5316\u786c\u4ef6\u8bbe\u5907\u3001\u5efa\u7acb\u5185\u5b58\u7a7a\u95f4\u6620 \u5c04\u56fe\uff0c\u4ece\u800c\u5c06\u7cfb\u7edf\u7684\u8f6f\u786c\u4ef6\u73af\u5883\u5e26\u5230\u4e00\u4e2a\u5408\u9002\u72b6\u6001\uff0c\u4e3a\u6700\u7ec8\u8c03\u7528 linux \u5185\u6838\u51c6\u5907\u597d\u6b63\u786e\u7684\u73af\u5883\u3002"}),"\n"]}),"\n",(0,t.jsx)(o.h2,{id:"\u5355\u72ec\u7f16\u8bd1\u6253\u5305\u7b2c\u4e00\u90e8\u5206",children:"\u5355\u72ec\u7f16\u8bd1\u6253\u5305\u7b2c\u4e00\u90e8\u5206"}),"\n",(0,t.jsx)(o.h2,{id:"\u5355\u72ec\u7f16\u8bd1\u6253\u5305\u7b2c\u4e8c\u90e8\u5206",children:"\u5355\u72ec\u7f16\u8bd1\u6253\u5305\u7b2c\u4e8c\u90e8\u5206"}),"\n",(0,t.jsx)(o.h2,{id:"\u5355\u72ec\u7f16\u8bd1\u6253\u5305\u7b2c\u4e09\u90e8\u5206",children:"\u5355\u72ec\u7f16\u8bd1\u6253\u5305\u7b2c\u4e09\u90e8\u5206"}),"\n",(0,t.jsx)(o.h3,{id:"\u5355\u72ec\u7f16\u8bd1-uboot",children:"\u5355\u72ec\u7f16\u8bd1 uboot"}),"\n",(0,t.jsxs)(o.ul,{children:["\n",(0,t.jsx)(o.li,{children:"\u5355\u72ec\u7f16\u8bd1 uboot\u9636\u6bb5"}),"\n"]}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-shell",children:"book@100ask:~/tina-v851$ source build/envsetup.sh\nbook@100ask:~/tina-v851$ lunch\nbook@100ask:~/tina-v851$ muboot\n"})}),"\n",(0,t.jsx)(o.p,{children:"\u7f16\u8bd1uboot\uff0c\u7f16\u8bd1\u5b8c\u6210\u540e\u81ea\u52a8\u66f4\u65b0uboot binary\u5230TinaSDK/target/allwinner/$(BOARD)-common/bin/"}),"\n",(0,t.jsx)(o.h3,{id:"\u5355\u72ec\u7f16\u8bd1-boarddtb",children:"\u5355\u72ec\u7f16\u8bd1 board.dtb"}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-shell",children:"book@100ask:~/tina-v851$ mboot\n"})})]})}function c(e={}){const{wrapper:o}={...(0,a.a)(),...e.components};return o?(0,t.jsx)(o,{...e,children:(0,t.jsx)(u,{...e})}):u(e)}},1151:(e,o,n)=>{n.d(o,{Z:()=>l,a:()=>r});var t=n(7294);const a={},i=t.createContext(a);function r(e){const o=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function l(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),t.createElement(i.Provider,{value:o},e.children)}}}]);