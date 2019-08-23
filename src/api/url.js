//const base = 'http://49.232.47.236:8035/utopia';
 const base = '/utopia';

export default {
  //获取电影简写信息列表
  getMovieList:base + '/movie/movieListPage',
  //获取单个页面详情
  getMovie:base + '/movie/movieDetail',
  //获取所有的电影标签
  selectMovieTags:base + '/tag/selectMovieTags',
  //获取书籍信息列表
  getBookList:base + '/book/bookListPage',

}
