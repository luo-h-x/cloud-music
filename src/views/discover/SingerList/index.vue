<template>
  <div class="singer-page">
    <div class="s-sort">
      <div class="sort">
        <span class="tit">语种:</span>
        <router-link to="" class="all active">全部</router-link>
        <router-link to="" class="tags">华语</router-link>
        <router-link to="" class="tags">欧美</router-link>
        <router-link to="" class="tags">日本</router-link>
        <router-link to="" class="tags">韩国</router-link>
        <router-link to="" class="tags">其他</router-link>
      </div>
      <div class="sort">
        <span class="tit">分类:</span>
        <router-link to="" class="all active">全部</router-link>
        <router-link to="" class="tags">男歌手</router-link>
        <router-link to="" class="tags">女歌手</router-link>
        <router-link to="" class="tags">乐队组合</router-link>
      </div>
    </div>
    <ul class="list">
      <li
        class="list-item"
        v-for="(item, index) in singers"
        :key="index"
        @click="toSinger(item.id)"
      >
        <img :src="item.picUrl" class="pic" />
        <span class="tit">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../../../api/discover'
export default {
  data() {
    return {
      singers: null
    }
  },
  mounted() {
    api.getSingerL().then(val => {
      this.singers = val.data.artists
    })
  },
  methods: {
    toSinger(id) {
      this.$router.push({ path: '/Singer', query: { id: id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.s-sort {
  margin: 10px 0;
  .sort {
    font-size: 13px;
    color: #999;
    margin: 10px 0;
    display: flex;
    align-items: center;
    .tit {
      margin: 0 10px;
    }
    .all {
      height: 28px;
      width: 77px;
      text-align: center;
      line-height: 28px;
      margin: 0 10px;
    }
    .active {
      background: #999;
      color: #fff;
    }
    .tags {
      height: 28px;
      width: 77px;
      text-align: center;
      line-height: 28px;
      border-left: 1px solid #000;
    }
  }
}
.list {
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 2fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  margin-top: 20px;
  .list-item {
    cursor: pointer;
    font-size: 13px;
    .pic {
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>
