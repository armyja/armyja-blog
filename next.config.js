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
              cacheName: 'offlineCache',
              expiration: {
                maxEntries: 200,
              },
            },
          },
        ],
      },
      ...nextConfig,
    })
  : nextConfig
