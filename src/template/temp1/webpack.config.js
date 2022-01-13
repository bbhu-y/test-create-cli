const path = require('path')

const TEST_SERVER_URL = 'https://***/'
const URL_SETTING = {
  target: TEST_SERVER_URL,
  secure: false,
  cookieDomainRewrite: '*'
}

const webpackDevServerConfig = {
  historyApiFallback: {
    index: '/aop/'
  },
  port: 9700,
  open: 'https://127.0.0.1:9700/',
  proxy: {
    '/users//*': URL_SETTING
  }
}

const webpackCommonConfig = {
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
    }
  },
}

const webpackDevConfig = {}

const webpackProdConfig = {}

module.exports = {
  webpackDevServerConfig,
  webpackCommonConfig,
  webpackDevConfig,
  webpackProdConfig
}
