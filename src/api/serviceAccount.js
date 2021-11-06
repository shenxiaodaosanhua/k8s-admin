import request from '@/utils/request'

export function getServiceAccountByNs(ns) {
  return request({
    url: '/v1/service-account?ns=' + ns,
    method: 'get'
  })
}
