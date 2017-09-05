/**
 * Created by yong.liu on 2016/9/8.
 */
"use strict";
let Schema = require("mongoose").Schema;
let appSchema = Schema({
    name: String,
    description: String,
    appKeys: [
        {
            type: Schema.Types.ObjectId,
            ref: 'appKey'
        }
    ],
    _appType: {
        type: Schema.Types.ObjectId,
        ref: 'appType'
    },
    _appProvider: {
        type: Schema.Types.ObjectId,
        ref: 'appProvider'
    }
});

module.exports = db.model("app", appSchema);