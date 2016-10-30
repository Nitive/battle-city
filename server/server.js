const morgan = require('morgan')
const express = require('express')
const proxy = require('express-http-proxy')

const config = require('./config')

const app = express()

if (config.isDev) {
  app.use(morgan('dev'))
}

app.get('*', proxy(config.assets.baseUrl, {
  forwardPath(req) {
    return req.url === '/__webpack_hmr'
      ? req.url
      : '/assets/'
  },
}))

app.listen(config.app.port, err => {
  if (err) {
    console.error(err)
    return
  }
  console.log(`Listening http://localhost:${config.app.port}`)
})
