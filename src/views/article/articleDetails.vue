<template>
    <div>
        <go-back/>
        <div class="details">
            <h3> {{params.title}}</h3>
            <p class="update"><span>{{params.updateAt|dateFilter}}</span><span>{{params.writer}}</span></p>
            <p class="content" v-html='params.content'/>
            <my-collection  :list='list' :is-love='isLove' :is-collect='isCollect' :types='10'/>
        </div>
    </div>
</template>

<script>
import url from '@/http/url.js'
export default {
  name: 'articleDetails',
  components: {
    // GoBack
  },
  data () {
    return {
      params: '',
      getParams: {rid: this.$route.query.id},
      isCollect: '',
      solidThumbs: 'fa-thumbs-up',
      hollowThumbs: 'fa-thumbs-o-up',
      isLove: '',
      solidStar: 'fa-star',
      hollowStar: 'fa-star-o',
      list: ''
    }
  },
  created () {
    let {log} = console
    this.$http.get(url.articleDetails + this.$root.userID, {params: this.getParams})
      .then((response) => {
        log(response.data)
        this.params = response.data.data
        this.isCollect = response.data.userCollection
        this.isLove = response.data.userLove
        this.list = {love: this.params.love, collection: this.params.collection}
      }, response => {
        log(response)
      })
  }
}
</script>
<style lang="scss" scoped>
  .details{
    padding: 5% ;
  }
  p{
    color: #8e8e8e;
  }
  .content{
    text-indent: 2em;
    line-height: .5rem;
    text-align: justify;
  }
  .update{
    margin-bottom:10px;
     span{
      display: inline-block;
      margin-right:10px;
    }
  }
</style>
