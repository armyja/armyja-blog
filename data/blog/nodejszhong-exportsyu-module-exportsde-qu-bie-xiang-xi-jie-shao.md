---
title: Node.js：exports 与 module.exports 的区别
slug: nodejszhong-exportsyu-module-exportsde-qu-bie-xiang-xi-jie-shao
date_published: 2016-04-20T03:35:49.000Z
date_updated: 2016-04-20T06:09:44.000Z
author: Jeffey Wang
tags: Node.js
---

你肯定非常熟悉 Node.js 模块中的 exports 对象，你可以用它创建你的模块。例如：（假设这是 rocker.js 文件）

```javascript
exports.name = function () {
  console.log('My name is Lemmy Kilmister')
}
```

在另一个文件中你这样引用

```javascript
var rocker = require('./rocker.js')
rocker.name() // 'My name is Lemmy Kilmister'
```

**那到底 module.exports 是什么呢？它是否合法呢？**

其实，module.exports 才是真正的接口，exports 只不过是它的一个辅助工具。　最终返回给调用的是 module.exports 而不是 exports。

所有的 exports 收集到的属性和方法，都赋值给了 module.exports。当然，这有个前提，就是 module.exports 本身不具备任何属性和方法。如果，module.exports 已经具备一些属性和方法，那么 exports 收集来的信息将被忽略。

修改 rocker.js 如下：

```javascript
module.exports = 'ROCK IT!'
exports.name = function () {
  console.log('My name is Lemmy Kilmister')
}
```

再次引用执行 rocker.js

```javascript
var rocker = require('./rocker.js')
rocker.name() // TypeError: Object ROCK IT! has no method 'name'
```

发现报错：对象 “ROCK IT!” 没有 name 方法

rocker 模块忽略了 exports 收集的 name 方法，返回了一个字符串 “ROCK IT!”。由此可知，你的模块并不一定非得返回 “实例化对象”。你的模块可以是任何合法的 javascript 对象 --boolean, number, date, JSON, string, function, array 等等。

你的模块可以是任何你设置给它的东西。如果你没有显式的给 module.exports 设置任何属性和方法，那么你的模块就是 exports 设置给 module.exports 的属性。

下面例子中，你的模块是一个类：

```javascript
module.exports = function (name, age) {
  this.name = name
  this.age = age
  this.about = function () {
    console.log(this.name + ' is ' + this.age + ' years old')
  }
}
```

可以这样应用它：

```javascript
var Rocker = require('./rocker.js')
var r = new Rocker('Ozzy', 62)
r.about() // Ozzy is 62 years old
```

下面例子中，你的模块是一个数组：

```javascript
module.exports = [
  'Lemmy Kilmister',
  'Ozzy Osbourne',
  'Ronnie James Dio',
  'Steven Tyler',
  'Mick Jagger',
]
```

可以这样应用它：

```javascript
var rocker = require('./rocker.js')
console.log('Rockin in heaven: ' + rocker[2]) //Rockin in heaven: Ronnie James Dio
```

现在你明白了，如果你想你的模块是一个特定的类型就用 module.exports。如果你想的模块是一个典型的 “实例化对象” 就用 exports。

给 module.exports 添加属性类似于给 exports 添加属性。例如：

```javascript
module.exports.name = function () {
  console.log('My name is Lemmy Kilmister')
}
```

同样，exports 是这样的

```javascript
exports.name = function () {
  console.log('My name is Lemmy Kilmister')
}
```

请注意，这两种结果并不相同。前面已经提到 module.exports 是真正的接口，exports 只不过是它的辅助工具。推荐使用 exports 导出，除非你打算从原来的 “实例化对象” 改变成一个类型。

> 原文链接：[http://www.hacksparrow.com/node-js-exports-vs-module-exports.html](http://www.hacksparrow.com/node-js-exports-vs-module-exports.html)
