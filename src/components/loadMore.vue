<template>
    <div ref="wrapper"  class="page-loadmore-wrapper">
        <div class="page-loadmore" >
            <mt-loadmore ref="loadmore"  :top-method="loadTop"   :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">
                <slot/>
                <p v-show="allLoaded" class="noMore">没有更多了</p>
                <div slot="top" class="mint-loadmore-top">
                    <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
                    <span v-show="topStatus === 'loading'">
                        <mt-spinner color="powderblue" type="fading-circle"/>
                    </span>
                </div>
                <div slot="bottom" class="mint-loadmore-bottom">
                    <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                    <span v-show="bottomStatus === 'loading'">
                        <mt-spinner color="powderblue" type="fading-circle"/>
                    </span>
                </div>
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
export default {
  name: 'loadmore',
  props: {
    apiPath: {type: null, default: ''},
    apiParams: {type: null, default: ''},
    pageTotal: {type: null, default: ''},
    params: {type: null, default: ''}
  },
  data () {
    return {
      myTotal: this.pageTotal,
      allLoaded: false,
      bottomStatus: '',
      topStatus: '',
      getParams: this.apiParams
    }
  },
  watch: {
    pageTotal: function (newVal, oldVal) {
      this.allLoaded = this.getParams.page > newVal // 有没有更多
      console.log(' this.pageTotal:', newVal)
    }
  },
  mounted () {
    // console.log(this.apiParams) // 不加.sync修饰符传过来就很快
    // console.log(this.params)// :params.sync 传过来好慢
    // setTimeout(() => {
    //   console.log(this.params)// :params.sync 延时1秒
    //   console.log(' this.pageTotal:', this.pageTotal)
    // }, 1000)
  },
  methods: {
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    loadBottom () {
      setTimeout(() => {
        this.getParams.page += 1
        let {log} = console
        this.$http.get(this.apiPath, {params: this.getParams})
          .then((response) => {
            this.$emit('update:pageTotal', Math.ceil(response.body.total / this.getParams.size))
            // this.myTotal = Math.ceil(response.body.total / this.getParams.size)
            // log(this.myTotal)
            log('pageTotal', this.pageTotal)
            log('getParams.page', this.getParams.page)
            // log(this.params)
            for (let i in response.data.data) {
              this.params.push(response.data.data[i])
            }
            // this.params = this.params.concat(response.data.data)
            log(this.params)
            this.$refs.loadmore.onBottomLoaded()
            if (this.getParams.page >= this.pageTotal) {
              this.allLoaded = true
            }
          }, response => {
            log(response)
          })
      }, 500)
    },
    handleTopChange (status) {
      this.topStatus = status
    },
    loadTop () {
      this.getParams.page = 1
      // this.test = 0 // 子组件中直接修改会报错
      // this.$emit('update:test', {a: 1})// 可以加上.sync修饰符在子组件内修改props
      this.$emit('updateParmas', 1)// 或者不加修饰符直接给父组件传事件修改props
      this.allLoaded = false
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded()
      }, 1000)
    }
  }
}
</script>

<style scoped>
    .loading-background, .mint-loadmore-top span {
        -webkit-transition: .2s linear;
        transition: .2s linear
    }
    .mint-loadmore-top span {
        display: inline-block;
        vertical-align: middle
    }
    .mint-loadmore-top span.is-rotate {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg)
    }
    .page-loadmore .mint-spinner {
        display: inline-block;
        vertical-align: middle
    }
    .page-loadmore-listitem {
        height: 50px;
        line-height: 50px;
        text-align: center
    }
    .page-loadmore-listitem:first-child {
        border-top: 1px solid #eee
    }
    .page-loadmore-wrapper {
        overflow: scroll
    }
    .mint-loadmore-top, .mint-loadmore-bottom{
      /*height:inherit;*/
    }
    .mint-loadmore-bottom{
      /*margin-bottom:0;*/
    }
    .mint-loadmore-bottom span {
        display: inline-block;
        -webkit-transition: .2s linear;
        transition: .2s linear;
        vertical-align: middle
    }
    .mint-loadmore-bottom span.is-rotate {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg)
    }
  .noMore{
    margin: .2rem 0;
    text-align: center;
  }
</style>
