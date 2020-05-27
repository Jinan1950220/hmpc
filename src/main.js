// 必须保持所有inport都在上面
import Vue from 'vue'
import App from './App.vue'
// import JSONbig from 'json-bigint'

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

// Vue.config.productionTip = false
// const str = '{"id": 165165165165161651 }'
// 对于JSONbig 他在处理数据时，会自动识别其中的大叔，并以数组的格式保存起来
// console.log('jsp', JSON.parse(str))
// const b = JSONbig.parse(str)
// console.log('jsb', b)
// console.log(b.id.toString())
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
