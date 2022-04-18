---
title: Ghost：  新窗口打开外链
slug: ghost-xin-chuang-kou-da-kai-wai-lian
date_published: 2016-03-26T04:31:05.000Z
date_updated: 2016-03-26T14:42:07.000Z
author: Jeffey Wang
tags: Ghost
---

> Ghost 博客所有链接都在当前页面中打开，不符合国人习惯。
>
> 因此，我们需要修改主题文件夹内的 `index.js` 文件，重新定义外链的打开方式。

1. 打开 `./ghost/content/theme/my-ghost-theme/assets/js/index.js`
2. 在 `$document.ready()` 中加入：

```javascript
    $('a').on('click', function(e) {
    var url = $(this).attr('href').toUpperCase();
    if (url.indexOf("ARMYJA.CN") < 0 & url.indexOf("HTTP") >= 0 ) {
    $(this).attr("target","_blank");
    }
    });
    <!--将其中的 `ARMYJA.CN` 改为自己的博客域名-->
```

1. 重启 Ghost 服务器，搞定 ~

参考链接： [http://limou.cc/ghostbo-ke-lian-jie-qiang-zhi-xin-chuang-kou-da-kai/](http://limou.cc/ghostbo-ke-lian-jie-qiang-zhi-xin-chuang-kou-da-kai/)
