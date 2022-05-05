import fs from 'fs'
import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/mdx'
import { Author, Blog as B } from '@/lib/types'
import { GetStaticProps } from 'next'
import { Toc } from 'types/Toc'
import languageDetector, { getDefaultLocale, getLanguageByFileName } from '@/lib/languageDetector'
import { getI18nProps } from '@/lib/getStatic'
import { i18n } from 'next-i18next'

const DEFAULT_LAYOUT = 'PostLayout'

export async function getStaticPaths() {
  const posts = getFiles('blog')
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split('/'),
        locale: getLanguageByFileName(p),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async function ({ params }) {
  const ctx: any = { params }
  const slug = params?.slug || ['']
  const locale = (params?.locale || getDefaultLocale()) + ''
  const allPosts = await getAllFilesFrontMatter('blog', '')
  const localePosts = allPosts.filter((p) => p.locale === locale)
  const otherLocales = allPosts
    .filter(
      (post) =>
        formatSlug(post.slug) === (Array.isArray(slug) ? slug.join('/') : slug) &&
        locale !== post.locale
    )
    .map((s) => s.locale)
  const postIndex = localePosts.findIndex(
    (post) =>
      formatSlug(post.slug) === (Array.isArray(slug) ? slug.join('/') : slug) &&
      locale === post.locale
  )
  const prev = localePosts[postIndex + 1] || null
  const next = localePosts[postIndex - 1] || null
  const post = await getFileBySlug('blog', Array.isArray(slug) ? slug.join('/') : slug, locale)
  const authorList = post.frontMatter.authors || ['default']
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug('authors', author)
    return authorResults.frontMatter
  })
  const authorDetails = await Promise.all(authorPromise)

  // rss
  if (allPosts.length > 0) {
    const rss = generateRss(allPosts)
    fs.writeFileSync('./public/feed.xml', rss)
  }

  return {
    props: {
      post,
      authorDetails,
      prev,
      next,
      otherLocales,
      ...(await getI18nProps(ctx, ['common', 'post'])),
    },
  }
}

type BlogProps = {
  post: {
    mdxSource: string
    toc: Toc
    // FIXME Guess??
    frontMatter: B
  }
  prev: B
  next: B
  otherLocales: string[]
  authorDetails: Author[]
}

export default function Blog({ post, authorDetails, prev, next, otherLocales }: BlogProps) {
  const { mdxSource, toc, frontMatter } = post
  languageDetector.cache && languageDetector.cache(i18n?.language || '')
  return (
    <>
      {process.env.NODE_ENV !== 'production' || frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          toc={toc}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          otherLocales={otherLocales}
          prev={prev}
          next={next}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
