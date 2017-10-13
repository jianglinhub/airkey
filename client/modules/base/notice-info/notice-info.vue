<template>
  <div class="notice-info">
    <slot></slot>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  
  .notice-info
    background-color: $color-font-background
    border-radius: 6px
    padding: 4px 2px
    font-size: $font-size-small
    color: #edebec
    width: 220px
    text-align: center
    margin: 0px auto
</style>