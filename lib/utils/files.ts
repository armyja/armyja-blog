import fs from 'fs'
import path from 'path'

// reduce 的重点一定是字符串数组
const pipe =
  (...fns: Function[]) =>
  (x: string) =>
    fns.reduce((v: string | string[], f) => f(v), x) as string[]

const flattenArray = (input: string[]) =>
  input.reduce((acc: string[], item) => [...acc, ...(Array.isArray(item) ? item : [item])], [])

const map = (fn: Function) => (input: { map: (arg0: Function) => any }) => input.map(fn)

const walkDir = (fullPath: string) => {
  return fs.statSync(fullPath).isFile() ? fullPath : getAllFilesRecursively(fullPath)
}

const pathJoinPrefix = (prefix: string) => (extraPath: string) => path.join(prefix, extraPath)

const getAllFilesRecursively = (folder: string) =>
  pipe(fs.readdirSync, map(pipe(pathJoinPrefix(folder), walkDir)), flattenArray)(folder)

export default getAllFilesRecursively
