<template>
    <div class="this">
        <go-back/>
        <p>
            <span class="fa-stack fa-lg" style="color: green">
                <i class="fa fa-circle fa-stack-2x green"/>
                <i class="fa fa-check fa-stack-1x fa-inverse"/>
            </span>
        </p>
        <p v-if="params.iphone">已绑定手机号:{{params.iphone}}</p>
        <p v-else>未绑定手机号</p>
        <p v-if="params.mail">已绑定邮箱:{{params.mail}}</p>
        <p v-else>未绑定邮箱</p>
        <router-link to="bound">
            <div class="change">换绑手机号/邮箱</div>
        </router-link>
    </div>
</template>

<script>
import url from '@/http/url.js'
export default {
  name: 'boundSuccess',
  components: {
    // GoBack
  },
  data () {
    return {
      params: ''
    }
  },
  mounted () {
    let {log} = console
    this.$http.get(url.boundInfo + this.$root.userID)
      .then((response) => {
        log(response)
        this.params = response.body.data
      }, response => {
        log(response)
      })
  }
}
</script>

<style scoped lang="scss">
.this{
  text-align: center;
  p{
    margin: 5% 0;
  }
  .change{
    width: 60%;
    padding: 2% 0;
    margin: 0 auto;
    margin-top: 10vh;
    text-align: center;
    color: black;
    border: 1px solid black;
    border-radius: 5%;
  }
}
</style>
