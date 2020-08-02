<template>
  <!-- 精彩评论 -->
  <div class="hotcomments">
    <h2 class="c-type">精彩评论</h2>
    <!-- 评论 -->
    <ul class="h-list">
      <li
        class="h-list-item"
        v-for="(item, index) in hotComments"
        :key="item.commentId"
      >
        <!-- 头像 -->
        <img class="h-avatar" :src="item.user.avatarUrl" />
        <!-- 详情 -->
        <div class="h-details">
          <a class="hd-name" href="javascript:;">{{ item.user.nickname }}</a>
          <!-- 回复评论 -->
          <div class="hd-reply" v-if="item.beReplied.length > 0">
            <p class="hdr-content">
              回复
              <a href="javascript:;" class="hdr-nickname"
                >@{{ item.beReplied[0].user.nickname }}</a
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
            <span class="hd-time" href="">2018年3月17日 11:40</span>
            <div class="hd-option">
              <!-- <a href="">举报</a> -->
              <a
                href="javascript:;"
                :class="{ 'hd-praise': item.ispraise }"
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
              v-model="textarea"
              maxlength="140"
              show-word-limit
              :rows="3"
            >
            </el-input>
            <div class="hdi-option">
              <a href="javascript:;" class="hdi-reply" @click="toReply(item)">回复</a>
              <a href="javascript:;" class="hdi-cancel" @click="toCancel"
                >取消</a
              >
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- 加载更多 -->
    <div class="h-show-more" v-if="hotComments.length > 19">
      <a>点击加载更多>></a>
    </div>
    <!-- 加载完毕 -->
    <div class="c-all" v-else>
      <span class="ca-link">—— 精彩评论已加载完毕 ——</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['hotComments'],
  data() {
    return {
      replyc: -1,
      textarea: ''
    }
  },
  methods: {
    // 点赞
    toPraise(item, index) {
      item.ispraise
        ? this.$set(item, 'ispraise', false)
        : this.$set(item, 'ispraise', true)
      this.$emit('addpraise', index, 'hotComments')
    },
    // 回复
    toReply(item) {
      this.replyc = -1
      this.$emit('toCommentReply', item, this.textarea)
      this.textarea = ''
    },
    // 取消回复
    toCancel() {
      this.replyc = -1
      this.textarea = ''
    },
    // 显示回复
    showReply(index) {
      this.replyc = index
    }
  }
}
</script>

<style lang="scss" scoped>
// 精彩评论
.hotcomments {
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
  // 加载完毕
  .c-all {
    display: flex;
    justify-content: center;
    font-size: 14px;
    color: #999;
  }
}
</style>
