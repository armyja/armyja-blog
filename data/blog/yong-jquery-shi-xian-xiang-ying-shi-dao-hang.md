---
title: 造轮子——实现响应式导航
slug: yong-jquery-shi-xian-xiang-ying-shi-dao-hang
date_published: 2016-06-10T16:41:40.000Z
date_updated: 2018-03-09T01:50:42.000Z
author: Jeffey Wang
tags: HTML, CSS
summary: 笔者太懒，不会提供响应式导航的完整代码。不过你会从本文中了解到响应式导航的实现原理。掌握了原理，你便会明白他并不神秘。
---

笔者太懒，不会提供响应式导航的完整代码。不过你会从本文中了解到响应式导航的实现原理。掌握了原理，你便会明白他并不神秘。

### 预期效果

宽屏时，导航栏的标签呈横向分布；窄屏时，导航栏变成一个按钮，点击按钮可以展开/隐藏导航标签。

![](https://home.armyja.cn/content/images/2016/06/--.png)

宽屏显示导航栏

![](https://home.armyja.cn/content/images/2016/06/---1.png)

窄屏隐藏导航栏

![](https://home.armyja.cn/content/images/2016/06/---2.png)

窄屏显示导航栏

### 实践

一提到响应式，媒体查询是必不可少的。在这里，我设定的屏幕宽度分界点为 768px。

```
    #btn-menu{
      display: none; /* 大于 768px 时隐藏按钮 */
    }
    @media only screen and (max-width: 768px){
      #btn-menu{
        display: block; /* 小于等于 768px 时显示按钮 */
      }
    }

    #nav{
      display: block; /* 大于 768px 时显示标签 */
    }
    @media only screen and (max-width: 768px){
      #nav{
        display: none; /* 小于等于 768px 时隐藏标签 */
      }
    }
```

剩下要做的，便是实现点击按钮来展开/隐藏导航标签。

```
    $("#btn-menu").click(function () {
        $(".nav").slideToggle(200); /* 切换导航栏的高度至 0 or 100% */
    })
```

然而一个坑随之出现。。。当你在窄屏下满怀欣喜的测试 menu 按钮的时候...
![](https://home.armyja.cn/content/images/2016/06/123-gif.gif)

拉到宽屏却变成了这样...
![](https://home.armyja.cn/content/images/2016/06/---3.png)

导航栏蜜汁消失？？？

出现这种情况，是因为 jQuery 的 `slideToggle` 方法修改了元素的**内联样式**，而**内联样式**的优先级比 css 的优先级高。因此，当你在窄屏状态下**关闭**导航栏，就调用了 `slideToggle` 方法，html 文件里的 `.nav` 会出现 `style="display: none;"` ，它比 css 里定义的 `#nav{ display: block; }` 优先级高，所以浏览器不会显示导航栏的。

问题来了，如何使**宽屏的导航栏一直显示**，而不受窄屏下点击 menu 按钮的影响？

把 `style="display: none;"` 去掉就行 ^\_^

```
    $(".btn-menu").click(function () {
        $(".main-nav").slideToggle(200,function () {
            if($(".main-nav").attr("style")=="display: none;"){
                $(".main-nav").removeAttr("style");
            }
        });
    })
```

至此，响应式导航的核心部分教授完毕，无非就是运用了媒体查询和 jQuery（清空内联样式的属性是关键）。虽然看起来不是很优雅，但我只能想到这种方法...若有更简洁方式，请不吝赐教。
