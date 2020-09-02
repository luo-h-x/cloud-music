<template>
  <div class="latestmusic">
    <div class="s-title">
      <h3>最新音乐</h3>
      <router-link to="/Discover/LatestMusic?type=0">更多>></router-link>
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
        <div class="lm-img" @click="playSong(index)">
          <img class="lm-img-main" :src="item.picUrl + '?param=60y60'" />
          <img class="lm-img-play" src="../../../assets/play.svg" alt="" />
        </div>
        <!-- 歌曲信息 -->
        <div class="lm-information">
          <a
            href="javascript:;"
            @dblclick="playSong(index)"
            class="lm-i-title"
            >{{ item.name }}</a
          >
          <router-link
            :to="{ path: '/Singer', query: { id: item.song.artists[0].id } }"
            class="lm-i-singer"
            >{{ item.song.artists[0].name }}</router-link
          >
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
    api.getLatest().then(val => {
      this.latestList = val.data.result
    })
  },
  methods: {
    playSong(index) {
      let data = {}
      data.currentIndex = index
      data.ids = this.latestList[0].id
      this.latestList.forEach(item => {
        data.ids += ',' + item.id
      })
      this.$store.dispatch('querySongsA', data)
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
    overflow: hidden;
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
        cursor: pointer;
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
          cursor: default;
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
