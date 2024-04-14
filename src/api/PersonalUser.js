import request from '@/utils/request'

// 登录
// export function empLogin(loginData){
//   return request({
//     url: '/admin/employee/login',
//     method: 'post',
//     data: loginData
//   })
// }

// 查询个人用户列表
export function listPersonalUser(query) {
  return request({
    url: '/admin/users/personal',
    method: 'get',
    params: query
  })
}

// 查询个人用户详细
export function getPersonalUser(UserId) {
  return request({
    url: '/admin/users/personal/' + UserId,
    method: 'get'
  })
}

// 新增个人用户
export function addPersonalUser(data) {
  return request({
    url: '/admin/users/personal',
    method: 'post',
    data: data
  })
}

// 修改个人用户
export function updatePersonalUser(userId, data) {
  return request({
    url: '/admin/users/personal/' + userId,
    method: 'put',
    data: data
  })
}

// 删除个人用户
export function delPersonalUser(userId) {
  return request({
    url: '/admin/users/personal/' + userId,
    method: 'delete'
  })
}
