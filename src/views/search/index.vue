<template>
  <div class="search">
    <!-- 搜索框 -->
    <mine-input @onDelete="onDeleteInput" v-model="searchName" class="mb-30" />

    <div class="scroll-div">
      <scroll>
        <div>
          <!-- 热门搜索 -->
          <hot-search @onText="onHotText" :hotList="hotList" class="mb-30" />

          <!-- 搜索历史 -->
          <history @onText="onHistText" @onRemove="onHistRemove" :histList="histList" />
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import { getHotKey, search } from 'api/search'
import { ERR_OK } from 'api/config'
import { debounce } from 'common/js/util'

import MineInput from './components/mine-input'
import HotSearch from './components/hot-search'
import History from './components/history'

export default {
  data () {
    return {
      searchName: '', // 搜索内容
      hotList: [], // 热门搜索数组
      histList: ['阿萨德', '盛大的反感', '规范和大师大', '阿萨德', '盛大的反感', '规范和大师大', '阿萨德', '盛大的反感', '规范和大师大'] // 历史搜索列表
    }
  },
  created () {
    this._getHotKey()
  },
  watch: {
    searchName (val) {
      debounce(() => this._search(val, 1), 500)
    }
  },
  methods: {
    async _getHotKey () {
      let data = await getHotKey()
      if (data.code === ERR_OK) this.hotList = data.data.hotkey.slice(0, 10)
    },
    /**
     * 点击某一项热门搜索
     */
    onHotText (item, index) {
      this.searchName = item.k
    },
    /**
     * 点击某一项历史记录
     */
    onHistText (item, index) {
    },
    /**
     * 点击某一项删除历史记录
     */
    onHistRemove (item, index) {
    },
    /**
     * 删除输入框内容
     */
    onDeleteInput () {
      this.searchName = ''
    },
    /**
     * 搜索歌曲，歌手
     */
    async _search (query, page) {
      search(query, page, true, 20)
    }
  },
  components: {
    MineInput,
    HotSearch,
    History
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
    bottom: 0;
  }
}
</style>