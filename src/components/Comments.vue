<template>
  <div class="comments-page">
    <div class="c-top">
      <h2 class="c-title">评论</h2>
      <span class="c-count">共{{ comments.total }}条评论</span>
    </div>
    <!-- 添加评论 -->
    <div class="c-input">
      <el-input
        type="textarea"
        placeholder="期待你的神评论……"
        v-model="textareaC"
        maxlength="140"
        show-word-limit
        :rows="3"
      >
      </el-input>
      <a href="javascript:;" class="c-replay" @click="toComment">发表评论</a>
    </div>
    <!-- 精彩评论 -->
    <div v-if="comments.hotComments">
      <div v-if="comments.hotComments == 0"></div>
      <div class="hotcomments" v-else>
        <h2 class="c-type">精彩评论</h2>
        <!-- 评论 -->
        <ul class="h-list">
          <li
            class="h-list-item"
            v-for="(item, index) in comments.hotComments"
            :key="item.commentId"
          >
            <!-- 头像 -->
            <router-link
              :to="{ path: '/User', query: { uid: item.user.userId } }"
              ><img class="h-avatar" :src="item.user.avatarUrl"
            /></router-link>
            <!-- 详情 -->
            <div class="h-details">
              <router-link
                :to="{ path: '/User', query: { uid: item.user.userId } }"
                class="hd-name"
                >{{ item.user.nickname }}</router-link
              >
              <!-- 回复评论 -->
              <div class="hd-reply" v-if="item.beReplied.length > 0">
                <p class="hdr-content">
                  回复
                  <router-link
                    :to="{
                      path: '/User',
                      query: { uid: item.beReplied[0].user.userId }
                    }"
                    class="hdr-nickname"
                    >@{{ item.beReplied[0].user.nickname }}</router-link
                  >:
                  <span class="hdr-subcomment">{{ item.content }}</span>
                </p>
                <p class="hdr-history">{{ item.beReplied[0].content }}</p>
              </div>
              <!-- 普通评论 -->
              <p class="hd-content" v-else>
                {{ item.content }}
              </p>
              <div class="hd-info">
                <span class="hd-time" href="">{{ item.time }}</span>
                <div class="hd-option">
                  <!-- <a href="">举报</a> -->
                  <a
                    :class="{ 'hd-praise': item.ispraise }"
                    href="javascript:;"
                    @click="toPraise(item, index)"
                    >点赞({{ item.likedCount }})</a
                  >
                  <a href="javascript:;" @click="showReply(index)">回复</a>
                </div>
              </div>
              <!-- @回复 -->
              <div class="hd-input" :class="replyc === index ? 'hdi-show' : ''">
                <el-input
                  type="textarea"
                  placeholder="回复"
                  v-model="textareaR"
                  maxlength="140"
                  show-word-limit
                  :rows="3"
                >
                </el-input>
                <div class="hdi-option">
                  <a
                    href="javascript:;"
                    class="hdi-reply"
                    @click="toReply(item)"
                    >回复</a
                  >
                  <a href="javascript:;" class="hdi-cancel" @click="toCancel"
                    >取消</a
                  >
                </div>
              </div>
            </div>
          </li>
        </ul>
        <!-- 加载更多 -->
        <div v-if="comments.moreHot" class="h-show-more">
          <a>点击加载更多>></a>
        </div>
        <!-- 加载完毕 -->
        <div v-else class="c-all">
          <span class="ca-link">—— 精彩评论已加载完毕 ——</span>
        </div>
      </div>
    </div>
    <!-- 最新评论 -->
    <div v-if="comments.comments">
      <div v-if="comments.comments == 0"></div>
      <div class="latestcomments" v-else >
        <h2 class="c-type">最新评论</h2>
        <ul class="h-list">
          <li
            class="h-list-item"
            v-for="(item, index) in comments.comments"
            :key="item.commentId"
          >
            <!-- 头像 -->
            <router-link
              :to="{ path: '/User', query: { uid: item.user.userId } }"
              ><img class="h-avatar" :src="item.user.avatarUrl"
            /></router-link>
            <!-- 详情 -->
            <div class="h-details">
              <router-link
                :to="{ path: '/User', query: { uid: item.user.userId } }"
                class="hd-name"
                >{{ item.user.nickname }}</router-link
              >
              <!-- 回复评论 -->
              <div class="hd-reply" v-if="item.beReplied.length > 0">
                <p class="hdr-content">
                  回复
                  <router-link
                    :to="{
                      path: '/User',
                      query: { uid: item.beReplied[0].user.userId }
                    }"
                    class="hdr-nickname"
                    >@{{ item.beReplied[0].user.nickname }}</router-link
                  >:
                  <span class="hdr-subcomment">{{ item.content }}</span>
                </p>
                <p class="hdr-history">{{ item.beReplied[0].content }}</p>
              </div>
              <!-- 普通评论 -->
              <p class="hd-content" v-else>
                {{ item.content }}
              </p>
              <div class="hd-info">
                <span class="hd-time" href="">{{ item.time }}</span>
                <div class="hd-option">
                  <!-- <a href="">举报</a> -->
                  <a
                    :class="{ 'hd-praise': item.ispraise }"
                    href="javascript:;"
                    @click="toPraise(item, index, 'comments')"
                    >点赞({{ item.likedCount }})</a
                  >
                  <a href="javascript:;" @click="showReply(index)">回复</a>
                </div>
              </div>
              <!-- @回复 -->
              <div class="hd-input" :class="replyc === index ? 'hdi-show' : ''">
                <el-input
                  type="textarea"
                  placeholder="回复"
                  v-model="textareaR"
                  maxlength="140"
                  show-word-limit
                  :rows="3"
                >
                </el-input>
                <div class="hdi-option">
                  <a
                    href="javascript:;"
                    class="hdi-reply"
                    @click="toReply(item)"
                    >回复</a
                  >
                  <a href="javascript:;" class="hdi-cancel" @click="toCancel"
                    >取消</a
                  >
                </div>
              </div>
            </div>
          </li>
        </ul>
        <!-- 分页 -->
        <el-pagination
          v-if="comments.comments.length > 19"
          background
          layout="prev, pager, next"
          :total="100"
        >
        </el-pagination>
        <!-- 加载完毕 -->
        <div v-else class="c-all">
          <span class="ca-link">—— 以上为全部评论 ——</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      replyc: -1,
      textareaR: '',
      textareaC: ''
    }
  },
  computed: {
    comments() {
      return this.$store.state.comments
    }
  },
  methods: {
    // 添加评论
    toComment() {
      this.$store.commit('addCommentM', this.textareaC)
      this.textareaC = ''
    },
    // 点赞
    toPraise(item, index, type) {
      // 点赞样式
      item.ispraise
        ? this.$set(item, 'ispraise', false)
        : this.$set(item, 'ispraise', true)
      // 点赞数
      this.$store.commit('toPraiseM', { index: index, type: type })
    },
    // 回复
    toReply(item) {
      this.replyc = -1
      this.$store.commit('toReplyCommentM', {
        item: item,
        text: this.textareaR
      })
      this.textareaR = ''
    },
    // 取消回复
    toCancel() {
      this.replyc = -1
      this.textareaR = ''
    },
    // 显示回复
    showReply(index) {
      this.replyc = index
    }
  }
}
</script>

<style scoped lang="scss">
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
// 添加评论
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
// 加载更多
.h-show-more {
  display: flex;
  justify-content: center;
  cursor: pointer;
  a {
    color: #999;
    font-size: 14px;
    line-height: 24px;
    &:hover {
      color: #2caf6f;
    }
  }
}
// 分页
.el-pagination {
  display: flex;
  justify-content: center;
}
// 加载完毕
.c-all {
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: #999;
}
// 评论类型
.c-type {
  font-weight: 400;
  font-size: 16px;
  line-height: 34px;
  border-bottom: 1px #ededed solid;
}
// 评论列表
.h-list {
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
</style>
