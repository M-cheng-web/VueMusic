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

    // 是否自动隐藏
    isOverFlow: { type: Boolean, default: true }
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
    _initScroll () {
      if (!this.$refs.scroll) {
        return
      }
      const { probeType, click } = this
      this.scroll = new BScroll(this.$refs.scroll, {
        probeType,
        click
      })

      this.scroll.on('scroll', pos => {
        this.$emit('getScrollHeight', pos.y)
      })
    },
    _enable () {
      this.scroll && this.scroll.enable()
    },
    _disable () {
      this.scroll && this.scroll.disable()
    },
    _refresh () {
      this.scroll && this.scroll.refresh()
    },
    _scrollTo (height) {
      this.scroll.scrollTo(0, height, this.moveTime)
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