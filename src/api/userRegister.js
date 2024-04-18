import request from '@/utils/request'

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