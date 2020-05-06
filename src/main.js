import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// ---------------------------------------- 无延迟点击
import fastclick from 'fastclick'

// ---------------------------------------- 应用样式
import 'common/styles/index.scss'

Vue.config.productionTip = false
fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
