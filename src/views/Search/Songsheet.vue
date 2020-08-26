<template>
  <div>
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
          v-for="(item, index) in result.playlists"
          :key="index"
        >
          <img @load="show" :src="item.coverImgUrl + '?param=130y130'" class="sa-pic" />
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
    </div>
  </div>
</template>

<script>
import api from '../../api/discover'
export default {
  data() {
    return {
      result: [],
      loading: true,
      count: 0
    }
  },
  mounted() {
    api.getSearch(this.$route.query.keyword, 1000).then(val => {
      this.result = val.data.result
      // this.album.hotAlbums.forEach(item => {
      //   item.publishTime = new Date(item.publishTime).toLocaleDateString()
      // })
    })
  },
  methods: {
    show() {
      this.count++
      if (this.count === this.result.playlists.length) {
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
  height: calc(100vh - 200px);
  position: absolute;
}
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
