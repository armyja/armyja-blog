#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const glob = require('glob')

/**
 * 处理生成serive-worker.js加载middleware失败的问题
 */
main()

/**
 * mkdir -p out/_next/server/
 * cp .next/server/middleware-* out/_next/server/
 */
async function main() {
  await mkdirPath('out/_next/server')
  const pattern = '.next/server/middleware-*'
  const destination = 'out/_next/server/'
  const files = glob.sync(pattern)
  for (let file of files) {
    copy(file, path.join(destination, file.split('.next/server/')[1]))
  }
}

/**
 * 用于判断路径是否存在， 如果不存在，则创建一个
 * @param {string} pathStr 相对路径（如a/b/c）
 */
async function mkdirPath(pathStr) {
  var projectPath = path.join(process.cwd())
  var tempDirArray = pathStr.split('/')
  for (var i = 0; i < tempDirArray.length; i++) {
    projectPath = projectPath + path.sep + tempDirArray[i]
    if (await isFileExisted(projectPath)) {
      var tempstats = fs.statSync(projectPath)
      if (!tempstats.isDirectory()) {
        fs.unlinkSync(projectPath)
        fs.mkdirSync(projectPath)
      }
    } else {
      fs.mkdirSync(projectPath)
    }
  }
  return projectPath
}

/**
 * 判断文件存在
 */
function isFileExisted(path_way) {
  return new Promise((resolve, reject) => {
    fs.access(path_way, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

/**
 * 大文件拷贝
 */
function copy(src, dst) {
  fs.createReadStream(src).pipe(fs.createWriteStream(dst))
}
