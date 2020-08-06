<template>
  <div class="radiostation">
    <div class="s-title">
      <h3>主播电台</h3>
      <span><router-link to="/Discover/RadioStation">更多>></router-link></span>
    </div>
    <ul class="rs-list">
      <li class="rs-list-item" v-for="item in stationList" :key="item.id">
        <div class="rs-content">
          <img class="rs-img" :src="item.picUrl" />
          <div class="rs-describe">
            <span class="rs-d-title">{{ item.name }}</span>
          </div>
        </div>
        <a class="rs-title" href="">{{ item.copywriter }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../../../api/discover'
export default {
  data() {
    return {
      stationList: null
    }
  },
  mounted() {
    // 获取推荐电台
    if (sessionStorage.getItem('station')) {
      this.stationList = JSON.parse(sessionStorage.getItem('station'))
    } else {
      api.getStation().then(val => {
        this.stationList = val.data.result
        this.stationList.pop()
        sessionStorage.setItem('station', JSON.stringify(this.stationList))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
//主播电台
.radiostation {
  .rs-list {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    .rs-list-item {
      width: 18%;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      .rs-content {
        position: relative;
        // height: 100%;
        .rs-img {
          width: 100%;
          height: 100%;
          display: block;
        }
        .rs-describe {
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          .rs-d-title {
            color: #fff;
            font-size: 14px;
            margin-left: 2%;
            line-height: 24px;
          }
        }
      }
      .rs-title {
        font-size: 14px;
        color: #303133;
      }
    }
  }
}
</style>
