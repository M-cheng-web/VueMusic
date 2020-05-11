<template>
  <div class="loading">
    <img src="../../common/image/loading.gif" />
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '正在载入中...'
    }
  }
}
</script>

<style lang='scss' scoped>
.loading {
  text-align: center;
  img {
    width: 40px;
  }
  p {
    @extend .fs-xxs, .c-text;
  }
}
</style>