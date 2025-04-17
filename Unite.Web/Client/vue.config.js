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
      "/api/identity": { target: "http://127.0.0.1:5000", pathRewrite: { '^/api/identity': 'api' } },
      "/api/composer": { target: "http://127.0.0.1:5002", pathRewrite: { '^/api/composer': 'api' } },
      "/api/analysis": { target: "http://127.0.0.1:5004", pathRewrite: { '^/api/analysis': 'api' } },
      "/api/feed-donors": {target: "http://127.0.0.1:5100", pathRewrite: { '^/api/feed-donors': 'api' } },
      "/api/feed-images": { target: "http://127.0.0.1:5102", pathRewrite: { '^/api/feed-images': 'api' } },
      "/api/feed-specimens": { target: "http://127.0.0.1:5104", pathRewrite: { '^/api/feed-specimens': 'api' } },
      "/api/feed-genome": { target: "http://127.0.0.1:5106", pathRewrite: { '^/api/feed-genome': 'api' } }
    }
  }
}
