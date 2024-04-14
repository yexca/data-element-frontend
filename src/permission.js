import router from './router'  // 确保从你的路由配置文件正确导入

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.path.startsWith('/admin')) {  // 检查是否访问管理端路径
    if (!token) {
      // 如果没有token，重定向到登录页面，并保存当前路径以便登录后可以返回
      next({
        path: '/admin/login',
        query: { redirect: to.fullPath }  // 将当前路径作为参数，登录后可以使用
      });
    } else {
      next();  // 如果有token，正常进入页面
    }
  } else {
    next();  // 对于非管理端路径，正常进入页面
  }
});

export default router;
