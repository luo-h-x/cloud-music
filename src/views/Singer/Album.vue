<template>
  <div class="singer-mv-page">
    <ul class="singer-album">
      <li
        class="singer-album-item"
        v-for="(item, index) in album.hotAlbums"
        :key="index"
      >
        <img :src="item.picUrl" class="sa-pic" />
        <!-- <router-link
            :to="{ path: '/PlayList', query: { id: item.id } }"
            class="sa-title"
            >我不服</router-link
          > -->
        <a href="javascript:;" class="sa-title">{{ item.name }}</a>
        <span class="sa-count">歌曲: {{ item.size }}首</span>
        <span class="sa-time">发行时间: {{ item.publishTime }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../../api/singer'
export default {
  data() {
    return {
      album: []
    }
  },
  mounted() {
    api.getSingerAlbum(this.$route.query.id).then(val => {
      this.album = val.data
      this.album.hotAlbums.forEach(item => {
        item.publishTime = new Date(item.publishTime).toLocaleDateString()
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.singer-album {
  .singer-album-item {
    display: grid;
    grid-template-columns: 1fr 3fr 3fr 3fr;
    align-items: center;
    margin: 10px 0;
    font-size: 14px;
    color: #999;
    .sa-pic {
      width: 50px;
    }
  }
}
</style>
