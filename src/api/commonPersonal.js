import request from '@/utils/request'

// 查询个人数据详细
export function getPersonalData(id) {
    return request({
      url: '/data/personal/' + id,
      method: 'get'
    })
  }