<template>
    <div>
        <go-back/>
        <div class="detailsBox">
            <div class="title">
                <img :src="videos.photo" class="title-left">
                <div class="title-right">
                    <h3>{{videos.title}}</h3>
                    <div>
                        <span class="times">{{videos.updateAt|dateFilter}}</span>
                        <span class="name">{{videos.name}}</span>
                    </div>
                </div>
            </div>
            <p class="intros">{{videos.intro}}</p>
            <my-video  :prop-b="videos" :titles="videos.title"/>
            <div class="contents" v-html="videos.content">{{videos.content}}</div>
            <my-collection :list="list" :is-love='isLove' :types='20' :is-collect='isCollect'/>
        </div>
    </div>
</template>

<script>
import url from '@/http/url.js'
import MyCollection from '../../components/myCollection'
export default {
  name: 'videoDetails',
  components: {MyCollection},
  data () {
    return {
      videos: '',
      userID: this.$root.userID,
      type: 20,
      rid: this.$route.query.id,
      isLove: '',
      isCollect: '',
      list: '',
      types: ''
    }
  },
  created () {
    let {log} = console
    this.$http.get(url.videoDetails + this.userID, {
      params: {
        rid: this.rid
      }
    })
      .then((response) => {
        this.videos = response.data.data
        this.isLove = response.data.userLove
        this.isCollect = response.data.userCollection
        this.list = {love: this.videos.love, collection: this.videos.collection}
        log(response)
        log(this.loveStatus)
      }, response => {
        log(response)
      })
  },
  methods: {
    postLove (x) {
      let {log} = console
      this.$http.post(url.love + this.$root.userID, {rid: this.$route.query.id, type: 20, status: x})
        .then((response) => {
          log(response)
        }, response => {
          log(response)
        })
    }
  }
}
</script>

<style lang="scss">
    .detailsBox {
        padding: 5%;
    }
    .title {
        display: flex;
        align-items: center;
        margin: 0.5rem 0;
    }
    .title-left {
        min-width: 1rem;
        height: 1rem;
        margin-right: 0.5rem;
        border-radius: 50%;
    }
    .title-right {
        h3 {
            margin: 0 0 0.2rem;
        }
        div {
            color: #8e8e8e;
        }
    }
    .name {
        margin-left: 0.3rem;
    }
    .intros {
        margin: 0.5rem 0;
        color: #8e8e8e;
    }
    .contents {
        margin: 0.5rem 0;
        color: #8e8e8e;
        line-height: 0.5rem;
    }
</style>
