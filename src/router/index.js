import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  // 当从歌手-歌单页面跳转回歌手页面触发 取消正在请求
  if (from.name === 'singer-detail' && to.name === 'singer') {
    store.commit('clearToekn')
  }
  next()
})

export default router
