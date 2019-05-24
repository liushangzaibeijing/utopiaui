<template>
  <MovieImageList :data="dataImageList" @delete-ok="deletefn" class="vm-margin"></MovieImageList>
</template>

<script>
  import MovieImageList from '@/components/movie/movie-image-list'
  import { getMovieList} from "../../../api/api";
  export default {
    name: 'ImageList',
    components: {
      MovieImageList
    },
    methods: {
      //删除功能
      deletefn: function (data) {
        for (let i = 0; i < this.dataImageList.length; i++) {
          if (this.dataImageList[i].id === data.id) {
            this.dataImageList.splice(i, 1)
          }
        }
      },
      selectMovieList:function () {
        getMovieList().then(res => {
          // res msg code
          debugger
          let data = JSON.parse(res.data)
          console.log("电影列表："+data.list);
          this.dataImageList = data.list;
        });

      }
    },
    mounted() {
      this.selectMovieList();
    },
    data: function () {
      return {
        dataImageList: []
      }
    }
  }
</script>
