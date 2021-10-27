import request from '@/utils/request'

// 获取所有 ns列表
export function getNodes() {
  return request({
    url: '/v1/nodes',
    method: 'get'
  })
}
