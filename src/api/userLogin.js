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

// 注册
export function personalUserRegister(registerData){
    return request({
    url: '/user/users/personal/register',
    method: 'post',
    data: registerData
    })
}

export function enterpriseUserRegister(registerData){
    return request({
    url: '/user/users/enterprise/register',
    method: 'post',
    data: registerData
    })
}