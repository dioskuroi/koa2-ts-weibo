"use strict";
exports.__esModule = true;
var sequelize_typescript_1 = require("sequelize-typescript");
var model_1 = require("./model/model");
var conf = {
    host: 'localhost',
    dialect: 'mysql',
    models: [model_1["default"]]
};
var seq = new sequelize_typescript_1.Sequelize('koa2_weibo_db', 'root', 'paramore123', conf);
seq.sync({ force: true }).then(function () {
    console.log('sync ok');
})["catch"](function () {
    console.log('sync error');
});
