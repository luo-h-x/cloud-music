<template>
  <div class="playList-page" v-if="detailInfo">
    <!-- 歌单信息 -->
    <div class="p-data">
      <img :src="detailInfo.coverImgUrl" class="data-photo" />
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
      <el-table :data="tableData" stripe border style="width: 100%">
        <!-- <el-table-column prop="number" label=""> </el-table-column> -->
        <el-table-column type="index"> </el-table-column>
        <el-table-column label="操作">
          <template>
            <img class="p-icon" src="../../assets/like.svg" alt="喜欢" />
            <img class="p-icon" src="../../assets/download.svg" alt="下载" />
            <img class="p-icon" src="../../assets/share.svg" alt="下载" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="音乐标题"> </el-table-column>
        <el-table-column prop="ar[0].name" label="歌手"> </el-table-column>
        <el-table-column prop="al.name" label="专辑"> </el-table-column>
        <el-table-column prop="dt" label="时长"> </el-table-column>
      </el-table>
    </div>
    <!-- 评论 -->
    <div class="p-comment" v-if="comment">
      <div class="c-top">
        <h2 class="c-title">评论</h2>
        <span class="c-count">共{{ comment.total }}条评论</span>
      </div>
      <!-- 输入评论 -->
      <div class="c-input">
        <el-input
          type="textarea"
          placeholder="期待你的神评论……"
          v-model="textarea"
          maxlength="140"
          show-word-limit
          :rows="3"
        >
        </el-input>
        <a href="javascript:;" class="c-replay" @click="toComment">发表评论</a>
      </div>
      <!-- 精彩评论 -->
      <hot-comments
        v-if="comment.hotComments.length > 0"
        :hotComments="comment.hotComments"
        @addpraise="addpraise"
        @toCommentReply="toCommentReply"
      />
      <!-- 最新评论 -->
      <Comments
        @addpraise="addpraise"
        @toCommentReply="toCommentReply"
        :comments="comment.comments"
      />
    </div>
  </div>
</template>

