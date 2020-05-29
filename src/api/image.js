/**
 * 封装素材相关的操作
 */
import ajax from '@/utils/request.js'

export const getImages = (paramObj) => {
  return ajax({
    method: 'get',
    url: '/mp/v1_0/user/images',
    params: paramObj
  })
}
/**
 * 切换收藏图片
 * @param {*} id 图片的编号
 * @param {*} collect 是否收藏
 */
export const switchCollect = (id, collect) => {
  return ajax({
    method: 'put',
    url: '/mp/v1_0/user/images/' + id,
    data: {
      // 'collect': collect
      collect
    }
  })
}

export const deleteImage = id => {
  ajax({
    method: 'delete',
    url: '/mp/v1_0/user/images/' + id
  })
}
