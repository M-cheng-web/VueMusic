<template>
  <!-- 热门歌单 -->
  <div class="dis-list">
    <ul>
      <li v-for="(item, index) in discList" class="list-li">
        <div class="div-img">
          <img @click="onImg(item)" v-lazy="item.imgurl" />
        </div>
        <div class="div-text">
          <div>{{ item.creator.name }}</div>
          <div>{{ item.dissname }}</div>
        </div>
      </li>
    </ul>
    <transition name="disc">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    discList: { type: Array, default: () => [] }
  },
  methods: {
    ...mapActions(['changeDisc']),
    onImg (item) {
      this.changeDisc(item)
      this.$router.push({ name: 'detail', params: { type: 'disc' } })
    }
  }
}
</script>

<style lang='scss' scoped>
.dis-list {
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