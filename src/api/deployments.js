import request from '@/utils/request'

export function getDeploymentList(ns) {
  return request({
    url: '/v1/deployment?ns=' + ns,
    method: 'get'
  })
}

export function getDeploymentInfo(ns, name) {
  return request({
    url: '/v1/deployment/' + ns + '/' + name,
    method: 'get'
  })
}
