<template>
  <div class="musicvideo">
    <div class="s-title">
      <h3>推荐MV</h3>
      <span><router-link to="/Discover/MusicVideo">更多>></router-link></span>
    </div>
    <ul class="mv-list">
      <li class="mv-list-item" v-for="(item, index) in mvList" :key="index">
        <!-- 图片 -->
        <div
          class="mv-img"
          @mouseenter="copywriterShow(index)"
          @mouseleave="copywriterHide"
        >
          <img class="mv-main" :src="item.picUrl" />
          <div class="mv-info">
            <img class="mv-headset" src="../../../assets/video2.svg" alt="" />
            <span class="mv-count">{{ item.playCount }}</span>
          </div>
          <div
            class="mv-copywriter"
            :class="active === index ? 'mvc-show' : ''"
          >
            <span class="mvc-text">{{ item.copywriter }}</span>
          </div>
        </div>
        <!-- 简介 -->
        <div class="mv-information">
          <a class="mv-i-title">{{ item.name }}</a>
          <a class="mv-i-singer">{{ item.artistName }}</a>
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
      mvList: null,
      active: -1
    }
  },
  mounted() {
    // 获取推荐mv
    if (sessionStorage.getItem('mv')) {
      this.mvList = JSON.parse(sessionStorage.getItem('mv'))
    } else {
      api.getMV().then(val => {
        this.mvList = val.data.result
        this.mvList.pop()
        sessionStorage.setItem('mv', JSON.stringify(this.mvList))
      })
    }
  },
  methods: {
    copywriterShow(index) {
      this.active = index
    },
    copywriterHide() {
      this.active = -1
    }
  }
}
</script>

<style lang="scss" scoped>
//推荐MV
.musicvideo {
  .mv-list {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    .mv-list-item {
      width: 33%;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      .mv-img {
        position: relative;
        overflow: hidden;
        .mv-main {
          width: 100%;
          display: block;
        }
        .mv-info {
          position: absolute;
          right: 0;
          top: 0;
          display: flex;
          align-items: center;
          background: rgba(0, 0, 0, 0.2);
          .mv-headset {
            width: 20px;
            height: 20px;
          }
          .mv-count {
            color: #fff;
            font-size: 12px;
            line-height: 30px;
            margin-left: 5px;
          }
        }
        // 编辑推荐
        .mv-copywriter {
          width: 100%;
          position: absolute;
          bottom: -45px;
          transition: bottom 0.75s;
          background: rgba(0, 0, 0, 0.4);
          .mvc-text {
            color: #fff;
            font-size: 12px;
          }
        }
        // 编辑推荐显示
        .mvc-show {
          bottom: 0;
          transition: bottom 0.75s;
        }
      }
      .mv-information {
        flex: 1;
        display: flex;
        flex-direction: column;
        // .mv-i-title {
        // }
        .mv-i-singer {
          color: #897373;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
