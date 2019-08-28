<template>
  <div class="book-info centerMeBox">
    <el-row gutter="100">
      <el-col :span="20" >
        <h1 class="title" style="font-size:3em;">{{bookDetail.name}}</h1>
        <div class="overall">
          <img v-bind:src=getImages(bookDetail.picture)  width="300" height="350">
          <div class="desc" style="height:300px; margin-left: -170px;">
            <span class="tag">作者: <span class="tag_content">{{bookDetail.author}}</span></span>
            <span class="tag">译者: <span class="tag_content">{{bookDetail.translator}}</span></span>
            <span class="tag">出版社: <span class="tag_content">{{bookDetail.publisHouse}}</span></span>
            <span class="tag">类型: <span class="tag_content">{{bookDetail.tag}}</span></span>
            <span class="tag">出版日期:  <span class="tag_content">{{bookDetail.publicationDate}}</span></span>
            <span class="tag">价格:  <span class="tag_content">{{bookDetail.price}}</span></span>
          </div>
          <div class="rank">
            <span class="origin">豆瓣评分</span>
            <span class="rating" v-if="rating">{{normalizeScore()}}</span>
            <star :size="24" :score="bookDetail.score" :needNullStar="needNullStar"></star>
            <span class="num" v-if="rating">{{bookDetail.evaluateNumber}}人评价</span>
          </div>
        </div>
        <div class="operate">
          <div class="want-watch"
               @click="saveWantedBook"
               :class="{'wanted': isWanted(bookDetail.id)}"
               v-text="wantedText"
          ></div>
          <div class="has-watched"
               @click="saveWatchedBook"
               :class="{'watched': isWatched(bookDetail.id)}"
          >
            <img src="avatar.jpg" alt="" v-show="hasWatched" >
            {{watchedText}}
          </div>
        </div>
        <div class="summary">
          <h1>{{bookDetail.name}}的剧情简介</h1>
          <p class="content">&nbsp;&nbsp;&nbsp;&nbsp;{{bookDetail.descption}}</p>
        </div>
<!--        <scroll class="casts" :scrollX="this.scrollX" :eventPassthrough="this.eventPassthrough" ref="scroll">-->
<!--          <div class="casts-content" ref="content">-->
<!--            <h2 class="title">作者</h2>-->
<!--          <Row class="image-list" :gutter="16">-->
<!--            <Col :lg="6" :sm="12" class="cast-item" v-for="item in allCasts" :key="item.id" @click="selectCelebrity(item.id,$event)">-->
<!--                <img  :src="getImages(item.avatars)" >-->
<!--                <h3 class="item-title">{{item.name}}</h3>-->
<!--                <span v-if="item.isDirector">导演</span>-->
<!--                <span v-else="!item.isDirector">演员</span>-->
<!--              <div class="no-result" v-if="!allCasts.length">-->
<!--                抱歉，暂无影人信息 :(-->
<!--              </div>-->
<!--            </Col>-->


<!--          </Row>-->
<!--          </div>-->
<!--        </scroll>-->
       </el-col>
      <el-col :span="4">
        <BookTag v-on:sendTagId="getBookByTagId"></BookTag>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Star from '@/base/star/star';
  import Scroll from '@/base/scroll/scroll';
  import BookTag from '@/components/book/book-tag'
  import { getBook } from "../../api/api";
  export default {
    // props: {
    //   bookDetail: {
    //     type: Object,
    //   }
    // },
    data() {
      return {
        scrollX: true,
        eventPassthrough: 'vertical',
        needNullStar: true,
        watchedText: '看过',
        wanted: false,
        wantedText: '想看',
        hasWatched: false,
        book:{id:"2"},
        bookDetail: {
          type: Object,
          default: function(){
            return {
              id:"",
              name:"",
              author:"",
              translator:"",
              publisHouse:"",
              publicationDate:"",
              price:"",
              score:null,
              evaluateNumber:null,
              picture:"",
              descption:"",
              tag:""
            }
          }
        }
      };
    },
    mounted() {
      this.getBook();
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
        let rating = this.bookDetail.score;
        if (rating === 0) {
          return false;
        }
        return true;
      },
      //获取书籍标签
      tags() {
        let year = this.bookDetail.publicationDate;
        let tag = this.bookDetail.tag;
        return `${year}/${tag}`;
      },

      //计算发布日期
      pubdate() {
        let date = this.bookDetail.publicationDate.substring(0,4);
        // for (let i = 0; i < date.length; i++) {
        //   if (date[i].indexOf('电影节') === -1) {
        //     pubdate = date[i]; // 没有在中国大陆上映，取不为电影节的最后一个信息
        //   }
        //   if (date[i].indexOf('中国大陆') > -1) {
        //     pubdate = date[i];
        //     break;name
        //   }
        // }
        // if (!pubdate) {
        //   pubdate = '暂无信息';
        // }
        return date;
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
      saveWatchedBook() {
        //this.markWatchedBook(this.book);
        this.$store.dispatch("markWatchedBook",this.book);
        const index = this.$store.state.watchedBooks.findIndex((item) => {
          return item.id === this.book.id;
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
      saveWantedBook() {
        //this.markWantedBook(this.book);
        this.$store.dispatch("markWantedBook",this.book);
        const index = this.$store.state.wantedBooks.findIndex((item) => {
          return item.id === this.book.id;
        });
        if (index > -1) {
          this.wantedText = '已想看';
        } else {
          this.wantedText = '想看';
        }
      },
      //判断是否已经保存了想看的意愿
      isWanted(id) {

        let wantedBooks = this.$store.state.wantedBooks;
        const index = this.$store.state.wantedBooks.findIndex((item) => {
          return item.id === id;
        });
        if (index > -1) {
          this.wantedText = '已想看';
          return true;
        }
        return false;
      },
      isWatched(id) {
        const index = this.$store.state.watchedBooks.findIndex((item) => {
          return item.id === id;
        });
        if (index > -1) {
          this.hasWatched = true;
          return true;
        }
        return false;
      },
      normalizeScore() { // 数位补零
        let len = this.bookDetail.score.toString().length;
        if (len < 2) {
          return `${this.bookDetail.score}.0`;
        }
        return this.bookDetail.score;
      },
      _initPics() {
        let picWidth = 90;
        let margin = 8;
        // let width = (picWidth + margin) * this.allCasts.length - margin;
        //this.$refs.content.style.width = width + 'px';
      },
      getBook(){
        console.log("id "+this.$route.query.id)
        getBook(Number.parseInt(this.$route.query.id)).then(res => {
          // res msg code
          let data = JSON.parse(res.data)
          this.bookDetail = data;
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
      getBookByTagId:function (tagId){
        // this.BookQuery.pageNum = 1;
        // //添加标签类型
        // this.BookQuery.type = tagId;
        // //再次进行查询
        // this.selectBookList();
        //跳转路由并添加参数
        this.$router.push({
          path: "/book",
          query: { pageNum: 1,type:tagId}
        })
      },
    },
    components: {
      Star,
      Scroll,
      BookTag
    },

  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .book-info
    background-color: $color-background
    padding: 0 20px
    .overall
      display: flex
      height: 400px
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
