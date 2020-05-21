<template>
  <div class="song-list">
    <page-title @onIcon="onBack" :title="title" class="title" />
    <div class="img" :style="imgStyle" ref="img">
      <div ref="imgBtn">
        <svg-icon icon="player" :size="16" />
        <span class="ml-5">随机播放全部</span>
      </div>
    </div>
    <div class="list-bg" ref="listBg"></div>
    <div class="list" ref="songList">
      <scroll @getScrollHeight="getScrollHeight" :data="songList" :probeType="3" :isOverFlow="false">
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
import SongList from '../song-list'
import { prefixStyle } from 'common/js/dom'
import { mapMutations, mapActions } from 'vuex'
const IMAGE_HEIGHT = 40
const transform = prefixStyle('transform')

export default {
  props: {
    title: { type: String, default: '歌手' },

    bgImage: { type: String, default: null },

    songList: { type: Array, default: [] }
  },
  computed: {
    // 图片样式
    imgStyle () {
      return `background-image:url(${this.bgImage});`
    }
  },
  data () {
    return {
      scale: 1,
      scrollHeight: 0,
      bgImageHeight: 0,
      minTranslateY: 0
    }
  },
  watch: {
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

      // this.$refs.img.style.transform = `scale(${scale})`
      // this.$refs.img.style['webkitTransform'] = `scale(${scale})`
      this.$refs.img.style[transform] = `scale(${scale})`
    }
  },
  mounted () {
    this.bgImageHeight = this.$refs.img.clientHeight // 背景图的高度
    this.minTranslateY = -this.bgImageHeight + IMAGE_HEIGHT // 往上滑动的最高值
    this.$refs.songList.style.top = `${this.bgImageHeight}px` // 歌曲列表的 top设置
  },
  methods: {
    /**
     * 点击头部返回
     */
    onBack () {
      this.$router.push('/singer')
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
    },
    ...mapActions([
      'playAction'
    ])
  },
  components: {
    SongList
  }
}
</script>

<style lang='scss' scoped>
.song-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
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