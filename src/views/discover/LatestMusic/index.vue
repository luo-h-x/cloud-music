<template>
  <div class="latestMusic-page">
    <!-- 导航 -->
    <div class="nav">
      <el-menu :default-active="this.$route.query.type" mode="horizontal">
        <el-menu-item
          v-for="(item, index) in navdata"
          :key="index"
          :index="navdata[index].type"
          @click="toChange(item.type)"
          >{{ item.name }}</el-menu-item
        >
      </el-menu>
    </div>
    <!-- 更多信息 -->
    <div class="singer-more">
      <list :list="songList" />
    </div>
  </div>
</template>

<script>
import api from '../../../api/discover'
import List from './components/List'
import utils from '../../../utils/common'
export default {
  data() {
    return {
      navdata: [
        { name: '全部', type: '0' },
        { name: '华语', type: '7' },
        { name: '欧美', type: '96' },
        { name: '韩国', type: '16' },
        { name: '日本', type: '8' }
      ],
      songList: null
    }
  },
  components: { List },
  methods: {
    toChange(type) {
      this.$router.push({
        path: '/Discover/LatestMusic',
        query: { type: type }
      })
    }
  },
  mounted() {
    api.getSongN(this.$route.query.type).then(val => {
      this.songList = val.data.data.slice(0, 20)
      this.songList.forEach(item => {
        item.duration = utils.formatDay(item.duration)
      })
    })
  }
}
</script>

<style lang="scss" scoped>

// 导航
.nav {
  display: flex;
  // border-bottom: solid 1px #e6e6e6;
  .el-menu--horizontal {
    border: none;
  }
}
</style>
