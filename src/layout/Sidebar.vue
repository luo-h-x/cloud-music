<template>
  <div class="sidebar-page">
    <div class="recommend">
      推荐
    </div>
    <el-menu
      default-active="发现音乐"
      background-color="#4d4848"
      text-color="#ccc"
      active-text-color="#fff"
    >
      <router-link to="/Discover">
        <el-menu-item index="发现音乐">
          <!-- <i class="el-icon-setting"></i> -->
          <img class="sidebar-icon" src="../assets/music.svg" alt="">
          <span slot="title">发现音乐</span>
        </el-menu-item>
      </router-link>
      <el-menu-item index="私人FM">
        <img class="sidebar-icon" src="../assets/fm.svg" alt="">
        <span slot="title">私人FM</span>
      </el-menu-item>
      <el-menu-item index="LOOK直播">
       <img class="sidebar-icon" src="../assets/zb.svg" alt="">
        <span slot="title">LOOK直播</span>
      </el-menu-item>
      <el-menu-item index="视频">
        <img class="sidebar-icon" src="../assets/video.svg" alt="">
        <span slot="title">视频</span>
      </el-menu-item>
      <el-menu-item index="朋友">
        <img class="sidebar-icon" src="../assets/person.svg" alt="">
        <span slot="title">朋友</span>
      </el-menu-item>
    </el-menu>
    <div class="recommend">
      我的音乐
    </div>
    <el-menu
      background-color="#4d4848"
      text-color="#ccc"
      active-text-color="#fff"
    >
      <el-menu-item index="本地音乐">
        <img class="sidebar-icon" src="../assets/music.svg" alt="">
        <span slot="title">本地音乐</span>
      </el-menu-item>
      <el-menu-item index="下载管理">
        <img class="sidebar-icon" src="../assets/download.svg" alt="">
        <span slot="title">下载管理</span>
      </el-menu-item>
    </el-menu>
    <div class="recommend">
      创建的歌单
    </div>
    <el-menu
      background-color="#4d4848"
      text-color="#ccc"
      active-text-color="#fff"
    >
      <el-menu-item index="我喜欢的音乐">
        <img class="sidebar-icon" src="../assets/like.svg" alt="">
        <span slot="title">我喜欢的音乐</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.sidebar-page {
  .recommend {
    line-height: 28px;
    color: #ccc;
    padding-left: 10px;
  }
  .el-menu {
    border: none;
    .sidebar-icon {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  }
}
</style>
