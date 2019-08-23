<template>
  <BookImageList  class="vm-margin"></BookImageList>
</template>

<script>
  import BookImageList from '@/components/book/book-image-list'
  export default {
    name: 'bookList',
    components: {
      BookImageList
    },
    methods: {
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
