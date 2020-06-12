<template>
  <div class="hot-search">
    <div class="mb-15 pt-5">热门搜索</div>
    <ul>
      <li @click="onHotList(item, index)" v-for="(item, index) in hotList" :key="index">{{ item.k }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    hotList: { type: Array, default: () => [] } // 热门列表
  },
  computed: {

  },
  methods: {
    onHotList (item, index) {
      this.$emit('onText', item, index)
    }
  }
}
</script>

<style lang="scss" scoped>
.hot-search {
  @extend .c-text-d, .fs-sm;
  ul {
    li {
      @extend .jc-center, .fs-md, .mb-10, .mr-15, .py-5, .px-15, .bgc-highlight-background;
      display: inline-block;
      border-radius: 10px;
    }
  }
}
</style>