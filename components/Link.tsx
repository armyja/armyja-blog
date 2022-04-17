import Link from 'next/link'
import { LinkProps } from 'next/link'

function customLink(
  // See https://github.com/kristerkari/react-native-css-modules-with-typescript-example/issues/3?msclkid=9d2fae48be2211eca73cb0b74159b686#issuecomment-852947240
  props: React.PropsWithChildren<LinkProps> &
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
): JSX.Element {
  let hrefStr = props.href.toString()
  const isInternalLink = hrefStr.startsWith('/')
  const isAnchorLink = hrefStr.startsWith('#')

  let { href, ...rest } = props
  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...rest} />
      </Link>
    )
  }

  if (isAnchorLink) {
    return <a href={hrefStr} {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer" href={hrefStr} {...rest} />
}

export default customLink
