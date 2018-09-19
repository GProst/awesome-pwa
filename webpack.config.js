'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
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
        APP_RELEASE: JSON.stringify(APP_RELEASE),
        INSTALLATION_ASSETS_BYTE_LENGTH: JSON.stringify(process.env.INSTALLATION_ASSETS_BYTE_LENGTH)
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
    startup: [
      './src/startup/init-sentry.js', // order matters for webpack, I checked
      './src/startup/index.js'
    ],
    app: [
      './src/web-manifest/icons/manifest-192.png',
      './src/web-manifest/icons/manifest-512.png',
      './src/web-manifest/icons/manifest-1024.png',
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
      minChunks: 1,
      minSize: 0,
      cacheGroups: {
        'common-vendors': {
          minChunks: 2, // used both in 'startup' and 'app' chunks
          name: 'common-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -5
        },
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: chunk => {
            // exclude `startup` chunk
            return chunk.name !== 'startup'
          },
          priority: -10
        },
        common: {
          name: 'common',
          minChunks: 2, // used both in 'startup' and 'app' chunks
          priority: -15
        }
      }
    },
    runtimeChunk: 'single' // Moves webpack's runtime to a separate file
  },
  plugins: [
    ...commonPlugins,

    new HtmlWebpackPlugin({ // TODO: I can also minify html here!
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      excludeChunks: ['app', 'vendors'], // TODO: only app after I concat app + vendor
      cache: false,
      showErrors: true
    }),

    new ScriptExtHtmlWebpackPlugin({
      inline: ['runtime', 'common-vendors', 'common', 'startup']
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
        test: /\.webmanifest$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
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
