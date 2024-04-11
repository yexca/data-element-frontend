import Vue from 'vue'
import VueRouter from 'vue-router'
import layoutView from '@/views/layout/layoutView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/login/loginView.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: layoutView,
    redirect: '/login',
    children:[
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/dashboard/dashboardView.vue')
      },
      // 员工管理
      {
        path: '/employee',
        name: 'employee',
        component: () => import('../views/employee/employeeView.vue')
      },
      // 个人用户管理
      {
        path: '/users/personal',
        name: 'personalUserManage',
        component: () => import('../views/userManage/personalUserManageView.vue')
      },
      // 企业用户管理
      {
        path: '/users/enterprise',
        name: 'enterpriseUserManage',
        component: () => import('../views/userManage/enterpriseUserManageView.vue')
      },
      // 个人数据管理
      {
        path: '/data/personal',
        name: 'personalDataManage',
        component: () => import('../views/userDataManage/personalDataManageView.vue')
      },
      // 企业数据管理
      {
        path: '/data/enterprise',
        name: 'enterpriseDataManage',
        component: () => import('../views/userDataManage/enterpriseDataManageView.vue')
      },
      // 国家信息管理
      {
        path: '/info/country',
        name: 'countryManage',
        component: () => import('../views/infoManage/countryView.vue')
      },
      // 角色信息管理
      {
        path: '/info/role',
        name: 'roleManage',
        component: () => import('../views/infoManage/roleView.vue')
      },
      // 测试
      {
        path: '/test',
        name: 'test',
        component: () => import('../views/test/testView.vue')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/error/404View.vue')
  },
  {
    path: '*',
    name: 'Direct to 404',
    redirect: '/404'
  }
  
]

const router = new VueRouter({
  routes
})

export default router
