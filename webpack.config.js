const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
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
