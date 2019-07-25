import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import '@/assets/font/iconfont.css'
import 'vant/lib/index.css';
import 'lib-flexible'
import './assets/style.css'
import VueI18n from 'vue-i18n'
import zh from './language/zh'
import en from './language/en'

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(Vant)

// 配置英文国际化
var lang = localStorage.getItem('lang') || "zh";
Vue.config.lang = lang
const messages = { zh, en }

Object.keys(messages).forEach(function (lang) {
  Vue.locale(lang, messages[lang]);
})

Vue.filter('dateFr', function (val,splict,splicts) {
  let date = new Date (val * 1000)
  let Y = date.getFullYear()
  let M = date.getMonth() + 1
  let D = date.getDate()
  let h = date.getHours()
  let m = date.getMinutes()
  if (M < 10) {
    M = '0' + M
  }
  if (D < 10) {
    D = '0' + D
  }
  if (h < 10) {
    h = '0' + h
  }
  if (m < 10) {
    m = '0' + m
  }
  return `${Y}-${M}-${D} ${h}:${m}`
})

const app = new Vue({
  router,
  lang,
  render: h => h(App)
}).$mount('#app')

export default app
