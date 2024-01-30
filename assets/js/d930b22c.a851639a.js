"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5215],{9503:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>r,contentTitle:()=>o,default:()=>h,frontMatter:()=>a,metadata:()=>l,toc:()=>d});var s=i(5893),t=i(1151);const a={sidebar_position:9},o="TinyVision \u624b\u52a8\u6784\u5efa Linux 6.1 + Debian 12 \u955c\u50cf",l={id:"Luban-SDK/TinyVision_BuildDebian",title:"TinyVision \u624b\u52a8\u6784\u5efa Linux 6.1 + Debian 12 \u955c\u50cf",description:"\u6784\u5efa SyterKit \u4f5c\u4e3a Bootloader",source:"@site/docs/Luban-SDK/09-TinyVision_BuildDebian.md",sourceDirName:"Luban-SDK",slug:"/Luban-SDK/TinyVision_BuildDebian",permalink:"/docs/Luban-SDK/TinyVision_BuildDebian",draft:!1,unlisted:!1,editUrl:"https://github.com/100askTeam/ArtInChip-Docs/tree/master/docs/Luban-SDK/09-TinyVision_BuildDebian.md",tags:[],version:"current",sidebarPosition:9,frontMatter:{sidebar_position:9},sidebar:"lunbansdkSidebar",previous:{title:"Syter\u4fee\u6539Bootargs",permalink:"/docs/Luban-SDK/part6/SyterBootargs"},next:{title:"TinyVision \u4f7f\u7528 SyterKit \u542f\u52a8 Linux 6.7 \u4e3b\u7ebf\u5185\u6838",permalink:"/docs/Luban-SDK/TinyVision_SysterKitBuringKernel"}},r={},d=[{value:"\u6784\u5efa SyterKit \u4f5c\u4e3a Bootloader",id:"\u6784\u5efa-syterkit-\u4f5c\u4e3a-bootloader",level:2},{value:"\u83b7\u53d6 SyterKit \u6e90\u7801",id:"\u83b7\u53d6-syterkit-\u6e90\u7801",level:3},{value:"\u4ece\u96f6\u6784\u5efa SyterKit",id:"\u4ece\u96f6\u6784\u5efa-syterkit",level:3},{value:"\u7f16\u8bd1 Linux-6.1 \u5185\u6838",id:"\u7f16\u8bd1-linux-61-\u5185\u6838",level:2},{value:"\u642d\u5efa\u7f16\u8bd1\u73af\u5883",id:"\u642d\u5efa\u7f16\u8bd1\u73af\u5883",level:3},{value:"\u83b7\u53d6\u5185\u6838\u6e90\u7801",id:"\u83b7\u53d6\u5185\u6838\u6e90\u7801",level:3},{value:"\u914d\u7f6e\u5185\u6838\u9009\u9879",id:"\u914d\u7f6e\u5185\u6838\u9009\u9879",level:3},{value:"\u4f7f\u7528 debootstrap \u6784\u5efa debian rootfs",id:"\u4f7f\u7528-debootstrap-\u6784\u5efa-debian-rootfs",level:2},{value:"\u51c6\u5907\u73af\u5883\uff0c\u4f9d\u8d56",id:"\u51c6\u5907\u73af\u5883\u4f9d\u8d56",level:3},{value:"\u5f00\u59cb\u6784\u5efa\u57fa\u7840 rootfs",id:"\u5f00\u59cb\u6784\u5efa\u57fa\u7840-rootfs",level:3},{value:"\u62f7\u8d1d rootfs \u5230\u955c\u50cf\u4e2d",id:"\u62f7\u8d1d-rootfs-\u5230\u955c\u50cf\u4e2d",level:3},{value:"\u6253\u5305\u56fa\u4ef6",id:"\u6253\u5305\u56fa\u4ef6",level:2},{value:"\u5b89\u88c5 GENIMAGE",id:"\u5b89\u88c5-genimage",level:3},{value:"\u4f7f\u7528 GENIMAGE \u6253\u5305\u56fa\u4ef6",id:"\u4f7f\u7528-genimage-\u6253\u5305\u56fa\u4ef6",level:3}];function c(n){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.h1,{id:"tinyvision-\u624b\u52a8\u6784\u5efa-linux-61--debian-12-\u955c\u50cf",children:"TinyVision \u624b\u52a8\u6784\u5efa Linux 6.1 + Debian 12 \u955c\u50cf"}),"\n",(0,s.jsx)(e.h2,{id:"\u6784\u5efa-syterkit-\u4f5c\u4e3a-bootloader",children:"\u6784\u5efa SyterKit \u4f5c\u4e3a Bootloader"}),"\n",(0,s.jsx)(e.p,{children:"SyterKit \u662f\u4e00\u4e2a\u7eaf\u88f8\u673a\u6846\u67b6\uff0c\u7528\u4e8e TinyVision \u6216\u8005\u5176\u4ed6 v851se/v851s/v851s3/v853 \u7b49\u82af\u7247\u7684\u5f00\u53d1\u677f\uff0cSyterKit \u4f7f\u7528 CMake \u4f5c\u4e3a\u6784\u5efa\u7cfb\u7edf\u6784\u5efa\uff0c\u652f\u6301\u591a\u79cd\u5e94\u7528\u4e0e\u591a\u79cd\u5916\u8bbe\u9a71\u52a8\u3002\u540c\u65f6 SyterKit \u4e5f\u5177\u6709\u542f\u52a8\u5f15\u5bfc\u7684\u529f\u80fd\uff0c\u53ef\u4ee5\u66ff\u4ee3 U-Boot \u5b9e\u73b0\u5feb\u901f\u542f\u52a8"}),"\n",(0,s.jsx)(e.h3,{id:"\u83b7\u53d6-syterkit-\u6e90\u7801",children:"\u83b7\u53d6 SyterKit \u6e90\u7801"}),"\n",(0,s.jsx)(e.p,{children:"SyterKit \u6e90\u7801\u4f4d\u4e8eGitHub\uff0c\u53ef\u4ee5\u524d\u5f80\u4e0b\u8f7d\u3002"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-shell",children:"git clone https://github.com/YuzukiHD/SyterKit.git\n"})}),"\n",(0,s.jsx)(e.h3,{id:"\u4ece\u96f6\u6784\u5efa-syterkit",children:"\u4ece\u96f6\u6784\u5efa SyterKit"}),"\n",(0,s.jsx)(e.p,{children:"\u6784\u5efa SyterKit \u975e\u5e38\u7b80\u5355\uff0c\u53ea\u9700\u8981\u5728 Linux \u64cd\u4f5c\u7cfb\u7edf\u4e2d\u5b89\u88c5\u914d\u7f6e\u73af\u5883\u5373\u53ef\u7f16\u8bd1\u3002SyterKit \u9700\u8981\u7684\u8f6f\u4ef6\u5305\u6709\uff1a"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"gcc-arm-none-eabi"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"CMake"})}),"\n"]}),"\n",(0,s.jsx)(e.p,{children:"\u5bf9\u4e8e\u5e38\u7528\u7684 Ubuntu \u7cfb\u7edf\uff0c\u53ef\u4ee5\u901a\u8fc7\u5982\u4e0b\u547d\u4ee4\u5b89\u88c5"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-shell",children:"sudo apt-get update\nsudo apt-get install gcc-arm-none-eabi cmake build-essential -y\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u7136\u540e\u65b0\u5efa\u4e00\u4e2a\u6587\u4ef6\u5939\u5b58\u653e\u7f16\u8bd1\u7684\u8f93\u51fa\u6587\u4ef6\uff0c\u5e76\u4e14\u8fdb\u5165\u8fd9\u4e2a\u6587\u4ef6\u5939"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-shell",children:"mkdir build\ncd build\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u7136\u540e\u8fd0\u884c\u547d\u4ee4\u7f16\u8bd1 SyterKit"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-shell",children:"cmake ..\nmake\n"})}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{src:"https://photos.100ask.net/dongshanpi/TinyVision/yuzukihd/1702729920306-f6cd8396-6b9e-4171-a32f-b6e908fa1fb9-image.png",alt:"f6cd8396-6b9e-4171-a32f-b6e908fa1fb9-image.png"})}),"\n",(0,s.jsxs)(e.p,{children:["\u7f16\u8bd1\u540e\u7684\u53ef\u6267\u884c\u6587\u4ef6\u4f4d\u4e8e ",(0,s.jsx)(e.code,{children:"build/app"})," \u4e2d\uff0c\u8fd9\u91cc\u5305\u62ec SyterKit \u7684\u591a\u79cdAPP\u53ef\u4f9b\u4f7f\u7528\u3002"]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{src:"https://photos.100ask.net/dongshanpi/TinyVision/yuzukihd/1702729933404-ecd7330e-1281-4296-9de7-0433e12fef2f-image.png",alt:"ecd7330e-1281-4296-9de7-0433e12fef2f-image.png"})}),"\n",(0,s.jsxs)(e.p,{children:["\u8fd9\u91cc\u6211\u4eec\u4f7f\u7528\u7684\u662f ",(0,s.jsx)(e.code,{children:"syter_boot"})," \u4f5c\u4e3a\u542f\u52a8\u5f15\u5bfc\u3002\u8fdb\u5165 syter_boot \u6587\u4ef6\u5939\uff0c\u53ef\u4ee5\u770b\u5230\u8fd9\u4e9b\u6587\u4ef6"]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{src:"https://photos.100ask.net/dongshanpi/TinyVision/yuzukihd/1702729955121-d631adb8-9d69-4f38-99f4-f080a3d04cc4-image.png",alt:"d631adb8-9d69-4f38-99f4-f080a3d04cc4-image.png"})}),"\n",(0,s.jsxs)(e.p,{children:["\u7531\u4e8e TinyVision \u662f TF \u5361\u542f\u52a8\uff0c\u6240\u4ee5\u6211\u4eec\u9700\u8981\u7528\u5230 ",(0,s.jsx)(e.code,{children:"syter_boot_bin_card.bin"})]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{src:"https://photos.100ask.net/dongshanpi/TinyVision/yuzukihd/1702729964449-0bee1188-3372-4a0a-94c3-5ae19322eab3-image.png",alt:"0bee1188-3372-4a0a-94c3-5ae19322eab3-image.png"})}),"\n",(0,s.jsx)(e.h2,{id:"\u7f16\u8bd1-linux-61-\u5185\u6838",children:"\u7f16\u8bd1 Linux-6.1 \u5185\u6838"}),"\n",(0,s.jsx)(e.p,{children:"\u7531\u4e8e Debian 12 \u914d\u5957\u7684\u5185\u6838\u662f Linux 6.1 LTS\uff0c\u6240\u4ee5\u8fd9\u91cc\u6211\u4eec\u9009\u62e9\u6784\u5efa Linux 6.1 \u7248\u672c\u5185\u6838\u3002"}),"\n",(0,s.jsx)(e.h3,{id:"\u642d\u5efa\u7f16\u8bd1\u73af\u5883",children:"\u642d\u5efa\u7f16\u8bd1\u73af\u5883"}),"\n",(0,s.jsx)(e.p,{children:"\u5b89\u88c5\u4e00\u4e9b\u5fc5\u8981\u7684\u5b89\u88c5\u5305"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-plaintext",children:"sudo apt-get update && sudo apt-get install -y gcc-arm-none-eabi gcc-arm-linux-gnueabihf g++-arm-linux-gnueabihf build-essential libncurses5-dev zlib1g-dev gawk flex bison quilt libssl-dev xsltproc libxml-parser-perl mercurial bzr ecj cvs unzip lsof\n"})}),"\n",(0,s.jsx)(e.h3,{id:"\u83b7\u53d6\u5185\u6838\u6e90\u7801",children:"\u83b7\u53d6\u5185\u6838\u6e90\u7801"}),"\n",(0,s.jsxs)(e.p,{children:["\u5185\u6838\u6e90\u7801\u6258\u7ba1\u5728 Github \u4e0a\uff0c\u53ef\u4ee5\u76f4\u63a5\u83b7\u53d6\u5230\uff0c\u8fd9\u91cc\u4f7f\u7528 ",(0,s.jsx)(e.code,{children:"--depth=1"})," \u6307\u5b9a git \u6df1\u5ea6\u4e3a 1 \u52a0\u901f\u4e0b\u8f7d\u3002"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-plaintext",children:"git clone http://github.com/YuzukiHD/TinyVision --depth=1\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u7136\u540e\u8fdb\u5165\u5185\u6838\u6587\u4ef6\u5939"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-plaintext",children:"cd kernel/linux-6.1\n"})}),"\n",(0,s.jsx)(e.h3,{id:"\u914d\u7f6e\u5185\u6838\u9009\u9879",children:"\u914d\u7f6e\u5185\u6838\u9009\u9879"}),"\n",(0,s.jsx)(e.p,{children:"\u5e94\u7528 defconfig"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-plaintext",children:"CROSS_COMPILE=arm-linux-gnueabihf- make ARCH=arm tinyvision_defconfig\n"})}),"\n",(0,s.jsxs)(e.p,{children:["\u8fdb\u5165 ",(0,s.jsx)(e.code,{children:"menuconfig"})," \u914d\u7f6e\u9009\u9879"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-plaintext",children:"CROSS_COMPILE=arm-linux-gnueabihf- make ARCH=arm menuconfig\n"})}),"\n",(0,s.jsxs)(e.p,{children:["\u8fdb\u5165 ",(0,s.jsx)(e.code,{children:"General Setup ->"}),"\uff0c\u9009\u4e2d ",(0,s.jsx)(e.code,{children:"Control Group Support"})]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{src:"https://photos.100ask.net/dongshanpi/TinyVision/yuzukihd/image-20231221104449523.png",alt:"image-20231221104449523"})}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{src:"https://photos.100ask.net/dongshanpi/TinyVision/yuzukihd/image-20231221122711591.png",alt:"image-20231221122711591"})}),"\n",(0,s.jsxs)(e.p,{children:["\u524d\u5f80 ",(0,s.jsx)(e.code,{children:"File Systems"})," \u627e\u5230 ",(0,s.jsx)(e.code,{children:"FUSE (Filesystem in Userspace) support"})]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{src:"https://photos.100ask.net/dongshanpi/TinyVision/yuzukihd/image-20231221104607368.png",alt:"image-20231221104607368"})}),"\n",(0,s.jsxs)(e.p,{children:["\u524d\u5f80 ",(0,s.jsx)(e.code,{children:"File Systems"})," \u627e\u5230 ",(0,s.jsx)(e.code,{children:"Inotify support for userspace"})]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{src:"https://photos.100ask.net/dongshanpi/TinyVision/yuzukihd/image-20231221122848948.png",alt:"image-20231221122848948"})}),"\n",(0,s.jsx)(e.p,{children:"\u7f16\u8bd1\u5185\u6838"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-plaintext",children:"CROSS_COMPILE=arm-linux-gnueabihf- make ARCH=arm\n"})}),"\n",(0,s.jsx)(e.h2,{id:"\u4f7f\u7528-debootstrap-\u6784\u5efa-debian-rootfs",children:"\u4f7f\u7528 debootstrap \u6784\u5efa debian rootfs"}),"\n",(0,s.jsx)(e.h3,{id:"\u51c6\u5907\u73af\u5883\u4f9d\u8d56",children:"\u51c6\u5907\u73af\u5883\uff0c\u4f9d\u8d56"}),"\n",(0,s.jsx)(e.p,{children:"\u4e0b\u8f7d\u5b89\u88c5\u4f9d\u8d56\u73af\u5883"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-plaintext",children:"sudo apt install debootstrap qemu qemu-user-static qemu-system qemu-utils qemu-system-misc binfmt-support dpkg-cross debian-ports-archive-keyring --no-install-recommends\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u751f\u6210\u76ee\u6807\u955c\u50cf\uff0c\u914d\u7f6e\u73af\u5883\uff0c\u8fd9\u91cc\u6211\u4eec\u751f\u6210\u4e00\u4e2a 1024M \u7684\u955c\u50cf\u6587\u4ef6\u7528\u4e8e\u5b58\u653e rootfs"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-shell",children:"dd if=/dev/zero of=rootfs.img bs=1M count=1024\nmkdir rootfs\nmkfs.ext4 rootfs.img\nsudo mount rootfs.img rootfs\n"})}),"\n",(0,s.jsx)(e.h3,{id:"\u5f00\u59cb\u6784\u5efa\u57fa\u7840-rootfs",children:"\u5f00\u59cb\u6784\u5efa\u57fa\u7840 rootfs"}),"\n",(0,s.jsx)(e.p,{children:"\u8fd9\u91cc\u6211\u4eec\u9009\u62e9\u6700\u65b0\u7684 debian12 (bookwarm) \u4f5c\u4e3a\u76ee\u6807\u955c\u50cf\uff0c\u4f7f\u7528\u6e05\u534e\u6e90\u6765\u6784\u5efa\uff0c\u8f93\u51fa\u5230\u76ee\u6807\u76ee\u5f55 rootfs_data \u6587\u4ef6\u5939\u4e2d\u3002\u65b0\u7248\u672c\u7684 debootstrap \u53ea\u9700\u8981\u8fd0\u884c\u4e00\u6b21\u5373\u53ef\u5b8c\u6210\u4e24\u6b21 stage \u7684\u64cd\u4f5c\uff0c\u76f8\u8f83\u4e8e\u8001\u7248\u672c\u65b9\u4fbf\u8bb8\u591a\u3002"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-shell",children:"sudo debootstrap --arch=armhf bookworm rootfs_data https://mirrors.tuna.tsinghua.edu.cn/debian/\n"})}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{src:"https://photos.100ask.net/dongshanpi/TinyVision/yuzukihd/image-20231221093653561.png",alt:"image-20231221093653561"})}),"\n",(0,s.jsxs)(e.p,{children:["\u770b\u5230 ",(0,s.jsx)(e.code,{children:"I: Base system installed successfully."})," \u5c31\u662f\u6784\u5efa\u5b8c\u6210\u4e86"]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{src:"https://photos.100ask.net/dongshanpi/TinyVision/yuzukihd/image-20231221094602269.png",alt:"image-20231221094602269"})}),"\n",(0,s.jsxs)(e.p,{children:["\u7b49\u5f85\u6784\u5efa\u5b8c\u6210\u540e\uff0c\u4f7f\u7528chroot\u8fdb\u5165\u5230\u76ee\u5f55\uff0c\u8fd9\u91cc\u7f16\u5199\u4e00\u4e2a\u6302\u8f7d\u811a\u672c\u65b9\u4fbf\u6302\u8f7d\u4f7f\u7528\uff0c\u65b0\u5efa\u6587\u4ef6 ",(0,s.jsx)(e.code,{children:"ch-mount.sh"})," \u5e76\u5199\u5165\u4ee5\u4e0b\u5185\u5bb9\uff1a"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:'#!/bin/bash\n\nfunction mnt() {\n    echo "MOUNTING"\n    sudo mount -t proc /proc ${2}proc\n    sudo mount -t sysfs /sys ${2}sys\n    sudo mount -o bind /dev ${2}dev\n    sudo mount -o bind /dev/pts ${2}dev/pts\t\t\n    sudo chroot ${2}\n}\n\nfunction umnt() {\n    echo "UNMOUNTING"\n    sudo umount ${2}proc\n    sudo umount ${2}sys\n    sudo umount ${2}dev/pts\n    sudo umount ${2}dev\n\n}\n\nif [ "$1" == "-m" ] && [ -n "$2" ] ;\nthen\n    mnt $1 $2\nelif [ "$1" == "-u" ] && [ -n "$2" ];\nthen\n    umnt $1 $2\nelse\n    echo ""\n    echo "Either 1\'st, 2\'nd or both parameters were missing"\n    echo ""\n    echo "1\'st parameter can be one of these: -m(mount) OR -u(umount)"\n    echo "2\'nd parameter is the full path of rootfs directory(with trailing \'/\')"\n    echo ""\n    echo "For example: ch-mount -m /media/sdcard/"\n    echo ""\n    echo 1st parameter : ${1}\n    echo 2nd parameter : ${2}\nfi\n'})}),"\n",(0,s.jsx)(e.p,{children:"\u7136\u540e\u8d4b\u4e88\u811a\u672c\u6267\u884c\u7684\u6743\u9650"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-shell",children:"chmod 777 ch-mount.sh\n"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u4f7f\u7528 ",(0,s.jsx)(e.code,{children:"./ch-mount.sh -m rootfs_data"})," \u6302\u8f7d"]}),"\n",(0,s.jsxs)(e.li,{children:["\u4f7f\u7528 ",(0,s.jsx)(e.code,{children:"./ch-mount.sh -u rootfs_data"})," \u5378\u8f7d"]}),"\n"]}),"\n",(0,s.jsx)(e.p,{children:"\u6267\u884c\u6302\u8f7d\uff0c\u53ef\u4ee5\u770b\u5230\u8fdb\u5165\u4e86 debian \u7684 rootfs"}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{src:"https://photos.100ask.net/dongshanpi/TinyVision/yuzukihd/image-20231221094725953.png",alt:"image-20231221094725953"})}),"\n",(0,s.jsx)(e.p,{children:"\u914d\u7f6e\u7cfb\u7edf\u5b57\u7b26\u96c6\uff0c\u9009\u62e9 en_US \u4f5c\u4e3a\u9ed8\u8ba4\u5b57\u7b26\u96c6"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-shell",children:"export LC_ALL=en_US.UTF-8\napt-get install locales\ndpkg-reconfigure locales\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u9009\u62e9\u4e00\u4e2a\u5c31\u53ef\u4ee5"}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{src:"https://photos.100ask.net/dongshanpi/TinyVision/yuzukihd/image-20231221095332517.png",alt:"image-20231221095332517"})}),"\n",(0,s.jsx)(e.p,{children:"\u76f4\u63a5 OK \u4e0b\u4e00\u6b65"}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{src:"https://photos.100ask.net/dongshanpi/TinyVision/yuzukihd/image-20231221095409399.png",alt:"image-20231221095409399"})}),"\n",(0,s.jsx)(e.p,{children:"\u5b89\u88c5 Linux \u57fa\u7840\u5de5\u5177"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-plaintext",children:"apt install sudo ssh openssh-server net-tools ethtool wireless-tools network-manager iputils-ping rsyslog alsa-utils bash-completion gnupg busybox kmod wget git curl --no-install-recommends\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u5b89\u88c5\u7f16\u8bd1\u5de5\u5177"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"apt install build-essential\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u5b89\u88c5 Linux nerd \u5de5\u5177"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-plaintext",children:"apt install vim nano neofetch\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u8bbe\u7f6e\u672c\u673a\u5165\u53e3 ip \u5730\u5740"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-plaintext",children:"cat <<EOF > /etc/hosts\n127.0.0.1       localhost\n127.0.1.1       $HOST\n::1             localhost ip6-localhost ip6-loopback\nff02::1         ip6-allnodes\nff02::2         ip6-allrouters\nEOF\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u914d\u7f6e\u7f51\u5361"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-plaintext",children:"mkdir -p /etc/network\ncat >/etc/network/interfaces <<EOF\nauto lo\niface lo inet loopback\n\nauto eth0\niface eth0 inet dhcp\nEOF\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u914d\u7f6e DNS \u5730\u5740"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-plaintext",children:"cat >/etc/resolv.conf <<EOF\nnameserver 1.1.1.1\nnameserver 8.8.8.8\nEOF\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u914d\u7f6e\u5206\u533a"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-plaintext",children:"cat >/etc/fstab <<EOF\n#<file system> <mount point>   <type>  <options>       <dump>  <pass>\n/dev/mmcblk0p1  /boot   vfat    defaults                0       0\n/dev/mmcblk0p2  /       ext4    defaults,noatime        0       1\nEOF\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u914d\u7f6e root \u5bc6\u7801"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-plaintext",children:"passwd\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u914d\u7f6e\u4e3b\u673a\u540d"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-plaintext",children:"echo TinyVision > /etc/hostname\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u9000\u51fa chroot"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-plaintext",children:"exit\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u53d6\u6d88\u6302\u8f7d chroot"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-plaintext",children:"./ch-mount.sh -u rootfs_data/\n"})}),"\n",(0,s.jsx)(e.h3,{id:"\u62f7\u8d1d-rootfs-\u5230\u955c\u50cf\u4e2d",children:"\u62f7\u8d1d rootfs \u5230\u955c\u50cf\u4e2d"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-plaintext",children:"sudo cp -raf rootfs_data/* rootfs\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u53d6\u6d88\u6302\u8f7d"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-plaintext",children:"sudo umount rootfs\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u81f3\u6b64 debian rootfs \u5c31\u5236\u4f5c\u597d\u4e86\u3002"}),"\n",(0,s.jsx)(e.h2,{id:"\u6253\u5305\u56fa\u4ef6",children:"\u6253\u5305\u56fa\u4ef6"}),"\n",(0,s.jsx)(e.p,{children:"\u7f16\u8bd1\u5b8c\u6210 bootloader\uff0c\u5185\u6838\uff0crootfs \u540e\uff0c\u8fd8\u9700\u8981\u6253\u5305\u56fa\u4ef6\u6210\u4e3a\u53ef\u4ee5 dd \u5199\u5165\u7684\u56fa\u4ef6\uff0c\u8fd9\u91cc\u6211\u4eec\u4f7f\u7528 genimage \u5de5\u5177\u6765\u751f\u6210\u6784\u5efa\u3002"}),"\n",(0,s.jsx)(e.h1,{id:"\u751f\u6210\u5237\u673a\u955c\u50cf",children:"\u751f\u6210\u5237\u673a\u955c\u50cf"}),"\n",(0,s.jsxs)(e.p,{children:["\u7f16\u8bd1\u5185\u6838\u540e\uff0c\u53ef\u4ee5\u5728\u6587\u4ef6\u5939 ",(0,s.jsx)(e.code,{children:"arch/arm/boot/dts/allwinner"})," \u751f\u6210",(0,s.jsx)(e.code,{children:"sun8i-v851se-tinyvision.dtb"})," \uff0c\u5728\u6587\u4ef6\u5939",(0,s.jsx)(e.code,{children:"arch/arm/boot"})," \u751f\u6210 ",(0,s.jsx)(e.code,{children:"zImage"})," \uff0c\u628a\u4ed6\u4eec\u62f7\u8d1d\u51fa\u6765\u3002"]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{src:"https://photos.100ask.net/dongshanpi/TinyVision/yuzukihd/1702731217300-33140ec9-fd56-4cef-9250-ffa210b74178.png",alt:"33140ec9-fd56-4cef-9250-ffa210b74178.png"})}),"\n",(0,s.jsxs)(e.p,{children:["\u7136\u540e\u5c06 ",(0,s.jsx)(e.code,{children:"sun8i-v851se-tinyvision.dtb"})," \u6539\u540d\u4e3a ",(0,s.jsx)(e.code,{children:"sunxi.dtb"})," \uff0c\u8fd9\u4e2a\u8bbe\u5907\u6811\u540d\u79f0\u662f\u5b9a\u4e49\u5728 SyterKit \u6e90\u7801\u4e2d\u7684\uff0c\u5982\u679c\u4e4b\u524d\u4fee\u6539\u4e86 SyterKit \u7684\u6e90\u7801\u9700\u8981\u4fee\u6539\u5230\u5bf9\u5e94\u7684\u540d\u79f0\uff0cSyterKit \u4f1a\u53bb\u8bfb\u53d6\u8fd9\u4e2a\u8bbe\u5907\u6811\u3002"]}),"\n",(0,s.jsxs)(e.p,{children:["\u7136\u540e\u7f16\u5199\u4e00\u4e2a ",(0,s.jsx)(e.code,{children:"config.txt"})," \u4f5c\u4e3a\u914d\u7f6e\u6587\u4ef6"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-plaintext",children:"[configs]\nbootargs=root=/dev/mmcblk0p2 earlyprintk=sunxi-uart,0x02500000 loglevel=2 initcall_debug=0 rootwait console=ttyS0 init=/sbin/init\nmac_addr=4a:13:e4:f9:79:75\nbootdelay=3\n"})}),"\n",(0,s.jsx)(e.h3,{id:"\u5b89\u88c5-genimage",children:"\u5b89\u88c5 GENIMAGE"}),"\n",(0,s.jsx)(e.p,{children:"\u8fd9\u91cc\u6211\u4eec\u4f7f\u7528 genimage \u4f5c\u4e3a\u6253\u5305\u5de5\u5177"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-plaintext",children:"sudo apt-get install libconfuse-dev #\u5b89\u88c5genimage\u4f9d\u8d56\u5e93\nsudo apt-get install genext2fs      # \u5236\u4f5c\u955c\u50cf\u65f6genimage\u5c06\u4f1a\u7528\u5230\ngit clone https://github.com/pengutronix/genimage.git\ncd genimage\n./autogen.sh                        # \u914d\u7f6e\u751f\u6210configure\n./configure                         # \u914d\u7f6e\u751f\u6210makefile\nmake\nsudo make install\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u7f16\u8bd1\u540e\u8fd0\u884c\u8bd5\u4e00\u8bd5\uff0c\u8fd9\u91cc\u6b63\u5e38"}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{src:"https://photos.100ask.net/dongshanpi/TinyVision/yuzukihd/1702731225454-8dd643b9-5f40-4b9e-a355-457fd80d8c5b.png",alt:"8dd643b9-5f40-4b9e-a355-457fd80d8c5b.png"})}),"\n",(0,s.jsx)(e.h3,{id:"\u4f7f\u7528-genimage-\u6253\u5305\u56fa\u4ef6",children:"\u4f7f\u7528 GENIMAGE \u6253\u5305\u56fa\u4ef6"}),"\n",(0,s.jsx)(e.p,{children:"\u7f16\u5199 genimage.cfg \u4f5c\u4e3a\u6253\u5305\u7684\u914d\u7f6e"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-cfg",children:'image boot.vfat {\n\tvfat {\n\t\tfiles = {\n\t\t\t"zImage",\n\t\t\t"sunxi.dtb",\n\t\t\t"config.txt"\n\t\t}\n\t}\n\tsize = 32M\n}\n\nimage sdcard.img {\n\thdimage {}\n\n\tpartition boot0 {\n\t\tin-partition-table = "no"\n\t\timage = "syter_boot_bin_card.bin"\n\t\toffset = 8K\n\t}\n\n\tpartition boot0-gpt {\n\t\tin-partition-table = "no"\n\t\timage = "syter_boot_bin_card.bin"\n\t\toffset = 128K\n\t}\n\n\tpartition kernel {\n\t\tpartition-type = 0xC\n\t\tbootable = "true"\n\t\timage = "boot.vfat"\n\t}\n\t\n\tpartition rootfs {\n\t\tpartition-type = 0x83\n\t\tbootable = "true"\n\t\timage = "rootfs.img"\n\t}\n}\n'})}),"\n",(0,s.jsxs)(e.p,{children:["\u7531\u4e8egenimage\u7684\u811a\u672c\u6bd4\u8f83\u590d\u6742\uff0c\u6240\u4ee5\u7f16\u5199\u4e00\u4e2a ",(0,s.jsx)(e.code,{children:"genimage.sh"})," \u4f5c\u4e3a\u7b80\u6613\u4f7f\u7528\u7684\u5de5\u5177"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-sh",children:'#!/usr/bin/env bash\n\ndie() {\n  cat <<EOF >&2\nError: $@\n\nUsage: ${0} -c GENIMAGE_CONFIG_FILE\nEOF\n  exit 1\n}\n\n# Parse arguments and put into argument list of the script\nopts="$(getopt -n "${0##*/}" -o c: -- "$@")" || exit $?\neval set -- "$opts"\n\nGENIMAGE_TMP="${BUILD_DIR}/genimage.tmp"\n\nwhile true ; do\n\tcase "$1" in\n\t-c)\n\t  GENIMAGE_CFG="${2}";\n\t  shift 2 ;;\n\t--) # Discard all non-option parameters\n\t  shift 1;\n\t  break ;;\n\t*)\n\t  die "unknown option \'${1}\'" ;;\n\tesac\ndone\n\n[ -n "${GENIMAGE_CFG}" ] || die "Missing argument"\n\n# Pass an empty rootpath. genimage makes a full copy of the given rootpath to\n# ${GENIMAGE_TMP}/root so passing TARGET_DIR would be a waste of time and disk\n# space. We don\'t rely on genimage to build the rootfs image, just to insert a\n# pre-built one in the disk image.\n\ntrap \'rm -rf "${ROOTPATH_TMP}"\' EXIT\nROOTPATH_TMP="$(mktemp -d)"\nGENIMAGE_TMP="$(mktemp -d)"\nrm -rf "${GENIMAGE_TMP}"\n\ngenimage \\\n\t--rootpath "${ROOTPATH_TMP}"     \\\n\t--tmppath "${GENIMAGE_TMP}"    \\\n\t--inputpath "${BINARIES_DIR}"  \\\n\t--outputpath "${BINARIES_DIR}" \\\n\t--config "${GENIMAGE_CFG}"\n'})}),"\n",(0,s.jsx)(e.p,{children:"\u51c6\u5907\u5b8c\u6210\uff0c\u6587\u4ef6\u5982\u4e0b\u6240\u793a"}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{src:"https://photos.100ask.net/dongshanpi/TinyVision/yuzukihd/1702731236382-8986491d-003b-479e-9ef0-01f3c93ca43c.png",alt:"8986491d-003b-479e-9ef0-01f3c93ca43c.png"})}),"\n",(0,s.jsx)(e.p,{children:"\u8fd0\u884c\u547d\u4ee4\u8fdb\u884c\u6253\u5305"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-plaintext",children:"chmod 777 genimage.sh\n./genimage.sh -c genimage.cfg\n"})}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{src:"https://photos.100ask.net/dongshanpi/TinyVision/yuzukihd/1702731309228-1ad6cdd4-59b6-4089-a5f4-2aac0e3538ef.png",alt:"1ad6cdd4-59b6-4089-a5f4-2aac0e3538ef.png"})}),"\n",(0,s.jsxs)(e.p,{children:["\u6253\u5305\u5b8c\u6210\uff0c\u53ef\u4ee5\u627e\u5230 ",(0,s.jsx)(e.code,{children:"sdcard.img"})]}),"\n",(0,s.jsx)(e.p,{children:"\u4f7f\u7528\u8f6f\u4ef6\u70e7\u5f55\u56fa\u4ef6\u5230TF\u5361\u4e0a"}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{src:"https://photos.100ask.net/dongshanpi/TinyVision/yuzukihd/1702731317182-d06e037d-102f-46cc-80c1-49b47f72b8b1.png",alt:"d06e037d-102f-46cc-80c1-49b47f72b8b1.png"})})]})}function h(n={}){const{wrapper:e}={...(0,t.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(c,{...n})}):c(n)}},1151:(n,e,i)=>{i.d(e,{Z:()=>l,a:()=>o});var s=i(7294);const t={},a=s.createContext(t);function o(n){const e=s.useContext(a);return s.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:o(n.components),s.createElement(a.Provider,{value:e},n.children)}}}]);