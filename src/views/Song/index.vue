<template>
  <div class="song-page" v-if="song">
    <!-- 歌曲详情 -->
    <div class="song-detail">
      <img
        src="http://p1.music.126.net/UR8jAfqus_o1j_QkaYkZ_g==/109951163664241365.jpg?param=177y177"
        class="song-pic"
      />
      <!-- 背景虚化 -->
      <div class="song-dark"></div>
      <div class="song-bg"></div>
      <div class="song-info">
        <span class="si-name">{{ song.name }}</span>
        <router-link
          :to="{ path: '/Singer', query: { id: song.ar[0].id } }"
          class="si-creator"
          >歌手: {{ song.ar[0].name }}</router-link
        >
        <router-link
          :to="{ path: '/Singer', query: { id: song.ar[0].id } }"
          class="si-album"
          >专辑: {{ song.al.name }}</router-link
        >
        <el-scrollbar>
          <!-- 歌词 -->
          <ul class="si-lyric" v-if="lyric">
            <li class="si-lyric-item" v-for="(item, index) in lyric.lrc.lyric" :key="index">
              <span>{{item}}</span>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </div>
    <div class="song-extra">
      <!-- 听友评论 -->
      <comments />
    </div>
  </div>
</template>

<script>
import api from '../../api/discover'
import Comments from '../../components/Comments'
import utils from '../../utils/common'
export default {
  data() {
    return {
      song: null,
      lyric: null
    }
  },
  components: { Comments },
  mounted() {
    // let a = 'afdsfa'
    // a.replace(/\[(\d+):(\d+).(\d+)\]/g, '').split('\n')
    // 歌曲评论
    api.getSongC(this.$route.query.id).then(val => {
      let comments = val.data
      // 时间戳 => 日期
      comments.hotComments.forEach(item => {
        item.time = utils.formatDate(item.time, 1)
      })
      comments.comments.forEach(item => {
        item.time = utils.formatDate(item.time, 1)
      })
      this.$store.dispatch('queryCommetsA', comments)
    })
    // 歌曲信息
    api.getSong(this.$route.query.id).then(val => {
      this.song = val.data.songs[0]
    })
    // 歌曲歌词
    api.getLyric(this.$route.query.id).then(val => {
      this.lyric = val.data
      this.lyric.lrc.lyric = this.lyric.lrc.lyric.replace(/\[(\d+):(\d+).(\d+)\]/g, '').split('\n')
    })
  }
}
</script>

<style lang="scss" scoped>
.song-page {
  display: flex;
  flex-direction: column;
  // 歌曲
  .song-detail {
    display: flex;
    position: relative;
    margin-bottom: 50px;
    // 背景虚化
    .song-dark {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 100;
    }
    .song-bg {
      width: 100%;
      height: 100%;
      background: url(http://p2.music.126.net/UR8jAfqus_o1j_QkaYkZ_g==/109951163664241365.jpg?param=130y130)
        center center no-repeat;
      background-size: cover;
      filter: blur(10px);
      position: absolute;
    }
    .song-pic {
      z-index: 1000;
      width: 360px;
      margin: 50px;
    }
    .song-info {
      z-index: 1000;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      .si-name {
        font-size: 24px;
        color: #fff;
        margin: 20px 0;
      }
      .si-creator {
        font-size: 14px;
        color: #999;
        line-height: 28px;
      }
      .si-album {
        font-size: 14px;
        color: #999;
        line-height: 28px;
        margin-bottom: 10px;
      }
      // 歌词
      .si-lyric {
        width: 400px;
        height: 230px;
        color: #fff;
        text-align: center;
        .si-lyric-item {
          margin-bottom: 20px;
        }
      }
    }
  }
  // 听友评论
}
</style>
