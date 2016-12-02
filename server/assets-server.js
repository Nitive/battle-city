const express = require('express')
const webpack = require('webpack')
const config = require('./config')

// init app
const app = express()


// compile static through webpack middlewares
const webpackConfig = require('../webpack.config')
webpackConfig.entry = [
  'webpack-hot-middleware/client?reload=true',
].concat(webpackConfig.entry)
const compiler = webpack(webpackConfig)

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
}))
app.use(require('webpack-hot-middleware')(compiler))

app.get('/_/info', (req, res) => {
  res.send(`
    <pre>
      <code>
        <br>${JSON.stringify(config, null, 2)}
      <code>
    </pre>
  `)
})


app.listen(config.assets.port, err => {
  if (err) console.error(err)
  console.log('Assets server is started')
})
