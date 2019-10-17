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
          path: '/task',
          name: 'task',
          component: () => import('./views/TaskManage/taskManage.vue'),
          meta: {
            title: '维保管理',
            icon: 'icon-renwu'
          },
          children: [
            {
              path: '/task-sign',
              name: 'taskSign',
              component: () => import('./views/TaskManage/SignManage/signManage.vue'),
              meta: {
                title: '签到管理',
                icon: 'icon-renwuzhongxin'
              },
            },
            {
              path: '/task-flow',
              name: 'taskFlow',
              component: () => import('./views/TaskManage/FlowManage/flowManage.vue'),
              meta: {
                title: '工作日志',
                icon: 'icon-liucheng'
              },
            }
          ]
        },
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
              path: '/elevator-mainte',
              name: 'elevatorMainte',
              component: () => import('./views/ElevatorManage/ElevatorMainte/elevatorMainte.vue'),
              meta: {
                title: '日常维保',
                icon: 'icon-weixiuguanli'
              },
            }
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
              path: '/organize-person',
              name: 'organizePerson',
              component: () => import('./views/OrganizeManage/OrganizePerson/organizePerson.vue'),
              meta: {
                title: '角色管理',
                icon: 'icon-yidongyunkongzhitaiicon45'
              }
            },
            {
              path: '/organize-notice',
              name: 'organizeNotice',
              component: () => import('./views/OrganizeManage/OrganizeNotice/organizeNotice.vue'),
              meta: {
                title: '组织公告',
                icon: 'icon-gonggao'
              }
            }
          ]
        },
        {
          path: '/handlelog',
          name: 'handleLog',
          component: () => import('./views/HandleLog/handleLog.vue'),
          meta: {
            title: '操作记录',
            icon: 'icon-cz-jl'
          }
        }
      ]
    }
  ]
})

export default router