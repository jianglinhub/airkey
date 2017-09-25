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
    import { ViewBox, Flexbox, FlexboxItem, Toast } from 'vux'

    export default {
        data() {
            return {
                tipsDetail: '您的好友刘婧琳送了您一把空中钥匙，为了车辆【川G 88818】车架号后6位 【889889】安全，在使用之前，请确保您在车辆旁边。',
                tipsLapse: '您的好友刘婧琳送您的空中钥匙已失效，请联系车主。',
                tipsBrowser: '为了您好友的车辆安全考虑，建议您使用微信内置浏览器打开。',
                isExpired: false,
                isToastShow: false,
                isWeixinBowser: true,
                toastText: "其他远控指令正在执行",
                wechatConfig: {
                    oAuthCodeUri: "https://open.weixin.qq.com/connect/qrconnect",
                    redirect_uri: "http://air-k.nx-code.com/#/",
                    appid: "wxbd15f7403983633d",
                    response_type: "code",
                    scope: "snsapi_login",
                    state: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpX",
                    secret: "73103274f8fb5330b59c66da0403982e",
                    grant_type: "authorization_code",
                    id: "qrCode"
                }
            }
        },

        created() {
            // console.log(window.navigator.userAgent.toLowerCase())
        },

        methods: {
            mapInit() {
                var map = new qq.maps.Map(document.getElementById('map'), {
                    center: new qq.maps.LatLng(39.916527, 116.397128),
                    zoom: 2,
                    mapTypeControl:false
                })

                var anchor = new qq.maps.Point(6, 6),
                    size = new qq.maps.Size(24, 24),
                    origin = new qq.maps.Point(0, 0),
                    icon = new qq.maps.MarkerImage('http://lbs.qq.com/javascript_v2/img/center.gif', size, origin, anchor)

                var marker = new qq.maps.Marker({
                    icon: icon,
                    map: map,
                    position:new qq.maps.LatLng(36.916527, 116.397128)
                })
            },

            btnClick() {
                let _this = this,
                    msg = "空中钥匙执行成功之后，2分钟内可对车辆无钥匙启动，确认使用？"
                if (confirm(msg)) {
                    console.log("确认")
                    _this.isToastShow = true
                } else {
                    console.log("取消")
                }
            },

            isWeiXin() {
                let ua = window.navigator.userAgent.toLowerCase(),
                    _this = this
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    _this.isExpired = false
                } else {
                    _this.isExpired = true
                    _this.isWeixinBowser = false
                }
            },

            isLogin() {
                // window.localStorage.getItem("access_token": )
            },


            
            fetchCode() {

                if (this.$route.query.code && this.$route.query.state) {

                    let state = this.$route.query.state
                    
                    if (state != this.wechatConfig.state) {
                        alert("请求非法！")
                    } else {
                        let code = this.$route.query.code
                        this.fetchAccess_Token(code)
                    }

                } else {
                    
                    let url = this.wechatConfig.oAuthCodeUri + "?appid=" + this.wechatConfig.appid + "&redirect_uri=" + encodeURIComponent(this.wechatConfig.redirect_uri) + "&response_type=" + this.wechatConfig.response_type + "&scope=" + this.wechatConfig.scope + "&state=" + this.wechatConfig.state

                    window.location.href = url
                }

            },

            fetchAccess_Token(code) {

                let params = {
                    appid: this.wechatConfig.appid,
                    secret: this.wechatConfig.secret,
                    code: code,
                    grant_type: this.wechatConfig.grant_type
                }
                this.$http.get("api/fetchAccess_Token", {params: params}).then((res) => {
                    if (!res.body.data.access_token) {
                        console.log('err: ', res.body.data)
                        localStorage.removeItem("access_token")
                        window.location.href = this.wechatConfig.redirect_uri
                        // window.location.href = 'http://127.0.0.1:3000/'
                        this.fetchCode()
                    } else {
                        console.log(res.body.data.access_token)
                        localStorage.setItem("access_token", res.body.data.access_token)
                    }
                })
            }
        },

        components: {
            ViewBox,
            Flexbox,
            FlexboxItem,
            Toast
        },

        mounted() {
            this.mapInit()
            this.isWeiXin()
            this.fetchCode()
        }
    }
</script>
