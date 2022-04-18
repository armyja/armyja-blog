---
title: Linux 技巧：将屏幕上所产生的信息写入指定文件
slug: linux-write-to-file-from-screen
date_published: 2017-09-20T15:47:12.000Z
date_updated: 2018-03-09T01:36:07.000Z
author: Jeffey Wang
tags: Linux
summary: 在做批量实验室，例如跑批量 MR 的作业，我们会写好 shell 脚本，然后启动脚本，等所有作业执行完再去看结果，但是这些执行时的信息如何保存下来到文件中呢？下面这个命令可以完成这个任务。
---

在做批量实验室，例如跑批量 MR 的作业，我们会写好 shell 脚本，然后启动脚本，等所有作业执行完再去看结果，但是这些执行时的信息如何保存下来到文件中呢？下面这个命令可以完成这个任务。

```bash
    sh batchjob.sh 2>&1 | tee mylog.log
```

C++ 程序也可如法炮制。

```bash
    ./a.out 2>&1 | tee a.out.log
```

其中 `sh batchjob.sh`：表示要执行的 shell 脚本；0，1，2：在 `linux` 分别表示标准输入、标准输出和标准错误信息输出。

下面来总结下重定向问题。

### 输入输出重定向之：'&lt;' and '>'

`<` and `>` 分别用来支持 `linux` 中的输入输出重定向，其中 `<` 支持输入重定向，`>` 支持输出重定向。

1.  `<`：重定向输入。
    `sh test.sh < hadoop-hadoop-jobtracker-brix-00.out`，将 `hadoop-hadoop-jobtracker-brix-00.out` 的内容作为 `test.sh` 的输入。

2.  `>`：将内容全局覆盖式的加入文件，相当于删除该文件并重新建立该文件，再写入的效果。

`ls * > test.txt` ，将 `ls *` 的所有信息输出到文件 `test.txt` 中。

1.  `>!`：如果存在则覆盖。

2.  `>&`：执行时屏幕上所产生的任何信息写入指定的文件中。

3.  `>>`：追加到文件中。

4.  `>>&`：屏幕上的信息追加到文件中。

### 标准输入输出

在 `Linux` 系统中：标准输入 `stdin` 默认为键盘输入；标准输出 `stdout` 默认为屏幕输出；标准错误输出 `stderr` 默认也是输出到屏幕（上面的 `std` 表示 `standard`）。在 `BASH` 中使用这些概念时一般将标准输出表示为 1，将标准错误输出表示为 2。下面我们举例来说明如何使用他们，特别是标准输出和标准错误输出。

### tee 命令

tee 指令会从标准输入设备读取数据，将其内容输出到标准输出设备，同时保存成文件。

```bash
    $ tee --help
    Usage: tee [OPTION]... [FILE]...
    Copy standard input to each FILE, and also to standard output.

      -a, --append              append to the given FILEs, do not overwrite
      -i, --ignore-interrupts   ignore interrupt signals
          --help     display this help and exit
          --version  output version information and exit

    If a FILE is -, copy again to standard output.

    Report tee bugs to bug-coreutils@gnu.org
    GNU coreutils home page: <http://www.gnu.org/software/coreutils/>
    General help using GNU software: <http://www.gnu.org/gethelp/>
    For complete documentation, run: info coreutils 'tee invocation'
```

转载自：[http://www.cnblogs.com/gslyyq/](http://www.cnblogs.com/gslyyq/)
