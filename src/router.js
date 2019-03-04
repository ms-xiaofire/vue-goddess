import Vue from 'vue'
import Router from 'vue-router'

// import Home from '@/views/Home'
// import checkin from '@/views/checkin'

// import gymAbuilding from '@/views/abuilding/gym-abuilding'
// import dormAbuilding from '@/views/abuilding/dorm-abuilding'
// import marketAbuilding from '@/views/abuilding/market-abuilding'

// import articleList from '@/views/article/articleList'
// import articleDetails from '@/views/article/articleDetails'

// import card from '@/views/student/card'
// import bound from '@/views/student/bound'
// import edit from '@/views/student/edit'
// import like from '@/views/student/like'
// import boundSuccess from '@/views/student/boundSuccess'

import videoList from '@/views/video/videoList'
// import videoDetails from '@/views/video/videoDetails'

// 懒加载
const Home = resolve => require(['@/views/Home'], resolve)
const checkin = resolve => require(['@/views/checkin'], resolve)

const gymAbuilding = resolve => require(['@/views/abuilding/gym-abuilding'], resolve)
const dormAbuilding = resolve => require(['@/views/abuilding/dorm-abuilding'], resolve)
const marketAbuilding = resolve => require(['@/views/abuilding/market-abuilding'], resolve)

const articleList = resolve => require(['@/views/article/articleList'], resolve)
const articleDetails = resolve => require(['@/views/article/articleDetails'], resolve)

const card = resolve => require(['@/views/student/card'], resolve)
const edit = resolve => require(['@/views/student/edit'], resolve)
const like = resolve => require(['@/views/student/like'], resolve)
const bound = resolve => require(['@/views/student/bound'], resolve)
const boundSuccess = resolve => require(['@/views/student/boundSuccess'], resolve)

// const videoList = resolve => require(['@/views/video/videoList'], resolve)
const videoDetails = resolve => require(['@/views/video/videoDetails'], resolve)

const viewLive = {
  template: `
      <div class="view">
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"/>
           </keep-alive>
           <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>`
}

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {path: '/', name: 'Home', component: Home, meta: {keepAlive: true}},
    {path: '/video',
      component: viewLive,
      children: [
        { path: 'list', component: videoList, meta: {keepAlive: true} },
        { path: 'details', component: videoDetails, meta: {keepAlive: false} }
      ]},
    {path: '/article',
      name: 'article',
      component: viewLive,
      children: [
        {path: 'list', component: articleList, meta: {keepAlive: true}},
        { path: 'details',
          name: 'articleDetails',
          component: articleDetails,
          meta: {keepAlive: false}
          // component: resolve => require(['@/view/article/articleDetails'], resolve)
        }
      ]},
    {path: '/student',
      component: viewLive,
      children: [
        { path: 'card', name: 'card', component: card, meta: {keepAlive: false} },
        { path: 'edit', name: 'edit', component: edit, meta: {keepAlive: false} },
        { path: 'like', name: 'like', component: like, meta: {keepAlive: false} },
        { path: 'bound', name: 'bound', component: bound, meta: {keepAlive: false} },
        { path: 'boundSuccess', name: 'boundSuccess', component: boundSuccess, meta: {keepAlive: false} }
      ]},
    {path: '/checkin', name: 'checkin', component: checkin, meta: {keepAlive: false}},
    {path: '/gym-abuilding', name: 'gym-abuilding', component: gymAbuilding, meta: {keepAlive: true}},
    {path: '/dorm-abuilding', name: 'dorm-abuilding', component: dormAbuilding, meta: {keepAlive: true}},
    {path: '/market-abuilding', name: 'market-abuilding', component: marketAbuilding, meta: {keepAlive: true}}
  ]
})
