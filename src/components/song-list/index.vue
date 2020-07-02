<template>
  <div class="song-music">
    <ul ref="listRef">
      <li @click="onSongList(item, index)" v-for="(item, index) in songList" class="list-li">
        <div class="left" v-show="type === 'rank'">
          <div v-if="[1, 2, 3].includes(index + 1)">
            <svg-icon icon="trophy" :size="30" :color="iconColor(index + 1)" />
          </div>
          <div v-else>{{index + 1}}</div>
        </div>
        <div class="right">
          <div class="c-text mb-10 fs-sm">{{ item.name }}</div>
          <div class="text">{{ `${item.singer}·${item.album}` }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { playlistMixin } from 'common/js/mixins.js'
import { smallPlayerHeight } from 'common/js/config.js'

export default {
  mixins: [playlistMixin],
  props: {
    songList: { type: Array, default: [] }, // 数据列表

    type: { type: String, default: 'noRank' } // 类型 noRank / rank
  },
  methods: {
    onSongList (item, index) {
      this.$emit('onSongList', item, index)
    },
    iconColor (index) {
      switch (index) {
        case 1:
          return '#f1c40f'
        case 2:
          return '#ecf0f1'
        case 3:
          return '#e67e22'
      }
    },
    /**
     * 底部撑开给小型播放器空间
     */
    handlePlaylist (playList) {
      playList.length > 0
        ? this.$refs.listRef.style.paddingBottom = `${smallPlayerHeight}px`
        : this.$refs.listRef.style.paddingBottom = '0px'
    }
  }
}
</script>

<style lang="scss" scoped>
.song-music {
  width: 100%;
  .list-li {
    @extend .d-flex;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    width: 100%;
    height: 58px;
    .left {
      width: 36px;
      text-align: center;
      color: #ffcd32;
    }
    .right {
      @extend .d-flex;
      flex-direction: column;
      justify-content: center;
    }
    .text {
      @extend .c-dialog-background, .fs-sm, .no-wrap;
      width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>