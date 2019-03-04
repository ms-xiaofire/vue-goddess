<template>
    <div class='home'>
        <a href="#/checkin" class='checkBtn btn'>签到</a>
        <a href="#/student/card" class="student btn">学生证</a>
        <img src='../assets/home.jpg' class='homeImg' border='0' usemap='#mymap'>
        <map id='mymap' name='mymap'>
            <area
                :coords='coords1'
                onfocus="this.blur()"
                hidefocus="true"
                shape='circle'
                href ='#/article/list'
                target ='_parent'
                alt='circle' >
            <area
                :coords='coords2'
                onfocus="this.blur()"
                hidefocus="true"
                shape='circle'
                href ='#/video/list'
                target ='_parent'
                alt='circle' >
            <area
                :coords='coords3'
                onfocus="this.blur()"
                hidefocus="true"
                shape='circle'
                href ='#/dorm-abuilding'
                target ='_parent'
                alt='circle' >
            <area
                :coords='coords4'
                onfocus="this.blur()"
                hidefocus="true"
                shape='circle'
                href ='#/gym-abuilding'
                target ='_parent'
                alt='circle' >
            <area
                :coords='coords5'
                hidefocus="true"
                onfocus="this.blur()"
                shape='circle'
                href ='#/market-abuilding'
                target ='_parent'
                alt='circle' >
        </map>
    </div>
</template> 

<script>
import url from '@/http/url.js'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      code: 'test',
      coords1: '',
      coords2: '',
      coords3: '',
      coords4: '',
      coords5: '',
      height: 0,
      swiperOption: {
        passiveListeners: true,
        zoom: true,
        initialSlide: 0
      }
    }
  },
  mounted () {
    let {log} = console
    function GetRequest () {
      var url = location.search // search:获取url中"?"符后的字串  hash:'#'后面的字符串
      var theRequest = {}
      if (url.indexOf('?') !== -1) {
        var str = url.substr(1)
        var strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
        }
      }
      return theRequest
    }
    let code = GetRequest().code
    this.code = code
    if (code) {
      this.$http.post(url.wxSign, {code: code})
        .then((response) => {
          log(response)
          if (response.body.code === -5000) {
            MessageBox.alert('', {
              message: `<p style="text-align: center;font-size: .4rem" >冻结中</p>`,
              title: '提示',
              showConfirmButton: false
            })
          }
          this.$root.userID = response.data.data.id
          window.localStorage.setItem('userID', response.data.data.id)
          let b = localStorage.getItem('userID')
          log('localStorage', b)
          log('userId:', this.$root.userID)
        }, response => {
          log(response)
        })
    }
    let height = document.documentElement.clientHeight
    this.coords1 = [height * 1.76 * 0.22, height * 0.8, height * 0.24]
    this.coords2 = [height * 1.76 * 0.42, height * 0.35, height * 0.28]
    this.coords3 = [height * 1.76 * 0.18, height * 0.3, height * 0.2]
    this.coords4 = [height * 1.76 * 0.82, height * 0.3, height * 0.25]
    this.coords5 = [height * 1.76 * 0.82, height * 0.8, height * 0.25]
  }
}

</script>

<style scoped>
  .checkBtn{
    position: fixed;
    top: 10vh;
    right: 10vw;
    background: deepskyblue;
  }
  .student{
    position: fixed;
    top: 20vh;
    right: 10vw;
    background: green;
  }
  .btn{
    display: inline-block;
    width: 1.2rem;
    color: white;
    text-align: center;
    line-height: .5rem;
    border-radius: 10%;
  }
  .home{
    height: 100vh;
    overflow-y: hidden;
    text-align: center;
  }
  .homeImg{
    height: 100%;
  }
</style>
