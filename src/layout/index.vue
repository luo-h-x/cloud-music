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
        <el-scrollbar style="width: 100%;" class="main-scrollbar" ref="elscrollbar">
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
  },
  watch: {
    // 监视路由变化返回上次路由位置
    '$route.fullPath': function(newVal, oldVal) {
      if (sessionStorage.getItem(newVal) && this.$route.fullPath === newVal) {
        this.$nextTick(() => {
          this.$refs.elscrollbar.wrap.scrollTop = sessionStorage.getItem(newVal)
        })
      }
      let top = this.$refs.elscrollbar.wrap.scrollTop
      sessionStorage.setItem(oldVal, top)
    }
  },
  mounted() {
    // 获取最外层滚动元素,用于滚动到指定位置
    this.$nextTick(() => {
      this.$store.commit('getMainScrollM', this.$refs.elscrollbar.wrap)
    })
  }
}
</script>

<style lang="scss" scoped>
.layout {
  width: 144vh;
  height: 96vh;
  box-shadow: 0 2px 14px 2px #ccc;
  .el-container {
    height: 100%;
    .el-header {
      display: flex;
      align-items: center;
      padding: 0 !important;
    }
    .el-main {
      background: #fff;
    }
    .el-footer {
      display: flex;
      align-items: center;
    }
  }
}
</style>
