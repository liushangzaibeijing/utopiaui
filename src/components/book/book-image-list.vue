<template>
  <div class="vm-image-list centerMeBox">
    <el-row>
      <el-col :span="21">
    <Row class="image-list-heading vm-panel">
      <!-- 搜索框  -->
      <Row type="flex" align="middle" justify="space-between" class="panel-body">
       <div class="search-bar">
          <Input placeholder="Please enter ..." v-model="keyword" style="width: 300px" />
          <Button type="success" round class="searchButton" @click="search"><i class="fa fa-search"></i></Button>
        </div>
        <Row type="flex" align="middle" class="page">
          <span>{{currentPage}}</span>
          <span>第</span>
          <Input :max="40" :min="1" :number="true" v-model="currentPage" class="input-number" @on-change=" updateDataShow " />
          <span class="margin-end">/ 页</span>
          <span class="total">总记录 {{ total }}</span>

          <Page :total="total" :current="currentPage" :page-size="showNum" @on-change="pageChange"></Page>
        </Row>
      </Row>
    </Row>
    <Row>
      <Row class="image-list" :gutter="16">
        <Col :lg="6" :sm="12" class="vm-margin" v-for="item in dataShow" :key="item.id">
          <!-- 每一个图片的显示列表组建是 VmCard组件 传递的参数  editable是否可编辑  图片标题  图片描述 图片地址 编辑地址  删除-->
          <BookCard :editable="false" :book="item" ></BookCard>
        </Col>
      </Row>
    </Row>
      </el-col>
      <el-col :span="3">
           <!-- 子组件向父组件传递参数   this.$emit('sendTagId',tag.id);  -->
          <BookTag v-on:sendTagId="getBookByTagId"></BookTag>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import BookCard from '@/components/book/book-card'
  import BookTag from '@/components/book/book-tag'
  import { getBookList} from "../../api/api";
  export default {
    name: 'BookImageList',
    components: {
       BookCard,
       BookTag
    },
    props: {
      data: {
        type: Object,
      }
    },
    data: function () {
      return {
        keyword: '', // keyword for search
        dataShow: [], // data for showing
        showNum: 40, // number of item per page
        currentPage: 1,
        total:20,
        bookQuery:{
          pageNum:null,
          pageSize:null,
          type:null   //书籍标签
        }
      }
    },
    methods: {
      //页码改变触发重新获取电影信息
      updateDataShow: function () {
        this.bookQuery.pageNum = this.currentPage
        this.bookQuery.pageSize = this.showNum;
        this.selectBookList();
      },
      pageChange: function (page) {
        //console.log("当前页码数："+page);
        this.currentPage = page;
        this.updateDataShow();
      },
      //电影的搜索操作
      search: function () {
        let that = this
        let tempData = that.data
        that.dataShow = []
        tempData.forEach(function (elem) {
          for (let i in elem) {
            if (elem[i].toString().indexOf(that.keyword) > -1) {
              that.dataShow.push(elem)
              return
            }
          }
        })
      },
      //删除操作暂时没有用到
      // deleteOk: function (data) {
      //   this.$emit('delete-ok', data)
      // },
      selectBookList:function () {
        //console.log("当前页码："+JSON.stringify(this.bookQuery.pageNum))
        getBookList(JSON.stringify(this.bookQuery)).then(res => {
          // res msg code
          let data = JSON.parse(res.data)
          this.parseData(data)
        });
      },
      //电影数据信息的转换
      parseData:function(data){
        this.dataShow = JSON.parse(data.list); //update dataShow once data changed
        //console.log(this.dataShow)
        this.total = data.total;
        this.currentPage = data.page

      },
      //根据用户点击的标签重新查询对应标签下的电影
      getBookByTagId:function (tagId){
        this.bookQuery.pageNum = 1;
        //添加标签类型
        this.bookQuery.tag = tagId;
        //再次进行查询
        this.selectBookList();
      }
    },
    watch: {
      data: function () {
        this.selectBookList()
      }
    },
    mounted: function () {
     this.selectBookList()

    }
  }
</script>



