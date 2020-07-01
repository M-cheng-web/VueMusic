<template>
  <div class="recommend" ref="recomRef">
    <scroll ref="scroll" :data="discList">
      <div>
        <!-- 轮播图 -->
        <rotation-chart class="content">
          <div v-for="(item, index) in imgs" :key="index">
            <a href="http://www.baidu.com">
              <img @load="imgLoad" class="needsclick" :src="item" />
            </a>
          </div>
        </rotation-chart>

        <div class="hot-text">热门歌单推荐</div>

        <!-- 热门歌单 -->
        <div class="dis-list">
          <ul>
            <li @click="onImg(item)" v-for="(item, index) in discList" class="list-li">
              <div class="div-img">
                <img v-lazy="item.imgurl" />
              </div>
              <div class="div-text">
                <div>{{ item.creator.name }}</div>
                <div>{{ item.dissname }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>

    <!-- 等待界面 -->
    <div class="loading" v-show="discList.length === 0">
      <loading />
    </div>
  </div>
</template>

<script>
import RotationChart from './components/rotationChart'
import Scroll from 'components/scroll'
import Loading from 'components/loading'

import { mapActions } from 'vuex'
import { playlistMixin } from 'common/js/mixins.js'
import { smallPlayerHeight } from 'common/js/config.js'
import { getRecommend, getDiscList } from 'api/recommend'
import { getPlaySongVkey } from 'api/song'
import { ERR_OK } from 'api/config'

export default {
  mixins: [playlistMixin],
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
  mounted: {
    listStyle () {
      const bottom = this.playlist.length > 0 ? `bottom: ${smallPlayerHeight}px` : 'bottom: 0'
      return bottom
    }
  },
  methods: {
    ...mapActions(['changeDisc']),
    /**
     * 请求歌单数据
     */
    async _getDiscList () {
      let lists = await getDiscList()
      this.discList = lists.data.list
    },
    /**
     * 点击歌单跳转
     */
    onImg (item) {
      this.changeDisc(item)
      this.$router.push({ name: 'detail', params: { type: 'disc' } })
    },
    /**
     * 图片加载完毕运行的方法
     */
    imgLoad () {
      if (this.isCheckLoad) {
        this.isCheckLoad = false
        this.$refs.scroll._refresh()
      }
    },
    /**
     * 底部撑开给小型播放器空间
     */
    handlePlaylist (playList) {
      playList.length > 0
        ? this.$refs.recomRef.style.bottom = `${smallPlayerHeight}px`
        : this.$refs.recomRef.style.bottom = '0px'
    }
  },
  components: {
    RotationChart,
    Scroll,
    Loading
  }
}
</script>

<style lang='scss' scoped>
.recommend {
  position: fixed;
  top: 90px;
  width: 100%;
  .hot-text {
    @extend .my-20, .fs-sm;
    text-align: center;
    color: map-get($colors, "theme");
  }
  .dis-list {
    .list-li {
      @extend .pb-20, .px-20, .d-flex;
      height: 60px;
      .div-img {
        @extend .mr-20;
        img {
          width: 60px;
        }
      }
      .div-text {
        @extend .d-flex, .fs-sm;
        flex-direction: column;
        justify-content: space-around;
        & > div:first-child {
          color: map-get($colors, "text");
        }
        & > div:last-child {
          color: map-get($colors, "dialog-background");
        }
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