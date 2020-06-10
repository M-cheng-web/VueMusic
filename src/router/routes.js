import Recommend from '../views/recommend'
import Rank from '../views/rank'
import Search from '../views/search'
import Singer from '../views/singer'

// 推荐歌单详情页 & 歌手详情页
const MusicDetail = () => import(/* webpackChunkName: 'DiscDetail' */ '../views/base/music-detail')

export default [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: Recommend
  },
  {
    path: '/rank',
    name: 'rank',
    component: Rank
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/singer',
    name: 'singer',
    component: Singer
  },
  {
    path: '/music-detail/:type',
    name: 'detail',
    meta: { index: 1 },
    component: MusicDetail
  }
]