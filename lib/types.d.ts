export type Pagination = {
  currentPage: number
  totalPages: number
}

export type Author = {
  name: string
  avatar: string
  occupation: string
  company: string
  email?: string
  twitter?: string
  linkedin?: string
  github?: string
  sinaWeibo?: string
}

export type Blog = {
  title: string
  slug: string
  tags: string[]
  summary: string
  draft: boolean
  neteaseSongId?: string
  date_published: string
  date_updated: string
  layout?: 'PostLayout'
}
export type BlogSEOProp = {
  fileName: string
  slug: string
  tags: string[]
  authorDetails?: Author[]
  title: string
  summary: string
  date_published: string | number
  date_updated: string | number
  url: string
  images: string[]
  canonicalUrl: string
}
export type TocHeading = {
  value: string
  depth: number
  url: string
}
