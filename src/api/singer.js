import axios from './axios'

const api = {
  // 歌手信息
  getSinger(id) {
    return axios.get(`/artists?id=${id}`)
  },
  // 歌手mv
  getSingerMV(id) {
    return axios.get(`/artist/mv?id=${id}`)
  },
  // 歌手专辑
  getSingerAlbum(id) {
    return axios.get(`/artist/album?id=${id}`)
  },
  // 歌手详情
  getSingerDetails(id) {
    return axios.get(`/artist/desc?id=${id}`)
  },
  // 相似歌手
  getSingerResemble(id) {
    return axios.get(`/simi/artist?id=${id}`)
  }
}

export default api
