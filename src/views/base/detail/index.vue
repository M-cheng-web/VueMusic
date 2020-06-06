<template>
  <div class="detail">
    <music-list :type="type" :title="title" :song-list="detailList" :bgImage="bgImage"></music-list>
  </div>
</template>

<script>
import MusicList from 'components/music-list'

import { mapGetters } from 'vuex'

import { createSong } from 'common/js/song.js'
import { getSingerDetail, getPlaySongVkey } from 'api/singer'
import { getSongList } from 'api/recommend'
import { ERR_OK } from 'api/config'

export default {
  data () {
    return {
      detailList: [],
      listLength: 1
    }
  },
  computed: {
    ...mapGetters({
      singerData: 'singer',
      discData: 'disc'
    }),
    /**
     * 推荐歌单 disc / 歌手 singer
     * 判断从哪个页面跳转来的
     */
    type () {
      return this.$route.params.type
    },
    /**
     * id
     */
    dataId () {
      return this.type === 'disc' ? this.discData.dissid : this.singerData.id
    },
    /**
     * 歌手名 / 歌单名
     */
    title () {
      return this.type === 'disc' ? this.discData.dissname : this.singerData
    },
    /**
     * 背景图
     */
    bgImage () {
      return this.type === 'disc' ? this.discData.imgurl : this.singerData.address
    }
  },
  created () {
    this.type === 'disc'
      ? this._getDiscList(this.dataId)
      : this._getSingerDetail(this.dataId)
  },
  methods: {
    /**
     * 获取推荐歌单的 歌曲列表
     */
    async _getDiscList (id) {
      if (!id) {
        this.$router.push(`/${this.type}`)
      }
      let list = await getSongList(id)
      console.log('_getDiscList', list.cdlist[0].songlist);

      if (list.code === ERR_OK) {
        setTimeout(() => {
          this.detailList = list.cdlist[0].songlist
        }, 500);
      }
    },
    /**
     * 获取目标歌手的主题歌单
     */
    async _getSingerDetail (id) {
      if (!id) {
        this.$router.push(`/${this.type}`)
      }
      let list = await getSingerDetail(id)

      if (list.code === ERR_OK) {
        setTimeout(() => {
          this.detailList = this._normalizeSongs(list.data.list)
        }, 500);
      }
    },
    /**
     * 根据歌手信息获取歌单
     */
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        let { musicData } = item
        if (musicData.songid && musicData.albummid) {
          getPlaySongVkey(musicData.songmid).then(res => {
            if (res) {
              ret.push(createSong(musicData, res))
            }
          })
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang='scss' scoped>
.detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #000;
}
</style>