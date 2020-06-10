<template>
  <div class="song-music">
    <ul :style="listStyle">
      <li @click="onSongList(item, index)" v-for="(item, index) in songList" class="list-li">
        <div class="c-text mb-10 fs-sm">{{ item.name }}</div>
        <div class="text">{{ `${item.singer}·${item.album}` }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { smallPlayerHeight } from 'common/js/config.js'

export default {
  props: {
    songList: { type: Array, default: [] } // 数据列表
  },
  computed: {
    listStyle () {
      const bottom = this.playlist.length > 0 ? `padding-bottom: ${smallPlayerHeight}px` : 'padding-bottom: 0'
      return bottom
    },
    ...mapGetters(['playlist'])
  },
  methods: {
    onSongList (item, index) {
      this.$emit('onSongList', item, index)
    }
  }
}
</script>

<style lang="scss" scoped>
.song-music {
  width: 100%;
  .list-li {
    @extend .d-flex, .px-30;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 58px;
    .text {
      @extend .c-dialog-background, .fs-sm, .no-wrap;
      width: 300px;
    }
  }
}
</style>