<template>
  <div class="disc-detail">
    <music-list :title="title" :song-list="detailList" :bgImage="bgImage"></music-list>
  </div>
</template>

<script>
import MusicList from 'components/music-list'

import { mapGetters } from 'vuex'

import { createSong } from 'common/js/song.js'
import { getSingerDetail, getPlaySongVkey } from 'api/singer'
import { ERR_OK } from 'api/config'

export default {
  data () {
    return {
      detailList: [],
      isHttpOver: false,
      listLength: 1
    }
  },
  computed: {
    ...mapGetters({ dissData: 'diss' }),
    title () {
      return this.dissData.name
    },
    bgImage () {
      return this.dissData.address
    }
  },
  created () {
    this._getSingerDetail(this.dissData.id)
  },
  methods: {
    /**
     * 获取目标歌手的主题歌单
     */
    async _getSingerDetail (id) {
      if (!this.dissData.id) {
        this.$router.push('/singer')
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
.diss-detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
}
</style>