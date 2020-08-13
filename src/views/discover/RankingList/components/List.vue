<template>
  <div>
    <img class="ranking-img" :src="img" />
    <ul class="songs" v-if="songs">
      <li
        class="s-item"
        v-for="(item, index) in songs.slice(0, 8)"
        :key="index"
      >
        <span class=" ">{{ index + 1 }}</span>
        <span class="name">{{ item.name }}</span>
        <router-link
          class="singer"
          :to="{ path: '/Singer', query: { id: item.ar[0].id } }"
          >{{ item.ar[0].name }}</router-link
        >
      </li>
      <router-link class="all" :to="{ path: '/PlayList', query: { id: id } }"
        >查看全部</router-link
      >
    </ul>
  </div>
</template>

<script>
import api from '../../../../api/discover'
export default {
  data() {
    return {
      songs: null
    }
  },
  props: ['id', 'img'],
  mounted() {
    api.getDetail(this.id).then(val => {
      this.songs = val.data.playlist.tracks
    })
  }
}
</script>

<style lang="scss" scoped>
.ranking-img {
  width: 100%;
  height: 130px;
  object-fit: cover;
}
.songs {
  display: flex;
  flex-direction: column;
  .s-item {
    display: grid;
    grid-template-columns: 0.5fr 5fr 2fr;
    height: 30px;
    font-size: 13px;
    color: #999;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
    .name {
      color: #000;
    }
    .singer {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .all {
    font-size: 13px;
    color: #999;
  }
}
</style>
