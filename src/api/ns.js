import request from '@/utils/request'

// 获取所有 ns列表
export function getNamespaceList() {
  return request({
    url: '/v1/namespaces',
    method: 'get'
  })
}
