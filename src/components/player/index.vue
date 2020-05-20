<template>
  <div class="player" ref="player">
    <!-- 全屏版播放页面 -->
    <div class="full-screen">
      <!-- 蒙版层 -->
      <div v-show="fullScreen" class="bg-mask"></div>
      <div v-show="fullScreen" class="bg-mask-s"></div>

      <!-- 标题头 -->
      <transition name="top">
        <page-title v-show="fullScreen" @onIcon="onIconDown(false)" icon="down" title="疫情过后(DJ何鹏版)" small-title="冷漠" />
      </transition>

      <!-- 中心大图 -->
      <transition name="img" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="leaveEnter">
        <div v-show="fullScreen" class="center-img" ref="bigImg">
          <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000000QgFcm0v8WaF.jpg?max_age=2592000" />
        </div>
      </transition>

      <transition name="bot">
        <div v-show="fullScreen">
          <!-- 歌曲信息 -->
          <div class="song-info">
            <div class="name">其实-薛之谦(Joker)</div>
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
            <svg-icon @click.native="onIconLast" icon="lastPlay" :size="30" />
            <svg-icon @click.native="onIconPlay" :icon="paly" :size="50" />
            <svg-icon @click.native="onIconNext" icon="nextPlay" :size="30" />
            <svg-icon @click.native="onIconHeart" :icon="playHeard" :size="30" />
          </div>
        </div>
      </transition>
    </div>

    <!-- 缩小版播放页面(点击下拉后显示) -->
    <div @click="onIconDown(true)" v-show="playlist && !fullScreen">
      <div class="small-player" :style="smallPlayerStyle">
        <div class="songs">
          <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000000QgFcm0v8WaF.jpg?max_age=2592000" />
          <div>
            <div>有一点动心</div>
            <div class="c-text-d">张信哲/刘嘉玲</div>
          </div>
        </div>
        <div>
          <svg-icon class="mr-15" @click.native="onIconPlay" :icon="paly" :size="40" />
          <svg-icon @click.native="onIconMusicList" icon="music-list" :size="40" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { smallPlayerHeight } from 'common/js/config.js'
import animations from 'create-keyframe-animation'
import { prefixStyle } from 'common/js/dom.js'

const transform = prefixStyle('transform')

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
    smallPlayerStyle () {
      const height = `height: ${smallPlayerHeight}px`
      return height
    },
    ...mapState(['fullScreen', 'playlist'])
  },
  methods: {
    enter (el, done) {
      // done是必须要有的,调用 done就是进入下一个周期

      const { x, y, scale } = this._getPosAndScale()

      let animation = {
        0: {
          transform: `translate3d(${-x}px, ${-y}px, 0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0, 0, 0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0, 0, 0) scale(1)`
        },
      }

      // 创建动画
      animations.registerAnimation({
        name: 'move',
        animation, // 动画更改的实际数组
        presets: {
          duration: 1000, // 动画时间
          easing: 'linear' // 线性动画
          // delay: 500 // 延迟
        }
      })

      // 开启动画
      animations.runAnimation(this.$refs.bigImg, 'move', done)
    },
    afterEnter () {
      // 进入完毕后清除元素
      animations.unregisterAnimation('move')
      this.$refs.bigImg.style.animation = ''
    },
    leave (el, done) {
      // const { x, y, scale } = this._getPosAndScale()
      // this.$refs.bigImg.style.transition = 'all 0.4s'
      // this.$refs.bigImg.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
    },
    afterLeave () {

    },
    /**
     * 获取偏移量 x, y, scale
     */
    _getPosAndScale () {
      const x = (window.innerWidth / 2) - ((46 / 2) + 10)
      const y = ((46 / 2) + (smallPlayerHeight - 46) / 2) - (window.innerHeight - 54 - 20 - 10 - (300 / 2))
      const scale = 46 / 300

      console.log(scale);
      return { x, y, scale }
    },
    /**
     * 点击下拉
     */
    onIconDown (isTrue) {
      // isTrue
      //   ? this.$refs.player.style.opacity = 1
      //   : this.$refs.player.style.opacity = 0
      this.showSmallPlay(isTrue)
    },
    /**
     * 点击 播放 / 暂停
     */
    onIconPlay () {
      this.paly = this.paly === 'stopPlay' ? 'player' : 'stopPlay'
    },
    /**
     * 点击 播放列表
     */
    onIconMusicList () {

    },
    /**
     * 点击 上一首
     */
    onIconLast () {

    },
    /**
     * 点击 下一首
     */
    onIconNext () {

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
    },
    ...mapActions(['showSmallPlay'])
  }
}
</script>

<style lang="scss" scoped>
.player {
  .full-screen {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    width: 100%;
    .bg-mask,
    .bg-mask-s {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .bg-mask {
      z-index: -2;
      background-color: rgba(83, 92, 104, 1);
    }
    .bg-mask-s {
      z-index: -1;
      opacity: 0.6;
      background: url("https://y.gtimg.cn/music/photo_new/T002R300x300M000000QgFcm0v8WaF.jpg?max_age=2592000") center
        center no-repeat;
      background-size: cover;
      filter: blur(20px);
    }
    .center-img {
      img {
        display: block;
        animation: rotate 15s linear 0.2s infinite;
        margin: 0 auto;
        margin-top: 20px;
        width: 300px;
        border: 10px solid #8395a7;
        border-radius: 50%;
      }
    }
    .song-info {
      @extend .mb-20;
      .name {
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
  }
  .small-player {
    @extend .flex-between, .pl-10, .pr-5, .bgc-highlight-background;
    position: fixed;
    bottom: 0;
    z-index: 1000;
    width: 100%;
    .songs {
      @extend .flex-center;
      img {
        @extend .mr-10;
        display: block;
        animation: rotate 10s linear 0.2s infinite;
        width: 46px;
        border-radius: 50%;
      }
      div {
        @extend .d-flex, .fs-sm;
        height: 46px;
        flex-direction: column;
        justify-content: space-around;
      }
    }
  }

  .top-enter-active,
  .top-leave-active,
  .bot-enter-active,
  .bot-leave-active {
    transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
  }

  .top-enter,
  .top-leave-to {
    opacity: 0;
    transform: translate3d(0, -100px, 0);
  }
  .bot-enter,
  .bot-leave-to {
    opacity: 0;
    transform: translate3d(0, 100px, 0);
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