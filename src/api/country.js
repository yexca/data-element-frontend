import request from '@/utils/request'

// 获取全部国家
export function listAllCountry() {
    return request({
        url: '/admin/country/list',
        method: 'get'
    })
}

// 查询国家列表
export function listCountry(query) {
  return request({
    url: '/admin/country',
    method: 'get',
    params: query
  })
}

// 查询国家详细
export function getCountry(id) {
  return request({
    url: '/admin/country/' + id,
    method: 'get'
  })
}

// 新增国家
export function addCountry(data) {
  return request({
    url: '/admin/country',
    method: 'post',
    data: data
  })
}

// 修改国家
export function updateCountry(id, data) {
  return request({
    url: '/admin/country/' + id,
    method: 'put',
    data: data
  })
}

// 删除国家
export function delCountry(id) {
  return request({
    url: '/admin/country/' + id,
    method: 'delete'
  })
}