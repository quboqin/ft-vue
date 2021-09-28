// vue.config.js
const path = require('path')
module.exports = {
  configureWebpack: (config) => {
    if (
      process.env.NODE_ENV === 'production' ||
      process.env.NODE_ENV === 'staging'
    ) {
      config.mode = 'production'
      const optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000, 
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                )[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`
              },
            },
          },
        },
      }
      Object.assign(config, {
        optimization,
      })
    } else {
      config.mode = 'development'
    }
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
