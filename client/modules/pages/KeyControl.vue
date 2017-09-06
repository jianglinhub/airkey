<template>
    <view-box ref="viewBox" class="view-box">

        <flexbox>
            <flexbox-item>
                <div class="tips-info" v-text="isExpired?isWeixinBowser?tipsLapse:tipsBrowser:tipsDetail"></div>
            </flexbox-item>
        </flexbox>

        <flexbox>
            <flexbox-item>
                <div class="time-info" v-if="!isExpired">
                    最近定位时间：2018.8.29 16：49：00
                </div>
            </flexbox-item>
        </flexbox>

        <flexbox>
            <flexbox-item>
                <div id="map" v-show="!isExpired"></div>
            </flexbox-item>
        </flexbox>

        <flexbox>
            <flexbox-item>
                <div class="img-info" v-if="!isExpired" @click="btnClick"></div>
            </flexbox-item>
        </flexbox>

        <flexbox>
            <flexbox-item>
                <div class="img-info-expired" v-if="isExpired"></div>
            </flexbox-item>
        </flexbox>

        <toast v-model="isToastShow" type="text" width="20em" position="middle">{{toastText}}</toast>

    </view-box>
</template>
<style>
    html, body {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
    }
    .view-box{
        width:100%;
        height:100%;
        overflow: hidden;
        background: url("../imgs/bg.png") no-repeat center;
        background-size: cover;
    }
    .tips-info{
        width:94%;
        height:auto;
        margin:15px auto;
        background-color: #cecece;
        border-radius: 4px;
        padding:5px 3px;
        font-size:15px;
        color:#333;
    }
    .time-info{
        width:70%;
        height:auto;
        background-color: #cecece;
        border-radius: 8px;
        color:#fff;
        margin:0 auto;
        padding: 3px auto;
        text-align: center;
    }
    #map{
        width:94%;
        height:270px;
        margin:15px auto;
        border-radius: 4px;
    }
    .img-info{
        background: url("../imgs/btn.png") no-repeat center;
        background-size:cover;
        width:217px;
        height:36px;
        margin:0 auto;
    }
    .img-info-expired{
        background: url("../imgs/error.png") no-repeat center;
        background-size:cover;
        width:240px;
        height:200px;
        margin:20px auto 0;
    }
    .red{
        color:#d51e3e;
    }
</style>
<script>
    import { ViewBox,Flexbox,FlexboxItem,Toast } from 'vux';
    export default{
        data(){
            return{
                tipsDetail:'您的好友刘婧琳送了您一把空中钥匙，为了车辆【川G 88818】车架号后6位 【889889】安全，在使用之前，请确保您在车辆旁边。',
                tipsLapse:'您的好友刘婧琳送您的空中钥匙已失效，请联系车主。',
                tipsBrowser:'为了您好友的车辆安全考虑，建议您使用微信内置浏览器打开。',
                isExpired:false,
                isToastShow:false,
                isWeixinBowser:true,
                toastText:"其他远控指令正在执行"
            }
        },
        watch:{

        },
        components: {
            ViewBox,
            Flexbox,
            FlexboxItem,
            Toast
        },
        methods: {
            mapInit:function (){
                var map = new qq.maps.Map(document.getElementById("map"), {
                    center: new qq.maps.LatLng(39.916527,116.397128),
                    zoom:2,
                    mapTypeControl:false
                });
            },
            btnClick:function (){
                let _this = this,
                    msg = "空中钥匙执行成功之后，2分钟内可对车辆无钥匙启动，确认使用？";
                if(confirm(msg)){
                    console.log("确认");
                    _this.isToastShow = true;
                }else{
                    console.log("取消");
                }
            },
            isWeiXin:function (){
                let ua = window.navigator.userAgent.toLowerCase(),
                    _this = this;
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                    _this.isExpired = false;
                }else{
                    _this.isExpired = true;
                    _this.isWeixinBowser = false;
                }
            }
        },
        mounted(){
            this.mapInit();
            this.isWeiXin();
        },
        created(){

        }
    }
</script>
