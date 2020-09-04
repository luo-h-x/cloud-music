import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/discover'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    comments: [], // 评论,
    total: 100, // 评论数
    mainScroll: null, // 最外层el-scrollbar
    currentIndex: 0, // 播放列表索引
    songList: [], // 播放列表
    loading: true, // 加载中
    count: 0, // 加载计数
    lyricIndex: 0, // 歌词索引
    lyric: [], // 歌词
    lyricScroll: null, // 歌词滚动元素
    // 节流定时器
    timer: null
  },
  mutations: {
    // 加载
    loadingDM(state) {
      state.count++
      if (state.count >= 19) {
        state.loading = false
        state.count = 0
      }
    },
    loadingAM(state) {
      state.loading = true
    },
    // 获取评论
    queryCommetsM(state, data) {
      state.comments = data
      state.total = data.total
    },
    // 歌曲详情
    querySongsM(state, data) {
      state.songList = data.songs
      state.currentIndex = data.currentIndex
    },
    // 歌词
    queryLyricM(state, lyric) {
      state.lyric = lyric
    },
    // 歌词高亮自适应
    autoLyricM(state, currentTime) {
      state.lyric.forEach((item, index) => {
        let time = item.time
        if (currentTime >= time) {
          state.lyricIndex = index
          if (state.timer) return
          // 节流
          state.timer = setTimeout(() => {
            // 歌词滚动 还需优化
            if (state.lyricIndex > 2 && state.lyricScroll) {
              state.lyricScroll.scrollTo({
                top: 40 * (state.lyricIndex - 2),
                behavior: 'smooth'
              })
            }
            state.timer = null
          }, 2000)
        }
      })
    },
    lyricCompleteM(state) {
      if (state.lyricIndex >= state.lyric.length && state.lyricScroll) {
        state.lyricScroll.scrollTop = 0
      }
    },
    getElM(state, el) {
      state.lyricScroll = el
    },
    // 下一首
    nextM(state) {
      state.currentIndex < state.songList.length - 1
        ? (state.currentIndex += 1)
        : (state.currentIndex = 0)
    },
    // 上一首
    prevM(state) {
      state.currentIndex > 0
        ? (state.currentIndex -= 1)
        : (state.currentIndex = state.songList.length - 1)
    },
    // 添加评论
    addCommentM(state, textarea) {
      if (textarea) {
        // 添加评论
        state.comments.comments.unshift({
          content: textarea,
          likedCount: 0,
          commentId: state.comments.comments.length + 1,
          time: new Date().toLocaleString(),
          beReplied: [],
          user: {
            nickname: '默认名',
            avatarUrl:
              'http://p1.music.126.net/KxePid7qTvt6V2iYVy-rYQ==/109951165050882728.jpg',
            userId: 1
          }
        })
        // 评论数加一
        state.comments.total += 1
        // 通知
        Vue.prototype.$notify({
          title: '成功',
          message: '评论成功',
          type: 'success',
          duration: 2000,
          position: 'top-left'
        })
      } else {
        Vue.prototype.$alert('请输入内容!!', '', {
          confirmButtonText: '确定'
        })
      }
    },
    // 点赞
    toPraiseM(state, payload) {
      const { index, type } = payload
      if (type === 'comments') {
        !state.comments.comments[index].ispraise
          ? (state.comments.comments[index].likedCount -= 1) // 取消点赞
          : (state.comments.comments[index].likedCount += 1)
      } else {
        !state.comments.hotComments[index].ispraise
          ? (state.comments.hotComments[index].likedCount -= 1) // 取消点赞
          : (state.comments.hotComments[index].likedCount += 1)
      }
    },
    // @回复评论
    toReplyCommentM(state, payload) {
      const { item, text } = payload
      if (text) {
        // 添加评论
        state.comments.comments.unshift({
          content: text,
          likedCount: 0,
          commentId: state.comments.comments.length + 10,
          time: new Date().toLocaleString(),
          beReplied: [
            {
              user: {
                nickname: item.user.nickname,
                userId: item.user.userId
              },
              content: item.content
            }
          ],
          user: {
            nickname: '默认名',
            avatarUrl:
              'http://p1.music.126.net/KxePid7qTvt6V2iYVy-rYQ==/109951165050882728.jpg',
            userId: 1
          }
        })
        // 评论数加一
        state.comments.total += 1
        // 通知(elemet ui添加的方法)
        Vue.prototype.$notify({
          title: '成功',
          message: '评论成功',
          type: 'success',
          duration: 2000,
          position: 'top-left'
        })
      } else {
        Vue.prototype.$alert('请输入内容!!', '', {
          confirmButtonText: '确定'
        })
      }
    },
    // 滚动
    getMainScrollM(state, el) {
      state.mainScroll = el
    }
  },
  actions: {
    // 歌曲详情
    querySongsA({ commit }, data) {
      api.getSong(data.ids).then(val => {
        data.songs = val.data.songs
        data.songs.forEach(item => {
          item.url = 'https://music.163.com/song/media/outer/url?id=' + item.id
        })
        commit('querySongsM', data)
      })
    },
    // 歌词
    queryLyricA({ commit }, data) {
      api.getLyric(data).then(val => {
        if (val.data.nolyric) return
        let lyric = []
        // lyric = lyric.replace(/\[(\d+):(\d+).(\d+)\]/g, '').split('\n')
        // lyric = val.data.lrc.lyric.split('↵')
        val.data.lrc.lyric.replace(
          /\[(\d+):(\d+.\d+)\]([^\n]+)/g,
          (_, m, s, content) => {
            lyric.push({
              time: m * 60 + Number(s),
              content
            })
          }
        )
        commit('queryLyricM', lyric)
      })
    },
    // 评论
    queryCommetsA({ commit }, data) {
      let { type, id, offset } = data
      api.getCommentsT(type, id, offset * 20).then(val => {
        commit('queryCommetsM', val.data)
      })
    }
  },
  modules: {}
})
