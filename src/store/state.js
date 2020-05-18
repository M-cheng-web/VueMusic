import { playMode } from 'common/js/config'

export default {
  singer: {}, // 当前歌手信息

  playing: false, // 是否正在播放

  fullScreen: false, // 全屏

  playlist: [], // 播放列表

  sequenceList: [], // 展示的歌曲列表

  mode: playMode.sequence, // 歌曲播放模式

  currentIndex: -1, // 当前播放索引

  cancelTokenArr: [], // axios请求列表
}