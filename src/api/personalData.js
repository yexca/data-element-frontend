import request from '@/utils/request'

// 查询个人数据列表
export function listPersonalData(query) {
  return request({
    url: '/admin/data/personal',
    method: 'get',
    params: query
  })
}

// 查询个人数据详细
export function getPersonalData(dataId) {
  return request({
    url: '/admin/data/personal/' + dataId,
    method: 'get'
  })
}

// 新增个人数据
export function addPersonalData(data) {
  return request({
    url: '/admin/data/personal',
    method: 'post',
    data: data
  })
}

// 修改个人数据
export function updatePersonalData(dataId, data) {
  return request({
    url: '/admin/data/personal/' + dataId,
    method: 'put',
    data: data
  })
}

// 删除个人数据
export function delPersonalData(dataId) {
  return request({
    url: '/admin/data/personal/' + dataId,
    method: 'delete'
  })
}
