import request from '@/utils/request'

// 新增个人数据
export function addPersonalData(data) {
    return request({
      url: '/user/data/personal',
      method: 'post',
      data: data
    })
}

// 删除个人数据
export function delPersonalData(dataId) {
    return request({
      url: '/user/data/personal/' + dataId,
      method: 'delete'
    })
}
  
// 查询个人数据列表
export function listPersonalData(query) {
  return request({
    url: '/user/data/personal',
    method: 'get',
    params: query
  })
}

// 修改个人数据
export function updatePersonalData(dataId, data) {
    return request({
      url: '/user/data/personal/' + dataId,
      method: 'put',
      data: data
    })
}

// 查询个人数据详细
export function getPersonalData(dataId) {
  return request({
    url: '/user/data/personal/' + dataId,
    method: 'get'
  })
}
