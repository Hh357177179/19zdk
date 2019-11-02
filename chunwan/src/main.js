import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Router from 'vue-router'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'lib-flexible'
import './assets/style.css'

Vue.use(Vant);
Vue.config.productionTip = false

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 根据路由设置标题
router.beforeEach((to, from, next) => {
  /*路由发生改变修改页面的title */
  if(to.meta.title) {
    document.title = to.meta.title
  }
  next();
})

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

export default app