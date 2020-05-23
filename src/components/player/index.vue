<template>
  <div class="player" v-show="playlist.length > 0">
    <!-- 全屏版播放页面 -->
    <div class="full-screen" ref="fullScreen">
      <!-- 蒙版层 -->
      <div v-show="fullScreen" class="bg-mask" />
      <div v-show="fullScreen" class="bg-mask-s" :style="bgMasksStyle" />

      <!-- 标题头 -->
      <transition name="top">
        <page-title
          v-show="fullScreen"
          @onIcon="onIconDown(false)"
          icon="down"
          :title="currentSong.name"
          :small-title="currentSong.singer"
        />
      </transition>

      <!-- 中心大图 -->
      <transition @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
        <div ref="bigImgOuter" v-show="fullScreen" class="center-img">
          <img ref="bigImg" :src="currentSong.image" />
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
            <div>{{_changeTimer(audioCurrentTime) }}</div>
            <slider
              @sliderMove="sliderMove"
              @sliderEnd="sliderClickAndEnd"
              @sliderClick="sliderClickAndEnd"
              :changeNum="audioCurrentTime"
              :endNum="currentSong.duration"
              class="mx-10"
            />
            <div>{{_changeTimer(currentSong.duration)}}</div>
          </div>

          <!-- 歌曲操作 -->
          <div class="songs-action">
            <svg-icon @click.native="onIconMode" :icon="iconMode" :size="30" />
            <svg-icon @click.native="onIconLast" icon="lastPlay" :size="30" />
            <svg-icon @click.native="onIconPlay" :icon="iconPlay" :size="50" />
            <svg-icon @click.native="onIconNext" icon="nextPlay" :size="30" />
            <svg-icon @click.native="onIconHeart" :icon="iconHeard" :size="30" />
          </div>
        </div>
      </transition>
    </div>

    <!-- 缩小版播放页面(点击下拉后显示) -->
    <div @click="onIconDown(true)" v-show="playlist && !fullScreen">
      <div class="small-player" :style="smallPlayerStyle">
        <div class="songs">
          <img ref="smallImg" :src="currentSong.image" />
          <div>
            <div>{{ currentSong.name }}</div>
            <div class="c-text-d">{{ currentSong.singer }}</div>
          </div>
        </div>
        <div>
          <svg-icon class="mr-15" @click.stop.native="onIconPlay" :icon="iconPlay" :size="40" />
          <svg-icon @click.stop.native="onIconMusicList" icon="music-list" :size="40" />
        </div>
      </div>
    </div>

    <!-- 音频 -->
    <audio ref="audio" @timeupdate="songTimeUpdate" :src="currentSong.url"></audio>
  </div>
</template>

<script>
import Slider from 'components/slider'
import { mapGetters, mapActions } from 'vuex'
import { playMode, smallPlayerHeight } from 'common/js/config.js'
import { getLyric } from 'api/song.js'
import animations from 'create-keyframe-animation'
import { prefixStyle } from 'common/js/dom.js'
import { changeTimer } from 'common/js/format.js'

const transform = prefixStyle('transform')
const animationPlayState = prefixStyle('animationPlayState')

