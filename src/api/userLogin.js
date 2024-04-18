import request from '@/utils/request'

// 登录
export function personalUserLogin(loginData){
    return request({
    url: '/user/users/personal/login',
    method: 'post',
    data: loginData
    })
}

export function enterpriseUserLogin(loginData){
    return request({
        url: '/user/users/enterprise/login',
        method: 'post',
        data: loginData
    })
}
