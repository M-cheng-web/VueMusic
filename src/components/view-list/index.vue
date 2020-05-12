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
          <li v-for="child in item.items" class="list-group-child">
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
  </scroll>
</template>

<script>
import Scroll from '../scroll'

export default {
  props: {
    data: { type: Array, default: null }
  },
  data () {
    return {
      currentIndex: 0,
      slideListHeight: [],
      isGetListHeight: false,
    }
  },
  computed: {
    cutList () {
      return this.data.map(item => item.title.slice(0, 1))
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
     */
    getScrollHeight (height) {
      if (!this.isGetListHeight) {
        this.getslideListHeight()
        this.isGetListHeight = true
      }
      height = -height
      let num = this.slideListHeight.findIndex(item => height < item)

      num = num - 1 < 0
        ? height > 0 ? this.slideListHeight.length - 1 : 0
        : num - 1
      this.currentIndex = num
    },
    /**
     * 获取所有 Dom 高度数组
     * 因为 v-lazy所以 DOM高度是会变化的
     * 所以当滚动结束后需要重新计算高度数组 （滚动一屏的高度才会触发）
     */
    getslideListHeight () {
      this.slideListHeight = this.data.map((item, index) => this.$refs.urlArray.children[index].offsetTop)
    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang='scss' scoped>
.view-list {
  @extend.c-text-l;
  position: relative;
  .list-group {
    @extend .pb-30;
    h2 {
      @extend .fs-xs, .pl-20, .bgc-dialog-background;
      height: 30px;
      line-height: 30px;
    }
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
}
</style>