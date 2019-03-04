<template>
    <div>
        <go-back/>
        <my-swipe   :api-path="myPath" router-path="/article/details"/>
        <load-more :api-path="url.articleList" :api-params="getParams" :page-total.sync="pageTotal" :params.sync="articles"  @updateParmas="updateParmas">
            <my-article v-for=" list in articles"  :key='list.index' :list="list"/>
        </load-more>
    </div>
</template>
<script>
import url from '@/http/url.js'
export default {
  name: 'articleList',
  components: {
    // GoBack
  },
  data () {
    return {
      pageTotal: 3,
      url: url,
      myPath: url.articleBanner,
      articles: '',
      getParams: {uid: this.$root.userID, page: 1, size: 6},
      isCollect: '',
      isLove: ''
    }
  },
  mounted () {
    this.updateParmas()
  },
  methods: {
    updateParmas (emit) {
      // console.log(emit)
      this.myPath = ''
      let {log} = console
      this.$http.get(url.articleList, {params: this.getParams})
        .then((response) => {
          this.articles = response.data.data
          this.pageTotal = Math.ceil(response.body.total / this.getParams.size)
          // log('39:' + this.isCollect)
          // log('40:' + this.isLove)
          // log('41:' + response.data.loveStatus)
          log(this.$refs['swipe'])
          // this.$refs['swipe'].$forceUpdate()
          this.myPath = url.articleBanner
          // this.myPath = url.articleBanner
          this.$forceUpdate()
        }, response => {
          log(response)
        })
    }
  }
}
</script>

<style scoped>

</style>
