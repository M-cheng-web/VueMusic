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
export const jumpSong = ({ commit }, index) => {
  commit(types.SET_CURRENT_INDEX, index)
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