module.exports = {
  devServer: {
    port: 80,      
    disableHostCheck: true,                        // 配置端口
    proxy: {
      '/api': {
        target: 'http://souji.zhaodaka.vip',    // 目标 API 地址
        ws: true,                               // 是否代理 websockets
        changOrigin: true,                      // 跨域配置
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
}