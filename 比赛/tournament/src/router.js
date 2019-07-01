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
        title: '日历比赛'
      }
    },
    {
      path: '/game',
      name: 'game',
      component: () => import(/* webpackChunkName: "about" */ './views/Game.vue'),
      meta: {
        title: '赛事日程'
      }
    },
    {
      path: '/me',
      name: 'me',
      component: () => import(/* webpackChunkName: "about" */ './views/Me.vue'),
      meta: {
        title: '个人主页'
      }
    },
    {
      path: '/approveInfo',
      name: 'approveInfo',
      component: () => import(/* webpackChunkName: "about" */ './views/ApproveInfo.vue'),
      meta: {
        title: '个人信息认证'
      }
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: () => import(/* webpackChunkName: "about" */ './views/UserInfo.vue'),
      meta: {
        title: '个人信息'
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
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import(/* webpackChunkName: "about" */ './views/Detail.vue'),
      meta: {
        title: '比赛详情'
      }
    },
    {
      path: '/applyRecord',
      name: 'applyRecord',
      component: () => import(/* webpackChunkName: "about" */ './views/ApplyRecord.vue'),
      meta: {
        title: '报名记录'
      }
    },
    {
      path: '/drill',
      name: 'drill',
      component: () => import(/* webpackChunkName: "about" */ './views/DrillList.vue'),
      meta: {
        title: '我的训练计划'
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
  document.title = to.meta.title || '比赛日程'
  const tokenns = localStorage.getItem('tokenns')
  if (!tokenns && to.name !== 'auth') window.location.href = auth_url;
  else next()
});

export default router