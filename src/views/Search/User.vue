<template>
  <ul class="singer-album">
    <li
      class="singer-album-item"
      v-for="(item, index) in result.userprofiles"
      :key="index"
    >
      <img :src="item.avatarUrl" class="sa-pic" />
      <router-link
        :to="{ path: '/User', query: { uid: item.userId } }"
        class="sa-title"
        >{{ item.nickname }}</router-link
      >
    </li>
  </ul>
</template>

<script>
import api from '../../api/discover'
export default {
  data() {
    return {
      result: []
    }
  },
  mounted() {
    api.getSearch(this.$route.query.keyword, 1002).then(val => {
      this.result = val.data.result
    })
  }
}
</script>

<style lang="scss" scoped>
.singer-album {
  .singer-album-item {
    display: grid;
    grid-template-columns: 0.5fr 3fr 3fr 3fr;
    grid-column-gap: 10px;
    align-items: center;
    margin: 10px 0;
    font-size: 14px;
    color: #999;
    height: 50px;
    &:nth-child(even) {
      background: #fafafa;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.1) !important;
    }
    .sa-pic {
      width: 50px;
      border-radius: 99px;
    }
  }
}
</style>
