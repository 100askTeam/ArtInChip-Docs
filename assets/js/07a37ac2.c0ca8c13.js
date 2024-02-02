"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[702],{1670:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>p,toc:()=>d});var r=n(5893),i=n(1151);const s={sidebar_position:17},o="Pre-Boot Program",p={id:"D213-DevKit/part5/03-17_PBP",title:"Pre-Boot Program",description:"PBP(Pre-Boot Program) \u662f ArtInChip \u82af\u7247\u5e73\u53f0\u542f\u52a8\u8fc7\u7a0b\u4e2d\u7684\u4e00\u6bb5\u7a0b\u5e8f\uff0c\u5728 BROM \u7a0b\u5e8f\u8df3\u8f6c\u6267\u884c SPL \u4e4b\u524d\uff0c \u8fd0\u884c\u7684\u4ee3\u7801\u3002 PBP \u7a0b\u5e8f\u7528\u4e8e\u521d\u59cb\u5316\u4e00\u4e9b\u4e0d\u5f00\u653e\u7684\u786c\u4ef6\u6a21\u5757\uff0c\u6bd4\u5982 DRAM \u63a7\u5236\u5668\u7684\u521d\u59cb\u5316\u3002",source:"@site/docs/D213-DevKit/part5/03-17_PBP.md",sourceDirName:"D213-DevKit/part5",slug:"/D213-DevKit/part5/03-17_PBP",permalink:"/docs/D213-DevKit/part5/03-17_PBP",draft:!1,unlisted:!1,editUrl:"https://github.com/100askTeam/ArtInChip-Docs/tree/master/docs/D213-DevKit/part5/03-17_PBP.md",tags:[],version:"current",sidebarPosition:17,frontMatter:{sidebar_position:17},sidebar:"d213dkSidebar",previous:{title:"OpenSBI",permalink:"/docs/D213-DevKit/part5/03-16_OpenSBI"}},a={},d=[{value:"1. \u5b58\u653e\u4f4d\u7f6e",id:"1-\u5b58\u653e\u4f4d\u7f6e",level:3},{value:"2. \u4f55\u65f6\u8fd0\u884c",id:"2-\u4f55\u65f6\u8fd0\u884c",level:3},{value:"3. \u53c2\u6570\u914d\u7f6e",id:"3-\u53c2\u6570\u914d\u7f6e",level:3}];function c(e){const t={code:"code",em:"em",h1:"h1",h3:"h3",img:"img",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"pre-boot-program",children:"Pre-Boot Program"}),"\n",(0,r.jsx)(t.p,{children:"PBP(Pre-Boot Program) \u662f ArtInChip \u82af\u7247\u5e73\u53f0\u542f\u52a8\u8fc7\u7a0b\u4e2d\u7684\u4e00\u6bb5\u7a0b\u5e8f\uff0c\u5728 BROM \u7a0b\u5e8f\u8df3\u8f6c\u6267\u884c SPL \u4e4b\u524d\uff0c \u8fd0\u884c\u7684\u4ee3\u7801\u3002 PBP \u7a0b\u5e8f\u7528\u4e8e\u521d\u59cb\u5316\u4e00\u4e9b\u4e0d\u5f00\u653e\u7684\u786c\u4ef6\u6a21\u5757\uff0c\u6bd4\u5982 DRAM \u63a7\u5236\u5668\u7684\u521d\u59cb\u5316\u3002"}),"\n",(0,r.jsx)(t.h3,{id:"1-\u5b58\u653e\u4f4d\u7f6e",children:"1. \u5b58\u653e\u4f4d\u7f6e"}),"\n",(0,r.jsx)(t.p,{children:"PBP \u7a0b\u5e8f\u662f\u4ee5\u4e8c\u8fdb\u5236\u5f62\u5f0f\u4fdd\u5b58\u5728 SDK \u4e2d\uff0c\u901a\u5e38\u4f4d\u4e8e:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:"> - target/<chip>/common/<chipname>.pbp\n"})}),"\n",(0,r.jsxs)(t.p,{children:["\u5728 ",(0,r.jsx)(t.code,{children:"mk_image.py"})," \u751f\u6210\u955c\u50cf\u6587\u4ef6\u7684\u8fc7\u7a0b\u4e2d\uff0cPBP \u7a0b\u5e8f\u4e0e SPL \u7a0b\u5e8f\u4e00\u8d77\u88ab\u6253\u5305\u5230 AIC \u542f\u52a8\u955c\u50cf\u6587\u4ef6\u5f53\u4e2d\u3002 \u5177\u4f53\u914d\u7f6e\u53ef\u4ee5\u67e5\u770b\u5bf9\u5e94\u9879\u76ee\u7684 ",(0,r.jsx)(t.code,{children:"image_cfg.json"})," \u6587\u4ef6\u3002"]}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/pbp_place_in_img-17068587761381.png",alt:"../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/pbp_place_in_img.png"})}),"\n",(0,r.jsx)(t.h3,{id:"2-\u4f55\u65f6\u8fd0\u884c",children:"2. \u4f55\u65f6\u8fd0\u884c"}),"\n",(0,r.jsx)(t.p,{children:"\u6b63\u5e38\u542f\u52a8\u8fc7\u7a0b\u4e2d\uff0cBROM \u4f1a\u68c0\u67e5 PBP \u7a0b\u5e8f\u662f\u5426\u5b58\u5728\uff0c\u5982\u679c\u5b58\u5728\uff0c\u5219\u8df3\u8f6c\u6267\u884c PBP \u7a0b\u5e8f\u3002PBP \u7a0b\u5e8f\u6267\u884c\u5b8c\u6bd5\uff0c \u4f1a\u8fd4\u56de\u5230 BROM\u3002BROM \u5219\u7ee7\u7eed\u8df3\u8f6c\u6267\u884c SPL \u7a0b\u5e8f\u3002"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/brom_run_pbp-17068587849043.png",alt:"../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/brom_run_pbp.png"})}),"\n",(0,r.jsx)(t.h3,{id:"3-\u53c2\u6570\u914d\u7f6e",children:"3. \u53c2\u6570\u914d\u7f6e"}),"\n",(0,r.jsxs)(t.p,{children:["\u4e0d\u540c\u9879\u76ee\uff0c\u53ef\u80fd\u9700\u8981\u4f20\u9012\u4e00\u4e9b\u914d\u7f6e\u53c2\u6570\u7ed9 PBP \u4f7f\u7528\uff0c\u53ef\u4ee5\u901a\u8fc7 AIC \u542f\u52a8\u955c\u50cf\u7684 ",(0,r.jsx)(t.code,{children:"Private data area"})," \u4fdd\u5b58\u8fd9\u4e9b\u53c2\u6570\u3002PBP \u5728\u88ab\u6267\u884c\u65f6\u53ef\u4ee5\u5f97\u5230\u8be5\u533a\u57df\u7684\u5730\u5740\u548c\u957f\u5ea6\uff0c\u7136\u540e\u81ea\u884c\u89e3\u6790\u6570\u636e\uff0c\u5f97\u5230\u5177\u4f53\u7684\u53c2\u6570\u3002"]}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/private_data_for_pbp-17068587943445.png",alt:"../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/private_data_for_pbp.png"})}),"\n",(0,r.jsxs)(t.p,{children:["\u56fe 3.16 ",(0,r.jsx)(t.em,{children:"Private data \u4e0e PBP \u7684\u4fdd\u5b58\u4f4d\u7f6e"})]}),"\n",(0,r.jsxs)(t.p,{children:["PBP \u7a0b\u5e8f\u8fd0\u884c\u65f6\uff0c\u53ef\u4ee5\u5f97\u5230 ",(0,r.jsx)(t.code,{children:"Private data area"})," \u7684\u5730\u5740\u3002"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:"void pbp_main(u32 boot_param, void *priv_addr, u32 priv_len)\n{\n    ...\n}\n"})})]})}function h(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>p,a:()=>o});var r=n(7294);const i={},s=r.createContext(i);function o(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function p(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);