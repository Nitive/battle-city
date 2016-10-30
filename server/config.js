const { env } = process

const assetsPort = env.ASSETS_PORT || '5000'

module.exports = {
  isDev:  ['development', 'dev', ''].includes(env.NODE_ENV),
  isProd: env.NODE_ENV === 'production',
  app: {
    port: env.APP_PORT || '3000',
  },
  assets: {
    port: assetsPort,
    baseUrl: env.ASSETS_BASE_URL || `http://localhost:${assetsPort}/assets/`,
  },
}