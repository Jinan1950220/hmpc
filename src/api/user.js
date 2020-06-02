/**
 * 封装用户的相关操作
 * es6 按需导入到出
 */
// 定义一个函数并导出
// 传入手机号和验证码
// import { getUser } from '../utils/storsge.js'
import ajax from '../utils/request.js'
export const userLogin = (mobile, code) => {
  // 这个函数的返回结果是一个promise类型的数据
  const result = ajax({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data: {
      mobile: mobile,
      code: code
    }
  })

  return result
}
/**
 * 获取用户的身份信息
 */
export const userGetProfile = () => {
  // const userInfo = getUser()
  // 请求接口
  return ajax({
    method: 'get',
    url: '/mp/v1_0/user/profile'
    // 设置改到request.js中设置
    // 参数写在headers中是由于 接口的要求
    // 参数名 个数 类型 位置  都是由后端决定的
    // headers: {
    //   // Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjE2NTE3ODgsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.oiwQCBjFw20R2_u58jKtEkoF97UQkp4SBKHVtKMaioU'
    //   // Authorization: 'Bearer 从loaclastorge取出token的值'
    //   Authorization: 'Bearer ' + userInfo.token
    // }
  })
}

/**
 * 修改用户信息
 * @param {*} name 姓名
 * @param {*} email 邮箱
 * @param {*} info 介绍
 */
// export const modUserProfile = (name, email, info) => {

/**
 * @param {*} data {name,email,info}
 * 直接传入一个对象
 */
export const modUserProfile = data => {
  return ajax({
    method: 'patch',
    url: '/mp/v1_0/user/profile',
    data
  })
}

/**
 * 修改用户头像
 * @param {*} formdata 是一个formData格式的对象
 */
export const modUserImage = (formData) => {
  return ajax({
    method: 'patch',
    url: '/mp/v1_0/user/photo',
    data: formData
  })
}
