import Vue from 'vue'
import Router from 'vue-router'
import Root from './views/Root.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Root,
      redirect:'/home',
      children: [
        // 首页
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/Home/Home.vue'),
          meta: {
            title: '首页',
            icon: 'icon-shouye'
          },
        },
        // 平台管理
        {
          path: '/platform',
          name: 'Platform',
          component: () => import ('./views/Platform/Platform.vue'),
          meta: {
            title: '平台管理',
            icon: 'icon-pingtai_mokuai',
            icon: 'icon-pingtaiguanli'
          },
          children: [
            {
              path: '/platform/user-manage',
              name: 'UserManage',
              component: () => import('./views/Platform/UserManage/UserManage.vue'),
              meta: {
                title: '用户管理',
                icon: 'icon-yonghu'
              },
            },
          ]
        },
        // 钓场赛事
        {
          path: '/competition',
          name: 'Competition',
          component: () => import ('./views/Competition/Competition.vue'),
          meta: {
            title: '钓场赛事',
            icon: 'icon-saishi'
          },
          children: [
            {
              path: '/competition/sport-fishing',
              name: 'Sportfishing',
              component: () => import('./views/Competition/Sportfishing/Sportfishing.vue'),
              meta: {
                title: '钓场管理',
                icon: 'icon-yu'
              }
            },
            {
              path: '/competition/game-manger',
              name: 'GameManger',
              component: () => import('./views/Competition/GameManger/GameManger.vue'),
              meta: {
                title: '赛事管理',
                icon: 'icon-bhjsaishi'
              },
            },
          ]
        },
        // 商品中心
        {
          path: '/shopcenter',
          name: 'ShopCenter',
          component: () => import ('./views/ShopCenter/ShopCenter.vue'),
          meta: {
            title: '商品中心',
            icon: 'icon-shangpin'
          },
          children: [
            {
              path: '/shopcenter/order-manger',
              name: 'OrderManger',
              component: () => import('./views/ShopCenter/OrderManger/OrderManger.vue'),
              meta: {
                title: '订单管理',
                icon: 'icon-dingdan'
              }
            },
            {
              path: '/shopcenter/shop-manger',
              name: 'ShopManger',
              component: () => import('./views/ShopCenter/ShopManger/ShopManger.vue'),
              meta: {
                title: '商品管理',
                icon: 'icon-shangpin1'
              },
            },
          ]
        },
        // 会员中心
        {
          path: '/vipcenter',
          name: 'VipCenter',
          component: () => import ('./views/VipCenter/VipCenter.vue'),
          meta: {
            title: '会员中心',
            icon: 'icon-huiyuanqia'
          },
          children: [
            {
              path: '/vipcenter/member-center',
              name: 'MemberCenter',
              component: () => import('./views/VipCenter/MemberCenter/MemberCenter.vue'),
              meta: {
                title: '会员中心',
                icon: 'icon-huiyuan'
              }
            }
          ]
        },
        // 会员鱼币
        {
          path: '/fishcoin',
          name: 'FishCoin',
          component: () => import('./views/FishCoin/FishCoin.vue'),
          meta: {
            title: '鱼币中心',
            icon: 'icon-jinbi'
          },
          children: [
            {
              path: '/fishcoin/vip-fish',
              name: 'VipFish',
              component: () => import('./views/FishCoin/VipFish/VipFish.vue'),
              meta: {
                title: '会员鱼币',
                icon: 'icon-taojinbi'
              }
            },
            {
              path: '/fishcoin/fish-rule',
              name: 'FishRule',
              component: () => import('./views/FishCoin/FishRule/FishRule.vue'),
              meta: {
                title: '鱼币获取规则',
                icon: 'icon-bianmaguize'
              }
            }
          ]
        },
        // 提现
        {
          path: '/withdraw',
          name: 'WithDraw',
          component: () => import ('./views/WithDraw/WithDraw.vue'),
          meta: {
            title: '提现审批',
            icon: 'icon-tixian'
          },
          children: [
            {
              path: '/withdraw/user-withdraw',
              name: 'UserWithdraw',
              component: () => import('./views/WithDraw/UserWithdraw/UserWithdraw.vue'),
              meta: {
                title: '用户提现',
                icon: 'icon-dashujukeshihuaico-'
              }
            },
            {
              path: '/withdraw/fish-withdraw',
              name: 'FishWithdraw',
              component: () => import ('./views/WithDraw/FishWithdraw/FishWithdraw.vue'),
              meta: {
                title: '钓场提现',
                icon: 'icon-changdishebei'
              }
            }
          ]
        }
      ]
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login/Login.vue')
    }
  ]
})
