<template>
  <div class="search-page">
    <div>搜索 <em class="keyword">"{{this.$route.query.keyword}}"</em></div>
    <el-menu :default-active="this.$route.meta.title" mode="horizontal">
      <el-menu-item
        v-for="(item, index) in navdata"
        :key="index"
        :index="item.name"
        @click="toChange(item.path)"
        >{{ item.name }}</el-menu-item
      >
    </el-menu>
    <div class="search-more">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navdata: [
        { name: '单曲', path: '/Search/Song' },
        { name: '歌手', path: '/Search/Singer' },
        { name: '专辑', path: '/Search/Album' },
        { name: '视频', path: '/Search/Video' },
        { name: '歌单', path: '/Search/Songsheet' },
        { name: '用户', path: '/Search/User' }
      ]
    }
  },
  methods: {
    toChange(path) {
      this.$router.push({ path: path, query: { keyword: this.$route.query.keyword } })
    }
  }
}
</script>

<style>
.keyword {
  color: rgba(0, 0, 255, 0.589);
}
</style>
