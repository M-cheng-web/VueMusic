<template>
  <div class="player">
    <!-- 蒙版层 -->
    <div class="bg-mask"></div>

    <!-- 标题头 -->
    <page-title icon="down" title="疫情过后(DJ何鹏版)" small-title="冷漠" />

    <!-- 中心大图 & 歌曲信息 -->
    <div class="center-img">
      <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000000QgFcm0v8WaF.jpg?max_age=2592000" />
      <div class="song-info">其实-薛之谦(Joker)</div>
      <div class="spot">
        <div :class="{'curreny-action': index === currenyIndex}" v-for="(item, index) in temporaryArray"></div>
      </div>
    </div>

    <!-- 时间戳 -->
    <div class="play-time">
      <div>0.00</div>
      <div class="strip"></div>
      <div>4.02</div>
    </div>

    <!-- 歌曲操作 -->
    <div class="songs-action">
      <svg-icon @click.native="onIconPlayMode" :icon="playMode" :size="30" />
      <svg-icon icon="lastPlay" :size="30" />
      <svg-icon @click.native="onIconPlay" :icon="paly" :size="50" />
      <svg-icon icon="nextPlay" :size="30" />
      <svg-icon @click.native="onIconHeart" :icon="playHeard" :size="30" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      currenyIndex: 0,
      temporaryArray: new Array(2),
      paly: 'stopPlay',
      playMode: 'sequence',
      playHeard: 'heart'
    }
  },
  computed: {
    ...mapState(['fullScreen'])
  },
  methods: {
    /**
     * 点击 播放 / 暂停
     */
    onIconPlay () {
      this.paly = this.paly === 'stopPlay' ? 'player' : 'stopPlay'
    },
    /**
     * 点击 播放模式
     */
    onIconPlayMode () {
      switch (this.playMode) {
        case 'sequence':
          this.playMode = 'loopPlay'
          break;
        case 'loopPlay':
          this.playMode = 'randomPlay'
          break;
        case 'randomPlay':
          this.playMode = 'sequence'
          break;
      }
    },
    /**
     * 点击 爱心
     */
    onIconHeart () {
      this.playHeard = this.playHeard === 'heart' ? 'heart-action' : 'heart'
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
  background-color: rgba(83, 92, 104, 1);
  .bg-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    background: url("https://y.gtimg.cn/music/photo_new/T002R300x300M000000QgFcm0v8WaF.jpg?max_age=2592000") center
      center no-repeat;
    background-size: cover;
    filter: blur(20px);
  }
  .center-img {
    @extend .mb-20;
    img {
      display: block;
      animation: rotate 15s linear 0.2s infinite;
      margin: 0 auto;
      margin-top: 20px;
      width: 300px;
      border: 10px solid #8395a7;
      border-radius: 50%;
    }
    .song-info {
      @extend .c-text-d, .mt-40, .mb-70;
      width: 100%;
      text-align: center;
    }
    .spot {
      @extend .jc-center;
      width: 100%;
      div {
        @include size(8, 8);
        @extend .bgc-text-l;
        border-radius: 50%;
      }
      & > div:not(:last-child) {
        margin-right: 10px;
      }
      .curreny-action {
        @extend .bgc-text;
        width: 20px;
        border-radius: 8px;
      }
    }
  }
  .play-time {
    @extend .fs-xs, .c-text, .flex-center;
    margin: 0 auto;
    .strip {
      @include size(240, 4);
      @extend .mx-10, .bgc-background;
    }
  }
  .songs-action {
    @extend .flex-around, .mt-20;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>