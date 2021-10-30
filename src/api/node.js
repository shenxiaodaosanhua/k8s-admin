import request from '@/utils/request'

// 获取所有 ns列表
export function getNodes() {
  return request({
    url: '/v1/nodes',
    method: 'get'
  })
}

export function getNodeDetail(name) {
  return request({
    url: '/v1/nodes/' + name,
    method: 'get'
  })
}

export function updateNode(data) {
  return request({
    url: '/v1/nodes',
    method: 'post',
    data: data
  })
}
