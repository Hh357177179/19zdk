import Vue from 'vue'
import VueAMap from 'vue-amap';
import App from './App.vue'
import router from './router'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style.css'
import Blob from './excel/Blob'
import Export2Excel from './excel/Export2Excel.js'
import * as filter from './filter/index'
Object.keys(filter).forEach(key => Vue.filter(key, filter[key]))

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '8b04adfaa10d19129ae6818420ad40ce&plugin',
  plugin: ['MarkerClusterer'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});
Vue.config.productionTip = false
Vue.use(ElementUI);


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

export default app
