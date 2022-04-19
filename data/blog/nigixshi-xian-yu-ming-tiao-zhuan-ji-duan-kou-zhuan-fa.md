---
title: Nginx：域名跳转、端口转发
slug: nigixshi-xian-yu-ming-tiao-zhuan-ji-duan-kou-zhuan-fa
date_published: 2016-03-25T11:47:15.000Z
date_updated: 2016-04-03T17:21:26.000Z
author: Jeffey Wang
tags: Nginx
---

> 让我烦心的事情是：深大网址[^1]没有完善页面跳转！

### 目标

1. 顶级域名跳转至二级域名，如 armyja.cn 跳转至 www.armyja.cn
2. 端口转发： Nginx 监听 80 端口，将不同二级域名地址转发至不同网站项目

### 步骤

> 1.安装 Nginx
>
> 2.修改 Nginx 配置文件
>
> 3.建立自己的 Nginx 配置文件
>
> 4.重启 Nginx

#### 安装 Nginx

`sudo apt-get install nginx`

#### 修改 Nginx 配置文件

Nginx 的安装目录在 `/etc/nginx` 或 `/usr/local/nginx` 。编辑 `nginx.conf` 如下部分，设置 **生效的配置目录** ：

```
##
# Virtual Host Configs
##

include /etc/nginx/conf.d/*.conf;
include /etc/nginx/sites-enabled/*;
include /etc/nginx/sites-available/*;
```

#### 建立自己的 Nginx 配置文件

在 **生效的配置目录** 中建立配置文件。如在 `/etc/nginx/sites-available/` 下建立 `mysite.conf` ，内容如下：

```
server{
    listen 0.0.0.0:80; # 监听的端口号
    access_log /var/log/nginx/armyja.log;

    location / {
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_set_header X-Real-IP $remote_addr;

        # 二级域名跳转到一级域名
        if ($host = 'armyja.cn' ) {
        rewrite ^/(.*)$ http://www.armyja.cn$1 permanent;
        }

        # 网址 www.armyja.cn 指向 ghost 博客
        if ($host = 'www.armyja.cn' ){
        proxy_pass http://127.0.0.1:2368;
        }

        # 网址 supervisor.armyja.cn 指向 supervisor 的 Web 界面
        if ($host = 'supervisor.armyja.cn' ){
        proxy_pass http://127.0.0.1:9001;
        }

    }
}
```

#### 重启 nginx

终端输入 `service nginx restart`

enjoy ~
