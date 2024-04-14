import request from '@/utils/request'

// 查询企业数据列表
export function listEnterpriseData(query) {
  return request({
    url: '/admin/data/enterprise',
    method: 'get',
    params: query
  })
}

// 查询企业数据详细
export function getEnterpriseData(dataId) {
  return request({
    url: '/admin/data/enterprise/' + dataId,
    method: 'get'
  })
}

// 新增企业数据
export function addEnterpriseData(data) {
  return request({
    url: '/admin/data/enterprise',
    method: 'post',
    data: data
  })
}

// 修改企业数据
export function updateEnterpriseData(dataId, data) {
  return request({
    url: '/admin/data/enterprise/' + dataId,
    method: 'put',
    data: data
  })
}

// 删除企业数据
export function delEnterpriseData(dataId) {
  return request({
    url: '/admin/data/enterprise/' + dataId,
    method: 'delete'
  })
}
