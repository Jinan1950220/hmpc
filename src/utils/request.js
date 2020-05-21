/**
 * 基于axios封装请求模块
 */
import axios from 'axios'

// 创建axios实例
const instance = axios.create({
  // 基地址：当前所有的接口的开头
  baseURL: 'http://ttapi.research.itcast.cn/'
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

export default instance
