import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入路由，vuex
import router from '@/router'
import store from '@/store'
//关闭生产提示
Vue.config.productionTip = false;
//使用插件
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  //注册路由
  router,
  //注册store
  store,
}).$mount('#app')
