import request from '@/utils/request'

// 获取指定命名空间svc列表
export function getSvcListByNs(ns) {
  return request({
    url: '/v1/svc?ns=' + ns,
    method: 'get'
  })
}
