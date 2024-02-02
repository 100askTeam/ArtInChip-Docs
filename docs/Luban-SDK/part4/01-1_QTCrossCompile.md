---
sidebar_position: 1
---
#  QT Cross Compile

# 1. 建立git仓库进行跟踪[¶](#git)

因为在编译的时候会对QT 进行部分的代码修改，建立仓库可以很好的跟踪修改记录

.gitignore 会把一些不需要的中间文件不进行跟踪

```
git init
git add *
vim .gitignore
git add .gitignore
git commit -m "init"

cat .gitignore
*.a
*.asn1.[ch]
*.bin
*.bz2
*.dwo
*.elf
*.gcno
*.gz
*.i
*.ko
*.lex.c
*.ll
*.lst
*.lz4
*.lzma
*.lzo
*.o
*.o.*
*.s
*.so
*.so.dbg
```

# 2. 配置编译工具链[¶](#id1)

工具链的配置建议使用qt提供的qmake机制进行配置，配置文件在mkspecs/qws目录下，通过两个文件完成配置

```
cd mkspecs/qws/
cp -r linux-arm-gnueabi-g++ linux-riscv-gnueabi-g++
cd linux-riscv-gnu-g++/
```

## 2.1. qplatformdefs.h[¶](#qplatformdefs-h)

- QT 代码本身兼容32位和64位，因此对于64位CPU，不需要进行过多的设置
- qplatformdefs进行一些基础的数据变量的定义，如type，ipc等，和linux平台的关联性更强，和arm riscv 的关联性没有

```
cat qplatformdefs.h
#include "../../linux-g++-64/qplatformdefs.h"

cat ../../linux-g++-64/qplatformdefs.h
#include "../linux-g++/qplatformdefs.h"
```

## 2.2. qmake.conf[¶](#qmake-conf)

- qmake 配置了交叉编译的工具链信息，是交叉编译的主要
- qmake 并没有指定工具链的路径，因此需要编译前把路径手工加入到PATH环境变量
- export PATH=/xxx/d211/bin/:$PATH
- 包含工具参数的定义：QMAKE_COPY = cp -f
- qws.conf中定义基础功能：QT += core gui network

```
#
# qmake configuration for building with arm-none-linux-gnueabi-g++
#

include(../../common/linux.conf)
include(../../common/gcc-base-unix.conf)
include(../../common/g++-unix.conf)
include(../../common/qws.conf)

# modifications to g++.conf
QMAKE_CC                = riscv64-unknown-linux-gnu-gcc
QMAKE_CXX               = riscv64-unknown-linux-gnu-g++
QMAKE_LINK              = riscv64-unknown-linux-gnu-g++
QMAKE_LINK_SHLIB        = riscv64-unknown-linux-gnu-g++

# modifications to linux.conf
QMAKE_AR                = riscv64-unknown-linux-gnu-ar cqs
QMAKE_OBJCOPY           = riscv64-unknown-linux-gnu-objcopy
QMAKE_STRIP             = riscv64-unknown-linux-gnu-strip

load(qt_config)
```

## 2.3. 环境变量[¶](#id2)

和传统的交叉编译不同，QT 采用的是QMake进行系统编译，编译方案是先进行一些Host 的工具编译（采用CC），再进行交叉编译（采用QMAKE_CC），因此在设置环境变量时， 只可以添加交叉编译工具链到PATH，设置QMAKE_CC， 绝对不能设置CC的传统的交叉编译变量，否则出现莫名的问题。

如果需要directfb的支持，则需要明确指定一下directfb的路径，导如下两个环境变量

```
export QT_CFLAGS_DIRECTFB="-I/xxx/install/include/directfb/"
export QT_LIBS_DIRECTFB="-L/xxx/install/lib -ldirectfb -lfusion -ldirect -lpthread -lz"
```

# 3. 编译

## 3.1. configure

