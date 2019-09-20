import Vue from 'vue'
import Router from 'vue-router'
import Root from './views/Root.vue'
import { MessageBox } from 'element-ui';

Vue.use(Router)

const router =  new Router({
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
          name: 'Home',
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
                title: '管理员列表',
                icon: 'icon-yonghu',
                bigTitle: '平台管理'
              },
            },
            {
              path: '/platform/node-list',
              name: 'NodeList',
              component: () => import('./views/Platform/NodeList/NodeList.vue'),
              meta: {
                title: '页面节点',
                icon: 'icon-yonghu',
                bigTitle: '平台管理',
                un_show: true
              },
            },
            {
              path: '/platform/user-group',
              name: 'UserGroup',
              component: () => import('./views/Platform/UserGroup/UserGroup.vue'),
              meta: {
                title: '用户组',
                icon: 'icon-yonghu',
                bigTitle: '平台管理'
              },
            },
            {
              path: '/platform/group-nodes/:id',
              name: 'GroupNodes',
              component: () => import('./views/Platform/GroupNodes/GroupNodes.vue'),
              meta: {
                title: '当前用户组下节点',
                icon: 'icon-yonghu',
                bigTitle: '平台管理',
                un_show: true
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
                icon: 'icon-yu',
                bigTitle: '钓场赛事'
              }
            },
            {
              path: '/competition/add-fish/:id',
              name: 'AddFish',
              component: () => import('./views/Competition/Sportfishing/AddFish.vue'),
              meta: {
                title: '添加钓场',
                icon: 'icon-bhjsaishi',
                bigTitle: '钓场赛事',
                un_show: true,
              },
            },
            {
              path: '/competition/edit-fish/:id',
              name: 'EditFish',
              component: () => import('./views/Competition/Sportfishing/EditFish.vue'),
              meta: {
                title: '编辑钓场',
                icon: 'icon-bhjsaishi',
                bigTitle: '钓场赛事',
                un_show: true,
              },
            },
            {
              path: '/competition/game-manger',
              name: 'GameManger',
              component: () => import('./views/Competition/GameManger/GameManger.vue'),
              meta: {
                title: '赛事管理',
                icon: 'icon-bhjsaishi',
                bigTitle: '钓场赛事'
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
                icon: 'icon-dingdan',
                bigTitle: '商品中心',
              }
            },
            {
              path: '/shopcenter/commodity_list',
              name: 'Commodity',
              component: () => import('./views/ShopCenter/ShopManger/commodity.vue'),
              meta: {
                title: '商品管理',
                icon: 'icon-shangpin1',
                bigTitle: '商品中心'
              },
            },
            {
              path: '/shopcenter/add-shops',
              name: 'addShops',
              component: () => import('./views/ShopCenter/ShopManger/addShops.vue'),
              meta: {
                title: '新增商品',
                icon: 'icon-bhjsaishi',
                bigTitle: '商品中心',
                un_show: true,
              },
            },
            {
              path: '/shopcenter/edit-shops/:id',
              name: 'editShops',
              component: () => import('./views/ShopCenter/ShopManger/editShops.vue'),
              meta: {
                title: '编辑商品',
                icon: 'icon-bhjsaishi',
                bigTitle: '商品中心',
                un_show: true,
              },
            },
            {
              path: '/shopcenter/shop-manger',
              name: 'ShopManger',
              component: () => import('./views/ShopCenter/ShopManger/ShopManger.vue'),
              meta: {
                title: '分类管理',
                icon: 'icon-shangpin1',
                bigTitle: '商品中心',
                un_show: true
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
                title: '会员信息',
                icon: 'icon-huiyuan',
                bigTitle: '会员中心'
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
                icon: 'icon-taojinbi',
                bigTitle: '鱼币中心'
              }
            },
            {
              path: '/fishcoin/edit-fish',
              name: 'EditRule',
              component: () => import('./views/FishCoin/FishRule/editRule.vue'),
              meta: {
                title: '编辑鱼币规则',
                icon: 'icon-bhjsaishi',
                bigTitle: '鱼币中心',
                un_show: true,
              },
            },
            {
              path: '/fishcoin/fish-rule',
              name: 'FishRule',
              component: () => import('./views/FishCoin/FishRule/FishRule.vue'),
              meta: {
                title: '鱼币获取规则',
                icon: 'icon-bianmaguize',
                bigTitle: '鱼币中心'
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
                icon: 'icon-dashujukeshihuaico-',
                bigTitle: '提现审批'
              }
            },
            {
              path: '/withdraw/fish-withdraw',
              name: 'FishWithdraw',
              component: () => import ('./views/WithDraw/FishWithdraw/FishWithdraw.vue'),
              meta: {
                title: '钓场提现',
                icon: 'icon-changdishebei',
                bigTitle: '提现审批',
                un_show: true
              }
            }
          ]
        }
      ]
    },
    // 登录
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login/Login.vue')
    }
  ]
})


router.beforeEach((to, from, next) => {
  console.log('当前',to);
  let token = sessionStorage.getItem('token')
  if (!token) {
    if (to.path != '/login') {
      MessageBox('您的登录已过期，请重新登录。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        next('/login')
      }).catch(() => {});
    } else {
      next()
    }
  } else {
    next();
  }
})


export default router