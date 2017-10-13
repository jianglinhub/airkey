<template>
  <div class="text-block">
    <slot></slot>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  
  .text-block
    background-color: $color-font-background
    border-radius: 6px
    padding: 14px 12px
    font-size: $font-size-medium-x
    color: $color-text
    line-height: 1.27
    letter-spacing: 1px
</style>