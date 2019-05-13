import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'hpage',
          component: () => import ('./views/home/hpage.vue')
        },
        {
          path: '/policy/:id',
          name: 'policy',
          component: () => import('./views/policy/Policy.vue')
        },
        {
          path: '/server/:id',
          name: 'server',
          component: () => import ('./views/scontent/Server.vue')
        },
        {
          path: '/classroom/:id',
          name: 'classroom',
          component: () => import ('./views/classroom/Classroom.vue')
        },
        {
          path: '/about/:id',
          name: 'about',
          component: () => import ('./views/about/About.vue')
        }
      ]
    }
  ]
})
