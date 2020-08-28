<template>
  <div class="user-page" v-if="userInfo">
    <div class="user">
      <div class="u-right">
        <!-- 头像 -->
        <img :src="userInfo.profile.avatarUrl" class="avatar-pic" />
        <router-link
          v-if="userInfo.profile.artistId"
          :to="{ path: '/Singer', query: { id: userInfo.profile.artistId } }"
          class="u-singer"
        >
          Ta的歌手页 >
        </router-link>
      </div>

      <!-- 右侧内容 -->
      <div class="u-content">
        <!-- 标题 -->
        <div class="u-info">
          <!-- nickname，sex,level -->
          <h2 class="ui-personal">
            <span class="uip-name">{{ userInfo.profile.nickname }}</span>
            <img
              v-if="userInfo.profile.gender"
              class="uip-sex"
              src="../../assets/man.svg"
            />
            <img v-else class="uip-sex" src="../../assets/woman.svg" />
            <span class="uip-level">LV{{ userInfo.level }}</span>
          </h2>
          <!-- 关注，私信 -->
          <div class="ui-handle">
            <a href="javascript:;" class="uih-btn"
              ><img
                src="../../assets/letter.svg"
                class="p-icon img-letter"
              />发私信</a
            >
            <a href="javascript:;" class="uih-btn"
              ><img
                src="../../assets/follow.svg"
                class="p-icon img-follow"
              />关注</a
            >
          </div>
        </div>
        <!-- 关注动态粉丝 -->
        <ul class="u-statistic">
          <li class="us-item us-item-first">
            <a href="javascript:;" class="us-tab"
              ><strong class="us-follow">{{
                userInfo.profile.eventCount
              }}</strong
              ><span class="us-title">动态</span></a
            >
          </li>
          <li class="us-item">
            <a href="javascript:;" class="us-tab"
              ><strong class="us-follow">{{ userInfo.profile.follows }}</strong
              ><span class="us-title">关注</span></a
            >
          </li>
          <li class="us-item us-item-last">
            <a href="javascript:;" class="us-tab"
              ><strong class="us-follow">{{
                userInfo.profile.followeds
              }}</strong
              ><span class="us-title">粉丝</span></a
            >
          </li>
        </ul>
        <!-- 社交网络 -->
        <p class="u-contact">
          <span>社交网络: 未绑定</span>
        </p>
        <!-- 所在地区 -->
        <div class="u-place">
          <span>所在地区: 江西省 南昌市</span>
        </div>
        <!-- 个人介绍 -->
        <p class="p-introduce">
          <span v-if="userInfo.profile.signature"
            >个人介绍: {{ userInfo.profile.signature }}</span
          >
          <span v-else>个人介绍: 暂无介绍</span>
        </p>
      </div>
    </div>
    <!-- 创建的歌单 -->
    <div class="u-create" v-if="userList">
      <h3 class="uc-name">{{ userInfo.profile.nickname }}创建的歌单</h3>
      <!-- 歌单 -->
      <ul class="uc-songs">
        <li
          class="uc-songs-item"
          v-for="(item, index) in userList"
          :key="index"
        >
          <img :src="item.coverImgUrl + '?param=130y130'" class="uc-pic" />
          <router-link
            :to="{ path: '/PlayList', query: { id: item.id } }"
            class="uc-title"
            >{{ item.name }}</router-link
          >
          <span class="uc-count">歌曲: {{ item.trackCount }}首</span>
          <span class="uc-creator">by {{ userInfo.profile.nickname }}</span>
          <!-- 收藏数 -->
          <div class="uc-collect">
            <img src="../../assets/collect.svg" class="ucc-icon" />
            <span class="ucc-count">{{ item.subscribedCount }}</span>
          </div>
          <!-- 播放数 -->
          <div class="uc-play">
            <img src="../../assets/play.svg" class="ucp-icon" />
            <span class="ucp-count">{{ item.playCount }}</span>
          </div>
        </li>
      </ul>
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
export default {
  data() {
    return {
      userInfo: null,
      userList: null
    }
  },
  mounted() {
    // 获取用户信息
    api.getUser(this.$route.query.uid).then(val => {
      this.userInfo = val.data
    })
    // 获取创建的歌单
    api.getUserList(this.$route.query.uid).then(val => {
      this.userList = val.data.playlist
    })
  }
}
</script>

