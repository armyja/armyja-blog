---
title: Ghost： 手动指定摘要位置
slug: ghost-shou-dong-zhi-ding-zhai-yao-wei-zhi
date_published: 2016-03-26T03:41:00.000Z
date_updated: 2016-03-26T17:04:34.000Z
author: Jeffey Wang
tags: Ghost
---

> 自己动手为 Ghost 添加 `<!--more-->` 支持。
>
> 完全不能接受博客首页中，每篇文章必须显示 26 字的摘要!

### Step 1

打开文件 `core/server/helpers/data/meta/excerpt.js` 找到如下内容：

```javascript
// Strip other html
excerpt = excerpt.replace(/<\/?[^>]+>/gi, '')
excerpt = excerpt.replace(/(\r\n|\n|\r)+/gm, ' ')
/*jslint regexp:false */

if (!truncateOptions.words && !truncateOptions.characters) {
  truncateOptions.words = 50
}
```

修改后：

```javascript
// Strip other html
excerpt = excerpt.slice(0, excerpt.search('<!--more-->'))
excerpt = excerpt.replace(/\s*<\/?code>\s*/g, ' ')
excerpt = excerpt.replace(/<\/?[^>]+>/gi, '')
excerpt = excerpt.replace(/(\r\n|\n|\r)+/gm, '<br>')
excerpt = excerpt.replace(/^(<br>)+/gm, '')
/*jslint regexp:false */

if (!truncateOptions.words && !truncateOptions.characters) {
  truncateOptions.words = 500 // 调高字数值，确保显示 <!--more--> 前面的所有内容
}
```

### Step 2

#### 1.修改博客首页的摘要长度

修改文件 `/ghost/content/themes/YOUR_THEME/partials/loop.hbs`

将 ` {{excerpt words="26"}}` 改为 ` {{excerpt}}` ，使其调用

```javascript
if (!truncateOptions.words && !truncateOptions.characters) {
  truncateOptions.words = 500 // 调高字数值，确保显示 <!--more--> 前面的所有内容
}
```

#### 2.修改 Posts 页面底部的文章摘要长度

修改文件 `/ghost/content/themes/YOUR_THEME/posts.hbs`

将 `class="read-next"` 的区块中，修改 `{{excerpt words="26"}}` 为 `{{excerpt}}`

### Step 3

在每篇文章中插入 `<!--more-->` ，最后重启服务器，ok ~

### 注意

由于 md 引擎在解析时可能有点问题，务必让 `<!--more-->` 紧跟摘要的结尾，而不是换行后再加上 `<!--more-->` 。

参考链接： [http://cateyes.blue/ghost-excerpt-more/](http://cateyes.blue/ghost-excerpt-more/)
