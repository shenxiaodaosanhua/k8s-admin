import request from '@/utils/request'

export function getConfigMapByNs(ns) {
  return request({
    url: '/v1/config-map?ns=' + ns,
    method: 'get'
  })
}

export function getConfigMapByNsInfo(ns, name) {
  return request({
    url: '/v1/config-map/' + ns + '/' + name,
    method: 'get'
  })
}

export function createConfigMap(data) {
  return request({
    url: '/v1/config-map',
    method: 'post',
    data: data
  })
}

export function deleteConfigMap(data) {
  return request({
    url: '/v1/config-map',
    method: 'delete',
    data: data
  })
}
