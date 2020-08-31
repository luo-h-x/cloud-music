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
          v-for="(item, index) in list"
          :key="index"
        >
          <span class="number">{{ index + 1 }}</span>
          <img @load="show" :src="item.album.picUrl + '?param=130y130'" class="sa-pic" />
          <a
            @dblclick="playSong(index)"
            title="双击播放"
            href="javascript:;"
            class="tit"
            >{{ item.name }}</a
          >
          <router-link
            :to="{ path: '/Singer', query: { id: item.artists[0].id } }"
            class="sa-title"
            >{{ item.artists[0].name }}</router-link
          >
          <router-link
            :to="{ path: '/Album', query: { id: item.album.id } }"
            class="sa-title"
            >{{ item.album.name }}</router-link
          >
          <span class="time">{{ item.duration }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data() {
    return {
      loading: true,
      count: 0
    }
  },
  methods: {
    playSong(index) {
      let data = {}
      data.currentIndex = index
      data.ids = this.list[0].id
      this.list.forEach(item => {
        data.ids += ',' + item.id
      })
      this.$store.dispatch('querySongsA', data)
    },
    show() {
      this.count++
      if (this.count === this.list.length) {
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
  height: calc(100vh - 180px);
  position: absolute;
}
.singer-album {
  .singer-album-item {
    display: grid;
    grid-template-columns: 0.5fr 0.5fr 3fr 2fr 2fr 2fr;
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
    .number {
      line-height: 50px;
      text-align: center;
    }
    .tit {
      cursor: default;
    }
  }
}
</style>
