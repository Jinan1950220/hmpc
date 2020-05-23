import Vue from 'vue'
import VueRouter from 'vue-router'
// 導入登陸組件
import Login from '../views/login/index.vue'
import Layout from '../views/layout/index.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/', component: Layout }
]

const router = new VueRouter({
  routes
})

export default router
