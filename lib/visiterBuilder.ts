import { Node, VisitorResult, Parent } from 'unist-util-visit'
export type Tree = import('unist').Node<import('unist').Data>
export type Visitor<Visited extends Node = Node, Ancestor extends Parent = Parent> = (
  node: Visited,
  index: Visited extends Node ? number | null : never,
  parent: Ancestor extends Node ? Ancestor | null : Ancestor
) => VisitorResult
