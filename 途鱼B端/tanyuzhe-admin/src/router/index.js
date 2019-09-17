import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store';

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
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
    redirect: '/platform/administrator',
    name: 'Platform',
    meta: { title: '人员管理', icon: 'example' },
    alwaysShow: true,
    title: '人员管理',
    children: [
      {
        path: 'administrator',
        name: 'Administrator',
        component: () => import('@/views/platform/administrator'),
        meta: { title: '管理员列表', icon: 'table' },
        title: '管理员列表',
      },
      // {
      //   path: 'user-manger',
      //   name: 'UserManger',
      //   component: () => import('@/views/platform/index'),
      //   meta: { title: '员工列表', icon: 'table' },
      //   title: '员工列表',
      // },
      {
        path: 'node-list',
        name: 'NodeList',
        component: () => import('@/views/platform/nodeList'),
        meta: { title: '节点', icon: 'table' },
        title: '节点',
      },
      {
        path: 'editPage/:id',
        component: () => import('@/views/platform/editPage'),
        name: 'EditPage',
        meta: { title: '编辑节点',  icon: 'edit' },
        hidden: true,
        title: '编辑节点',
      },
      {
        path: 'user-group',
        name: 'UserGroup',
        component: () => import('@/views/platform/userGroup'),
        meta: { title: '用户组', icon: 'table' },
        title: '用户组',
      }
    ]
  },

  {
    path: '/competition',
    component: Layout,
    redirect: '/competition/sport-fishing',
    name: 'Competition',
    meta: { title: '钓场管理', icon: 'example' },
    alwaysShow: true,
    title: '钓场管理',
    children: [
      {
        path: 'create',
        component: () => import('@/views/competition/sportfishing/create'),
        name: 'CreateArticle',
        meta: { title: '创建文章', icon: 'edit' },
        hidden: true,
        title: '创建文章',
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/competition/sportfishing/edit'),
        name: 'EditArticle',
        meta: { title: '编辑文章',  icon: 'edit' },
        hidden: true,
        title: '编辑文章',
      },
      {
        path: 'sport-fishing',
        name: 'SportFishing',
        component: () => import('@/views/competition/sportfishing/index'),
        meta: { title: '钓场赛事', icon: 'table' },
        title: '钓场赛事'
      },
      {
        path: 'game-manger',
        name: 'GameManger',
        component: () => import('@/views/competition/gamemanger/index'),
        meta: { title: '赛事管理', icon: 'table' },
        title: '赛事管理',
      }
    ]
  },

  {
    path: '/shopcenter',
    component: Layout,
    redirect: '/shopcenter/order-manger',
    name: 'ShopCenter',
    meta: { title: '商品中心', icon: 'example' },
    alwaysShow: true,
    title: '商品中心',
    children: [
      {
        path: 'order-manger',
        name: 'OrderManger',
        component: () => import('@/views/shopcenter/ordermanger/index'),
        meta: { title: '订单管理', icon: 'table' },
        title: '订单管理'
      },
      {
        path: 'shop-manger',
        name: 'ShopManger',
        component: () => import('@/views/shopcenter/shopmanger/index'),
        meta: { title: '商品管理', icon: 'table' },
        title: '商品管理'
      }
    ]
  },

  {
    path: '/vipcenter',
    component: Layout,
    redirect: '/vipcenter/vip-info',
    name: 'VipCenter',
    meta: { title: '会员中心', icon: 'example' },
    alwaysShow: true,
    title: '会员中心',
    children: [
      {
        path: 'vip-info',
        name: 'VipInfo',
        component: () => import('@/views/vipcenter/vipinfo/index'),
        meta: { title: '会员信息', icon: 'table' },
        title: '会员信息'
      }
    ]
  },

  {
    path: '/fishcoin',
    component: Layout,
    redirect: '/fishcoin/vip-fish',
    name: 'FishCoin',
    meta: { title: '鱼币中心', icon: 'example' },
    alwaysShow: true,
    title: '鱼币中心',
    children: [
      {
        path: 'vip-fish',
        name: 'VipFish',
        component: () => import('@/views/fishcoin/vipfish/index'),
        meta: { title: '会员鱼币', icon: 'table' },
        title: '会员鱼币'
      },
      {
        path: 'fish-rule',
        name: 'FishRule',
        component: () => import('@/views/fishcoin/fishrule/index'),
        meta: { title: '鱼币规则', icon: 'table' },
        title: '鱼币规则'
      }
    ]
  },

  {
    path: '/withdraw',
    component: Layout,
    redirect: '/withdraw/vip-fish',
    name: 'WithDraw',
    meta: { title: '提现审批', icon: 'example' },
    alwaysShow: true,
    title: '提现审批',
    children: [
      {
        path: 'withdraw-user',
        name: 'UserDraw',
        component: () => import('@/views/withdraw/userdraw/index'),
        meta: { title: '用户提现', icon: 'table' },
        title: '用户提现'
      },
      {
        path: 'withdraw-rule',
        name: 'FishDraw',
        component: () => import('@/views/withdraw/fishdraw/index'),
        meta: { title: '钓场提现', icon: 'table' },
        title: '钓场提现'
      }
    ]
  },
  // {
  //   path: '/setsystem',
  //   component: () => import('@/views/setsystem/index'),
  // },

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

router.beforeEach((to, from, next) => {
  console.log('当前',to);
  console.log(store.state.user.roles);
  // if (store.state.user.roles.includes(to.name)) next();
  // if (store.state.user.roles) {

  // }
  next();
})

export default router
