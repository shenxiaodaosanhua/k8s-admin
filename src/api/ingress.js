import request from '@/utils/request'

// 获取所有 ns列表
export function getIngressList(ns) {
  return request({
    url: '/v1/ingress?ns=' + ns,
    method: 'get'
  })
}
