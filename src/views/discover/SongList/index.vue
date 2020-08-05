<template>
  <div class="song-page">
    <!-- 标签 -->
    <el-tag
      v-for="tag in tags"
      :key="tag.name"
      :color="tag.color"
      @click="tagChange(tag.name)"
    >
      {{ tag.name }}
    </el-tag>
    <!-- 歌单列表 -->
    <ul class="s-list">
      <li
        class="s-list-item"
        v-for="(item, index) in newList"
        :key="index"
        @click="toPlayList(item.id)"
      >
        <div class="s-content">
          <div class="sc-img">
            <img class="sc-main sc-restore" :src="item.coverImgUrl" />
            <!-- 播放数 -->
            <div class="sc-info">
              <img
                class="sc-headset"
                src="../../../assets/headset.svg"
                alt=""
              />
              <span class="sc-count">{{ item.playCount }}</span>
            </div>
            <!-- 歌单作者 -->
            <div class="sc-describe">
              <img class="sc-d-img" src="../../../assets/person.svg" alt="" />
              <span class="sc-d-title">{{ item.creator.nickname }}</span>
            </div>
          </div>
          <a href="javascript:;" class="sc-title" >{{ item.name }}</a>
        </div>
      </li>
    </ul>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="90">
    </el-pagination>
  </div>
</template>

<script>
import api from '../../../api/discover'
import utils from '../../../utils/common'
export default {
  data() {
    return {
      tags: [
        { name: '热门表签：', color: '#ef2424' },
        { name: '华语', color: '#409eff' },
        { name: '流行', color: '#88ee86' },
        { name: '摇滚', color: '#2e2be8' },
        { name: '民谣', color: '#909399' },
        { name: '电子', color: '#e6a23c' },
        { name: '浪漫', color: '#e3f114' },
        { name: '轻音乐', color: '#f56c6c' },
        { name: '综艺', color: '#f4de8e' },
        { name: '影视原声', color: '#da56d6' }
      ],
      newList: null
    }
  },
  methods: {
    // 切换标签
    tagChange(keyword) {
      this.newList = JSON.parse(sessionStorage.getItem(keyword))
    },
    // 跳转歌单详情页
    toPlayList(id) {
      this.$router.push({ path: '/PlayList', query: { id: id } })
    }
  },
  mounted() {
    if (sessionStorage.getItem('newList')) {
      // 读取sessionStorage数据
      this.newList = JSON.parse(sessionStorage.getItem('newList'))
    } else {
      // 获取歌单列表
      api.getNewList().then(val => {
        this.newList = val.data.playlists
        this.newList.forEach(item => {
          item.playCount = utils.countToString(item.playCount)
        })
        // 设置sessionStorage数据
        sessionStorage.setItem('newList', JSON.stringify(this.newList))
      })
    }
    // 标签数据
    this.tags.forEach(item => {
      api.getTag(item.name).then(val => {
        let data = val.data.playlists
        data.forEach(item => {
          item.playCount = utils.countToString(item.playCount)
        })
        sessionStorage.setItem(item.name, JSON.stringify(data))
      })
    })
  }
}
</script>

<style lang="scss" scoped>
// 推荐歌单
.song-page {
  // 标签
  .el-tag {
    color: #fff;
    margin: 10px;
    cursor: pointer;
  }
  // 歌单列表
  .s-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 10px 0;
    .s-list-item {
      width: 23%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 16px;
      position: relative;
      cursor: pointer;
      .s-content {
        display: flex;
        flex-direction: column;
        .sc-img {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          // 图片
          .sc-main {
            display: block;
            width: 100%;
            object-fit: fill;
            &:hover {
              transform: scale(1.1) translateZ(0);
              transition: transform 0.75s;
            }
          }
          // 图片还原动画
          .sc-restore {
            transform: scale(1) translateZ(0);
            transition: transform 0.75s;
          }
          // 播放数
          .sc-info {
            position: absolute;
            right: 0;
            top: 0;
            display: flex;
            align-items: center;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 0 10px 0;
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
          // 歌单作者
          .sc-describe {
            width: 100%;
            position: absolute;
            left: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            .sc-d-title {
              color: #fff;
              font-size: 13px;
              margin-left: 2%;
              line-height: 30px;
            }
            .sc-d-img {
              width: 20px;
              height: 20px;
            }
          }
        }
        // 歌单标题
        .sc-title {
          font-size: 15px;
          color: #303133;
        }
      }
    }
  }
  // 分页
  .el-pagination {
    display: flex;
    justify-content: center;
  }
}
</style>
