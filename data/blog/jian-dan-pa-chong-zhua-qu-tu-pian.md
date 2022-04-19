---
title: Python 爬虫：简单抓取图片
slug: jian-dan-pa-chong-zhua-qu-tu-pian
date_published: 2016-03-25T12:20:28.000Z
date_updated: 2016-03-26T09:45:38.000Z
author: Jeffey Wang
tags: Python
---

> 最近爬了数千张头像。告诉你我是如何做到滴。

### 目标

暴力抓取 **特定网址** 下 **特定数字格式** 的 `jpg` 文件。

### 工具

[Requests](http://www.python-requests.org/) ： 一个使用 Apache2 Licensed 许可证的 HTTP 库。

安装 Requests ：`pip install requests`

### 栗子

获得 `http://127.0.0.1/photos/` 下从 `000001.JPG` 至 `999999.JPG` 的图片。
`get_pic.py` 代码如下：

```python
import requests
import os # 用于操作文件

requests.adapters.DEFAULT_RETRIES = 5

url = 'http://127.0.0.1/photos/' # 抓取该网址下的图片
added=[] # 保存本次爬虫下载的文件名
p = 1 # 设置数字起点
max= 10000000 # 设置数字终点

while p < max:
	ss = str(p)
	while len(ss) < 6:
		ss = '0' + ss # 转换为 6 位字符串（ 如 1 转换成 000001 ），存储到ss
	if not os.path.exists('%s.JPG' %ss): # 如果 JPG 文件不存在，尝试下载它
		print('saving: %s'%ss)
		try:
			r = requests.get(url + '%s.JPG' %ss, timeout=2) # 拼接成完整网址，请求获取图片
			if r.status_code == requests.codes.ok: # 如果成功访问
				with open('%s.JPG' %ss, 'wb') as pic: #
					pic.write(r.content) # 将获取内容写入 JPG 文件
				print('%s saved!' %ss)
				added.append(p) # 保存文件名至列表
		except: # 如果访问失败
			print('save %s failed' %ss)
	else:
		print('%s exists' %ss)
		p = p + 1

print(added) # 输出已下载的 JPG 的文件名
```
