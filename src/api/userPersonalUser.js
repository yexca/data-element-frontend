import request from '@/utils/request'

// 获取信息
export function getPersonalUser(UserId) {
    return request({
      url: '/user/users/personal/' + UserId,
      method: 'get'
    })
  }

// 修改个人信息
export function updatePersonalUser(data) {
  return request({
    url: '/user/users/personal',
    method: 'put',
    data: data
  })
}

// 查询个人用户详细
export function getPersonalUserUpdate() {
  return request({
    url: '/user/users/personal',
    method: 'get'
  })
}