import request from '@/utils/request'

export function getList(ns) {
  return request({
    url: '/v1/deployment?ns=' + ns,
    method: 'get'
  })
}
