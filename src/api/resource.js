import request from '@/utils/request'

export function getResourceList() {
  return request({
    url: '/v1/resources',
    method: 'get'
  })
}
