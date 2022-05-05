import { getI18nProps, getStaticPaths } from '@/lib/getStatic'

import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'
import { Blog } from '@/lib/types'

const DEFAULT_LAYOUT = 'AuthorLayout'

export async function getStaticProps(ctx: any) {
  const authorDetails = await getFileBySlug('authors', 'default')
  return { props: { ...(await getI18nProps(ctx)), authorDetails } }
}
export { getStaticPaths }

export default function About({
  authorDetails,
}: {
  authorDetails: { mdxSource: string; frontMatter: Blog }
}) {
  const { mdxSource, frontMatter } = authorDetails

  return (
    <>
      <MDXLayoutRenderer
        layout={frontMatter.layout || DEFAULT_LAYOUT}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
      />
    </>
  )
}
