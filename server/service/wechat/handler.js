/**
 * Created by Jie.Liu on 2016/12/7.
 */
"use strict";
const path = require("path");
const request = require(path.join(process.cwd(), "server/util/request"));
const signUrl = require(path.join(process.cwd(), "server/util/signurl"));

class Wechat{
    constructor(){

    }
    fetchAccess_Token(params) {
        let url = signUrl("access_token", params, "access_token");
        return request.transfer({uri: url, method: "GET"});
    }
}

module.exports = exports = new Wechat