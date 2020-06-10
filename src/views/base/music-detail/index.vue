<template>
  <div class="music-detail">
    <!-- 头部 -->
    <page-title @onIcon="onBack" :title="title" class="title" />

    <!-- 随机播放模块 -->
    <div class="img" :style="typeEle.imgStyle" ref="img">
      <div ref="imgBtn">
        <svg-icon icon="player" :size="16" />
        <span class="ml-5">随机播放全部</span>
      </div>
    </div>
    <div class="list-bg" ref="listBg"></div>

    <!-- 歌曲列表 -->
    <div class="list" ref="songList">
      <scroll @getScrollHeight="getScrollHeight" isStopPop :data="songList" :probeType="3" :isOverFlow="false">
        <song-list @onSongList="onSongList" :songList="songList" />
      </scroll>

      <!-- 等待界面 -->
      <div class="loading" v-show="!songList.length">
        <loading />
      </div>
    </div>
  </div>
</template>

<script>
import SongList from 'components/song-list'
import { prefixStyle } from 'common/js/dom'
import { mapGetters, mapActions } from 'vuex'
import { createSong } from 'common/js/song.js'
import { getSingerDetail, getPlaySongVkey } from 'api/singer'
import { getSongList } from 'api/recommend'
import { getMusicList } from 'api/rank'
import { ERR_OK } from 'api/config'

const IMAGE_HEIGHT = 40
const transform = prefixStyle('transform')

