module.exports = {
  devServer: {
    port: 80,
    disableHostCheck: true,
    proxy: {
      '/api': {
        ws: false,
        target: 'http://cw.zhaodaka.vip', //对应自己的接口
        changeOrigin: true,
      }
    }
  }
}