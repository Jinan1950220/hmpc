/**
 * 基于axios封装请求模块
 */
import axios from 'axios'
import { getUser } from '../utils/storsge.js'

// 创建axios实例
const instance = axios.create({
  // 基地址：当前所有的接口的开头
  baseURL: 'http://api-toutiao-web.itheima.net/'
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// 请求拦截器
// 在所有的请求发出去之前，都会执行的函数
instance.interceptors.request.use(function (config) {
  const userInfo = getUser()
  // Do something before request is sent
  // 在发送请求之前做点什么
  if (userInfo && userInfo.token) {
    // console.log('请求拦截器', Date.now(), config)
    // 在这里给请求加headers,设置token
    config.headers.Authorization = 'Bearer ' + userInfo.token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
export default instance
