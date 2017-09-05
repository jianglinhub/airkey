/**
 * Created by sky on 2017/8/18.
 */
"use strict";

const path      = require("path");
const request   = require(path.join(process.cwd(), "server/util/request"));
const signUrl   = require(path.join(process.cwd(), "server/util/signurl"));

class statisticReport{
    constructor(){

    }

    findReport(reqData){
        let url = signUrl("statisticReport", {}, "findReport");
        return request.transfer({uri: url+"&name="+reqData.name, method: "POST",body:reqData.params});
    }
}

module.exports = new statisticReport;