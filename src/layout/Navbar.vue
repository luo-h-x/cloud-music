<template>
  <div class="navbar-page">
    <div class="nav-log">
      <img src="../assets/log.svg" alt="" />
      <span>云音乐</span>
    </div>
    <div class="nav-search">
      <input
        class="search-input"
        aria-label="请输入搜索内容"
        type="text"
        placeholder="搜索音乐、MV、歌单、用户"
      />
      <button class="search-btn">
        <!-- <i class="icon_search sprite"></i> -->
        <span class="icon_txt">搜索</span>
      </button>
    </div>
    <div id="login-in" class="login-in">
      <a class="login-btn" id="login-btn">登录</a>
      <!-- <a target="_blank">注册</a> -->
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.navbar-page {
  display: flex;
  width: 100%;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  .nav-log {
    width: 200px;
    height: 40px;
    display: flex;
    align-items: center;
    & > img {
      height: 100%;
    }
    & > span {
      margin: 0 10px;
      color: #fff;
      font-size: 24px;
      line-height: 40px;
    }
  }
  .nav-search {
    position: relative;
    > input {
      width: 350px;
      height: 30px;
      border: 0 none;
    }
    > button {
      width: 40px;
      line-height: 30px;
      border: 0 none;
      background: 0 0;
      position: absolute;
      right: 0;
    }
  }
  .login-in {
    margin: 0 20px;
    .login-btn {
      display: block;
      width: 48px;
      height: 28px;
      line-height: 28px;
      border: 1px solid #169af3;
      border-radius: 2px;
      text-align: center;
      color: #fff;
      cursor: pointer;
      background-color: #169af3;
    }
  }
}
</style>
