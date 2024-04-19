import request from '@/utils/request'

// 获取全部国家
export function listAllCountry() {
    return request({
        url: '/country',
        method: 'get'
    })
}