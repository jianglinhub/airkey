/**
 * Created by Jie.Liu on 2016/12/7.
 */
"use strict"
const path = require("path")
const request = require(path.join(process.cwd(), "server/util/request"))
const signUrl = require(path.join(process.cwd(), "server/util/signurl"))

class AirKey{
  constructor(){

  }

  loginToKey(params) {
    let url = signUrl("air-keys", params, "loginToKey")
    return request.transfer({ uri: url, method: "POST" })
  }

  useKey(params) {
    let url = signUrl("air-keys", params, "useKey")
    return request.transfer({ uri: url, method: "POST" })
  }

  validPwd(params) {
    let url = signUrl("air-keys", params, "validPwd")
    return request.transfer({ uri: url, method: "POST" })
  }

  sendCommand(params) {
    var url = signUrl("remote-service",{},"sendCommand");
    return request.transfer({uri: url, method: "POST", body:params, headers: {appId: 999}});
  }

  findLatestLocation(params) {
    var url = signUrl("vehicleLocation", params, "findLatest");
    return request.transfer({uri: url, method: "GET"});
  }
}

module.exports = exports = new AirKey