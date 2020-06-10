<template>
  <div class="rank">
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getTopList, getMusicList } from 'api/rank'
import { ERR_OK } from 'api/config'

export default {
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
      if (list.code === ERR_OK) {
        this.rankList = list.data.topList
      }
    },
    /**
     * 点击歌单跳转
     */
    onRankList (item) {
      this.changeRank(item)
      this.$router.push({ name: 'detail', params: { type: 'rank' } })
    },
  }
}
</script>

<style lang='scss' scoped>
.rank {
  @extend .bgc-background, .fs-xs;
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
  .list {
    @extend .p-20;
    display: flex;
    img {
      width: 100px;
    }
    .content {
      @extend .bgc-highlight-background, .c-text-d, .py-10, .pl-20;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
}
</style>