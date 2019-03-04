<template>
    <div class="store">
        <span class="collection" @click="postLove(1)"><i :class="loveStatus ? solidThumbs : hollowThumbs" class="fa"/>{{items.love}}</span>
        <span class="love" @click="postLove(2)"><i :class="collectionStatus ? solidStar : hollowStar" class="fa" />{{items.collection}}</span>
    </div>
</template>
<script>
import url from '@/http/url.js'
import { Toast } from 'mint-ui'
export default {
  name: 'myCollection',
  props: {
    list: {type: null, default: ''},
    isCollect: {type: null, default: ''},
    isLove: {type: null, default: ''},
    types: {type: null, default: ''}
  },
  data () {
    return {
      collectionStatus: this.isCollect,
      loveStatus: this.isLove,
      items: this.list,
      solidThumbs: 'fa-thumbs-up',
      hollowThumbs: 'fa-thumbs-o-up',
      solidStar: 'fa-star',
      hollowStar: 'fa-star-o'
    }
  },
  watch: {
    list: function () {
      this.collectionStatus = this.isCollect
      this.loveStatus = this.isLove
      this.items = this.list
    }
  },
  methods: {
    postLove (x) {
      let {log} = console
      this.$http.post(url.love + this.$root.userID, {rid: this.$route.query.id, type: this.types, status: x})
        .then((response) => {
          if (x === 1) {
            this.items.love = this.loveStatus ? (this.items.love - 1) : (this.items.love + 1)
            if (this.loveStatus) {
              Toast({
                message: '取消点赞',
                duration: 1000
              })
            } else {
              Toast({
                message: '点赞成功',
                duration: 1000
              })
            }
            this.loveStatus = (!this.loveStatus)
          } else {
            this.items.collection = this.collectionStatus ? (this.items.collection - 1) : (this.items.collection + 1)
            if (this.collectionStatus) {
              Toast({
                message: '取消收藏',
                duration: 1000
              })
            } else {
              Toast({
                message: '收藏成功',
                duration: 1000
              })
            }
            this.collectionStatus = (!this.collectionStatus)
          }
        }, response => {
          log(response)
        })
    }
  }
}
</script>

<style lang="scss">
  .store{
    margin-top:10px;
  }
  .collection,.love{
    display: inline-block;
    margin-right:15px;
  }
  .mint-toast-text{
    font-size: .4rem !important;
  }
</style>
