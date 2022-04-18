---
title: cp命令：复制文件夹
slug: linux-shell-xiao-ji-qiao
date_published: 2016-03-21T03:18:11.000Z
date_updated: 2016-03-31T12:20:24.000Z
author: Jeffey Wang
tags: Linux
---

> 创建目标目录，同时复制源目录下所有文件。
> `cp -r [source direcctory] [destination directory]`

当目标目录 `dir_b` 不存在，将 `dir_a` 内的文件复制到 `dir_b` 下：

    $ ls dir_a // a.txt
    $ cp -r dir_a dir_b
    $ ls dir_b // a.txt

当目标目录 `dir_b` 已存在，执行 `cp -r` 指令， `dir_a` 目录及文件将复制到 `dir_b` 下。

    $ cp -r dir_a dir_b
    $ ls dir_b // a.txt dir_a
    $ ls dir_a // a.txt
