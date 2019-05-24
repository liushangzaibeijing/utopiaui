import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';
Vue.use(Vuex);

// 开发环境下开启严格模式

const store = new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
});

export  default  store
