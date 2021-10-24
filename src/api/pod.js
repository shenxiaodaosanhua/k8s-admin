import request from '@/utils/request'

// 获取所有 ns列表
export function getPodsByNs(ns, page) {
  return request({
    url: '/v1/pods?ns=' + ns + '&current=' + page,
    method: 'get'
  })
}

export function getPodInfo(ns, name) {
  return request({
    url: '/v1/pods/' + ns + '/' + name,
    method: 'get'
  })
}

export function getPodContainerLogs(ns, pname, cname) {
  return request({
    url: '/v1/pod-logs?ns=' + ns + '&pname=' + pname + '&cname=' + cname,
    method: 'get'
  })
}
