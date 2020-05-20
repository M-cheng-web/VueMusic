import * as types from './mutation-type'

/**
 * 点击歌单开始播放
 * @param {*} param0 list: 歌曲数组, index: 歌曲下标
 */
export const playAction = ({ commit }, { list, index }) => {
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_CURRENT_INDEX, index)
}

/**
 * 
 * @param {*} bol true: 全屏  false: 小屏
 */
export const showSmallPlay = ({ commit }, bol) => {
  commit(types.SET_FULL_SCREEN, bol)
}
