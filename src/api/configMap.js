import request from '@/utils/request'

export function getConfigMapByNs(ns) {
  return request({
    url: '/v1/config-map?ns=' + ns,
    method: 'get'
  })
}

export function deleteConfigMap(data) {
  return request({
    url: '/v1/config-map',
    method: 'delete',
    data: data
  })
}
