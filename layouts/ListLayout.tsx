import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { useEffect, useState } from 'react'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'
import { Blog, Pagination as P } from '@/lib/types'
import fullTextSearch from '@/lib/fullTextSearch'
import { getLanguageByFileName } from '@/lib/languageDetector'
import { debounce } from 'lodash'

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: {
  posts: Blog[]
  title: string
  initialDisplayPosts?: Blog[]
  pagination?: P
}) {
  const [searchValue, setSearchValue] = useState('')
  console.log(initialDisplayPosts)
  const [filteredBlogPosts, setFilteredBlogPosts] = useState(new Array<Blog>())
  const displayPosts =
    searchValue.trim().length === 0
      ? initialDisplayPosts.length > 0
        ? initialDisplayPosts
        : posts
      : filteredBlogPosts
  useEffect(() => {
    if (searchValue.trim().length === 0) {
      return
    }
    const localfilteredBlogPosts = posts.filter((frontMatter) => {
      const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
      return searchContent.toLowerCase().includes(searchValue.toLowerCase())
    })
    setFilteredBlogPosts(localfilteredBlogPosts)
    let existSlugs = new Set(localfilteredBlogPosts.map((s) => s.slug))

    fullTextSearch(searchValue).then((list) => {
      const allPostSlugsMap = new Map(posts.map((s) => [s.slug, s]))
      let filteredPostList = list
        .filter((s) => getLanguageByFileName(s) === posts[0].locale)
        .map((s) => s.split('.')[0])
        .filter((s) => allPostSlugsMap.has(s) && !existSlugs.has(s))
        .map((s) => allPostSlugsMap.get(s) || posts[0])
      setFilteredBlogPosts([...localfilteredBlogPosts, ...filteredPostList])
    })
  }, [posts, searchValue])
  return (
    <>
      <div className="divide-y">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={debounce((e) => setSearchValue(e.target.value), 500)}
              placeholder="Search articles"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul>
          {!filteredBlogPosts.length && !displayPosts && 'No posts found.'}
          {displayPosts.map((frontMatter) => {
            const { locale, slug, date_published, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-4">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date_published}>{formatDate(date_published, locale)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-3 xl:col-span-3">
                    <div>
                      <h3 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link
                          href={`/blog/${slug}`}
                          prefixI18n
                          className="text-gray-900 dark:text-gray-100"
                        >
                          {title}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                      {summary}
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
