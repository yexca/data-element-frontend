import axios from 'axios';
import router from '@/router';
import { Message } from 'element-ui';
// import { UserModule } from '@/store/modules/user'
// import {getRequestKey,removePending} from './requestOptimize'
// import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  'timeout': 600000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 定义需要token验证的路径白名单
    const whitelist = ['/', '/search', '/user/users/personal/login', '/user/users/personal/register', '/user/users/enterprise/login', '/user/users/enterprise/register', '/admin/employee/login'];
    // 检查当前请求的路径是否在白名单中
    // const isWhitelisted = whitelist.some(path => config.url.includes(path));
    const isWhitelisted = whitelist.indexOf(config.url) !== -1;
    // console.log(config)
    // console.log("在白名单")
    // 如果不在白名单中，则尝试附加token
    if (!isWhitelisted) {
      // console.log("不在白名单")
      // 判断是管理端？
      if(config.url.startsWith('/admin')){
        const token = localStorage.getItem('adminToken');
        if(token){
          // console.log("设置token")
          config.headers['token'] = token;
        } else {
          // console.log("没有token")
          // 根据路径判断应重定向到的登录页面
          // const loginPath = config.url.startsWith('/admin') ? '/admin/login' : '/login';
          Message.error('未授权或登录失效，请重新登录');
          router.push('/admin/login');
          return Promise.reject({ data: '未登录', config})
        }
        return config;
      }else {
        const token = localStorage.getItem('token');
        if(token){
          config.headers['token'] = token;
        }else{
          Message.error('未授权或登录失效，请重新登录');
          router.push('/login');
          return Promise.reject({ data: '未登录', config})
        }
        return config;
      }
      
    }else{
      return config
    }
    
  },
  (error) => {
    // 处理错误请求
    console.error('Request error:', error);
    return Promise.reject(error);
  }
)

// 响应拦截器
service.interceptors.response.use(
  // (response) => {
  //   // console.log(response, 'response')
  //   if (response.data.status === 401) {
  //     router.push('/login')
  //   }
  //   //请求响应中的config的url会带上代理的api需要去掉
  //   response.config.url = response.config.url.replace('/api', '')
  //   // 请求完成，删除请求中状态
  //   // const key = getRequestKey(response.config);
  //   // removePending(key);
  //   if (response.data.code === 1) {
  //     return response
  //   }
  //   return false;
  // },
  (response) => {
      const data = response.data;
      if(data.code !== 1){
        Message.error(data.data || 'Error');
        return Promise.reject(new Error(data.data || 'Error'));
      }
      return response;
  },
  // (error) => {
  //   // console.log(error.config, pending, 'error')
  //   if (error && error.response) {
  //     switch (error.response.status) {
  //       case 401:
  //         this.$message.error('权限校验失败，请重新登录');
  //         // error.message = '权限校验失败，请重新登录'
  //         router.push('/login')
  //         break;
  //       case 405:
  //         error.message = '请求错误'
  //         break;
  //       case 500:
  //         error.message = '服务器错误'
  //     }
  //   }
  //   //请求响应中的config的url会带上代理的api需要去掉
  //   error.config.url = error.config.url.replace('/api', '')
  //   // 请求完成，删除请求中状态
  //   // const key = getRequestKey(error.config);
  //   // removePending(key);
  //   return Promise.reject(error)
  // }
  (error) => {
    const status = error.response ? error.response.status : 0;
    if(status){
      switch (status) {
        case 400:
          Message.error('请求错误');
          break;
        case 401:
          // 避免在登录页面重复跳转
          if (router.currentRoute.path.startsWith('/admin') && router.currentRoute.path != '/admin/login' ){
            Message.error('未授权或登录失效，请重新登录');
            router.replace('/admin/login');
          } else if(router.currentRoute.path.startsWith('/user') && router.currentRoute.path != '/login'){
            Message.error('未授权或登录失效，请重新登录');
            router.push('/login');
          }
          break;
        case 403:
          Message.error('拒绝访问');
          break;
        case 404:
          Message.error('请求地址出错');
          router.push('/404')
          break;
        case 500:
          Message.error('服务器内部错误');
          break;
        default:
          // 对于其他错误，视图处理
          return Promise.reject(error);
          // // 返回假数据
          // return Promise.resolve({
          //   data: {
          //     code: 0,
          //     msg: '请求失败',
          //     data: null
          //   }
          // })
      }
    }else {
      // 其他原因，交给视图处理
      return Promise.reject(error);
    }
  }
)

export default service
