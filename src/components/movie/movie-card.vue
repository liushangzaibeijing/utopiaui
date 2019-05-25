<template >
  <div :class="[type === 'horizantal' ? 'vm-card-horizantal' : 'vm-card-vertical' , 'vm-panel']">
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
                <el-rate v-model="rating" :colors="colors"></el-rate>
              </el-col>
              <el-col :span="10">
                <span>{{rating}} 8.0 </span>&nbsp;&nbsp;<span>({{ratings_count}}人评价)</span>
              </el-col>
            </el-row>
            <br />
            <el-row :gutter="2" >
              <el-col :span="8">
                <el-tag class="info" hit="true"> 90分钟 </el-tag>
              </el-col>
              <el-col :span="8">
                <el-tag class="info" hit="true"> 中国内陆 </el-tag>
              </el-col>
              <el-col :span="8">
                <!-- 需要遍历标签-->
                <el-tag class="info" hit="true"> 喜剧 </el-tag>
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
         <img slot="reference"  id="movieImg" :src="img" alt=""  @click="showMovieDetail()" />
      </el-popover>

    </div>
    <div class="card-desc panel-body">
      <h2>{{ title }}&nbsp;{{title}}</h2>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MovieCard',

    props: {

      movie:{
        type:Object,
        default: function(){
          return {
            id:"2",
            title:"爱在西元前",
            original_title:"爱在西元前(原名)",
            year:"2019.06.07",
            img:require('@/assets/img/img-1.jpg'),
            genres:["家庭","喜剧"],
            rating:2,
            ratings_count:"2345",
            duration:"110分钟",
            pubdates:"2019.06.07",
            directors:[{id:'1',isDirector:true,avatars:"./avatar.jpg",name:'贾斯丁比伯'}],
            casts:[{id:'1',avatars:"./avatar.jpg",name:'贾斯丁比伯'}],
            summary:'电影《双生》讲述了艺术学校学生李品（刘昊然饰），在一次偶然的机遇下获得了一份为期一个月的兼职工作，工作内容是为马上迎来自己生日的女孩涛（陈都灵）画肖像画，为此他来到了一处偏僻的豪宅。素不相识的两位年轻人因此结缘，一段青春的邂逅就此展开，然而在朝夕相处的过程中，李品逐渐发现了这栋房子里似乎还隐藏着一些不为人知的秘密，而他与涛之间的关系也逐渐变得微妙起来。'
            detailUrl:"#"

          }
      },
      type: {
        type: String,
        default: 'vertical'
      },
      // title: {
      //   type: String,
      //   default: 'Title'
      // },
      // img: {
      //   type: String,
      //   default: require('@/assets/img/img-1.jpg')
      // },
      // detailUrl: {
      //   type: String,
      //   default: '#'
      // },
      // rateIcon:{
      //   default: 2
      // },
      // number:{
      //   type:Number,
      //   default: 1123
      // },
      // rate:{
      //   type:Number,
      //   default: 8
      // }
    },
    data: function () {
      return {
        modalDetail: false,
        gridData:[],
        //colors: ['#99A9BF', '#F7BA2A', '#FF9900']
        colors: { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
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
    }
  }
</script>
