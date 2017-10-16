<template>
  <div class="screen">
    <div class="confirm">
      <div class="info">
        <slot></slot>
      </div>
      <div class="btns">
        <div class="btn b-right" @click="cancel">取消</div>
        <div class="btn" @click="ok">确定</div>
      </div>
    </div>    
  </div>
</template>

<script>
  export default {
    methods: {
      ok() {
        this.$emit('ok')
      },
      cancel() {
        this.$emit('cancel')
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
      .confirm
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
          font-size: 16px
          color: #141414
          align-items: center
          justify-content: center
          padding: 0 20px
          border-bottom: 1px solid #eee
          line-height: 1.5
        .btns
          display: flex
          flex-direction: 'row'
          height: 45px
          text-align: center
          color: #2b8bd3
          font-weight: 700
          line-height: 45px
          .btn
            flex: 1
            &.b-right
              border-right: 1px solid #eee
</style>