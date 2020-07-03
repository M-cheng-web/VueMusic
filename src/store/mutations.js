import * as types from './mutation-type'

export default {
  // 当前选中的歌手信息
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },

  // 当前选中的推荐歌单信息
  [types.SET_DISC] (state, disc) {
    state.disc = disc
  },

  // 当前选中的排行榜信息
  [types.SET_RANK] (state, rank) {
    state.rank = rank
  },

  // 搜索的历史记录
  [types.SET_REARCH_HIST] (state, searchHist) {
    state.searchHist = searchHist
  },

  // 正在播放
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },

  // 全屏
  [types.SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag
  },

  // 歌曲列表
  [types.SET_PLAYLIST] (state, list) {
    state.playlist = Object.assign([], list)
  },

  // 更改歌曲列表中其中一条的 URL
  [types.SET_PLAYLIST_URL] (state, { index, url }) {
    state.playlist[index].url = url
  },

  // 删除歌曲列表中其中一条
  [types.SET_PLAYLIST_DEL_ONE] (state, index) {
    state.playlist.splice(index, 1)
  },

  // 当前播放模式
  [types.SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },

  // 当前播放索引
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  }
}