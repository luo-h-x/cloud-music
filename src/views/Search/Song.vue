<template>
  <div class="p-list" v-if="result">
    <div class="songs-item header">
      <span></span>
      <span>标题</span>
      <span>歌手</span>
      <span>专辑</span>
      <span>时长</span>
    </div>
    <ul class="songs">
      <li class="songs-item" v-for="(item, index) in result.songs" :key="index">
        <span class="num">{{ index + 1 }}</span>
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
        <span class="dt">{{ item.duration }}</span>
      </li>
    </ul>
  </div>
  <div
    v-else
    class="load"
    v-loading="loading"
    element-loading-text="努力加载中"
    element-loading-background="#fff"
  ></div>
</template>

<script>
import api from '../../api/discover'
import util from '../../utils/common'
export default {
  data() {
    return {
      result: null,
      loading: true,
      count: 0
    }
  },
  mounted() {
    api.getSearch(this.$route.query.keyword, 1).then(val => {
      this.result = val.data.result
      this.result.songs.forEach(item => {
        item.duration = util.formatDay(item.duration)
      })
    })
  },
  methods: {
    mose(row, column, cell, event) {
      console.log(row)
    },
    playSong(index) {
      let data = {}
      data.currentIndex = index
      data.ids = this.result.songs[0].id
      this.result.songs.forEach(item => {
        data.ids += ',' + item.id
      })
      this.$store.dispatch('querySongsA', data)
    },
    // 加载中
    show() {
      this.count++
      if (this.count >= this.result.songs.length) {
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
// 歌单列表
.p-list {
  margin: 20px 0;
}
.p-icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
  cursor: pointer;
}

.songs-item {
  display: grid;
  grid-template-columns: 0.5fr 3fr 1.5fr 3fr 1fr;
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
  .tit {
    cursor: default;
  }
}
.header {
  border: 1px solid #ccc;
  & > span {
    line-height: 50px;
    padding-left: 10px;
    border-left: 1px solid #ccc;
  }
}
</style>
