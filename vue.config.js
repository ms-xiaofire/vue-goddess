module.exports = {
  pwa: {
    name: 'goddess'
  },

  devServer: {
    // proxy: 'http://goddess.academy.home.dounixue.net', // 配置跨域处理,只有一个代理
    proxy: {
      '/a/': {
        target: 'http://goddess.academy.home.dounixue.net/a/',
        changeOrigin: true,
        pathRewrite: {
          '^/a/': ''
        }
      }
    }
  },

  // baseUrl: process.env.NODE_ENV === 'production' ? '/online/' : './',
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: true,
  productionSourceMap: false,
  parallel: undefined,
  css: undefined,
  lintOnSave: undefined,
  baseUrl: './'
}
