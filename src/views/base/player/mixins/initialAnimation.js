import animations from 'create-keyframe-animation' // 动画插件

import { prefixStyle } from 'common/js/dom.js'

const transform = prefixStyle('transform')

export default {
  methods: {
    enter (el, done) {
      // done是必须要有的,调用 done就是进入下一个周期

      const { x, y, scale } = this._getPosAndScale()

      let animation = {
        0: {
          transform: `translate3d(${-x}px, ${-y}px, 0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0, 0, 0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0, 0, 0) scale(1)`
        },
      }

      // 创建动画
      animations.registerAnimation({
        name: 'move',
        animation, // 动画更改的实际数组
        presets: {
          duration: 400, // 动画时间
          easing: 'linear' // 线性动画
          // delay: 500 // 延迟
        }
      })

      // 开启动画
      animations.runAnimation(this.$refs.bigImgOuter, 'move', done)
    },
    afterEnter () {
      // 进入完毕后清除元素
      animations.unregisterAnimation('move')
      this.$refs.bigImgOuter.style.animation = ''
    },
    leave (el, done) {
      const { x, y, scale } = this._getPosAndScale()
      this.$refs.bigImgOuter.style.transition = 'all 0.4s'
      this.$refs.bigImgOuter.style[transform] = `translate3d(${-x}px, ${-y}px, 0) scale(${scale})`
      this.$refs.bigImgOuter.addEventListener('transitionend', done)
    },
    afterLeave () {
      this.$refs.bigImgOuter.style.transition = ''
      this.$refs.bigImgOuter.style[transform] = ''
    }
  }
}