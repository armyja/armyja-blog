import { useEffect } from 'react'
import { useRouter } from 'next/router'
import languageDetector, { getDefaultLocale } from './languageDetector'

import i18nextConfig from '../next-i18next.config'
import { i18n } from 'next-i18next'
export const useRedirect = (to: string) => {
  const router = useRouter()
  to = to || router.asPath
  const locales = i18nextConfig.i18n.locales
  // language detection
  useEffect(() => {
    const detectedLng = languageDetector.detect() || getDefaultLocale()
    if (router.route === '/404') {
      const locale404 = locales.find((s) => s === to.split('/')[1] || '') || getDefaultLocale()
      // prevent endless loop
      router.replace('/' + locale404 + router.route)
      return
    }

    languageDetector.cache && languageDetector.cache(detectedLng)
    router.replace('/' + detectedLng + to)
  })

  return <></>
}

export const Redirect = () => {
  useRedirect('')
  return <></>
}

// eslint-disable-next-line react/display-name
export const getRedirect = (to: string) => () => {
  useRedirect(to)
  return <></>
}
