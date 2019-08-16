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
              <el-col :span="24">
                 <a onclick="showMovieDetail">
                   <span  style=" font-size: 25px; color: #666699">{{movie.name}} &nbsp;&nbsp;({{getReleaseYear(movie.releaseTime)}})</span>
                 </a>
              </el-col>
            </el-row>
            <br />
            <el-row :gutter="5">
              <el-col :span="11">
                <el-rate
                  v-model="score"
                  disabled
                  text-color="#ff9900">
                </el-rate>

              </el-col>
              <el-col :span="13">
                <span>   <span style="color: #e09015; font-size: 13px;">{{score*2}}</span>&nbsp;&nbsp;&nbsp;&nbsp;({{movie.evaluateNumber}}评价)</span>
              </el-col>
            </el-row>
            <br />
            <el-row :gutter="2"  >
              <el-tag class="info" style="margin: 10px;" v-for="(item,index) in movieTypes"  :key="index"> {{item}} </el-tag>
<!--                <el-tag class="info"  > {{item}} </el-tag>-->
<!--                <el-tag class="info"  > {{movie.filmmakingArea}}  </el-tag>-->
<!--                &lt;!&ndash; 需要遍历标签&ndash;&gt;-->
<!--                <el-tag class="info" > {{movie.tag}} </el-tag>-->
            </el-row>
            <br />
            <el-row >
              <el-col :span="24">

                <span><el-tag type="success" > 导演：</el-tag>&nbsp;&nbsp;&nbsp;{{movie.director}} </span>
              </el-col>
            </el-row>
            <br />
            <el-row >
              <el-col :span="24">
                <span> <el-tag type="success" > 主演：</el-tag>&nbsp;&nbsp;&nbsp;{{movie.leadActor}} </span>
              </el-col>
            </el-row>
            <br />
            <el-row >
              <el-col :span="24">
                <span> <el-tag type="success" > 剧情： </el-tag> &nbsp;&nbsp;{{movie.synopsis}}</span>
              </el-col>
            </el-row>
          </div>
         <img slot="reference"  id="movieImg" :src="getImages(movie.picture)" alt=""  @click="showMovieDetail()" />
      </el-popover>

    </div>
    <div class="card-desc panel-body ">
      <p class="p-style">{{ movie.shortName }}&nbsp;&nbsp;&nbsp;<strong>{{movie.score}}</strong></p>
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
        movieTypes:[],
        score:5.0,
      }
    },
    methods: {
      deleteOk: function () {
        this.$emit('delete-ok')
      },
      showMovieDetail(){
        this.$router.push({
          path: '/movieInfo',
          query:{id:this.movie.id},
        })
      },
      // 解决403图片缓存问题
      getImages( _url ){
        if( _url !== undefined ){
          let _u = _url.substring( 7 );
          return 'https://images.weserv.nl/?url=' + _u;
        }
      },
      //获取上映时间
      getReleaseYear(releaseTime){
        let releaseYear = releaseTime.substring(0,4);
        console.log("上映日期：+"+releaseYear);
        return releaseYear;
      },
    },

    mounted(){
      this.score = this.movie.score/2;
      let movieLengths = this.movie.movieLength.split("/");
      movieLengths.forEach(item => {
        this.movieTypes.push(item)
      });
      let filmmakingAreas = this.movie.filmmakingArea.split("/");
      filmmakingAreas.forEach(item => {
        this.movieTypes.push(item)
      });
      let tags = this.movie.tag.split("/");
      tags.forEach(item => {
        this.movieTypes.push(item)
      });

      console.log("总记录 "+this.movieTypes);
    }
  }
</script>
