<template>
  <div class="song-page" v-if="song">
    <!-- 歌曲详情 -->
    <div
      class="load"
      v-loading="loading"
      element-loading-text="努力加载中"
      element-loading-background="#fff"
      v-if="loading"
    ></div>
    <div :class="{ hide: loading }">
      <div ref="music" class="song-detail">
        <img :src="song.al.picUrl + '?param=600y600'" class="song-pic" />
        <!-- 背景虚化 -->
        <div class="song-dark"></div>
        <img @load="show" :src="song.al.picUrl + '?param=600y600'" class="song-bg" />
        <div class="song-info">
          <span class="si-name">{{ song.name }}</span>
          <router-link
            :to="{ path: '/Singer', query: { id: song.ar[0].id } }"
            class="si-creator"
            >歌手: {{ song.ar[0].name }}</router-link
          >
          <router-link
            :to="{ path: '/Album', query: { id: song.al.id } }"
            class="si-album"
            >专辑: {{ song.al.name }}</router-link
          >
          <el-scrollbar
            ref="lyric"
            style="width: 400px; height: 220px;"
            v-if="lyric"
          >
            <!-- 歌词 -->
            <ul v-if="lyric.length > 0" class="si-lyric">
              <li
                class="si-lyric-item"
                v-for="(item, index) in lyric"
                :key="index"
                :class="lyricIndex === index ? 'active' : ''"
              >
                <span>{{ item.content }}</span>
              </li>
            </ul>
            <p style="text-align: center;" v-else>纯音乐，请您欣赏</p>
          </el-scrollbar>
        </div>
      </div>
      <div class="song-extra">
        <!-- 听友评论 -->
        <comments />
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/discover'
import Comments from '../../components/Comments'
export default {
  data() {
    return {
      song: null,
      loading: true,
      count: 0
    }
  },
  components: { Comments },
  computed: {
    lyric() {
      return this.$store.state.lyric
    },
    lyricIndex() {
      return this.$store.state.lyricIndex
    }
  },
  mounted() {
    // 歌曲信息
    api.getSong(this.$route.query.id).then(val => {
      this.song = val.data.songs[0]
    })
    // 歌曲歌词
    this.$store.dispatch('queryLyricA', this.$route.query.id)
  },
  methods: {
    show() {
      this.count++
      this.loading = false
      // 歌词滚动元素
      this.$store.commit('getElM', this.$refs.lyric.wrap)
      // console.log(this.$refs.lyric.wrap)
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
  height: 390px;
  position: absolute;
}
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
      filter: blur(10px);
      object-fit: cover;
      position: absolute;
    }
    .song-pic {
      z-index: 1000;
      width: 330px;
      height: 100%;
      margin: 30px;
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
        margin-top: 10px;
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
        font-size: 14px;
        color: #fff;
        text-align: center;
        .si-lyric-item {
          line-height: 20px;
          margin-bottom: 20px;
        }
        .active {
          color: #31c27c;
        }
      }
    }
  }
  // 听友评论
}
</style>
