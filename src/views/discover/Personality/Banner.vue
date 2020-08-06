<template>
  <div class="banner">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img class="banner-imgs" :src="item.imageUrl" />
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
    if (sessionStorage.getItem('banners')) {
      this.banners = JSON.parse(sessionStorage.getItem('banners'))
    } else {
      api.getBanner().then(val => {
        this.banners = val.data.banners
        sessionStorage.setItem('banners', JSON.stringify(val.data.banners))
      })
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
