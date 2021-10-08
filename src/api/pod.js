import request from '@/utils/request'

// 获取所有 ns列表
export function getPodsByNs(ns) {
  return request({
    url: '/v1/pods?ns=' + ns,
    method: 'get'
  })
}
