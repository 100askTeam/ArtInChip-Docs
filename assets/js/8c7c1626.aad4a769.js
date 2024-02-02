"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3017],{6254:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>o,contentTitle:()=>c,default:()=>m,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var r=i(5893),d=i(1151);const a={sidebar_position:5},c="2.3. \u91cd\u8981\u547d\u4ee4",l={id:"Luban-SDK/part1/02-3_ImportantOrder",title:"2.3. \u91cd\u8981\u547d\u4ee4",description:"2.3.1. \u7f16\u8bd1\u547d\u4ee4",source:"@site/docs/Luban-SDK/part1/02-3_ImportantOrder.md",sourceDirName:"Luban-SDK/part1",slug:"/Luban-SDK/part1/02-3_ImportantOrder",permalink:"/docs/Luban-SDK/part1/02-3_ImportantOrder",draft:!1,unlisted:!1,editUrl:"https://github.com/100askTeam/ArtInChip-Docs/tree/master/docs/Luban-SDK/part1/02-3_ImportantOrder.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"lunbansdkSidebar",previous:{title:"2.2. \u57fa\u672c\u7ed3\u6784",permalink:"/docs/Luban-SDK/part1/02-2_BasicStructure"},next:{title:"2.4. \u9884\u7f16\u8bd1\u5305",permalink:"/docs/Luban-SDK/part1/02-4_PrecompiledPackage"}},o={},s=[{value:"2.3.1. \u7f16\u8bd1\u547d\u4ee4",id:"231-\u7f16\u8bd1\u547d\u4ee4",level:2},{value:"2.3.2. \u5e38\u7528\u8f85\u52a9\u547d\u4ee4",id:"232-\u5e38\u7528\u8f85\u52a9\u547d\u4ee4",level:2},{value:"2.3.3. \u4f7f\u7528\u4e3e\u4f8b",id:"233-\u4f7f\u7528\u4e3e\u4f8b",level:2},{value:"2.3.3.1. make list",id:"2331-make-list",level:3},{value:"2.3.3.2. make d211_per1_mmc_defconfig",id:"2332-make-d211_per1_mmc_defconfig",level:3},{value:"2.3.3.3. make menuconfig",id:"2333-make-menuconfig",level:3},{value:"2.3.3.4. make all",id:"2334-make-all",level:3},{value:"2.3.4. \u5feb\u6377\u547d\u4ee4",id:"234-\u5feb\u6377\u547d\u4ee4",level:2},{value:"2.3.5. \u5176\u4ed6\u91cd\u8981\u547d\u4ee4",id:"235-\u5176\u4ed6\u91cd\u8981\u547d\u4ee4",level:2}];function t(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,d.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"23-\u91cd\u8981\u547d\u4ee4",children:"2.3. \u91cd\u8981\u547d\u4ee4"}),"\n",(0,r.jsx)(n.h2,{id:"231-\u7f16\u8bd1\u547d\u4ee4",children:"2.3.1. \u7f16\u8bd1\u547d\u4ee4"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"make <board>_defconfig\nmake all\n"})}),"\n",(0,r.jsx)(n.h2,{id:"232-\u5e38\u7528\u8f85\u52a9\u547d\u4ee4",children:"2.3.2. \u5e38\u7528\u8f85\u52a9\u547d\u4ee4"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"make list             (make l)          --\x3e \u5217\u51fa\u5f53\u524d\u53ef\u7528\u7684 <board>_defconfig\nmake menuconfig       (make m)          --\x3e \u5bf9 SDK \u8fdb\u884c\u914d\u7f6e\nmake uboot-menuconfig (make um)         --\x3e \u5bf9 U-Boot \u8fdb\u884c\u914d\u7f6e\nmake linux-menuconfig (make km)         --\x3e \u5bf9 Linux \u5185\u6838\u8fdb\u884c\u914d\u7f6e\nmake busybox-menuconfig                 --\x3e \u5bf9 Busybox \u8fdb\u884c\u914d\u7f6e\n"})}),"\n",(0,r.jsx)(n.p,{children:"\u8b66\u544a"}),"\n",(0,r.jsxs)(n.p,{children:["make \u547d\u4ee4\u4e0d\u8981\u4f7f\u7528 ",(0,r.jsx)(n.code,{children:"-j"})," \u53c2\u6570\u3002"]}),"\n",(0,r.jsxs)(n.p,{children:["Luban \u5728\u7f16\u8bd1\u8fc7\u7a0b\u4e2d\uff0c\u5df2\u7ecf\u9ed8\u8ba4\u4f7f\u7528\u4e86 ",(0,r.jsx)(n.code,{children:"-j0"})," \u53c2\u6570\uff0c\u5373\u6839\u636e\u7cfb\u7edf\u7684 CPU \u6838\u5fc3\u6570\u91cf\uff0c \u52a8\u6001\u5206\u914d\u7f16\u8bd1\u7684\u7ebf\u7a0b\u3002"]}),"\n",(0,r.jsxs)(n.p,{children:["\u5982\u679c\u5916\u90e8\u518d\u63d0\u4f9b ",(0,r.jsx)(n.code,{children:"-j"})," \u53c2\u6570\uff0c\u4f1a\u5bfc\u81f4 SDK \u7f16\u8bd1\u8fc7\u7a0b\u4e2d\u51fa\u73b0\u4e00\u4e9b\u9ad8\u5c42\u6b21\u7684\u76ee\u6807\u7f16\u8bd1 \u4e0d\u540c\u6b65\u7684\u9519\u8bef\u3002"]}),"\n",(0,r.jsx)(n.h2,{id:"233-\u4f7f\u7528\u4e3e\u4f8b",children:"2.3.3. \u4f7f\u7528\u4e3e\u4f8b"}),"\n",(0,r.jsx)(n.h3,{id:"2331-make-list",children:"2.3.3.1. make list"}),"\n",(0,r.jsx)(n.p,{children:"\u5217\u51fa\u5f53\u524d SDK \u6240\u6709\u53ef\u7528\u7684 defconfig"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"Built-in configs:\n  d211_initramfs_defconfig         - Build for d211_initramfs\n  d211_per1_mmc_defconfig          - Build for d211_per1_mmc\n  d211_per2_spinand_defconfig      - Build for d211_per2_spinand\n  d211_per2_spinor_defconfig       - Build for d211_per2_spinor\n  d211_fpga_mmc_defconfig          - Build for d211_fpga_mmc\n"})}),"\n",(0,r.jsx)(n.h3,{id:"2332-make-d211_per1_mmc_defconfig",children:"2.3.3.2. make d211_per1_mmc_defconfig"}),"\n",(0,r.jsx)(n.p,{children:"\u5e94\u7528\u6307\u5b9a\u7684\u9879\u76ee\u914d\u7f6e\u3002"}),"\n",(0,r.jsx)(n.p,{children:"\u5c0f\u6280\u5de7"}),"\n",(0,r.jsxs)(n.p,{children:["\u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0c\u4f7f\u7528 output \u4f5c\u4e3a\u9879\u76ee\u7684\u5de5\u4f5c/\u8f93\u51fa\u76ee\u5f55\u3002 \u5982\u679c\u9700\u8981\u6307\u5b9a\u4e00\u4e2a\u4e13\u7528\u7684\u5de5\u4f5c/\u8f93\u51fa\u76ee\u5f55\uff0c\u53ef\u4ee5\u4f7f\u7528 ",(0,r.jsx)(n.code,{children:"O=<dir> "}),"\u6765\u6307\u5b9a\u76ee\u5f55\u3002\u4f8b\u5982\uff1a"]}),"\n",(0,r.jsx)(n.p,{children:"make O=per1 d211_per1_mmc_defconfig"}),"\n",(0,r.jsx)(n.p,{children:"\u5f53\u6307\u5b9a\u4e86 O=per1 \uff0c\u540e\u7eed\u6240\u6709\u4e0e\u8be5\u9879\u76ee\u76f8\u5173\u7684 make \u64cd\u4f5c\uff0c\u90fd\u9700\u8981\u52a0\u4e0a\u8be5\u9009\u9879\uff0c\u6216\u8005 cd per1 \u4e4b\u540e\uff0c\u5728 per1 \u76ee\u5f55\u4e2d\u8fdb\u884c\u7f16\u8bd1\u3002"}),"\n",(0,r.jsx)(n.h3,{id:"2333-make-menuconfig",children:"2.3.3.3. make menuconfig"}),"\n",(0,r.jsx)(n.p,{children:"\u7528\u4e8e\u4fee\u6539\u9879\u76ee\u7684\u914d\u7f6e\u3002"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/luban-menuconfig-17066833587371.png",alt:"../../_https://photos.100ask.net/artinchip-docs/d213-devkit/luban-menuconfig.png"})}),"\n",(0,r.jsxs)(n.p,{children:["\u914d\u7f6e\u5b8c\u6210\uff0c\u5728\u9000\u51fa\u4fdd\u5b58\u65f6\u76f8\u5e94\u7684\u6539\u52a8\u4f1a\u540c\u6b65\u5230\u539f\u6709\u7684 ",(0,r.jsx)(n.code,{children:"<board>_defconfig"})]}),"\n",(0,r.jsx)(n.p,{children:"\u6ce8\u89e3"}),"\n",(0,r.jsx)(n.p,{children:"uboot/linux/busybox \u4e5f\u53ef\u4ee5\u901a\u8fc7\u4e0b\u9762\u7684\u547d\u4ee4\u4fee\u6539\u914d\u7f6e"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"make uboot-menuconfig"}),"\n",(0,r.jsx)(n.li,{children:"make linux-menuconfig"}),"\n",(0,r.jsx)(n.li,{children:"make busybox-menuconfig"}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"\u76f8\u5bf9\u5e94\u7684\u4fee\u6539\u90fd\u4f1a\u540c\u6b65\u5230\u539f\u6709\u7684 defconfig"}),"\n",(0,r.jsx)(n.h3,{id:"2334-make-all",children:"2.3.3.4. make all"}),"\n",(0,r.jsx)(n.p,{children:"\u7f16\u8bd1\u6574\u4e2a\u9879\u76ee\uff0c\u5305\u62ec Bootloader\u3001Kernel\u3001\u5e94\u7528\u5c42\u7684 Pacakge\u3001RootFS\u4ee5\u53ca\u751f\u6210\u6700\u7ec8\u7684\u70e7\u5f55\u955c\u50cf\u6587\u4ef6\u3002"}),"\n",(0,r.jsx)(n.p,{children:"\u6ce8\u610f"}),"\n",(0,r.jsx)(n.p,{children:"\u4e0d\u9700\u8981\u4f7f\u7528 make -jN \u8fdb\u884c\u7f16\u8bd1\uff0cLuban \u7f16\u8bd1\u6846\u67b6\u9ed8\u8ba4\u5df2\u7ecf\u4f7f\u7528\u4e86 make -j0\uff0c\u5373\u6839\u636e\u4e3b\u673a\u7684 CPU \u6838\u5fc3\u4e2a\u6570\u51b3\u5b9a\u4f7f\u7528\u591a\u5c11\u4e2a\u7ebf\u7a0b\u8fdb\u884c\u7f16\u8bd1\uff0c\u5916\u90e8\u4e0d\u9700\u8981\u518d\u63d0\u4f9b -j \u53c2\u6570\u3002"}),"\n",(0,r.jsx)(n.p,{children:"\u5c0f\u6280\u5de7"}),"\n",(0,r.jsxs)(n.p,{children:["SDK \u5177\u6709\u6e90\u7801\u4fee\u6539\u68c0\u6d4b\u529f\u80fd\uff0c\u5728\u4fee\u6539\u4e86 SDK \u4e2d\u4efb\u610f\u5305\u7684\u6e90\u7801\u4e4b\u540e\u518d\u6267\u884c ",(0,r.jsx)(n.code,{children:"make all"})," \u4f1a\u89e6\u53d1\u8be5\u5305\u7684 ",(0,r.jsx)(n.code,{children:"rebuild"}),"\u3002\u901a\u5e38\u662f\u589e\u91cf\u7f16\u8bd1\u3002"]}),"\n",(0,r.jsx)(n.h2,{id:"234-\u5feb\u6377\u547d\u4ee4",children:"2.3.4. \u5feb\u6377\u547d\u4ee4"}),"\n",(0,r.jsx)(n.p,{children:"\u5bf9\u4e8e\u4e00\u4e9b\u9ad8\u9891\u8f93\u5165\u7684\u547d\u4ee4\uff0c\u8fd9\u91cc\u505a\u4e86\u4e00\u4e2a\u7b80\u77ed\u7684\u5feb\u6377\u547d\u4ee4\u6620\u5c04"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"make m   -> make menuconfig\nmake k   -> make linux-rebuild\nmake km  -> make linux-menuconfig\nmake b   -> make uboot-rebuild\nmake u   -> make uboot-rebuild\nmake bm  -> make uboot-menuconfig\nmake um  -> make uboot-menuconfig\nmake f   -> make all\n"})}),"\n",(0,r.jsx)(n.h2,{id:"235-\u5176\u4ed6\u91cd\u8981\u547d\u4ee4",children:"2.3.5. \u5176\u4ed6\u91cd\u8981\u547d\u4ee4"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"make show-targets              --\x3e \u67e5\u770b\u5f53\u524d\u9879\u76ee\u6709\u54ea\u4e9b\u7f16\u8bd1\u76ee\u6807\nmake <pkg>-extract             --\x3e \u4ec5\u5bf9\u6e90\u7801\u5305\u8fdb\u884c\u89e3\u538b\nmake <pkg>-patch               --\x3e \u4ec5\u5bf9\u6e90\u7801\u5305\u8fdb\u884c patch\uff08\u5982\u679c\u6709\u7684\u8bdd\uff09\nmake <pkg>                     --\x3e \u5b8c\u6210\u4ece extract/patch/../build/install\n\nmake <pkg>-reconfigure         --\x3e \u5bf9\u8be5\u6e90\u7801\u5305\u91cd\u65b0\u6267\u884c\u914d\u7f6e\u3001\u7f16\u8bd1\u3001\u5b89\u88c5\nmake <pkg>-rebuild             --\x3e \u5bf9\u8be5\u6e90\u7801\u5305\u8fdb\u884c\u91cd\u65b0\u7f16\u8bd1\nmake <pkg>-reinstall           --\x3e \u5bf9\u8be5\u6e90\u7801\u5305\u8fdb\u884c\u91cd\u65b0\u5b89\u88c5\nmake <pkg>-prebuilt            --\x3e \u4e3a\u8be5\u6e90\u7801\u5305\u751f\u6210\u9884\u7f16\u8bd1\u4e8c\u8fdb\u5236\u538b\u7f29\u5305\n\nmake <pkg>-clean               --\x3e \u5220\u9664\u8be5\u6e90\u7801\u5305\u7684\u6240\u6709\u7f16\u8bd1\u8f93\u51fa\nmake <pkg>-distclean           --\x3e \u5220\u9664\u8be5\u6e90\u7801\u5305\u7684\u6e90\u7801\n"})})]})}function m(e={}){const{wrapper:n}={...(0,d.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(t,{...e})}):t(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>l,a:()=>c});var r=i(7294);const d={},a=r.createContext(d);function c(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:c(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);