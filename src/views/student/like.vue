<template>
    <div class="like">
        <go-back/>
        <div class="header">
            <div v-bind:class="{border:!show}"  class="half" @click="show=true ,current='article'">文学部</div>
            <div v-bind:class="{border:show}" class="half" @click="show=false, current='video'">影像部</div>
        </div>
        <load-more v-if="show" :api-path="url.collectionArticle+ userID" :page-total.sync="pageTotalA" :api-params="getParams"  :params.sync="articles" @updateParmas="updateArticle">
            <my-article v-for=" list in articles"  :key='list.index' :list="list"/>
        </load-more>
        <load-more  v-else :api-path="url.collectionVideo + userID" :page-total.sync="pageTotalV" :api-params="getParams"  :params.sync="videos" @updateParmas="updateVideo" >
            <my-video-list v-for=" video in videos"  :key='video.index' :video="video"/>
        </load-more>
    </div>
</template>

<script>
import url from '@/http/url.js'
export default {
  name: 'like',
  components: {
    // GoBack
  },
  data () {
    return {
      userID: this.$root.userID,
      url: url,
      show: true,
      current: '',
      articles: '',
      videos: '',
      getParams: {page: 1, size: 5},
      pageTotalA: '',
      pageTotalV: ''
    }
  },
  created () {
    this.updateArticle()
    this.updateVideo()
  },
  methods: {
    updateArticle (emit) {
      // console.log(emit)
      let {log} = console
      this.$http.get(url.collectionArticle + this.userID, {params: this.getParams})
        .then((response) => {
          log(response)
          this.articles = response.data.data
          this.pageTotalA = Math.ceil(response.body.total / this.getParams.size)
          log(this.articles)
        }, response => {
          log(response)
        })
    },
    updateVideo () {
      let {log} = console
      this.$http.get(url.collectionVideo + this.userID, {params: this.getParams})
        .then((response) => {
          log(response)
          this.videos = response.data.data
          this.pageTotalV = Math.ceil(response.body.total / this.getParams.size)
          log(this.videos)
        }, response => {
          log(response)
        })
    }
  }
}
</script>

<style scoped lang="scss">
  .header{
    display: flex;
  }
  .half{
    width: 50%;
    padding: 3% 0;
    text-align: center;
    border: 1px solid grey;
  }
  .border{
    background: #fcd32d ;
    color: white;
  }
</style>
