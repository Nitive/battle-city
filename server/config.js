const { env } = process

const assetsPort = env.ASSETS_PORT || '5000'

module.exports = {
  assets: {
    port: assetsPort,
    baseUrl: env.ASSETS_BASE_URL || `http://localhost:${assetsPort}/assets/`,
  },
}
