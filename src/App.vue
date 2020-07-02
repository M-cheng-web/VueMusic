<template>
  <div id="app">
    <!-- logo 名称 -->
    <m-header />

    <!-- 导航栏 -->
    <tab />

    <keep-alive>
      <transition :name="transitionName">
        <router-view />
      </transition>
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
  data () {
    return {
      transitionName: ''
    }
  },
  watch: {//使用watch 监听$router的变化
    $route (to, from) {
      if ((to.meta && to.meta.index === 1) || (from.meta && from.meta.index === 1)) {
        this.transitionName = 'disc'
      } else {
        this.transitionName = ''
      }
    }
  },
  components: {
    Tab,
    MHeader,
    Player
  }
}
</script>

<style lang="scss" scoped>
.disc-enter-active {
  transition: all 0.5s;
}
.disc-leave-active {
  transition: all 0.5s;
}
.disc-enter {
  transform: translate3d(100%, 0, 0);
}
.disc-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
