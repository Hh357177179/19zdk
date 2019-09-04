import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/platform',
    component: Layout,
    redirect: '/platform/user-manger',
    name: 'Platform',
    meta: { title: '平台管理', icon: 'example' },
    children: [
      {
        path: 'user-manger',
        name: 'UserManger',
        component: () => import('@/views/platform/index'),
        meta: { title: '用户管理', icon: 'table' }
      }
    ]
  },

  {
    path: '/competition',
    component: Layout,
    redirect: '/competition/sport-fishing',
    name: 'Competition',
    meta: { title: '平台管理', icon: 'example' },
    children: [
      {
        path: 'sport-fishing',
        name: 'SportFishing',
        component: () => import('@/views/competition/sportfishing/index'),
        meta: { title: '钓场赛事', icon: 'table' }
      },
      {
        path: 'game-manger',
        name: 'GameManger',
        component: () => import('@/views/competition/gamemanger/index'),
        meta: { title: '赛事管理', icon: 'table' }
      }
    ]
  },

  {
    path: '/shopcenter',
    component: Layout,
    redirect: '/shopcenter/order-manger',
    name: 'ShopCenter',
    meta: { title: '商品中心', icon: 'example' },
    children: [
      {
        path: 'order-manger',
        name: 'OrderManger',
        component: () => import('@/views/shopcenter/ordermanger/index'),
        meta: { title: '订单管理', icon: 'table' }
      },
      {
        path: 'shop-manger',
        name: 'ShopManger',
        component: () => import('@/views/shopcenter/shopmanger/index'),
        meta: { title: '商品管理', icon: 'table' }
      }
    ]
  },

  {
    path: '/vipcenter',
    component: Layout,
    redirect: '/vipcenter/vip-info',
    name: 'VipCenter',
    meta: { title: '会员中心', icon: 'example' },
    children: [
      {
        path: 'vip-info',
        name: 'VipInfo',
        component: () => import('@/views/vipcenter/vipinfo/index'),
        meta: { title: '会员信息', icon: 'table' }
      }
    ]
  },

  {
    path: '/fishcoin',
    component: Layout,
    redirect: '/fishcoin/vip-fish',
    name: 'FishCoin',
    meta: { title: '鱼币中心', icon: 'example' },
    children: [
      {
        path: 'vip-fish',
        name: 'VipFish',
        component: () => import('@/views/fishcoin/vipfish/index'),
        meta: { title: '会员鱼币', icon: 'table' }
      },
      {
        path: 'fish-rule',
        name: 'FishRule',
        component: () => import('@/views/fishcoin/fishrule/index'),
        meta: { title: '鱼币规则', icon: 'table' }
      }
    ]
  },

  {
    path: '/withdraw',
    component: Layout,
    redirect: '/withdraw/vip-fish',
    name: 'WithDraw',
    meta: { title: '提现审批', icon: 'example' },
    children: [
      {
        path: 'vip-fish',
        name: 'VipFish',
        component: () => import('@/views/withdraw/userdraw/index'),
        meta: { title: '用户提现', icon: 'table' }
      },
      {
        path: 'fish-rule',
        name: 'FishRule',
        component: () => import('@/views/withdraw/fishdraw/index'),
        meta: { title: '钓场提现', icon: 'table' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
