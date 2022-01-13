let webpack = require('webpack')
let path = require('path')
let config = require('./package.json')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let IconFontPlugin = require('icon-font-loader').Plugin
let CopyWebpackPlugin = require('copy-webpack-plugin')
let {RetryChunkLoadPlugin} = require('webpack-retry-chunk-load-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ['./app/index.js'],
  resolve: {
    alias: {
      'icons': path.resolve(__dirname, 'app/icons'),
      'request': path.resolve(__dirname, 'app/request'),
      'utils': path.resolve(__dirname, 'app/utils'),
      'stores': path.resolve(__dirname, 'app/stores'),
      'constants': path.resolve(__dirname, 'app/constants'),
      'application': path.resolve(__dirname, 'app/pages/application'),
      'loginManager': path.resolve(__dirname, 'app/pages/loginManager'),
      'components': path.resolve(__dirname, 'app/pages/components'),
    },
    extensions: ['.jsx', '.js', '.json'],
    symlinks: false
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: [
        path.resolve(__dirname, 'app')
      ],
      use: [{
        loader: 'eslint-loader',
        options: {
          quiet: true
        }
      },
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }]
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'icon-font-loader'
      ]
    }, {
      test: /\.less/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'icon-font-loader',
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
          }
        }
      ]
    }, {
      test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)/,
      loader: 'url-loader?limit=8192'
    }, {
      test: /\.(png|jpg|jpeg|svg|gif)/,
      use: ['url-loader', 'image-webpack-loader']
    }]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          minSize: 30000,
          name: 'vendors',
          priority: -10, //优先级
          enforce: true,
          reuseExistingChunk: true   // 可设置是否重用已用chunk 不再创建新的chunk
        },
        styles: {
          name: 'styles',
          test: /\.(css|less)$/,
          chunks: 'all',
          enforce: true,
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: config.title,
      template: config.template,
      inject: true
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en-gb/),
    new webpack.NoEmitOnErrorsPlugin(),
    new IconFontPlugin(),
    new CopyWebpackPlugin([path.resolve(__dirname, 'static')]),
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(config.version)
    }),
    new RetryChunkLoadPlugin({
      cacheBust: `function() {
        return Date.now();
      }`,
      maxRetries: 2,
    })
  ]
}