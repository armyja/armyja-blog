---
title: Debian 添加 PPA 源
slug: debian-add-ppa-source
date_published: 2016-04-13T11:56:56.000Z
date_updated: 2018-03-10T01:03:17.000Z
author: Jeffey Wang
tags: Linux
summary: 尝试在 Deepin 系统上安装 Rime 输入法，安装过程中发现 Debian 默认不支持 add-apt-repository 命令。
---

尝试在 Deepin 系统上安装 Rime 输入法，安装过程中发现 Debian 默认不支持 `add-apt-repository` 命令...

于是找到这篇 **博文**[[1]](#fn1) ，完美解决该问题，内容如下：

经过查询包得知 `add-apt-repository` 在 `python-software-properties` 这个软件包中

```bash
    apt-get install python-software-properties
    apt-get install apt-file
    apt-file update
```

现在 Debian 就可以用 ”apt-file search PPA 源“ （ 例如 `apt-file search ppa:fcitx-team/nightly` ）来添加源了。

---

1.  [http://johnjohn.blog.51cto.com/4481703/1538131](http://johnjohn.blog.51cto.com/4481703/1538131)[↩︎](#fnref1)
