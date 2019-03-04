// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueBetterCalendar from 'vue-better-calendar'
import VueResource from 'vue-resource'
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import MintUI, {Popup} from 'mint-ui'
import 'mint-ui/lib/style.css'
// import ElementUI from 'element-ui'
import {
  Button, Form, FormItem, Upload, Message, Input
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/components/global.js'
import '@/components/rem.js'
import moment from 'moment'
import App from './App'
moment.locale('zh_CN')
// import GoBack from '@/components/goBack'
// import 'swipr/dist/css/swiper.css'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'

// require('vue-video-player/src/custom-theme.css')

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Upload)
Vue.use(Input)
Vue.use(VueResource)
Vue.use(VideoPlayer)
Vue.use(MintUI)
Vue.use(VueBetterCalendar)
// Vue.use(ElementUI)

Vue.component('Popup', Popup)
// Vue.use(swiper, swiperSlide)

Vue.prototype.$message = Message

// Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk'
Vue.http.options.emulateJSON = true
Vue.filter('gradeFilter', function (grade) {
  let gradeFilter = ['初一', '初二', '初三', '高一', '高二', '高三']
  return grade ? gradeFilter[grade - 7] : '全部'
})
Vue.filter('subjectFilter', function (subject) {
  let subjectFilter = ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治']
  return subject ? subjectFilter[subject - 1] : '全部'
})

Vue.filter('timeFilter', function (val) {
  let time = parseInt(val) // 先将接收到的json格式的日期数据转换成可用的js对象日期
  let result = Date.parse(new Date()) - parseInt(val)
  return result < 3600000 ? '1小时前' : (result > 60 * 60 * 24000 ? moment(time).format('YYYY-MM-DD') : moment(time).startOf('hour').fromNow())
})
Vue.filter('wordLimit', function (content, maxLength) {
  return (content.length > maxLength) ? (content.slice(0, maxLength) + '...') : (content)
})
Vue.filter('dateFilter', function (val) {
  return moment(val).format('YYYY-MM-DD HH:mm:ss')
})
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  data: {
    userID: localStorage.getItem('userID') | 24
  },
  router,
  template: '<App/>'
})
