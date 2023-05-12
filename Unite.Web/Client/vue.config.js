module.exports = {
  configureWebpack: {
    resolve: {
      fallback: {
        util: require.resolve("util/")
      }
    }
  },
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: [
    'quasar'
  ],
  devServer: {
    proxy: {
      "/identity": { target: "http://127.0.0.1:5004", pathRewrite: { '^/identity': '' } },
      "/composer": { target: "http://127.0.0.1:5002", pathRewrite: { '^/composer': '' } },
      "/donors-feed": {target: "http://127.0.0.1:5100", pathRewrite: { '^/donors-feed': '' } },
      "/specimens-feed": { target: "http://127.0.0.1:5102", pathRewrite: { '^/specimens-feed': '' } },
      "/images-feed": { target: "http://127.0.0.1:5104", pathRewrite: { '^/images-feed': '' } },
      "/genome-feed": { target: "http://127.0.0.1:5106", pathRewrite: { '^/genome-feed': '' } }
    }
  }
}
