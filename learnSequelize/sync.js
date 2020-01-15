"use strict";
exports.__esModule = true;
var seq_1 = require("./seq");
require("./model");
seq_1["default"].authenticate().then(function () {
    // eslint-disable-next-line no-console
    console.log('auth ok');
})["catch"](function () {
    // eslint-disable-next-line no-console
    console.log('auth error');
});
seq_1["default"].sync({ force: true }).then(function () {
    // eslint-disable-next-line no-console
    console.log('sync ok');
    process.exit();
});
