import request from '@/utils/request'

// 获取信息
export function getPersonalUser(UserId) {
    return request({
      url: '/user/users/personal/' + UserId,
      method: 'get'
    })
  }