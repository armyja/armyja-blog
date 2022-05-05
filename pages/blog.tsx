import { getI18nProps, getStaticPaths } from '@/lib/getStatic'

import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import { Blog as B, Pagination as P } from '@/lib/types'
import { getDefaultLocale } from '@/lib/languageDetector'

export const POSTS_PER_PAGE = 5

// export { getStaticPaths }
export async function getStaticProps(ctx: any) {
  const posts: B[] = await getAllFilesFrontMatter('blog', ctx?.params?.locale || getDefaultLocale())
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination, ...(await getI18nProps(ctx)) } }
}

export default function Blog({
  posts,
  initialDisplayPosts,
  pagination,
}: {
  posts: B[]
  initialDisplayPosts: B[]
  pagination: P
}) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}
