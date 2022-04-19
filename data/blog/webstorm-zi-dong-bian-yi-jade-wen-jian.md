---
title: WebStorm：自动编译  jade 文件
slug: webstorm-zi-dong-bian-yi-jade-wen-jian
date_published: 2016-04-04T04:53:09.000Z
date_updated: 2016-04-04T05:12:17.000Z
author: Jeffey Wang
tags: WebStorm
---

### 前期准备：安装 jade

在 nodeJs 中输入以下命令：

```
npm install jade -g
```

### 在 WebStorm 上添加 File Watchers 　　

配置过程如下：
![](https://home.armyja.cn/content/images/2016/04/----_20160404125026.png)
注意：

- `jade.cmd` 的路径一般在 `C:\Users\user_name\AppData\Roaming\npm\jade.cmd` 。
- `[-P]` 选项：编译时格式化 html 文件，若不添加此选项，则以压缩形式生成 html 文件。

enjoy ~
