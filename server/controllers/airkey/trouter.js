/**
 * Created by Jie.Liu on 2016/12/7.
 */
"use strict"
const path = require("path")
const config = require(path.join(process.cwd(), "server/config"))
const trouter = require(path.join(process.cwd(), "server/middleware/trouter"))
const handler = require(path.join(process.cwd(), "server/service/airkey/handler"))

trouter.post("/sendCommand", async function(ctx, next) {
    let _this = ctx
    let reqData = _this.request.body
    let result = await handler.sendCommand(reqData)
    let _body = {
        status: 0,
        data: {}
    };
    if (result.status == "SUCCEED") {
        _body = {
            status: 1,
            data: result.data
        }
    }
    _this.body = _body;
})

trouter.post('/findLatestLocation', async function(ctx, next) {
    let _this = ctx;
    let reqData = _this.request.body;
    let result = await handler.findLatestLocation(reqData);
    let _body = {
        status: 0,
        result: result
    };
    if (result.status == "SUCCEED") {
        _body = {
            status: 1,
            result: result.data
        };
    }
    _this.body = _body;
});

trouter.get('/queryKey', async function(ctx, next) {
    let _this = ctx;
    let reqData = _this.request.query;
    let result = await handler.queryKey(reqData);
    let _body = {
        status: 0,
        result: result
    };
    if (result.status == "SUCCEED") {
        _body = {
            status: 1,
            result: result.data
        };
    }
    _this.body = _body;
});

trouter.get('/checkPinOfDefault', async function(ctx, next) {
    let _this = ctx;
    let reqData = _this.request.query;
    let result = await handler.checkPinOfDefault(reqData);
    let _body = {
        status: 0,
        result: result
    };
    if (result.status == "SUCCEED") {
        _body = {
            status: 1,
            result: "SUCCEED"
        };
    }
    _this.body = _body;
});

trouter.get('/requestResult', async function(ctx, next) {
    let _this = ctx;
    let reqData = _this.request.query;
    let result = await handler.requestResult(reqData);
    console.log('result:', result)
    let _body = {
        status: 0,
        result: result
    };
    if (result.status == "SUCCEED") {
        _body = {
            status: 1,
            result: result.data
        };
    }
    _this.body = _body;
});

module.exports = trouter