---
title: Html 笔记
slug: html-bi-ji
date_published: 2016-04-14T16:06:31.000Z
date_updated: 2016-04-15T04:23:29.000Z
author: Jeffey Wang
tags: HTML
---

> W3Schools[[1]](#fn1) HTML 学习记录

### 文本从右向左显示

```html
<bdo dir="rtl">反向显示文字<bdo></bdo></bdo>
```

反向显示文字

### 显示缩写的全称 `<abbr>`

```html
The <abbr title="World Health Organization">WHO</abbr> was founded in 1948.
```

The WHO was founded in 1948.

### 网页定时刷新

在 `<header>` 里添加刷新代码：

```html
<meta http-equiv="refresh" content="30" /> // 每隔 30 秒刷新页面
```

### 自动完成

可用在 `<form>` 和 `<input>` 标签中：

```html
<form autocomplete="on">
  // 开启自动完成 First name:<input type="text" name="fname" /><br />
  Last name: <input type="text" name="lname" /><br />
  E-mail: <input type="email" name="email" autocomplete="off" /><br />
  // 禁用自动完成
  <input type="submit" />
</form>
```

First name:

Last name:

E-mail:

### 文本框列表

`list` 属性 引用 一个 `<datalist>` 元素，该元素 提供 预定义选项 给 `<input>` 元素。

````html
<input list="browsers" />

<datalist id="browsers">
  <option value="Internet Explorer"></option>
  <option value="Firefox"></option>
  <option value="Chrome"></option>
  <option value="Opera"></option>
  <option value="Safari"></option>
</datalist>

``` Note: The datalist tag is not supported in Internet Explorer 9 and earlier versions, or in
Safari. ### 表单验证 `pattern` 属性 使 `<input />` 的值 匹配 正则表达式。 `pattern` 属性
可以用在这些 input 类型： text, search, url, tel, email, and password. 建议：使用 `title` 属性 作为
正则表达式的 提示信息 ```html
<form action="action_page.php">
  Country code:
  <input type="text" name="country_code" pattern="[A-Za-z]{3}" title="Three letter country code" />
  <input type="submit" />
</form>
``` Country code: Note: The pattern attribute of the input tag is not supported in Internet Explorer
9 and earlier versions, or in Safari. --- --- 1.
[http://www.w3schools.com/](http://www.w3schools.com/)[↩︎](#fnref1)
````
