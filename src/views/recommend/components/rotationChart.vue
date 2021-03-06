<template>
  <!-- 轮播图 -->
  <div class="rotation-chart" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span
        @click="_goToPage(index)"
        :class="['dota', {'active': currentPageIndex === index}]"
        v-for="(item, index) in dots"
      />
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

import { addClass } from 'common/js/dom.js'

export default {
  props: {
    loop: { type: Boolean, default: true }, // 是否循环轮播

    autoPlay: { type: Boolean, default: true }, // 是否自动播放

    interval: { type: Number, default: 4000 } // 设置轮播间隔
  },
  data () {
    return {
      dots: [],
      currentPageIndex: 0,
      timer: '',
      slider: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()

      if (this.autoPlay) {
        this._play()
      }

      // 监听浏览器窗口大小变化
      window.onresize = () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      }
    })
  },
  methods: {
    // 给 slider设置宽度
    _setSliderWidth (isResize) {
      this.children = this.$refs.sliderGroup.children

      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }

      // 使用无缝循环需要增加两位图片宽度
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }

      this.$refs.sliderGroup.style.width = width + 'px'
    },
    // 初始化 圆点
    _initDots () {
      this.dots = new Array(this.$refs.sliderGroup.children.length)
    },
    // 初始化 slider
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })

      this.slider.on('scrollEnd', this._onScrollEnd)
    },
    // 滚动结束获取位置
    _onScrollEnd () {
      let pageIndex = this.slider.getCurrentPage().pageX
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    },
    // 自动滚动
    _play () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    },
    // 滚到到指定页面
    _goToPage (index) {
      this.slider.goToPage(index)
      this.currentPageIndex = index
      this._play()
    }
  },
  destroyed () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang='scss' scoped>
.rotation-chart {
  position: relative;
  overflow: hidden;
  min-height: 1px;
  .slider-group {
    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots {
    display: flex;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    .dota {
      @include size(10, 10);
      background-color: map-get($colors, "text-ll");
      border-radius: 5px;
    }
    .dota:not(:last-child) {
      @extend .mr-15;
    }
    .active {
      @include size(20, 10);
      background-color: map-get($colors, "text");
    }
  }
}
</style>