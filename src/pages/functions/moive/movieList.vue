<template>
  <MovieImageList @delete-ok="deletefn" class="vm-margin"></MovieImageList>
</template>

<script>
  import MovieImageList from '@/components/movie/movie-image-list'
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

    },
    mounted() {
    },
    data: function () {
      return {
        dataImageList: []
      }
    }
  }
</script>
