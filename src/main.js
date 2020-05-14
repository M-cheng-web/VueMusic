import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// --------------------------------------------------------- 引入组件
import SvgIcon from 'components/svg-icon'
import Scroll from 'components/scroll'
import Loading from 'components/loading'


// --------------------------------------------------------- 引入插件
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'


// --------------------------------------------------------- 引入资源
import 'common/styles/index.scss' // 样式文件
import 'common/svg' // svg图


// --------------------------------------------------------- 插件配置
fastclick.attach(document.body) // 无延迟点击
Vue.use(VueLazyload, { // 懒加载
  // 懒加载过程图片地址
  loading: require('common/image/lazyImg.png'),
})


// --------------------------------------------------------- 注册全局组件
Vue.component('svg-icon', SvgIcon)
Vue.component('scroll', Scroll)
Vue.component('loading', Loading)


// --------------------------------------------------------- 全局配置
Vue.config.productionTip = false
Vue.config.silent = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
