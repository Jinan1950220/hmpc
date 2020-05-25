/**
 * 文章相关请求模块
 */
import ajax from '../utils/request.js'

export const getArticles = (queryObj) => {
  /**
  * 对于axios来说，在哪里填入参数
  * 如果参数要放在请求中的，则要写data
  */
  return ajax({
    method: 'get',
    url: '/mp/v1_0/articles',
    params: queryObj
  })
}
