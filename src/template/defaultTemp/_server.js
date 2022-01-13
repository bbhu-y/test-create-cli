let webpack = require('webpack')
let webpackDevServer = require('webpack-dev-server')
let consoleStamp = require('console-stamp')
let config = require('./webpack.config')

//format the console
consoleStamp(console, {
  pattern: 'ddd mmm dd yyyy HH:MM:ss',
  colors: {
    stamp: 'yellow',
    label: 'white',
    metadata: 'green'
  }
})

config.entry.unshift('webpack-dev-server/client?https://0.0.0.0:9700/')

const TEST_SERVER_URL = 'https://****/'
const URL_SETTING = {
  target: TEST_SERVER_URL,
  secure: false,
  cookieDomainRewrite: '*'
}
let compiler = webpack(config)
let server = new webpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: {
    verbose: true,
    index: '/aop/'
  },
  https: true,
  disableHostCheck: true,
  open: 'https://127.0.0.1:9700/',
  host: '0.0.0.0',
  port: 9700,
  proxy: {
    '/users//*': URL_SETTING
  },
  stats: 'errors-only'
})

server.listen(9700)
