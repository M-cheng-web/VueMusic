<template>
  <div class="singer-detail"></div>
</template>

<script>
export default {
  computed: {
    xxx () {
      return this.$route.params
    }
  }
}
</script>

<style lang='scss' scoped>
.singer-detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
}
</style>