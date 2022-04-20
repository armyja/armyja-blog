import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import { Blog } from '@/lib/types'

const Music = dynamic(() => import('@/components/Music'), { ssr: false })
const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

import type { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const Home: NextPage<{ posts: Blog[] }> = ({ posts }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon-196.png" />
      </Head>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="flex flex-col items-stretch">
        <main className="flex-grow">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="space-y-2 pt-6 pb-8 md:space-y-5">
              <h1 className="text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10">
                Armyja
              </h1>
              <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                {siteMetadata.description}
              </p>
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {!posts.length && 'No posts found.'}
              {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
                const { slug, date_published, title, summary, tags, neteaseSongId }: Blog =
                  frontMatter
                return (
                  <li key={slug} className="py-5">
                    <article>
                      <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                        <dl>
                          <dt className="sr-only">Published on</dt>
                          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                            <time dateTime={date_published}>{formatDate(date_published)}</time>
                          </dd>
                        </dl>
                        <div className="space-y-5 xl:col-span-3">
                          <div className="space-y-2">
                            <div>
                              <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                <Link
                                  href={`/blog/${slug}`}
                                  className="text-gray-900 dark:text-gray-100"
                                >
                                  {title}
                                </Link>
                              </h2>
                              <div className="flex flex-wrap">
                                {tags.map((tag) => (
                                  <Tag key={tag} text={tag} />
                                ))}
                              </div>
                            </div>

                            {neteaseSongId && <Music neteaseSongId={neteaseSongId}></Music>}
                            <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                              {summary}
                            </div>
                          </div>
                          {/* <div className="text-base font-medium leading-6">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                              aria-label={`Read "${title}"`}
                            >
                              阅读更多 &rarr;
                            </Link>
                          </div> */}
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
          </div>
          {posts.length > MAX_DISPLAY && (
            <div className="flex justify-end text-base font-medium leading-6">
              <Link
                href="/blog"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label="all posts"
              >
                全部文章 &rarr;
              </Link>
            </div>
          )}
          {/* {siteMetadata.newsletter.provider !== '' && (
            <div className="flex items-center justify-center pt-4">
              <NewsletterForm />
            </div>
          )} */}
        </main>
      </div>
    </>
  )
}

export default Home
