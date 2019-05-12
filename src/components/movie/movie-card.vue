<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
  <div :class="[type === 'horizantal' ? 'vm-card-horizantal' : 'vm-card-vertical' , 'vm-panel']">
    <div class="card-img">
      <!-- a标签点击进入详情页  -->
      <!-- 鼠标悬浮出现影片描述  -->
      <el-popover
        ref="movieProver"
        placement="right"
        width="400"
        trigger="hover">
        <el-table :data="gridData">
          <el-table-column width="150" property="date" label="日期"></el-table-column>
          <el-table-column width="100" property="name" label="姓名"></el-table-column>
          <el-table-column width="300" property="address" label="地址"></el-table-column>
        </el-table>
      </el-popover>
      <a :href="detailUrl">
        <img slot="reference"   v-popover:movieProvers id="movieImg" :src="img" alt=""  >
      </a>
    </div>
    <div class="card-desc panel-body">
      <h2>{{ title }}&nbsp;{{title}}</h2>
    </div>
    <Modal
        v-model="modalDetail"
        title="detail">
        Are you sure to delete this data?
    </Modal>
  </div>
</template>
<script>
  export default {
    name: 'MovieCard',
    props: {
      type: {
        type: String,
        default: 'vertical'
      },
      title: {
        type: String,
        default: 'Title'
      },
      img: {
        type: String,
        default: require('@/assets/img/img-1.jpg')
      },
      detailUrl: {
        type: String,
        default: '#'
      },
    },
    data: function () {
      return {
        modalDetail: false,
        gridData:[],
      }
    },
    methods: {
      deleteOk: function () {
        this.$emit('delete-ok')
      },
      showDetail(){
        debugger
         this.modalDetail = true
      },
      hidenDetail(){
        debugger
        this.modalDetail = false
      }
    }
  }
</script>
