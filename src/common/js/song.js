import { getLyric } from 'api/song'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'

export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    // 专辑名称
    this.album = album
    // 歌长
    this.duration = duration
    this.image = image
    this.url = url
  }

  /**
   * 获取歌词并存放到当前歌曲对象内
   */
  async getLyric () {
    let res = await getLyric(this.mid)
    if (res.retcode === ERR_OK) {
      this.lyric = Base64.decode(res.lyric)
      return this.lyric
    } else {
      new Promise.reject('no lyric')
    }
    // return new Promise((resolve, reject) => {
    //   getLyric(this.mid).then(res => {
    //     if (res.retcode === ERR_OK) {
    //       this.lyric = Base64.decode(res.lyric)
    //       console.log(this.lyric);
    //       resolve(this.lyric)
    //     } else {
    //       reject('no lyric')
    //     }
    //   })
    // })
  }
}

/**
 * 创建返回一个 song实例
 * @param {Object} musicData 歌曲对象
 * @param {String} songVkey 播放路径 
 */
export function createSong (musicData, songVkey) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${songVkey}`
  })
}

function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
