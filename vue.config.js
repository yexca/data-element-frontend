const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8888,
    proxy: {
      '/api' : {
        target: process.env.VUE_APP_URL,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
