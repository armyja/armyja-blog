---
title: WebStorm：自动编译  scss 文件
slug: webstorm-zi-dong-bian-yi-scss-wen-jian
date_published: 2016-04-04T04:42:55.000Z
date_updated: 2016-04-04T16:31:48.000Z
author: Jeffey Wang
tags: WebStorm, CSS
---

### 前期准备：安装 Ruby 和 sass

安装教程参见 [http://www.w3cplus.com/sassguide/install.html](http://www.w3cplus.com/sassguide/install.html)

ps: 如果因为证书问题无法添加淘宝的源，可以试试

    $ gem source -a https://gems.ruby-china.org

或者

    $ gem source -a http://gems.ruby-china.org

虽然不清楚使用 http 协议有什么弊端 ... 总之能安装上 sass 就好 ~

### 在 WebStorm 上添加 File Watchers

在 WebStorm Settings 添加如下配置：

![](https://armyja-pic.oss-cn-guangzhou.aliyuncs.com/content/images/2016/04/----_20160404123302.png)

修改下面两个地方就可以一起生成'\*.map'文件：

    'Arguments': --no-cache --update $FileName$:$FileNameWithoutExtension$.css

修改后：

    'Arguments': --no-cache --update --sourcemap --watch $FileName$:$FileNameWithoutExtension$.css

另一处：

    'Output paths to refresh': $FileNameWithoutExtension$.css

修改后：

    'Output paths to refresh': $FileNameWithoutExtension$.css:$FileNameWithoutExtension$.css.map

![](https://armyja-pic.oss-cn-guangzhou.aliyuncs.com/content/images/2016/04/----_20160404124236.png)

OK，修改完保存，现在新建 `style.scss` 后就会自动生成 `style.css` 和 `style.css.map` 啦。

### 补充：sass 命令行其他配置选项

运行命令行帮助文档，可以获得所有的配置选项

    sass -h

我们一般常用的有 `--style`，`--sourcemap`。

    sass --watch style.scss:style.css --style compact
    sass --watch style.scss:style.css --sourcemap
    sass --watch style.scss:style.css --style expanded --sourcemap
    sass --watch style.scss:style.css --debug-info

- `--style` 表示解析后的 css 是什么格式，有四种取值分别为：`nested`，`expanded`，`compact`，`compressed`。
- `--sourcemap` 表示开启 sourcemap 调试。开启 sourcemap 调试后，会生成一个后缀名为 `.css.map` 文件。

### 四种 style 生成后的 css

```css
// nested
#main {
  color: #fff;
  background-color: #000;
}
#main p {
  width: 10em;
}

.huge {
  font-size: 10em;

  font-weight: bold;

  text-decoration: underline;
}

// expanded

# main {
  color: #fff;

  background-color: #000;
}

# main p {
  width: 10em;
}

.huge {
  font-size: 10em;

  font-weight: bold;

  text-decoration: underline;
}

// compact

# main {
  color: #fff;
  background-color: #000;
}

# main p {
  width: 10em;
}

.huge {
  font-size: 10em;
  font-weight: bold;
  text-decoration: underline;
}

// compressed

# main {
  color: #fff;
  background-color: #000;
}
#main p {
  width: 10em;
}
.huge {
  font-size: 10em;
  font-weight: bold;
  text-decoration: underline;
}

参考链接：http: //www.w3cplus.com/sassguide/compile.html;; ;
```
