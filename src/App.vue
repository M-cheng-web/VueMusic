<template>
  <div id="app">
    <m-header />
    <tab />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import Tab from './components/tab'
import MHeader from './components/m-header'

export default {
  components: {
    Tab,
    MHeader
  }
}
</script>

<style lang="scss">
@import "common/styles/variables";
</style>
