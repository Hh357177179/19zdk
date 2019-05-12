module.exports = {
  devServer: {
    port: 80,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://ymmsign.zhaodaka.vip', //对应自己的接口
        changeOrigin: true,
      }
    }
  }
}