<script>
import api from '../../api/discover'
import utils from '../../utils/common'
import Comments from './Comments'
import HotComments from './HotComments'
export default {
  components: {
    Comments,
    HotComments
  },
  data() {
    return {
      tableData: null,
      textarea: '',
      detailInfo: null,
      comment: null
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
    api.getComments(this.$route.query.id).then(val => {
      this.comment = val.data
      // 时间戳 => 日期
      this.comment.hotComments.forEach(item => {
        item.time = utils.formatDate(item.time, 1)
      })
      this.comment.comments.forEach(item => {
        item.time = utils.formatDate(item.time, 1)
      })
    })
  },
  methods: {
    // 添加评论
    toComment() {
      if (this.textarea) {
        // 添加评论
        this.comment.comments.unshift({
          content: this.textarea,
          likedCount: 0,
          commentId: this.comment.comments.length + 1,
          time: new Date().toLocaleString(),
          beReplied: [],
          user: {
            nickname: '默认名',
            avatarUrl:
              'http://p1.music.126.net/KxePid7qTvt6V2iYVy-rYQ==/109951165050882728.jpg',
            userId: 1
          }
        })
        // 评论数加一
        this.comment.total += 1
        // 清空评论
        this.textarea = ''
        // 通知
        this.$notify({
          title: '成功',
          message: '评论成功',
          type: 'success',
          duration: 2000,
          position: 'top-left'
        })
      } else {
        this.$alert('请输入内容!!', '', {
          confirmButtonText: '确定'
        })
      }
    },
    // 点赞
    addpraise(index, type) {
      if (type === 'comments') {
        !this.comment.comments[index].ispraise
          ? (this.comment.comments[index].likedCount -= 1) // 取消点赞
          : (this.comment.comments[index].likedCount += 1)
      } else {
        !this.comment.hotComments[index].ispraise
          ? (this.comment.hotComments[index].likedCount -= 1) // 取消点赞
          : (this.comment.hotComments[index].likedCount += 1)
      }
    },
    // @回复评论
    toCommentReply(item, text) {
      if (text) {
        // 添加评论
        this.comment.comments.unshift({
          content: text,
          likedCount: 0,
          commentId: this.comment.comments.length + 10,
          time: new Date().toLocaleString(),
          beReplied: [
            {
              user: {
                nickname: item.user.nickname
              },
              content: item.content
            }
          ],
          user: {
            nickname: '默认名',
            avatarUrl:
              'http://p1.music.126.net/KxePid7qTvt6V2iYVy-rYQ==/109951165050882728.jpg',
            userId: 1
          }
        })
        // 评论数加一
        this.comment.total += 1
        // 清空评论
        this.textarea = ''
        // 通知
        this.$notify({
          title: '成功',
          message: '评论成功',
          type: 'success',
          duration: 2000,
          position: 'top-left'
        })
      } else {
        this.$alert('请输入内容!!', '', {
          confirmButtonText: '确定'
        })
      }
    },
    toTag(tag) {
      api.getTag(tag).then(val => {
        let data = val.data.playlists
        data.forEach(item => {
          item.playCount = utils.countToString(item.playCount)
        })
        sessionStorage.setItem(tag, JSON.stringify(data))
        this.$router.push('/Discover/SongList')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
  // 歌单列表
  .p-list {
    margin: 20px 0;
  }
  // 评论
  .p-comment {
    display: flex;
    flex-direction: column;
    .c-top {
      display: flex;
      align-items: center;
      .c-title {
        font-size: 24px;
        font-weight: 400;
        line-height: 58px;
      }
      .c-count {
        color: #999;
        font-size: 14px;
        margin-left: 12px;
      }
    }
    // 输入评论
    .c-input {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .c-replay {
        line-height: 27px;
        border: 1px solid #31c27c;
        background-color: #31c27c;
        color: #fff;
        margin: 10px 0;
      }
    }
    // 评论类型
    ::v-deep .c-type {
      font-weight: 400;
      font-size: 16px;
      line-height: 34px;
      border-bottom: 1px #ededed solid;
    }
    // 评论列表
    ::v-deep .h-list {
      font-size: 14px;
      .h-list-item {
        display: flex;
        align-items: center;
        border-bottom: 1px #ededed solid;
        margin: 10px 0;
        // 头像
        .h-avatar {
          width: 38px;
          height: 38px;
          border-radius: 999px;
          cursor: pointer;
        }
        // 详情
        .h-details {
          width: 100%;
          display: flex;
          flex-direction: column;
          margin-left: 20px;
          .hd-name {
            color: #999;
            line-height: 28px;
          }
          // 普通评论
          .hd-content {
            line-height: 28px;
            width: 80%;
          }
          .hd-info {
            display: flex;
            justify-content: space-between;
            .hd-time {
              line-height: 28px;
              color: #999;
            }
            .hd-option {
              a {
                margin-right: 10px;
                &:hover {
                  color: #2caf6f;
                }
              }
              .hd-praise {
                color: #2caf6f;
              }
            }
          }
          // 回复评论
          .hd-reply {
            .hdr-content {
              width: 80%;
              .hdr-nickname {
                color: #31c27c;
              }
              .hdr-subcomment {
                line-height: 28px;
              }
            }
            .hdr-history {
              border-left: 1px #999 solid;
              margin: 5px 0 4px 12px;
              padding: 0 0 0 10px;
              color: #999;
              width: 80%;
            }
          }
          // @回复
          .hd-input {
            display: none;
            flex-direction: column;
            align-items: flex-end;
            .hdi-option {
              display: flex;
              .hdi-reply {
                width: 50px;
                line-height: 27px;
                text-align: center;
                border: 1px solid #31c27c;
                background-color: #31c27c;
                color: #fff;
                margin: 10px 5px;
              }
              .hdi-cancel {
                width: 50px;
                line-height: 27px;
                text-align: center;
                border: 1px solid #999;
                margin: 10px 5px;
              }
            }
          }
          // 显示回复框
          .hdi-show {
            display: flex;
          }
        }
      }
    }
  }
}
</style>
