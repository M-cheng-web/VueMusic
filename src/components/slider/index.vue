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
      maxWidth: 0,
      isStart: false
    }
  },
  mounted () {
    this.maxWidth = this.$refs.line.clientWidth - BALL_WIDTH // 滑块最多移动宽度
  },
  watch: {
    changeNum (val) {
      if (val === 0) {
        this.changeMove(0)
      }
    }
  },
  methods: {
    /**
     * 点击触发
     */
    ballTouchstart (e) {
      if (!this.isStart) {
        this.startX = e.targetTouches[0].clientX
        this.isStart = true
      }
    },
    /**
     * 滑动过程
     */
    ballTouchmove (e) {
      let x = Math.min(this.maxWidth, Math.max(0, e.targetTouches[0].clientX - this.startX))
      this.changeMove(x)
    },
    /**
     * 滑动结束
     */
    ballTouchend (e) {
      // this.$emit('update:changeNum')
    },
    /**
     * 点击直线直接跳转
     */
    onSlider (e) {
      this.startX = this.$refs.line.getBoundingClientRect().left
      let x = Math.min(this.maxWidth, Math.max(0, e.clientX - this.startX))
      this.changeMove(x)
    },
    /**
     * 更改球的平移以及直线的宽度
     */
    changeMove (width) {
      this.$refs.ball.style[transform] = `translate3d(${width}px,0,0)`
      this.$refs.lineAction.style.width = `${width}px`
      this.setChangeTime(width)
    },
    /**
     * 计算并返回当前应该要返回的歌曲节点
     */
    setChangeTime (width) {
      let lineTage = width / this.maxWidth
      let time = (this.endNum - this.startNum) * lineTage
      this.$emit('changeNum', parseInt(time))
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