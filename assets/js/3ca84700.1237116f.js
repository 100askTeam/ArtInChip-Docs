"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5473],{2353:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>r,contentTitle:()=>t,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>d});var s=i(5893),a=i(1151);const o={},t="\u4f7f\u7528Tina-SDK\u7f16\u8bd1\u6784\u5efa\u7cfb\u7edf",l={id:"Luban-SDK/part3/TinaSDK_DevelopmentGuide",title:"\u4f7f\u7528Tina-SDK\u7f16\u8bd1\u6784\u5efa\u7cfb\u7edf",description:"\u7b80\u4ecb",source:"@site/docs/Luban-SDK/part3/07-TinaSDK_DevelopmentGuide.md",sourceDirName:"Luban-SDK/part3",slug:"/Luban-SDK/part3/TinaSDK_DevelopmentGuide",permalink:"/docs/Luban-SDK/part3/TinaSDK_DevelopmentGuide",draft:!1,unlisted:!1,editUrl:"https://github.com/100askTeam/ArtInChip-Docs/tree/master/docs/Luban-SDK/part3/07-TinaSDK_DevelopmentGuide.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{},sidebar:"lunbansdkSidebar",previous:{title:"Tina-SDK\u5f00\u53d1",permalink:"/docs/category/tina-sdk\u5f00\u53d1"},next:{title:"\u4f7f\u7528Tina-SDK\u7f16\u8bd1\u6784\u5efaBootloader",permalink:"/docs/Luban-SDK/part3/TinaSDK_BuildBootloader"}},r={},d=[{value:"\u7b80\u4ecb",id:"\u7b80\u4ecb",level:2},{value:"\u83b7\u53d6sdk\u6e90\u7801",id:"\u83b7\u53d6sdk\u6e90\u7801",level:2},{value:"\u5b89\u88c5\u5fc5\u8981\u4f9d\u8d56\u5305",id:"\u5b89\u88c5\u5fc5\u8981\u4f9d\u8d56\u5305",level:2},{value:"ubuntu-18.04",id:"ubuntu-1804",level:3},{value:"\u6700\u5c0f\u7cfb\u7edf\u7f16\u8bd1\u70e7\u5199",id:"\u6700\u5c0f\u7cfb\u7edf\u7f16\u8bd1\u70e7\u5199",level:2},{value:"\u7f16\u8bd1SD\u5361\u6700\u5c0f\u7cfb\u7edf\u955c\u50cf",id:"\u7f16\u8bd1sd\u5361\u6700\u5c0f\u7cfb\u7edf\u955c\u50cf",level:3},{value:"\u70e7\u5199SD\u5361\u6700\u5c0f\u7cfb\u7edf\u955c\u50cf",id:"\u70e7\u5199sd\u5361\u6700\u5c0f\u7cfb\u7edf\u955c\u50cf",level:3}];function c(n){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.h1,{id:"\u4f7f\u7528tina-sdk\u7f16\u8bd1\u6784\u5efa\u7cfb\u7edf",children:"\u4f7f\u7528Tina-SDK\u7f16\u8bd1\u6784\u5efa\u7cfb\u7edf"}),"\n",(0,s.jsx)(e.h2,{id:"\u7b80\u4ecb",children:"\u7b80\u4ecb"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u6b64\u5957\u6784\u5efa\u7cfb\u7edf\u57fa\u4e8e\u5168\u5fd7\u5355\u6838 Arm Cortex-A7 SoC\uff0c\u642d\u8f7d\u4e86 RISC-V E907 \u5185\u6838\u7684V851se  \u82af\u7247\uff0c\u9002\u914d\u4e86Tina 5.0\u4e3b\u7ebf\u7248\u672c\uff0c\u662f\u4e13\u4e3a\u667a\u80fd IP \u6444\u50cf\u673a\u8bbe\u8ba1\u7684\uff0c\u652f\u6301\u4eba\u4f53\u68c0\u6d4b\u548c\u7a7f\u8d8a\u62a5\u8b66\u7b49\u529f\u80fd\u3002"}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"\u83b7\u53d6sdk\u6e90\u7801",children:"\u83b7\u53d6sdk\u6e90\u7801"}),"\n",(0,s.jsx)(e.p,{children:"\u5f00\u59cb\u4e4b\u524d\u6211\u4eec\u9700\u8981\u5148\u83b7\u53d6 \u63d0\u524d\u51c6\u5907\u597d tina-v851se.tar.gz \u538b\u7f29\u5305\uff0c\u538b\u7f29\u5305\u5206\u4e3a\u56fd\u5185\u56fd\u5916\u4e24\u4e2a\u5b58\u653e\u4f4d\u7f6e\uff0c\u5982\u4e0b\u6240\u793a\uff0c\u5927\u5c0f\u5927\u69825.2G\uff0c\u4e0b\u8f7d\u5b8c\u6210\u540e\uff0c\u62f7\u8d1d\u5230\u63d0\u524d\u914d\u7f6e\u597dHost\u5f00\u53d1\u73af\u5883\u7684ubuntu\u7cfb\u7edf\u5185,\u7136\u540e\u4f7f\u7528 tar -xvf tina-v851se.tar.gz \u547d\u4ee4\u8fdb\u884c\u89e3\u538b\u7f29\u3002"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["BaiduYun:   \u94fe\u63a5\uff1a",(0,s.jsx)(e.a,{href:"https://pan.baidu.com/s/1oIqGjCCtvUe0_k_kgXkusw?pwd=0kdr",children:"https://pan.baidu.com/s/1oIqGjCCtvUe0_k_kgXkusw?pwd=0kdr"})," \u63d0\u53d6\u7801\uff1a0kdr"]}),"\n"]}),"\n",(0,s.jsx)(e.p,{children:"\u89e3\u538b\u7f29\u547d\u4ee4"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"tar -xzvf tina-v851se.tar.gz\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u89e3\u538b\u5b8c\u6210\u540e\uff0c\u53ef\u4ee5\u770b\u5230\u591a\u51fa\u6765\u4e00\u4e2a tina-v851\u7684\u6587\u4ef6\u5939"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"book@100ask:~$ cd tina-v851/\nbook@100ask:~/tina-v851$ ls\nbuild      device  external  out       rules.mk  tmp\nconfig     dl      lichee    package   scripts   toolchain\nConfig.in  docs    Makefile  prebuilt  target    tools\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u7531\u4e8e\u9ed8\u8ba4\u7684sdk\u5e76\u672a\u652f\u6301\u6b64\u5f00\u53d1\u677f\uff0c\u6240\u4ee5\u6211\u4eec\u9700\u8981\u652f\u6301\u6b64\u5f00\u53d1\u677f\u7684\u914d\u7f6e \u5355\u72ec\u62f7\u8d1d\u589e\u52a0\u5230tina-v851 sdk\u5185\uff0c\u9996\u5148clone\u6b64\u5f00\u53d1\u677f\u8865\u4e01\u4ed3\u5e93\uff0c\u7136\u540e\u5355\u72ec\u8986\u76d6\u3002"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"book@100ask:~$ git clone  https://github.com/DongshanPI/TinyVision-v851se_TinaSDK\nbook@100ask:~$ cp -rfvd  TinyVision-v851se_TinaSDK/* tina-v851/\n"})}),"\n",(0,s.jsx)(e.h2,{id:"\u5b89\u88c5\u5fc5\u8981\u4f9d\u8d56\u5305",children:"\u5b89\u88c5\u5fc5\u8981\u4f9d\u8d56\u5305"}),"\n",(0,s.jsx)(e.h3,{id:"ubuntu-1804",children:"ubuntu-18.04"}),"\n",(0,s.jsx)(e.p,{children:"\u8fd0\u884c\u73af\u5883\u914d\u7f6e\uff1a \u6b64\u7cfb\u7edf\u57fa\u4e8eubuntu18.04\u8fdb\u884c\u9a8c\u8bc1\uff0c\u5728\u4e4b\u524d\u7684\u57fa\u7840\u4e4b\u4e0a\u8fd8\u9700\u8981\u5b89\u88c5\u4ee5\u4e0b\u5fc5\u8981\u4f9d\u8d56"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-shell",children:" sudo apt-get install build-essential subversion git-core libncurses5-dev zlib1g-dev gawk flex quilt libssl-dev xsltproc libxml-parser-perl mercurial bzr ecj cvs unzip lib32z1 lib32z1-dev lib32stdc++6 libstdc++6 u-boot-tools -y\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u5b89\u88c5\u5b8c\u6210\u540e\uff0c\u6267\u884c\u5982\u4e0b\u547d\u4ee4\u8fdb\u884c\u5f00\u59cb\u7f16\u8bd1\u64cd\u4f5c\u3002"}),"\n",(0,s.jsx)(e.h2,{id:"\u6700\u5c0f\u7cfb\u7edf\u7f16\u8bd1\u70e7\u5199",children:"\u6700\u5c0f\u7cfb\u7edf\u7f16\u8bd1\u70e7\u5199"}),"\n",(0,s.jsx)(e.h3,{id:"\u7f16\u8bd1sd\u5361\u6700\u5c0f\u7cfb\u7edf\u955c\u50cf",children:"\u7f16\u8bd1SD\u5361\u6700\u5c0f\u7cfb\u7edf\u955c\u50cf"}),"\n",(0,s.jsx)(e.p,{children:"\u5efa\u7acb\u7f16\u8bd1\u73af\u5883"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"book@100ask:~/tina-v851$ source build/envsetup.sh \nSetup env done! Please run lunch next.\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u9009\u62e9\u7f16\u8bd1\u7684\u5f00\u53d1\u677f\uff0c\u8f93\u5165lunch"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-shell",children:"book@100ask:~/tina-v851$ lunch\n\nYou're building on Linux\n\nLunch menu... pick a combo:\n     1. v851se_tinyvision-tina\n\nWhich would you like?: 1 #\u6b64\u65f6\u53ef\u4ee5\u8f93\u51651\uff0c\u9009\u62e9tinyvision\u5f00\u53d1\u677f\n============================================\nTINA_BUILD_TOP=/home/book/tina-v851\nTINA_TARGET_ARCH=arm\nTARGET_PRODUCT=v851se_tinyvision\nTARGET_PLATFORM=v851se\nTARGET_BOARD=v851se-tinyvision\nTARGET_PLAN=tinyvision\nTARGET_BUILD_VARIANT=tina\nTARGET_BUILD_TYPE=release\nTARGET_KERNEL_VERSION=4.9\nTARGET_UBOOT=u-boot-2018\nTARGET_CHIP=sun8iw21p1\n============================================\nno buildserver to clean\n[1] 3357\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u9009\u62e9\u5b8c\u6210\u540e\uff0c\u8f93\u5165make\u5f00\u59cb\u7f16\u8bd1"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-shell",children:"book@100ask:~/tina-v851$ make\n===This's tina environment.===\nfind: \u2018/home/book/tina-v851/lichee/brandy-2.0/spl\u2019: No such file or directory\nv851se_tinyvision v851se v851se-tinyvision\nbuild_boot platform:sun8iw21p1 o_option:spl-pub\ngrep: /home/book/tina-v851/lichee/brandy-2.0/spl/Makefile: No such file or directory\nPrepare toolchain ...\n--------build for mode:all board:v851se-------------------\nplatform set to sun8iw21p1\nmake -C /home/book/tina-v851/lichee/brandy-2.0/spl-pub/fes fes\n  CHK     /home/book/tina-v851/lichee/brandy-2.0/spl-pub/include/config.h\n  UPD     /home/book/tina-v851/lichee/brandy-2.0/spl-pub/include/config.h\n  CHK     /home/book/tina-v851/lichee/brandy-2.0/spl-pub/autoconf.mk\n  UPD     /home/book/tina-v851/lichee/brandy-2.0/spl-pub/autoconf.mk\nmake -C /home/book/tina-v851/lichee/brandy-2.0/spl-pub/arch/arm/cpu/armv7/\nmake -C /home/book/tina-v851/lichee/brandy-2.0/spl-pub/fes/main/\n...\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u7b49\u5f85\u7f16\u8bd1\u5b8c\u6210\uff0c\u6b64\u90e8\u5206\u7f16\u8bd1\u65f6\u95f4\u7531\u7535\u8111CPU\u7b49\u51b3\u5b9a\uff0c\u7b2c\u4e00\u6b21\u7f16\u8bd1\u7cfb\u7edf\u7684\u65f6\u95f4\u6bd4\u8f83\u957f\uff0c\u8bf7\u8010\u5fc3\u7b49\u5f85\u3002\u7b49\u5f85\u8f93\u51fa\u7f16\u8bd1Tina OK\u5373\u7f16\u8bd1\u6210\u529f\u3002"}),"\n",(0,s.jsx)(e.p,{children:"\u7f16\u8bd1\u5b8c\u6210\u540e\uff0c\u8f93\u5165pack\uff0c\u53ef\u4ee5\u76f4\u63a5\u5c06\u521a\u521a\u7f16\u8bd1\u5b8c\u6210\u7684\u7cfb\u7edf\u6253\u5305\u751f\u6210\u53ef\u70e7\u5199\u5230\u677f\u8f7dSD\u5361\u4e0a\u7684\u955c\u50cf"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-shell",children:"book@100ask:~/tina-v851$ pack\n...\nragon execute image.cfg SUCCESS !\n----------image is for nand/emmc----------\n----------image is at----------\n\n/home/ubuntu/Downloads/tina-v851/out/v851se-tinyvision/tina_v851se-tinyvision_uart0.img\n\npack finish\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u7b49\u5f85\u6253\u5305\u5b8c\u6210\uff0c\u6253\u5305\u5b8c\u6210\u540e\u53ef\u4ee5\u6839\u636e\u4e0a\u9762\u7684\u8f93\u51fa\u4fe1\u606f\u63d0\u793a\u7684\u76ee\u5f55\u4e0b\u627e\u5230 tina_v851se-tinyvision_uart0.img\u955c\u50cf\uff0c\u5c06\u6b64\u955c\u50cf\u6587\u4ef6\u62f7\u8d1d\u5230Windows\u7535\u8111\u4e2d\u3002"}),"\n",(0,s.jsx)(e.h3,{id:"\u70e7\u5199sd\u5361\u6700\u5c0f\u7cfb\u7edf\u955c\u50cf",children:"\u70e7\u5199SD\u5361\u6700\u5c0f\u7cfb\u7edf\u955c\u50cf"}),"\n",(0,s.jsxs)(e.p,{children:["\u7f16\u8bd1\u5b8c\u6210\u540e\u4f1a\u5728tina-v851/out/v851se-tinyvision/\u76ee\u5f55\u4e0b\u8f93\u51fa tina_v851se-tinyvision_uart0.img \u6587\u4ef6\uff0c\u5c06\u6587\u4ef6\u62f7\u8d1d\u5230Windows\u7cfb\u7edf\u4e0b\u4f7f\u7528 \u4f7f\u7528 \u5168\u5fd7\u5b98\u65b9\u7684  PhoenixCard \u8fdb\u884c\u70e7\u5199\u3002\n\u8be6\u7ec6\u70e7\u5199\u6b65\u9aa4\u8bf7\uff0c\u8bf7\u53c2\u8003\u5de6\u4fa7 ",(0,s.jsx)(e.strong,{children:"\u5feb\u901f\u542f\u52a8"})," \u9875\u9762\u3002"]})]})}function u(n={}){const{wrapper:e}={...(0,a.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(c,{...n})}):c(n)}},1151:(n,e,i)=>{i.d(e,{Z:()=>l,a:()=>t});var s=i(7294);const a={},o=s.createContext(a);function t(n){const e=s.useContext(o);return s.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(a):n.components||a:t(n.components),s.createElement(o.Provider,{value:e},n.children)}}}]);