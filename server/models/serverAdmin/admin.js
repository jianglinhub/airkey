/**
 * Created by yong.liu on 2016/9/8.
 */
"use strict";
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let adminSchema = Schema({
    password: String,
    username: String, //唯一，不能重复
    name: String,
    gender: Number, //0-男，1-女
    mobile: String,
    email: String,
    address: String,
    description: String,
    ifAdmin: Number, //是否超级管理员，0-否，1-是，
    status: Number, //0-不可用，1-可用
    passStatus: Number, //密码状态：0-初始密码，1-客户密码，
    adminRoles: [{
        type: Schema.Types.ObjectId,
        ref: "adminRole"
    }]
});

let model = mongoose.model("admin", adminSchema);

/**
 * 构造函数
 * @constructor
 */
function Admin(){

}

Admin.prototype.constructor = Admin.prototype;

Admin.prototype._schema = adminSchema;

Admin.prototype._model = model;

module.exports = exports = new Admin;