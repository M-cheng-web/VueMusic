<template>
  <div id="app">
    <!-- logo 名称 -->
    <m-header />

    <!-- 导航栏 -->
    <tab />

    <!-- 页面内容 -->
    <keep-alive>
      <router-view />
    </keep-alive>

    <!-- 播放器 -->
    <player />
  </div>
</template>

<script>
import Tab from 'components/tab'
import MHeader from 'components/m-header'
import Player from 'base/player'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['playlist'])
  },
  components: {
    Tab,
    MHeader,
    Player
  }
}
</script>

<style lang="scss">
@import "common/styles/variables";
</style>
