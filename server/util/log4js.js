/**
 * Created by yong.liu on 2017/5/10.
 */
const log4js        = require("log4js");

log4js.configure('server/util/log4js.json', {
    reloadSecs: 300,
    cwd: "logs"
});

module.exports = log4js;