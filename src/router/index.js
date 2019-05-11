import Vue from 'vue'
import Router from 'vue-router'
import TheLayout from '@/pages/layout/TheLayout'
import FuncTable from '@/pages/functions/table/FuncTable'
import ImageList from '@/pages/functions/book/ImageList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: TheLayout,
      menu: true,
      children: [
        {
          path: '/book',
          name: 'menu.book',
          icon: 'el-icon-reading',
          component: ImageList
        }
      ]
    },
    {
      path: '/',
      component: TheLayout,
      menu: true,
      children: [
        {
          path: '/movie',
          name: 'menu.movie',
          icon: 'el-icon-film',
          component: FuncTable
        }
      ]
    },
    {
      path: '/',
      component: TheLayout,
      menu: true,
      children: [
        {
          path: '/music',
          name: 'menu.music',
          icon: 'el-icon-headset',
          component: FuncTable
        }
      ]
    },
    {
      path: '/ImageList',
      component: ImageList,
    },
  ]
})
