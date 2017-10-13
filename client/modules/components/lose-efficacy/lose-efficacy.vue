<template>
  <transition name="slide">
    <div class="lose-efficacy">
      <TextBlock>您的好友刘倩琳送您的空中钥匙已失效，请联系车主。</TextBlock>
      <div class="logo"></div>
    </div>
  </transition>
</template>

<script>
  import TextBlock from 'base/text-block/text-block'
  import {mapGetters} from 'vuex'
  
  export default {
    computed: {
      ...mapGetters([
        'vin'
      ])
    },
    components: {
      TextBlock
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  
  .lose-efficacy
    position: fixed
    top: 0
    left: 0
    bottom: 0
    padding: 16px 10px
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .logo
      margin: 26px auto
      width: 244px
      height: 204px
      background: url(default_image.png) no-repeat
      background-size: 244px 204px
</style>