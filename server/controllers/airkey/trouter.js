/**
 * Created by Jie.Liu on 2016/12/7.
 */
"use strict"
const path = require("path")
const config = require(path.join(process.cwd(), "server/config"))
const trouter = require(path.join(process.cwd(), "server/middleware/trouter"))
const handler = require(path.join(process.cwd(), "server/service/airkey/handler"))

trouter.post("/loginToKey", async function(ctx) {
  let _this = ctx
  let reqData = _this.request.body
  let result = await handler.loginToKey(reqData)
  let _body = {
    status: 0,
    data: {}
  }
  if(result.status === "SUCCEED") {
    _body = {
      status: 1,
      data: result.data
    }
  }
  _this.body = _body
})

trouter.post("/useKey", async function(ctx) {
  let _this = ctx
  let reqData = _this.request.body
  let result = await handler.useKey(reqData)
  let _body = {
    status: 0,
    data: {}
  }
  if(result.status === "SUCCEED") {
    _body = {
      status: 1,
      data: result.data
    }
  }
  _this.body = _body
})

trouter.post("/validPwd", async function(ctx) {
  let _this = ctx
  let reqData = _this.request.body
  let result = await handler.validPwd(reqData)
  let _body = {
    status: 0,
    data: {}
  }
  if(result.status === "SUCCEED") {
    _body = {
      status: 1,
      data: result.data
    }
  }
  _this.body = _body
})

trouter.post("/sendCommand", async function (ctx, next) {
    let _this = ctx
    let reqData = _this.request.body
    let result = await handler.sendCommand(reqData)
    let _body = {
        status: 0,
        data: {}
    };
    if(result.status == "SUCCEED"){
        _body = {
            status: 1,
            data: result.data
        }
    }
    _this.body = _body;
})

trouter.post('/findLatestLocation',async function (ctx, next){
    let _this = ctx;
    let reqData = _this.request.body;
    let result = await handler.findLatestLocation(reqData);
    let _body = {
        status: 0,
        result: result
    };
    if(result.status == "SUCCEED") {
        _body = {
            status: 1,
            result: result.data
        };
    }
    _this.body = _body;
});

module.exports = trouter