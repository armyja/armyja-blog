---
title: ARTS打卡：第 2 周
slug: artsda-qia-di-2-zhou
date_published: 2019-08-26T12:32:36.000Z
date_updated: 2019-08-26T12:32:36.000Z
---

第 1 周 (20190805-20190811)

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

## 5. 最长回文子串

给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

**示例 1：**

> **输入:** "babad"
> **输出:** "bab"
> **注意:** "aba" 也是一个有效答案。

**示例 2：**

> **输入:** "cbbd"
> **输出:** "bb"

### 解法 5: Manacher's Algorithm 马拉车算法

马拉车算法 Manacher‘s Algorithm 是用来查找一个字符串的最长回文子串的线性方法，由一个叫 Manacher 的人在 1975 年发明的，这个方法的最大贡献是在于将时间复杂度提升到了线性。

首先我们解决下奇数和偶数的问题，在每个字符间插入 "#"，并且为了使得扩展的过程中，到边界后自动结束，在两端分别插入 "^" 和 "$"，两个不可能在字符串中出现的字符，这样中心扩展的时候，判断两端字符是否相等的时候，如果到了边界就一定会不相等，从而出了循环。经过处理，字符串的长度永远都是奇数了。

![](https://pic.leetcode-cn.com/ad2b5e0da4a3a35b60f60c9a5a2be07a8074f9be0fe1597351eeff7dc460789a-image.png)

首先我们用一个数组 P 保存从中心扩展的最大个数，而它刚好也是去掉 "#" 的原字符串的总长度。例如下图中下标是 6 的地方，可以看到 P[ 6 ] 等于 5，所以它是从左边扩展 5 个字符，相应的右边也是扩展 5 个字符，也就是 "#c#b#c#b#c#"。而去掉 # 恢复到原来的字符串，变成 "cbcbc"，它的长度刚好也就是 5。

![](https://pic.leetcode-cn.com/ae2c30d48d35faa7f3d0d8bc4fe18d0691f3d13dcfc5846ddce1bf7a002681f5-image.png)

#### 求原字符串下标

用 P 的下标 i 减去 P [ i ]，再除以 2，就是原字符串的开头下标了。

例如我们找到 P[ i ] 的最大值为 5，也就是回文串的最大长度是 5，对应的下标是 6，所以原字符串的开头下标是（6 - 5 ）/ 2 = 0。所以我们只需要返回原字符串的第 0 到 第（5 - 1）位就可以了。

#### 求每个 P [ i ]

接下来是算法的关键了，它充分利用了回文串的对称性。

我们用 C 表示回文串的中心，用 R 表示回文串的右边半径。所以 R = C + P[ i ]。C 和 R 所对应的回文串是当前循环中 R 最靠右的回文串。

让我们考虑求 P [ i ] 的时候，如下图。

用 i_mirror 表示当前需要求的第 i 个字符关于 C 对应的下标。

![](https://pic.leetcode-cn.com/29eb66280ca149c3bf5d9906e066b4a2b39d1bf8f9dd0533ca00479aca6f4f39-image.png)

我们现在要求 P [ i ]，如果是用中心扩展法，那就向两边扩展比对就行了。但是我们其实可以利用回文串 C 的对称性。i 关于 C 的对称点是 i_mirror，P [ i_mirror ] = 3，所以 P [ i ] 也等于 3。

但是有三种情况将会造成直接赋值为 P [ i_mirror ] 是不正确的，下边一一讨论。

##### 1. 超出了 R

![](https://pic.leetcode-cn.com/b0d52a5f30747e55ef09b3c7b7cfc23026e37040edc41f387263e8f8a0ba8f49-image.png)

当我们要求 P [ i ] 的时候，P [ mirror ] = 7，而此时 P [ i ] 并不等于 7，为什么呢，因为我们从 i 开始往后数 7 个，等于 22，已经超过了最右的 R，此时不能利用对称性了，但我们一定可以扩展到 R 的，所以 P [ i ] 至少等于 R - i = 20 - 15 = 5，会不会更大呢，我们只需要比较 T [ R+1 ] 和 T [ R+1 ]关于 i 的对称点就行了，就像中心扩展法一样一个个扩展。

##### 2. P [ i_mirror ] 遇到了原字符串的左边界

![](https://pic.leetcode-cn.com/714e6f768e67304fb7162ecac3ae85fcf23ad82a21456e8ca55ac2c8cfd2609e-image.png)

此时 P [ i_mirror ] = 1，但是 P [ i ] 赋值成 1 是不正确的，出现这种情况的原因是 P [ i_mirror ] 在扩展的时候首先是 "#" == "#"，之后遇到了 "^" 和另一个字符比较，也就是到了边界，才终止循环的。而 P [ i ] 并没有遇到边界，所以我们可以继续通过中心扩展法一步一步向两边扩展就行了。

##### 3. i 等于了 R

此时我们先把 P [ i ] 赋值为 0，然后通过中心扩展法一步一步扩展就行了。

#### 考虑 C 和 R 的更新

就这样一步一步的求出每个 P [ i ]，当求出的 P [ i ] 的右边界大于当前的 R 时，我们就需要更新 C 和 R 为当前的回文串了。因为我们必须保证 i 在 R 里面，所以一旦有更右边的 R 就要更新 R。

![](https://pic.leetcode-cn.com/5fbe52880634a9d5fa60ad5e126e8c5c38c5a6eadd0c901a3495dc1307d46d6b-image.png)

此时的 P [ i ] 求出来将会是 3，P [ i ] 对应的右边界将是 10 + 3 = 13，所以大于当前的 R，我们需要把 C 更新成 i 的值，也就是 10，R 更新成 13。继续下边的循环。

```java
public String preProcess(String s) {
    int n = s.length();
    if (n == 0) {
        return "^$";
    }
    String ret = "^";
    for (int i = 0; i &lt; n; i++)
        ret += "#" + s.charAt(i);
    ret += "#$";
    return ret;
}

// 马拉车算法
public String longestPalindrome2(String s) {
    String T = preProcess(s);
    int n = T.length();
    int[] P = new int[n];
    int C = 0, R = 0;
    for (int i = 1; i &lt; n - 1; i++) {
        int i_mirror = 2 * C - i;
        if (R &gt; i) {
            P[i] = Math.min(R - i, P[i_mirror]);// 防止超出 R
        } else {
            P[i] = 0;// 等于 R 的情况
        }

        // 碰到之前讲的三种情况时候，需要利用中心扩展法
        while (T.charAt(i + 1 + P[i]) == T.charAt(i - 1 - P[i])) {
            P[i]++;
        }

        // 判断是否需要更新 R
        if (i + P[i] &gt; R) {
            C = i;
            R = i + P[i];
        }

    }

    // 找出 P 的最大值
    int maxLen = 0;
    int centerIndex = 0;
    for (int i = 1; i &lt; n - 1; i++) {
        if (P[i] &gt; maxLen) {
            maxLen = P[i];
            centerIndex = i;
        }
    }
    int start = (centerIndex - maxLen) / 2; //最开始讲的求原字符串下标
    return s.substring(start, start + maxLen);
}
```

时间复杂度：for 循环里边套了一层 while 循环，难道不是 O(n²)？不！其实是 O(n)。不严谨的想一下，因为 while 循环访问 R 右边的数字用来扩展，也就是那些还未求出的节点，然后不断扩展，而期间访问的节点下次就不会再进入 while 了，可以利用对称得到自己的解，所以每个节点访问都是常数次，所以是 O(n)。

空间复杂度：O(n)。

#### 总结

时间复杂度从三次方降到了一次，美妙！这里两次用到了动态规划去求解，初步认识了动态规划，就是将之前求的值保存起来，方便后边的计算，使得一些多余的计算消失了。并且在动态规划中，通过观察数组的利用情况，从而降低了空间复杂度。而 Manacher 算法对回文串对称性的充分利用，不得不让人叹服，自己加油啦！

# Review：阅读并点评至少一篇英文技术文章

# Tip：学习至少一个技术技巧

# Share：分享一篇有观点和思考的技术文章
