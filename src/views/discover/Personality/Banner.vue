<template>
  <div class="banner">
    <el-carousel :interval="4000" type="card" height="170px">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img @load="show" class="banner-imgs" :src="item.imageUrl + '?param=800y295'" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import api from '../../../api/discover'
export default {
  data() {
    return {
      banners: null
    }
  },
  mounted() {
    // 获取轮播图
    api.getBanner().then(val => {
      this.banners = val.data.banners
    })
  },
  methods: {
    show() {
      this.$store.commit('loadingDM')
    }
  }
}
</script>

<style lang="scss" scoped>
// 轮播
.banner {
  margin: 20px 0;
  .banner-imgs {
    width: 100%;
    height: 100%;
  }
}
</style>
