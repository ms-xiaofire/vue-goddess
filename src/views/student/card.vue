<template>
    <div>
        <go-back/>
        <div class="headBox">
            <a href="#/student/edit"> <i class="fa fa-pencil fa-lg " style="float: right; margin-right: 30px;"/></a>
            <div class="head"> <img :src=params.photo alt="头像"></div>
            <p>{{params.name}}</p>
            <p class="space">
                <span>
                    <span class="fa-stack fa-1x" style="color: #fcd32d">
                        <i class="fa fa-circle fa-stack-2x"/>
                        <i class="fa fa-steam-square fa-stack-1x  fa-inverse"/>
                    </span>{{params.grade|gradeFilter | noGrade }}
                </span>
                <span>
                    <span class="fa-stack fa-1x" >
                        <i class="fa fa-circle fa-stack-2x"/>
                        <i class="fa fa-gift fa-stack-1x  fa-inverse"/>
                    </span>逆袭豆{{params.bean}}颗
                </span>
            </p>
        </div>
        <div class="action like">
            <a href="#/student/like">
                <span class="fa-stack fa-lg">
                    <i class="fa fa-circle fa-stack-2x"/>
                    <i class="fa fa-heart fa-stack-1x fa-inverse"/>
                </span>我的收藏
            </a>
        </div>
        <div class="action account">
            <a :href="href">
                <span class="fa-stack fa-lg">
                    <i class="fa fa-circle fa-stack-2x"/>
                    <i class="fa fa-chain fa-stack-1x fa-inverse"/>
                </span>账号与绑定设置
                <span v-if="params.userBind-1" style="margin-left: 15%">未绑定</span>
                <span  v-else style="margin-left: 15%">已绑定</span>
            </a>
            <a href="blog4/index.html">艺中天</a>
        </div>
    </div>
</template>

<script>
import url from '@/http/url.js'
export default {
  name: 'student',
  filters: {
    noGrade: function (val) {
      return val === '全部' ? '未设置' : val
    }
  },
  data () {
    return {
      href: '#/student/bound',
      params: {name: '名称', bean: '逆袭豆', grade: '年级', phtot: ''}
    }
  },
  mounted  () {
    this.getCustomers()
  },
  methods: {
    getCustomers () {
      let {log} = console
      this.$http.get(url.studentInfo + this.$root.userID)
        .then((response) => {
          log(response.data.data)
          this.params = response.data.data
          if (this.params.userBind === 1) {
            this.href = '#/student/boundSuccess'
          }
        }, response => {
          log(response)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.headBox {
  text-align: center;
  border-bottom: 1px solid black;
  margin: .5rem 10% 0 10%;
  .head {
    text-align: center;
    clear: both;
    img{
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 100%;
      overflow: hidden;
    }
  }
  p {
    margin: .4rem;
  }
  a{
    color: black;
  }
}
.space{
  display: flex;
  justify-content: space-around;
}
.fa-stack{
  color: #fcd32d;
}
.fa-inverse{
  color: white;
}
.action {
  padding: 3% 10%;
  border-bottom: 1px solid black;
  a{
    color: black;
  }
}
</style>
