---
title: 使用 wget 下载 oracle jdk
slug: wget-download-jdk
date_published: 2018-10-20T05:32:55.000Z
date_updated: 2018-10-20T05:34:31.000Z
author: Jeffey Wang
tags: Java
summary: 目标：在腾讯云服务器上命令行直接安装 jdk。
---

目标：在腾讯云服务器上命令行直接安装 jdk。

wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" [http://download.oracle.com/otn-pub/java/jdk/8u161-b12/2f38c3b165be4555a1fa6e98c45e0808/jdk-8u161-linux-x64.tar.gz](http://download.oracle.com/otn-pub/java/jdk/8u161-b12/2f38c3b165be4555a1fa6e98c45e0808/jdk-8u161-linux-x64.tar.gz)

效果见下图，jdk 已开始下载。

![--_Screenshot_2018-10-20-13-31-44-837](https://armyja-pic.oss-cn-guangzhou.aliyuncs.com/content/images/2018/10/--_Screenshot_2018-10-20-13-31-44-837.jpg)

Oracle 的官网下载页面需要加上 cookie 头部才能用 wget 顺利下载，版本号可以在官网上浏览后自行选择，当前最新的稳定版本 jdk-8u161。上述连接是通过勾选 accept 协议后右键复制 jdk 蓝色链接获取的。
![JDK 1.8 下载页面](https://armyja-pic.oss-cn-guangzhou.aliyuncs.com/content/images/2018/10/--_Screenshot_2018-10-20-13-27-29-144.jpg)

参考文章：

CentOS 7 安装 Java 1.8
[https://cloud.tencent.com/developer/article/1148610](https://cloud.tencent.com/developer/article/1148610)
