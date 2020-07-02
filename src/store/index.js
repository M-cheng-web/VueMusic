import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import * as getters from './getters'
import mutations from './mutations'
import * as actions from './actions'

import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: debug // 规范使用 vuex 比如只能通过 getters获取 state
  // plugins: debug ? [createLogger()] : [] // 发生更改时打印值
})
