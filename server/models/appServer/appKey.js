/**
 * Created by yong.liu on 2016/9/8.
 */
"use strict";
let Schema = require("mongoose").Schema;
let appKeySchema = Schema({
    secretKey: String,
    status: Boolean,
    _app: {
        type: Schema.Types.ObjectId,
        ref: 'app'
    }
});

module.exports = db.model("appKey", appKeySchema);