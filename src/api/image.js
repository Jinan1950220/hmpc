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
