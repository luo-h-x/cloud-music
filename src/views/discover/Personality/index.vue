<template>
  <div class="personality-page">
    <div
      class="load"
      v-loading="loading"
      element-loading-text="努力加载中"
      element-loading-background="#fff"
      v-if="loading"
    ></div>
    <div :class="{ hide: loading }">
      <Banner />
      <recommended-song />
      <sole />
      <latest-music />
      <music-video />
      <radio-station />
    </div>
  </div>
</template>

<script>
import Banner from './Banner'
import RecommendedSong from './RecommendedSong'
import Sole from './Sole'
import LatestMusic from './LatestMusic'
import MusicVideo from './MusicVideo'
import RadioStation from './RadioStation'
export default {
  components: {
    Banner,
    RecommendedSong,
    Sole,
    LatestMusic,
    MusicVideo,
    RadioStation
  },
  computed: {
    loading() {
      return this.$store.state.loading
    }
  },
  created() {
    this.$store.commit('loadingAM')
  }
}
</script>

<style lang="scss">
.hide {
  display: none;
}
.load {
  width: 100%;
  height: calc(100vh - 120px);
  position: absolute;
}
.s-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  margin: 20px 0;
  > h3 {
    line-height: 40px;
    font-weight: 400;
  }
  > a {
    color: #999;
    font-size: 12px;
  }
}
</style>
