<template>
  <div class="scroll" ref="scroll">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
    probeType: { type: Number, default: 1 },

    click: { type: Boolean, default: true },

    data: { type: Array, default: null }
  },
  data () {
    return {
      scroll: Object.create({}),
      scrollY: 0
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
    scrollY (newVal, oldVal) {
      if (newVal - oldVal > 0) {
        if (newVal - oldVal > 760) {
          this.$emit('getslideListHeight')
        }
      } else {
        if (oldVal > newVal > 760) {
          this.$emit('getslideListHeight')
        }
      }
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

      // 因为 v-lazy所以 DOM高度是会变化的  滚动结束后需要重新计算高度数组
      this.scroll.on('scrollEnd', pos => {
        this.scrollY = -pos.y
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
      this.scroll.scrollTo(0, height, 800)
    }
  }
}
</script>

<style lang="scss">
.scroll {
  height: 100%;
  overflow: hidden;
}
</style>