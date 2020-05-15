<template>
  <div class="song-music">
    <ul>
      <li @click="onSongList(item)" v-for="item in songList" class="list-li">
        <div class="c-text mb-10 fs-sm">{{ item.name }}</div>
        <div class="c-dialog-background fs-sm">{{ `${item.singer}·${item.album}` }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songList: { type: Array, default: [] }
  },
  methods: {
    onSongList (item) {
      this.$emit('onSongList', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.song-music {
  .list-li {
    @extend .d-flex, .px-30;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 58px;
  }
}
</style>