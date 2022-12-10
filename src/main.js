import Vue from 'vue'
import App from './App.vue'

//引入路由，vuex
import router from '@/router'
import store from '@/store'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //注册路由
  router,
  //注册store
  store,
}).$mount('#app')
