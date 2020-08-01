<template>
  <div class="footer-page">
    <div class="player">
      <a href="javascript:;" class="btn-prev" title="alt+←"></a>
      <a href="javascript:;" class="btn-play btn-pause " title="[空格]"></a>
      <a href="javascript:;" class="btn-next" title="alt+→"></a>
    </div>
    <div class="player-music">
      <span class="player-music-start">{{ start }}</span>
      <!-- <el-progress :percentage="30" :show-text="false"></el-progress> -->
      <el-slider v-model="val" :format-tooltip="formatTooltip"></el-slider>
      <span class="player-music-end"> 03:18</span>
    </div>
    <div class="player-voice">
      <a class="btn-voice" href="javascript:;" title="关闭声音[M]"></a>
      <!-- <el-progress :percentage="30" :show-text="false"></el-progress> -->
      <el-slider v-model="val2"></el-slider>
    </div>
    <a href="javascript:;" class="btn-like" title="喜欢[V]"></a>
    <a href="javascript:;" class="btn-down" title="下载[D]"></a>
    <a
      href="https://y.qq.com/n/yqq/song/0030BScq1b8mUu.html#comment_box"
      class="btn-comment"
      target="_blank"
    ></a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      val: 10,
      val2: 40,
      timer: 112730,
      start: ''
    }
  },
  methods: {
    formatTooltip (val) {
      // 一个val为一个刻度
      let a = this.timer * val
      let min = parseInt(a / 6000000)
      let s = parseInt((a / 100000) % 60)
      if (min < 10) {
        min = '0' + min.toString()
      } else {
        min = min.toString()
      }
      if (s < 10) {
        s = '0' + s.toString()
      } else {
        s = s.toString()
      }
      this.start = `${min}:${s}`
      return `${min}:${s}`
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-page {
  display: flex;
  align-items: center;
  height: 40px;
  .player {
    width: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn-prev {
      display: block;
      width: 19px;
      height: 20px;
      background-image: url(../assets/player.png);
      background-position: 0 -30px;
    }
    .btn-play {
      display: block;
      width: 21px;
      height: 29px;
      background-image: url(../assets/player.png);
      background-position: 0 0;
    }
    .btn-pause {
      background-position: -30px 0;
    }
    .btn-next {
      display: block;
      width: 19px;
      height: 20px;
      background-image: url(../assets/player.png);
      background-position: 0 -52px;
    }
    .icon_txt {
      font: 0/0 a;
    }
  }
  .player-music {
    margin: 0 50px;
    display: flex;
    width: 400px;
    .el-slider {
      flex: 1;
    }
    .player-music-start {
      color: #fff;
      line-height: 40px;
      margin: 0 10px;
      font-size: 13px;
    }
    .player-music-end {
      color: #fff;
      line-height: 40px;
      margin: 0 5px;
      font-size: 13px;
    }
  }
  .player-voice {
    width: 100px;
    display: flex;
    align-items: center;
    .btn-voice {
      display: block;
      width: 26px;
      height: 21px;
      background-image: url(../assets/player.png);
      background-position: 0 -144px;
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
