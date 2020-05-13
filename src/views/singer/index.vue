<template>
  <div class="singer">
    <view-list :data="singerList" @goToDetail="goToDetail" />
    <transition name="detail">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import ViewList from 'components/view-list'

import { getSingerList } from 'api/singer.js'
import { ERR_OK } from 'api/config.js'
import { singer } from 'common/js/singer'

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
      this.$router.push({ name: 'singer-detail', params: { id: item.id } })
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
  top: 90px;
  bottom: 0;
  width: 100%;
}
.detail-enter-active {
  transition: all 0.5s;
}
.detail-leave-active {
  transition: all 0.5s;
}
.detail-enter {
  transform: translate3d(100%, 0, 0);
}
.detail-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>