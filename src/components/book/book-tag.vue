<template>
  <aside class="aside-content">
    <h1 class="content-header">书籍分类</h1>

    <ul >
      <li
        v-for="(bookTag, index) in bookTags"
        :key="index"
        class="aside-item"
        :class="{'active-movie-tag': bookTag.name === currentTag.name}"
        style="float: right; padding: 9px 7px 10px 3px;"
        @click="changeBookTag(bookTag)"
      >
        {{bookTag.name}}
      </li>
    </ul>
  </aside>
</template>

<script>
import { selectBookTags } from "../../api/api";
export default {
  name: 'BookTag',
  data() {
    return {
      bookTags: [],
      tag:null,
      currentTag:{},
    }
  },
    computed: {

    currentBookTag () {
      return this.bookTags[0];
    },

  },

  methods: {
    //点击书籍标签 查询指定的书籍
    changeBookTag (tag) {
      this.currentTag =  tag;
      //往父组件中传输数据
      this.$emit('sendTagId',tag.id);

    },
    //查询电影的所有标签
    selectBookTags(){
      selectBookTags({}).then(res => {
        // res msg code
        let data = JSON.parse(res.data)
        this.bookTags = data;
      });
    },

  },

  mounted() {
    this.selectBookTags();
  }
}
</script>

<style scoped>
  .aside-item:hover{
    background: #dfd7d7;
  }
  .active-movie-tag{
    background: #dfd7d7;
  }
</style>
