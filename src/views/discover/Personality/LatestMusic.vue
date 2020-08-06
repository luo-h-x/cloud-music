<template>
  <div class="latestmusic">
    <div class="s-title">
      <h3>最新音乐</h3>
      <span><router-link to="/Discover/LatestMusic">更多>></router-link></span>
    </div>
    <ul class="lm-list">
      <li
        class="lm-list-item"
        v-for="(item, index) in latestList"
        :key="item.id"
      >
        <!-- 序号 -->
        <div class="lm-show">
          <span class="lm-s-number">0{{ index + 1 }}</span>
        </div>
        <!-- 图片 -->
        <div class="lm-img">
          <img class="lm-img-main" :src="item.picUrl" />
          <img class="lm-img-play" src="../../../assets/play.svg" alt="" />
        </div>
        <!-- 歌曲信息 -->
        <div class="lm-information">
          <span class="lm-i-title">{{ item.name }}</span>
          <span class="lm-i-singer">{{ item.song.artists[0].name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../../../api/discover'
export default {
  data() {
    return {
      latestList: null
    }
  },
  mounted() {
    if (sessionStorage.getItem('newsong')) {
      this.latestList = JSON.parse(sessionStorage.getItem('newsong'))
    } else {
      api.getLatest().then(val => {
        this.latestList = val.data.result
        sessionStorage.setItem('newsong', JSON.stringify(this.latestList))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
//最新音乐
.latestmusic {
  .lm-list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    border: 1px solid #ccc;
    height: 280px;
    .lm-list-item {
      display: flex;
      width: 50%;
      padding-top: 1%;
      &:hover {
        background: rgba(0, 0, 0, 0.2) !important;
      }
      &:nth-child(odd) {
        background: #f4f4f5;
      }
      .lm-show {
        width: 40px;
        text-align: center;
        .lm-s-number {
          line-height: 50px;
        }
      }
      // 图片
      .lm-img {
        position: relative;
        width: 50px;
        height: 50px;
        .lm-img-main {
          width: 100%;
          height: 100%;
        }
        .lm-img-play {
          width: 20px;
          height: 20px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      // 歌曲信息
      .lm-information {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 3%;
        .lm-i-title {
          line-height: 30px;
        }
        .lm-i-singer {
          line-height: 30px;
          font-size: 14px;
          color: #897373;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
