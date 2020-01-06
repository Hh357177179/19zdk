import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login/login.vue'
import Root from './views/Root.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/root',
      component: Root,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/Home/home.vue'),
          meta: {
            title: '首页',
            icon: 'icon-shouye2'
          }
        },
        {
          path: '/place-detail/:id',
          name: 'PlaceDetail',
          component: () => import('./views/Home/placeDetail.vue'),
          meta: {
            title: '地址详情',
            icon: 'icon-shouye2',
            un_show: true,
          }
        },
        // {
        //   path: '/task',
        //   name: 'task',
        //   component: () => import('./views/TaskManage/taskManage.vue'),
        //   meta: {
        //     title: '维保管理',
        //     icon: 'icon-renwu'
        //   },
        //   children: [
            
        //     // {
        //     //   path: '/task-flow',
        //     //   name: 'taskFlow',
        //     //   component: () => import('./views/TaskManage/FlowManage/flowManage.vue'),
        //     //   meta: {
        //     //     title: '工作日志',
        //     //     icon: 'icon-liucheng'
        //     //   },
        //     // }
        //   ]
        // },
        {
          path: '/elevator',
          name: 'elevator',
          component: () => import('./views/ElevatorManage/elevatorManage.vue'),
          meta: {
            title: '电梯管理',
            icon: 'icon-xiaofangdianti'
          },
          children: [
            {
              path: '/elevator-info',
              name: 'elevatorInfo',
              component: () => import('./views/ElevatorManage/ElevatorInfo/elevatorInfo.vue'),
              meta: {
                title: '电梯信息',
                icon: 'icon-jieshao'
              },
            },
            {
              path: '/elevator-map/:id',
              name: 'elevatorMap',
              component: () => import('./views/ElevatorManage/ElevatorInfo/positionMap.vue'),
              meta: {
                title: '编辑位置',
                icon: 'icon-jieshao',
                un_show: true,
              },
            },
            {
              path: '/task-sign',
              name: 'taskSign',
              component: () => import('./views/TaskManage/SignManage/signManage.vue'),
              meta: {
                title: '工作管理',
                icon: 'icon-renwuzhongxin',
                un_show: true,
              },
            },
            // {
            //   path: '/elevator-mainte',
            //   name: 'elevatorMainte',
            //   component: () => import('./views/ElevatorManage/ElevatorMainte/elevatorMainte.vue'),
            //   meta: {
            //     title: '日常维保',
            //     icon: 'icon-weixiuguanli'
            //   },
            // }
          ]
        },
        {
          path: '/organize',
          name: 'organize',
          component: () => import('./views/OrganizeManage/organizeManage.vue'),
          meta: {
            title: '组织管理',
            icon: 'icon-zuzhijiagou'
          },
          children: [
            {
              path: '/organize-party',
              name: 'organizePrty',
              component: () => import('./views/OrganizeManage/OrganizePrty/organizePrty.vue'),
              meta: {
                title: '组织架构',
                icon: 'icon-zuzhiguanli'
              }
            },
            {
              path: '/organize-person/:id/:type',
              name: 'organizePerson',
              component: () => import('./views/OrganizeManage/OrganizePerson/organizePerson.vue'),
              meta: {
                title: '角色管理',
                icon: 'icon-yidongyunkongzhitaiicon45',
                un_show: true,
              }
            },
            {
              path: '/organize-notice',
              name: 'organizeNotice',
              component: () => import('./views/OrganizeManage/OrganizeNotice/organizeNotice.vue'),
              meta: {
                title: '组织公告',
                icon: 'icon-gonggao',
                show: true
              }
            }
          ]
        },
         {
          path: '/system',
          name: 'System',
          component: () => import('./views/System/system.vue'),
          meta: {
            title: '系统设置',
            icon: 'icon-cz-jl',
            un_show: true
          }
        }
        // {
        //   path: '/handlelog',
        //   name: 'handleLog',
        //   component: () => import('./views/HandleLog/handleLog.vue'),
        //   meta: {
        //     title: '操作记录',
        //     icon: 'icon-cz-jl'
        //   }
        // }
      ],
    },
    {
      path: '/weibao-info',
      name: 'weibaoUnitInfo',
      component: () => import('./views/prefectInfo/weibaoUnitInfo/weibaoUnitInfo.vue'),
      meta: {
        title: '维保单位完善信息',
        icon: 'icon-renwuzhongxin',
      },
    },
    {
      path: '/userUnit-info',
      name: 'userUnitInfo',
      component: () => import('./views/prefectInfo/userUnitInfo/userUnitInfo.vue'),
      meta: {
        title: '使用单位完善信息',
        icon: 'icon-renwuzhongxin',
      },
    },
  ]
})

export default router