---
title: ARTS打卡：第 1 周
slug: arts-week-001
date_published: 2019-08-05T01:07:05.000Z
date_updated: 2019-08-11T14:45:59.000Z
author: Jeffey Wang
tags: ARTS
---

第 1 周 (20190729-20190804)

> ARTS 是什么？
>
> Algorithm：每周至少做一个 leetcode 的算法题；
>
> Review：阅读并点评至少一篇英文技术文章；
>
> Tip：学习至少一个技术技巧；
>
> Share：分享一篇有观点和思考的技术文章。

# Algorithm：每周至少做一个 leetcode 的算法题

## 2. 两数相加

给出两个 **非空** 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 **逆序** 的方式存储的，并且它们的每个节点只能存储 **一位** 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 `0` 之外，这两个数都不会以 `0` 开头。

**示例：**

> **输入：** (2 -> 4 -> 3) + (5 -> 6 -> 4)
> **输出：** 7 -> 0 -> 8
> **原因：** 342 + 465 = 807

来源：力扣（LeetCode）

链接：[https://leetcode-cn.com/problems/add-two-numbers](https://leetcode-cn.com/problems/add-two-numbers)

## 初步解法

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
ListNode i1 = l1;
ListNode i2 = l2;
ListNode p = new ListNode(0);
ListNode result = p;
int carryBit = 0;
int ret = 0;
while (i1 != null || i2 != null) {
if (i1 != null && i2 != null) {
    ret = i1.val + i2.val + carryBit;
    carryBit = ret / 10;
    result.val = ret % 10;
} else if (i1 != null && i2 == null) {
    ret = i1.val + carryBit;
    carryBit = ret / 10;
    result.val = ret % 10;
} else if (i1 == null && i2 != null) {
    ret = i2.val + carryBit;
    carryBit = ret / 10;
    result.val = ret % 10;
}
if ((i1 != null && i1.next != null) ||
    (i2 != null && i2.next != null)) {
    result.next = new ListNode(0);
    result = result.next;
} else {
    if (carryBit == 1) {
        result.next = new ListNode(1);
    }
    break;
}
if (i1 != null) {
    i1 = i1.next;
}
if (i2 != null) {
    i2 = i2.next;
}
}
return p;
}
}
```

## 提交记录

失败 2 次，后 3 次重复提交，优化性能。
提交时间提交结果执行用时内存消耗语言 9 小时前通过 5 ms46.6 MBJava9 小时前通过 6 ms42.9 MBJava9 小时前通过 10 ms47.9 MBJava9 小时前解答错误 N/AN/AJava9 小时前执行出错 N/AN/AJava

## 算法改进

代码可读性差：`if` 语句嵌套太多；函数过长。

优化解法：[方法：初等数学](https://leetcode-cn.com/problems/add-two-numbers/solution/liang-shu-xiang-jia-by-leetcode)，代码如下：

```java
public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    ListNode dummyHead = new ListNode(0);
    ListNode p = l1, q = l2, curr = dummyHead;
    int carry = 0;
    while (p != null || q != null) {
        int x = (p != null) ? p.val : 0;
        int y = (q != null) ? q.val : 0;
        int sum = carry + x + y;
        carry = sum / 10;
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
        if (p != null) p = p.next;
        if (q != null) q = q.next;
    }
    if (carry > 0) {
        curr.next = new ListNode(carry);
    }
    return dummyHead.next;
}
```

代码重构思路：

- 变量命名：`i1`、`i2` VS `p`、`q`。
- `dummyHead` 避免一次冗长的 `if` 语句判断。
- 追加最高位 `carry = 1` 的新节点的语句，可以放至 `while` 循环之外。
- 善用三目运算，简化 `if` 语句，尽量大地提取共性，将差异性缩小在变量值的层面。
- 存储相加结果的变量应该放在 `while` 循环中，明晰变量的作用域。

# Review：阅读并点评至少一篇英文技术文章

（第二周补齐）

# Tip：学习至少一个技术技巧

使用 IntelliJ IDEA 导入 Gradle 项目，并配置 HotSwap。

## 导入 Gradle 项目

[https://stackoverflow.com/questions/8774024/intellij-working-on-multiple-projects](https://stackoverflow.com/questions/8774024/intellij-working-on-multiple-projects)

![import module](https://bucket.armyja-online.uk/blog/content/images/2019/08/---.jpg)

## 配置 HotSwap

[https://stackoverflow.com/questions/6402162/how-to-enable-intellij-hot-code-swap](https://stackoverflow.com/questions/6402162/how-to-enable-intellij-hot-code-swap)

After below modifications and enabling hot swap, a change in a Java file took 1-2 seconds of restart time. (Initial start time is around 7 seconds for me).

I hope below method helps...

---

First, you need to check “Make project automatically” in preferences menu.

To open preferences menu;

you can go to top menu and click;

```
    IntelliJ IDEA -> Preferences
```

or you can type below shortcut via keyboard;

```
    cmd + option + s
```

Then, you can check Make project automatically as in below picture;

![Make project automatically](https://bucket.armyja-online.uk/blog/content/images/2019/08/N7v5k.png.jpg)

Secondly, you need to modify compiler.automake.allow.when.app.running registry setting as true.

To open registry, you need to click below keyboard shortcut:

```
    cmd + shift + a
```

Type registry as in below picture, select Registry, and hit enter button of keyboard;

![Registry](https://bucket.armyja-online.uk/blog/content/images/2019/08/zWMgO.png)

After Registry window opened, type compiler.automake to see compiler.automake.allow.when.app.running option, and check it as in below picture;

![automake](https://bucket.armyja-online.uk/blog/content/images/2019/08/K2AAA.png)

Than, you need to restart IntelliJ to make registry changes work.

Go to Setting --> Select Debug --> HotSwap
![HotSwap](https://bucket.armyja-online.uk/blog/content/images/2019/08/uUB99.png)

# Share：分享一篇有观点和思考的技术文章

[Apache 的架构师们遵循的 30 条设计原则](http://mp.weixin.qq.com/s?__biz=MzIxMzEzMjM5NQ==&mid=2651032680&idx=1&sn=d0bf99f49c9783813753bdc05491ea40&chksm=8c4c596cbb3bd07a2d29ae67c7c3dc89eb4e0b914495fdf8f3a2ca24f10238bda2f9cb65547a&mpshare=1&scene=1&srcid=08034Vyc0PrWAktQHPphBAMj&sharer_sharetime=1564790752217&sharer_shareid=598314c0af7e43bd448bcdb629fdaa9b#rd)

> 本文作者叫 Srinath，是一位科学家，软件架构师，也是一名在分布式系统上工作的程序员。 他是 Apache Axis2 项目的联合创始人，也是 Apache Software 基金会的成员。 他是 WSO2 流处理器（ wso2.com/analytics ）的联席架构师。 Srinath 撰写了两本关于 MapReduce 和许多技术文章的书。 他获得了博士学位。 来自美国印第安纳大学。

Srinath 通过不懈的努力最终总结出了 30 条架构原则，他主张架构师的角色应该由开发团队本身去扮演，而不是专门有个架构师团队或部门。Srinath 认为架构师应该扮演的角色是一个引导者，讨论发起者，花草修建者，而不是定义者和构建者。Srinath 为了解决团队内部的架构纷争和抉择，制定了以下 30 条原则，这些原则被成员们广泛认可，也成为了新手架构师的学习途径。
