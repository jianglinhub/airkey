<template>
  <div class="screen">
    <div class="alert">
      <div class="info">
        <slot></slot>
      </div>
      <div class="btn" @click="close">确定</div>
    </div>    
  </div>
</template>

<script>
  export default {
    methods: {
      close() {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  
  .screen
      position: fixed
      top: 0
      left: 0
      bottom: 0
      right: 0
      z-index: 2
      background: rgba(0, 0, 0, 0.2)
      .alert
        position: fixed
        top: 50%
        left: 50%
        width: 290px
        height: 134px
        margin-top: -62px
        margin-left: -145px
        background: #fff
        border-radius: 16px
        z-index: 2
        box-shadow: 1px 1px 1px #888
        .info
          height: 89px
          display: flex
          justify-content: center
          align-items: center
          font-size: 16px
          color: #141414
          border-bottom: 1px solid #eee
          line-height: 1.5
        .btn
          height: 45px
          text-align: center
          color: #2b8bd3
          font-weight: 700
          line-height: 45px
</style>