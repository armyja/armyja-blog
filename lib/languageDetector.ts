import languageDetector from 'next-language-detector'
import i18nextConfig from '../next-i18next.config'

export default languageDetector({
  supportedLngs: i18nextConfig.i18n.locales,
  fallbackLng: i18nextConfig.i18n.defaultLocale,
})

export function getLanguageByFileName(fileName: string) {
  for (let locale of i18nextConfig.i18n.locales) {
    if (fileName.includes(`.${locale}.`)) {
      return locale
    }
  }
  return i18nextConfig.i18n.defaultLocale
}

export function getDefaultLocale() {
  return i18nextConfig.i18n.defaultLocale
}
