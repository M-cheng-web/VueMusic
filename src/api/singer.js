import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

/**
 * 获取推荐歌手列表
 */
export function getSingerList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    // 三个all代表可以查询所有歌手
    pagesize: 100,
    // 一次可以查询100个数组
    pagenum: 1,
    // 查询现在页数是1
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 1664029744
  })

  return jsonp(url, data, options)
}

/**
 * 获取对应歌手的更多信息(内包括歌单ID)
 * @param {Number} singerId 歌手ID 
 */
export function getSingerDetail (singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    g_tk: 1664029744,
    singermid: singerId
  })

  return jsonp(url, data, options)
}