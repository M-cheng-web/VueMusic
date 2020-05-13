import Recommend from '../views/recommend'
import Rank from '../views/rank'
import Search from '../views/search'
import Singer from '../views/singer'

const SingerDetail = () => import(/* webpackChunkName: 'SingerDetail' */ '../views/singer/singer-detail')

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