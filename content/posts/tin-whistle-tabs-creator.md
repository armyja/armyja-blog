---
title: 洞洞谱制作
date: 2024-05-10T00:04:41+08:00
lastmod: 2024-05-10T00:04:41+08:00
draft: false
author: "Armyja"    
tags: ["whistle"]
summary: ''
showComments: true
---
<!DOCTYPE html>
<html>

<head>
    <title>洞洞谱制作</title>
    <meta name=viewport content="width = device-width, initial-scale = 1">
    <style>
        .l {
            writing-mode: vertical-rl;
            letter-spacing: 0.2ch;
        }
        #p_title {
            font-size: 1.2em;
            font-weight: bold;
        }
        #box>input,#box>button,#box>textarea {
            border: 1px solid #ccc;
        }
    </style>
</head>

<body>
    <div id=box>
        <select id="type">
            <option value="5">全按作5</option>
            <option value="1">全按作1</option>
        </select>
        标题：<input type="text" id="title">
        <br />
        简谱（1、(5)、[3]、[[1]]...）
        <br />
        <textarea id=content></textarea>
        <button id='btn'>生成</button>
        <br />
        <br />
        <div id=p>
            <div id="p_title"></div>
            <div id="p_type"></div>
            <br />
            <div id="preview"></div>
        </div>
    </div>
    <script>
        normal = {
            ' ': '<span class="l"> </span>',
            '\n': '<br/><br/>'
        }
        one = {
            '1': 'bbbbbb',
            '2': 'bbbbbw',
            '3': 'bbbbww',
            '4': 'bbbwww',
            '5': 'bbwwww',
            '6': 'bwwwww',
            '7': 'wwwwww',
            '[1]': 'wbbbbb+',
            '[2]': 'bbbbbw+',
            '[3]': 'bbbbww+',
            '[4]': 'bbbwww+',
            '[5]': 'bbwwww+',
            '[6]': 'bwwwww+',
            '[7]': 'wwwwww+',
            '[[1]]': 'wbbbbb+',
        }
        five = {
            '(5)': 'bbbbbb',
            '(6)': 'bbbbbw',
            '(7)': 'bbbbww',
            '1': 'bbbwww',
            '2': 'bbwwww',
            '3': 'bwwwww',
            '4': 'wbbwww',
            '5': 'wbbbbb+',
            '6': 'bbbbbw+',
            '7': 'bbbbww+',
            '[1]': 'bbbwww+',
            '[2]': 'bbwwww+',
            '[3]': 'bwwwww+',
            '[4]': 'hwwwww+',
            '[5]': 'wbbbbb+',
        }
        const c_h = '◐'
        const c_b = '●'
        const c_w = '○'
        for (let k in one) {
            one[k] = one[k].replaceAll('b', c_b).replaceAll('w', c_w)
            if (one[k].length < 7) {
                one[k] += '&nbsp;&nbsp;'
            }
        }
        for (let k in five) {
            five[k] = five[k].replaceAll('b', c_b).replaceAll('w', c_w).replaceAll('h', c_h)
            if (five[k].length < 7) {
                five[k] += '&nbsp;&nbsp;'
            }
        }
        btn.onclick = function () {
            updateContent()
            updateTitle()
            updateType()
        }
        function updateTitle() {
            p_title.textContent = title.value
        }
        title.onchange = updateTitle
        function updateType() {
            p_type.textContent = type.options[type.selectedIndex].text
        }
        type.onchange = updateType;
        function updateContent() {
            let str = content.value.trim()
            let arr = parse(str)
            let html = gen(arr)
        }
        content.onchange = updateContent
        function gen(arr) {
            let ret = ''
            for (let s of arr) {
                if (s in normal) {
                    ret += normal[s]
                    continue
                }
                let current = type.value === '1' ? one : five;
                if (s in current) {
                    ret += `<span class="l">${current[s]}</span>`
                }
            }
            preview.innerHTML = ret;
        }
        function parse(str) {
            let arr = [];
            for (i = 0; i < str.length; i++) {
                if (str[i] === '[') {
                    if (str[i + 1] === '[') {
                        arr.push(str.substr(i, 5));
                        i += 4;
                        continue;
                    }
                    arr.push(str.substr(i, 3));
                    i += 2;
                    continue;
                }
                if (str[i] === '(') {
                    arr.push(str.substr(i, 3));
                    i += 2;
                    continue;
                }
                arr.push(str[i])
            }
            return arr;
        }
    </script>
</body>

</html>