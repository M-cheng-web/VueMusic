<template>
  <div class="mine-input">
    <svg-icon icon="search" :size="22" color="#222" />
    <input v-model="inputData" type="text" placeholder="搜索歌曲,歌手" />
    <svg-icon @click.native="onDelete" v-show="inputData" icon="delete" :size="22" color="#222" />
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
  },
  methods: {
    onDelete () {
      this.$emit('onDelete')
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
    flex: 1;
    height: 30px;
    color: #fff;
    outline: none;
  }
  .svg-icon {
    width: 26px;
  }
}
</style>