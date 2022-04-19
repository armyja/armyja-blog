---
title: CSS：box-sizing
slug: css-box-sizing
date_published: 2016-04-02T16:27:31.000Z
date_updated: 2018-03-10T01:05:10.000Z
author: Jeffey Wang
tags: CSS
summary: 在我们讨论宽度的时候，我们应该讲下与它相关的一个重点知识：盒模型。当你设置了元素的宽度，实际展现的元素却能够超出你的设置：因为元素的边框和内边距会撑开元素。看下面的例子，两个相同宽度的元素显示的实际宽度却不一样。
---

在我们讨论宽度的时候，我们应该讲下与它相关的一个重点知识：盒模型。当你设置了元素的宽度，实际展现的元素却能够超出你的设置：因为元素的边框和内边距会撑开元素。看下面的例子，两个相同宽度的元素显示的实际宽度却不一样。

```css
.simple {
  width: 150px;
  margin: 20px auto;
}

.fancy {
  width: 150px;
  margin: 20px auto;
  padding: 50px;
  border-width: 10px;
}
```

simple：我小一些...

fancy：我比它大！

以前有一个代代相传的解决方案是数学。 CSS 开发者需要用比他们实际想要的宽度小一点的宽度，需要减去内边距和边框的宽度。值得庆幸地是你不需要再这么做了...

经过了一代又一代人们意识到数学不好玩，所以他们新增了一个叫做 `box-sizing` 的 CSS 属性。当你设置一个元素为 `box-sizing: border-box;` 时，此元素的内边距和边框不再会增加它的宽度。这里有一个与前一页相同的例子，唯一的区别是两个元素都设置了 `box-sizing: border-box;` ：

```css
.simple {
  width: 250px;
  margin: 20px auto;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.fancy {
  width: 250px;
  margin: 20px auto;
  padding: 50px;
  border: solid blue 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
```

simple：我们现在一样大小了！

fancy：万岁！

既然没有比这更好的方法，一些 CSS 开发者想要页面上所有的元素都有如此表现。所以开发者们把以下 CSS 代码放在他们页面上：

```css
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
```

这样可以确保所有的元素都会用这种更直观的方式排版。

既然 `box-sizing` 是个很新的属性，目前你还应该像我之前在例子中那样使用 `-webkit-` 和 `-moz-` 前缀。这可以启用特定浏览器实验中的特性。同时记住它是支持 IE8+ 。

---

参考链接：

- [http://zh.learnlayout.com/box-model.html](http://zh.learnlayout.com/box-model.html)
- [http://zh.learnlayout.com/box-sizing.html](http://zh.learnlayout.com/box-sizing.html)
