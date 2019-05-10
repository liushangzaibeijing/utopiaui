import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TheLayout from '@/pages/layout/TheLayout'
import FuncTable from '@/pages/functions/table/FuncTable'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: TheLayout,
      menu: true,
      // children: [
      //   {
      //     path: '/table',
      //     name: 'menu.table',
      //     icon: 'el-icon-search',
      //     component: FuncTable
      //   }
      // ]
    },
  ]
})
