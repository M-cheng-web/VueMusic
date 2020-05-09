<template>
  <div class="recommend">
    <slider class="content">
      <div v-for="(item, index) in imgs" :key="index">
        <a>
          <img :src="item" />
        </a>
      </div>
    </slider>
    <div class="hot-text">热门歌单推荐</div>
    <disc-list :discList="discList" />
  </div>
</template>

<script>
import slider from './slider'
import discList from './discList'
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'

export default {
  data () {
    return {
      imgs: [
        'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2375320.jpg',
        'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2375318.jpg',
        'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2375601.jpg',
        'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2375981.jpg',
        'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2375206.jpg'
      ],
      discList: []
    }
  },
  created () {
    this._getDiscList()
  },
  methods: {
    /**
     * 请求轮播图   有问题 未使用
     */
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          // this.recommends = res.data.slider
          console.log(res)
        }
      })
    },
    /**
     * 请求歌单数据
     */
    async _getDiscList () {
      let lists = await getDiscList()
      this.discList = lists.data.list
    }
  },
  components: {
    slider,
    discList
  }
}
</script>

<style lang='scss' scoped>
.recommend {
  .hot-text {
    @extend .my-20, .fs-sm;
    text-align: center;
    color: map-get($colors, "theme");
  }
}
</style>