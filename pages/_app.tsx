import '../styles/globals.css'
import '../styles/prism.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ClientReload } from '@/components/ClientReload'
import { appWithTranslation } from 'next-i18next'
import Script from 'next/script'
const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

import siteMetadata from '@/data/siteMetadata'

function MyApp({ Component, pageProps }: AppProps) {
  const myComponent = Component as { getLayout?: (page: JSX.Element) => JSX.Element }
  const getDefaultLayout = (page: JSX.Element) => <LayoutWrapper>{page}</LayoutWrapper>
  const getLayout = myComponent.getLayout || getDefaultLayout

  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <Script id="my-script" strategy="beforeInteractive" src="/js/checkTheme.js" />
      {isDevelopment && isSocket && <ClientReload />}
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  )
}

export default appWithTranslation(MyApp)
