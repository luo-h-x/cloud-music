<template>
  <ul class="singer-album">
    <li class="singer-album-item" v-for="(item, index) in list" :key="index">
      <span class="number">{{ index + 1 }}</span>
      <img :src="item.album.picUrl" class="sa-pic" />
      <span>{{item.name}}</span>
      <router-link
        :to="{ path: '/Singer', query: { id: item.artists[0].id } }"
        class="sa-title"
        >{{ item.artists[0].name }}</router-link
      >
      <router-link
        :to="{ path: '/Album', query: { id: item.album.id } }"
        class="sa-title"
        >{{ item.album.name }}</router-link
      >
      <span class="time">{{ item.duration }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['list']
}
</script>

<style lang="scss" scoped>
.singer-album {
  .singer-album-item {
    display: grid;
    grid-template-columns: 0.5fr 0.5fr 3fr 2fr 2fr 2fr;
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
    }
    .number {
      line-height: 50px;
      text-align: center;
    }
  }
}
</style>
