<template>
  <div class="mine-input">
    <svg-icon icon="search" :size="22" color="#222" />
    <input v-model="inputData" type="text" placeholder="搜索歌曲,歌手" />
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, default: '' } // v-model绑定值
  },
  data () {
    return {
      inputData: ''
    }
  },
  watch: {
    value: {
      handler (val) {
        this.inputData = val
      },
      immediate: true
    },
    inputData (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.mine-input {
  @extend .ai-center, .bgc-highlight-background, .px-10, .mx-20;
  height: 40px;
  border-radius: 10px;
  input {
    @extend .ml-15, .bgc-highlight-background;
    height: 30px;
    color: #fff;
    outline: none;
  }
}
</style>