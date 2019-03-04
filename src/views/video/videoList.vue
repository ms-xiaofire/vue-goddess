<template>
    <div>
        <go-back/>
        <my-swipe :api-path="myPath" router-path="/video/details"/>
        <div class="select">
            <button class="select-left" @click="gradeOn">
                {{grade|gradeFilter}}
                <img src="../../assets/down.png">
            </button>
            <button class="select-right" @click="subjectOn">
                {{subject|subjectFilter}}
                <img src="../../assets/down.png">
            </button>
        </div>
        <mt-popup v-model="gradePopup" popup-transition="popup-fade">
            <span v-for="g in grades" :key="g.index">
                <button class="selectBtn" @click="gradeOff(g.value)">{{g.name}}</button>
            </span>
        </mt-popup>
        <mt-popup v-model="subjectPopup" popup-transition="popup-fade">
            <span v-for="s in subjects" :key="s.index">
                <button class="selectBtn" @click="subjectOff(s.value)">{{s.name}}</button>
            </span>
        </mt-popup>
        <load-more :api-path="url.videoList" :api-params="getParams" :page-total.sync="pageTotal" :params.sync="videos" @updateParmas="updateVideo">
            <my-video-list v-for=" video in videos"  :key='video.index' :video="video"/>
        </load-more>
    </div>
</template>

<script>
import url from '@/http/url.js'

export default {
  name: 'videoList',
  data () {
    return {
      url: url,
      myPath: url.videoBanner,
      pageTotal: 6,
      grade: 10,
      subject: 2,
      uid: this.$root.userID,
      videos: '',
      gradePopup: false,
      subjectPopup: false,
      getParams: {
        uid: this.$root.userID,
        page: 1,
        size: 3,
        grade: 10,
        subject: 2
      },
      grades: [
        {
          name: '初一',
          value: 7
        },
        {
          name: '初二',
          value: 8
        },
        {
          name: '初三',
          value: 9
        },
        {
          name: '高一',
          value: 10
        },
        {
          name: '高二',
          value: 11
        },
        {
          name: '高三',
          value: 12
        },
        {
          name: '全部',
          value: ''
        }
      ],
      subjects: [
        {
          name: '语文',
          value: 1
        },
        {
          name: '数学',
          value: 2
        },
        {
          name: '英语',
          value: 3
        },
        {
          name: '物理',
          value: 4
        },
        {
          name: '化学',
          value: 5
        },
        {
          name: '生物',
          value: 6
        },
        {
          name: '历史',
          value: 7
        },
        {
          name: '地理',
          value: 8
        },
        {
          name: '政治',
          value: 9
        },
        {
          name: '全部',
          value: ''
        }
      ]
    }
  },
  created () {
    this.updateVideo()
  },
  methods: {
    updateVideo () {
      this.myPath = ''
      let {log} = console
      this.$http.get(url.videoList, {params: this.getParams})
        .then((response) => {
          console.log(response)
          this.videos = response.data.data
          this.pageTotal = Math.ceil(response.body.total / this.getParams.size)
          log(this.videos)
          this.myPath = url.videoBanner
        }, response => {
          log(response)
        })
    },
    gradeOn: function () {
      this.gradePopup = true
    },
    subjectOn: function () {
      this.subjectPopup = true
    },
    gradeOff: function (g) {
      this.grade = g
      this.getParams.grade = g
      this.gradePopup = false
      this.getParams.page = 1
      this.updateVideo()
    },
    subjectOff: function (s) {
      this.subject = s
      this.getParams.subject = s
      this.subjectPopup = false
      this.getParams.page = 1
      this.updateVideo()
    }
  }
}
</script>

<style lang="scss">
    .select {
        display: flex;
        button {
            width: 50%;
            height: 0.7rem;
            border: none;
            background-color: #fcd32d;
        }
    }
    .select-left {
        border-right: 1px solid !important;
    }
    .select-right {
        border-left: 1px solid !important;
    }
    .selectBtn {
        width: 30%;
        height: 0.7rem;
        border: none;
        background-color: #ffe57e;
        margin: 1.5%;
        border-radius: 0.1rem;
    }
    .selectBtn:focus {
        background-color: #dd9f1a;
        color: #fff;
    }
    .mint-popup {
        background: #fcd32d !important;
    }
</style>
