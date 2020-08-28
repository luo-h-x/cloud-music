<template>
  <div class="playList-page" v-if="detailInfo">
    <!-- 歌单信息 -->
    <div class="p-data">
      <img
        :src="detailInfo.coverImgUrl + '?param=400y400'"
        class="data-photo"
      />
      <div class="p-content">
        <!-- 标题 -->
        <div class="p-main">
          <el-tag type="danger">歌单</el-tag>
          <h2 class="p-title">{{ detailInfo.name }}</h2>
          <div class="p-count">
            <div class="left">
              <span>歌曲数</span>
              <span>{{ detailInfo.trackCount }}</span>
            </div>
            <div class="right">
              <span>播放数</span>
              <span>{{ detailInfo.playCount }}</span>
            </div>
          </div>
        </div>
        <!-- 作者 -->
        <div class="p-creator">
          <router-link
            :to="{ path: '/User', query: { uid: detailInfo.creator.userId } }"
            ><img :src="detailInfo.creator.avatarUrl" class="avatar"
          /></router-link>
          <router-link
            :to="{ path: '/User', query: { uid: detailInfo.creator.userId } }"
            class="name"
            >{{ detailInfo.creator.nickname }}</router-link
          >
          <span class="time">{{ detailInfo.createTime }} 创建</span>
        </div>
        <!-- 操作 -->
        <div class="p-actions">
          <a @click="playSong(0)" href="javascript:;" class="p-btn btn-allplay"
            ><img
              src="../../assets/play.svg"
              class="p-icon img-play"
            />播放全部</a
          >
          <a href="javascript:;" class="p-btn btn-collect"
            ><img src="../../assets/like.svg" class="p-icon img-like" />收藏</a
          >
          <a href="javascript:;" class="p-btn btn-download"
            ><img
              src="../../assets/download.svg"
              class="p-icon img-download"
            />下载</a
          >
        </div>
        <!-- 标签 -->
        <div class="p-tag" v-if="detailInfo.tags.length > 0">
          <span>标签:</span>
          <a
            href="javascript:;"
            class="tag-info"
            v-for="(tag, i) in detailInfo.tags"
            :key="i"
            @click="toTag(tag)"
            >{{ tag }}</a
          >
        </div>
        <!-- 简介 -->
        <p class="p-describe">
          <b>介绍：</b>
          {{ detailInfo.description }}
          <br />
        </p>
      </div>
    </div>
    <!-- 歌单列表 -->
    <div class="p-list">
      <div class="songs-item header">
        <span></span>
        <span>标题</span>
        <span>歌手</span>
        <span>专辑</span>
        <span>时长</span>
      </div>
      <ul class="songs">
        <li class="songs-item" v-for="(item, index) in tableData" :key="index">
          <span class="num">{{ index + 1 }}</span>
          <a
            @dblclick="playSong(index)"
            href="javascript:;"
            title="双击播放"
            class="tit"
            >{{ item.name }}</a
          >
          <router-link
            :to="{ path: '/Singer', query: { id: item.ar[0].id } }"
            class="sa-title"
            >{{ item.ar[0].name }}</router-link
          >
          <router-link
            :to="{ path: '/Album', query: { id: item.al.id } }"
            class="sa-title"
            >{{ item.al.name }}</router-link
          >
          <span class="dt">{{ item.dt }}</span>
        </li>
      </ul>
    </div>
    <!-- 评论 -->
    <comments />
  </div>
  <div
    class="load"
    v-loading="true"
    element-loading-text="努力加载中"
    element-loading-background="#fff"
    v-else
  ></div>
</template>

<script>
import api from '../../api/discover'
import utils from '../../utils/common'
import Comments from '../../components/Comments'
export default {
  components: {
    Comments
  },
  data() {
    return {
      tableData: null,
      detailInfo: null
    }
  },
  mounted() {
    // 获取歌单列表
    api.getDetail(this.$route.query.id).then(val => {
      this.detailInfo = val.data.playlist
      this.tableData = val.data.playlist.tracks
      // 123456 => 12万
      this.detailInfo.playCount = utils.countToString(this.detailInfo.playCount)
      // 时间戳 => 日期
      this.detailInfo.createTime = utils.formatDate(this.detailInfo.createTime)
      this.tableData.forEach(item => {
        item.dt = utils.formatDay(item.dt)
      })
    })
  },
  methods: {
    // 标签歌单
    toTag(tag) {
      this.$router.push({
        path: '/Discover/SongList',
        query: { cat: tag, limit: 32 }
      })
    },
    // 播放音乐
    playSong(index) {
      let data = {}
      data.currentIndex = index
      data.ids = this.tableData[0].id
      this.tableData.forEach(item => {
        data.ids += ',' + item.id
      })
      this.$store.dispatch('querySongsA', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.load {
  width: 100%;
  height: calc(100vh - 120px);
  position: absolute;
}
.playList-page {
  // 歌单信息
  .p-data {
    display: flex;
    align-items: center;
    // 右侧图
    .data-photo {
      width: 250px;
      // height: 250px;
      margin: 0 25px;
    }
    // 左侧内容
    .p-content {
      display: flex;
      flex-direction: column;
      // 标题
      .p-main {
        display: flex;
        justify-content: space-between;
        .p-title {
          // line-height: 24px;
          font-size: 20px;
          font-weight: normal;
          margin: 0 20px;
        }
        .p-count {
          width: 150px;
          display: flex;
          color: #ccc;
          .left {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            margin: 0 10px;
          }
          .right {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            margin: 0 5px;
          }
          span {
            font-size: 14px;
          }
        }
      }
      // 作者
      .p-creator {
        display: flex;
        align-items: center;
        margin: 10px 0;
        .avatar {
          width: 35px;
          height: 35px;
          cursor: pointer;
        }
        .name {
          margin-left: 15px;
          color: #999;
        }
        .time {
          margin-left: 15px;
          font-size: 12px;
        }
      }
      // 操作
      .p-actions {
        display: flex;
        align-items: center;
        margin: 10px 0;
        .p-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 122px;
          border: 1px solid #c9c9c9;
          font-size: 14px;
          border-radius: 2px;
          white-space: nowrap;
          margin-right: 10px;
          line-height: 38px;
        }
        .btn-collect:hover {
          background: rgba(0, 0, 0, 0.1);
        }
        .btn-download:hover {
          background: rgba(0, 0, 0, 0.1);
        }
        .btn-allplay {
          border: 1px solid #31c27c;
          background-color: #31c27c;
          color: #fff;
        }
      }
      // 标签
      .p-tag {
        font-size: 14px;
        .tag-info {
          color: #31c27c;
          margin-left: 5px;
        }
      }
      // 简介
      .p-describe {
        margin-top: 10px;
        color: #666;
        font-size: 14px;
      }
    }
  }
  .p-icon {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    cursor: pointer;
  }
  // 歌单
  .songs-item {
    display: grid;
    grid-template-columns: 0.5fr 3fr 1.5fr 3fr 1fr;
    grid-column-gap: 10px;
    align-items: center;
    margin: 10px 0;
    font-size: 14px;
    color: #999;
    height: 50px;
    &:nth-child(even) {
      background: #fafafa;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.1) !important;
    }
    .sa-pic {
      width: 50px;
    }
    .tit {
      cursor: default;
    }
  }
  // 标题
  .header {
    margin-top: 20px;
    border: 1px solid #ccc;
    & > span {
      line-height: 50px;
      padding-left: 10px;
      border-left: 1px solid #ccc;
    }
  }
}
</style>
