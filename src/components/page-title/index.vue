<template>
  <div class="page-title">
    <div class="first-line">
      <svg-icon @click.native="onIcon" :icon="icon" :size="24" />
      <span>{{ title }}</span>
    </div>
    <span v-if="smallTitle">{{ smallTitle }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '我是标题' }, // 标题

    icon: { type: String, default: 'back' }, // 图标

    smallTitle: { type: String, default: null } // 标题下方小文字
  },
  methods: {
    /**
     * 点击图标
     */
    onIcon () {
      this.$emit('onIcon')
    },
  }
}
</script>

<style lang='scss' scoped>
.page-title {
  @extend .fs-lg, .c-text;
  .first-line {
    @extend .pl-20;
    position: relative;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    width: 100%;
    span {
      position: absolute;
      top: 0;
      left: 50%;
      width: 300px;
      text-align: center;
      transform: translateX(-50%);
    }
  }
  & > span {
    @extend .fs-sm;
    display: block;
    width: 100%;
    text-align: center;
  }
}
</style>