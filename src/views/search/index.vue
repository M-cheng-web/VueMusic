<template>
  <div class="search">
    <div class="input">
      <input v-model="inputData" placeholder="搜索歌曲，歌手" type="text" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputData: ''
    }
  }
}
</script>

<style lang='scss' scoped>
.search {
  @extend .p-20;
  display: flex;
  bottom: 0;
  top: 90;
  left: 0;
  right: 0;
  .input {
    height: 40px;
    border-radius: 10px;
  }
}
</style>