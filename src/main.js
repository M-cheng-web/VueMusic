import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// ---------------------------------------- 无延迟点击
import fastclick from 'fastclick'
fastclick.attach(document.body)

// ---------------------------------------- 懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('common/image/lazyImg.png'), // 懒加载过程图片
})

// ---------------------------------------- 应用样式
import 'common/styles/index.scss'


Vue.config.productionTip = false
Vue.config.silent = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
