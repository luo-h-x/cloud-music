import axios from './axios'

const api = {
  // 轮播图
  getBanner() {
    return axios.get('/banner')
  },
  // 推荐歌单
  getList() {
    return axios.get('/personalized?limit=10')
  },
  // 最新歌单
  getNewList() {
    return axios.get('/top/playlist?limit=32')
  },
  // 标签歌单
  getTag(limit, keyword) {
    return axios.get(`/top/playlist?limit=${32 * limit}&cat=${keyword}`)
  },
  // 歌单详情
  getDetail(id) {
    return axios.get(`/playlist/detail?id=${id}`)
  },
  // 歌单评论
  getComments(id) {
    return axios.get(`/comment/playlist?id=${id}`)
  },
  // 推荐独家放送
  getSole() {
    return axios.get('/personalized/privatecontent')
  },
  // 推荐最新音乐
  getLatest() {
    return axios.get('/personalized/newsong')
  },
  // 推荐mv
  getMV() {
    return axios.get('/personalized/mv')
  },
  // mv url
  getUrlMv(id) {
    return axios.get(`/mv/url?id=${id}`)
  },
  // mv信息
  getMvD(id) {
    return axios.get(`/mv/detail/info?mvid=${id}`)
  },
  getMvC(id) {
    return axios.get(`/comment/mv?id=${id}`)
  },
  // 推荐电台
  getStation() {
    return axios.get('/personalized/djprogram')
  },
  // 用户信息
  getUser(uid) {
    return axios.get(`/user/detail?uid=${uid}`)
  },
  // 用户创建歌单
  getUserList(uid) {
    return axios.get(`/user/playlist?uid=${uid}`)
  },
  // 歌曲详情
  getSong(id) {
    return axios.get(`/song/detail?ids=${id}`)
  },
  // 歌曲url
  getSongU(ids) {
    return axios.get(`/song/url?id=${ids}`)
  },
  // 歌曲歌词
  getLyric(id) {
    return axios.get(`/lyric?id=${id}`)
  },
  // 歌曲评论
  getSongC(id) {
    return axios.get(`/comment/music?id=${id}`)
  },
  // 热搜榜
  getSearchHot() {
    return axios.get('/search/hot/detail')
  },
  // 搜索建议
  getSearchS(keyword) {
    return axios.get(`/search/suggest?keywords=${keyword}`)
  },
  // 搜索
  getSearch(keywords, type) {
    return axios.get(`/search?keywords=${keywords}&type=${type}`)
  },
  // 专辑
  getAlbum(id) {
    return axios.get(`/album?id=${id}`)
  },
  // 专辑评论
  getAlbumC(id) {
    return axios.get(`/comment/album?id=${id}`)
  },
  // 新歌速递
  getSongN(type) {
    return axios.get(`/top/song?type=${type}`)
  },
  // 所有榜单
  getRankingA() {
    return axios.get('/toplist')
  },
  // 歌手列表
  getSingerL(type = -1, area = -1, initial = -1) {
    return axios.get(
      `/artist/list?type=${type}&area=${area}&initial=${initial}`
    )
  },
  // 获取评论
  getCommentsT(type, id, offset) {
    return axios.get(`/comment/${type}?id=${id}&offset=${offset}`)
  }
}

export default api
