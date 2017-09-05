/**
 * Created by sky on 2017/2/8.
 */

"use strict";
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

class Organization{
    constructor(){

    }

    get orgModel(){
        let orgSchema = Schema({
            name: String,
            nameAlias: String,
            code: String,
            code2: String,
            description: String,
            admins: Array,
            ancestors: Array,
            parent: Schema.Types.ObjectId,
            isParent: Boolean
        });
        return mongoose.model("organization", orgSchema);
    }
}

module.exports = exports = new Organization;
