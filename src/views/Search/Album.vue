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
          v-for="(item, index) in album.albums"
          :key="index"
        >
          <img
            @load="show"
            :src="item.picUrl + '?param=130y130'"
            class="sa-pic"
          />
          <router-link
            :to="{ path: '/Album', query: { id: item.id } }"
            class="sa-title"
            >{{ item.name }}</router-link
          >
          <router-link
            :to="{ path: '/Singer', query: { id: item.artist.id } }"
            class="sa-title"
            >{{ item.artist.name }}</router-link
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
      album: [],
      loading: true,
      count: 0
    }
  },
  mounted() {
    api.getSearch(this.$route.query.keyword, 10).then(val => {
      this.album = val.data.result
    })
  },
  methods: {
    show() {
      this.count++
      if (this.count >= this.album.albums.length) {
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
