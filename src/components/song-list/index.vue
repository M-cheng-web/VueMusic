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
      <ul>
        <li @click="onSongList(item)" v-for="item in songList" class="list-li">
          <div class="c-text mb-10">{{ item.name }}</div>
          <div class="c-dialog-background fs-sm">{{ `${item.singer}·${item.album}` }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Scroll from '../scroll'

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
      const scale = `transform: scale(${this.scale})`
      return bgImage + paddingTop
    }
  },
  data () {
    return {
      scale: 1
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
     * 点击歌单事件
     */
    onSongList (item) {

    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang='scss' scoped>
.song-list {
  position: relative;
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
    @extend .px-30, .py-20, .fs-md;
    .list-li {
      @extend .d-flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      height: 64px;
    }
  }
}
</style>