<template>
  <div class="key-control" id="scrollable">
    <TextBlock class="text-block">
      您的好友<span class="color-red">【{{ownerName}}】</span>送了您一把空中钥匙，为了车辆<span class="color-red">【{{plateNumber}}】</span>，车架号后6位<span class="color-red">【{{vinLast6}}】</span>的安全，在使用之前，请确保您在车辆旁边。
    </TextBlock>
    <NoticeInfo class="notice-info">
      最近定位时间：{{uploadTime}}
    </NoticeInfo>
    <QQMap class="qq-map" :position="position" @mapChange="onMapChange"></QQMap>
    <div class="action-btns">
      <ActionButton class="action-button" v-for="item in codes" :params="item" :key="item.code" @click="handlerActionButton">{{item.name}}</ActionButton>
    </div>
    <Message v-show="localMessage.show">{{localMessage.message}}</Message>
    <PinKeyBoard v-show="showPinkeyboard" @validPass="handlerPinkeyboard" @cancel="cancelPin"></PinKeyBoard>
  </div>
</template>

<script>
  import TextBlock from 'base/text-block/text-block'
  import NoticeInfo from 'base/notice-info/notice-info'
  import QQMap from 'base/qq-map/qq-map'
  import ActionButton from 'base/action-button/action-button'
  import PinKeyBoard from 'base/pin-keyboard/pin-keyboard'
  import {mapGetters, mapMutations} from 'vuex'
  import axios from 'axios'
  import {NUtil} from 'common/js/utils'
  import jQuery from 'jquery'
  import {Confirm, Message} from 'base/confirms'
  import CryptoJS from 'common/js/aes'
  import CMD_Message from 'common/js/cmd-message'

  const WEB_SECRET_KEY = "meiauto--meiauto"
  const WEB_AES_IV     = "meiauto--airkeys"

  export default {
    data() {
      return {
        showPinkeyboard: false,
        localMessage: {
          message: '',
          show: false
        },
        plateNumber: '',
        deviceType: "VEHICLE",
        position: '',
        messageInfo: '',
        uploadTime: '',
        vin: '',
        codes: [],
        commandStatus: { // 定义指令执行状态
          name: '',
          status: ''
        }
      }
    },
    computed: {
      ...mapGetters([
        'ownerName'
      ]),
      vinLast6() {
        return this.vin.substr(-6)
      }
    },
    methods: {
      validPin() {
        axios.get(`api/checkPinOfDefault?pin=${this.pin}&userName=${this.userName}`)
        .then((res) => {
          if ((res.data.status === 1) && (res.data.result === 'SUCCEED')) {
            this.sendCommand(this.code)
          } else {
             alert('pin码错误！')
          }
        })
        .catch((err) => {
          console.log('err: ', err)
          alert("服务器内部错误！")
        })
      },
      queryKey() {
        axios.get('api/queryKey?vin=' + this.vin).then( (res)=> {
          if (res.data.status === 1 && res.data.result) {
            this.endTime = res.data.result.endTime
            let pastTime = this.hasPastTime(this.endTime)
            if (pastTime === true) {
              this.$router.push('/lose-efficacy')  
            } else {
              this.codes = JSON.parse(res.data.result.codes)
              this.showLocalMessage(pastTime + "分钟内可以对车辆无钥匙启动，请注意车辆安全")
            }
            this.plateNumber = res.data.result.plateNumber
            this.setOwnerName(res.data.result.ownerName)
            this.userName = res.data.result.username
            this.getPosition()
          } else {
            this.$router.push('/lose-efficacy')
          }
        }).catch((err) => {
          console.log('err: ', err)
          alert("服务器内部错误！")
        })
      },
      // 判断时间是否过期
      hasPastTime(time) {
        return (time - new Date().getTime() > 0)
        ? Math.ceil((time - new Date().getTime()) / 1000 / 60)
        : true 
      },
      sendCommand(code) {
        axios.post('api/sendCommand', {
          cmdCode: code,
          deviceId: this.vin, 
          deviceType: this.deviceType
        }).then( (res)=> {
          this.showLocalMessage('指令发送成功！')
          this.sendId = res.data.data.sendId
          this.repeatRequestResult()
        }).catch((err) => {
          this.showLocalMessage('指令发送失败！')
          alert("服务器内部错误！")
          console.log('err: ', err)
        })
      },
      // 循环查询结果方法
      repeatRequestResult() {
        this.repeatQueryTimer = setInterval(async () => {
          let result = await this.requestResult()
          if (result.status !== 'CMD_PROCESSING') {
            this.showLocalMessage(CMD_Message[result.status].replace('__COMMAND__', this.processingCode))
            clearInterval(this.repeatQueryTimer)
          }
        }, 3000)
      },
      requestResult() {
        return new Promise((resolve, reject) => {
          axios.get('api/requestResult?sendId=' + this.sendId)
          .then((res) => {
            if (res.data.status === 1 && res.data.result) {
              resolve(res.data.result)
            } else {
              this.showLocalMessage(`指令${this.processingCode}执行失败，请稍后再试！`)
              resolve('')
            }
          })
          .catch((e) => {
            reject(e)
            alert("服务器内部错误！")
          })
        })
      },
      getPosition() {
        this.position = '定位中...'
        axios.post('/api/findLatestLocation', { 
          deviceId: this.vin,
          deviceType: this.deviceType
        }).then( async (res)=> {
          if (res.data.status === 1 && res.data.result) {
            let uploadTime = NUtil.Format(res.data.result.uploadTime, 'yyyy-MM-dd hh:mm:ss')
            this.uploadTime = uploadTime
            let latitude = res.data.result.latitude
            let longitude = res.data.result.longitude
            let point = latitude + ',' + longitude
            let address = (await this.geocoderLocation(point)).result.formatted_addresses.recommend
            this.position = address
          } else {
            this.uploadTime = NUtil.Format(Date.parse(new Date()), 'yyyy-MM-dd hh:mm:ss')
            this.position = '定位失败'
          }
        }).catch((err) => {
          alert("服务器内部错误！")
        })
      },
      // 解析地址
      geocoderLocation(location) {
        return new Promise( (resolve, reject)=> {
          let key = 'TYABZ-C2NWR-UWEW2-WIJBQ-P4233-V6BMN'
          let url = `http://apis.map.qq.com/ws/geocoder/v1/?location=${location}&key=${key}&poi_options=address_format=short&coord_type=1`
          let data = {
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
      analysis() {
        let access_token = this.$route.query.ak
        if (access_token !== undefined) {
          try {
            let key = CryptoJS.enc.Utf8.parse(WEB_SECRET_KEY)
            let iv = CryptoJS.enc.Utf8.parse(WEB_AES_IV)
            var decrypt = CryptoJS.AES.decrypt(access_token, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7})
            let data = decodeURIComponent(CryptoJS.enc.Utf8.stringify(decrypt).toString())
            if (data.length > 5) {
              this.vin = data
              this.queryKey()
            } else {
              this.$router.push('/lose-efficacy')  
            }
          } catch (e) {
            this.$router.push('/lose-efficacy')
          }
        } else {
          this.$router.push('/lose-efficacy')
        }
      },
      isWeiXin() { 
        var ua = window.navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i) == 'micromessenger') { 
          return true
        } else { 
          alert('为保证好友车辆安全，请在微信内点击该链接！')
          return false
        } 
      },
      async handlerActionButton(params) {
        // 发指令之前先看一下之前的结果
        if (this.sendId) {
          let result = await this.requestResult()
          if (result.status === 'CMD_PROCESSING') {
            this.showLocalMessage(CMD_Message[result.status].replace('__COMMAND__', this.processingCode))
          } else {
            this.checkResult(params)
          }
        } else {
          this.checkResult(params)
        }
      },
      // 结果判断
      checkResult(params) {
        // 判断时间是否已到期
        let pastTime = this.hasPastTime(this.endTime)
        if (pastTime === true) {
          this.$router.push('/lose-efficacy')  
        } else {
          // 打开pin键盘
          this.showPinkeyboard = true
          this.code = params.code
          this.processingCode = params.name
        }
      },
      showLocalMessage(message) {
        setTimeout(() => {
            this.localMessage = {
            show: true,
            message: message
          }
          clearTimeout(this.localMessageTimer)
          this.localMessageTimer = setTimeout(() => {
              this.localMessage = {
              show: false
            }
          }, 5000)
        }, 700)
      },
      handlerPinkeyboard(pin) {
        this.showPinkeyboard = false
        this.pin = pin.join('')
        // 手动延时0.5s，保证键盘隐藏动画执行完成
        setTimeout(() => {
          this.validPin()
        }, 500)
      },
      cancelPin() {
        this.showPinkeyboard = false
      },
      ...mapMutations({
        setOwnerName: 'SET_OWNER_NAME'
      })
    },
    components: {
      TextBlock,
      NoticeInfo,
      QQMap,
      ActionButton,
      Confirm,
      Message,
      PinKeyBoard
    },
    created() {
      this.analysis()
      // if (this.isWeiXin()) {
      //   this.analysis()
      // } else {
      //   this.$router.push('/lose-efficacy')
      // }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  
  .key-control
    position: fixed
    top: 0
    left: 0
    bottom: 0
    padding: 16px 10px
    background: $color-background $img-background no-repeat
    background-size: cover
    .text-block
      .color-red
        color: #cf213a
    .notice-info
      margin-top: 10px
    .qq-map
      margin-top: 10px  
    .action-btns
      margin-top: 6px
      overflow: hidden
      .action-button
        float: left
        margin-top: 1.5vh
        margin-left: 12px
    .message-info
      margin-top: 20px
      text-align: center
      background: rgba(0, 0, 0, 0.5)
      font-size: 16px
      color: #fff
      padding: 10px
      border-radius: 6px
</style>