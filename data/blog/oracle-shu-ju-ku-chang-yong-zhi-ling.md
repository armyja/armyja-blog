---
title: Oracle 数据库 常用指令
slug: oracle-shu-ju-ku-chang-yong-zhi-ling
date_published: 2016-04-01T04:49:44.000Z
date_updated: 2016-04-01T15:23:30.000Z
author: Jeffey Wang
tags: Database
---

> Oracle 数据库的学习笔记。

转换成中文环境

```sql
ALTER SESSION SET NLS_LANGUAGE = 'SIMPLIFIED CHINESE'
```

转换成英文环境

```sql
ALTER SESSION SET NLS_LANGUAGE = 'AMERICAN'
```

降序排序

```sql
SELECT * FROM TABLE_NAME ORDER BY COLUMN_NAME DESC
```

升序排序

```sql
SELECT * FROM TABLE_NAME ORDER BY COLUMN_NAME ASC
```

降序排序后选择头两行数据

```sql
SELECT *
    FROM (SELECT * FROM TABLE_NAME ORDER BY COLUMN_NAME DESC)
    WHERE ROWNUM <= 2
```

获取字符串的长度

```sql
SELECT (LENGTH(RTRIM(COLUMN_NAME,' ')))
    FROM TABLE_NAME
```
