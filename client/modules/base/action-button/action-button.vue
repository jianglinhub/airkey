<template>
  <div class="action-button" @click="emitClick">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ['params'],
    methods: {
      emitClick() {
        this.$emit('click', this.params)
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
    width: calc((100% - 50px) / 2)
    height: 36px
    bg-image('button_blue_all')
    background-size: 100% 100%
    color: #dde8fb
    line-height: 36px
</style>