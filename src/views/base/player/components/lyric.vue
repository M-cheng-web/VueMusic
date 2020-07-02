<template>
  <!-- 歌词播放显示组件 -->
  <div class="lyric">
    <scroll ref="scroll">
      <div>
        <div v-for="(item, index) in list" :key="index">
          <div
            class="text"
            :style="{color: (index === listNowIndex ? '#fff' : 'rgba(255, 255, 255, 0.5)')}"
          >{{ item.txt }}</div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
const LINE_HEIGHT = 32 // 一行歌词的高度
const SCREEN_NUM = 12 // 一屏有多少行歌词

export default {
  props: {
    list: { type: Array, default: () => [] }, // 歌词数组

    listNowIndex: { type: Number, default: () => 0 } // 当前歌词下标
  },
  computed: {
    /**
     * 歌词数组总长度
     */
    lastIndex () {
      return this.list.length
    }
  },
  watch: {
    /**
     * 监听当前下标
     * 执行 歌词下拉操作
     */
    listNowIndex (newVal, oldVal) {
      let height = 0
      if (this.lastIndex - newVal <= SCREEN_NUM) { // 是否到了最后一屏
        // -2是试出来的 不清楚为什么 -2
        height = (this.lastIndex - SCREEN_NUM - 2) * LINE_HEIGHT // 最后一屏就不再固定那个下拉位置
      } else {
        let moveIndex = newVal > 4 ? newVal - 4 : 0 // 大于 4要跳转到当前歌词前四个位置上(保持居中)
        height = moveIndex * LINE_HEIGHT
      }
      this._scrollTo(-height)
    }
  },
  methods: {
    /**
     * 歌词自动向下移动(相对于当前位置)
     */
    _scrollBy (height) {
      this.$refs.scroll._scrollBy(height)
    },
    /**
     * 歌词自动向下移动(相对于当前位置)
     */
    _scrollTo (height) {
      this.$refs.scroll._scrollTo(height)
    }
  }
}
</script>

<style lang="scss" scoped>
.lyric {
  height: 100%;
  .text {
    @extend .fs-sm;
    margin: 0 auto;
    width: 90%;
    height: 32px;
    line-height: 32px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>