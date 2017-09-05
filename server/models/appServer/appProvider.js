/**
 * Created by yong.liu on 2016/9/8.
 */
"use strict";
let Schema = require("mongoose").Schema;
let appProviderSchema = Schema({
    name: String,
    description: String,
    apps: [
        {
            type: Schema.Types.ObjectId,
            ref: 'app'
        }
    ]
});

module.exports = db.model("appProvider", appProviderSchema);