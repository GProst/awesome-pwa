const webpack = require('webpack')
const WebpackChunkHash = require('webpack-chunk-hash')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

function _isVendor(module) {
  return module.context && module.context.includes('node_modules')
}

const isProd = process.env.NODE_ENV === 'production'

const config = {
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      './src/index.jsx'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname),
      verbose: true,
      dry: false
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['app'],
      minChunks: (module) => {
        return _isVendor(module)
      }
    }),

    isProd
      ? new webpack.HashedModuleIdsPlugin()
      : new webpack.NamedModulesPlugin(),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      cashe: true,
      showErrors: true
    }),

    new WebpackChunkHash()
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader'
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
      }
    ]
  }
}

if (isProd) {
  config.plugins.push(
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyWebpackPlugin()
  )
}

module.exports = config
