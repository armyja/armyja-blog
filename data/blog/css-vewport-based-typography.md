---
title: CSS：基于视窗单位的排版
slug: css-vewport-based-typography
date_published: 2016-04-03T09:16:47.000Z
date_updated: 2018-03-10T01:04:46.000Z
author: Jeffey Wang
tags: CSS
summary: 探索一下视窗单位以及如何在响应式排版中使用它们。
---

我之前有写过基于`rem` 和 `em`[^1]的响应式排版[^2] ，并且也有写过两篇有关模块化组件的博客。在这些文章中，有关视窗单位的评论不可避免的形成了一个话题。

曾经一段时间我十分抵制使用视窗单位，因为其中的计算实在让人感到十分痛苦。

上周，我终于克服了这个困难，决定探索一下视窗单位以及如何在响应式排版中使用它们。

在我们开始探索视窗单位以及如何运用它们之前，让我们先了解一下什么是视窗单位。

## 什么是视窗单位?

现在 CSS 中有关于视窗单位的可用种类主要有四种，他们是:

- **`vw`** : 视窗宽度的百分比
- **`vh`** : 视窗高度的百分比
- **`vmin`** : 当前较小的 `vw` 和 `vh`
- **`vmax`** : 当前较大的 `vw` 和 `vh`

在这种情况下，** 视窗 **，指的是浏览器屏幕。`1vw` 就意味着 `1%` 的浏览器的宽度。`100vw` 将意味着整个浏览器宽度。

