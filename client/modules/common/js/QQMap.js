/**
 * Created by yong.liu on 2016/10/22.
 */
"use strict";
import GPS from './gps';
import Q from "q";
function QQMap(){

}

/**
 * 更具坐标得到地址信息
 * @param point
 */
QQMap.prototype.nGeocode = function(point){
    var geocoder = new qq.maps.Geocoder(),
        qqPoint = new qq.maps.LatLng(point.latitude , point.longitude),
        deferred = Q.defer()
    geocoder.getAddress(qqPoint)

    geocoder.setComplete(function(result) {
        deferred.resolve(result)
    })
    //若服务请求失败，则运行以下函数
    geocoder.setError(function() {
        deferred.reject()
    })

    return deferred.promise
}

QQMap.prototype.nLonLatFilter = function(lat,lon){
    let latlon = GPS.gcj_encrypt(lat,lon);
    return latlon;
};


let TMap = new QQMap;

export { TMap };