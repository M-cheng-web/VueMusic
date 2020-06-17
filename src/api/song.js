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

// 根据歌曲ID 获取歌曲信息
export function getPlaySongVkey (songmid) {
  const url = '/api/getPlaySongVkey'
  const data = Object.assign({}, {
    g_tk: 5381,
    hostUin: 0,
    format: 'json',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: { 'req_0': { 'module': 'vkey.GetVkeyServer', 'method': 'CgiGetVkey', 'param': { 'guid': '6048837181', 'songmid': [songmid], 'songtype': [0], 'uin': '0', 'loginflag': 1, 'platform': '20' } }, 'comm': { 'uin': '2093181912', 'format': 'json', 'ct': 24, 'cv': 0 } }
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data.req_0.data.midurlinfo[0].purl)
  })
}