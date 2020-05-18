import * as types from './mutation-type'

// 点击播放
export const playAction = ({ commit }, { list, index }) => {
  console.log('11');
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_CURRENT_INDEX, index)
}