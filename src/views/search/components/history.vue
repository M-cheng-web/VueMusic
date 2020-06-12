<template>
  <div class="history">
    <div class="flex-between mb-15">
      <div>搜索历史</div>
      <svg-icon icon="recovery" color="rgba(255, 255, 255, 0.3)" />
    </div>
    <ul>
      <li v-for="(item, index) in histList" class="fs-md flex-between">
        <div @click="onText(item, index)">{{ item }}</div>
        <div @click="onRemove(item, index)" class="remove">×</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    histList: { type: Array, default: () => [] }
  },
  methods: {
    // 点击 某一条历史记录
    onText (item, index) {
      this.$emit('onText', item, index)
    },
    // 点击 X
    onRemove (item, index) {
      this.$emit('onRemove', item, index)
    }
  }
}
</script>

<style lang="scss" scoped>
.history {
  @extend .fs-sm, .c-text-l;
  li {
    & > div:first-child {
      flex: 1;
    }
    .remove {
      font-size: 36px;
    }
  }
}
</style>