import siteMetadata from '@/data/siteMetadata'

const formatDate = (date: number | string | Date) => {
  let options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  // 类型“{ year: string; month: string; day: string; }”的参数不能赋给类型“DateTimeFormatOptions”的参数。
  // 属性“year”的类型不兼容。
  // 不能将类型“string”分配给类型“"numeric" | "2-digit" | undefined”。ts(2345)
  const now = new Date(date).toLocaleDateString(siteMetadata.locale, options)

  return now
}

export default formatDate
