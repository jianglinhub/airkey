<template>
  <div class="screen">
    <div class="checkout">
      <div class="info">
        <slot></slot>
      </div>
    </div>    
  </div>
</template>

<script>
  export default {}
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
      .checkout
        position: fixed
        top: 50%
        left: 50%
        width: 290px
        height: 80px
        margin-top: -40px
        margin-left: -145px
        background: #fff
        border-radius: 16px
        z-index: 2
        box-shadow: 1px 1px 1px #888
        .info
          font-size: 16px
          color: #141414
          text-align: center
          line-height: 80px
</style>