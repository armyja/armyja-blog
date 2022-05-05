import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { DetailedHTMLProps, AnchorHTMLAttributes } from 'react'

function CustomLink(
  // See https://github.com/kristerkari/react-native-css-modules-with-typescript-example/issues/3?msclkid=9d2fae48be2211eca73cb0b74159b686#issuecomment-852947240
  props: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
    prefixI18n?: boolean
  }
): JSX.Element {
  const { i18n } = useTranslation('common')
  const option = i18n.options as {
    [key: string]: any
  }
  let hrefStr = props.href || ''.toString()
  const isRelativeLink = hrefStr.startsWith('./')
  const isInternalLink = hrefStr.startsWith('/')
  const isAnchorLink = hrefStr.startsWith('#')

  let { href, prefixI18n, ...rest } = props

  if (isRelativeLink) {
    return (
      <Link href={href || ''}>
        <a {...rest} />
      </Link>
    )
  }

  if (isInternalLink) {
    return (
      <Link
        href={
          (prefixI18n && i18n.language !== option?.defaultLocale ? `/${i18n.language}` : '') +
            href || ''
        }
      >
        <a {...rest} />
      </Link>
    )
  }

  if (isAnchorLink) {
    return <a href={hrefStr} {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer" href={hrefStr} {...rest} />
}

export default CustomLink
