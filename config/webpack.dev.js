const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const { imageRegex, scssRegex, svelteRegex } = require('./magic-regex');

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
      // favicon: './src/assets/favicon.png',
      inject: 'head',
    }),
    new ScriptExtHtmlWebpackPlugin({
      module: 'main',
    }),
    // new CopyPlugin([
    //   {
    //     from: './src/assets/favicons',

    //     // to: './dist/assets/favicons',
    //     to: path.resolve(__dirname, '../dist/assets/favicons'),
    //   },
    //   {
    //     from: './src/assets/favicons/favicon.ico',
    //     to: path.resolve(__dirname, '../dist'),
    //   },
    //   {
    //     from: './src/assets/favicons/manifest.json',
    //     to: path.resolve(__dirname, '../dist'),
    //   },
    // ]),

    new GenerateSW({
      importWorkboxFrom: 'local',
      cacheId: 'my-app',
      cleanupOutdatedCaches: true,
    }),
  ],

  module: {
    rules: [
      {
        test: svelteRegex,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true, // Let scss handle all the styling because webpack throws weird errors for me when I try do do scoped styles
            hotReload: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: scssRegex,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: true,
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