export default {
  data () {
    return {
      scale: 1, // 背景图片放大倍数
      songList: [], // 请求到的歌曲列表
      scrollHeight: 0, // 列表滑动高度
      bgImageHeight: 0, // 背景图的高度
      minTranslateY: 0, // 最多能往上滑动多少距离
      typeEle: {
        returnPlace: '', // 返回地址
        dataId: '', // ID
        title: '', // 头部名称
        imgStyle: '', // 背景图
      }
    }
  },
  computed: {
    ...mapGetters({ singerData: 'singer', discData: 'disc', rankData: 'rank' }),
    /**
     * 判断从哪个页面跳转来的
     * 推荐歌单 disc / 歌手 singer / 排行 rank
     */
    type () {
      return this.$route.params.type
    }
  },
  watch: {
    type: {
      handler (val) {
        switch (val) {
          case 'singer':
            this.typeEle.returnPlace = 'singer'
            this.typeEle.dataId = this.singerData.id
            this.typeEle.title = this.singerData.name || '歌手'
            this.typeEle.imgStyle = `background-image:url(${this.singerData.address});`
            break;
          case 'disc':
            this.typeEle.returnPlace = 'recommend'
            this.typeEle.dataId = this.discData.dissid
            this.typeEle.title = this.discData.dissname || '歌手'
            this.typeEle.imgStyle = `background-image:url(${this.discData.imgurl});`
            break;
          case 'rank':
            console.log('this.rankData', this.rankData);
            this.typeEle.returnPlace = 'rank'
            this.typeEle.dataId = this.rankData.id
            this.typeEle.title = this.rankData.topTitle || '歌手'
            this.typeEle.imgStyle = `background-image:url(${this.rankData.picUrl});`
            break;
        }
      },
      immediate: true
    },
    // 歌曲列表滑动高度
    scrollHeight (val) {
      let zIndex = 0
      let scale = 1
      let changeHeight = Math.max(this.minTranslateY, val)
      const imgScale = Math.abs(val / this.bgImageHeight)

      // this.$refs.listBg.style.transform = `translate3d(0,${changeHeight}px,0)`
      // this.$refs.listBg.style['webkitTransform'] = `translate3d(0, ${changeHeight}px, 0)`
      // 写在 scss中的样式,vue-loader会内会使用css的一个插件自动适配 加前缀
      // 在 js中就要我们自己适配
      this.$refs.listBg.style[transform] = `translate3d(0, ${changeHeight}px, 0)`

      if (val > 0) {
        zIndex = 10
        scale = 1 + imgScale
      }

      if (val < this.minTranslateY) {
        // 滚动到顶部以上触发
        zIndex = 10
        this.$refs.img.style.paddingTop = 0
        this.$refs.img.style.height = `${IMAGE_HEIGHT}px`
        this.$refs.imgBtn.style.display = 'none'
      } else {
        this.$refs.img.style.paddingTop = '70%'
        this.$refs.img.style.height = 0
        this.$refs.imgBtn.style.display = ''
      }
      this.$refs.img.style.zIndex = zIndex

      this.$refs.img.style[transform] = `scale(${scale})`
    }
  },
  created () {
    if (!this.typeEle.dataId) {
      this.$router.push(`/${this.typeEle.returnPlace}`)
    }
    switch (this.type) {
      case 'disc':
        this._getDiscList(this.typeEle.dataId)
        break;
      case 'singer':
        this._getSingerDetail(this.typeEle.dataId)
        break;
      case 'rank':
        this._getRankDetail(this.typeEle.dataId)
        break;
    }
  },
  mounted () {
    this.bgImageHeight = this.$refs.img.clientHeight // 背景图的高度
    this.minTranslateY = -this.bgImageHeight + IMAGE_HEIGHT // 往上滑动的最高值
    this.$refs.songList.style.top = `${this.bgImageHeight}px` // 歌曲列表的 top设置
  },
  methods: {
    ...mapActions(['playAction']),
    /**
     * 获取推荐歌单的 歌曲列表(只有歌曲ID,没有歌曲信息)
     */
    async _getDiscList (id) {
      let list = await getSongList(id)
      if (list.code === ERR_OK) {
        setTimeout(() => {
          this.songList = this._normalizeSongs(list.cdlist[0].songlist)
        }, 500);
      }
    },
    /**
     * 获取排行歌单的 歌曲列表(只有歌曲ID,没有歌曲信息)
     */
    async _getRankDetail (id) {
      let list = await getMusicList(id)
      if (list.code === ERR_OK) {
        setTimeout(() => {
          this.songList = this._normalizeSongs(list.songlist)
        }, 500);
      }
    },
    /**
     * 获取歌手的 歌曲列表(只有歌曲ID,没有歌曲信息)
     */
    async _getSingerDetail (id) {
      let list = await getSingerDetail(id)
      if (list.code === ERR_OK) {
        setTimeout(() => {
          this.songList = this._normalizeSongs(list.data.list)
        }, 500);
      }
    },
    /**
     * 根据ID 获取歌曲信息
     */
    _normalizeSongs (list) {
      let ret = []
      list.forEach(item => {
        let data = item
        switch (this.type) {
          case 'singer':
            data = item.musicData
            break;
          case 'disc':
            break;
          case 'rank':
            data = item.data
            break;
        }

        if (data.songid && data.albummid) {
          getPlaySongVkey(data.songmid).then(res => {
            if (res) {
              ret.push(createSong(data, res))
            }
          })
        }
      })
      return ret
    },
    /**
     * 点击头部返回
     */
    onBack () {
      console.log('this.returnPlace', this.returnPlace);
      this.$router.push(`/${this.returnPlace}`)
    },
    /**
     * 滑动歌单返回高度
     */
    getScrollHeight (val) {
      this.scrollHeight = val
    },
    /**
     * 点击歌单事件
     */
    onSongList (item, index) {
      this.playAction({
        list: this.songList,
        index
      })
    }
  },
  components: {
    SongList
  }
}
</script>

<style lang='scss' scoped>
.music-detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #000;
  .title {
    position: absolute;
    top: 0;
    z-index: 300;
    width: 100%;
  }
  .img {
    position: relative;
    width: 100%;
    padding-top: 70%;
    background-size: cover;
    transform-origin: top; // 设置放大的基点
    & > div:first-child {
      @include size(135, 32);
      @extend .bd-theme, .c-theme, .fs-xs, .flex-center;
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 32px;
    }
  }
  .list-bg {
    position: relative;
    height: 100%;
    background-color: #000;
  }
  .list {
    @extend .fs-md;
    position: fixed;
    bottom: 0;
    width: 100%;
    .loading {
      position: absolute;
      top: 80px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
}
</style>