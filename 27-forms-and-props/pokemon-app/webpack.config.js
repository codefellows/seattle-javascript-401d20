'use strict'

const HTMLPlugin = require('html-webpack-plugin')
const ExtactPlugin = require('extract-text-webpack-plugin') 
module.exports = {
  entry: `${__dirname}/src/main.js`,
  devtool: 'cheap-eval-source-map',
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.[hash].js',
  },
  plugins: [
    new HTMLPlugin(),
    new ExtactPlugin('bundle.[hash].css'),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtactPlugin.extract({
          use: [
            'css-loader',
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            }
          ]
        }),
      },
    ],
  },
}

