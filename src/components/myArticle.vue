<template>
    <router-link :to="{path: '/article/details', query: {id: list.id}}">
        <div class="listBox">
            <div class="img"><img :src="list.cover" alt="封面"></div>
            <div class="article">
                <p> {{list.title | wordLimit(10)}}</p>
                <p>{{list.writer}}</p>
                <p class="intro">{{list.intro}}</p>
                <div>
                    <span><span class="margin-10"><i :class="list.loveStatus ? solidThumbs : hollowThumbs" class="fa"/>{{list.love}}</span>
                    <i :class="list.collectionStatus ? solidStar : hollowStar" class="fa"/>{{list.collection}}</span>
                    <span>{{list.updateAt|timeFilter}}</span>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
  name: 'myArticle',
  props: {
    list: {
      type: null,
      default: ''
    }
  },
  data () {
    return {
      solidThumbs: 'fa-thumbs-up',
      hollowThumbs: 'fa-thumbs-o-up',
      solidStar: 'fa-star',
      hollowStar: 'fa-star-o'
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  .listBox{
    display: flex;
    align-items: center;
    margin: 5%;
    border: 1px solid;
    border-radius: 10px;
    color: black;
    .img{
      width: 25%;
      margin:0 5px;
      img{
        width: 100%;
        height: 2rem;
        object-fit: cover;
      }
    }
    .article{
      flex: 1;
      p{
        margin: 5px 0;
        padding:0 5px;
      }
      div{
        display: flex;
        padding: 0 2%;
        justify-content: space-between;
        .margin-10{
          display: inline-block;
          margin-right:10px;
        }
      }
      .intro{
        min-height: calc(.6rem + 10px);
      }
    }
  }
</style>
