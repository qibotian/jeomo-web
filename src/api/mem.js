import request from '@/utils/request'

/**
 * 分页查询
 * @param query
 */
export function fetchList(query) {
  return request({
    url: '/mem/list',
    method: 'post',
    data: query
  })
}
