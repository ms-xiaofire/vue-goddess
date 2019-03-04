<template>
    <div class='container'>
        <div class='player' >
            <video-player  ref='videoPlayer'
                           :options='playerOptions'
                           :playsinline='true'
                           class='video-player vjs-custom-skin'
                           @play='onPlayerPlay($event)'
                           @pause='onPlayerPause($event)'
                           @canplay='onPlayerCanplay($event)'
                           @canplaythrough='onPlayerCanplaythrough($event)'
                           @ready='playerReadied'
            />
        </div>
        <div v-show="hide" class="videos video-top">
            <span>{{titles}}</span>
        </div>
        <div v-show="!hide" class="video-center"/>
        <div v-show="hide" class="videos video-bottom">
            <span>{{time|times}}</span>
        </div>
    </div>
</template>

<script>
// import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'
import { videoPlayer } from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
export default {
  components: {
    videoPlayer
  },
  filters: {
    times: function (value) {
      let secondTime = parseInt(value)
      let minuteTime = 0
      let hourTime = 0
      if (secondTime > 60) {
        minuteTime = parseInt(secondTime / 60)
        secondTime = parseInt(secondTime % 60)
        if (minuteTime > 60) {
          hourTime = parseInt(minuteTime / 60)
          minuteTime = parseInt(minuteTime % 60)
        }
      }
      let result = '' + parseInt(secondTime) + '秒'
      if (minuteTime > 0) {
        result = '' + parseInt(minuteTime) + '分' + result
      }
      if (hourTime > 0) {
        result = '' + parseInt(hourTime) + '小时' + result
      }
      return result
    }
  },
  props: {
    propA: {
      type: Object,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function () {
        return { message: 'hello' }
      }
    },
    propB: {
      type: null,
      default: ''
    },
    titles: {
      type: null,
      default: ''
    }
  },
  data () {
    return {
      time: '',
      hide: true,
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如'16:9'或'4:3'）
        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4',
            src: this.propB.link
            // src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
          }
        ],
        poster: this.propB.cover, // 你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      }
    }
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  watch: {
    propB: function (newVal, oldB) {
      this.playerOptions.sources[0].src = newVal.link
      this.playerOptions.poster = newVal.cover
    }
  },
  mounted () {
    setTimeout(() => {
      // console.log('dynamic change options', this.player)
      // change src
      // this.playerOptions.sources[0].src = this.propB.link
      // change item
      // this.$set(this.playerOptions.sources, 0, {
      //   type: 'video/mp4',
      //   src: this.propB.link
      // })
      // change array
      // this.playerOptions.sources = [{
      //   type: "video/mp4",
      //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
      // }]
      // this.player.muted(false)
    }, 1000)
  },
  methods: {
    onPlayerPlay (player) {
      this.hide = false
      // alert('play')
    },
    onPlayerPause (player) {
      this.hide = true
      // alert('pause')
    },
    onPlayerCanplay (player) {
      this.time = Math.floor(this.player.duration())
    },
    onPlayerCanplaythrough (player) {
      // console.log(this.player.duration())
    },
    playerReadied (player) {}
  }
}
</script>

<style lang="scss">
    .player {
      position: relative;
    }
    .videos {
        color: #fff;
        width: 5rem;
        text-align: center;
        position: relative;
        left: 50%;
        display: inline-block;
    }
    .video-top {
        margin-left: -2.5rem;
        bottom: 3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }
    .video-center {
        height: 21px;
    }
    .video-bottom {
        margin-left: -2.5rem;
        bottom: 1rem;
        /*这个需求暂时不用*/
        display: none;
    }
</style>
