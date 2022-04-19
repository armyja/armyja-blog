---
title: CMake Debug 模式和 Release 模式
slug: cmake-debug-release
date_published: 2017-09-22T06:40:11.000Z
date_updated: 2018-03-09T01:35:38.000Z
author: Jeffey Wang
tags: C++, CMake
---

在 `CMake` 中编译 debug 模式，在 `CMakeLists.txt` 中添加如下两行：

```bash
SET(CMAKE_CXX_FLAGS_DEBUG "$ENV{CXXFLAGS} -O0 -Wall -g -ggdb ")
SET(CMAKE_CXX_FLAGS_RELEASE "${ENV{CXXFLAGS} -O3 -Wall")
```

然后，在编译的时候，使用如下命令（Debug / Release 选其一）：

```bash
cmake -DCMAKE_BUILD_TYPE=Debug/Release  path
```

第三个参数 `path` 是指项目的顶层路径。

参考资料：[http://blog.sina.com.cn/s/blog_6b02ec9a0100vahz.html](http://blog.sina.com.cn/s/blog_6b02ec9a0100vahz.html)
