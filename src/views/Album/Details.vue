<template>
  <div class="deatils">
    <h3 class="ss-tit">专辑介绍</h3>
    <p class="si-content" v-for="(val, index) in description" :key="index">
      {{ val }}
    </p>
  </div>
</template>

<script>
import api from '../../api/discover'
export default {
  data() {
    return {
      description: ''
    }
  },
  mounted() {
    // 获取歌单列表
    api.getAlbum(this.$route.query.id).then(val => {
      this.description = val.data.album.description.split('\n')
    })
  }
}
</script>

<style>
.deatils {
  margin: 10px 0;
}
.ss-tit {
  font-size: 14px;
}
.si-content {
  line-height: 28px;
  text-indent: 28px;
}
</style>
