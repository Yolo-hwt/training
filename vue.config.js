const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  assetsDir: 'static', //静态资源目录（js, css, img）
})
