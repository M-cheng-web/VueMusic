// 当前选中的歌手信息
export const singer = state => state.singer

// 当前选中的推荐歌单信息
export const disc = state => state.disc

// 当前选中的推荐歌单信息
export const rank = state => state.rank

// 搜索的历史记录
export const searchHist = state => state.searchHist

// 正在播放
export const playing = state => state.playing

// 全屏
export const fullScreen = state => state.fullScreen

// 歌曲列表
export const playlist = state => state.playlist

// 当前播放模式
export const mode = state => state.mode

// 当前播放索引
export const currentIndex = state => state.currentIndex

// 当前播放歌曲
export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}