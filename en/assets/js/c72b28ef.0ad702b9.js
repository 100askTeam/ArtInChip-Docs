"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4236],{1629:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>a,contentTitle:()=>o,default:()=>p,frontMatter:()=>s,metadata:()=>c,toc:()=>d});var i=t(5893),r=t(1151);const s={sidebar_position:4},o="2.2. \u57fa\u672c\u7ed3\u6784",c={id:"Luban-SDK/part1/02-2_BasicStructure",title:"2.2. \u57fa\u672c\u7ed3\u6784",description:"../../https://photos.100ask.net/artinchip-docs/d213-devkit/sdkoverview.png",source:"@site/docs/Luban-SDK/part1/02-2_BasicStructure.md",sourceDirName:"Luban-SDK/part1",slug:"/Luban-SDK/part1/02-2_BasicStructure",permalink:"/en/docs/Luban-SDK/part1/02-2_BasicStructure",draft:!1,unlisted:!1,editUrl:"https://github.com/100askTeam/ArtInChip-Docs/tree/master/docs/Luban-SDK/part1/02-2_BasicStructure.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"lunbansdkSidebar",previous:{title:"2.1.\u6846\u67b6\u7b80\u8ff0",permalink:"/en/docs/Luban-SDK/part1/02-1_FrameworkBrief"},next:{title:"2.3. \u91cd\u8981\u547d\u4ee4",permalink:"/en/docs/Luban-SDK/part1/02-3_ImportantOrder"}},a={},d=[];function u(n){const e={code:"code",em:"em",h1:"h1",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h1,{id:"22-\u57fa\u672c\u7ed3\u6784",children:"2.2. \u57fa\u672c\u7ed3\u6784"}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/sdk_overview-17066832020801.png",alt:"../../_https://photos.100ask.net/artinchip-docs/d213-devkit/sdk_overview.png"})}),"\n",(0,i.jsxs)(e.p,{children:["\u56fe 2.45 ",(0,i.jsx)(e.em,{children:"Luban SDK \u6839\u76ee\u5f55"})]}),"\n",(0,i.jsx)(e.p,{children:"Luban SDK \u4e2d\u6709\u4ee5\u4e0b\u91cd\u8981\u7684\u6587\u4ef6\u548c\u76ee\u5f55\uff0c\u5176\u5206\u7c7b\u548c\u529f\u80fd\u5982\u4e0b\u6240\u8ff0\u3002"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"Luban\n\n\u251c\u2500\u2500 dl                                   --\x3e \u7b2c\u4e09\u65b9\u6e90\u7801\u7684\u538b\u7f29\u5305\u4fdd\u5b58\u76ee\u5f55\n\u251c\u2500\u2500 output                               --\x3e \u9ed8\u8ba4\u7684\u7f16\u8bd1\u8f93\u51fa\u76ee\u5f55\n\u251c\u2500\u2500 package                              --\x3e \u5404\u7f16\u8bd1\u6e90\u7801\u5305/\u7ec4\u4ef6\u7684\u914d\u7f6e\n\u2502   \u251c\u2500\u2500 Config.in                        --\x3e menuconfig \u914d\u7f6e\u7684\u9876\u5c42\u5165\u53e3\n\u2502   \u251c\u2500\u2500 artinchip                        --\x3e ArtInChip \u5f00\u53d1\u7684\u7ec4\u4ef6\u914d\u7f6e\n\u2502   \u251c\u2500\u2500 linux                            --\x3e \u5185\u6838\u7684\u914d\u7f6e\n\u2502   \u251c\u2500\u2500 opensbi                          --\x3e OpenSBI \u7684\u914d\u7f6e\n\u2502   \u251c\u2500\u2500 uboot                            --\x3e UBoot \u7684\u914d\u7f6e\n\u2502   \u251c\u2500\u2500 third-party                      --\x3e \u5176\u4ed6\u5f00\u6e90\u8f6f\u4ef6\u5305\u7684\u914d\u7f6e\n\u2502   \u251c\u2500\u2500 ...\n\u2502\n\u251c\u2500\u2500 prebuilt                             --\x3e \u9884\u7f16\u8bd1\u4e8c\u8fdb\u5236\u5305\u7684\u4fdd\u5b58\u76ee\u5f55\n\u251c\u2500\u2500 source                               --\x3e \u6e90\u7801\u4fdd\u5b58\u76ee\u5f55\n\u2502   \u251c\u2500\u2500 artinchip                        --\x3e ArtInChip \u5f00\u53d1\u7684\u7ec4\u4ef6\u6e90\u7801\u76ee\u5f55\uff08\u4e0d\u4f1a\u5220\u9664\uff09\n\u2502   \u251c\u2500\u2500 linux-5.10                       --\x3e \u5185\u6838\u7684\u6e90\u7801\u76ee\u5f55\uff08\u4e0d\u4f1a\u5220\u9664\uff09\n\u2502   \u251c\u2500\u2500 opensbi                          --\x3e OpenSBI \u7684\u6e90\u7801\u76ee\u5f55\uff08\u4e0d\u4f1a\u5220\u9664\uff09\n\u2502   \u251c\u2500\u2500 uboot-2021.10                    --\x3e U-Boot \u7684\u6e90\u7801\u76ee\u5f55\uff08\u4e0d\u4f1a\u5220\u9664\uff09\n\u2502   \u2514\u2500\u2500 third-party                      --\x3e \u5176\u4ed6\u5f00\u6e90\u8f6f\u4ef6\u5305\u89e3\u538b\u540e\u7684\u6e90\u7801\u76ee\u5f55\uff08make distclean \u4f1a\u5220\u9664\uff09\n\u2502\n\u251c\u2500\u2500 target                               --\x3e \u82af\u7247\u548c\u5177\u4f53\u677f\u5b50\u7684\u914d\u7f6e\n\u2502   \u2514\u2500\u2500 configs                          --\x3e \u5b58\u653e\u9879\u76ee\u7684\u914d\u7f6e\u6587\u4ef6\n\u2502       \u251c\u2500\u2500 d211_initramfs_defconfig\n\u2502       \u251c\u2500\u2500 d211_per1_mmc_defconfig\n\u2502       \u251c\u2500\u2500 d211_per2_spinand_defconfig\n\u2502       \u251c\u2500\u2500 d211_per2_spinor_defconfig\n\u2502       \u251c\u2500\u2500 d211_fpga_mmc_defconfig\n\u2502       \u251c\u2500\u2500 configs_busybox -> ../../package/third-party/busybox/configs/\n\u2502       \u251c\u2500\u2500 configs_linux_arm -> ../../source/linux-5.10/arch/arm/configs/\n\u2502       \u2514\u2500\u2500 configs_uboot -> ../../source/uboot-2021.10/configs/\n\u2502\n\u251c\u2500\u2500 tools                                --\x3e \u8f85\u52a9\u811a\u672c\u548c\u5de5\u5177\n\u2502\u2500\u2500 toolchain                            --\x3e \u7f16\u8bd1\u6240\u4f7f\u7528\u7684 gcc \u5de5\u5177\u94fe\u4fdd\u5b58\u76ee\u5f55\n\u2514\u2500\u2500 Makefile                             --\x3e SDK \u7684\u9876\u5c42 Makefile\n"})}),"\n",(0,i.jsx)(e.p,{children:"\u6ce8\u89e3"}),"\n",(0,i.jsx)(e.p,{children:"third-party, dl, prebuilt \u7684\u5173\u7cfb\uff1a"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"\u5982\u679c\u9009\u62e9\u4e86\u4f7f\u7528\u9884\u7f16\u8bd1\u4e8c\u8fdb\u5236\u5305\uff1a"}),"\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.code,{children:"prebuilt"})," \u2013(extract)\u2013> ",(0,i.jsx)(e.code,{children:"output/build"})," \u2013(install)\u2013> ",(0,i.jsx)(e.code,{children:"output/target(or host)"})]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"\u5982\u679c\u9009\u62e9\u4e86\u4f7f\u7528\u6e90\u7801\u7f16\u8bd1\uff1a"}),"\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.code,{children:"dl"})," \u2013(extract)\u2013> ",(0,i.jsx)(e.code,{children:"source/thrid-party"})," \u2013(build)\u2013> ",(0,i.jsx)(e.code,{children:"output/build"})," \u2013(install)\u2013> ",(0,i.jsx)(e.code,{children:"output/target(or host)"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.p,{children:"\u8f93\u51fa\u76ee\u5f55\u7684\u5173\u952e\u5185\u5bb9\u8bf4\u660e"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"output/\n\u251c\u2500\u2500 build                                        --\x3e \u7f16\u8bd1\u7684\u5de5\u4f5c\u76ee\u5f55\n\u2502   \u251c\u2500\u2500 busybox-1.34.1\n\u2502   \u251c\u2500\u2500 ...\n\u2502\n\u251c\u2500\u2500 host                                         --\x3e \u4e3b\u673a\u5de5\u5177\u7684\u5b89\u88c5\u76ee\u5f55\n\u2502   \u251c\u2500\u2500 arm-linux-gnueabihf/sysroot\n\u2502   \u251c\u2500\u2500 bin\n\u2502   \u251c\u2500\u2500 etc\n\u2502   \u251c\u2500\u2500 include\n\u2502   \u251c\u2500\u2500 lib\n\u2502   \u251c\u2500\u2500 lib64 -> lib\n\u2502   \u251c\u2500\u2500 opt\n\u2502   \u251c\u2500\u2500 sbin\n\u2502   \u251c\u2500\u2500 share\n\u2502   \u2514\u2500\u2500 usr -> .\n\u251c\u2500\u2500 images                                       --\x3e \u6700\u7ec8\u7684\u955c\u50cf\u6587\u4ef6\u8f93\u51fa\u76ee\u5f55\n\u2502   \u251c\u2500\u2500 d211_per1_v1.0.0.img\n\u2502   \u251c\u2500\u2500 ...\n\u2502\n\u251c\u2500\u2500 staging -> host/arm-linux-gnueabihf/sysroot  --\x3e \u4ea4\u53c9\u7f16\u8bd1\u7684\u6682\u5b58\u76ee\u5f55:\u5e93\u4e0e\u5934\u6587\u4ef6\n\u2502   \u251c\u2500\u2500 lib                                      --\x3e \u5bfc\u51fa\u7684\u5e93\uff0c\u7ed9\u5176\u4ed6\u5305\u7f16\u8bd1\u94fe\u63a5\u4f7f\u7528\n\u2502   \u251c\u2500\u2500 usr\n\u2502   \u2502   \u251c\u2500\u2500 include                              --\x3e \u5185\u6838\u5bfc\u51fa\u7684\u5934\u6587\u4ef6\u3001\u5176\u4ed6\u5305\u5bfc\u51fa\u7684\u5934\u6587\u4ef6\n\u2502\n\u251c\u2500\u2500 target                                       --\x3e \u6253\u5305\u5230 RootFS \u4e2d\u7684\u5185\u5bb9\u5b58\u653e\u76ee\u5f55\n\u2502   \u251c\u2500\u2500 bin\n\u2502   \u251c\u2500\u2500 dev\n\u2502   \u251c\u2500\u2500 etc\n\u2502   \u251c\u2500\u2500 init\n\u2502   \u251c\u2500\u2500 lib\n\u2502   \u251c\u2500\u2500 lib32 -> lib\n\u2502   \u251c\u2500\u2500 linuxrc -> bin/busybox\n\u2502   \u251c\u2500\u2500 media\n\u2502   \u251c\u2500\u2500 mnt\n\u2502   \u251c\u2500\u2500 opt\n\u2502   \u251c\u2500\u2500 proc\n\u2502   \u251c\u2500\u2500 root\n\u2502   \u251c\u2500\u2500 run\n\u2502   \u251c\u2500\u2500 sbin\n\u2502   \u251c\u2500\u2500 sys\n\u2502   \u251c\u2500\u2500 THIS_IS_NOT_YOUR_ROOT_FILESYSTEM         --\x3e \u5f53\u524d\u76ee\u5f55\u4e0d\u662f\u6700\u7ec8\u6267\u884c RootFS \u6253\u5305\u7684\u76ee\u5f55\n\u2502   \u251c\u2500\u2500 tmp                                          \u751f\u6210 RootFS \u524d\uff0ctarget \u76ee\u5f55\u7684\u5185\u5bb9\u4f1a\u88ab\u62f7\u8d1d\n\u2502   \u251c\u2500\u2500 usr                                          \u5230 output/luban-fs/ \u76ee\u5f55\u4e0b\u6267\u884c\u6253\u5305\n\u2502   \u2514\u2500\u2500 var\n\u2514\u2500\u2500 userfs                                       --\x3e \u81ea\u5b9a\u4e49\u7684\u6587\u4ef6\u7cfb\u7edf\u76ee\u5f55\n"})})]})}function p(n={}){const{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(u,{...n})}):u(n)}},1151:(n,e,t)=>{t.d(e,{Z:()=>c,a:()=>o});var i=t(7294);const r={},s=i.createContext(r);function o(n){const e=i.useContext(s);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:o(n.components),i.createElement(s.Provider,{value:e},n.children)}}}]);