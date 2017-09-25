/**
 * Created by Jie.Liu on 2016/12/7.
 */
"use strict";
const path = require("path");
const config = require(path.join(process.cwd(), "server/config"));
const trouter = require(path.join(process.cwd(), "server/middleware/trouter"));
const handler = require(path.join(process.cwd(), "server/service/wechat/handler"));

trouter.get("/fetchAccess_Token", async function(ctx) {
    let _this = ctx;
    let params = _this.request.query;
    let result = await handler.fetchAccess_Token(params);
    console.log(result)
    let _body = {};
    if(result.access_token) {
        _body = {
            status: 1,
            data: {
                access_token: result.access_token
            }
        };
    }else{
        _body = {
            status: 0,
            data: {
                errcode: result.errcode,
                errmsg: result.errmsg
            }
        };
    }
    _this.body = _body;
});

module.exports = trouter;