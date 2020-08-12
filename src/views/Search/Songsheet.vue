<template>
  <ul class="singer-album">
    <li
      class="singer-album-item"
      v-for="(item, index) in result.playlists"
      :key="index"
    >
      <img :src="item.coverImgUrl" class="sa-pic" />
      <router-link
        :to="{ path: '/PlayList', query: { id: item.id } }"
        class="sa-title"
        >{{ item.name }}</router-link
      >
      <span class="sa-count">{{ item.trackCount }}首</span>
      <router-link
        :to="{ path: '/User', query: { uid: item.creator.userId } }"
        class="sa-title"
        >by: {{ item.creator.nickname }}</router-link
      >
    </li>
  </ul>
</template>

<script>
import api from '../../api/discover'
export default {
  data() {
    return {
      result: []
    }
  },
  mounted() {
    api.getSearch(this.$route.query.keyword, 1000).then(val => {
      this.result = val.data.result
      // this.album.hotAlbums.forEach(item => {
      //   item.publishTime = new Date(item.publishTime).toLocaleDateString()
      // })
    })
  }
}
</script>

<style lang="scss" scoped>
.singer-album {
  .singer-album-item {
    display: grid;
    grid-template-columns: 0.5fr 3fr 3fr 3fr;
    grid-column-gap: 10px;
    align-items: center;
    margin: 10px 0;
    font-size: 14px;
    color: #999;
    height: 50px;
    &:nth-child(even) {
      background: #fafafa;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.1) !important;
    }
    .sa-pic {
      width: 50px;
    }
  }
}
</style>
