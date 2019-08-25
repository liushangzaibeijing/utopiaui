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
                 <a onclick="showBookDetailshowBookDetail">
                   <span  style=" font-size: 25px; color: #666699">{{book.name}} &nbsp;&nbsp;({{getReleaseYear(book.publicationDate)}})</span>
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
                <span>   <span style="color: #e09015; font-size: 13px;">{{score*2}}</span>&nbsp;&nbsp;&nbsp;&nbsp;({{book.evaluateNumber}}评价)</span>
              </el-col>
            </el-row>
            <br />
            <el-row :gutter="2"  >
              <span><el-tag type="success" >类型：</el-tag>&nbsp;&nbsp;&nbsp;{{book.tagName}} </span>
            </el-row>
            <br />
            <el-row >
              <el-col :span="24">
                <span><el-tag type="success" > 作者：</el-tag>&nbsp;&nbsp;&nbsp;{{book.author}} </span>
              </el-col>
            </el-row>
            <br />
            <el-row v-if="book.translator===null || book.translator===''" >
              <el-col :span="24">
                <span> <el-tag type="success" > 译者：</el-tag>&nbsp;&nbsp;&nbsp;{{book.translator}} </span>
              </el-col>
            </el-row>
            <br />
            <el-row >
              <el-col :span="24">
                <span> <el-tag type="success" > 价格： </el-tag> &nbsp;&nbsp;{{book.price}}</span>
              </el-col>
            </el-row>
            <br />
            <el-row >
              <el-col :span="24">
                <span> <el-tag type="success" > 书籍描述： </el-tag> &nbsp;&nbsp;{{book.descption}}</span>
              </el-col>
            </el-row>
          </div>
         <img slot="reference"  id="movieImg" :src="getImages(book.picture)" alt=""  @click="showBookDetail()" />
      </el-popover>

    </div>
    <div class="card-desc panel-body ">
      <p class="p-style">{{ book.shortName }}&nbsp;&nbsp;&nbsp;<strong>{{book.score}}</strong></p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'BookCard',

    props: {
      book: {
        type: Object,
      },

    },
    data: function () {
      return {
        modalDetail: false,
        score:5.0,
      }
    },
    methods: {
      deleteOk: function () {
        this.$emit('delete-ok')
      },
      //进入商品详情页
      showBookDetail(){
        this.$router.push({
          path: '/bookInfo',
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
      this.score = this.book.score/2;
    }
  }
</script>
