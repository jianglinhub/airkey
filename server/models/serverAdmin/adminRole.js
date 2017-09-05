/**
 * Created by yong.liu on 2016/9/8.
 */
"use strict";
let mongoose = require("mongoose");
let Schema   = mongoose.Schema;

let adminRoleSchema = Schema({
    name: String,
    description: String,
    status: Number //0-不可用，1-可用
});

let model = mongoose.model("adminRole", adminRoleSchema);

/**
 * 构造函数
 * @constructor
 */
function AdminRole(){

}

AdminRole.prototype.constructor = AdminRole;

AdminRole.prototype._schema = adminRoleSchema;

AdminRole.prototype._model = model;

module.exports = exports = new AdminRole;