import Vue from 'vue'
import VueRouter from 'vue-router'
// 導入登陸組件
import Login from '../views/login/index.vue'
import Layout from '../views/layout/index.vue'
import Article from '../views/articles/index.vue'
import AddArticle from '../views/articles/add.vue'
import EditArticle from '../views/articles/edit.vue'
import Image from '../views/image/index.vue'
import NotFound from '../views/404/index.vue'
import { getUser } from '../utils/storsge.js'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/articles', component: Article },
      { path: '/addarticle', component: AddArticle },
      { path: '/editarticle/:id', component: EditArticle },
      { path: '/image', component: Image }
    ]
  },
  { path: '*', component: NotFound }
]

const router = new VueRouter({
  routes
})

// 加一个路由导航守卫
// 所有的页面路由跳转，都会先进入到这个函数中来
// to 要跳入的路由信息
// from 要跳出的路由信息，你从哪里来
// next 放行的方法
//      next() 正常跳转，允许进入到to路由
//      next(路由地址) 不允许to，而是去指定的路由地址
router.beforeEach((to, from, next) => {
  // console.log('路由导航守卫', to, from, next)
  if (to.path === '/') {
    // 检查是否有登录的信息 看localstorage 有没有token
    const userInfo = getUser()
    if (userInfo && userInfo.token) {
      next()
    } else {
      alert('路由守卫：请先登录')
      next('/login')
    }
    // 如果有就放行
    // 没有就回去登录
  } else {
    next()
  }
})
export default router
