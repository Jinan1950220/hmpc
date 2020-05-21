// 必须保持所有inport都在上面
import Vue from 'vue'
import App from './App.vue'

// 脚手架自动创建的路由配置文件
// 由于目录下有一个名为index.js的文件，则可以简写：
// import XXX from './router/index.js' ======>
// import XXX from './router'
import router from './router'

import './style/index.less'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
