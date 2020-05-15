<template>
  <div class="song-list">
    <div class="title">
      <svg-icon @click.native="onBack" icon="back" :size="24" class="ml-20" />
      <span>{{ title }}</span>
    </div>
    <div class="img" :style="imgStyle">
      <div>
        <svg-icon icon="player" :size="16" />
        <span class="ml-5">随机播放全部</span>
      </div>
    </div>
    <div class="list">
      <scroll :data="songList" :probeType="3" @getScrollHeight="getScrollHeight">
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

export default {
  props: {
    title: { type: String, default: '歌手' },

    bgImage: { type: String, default: null },

    songList: { type: Array, default: [] }
  },
  computed: {
    // 图片样式
    imgStyle () {
      const bgImage = `background: url(${this.bgImage}) rgba(0, 0, 0, .4) top center/cover no-repeat;`
      const paddingTop = `padding-top:70%;`
      const translate = `transform: translateY(${this.translateY})`
      const scale = `transform: scale(${this.scale});`
      return bgImage + paddingTop + translate + scale
    }
  },
  data () {
    return {
      scale: 1,
      translateY: 0,
      scrollHeight: 0
    }
  },
  watch: {
    scrollHeight (val) {

    }
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
    onSongList (item) {

    }
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
    @extend .fs-lg, .c-text;
    position: absolute;
    top: 0;
    z-index: 300;
    height: 40px;
    width: 100%;
    line-height: 40px;
    span {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .img {
    position: relative;
    width: 100%;
    background-blend-mode: multiply;
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
  .list {
    @extend .fs-md;
    position: fixed;
    top: 263px;
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