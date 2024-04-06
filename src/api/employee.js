import request from '@/utils/request'

// 登录
export function empLogin(loginData){
  return request({
    url: '/admin/employee/login',
    method: 'post',
    data: loginData
  })
}

// 查询员工信息列表
export function listEmployee(query) {
  return request({
    url: '/admin/employee/page',
    method: 'get',
    params: query
  })
}

// 查询员工信息详细
export function getEmployee(employeeId) {
  return request({
    url: '/admin/employee/' + employeeId,
    method: 'get'
  })
}

// 新增员工信息
export function addEmployee(data) {
  return request({
    url: '/admin/employee/add',
    method: 'post',
    data: data
  })
}

// 修改员工信息
export function updateEmployee(data) {
  return request({
    url: '/admin/employee/edit',
    method: 'put',
    data: data
  })
}

// 删除员工信息
// export function delEmployee(employeeId) {
//   return request({
//     url: '/api/admin/employee/' + employeeId,
//     method: 'delete'
//   })
// }
