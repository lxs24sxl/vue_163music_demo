import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/views/Recommend/recommend'
import Hot from '@/views/Hot/hot'
import Find from '@/views/Find/find'
import HotList from '@/components/hot-list/hot-list'
import Song from '@/views/Song/song'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
    	path: '/hot',
    	name: 'Hot',
    	component: Hot
    },
    {
    	path: '/find',
    	name: 'Find',
    	component: Find,
      children:[
        {
          path:'/find/hot-list',
          component:HotList
        }
      ]
    },
    {
      path: '/song',
      name: 'Song',
      component: Song,
      }
  ]
})
