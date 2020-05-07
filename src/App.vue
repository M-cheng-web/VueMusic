<template>
  <div id="app">
    <tab />
    <router-view />
  </div>
</template>

<script>
import Tab from './components/tab'

export default {
  components: {
    Tab
  }
}
</script>

<style lang="scss">
@import "common/styles/variables";
</style>
