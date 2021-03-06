// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import '!style-loader!css-loader!less-loader!./assets/css/index.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/scss/font-awesome.scss'
import VueScroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css'
import './assets/css/common.scss'
import './assets/css/style.css'
import VueI18n from 'vue-i18n'
import myEnLocale from './assets/lang/en'
import myZhLocale from './assets/lang/zh-cn'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import iView from 'iview'
import VueLazyLoad from 'vue-lazyload'; // 图片懒加载
import store from "./store"



Vue.config.productionTip = false


/* vue-i18n */
Vue.use(VueI18n)

Vue.use(iView)

Vue.use(VueLazyLoad, {
  loading: require('./common/image/loading.gif')
});
const messages = {
  en: Object.assign(myEnLocale, enLocale),
  'zh-cn': Object.assign(myZhLocale, zhLocale)
}
const lang = localStorage.getItem('user-language') || 'zh-cn'
const i18n = new VueI18n({
  locale: lang,
  messages
})
/* element-ui */
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
/* vuescroll */
Vue.use(VueScroll, {ops: {bar: {background: '#C0C4CC'}}})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {App},
  template: '<App/>'
})
