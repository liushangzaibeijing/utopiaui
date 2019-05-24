<template>
  <div class="vm-image-list centerMeBox">
    <el-row>
      <el-col span="21">
    <Row class="image-list-heading vm-panel">
      <!-- 搜索框  -->
      <Row type="flex" align="middle" justify="space-between" class="panel-body">
       <div class="search-bar">
          <Input placeholder="Please enter ..." v-model="keyword" style="width: 300px"></Input>
          <Button type="ghost" class="searchButton" @click="search"><i class="fa fa-search"></i></Button>
        </div>
        <Row type="flex" align="middle" class="page">
          <span>Show</span>
          <Input :max="40" :min="1" :number="true" v-model="showNum" class="input-number" @on-change=" updateDataShow "></Input>
          <span class="margin-end">/ Page</span>
          <span class="total">Total {{ data.length }}</span>
          <Page :total="data.length" :current="currentPage" :page-size="showNum" @on-change="pageChange"></Page>
        </Row>
      </Row>
    </Row>
    <Row>
      <Row class="image-list" :gutter="16">
        <Col :lg="6" :sm="12" class="vm-margin" v-for="item in dataShow" :key="item.id">
          <!-- 每一个图片的显示列表组建是 VmCard组件 传递的参数  editable是否可编辑  图片标题  图片描述 图片地址 编辑地址  删除-->
          <MovieCard :editable="false" :movie="item"></MovieCard>
        </Col>
      </Row>
    </Row>
      </el-col>
      <el-col span="3">
          <MovieTag></MovieTag>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import MovieCard from '@/components/movie/movie-card'
  import MovieTag from '@/components/movie/movie-tag'
  export default {
    name: 'MovieImageList',
    components: {
       MovieCard,
       MovieTag
    },
    props: {
      data: {
        type: Array,
      }
    },
    data: function () {
      return {
        keyword: '', // keyword for search
        dataShow: [], // data for showing
        showNum: 10, // number of item per page
        currentPage: 1
      }
    },
    methods: {
      updateDataShow: function () {
        let startPage = (this.currentPage - 1) * this.showNum
        let endPage = startPage + this.showNum
        this.dataShow = this.data.slice(startPage, endPage)
      },
      pageChange: function (page) {
        this.currentPage = page
        this.updateDataShow()
      },
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
      deleteOk: function (data) {
        this.$emit('delete-ok', data)
      }
    },
    watch: {
      data: function () {
        debugger
        this.dataShow = JSON.parse(this.data) //update dataShow once data changed
        console.log(this.dataShow)
      }
    },
    mounted: function () {
      this.dataShow = this.data.slice(0, this.showNum)
    }
  }
</script>



