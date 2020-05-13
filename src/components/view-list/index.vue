<template>
  <scroll
    @getScrollHeight="getScrollHeight"
    @getslideListHeight="getslideListHeight"
    :data="data"
    :probeType="3"
    class="view-list"
    ref="scroll"
  >
    <ul ref="urlArray">
      <li v-for="item in data" class="list-group">
        <h2>{{ item.title }}</h2>
        <ul>
          <li @click="goToDetail(child)" v-for="child in item.items" class="list-group-child">
            <img v-lazy="child.address" />
            <span>{{ child.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut">
      <ul>
        <li
          @click="onShortCut(index)"
          v-for="(item, index) in cutList"
          :class="{'current': currentIndex === index}"
        >{{ item }}</li>
      </ul>
    </div>
    <div ref="fixedTitle" class="fixed-title" v-show="fixedTtile">{{ fixedTtile }}</div>
    <div class="loading" v-show="data.length === 0">
      <loading />
    </div>
  </scroll>
</template>

<script>
import Scroll from '../scroll'
import Loading from 'components/loading'

const FIXED_HEIGHT = 30
const TOP_HEIGHT = 90

export default {
  props: {
    data: { type: Array, default: null }
  },
  data () {
    return {
      currentIndex: 0,
      slideListHeight: [],
      scrollHeight: 0,
      isGetListHeight: false
    }
  },
  computed: {
    cutList () {
      return this.data.map(item => item.title.slice(0, 1))
    },
    fixedTtile () {
      if (this.data && this.data.length > 0) {
        return this.scrollHeight < 0
          ? ''
          : this.data[this.currentIndex].title
      }
    }
  },
  methods: {
    /**
     * 点击右侧列表，通知子组件滑动
     */
    onShortCut (index) {
      this.currentIndex = index
      let x = this.$refs.urlArray.children[index].offsetTop
      this.$refs.scroll._scrollTo(-x)
    },
    /**
     * 当手动滑动列表，组件会传回来高度
     * 利用这个高度判断右侧列表应该高亮哪个部分
     */
    getScrollHeight (height) {
      if (!this.isGetListHeight) {
        this.getslideListHeight()
        this.isGetListHeight = true
      }
      this.scrollHeight = height = -height
      let num = this.slideListHeight.findIndex(item => height < item)
      num = num - 1 < 0
        ? height > 0 ? this.slideListHeight.length - 1 : 0
        : num - 1
      this.currentIndex = num
      this.setAbsListHeight(num)
    },
    /**
     * 计算距离,开启局部动作
     * 距离: 当前区域距离顶部的距离(绝对距离)
     */
    setAbsListHeight (index) {
      let x = index + 1 === this.data.length
        ? '' // 当 index为最后一位时给 x赋值空
        : this.$refs.urlArray.children[index + 1].getBoundingClientRect().y - TOP_HEIGHT
      x
        ? x > FIXED_HEIGHT
          ? this.$refs.fixedTitle.style.transform = `translate3d(0,0,0)`
          : this.$refs.fixedTitle.style.transform = `translate3d(0,${x - FIXED_HEIGHT}px,0)`
        : this.$refs.fixedTitle.style.transform = `translate3d(0,0,0)`
    },
    /**
     * 获取所有 Dom 高度数组
     * 因为 v-lazy所以 DOM高度是会变化的
     * 所以当滚动结束后需要重新计算高度数组 （滚动一屏的高度才会触发）
     */
    getslideListHeight () {
      this.slideListHeight = this.data.map((item, index) => this.$refs.urlArray.children[index].offsetTop)
    },
    /**
     * 点击内容跳转到详细页
     */
    goToDetail (item) {
      this.$emit('goToDetail', item)
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style lang='scss' scoped>
.view-list {
  position: relative;
  @extend .c-text-l;
  .list-group {
    @extend .pb-30;
    .list-group-child {
      @extend .fs-sm, .pt-20, .pl-30, .ai-center;
      img {
        @extend .mr-20;
        width: 50px;
        border-radius: 50%;
      }
    }
  }
  .list-shortcut {
    @extend .fs-xs, .py-20, .bgc-background-d;
    position: fixed;
    top: 55%;
    right: 0;
    transform: translateY(-50%);
    width: 20px;
    border-radius: 15px;
    li {
      margin-bottom: 7px;
      text-align: center;
    }
    .current {
      @extend .c-theme;
    }
  }
  .fixed-title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }
  .list-group h2,
  .fixed-title {
    @extend .fs-xs, .pl-20, .bgc-highlight-background;
    height: 30px;
    line-height: 30px;
  }
}
</style>