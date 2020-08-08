import axios from './axios'

const api = {
  // 轮播图
  getBanner () {
    return axios.get('/banner')
  },
  // 推荐歌单
  getList () {
    return axios.get('/personalized?limit=10')
  },
  // 最新歌单
  getNewList () {
    return axios.get('/top/playlist?limit=32')
  },
  // 标签歌单
  getTag (keyword) {
    return axios.get(`/top/playlist?limit=32&cat=${keyword}`)
  },
  // 歌单详情
  getDetail (id) {
    return axios.get(`/playlist/detail?id=${id}`)
  },
  // 歌单评论
  getComments (id) {
    return axios.get(`/comment/playlist?id=${id}`)
  },
  // 推荐独家放送
  getSole () {
    return axios.get('/personalized/privatecontent')
  },
  // 推荐最新音乐
  getLatest () {
    return axios.get('/personalized/newsong')
  },
  // 推荐mv
  getMV () {
    return axios.get('/personalized/mv')
  },
  // 推荐电台
  getStation () {
    return axios.get('/personalized/djprogram')
  },
  // 用户信息
  getUser (uid) {
    return axios.get(`/user/detail?uid=${uid}`)
  },
  // 用户创建歌单
  getUserList (uid) {
    return axios.get(`/user/playlist?uid=${uid}`)
  },
  // 歌曲详情
  getSong (id) {
    return axios.get(`/song/detail?ids=${id}`)
  },
  // 歌曲歌词
  getLyric(id) {
    return axios.get(`/lyric?id=${id}`)
  },
  // 歌曲评论
  getSongC (id) {
    return axios.get(`/comment/music?id=${id}`)
  },
  // 热搜榜
  getSearchHot() {
    return axios.get('/search/hot/detail')
  }
}

export default api
