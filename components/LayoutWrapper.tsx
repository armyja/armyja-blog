import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
// import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { CSSProperties, ReactNode, useEffect, useState } from 'react'
import MobileNav from './MobileNav'
import router from 'next/router'
import { useTranslation } from 'next-i18next'

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [show, setShow] = useState(false)
  useEffect(() => {
    setBlogTitle(window.document.querySelectorAll('article header h1')[0]?.textContent || '')
    const handleWindowScroll = () => {
      setShow(window.scrollY > 130)
    }
    const handleRouteChange = (url: string, { shallow }: { shallow: boolean }) => {
      if (url.startsWith('/blog/')) {
        setBlogTitle(window.document.querySelectorAll('article header h1')[0]?.textContent || '')
      } else {
        setBlogTitle('')
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    window.addEventListener('scroll', handleWindowScroll)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      window.removeEventListener('scroll', handleWindowScroll)
    }
  }, [])
  const oneLineStyle: CSSProperties = {
    display: '-webkit-box',
    WebkitLineClamp: '1',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  }
  const { t } = useTranslation('common')
  return (
    <div className="h-screen">
      <header className="fixed z-10 flex w-full items-center justify-between bg-white/80 px-4 py-3 shadow-md shadow-black/5 backdrop-blur-sm dark:bg-gray-900/80 dark:shadow-slate-400/5">
        <div className="overflow-hidden">
          <div className={`h-8 transition-transform ${blogTitle && show ? '-translate-y-14' : ''}`}>
            <Link href="/" prefixI18n aria-label={siteMetadata.headerTitle}>
              <div className="flex">
                <div className="relative mt-1 h-7 w-8">
                  <Logo />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="mb-1 ml-2 hidden text-2xl font-medium sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
            <div className="my-6 text-2xl font-medium sm:my-5" style={oneLineStyle}>
              {blogTitle}
            </div>
          </div>
        </div>
        <div className="z-0 flex shrink-0 items-center text-base leading-5">
          <div className="hidden sm:block">
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="p-1 font-medium uppercase text-gray-900 dark:text-gray-100 sm:p-4"
              >
                {t(link.i18n, link.title)}
              </Link>
            ))}
          </div>
          <ThemeSwitch />
          <MobileNav />
        </div>
      </header>
      <SectionContainer>
        <div className="flex min-h-full flex-col justify-between pt-16">
          <main className="mb-auto">{children}</main>
          <Footer />
        </div>
      </SectionContainer>
    </div>
  )
}

export default LayoutWrapper
