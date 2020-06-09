<template>
  <div class="scroll" ref="scroll">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
    // 滑动派发事件类型
    probeType: { type: Number, default: 1 },

    // 是否可点击
    click: { type: Boolean, default: true },

    // 展示的数据
    data: { type: Array, default: null },

    // 滑动的时间
    moveTime: { type: Number, default: 400 },

    // 是否设置 css属性为自动隐藏  
    isOverFlow: { type: Boolean, default: true },

    // 是否阻止事件冒泡
    isStopPop: { type: Boolean, default: false }
  },
  data () {
    return {
      scroll: Object.create({})
    }
  },
  mounted () {
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  watch: {
    data () {
      this.$nextTick(() => {
        this._refresh()
      })
    },
    isOverFlow: {
      handler (val) {
        this.$nextTick(() => {
          if (val) {
            this.$refs.scroll.style['overflow'] = `hidden`
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    /**
     * 初始化 better-scroll
     */
    _initScroll () {
      if (!this.$refs.scroll) {
        return
      }
      const { probeType, click, isStopPop } = this
      this.scroll = new BScroll(this.$refs.scroll, {
        probeType,
        click,
        stopPropagation: isStopPop
      })

      this.scroll.on('scroll', pos => {
        this.$emit('getScrollHeight', pos.y)
      })
    },
    /**
     * 启用 better-scroll
     */
    _enable () {
      this.scroll && this.scroll.enable()
    },
    /**
     * 禁用 better-scroll
     */
    _disable () {
      this.scroll && this.scroll.disable()
    },
    /**
     * 刷新 better-scroll
     * 生成新高度
     */
    _refresh () {
      this.scroll && this.scroll.refresh()
    },
    /**
     * 滚动到指定的位置(Y轴)
     */
    _scrollTo (height) {
      this.scroll && this.scroll.scrollTo(0, height, this.moveTime)
    },
    /**
     * 滚动相对于当前位置的位置(Y轴)
     */
    _scrollBy (height) {
      this.scroll && this.scroll.scrollBy(0, height, this.moveTime)
    }
  }
}
</script>

<style lang="scss">
.scroll {
  height: 100%;
  // overflow: hidden;
}
</style>