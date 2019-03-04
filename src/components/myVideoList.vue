<template>
    <div class="listBox">
        <router-link :to="{path: '/video/details', query: {id: video.id}}">
            <div class="listBox-head">
                <div class="photo">
                    <img :src="video.photo">
                    <span>{{video.name}}</span>
                </div>
                <div>
                    <span class="collection"><i :class="video.loveStatus ? 'fa fa-thumbs-up' : 'fa fa-thumbs-o-up'"/>{{video.love}}</span>
                    <span class="collection"><i :class="video.collectionStatus ? 'fa fa-star' : 'fa fa-star-o'"/>{{video.collection}}</span>
                </div>
            </div>
        </router-link>
        <div :class="fold ? 'fold' : 'unfold'" class="intro">{{video.intro}}</div>
        <div v-show="test()">
            <span v-show="fold" class="show" @click="handleFold">更多</span>
            <span v-show="!fold" class="show" @click="handleFold">收起</span>
        </div>
        <div class="listBox-body">
            <my-video :prop-b="video" :titles="video.title"/>
        </div>
        <router-link :to="{path: '/video/details', query: {id: video.id}}">
            <div class="listBox-footer">
                <span>{{video.updateAt|timeFilter}}</span>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
  name: 'myVideoList',
  props: {
    video: {
      type: null,
      default: ''
    }
  },
  data: function () {
    return {
      fold: true
    }
  },
  methods: {
    handleFold () {
      this.fold = !this.fold
    },
    test () {
      return (this.video.intro.length > 40)
    }
  }
}
</script>

<style scoped lang="scss">
    .listBox {
        padding: 0.1rem;
        border: 1px solid black;
        border-radius: 10px;
        margin: 0.3rem;
        color: black;
        overflow: hidden;
    }
    .listBox-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: black;
        .photo {
            display: flex;
            align-items: center;
            img {
                width: 1rem;
                border-radius: 50%;
                margin-right: 0.5rem;
            }
        }
    }
    .collection {
        margin-right: 10px;
    }
    .intro {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        color: black;
        margin-top: 0.2rem;
    }
    .intro.fold {
        -webkit-line-clamp: 2;
    }
    .intro.unfold {
        -webkit-line-clamp: 100;
    }
    .listBox-body {
        margin-top: 0.2rem;
    }
    .show {
        color: cornflowerblue;
    }
    .listBox-footer {
        float: right;
        color: black;
    }
</style>
