<template>
    <div class="check">
        <div class="back">
            <a href="#/"><i class="fa fa-chevron-left "/>返回</a>
            <span @click="rules">签到规则</span>
        </div>
        <div class="header">
            <div class="headerLeft">
                <div class="head"> <img :src=params.photo alt="头像"></div>
                <div class="info">
                    <p>&nbsp;&nbsp;{{params.name}}</p>
                    <p>&nbsp;&nbsp;逆袭豆{{params.bean}}颗</p>
                </div>
            </div>
            <button ref='signBtn'
                    :class='{"sign-btn_disabled" : isSigned|| isSigning } '
                    :disabled='isSigned || isSigning'
                    class='sign-btn'
                    @click='sign'>
                {{isSigned ? '已签到' : (isSigning ? ' 签到中' : ' 签&nbsp;&nbsp;&nbsp;&nbsp;到')}}
            </button>
        </div>
        <div class="days">
            <p><span>已累计签到</span><span>最高连续签到</span></p>
            <p><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{signedDates.length}}天</span><span>{{this.params.maxseries}}天&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
        </div>
        <div class='checkIn'>
            <vue-better-calendar ref='calendar'
                                 :show-lunar= 'false'
                                 :hide-header= 'true'
                                 :label-today='labelToday'
                                 :signed-dates='signedDates'
                                 :show-disable-date='true'
                                 mode='sign'
                                 @select-sign-date='selectSign'/>
        </div>
    </div>
</template>

<script>
import url from '@/http/url.js'
import moment from 'moment'
import { MessageBox } from 'mint-ui'
export default {
  name: 'checkin',
  data () {
    return {
      getBean: '',
      signedDates: [],
      isSigned: false,
      isSigning: false,
      labelToday: {showLabelToday: true, label: '今天'},
      params: {name: '名称', bean: '666', phtot: ''}
    }
  },
  created () {
    this.getCustomers()
  },
  methods: {
    getCustomers () {
      let {log} = console
      this.$http.get(url.signInfo + this.$root.userID)
        .then((response) => {
          log(response.data.data)
          this.params = response.data.data
          if (this.params.sign === 1) {
            this.isSigned = true
          }
          let time = JSON.parse(response.data.data.signTime)
          for (let i in time) {
            time[i] = moment(time[i]).format('YYYY-MM-DD')
          }
          this.signedDates = time
          log(this.signedDates)
        }, response => {
          log(response)
        })
    },
    rules () {
      MessageBox.alert('', {
        message: '&nbsp; &nbsp;&nbsp;&nbsp;签到领取逆袭豆，通过消耗逆袭豆可兑换奖励。' +
        ' <br/> &nbsp;&nbsp;&nbsp;&nbsp; 首日签到可领取1颗逆袭豆，连续签到每日递增1颗。连续签到5天后，逆袭豆每日可领取5颗。\n' +
        '\n' +
        '  <br/> &nbsp;&nbsp;&nbsp;&nbsp;签到中断逆袭豆可要重新计算呦~月初时签到记录会被清空的。',
        title: '签到领取逆袭豆',
        // showCancelButton: true,
        // cancelButtonClass: 'cancelButton',
        confirmButtonText: '好的'
        // cancelButtonText: '暂不'
      })
    },
    selectSign (signInfo) {
      /* signInfo.status 判断签到是否为当天
        *  signInfo.msg 本次是否签到成功的提示语
        */
      let {log} = console
      if (signInfo.status) {
        this.isSigning = true
        // 模拟发送签到请求
        setTimeout(() => {
          this.isSigning = false
          // 模拟请求成功状态值
          this.$http.post(url.signPost + this.$root.userID)
            .then((response) => {
              log(response)
              let bean = response.body.data.bean
              this.params.maxseries = response.body.data.maxseries
              this.params.bean += bean
              this.getBean = `签到成功,获得${bean}颗逆袭豆`
              MessageBox.alert('', {
                message: `<p style="text-align: center;font-size: .4rem" >签到成功,获得${bean}颗逆袭豆</p>`,
                title: '提示',
                confirmButtonText: '好的'
              })
            }, response => {
              log(response)
            })
          let responseDataStatus = true // true为成功，false为失败（具体看接口）
          let responseDataMsg = '签到失败，请重试~'
          if (responseDataStatus) {
            // 改变签到状态
            this.isSigned = true
            // 更新已签到日期
            this.signedDates = signInfo.signedDates
          } else {
            alert(responseDataMsg)
          }
        }, 1000)
      } else {
        /* 需要在当天才能签到的提示，有如下三个属性可设置提示内容
         * notSignInOtherMonthsTxt，签到时点击本月外日期时的文本提示，默认值为“不能在本月外进行签到”
         * notSignInOtherDaysTxt，签到时点击本月内非当天日期时的文本提示，默认值为“notSignInOtherDaysTxt”
         * alreadySignTxt，签到时点击已经签过到的日期时的文本提示，默认值为“本日已经进行过签到”
         */
        alert(signInfo.msg)
      }
    },
    sign () {
      this.$refs.calendar.sign()
    }
  }
}
</script>

<style  lang="scss">
  //没有scoped，scss嵌套防止影响
  .check{
    .back{
      display: flex;
      justify-content: space-between;
      padding: .2rem .2rem 0 .2rem;
      background: #fcd32d ;
      color: white;
      a{
        color: white;
      }
    }
    .header{
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: .3rem 0;
      background: #fcd32d ;
      color: white;
      .headerLeft{
        display: flex;
        .info{
          padding-top: .5rem;
          text-align: left;
        }
      }
      .head{
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 100%;
        background: white;
        overflow: hidden;
        img{
          width: 100%;
        }
      }
    }
    .days{
      width: 70%;
      margin: .2rem auto;
      border: 1px solid black;
      font-size: .25rem;
      border-radius: 10px;
      p{
        display: flex;
        justify-content: space-between;
        padding: .1rem 10%;
      }
    }
    .checkIn{
      width: 90%;
      margin: 0 auto;
      margin-top: -5%;
      transform: scale(0.9,0.85);
    }
    .sign-btn{
      font-size: .3rem;
      background:#fcd32d ;
      border-radius: 10%;
      border: 1px solid aliceblue;
      color: white;
    }
    .vue-better-calendar {
      background: #fcd32d;
    }
    .vue-better-calendar .calendar-body .calendar-dates{
      background: #ffe57e;
    }
    .vue-better-calendar .calendar-body .calendar-dates .date-row ul .calendar-day.selected{
      background: transparent;
    }
    .vue-better-calendar .calendar-body .calendar-dates .date-row ul .calendar-day.selected:after{
      border: 1px solid white;
    }
    .vue-better-calendar .calendar-body .calendar-dates .date-row ul .calendar-day.disabled{
      background: whitesmoke;
    }
    .vue-better-calendar .calendar-body .calendar-dates .date-row ul .calendar-day.is-today{
      background-color: lightskyblue;
    }
  }
  .mint-msgbox-wrapper /deep/  .mint-msgbox-message {
    text-align: left ;
    line-height: .5rem;
  }
  .mint-msgbox-btns .mint-msgbox-confirm{
    font-size: .4rem;
    color: black !important;
  }
  .mint-msgbox-btns .mint-msgbox-cancel{
    font-size: .4rem;
  }
</style>
