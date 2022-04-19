---
title: Android 与 Web 服务器 在 Session 下通信
slug: android-web-session
date_published: 2016-07-10T14:41:30.000Z
date_updated: 2018-03-09T01:30:50.000Z
author: Jeffey Wang
tags: Android
summary: 最近在开发项目的过程中，遇到android与web服务器要在同一session下通信的问题。
---

最近在开发项目的过程中，遇到 android 与 web 服务器要在同一 session 下通信的问题。

在解决问题前先回顾下**Session 与 Cookie**：

Cookie 和 Session 都为了用来保存状态信息，都是保存客户端状态的机制，它们都是为了解决 HTTP 无状态的问题而所做的努力。

Session 可以用 Cookie 来实现，也可以用 URL 回写的机制来实现。

Cookie 和 Session 有以下明显的不同点：

1）Cookie 将状态保存在客户端，Session 将状态保存在服务器端；

2）Cookies 是服务器在本地机器上存储的小段文本并随每一个请求发送至同一个服务器。网络服务器用 HTTP 头向客户端发送 cookies，在客户终端，浏览器解析这些 cookies 并将它们保存为一个本地文件，它会自动将同一服务器的任何请求缚上这些 cookies。

3）Session 是针对每一个用户的，变量的值保存在服务器上，用一个 sessionID 来区分是不同用户 session 变量,这个值是通过用户的浏览器在访问的时候返回给服务器，当客户禁用 cookie 时，这个值也可能设置为由 get 来返回给服务器；

4）就安全性来说：当你访问一个使用 session 的站点，同时在自己机器上建立一个 cookie，建议在服务器端的 SESSION 机制更安全些.因为它不会任意读取客户存储的信息。

**Session 机制**

Session 机制是一种服务器端的机制，服务器使用一种类似于散列表的结构（也可能就是使用散列表）来保存信息。

当程序需要为某个客户端的请求创建一个 session 的时候，服务器首先检查这个客户端的请求里是否已包含了一个 session 标识 - 称为 session id，如果已包含一个 session id 则说明以前已经为此客户端创建过 session，服务器就按照 session id 把这个 session 检索出来使用（如果检索不到，可能会新建一个），如果客户端请求不包含 session id，则为此客户端创建一个 session 并且生成一个与此 session 相关联的 session id，session id 的值应该是一个既不会重复，又不容易被找到规律以仿造的字符串，这个

session id 将被在本次响应中返回给客户端保存。

**Session 的实现方式**

**1 ） 使用 Cookie 来实现**

服务器给每个 Session 分配一个唯一的 JSESSIONID，并通过 Cookie 发送给客户端。

当客户端发起新的请求的时候，将在 Cookie 头中携带这个 JSESSIONID。这样服务器能够找到这个客户端对应的 Session。

**2 ）使用 URL 回显来实现**

URL 回写是指服务器在发送给浏览器页面的所有链接中都携带 JSESSIONID 的参数，这样客户端点击任何一个链接都会把 JSESSIONID 带给服务器。

如果直接在浏览器中输入 url 来请求资源，Session 是匹配不到的。

Tomcat 对 Session 的实现，是一开始同时使用 Cookie 和 URL 回写机制，如果发现客户端支持 Cookie，就继续使用 Cookie，停止使用 URL 回写。如果发现 Cookie 被禁用，就一直使用 URL 回写。jsp 开发处理到 Session 的时候，对页面中的链接记得使用 response.encodeURL() 。

**回顾完 Session 和 Cookie，我们来说说为什么手机端与服务器交互没有实现在同一 session 下**？

1）原因很简单，就是因为 android 手机端在访问 web 服务器时，没有给 http 请求头部设置 sessionID，而使用 web 浏览器作为客户端访问服务器时，在客户端每次发起请求的时候，都会将交互中的 sessionID：JSESSIONID 设置在 Cookie 头中携带过去，服务器根据这个 sessionID 获取对应的 Session,而不是重新创建一个新 Session(除了这个 Session 失效)。

以 java.net.HttpURLConnection 发起请求为例：

获取 Cookie：

```java
URL url = new URL(requrl);<br>
HttpURLConnection con= (HttpURLConnection) url.openConnection(); <br>
// 取得sessionid. <br>
String cookieval = con.getHeaderField(&quot;set-cookie&quot;); <br>
String sessionid; <br>
if(cookieval != null) { <br>
sessionid = cookieval.substring(0, cookieval.indexOf(&quot;;&quot;)); <br>
}

//sessionid&#20540;&#26684;式：JSESSIONID=AD5F5C9EEB16C71EC3725DBF209F6178，是键&#20540;对，不是单指&#20540;
```

发送设置 cookie：

```java
URL url = new URL(requrl);<br>
HttpURLConnectioncon= (HttpURLConnection) url.openConnection(); <br>
if(sessionid != null) { <br>
con.setRequestProperty(&quot;cookie&quot;, sessionid); <br>
}
```

只要设置了 sessionID，这样 web 服务器在接受请求的时候就会自动搜索对应的 session 了，从而保证了在同一会话 Session。

文章出处：
[http://hi.baidu.com/cuihenrychl/blog/item/2df9e5b299e5238dcbefd0f4.html](http://hi.baidu.com/cuihenrychl/blog/item/2df9e5b299e5238dcbefd0f4.html)

[http://blog.csdn.net/chindroid/article/details/7556363](http://blog.csdn.net/chindroid/article/details/7556363)
