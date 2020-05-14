<template>
  <svg :class="svgClass" :style="svgStyle" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    icon: { type: String, required: true }, // 图标名

    size: { type: Number, default: 20 }, // 图标大小

    color: { type: String, default: '#ffcd32' }, // 图标颜色

    className: { type: String, default: null } // 要加的类名(可加全局类名)
  },
  computed: {
    // 图标id
    iconName () {
      return `#icon-${this.icon}`
    },
    // svg 样式
    svgStyle () {
      const color = this.color ? `color:${this.color};` : ''
      const size = this.size ? `font-size:${this.size}px;` : ''
      return color + size
    },
    // 图标类
    svgClass () {
      return this.className ? 'svg-icon ' + this.className : 'svg-icon'
    },
  }
}
</script>

<style lang='scss' scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>