<template>
    <transition name="fade">
        <div class="keyboard">
            <p class="close" @click="cancel">x</p>
            <p class="text">请输入pin码</p>
            <ul class="pass-input">
                <li :class="{ 'add-pass': passlength > 0}"></li>
                <li :class="{ 'add-pass': passlength > 1}"></li>
                <li :class="{ 'add-pass': passlength > 2}"></li>
                <li :class="{ 'add-pass': passlength > 3}"></li>
            </ul>
            <ul class="pass-key">
                <li v-for="key in keys" @click="inputPass(key)">{{key}}</li>
            </ul>
        </div>    
    </transition>
</template>

<script>
  export default {
    data() {
        return {
            pass: [],
            keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
        }
    },
    computed: {
        passlength() {
            return this.pass.length 
        }
    },
    watch: {
        pass(pass) {
            if (pass.length > 3) {
                this.$emit('validPass', this.pass)
                this.pass = []
            }
        }
    },
    methods: {
        inputPass(key) {
            this.pass.push(key)
        },
        cancel() {
            this.$emit('cancel')
            this.pass = []
        }
    },
    mounted() {
        document.body.addEventListener('touchstart', function () { })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  
.keyboard
    position: fixed
    left: 0
    top: 0
    bottom: 0
    transition: all 0.3s
    z-index: 4
    background: rgba(0, 0, 0, 0.8)
    .close
      font-size: 20px
      text-align: right
      padding: 10px
      color: #fff
      margin-bottom: 10px
    .text
      color: #fff
      font-size: 16px
      text-align: center
    .pass-input
      list-style: none
      overflow: hidden
      width: 166px
      margin: 12px auto
      li
        float: left
        width: 15px
        height: 15px
        border-radius: 50%
        margin-left: 20px
        border: 1px solid #fff
        &.add-pass
            background: #eee
    .pass-key
      margin-top: 10px
      list-style: none
      display: flex
      flex-wrap: wrap
      flex-direction: row
      li
        border: 1px solid #eee
        box-sizing: border-box
        font-size: 14px
        color: #fff
        width: 70px
        height: 70px
        border-radius: 50%
        text-align: center
        line-height: 70px
        margin-left: calc((100% - 210px) / 4)
        margin-top: 30px
        &:last-child
          margin-left: calc((100% - 70px) / 2)
        &:active
          background: #aaa

.fade-enter-active {
    transform: translate3d(0, 100%, 0)
}
.fade-leave-active {
    transform: translate3d(0, 100%, 0)
}
</style>