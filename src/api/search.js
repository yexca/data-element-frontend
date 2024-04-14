import request from '@/utils/request'

// 搜索
export function search(query) {
    return request({
        url: 'user/search',
        method: 'get',
        params: query
    })
}