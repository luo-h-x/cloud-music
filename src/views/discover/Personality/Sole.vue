<template>
  <div class="sole">
    <div class="s-title">
      <h3>独家放送</h3>
      <span><router-link to="/Discover/Sole">更多>></router-link></span>
    </div>
    <ul class="sole-list">
      <li class="sole-list-item" v-for="item in soleList" :key="item.id">
        <div class="sole-img">
          <img class="sole-main" :src="item.picUrl" />
          <img class="sole-video" src="../../../assets/video.svg" alt="" />
        </div>
        <a class="sole-title" href="">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../../../api/discover'
export default {
  data() {
    return {
      soleList: null
    }
  },
  mounted() {
    if (sessionStorage.getItem('sole')) {
      this.soleList = JSON.parse(sessionStorage.getItem('sole'))
    } else {
      api.getSole().then(val => {
        this.soleList = val.data.result
        sessionStorage.setItem('sole', JSON.stringify(this.soleList))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
//独家放送
.sole {
  .sole-list {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    .sole-list-item {
      width: 33%;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      .sole-img {
        position: relative;
        overflow: hidden;
        .sole-main {
          width: 100%;
          height: 100%;
          transform: scale(1) translateZ(0);
          transition: transform 0.75s;
          &:hover {
            transform: scale(1.1) translateZ(0);
            transition: transform 0.75s;
          }
        }
        // 视频图标
        .sole-video {
          width: 20px;
          height: 20px;
          position: absolute;
          left: 5%;
          top: 10%;
        }
      }
      .sole-title {
        font-size: 14px;
        color: #303133;
      }
    }
  }
}
</style>
