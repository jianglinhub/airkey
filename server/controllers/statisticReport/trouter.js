/**
 * Created by sky on 2017/8/18.
 */
"use strict";

const path                = require("path");
const trouter             = require(path.join(process.cwd(), "server/middleware/trouter"));
const service             = require(path.join(process.cwd(), "server/service/statisticReport/handler"));

trouter.post("/findReport",async function(ctx,next){
    let _this = ctx;
    let body = {
        status:0,
        data:[]
    };
    let reqData = _this.request.body;
    let result = await service.findReport(reqData);
    if(result.status == "SUCCEED"){
        body = {
            status:1,
            data:result.data
        };
    }
    _this.body = body;
});

module.exports = trouter;