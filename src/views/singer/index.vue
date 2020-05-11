<template>
  <div class="singer"></div>
</template>

<script>
import { getSingerList } from '../../api/singer.js'

export default {
  data () {
    return {

    }
  },
  created () {
    getSingerList()
  }
}
</script>

<style lang='scss' scoped>
</style>