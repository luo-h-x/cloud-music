<template>
  <div class="discover-page">
    <div class="nav">
      <el-menu default-active="个性推荐" mode="horizontal">
        <el-menu-item index="个性推荐">个性推荐</el-menu-item>
        <el-menu-item index="歌单">歌单</el-menu-item>
        <el-menu-item index="主播电台">主播电台</el-menu-item>
        <el-menu-item index="排行榜">排行榜</el-menu-item>
        <el-menu-item index="歌手">歌手</el-menu-item>
        <el-menu-item index="最新音乐">最新音乐</el-menu-item>
      </el-menu>
    </div>
    <div class="banner">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <img
            class="banner-imgs"
            src="http://p1.music.126.net/hnqSRbszgnc_MbQGdVr4TQ==/109951165173153454.jpg?imageView&amp;quality=89"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="recommended-songs">
      <div class="s-title">
        <h3>推荐歌单</h3>
        <span>更多>></span>
      </div>
      <ul class="s-list">
        <li class="s-list-item" v-for="item in 10" :key="item">
          <div class="s-content">
            <div class="sc-img">
              <img
                src="http://p2.music.126.net/QjAknCiWB0iMGPaQNUeitg==/109951165164951985.jpg?param=140y140"
              />
              <img class="s-play" src="../../assets/play.svg" alt="" />
              <div class="sc-info">
                <img class="sc-headset" src="../../assets/headset.svg" alt="" />
                <span class="sc-count">141413</span>
              </div>
            </div>
            <a class="sc-title" href="">辗转心事 | 今夜你是否也被谁填满思绪</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="sole">
      <div class="s-title">
        <h3>独家放送</h3>
        <span>更多>></span>
      </div>
      <ul class="sole-list">
        <li class="sole-list-item" v-for="item in 3" :key="item">
          <div class="sole-img">
            <img
              class="sole-main"
              src="http://p1.music.126.net/FZdAfmmKDx1HRuRVGP9x8w==/109951165176962505.jpg?imageView&amp;quality=89"
            />
            <img class="sole-video" src="../../assets/video.svg" alt="" />
          </div>
          <a class="sole-title" href="">辗转心事 | 今夜你是否也被谁填满思绪</a>
        </li>
      </ul>
    </div>
    <div class="latestmusic">
      <div class="s-title">
        <h3>最新音乐</h3>
        <span>更多>></span>
      </div>
      <ul class="lm-list">
        <li class="lm-list-item" v-for="item in 10" :key="item">
          <div class="lm-show">
            <span class="lm-s-number">0{{ item }}</span>
          </div>
          <div class="lm-img">
            <img
              class="lm-img-main"
              src="http://p2.music.126.net/7ZPcKkp_tCfmm9O0v1UBCQ==/109951165169781593.jpg?param=140y140"
            />
            <img class="lm-img-play" src="../../assets/play.svg" alt="" />
          </div>
          <div class="lm-information">
            <span class="lm-i-title">我行我素我爱你</span>
            <span class="lm-i-singer">郁可唯</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="musicvideo">
      <div class="s-title">
        <h3>推荐MV</h3>
        <span>更多>></span>
      </div>
      <ul class="mv-list">
        <li class="mv-list-item" v-for="item in 3" :key="item">
          <div class="mv-img">
            <img
              class="mv-main"
              src="http://p1.music.126.net/rXPQmh_eIkYQpSDXyc0E9w==/109951165175618958.jpg?imageView&quality=89"
            />
            <div class="mv-info">
              <img class="mv-headset" src="../../assets/video2.svg" alt="" />
              <span class="mv-count">41413</span>
            </div>
          </div>
          <div class="mv-information">
            <a class="mv-i-title">爸爸妈妈</a>
            <a class="mv-i-singer">李荣浩</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="radiostation">
      <div class="s-title">
        <h3>主播电台</h3>
        <span>更多>></span>
      </div>
      <ul class="rs-list">
        <li class="rs-list-item" v-for="item in 5" :key="item">
          <div class="rs-content">
            <img
              class="rs-img"
              src="http://p3.music.126.net/98R0FzSmP8MU-3OGxBPWQQ==/109951164937116837.jpg?param=140y140"
            />
            <div class="rs-describe">
              <span class="rs-d-title">笑谈游戏和生活</span>
            </div>
          </div>
          <a class="rs-title" href="">辗转心事 | 今夜你是否也被谁填满思绪</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.discover-page {
  display: flex;
  flex-direction: column;
  background: #fff;
  // 导航
  .nav {
    display: flex;
    justify-content: center;
    border-bottom: solid 1px #e6e6e6;
    .el-menu--horizontal {
      border: none;
    }
  }
  // 轮播
  .banner {
    margin: 20px 0;
    .banner-imgs {
      width: 100%;
      height: 100%;
    }
  }
  //标题
  .s-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px #e6e6e6 solid;
    margin: 20px 0 0 0;
    > h3 {
      margin: 0;
      line-height: 40px;
      font-weight: 400;
    }
    > span {
      font-size: 12px;
    }
  }
  // 推荐歌单
  .recommended-songs {
    .s-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: 10px 0;
      .s-list-item {
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 10px;
        position: relative;
        cursor: pointer;
        .s-content {
          display: flex;
          flex-direction: column;
          .sc-img {
            position: relative;
            width: 140px;
            .s-play {
              position: absolute;
              right: 5%;
              bottom: 5%;
              width: 30px;
              height: 30px;
            }
            .sc-info {
              position: absolute;
              right: 2%;
              top: 0;
              display: flex;
              align-items: center;
              background: rgba(0, 0, 0, 0.2);
              .sc-headset {
                width: 20px;
                height: 20px;
              }
              .sc-count {
                color: #fff;
                font-size: 12px;
                line-height: 30px;
              }
            }
          }
          .sc-title {
            width: 140px;
            font-size: 14px;
            color: #303133;
          }
        }
      }
    }
  }
  //独家放送
  .sole {
    .sole-list {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      .sole-list-item {
        width: 33%;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        .sole-img {
          position: relative;
          .sole-main {
            width: 100%;
            height: 100%;
          }
          .sole-video {
            width: 20px;
            height: 20px;
            position: absolute;
            left: 5%;
            top: 10%;
          }
        }
        .sole-title {
          font-size: 14px;
          color: #303133;
        }
      }
    }
  }
  //最新音乐
  .latestmusic {
    .lm-list {
      display: flex;
      flex-wrap: wrap;
      .lm-list-item {
        display: flex;
        width: 50%;
        margin-top: 1%;
        &:hover {
          background: rgba(0, 0, 0, 0.2) !important;
        }
        &:nth-child(even) {
          background: #fafafa;
        }
        .lm-show {
          width: 40px;
          text-align: center;
          .lm-s-number {
            line-height: 60px;
          }
        }
        .lm-img {
          position: relative;
          width: 60px;
          height: 60px;
          .lm-img-main {
            width: 100%;
            height: 100%;
          }
          .lm-img-play {
            width: 20px;
            height: 20px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .lm-information {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 3%;
          .lm-i-title {
            line-height: 30px;
          }
          .lm-i-singer {
            line-height: 30px;
            font-size: 14px;
            color: #897373;
            cursor: pointer;
          }
        }
      }
    }
  }
  //推荐MV
  .musicvideo {
    .mv-list {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      .mv-list-item {
        width: 33%;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        .mv-img {
          position: relative;
          .mv-main {
            width: 100%;
            height: 100%;
          }
          .mv-info {
            position: absolute;
            right: 2%;
            top: 0;
            display: flex;
            align-items: center;
            background: rgba(0, 0, 0, 0.2);
            .mv-headset {
              width: 20px;
              height: 20px;
            }
            .mv-count {
              color: #fff;
              font-size: 12px;
              line-height: 30px;
            }
          }
        }
        .mv-information {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 3%;
          // .mv-i-title {
          // }
          .mv-i-singer {
            color: #897373;
            font-size: 14px;
          }
        }
      }
    }
  }
  //主播电台
  .radiostation {
    .rs-list {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      .rs-list-item {
        width: 18%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: pointer;
        .rs-content {
          position: relative;
          height: 100%;
          .rs-img {
            width: 100%;
            height: 100%;
          }
          .rs-describe {
            width: 100%;
            position: absolute;
            left: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.4);
            .rs-d-title {
              color: #fff;
              font-size: 14px;
              margin-left: 2%;
            }
          }
        }
        .rs-title {
          font-size: 14px;
          color: #303133;
        }
      }
    }
  }
}
</style>
