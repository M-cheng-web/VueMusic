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
import Tab from 'base/tab'
import MHeader from 'base/m-header'
import Player from 'base/player'

export default {
  components: {
    Tab,
    MHeader,
    Player
  }
}
</script>

<style lang="scss" scoped>
</style>
