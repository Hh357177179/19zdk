import Vue from 'vue'
import Router from 'vue-router'
import { applySuccess } from './api/index' 

Vue.use(Router)

const router = new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/enter/:id',
      name: 'enter',
      component: () => import ('./views/enter.vue')
    },
    {
      path: '/payenter/:id',
      name: 'payenter',
      component: () => import ('./views/PayList.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('./views/Detail.vue')
    },
    {
      path: '/success/:id',
      name: 'success',
      component: () => import('./views/Success.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('./views/Auth.vue')
    },
    {
      path: '/vipdetail/:id',
      name: 'vipdetail',
      component: () => import('./views/VipDetail.vue')
    },
    {
      path: '/school',
      name: 'school',
      component: () => import('./views/School.vue')
    },
    {
      path: '/myapply',
      name: 'myapply',
      component: () => import('./views/Myapply.vue')
    },
    {
      path: '/medetail/:id',
      name: 'medetail',
      component: () => import ('./views/MeDetail.vue')
    },
    {
      path: '/signin/:id',
      name: 'signin',
      component: () => import ('./views/signIn.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import ('./views/userInfo.vue')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})


const auth_url = 'http://ymmsign.zhaodaka.vip/oauth'

router.beforeEach((to, from, next) => {
  if (to.name == 'enter' || to.name == 'payenter' || to.name == 'school') {
    console.log(to.name)
    localStorage.setItem('url', window.location.href)
    localStorage.setItem('paths', to.fullPath)
  }
  const tokenns = localStorage.getItem('tokenns')
  if (!tokenns && to.name !== 'auth') {
    console.log('去授权')
    window.location.href = auth_url;
  } else {
    next()
    // let params = {
    //   token: tokenns
    // }
    // applySuccess(params).then(res => {
    //   console.log(213,res)
    //   if (res.is_new == 1) {
    //     if (to.path != '/user') {
    //       next({
    //         path: '/user'
    //       })
    //     } else {
    //       next()
    //     }
    //   } else {
    //     next()
    //   }
    // })
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