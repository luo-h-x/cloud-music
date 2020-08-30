<template>
  <div class="singer-page">
    <div class="s-sort">
      <!-- <div class="sort"> -->
      <!-- <span class="tit">语种:</span>
        <router-link to="" class="all active">全部</router-link>
        <router-link to="" class="tags">华语</router-link>
        <router-link to="" class="tags">欧美</router-link>
        <router-link to="" class="tags">日本</router-link>
        <router-link to="" class="tags">韩国</router-link>
        <router-link to="" class="tags">其他</router-link> -->
      <div
        style="display: flex;align-items: center;"
        v-for="(item, index) in navList"
        :key="index"
      >
        <span class="tit">{{ item.tit }}:</span>
        <ul class="sort">
          <li
            class="tags"
            v-for="(tag, i) in item.sort"
            :key="i"
          >
            {{ tag.name }}
          </li>
        </ul>
      </div>
      <!-- <div class="sort">
        <span class="tit">分类:</span>
        <router-link to="" class="all active">全部</router-link>
        <router-link to="" class="tags">男歌手</router-link>
        <router-link to="" class="tags">女歌手</router-link>
        <router-link to="" class="tags">乐队组合</router-link>
      </div> -->
    </div>
    <div
      class="load"
      v-loading="loading"
      element-loading-text="努力加载中"
      element-loading-background="#fff"
      v-if="loading"
    ></div>
    <div :class="{ hide: loading }">
      <ul class="list">
        <li
          class="list-item"
          v-for="(item, index) in singers"
          :key="index"
          @click="toSinger(item.id)"
        >
          <img @load="show" :src="item.picUrl + '?param=400y400'" class="pic" />
          <span class="tit">{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '../../../api/discover'
export default {
  data() {
    return {
      singers: null,
      loading: true,
      count: 0,
      navList: [
        {
          tit: '语种',
          sort: [
            { name: '全部', type: '-1' },
            { name: '华语', type: '7' },
            { name: '欧美', type: '96' },
            { name: '日本', type: '8' },
            { name: '韩国', type: '16' },
            { name: '其他', type: '0' }
          ]
        },
        {
          tit: '分类',
          sort: [
            { name: '全部', type: '-1' },
            { name: '男歌手', type: '1' },
            { name: '女歌手', type: '2' },
            { name: '乐队组合', type: '3' }
          ]
        }
      ]
    }
  },
  mounted() {
    api
      .getSingerL(
        this.$route.query.type,
        this.$route.query.area,
        this.$route.query.initial
      )
      .then(val => {
        this.singers = val.data.artists
      })
  },
  methods: {
    toSinger(id) {
      this.$router.push({ path: '/Singer', query: { id: id } })
    },
    show() {
      this.count++
      if (this.count === this.singers.length) {
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
  height: calc(100vh - 186px);
  position: absolute;
}
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
      color: #000;
    }
    .tags {
      width: 60px;
      text-align: center;
      line-height: 28px;
      color: #999;
      cursor: pointer;
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
