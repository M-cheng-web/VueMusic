<template>
  <div class="lyric">
    <scroll ref="scroll">
      <div>
        <div v-for="(item, index) in list" :key="index">
          <div class="text" :style="{color: (index === listIndex ? '#fff' : 'rgba(255, 255, 255, 0.5)')}">{{ item.txt }}</div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
export default {
  props: {
    list: { type: Array, default: [] }, // 歌词数组

    listIndex: { type: Number, default: 0 } // 当前歌词下标
  },
  watch: {
    listIndex (val) {
      if (val > 5) {
        this.scrollTo(-30)
      }
    }
  },
  methods: {
    scrollTo (height) {
      console.log(height);
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
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
}
</style>