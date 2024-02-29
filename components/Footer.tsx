import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { useTranslation } from 'next-i18next'

export default function Footer() {
  const { i18n } = useTranslation('common')
  return (
    <footer>
      <div className="mt-10 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="6" />
          <SocialIcon kind="github" href={siteMetadata.github} size="6" />
          <SocialIcon kind="sinaWeibo" href={siteMetadata.sinaWeibo} size="6" />
          {/* <SocialIcon kind="facebook" href={siteMetadata.facebook} size="6" />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size="6" />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="6" />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size="6" /> */}
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/" prefixI18n>
            {siteMetadata.title}
          </Link>
        </div>
        <div className="mb-8 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{` • `}</div>
          {i18n.language === 'en' && <Link href="/">zh</Link>}
          {i18n.language === 'zh' && <Link href="/en">en</Link>}
        </div>
      </div>
    </footer>
  )
}
