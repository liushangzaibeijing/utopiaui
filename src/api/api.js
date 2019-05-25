import axios from 'axios';
import url from './url';

axios.defaults.headers = {
  'Content-type': 'application/json'
}
//获取电影列表
export const getMovieList = params => axios.post(url.getMovieList, params).then(res => res.data);

