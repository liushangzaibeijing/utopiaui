<template>
  <aside class="aside-content">
    <h2 class="content-header">电影分类</h2>
    <ul>
      <li
        v-for="(movieTag, index) in movieTags"
        :key="index"
        class="aside-item"
        :class="{'active-movie-tag': movieTag === currentMovieTag}"
        @click="changeMovieTag(movieTag)"
      >
        {{movieTag}}
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'MovieTag',
  computed: {
    movieTags () {
      //return this.$store.state.movie.movieTags
      return ["热门", "最新", "经典", "华语", "欧美", "韩国", "日本", "动作", "喜剧", "爱情", "科幻", "悬疑", "恐怖", "动画", "可播放", "豆瓣高分", "冷门佳片"]
    },
    currentMovieTag () {
      // return this.$store.state.movie.currentMovieTag
      return "经典"
    },
    tagMovies () {
      return this.$store.state.movie.tagMovies
    }
  },

  methods: {
    changeMovieTag (tag) {
      this.$store.commit('SET_CURRENT_MOVIE_TAG', tag)
      if (!this.tagMovies[tag]) {
        this.$store.dispatch('getCurrentTagMovies', {count: 20})
      } else {
        this.$store.commit('SET_CURRENT_TAG_MOVIES', this.tagMovies[tag])
      }
    }
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
