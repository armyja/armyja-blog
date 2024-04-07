---
title: JavaScript：可视化排序
date: 2016-04-08T17:34:08.000Z
lastmod: 2018-03-10T01:01:50.000Z
author: "Armyja"
tags: ["JavaScript", "sort"]
showComments: true
summary: "十分艰难地做了这道百度前端学院的题目，因为展示效果挺赞就贴到博客上。代码命名混乱，冗余略多，木有对齐，注释特少。若看不太懂，请见谅。"
---

> 十分艰难地做了这道百度前端学院的题目，因为展示效果挺赞就贴到博客上。代码命名混乱，冗余略多，木有对齐，注释特少。若看不太懂，请见谅。

一开始很难理解地方在于 `setInterval` 的用法。后来把它当做 `while` 语句来看待就容易理解了，只是不用 `for` 语句写循环会感觉有点头大 ... 不太容易想清楚在哪里插入某些**条件判断**。

排序过程中设置了许多**条件判断**：

1. 当数组长度变化，重新从头排序
2. 当排序过程中随机生成数据，重新从头排序
3. 停止操作的实现

话说有木有 js 或 css 的美化插件，让 `=` 号上下对齐，或者变量名根据上下行的相同英文对齐 ...

---

See the Pen [可视化排序](http://codepen.io/armyja/pen/xVpypJ/) by Jeffrey Wang ([@armyja](http://codepen.io/armyja)) on [CodePen](http://codepen.io).

{{< codepen user=armyja id=xVpypJ defaultTabs="result" height=600 >}}