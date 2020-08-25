<template>
  <div class="footer-page">
    <audio
      class="audio"
      v-if="songList.length > 0"
      :src="songList[currentIndex].url"
      autoplay
      ref="audio"
      @timeupdate="audioTimeUpdate"
      @ended="ended"
      @playing="playing"
      @play="play"
      @pause="pause"
      @error="error"
    ></audio>
    <!-- 歌曲 -->
    <div v-if="songList.length > 0" class="player-song">
      <router-link
        :to="{ path: '/Song', query: { id: songList[currentIndex].id } }"
        ><img :src="songList[currentIndex].al.picUrl + '?param=100y100'" class="ps-pic"
      /></router-link>
      <div class="ps-creator">
        <router-link
          class="psc-tit"
          :to="{ path: '/Song', query: { id: songList[currentIndex].id } }"
          >{{ songList[currentIndex].name }}</router-link
        >
        <router-link
          :to="{
            path: '/Singer',
            query: { id: songList[currentIndex].ar[0].id }
          }"
          class="psc-name"
          >{{ songList[currentIndex].ar[0].name }}</router-link
        >
      </div>
    </div>
    <!-- 播放暂停 -->
    <div class="player">
      <a @click="prev" href="javascript:;" class="btn-prev" title="上一首">
        <img src="../assets/prev.svg" alt="" />
      </a>
      <a
        v-if="!isPlay"
        @click="toggle"
        href="javascript:;"
        class="btn-play"
        title="暂停"
      >
        <img src="../assets/playM.svg" alt="" />
      </a>
      <a
        v-else
        @click="toggle"
        href="javascript:;"
        class="btn-pause"
        title="播放"
      >
        <img src="../assets/pauseM.svg" alt="" />
      </a>
      <a @click="next" href="javascript:;" class="btn-next" title="下一首">
        <img src="../assets/next.svg" alt="" />
      </a>
    </div>
    <!-- 进度条 -->
    <div class="player-music">
      <span class="player-music-start">{{ start }}</span>
      <el-slider
        @input="autoCurrentTime"
        @change="changeCurrentTime"
        :step="step"
        :show-tooltip="false"
        v-model="currentTime"
      ></el-slider>
      <span class="player-music-end"> {{ duration }}</span>
    </div>
    <!-- 调节音量 -->
    <div class="player-voice">
      <a href="javascript:;" title="关闭声音[M]">
        <img class="btn-voice" src="../assets/volume.svg" alt="" />
      </a>
      <el-slider @input="changVolum" :value="v"></el-slider>
    </div>
    <!-- <a href="javascript:;" class="btn-like" title="喜欢[V]"></a>
    <a href="javascript:;" class="btn-down" title="下载[D]"></a> -->
  </div>
</template>

