import { visit, Node } from 'unist-util-visit'
import BananaSlug from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import { Tree } from './visiterBuilder'
type DepthNode = Node & { depth: string }
type MyVistor = import('./visiterBuilder').Visitor<DepthNode>

export default function remarkTocHeadings(options: {
  exportRef: { value: string; url: string; depth: any }[]
}) {
  return (tree: Tree) => {
    const visitor: MyVistor = (node, index, parent) => {
      const textContent = toString(node)
      options.exportRef.push({
        value: textContent,
        url: '#' + BananaSlug.slug(textContent),
        depth: node.depth,
      })
    }
    visit(tree, 'heading', visitor)
  }
}
