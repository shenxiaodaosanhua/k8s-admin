import request from '@/utils/request'

// 获取所有 ns列表
export function getNamespaceList() {
  return request({
    url: '/v1/namespaces',
    method: 'get'
  })
}

export function createNamespace(data) {
  return request({
    url: '/v1/namespaces',
    method: 'post',
    data: data
  })
}

export function deleteNamespaceByName(name) {
  return request({
    url: '/v1/namespaces?name=' + name,
    method: 'delete'
  })
}
