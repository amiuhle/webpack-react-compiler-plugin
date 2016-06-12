const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ReactCompilerPlugin = require('..')

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  resolveLoader: {
    modulesDirectories: [
      path.resolve('node_modules')
    ]
  },

  entry: {
    pages: './scripts/pages'
  },

  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract(['css', 'sass']) }
    ]
  },

  plugins: [
    new ReactCompilerPlugin(),
    new ExtractTextPlugin('styles.css')
  ]
}
