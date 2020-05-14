<template>
  <div class="singer-detail">{{ singerData }}</div>
</template>

<script>
import { mapGetters } from 'vuex'

import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'


export default {
  data () {
    return {
      detailList: []
    }
  },
  computed: {
    ...mapGetters({ singerData: 'singer' })
  },
  created () {
    this._getSingerDetail(this.singerData.id)
  },
  methods: {
    async _getSingerDetail (id) {
      let list = await getSingerDetail(id)
      if (list.code === ERR_OK) {
        this, detailList = list.data
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.singer-detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
}
</style>