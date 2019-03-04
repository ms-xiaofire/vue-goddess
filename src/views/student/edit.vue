<template>
    <div class="edit">
        <go-back/>
        <div class="box">
            <span>头像</span>
            <div class="head">
                <el-upload
                    :show-file-list='false'
                    :on-success='handleAvatarSuccess'
                    :before-upload='beforeAvatarUpload'
                    class='avatar-uploader'
                    action='/a/u/upload'>
                    <img  :src='params.photo' class='avatar'>
                </el-upload>
            </div>
        </div>
        <div class="box"><span>昵称</span><span @click="changeName">{{params.name}}</span></div>
        <div class=" box select" @click="popupVisible = true" >
            <span>年级</span>
            <span >{{params.grade|gradeFilter |noGrade}}</span>
        </div>
        <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
            <mt-picker ref="picker"  :slots="dateSlots" :visible-item-count="5"   :show-toolbar="true"  value-key="grade"   >
                <mt-button class="usi-btn-cancel bg" @click="popupVisible = !popupVisible">取消</mt-button>
                <mt-button class="sure bg" @click="handleConfirm">确认</mt-button>
            </mt-picker>
        </mt-popup>
        <div class="submit" @click="submit">保存修改</div>
    </div>
</template>

<script>
import url from '@/http/url.js'
import { MessageBox } from 'mint-ui'
export default {
  name: 'edit',
  components: {
    // GoBack
  },
  filters: {
    noGrade: function (val) {
      return val === '全部' ? '未设置' : val
    }
  },
  data () {
    return {
      params: {name: '名称', grade: '年级', phtot: ''},
      popupVisible: false,
      dateSlots: [
        { flex: 1,
          defaultIndex: 0,
          values: [{grade: '初一', value: 7},
            {grade: '初二', value: 8},
            {grade: '初三', value: 9},
            {grade: '高一', value: 10},
            {grade: '高二', value: 11},
            {grade: '高三', value: 12}]
        }
      ]
    }
  },
  created () {
    let {log} = console
    this.$http.get(url.studentInfo + this.$root.userID)
      .then((response) => {
        this.params = response.data.data
        log(response.data.data)
        this.dateSlots['0'].defaultIndex = this.params.grade - 7 // 给picker 默认值
      }, response => {
        log(response)
      })
  },
  methods: {
    changeName () {
      MessageBox.prompt('请输入昵称', {
        inputValidator: (val) => {
          return !(val.length < 1 || val.length > 8)
        },
        inputErrorMessage: '请输入合法昵称'
      }).then((val) => {
        this.params.name = val.value
      }, () => {
        console.info('cancel')
      })
    },
    handleConfirm () {
      console.log(this.$refs.picker.getValues())
      this.params.grade = this.$refs.picker.getValues()[0].value
      this.popupVisible = false
    },
    handleAvatarSuccess (res) {
      console.log(res)
      this.params.photo = res.data.url
      console.log(this.params.photo)
    },
    beforeAvatarUpload (file) {
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'png'
      const extension2 = testmsg === 'jpg'
      const extension3 = testmsg === 'gif'
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!extension && !extension2 && !extension3) {
        this.$message.error('请上传 png、jpg、gif格式的图片!')
      }
      // if (!isJPG) {
      //   this.$message.error('请上传正确的图片!')
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      // return isJPG & isLt5M
      return (extension || extension2 || extension3) && isLt2M
    },
    submit () {
      let {name, photo, grade} = this.params
      console.log({name, photo, grade})
      this.$http.put(url.studentEdit + this.$root.userID, {name, photo, grade})
        .then((response) => {
          console.log(response)
          if (response.body.code === 0) {
            MessageBox.alert('', {
              message: `<p style="text-align: center;font-size: .4rem">修改成功</p>`,
              title: '提示',
              confirmButtonText: '好的'
            })
          }
        }, response => {
          console.log(response)
        })
    }
  }
}
</script>

<style   scoped lang="scss">
  .head {
    text-align: center;
    img{
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 100%;
    }
  }
  .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4% 10%;
    border-bottom: 1px solid black;
    span{
      color: black;
    }
  }
  .submit{
    width: 40%;
    padding: 2% 0;
    margin: 0 auto;
    margin-top: 40vh;
    text-align: center;
    border: 1px solid black;
    border-radius: 5%;
  }
    .bg {
      color: black;
      background-color: #fcd32d;
    }
</style>
