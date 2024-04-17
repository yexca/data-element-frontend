import request from '@/utils/request'

// 新增个人数据
export function addEnterpriseData(data) {
    return request({
      url: '/user/data/enterprise',
      method: 'post',
      data: data
    })
}

// 删除个人数据
export function delEnterpriseData(dataId) {
    return request({
      url: '/user/data/enterprise/' + dataId,
      method: 'delete'
    })
}
  
// 查询个人数据列表
export function listEnterpriseData(query) {
  return request({
    url: '/user/data/enterprise',
    method: 'get',
    params: query
  })
}

// 修改个人数据
export function updateEnterpriseData(dataId, data) {
    return request({
      url: '/user/data/enterprise/' + dataId,
      method: 'put',
      data: data
    })
}

// 查询个人数据详细
export function getEnterpriseData(dataId) {
  return request({
    url: '/user/data/enterprise/' + dataId,
    method: 'get'
  })
}
