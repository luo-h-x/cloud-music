<template>
  <div class="navbar-page">
    <div class="nav-log">
      <img src="../assets/log.svg" alt="" />
      <span>云音乐</span>
    </div>
    <!-- 前进返回 -->
    <div class="nav-history">
      <div class="back" @click="back">
        <img class="img" src="../assets/back.svg" alt="" />
      </div>
      <div class="go" @click="go">
        <img class="img" src="../assets/go.svg" alt="" />
      </div>
    </div>
    <!-- 搜索 -->
    <el-popover placement="bottom" width="400" trigger="click">
      <el-scrollbar>
        <!-- 搜索建议 -->
        <div class="s-suggest" v-if="suggest">
          <span class="hot-tit"
            >搜<span style="color: rgba(0, 0, 255, 0.589)">"{{ search }}"</span
            >相关结果</span
          >
          <div class="songR" v-if="suggest.songs">
            <span class="hot-tit">单曲</span>
            <ul class="suggest" style="padding-left: 20px">
              <li
                class="suggest-item"
                v-for="(item, index) in suggest.songs"
                :key="index"
                @click="hide()"
              >
                <span class="tit" @click="playSong(index)">{{ item.name }}</span
                >-
                <span class="tit" @click="playSong(index)">{{
                  item.artists[0].name
                }}</span>
              </li>
            </ul>
          </div>
          <div class="songR" v-if="suggest.artists">
            <span class="hot-tit">歌手</span>
            <ul style="padding-left: 20px">
              <li
                class="suggest-item"
                v-for="(item, index) in suggest.artists"
                :key="index"
                @click="hide"
              >
                <router-link
                  :to="{ path: '/Singer', query: { id: item.id } }"
                  >{{ item.name }}</router-link
                >
              </li>
            </ul>
          </div>
          <div class="songR" v-if="suggest.albums">
            <span class="hot-tit">专辑</span>
            <ul style="padding-left: 20px">
              <li
                class="suggest-item"
                v-for="(item, index) in suggest.albums"
                :key="index"
                @click="hide"
              >
                <router-link :to="{ path: '/Album', query: { id: item.id } }"
                  ><span>{{ item.name }}</span
                  >- <span>{{ item.artist.name }}</span></router-link
                >
              </li>
            </ul>
          </div>
          <div class="songR" v-if="suggest.playlists">
            <span class="hot-tit">歌单</span>
            <ul style="padding-left: 20px">
              <li
                class="suggest-item"
                v-for="(item, index) in suggest.playlists"
                :key="index"
                @click="hide"
              >
                <router-link
                  :to="{ path: '/PlayList', query: { id: item.id } }"
                  >{{ item.name }}</router-link
                >
              </li>
            </ul>
          </div>
        </div>
        <!-- 热搜 -->
        <div v-else>
          <span class="hot-tit">热搜榜</span>
          <ul class="hot-search">
            <li
              class="hot-search-item"
              v-for="(item, index) in hotSearch"
              :key="index"
              @click="toSearch(index)"
            >
              <span class="order">{{ index + 1 }}</span>
              <div class="c">
                <div class="hs-t">
                  <span class="hs-name">{{ item.searchWord }}</span>
                  <span class="hs-score">{{ item.score }}</span>
                </div>
                <span class="hs-content">{{ item.content }}</span>
              </div>
            </li>
          </ul>
        </div>
      </el-scrollbar>
      <input
        placeholder="搜索音乐、MV、歌单、用户"
        class="search-input"
        slot="reference"
        ref="inputS"
        v-model="search"
        @input="toSuggest"
      />
    </el-popover>
    <!-- 头像 -->
    <div id="login-in" class="login-in">
      <el-avatar
        size="small"
        src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
      ></el-avatar>
      <a class="login-btn">未登录</a>
    </div>
  </div>
</template>

<script>
import api from '../api/discover'
// import utils from '../utils/common'
export default {
  data() {
    return {
      search: '',
      hotSearch: null,
      suggest: null,
      stateH: false,
      timer: null
    }
  },
  methods: {
    toSearch(index) {
      // let popover = document.querySelector('.el-popover')
      // popover.style.display = 'none' // 去除提示框
      this.$refs.inputS.click() // 去除提示框
      // 跳转搜索页
      this.$router.push({
        path: '/Search/Song',
        query: { keyword: this.hotSearch[index].searchWord }
      })
      // 搜索框填值
      this.search = this.hotSearch[index].searchWord
      this.toSuggest()
    },
    toSuggest() {
      // utils.debounce(() => {
      //   this.getdata()
      // }, 1000)
      // 防抖
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.getdata()
      }, 1000)
    },
    hide() {
      this.$refs.inputS.click() // 去除提示框
    },
    getdata() {
      // 搜索建议
      if (this.search) {
        api.getSearchS(this.search).then(val => {
          this.suggest = val.data.result
        })
      } else {
        this.suggest = null
      }
    },
    back() {
      history.back()
    },
    go() {
      window.history.forward()
    },
    // 播放歌曲
    playSong(index) {
      let data = {}
      data.currentIndex = index
      data.ids = this.suggest.songs[0].id
      this.suggest.songs.forEach(item => {
        data.ids += ',' + item.id
      })
      this.$store.dispatch('querySongsA', data)
    }
  },
  mounted() {
    // 热搜
    api.getSearchHot().then(val => {
      this.hotSearch = val.data.data
      this.hotSearch.forEach((item, index) => {
        item.index = index
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.navbar-page {
  display: flex;
  width: 100%;
  height: 54px;
  justify-content: space-between;
  align-items: center;
  // box-shadow: 0 2px 3px -1px #ccc;
  .nav-log {
    width: 200px;
    height: 40px;
    display: flex;
    align-items: center;
    margin-left: 20px;
    & > img {
      height: 100%;
    }
    & > span {
      margin: 0 10px;
      font-size: 24px;
      line-height: 40px;
    }
  }
  // 前进返回
  .nav-history {
    display: flex;
    .back {
      width: 40px;
      height: 20px;
      text-align: center;
      border: 1px solid #ccc;
      cursor: pointer;
      .img {
        width: 20px;
      }
    }
    .go {
      width: 40px;
      height: 20px;
      text-align: center;
      margin-left: 10px;
      border: 1px solid #ccc;
      cursor: pointer;
      .img {
        width: 20px;
      }
    }
  }
  // 登录
  .login-in {
    display: flex;
    align-items: center;
    margin: 0 20px;
    .login-btn {
      margin-left: 5px;
      font-size: 14px;
    }
  }
}
</style>
<style lang="scss">
// 搜索建议
.s-suggest {
  max-height: 400px;
  margin-bottom: 10px;
  .suggest-item {
    margin-bottom: 10px;
    line-height: 40px;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
    .tit {
      cursor: pointer;
    }
  }
}
.hot-search {
  max-height: 400px;
  .hot-search-item {
    cursor: pointer;
    display: flex;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
    .c {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      .hs-t {
        margin-bottom: 10px;
      }
      .hs-name {
        font-weight: 800;
      }
      .hs-score {
        margin-left: 10px;
        font-size: 12px;
        color: #ccc;
      }
    }
    .order {
      width: 30px;
      text-align: center;
      font-weight: 800;
      color: #dd5353;
    }
  }
}
.hot-tit {
  line-height: 36px;
}
.search-input {
  background-color: #fff;
  background-image: none;
  border-radius: 99px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 300px;
  height: 30px;
  font-size: 13px;
}
</style>
