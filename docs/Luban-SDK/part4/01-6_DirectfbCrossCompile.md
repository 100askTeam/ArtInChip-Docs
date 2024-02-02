---
sidebar_position: 6
---
#  Directfb Cross Compile

Directfb的编译要依赖于libz，libpng，freetype 等，pkgconfig虽然不是强依赖，但其提供的强大的包管理能力， 会让后续的编译容易很多，因此强烈建议编译。

## 1. 环境变量

Directfb及其相关的依赖的编译采用Makefile的方式，因此环境变量的设置采用通用做法

```
export PRFIX=/xxx/QT/install
export CROSS_COMPILE=riscv64-unknown-linux-gnu
export PATH=/xxx/toolchain/d211/bin/:$PATH
export PKG_CONFIG_PATH="${PRFIX}/lib/pkgconfig"

export ARCH=riscv
export AS=riscv64-unknown-linux-gnu-as
export LD=riscv64-unknown-linux-gnu-ld
export CC=riscv64-unknown-linux-gnu-gcc
export GCC=riscv64-unknown-linux-gnu-gcc
export CPP=riscv64-unknown-linux-gnu-cpp
export CXX=riscv64-unknown-linux-gnu-g++
export RANLIB=riscv64-unknown-linux-gnu-ranlib
export NM=riscv64-unknown-linux-gnu-nm
export STRIP=riscv64-unknown-linux-gnu-strip
export OBJCOPY=riscv64-unknown-linux-gnu-objcopy
export OBJDUMP=riscv64-unknown-linux-gnu-objdump

export CPPFLAGS="-I${PRFIX}/include"
export CFLAGS="-I${PRFIX}/include"
export LDFLAGS="-L${PRFIX}/lib"
export LIBPNG_LIBS=-lpng16
```

## 2. 编译pkg config

```
./configure --host=riscv64-unknown-linux-gnu  --prefix=$PRFIX
make
make install
```

## 3. 编译zlib

```
cd zlib-1.2.11
./configure --prefix=$PRFIX
make
make install
```

## 4. 编译libpng

本次使用的libpng版本是1.6，而directfb自己的代码的比较老，因此需要通过上面的LIBPNG_LIBS=-lpng16 指定一下png的版本

```
cd libpng-1.6.37
./configure --target=riscv64-unknown-linux-gnu --host=riscv64-unknown-linux-gnu  --prefix=$PRFIX
make
make install
```

## 5. 编译freetype

freetype是一个字体库引擎，需要libz进行自体库的解码，需要libpng进行自体的渲染，但默认支持的是png1.2版本，因此需要LIBPNG_LIBS=-lpng16 指定使用1.6版本

```
cd freetype-2.10.4
export LIBPNG_LIBS=-lpng16
./configure --target=riscv64-unknown-linux-gnu --host=riscv64-linux-gnu  --prefix=$PRFIX
make
make install
```

## 6. 编译directcb

```
cd DirectFB-1.7.7
export LIBS=-lz
./configure  --host=riscv64-unknown-linux-gnu  --prefix=$PRFIX --disable-gtk-doc \
--disable-gtk-doc-html --disable-docs --disable-documentation \
--with-xmlto=no --with-fop=no --disable-dependency-tracking --enable-ipv6 \
--disable-nls --enable-static --enable-shared --enable-zlib --enable-freetype \
--enable-fbdev --disable-sdl --disable-vnc --disable-osx --disable-video4linux \
--disable-video4linux2 --without-tools --disable-x11 --disable-multi \
--disable-multi-kernel --enable-debug-support --disable-divine --disable-sawman \
--with-gfxdrivers=none --with-inputdrivers=none --disable-gif --disable-tiff \
--disable-png --disable-jpeg --disable-svg --disable-imlib2 --with-dither-rgb16=none
```

