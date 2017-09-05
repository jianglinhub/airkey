/**
 * Created by yong.liu on 2016/9/8.
 */
"use strict";
let Schema = require("mongoose").Schema;
let appTypeSchema = Schema({
    name: String,
    description: String,
    apps: [
        {
            type: Schema.Types.ObjectId,
            ref: 'app'
        }
    ]
});

module.exports = db.model("appType", appTypeSchema);