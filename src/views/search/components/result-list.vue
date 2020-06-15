<template>
  <div class="result-list">
    <ul>
      <li @click="onItem(item, index)" v-for="(item, index) in list">
        <svg-icon icon="music-log" />
        <div class="ellipsis">{{ `${item.name} - ${item.singer}` }}</div>
      </li>
    </ul>
    <loading v-show="list.length === 0" />
  </div>
</template>

<script>
export default {
  props: {
    list: { type: Array, default: () => [] }
  },
  methods: {
    onItem (item, index) {
      this.$emit('onItem', item, index)
    }
  }
}
</script>

<style lang="scss" scoped>
.result-list {
  width: 100%;
  ul {
    li {
      @extend .ai-center, .fs-sm;
      height: 40px;
      line-height: 40px;
      .svg-icon {
        @extend .mr-20;
      }
    }
  }
  .loading {
    @extend .mt-50;
    width: 100%;
  }
}
</style>