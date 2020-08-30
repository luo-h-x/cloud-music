<template>
  <div class="rankingList-page" v-if="ranking">
    <div
      class="load"
      v-loading="loading"
      element-loading-text="努力加载中"
      element-loading-background="#fff"
      v-if="loading"
    ></div>
    <div :class="{ hide: loading }">
      <h2 class="tit">官方榜</h2>
      <ul class="ro-item">
        <li v-for="(item, index) in ranking.list.slice(0, 4)" :key="index">
          <List :id="item.id" :img="item.coverImgUrl" />
        </li>
      </ul>
      <h2 class="tit">全球榜</h2>
      <ul class="rg-item">
        <li v-for="(item, index) in ranking.list.slice(4, -1)" :key="index">
          <router-link
            class="all"
            :to="{ path: '/PlayList', query: { id: item.id } }"
          >
            <img @load="show" class="img" :src="item.coverImgUrl" />
            <span class="name">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import List from './components/List'
import api from '../../../api/discover'
export default {
  components: { List },
  data() {
    return {
      ranking: null,
      loading: true,
      count: 0
    }
  },
  mounted() {
    api.getRankingA().then(val => {
      this.ranking = val.data
    })
  },
  methods: {
    show() {
      this.count++
      if (this.count === 20) {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hide {
  display: none;
}
.load {
  width: 100%;
  height: calc(100vh - 120px);
  position: absolute;
}
.rankingList-page {
  .tit {
    margin-top: 10px;
    font-weight: normal;
    line-height: 48px;
    border-bottom: 1px #ccc solid;
  }
  .ro-item {
    display: grid;
    grid-template-columns: 3fr 3fr 3fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    margin-top: 20px;
  }
  .rg-item {
    display: grid;
    grid-template-columns: 2fr 2fr 2fr 2fr 2fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    margin-top: 20px;
    .all {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      .img {
        width: 100%;
      }
    }
  }
}
</style>
