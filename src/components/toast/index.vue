<template>
  <div class="toast" v-show="content">
    <div class="pop">{{ content }}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: undefined
    }
  },
  methods: {
    showToast (content) {
      this.content = content
      setTimeout(() => {
        this.content = undefined
      }, 1500)
    }
  }
}
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  .pop {
    @extend .px-20, .py-10;
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    color: #fff;
    transform: translate(-50%, -50%);
    background-color: rgba(253, 203, 110, 0.8);
    border-radius: 10px;
    text-align: center;
  }
}
</style>