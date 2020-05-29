import { commonParams } from './config'
import jsonp from 'common/js/jsonp'
import axios from 'http'

/**
 * 获取歌词
 * @param {Number} mid 歌曲 ID
 */
export const getLyric = mid => {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json',
    g_tk: 67232076
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}