- 用最简单的编译方式编译，大部分功能先disable，如果需要再打开
- 通过-xplatform qws/linux-arm-gnueabi-g++指定交叉编译工具链
- configure 完成后会生成Makefile
- make distclean命令无效，无法清除生成的Makefile

```
./configure -opensource -confirm-license -xplatform qws/linux-riscv-gnueabi-g++ \
-prefix /xxx/install -plugin-gfx-directfb -no-qt3support \
-nomake demos -nomake examples -no-glib -depths 8,16,32 -qt-gfx-linuxfb -no-gfx-transformed \
-no-gfx-qvfb -no-gfx-vnc -no-gfx-multiscreen -no-mouse-pc -no-mouse-linuxtp -no-mouse-linuxinput \
-no-mouse-tslib -no-mouse-qvfb -no-kbd-tty -no-kbd-linuxinput -no-kbd-qvfb -release -shared \
-little-endian -embedded arm -no-gif -no-libmng -no-accessibility  -no-libjpeg -no-libtiff -no-freetype \
-no-openssl -no-opengl -no-sql-sqlite -no-xmlpatterns -no-multimedia -no-audio-backend -no-phonon \
-no-phonon-backend -no-svg -no-webkit -script -no-scripttools -no-stl -no-declarative -no-pch \
-no-xinerama -no-cups -no-nis -no-separate-debug-info -fast -no-rpath
```

## 3.2. swpb汇编

我们的工具链没有提供swpb汇编，需要直接使用C语言的交换方式完成

```
../../include/QtCore/../../src/corelib/arch/qatomic_armv5.h:128: Error: unrecognized opcode `swpb a3,a4,[s0]'

diff --git a/src/corelib/arch/qatomic_armv5.h b/src/corelib/arch/qatomic_armv5.h
index 27e23d9e..b265d149 100644
--- a/src/corelib/arch/qatomic_armv5.h
+++ b/src/corelib/arch/qatomic_armv5.h
@@ -125,10 +125,12 @@ Q_CORE_EXPORT __asm char q_atomic_swp(volatile char *ptr, char newval);
inline char q_atomic_swp(volatile char *ptr, char newval)
{
    register char ret;
-    asm volatile("swpb %0,%2,[%3]"
-                 : "=&r"(ret), "=m" (*ptr)
-                 : "r"(newval), "r"(ptr)
-                 : "cc", "memory");
+    //asm volatile("swpb %0,%2,[%3]"
+    //             : "=&r"(ret), "=m" (*ptr)
+    //             : "r"(newval), "r"(ptr)
+    //             : "cc", "memory");
+    ret = *ptr;
+    *ptr = newval;
    return ret;
}

