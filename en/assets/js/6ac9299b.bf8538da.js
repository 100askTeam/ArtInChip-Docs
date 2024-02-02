"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7986],{8092:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>c,contentTitle:()=>o,default:()=>a,frontMatter:()=>l,metadata:()=>s,toc:()=>p});var r=i(5893),t=i(1151);const l={sidebar_position:6},o="Directfb Cross Compile",s={id:"Luban-SDK/part4/01-6_DirectfbCrossCompile",title:"Directfb Cross Compile",description:"Directfb\u7684\u7f16\u8bd1\u8981\u4f9d\u8d56\u4e8elibz\uff0clibpng\uff0cfreetype \u7b49\uff0cpkgconfig\u867d\u7136\u4e0d\u662f\u5f3a\u4f9d\u8d56\uff0c\u4f46\u5176\u63d0\u4f9b\u7684\u5f3a\u5927\u7684\u5305\u7ba1\u7406\u80fd\u529b\uff0c \u4f1a\u8ba9\u540e\u7eed\u7684\u7f16\u8bd1\u5bb9\u6613\u5f88\u591a\uff0c\u56e0\u6b64\u5f3a\u70c8\u5efa\u8bae\u7f16\u8bd1\u3002",source:"@site/docs/Luban-SDK/part4/01-6_DirectfbCrossCompile.md",sourceDirName:"Luban-SDK/part4",slug:"/Luban-SDK/part4/01-6_DirectfbCrossCompile",permalink:"/en/docs/Luban-SDK/part4/01-6_DirectfbCrossCompile",draft:!1,unlisted:!1,editUrl:"https://github.com/100askTeam/ArtInChip-Docs/tree/master/docs/Luban-SDK/part4/01-6_DirectfbCrossCompile.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"lunbansdkSidebar",previous:{title:"QT \u5e94\u7528\u5f00\u53d1",permalink:"/en/docs/Luban-SDK/part4/01-5_QTApplicationDevelopment"},next:{title:"QT + Directfb + GE",permalink:"/en/docs/Luban-SDK/part4/01-7_QT+Directfb+GE"}},c={},p=[{value:"1. \u73af\u5883\u53d8\u91cf",id:"1-\u73af\u5883\u53d8\u91cf",level:2},{value:"2. \u7f16\u8bd1pkg config",id:"2-\u7f16\u8bd1pkg-config",level:2},{value:"3. \u7f16\u8bd1zlib",id:"3-\u7f16\u8bd1zlib",level:2},{value:"4. \u7f16\u8bd1libpng",id:"4-\u7f16\u8bd1libpng",level:2},{value:"5. \u7f16\u8bd1freetype",id:"5-\u7f16\u8bd1freetype",level:2},{value:"6. \u7f16\u8bd1directcb",id:"6-\u7f16\u8bd1directcb",level:2}];function d(n){const e={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,t.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h1,{id:"directfb-cross-compile",children:"Directfb Cross Compile"}),"\n",(0,r.jsx)(e.p,{children:"Directfb\u7684\u7f16\u8bd1\u8981\u4f9d\u8d56\u4e8elibz\uff0clibpng\uff0cfreetype \u7b49\uff0cpkgconfig\u867d\u7136\u4e0d\u662f\u5f3a\u4f9d\u8d56\uff0c\u4f46\u5176\u63d0\u4f9b\u7684\u5f3a\u5927\u7684\u5305\u7ba1\u7406\u80fd\u529b\uff0c \u4f1a\u8ba9\u540e\u7eed\u7684\u7f16\u8bd1\u5bb9\u6613\u5f88\u591a\uff0c\u56e0\u6b64\u5f3a\u70c8\u5efa\u8bae\u7f16\u8bd1\u3002"}),"\n",(0,r.jsx)(e.h2,{id:"1-\u73af\u5883\u53d8\u91cf",children:"1. \u73af\u5883\u53d8\u91cf"}),"\n",(0,r.jsx)(e.p,{children:"Directfb\u53ca\u5176\u76f8\u5173\u7684\u4f9d\u8d56\u7684\u7f16\u8bd1\u91c7\u7528Makefile\u7684\u65b9\u5f0f\uff0c\u56e0\u6b64\u73af\u5883\u53d8\u91cf\u7684\u8bbe\u7f6e\u91c7\u7528\u901a\u7528\u505a\u6cd5"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:'export PRFIX=/xxx/QT/install\nexport CROSS_COMPILE=riscv64-unknown-linux-gnu\nexport PATH=/xxx/toolchain/d211/bin/:$PATH\nexport PKG_CONFIG_PATH="${PRFIX}/lib/pkgconfig"\n\nexport ARCH=riscv\nexport AS=riscv64-unknown-linux-gnu-as\nexport LD=riscv64-unknown-linux-gnu-ld\nexport CC=riscv64-unknown-linux-gnu-gcc\nexport GCC=riscv64-unknown-linux-gnu-gcc\nexport CPP=riscv64-unknown-linux-gnu-cpp\nexport CXX=riscv64-unknown-linux-gnu-g++\nexport RANLIB=riscv64-unknown-linux-gnu-ranlib\nexport NM=riscv64-unknown-linux-gnu-nm\nexport STRIP=riscv64-unknown-linux-gnu-strip\nexport OBJCOPY=riscv64-unknown-linux-gnu-objcopy\nexport OBJDUMP=riscv64-unknown-linux-gnu-objdump\n\nexport CPPFLAGS="-I${PRFIX}/include"\nexport CFLAGS="-I${PRFIX}/include"\nexport LDFLAGS="-L${PRFIX}/lib"\nexport LIBPNG_LIBS=-lpng16\n'})}),"\n",(0,r.jsx)(e.h2,{id:"2-\u7f16\u8bd1pkg-config",children:"2. \u7f16\u8bd1pkg config"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"./configure --host=riscv64-unknown-linux-gnu  --prefix=$PRFIX\nmake\nmake install\n"})}),"\n",(0,r.jsx)(e.h2,{id:"3-\u7f16\u8bd1zlib",children:"3. \u7f16\u8bd1zlib"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"cd zlib-1.2.11\n./configure --prefix=$PRFIX\nmake\nmake install\n"})}),"\n",(0,r.jsx)(e.h2,{id:"4-\u7f16\u8bd1libpng",children:"4. \u7f16\u8bd1libpng"}),"\n",(0,r.jsx)(e.p,{children:"\u672c\u6b21\u4f7f\u7528\u7684libpng\u7248\u672c\u662f1.6\uff0c\u800cdirectfb\u81ea\u5df1\u7684\u4ee3\u7801\u7684\u6bd4\u8f83\u8001\uff0c\u56e0\u6b64\u9700\u8981\u901a\u8fc7\u4e0a\u9762\u7684LIBPNG_LIBS=-lpng16 \u6307\u5b9a\u4e00\u4e0bpng\u7684\u7248\u672c"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"cd libpng-1.6.37\n./configure --target=riscv64-unknown-linux-gnu --host=riscv64-unknown-linux-gnu  --prefix=$PRFIX\nmake\nmake install\n"})}),"\n",(0,r.jsx)(e.h2,{id:"5-\u7f16\u8bd1freetype",children:"5. \u7f16\u8bd1freetype"}),"\n",(0,r.jsx)(e.p,{children:"freetype\u662f\u4e00\u4e2a\u5b57\u4f53\u5e93\u5f15\u64ce\uff0c\u9700\u8981libz\u8fdb\u884c\u81ea\u4f53\u5e93\u7684\u89e3\u7801\uff0c\u9700\u8981libpng\u8fdb\u884c\u81ea\u4f53\u7684\u6e32\u67d3\uff0c\u4f46\u9ed8\u8ba4\u652f\u6301\u7684\u662fpng1.2\u7248\u672c\uff0c\u56e0\u6b64\u9700\u8981LIBPNG_LIBS=-lpng16 \u6307\u5b9a\u4f7f\u75281.6\u7248\u672c"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"cd freetype-2.10.4\nexport LIBPNG_LIBS=-lpng16\n./configure --target=riscv64-unknown-linux-gnu --host=riscv64-linux-gnu  --prefix=$PRFIX\nmake\nmake install\n"})}),"\n",(0,r.jsx)(e.h2,{id:"6-\u7f16\u8bd1directcb",children:"6. \u7f16\u8bd1directcb"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"cd DirectFB-1.7.7\nexport LIBS=-lz\n./configure  --host=riscv64-unknown-linux-gnu  --prefix=$PRFIX --disable-gtk-doc \\\n--disable-gtk-doc-html --disable-docs --disable-documentation \\\n--with-xmlto=no --with-fop=no --disable-dependency-tracking --enable-ipv6 \\\n--disable-nls --enable-static --enable-shared --enable-zlib --enable-freetype \\\n--enable-fbdev --disable-sdl --disable-vnc --disable-osx --disable-video4linux \\\n--disable-video4linux2 --without-tools --disable-x11 --disable-multi \\\n--disable-multi-kernel --enable-debug-support --disable-divine --disable-sawman \\\n--with-gfxdrivers=none --with-inputdrivers=none --disable-gif --disable-tiff \\\n--disable-png --disable-jpeg --disable-svg --disable-imlib2 --with-dither-rgb16=none\n"})})]})}function a(n={}){const{wrapper:e}={...(0,t.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(d,{...n})}):d(n)}},1151:(n,e,i)=>{i.d(e,{Z:()=>s,a:()=>o});var r=i(7294);const t={},l=r.createContext(t);function o(n){const e=r.useContext(l);return r.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function s(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:o(n.components),r.createElement(l.Provider,{value:e},n.children)}}}]);