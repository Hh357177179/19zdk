module.exports = {
  devServer: {
    port: 9999,                                     // 配置端口
    proxy: {
      '/admin': {
        target: 'http://tanyuzhe.zhaodaka.vip/admin',
        // target: 'http://tanyuzhe.zhaodaka.vip/admin',    // 目标 API 地址
        ws: true,                               // 是否代理 websockets
        changOrigin: true,                      // 跨域配置
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  configureWebpack: {
    externals: {
      'AMap': 'AMap' // 高德地图配置
    }
  },
  lintOnSave: false                                   // 取消 eslint 验证
};