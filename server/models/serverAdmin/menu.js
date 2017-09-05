/**
 * Created by sky on 2017/2/8.
 */

"use strict";
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

class Menu{
    constructor(){

    }

    get menuModel(){
        let menuSchema = Schema({
            name: String,
            link: String,
            type: Number, //0-inner,1-frame
            remark: String,
            subMenus: Array
        })
        return mongoose.model("menu", menuSchema);
    }
}

module.exports = exports = new Menu;
