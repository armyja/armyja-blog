---
title: console.log() 如何缩写为 log()
slug: create-shortcut-to-console-log
date_published: 2018-03-23T07:31:43.000Z
date_updated: 2018-03-23T07:31:43.000Z
author: Jeffey Wang
tags: JavaScript
summary: 使用 Function.prototype.bind 创建 console.log 语法糖
---

> 原文：[http://www.ituring.com.cn/article/128553](http://www.ituring.com.cn/article/128553)

因为嫌`console.log()`的写法太繁琐，想将其简写为`log()`。

我最初是这样写的：

```javascript
     var log = console.log;
     log(..);
```

结果输出为：

```javascript
    TypeError: Illegal invocation
```

谷歌一番之后在[Stack Overflow](http://stackoverflow.com/questions/5456709/create-shortcut-to-console-log-in-chrome)上找到这个答案：

```javascript
var log = console.log.bind(console)
```

看到这个答案后，突然眼前一亮，因为我恰好刚刚在[《You Don't Know

JS》](https://github.com/getify/You-Dont-Know-JS)系列中读到过相关内容。虽然SO上只有答案没有解释，但是读过的内容瞬间在大脑中盘旋，帮我理解了这种写法的原理。刚刚学过的内容派上了用场，这种感觉太棒了！;-D

好了，不卖关子了，再卖会被鄙视的。;-)

言归正传。Javascript 语言采用的是静态作用域规则（lexical scoping）：

```javascript
function foo() {
  console.log(a) // 2
}

function bar() {
  var a = 3
  foo()
}

var a = 2

bar() //2
```

但是，function 中的`this`是个例外，`this`并不指 function 对象本身，也不是指 function 的作用域对象。而是在运行时绑定到特定的对象上。即它采用的是动态作用域规则。参见[这篇文章](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/ch1.md)。

另外，一个 function 即便是定义在一个对象中，作为对象的一个“方法”，它也只不过是一个普通的函数而已，跟其他函数没有任何区别。在执行时仍然需要为 this 绑定一个具体的对象。

```javascript
var obj = {
  a: 1,
  foo: function f() {
    console.log(this.a)
  },
}

obj.foo() //1

var g = obj.foo
g() //undefined

g = obj.foo.bind(obj)
g() //1
```

**注意**：

1.  上面的代码段中，函数 foo 在非严格模式下如果没有明确绑定对象，则会绑定到全局对象，所以输出`undefined`。在严格模式下则会报错。

2.  为什么`obj.foo()`

可以正确输出呢？原因在于这种调用方式会[隐式绑定](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/ch2.md)到执行这个方法的对象上（obj）。

经过上面的分析，答案已经很明了了。在

```javascript
var log = console.log
```

中，log 指向的其实是未绑定到 console 的普通的函数。可以设想 log 函数中使用到了诸如`this.xxx()`

之类的语句，而在全局变量中并没有此类方法，所以会报出错误：

```javascript
console.log.call(console, 'stuff') //stuff
console.log.call(window, 'stuff') //TypeError: Illegal invocation
```

参考资料：

1. [https://github.com/getify/You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS)
2. [http://code.google.com/p/chromium/issues/detail?id=48662](http://code.google.com/p/chromium/issues/detail?id=48662)
