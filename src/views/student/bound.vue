<template>
    <div class="bound">
        <go-back/>
        <div class="header">
            <div v-bind:class="{border:show}"  class="half" @click="show=true ; resetForm('myForm');sendAuthCode = true" > 手机号绑定</div>
            <div v-bind:class="{border:!show}" class="half" @click="show=false ; resetForm('myForm');sendAuthCode = true">邮箱绑定</div>
        </div>
        <p class="notice"><i class=" fa fa-bullhorn fa-lg "/>通过绑定手机号/邮箱可获得20颗逆袭豆</p>
        <el-form ref="myForm"  :model="myForm"  :rules="rules" status-icon  label-position="top" class="myForm">
            <el-form-item
                v-if="show"
                prop="tel">
                <el-input  v-model="myForm.tel" type="number" placeholder="请输入手机号码" clearable>
                    <i slot="prefix" class="  fa fa-phone fa-lg pl-5"/>
                </el-input>
            </el-form-item>
            <el-form-item
                v-else
                prop="email">
                <el-input  v-model="myForm.email" placeholder="请输入邮箱" clearable>
                    <i slot="prefix" class=" fa fa-envelope fa-lg"/>
                </el-input>
            </el-form-item>
            <el-form-item
                prop="verify">
                <el-input   v-model="myForm.verify" type="number" class="verify " placeholder="请输验证码" clearable>
                    <i slot="prefix" class=" fa fa-key fa-lg pl-5"/>
                </el-input>
                <span v-show="sendAuthCode" class="auth_text auth_text_blue" @click="getAuthCode('myForm')">获取验证码</span>
                <span v-show="!sendAuthCode" class="auth_text"><span class="auth_text_blue">{{authTime}} </span> 秒之后重试</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('myForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import url from '@/http/url.js'
import { MessageBox } from 'mint-ui'
export default {
  name: 'bound',
  data () {
    return {
      show: true,
      sendAuthCode: true,
      authTime: 0,
      verification: '',
      rules: {
        tel: [
          { required: true, message: '请输入手机号码', trigger: ['blur'] },
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码', trigger: ['blur'] }
        ],
        email: [
          {required: true, message: '请输入邮箱地址', trigger: ['blur']},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur']}
        ],
        verify: [
          { required: true, message: '请输入验证码', trigger: ['blur'] },
          { min: 6, max: 6, message: '请输入6位数验证码', trigger: ['blur'] }
        ]
      },
      myForm: {
        tel: '',
        email: '',
        verify: ''
      }
    }
  },
  methods: {
    myAlert (info) {
      MessageBox.alert('', {
        message: `<p style="text-align: center;font-size: .4rem" >${info}</p>`,
        title: '提示',
        confirmButtonText: '好的'
      })
    },
    submitForm (formName) {
      let {log} = console
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.myForm)
          if (this.show) {
            this.$http.post(url.boundPhone + this.$root.userID, {iphone: this.myForm.tel, code: this.myForm.verify})
              .then((response) => {
                log(response)
                if (response.body.code === 0) {
                  MessageBox.confirm('', {
                    message: `<p style="text-align: center;font-size: .4rem" > 绑定成功</p>`,
                    title: '提示',
                    confirmButtonText: '好的',
                    showCancelButton: false
                  }).then(action => {
                    if (action === 'confirm') {
                      this.$router.push('card')
                    }
                  })
                }
                if (response.body.code === -1007) {
                  this.myAlert('今天还没发送过验证码')
                }
                if (response.body.code === -1002) {
                  this.myAlert('已经被绑定过了')
                }
                if (response.body.code === -1005) {
                  this.myAlert('验证码错误')
                }
              }, response => {
                log(response)
              })
          } else {
            this.$http.post(url.boundMail + this.$root.userID, {mail: this.myForm.email, code: this.myForm.verify})
              .then((response) => {
                log(response)
                if (response.body.code === 0) {
                  this.myAlert('绑定成功')
                }
                if (response.body.code === -1007) {
                  this.myAlert('今天还没发送过验证码')
                }
                if (response.body.code === -1002) {
                  this.myAlert('已经被绑定过了')
                }
                if (response.body.code === -1005) {
                  this.myAlert('验证码错误')
                }
              }, response => {
                log(response)
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getAuthCode (formName) {
      let prop = this.show ? 'tel' : 'email'
      let {log} = console
      this.$refs[formName].validateField(prop, valid => {
        if (valid) {
        } else {
          let contant = this.show ? this.myForm.tel : this.myForm.email
          let type = this.show ? 1 : 2
          // log(contant, type)
          this.$http.post(url.authCode + this.$root.userID, {contant, type})
            .then((response) => {
              log(response)
              if (response.body.code === -1003) {
                this.myAlert('今天发送验证码超过三次了，请明天再试')
              }
              this.sendAuthCode = false
              // 设置倒计时秒
              this.authTime = 30
              var authTimetimer = setInterval(() => {
                this.authTime--
                if (this.authTime <= 0) {
                  this.sendAuthCode = true
                  clearInterval(authTimetimer)
                }
              }, 1000)
            }, response => {
            })
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.bound{
  /deep/ .el-input__prefix{
    display: flex !important;
    align-items: center;
  }
  .pl-5{
    padding-left: 5px;
  }
  .header{
    display: flex;
  }
  .half{
    width: 50%;
    padding: 3% 0;
    text-align: center;
    border-bottom: 2px solid grey;
  }
   .border{
    border-bottom: 2px  solid #fcd32d;
  }
  .notice{
    font-size: .25rem;
    margin:3% 0 3% 10%;
  }
  .myForm{
    width: 80%;
    margin: .4rem auto;
  }
  /deep/ .el-form-item__content{
    text-align: center;
  }
  .auth_text{
    position: absolute;
    top: 30px;
    right: 10px;
  }
}
</style>
