<template>
  <div class="slider" @click="onSlider">
    <div ref="line" class="line">
      <div ref="ball" @touchstart="ballTouchstart" @touchmove="ballTouchmove" @touchend="ballTouchend" class="ball"></div>
      <div ref="lineAction" class="line-action"></div>
    </div>
  </div>
</template>

<script>
import { prefixStyle, getDomPosition } from 'common/js/dom.js'

const transform = prefixStyle('transform')
const BALL_WIDTH = 16 // 小球宽度

export default {
  props: {
    changeNum: { type: Number, default: 0 }, // 变化的数字

    startNum: { type: Number, default: 0 }, // 初始数字

    endNum: { type: Number, default: 1 } // 末尾数字
  },
  data () {
    return {
      startX: 0,
      moveX: 0,
      isStart: false
    }
  },
  watch: {
    changeNum (val) {
      this._changeMove(this._getCurrentTime(val))
    }
  },
  computed: {
    maxWidth () { // 滑块最多移动宽度
      let width = this.$refs.line.clientWidth
      if (width && width > 0) {
        return width - BALL_WIDTH
      }
    },
    minWidth () { // 滑动最短移动宽度
      let width = this.$refs.line.getBoundingClientRect()
      if (width && width.left) {
        return width.left
      }
    }
  },
  methods: {
    /**
     * 滑动开始(手触摸)
     */
    ballTouchstart (e) {
    },
    /**
     * 滑动过程(手移动)
     */
    ballTouchmove (e) {
      this.moveX = Math.min(this.maxWidth, Math.max(0, e.targetTouches[0].clientX - this.minWidth))
      this.$emit('sliderMove', this._getChangeTime(this.moveX))
    },
    /**
     * 滑动结束(手松开)
     */
    ballTouchend (e) {
      this.$emit('sliderEnd', this._getChangeTime(this.moveX))
    },
    /**
     * 点击直线直接跳转
     */
    onSlider (e) {
      this.moveX = Math.min(this.maxWidth, Math.max(0, e.clientX - this.minWidth))
      this.$emit('sliderClick', this._getChangeTime(this.moveX))
    },
    /**
     * 更改球的平移以及直线的宽度
     */
    _changeMove (width) {
      this.$refs.lineAction.style.width = `${width + 5}px`
      this.$refs.ball.style[transform] = `translate3d(${width}px,0,0)`
    },
    /**
     * 根据跳转宽度，计算当前应该要返回的歌曲时间
     */
    _getChangeTime (width) {
      let lineTage = width / this.maxWidth
      let time = (this.endNum - this.startNum) * lineTage
      return parseInt(time)
    },
    /**
     * 根据歌曲时间，计算当前进度条显示
     */
    _getCurrentTime (time) {
      let lineTage = time / (this.endNum - this.startNum)
      let width = this.maxWidth * lineTage
      return width
    }
  }
}
</script>

<style lang="scss" scoped>
.slider {
  @include size(240, 30);
  text-align: center;
  .line {
    @extend .bgc-background-d;
    position: relative;
    height: 4px;
    margin-top: 13px;
    .ball {
      @include size(16, 16);
      @extend .bgc-theme;
      position: absolute;
      top: -6px;
      left: 0;
      z-index: 10;
      border: 3px solid #fff;
      border-radius: 50%;
    }
    .line-action {
      @extend .bgc-theme;
      position: absolute;
      top: 0;
      left: 0;
      height: 4px;
    }
  }
}
</style>