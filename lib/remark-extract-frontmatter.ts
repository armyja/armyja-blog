import { Parent } from 'unist'
import { VFile } from 'vfile'
import { visit } from 'unist-util-visit'
import { load } from 'js-yaml'

type DepthNode = Node & { value: string }
type MyVistor = import('./visiterBuilder').Visitor<DepthNode>
export default function extractFrontmatter() {
  return (tree: Parent, file: VFile) => {
    const visitor: MyVistor = (node, index, parent) => {
      file.data.frontmatter = load(node.value)
    }
    visit(tree, 'yaml', visitor)
  }
}
