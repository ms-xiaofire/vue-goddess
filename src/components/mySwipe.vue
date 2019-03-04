<template>
    <div>
        <mt-swipe  :auto='4000'>
            <mt-swipe-item v-for="img in imgs" v-bind:key="img.index">
                <router-link :to="{path: routerPath, query: {id: img.id}}">
                    <img :src='img.cover' class='swipe'>
                </router-link>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
  name: 'mySwipe',
  props: {
    routerPath: {
      type: null,
      default: ''
    },
    apiPath: {
      type: null,
      default: ''
    }
  },
  data () {
    return {
      imgs: ''
    }
  },
  watch: {
    apiPath: function (newVal, oldVal) {
      console.log('apiPath', newVal)
      this.getImg()
    }
  },
  created () {
    this.getImg()
  },
  methods: {
    getImg: function () {
      let {log} = console
      this.$http.get(this.apiPath)
        .then((response) => {
          this.imgs = response.data.data
          // log(this.imgs)
        }, response => {
          log(response)
        })
    }
  }
}
</script>

<style scoped>
  .mint-swipe {
    height: 4rem;
  }
  .swipe{
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: #f6f6f6;
  }
</style>
