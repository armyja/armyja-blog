---
title: Linux 下批量修改文件名
slug: linux-rename-filename
date_published: 2017-09-15T01:43:21.000Z
date_updated: 2018-03-09T01:37:09.000Z
author: Jeffey Wang
tags: Linux
summary: 3 种解决方法：rename、shell、find xargs
---

## 一. rename 解决

### 1. Ubuntu 系统下

```bash
    rename 's//.c//.h/'  ./*
```

把当前目录下的后缀名为 `.c` 的文件更改为 `.h` 的文件

### 2. CentOS5.5 系统下

```bash
    rename .c  .h   *.c
```

把当前目录下的后缀名为 `.c` 的文件更改为 `.h` 的文件

## 二. shell 脚本解决

```bash
    #!/bin/bash

    find ./ -name *.c  | while read i
    do
            echo "$i";
            mv $i.c  $i.h
    done
```

## 三. find xargs 解决

```bash
     find ./ -name "*.c" | awk -F "." '{print $2}' | xargs -i -t mv ./{}.c  ./{}.h
```

注意，第三种方案是递归的更改，会更改当前目录下及其子目录下所有匹配文件

## 四. 参考：

[http://blog.csdn.net/longxibendi/archive/2010/09/16/5889055.aspx](http://blog.csdn.net/longxibendi/archive/2010/09/16/5889055.aspx)
[http://man.linuxde.net/rename](http://man.linuxde.net/rename)

声明：本文档可以随意更改，但必须署名原作者

作者：凤凰舞者 qq:578989855
