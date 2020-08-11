<template>
  <div>
    <comments />
  </div>
</template>

<script>
import api from '../../api/discover'
import utils from '../../utils/common'
import Comments from '../../components/Comments'
export default {
  components: { Comments },
  data() {
    return {}
  },
  mounted() {
    // 歌曲评论
    api.getAlbumC(this.$route.query.id).then(val => {
      let comments = val.data
      // 时间戳 => 日期
      comments.hotComments.forEach(item => {
        item.time = utils.formatDate(item.time, 1)
      })
      comments.comments.forEach(item => {
        item.time = utils.formatDate(item.time, 1)
      })
      this.$store.dispatch('queryCommetsA', comments)
    })
  }
}
</script>

<style></style>
