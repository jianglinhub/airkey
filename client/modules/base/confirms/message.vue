<template>
    <transition name="fade">
        <div class="message">
            <div class="info">
                <slot></slot>
            </div>
        </div>    
    </transition>
</template>

<script>
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  
.message
    position: fixed
    width: 100vh
    left: 50%
    top: 0
    margin-left: -50vh
    background: rgba(0, 0, 0, 0.7)
    border-radius: 2px
    text-align: center
    font-size: 14px
    color: #fff
    padding: 10px
    box-sizing: border-box
    transition: all 0.3s

.fade-enter-active {
    transform: translate3d(0, -50px, 0)
}
.fade-leave-active {
    transform: translate3d(0, -50px, 0)
}
</style>