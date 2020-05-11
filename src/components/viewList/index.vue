<template>
  <scroll :data="data" class="view-list">
    <ul>
      <li v-for="item in data" class="list-group">
        <h2>{{ item.title }}</h2>
        <ul>
          <li v-for="child in item.items" class="list-group-child">
            <img v-lazy="child.address" />
            <span>{{ child.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </scroll>
</template>

<script>
import Scroll from '../scroll'

export default {
  props: {
    data: { type: Array, default: null }
  },
  components: {
    Scroll
  }
}
</script>

<style lang='scss' scoped>
.view-list {
  .list-group {
    @extend .pb-30;
    h2 {
      @extend .fs-xs, .c-text-l, .pl-20, .bgc-dialog-background;
      height: 30px;
      line-height: 30px;
    }
    .list-group-child {
      @extend .fs-md, .c-text-l, .pt-20, .pl-30, .ai-center;
      img {
        @extend .mr-20;
        width: 50px;
        border-radius: 50%;
      }
    }
  }
}
</style>