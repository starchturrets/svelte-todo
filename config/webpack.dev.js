const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

// const mode = process.env.NODE_ENV || 'development';
// const prod = mode === 'production';
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
      favicon: './src/assets/favicon.png',
      inject: 'head',
    }),
    new ScriptExtHtmlWebpackPlugin({
      module: 'main',
    }),

    new CopyPlugin([
      {
        from: './src/assets/favicons',

        // to: './dist/assets/favicons',
        to: path.resolve(__dirname, '../dist/assets/favicons'),
      },
      {
        from: './src/assets/favicon.png',
        to: path.resolve(__dirname, '../dist'),
      },
    ]),

    new GenerateSW({
      importWorkboxFrom: 'local',
      cacheId: 'my-app',
      cleanupOutdatedCaches: true,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: false, // Let scss handle all the styling because webpack throws weird errors for me when I try do do scoped styles
            hotReload: true,
          },
        },
      },
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
  output: {
    filename: '[name][contenthash].js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    // see below for an explanation
    alias: {
      svelte: path.resolve('node_modules', 'svelte'),
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
};
