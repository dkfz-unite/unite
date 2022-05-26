module.exports = {
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
    // proxy: 'http://localhost:5002', // In case API is running on VS dev server
    proxy: 'http://127.0.0.1:5002' // In case if API is running in docker container
    // https: true
  }
}
