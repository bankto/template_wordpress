require('dotenv').config()
const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ImageMinimizer = require('image-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const mode = process.env.NODE_ENV
const enabledSourceMap =  mode !== 'production'

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
    new ESLintPlugin({
      extensions: ['.js'],
      exclude: 'node_modules'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/images'),
          to: 'images/[name][ext]',
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['**/assets/images/sprite/**.svg']
          }
        },
        {
          from: path.resolve(__dirname, 'src/assets/images/sprite'),
          to: 'images/sprite/[name][ext]',
          noErrorOnMissing: true,
        }
      ]
    }),
    new ImageMinimizer ({
      test: /\.(png|jpe?g)$/i,
      generator: [{
        type: 'asset',
        implementation: ImageMinimizer.imageminGenerate,
        options: {
          plugins: [
            ['webp', { quality: 85 }],
          ],
          encodeOptions: {
            webp: {
              lossless: 1,
            },
          },
        },
      }]
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
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../' },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: enabledSourceMap,
              importLoaders: 2,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['autoprefixer', { grid: true }],
                  ['postcss-preset-env', { stage: 3 }],
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: enabledSourceMap
            },
          },
        ]
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        type: 'asset',
      },
      {
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, "src/assets/images/sprite")
        ],
        use: [
          {
            loader: 'svg-sprite-loader',
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {
                  name: "removeAttrs",
                  params: {
                    attrs: "(fill|stroke)"
                  }
                }
              ]
            }
          }
        ]
      }
    ],
  },
}

if (mode === 'development') config.devtool = 'source-map'

module.exports = config