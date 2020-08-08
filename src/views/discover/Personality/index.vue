<template>
  <div class="personality-page">
    <Banner/>
    <recommended-song/>
    <sole/>
    <latest-music/>
    <music-video/>
    <radio-station/>
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
  }
}
</script>

<style lang="scss" >
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
  > span {
    font-size: 12px;
    cursor: pointer;
  }
}
</style>
