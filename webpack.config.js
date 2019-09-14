const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
// Magical regexes of death
const imageRegex = /\.(png|jpe?g|gif)$/i;
const scssRegex = /.s[ac]ss$/i;
const svelteRegex = /\.svelte$/;
const cssRegex = /\.css$/;

const isProd = process.env.NODE_ENV === 'production';
let plugins = [
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
];

if (isProd) {
  // Do PWA stuff when building, but leave it off during development
  plugins = [
    ...plugins,
    new CopyPlugin([
      {
        from: './src/assets/favicons',
        to: path.resolve(__dirname, './dist/assets/favicons'),
      },
      {
        from: './src/assets/favicons/favicon.ico',
        to: path.resolve(__dirname, './dist'),
      },
      {
        from: './src/assets/favicons/manifest.json',
        to: path.resolve(__dirname, '.dist'),
      },
    ]),
    new GenerateSW({
      importWorkboxFrom: 'local',
      cacheId: 'my-app',
      cleanupOutdatedCaches: true,
    }),
  ];
}
module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'inline-source-map',

  // eslint-disable-next-line object-shorthand
  plugins: plugins,
  module: {
    rules: [
      {
        test: svelteRegex,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            hotReload: true,
          },
        },
      },
      {
        test: cssRegex,
        use: [
          !isProd ? 'style-loader' : MiniCssExtractPlugin.loader, // Use style-loader for hmr during development
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
              publicPath: './',
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
    path: path.resolve(__dirname, './dist'),
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
