const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  dev: { // ... // 跨域配置 
    proxyTable: {
      '/api': { 
        // target: 'http://192.168.2.3:8888', //接口域名 
        target: 'http://114.116.211.142:8080/api', //接口域名 
        changeOrigin: true, //是否跨域 
        pathRewrite: {
          '^/api': '', //将 '/api' 替换为空 
        },
      },
    }, // ... 
  },
}