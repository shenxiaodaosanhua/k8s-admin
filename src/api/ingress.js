import request from '@/utils/request'

// 获取ingress列表
export function getIngressList(ns) {
  return request({
    url: '/v1/ingress?ns=' + ns,
    method: 'get'
  })
}

// 创建ingress
export function createIngress(data) {
  return request({
    url: '/v1/ingress',
    method: 'post',
    data: data
  })
}
