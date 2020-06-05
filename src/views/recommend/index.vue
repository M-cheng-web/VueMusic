<template>
  <div class="recommend">
    <scroll ref="scroll" :data="discList">
      <div>
        <rotation-chart class="content">
          <div v-for="(item, index) in imgs" :key="index">
            <a href="http://www.baidu.com">
              <img @load="imgLoad" class="needsclick" :src="item" />
            </a>
          </div>
        </rotation-chart>
        <div class="hot-text">热门歌单推荐</div>
        <disc-list :discList="discList" />
      </div>
    </scroll>
    <div class="loading" v-show="discList.length === 0">
      <loading />
    </div>
  </div>
</template>

<script>
import RotationChart from './rotationChart'
import DiscList from './discList'
import Scroll from 'components/scroll'
import Loading from 'components/loading'

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
      discList: [],
      isCheckLoad: true
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
        }
      })
    },
    /**
     * 请求歌单数据
     */
    async _getDiscList () {
      let lists = await getDiscList()
      this.discList = lists.data.list
    },
    /**
     * 图片加载完毕运行的方法
     */
    imgLoad () {
      if (this.isCheckLoad) {
        this.isCheckLoad = false
        this.$refs.scroll._refresh()
      }
    }
  },
  components: {
    RotationChart,
    DiscList,
    Scroll,
    Loading
  }
}
</script>

<style lang='scss' scoped>
.recommend {
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
  .hot-text {
    @extend .my-20, .fs-sm;
    text-align: center;
    color: map-get($colors, "theme");
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