import jsonp from 'common/js/jsonp'
import axios from 'axios'
import { commonParams, options } from './config'

/**
 * 获取热门搜索
 */
export function getHotKey () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}

/**
 * 搜索目标歌曲
 * @param {*} query 搜索关键字
 * @param {*} page 第几页
 * @param {*} zhida 未知
 * @param {*} perpage 一页多少数据
 */
export function search (query, page, zhida, perpage) {
  const url = '/api/searchList'

  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    w: query,
    zhidaqu: 1,
    catZhida: zhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: perpage,
    n: perpage,
    p: page,
    remoteplace: 'txt.mqq.all'
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}