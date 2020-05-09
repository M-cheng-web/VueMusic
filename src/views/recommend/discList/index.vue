<template>
  <div class="dis-list">
    <scroll :data="discList">
      <ul>
        <li v-for="(item, index) in discList" class="list-li">
          <div class="div-img">
            <img :src="item.imgurl" />
          </div>
          <div class="div-text">
            <div>{{ item.creator.name }}</div>
            <div>{{ item.dissname }}</div>
          </div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../../../components/scroll'

export default {
  props: {
    discList: { type: Array }
  },
  components: {
    Scroll
  }
}
</script>

<style lang='scss' scoped>
.dis-list {
  height: 400px;
  .list-li {
    @extend .pb-20, .px-20, .d-flex;
    .div-img {
      @extend .mr-20;
      img {
        width: 60px;
      }
    }
    .div-text {
      @extend .d-flex, .fs-sm;
      flex-direction: column;
      justify-content: space-around;
      height: 60px;
      & > div:first-child {
        color: map-get($colors, "text");
      }
      & > div:last-child {
        color: map-get($colors, "dialog-background");
      }
    }
  }
}
</style>