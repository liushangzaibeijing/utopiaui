<template>
  <div class="vm-card-vertical">
    <div class="card-img">
      <!-- a标签点击进入详情页  -->
      <!-- 鼠标悬浮出现影片描述  -->
      <el-popover
        placement="right"
        width="300"
        trigger="hover">
          <div>
            <el-row>
              <el-col :span="24"><a href=""><span  style=" font-size: 25px; color: #666699">与空姐同居的日子 &nbsp;&nbsp; 2019</span> </a></el-col>
            </el-row>
            <br />
            <el-row :gutter="5">
              <el-col :span="14">
<!--                <el-rate v-model="#99A9BF" :colors="colors"></el-rate>-->
              </el-col>
              <el-col :span="10">
                <span>{{movie.rate}} 8.0 </span>&nbsp;&nbsp;<span>({{movie.number}}1235人评价)</span>
              </el-col>
            </el-row>
            <br />
            <el-row :gutter="2" >
              <el-col :span="8">
                <el-tag class="info" > 90分钟 </el-tag>
              </el-col>
              <el-col :span="8">
                <el-tag class="info" > 中国内陆 </el-tag>
              </el-col>
              <el-col :span="8">
                <!-- 需要遍历标签-->
                <el-tag class="info" > 喜剧 </el-tag>
              </el-col>
            </el-row>
            <br />
            <el-row >
              <el-col :span="24">
                <span> 导演&nbsp;&nbsp;&nbsp;xieqx </span>
              </el-col>
            </el-row>
            <br />
            <el-row >
              <el-col :span="24">
                <span> 主演&nbsp;&nbsp;&nbsp;xieqx/zhangsan/lisi </span>
              </el-col>
            </el-row>
            <br />
            <el-row >
              <el-col :span="24">
                <span> 剧情：&nbsp;&nbsp;&nbsp;xieqx/zhangsan/lisi  主演&nbsp;&nbsp;&nbsp;xieqx/zhangsan/lisi
                 主演&nbsp;&nbsp;&nbsp;xieqx/zhangsan/lisi 主演&nbsp;&nbsp;&nbsp;xieqx/zhangsan/lisi 主演&nbsp;&nbsp;&nbsp;xieqx/zhangsan/lisi
                   主演&nbsp;&nbsp;&nbsp;xieqx/zhangsan/lisi 主演&nbsp;&nbsp;&nbsp;xieqx/zhangsan/lisi
                   主演&nbsp;&nbsp;&nbsp;xieqx/zhangsan/lisi 主演&nbsp;&nbsp;&nbsp;xieqx/zhangsan/lisi
                   主演&nbsp;&nbsp;&nbsp;xieqx/zhangsan/lisi 主演&nbsp;&nbsp;&nbsp;xieqx/zhangsan/lisi
                 主演&nbsp;&nbsp;&nbsp;xieqx/zhangsan/lisi 主演&nbsp;&nbsp;&nbsp;xieqx/zhangsan/lisi</span>
              </el-col>
            </el-row>
          </div>
         <img slot="reference"  id="movieImg" :src="getImages(movie.picture)" alt=""  @click="showMovieDetail()" />
      </el-popover>

    </div>
    <div class="card-desc panel-body ">
      <p class="p-style">{{ movie.shortName }}&nbsp;<strong>{{movie.score}}</strong></p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MovieCard',

    props: {
      movie: {
        type: Object,
      },

    },
    data: function () {
      return {
        modalDetail: false,
        gridData:[],
        colors: ['#99A9BF', '#F7BA2A', '#FF9900']
      }
    },
    methods: {
      deleteOk: function () {
        this.$emit('delete-ok')
      },
      showMovieDetail(){

        this.$router.push({
          path: '/movieInfo',
        })
      },
      // 解决403图片缓存问题
      getImages( _url ){
        if( _url !== undefined ){
          let _u = _url.substring( 7 );
          return 'https://images.weserv.nl/?url=' + _u;
        }
      }

    }
  }
</script>
