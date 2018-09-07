'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const SentryCliPlugin = require('@sentry/webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const {APP_RELEASE} = process.env

const config = {
  mode: 'none',
  target: 'web',
  entry: {
    app: [
      './robots.txt',
      '@babel/polyfill',
      './src/index.jsx'
    ]
  },
  output: {
    pathinfo: !isProd,
    path: path.resolve(__dirname, 'dist'),
    filename: isProd ? '[name].[chunkhash].js' : '[name].js',
    chunkFilename: isProd ? '[name].[chunkhash].js' : '[name].js',
    publicPath: '/',
    jsonpScriptType: 'module',
    hashFunction: 'sha256',
    sourceMapFilename: '[file].map'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  cache: false,
  performance: isProd
    ? {
      hints: 'warning'
    }
    : false,
  devtool: 'source-map',
  optimization: {
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    flagIncludedChunks: isProd, // Enables FlagIncludedChunksPlugin plugin
    occurrenceOrder: isProd, // Enables OccurrenceOrderPlugin plugin
    providedExports: true,
    usedExports: isProd, // Enables FlagDependencyUsagePlugin plugin
    sideEffects: isProd, // Enables SideEffectsFlagPlugin plugin
    concatenateModules: isProd, // Enables ModuleConcatenationPlugin plugin
    splitChunks: { // Options for SplitChunksPlugin plugin
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: 'single', // Moves webpack's runtime to a separate file
    noEmitOnErrors: isProd, // Enables NoEmitOnErrorsPlugin plugin
    namedModules: !isProd, // Enables NamedModulesPlugin plugin
    namedChunks: !isProd, // Enables NamedChunksPlugin plugin
    hashedModuleIds: isProd, // Enables HashedModuleIdsPlugin plugin
    nodeEnv: isProd ? 'production' : 'development', // This is the same as DefinePlugin: process.env.NODE_ENV
    minimize: isProd // Enables UglifyjsWebpackPlugin plugin (but you can set other via 'minimizer' prop)
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          APP_ENVIRONMENT: JSON.stringify(process.env.APP_ENVIRONMENT),
          APP_RELEASE: JSON.stringify(APP_RELEASE)
        }
      }
    }),

    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname),
      verbose: true,
      dry: false
    }),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      cache: false,
      showErrors: true
    }),

    process.env.UPLOAD_MAPS_TO_SENTRY && new SentryCliPlugin({
      release: APP_RELEASE,
      include: './dist'
    })
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: path.join(process.cwd(), '.babelrc.js')
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /robots\.txt$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'robots.txt'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    inline: true
  }
}

module.exports = config
