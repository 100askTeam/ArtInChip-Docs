---
sidebar_position: 11
---
# 2.11. 设置时区

设置时区，需要在 Luban SDK 中使能 `Install timezone info` 。在 SDK 顶层目录执行：

```
make menuconfig
```

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/faq_timezone_setting.png](https://photos.100ask.net/artinchip-docs/d213-devkit/faq_timezone_setting-17066851194241.png)

勾选 `Install timezone info` 之后，配置使用的 `timezone list` 和 `default local time` 。

`timezone list` 的可选列表可参考：

> - `package/third-party/tzdata/tzdata.mk`

default 包含的时区有：

> - africa
> - antarctica
> - asia
> - australasia
> - europe
> - northamerica
> - southamerica
> - etcetera
> - backward
> - factory

也可以只选择其中几个配置在 `timezone list` 中，时区之间使用 `空格` 分隔。

`default local time` 的可选列表，需要查看

> - `output/target/usr/share/zoneinfo/`

比如 `Asia/Shanghai` 即为该目录下的 `Asia/Shanghai` 时区信息文件。