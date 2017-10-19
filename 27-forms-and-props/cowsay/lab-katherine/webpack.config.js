'use strict';

const HTMLPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: `${__dirname}/src/main.js`,
  output:  {
    path: `${__dirname}/build`,
    filename: 'bundle.[hash].js',
  },
  // configured the sourceMap with the devtool prop
  // it maps errors to their appropriate modules and line number
  devtool: 'cheap-eval-source-map',
  plugins: [
    // generates a index.html with dynamic script and link tags
    new HTMLPlugin({
      template: `${__dirname}/src/index.html`,
    }),
    // generates a css bunndle from the output of the style loader
    new ExtractPlugin('bundle.[hash].css'),
  ],
  module: {
    // loader conifgs
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
        }),
      },
    ],
  },
};
