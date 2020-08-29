<template>
  <div class="singer-mv-page" v-if="singerMv.mvs">
    <div
      class="load"
      v-loading="loading"
      element-loading-text="努力加载中"
      element-loading-background="#fff"
      v-if="loading"
    ></div>
    <div :class="{ hide: loading }">
      <ul class="s-mv" v-if="singerMv.mvs.length > 0">
        <li
          class="s-mv-item"
          v-for="(item, index) in singerMv.mvs"
          :key="index"
        >
          <div class="sc-content">
            <img @load="show" class="sc-img " :src="item.imgurl16v9 + '?param=555y340'" />
            <!-- 播放数 -->
            <div class="sc-info">
              <img class="sc-headset" src="../../assets/headset.svg" alt="" />
              <!-- <span class="sc-count">{{ item.playCount }}</span> -->
              <span class="sc-count">{{ item.playCount }}</span>
            </div>
            <!-- 时长 -->
            <div class="sc-duration">
              <span>{{ item.duration }}</span>
            </div>
          </div>
          <!-- <a href="javascript:;" class="sc-title">{{ item.name }}</a> -->
          <a href="javascript:;" class="sc-title">{{ item.name }}</a>
        </li>
      </ul>
      <span v-else>没有相关mv</span>
    </div>
  </div>
</template>

<script>
import api from '../../api/singer'
import util from '../../utils/common'
export default {
  data() {
    return {
      singerMv: [],
      loading: true,
      count: 0
    }
  },
  mounted() {
    api.getSingerMV(this.$route.query.id).then(val => {
      this.singerMv = val.data
      if (this.singerMv.mvs.length === 0) this.loading = false
      this.singerMv.mvs.forEach(item => {
        item.playCount = util.countToString(item.playCount)
        item.duration = util.formatDay(item.duration)
      })
    })
  },
  methods: {
    show() {
      this.count++
      if (this.count === this.singerMv.mvs.length) {
        this.loading = false
      }
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
  height: calc(100vh - 435px);
  position: absolute;
}
.s-mv {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  margin-top: 16px;
  .s-mv-item {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    font-size: 14px;
    .sc-content {
      position: relative;
      .sc-img {
        display: block;
        width: 100%;
        height: 128px;
        object-fit: cover;
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
        }
        .sc-count {
          color: #fff;
          font-size: 12px;
          line-height: 30px;
        }
      }
      // 时长
      .sc-duration {
        position: absolute;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.2);
        color: #fff;
        font-size: 12px;
        line-height: 24px;
        width: 36px;
        text-align: center;
      }
    }
    .sc-title {
      margin-top: 10px;
    }
  }
}
</style>
