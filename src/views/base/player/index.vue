<template>
  <div class="player" v-show="playlist.length > 0">
    <!-- 全屏版播放页面 -->
    <div class="full-screen" ref="fullScreen">
      <!-- 蒙版层 -->
      <div v-show="fullScreen" class="bg-mask" />
      <div v-show="fullScreen" class="bg-mask-s" :style="bgMasksStyle" />

      <!-- 向上动画 -->
      <transition name="top">
        <!-- 标题头 -->
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
        <div
          ref="bigImgOuter"
          v-show="fullScreen"
          @touchstart="imgTouchStart"
          @touchmove="imgTouchMove"
          @touchend="imgTouchEnd"
          class="center-img"
        >
          <img ref="bigImg" :src="currentSong.image" />
        </div>
      </transition>

      <!-- 全部歌词 -->
      <transition name="bot">
        <div
          @touchstart="lyricTouchStart"
          @touchmove="lyricTouchMove"
          @touchend="lyricTouchEnd"
          class="lyric-list"
          :style="lyricStyle"
          v-show="fullScreen"
        >
          <lyric ref="lyric" :list="currentLyricLineArr" :listNowIndex="lyric.index" />
        </div>
      </transition>

      <!-- 向下动画 -->
      <transition name="bot">
        <div v-show="fullScreen">
          <!-- 当前歌词展示 -->
          <div ref="lineLyric" class="song-info">
            <div class="name">{{ lyric.text }}</div>
          </div>

          <!-- 两个小点 -->
          <div class="spot">
            <div :class="{'curreny-action': index === currenyIndex}" v-for="(item, index) in temporaryArray"></div>
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
          <div class="text">
            <div class="ellipsis">{{ currentSong.name }}</div>
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
import Lyric from './components/lyric'

import animations from 'create-keyframe-animation'
import lyricParser from 'lyric-parser'

import { mapGetters, mapActions } from 'vuex'
import { playMode, smallPlayerHeight } from 'common/js/config.js'
import { prefixStyle } from 'common/js/dom.js'
import { changeTimer } from 'common/js/format.js'

const transform = prefixStyle('transform')
const animationPlayState = prefixStyle('animationPlayState')

