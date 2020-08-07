<template>
  <div class="singer-page" v-if="singer">
    <!-- 歌手 -->
    <div class="singer">
      <!-- 右 -->
      <div class="singer-content">
        <img
          :src="singer.img1v1Url"
          class="singer-pic"
        />
        <router-link
            v-if="singer.accountId"
          :to="{ path: '/User', query: { uid: singer.accountId } }"
          class="singer-user"
        >
          <img class="su-img" src="../../assets/person.svg" alt="" />
          <span class="su-title">个人主页 ></span>
        </router-link>
      </div>
      <!-- 左 -->
      <div class="singer-relevant">
        <div class="sr-title">
          <el-tag type="danger">歌手</el-tag>
          <h2 class="sr-name">{{singer.name}}</h2>
          <a href="javascript:;" class="btn-collect"
            ><img src="/img/like.cccf4193.svg" class="img-like" />收藏</a
          >
        </div>
        <div class="sr-count">
          <span class="count">单曲数: {{singer.musicSize}}</span>
          <span class="count">专辑数: {{singer.albumSize}}</span>
          <span class="count">MV数: {{singer.mvSize}}</span>
        </div>
      </div>
    </div>
    <!-- 导航 -->
    <div class="nav">
      <el-menu :default-active="this.$route.meta.title" mode="horizontal">
        <el-menu-item
          v-for="(item, index) in discover"
          :key="index"
          :index="item.name"
          @click="toChange(item.path)"
          >{{ item.name }}</el-menu-item
        >
      </el-menu>
    </div>
    <!-- 更多信息 -->
    <div class="singer-more">
      <router-view/>
    </div>
  </div>
</template>

<script>
import api from '../../api/singer'
export default {
  data() {
    return {
      discover: [
        { name: '专辑', path: '/Singer/Album' },
        { name: 'MV', path: '/Singer/MV' },
        { name: '歌手详情', path: '/Singer/Details' },
        { name: '相似歌手', path: '/Singer/Resemble' }
      ],
      singer: null
    }
  },
  mounted () {
    api.getSinger(this.$route.query.id).then(val => {
      this.singer = val.data.artist
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
.singer-page {
  // 歌手
  .singer {
    display: flex;
    .singer-content {
      position: relative;
      .singer-pic {
        width: 250px;
        margin: 0 25px;
      }
      .singer-user {
        width: 100px;
        position: absolute;
        left: 50%;
        bottom: 50px;
        transform: translateX(-50%);
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        .su-img {
          width: 20px;
        }
        .su-title {
          margin-left: 5px;
          color: #fff;
          font-size: 12px;
          line-height: 30px;
        }
      }
    }
    .singer-relevant {
      width: 100%;
      .sr-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        .sr-name {
          font-size: 20px;
          font-weight: normal;
          width: 75%;
        }
        .btn-collect {
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 81px;
          border: 1px solid #c9c9c9;
          font-size: 14px;
          border-radius: 2px;
          white-space: nowrap;
          margin-right: 10px;
          line-height: 30px;
          &:hover {
            background: rgba(0, 0, 0, 0.1);
          }
          .img-like {
            width: 16px;
            margin-right: 5px;
          }
        }
      }
      .sr-count {
        display: flex;
        flex-direction: column;
        font-size: 14px;
        color: #999;
        .count {
          margin-top: 10px;
        }
      }
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
}
</style>
