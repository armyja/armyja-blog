---
title: 进入 Clion 的世界
slug: shi-yong-cong-quan-jia-tong
date_published: 2016-05-24T16:46:42.000Z
date_updated: 2018-03-09T01:51:44.000Z
author: Jeffey Wang
tags: JetBrains
summary: CLion 软件由 JetBrains 公司出品。如果你尚未使用　CLion，并且是一名 C/C++ 程序猿/媛，那么我建议你尝试一下，因为你的生命中可能会多一位对你百般体贴的“人”。举个栗子，假如你写 C++ 代码，想直接调用某个库里的函数 `sqrt` ，却不知道这库的名字，怎么解决呢？百度一下 sqrt？
---

## 安利 CLion

CLion 软件由 JetBrains 公司出品。如果你尚未使用　 CLion，并且是一名 C/C++ 程序猿/媛，那么我建议你尝试一下，因为你的生命中可能会多一位对你百般体贴的人。

举个栗子，假如你写 C++ 代码，想直接调用某个库里的函数 `sqrt` ，却不知道这库的名字，怎么解决呢？百度一下 sqrt？

![](https://bucket.armyja-online.uk/blog/content/images/2016/05/----_20160525001359.png)

假如你使用 Clion，将光标移到 `int = sqrt(9);` 时：

![](https://bucket.armyja-online.uk/blog/content/images/2016/05/----_20160525001518.png)

虽然我英文渣，但是我看懂了 `Alt + Enter` ，于是乖乖听话按下了快捷键

![](https://bucket.armyja-online.uk/blog/content/images/2016/05/----_20160525001752.png)

![](https://bucket.armyja-online.uk/blog/content/images/2016/05/fbee3c8061540e9b1b46_size25_w434_h421.jpg)

![](https://bucket.armyja-online.uk/blog/content/images/2016/05/th.jpg)

赶紧幸福地按下 Enter ，头文件出来啦！不过...那一坨黄色的屎（高亮）是什么鬼？

![](https://bucket.armyja-online.uk/blog/content/images/2016/05/----_20160525002236-1.png)

定睛一看

![](https://bucket.armyja-online.uk/blog/content/images/2016/05/----_20160525002532.png)

玛德，看不懂。要不我再按下 `Alt + Enter` 请教一下？

![](https://bucket.armyja-online.uk/blog/content/images/2016/05/----_20160525003027.png)

艾玛终于明白了。Clion 告诉我俩解决方法：要么将右值强制转换成 int 型，要么将变量 a 设定为 double 型。于是选择第二项，Enter。

![](https://bucket.armyja-online.uk/blog/content/images/2016/05/----_20160525003337.png)

也许你会说，这同小学生有了一名全能家教有什么区别吗！简直是开挂嘛！

我也这么觉得，它既是一部活字典，也是一位指路者。你告诉他小孩的名字，他会告诉你小孩的爸爸可能是谁。当你肆意妄为，他又会提示你正确的做事方式，避免你误入歧途。

所以现在我已经离不开它了，嘻嘻。如果你偶尔看到我在用 VC 6.0，那一定是因为某些不可抗因素……比如期中考 👀

## 安装 Clion

Jetbrains 系列的软件对大学生而言是可以免费使用的。

1. 先在　[https://www.jetbrains.com/clion/download/](https://www.jetbrains.com/clion/download/)　开始下载 Clion 安装包。
2. 进入 [https://account.jetbrains.com/login](https://account.jetbrains.com/login) 注册一个帐号
3. 进入 [https://www.jetbrains.com/shop/eform/students](https://www.jetbrains.com/shop/eform/students) 输入你的信息，其中邮箱必须是**校园邮箱**

![](https://bucket.armyja-online.uk/blog/content/images/2016/05/----_20160525003027-1.png)

接着你会收到一封邮件，点击 Confirm

![](https://bucket.armyja-online.uk/blog/content/images/2016/05/----_20160525093445.png)

然后你会收到第二封邮件，点击 `Activate Educational License`

![](https://bucket.armyja-online.uk/blog/content/images/2016/05/----_20160525093657.png)

点击 `I Accept`

![](https://bucket.armyja-online.uk/blog/content/images/2016/05/----_20160525093722.png)

棒极了～ 获得一年的学生免费许可

![](https://bucket.armyja-online.uk/blog/content/images/2016/05/----_20160525093933.png)

下载完 CLion 安装包并且安装后，输入你刚刚注册的帐户信息

![](https://bucket.armyja-online.uk/blog/content/images/2016/05/----_20160525094143.png)

完成许可认证！

![](https://bucket.armyja-online.uk/blog/content/images/2016/05/----_20160525094057.png)

有童鞋会问，许可时长只有一年，怎么破？

[https://www.jetbrains.com/student/](https://www.jetbrains.com/student/) 给出了解答：

![](https://bucket.armyja-online.uk/blog/content/images/2016/05/----_20160525095515.png)

至此，CLion 安装部分已经完成。
