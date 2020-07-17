import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: false },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: false, // 当配置为true时，该路由不会在侧边栏显示
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: "首页"
      }
    }],
    meta: {
      title:"首页"
    }
  },

  // 会员管理
  {
    path: '/mem',
    name: '会员管理',
    component: Layout,
    children: [{
      path: 'list',
      component: () => import('@/views/mem/list/index'),
      meta:{
        title: "会员查询"
      }
    },{
      path: 'register',
      component: () => import('@/views/mem/register/index'),
      meta:{
        title: "会员注册"
      }
    }],
    meta: {
      title:"会员管理"
    }
  },

  // 报表系统
  {
    path: '/report',
    component: Layout,
    name: 'report',
    hidden: false, // 当配置为true时，该路由不会在侧边栏显示
    children: [
      {path: '/memberRegister', component: () => import('@/views/report/memberRegister/index'), meta: { title: "会员注册报表" }},
      {path: '/memberPointsReport', component: () => import('@/views/user/index'), meta:{ title: "会员积分报表" }}
    ],
    meta: {
      title:"报表"
    }
  },

  // 系统运维
  {
    path: '/devops',
    component: Layout,
    name: '系统运维',
    hidden: false, // 当配置为true时，该路由不会在侧边栏显示
    children: [
      {path: 'https://github.com/PanJiaChen/vue-element-admin', meta: { title: "数据库监控" , "icon": "link"}},
      {path: '/rabbitMQ', component: () => import('@/views/user/index'), meta:{ title: "RabbitMQ监控","icon": "link"  }}
    ],
    meta: {
      title:"系统运维"
    }
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
