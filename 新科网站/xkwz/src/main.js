import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/style.css'
import '@/assets/variable.less'
// import '@/compontConfig/config.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
