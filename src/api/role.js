import request from '@/utils/request'

// 获取全部角色
export function listAllRole() {
    return request({
        url: '/admin/role/list',
        method: 'get'
    })
}