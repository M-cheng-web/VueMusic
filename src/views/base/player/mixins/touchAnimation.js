export default {
  methods: {
    /**
     * 图片触摸开始
     */
    imgTouchStart (e) {
      this.touch.startX = e.touches[0].pageX
      this.$refs.bigImgOuter.style.transition = 'all 0.5s'
      this.$refs.lineLyric.style.transition = 'all 0.5s'
    },
    /**
     * 图片移动过程
     */
    imgTouchMove (e) {
      let move = e.touches[0].pageX - this.touch.startX
      this.touch.move = -move
      let opacity = (window.innerWidth - this.touch.move) / window.innerWidth
      this.setImgAndLyricOpacity(opacity)
    },
    /**
     * 图片移动结束
     */
    imgTouchEnd (e) {
      let width = window.innerWidth * 0.3 // 滑动距离超过 30% 就自动划过来
      if (this.touch.move > width) {
        this.touch.move = window.innerWidth
        this.setImgAndLyricOpacity(0)
        this.currenyIndex = 1
      } else {
        this.touch.move = 0
        this.setImgAndLyricOpacity(1)
        this.currenyIndex = 0
      }
    },
    /**
     * 歌词触摸开始
     */
    lyricTouchStart (e) {
      this.touch.startX = e.touches[0].pageX
      this.touch.startY = e.touches[0].pageY
      this.setImgAndLyricOpacity(0)
    },
    /**
     * 歌词移动过程
     */
    lyricTouchMove (e) {
      let height = e.touches[0].pageY - this.touch.startY
      let width = e.touches[0].pageX - this.touch.startX

      if (Math.abs(height) > Math.abs(width)) { // 判断当前 上下 / 左右 滑动
        return
      }

      this.touch.move = window.innerWidth - width
      let opacity = (window.innerWidth - this.touch.move) / window.innerWidth
      this.setImgAndLyricOpacity(opacity)
    },
    /**
     * 歌词移动结束
     */
    lyricTouchEnd () {
      let width = window.innerWidth * 0.3 // 滑动距离超过 30% 就自动划动
      if (this.touch.move > (window.innerWidth - width)) {
        this.touch.move = window.innerWidth
        this.setImgAndLyricOpacity(0)
        this.currenyIndex = 1
      } else {
        this.touch.move = 0
        this.setImgAndLyricOpacity(1)
        this.currenyIndex = 0
      }
    },
    /**
     * 设置中心大图和当前歌词的 透明度
     */
    setImgAndLyricOpacity (num) {
      this.$refs.bigImgOuter.style.opacity = num
      this.$refs.lineLyric.style.opacity = num
    }
  }
}