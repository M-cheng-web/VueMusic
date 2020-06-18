<template>
  <div class="singer">
    <view-list :data="singerList" @goToDetail="goToDetail" />
  </div>
</template>

<script>
import ViewList from './components/view-list'

import { getSingerList } from 'api/singer.js'
import { ERR_OK } from 'api/config.js'
import { singer } from 'common/js/singer'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      singerList: []
    }
  },
  created () {
    this._getSingerList()
  },
  methods: {
    ...mapActions(['changeSinger']),
    /**
     * 获取歌手列表
     */
    async _getSingerList () {
      let list = await getSingerList()
      if (list.code === ERR_OK) {
        this.singerList = this.againSingerList(list.data.list)
      }
    },
    /**
     * 根据得到的 list 按照需求重新排列
     */
    againSingerList (list) {
      let map = {
        hot: {
          title: '热门',
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < 10) {
          map.hot.items.push(new singer(item.Fsinger_mid, item.Fsinger_name))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new singer(item.Fsinger_mid, item.Fsinger_name))
      })

      // 将 map转化为数组
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === '热门') {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    /**
     * 点击内容跳转到详细页
     */
    goToDetail (item) {
      this.changeSinger(item)
      this.$router.push({ name: 'detail', params: { type: 'singer' } })
    }
  },
  components: {
    ViewList
  }
}
</script>

<style lang='scss' scoped>
.singer {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>