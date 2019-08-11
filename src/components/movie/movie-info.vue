<template>
  <div class="movie-info centerMeBox">
    <el-row gutter="100">
      <el-col :span="20" >
        <h1 class="title" style="font-size:3em;">{{movieDetail.name}}</h1>
        <div class="overall">
          <img v-bind:src=getImages(movieDetail.picture)  width="300" height="350">
          <div class="desc">
            <span class="tag">导演: <span class="tag_content">{{movieDetail.director}}</span></span>
            <span class="tag">制片: <span class="tag_content">{{movieDetail.screenWriter}}</span></span>
            <span class="tag">主演: <span class="tag_content">{{movieDetail.leadActor}}</span></span>
            <span class="tag">类型:  <span class="tag_content">{{movieDetail.tag}}</span></span>
            <span class="tag">别名:  <span class="tag_content">{{movieDetail.alias}}</span></span>
            <span class="tag">制片国家/地区:  <span class="tag_content">{{movieDetail.filmmakingArea}}</span></span>
            <span class="tag">语言:  <span class="tag_content">{{movieDetail.language}}</span></span>
            <span class="tag">上映日期:  <span class="tag_content">{{movieDetail.releaseTime}}</span></span>
            <span class="tag">片长:  <span class="tag_content">{{movieDetail.movieLength}}</span></span>
          </div>
          <div class="rank">
            <span class="origin">豆瓣评分</span>
            <span class="rating" v-if="rating">{{normalizeScore()}}</span>
            <star :size="24" :score="movieDetail.rating" :needNullStar="needNullStar"></star>
            <span class="num" v-if="rating">{{movieDetail.evaluateNumber}}人评价</span>
          </div>
        </div>
        <div class="operate">
          <div class="want-watch"
               @click="saveWantedMovie"
               :class="{'wanted': isWanted(movieDetail.id)}"
               v-text="wantedText"
          ></div>
          <div class="has-watched"
               @click="saveWatchedMovie"
               :class="{'watched': isWatched(movieDetail.id)}"
          >
            <img src="avatar.jpg" alt="" v-show="hasWatched" >
            {{watchedText}}
          </div>
        </div>
        <div class="summary">
          <h1>{{movieDetail.shortName}}的剧情简介</h1>
          <p class="content">&nbsp;&nbsp;&nbsp;&nbsp;{{movieDetail.synopsis}}</p>
        </div>
        <scroll class="casts" :scrollX="this.scrollX" :eventPassthrough="this.eventPassthrough" ref="scroll">
          <div class="casts-content" ref="content">
            <h2 class="title">影人</h2>
          <Row class="image-list" :gutter="16">
            <Col :lg="6" :sm="12" class="cast-item" v-for="item in allCasts" :key="item.id" @click="selectCelebrity(item.id,$event)">
                <img  :src="getImages(item.avatars)" >
                <h3 class="item-title">{{item.name}}</h3>
                <span v-if="item.isDirector">导演</span>
                <span v-else="!item.isDirector">演员</span>
              <div class="no-result" v-if="!allCasts.length">
                抱歉，暂无影人信息 :(
              </div>
            </Col>


          </Row>
          </div>
        </scroll>
       </el-col>
      <el-col :span="4">
        <MovieTag v-on:sendTagId="getMovieByTagId"></MovieTag>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Star from '@/base/star/star';
  import Scroll from '@/base/scroll/scroll';
  import MovieTag from '@/components/movie/movie-tag'
  import { getMovie } from "../../api/api";

  export default {
    props: {
      movieDetail: {
        type: Object,
      }
    },
    data() {
      return {
        scrollX: true,
        eventPassthrough: 'vertical',
        needNullStar: true,
        watchedText: '看过',
        wanted: false,
        wantedText: '想看',
        hasWatched: false,
        movie:{id:"2"},
        movieDetail: {
          type: Object,
          default: function(){
            return {
              id:"",
              shortName:"",
              name:"",
              releaseTime:"",
              picture:"",
              tag:"",
              type:"",
              score:null,
              evaluateNumber:null,
              movieLength:"",
              directors:[],
              leadActors:[],
              synopsis:''
            }
          }
        }
      };
    },
    mounted() {
      this.getMovie();
      //vue给我们提供了$nextTick方法，如果我们想对未来更新后的视图进行操作，
      // 我们只需要把要执行的函数传递给this.$nextTick方法
      this.$nextTick(() => {
        this._initPics();
        this.$refs.scroll.refresh();
      });


    },
    computed: {
      //计算比分
      rating() {
        let rating = this.movieDetail.rating;
        if (rating === 0) {
          return false;
        }
        return true;
      },
      //获取电影标签
      tags() {
        let year = this.movieDetail.releaseTime;
        let tag = this.movieDetail.type+"/"+this.movieDetail.tag;
        return `${year}/${tag}`;
      },
      //获取片长
      durations() {
        return this.movieDetail.movieLength;
      },
      //计算发布日期
      pubdate() {
        let date = this.movieDetail.releaseTime.substring(0,4);
        // for (let i = 0; i < date.length; i++) {
        //   if (date[i].indexOf('电影节') === -1) {
        //     pubdate = date[i]; // 没有在中国大陆上映，取不为电影节的最后一个信息
        //   }
        //   if (date[i].indexOf('中国大陆') > -1) {
        //     pubdate = date[i];
        //     break;
        //   }
        // }
        // if (!pubdate) {
        //   pubdate = '暂无信息';
        // }
        return date;
      },
      //获取导演和演员的分组
      allCasts() {
        let removeIndex = [];
        let directors = this.movieDetail.directors;
        directors.forEach((item, index) => {
          item.isDirector = true;
          //avatars 头像
          if (item.avatars === null) { // 有的导演不存在照片
            removeIndex.push(index);
          }
        });
        for (let i = removeIndex.length; i > 0; i--) { // 移除信息不完全的导演
          this.movieDetail.directors.splice(removeIndex[i - 1], 1);
        }
        removeIndex = []; // 重置移除清单
        this.movieDetail.leadActors.forEach((item, index) => {
          // console.log(index);
          if (item.avatars === null) { // 有的演员不存在照片
            removeIndex.push(index);
          }
        });
        for (let i = removeIndex.length; i > 0; i--) { // 移除信息不完全的演员
          this.movieDetail.leadActors.splice(removeIndex[i - 1], 1);
        }
        return this.movieDetail.directors.concat(this.movieDetail.leadActors);
      },


    },
    methods: {
      //子组件 传递给父组件
      selectCelebrity(id) {
        if (!event._constructed) { // 忽略浏览器派发的点击事件，只留下scroll组件派发的
          return;
        }
        this.$emit('selectCelebrity', id);
      },
      //图片防盗链处理
      replaceUrl(srcUrl) {
        if (srcUrl !== undefined) {
          return ('https://images.weserv.nl/?url=' + srcUrl.replace(/http\w{0,1}:\/\//, ''));
        }
      },
      //全局变量存储想看的电影信息
      saveWatchedMovie() {
        //this.markWatchedMovie(this.movie);
        this.$store.dispatch("markWatchedMovie",this.movie);
        const index = this.$store.state.watchedMovies.findIndex((item) => {
          return item.id === this.movie.id;
        });
        if (index > -1) {
          this.hasWatched = true;
          this.watchedText = '已看过';
        } else {
          this.hasWatched = false;
          this.watchedText = '看过';
        }
      },
      //保存想看的记录
      saveWantedMovie() {
        //this.markWantedMovie(this.movie);
        this.$store.dispatch("markWantedMovie",this.movie);
        const index = this.$store.state.wantedMovies.findIndex((item) => {
          return item.id === this.movie.id;
        });
        if (index > -1) {
          this.wantedText = '已想看';
        } else {
          this.wantedText = '想看';
        }
      },
      //判断是否已经保存了想看的意愿
      isWanted(id) {

        let wantedMovies = this.$store.state.wantedMovies;
        const index = this.$store.state.wantedMovies.findIndex((item) => {
          return item.id === id;
        });
        if (index > -1) {
          this.wantedText = '已想看';
          return true;
        }
        return false;
      },
      isWatched(id) {
        const index = this.$store.state.watchedMovies.findIndex((item) => {
          return item.id === id;
        });
        if (index > -1) {
          this.hasWatched = true;
          return true;
        }
        return false;
      },
      normalizeScore() { // 数位补零
        let len = this.movieDetail.score.toString().length;
        if (len < 2) {
          return `${this.movieDetail.score}.0`;
        }
        return this.movieDetail.score;
      },
      _initPics() {
        let picWidth = 90;
        let margin = 8;
        let width = (picWidth + margin) * this.allCasts.length - margin;
        //this.$refs.content.style.width = width + 'px';
      },
      getMovie(){
        console.log("id "+this.$route.query.id)
        getMovie(Number.parseInt(this.$route.query.id)).then(res => {
          // res msg code
          let data = JSON.parse(res.data)
          this.movieDetail = data;
        });
      },
      // 解决403图片缓存问题
      getImages( _url ){
        if( _url !== undefined ){
          let _u = _url.substring( 7 );
          return 'https://images.weserv.nl/?url=' + _u;
        }
      },
      //根据用户点击的标签重新查询对应标签下的电影
      getMovieByTagId:function (tagId){
        this.movieQuery.pageNum = 1;
        //添加标签类型
        this.movieQuery.type = tagId;
        //再次进行查询
        this.selectMovieList();
      },
    },
    components: {
      Star,
      Scroll,
      MovieTag
    },

  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .movie-info
    background-color: $color-background
    padding: 0 20px
    .overall
      display: flex
      height: 520px
      justify-content: space-between
      .desc
        /*flex: 70% 0 0*/
        overflow: hidden
        display: flex
        flex-direction: column
        justify-content: space-around
        .original-title
          // no-wrap()
        .title
          font-size: $font-size-large
          color: $color-text-f
          padding: 10px 0 5px 0
        .tag
          text-align: left
          margin: 10px
          font: 12px Arial, Helvetica, sans-serif;
          line-height: 150%;
          color: #666666;
          .tag_content
            color: #37a;
    span
          font-size: $font-size-small
      .rank
        height: 155px
        width: 400px
        margin-top: 15px
        padding: 10px 15px
        display: flex
        flex-direction: column
        align-items: center
        justify-content: space-between
        // border-1px(#ccc)
        box-shadow: 0px 0px 5px #ccc
        background-color: #f8f8f8
        span
          font-size: $font-size-small
          color: $color-text
          &.rating
            font-size: $font-size-large
            color: $color-text-f
    .summary
      margin-top: 20px
      padding-top: 20px
      text-align :left
      border-top-1px(#ccc)
      .title
        font-size: $font-size-small
      .content
        padding-top: 10px
        font-size: $font-size-medium
        color: $color-text-f
        line-height: 25px
    .operate
      margin-top: 50px
      line-height: 35px
      height: 35px
      display: flex
      text-align: center
      font-size: $font-size-medium
      color: $color-theme-f
      width:200px
      .want-watch
        flex: 1
        border: 1px solid $color-theme-f
        border-radius: 5px
        margin-right: 20px
        &.wanted
          border: 1px solid $color-collect
          color: $color-collect
      .has-watched
        flex: 1
        border: 1px solid $color-theme-f
        border-radius: 5px
        &.watched
          border: 1px solid $color-collect
          color: $color-collect
          img
            display: inline-block
            vertical-align: middle
            padding-bottom: 2px
            border-radius: 50%
    .casts
      padding: 30px 0
      width: 100%
      white-space: nowrap
      overflow: hidden
      font-size: 0
      border-bottom-1px($color-line)
      .casts-content
        .title
          font-size: $font-size-small
          padding-bottom: 20px
        .cast-item
          width: 165px
          height: 290px
          vertical-align: top
          display:inline-block
          text-align: center
          margin-right: 8px
          font-size: $font-size-small
          img
            height: 195px
            width: 165px
          .item-title
            color: $color-text-f
            padding: 8px 0 5px 0
            no-wrap()
        .no-result
          text-align: center
          font-size: $font-size-small
          font-size: $color-theme-f
</style>
