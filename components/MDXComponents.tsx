/* eslint-disable react/display-name */
import { FunctionComponent, useMemo } from 'react'
import { getMDXComponent, MDXContentProps } from 'mdx-bundler/client'
import Image from './Image'
import CustomLink from './Link'
import TOCInline from './TOCInline'
import Pre from './Pre'
import type { MDXComponents } from 'mdx/types'
import { Author, Blog } from '@/lib/types'
import { Toc } from 'types/Toc'
// import { BlogNewsletterForm } from './NewsletterForm'

export const mDXComponents: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  //   BlogNewsletterForm: BlogNewsletterForm,
  wrapper: ({ components, layout, ...rest }) => {
    const Layout = require(`../layouts/${layout}`).default
    return <Layout {...rest} />
  },
}

export const MDXLayoutRenderer = ({
  layout,
  mdxSource,
  ...rest
}: {
  layout: string
  mdxSource: string
  toc?: Toc
  frontMatter: Blog
  authorDetails?: Author[]
  prev?: Blog
  next?: Blog
}) => {
  const MDXLayout: FunctionComponent<MDXContentProps> = useMemo(
    () => getMDXComponent(mdxSource),
    [mdxSource]
  )

  return <MDXLayout layout={layout} components={mDXComponents} {...rest} />
}
