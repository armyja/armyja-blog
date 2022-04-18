---
title: Linux：更改文件的所有者及用户组
slug: chown-and-chgrp
date_published: 2016-03-30T07:27:23.000Z
date_updated: 2018-03-10T01:06:09.000Z
author: Jeffey Wang
tags: Linux
summary: 在服务器下使用 root 用户极不安全，于是新建用户，把原文件迁移到新用户目录下，并更改文件的所有者。
---

> 在服务器下使用 root 用户极不安全，于是新建用户，把原文件迁移到新用户目录下，并更改文件的所有者。

### 一、基本知识

在 Linux 中，创建一个文件时，该文件的拥有者都是创建该文件的用户。该文件用户可以修改该文件的拥有者及用户组，当然 root 用户可以修改任何文件的拥有者及用户组。在 Linux 中，对于文件的权限（rwx），分为三部分，一部分是该文件的拥有者所拥有的权限，一部分是该文件所在用户组的用户所拥有的权限，另一部分是其他用户所拥有的权限。对于文件的权限请参考《Linux 的 chmod 命令》。

文件（含文件夹，下同）的权限，在 shell 中可以通过 chmod 命令来完成，关于此请参考《Linux 的 chmod 命令》。在 shell 中，可以使用 chown 命令来改变文件所有者及用户组，chgrp 命令来改变文件所在用户组。在 Linux 的 C 程序中，可以使用 chown 函数来改变文件所有者，及所在用户组。

另外，在 shell 中，要修改文件当前的用户必须具有管理员 root 的权限。可以通过 su 命令切换到 root 用户，也可以通过 sudo 获得 root 的权限。

### 二、使用 chown 命令更改文件拥有者

在 shell 中，可以使用 chown 命令来改变文件所有者。chown 命令是 change owner（改变拥有者）的缩写。需要要注意的是，用户必须是已经存在系统中的，也就是只能改变为在 /etc/passwd 这个文件中有记录的用户名称才可以。

chown 命令的用途很多，还可以顺便直接修改用户组的名称。此外，如果要连目录下的所有子目录或文件同时更改文件拥有者的话，直接加上 -R 的参数即可。

#### 基本语法

```bash
    chown [-R] 账号名称 文件或目录
    chown [-R] 账号名称: 用户组名称 文件或目录
```

#### 参数

`-R` : 进行递归 (recursive) 的持续更改，即连同子目录下的所有文件、目录

都更新成为这个用户组。常常用在更改某一目录的情况。

##### 示例 1

```bash
    [root@localhost home]$ touch testfile // 由 root 用户创建文件
    [root@localhost home]$ ls testfile –l
    -rw--w--w- 1 root root 0 Jun 7 19:35 testfile // 文件的拥有者及拥有者级均为 root
    [root@localhost home]$ chown yangzongde testfile // 修改文件拥有者为 yangzongde
    [root@localhost home]$ ls testfile -l
    -rw--w--w- 1 yangzongde root 0 Jun 7 19:35 testfile // 查看文件拥有者为 yangzongde，但组仍为 root
```

##### 示例 2

```bash
    chown bin install.log
    ls -l
    -rw-r--r--  1 bin  users 68495 Jun 25 08:53 install.log
    chown root:root install.log
    ls -l
    -rw-r--r--  1 root root 68495 Jun 25 08:53 install.log
```

### 三、使用 chgrp 命令更改文件所属用户组

在 shell 中，可以使用 chgrp 命令来改变文件所属用户组，该命令就是 change group (改变用户组) 的缩写。需要注意的是要改变成为的用户组名称，必须在 /etc/group 里存在，否则就会显示错误。

基本语法：
`chgrp [-R] 用户组名称 dirname/filename ...`

#### 参数

`-R` : 进行递归 (recursive) 的持续更改，即连同子目录下的所有文件、目录

都更新成为这个用户组。常常用在更改某一目录的情况。

##### 示例 3

```bash
    [root@localhost home]$ ls testfile -l
    -rw--w--w- 1 yangzongde root 0 Jun 7 19:35 testfile // 查看文件拥有者为 yangzongde，但组为 root
    [root@localhost home]$ chgrp yangzongde testfile // 修改拥有者组为 yangzongde
    [root@localhost home]$ ls testfile -l
    -rw--w--w- 1 yangzongde yangzongde 0 Jun 7 19:35 testfile
    [root@localhost home]$ chown root:root testfile // 使用 chown 一次性修改拥有者及组
    [root@localhost home]$ ls testfile -l
    -rw--w--w- 1 root root 0 Jun 7 19:35 testfile
```

##### 示例 4

```bash
    [root@linux ~]$ chgrp users install.log
    [root@linux ~]$ ls -l
    -rw-r--r--  1 root users 68495 Jun 25 08:53 install.log
```

##### 示例 5

```bash
    更改为一个 /etc/group 里不存在的用户组
    [root@linux ~]$ chgrp testing install.log
    chgrp: invalid group name `testing' <== 出现错误信息～找不到这个用户组名～
```

本文节选自：[http://blog.csdn.net/hudashi/article/details/7797393](http://blog.csdn.net/hudashi/article/details/7797393)
