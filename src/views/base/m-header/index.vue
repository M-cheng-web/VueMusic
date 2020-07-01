<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
  </div>
</template>

<script>
</script>

<style lang='scss' scoped>
.m-header {
  @extend .flex-center;
  height: 44px;
  .icon {
    @include bg-image("logo");
    @extend .mr-5;
    width: 30px;
    height: 32px;
    background-size: 30px 32px;
  }
  .text {
    color: map-get($colors, "theme");
  }
}
</style>