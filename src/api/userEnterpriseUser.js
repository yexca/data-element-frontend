import request from '@/utils/request'

// 获取信息
export function getEnterpriseUser(UserId) {
    return request({
      url: '/user/users/enterprise/' + UserId,
      method: 'get'
    })
  }

// 修改个人信息
export function updateEnterpriseUser(data) {
  return request({
    url: '/user/users/enterprise',
    method: 'put',
    data: data
  })
}

// 查询个人用户详细
export function getEnterpriseUserUpdate() {
  return request({
    url: '/user/users/enterprise',
    method: 'get'
  })
}