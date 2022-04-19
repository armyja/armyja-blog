---
title: Atom 导出包列表
slug: atom-make-package-list
date_published: 2017-01-09T09:34:39.000Z
date_updated: 2018-03-09T01:39:05.000Z
author: Jeffey Wang
tags: Atom
summary: Make an Atom Package List and install the given Atom package from `my-packages.txt` to `~/.atom/packages/<package_name>` .
---

Make an Atom Package List.

```bash
$ apm list --installed --bare > my-packages.txt
```

Install the given Atom package from `my-packages.txt` to `~/.atom/packages/<package_name>` .

```bash
$ apm install --packages-file my-packages.txt
```

Thanks to: [How can I make the package list portable?](https://discuss.atom.io/t/how-can-i-make-the-package-list-portable/12433)
