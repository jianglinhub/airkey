<template>
  <div class="action-button" @click="emitClick">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    methods: {
      emitClick() {
        this.$emit('click')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  
  .action-button
    text-align: center
    margin: 0 auto
    width: 220px
    height: 36px
    bg-image('button_blue_all')
    background-size: 220px 36px
    color: #dde8fb
    line-height: 36px
</style>