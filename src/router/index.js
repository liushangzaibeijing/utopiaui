import Vue from 'vue'
import Router from 'vue-router'
import TheLayout from '@/pages/layout/TheLayout'
import ImageList from '@/pages/functions/book/ImageList'
import movieImgList from '@/pages/functions/moive/ImageList'
import movieDetail from '@/pages/functions/moive/movieDetail'


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
          component: movieImgList
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
          component: movieImgList
        }
      ]
    },
    {
      path: '/movieDetail',
      component: TheLayout,
      children: [
        {
          path: '/movieDetail',
          component: movieDetail
        }
      ]
    },

  ]
})
