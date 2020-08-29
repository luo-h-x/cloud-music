<template>
  <div class="singer-mv-page">
    <div
      class="load"
      v-loading="loading"
      element-loading-text="努力加载中"
      element-loading-background="#fff"
      v-if="loading"
    ></div>
    <div :class="{ hide: loading }">
      <ul class="singer-album">
        <li
          class="singer-album-item"
          v-for="(item, index) in album.hotAlbums"
          :key="index"
        >
          <img @load="show" :src="item.picUrl + '?param=100y100'" class="sa-pic" />
          <router-link
            :to="{ path: '/Album', query: { id: item.id } }"
            class="sa-title"
            >{{ item.name }}</router-link
          >
          <!-- <a href="javascript:;" class="sa-title">{{ item.name }}</a> -->
          <span class="sa-count">歌曲: {{ item.size }}首</span>
          <span class="sa-time">发行时间: {{ item.publishTime }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '../../api/singer'
export default {
  data() {
    return {
      album: [],
      loading: true,
      count: 0
    }
  },
  mounted() {
    api.getSingerAlbum(this.$route.query.id).then(val => {
      this.album = val.data
      this.album.hotAlbums.forEach(item => {
        item.publishTime = new Date(item.publishTime).toLocaleDateString()
      })
    })
  },
  methods: {
    show() {
      this.count++
      if (this.count === this.album.hotAlbums.length) {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hide {
  display: none;
}
.load {
  width: 100%;
  height: calc(100vh - 435px);
  position: absolute;
}
.singer-album {
  .singer-album-item {
    display: grid;
    grid-template-columns: 1fr 3fr 3fr 3fr;
    align-items: center;
    margin: 10px 0;
    font-size: 14px;
    color: #999;
    height: 50px;
    .sa-pic {
      width: 50px;
    }
  }
}
</style>
