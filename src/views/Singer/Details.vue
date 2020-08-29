<template>
  <div class="singer-deatails-page" v-if="deatails">
    <!-- 简介 -->
    <div class="singer-synopsis">
      <h3 class="ss-tit">简介</h3>
      <p class="ss-content">
        {{ deatails.briefDesc }}
      </p>
    </div>
    <div class="singer-introduction" v-if="deatails.introduction.length > 0">
      <div
        class="si-info"
        v-for="(item, index) in deatails.introduction"
        :key="index"
      >
        <h3 class="si-tit">{{ item.ti }}</h3>
        <p
          class="si-content"
          v-for="(val, index) in item.txt"
          :key="index"
        >
          {{ val }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/singer'
export default {
  data() {
    return {
      deatails: null
    }
  },
  mounted() {
    api.getSingerDetails(this.$route.query.id).then(val => {
      this.deatails = val.data
      this.deatails.introduction.forEach(item => {
        item.txt = item.txt.split('\n')
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.singer-deatails-page {
  // 简介
  .singer-synopsis {
    margin-top: 20px;
    font-size: 14px;
    .ss-content {
      line-height: 28px;
      text-indent: 28px;
    }
  }
  .singer-introduction {
    .si-info {
      margin-top: 20px;
      font-size: 14px;
      .si-content {
        color: #666;
        line-height: 28px;
        text-indent: 28px;
      }
    }
  }
}
</style>
