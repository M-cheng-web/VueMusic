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
      this.scroll.scrollTo(0, height, 200)
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