import axios from 'axios';
import url from './url';

axios.defaults.headers = {
  'Content-type': 'application/json'
}
//获取电影列表
export const getMovieList = params => axios.post(url.getMovieList, params).then(res => res.data);
//获取电影详情
export const getMovie = params => axios.post(url.getMovie, params).then(res => res.data);
//获取所有的电影标签
export const selectMovieTags = params => axios.post(url.selectMovieTags, params).then(res => res.data);

