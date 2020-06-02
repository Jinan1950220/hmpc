import ajax from '@/utils/request.js'

export const getFans = (page, per_page) => {
  return ajax({
    method: 'get',
    url: '/mp/v1_0/followers',
    params: {
      page,
      per_page
    }
  })
}

export const getFansStatistics = () => {
  return ajax({
    method: 'get',
    url: '/mp/v1_0/statistics/followers'
  })
}
