import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/enter/:id',
      name: 'enter',
      component: () => import ('./views/enter.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('./views/Detail.vue')
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('./views/Success.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('./views/Auth.vue')
    },
    {
      path: '/',
      redirect: '/enter/:id'
    }
  ]
})


const auth_url = 'http://ymmsign.zhaodaka.vip/oauth'

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.name == 'enter') {
    localStorage.setItem('url', window.location.href)
    localStorage.setItem('paths', to.fullPath)
  }
  if (!token && to.name !== 'auth') {
    window.location.href = auth_url;
  } else {
    next()
  }
});

// router.afterEach((to, from) => {
//   if (to.path === '/auth') return;
//   // window.__wxjs_is_wkwebview
//   // alert(window.__wxjs_is_wkwebview)
//   // true 时 为 IOS 设备
//   // false时 为 安卓 设备
//   if (window.__wxjs_is_wkwebview) {  // IOS
//     if (window.entryUrl == '' || window.entryUrl == undefined) {
//       var url = `${FRONT_BASE}${to.fullPath}`
//       window.entryUrl = url    // 将后面的参数去除
//     }
//     utils.getWxAuth(to.fullPath,"ios")
//   }else {       // 安卓
//     setTimeout(function () {
//       utils.getWxAuth(to.fullPath,"android")
//     }, 500);
//   }
// })

export default router