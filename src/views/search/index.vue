<template>
  <div class="search">
    <!-- 搜索框 -->
    <mine-input @onDelete="onDeleteInput" v-model="searchName" class="mb-30" />

    <div class="scroll-div" ref="searchRef">
      <scroll>
        <div>
          <!-- 热门搜索 -->
          <hot-search @onText="onHotText" v-show="!searchName" :hotList="hotList" class="mb-30" />

          <!-- 搜索历史 -->
          <history
            @onText="onHistText"
            @onAllRemove="onHistAllRemove"
            @onRemove="onHistRemove"
            v-show="!searchName"
            :histList="searchHist"
          />

          <!-- 搜索结果 -->
          <result-list @onItem="onResultItem" v-show="searchName" :list="searchList" />
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import { getHotKey, search } from 'api/search'
import { ERR_OK } from 'api/config'
import { debounce } from 'common/js/util'
import { createSong } from 'common/js/song'
import { getPlaySongVkey } from 'api/song'
import { mapGetters, mapActions } from 'vuex'
import { playlistMixin } from 'common/js/mixins.js'
import { smallPlayerHeight } from 'common/js/config.js'

import MineInput from './components/mine-input'
import HotSearch from './components/hot-search'
import History from './components/history'
import ResultList from './components/result-list'

export default {
  mixins: [playlistMixin],
  data () {
    return {
      searchName: '', // 搜索文案
      searchList: [], // 搜索结果
      hotList: [], // 热门搜索数组
      isHotOrHistTo: false, // 是否从热门搜索 或者 搜索历史直接搜索的
      func: null
    }
  },
  created () {
    this._getHotKey()
    this.func = debounce(newQuery => this._search(newQuery, 1), 600)
    // this.$watch('searchName', debounce(newQuery => this._search(newQuery, 1), 600)) 这样也能达到效果
  },
  computed: {
    ...mapGetters(['searchHist'])
  },
  watch: {
    searchName (val) {
      this.func(val)
      // debounce(() => { // 这样每次得到的都是新的函数 新的timer 是没有效果的
      //   this._search(val, 1)
      // }, 1000)
    }
  },
  methods: {
    ...mapActions(['playAction', 'changeSearchHist']),
    async _getHotKey () {
      let data = await getHotKey()
      if (data.code === ERR_OK) this.hotList = data.data.hotkey.slice(0, 10)
    },
    /**
     * 点击 热门搜索某一项文案
     */
    onHotText (item, index) {
      this.searchName = item.k
      this.changeSearchHist({
        type: 0,
        item: this.searchName
      })
    },
    /**
     * 点击 搜索历史某一项文案
     */
    onHistText (item, index) {
      this.searchName = item
      this.changeSearchHist({
        type: 0,
        item: this.searchName
      })
    },
    /**
     * 点击 搜索历史某一项删除图标
     */
    onHistRemove (item, index) {
      this.changeSearchHist({
        type: 1,
        item: index
      })
    },
    /**
     * 点击删除所有历史记录
     */
    onHistAllRemove () {
      if (this.searchHist.length === 0) return
      this.changeSearchHist({
        type: 2,
        item: ''
      })
    },
    /**
     * 删除输入框内容
     */
    onDeleteInput () {
      this.searchName = ''
      this.searchList = []
    },
    /**
     * 搜索歌曲，歌手
     */
    async _search (query, page) {
      let data = await search(query, page, true, 20)
      if (data.code === ERR_OK) {
        let list = data.data.song.list
        list.forEach(item => {
          getPlaySongVkey(item.songmid).then(res => {
            this.searchList.push(createSong(item, res))
          })
        })
      }
    },
    /**
     * 点击搜索结果 播放目标音乐
     */
    onResultItem (item, index) {
      this.playAction({
        list: this.searchList,
        index
      })
    },
    /**
    * 底部撑开给小型播放器空间
    */
    handlePlaylist (playList) {
      playList.length > 0
        ? this.$refs.searchRef.style.bottom = `${smallPlayerHeight}px`
        : this.$refs.searchRef.style.bottom = '0px'
    }
  },
  components: {
    MineInput,
    HotSearch,
    History,
    ResultList
  }
}
</script>

<style lang='scss' scoped>
.search {
  @extend .fs-sm;
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
  .scroll-div {
    @extend .px-20, .fs-sm;
    position: fixed;
    top: 150px;

    width: 100%;
  }
}
</style>