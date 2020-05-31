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
export const getArticlesChannels = () => {
  /**
   * 获取文章频道
   */
  return ajax({
    method: 'get',
    url: '/mp/v1_0/channels'
  })
}
export const deleteArticle = articleId => {
  /**
   * 删除文章
   */
  return ajax({
    method: 'delete',
    url: '/mp/v1_0/articles/' + articleId
  })
}

/**
 * @param {*} isDraft 是否是草稿
 * @param {*} article
 */
export const addArticle = (isDraft, article) => {
  return ajax({
    method: 'post',
    url: '/mp/v1_0/articles',
    params: {
      darft: isDraft
    },
    data: article
  })
}

/**
 * 获取文章详细信息
 * @param {*} id文章编号
 */
export const getArticle = id => {
  return ajax({
    method: 'get',
    url: 'mp/v1_0/articles/' + id
  })
}

/**
 *
 * @param {*} id 文章编号
 * @param {*} data 修改数据
 */
export const modArticle = (id, data) => {
  return ajax({
    method: 'put',
    url: '/mp/v1_0/articles/' + id,
    params: {
      draft: false
    },
    data: data
  })
}
