---
sidebar_position: 11
---
# 2.9. 设置登录信息

如下的登录打印信息，如何设置？

```
Starting syslogd: OK
Starting klogd: OK
Starting mdev... OK

WELCOME TO ARTINCHIP LUBAN LINUX
ArtInChip-Device login: root
Password:
[aic@~] #
```

- `WELCOME TO ARTINCHIP LUBAN LINUX` 是 `/etc/issue` 文件中的内容；
- `ArtInChip-Device` 是hostname。

通过修改下面的 `System hostname` 和 `System banner` 进行设置：

![../../_https://photos.100ask.net/artinchip-docs/d213-devkit/faq_setup_root_login_password.png](https://photos.100ask.net/artinchip-docs/d213-devkit/faq_setup_root_login_password-17066842942801.png)

登录后的 `[aic@~]` ，通过修改 `SDK/package/system/skeleton/etc/profile` 文件进行设置：

```
export PATH=@PATH@

if [ "$PS1" ]; then
    if [ "`id -u`" -eq 0 ]; then
        export PS1='[aic@\W] # '
    else
        export PS1='$ '
    fi
fi
```

