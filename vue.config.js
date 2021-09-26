// vue.config.js
const path = require('path')
module.exports = {
  configureWebpack: (config) => {
    Object.assign(config.resolve, {
      alias: {
        '@': path.join(__dirname, 'src'),
        '#': path.join(__dirname, 'src/views'),
      },
    })
  },
  chainWebpack: (config) => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => Object.assign(options, { limit: 10240 }))
  },
  publicPath: './',
}
