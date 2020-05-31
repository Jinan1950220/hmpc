import ajax from '../utils/request'

/**
 *
 * @param {*} page页数
 * @param {*} per_page默认数量
 */
export const getComments = (page, per_page) => {
  /**
   * 获取使用与2评论管理的数据
   */
  return ajax({
    method: 'get',
    url: '/mp/v1_0/articles',
    params: {
      page,
      per_page,
      response_type: 'comment'
    }
  })
}

export const modCommentStatus = (id, allow_comment) => {
  return ajax({
    method: 'put',
    url: '/mp/v1_0/comments/status',
    params: {
      article_id: id
    },
    data: {
      allow_comment
    }
  })
}
