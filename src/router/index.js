import Vue from 'vue'
import VueRouter from 'vue-router'
import layoutView from '@/views/layout/layoutView.vue'
// import '@/permission'  // 确保引入 permission 配置

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin/login',
    name: 'adminLogin',
    component: () => import( '../views/login/loginView.vue')
  },
  {
    path: '/login',
    name: 'userLogin',
    component: () => import( '../views/login/userLoginView.vue')
  },
  {
    path: '/register',
    name: 'useRegister',
    component: () => import( '../views/login/userRegisterView.vue')
  },
  // 搜索界面
  {
    path: '/',
    name: 'home',
    redirect: '/search',
  },
  // 搜索
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search/searchView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: layoutView,
    redirect: '/admin/dashboard',
    children:[
      {
        path: '/admin/dashboard',
        name: 'dashboard',
        component: () => import('../views/dashboard/dashboardView.vue')
      },
      // 员工个人中心
      {
        path: '/admin/center',
        name: 'employeeCenter',
        component: () => import('../views/employee/employeeCenter.vue')
      },
      // 员工管理
      {
        path: '/admin/employee',
        name: 'employee',
        component: () => import('../views/employee/employeeManage.vue')
      },
      // 个人用户管理
      {
        path: '/admin/users/personal',
        name: 'personalUserManage',
        component: () => import('../views/userManage/personalUserManageView.vue')
      },
      // 企业用户管理
      {
        path: '/admin/users/enterprise',
        name: 'enterpriseUserManage',
        component: () => import('../views/userManage/enterpriseUserManageView.vue')
      },
      // 个人数据管理
      {
        path: '/admin/data/personal',
        name: 'personalDataManage',
        component: () => import('../views/userDataManage/personalDataManageView.vue')
      },
      // 企业数据管理
      {
        path: '/admin/data/enterprise',
        name: 'enterpriseDataManage',
        component: () => import('../views/userDataManage/enterpriseDataManageView.vue')
      },
      // 国家信息管理
      {
        path: '/admin/info/country',
        name: 'countryManage',
        component: () => import('../views/infoManage/countryView.vue')
      },
      // 分类信息管理
      {
        path: '/admin/info/category',
        name: 'categoryManage',
        component: () => import('../views/infoManage/categoryView.vue')
      },
      // 角色信息管理
      // {
      //   path: '/admin/info/role',
      //   name: 'roleManage',
      //   component: () => import('../views/infoManage/roleView.vue')
      // },
      // 测试
      // {
      //   path: '/test',
      //   name: 'test',
      //   component: () => import('../views/test/testView.vue')
      // }
    ]
  },
  // 个人用户视图
  {
    path: '/user/personal/:userId',
    name: 'PersonalView',
    component: () => import('../views/userView/personalUserView.vue'),
    props: true // 启用props将路由参数传递给组件
  },
  // 企业用户视图
  {
    path: '/user/enterprise/:userId',
    name: 'EnterpriseView',
    component: () => import('../views/userView/enterpriseUserView.vue'),
    props: true // 启用props将路由参数传递给组件
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
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  // const token = localStorage.getItem('token');

  // const path = to.path;
  // console.log(typeof path)

  if (to.path.startsWith('/admin')) {  // 检查是否访问管理端路径
    const token = localStorage.getItem('adminToken');
    // console.log("访问管理端路径")
    if (to.path == '/admin/login'){
      next();
    }else if (!token) {
      // 如果没有token，重定向到登录页面，并保存当前路径以便登录后可以返回
      next({
        path: '/admin/login',
        query: { redirect: to.fullPath }  // 将当前路径作为参数，登录后可以使用
      });
    } else {
      next();  // 如果有token，正常进入页面
    }
  } else if(to.path.startsWith('/user')){
    const token = localStorage.getItem('token');
    // console.log("访问用户端路径")
    if (!token) {
      // 如果没有token，重定向到登录页面，并保存当前路径以便登录后可以返回
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将当前路径作为参数，登录后可以使用
      });
    } else {
      next();  // 如果有token，正常进入页面
    }
  }else {
    // console.log("访问其他路径")
    next();  // 对于非管理端路径，正常进入页面
  }
});

export default router
