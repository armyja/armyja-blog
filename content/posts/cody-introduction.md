---
title: "Cody介绍"
date: 2024-04-04T21:12:00+08:00
draft: false
author: "Armyja"
tags: []
keywords: ["AI"]
description: "Cody 是一个 AI 编码助手，负责编写、修复和维护您的代码。它使用 AI 和对代码库的深刻理解来收集上下文，帮助您更快地编写和理解代码。"
---
[Cody](https://sourcegraph.com/docs/cody) 是一个 AI 编码助手，负责编写、修复和维护您的代码。它使用 AI 和对代码库的深刻理解来收集上下文，帮助您更快地编写和理解代码。  

它是 Sourcegraph 旗下的产品。[Sourcegraph](https://sourcegraph.com) 是一个代码智能平台，可以深入理解您的代码，无论代码有多大或托管在何处，都能为现代开发人员体验提供支持。  
1、AI 代码助手：使用 Cody 更快地读取、写入和理解整个代码库  
2、代码搜索：搜索所有分支和所有代码主机的所有存储库  
3、代码智能：导航代码、查找引用、查看代码所有者、跟踪历史记录等  
4、修复和重构：跨存储库同时推出和跟踪大规模更改和迁移

我使用 Cody 的原因，是以前习惯在 Sourcegraph 看 Github 网站的源码，浏览比较方便。并且每月会员 Cody 比 Copilot 便宜一点。  
在 `VSCode` 安装 `Cody AI` 后，推荐两个配置：  
1、自定义输出的语言
```
{
    "cody.chat.preInstruction": "Answer all my questions in Chinese."
}
```
2、配置用户级别的自定义指令。在 `~/.vscode/cody.json` 设置[自定义指令](https://sourcegraph.com/docs/cody/capabilities/commands#custom-commands)  
```json
{
  "commit-message": {
    "description": "Commit message for current changes",
    "prompt": "Suggest an informative commit message by summarizing code changes from the shared command output. The commit message should follow the conventional commit format and provide meaningful context for future readers.",
    "context": {
      "selection": false,
      "command": "git diff --cached"
    }
  },
  "current-dir": {
    "description": "Explain current directory",
    "prompt": "At a high level, explain what this directory is used for.",
    "context": {
      "currentDir": true,
      "selection": false
    }
  }
}
```
做了如上配置后，可以在 `VSCode` 使用预置命令用中文解释代码、用自定义命令解释当前文件夹的代码、生成提交说明，体验非常好。
