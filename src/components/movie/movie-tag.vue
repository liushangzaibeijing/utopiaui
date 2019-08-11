<template>
  <aside class="aside-content">
    <h2 class="content-header">电影分类</h2>
    <ul>
      <li
        v-for="(movieTag, index) in movieTags"
        :key="index"
        class="aside-item"
        :class="{'active-movie-tag': movieTag.name === currentMovieTag.name}"
        @click="changeMovieTag(movieTag)"
      >
        {{movieTag.name}}
      </li>
    </ul>
  </aside>
</template>

<script>
import { selectMovieTags} from "../../api/api";
export default {
  name: 'MovieTag',
  data() {
    return {
      movieTags: [],
      tag:null,
    }
  },
    computed: {

    currentMovieTag () {
      return this.movieTags[0];
    },

  },

  methods: {
    //点击电影标签 查询指定的电影
    changeMovieTag (tag) {

      //往父组件中传输数据
      this.$emit('sendTagId',tag.id);
    },
    //查询电影的所有标签
    selectMovieTags(){
      selectMovieTags({}).then(res => {
        // res msg code
        let data = JSON.parse(res.data)
        this.movieTags = data;
      });
    }
  },

  mounted() {
    this.selectMovieTags();
  }
}
</script>

<style scoped>
  .aside-item:hover{
    background: #f0f3f5;
  }
  .active-movie-tag{
    background: #f0f3f5;
  }
</style>