![基于视窗单位的排版](http://cdn.w3cplus.com/cdn/farfuture/xVCg6Vvwie8E41Dw5xpqQmUd3k83I0u4MSDvO3qA4MA/mtime:1459255814/sites/default/files/blogs/2016/1603/viewport-units.png)

视窗单位的好处在于 ** 当视窗大小改变时，他们会自动的重新计算其大小 **。当重新加载页面，调整页面大小或改变页面方向时就会发生此现象。

因为视窗单位可以自动的重新计算，这让创建一个始终占据四分之一页面的组件变得十分轻松。

```css
.component {
  width: 50vw;
  height: 50vh;
  background: rgba(255, 0, 0, 0.25);
}
```

![基于视窗单位的排版](http://cdn1.w3cplus.com/cdn/farfuture/gHLVlzMSIaAjM7_lvXGxjbDyAdaeqpxL2glae6hXzG4/mtime:1459255814/sites/default/files/blogs/2016/1603/quarter-viewport-component.gif)

上面图像显示的就是视窗单位的缩影。现在让我们回归到这篇文章之中。

## 使用视窗单位进行排版

这里还有一个为什么要考虑使用视窗单位进行排版的原因 - ** 根据客户端的浏览器，视窗单位会自动重新计算 **。这就意味着我们不需要显式声明媒体查询的字体大小。

让我们用一个例子清楚地说明这一点。

考虑下面的代码，我在 `800px` 处将 `font-size` 的大小由 `16px` 更改为 `20px`。

```css
// Note: CSS are all written in SCSS
html {
  font-size: 16px;
  @media (min-width: 800px) {
    font-size: 20px;
  }
}
```

当你看着这段代码时，你可以在 `800px` 视窗时，立马告诉 `font-size` 将大小由 `16px` 更改为 `20px`。这是我们为了良好的视觉效果经常做的事情。

但是，偶尔你也会遇到这种情况，在两个断点处你不得不额外增加一个媒体查询以便在不同的设备上，排版依旧保持良好。

```css
html {
  font-size: 16px;
  @media (min-width: 600px) {
    font-size: 18px;
  }
  @media (min-width: 800px) {
    font-size: 20px;
  }
}
```

虽然我们可以指定多个媒体查询并相应设置多个字体大小，但是这通常矫枉过正，所以我们坚持三到四种尺寸大小。

** 但是不指定多个媒体查询或者多个字体大小，你如何在不同情况下拥有相同效果呢?**。

这时候视窗单位就要发挥它的作用了，在视窗单位中设置 `font-size` 属性，你就可以很容易的获取一样的效果。

请考虑下面代码的结果:

```css
html {
  font-size: 3vw;
}
```

![基于视窗单位的排版](http://cdn.w3cplus.com/cdn/farfuture/CM2bXbxPffiG8HWF_dRipmFtmArjuC6na15kaDO2ce0/mtime:1459255812/sites/default/files/blogs/2016/1603/font-size-in-vw.gif)

是不是很神奇？

不过，正如你可以看到的，** 视窗单位太适应屏幕大小的改变 **。

如果你也将字体大小设置为 `3vw`, 在一个屏幕宽度为 320px 的设备 (移动) 上，你得到的文本大小将为 `10px`。这时字体过小而不适合阅读。另一方面，在一个屏幕宽度为 `1440px` 的设备 (笔记本电脑) 上，你得到的字体大小将为 `43px`，这时，字体又太大了。

** 现在，我们给出了一个有趣的挑战 ** - 驯服视窗字体的大小。

值得庆幸的是，这里有一个简单的方法可以实现。** 我们可以设置一个最小的字体大小，然后在一个小视窗中通过多次使用 `calc()` 属性缩放字体 **。

就像下面代码所示:

```css
html {
  font-size: calc(18px + 0.25vw);
}
```

这是不是看起来很酷? 我第一次发现这种方法是在 [Mike Riethmuller](https://twitter.com/MikeRiethmuller) 的 [ 如何精确的控制响应式排版 ](http://madebymike.com.au/writing/precise-control-responsive-typography) 这篇文章之中。

不幸的是，** 我同时也意识到这种方法并不适用于所有的浏览器 **。比如，Mac 上的 Safari(当然 Mike 说尽管 Windows 适用)。

修补不足的方法十分简单。我们在 `vw` 上可以结合使用百分比，以便 Safari 也可以实现字体缩放:

```css
html {
  font-size: calc(112.5% + 0.5vw);
}
```

![基于视窗单位的排版](http://cdn2.w3cplus.com/cdn/farfuture/TGAK2CS-Dn3g39rlrgocHT7Jjr-xIOH-nuaaD9ZZ6WM/mtime:1459255814/sites/default/files/blogs/2016/1603/font-size-vw-tamed.gif)

Shwweeeeeet! 在我们的代码中是否可以真的一起摆脱 `em`,`rem` 和媒体查询的使用？关于这一点，我迫不急切的想要知道答案！

我不得不克服的下一个挑战是尝试在视窗单位中用其他的排版元素 (`h1`-`h6`) 设置字体大小。

## 在视窗单位中设置其他的排版元素

我尝试做的第一件事就是创建一个字体大小为 `body` 文本大小两倍的 `<h1>` 元素。结果证实并不可以直接这么做:(

我试着将 `<html>` 中的 `font-size` 大小相乘于 `2`，我发现这比本来的字体大小大了很多:

```css
html {
  font-size: calc(112.5% + 0.25vw);
}
h1 {
  font-size: calc((112.5% + 0.25vw) * 2);
}
```

![基于视窗单位的排版](http://cdn.w3cplus.com/cdn/farfuture/FxAk5vv0Oi8eed6c3aq40P9ZRR9iSZ0h2esKthkG9cU/mtime:1459255814/sites/default/files/blogs/2016/1603/viewport-sized-header.png)

发生这种情况的原因在于，在计算 `<h1>` 时我使用了基于百分比的 `font-size`。当我继承 `<html>` 中的 `font-size` 重新计算 `<h1>` 中的 `font-size` 时就会变得十分有效。

这时，如果我们添加一些数字就会变得容易想象一些。

比方说你现在的视窗大小为 `800px`。默认的 `font-size` 大小为 `16px`。

- 在 `<html>` 中 `112.5%` 计算出的 `font-size` 大小为 `18px`(`112.5/100 * 16px`)
- `0.25vw` 计算出的值相等于 `2px`(`800px * 0.25 ÷ 100`)
- `<html>` 中计算的 `font-size` 大小为 `20px` (`18px + 2px`)

到目前为止 HTML 计算是不是很好？太棒了！

我们将采用同样的方式来解决 `<h1>` 的计算。这一次要特别注意 `112.5%` 的计算。

- `<h1>` 中 `112.5%` 计算出来相当于 `22.5px` 的 `font-size` 大小 (`112.5/100 * 20px`)
- `0.25vw` 相当于 `2px`(`800px * 0.25 ÷ 100)`
- `<h1>` 的 `font-size` 大小为 `49px`(`(22.5px + 2px) * 2`)

不幸的是，** 我们要寻找的正确的 `<h1>` 大小为 `body` 的 `font-size` 大小的两倍或者说是 `40px`**。他们是不同的 :(

** 这里有两种方式可以解决这个问题，因为我们知道错误的引起是由于 `<h1>` 继承了 `<html>` 的 `font-size` 大小 **。

第一种解决的方法是在 `<h1>` 中将 `112.5%` 设置为 `100%`:

```css
h1 {
  font-size: calc((100% + 0.25vw) * 2);
}
```

第二种方法就是确保在元素之间不继承字体的大小。

```css
h1 {
  font-size: calc((100% + 0.25vw) * 2);
}
p {
  font-size: calc((100% + 0.25vw));
}
```

这两种解决方式都看起来十分变态。因此我不断寻找更好的解决方法。

最终最好的方式就是恢复使用 `rem` 和 `em`。为什么要放弃发现的新单位呢？

```css
html {
  font-size: calc(112.5% + 0.25vw);
}
h1 {
  font-size: 2em;
}
```

![基于视窗单位的排版](http://cdn.w3cplus.com/cdn/farfuture/rgTWFJcvGum9t3_Jy9BxHsKnUzqQa6NVjMKnStp3mDI/mtime:1459255812/sites/default/files/blogs/2016/1603/correctly-sized-header.png)

既然我们谈到了字体缩放问题，你可能会产生另外一个问题:"使用视窗单位时，垂直规律和模块化会变得怎么样呢？"

好，让我们下面来谈谈他们。

## 视窗单位与垂直规律和模块化

这是比较容易回答的。

你有没有注意到视窗单位仅仅适用于设置 `<html>` 元素？其余一切还是使用 `rem` 和 `em` 来设置。

这意味着你仍然可以以同样的方式使用 `em` 和 `rem` 单位去创建垂直规律和模块化，就像我之前在 [ 我所知道的响应式排版 ](http://zellwk.com/blog/responsive-typography/) 一文中所说的。

什么都没有改变！:)

Oh。在我们结束这篇文章之前还有一件事。

还有一个更大的我不得不克服的问题。就是我之前曾经提出的一个疑问:"在视窗大小为 `800px` 的情况下你如何计算 `vw` 使排版的单位大小为 `20px`？"

这是一个很长的问题，化简为一个单词就是 ** 精度 **。换句话说，我怎样才可以更精确的使用我想要的字体大小呢？

## 精度

其实，Mike 已经帮我解决了这个问题。现在我只需要解释一下这个公式的工作原理。

让我们说说你想要的结果...

- 当视窗大小为 `600px` 时，`font-size` 大小为 `18px`
- 当视窗大小为 `1000px` 时，`font-size` 大小为 `22px`

首先，我们不得不将 `font-size`(`18px`) 转化为百分比。第一部分的计算是这样子的:`calc(18/16 * 100%)`(或者简单的 `calc(112.5%)`)

接下来计算 `vw` 的数量。这部分的计算略微有点麻烦。

你可以通过考虑 `font-size`(`22-18`) 的差值来计算 `vw` 的值, 除以视窗的宽度 (`1000-600`), 之后乘以 `100vw - smaller-viewport-width` (`100vw - 600px`)。

组合在一起就是:

```css
html {
  font-size: calc(112.5% + 4 * (100vw - 600px) / 400);
}
```

刚开始的时候这可能有点复杂，但是一旦你知道其中的组成，你就可以简化为 Sass 中的 mixin。

[Indrek Paas](https://twitter.com/indrekpaas) 已经将上面公式转化为 [ 一个简单的 Sass mixin](http://www.sassmeister.com/gist/7f22e44ace49b5124eec)。这里我很开心可以使用百分比而不是像素。

## 超级精度

这里，你如何实现在不同的断点，获取你想要的视窗单位，从而实现不同的缩放比率。

这里有一个解决方案；

```css
html {
  font-size: 100%;
  // Scales by 1px for every 100px from 600px to 1000px
  @media (min-width: 600px) {
    font-size: calc(112.5% + 4 * (100vw - 600px) / 400);
  }
  // Scales by 0.5px for every 100px from 1000px to 2000px
  @media (min-width: 1000px) {
    font-size: calc(137.5% + 5 * (100vw - 1000px) / 1000);
  }
}
```

嘿，但是在现实中你不可能使用不同的比率进行缩放！这就意味着你会使用下面这个更加可为的方法:

```css
html {
  font-size: 100%;
  // Scales by 1px for every 100px from 600px onwards
  @media (min-width: 600px) {
    font-size: calc(112.5% + 4 * (100vw - 600px) / 400);
  }
  // Sets font-size to 22px after a viewport of 1000px
  @media (min-width: 1000px) {
    font-size: calc(137.5%);
  }
}
```

你是不是已经有所领悟。请随时将视窗单位与媒体查询相结合来实现你想要的结果。

现在，可能最重要的问题就是:

** 在实际项目中我是否应该使用视窗单位 **？

也许，由于我还没有使用过视窗单位而难于下结论。这里有几个事情我需要在实际项目之前去实践:

- 创建一个 Sass mixin 去计算 `vw`
- 检验浏览器的支持以及是否存在潜在的 bugs

## 总结

总而言之这篇文章，我们讨论了如何使用视窗单位来进行大小排版。视窗单位十分有用，因为当视窗改变时，他会自动的重新计算。

在执行实例的过程当中，我发现只在 `<html>` 元素上设置视窗大小时会取得更好的效果。其余大小设置还是使用 `em` 和 `rem` 单位，这样我们就可以轻易做到模块化和垂直规律。

> 本文根据 [@Zell](http://zellwk.com/about/) 的《[Viewport Unit Based Typography](http://zellwk.com/blog/viewport-based-typography/)》所译，整个译文带有我们自己的理解与思想，如果译得不好或有不对之处还请同行朋友指点。如需转载此译文，需注明英文出处：[http://zellwk.com/blog/viewport-based-typography/](http://zellwk.com/blog/viewport-based-typography/)。
>
> 本文链接：http://www.w3cplus.com/css/viewport-based-typography.html
