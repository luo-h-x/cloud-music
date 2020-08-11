<template>
  <div class="p-list" v-if="songs">
    <el-table :data="songs" stripe border style="width: 100%">
      <el-table-column type="index"> </el-table-column>
      <el-table-column label="操作">
        <template>
          <img class="p-icon" src="../../assets/like.svg" alt="喜欢" />
          <img class="p-icon" src="../../assets/download.svg" alt="下载" />
          <img class="p-icon" src="../../assets/share.svg" alt="下载" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="音乐标题"> </el-table-column>
      <el-table-column prop="ar[0].name" label="歌手"> </el-table-column>
      <el-table-column prop="al.name" label="专辑"> </el-table-column>
      <el-table-column prop="dt" label="时长"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from '../../api/discover'
// import util from '../../utils/common'
export default {
  data() {
    return {
      songs: null
    }
  },
  mounted() {
    api.getAlbum(this.$route.query.id).then(val => {
      this.songs = val.data.songs
    })
  }
}
</script>

<style lang="scss" scoped>
// 歌单列表
.p-list {
  margin: 20px 0;
}
.p-icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
  cursor: pointer;
}
</style>