@@ -227,10 +229,12 @@ inline int QBasicAtomicInt::fetchAndStoreOrdered(int newValue)
{
    int originalValue;
#ifndef QT_NO_ARM_EABI
-    asm volatile("swp %0,%2,[%3]"
-                 : "=&r"(originalValue), "=m" (_q_value)
-                 : "r"(newValue), "r"(&_q_value)
-                 : "cc", "memory");
+    //asm volatile("swp %0,%2,[%3]"
+    //             : "=&r"(originalValue), "=m" (_q_value)
+    //             : "r"(newValue), "r"(&_q_value)
+    //             : "cc", "memory");
+    originalVlaue = _q_value;
+    _q_value = newValue;
```

## 3.3. gnu兼容

工具链版本的不同，会使某些C++ code 的兼容性会有差异，需要指定gnu++98

```
error: 'std::tr1' has not been declared

--- a/mkspecs/common/g++-base.conf
+++ b/mkspecs/common/g++-base.conf
@@ -15,7 +15,7 @@ QMAKE_LINK_C_SHLIB = $$QMAKE_CC

QMAKE_CFLAGS_RELEASE_WITH_DEBUGINFO += -O2 -g

-QMAKE_CXX = g++
+QMAKE_CXX = g++ -std=gnu++98

QMAKE_LINK       = $$QMAKE_CXX
QMAKE_LINK_SHLIB = $$QMAKE_CXX

--- a/mkspecs/common/gcc-base.conf
+++ b/mkspecs/common/gcc-base.conf
@@ -42,7 +42,7 @@ QMAKE_CFLAGS_STATIC_LIB     += -fPIC
QMAKE_CFLAGS_YACC           += -Wno-unused -Wno-parentheses
QMAKE_CFLAGS_HIDESYMS       += -fvisibility=hidden

-QMAKE_CXXFLAGS            += $$QMAKE_CFLAGS
+QMAKE_CXXFLAGS            += $$QMAKE_CFLAGS -std=gnu++98
QMAKE_CXXFLAGS_DEPS       += $$QMAKE_CFLAGS_DEPS
```

# 4. Directfb 集成

configure会优先使用pkg_config, directfb-config 两个工具进行directfb的路径获取，会很容易的受到系统directfb的影响， 因此此处最简单的办法的绕开系统的变量，直接设置QT_CFLAGS_DIRECTFB 和QT_LIBS_DIRECTFB的变量值

```
The DirectFB screen driver functionality test failed!

--- a/configure
+++ b/configure
@@ -6641,13 +6641,13 @@ if [ "$PLATFORM_QWS" = "yes" ]; then
fi

if [ "${screen}" = "directfb" ] && [ "${CFG_CONFIGURE_EXIT_ON_ERROR}" = "yes" ]; then
-           if test -n "$PKG_CONFIG" && "$PKG_CONFIG" --exists directfb 2>/dev/null; then
-               QT_CFLAGS_DIRECTFB=`$PKG_CONFIG --cflags directfb 2>/dev/null`
-               QT_LIBS_DIRECTFB=`$PKG_CONFIG --libs directfb 2>/dev/null`
-           elif directfb-config --version >/dev/null 2>&1; then
-               QT_CFLAGS_DIRECTFB=`directfb-config --cflags 2>/dev/null`
-               QT_LIBS_DIRECTFB=`directfb-config --libs 2>/dev/null`
-           fi
+           #if test -n "$PKG_CONFIG" && "$PKG_CONFIG" --exists directfb 2>/dev/null; then
+           #    QT_CFLAGS_DIRECTFB=`$PKG_CONFIG --cflags directfb 2>/dev/null`
+           #    QT_LIBS_DIRECTFB=`$PKG_CONFIG --libs directfb 2>/dev/null`
+           #elif directfb-config --version >/dev/null 2>&1; then
+           #    QT_CFLAGS_DIRECTFB=`directfb-config --cflags 2>/dev/null`
+           #    QT_LIBS_DIRECTFB=`directfb-config --libs 2>/dev/null`
+           #fi
```

# 5. config.test

config.tests 是configure的测试目录，其中有不少简单的verify示例，以directfb为例

```
config.tests/qws/directfb
directfb.cpp  directfb.o  directfb.pro  Makefile

cat Makefile
CC            = riscv64-unknown-linux-gnu-gcc
CXX           = riscv64-unknown-linux-gnu-g++
DEFINES       =
CFLAGS        = -pipe -O2 -Wall -W $(DEFINES)
CXXFLAGS      = -pipe -std=gnu++98 -D_REENTRANT -O2 -Wall -W $(DEFINES)
INCPATH       = -I../../../mkspecs/qws/linux-riscv-gnueabi-g++ -I. -I/usr/include/directfb
LINK          = riscv64-unknown-linux-gnu-g++
LFLAGS        = -Wl,-O1
LIBS          = $(SUBLIBS)   -L/usr/lib/x86_64-linux-gnu -ldirectfb -lfusion -ldirect -lpthread
AR            = riscv64-unknown-linux-gnu-ar cqs
```

- 如果某一test没有过，可以通过查看Makefile 确认相关参数是否正确，如上的include参数不正确
- 如果参数正确，可以直接进入该目录执行make命令确认出错原因
- 最初编译directfb是动态link zlib，因此需要明确link zlib，第一次仿照上面的LIBS设置，则在编译的时候报告zlib 的错误