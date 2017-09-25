<template>
  <div id="qrCode">
    This is qrCode
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {
      console.log(this.$route)
      var obj = new WxLogin(this.$route.query.params)
      console.log('obj:===>', obj)
    }
  }
</script>

<style>
  
</style>