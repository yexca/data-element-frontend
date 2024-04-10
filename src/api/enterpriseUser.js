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
export function listEnterpriseUser(query) {
  return request({
    url: '/admin/users/enterprise',
    method: 'get',
    params: query
  })
}

// 查询员工信息详细
export function getEnterpriseUser(UserId) {
  return request({
    url: '/admin/users/enterprise/' + UserId,
    method: 'get'
  })
}

// 新增员工信息
export function addEnterpriseUser(data) {
  return request({
    url: '/admin/users/enterprise',
    method: 'post',
    data: data
  })
}

// 修改员工信息
export function updateEnterpriseUser(userId, data) {
  return request({
    url: '/admin/users/enterprise/' + userId,
    method: 'put',
    data: data
  })
}

// 删除员工信息
export function delEnterpriseUser(userId) {
  return request({
    url: '/admin/usesr/enterprise/' + userId,
    method: 'delete'
  })
}
