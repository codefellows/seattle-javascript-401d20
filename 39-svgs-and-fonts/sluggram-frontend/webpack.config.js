'use strict'

// load env
require('dotenv').config()

const {DefinePlugin, EnvironmentPlugin} = require('webpack')
const CleanPlugin = require('clean-webpack-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')

const production = process.env.NODE_ENV === 'production'

let plugins = [
  new HTMLPlugin({title: 'kanban'}),
  new EnvironmentPlugin(['NODE_ENV']),
  new ExtractPlugin('bundle.[hash].css'),
  new DefinePlugin({
    __API_URL__: JSON.stringify(process.env.API_URL),
  }),
]

if(production){
  plugins = plugins.concat([
    new UglifyPlugin(),
    new CleanPlugin(),
  ])
}

module.exports = {
  plugins, 
  devtool: production ? undefined : 'source-map',
  entry: `${__dirname}/src/main.js`,
  devServer: {
    historyApiFallback: true,
  },
  output: {
    filename: 'bundle.[hash].js',
    path: `${__dirname}/build`,
    publicPath: process.env.CDN_URL,
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|eot).*/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'font/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(jpg|gif|png|svg)$/,
        exclude: /\.icon\.svg$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'image/[name].[hash].[ext]'
          },
        }],
      },
      {
        test: /\.icon\.svg$/,
        loader: 'raw-loader',
      },
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
                sourceMap: production ? false : true,
                includePaths: [`${__dirname}/src/style`],
              }
            },
          ],
        })
      }

    ],
  },
}
