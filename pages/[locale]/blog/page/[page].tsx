import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import ListLayout from '@/layouts/ListLayout'
import { POSTS_PER_PAGE } from '../../blog'
import { Blog, Pagination as P } from '@/lib/types'
import { GetStaticProps } from 'next'
import { getDefaultLocale } from '@/lib/languageDetector'
import { getI18nProps } from '@/lib/getStatic'

export async function getStaticPaths() {
  const totalPosts = await getAllFilesFrontMatter('blog', '')
  const totalPageMap: { [key: string]: any } = {}
  for (let post of totalPosts) {
    if (!totalPageMap[post?.locale + '']) {
      totalPageMap[post?.locale + ''] = 0
    }
    totalPageMap[post?.locale + '']++
  }
  let paths: any[] = []
  for (let locale in totalPageMap) {
    const totalPages = Math.ceil(totalPageMap[locale] / POSTS_PER_PAGE)
    paths = paths.concat(
      Array.from({ length: totalPages }, (_, i) => ({
        params: { page: (i + 1).toString(), locale },
      }))
    )
  }

  return {
    paths,
    fallback: false,
  }
}
export const getStaticProps: GetStaticProps = async function getStaticProps(context) {
  // FIXME should not cast
  const page = context.params?.page as string
  const posts = await getAllFilesFrontMatter(
    'blog',
    (context.params?.locale || getDefaultLocale()) + ''
  )
  const pageNumber = parseInt(page)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      posts,
      initialDisplayPosts,
      pagination,
      ...(await getI18nProps(context as any)),
    },
  }
}

export default function PostPage({
  posts,
  initialDisplayPosts,
  pagination,
}: {
  posts: Blog[]
  initialDisplayPosts: Blog[]
  pagination: P
}) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}