export default {
  data () {
    return {
      iconPlay: 'player',
      iconMode: 'sequence',
      iconHeard: 'heart',
      currenyIndex: 0, // 小点当前下标
      temporaryArray: new Array(2), // 遍历小点
      isShowSmallSongsList: false, // 是否显示小型播放器
      audioCurrentTime: 0, // 当前音频播放时间
      isGetSongTimeUpdate: true, // 是否获取音频位置
      lyric: {
        currentLyric: Object.create({}), // Lyric插件对象
        index: 0, // 当前歌词下标
        text: undefined // 当前歌词
      },
      touch: {
        startX: 0,
        startY: 0,
        move: 0
      }
    }
  },
  computed: {
    ...mapGetters([
      'fullScreen',
      'playlist',
      'playing',
      'mode',
      'currentIndex',
      'currentSong'
    ]),
    /**
     * 歌词数组
     */
    currentLyricLineArr () {
      return this.lyric.currentLyric.lines ? this.lyric.currentLyric.lines : []
    },
    /**
     * 歌词样式
     */
    lyricStyle () {
      const transition = 'transition: all 0.5s;'
      const transform = `transform: translate3d(${window.innerWidth - this.touch.move}px, 0, 0);`
      return transition + transform
    },
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
    }
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
     * 监听播放状态
     * 执行 播放 / 暂停
     */
    playing: {
      handler (val) {
        this.$nextTick(() => {
          if (val) {
            this.$refs.audio.play() // 音乐播放
            this.iconPlay = 'player' // 播放图标
            this.$refs.bigImg.style[animationPlayState] = 'running' // 动画继续播放
            this.$refs.smallImg.style[animationPlayState] = 'running' // 动画继续播放
          } else {
            this.$refs.audio.pause() // 音乐暂停
            this.iconPlay = 'stopPlay' // 暂停图标
            this.$refs.bigImg.style[animationPlayState] = 'paused' // 动画暂停
            this.$refs.smallImg.style[animationPlayState] = 'paused' // 动画暂停
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
      let time = this._changeTimer(this.currentSong.duration) // 歌曲总时长
      if (this._changeTimer(val) === time) {
        this.autoPlayNext() // 播放下一首
        if (this.iconMode === 'loopPlay') { // 如果是单曲循环,重新播放歌词
          this.lyric.currentLyric.play()
        }
      }
    },
    /**
     * 执行 请求歌词
     */
    currentSong: {
      async handler (newVal, oldVal) {
        console.log('触发了');
        if (newVal && newVal.mid && newVal.mid !== oldVal.mid) {
          this.cleanCurrentLyric()
          this.getLyricData(newVal)
        }
      },
      depp: true
    }
  },
  methods: {
    ...mapActions([
      'showSmallPlay',
      'jumpSong',
      'stopOrRunSong',
      'setSongMode'
    ]),
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
     * 图片触摸开始
     */
    imgTouchStart (e) {
      this.touch.startX = e.touches[0].pageX
      this.$refs.bigImgOuter.style.transition = 'all 0.5s'
      this.$refs.lineLyric.style.transition = 'all 0.5s'
    },
    /**
     * 图片移动过程
     */
    imgTouchMove (e) {
      let move = e.touches[0].pageX - this.touch.startX
      this.touch.move = -move
      let opacity = (window.innerWidth - this.touch.move) / window.innerWidth
      this.setImgAndLyricOpacity(opacity)
    },
    /**
     * 图片移动结束
     */
    imgTouchEnd (e) {
      let width = window.innerWidth * 0.3 // 滑动距离超过 30% 就自动划过来
      if (this.touch.move > width) {
        this.touch.move = window.innerWidth
        this.setImgAndLyricOpacity(0)
        this.currenyIndex = 1
      } else {
        this.touch.move = 0
        this.setImgAndLyricOpacity(1)
        this.currenyIndex = 0
      }
    },
    /**
     * 歌词触摸开始
     */
    lyricTouchStart (e) {
      this.touch.startX = e.touches[0].pageX
      this.touch.startY = e.touches[0].pageY
      this.setImgAndLyricOpacity(0)
    },
    /**
     * 歌词移动过程
     */
    lyricTouchMove (e) {
      let height = e.touches[0].pageY - this.touch.startY
      let width = e.touches[0].pageX - this.touch.startX

      if (Math.abs(height) > Math.abs(width)) { // 判断当前 上下 / 左右 滑动
        return
      }

      this.touch.move = window.innerWidth - width
      let opacity = (window.innerWidth - this.touch.move) / window.innerWidth
      this.setImgAndLyricOpacity(opacity)
    },
    /**
     * 歌词移动结束
     */
    lyricTouchEnd () {
      let width = window.innerWidth * 0.3 // 滑动距离超过 30% 就自动划动
      if (this.touch.move > (window.innerWidth - width)) {
        this.touch.move = window.innerWidth
        this.setImgAndLyricOpacity(0)
        this.currenyIndex = 1
      } else {
        this.touch.move = 0
        this.setImgAndLyricOpacity(1)
        this.currenyIndex = 0
      }
    },

    /**
     * 歌词自动滚动的回调
     */
    lyricCallBack ({ lineNum, txt }) {
      this.lyric.index = lineNum
      this.lyric.text = txt
    },
    /**
     * 设置中心大图和当前歌词的 透明度
     */
    setImgAndLyricOpacity (num) {
      this.$refs.bigImgOuter.style.opacity = num
      this.$refs.lineLyric.style.opacity = num
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
      if (this.iconPlay === 'stopPlay') {
        this._songPlay()
      } else {
        this._songStopPlay()
      }
      this.lyric.currentLyric.togglePlay() // 歌词 暂停 / 播放
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
      this.lyric.currentLyric.seek(time * 1000) // 歌词显示跳转
      // this.$refs.lyric._lyricJump() // 歌词向下滚动到相对应坐标

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
     * 清空当前歌词对象
     */
    cleanCurrentLyric () {
      if (JSON.stringify(this.lyric.currentLyric) !== '{}') {
        this.lyric.currentLyric.stop()
        this.lyric.currentLyric = Object.create({})
      }
    },
    /**
     * 请求歌词数据
     */
    async getLyricData (currentSong) {
      this.cleanCurrentLyric()
      let data = await currentSong.getLyric(currentSong.mid)
      this.lyric.currentLyric = new lyricParser(data, this.lyricCallBack)
      this.lyric.currentLyric.play()
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
     * 更改 playing状态
     */
    _songPlay () {
      if (!this.playing) {
        this.stopOrRunSong(true)
      }
    },
    /**
     * 暂停事件
     * 更改 playing状态
     */
    _songStopPlay () {
      if (this.playing) {
        this.stopOrRunSong(false)
      }
    },
    /**
     * 数字转为时间格式
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
    }
  },
  components: {
    Slider,
    Lyric
  }
}
</script>

<style lang="scss" scoped>
.player {
  .full-screen {
    position: fixed;
    z-index: 1000;
    top: 0;
    // bottom: 0;
    left: 0;
    right: 0;
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
    .lyric-list {
      position: absolute;
      top: 70px;
      z-index: 10;
      width: 100%;
      height: 440px;
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
        scale: 0.3;
      }
    }
    .song-info {
      @extend .mb-20;
      .name {
        @extend .c-text, .mt-40, .pb-50;
        width: 100%;
        text-align: center;
      }
    }
    .spot {
      @extend .jc-center, .mb-10;
      width: 100%;
      div {
        @include size(8, 8);
        @extend .bgc-text-l;
        transition: all 0.5s;
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
    z-index: 1000;
    width: 100%;
    .songs {
      @extend .d-flex;
      img {
        @extend .mr-10;
        display: block;
        animation: rotate 10s linear 0.2s infinite;
        width: 46px;
        border-radius: 50%;
      }
      .text {
        @extend .d-flex, .fs-sm;
        flex: 1;
        width: 200px;
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