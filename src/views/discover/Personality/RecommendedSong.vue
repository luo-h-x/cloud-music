<template>
  <div class="recommended-songs">
    <div class="s-title">
      <h3>推荐歌单</h3>
      <span><router-link to="/Discover/SongList">更多>></router-link></span>
    </div>
    <ul class="s-list">
      <li class="s-list-item" v-for="(item, index) in songList" :key="item.id" @click="toPlayList(item.id)">
        <div class="s-content">
          <div
            class="sc-img"
            @mouseenter="playShow(index)"
            @mouseleave="playHide"
          >
            <img class="sc-main" :src="item.picUrl" />
            <img
              class="s-play"
              :class="active === index ? 'sc-show' : ''"
              src="../../../assets/play.svg"
              alt=""
            />
            <!-- 播放数 -->
            <div class="sc-info">
              <img
                class="sc-headset"
                src="../../../assets/headset.svg"
                alt=""
              />
              <span class="sc-count">{{ item.playCount }}</span>
            </div>
          </div>
          <!-- 标题 -->
          <span class="sc-title">{{ item.name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../../../api/discover'
import utils from '../../../utils/common'
export default {
  data() {
    return {
      songList: null,
      scount: null,
      active: -1
    }
  },
  mounted() {
    // 获取歌单
    if (sessionStorage.getItem('song')) {
      this.songList = JSON.parse(sessionStorage.getItem('song'))
    } else {
      api.getList().then(val => {
        this.songList = val.data.result
        this.songList.forEach(item => {
          item.playCount = utils.countToString(item.playCount)
        })
        sessionStorage.setItem('song', JSON.stringify(this.songList))
      })
    }
  },
  methods: {
    playShow(index) {
      this.active = index
    },
    playHide() {
      this.active = -1
    },
    // 跳转歌单详情页
    toPlayList(id) {
      this.$router.push({ path: '/PlayList', query: { id: id } })
    }
  }
}
</script>

<style lang="scss" scoped>
// 推荐歌单
.recommended-songs {
  .s-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 10px 0;
    .s-list-item {
      width: 18%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 16px;
      position: relative;
      cursor: pointer;
      .s-content {
        display: flex;
        flex-direction: column;
        .sc-img {
          position: relative;
          transform: translateY(0);
          transition: transform 0.5s;
          &:hover {
            transform: translateY(-20px);
            transition: transform 0.5s;
          }
          .sc-main {
            width: 100%;
            height: 100%;
          }
          // 播放图标
          .s-play {
            display: none;
            position: absolute;
            right: 5%;
            bottom: 5%;
            width: 24px;
            height: 24px;
          }
          .sc-show {
            display: block;
          }
          // 播放数
          .sc-info {
            position: absolute;
            right: 0;
            top: 0;
            display: flex;
            align-items: center;
            background: rgba(0, 0, 0, 0.2);
            .sc-headset {
              width: 20px;
              height: 20px;
            }
            .sc-count {
              color: #fff;
              font-size: 12px;
              line-height: 30px;
            }
          }
        }
        // 标题
        .sc-title {
          font-size: 14px;
          color: #303133;
        }
      }
    }
  }
}
</style>
