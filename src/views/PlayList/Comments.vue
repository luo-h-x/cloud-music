<template>
  <!-- 最新评论 -->
  <div>
    <div class="comments">
      <h2 class="c-type">最新评论</h2>
      <!-- 评论 -->
      <ul class="h-list">
        <li
          class="h-list-item"
          v-for="(item, index) in comments"
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
                v-model="textarea"
                maxlength="140"
                show-word-limit
                :rows="3"
              >
              </el-input>
              <div class="hdi-option">
                <a href="javascript:;" class="hdi-reply" @click="toReply(item)"
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
    </div>
    <!-- 分页 -->
    <el-pagination
      v-if="comments.length > 19"
      background
      layout="prev, pager, next"
      :total="100"
    >
    </el-pagination>
    <!-- 加载完毕 -->
    <div class="c-all" v-else>
      <span class="ca-link">—— 以上为全部评论 ——</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['comments'],
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
      this.$emit('addpraise', index, 'comments')
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
</style>
