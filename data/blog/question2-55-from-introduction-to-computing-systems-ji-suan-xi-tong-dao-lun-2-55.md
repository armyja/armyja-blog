---
title: 计算系统导论 题目 2.55
slug: question2-55-from-introduction-to-computing-systems-ji-suan-xi-tong-dao-lun-2-55
date_published: 2016-03-31T07:39:16.000Z
date_updated: 2016-04-01T05:10:32.000Z
author: Jeffey Wang
tags: Other
---

Q：假设一个黑箱函数，该黑箱函数是一个 m 位四进制数，输出是一位四进制数字。试问该黑箱函数有多少种可能的实现？

（提示：排列组合，对于任意一个特定输入，有 4 种可能的输出）

---

**Lee, Dalton Wayne**

2.55 part G is giving some of us a big problem. Could it perhaps be explained a little better or could we get some kind of hint?

---

**Grady, Ryan William**

In lecture 5, Prof. Lumetta talked about the total number of functions that can be created using 2, 3 and n – bit inputs meaning the total number of unique truth table outputs for a given number of inputs. Look over that part in your notes and it should be fairly straightforward to create an analogous argument for quad numbers.

> A:

> there are m inputs, everyone has 4 conditions\*(1,2,3) so there are 4^m=I inputs.

> Also there are 4 outputs for each input.

> So the Answer is (4^m)^4=4^4m

> if you cannot get the outcome, just try to imagine what will you get if you have n 1-digit binary code input and 1 output?

> In=2^n possible

> Out=2 possible

> for

> 0,0-?

> 0,1-?

> 1,0-?

> 1,1-?

> the output might have 2^4 C.

> So after all, the answer is (2^2)^2

> for m x-based 1-digit input in a black box and 1-digit x^based outcome,

> there are (x^m)^x=x^xm

原文链接：[https://sujiyan.wordpress.com/tag/ece198/](https://sujiyan.wordpress.com/tag/ece198/)
