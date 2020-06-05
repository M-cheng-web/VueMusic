import Recommend from '../views/recommend'
import Rank from '../views/rank'
import Search from '../views/search'
import Singer from '../views/singer'

// 歌手详情页
const SingerDetail = () => import(/* webpackChunkName: 'SingerDetail' */ '../views/singer/singer-detail')

// 推荐歌单详情页 & 歌手详情页
const Detail = () => import(/* webpackChunkName: 'DiscDetail' */ '../views/base/detail')

export default [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: Recommend,
    children: [
      {
        path: 'detail/:type',
        name: 'detail',
        component: Detail
      }
    ]
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
    component: Singer,
    children: [
      {
        path: 'singer-detail/:id',
        name: 'singer-detail',
        component: SingerDetail
      }
    ]
  },
]