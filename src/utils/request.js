/**
 * 基于axios封装请求模块
 */
import axios from 'axios'
import { getUser } from '../utils/storsge.js'
import JSONbig from 'json-bigint'

// 创建axios实例
const instance = axios.create({
  // 基地址：当前所有的接口的开头
  // baseURL: 'http://api-toutiao-web.itheima.net/',
  baseURL: 'http://ttapi.research.itcast.cn/',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
  transformResponse: [function (data) {
    // console.log(data)
    // data就是本次请求获取的数据
    // 在这里可以对他进一步的处理
    // 后端返回的数据不是JSON字符串
    // 所以使用try -catch 来捕获异常
    // 如果没有遇到错误，则返回JSONbig处理之后的数据
    try {
      return JSONbig.parse(data || '{}')
    } catch (err) {
      console.log('JSONbig转换出错', err)
      return data
    }
  }]
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
