import request from '@/utils/request'

// 登录
// export function empLogin(loginData){
//   return request({
//     url: '/admin/employee/login',
//     method: 'post',
//     data: loginData
//   })
// }

// 查询员工信息列表
export function listPersonalUser(query) {
  return request({
    url: '/admin/users/personal',
    method: 'get',
    params: query
  })
}

// 查询员工信息详细
export function getPersonalUser(UserId) {
  return request({
    url: '/admin/users/personal/' + UserId,
    method: 'get'
  })
}

// 新增员工信息
export function addPersonalUser(data) {
  return request({
    url: '/admin/users/personal',
    method: 'post',
    data: data
  })
}

// 修改员工信息
export function updatePersonalUser(userId, data) {
  return request({
    url: '/admin/users/personal/' + userId,
    method: 'put',
    data: data
  })
}

// 删除员工信息
export function delPersonalUser(userId) {
  return request({
    url: '/admin/usesr/personal/' + userId,
    method: 'delete'
  })
}
