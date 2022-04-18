---
title: CSS：clearfix 清除浮动
slug: html-clearfix-qing-chu-fu-dong
date_published: 2016-04-02T11:37:24.000Z
date_updated: 2016-04-03T09:19:57.000Z
author: Jeffey Wang
tags: CSS
---

> 浮动闭合最佳方案：clearfix

Ghost 博客的 css 文件里的 clearfix 是这样的：

```css
/* =============================================
       3. Utilities - These things get used a lot
       ============================================= */

/* Clears shit */
.clearfix:before,
.clearfix:after {
  content: ' ';
  display: table; // 在容器的顶部和底部添加高度为 0 的标记
}
.clearfix:after {
  clear: both;
} //清除两边浮动，撑大容器高度
.clearfix {
  zoom: 1;
} // 针对 IE 6
```

若对 clear 属性不熟悉，可以先去http://css.doyoe.com/properties/layout/clear.htm 查看关于 clear 属性的使用。

对 clear 属性，css 手册的解释是：该属性的值指出了不允许有浮动对象的边。因此，那些浮动元素只能出现在其上方。与此同时，相对地，包含了 `clear: both;` 属性的容器，其顶部和底部之间的标记的距离将扩大，直到其高度能容纳所有的浮动对象。
