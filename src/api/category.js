import request from '@/utils/request'

// 查询所有分类
export function listAllCategory() {
  return request({
    url: '/admin/category/list',
    method: 'get'
  })
}

// 查询分类列表
export function listCategory(query) {
  return request({
    url: '/admin/category',
    method: 'get',
    params: query
  })
}

// 查询分类详细
export function getCategory(id) {
  return request({
    url: '/admin/category/' + id,
    method: 'get'
  })
}

// 新增分类
export function addCategory(data) {
  return request({
    url: '/admin/category',
    method: 'post',
    data: data
  })
}

// 修改分类
export function updateCategory(id, data) {
  return request({
    url: '/admin/category/' + id,
    method: 'put',
    data: data
  })
}

// 删除分类
export function delCategory(id) {
  return request({
    url: '/admin/category/' + id,
    method: 'delete'
  })
}