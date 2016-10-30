const express = require('express')
const webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin')

// init app
const app = express()


// compile static through webpack middlewares
const webpackConfig = require('../webpack.config')
webpackConfig.entry = [
  'webpack-hot-middleware/client?reload=true',
].concat(webpackConfig.entry)
const compiler = webpack(webpackConfig)

compiler.apply(new DashboardPlugin())

app.use(require('webpack-dev-middleware')(compiler))
app.use(require('webpack-hot-middleware')(compiler, { log: () => {} }))


const port = 3000
app.listen(port, err => {
  if (err) console.error(err)
  console.log(`http://localhost:${port}`)
})
