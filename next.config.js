/** @type {import('next').NextConfig} */
const withOffline = require('next-offline')
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: '',
  },
  assetPrefix: isProd ? '' : '',
}

module.exports = module.exports = isProd
  ? withOffline({
      workboxOpts: {
        swDest: 'service-worker.js',
        // swDest: process.env.NEXT_EXPORT ? 'service-worker.js' : 'static/service-worker.js',
        runtimeCaching: [
          {
            urlPattern: /^https?.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'https-calls',
              networkTimeoutSeconds: 15,
              expiration: {
                maxEntries: 150,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      ...nextConfig,
    })
  : nextConfig
