'use strict'

// dynamic script and link tags
const HTMLPlugin = require('html-webpack-plugin')
// creates a seporite css bundle
const ExtractPlugin = require('extract-text-webpack-plugin')

module.exports = {
  output:  {
    filename: 'bundle.[hash].js',
    path: `${__dirname}/build`,
  },
  entry: `${__dirname}/src/main.js`, 
  devtool: 'cheap-eval-source-map',
  // bundle output
  // plugins
  plugins: [
    new HTMLPlugin({
      template: `${__dirname}/src/index.html`,
    }),
    new ExtractPlugin('bundle.[hash].css'),
  ],
  module: {
    // loaders
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
                includePaths: [`${__dirname}/src/style`],
              },
            },
          ],
        })
      },
    ], 
  }
}
