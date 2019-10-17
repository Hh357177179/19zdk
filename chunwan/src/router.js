import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        title: '春节晚会'
      }
    },
    {
      path: '/apply',
      name: 'apply',
      component: () => import('./views/Apply.vue'),
      meta: {
        title: '在线报名'
      }
    },
    {
      path: '/new-detail/:id',
      name: 'newDetail',
      component: () => import('./views/NewDetail.vue'),
      meta: {
        title: '新闻动态'
      }
    },
    {
      path: '/notice',
      name: 'Notice',
      component: () => import('./views/Notice.vue'),
      meta: {
        title: '赛事通知'
      }
    },
    {
      path: '/notice-detail/:id',
      name: 'NoticeDetail',
      component: () => import('./views/NoticeDetail.vue'),
      meta: {
        title: ''
      }
    },
    {
      path: '/active',
      name: 'Active',
      component: () => import('./views/Active.vue'),
      meta: {
        title: '活动列表'
      }
    },
    {
      path: '/vote',
      name: 'Vote',
      component: () => import('./views/Vote.vue'),
      meta: {
        title: '网络投票'
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import(/* webpackChunkName: "about" */ './views/Auth.vue'),
      meta: {
        title: '授权'
      }
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

const auth_url = 'http://cw.zhaodaka.vip/api/wechat/oauth'

router.beforeEach((to, from, next) => {
  const tokenns = localStorage.getItem('tokenns')
  if (!tokenns && to.name !== 'auth') {
    console.log('去授权')
    window.location.href = auth_url;
  } else {
    next()
  }
});

export default router