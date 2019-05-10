<template>
  <el-row class="page">
    <el-col :span="24">
      <!-- 页面的头部分 -->
      <the-header :open-nav="openNav" @toggle-open="toggleOpen"></the-header>
    </el-col>
    <el-col :span="24" >
      <!-- 页面home -->
          <the-main></the-main>
    </el-col>
    <el-col :span="24" >
       <the-footer></the-footer>
    </el-col>
  </el-row>
</template>

<script>
import TheLayoutHeader from './TheLayoutHeader'
import TheLayoutFooter from './TheLayoutFooter'
import TheLayoutMain from './TheLayoutMain'

export default {
  name: 'TheLayout',
  data () {
    let min_screen = window.innerWidth < 768
    return {
      // openNav 打开导航 如果是大屏幕默认打开导航列表 否则小屏幕 不打开导航列表
      openNav: !min_screen,
      minScreen: min_screen
    }
  },
  methods: {
    toggleOpen () {
      this.openNav = !this.openNav
    }
  },
  components: {
    //使用
    'the-header': TheLayoutHeader,
    'the-footer': TheLayoutFooter,
    'the-main': TheLayoutMain
  }
}
</script>

<style scoped lang="scss">
.page {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  .page-main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0;
    .page-content {
      position: absolute;
      left: 240px;
      right: 0;
      height: 100%;
    }
    .page-content-hide-aside {
      left: 65px;
    }
  }
}
</style>