<script>
import utils from '../utils/common'
export default {
  data() {
    return {
      currentTime: 0, // 进度条
      v: 30, // 音量
      duration: '00:00', // 持续时间
      start: '00:00', // 当前时间
      isPlay: false, // 播放暂停
      step: 0.5, // 进度条步长
      timer: null // 定时器
    }
  },
  computed: {
    playList() {
      return this.$store.state.playList
    },
    currentIndex() {
      return this.$store.state.currentIndex
    },
    songList() {
      return this.$store.state.songList
    }
  },
  methods: {
    // 播放暂停
    toggle() {
      // this.isPlay = !this.isPlay
      if (!this.isPlay) {
        this.$refs.audio.pause()
      } else {
        this.$refs.audio.play()
      }
    },
    next() {
      this.$store.commit('nextM')
      if (this.$route.path === '/Song') {
        this.$router.push({
          path: '/Song',
          query: { id: this.songList[this.currentIndex].id }
        })
      }
    },
    prev() {
      this.$store.commit('prevM')
      if (this.$route.path === '/Song') {
        this.$router.push({
          path: '/Song',
          query: { id: this.songList[this.currentIndex].id }
        })
      }
    },
    // 播放中触发
    audioTimeUpdate() {
      this.$store.commit('autoLyricM', this.$refs.audio.currentTime)
      // 进度条自动滑动
      if (this.timer) return
      this.timer = setTimeout(() => {
        this.currentTime =
          (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100
        this.timer = null
      }, 1000)
    },
    // 播放时触发
    play() {
      this.isPlay = false
      // 步长
      this.step = parseFloat((100 / this.$refs.audio.duration).toFixed(1))
      // 音量
      this.$refs.audio.volume = this.v / 100
      this.duration = utils.formatDay(this.$refs.audio.duration * 1000)
      // 暂停mv
      let video = document.getElementsByTagName('video')[0]
      if (video) {
        video.pause()
      }
    },
    pause() {
      this.isPlay = true
    },
    // 播放完时触发
    ended() {
      this.$refs.audio.play()
      // this.isPlay = true
    },
    // 事件在音频/视频(audio/video)因缓冲而暂停或停止后已就绪时触发
    playing() {
      this.isPlay = false
    },
    // 调节音量
    changVolum(val) {
      if (this.$refs.audio) {
        this.$refs.audio.volume = val / 100
        this.v = val
      }
    },
    // 调节时长
    changeCurrentTime(val) {
      this.$refs.audio.currentTime = (this.$refs.audio.duration / 100) * val
    },
    autoCurrentTime(val) {
      if (this.$refs.audio) {
        this.start = utils.formatDay(this.$refs.audio.currentTime * 1000)
      }
    },
    error() {
      this.$notify({
        title: 'error',
        message: '亲爱的,出错了',
        type: 'danger',
        duration: 2000,
        position: 'top-left'
      })
      console.log('出错了')
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-page {
  width: 100%;
  display: flex;
  align-items: center;
  height: 40px;
  // 歌曲
  .player-song {
    width: 160px;
    display: flex;
    align-items: center;
    margin-right: 20px;
    .ps-pic {
      width: 40px;
    }
    .ps-creator {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .psc-tit {
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 110px;
      }
      .psc-name {
        font-size: 14px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 110px;
      }
    }
  }
  // 播放暂停
  .player {
    width: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn-prev {
      display: block;
      // width: 19px;
      // height: 20px;
      // background-image: url(../assets/player.png);
      // background-position: 0 -30px;
    }
    .btn-play {
      display: block;
      // width: 21px;
      // height: 29px;
      // background-image: url(../assets/player.png);
      // background-position: 0 0;
    }
    .btn-pause {
      display: block;
      // width: 21px;
      // height: 29px;
      // background-image: url(../assets/player.png);
      // background-position: -30px 0;
    }
    .btn-next {
      display: block;
      // width: 19px;
      // height: 20px;
      // background-image: url(../assets/player.png);
      // background-position: 0 -52px;
    }
    .icon_txt {
      font: 0/0 a;
    }
  }
  // 进度条
  .player-music {
    margin: 0 30px;
    display: flex;
    width: 400px;
    .el-slider {
      flex: 1;
    }
    .player-music-start {
      line-height: 40px;
      margin: 0 10px;
      font-size: 13px;
    }
    .player-music-end {
      line-height: 40px;
      margin: 0 5px;
      font-size: 13px;
    }
  }
  // 调节音量
  .player-voice {
    width: 100px;
    display: flex;
    align-items: center;
    .btn-voice {
      display: block;
      width: 26px;
      // height: 21px;
      // background-image: url(../assets/player.png);
      // background-position: 0 -144px;
      margin-right: 10px;
    }
    .el-slider {
      flex: 1;
    }
  }
  .btn-like {
    display: block;
    width: 23px;
    height: 21px;
    margin: 0 10px;
    background-image: url(../assets/player.png);
    background-position: 0 -96px;
  }
  .btn-down {
    display: block;
    width: 22px;
    height: 21px;
    margin: 0 10px;
    background-image: url(../assets/player.png);
    background-position: 0 -120px;
  }
  .btn-comment {
    display: block;
    width: 22px;
    height: 21px;
    margin: 0 10px;
    background-image: url(../assets/player.png);
    background-position: 0 -430px;
  }
}
</style>
