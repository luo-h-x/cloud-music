<template>
  <div class="v-detail" v-if="detail">
    <div style="display: flex;">
      <div class="left">
        <!-- 标题 -->
        <div class="tit">
          <el-tag type="danger">MV</el-tag>
          <h3 class="tc">{{ detail.data.name }}</h3>
          <router-link
            :to="{ path: '/Singer', query: { id: detail.data.artistId } }"
            class="name"
            >{{ detail.data.artistName }}</router-link
          >
        </div>
        <!-- 视频 -->
        <video
          controls
          style="width:550px;height: 310px;"
          autoplay
          :src="url"
        ></video>
      </div>
      <div class="right">
        <div class="introduce">
          <div>
            <h3 class="tit">视频介绍</h3>
            <p class="info">
              <span class="time">{{ detail.data.publishTime }}</span>
              <span class="count">播放次数:{{ detail.data.playCount }}</span>
            </p>
            <p class="content">
              简介:
              {{ detail.data.desc }}
            </p>
            <!-- <div class="tags">
            <span>标签:</span>
            <a class="tag">动漫</a>
            <a class="tag">影视</a>
          </div> -->
          </div>
          <!-- 相关推荐 -->
          <div class="recommend"></div>
        </div>
      </div>
    </div>
    <!-- 评论 -->
    <comments />
  </div>
</template>

<script>
import api from '../../api/discover'
import utils from '../../utils/common'
import Comments from '../../components/Comments'
export default {
  components: { Comments },
  data() {
    return {
      url: null,
      detail: null
    }
  },
  mounted() {
    // mv url
    api.getUrlMv(this.$route.query.id).then(val => {
      this.url = val.data.data.url
    })
    // mv 信息
    api.getMvD(this.$route.query.id).then(val => {
      this.detail = val.data
    })
    // 评论
    api.getMvC(this.$route.query.id).then(val => {
      let comments = val.data
      // 时间戳 => 日期
      comments.hotComments.forEach(item => {
        item.time = utils.formatDate(item.time, 1)
      })
      comments.comments.forEach(item => {
        item.time = utils.formatDate(item.time, 1)
      })
      this.$store.dispatch('queryCommetsA', comments)
    })
    let audio = document.getElementsByClassName('audio')[0]
    audio.pause()
  },
  beforeDestroy() {
    // let audio = document.getElementsByClassName('audio')[0]
    // audio.play()
  }
}
</script>

<style lang="scss" scoped>
.v-detail {
  display: flex;
  flex-direction: column;
}
.left {
  width: 550px;
  display: flex;
  flex-direction: column;
  .tit {
    display: flex;
    align-items: flex-end;
    height: 30px;
    margin-bottom: 10px;
    .tc {
      margin-left: 10px;
      font-size: 18px;
      font-weight: normal;
    }
    .name {
      margin-left: 5px;
      font-size: 14px;
      color: #999;
    }
  }
}
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  .introduce {
    display: flex;
    flex-direction: column;
    .tit {
      font-size: 18px;
      line-height: 40px;
      font-weight: normal;
      border-bottom: 1px #ccc solid;
    }
    .info {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #999;
      margin: 5px 0;
    }
    .content {
      line-height: 22px;
      font-size: 14px;
      margin: 15px 0;
    }
    // .tags {
    //   font-size: 14px;
    //   color: #999;
    //   .tag {
    //     margin-left: 5px;
    //     color: #3a8ee6;
    //   }
    // }
  }
}
</style>
