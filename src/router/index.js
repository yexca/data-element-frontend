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
      }
    ]
  }
  
]

const router = new VueRouter({
  routes
})

export default router
