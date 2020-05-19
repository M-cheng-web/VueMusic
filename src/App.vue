<template>
  <div id="app">
    <m-header />
    <tab />
    <keep-alive>
      <router-view />
    </keep-alive>
    <player v-show="playing" />
    <!-- <player /> -->
  </div>
</template>

<script>
import Tab from 'components/tab'
import MHeader from 'components/m-header'
import Player from 'components/player'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['playing'])
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
