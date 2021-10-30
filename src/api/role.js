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
