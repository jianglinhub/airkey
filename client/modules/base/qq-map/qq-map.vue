<template>
  <div class="qq-map">
    <div id="qqMap" class="qqMap">
      <div class="pos-msg">
        车辆位置：{{position}}
        <div class="refresh" id="refresh" @click="refreshPos"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      position: {
        default: '定位失败',
        type: String
      }
    },
    watch: {
      position() {
        this.initMap()
      }
    },
    methods: {
      initMap() {
        let geocoder,map,marker = null
        let center = new qq.maps.LatLng(39.916527, 116.397128);
        map = new qq.maps.Map(document.getElementById('qqMap'), {
            center: center,
            zoom: 15
        })
        geocoder = new qq.maps.Geocoder({
          complete : function(result){
            map.setCenter(result.detail.location);
            var marker = new qq.maps.Marker({
              map:map,
              position: result.detail.location
            })
          }
        })
        geocoder.getLocation(this.position)
      },

      refreshPos() {
        let ele = document.getElementById('refresh')
        // this.addClass(ele, 'rotate')
        ele.style.backgroundImage = 'url('+ require('./loading.gif') +')'
        this.$emit('mapChange')
        setTimeout(() => {
          // this.removeClass(ele, 'rotate')
          ele.style.backgroundImage = 'url('+ require('./refresh.png') +')'
        }, 1000)
      },

      // addClass(ele, cls) {
      //   if (!this.hasClass(ele, cls)) {
      //     ele.className += " " + cls
      //   }
      // },

      // hasClass(ele, cls) {
      //   return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'))
      // },

      // removeClass(ele, cls) {
      //   if (this.hasClass(ele, cls)) {
      //     let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
      //     ele.className = ele.className.replace(reg, ' ')
      //   }
      // }

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  
  .qq-map
    .qqMap
      width: 100%
      height: 224px
      position: relative
      .pos-msg
        position: absolute
        top: 0
        left: 0
        height: 30px
        width: 100%
        background: rgba(0, 0, 0, 0.6)
        z-index: 1
        font-size: 11px
        color: #edebec
        line-height: 30px
        letter-spacing: 1px
        text-indent: 10px
        .refresh
          top: 8px
          position: absolute
          right: 10px
          width: 14px
          height: 14px
          background-image: url(refresh.png)
          background-repeat: no-repeat
          background-size: 14px 14px
  .smnoprint
    display: none
  // .rotate
  //   animation: rotation 0.2s linear infinite
  //   background-image: url(loading.gif)
    
  // @keyframes rotation
  //   from { transform: rotate(0deg) }
  //   to { transform: rotate(360deg) }
</style>