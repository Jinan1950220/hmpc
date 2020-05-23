/**
 * 专门用来处理用户信息本地持久化 -- 保存在lacalstorage
 */
// 定义一些工具方法，实现数据的存储 获取 删除 修改
const KEY = 'hm-tt-pc-userinfo'

/**
 * 保存用户信息到loacalStorage
 * @param {*} user
 */
const setUser = (user) => {
  localStorage.setItem(KEY, JSON.stringify(user))
}

const getUser = () => {
  // 如果本地获取不到key值，先填入一个空的
  // 避免后续代码出错
  // userinfo.token 当这个值为null  这个代码就挂了，当它为空对象{} 代码是好的
  return JSON.parse(localStorage.getItem(KEY)) || { }
}

const delUser = () => {
  localStorage.removeItem(KEY)
}
export { setUser, getUser, delUser }
