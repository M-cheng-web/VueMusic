import { playMode } from 'common/js/config'

export default {
  singer: {}, // 当前选中的歌手信息

  disc: {}, // 当前选中的推荐歌单信息

  rank: {}, // 当前选中的排行榜信息

  playing: false, // 是否正在播放

  fullScreen: false, // 是否全屏

  playlist: [], // 播放列表

  sequenceList: [], // 展示的歌曲列表

  mode: playMode.sequence, // 歌曲播放模式

  currentIndex: -1, // 当前播放索引

  cancelTokenArr: [], // axios请求列表
}