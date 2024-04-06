import request from '@/utils/request'

// 获取全部国家
export function listCountry() {
    return request({
        url: '/admin/country/list',
        method: 'get'
    })
}