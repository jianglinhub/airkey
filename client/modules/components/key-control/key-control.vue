<template>
  <transition name="slide">
    <div class="key-control">
      <TextBlock class="text-block">
        您的好友<span class="color-red">【{{ownerName}}】</span>送了您一把空中钥匙，<span class="color-red" v-show="password">授权密码为【{{password}}】，</span>为了车辆<span class="color-red">【{{plateNumber}}】</span>，车架号后6位<span class="color-red">【{{vinLast6}}】</span>的安全，在使用之前，请确保您在车辆旁边。
      </TextBlock>
      <NoticeInfo class="notice-info">
        最近定位时间：{{uploadTime}}
      </NoticeInfo>
      <QQMap class="qq-map" :position="position" @mapChange="onMapChange"></QQMap>
      <ActionButton class="action-button" @click="useKey">
        空中钥匙
      </ActionButton>
      <div v-show="isShowMessage" class="message-info">{{messageInfo}}</div>
    </div>
  </transition>
</template>

<script>
  import TextBlock from 'base/text-block/text-block'
  import NoticeInfo from 'base/notice-info/notice-info'
  import QQMap from 'base/qq-map/qq-map'
  import ActionButton from 'base/action-button/action-button'
  import {mapGetters} from 'vuex'
  import axios from 'axios'
  import {TMap} from 'common/js/QQMap'
  import {NUtil} from 'common/js/utils'
  import jQuery from 'jquery'

  export default {
    data() {
      return {
        deviceType: "VEHICLE",
        position: '',
        messageInfo: '',
        isShowMessage: false,
        uploadTime: ''
      }
    },
    computed: {
      ...mapGetters([
        'vin',
        'password',
        'plateNumber',
        'ownerName'
      ]),
      vinLast6() {
        return this.vin.substr(-6)
      }
    },
    methods: {
      useKey() {
        this.messageInfo = '下发指令中...'
        this.showMessage()
        axios.post('/api/useKey', {
          vin: this.vin
        }).then((res) => {
          // alert(res.data.data)
          this.code = res.data.data
          this.sendCommand()
        }).catch((err) => {
          this.messageInfo = '指令发送失败！'
          this.showMessage()
          alert("服务器内部错误！")
          console.log('err: ', err)
        })
      },
      sendCommand() {
        axios.post('api/sendCommand', {
          cmdCode: this.code,
          deviceId: this.vin, 
          deviceType: this.deviceType
        }).then( (res)=> {
          this.messageInfo = '指令发送成功！'
          this.showMessage()
          console.log('res: ', res)
        }).catch((err) => {
          this.messageInfo = '指令发送失败！'
          this.showMessage()
          alert("服务器内部错误！")
          console.log('err: ', err)
        })
      },
      getPosition() {
        this.position = '定位中...'
        axios.post('/api/findLatestLocation', { 
          deviceId: this.vin,
          deviceType: this.deviceType
        }).then( async (res)=> {
          if (res.data.result) {
            let uploadTime = NUtil.Format(res.data.result.uploadTime, 'yyyy-MM-dd hh:mm:ss')
            this.uploadTime = uploadTime
            let latitude = res.data.result.latitude
            let longitude = res.data.result.longitude

            let point = latitude + ',' + longitude
            let location = await this.translateGPS(point)

            let _point = {}
            _point.latitude = location.locations[0].lat
            _point.longitude = location.locations[0].lng

            let _location = await TMap.nGeocode(_point)
            let address = _location.detail.address
            this.position = address
          } else {
              this.position = '定位失败'
          }
        }).catch((err) => {
          alert("服务器内部错误！")
          console.log('err: ', err)
        })
      },
      /**
       * GPS => QQmap
       */
      translateGPS(locations) {
        return new Promise( (resolve, reject)=> {
          let url = 'https://apis.map.qq.com/ws/coord/v1/translate'
          let data = {
            locations: locations,
            type: 1,
            key: 'TYABZ-C2NWR-UWEW2-WIJBQ-P4233-V6BMN',
            output: 'jsonp'
          }
          jQuery.ajax({
            url: url,
            dataType: 'jsonp',
            data: data,
            success: function(response) {
              resolve(response);
            }
          })
        })
      },
      onMapChange() {
        this.getPosition()
      },
      showMessage() {
        this.isShowMessage = true
        setTimeout(() => {
          this.isShowMessage = false
        }, 2500)
      }
    },
    components: {
      TextBlock,
      NoticeInfo,
      QQMap,
      ActionButton
    },
    mounted() {
      if (this.vin !== '') {
        this.getPosition()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .key-control
    position: fixed
    top: 0
    left: 0
    bottom: 0
    padding: 16px 10px
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .text-block
      .color-red
        color: #cf213a
    .notice-info
      margin-top: 10px
    .qq-map
      margin-top: 10px  
    .action-button
      margin-top: 20px
    .message-info
      margin-top: 20px
      text-align: center
      background: rgba(0, 0, 0, 0.5)
      font-size: 16px
      color: #fff
      padding: 10px
      border-radius: 6px
</style>