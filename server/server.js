const express = require('express')
const config = require('./config')
const morgan = require('morgan')

const app = express()

if (config.isDev) {
  app.use(morgan('dev'))
}

app.get('*', (req, res) => {
  res.send('test')
})


app.listen(config.app.port, err => {
  if (err) return console.error(err)
  console.log(`Listening http://localhost:${config.app.port}`)
})
