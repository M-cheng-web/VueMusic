<template>
  <div class="rank" ref="rankRef">
    <scroll>
      <ul>
        <li @click="onRankList(item)" v-for="item in rankList" class="list">
          <img v-lazy="item.picUrl" />
          <div class="content">
            <div v-for="text in item.songList">{{ `${text.songname}-${text.singername}` }}</div>
          </div>
        </li>
      </ul>
    </scroll>

    <!-- 等待界面 -->
    <div class="loading" v-show="rankList.length === 0">
      <loading />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { playlistMixin } from 'common/js/mixins.js'
import { smallPlayerHeight } from 'common/js/config.js'
import { getTopList, getMusicList } from 'api/rank'
import { ERR_OK } from 'api/config'

export default {
  mixins: [playlistMixin],
  data () {
    return {
      rankList: []
    }
  },
  created () {
    this._getTopList()
  },
  methods: {
    ...mapActions(['changeRank']),
    /**
     * 获取排行列表
     */
    async _getTopList () {
      let list = await getTopList()
      if (list.code === ERR_OK) this.rankList = list.data.topList
    },
    /**
     * 点击歌单跳转
     */
    onRankList (item) {
      this.changeRank(item)
      this.$router.push({ name: 'detail', params: { type: 'rank' } })
    },
    /**
     * 底部撑开给小型播放器空间
     */
    handlePlaylist (playList) {
      playList.length > 0
        ? this.$refs.rankRef.style.bottom = `${smallPlayerHeight}px`
        : this.$refs.rankRef.style.bottom = '0px'
    }
  }
}
</script>

<style lang='scss' scoped>
.rank {
  @extend .bgc-background, .fs-xs;
  position: fixed;
  top: 90px;
  width: 100%;
  .list {
    @extend .p-20;
    display: flex;
    height: 100px;
    img {
      width: 100px;
    }
    .content {
      @extend .bgc-highlight-background, .c-text-d, .py-10, .pl-20;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      div {
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }
}
</style>