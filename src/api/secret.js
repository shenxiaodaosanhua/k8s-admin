import request from '@/utils/request'

export function getSecretListByNs(ns) {
  return request({
    url: '/v1/secrets?ns=' + ns,
    method: 'get'
  })
}

export function deleteSecret(data) {
  return request({
    url: '/v1/secrets',
    method: 'delete',
    data: data
  })
}

export function createSecret(data) {
  return request({
    url: '/v1/secrets',
    method: 'post',
    data: data
  })
}
