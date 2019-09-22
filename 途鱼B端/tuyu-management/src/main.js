import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style.css'
import VueCookies from 'vue-cookies'
import * as filter from './filter/index'
import Blob from './excel/Blob'
import Export2Excel from './excel/Export2Excel.js'
Object.keys(filter).forEach(key => Vue.filter(key, filter[key]))

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.use(VueCookies)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

export default app