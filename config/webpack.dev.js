const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
// Magic regexes used to check file extensions
const { imageRegex, scssRegex } = require('./magic-regex');
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/[name][contenthash].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'head',
    }),
    new ScriptExtHtmlWebpackPlugin({
      module: 'main',
    }),
  ],

  module: {
    rules: [
      {
        test: scssRegex,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },

          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: imageRegex,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './assets/[name][contenthash].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
    ],
  },
  entry: {
    main: './src/js/index.js',
  },
};
