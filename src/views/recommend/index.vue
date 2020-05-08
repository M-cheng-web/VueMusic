<template>
  <div class="recommend">
    <slider class="recommend-content">
      <div v-for="(item, index) in imgs" :key="index">
        <a>
          <img :src="item" />
        </a>
      </div>
    </slider>推荐歌单
  </div>
</template>

<script>
import slider from '../../components/slider'
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
    // this._getRecommend()
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
    _getDiscList () {
      this.discList = getDiscList()
    }
  },
  components: {
    slider
  }
}
</script>

<style lang='scss' scoped>
.recommend {
  .recommend-content {
    // overflow: hidden;
  }
}
</style>