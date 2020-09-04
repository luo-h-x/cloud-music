import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
// import Discover from '../views/discover'
// import Personality from '../views/discover/Personality'
// import SongList from '../views/discover/SongList'
// import RadioStation from '../views/discover/RadioStation'
// import RankingList from '../views/discover/RankingList'
// import SingerList from '../views/discover/SingerList'
// import LatestMusic from '../views/discover/LatestMusic'
// import PlayList from '../views/PlayList'
// import User from '../views/User'
// import Song from '../views/Song'
// import Singer from '../views/Singer'
// import Search from '../views/Search'
// import Album from '../views/Album'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/Discover'
  },
  // 发现音乐
  {
    path: '/Discover',
    component: Layout,
    children: [
      {
        path: '',
        // component: Discover,
        component: () => import('../views/discover'),
        redirect: 'Personality',
        children: [
          {
            path: 'Personality',
            component: () => import('../views/discover/Personality'),
            meta: { title: '个性推荐', keepAlive: true }
          },
          {
            path: 'SongList',
            component: () => import('../views/discover/SongList'),
            meta: { title: '歌单', keepAlive: true }
          },
          {
            path: 'RadioStation',
            component: () => import('../views/discover/RadioStation'),
            meta: { title: '主播电台', keepAlive: true }
          },
          {
            path: 'RankingList',
            component: () => import('../views/discover/RankingList'),
            meta: { title: '排行榜', keepAlive: true }
          },
          {
            path: 'SingerList',
            component: () => import('../views/discover/SingerList'),
            meta: { title: '歌手', keepAlive: true }
          },
          {
            path: 'LatestMusic',
            component: () => import('../views/discover/LatestMusic'),
            meta: { title: '最新音乐', keepAlive: true }
          }
        ]
      }
    ]
  },
  // 歌单
  {
    path: '/PlayList',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        component: () => import('../views/PlayList'),
        meta: { keepAlive: false }
      }
    ]
  },
  // 用户
  {
    path: '/User',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('../views/User'),
        meta: { keepAlive: false }
      }
    ]
  },
  // 歌曲
  {
    path: '/Song',
    component: Layout,
    children: [
      {
        path: '',
        // component: Song,
        component: () => import('../views/Song'),
        meta: { keepAlive: false }
      }
    ]
  },
  // 歌手
  {
    path: '/Singer',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('../views/Singer'),
        redirect: 'Album',
        children: [
          {
            path: 'Album',
            component: () => import('../views/Singer/Album.vue'),
            meta: { title: '专辑', keepAlive: false }
          },
          {
            path: 'MV',
            component: () => import('../views/Singer/MV.vue'),
            meta: { title: 'MV', keepAlive: false }
          },
          {
            path: 'Details',
            component: () => import('../views/Singer/Details.vue'),
            meta: { title: '歌手详情', keepAlive: false }
          },
          {
            path: 'Resemble',
            component: () => import('../views/Singer/Resemble.vue'),
            meta: { title: '相似歌手', keepAlive: false }
          }
        ]
      }
    ]
  },
  // 搜索
  {
    path: '/Search',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('../views/Search'),
        redirect: 'Song',
        children: [
          {
            path: 'Song',
            component: () => import('../views/Search/Song.vue'),
            meta: { title: '单曲', keepAlive: false }
          },
          {
            path: 'Singer',
            component: () => import('../views/Search/Singer.vue'),
            meta: { title: '歌手', keepAlive: false }
          },
          {
            path: 'Album',
            component: () => import('../views/Search/Album.vue'),
            meta: { title: '专辑', keepAlive: false }
          },
          {
            path: 'Video',
            component: () => import('../views/Search/Video.vue'),
            meta: { title: '视频', keepAlive: false }
          },
          {
            path: 'Songsheet',
            component: () => import('../views/Search/Songsheet.vue'),
            meta: { title: '歌单', keepAlive: false }
          },
          {
            path: 'User',
            component: () => import('../views/Search/User.vue'),
            meta: { title: '用户', keepAlive: false }
          }
        ]
      }
    ]
  },
  // 专辑
  {
    path: '/Album',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('../views/Album'),
        redirect: 'Songs',
        children: [
          {
            path: 'Songs',
            component: () => import('../views/Album/Songs.vue'),
            meta: { title: '歌曲列表', keepAlive: false }
          },
          {
            path: 'Comments',
            component: () => import('../views/Album/Comments.vue'),
            meta: { title: '评论', keepAlive: false }
          },
          {
            path: 'Details',
            component: () => import('../views/Album/Details.vue'),
            meta: { title: '专辑详情', keepAlive: false }
          }
        ]
      }
    ]
  },
  // 专辑
  {
    path: '/Video',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('../views/Video'),
        meta: { title: '视频', keepAlive: true }
      },
      {
        path: 'Detail',
        component: () => import('../views/Video/Detail.vue'),
        meta: { title: '视频详情', keepAlive: false }
      }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
