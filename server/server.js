const express = require('express')
const proxy = require('http-proxy-middleware')

const config = require('./config')

const app = express()

if (config.isDev) {
  const morgan = require('morgan')
  app.use(morgan('dev'))
}

app.use('/__webpack_hmr', proxy({
  target: config.assets.baseUrl,
  changeOrigin: true,
}))

app.use('/', proxy({
  target: config.assets.fullUrl,
  changeOrigin: true,
}))

app.listen(config.app.port, err => {
  if (err) {
    console.error(err)
    return
  }
  console.log(`Listening http://localhost:${config.app.port}`)
})
