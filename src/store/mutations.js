import * as type from './mutation-type'

export default {
  [type.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  // 收集请求
  pushToekn (state, payload) {
    state.cancelTokenArr.push(payload.cancelToken)
  },
  // 取消请求
  clearToekn ({ cancelTokenArr }) {
    cancelTokenArr.forEach(item => {
      item('路由跳转取消请求')
    })
    cancelTokenArr = []
  }
}