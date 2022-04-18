import { visit, Node } from 'unist-util-visit'
import type { Tree, Visitor } from './visiterBuilder'
type LangNode = Node & { lang: string }
type MyVistor = Visitor<LangNode>
const visitor: MyVistor = (node, index, parent) => {
  const nodeLang = node.lang || ''
  let language = ''
  let title = ''

  if (nodeLang.includes(':')) {
    language = nodeLang.slice(0, nodeLang.search(':'))
    title = nodeLang.slice(nodeLang.search(':') + 1, nodeLang.length)
  }

  if (!title) {
    return
  }

  const className = 'remark-code-title'

  const titleNode = {
    type: 'mdxJsxFlowElement',
    name: 'div',
    attributes: [{ type: 'mdxJsxAttribute', name: 'className', value: className }],
    children: [{ type: 'text', value: title }],
    data: { _xdmExplicitJsx: true },
  }
  if (index !== null) {
    parent?.children.splice(index, 0, titleNode)
  }
  node.lang = language
}
export default function remarkCodeTitles() {
  return (tree: Tree) => visit(tree, 'code', visitor)
}
