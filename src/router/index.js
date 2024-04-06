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
    redirect: '/dashboard',
    children:[
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/dashboard/dashboardView.vue')
      },
      // 员工管理
      {
        path: '/employee',
        name: 'dashboard',
        component: () => import('../views/employee/employeeView.vue')
      },
      // 用户管理
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/userManage/userManageView.vue')
      }
    ]
  }
  
]

const router = new VueRouter({
  routes
})

export default router
