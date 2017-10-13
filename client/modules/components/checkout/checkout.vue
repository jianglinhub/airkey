<template>
  <transition name="slide">
    <div class="pos">
      <div class="checkout">
        <TextBlock class="text-block">
          您的好友{{ownerName}}送了您一把空中钥匙，为了好友爱车安全，请完成授权验证。
        </TextBlock>
        <div class="verify">
          <div class="title">授权密码</div>
          <div class="input">
            <input v-model="password" type="tel" maxlength="4" id="password" autofocus>
          </div>
        </div>
      </div>
      <div class="screen" v-show="doingValid">
        <div class="checkout-info">正在校验...</div>
      </div>
    </div>
  </transition>
</template>

<script>
  import TextBlock from 'base/text-block/text-block' 
  import {mapMutations, mapGetters} from 'vuex' 
  import axios from 'axios'
 
  // YUN00001111111121 4414

  export default {
    data() {
      return {
        password: '',
        doingValid: false,
      }
    },
    computed: {
      ...mapGetters([
        'ownerName'
      ])
    },
    watch: {
      password(pass) {
        if (pass.length === 4) {
          let _input = document.getElementById("password")
          _input.setSelectionRange(0, 0)
          _input.blur()
          this.validPwd(pass) 
        }
      },
    },
    methods: {
      loginToKey() {
        // alert(this.vin)
        this.doingValid = true
        let params = {vin: this.vin}
        axios.post('/api/loginToKey', params).then((res) => {
          if (res.data.status !== 1 || res.data.data.status !== 'VALID') {
            this.doingValid = false
            this.$router.push('/lose-efficacy')
          } else {
            this.setPlateNumber(res.data.data.plateNumber)
            this.setOwnerName(res.data.data.ownerName)
            if (res.data.data.password) {
              this.setVIN(this.vin)
              this.setPassword(res.data.data.password)
              this.doingValid = false
              this.$router.push('/key-control')
            }
          }
          this.doingValid = false
        }).catch((err) => {
          alert("服务器内部错误！")
          console.log('err: ', err)
        })
      },
      validPwd(pass) {
        this.doingValid = true
        axios.post('/api/validPwd', {
          vin: this.vin,
          password: pass
        }).then((res) => {
          if (res.data.status !== 1) {
            this.password = ''
            alert('密码错误！')
            this.doingValid = false
          } else if (res.data.data.status !== 'VALID') {
            this.doingValid = false
            this.$router.push('/lose-efficacy')
          } else {
            this.setPlateNumber(res.data.data.plateNumber)
            this.setVIN(this.vin)
            this.setOwnerName(res.data.data.ownerName)
            this.doingValid = false
            this.$router.push('/key-control')
          }
        }).catch((err) => {
          alert("服务器内部错误！")
          console.log('err: ', err)
        })
      },
      isWeiXin() { 
        var ua = window.navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i) == 'micromessenger') { 
          return true
        } else { 
          alert('为保证好友车辆安全，请在微信内点击分享信息打开该链接！')
          return false
        } 
      },
      analysis() {
        let _token = this.$route.query.access_token
        if (_token !== undefined) {
          let newStr = ""
          for (let i=0; i<_token.length; i++) {
           if (i % 2 === 1) {
             newStr += _token.substr(i, 1)
           } 
          }
          // this.vin = "YUN00001111111121"
          this.vin = newStr
          // alert(this.vin)
          this.loginToKey(this.vin)
        } else {
          this.$router.push('/lose-efficacy')
        }
      },
      ...mapMutations({
        setPlateNumber: 'SET_PLATE_NUMBER',
        setPassword: 'SET_PASSWORD',
        setVIN: 'SET_VIN',
        setOwnerName :'SET_OWNER_NAME'
      })
    },
    components: {
      TextBlock
    },
    mounted() {
      // if (!this.isWeiXin()) {
      //   this.$router.push('/lose-efficacy')
      // }
      // http://192.168.5.137:3000/#/?access_token=QLWKQ0DCX4RSEB8HTXDHVAD0Q1T4C92665
      this.analysis()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  
  .pos
    .checkout
      position: fixed
      top: 0
      left: 0
      bottom: 0
      padding: 16px 10px
      z-index: 1
      &.slide-enter-active, &.slide-leave-active
        transition: all 0.3s
      &.slide-enter, &.slide-leave-to
        transform: translate3d(-100%, 0, 0)
      .verify
        margin-top: 30px
        font-size: $font-size-medium-x
        z-index: 0
        .title
          text-align: center
        .input
          height: 45px
          margin-top: 30px
          text-align: center
          background: url('input.png') no-repeat center
          background-size: 224px 45px
          input
            text-indent: 18px
            letter-spacing: 51px
            width: 224px
            height: 45px
            outline: none
            border: none
            background: none
    .screen
      position: fixed
      top: 0
      left: 0
      bottom: 0
      right: 0
      z-index: 2
      background: rgba(0, 0, 0, 0.2)
      .checkout-info
        position: absolute
        top: 50%
        left: 50%
        margin-left: -50px
        margin-top: -50px
        width: 100px
        height: 100px
        background: rgba(0, 0, 0, 0.5)
        text-align: center
        line-height: 100px
        color: #fff
        font-size: 16px
        border-radius: 10px
</style>