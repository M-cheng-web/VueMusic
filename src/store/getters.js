// 当前歌手信息
export const singer = state => state.singer

// 正在播放
export const playing = state => state.playing

// 全屏
export const fullScreen = state => state.fullScreen

// 歌曲列表
export const playlist = state => state.playlist

// 播放列表
export const sequenceList = state => state.sequenceList

// 当前播放模式
export const mode = state => state.mode

// 当前播放索引
export const currentIndex = state => state.currentIndex

// 当前播放歌曲
export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}