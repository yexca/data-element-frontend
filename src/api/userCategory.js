import request from '@/utils/request'

// 查询所有分类
export function listAllCategory() {
  return request({
    url: '/user/category/list',
    method: 'get'
  })
}