/**
 * 封装用户的相关操作
 * es6 按需导入到出
 */
// 定义一个函数并导出
// 传入手机号和验证码
import ajax from '../utils/request.js'
export const userLogin = (mobile, code) => {
  return ajax({
    method: 'post',
    url: '/mp/v1_0/authorizations',
    data: {
      mobile: mobile,
      code: code
    }
  })
}
