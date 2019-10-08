import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/apply',
      name: 'apply',
      component: () => import('./views/Apply.vue')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

// const auth_url = 'http://ymmsign.zhaodaka.vip/oauth'

// router.beforeEach((to, from, next) => {
//   if (to.name == 'enter' || to.name == 'payenter' || to.name == 'school') {
//     console.log(to.name)
//     localStorage.setItem('url', window.location.href)
//     localStorage.setItem('paths', to.fullPath)
//   }
//   const tokenns = localStorage.getItem('tokenns')
//   if (!tokenns && to.name !== 'auth') {
//     console.log('去授权')
//     window.location.href = auth_url;
//   } else {
//     next()
//   }
// });

export default router