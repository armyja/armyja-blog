---
title: Python 中 xrange 和 range 的异同
slug: the-differences-between-xrange-and-range-in-python
date_published: 2016-05-17T09:38:00.000Z
date_updated: 2018-03-09T01:52:22.000Z
author: Jeffey Wang
tags: Python
summary: range 函数说明：range([start,] stop[, step])，根据 start 与 stop 指定的范围以及 step 设定的步长，生成一个序列。xrange 函数说明：用法与 range 完全相同，所不同的是生成的不是一个数组，而是一个生成器。
---

### range

函数说明：range([start,] stop[, step])，根据 start 与 stop 指定的范围以及 step 设定的步长，生成一个序列。

```python
>>> range(5)
[0, 1, 2, 3, 4]
>>> range(1,5)
[1, 2, 3, 4]
>>> range(0,6,2)
[0, 2, 4]
```

### xrange

函数说明：用法与 `range` 完全相同，所不同的是生成的不是一个数组，而是一个生成器。

```python
>>> xrange(5)
xrange(5)
>>> list(xrange(5))
[0, 1, 2, 3, 4]
>>> xrange(1,5)
xrange(1, 5)
>>> list(xrange(1,5))
[1, 2, 3, 4]
>>> xrange(0,6,2)
xrange(0, 6, 2)
>>> list(xrange(0,6,2))
[0, 2, 4]
```

由上面的示例可以知道：要生成很大的数字序列的时候，用 `xrange` 会比 `range` 性能优很多，因为不需要一上来就开辟一块很大的内存空间，这两个基本上都是在循环的时候用：

```python
for i in range(0, 100):
print i
for i in xrange(0, 100):
print i
```

这两个输出的结果都是一样的，实际上有很多不同，range 会直接生成一个 list 对象：

```python
a = range(0,100)
print type(a)
print a
print a[0], a[1]
```

输出结果：

```python
<type 'list'>
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
0 1
```

而 `xrange` 则不会直接生成一个 `list` ，而是每次调用返回其中的一个值：

```python
a = xrange(0,100)
print type(a)
print a
print a[0], a[1]
```

输出结果：

```python
<type 'xrange'>
xrange(100)
0 1
```

所以 `xrange` 做循环的性能比 `range` 好，尤其是返回很大的时候，尽量用 `xrange` 吧，除非你是要返回一个列表。

原文链接：：[http://ciniao.me/article.php?id=17](http://ciniao.me/article.php?id=17)
