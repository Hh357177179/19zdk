import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'
import { Dialog, Field,Toast } from 'vant';
import 'lib-flexible'
import './assets/style.css'

Vue.config.productionTip = false

Vue.use(Dialog).use(Field).use(Toast)

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

export default app