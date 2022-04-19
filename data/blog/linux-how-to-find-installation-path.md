---
title: Linux 如何查找文件安装路径
slug: linux-how-to-find-installation-path
date_published: 2016-09-16T03:20:42.000Z
date_updated: 2018-03-09T08:02:15.000Z
author: Jeffey Wang
tags: Linux
summary: Linux 中查看某个软件的安装路径(地址)有时显得非常重要。比如某个文件的快速启动项被删除，或者你要建立快速启动项，或者想删除、添加安装文件等等，很多地方都要用到查看文件安装路径的命令。
---

Linux 中查看某个软件的安装路径(地址)有时显得非常重要。比如某个文件的快速启动项被删除，或者你要建立快速启动项，或者想删除、添加安装文件等等，很多地方都要用到查看文件安装路径的命令。

这里给大家介绍 Linux 查看文件安装路径(地址)命令。

### 一、查看文件安装路径：

由于软件安装的地方不止一个地方，所有先说查看文件安装的所有路径(地址)。

这里以 Oracle 为例。比如说我安装了 Oracle ，但是不知道文件都安装在哪些地方、放在哪些文件夹里，可以用下面的命令查看所有的文件路径

在终端输入：
···bash
whereis oracle

````
回车，如果你安装好了 Oracle ，就会显示文件安装的地址，例如我的显示(安装地址可能会不同)
```bash
oracle: /usr/bin/oracle   /usr/lib/oracle   /usr/share/oracle  /usr/share/man/man1/oracle.1.gz
````

可以看出来，Oracle 安装在这些目录里。

如果你没有安装 Oracle 或者 Oracle 安装没成功，则不会显示文件路径出来。只提示:

```
oracle:
```

### 二、查询运行文件所在路径：

如果你只要查询文件的运行文件所在地址，直接用下面的命令就可以了（还是以 Oracle 为例）：

```bash
which oracle
```

结果会显示：

```bash
/usr/bin/oracle
```

原文链接：[http://www.cnblogs.com/qq78292959/archive/2012/03/04/2379763.html](http://www.cnblogs.com/qq78292959/archive/2012/03/04/2379763.html)
