<template>
  <div class="layout">
    <el-container>
      <el-header>
        <Navbar />
      </el-header>
      <el-container style="overflow: auto;">
        <el-aside width="200px">
          <Sidebar />
        </el-aside>
        <el-scrollbar>
          <el-main>
            <app-main />
          </el-main>
        </el-scrollbar>
      </el-container>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Footer from './Footer'
import Sidebar from './Sidebar'
import AppMain from './AppMain'
export default {
  components: {
    Navbar,
    Footer,
    Sidebar,
    AppMain
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  .el-container {
    height: 100%;
    .el-header {
      background-color: rgb(77, 72, 72);
      display: flex;
      align-items: center;
    }
    .el-scrollbar {
      width: 100%;
    }
    .el-main {
      background: #fff;
    }
    .el-footer {
      background-color: rgb(77, 72, 72);
      display: flex;
      align-items: center;
    }
  }
}
</style>
