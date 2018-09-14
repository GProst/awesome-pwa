'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SentryCliPlugin = require('@sentry/webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isMainBundleBuild = Boolean(process.env.BUILD_MAIN_BUNDLE)

const {APP_RELEASE} = process.env

const distFolder = path.resolve(__dirname, 'dist')

const commonConfig = {
  mode: 'none',
  output: {
    pathinfo: !isProd,
    path: distFolder,
    publicPath: '/',
    jsonpScriptType: 'module',
    hashFunction: 'sha256',
    sourceMapFilename: '[file].map',
    filename: '[name].js',
    chunkFilename: '[name].js'
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
  devtool: 'source-map'
}

const commonOptimization = {
  removeAvailableModules: true,
  removeEmptyChunks: true,
  mergeDuplicateChunks: true,
  flagIncludedChunks: isProd, // Enables FlagIncludedChunksPlugin plugin
  occurrenceOrder: isProd, // Enables OccurrenceOrderPlugin plugin
  providedExports: true,
  usedExports: isProd, // Enables FlagDependencyUsagePlugin plugin
  sideEffects: isProd, // Enables SideEffectsFlagPlugin plugin
  concatenateModules: isProd, // Enables ModuleConcatenationPlugin plugin
  noEmitOnErrors: isProd, // Enables NoEmitOnErrorsPlugin plugin
  namedModules: !isProd, // Enables NamedModulesPlugin plugin
  namedChunks: !isProd, // Enables NamedChunksPlugin plugin
  hashedModuleIds: isProd, // Enables HashedModuleIdsPlugin plugin
  nodeEnv: isProd ? 'production' : 'development', // This is the same as DefinePlugin: process.env.NODE_ENV
  minimize: isProd // Enables UglifyjsWebpackPlugin plugin (but you can set other via 'minimizer' prop)
}

const commonPlugins = [
  new webpack.DefinePlugin({
    process: {
      env: {
        APP_ENVIRONMENT: JSON.stringify(process.env.APP_ENVIRONMENT),
        APP_RELEASE: JSON.stringify(APP_RELEASE)
      }
    }
  })
]

const commonRules = [
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
  }
]

const webConfig = {
  ...commonConfig,
  target: 'web',
  entry: {
    app: [
      './robots.txt',
      './src/fonts/roboto-400-latin.woff2',
      './src/fonts/roboto-900-latin.woff2',
      './src/index.jsx'
    ]
  },
  optimization: {
    ...commonOptimization,
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
    runtimeChunk: 'single' // Moves webpack's runtime to a separate file
  },
  plugins: [
    ...commonPlugins,

    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      cache: false,
      showErrors: true
    }),

    process.env.UPLOAD_MAPS_TO_SENTRY && (
      new SentryCliPlugin({ // FixMe: I need to run it after all configs are executed
        release: APP_RELEASE,
        include: './dist'
      }))
  ].filter(Boolean),
  module: {
    rules: [
      ...commonRules,
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff2)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
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
    contentBase: distFolder,
    disableHostCheck: true,
    inline: true
  }
}

const swConfig = {
  ...commonConfig,
  target: 'webworker',
  entry: {
    sw: [
      './src/service-worker/index.js'
    ]
  },
  optimization: {
    ...commonOptimization,
    splitChunks: false,
    runtimeChunk: false
  },
  plugins: commonPlugins,
  module: {
    rules: commonRules
  }
}

module.exports = isMainBundleBuild ? webConfig : swConfig