<style lang="scss" scoped>
.load {
  width: 100%;
  height: calc(100vh - 120px);
  position: absolute;
}
.user-page {
  .user {
    display: flex;
    margin-bottom: 50px;
  }
  .u-right {
    position: relative;
    // 头像
    .avatar-pic {
      width: 250px;
      height: 250px;
      margin-right: 25px;
    }
    .u-singer {
      width: 100px;
      position: absolute;
      left: 50%;
      bottom: 50px;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.4);
      color: #fff;
      line-height: 28px;
      font-size: 13px;
      border-radius: 10px;
      text-align: center;
    }
  }

  // 主要信息
  .u-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    // 标题
    .u-info {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px #ccc solid;
      .ui-personal {
        display: flex;
        align-items: center;
        // nickname
        .uip-name {
          font-size: 26px;
          font-weight: normal;
          line-height: 30px;
        }
        // sex
        .uip-sex {
          margin: 0 0 0 10px;
          // width: 20px;
          // height: 20px;
        }
        // level
        .uip-level {
          display: inline-block;
          color: #e03a24;
          font-size: 16px;
          font-weight: bold;
          font-style: italic;
          margin: 0 0 0 10px;
        }
      }
      // 关注，私信
      .ui-handle {
        display: flex;
        align-items: center;
        margin: 10px 0;
        .uih-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 80px;
          border: 1px solid #c9c9c9;
          font-size: 14px;
          border-radius: 2px;
          white-space: nowrap;
          margin-right: 10px;
          line-height: 30px;
          &:hover {
            background: rgba(0, 0, 0, 0.1);
          }
          .p-icon {
            width: 25px;
            height: 20px;
            margin-right: 3px;
          }
        }
      }
    }
    // 关注动态粉丝
    .u-statistic {
      display: flex;
      margin: 15px 0;
      .us-item {
        border-right: solid 1px #ccc;
        padding: 0 25px;
        .us-tab {
          display: flex;
          flex-direction: column;
          .us-follow {
            font-size: 24px;
            font-weight: normal;
          }
          .us-title {
            font-size: 14px;
            color: #999;
          }
        }
      }
      .us-item-last {
        border-right: none;
      }
      .us-item-first {
        padding-left: 0;
      }
    }
    // 社交网络
    .u-contact {
      font-size: 14px;
      color: #666;
      margin-bottom: 10px;
    }
    // 所在地区
    .u-place {
      font-size: 14px;
      color: #666;
      margin-bottom: 10px;
    }
    // 个人介绍
    .p-introduce {
      font-size: 14px;
      color: #666;
      margin-bottom: 10px;
    }
  }
  // 创建的歌单
  .u-create {
    .uc-name {
      font-size: 20px;
      line-height: 28px;
      color: #666;
    }
    // 歌单
    .uc-songs {
      display: flex;
      flex-direction: column;
      border: 1px solid #ccc;
      border-top: 3px solid #e63939;
      margin-bottom: 20px;
      .uc-songs-item {
        display: grid;
        grid-template-columns: 1fr 3fr 1.5fr 1.5fr 1fr 1fr;
        align-items: center;
        margin: 10px 0;
        .uc-pic {
          width: 50px;
          margin-left: 10px;
        }
        .uc-title {
          font-size: 14px;
        }
        .uc-count {
          font-size: 14px;
          color: #999;
        }
        .uc-creator {
          font-size: 14px;
          color: #999;
        }
        // 收藏数
        .uc-collect {
          display: flex;
          align-items: center;
          color: #999;
          .ucc-icon {
            width: 20px;
          }
          .ucc-count {
            font-size: 14px;
            margin-left: 3px;
          }
        }
        // 播放数
        .uc-play {
          display: flex;
          align-items: center;
          color: #999;
          font-size: 14px;
          .ucp-icon {
            width: 20px;
          }
          .ucp-count {
            margin-left: 3px;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
