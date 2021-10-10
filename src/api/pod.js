import request from '@/utils/request'

// 获取所有 ns列表
export function getPodsByNs(ns, page) {
  return request({
    url: '/v1/pods?ns=' + ns + '&current=' + page,
    method: 'get'
  })
}
