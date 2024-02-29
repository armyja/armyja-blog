---
title: 让 Ghost 支持 LaTeX 数学公式
slug: ghost-latex-formula-support
date_published: 2018-02-26T09:21:07.000Z
date_updated: 2018-02-27T11:12:39.000Z
author: Jeffey Wang
tags: Ghost, Latex
summary: v1.0+ 版本的 Ghost 博客支持单篇文章的 Code Injection 功能，方便作者按需添加 JavaScript 或 CSS 代码，实现定制化。在 Code Injection 的 Post Footer 处粘贴 MathJax 脚本代码，即可支持 LaTeX 数学公式的显示。
---

v1.0+ 版本的 Ghost 博客支持单篇文章的 Code Injection 功能，方便作者按需添加 JavaScript 或 CSS 代码，实现定制化。

![ode Injection in Post Setting](https://blog-armyja.oss-accelerate.aliyuncs.com/content/images/2018/02/----_----_20180226163838.png)

在 Code Injection 的 Post Footer 处粘贴 MathJax 脚本代码，即可支持 LaTeX 数学公式的显示。

```html
<script
  type="text/javascript"
  src="https://cdn.bootcss.com/mathjax/2.7.3/latest.js?config=TeX-AMS-MML_HTMLorMML"
></script>
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
      tex2jax: {
          inlineMath: [['$$','$$'], ['\\\\(','\\\\)']],
          processEscapes: true
      }
  });
</script>
```

粘贴后效果如下。

![Support MathJax in Post Footer](https://blog-armyja.oss-accelerate.aliyuncs.com/content/images/2018/02/----_----_20180226164424.png)

在文章编辑区中可以尝试以下两个例子：

`$E = mc^2$` 可以显示行内公式：$E = mc^2$

`\\[E = mc^2\\]` 可以占行显示公式：\[E = mc^2\]

这里需要注意，因为 Ghost 使用 markdown 解析器解析语法，所以使用 `\[E = mc^2\]` 会解析成 `[E=mc^2]`。所以要想成功解析出来，需要对反斜杠再转义一次：`\\[E = mc^2\\]`。

参考链接：[让 Ghost 支持 Latex](https://yq.aliyun.com/articles/16951)
