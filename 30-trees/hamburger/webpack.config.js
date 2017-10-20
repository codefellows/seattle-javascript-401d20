'use strict'
const HTMLPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: `${__dirname}/src/main.js`,
  devtool: 'cheap-eval-source-map',
  devServer: { // for single page apps (SPA)
    historyApiFallback: true, // server index.html for 404 routes
  },
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.[hash].js',
  },
  plugins: [
    new HTMLPlugin(),
    new ExtractPlugin('bundle.[hash].css'),
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
        loader: ExtractPlugin.extract({
          use: [
            'css-loader',
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
    ],
  },
}

