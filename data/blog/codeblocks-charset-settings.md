---
title: 'Code::Blocks 中文输出乱码的解决方案'
slug: codeblocks-charset-settings
date_published: 2017-12-04T12:09:07.000Z
date_updated: 2018-03-09T01:32:37.000Z
summary: 进入 Settings-Editor，设置编码为 UTF-8。进入 Settings-Compiler 和 Settings-Debugger，设置编译参数为：-finput-charset=UTF-8 -fexec-charset=GBK
---

进入 Settings-Editor，设置编码为 UTF-8：
![编辑器设置编码为 UTF-8](https://home.armyja.cn/content/images/2017/12/Snipaste_2017-12-04_19-58-28.png)

进入 Settings-Compiler 和 Settings-Debugger，设置编译参数为：

```bash
-finput-charset=UTF-8
-fexec-charset=GBK
```

![设置 Release 模式编译参数](https://home.armyja.cn/content/images/2017/12/Snipaste_2017-12-04_20-03-11.png)
![设置 Debug 模式编译参数](https://home.armyja.cn/content/images/2017/12/Snipaste_2017-12-04_20-04-13.png)
参考链接：[Code：Blocks 中文乱码问题原因分析和解决方法！](http://blog.csdn.net/softman11/article/details/6121538)
