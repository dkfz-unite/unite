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
      "/api/identity": { target: "http://127.0.0.1:5004", pathRewrite: { '^/api/identity': 'api' } },
      "/api/composer": { target: "http://127.0.0.1:5002", pathRewrite: { '^/api/composer': 'api' } },
      "/api/donors-feed": {target: "http://127.0.0.1:5100", pathRewrite: { '^/api/donors-feed': 'api' } },
      "/api/images-feed": { target: "http://127.0.0.1:5104", pathRewrite: { '^/api/images-feed': 'api' } },
      "/api/specimens-feed": { target: "http://127.0.0.1:5102", pathRewrite: { '^/api/specimens-feed': 'api' } },
      "/api/genome-feed": { target: "http://127.0.0.1:5106", pathRewrite: { '^/api/genome-feed': 'api' } }
    }
  }
}
