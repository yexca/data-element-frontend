import request from '@/utils/request'

// 获取全部国家
export function listAllCountry() {
    return request({
        url: '/user/country/list',
        method: 'get'
    })
}