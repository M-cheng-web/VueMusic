import * as types from './mutation-type'
import { removeByVal } from 'common/js/util'
import { getPlaySongVkey } from 'api/song'

/**
 * 点击歌单开始播放
 * list: 歌曲数组, index: 歌曲下标
 */
export const playAction = ({ commit }, { list, index }) => {
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
}

/**
 * 更改当前选中的歌手信息
 */
export const changeSinger = ({ commit }, item) => {
  commit(types.SET_SINGER, item)
}

/**
 * 更改当前选中的推荐歌单信息
 */
export const changeDisc = ({ commit }, item) => {
  commit(types.SET_DISC, item)
}

/**
 * 更改当前选中的排行榜信息
 */
export const changeRank = ({ commit }, item) => {
  commit(types.SET_RANK, item)
}

/**
 * 更改搜索的历史记录
 * type: 0 在数组首位添加item
 * type: 1 删除数组下标为item位置的值
 * type: 2 删除数组全部内容
 */
export const changeSearchHist = ({ getters, commit }, { type, item }) => {
  let list = JSON.parse(JSON.stringify(getters.searchHist))
  switch (type) {
    case 0:
      removeByVal(list, item)
      list.unshift(item)
      commit(types.SET_REARCH_HIST, list)
      break;
    case 1:
      list.splice(item, 1)
      commit(types.SET_REARCH_HIST, list)
      break;
    case 2:
      commit(types.SET_REARCH_HIST, [])
      break;
  }
}

/**
 * 控制播放界面 全屏 / 小屏
 * @param {*} bol true: 全屏  false: 小屏
 */
export const showSmallPlay = ({ commit }, bol) => {
  commit(types.SET_FULL_SCREEN, bol)
}

/**
 * 歌曲跳转
 * @param {Number} index 跳转的下标
 */
export const jumpSong = ({ getters, commit }, index) => {
  if (getters.playlist[index].url.slice(-3) === 'xxx') { // 有歌曲url就不再请求

    getPlaySongVkey(getters.playlist[index].mid).then(res => { // 获取歌曲 url
      if (res) {
        commit(types.SET_PLAYLIST_URL, { // 填充 url
          index,
          url: `http://ws.stream.qqmusic.qq.com/${res}`
        })
        commit(types.SET_CURRENT_INDEX, index) // 切换歌曲
      } else {
        commit(types.SET_PLAYLIST_DEL_ONE, index) // 删除这个歌曲
        console.log('没有获取到歌曲, 已删除, 请再点击一次')
      }
    })

  } else {
    commit(types.SET_CURRENT_INDEX, index) // 切换歌曲
  }
}

/**
 * 歌曲 播放 / 暂停
 * @param {Boolean} isTrue true: 播放 false: 暂停
 */
export const stopOrRunSong = ({ commit }, isTrue) => {
  commit(types.SET_PLAYING_STATE, isTrue)
}

/**
 * 设置播放模式 循环 / 单曲 / 随机
 * @param {String} mode
 */
export const setSongMode = ({ commit }, mode) => {
  commit(types.SET_PLAY_MODE, mode)
}