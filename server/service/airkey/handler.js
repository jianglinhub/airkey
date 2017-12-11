/**
 * Created by Jie.Liu on 2016/12/7.
 */
"use strict"
const path = require("path")
const request = require(path.join(process.cwd(), "server/util/request"))
const signUrl = require(path.join(process.cwd(), "server/util/signurl"))

class AirKey {
    constructor() {

    }

    sendCommand(params) {
        var url = signUrl("remote-service", {}, "sendCommand");
        return request.transfer({ uri: url, method: "POST", body: params, headers: { appId: 999 } });
    }

    findLatestLocation(params) {
        var url = signUrl("vehicleLocation", params, "findLatest");
        return request.transfer({ uri: url, method: "GET" });
    }

    queryKey(params) {
        var url = signUrl("air-keys", params, "queryKey");
        return request.transfer({ uri: url, method: "GET" });
    }

    checkPinOfDefault(params) {
        var url = signUrl("vehicle/tservice", params, "checkPinOfDefault");
        return request.transfer({ uri: url, method: "GET" });
    }

    requestResult(params) {
        var url = signUrl("remote-service", params, "findSendCommandStatus");
        return request.transfer({ uri: url, method: "GET" });
    }
}

module.exports = exports = new AirKey