export default {
  data () {
    return {
      songChangeTime: 0,
      currenyIndex: 0,
      temporaryArray: new Array(2),
      iconPlay: 'player',
      iconMode: 'sequence',
      iconHeard: 'heart',
      isShowSmallSongsList: false,
      audioCurrentTime: 0,
      isGetSongTimeUpdate: true
    }
  },
  computed: {
    /**
     * 缩小版播放器的高度样式
     */
    smallPlayerStyle () {
      const height = `height: ${smallPlayerHeight}px`
      return height
    },
    /**
     * 蒙版层的背景图样式
     */
    bgMasksStyle () {
      const bgImg = `background-image: url("${this.currentSong.image}");`
      return bgImg
    },
    ...mapGetters([
      'fullScreen',
      'playlist',
      'playing',
      'mode',
      'currentIndex',
      'currentSong'
    ])
  },
  created () {
    getLyric(this.currentSong.id)
  },
  watch: {
    /**
     * 选择展示 全屏播放器 / 缩小版播放器
     */
    fullScreen: {
      handler (val) {
        this.$nextTick(() => {
          val
            ? this.$refs.fullScreen.style.bottom = 0
            : this.$refs.fullScreen.style.bottom = `${window.innerHeight}px`
        })
      },
      immediate: true
    },
    /**
     * 执行 播放 / 暂停播放
     */
    playing: {
      handler (val) {
        this.$nextTick(() => {
          if (val) {
            this.$refs.audio.play() // 音乐播放
            this.iconPlay = 'player' // 播放图标
          } else {
            this.$refs.audio.pause() // 音乐暂停
            this.iconPlay = 'stopPlay' // 暂停图标
          }
        })
      },
      immediate: true
    },
    /**
     * 执行 上一首 / 下一首
     */
    currentIndex () {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    /**
     * 执行 自动下一首
     */
    audioCurrentTime (val) {
      let time = this._changeTimer(this.currentSong.duration)
      if (this._changeTimer(val) === time) {
        this.autoPlayNext()
      }
    }
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
          duration: 400, // 动画时间
          easing: 'linear' // 线性动画
          // delay: 500 // 延迟
        }
      })

      // 开启动画
      animations.runAnimation(this.$refs.bigImgOuter, 'move', done)
    },
    afterEnter () {
      // 进入完毕后清除元素
      animations.unregisterAnimation('move')
      this.$refs.bigImgOuter.style.animation = ''
    },
    leave (el, done) {
      const { x, y, scale } = this._getPosAndScale()
      this.$refs.bigImgOuter.style.transition = 'all 0.4s'
      this.$refs.bigImgOuter.style[transform] = `translate3d(${-x}px, ${-y}px, 0) scale(${scale})`
      this.$refs.bigImgOuter.addEventListener('transitionend', done)
    },
    afterLeave () {
      this.$refs.bigImgOuter.style.transition = ''
      this.$refs.bigImgOuter.style[transform] = ''
    },
    /**
     * 点击 下拉 / 缩小版播放器
     */
    onIconDown (isTrue) {
      this.showSmallPlay(isTrue)
    },
    /**
     * 点击 播放 / 暂停
     */
    onIconPlay () {
      this.iconPlay === 'stopPlay'
        ? this._songPlay()
        : this._songStopPlay()
    },
    /**
     * 点击 播放列表
     */
    onIconMusicList () {
      this.isShowSmallSongsList = true
    },
    /**
     * 点击 上一首
     */
    onIconLast () {
      let index = this._getIndexforMode('last')
      this.jumpSong(index)
      this._songPlay()
    },
    /**
     * 点击 下一首
     */
    onIconNext () {
      let index = this._getIndexforMode('next')
      this.jumpSong(index)
      this._songPlay()
    },
    /**
     * 自动播放 下一首
     */
    autoPlayNext () {
      if (this.mode === playMode.loop) {
        this.$refs.audio.currentTime = 0
      } else {
        let index = this._getIndexforMode('next')
        this.jumpSong(index)
      }
      this._songPlay()
    },
    /**
     * 点击 播放模式
     * 更换播放模式 顺序 / 单曲 / 随机
     */
    onIconMode () {
      switch (this.iconMode) {
        case 'sequence':
          this.iconMode = 'loopPlay'
          this.setSongMode(playMode.loop)
          break;
        case 'loopPlay':
          this.iconMode = 'randomPlay'
          this.setSongMode(playMode.random)
          break;
        case 'randomPlay':
          this.iconMode = 'sequence'
          this.setSongMode(playMode.sequence)
          break;
      }
    },
    /**
     * 点击 爱心
     */
    onIconHeart () {
      this.iconHeard = this.iconHeard === 'heart' ? 'heart-action' : 'heart'
    },
    /**
     * 音频位置发生位置时触发
     */
    songTimeUpdate (e) {
      if (this.isGetSongTimeUpdate) { // 滑块滑动的时候不获取音频位置
        this.audioCurrentTime = e.target.currentTime
      }
    },
    /**
     * 滑块点击 & 滑块滑动结束
     */
    sliderClickAndEnd (time) {
      this.$refs.audio.currentTime = time
      if (!this.isGetSongTimeUpdate) { // 设置获取音频时间
        this.isGetSongTimeUpdate = true
      }
      if (!this.playing) { // 强制播放
        this._songPlay()
      }
    },
    /**
     * 滑块滑动(手动滑动)
     */
    sliderMove (time) {
      if (this.isGetSongTimeUpdate) { // 设置不获取音频时间
        this.isGetSongTimeUpdate = false
      }
      this.audioCurrentTime = time
    },
    /**
     * 获取偏移量 x, y, scale
     */
    _getPosAndScale () {
      const x = (window.innerWidth / 2) - ((46 / 2) + 10)
      const y = ((46 / 2) + (smallPlayerHeight - 46) / 2) - (window.innerHeight - 54 - 20 - 10 - (300 / 2))
      const scale = 46 / 300

      return { x, y, scale }
    },
    /**
     * 播放事件
     */
    _songPlay () {
      if (!this.playing) {
        this.stopOrRunSong(true) // 更改 playing状态
        this.$refs.bigImg.style[animationPlayState] = 'running' // 动画继续播放
        this.$refs.smallImg.style[animationPlayState] = 'running' // 动画继续播放
      }
    },
    /**
     * 暂停事件
     */
    _songStopPlay () {
      if (this.playing) {
        this.stopOrRunSong(false)// 更改 playing状态
        this.$refs.bigImg.style[animationPlayState] = 'paused' // 动画暂停
        this.$refs.smallImg.style[animationPlayState] = 'paused' // 动画暂停
      }
    },
    /**
     * 数字转为事件格式
     */
    _changeTimer (num) {
      return changeTimer(num)
    },
    /**
     * 根据当前播放模式返回下标
     * type: 上一个(last) / 下一个(next)
     */
    _getIndexforMode (type) {
      let songsLength = this.playlist.length
      let index = 0

      if (this.mode === playMode.sequence || this.mode === playMode.loop) { // 顺序播放 & 单曲循环
        switch (type) {
          case 'last': { // 上一首
            index = this.currentIndex - 1
            if (index < 0) {
              index = songsLength - 1
            }
            break
          }
          case 'next': { // 下一首
            index = this.currentIndex + 1
            if (index === songsLength) {
              index = 0
            }
            break
          }
        }
      } else if (this.mode === playMode.random) { // 随机播放
        index = parseInt(Math.random() * (songsLength - 1))
        if (index === this.currentIndex) {
          index = this.currentIndex + 1
        }
      }
      return index
    },
    ...mapActions(['showSmallPlay', 'jumpSong', 'stopOrRunSong', 'setSongMode'])
  },
  components: {
    Slider
  }
}
</script>

<style lang="scss" scoped>
.player {
  .full-screen {
    position: fixed;
    top: 0;
    // bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    .bg-mask,
    .bg-mask-s {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
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
      background-repeat: no-repeat;
      background-size: 100% 100%;
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
    }
    .songs-action {
      @extend .flex-around, .mt-20;
    }
  }

  .small-player {
    @extend .flex-between, .pl-10, .pr-5, .bgc-highlight-background;
    position: fixed;
    bottom: 0;
    z-index: 10;
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