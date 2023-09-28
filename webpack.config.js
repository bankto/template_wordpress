require('dotenv').config()
const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const mode = process.env.NODE_ENV

const config = {
  mode: mode,
  target: 'web',
  entry: {
    app: [
      path.resolve(__dirname, 'src/assets/scripts/app.js'),
      path.resolve(__dirname, 'src/assets/stylesheets/app.scss'),
    ],
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: process.env.LOCAL_URL,
      files: ['./*.php', './**/*.php'],
      injectChanges: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/images'),
          to: 'images/[path][name][ext]',
          noErrorOnMissing: true,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: './stylesheets/[name].css',
    }),
  ],
  output: {
    filename: 'scripts/[name].js',
    path: path.resolve(__dirname, 'assets'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        type: 'asset/inline',
      },
    ],
  },
}

if (mode === 'development') config.devtool = 'source-map'

module.exports = config
