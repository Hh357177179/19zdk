import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        title: '训练日志',
        title2: 'Training log'
      }
    },
    {
      path: '/game',
      name: 'game',
      component: () => import(/* webpackChunkName: "about" */ './views/Game.vue'),
      meta: {
        title: '赛事报名',
        title2: 'Event apply'
      }
    },
    {
      path: '/me',
      name: 'me',
      component: () => import(/* webpackChunkName: "about" */ './views/Me.vue'),
      meta: {
        title: '个人主页',
        title2: 'Me'
      }
    },
    {
      path: '/approveInfo',
      name: 'approveInfo',
      component: () => import(/* webpackChunkName: "about" */ './views/ApproveInfo.vue'),
      meta: {
        title: '个人信息',
        title2: 'Personal Information'
      }
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: () => import(/* webpackChunkName: "about" */ './views/UserInfo.vue'),
      meta: {
        title: '个人信息',
        title2: 'Personal Information'
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import(/* webpackChunkName: "about" */ './views/Auth.vue'),
      meta: {
        title: '授权',
        title2: 'Authorization'
      }
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import(/* webpackChunkName: "about" */ './views/Detail.vue'),
      meta: {
        title: '比赛详情',
        title2: 'Events Detail'
      }
    },
    {
      path: '/applyRecord',
      name: 'applyRecord',
      component: () => import(/* webpackChunkName: "about" */ './views/ApplyRecord.vue'),
      meta: {
        title: '报名记录',
        title2: 'Event Apply records'
      }
    },
    {
      path: '/drill',
      name: 'drill',
      component: () => import(/* webpackChunkName: "about" */ './views/DrillList.vue'),
      meta: {
        title: '我的训练计划',
        title: 'Training log'
      }
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})

const auth_url = 'http://match.zhaodaka.vip/api/wechat/oauth'

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (localStorage.getItem('lang') == 'en') {
    document.title = to.meta.title2 || 'Events'
  } else {
    document.title = to.meta.title || '比赛日程'
  }
  const tokenns = localStorage.getItem('tokenns')
  if (!tokenns && to.name !== 'auth') window.location.href = auth_url;
  else next()
});

export default router