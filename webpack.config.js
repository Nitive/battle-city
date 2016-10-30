const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')
const config = require('./server/config')

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: config.assets.baseUrl,
    filename: '[name].[hash].js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        cacheDirectory: true,
      },
    }, {
      test: /\.(png|jpg)/,
      loader: 'file',
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new HotModuleReplacementPlugin(),
  ],
}
