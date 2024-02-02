"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7863],{7392:(e,n,d)=>{d.r(n),d.d(n,{assets:()=>s,contentTitle:()=>a,default:()=>p,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var r=d(5893),t=d(1151);const o={sidebar_position:9},a="2.7. \u6dfb\u52a0\u677f\u5b50",i={id:"Luban-SDK/part1/02-7_AddBoard",title:"2.7. \u6dfb\u52a0\u677f\u5b50",description:"\u4e00\u6b3e\u4ea7\u54c1\u5bf9\u5e94\u4e00\u4e2a\u677f\u5b50\uff0c\u5f00\u53d1\u65b0\u4ea7\u54c1\u65f6\uff0c\u9700\u8981\u5728 SDK \u4e2d\u521b\u5efa\u65b0\u7684\u677f\u5b50\u4ee5\u53ca\u5bf9\u5e94\u7684\u914d\u7f6e\u3002 \u5168\u65b0\u914d\u7f6e\u4e00\u4e2a\u677f\u5b50\u6bd4\u8f83\u7e41\u7410\uff0cLuban SDK \u63d0\u4f9b\u5feb\u901f\u521b\u5efa\u65b0\u677f\u5b50\u914d\u7f6e\u7684\u65b9\u6cd5\u3002",source:"@site/docs/Luban-SDK/part1/02-7_AddBoard.md",sourceDirName:"Luban-SDK/part1",slug:"/Luban-SDK/part1/02-7_AddBoard",permalink:"/en/docs/Luban-SDK/part1/02-7_AddBoard",draft:!1,unlisted:!1,editUrl:"https://github.com/100askTeam/ArtInChip-Docs/tree/master/docs/Luban-SDK/part1/02-7_AddBoard.md",tags:[],version:"current",sidebarPosition:9,frontMatter:{sidebar_position:9},sidebar:"lunbansdkSidebar",previous:{title:"2.6. \u70e7\u5f55\u955c\u50cf",permalink:"/en/docs/Luban-SDK/part1/02-6_BurningMirrorImage"},next:{title:"2.8. \u6dfb\u52a0\u65b0\u5305",permalink:"/en/docs/Luban-SDK/part1/02-8_AddNewPackage"}},s={},c=[{value:"2.7.1. \u539f\u7406",id:"271-\u539f\u7406",level:2},{value:"2.7.2. \u6b65\u9aa4",id:"272-\u6b65\u9aa4",level:2}];function l(e){const n={code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...(0,t.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"27-\u6dfb\u52a0\u677f\u5b50",children:"2.7. \u6dfb\u52a0\u677f\u5b50"}),"\n",(0,r.jsx)(n.p,{children:"\u4e00\u6b3e\u4ea7\u54c1\u5bf9\u5e94\u4e00\u4e2a\u677f\u5b50\uff0c\u5f00\u53d1\u65b0\u4ea7\u54c1\u65f6\uff0c\u9700\u8981\u5728 SDK \u4e2d\u521b\u5efa\u65b0\u7684\u677f\u5b50\u4ee5\u53ca\u5bf9\u5e94\u7684\u914d\u7f6e\u3002 \u5168\u65b0\u914d\u7f6e\u4e00\u4e2a\u677f\u5b50\u6bd4\u8f83\u7e41\u7410\uff0cLuban SDK \u63d0\u4f9b\u5feb\u901f\u521b\u5efa\u65b0\u677f\u5b50\u914d\u7f6e\u7684\u65b9\u6cd5\u3002"}),"\n",(0,r.jsx)(n.h2,{id:"271-\u539f\u7406",children:"2.7.1. \u539f\u7406"}),"\n",(0,r.jsxs)(n.p,{children:["\u7528\u6237\u63d0\u4f9b\u4e00\u4e2a\u539f\u5382\u516c\u677f\u7684\u914d\u7f6e\u6587\u4ef6\uff0c",(0,r.jsx)(n.code,{children:"add_board"})," \u7a0b\u5e8f\u4ee5\u8be5\u914d\u7f6e\u4e3a\u6a21\u677f\uff0c\u521b\u5efa\u65b0\u677f\u5b50\u5bf9\u5e94\u7684\u76ee\u5f55\u548c\u914d\u7f6e\u3002"]}),"\n",(0,r.jsx)(n.h2,{id:"272-\u6b65\u9aa4",children:"2.7.2. \u6b65\u9aa4"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"\u5728 SDK \u9876\u5c42\u76ee\u5f55\u6267\u884c\u547d\u4ee4"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"make add_board\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"\u6839\u636e\u63d0\u793a\uff0c\u63d0\u4f9b\u5fc5\u8981\u7684\u4fe1\u606f"}),"\n",(0,r.jsx)(n.p,{children:"\u4f8b\u5982\uff1a"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"Chip list:\n        1: d211\nSelect chip for new board(number): 1\n        d211\n\nReference defconfig:(Create new board base on selected defconfig)\n        1: d211_fpga_mmc_defconfig\n        2: d211_fpga_spinand_defconfig\n        3: d211_fpga_spinor_defconfig\n        4: d211_initramfs_defconfig\n        5: d211_qemu_defconfig\nSelect reference defconfig for new board(number): 1\n        d211_fpga_mmc_defconfig\n\nInput new board's name: MyTest Board\n        MyTest Board\n\nInput manufacturer's name: My Company\n        My Company\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"\u751f\u6210\u65b0\u677f\u5b50\u7684\u76ee\u5f55\u548c\u914d\u7f6e"}),"\n",(0,r.jsxs)(n.p,{children:["\u6b64\u5904\u7684\u4f8b\u5b50\uff0c\u5728\u521b\u5efa\u5b8c\u76f8\u5173\u7684\u76ee\u5f55\u548c\u914d\u7f6e\u4e4b\u540e\uff0c",(0,r.jsx)(n.code,{children:"add_board"})," \u7a0b\u5e8f\u4f1a\u5217\u51fa\u65b0\u5efa\u7684\u76ee\u5f55\u548c\u76f8\u5173\u914d\u7f6e\u6587\u4ef6\u3002\u540e\u7eed\u53ef\u4ee5\u9488\u5bf9\u65b0\u7684\u914d\u7f6e\u8fdb\u884c\u5ba2\u5236\u5316\u4fee\u6539\u3002"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"Created: target/d211/MyTest_Board\nCreated: source/uboot-2021.10/configs/d211_MyTest_Board_defconfig\nCreated: source/linux-5.10/arch/riscv/configs/d211_MyTest_Board_defconfig\nCreated: package/third-party/busybox/configs/d211_MyTest_Board_defconfig\nCreated: target/configs/d211_MyTest_Board_defconfig\nUpdated: target/d211/Config.in\n"})}),"\n"]}),"\n"]})]})}function p(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},1151:(e,n,d)=>{d.d(n,{Z:()=>i,a:()=>a});var r=d(7294);const t={},o=r.createContext(t);function a(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);