---
title: 将包含整数 ArrayList 转换成 原始整数数组
slug: how-to-convert-an-arraylist-containing-integers-to-primitive-int-array
date_published: 2016-10-10T02:50:19.000Z
date_updated: 2018-03-09T01:41:40.000Z
author: Jeffey Wang
tags: Java
summary: 使用 java-8 的新特性，无需遍历即可轻松转换。
---

使用 java-8 的新特性，无需遍历即可轻松转换。

先上源码伺候。

```java
Scanner scanner = new Scanner(System.in);
List<Integer> list = new ArrayList<>();
while (scanner.hasNext()) {
    list.add(scanner.nextInt());
}
list.sort((o1, o2) -> o2 - o1);
list.forEach(System.out::println);

// convert an ArrayList to primitive int[]
int[] arr = list.stream().mapToInt(i->i).toArray();
```

---

> 以下是来自
> [http://stackoverflow.com/questions/718554/how-to-convert-an-arraylist-containing-integers-to-primitive-int-array](http://stackoverflow.com/questions/718554/how-to-convert-an-arraylist-containing-integers-to-primitive-int-array) 的解释。

If you are using java-8 there's also another way to do this.

```java
int[] arr = list.stream().mapToInt(i -> i).toArray();
```

What it does is:

- getting a Stream from the list
- obtaining an IntStream by mapping each element to itself (identity function), unboxing the int value hold by each Integer object (done automatically since Java 5)
- getting the array of int by calling toArray

You could also explicitly call intValue via a method reference, i.e:

```java
int[] arr = list.stream().mapToInt(Integer::intValue).toArray();
```

It's also worth mentioning that you could get a NullPointerException if you have any null reference in the list. This could be easily avoided by adding a filtering condition to the stream pipeline like this:

```java
//.filter(Objects::nonNull) also works
int[] arr = list.stream().filter(i -> i != null).mapToInt(i -> i).toArray();
```

Example:

```java
List<Integer> list = Arrays.asList(1, 2, 3, 4);
int[] arr = list.stream().mapToInt(i -> i).toArray(); //[1, 2, 3, 4]

list.set(1, null); //[1, null, 3, 4]
arr = list.stream().filter(i -> i != null).mapToInt(i -> i).toArray(); //[1, 3, 4]
```

最后再次感谢 [Alexis C.](http://stackoverflow.com/users/1587046/alexis-c) 的帮助～
