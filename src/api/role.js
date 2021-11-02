import request from '@/utils/request'

export function getRolesByNs(ns) {
  return request({
    url: '/v1/roles?ns=' + ns,
    method: 'get'
  })
}

export function createRoles(data) {
  return request({
    url: '/v1/roles',
    method: 'post',
    data: data
  })
}

export function getRoleBindingByNs(ns) {
  return request({
    url: '/v1/role-binding?ns=' + ns,
    method: 'get'
  })
}

export function getRoleDetail(ns, name) {
  return request({
    url: '/v1/roles/' + ns + '/' + name,
    method: 'get'
  })
}

export function updateRole(ns, name, data) {
  return request({
    url: '/v1/roles/' + ns + '/' + name,
    method: 'post',
    data: data
  })
}
