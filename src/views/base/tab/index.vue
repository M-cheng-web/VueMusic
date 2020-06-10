<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.tab {
  @extend .jc-around;
  height: 44px;
  line-height: 44px;
  position: absolute;
  top: 44px;
  z-index: 10;
  width: 100%;
  .tab-item {
    .tab-link {
      @extend .pb-5;
    }
    &.router-link-active {
      .tab-link {
        border-bottom: 2px solid map-get($colors, "theme");
        color: map-get($colors, "theme");
      }
    }
  }
}
</style>