<template>
  <div class="album-page" v-if="album">
    <!-- 专辑信息 -->
    <div class="p-data">
      <img :src="album.picUrl + '?param=400y400'" class="data-photo" />
      <div class="p-content">
        <!-- 标题 -->
        <div class="p-main">
          <el-tag type="danger">专辑</el-tag>
          <h2 class="p-title">{{ album.name }}</h2>
        </div>
        <!-- 操作 -->
        <div class="p-actions">
          <a href="javascript:;" class="p-btn btn-allplay"
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
        <router-link
          class="nickname"
          :to="{ path: '/Singer', query: { id: album.artist.id } }"
          >歌手: {{ album.artist.name }}</router-link
        >
        <span class="time">时间: {{ album.publishTime }}</span>
      </div>
    </div>
    <!-- 导航 -->
    <div class="nav">
      <el-menu :default-active="this.$route.meta.title" mode="horizontal">
        <el-menu-item
          v-for="(item, index) in navdata"
          :key="index"
          :index="item.name"
          @click="toChange(item.path)"
          >{{ item.name }}</el-menu-item
        >
      </el-menu>
    </div>
    <!-- 更多信息 -->
    <div class="singer-more">
      <router-view />
    </div>
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
export default {
  data() {
    return {
      navdata: [
        { name: '歌曲列表', path: '/Album/Songs' },
        { name: '评论', path: '/Album/Comments' },
        { name: '专辑详情', path: '/Album/Details' }
      ],
      album: null
    }
  },
  mounted() {
    // 获取歌单列表
    api.getAlbum(this.$route.query.id).then(val => {
      this.album = val.data.album
      this.album.publishTime = utils.formatDate(this.album.publishTime)
    })
  },
  methods: {
    toChange(path) {
      this.$router.push({ path: path, query: { id: this.$route.query.id } })
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
.album-page {
  // 歌单信息
  .p-data {
    display: flex;
    // 右侧图
    .data-photo {
      width: 250px;
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
          width: 420px;
        }
        .p-count {
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
      .nickname {
        font-size: 14px;
        color: #999;
        margin: 5px 0;
      }
      .time {
        font-size: 14px;
        color: #999;
        margin: 5px 0;
      }
    }
  }
  .p-icon {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    cursor: pointer;
  }
  // 歌单列表
  .p-list {
    margin: 20px 0;
  }
}
// 导航
.nav {
  display: flex;
  border-bottom: solid 1px #e6e6e6;
  .el-menu--horizontal {
    border: none;
  }
}
</style>
