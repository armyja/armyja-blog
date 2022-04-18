import { visit } from 'unist-util-visit'
import { load } from 'js-yaml'
import { Tree } from './visiterBuilder'
type DepthNode = Node & { value: string }
type MyVistor = import('./visiterBuilder').Visitor<DepthNode>
export default function extractFrontmatter() {
  return (tree: Tree, file: { data: { frontmatter: unknown } }) => {
    const visitor: MyVistor = (node, index, parent) => {
      file.data.frontmatter = load(node.value)
    }
    visit(tree, 'yaml', visitor)
  }
}
