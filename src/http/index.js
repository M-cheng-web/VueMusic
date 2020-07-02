import axios from 'axios'
import store from '../store'

/* ----------------------------------- 创建实例 ------------------------------------ */
// const instance = axios.create({
//   baseURL: httpConfig.url + '/api',
//   timeout: httpConfig.timeout,
//   headers: httpConfig.headers
// })
const instance = axios.create()
let cancelToken = axios.CancelToken


/* ----------------------------------- 请求拦截 ------------------------------------ */
instance.interceptors.request.use(
  config => {
    config.cancelToekn = new cancelToken(cancel => {
      // store.commit('pushToekn', { cancelToken: cancel })
    })
    return config
  },
  error => {
    return error
  }
)

/* ----------------------------------- 响应拦截 ------------------------------------ */

/* ----------------------------------- 导出实例 ------------------------------------ */
export default instance
