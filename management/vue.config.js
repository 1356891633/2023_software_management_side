const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true
})
module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: {
            '/api': {
                target: 'https://114.116.211.142:8080',  // 
                changeOrigin: true,
                logLevel:'debug',
            },
            '/post': {
                target: 'https://114.116.211.142',
                changeOrigin: true,
            },
            '/animal' : {
                target: 'https://114.116.211.142',
                changeOrigin: true,
            }
        }
    }
}